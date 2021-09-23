import { camelCase, paramCase } from 'change-case';
import prismic, { blockQueries, getImageVersions } from '@/utils/prismicQuery.js';
import { findInManifest } from '@/utils/imageHelpers.js';
import markdown from '@/utils/renderMarkdown.js';
import errors from '@/utils/errorMessages.js';

function renderMarkdown (field) {
  return markdown(field[0].text);
}

function getSliceWidth (prominence) {
  const widths = {
    Small: 'narrow',
    Medium: 'default',
    Large: 'wide'
  }

  return widths[prominence] || 'default'
}

function getSharedSliceFields (slice) {
  return {
    includeInExcerpt: slice.primary.include_in_excerpt || false,
    prominence: getSliceWidth(slice.primary.prominence),
    type: camelCase(slice.type)
  }
}

export async function get(req, res) {
  let response = await prismic(`
    query{
      page(uid: "about", lang: "en-us") {
        title
        subtitle
        body {
          __typename
          ${Object.values(blockQueries).map(type => type())}
        }
      }
    }
  `);

  let data = await response.data.page;

  if (!data) {
    res.writeHead(404, header);
    res.end(JSON.stringify({
      message: errors.general
    }));
    return;
  }

  let content = {};

  content.title = data.title?.[0]?.text;
  content.subtitle = data.subtitle?.[0]?.text;

  content.body = data.body.map((slice) => {
    switch (slice.type) {
      case 'passage': {
        slice = {
          type: 'passage',
          html: renderMarkdown(slice.primary.markdown),
          ...getSharedSliceFields(slice)
        };
        break;
      }
      case 'figure': {
        slice = {
          alt: slice.primary.image.alt,
          attribution: slice.primary.attribution,
          border: slice.primary.border || false,
          caption: slice.primary.caption 
            ? renderMarkdown(slice.primary.caption)
            : null,
          image: getImageVersions(slice.primary.image),
          ...getSharedSliceFields(slice)
        };
        break;
      }
      case 'image_gallery': {
        slice = {
          caption: slice.primary.caption 
            ? renderMarkdown(slice.primary.caption)
            : null,
          attribution: slice.primary.attribution,
          columnSize: paramCase(slice.primary.column_size),
          images: slice.fields.map((item) => {
            return {
              image: getImageVersions(item.image),
              alt: item.image.alt
            }
          }),
          ...getSharedSliceFields(slice)
        }
      }
    }

    return slice;
  })

  res.writeHead(200, {
    'Content-Type': 'application/json'
  });

  res.end(JSON.stringify(content));
}
