import { format } from 'date-fns';
import { getEditionDimensions } from '../../utils/prismicQuery';
import calculateAspectRatio from 'calculate-aspect-ratio';
import errors from '@/utils/errorMessages.js';
import prismic, { getImageVersions } from '@/utils/prismicQuery.js';
import render from '@/utils/renderMarkdown.js';

export async function get(req, res) {

  // query a list of all pictures for the previous/next links
  let response = await prismic(`
    query{
      allPictures(sortBy: date_completed_DESC) {
        edges {
          node {
            title
            cover
            date_completed
            _meta {
              uid
            }
            series {
              _linkType
              ... on Picture_series {
                title
                description
                _meta {
                  uid
                }
              }
            }
          }
        }
      }
    }
  `);

  let listData = await response.data.allPictures.edges;

  if (!listData) {
    res.writeHead(404, header);
    res.end(JSON.stringify({
      message: errors.general
    }));
    return;
  }

  // loop through listData and clean up the data
  // so it's easier to work with on the client
  let series = []; // empty array that we'll populate in the loop below
  let pictures = listData.map(({ node: pictureData }) => {
    let picture = {};

    picture.title = pictureData.title?.[0]?.text;
		picture.yearCompleted = format(new Date(pictureData.date_completed), 'yyyy');
    picture.path = `/pictures/${picture.yearCompleted}/${pictureData._meta.uid}/`;

    // cover image
    if (pictureData.cover) {
      picture.cover = {
        image: getImageVersions(pictureData.cover),
        alt: pictureData.cover.alt
      };
			picture.ratio = calculateAspectRatio(picture.cover.image[0].width, picture.cover.image[0].height).split(':').join('/');
    }

    // series data
    if (pictureData.series) {
      const { title, description, _meta } = pictureData.series;

      picture.series = _meta.uid;
      // add to the separate series array
      series.push({
        title: title?.[0]?.text,
        description: description?.[0]?.text,
        uid: _meta.uid
      });
    }

    return picture;
  });

	// create an array of series, removing duplicate values
  series = [...new Set(series.map(JSON.stringify))].map(JSON.parse);

	res.writeHead(200, {
		'Content-Type': 'application/json'
	});

	res.end(JSON.stringify({ pictures, series }));
}
