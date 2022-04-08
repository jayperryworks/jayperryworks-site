import { format } from 'date-fns';
import { queryAll, getImageVersions } from '@/utils/prismicQuery.js';
import calculateAspectRatio from 'calculate-aspect-ratio';
import errors from '@/utils/errorMessages.js';

const header = { 'Content-Type': 'application/json' };

export async function get(req, res) {

	// query all pictures from Prismic
	const listData = await queryAll({
		fieldString: `
				title
				cover
				date_completed
				_meta {
					id
					uid
				}
				series {
					... on Picture_series {
						_meta {
							uid
							id
						}
					}
				}
			`
	});

	if (!listData) {
		res.writeHead(404, header);
		res.end(JSON.stringify({
			message: errors.general
		}));
		return;
	}

	// clean up the data to build an array of pictures
	const pictures = listData.map(({ node }) => {
		let picture = {};

		picture.title = node.title?.[0]?.text;
		picture.yearCompleted = format(new Date(node.date_completed), 'yyyy');
		picture.path = `/pictures/${picture.yearCompleted}/${node._meta.uid}/`;
		picture.slug = node._meta.uid;

		if (node.series) {
			picture.series = node.series._meta.uid;
		}

		// cover image
		if (node.cover) {
			picture.cover = {
				image: getImageVersions(node.cover),
				alt: node.cover.alt
			};
			picture.ratio = calculateAspectRatio(picture.cover.image[0].width, picture.cover.image[0].height).split(':').join('/');
		}

		return picture;
	});

	const picturesWithoutSeries = pictures.filter(picture => !picture.series);

	// sort pictures by series, then by date within each series
	const sortedPictures = pictures
		.filter(p => p.series)
		.sort((a, b) => {
			if (b.series > a.series) {
				return -1;
			};
			return 1;
		})
		.concat(picturesWithoutSeries);

	res.writeHead(200, header);
	res.end(JSON.stringify(sortedPictures));
}
