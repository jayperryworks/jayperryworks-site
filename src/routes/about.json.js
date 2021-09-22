import { camelCase } from 'change-case';
import prismic, { blockQueries } from '@/utils/prismicQuery.js';
import { findInManifest } from '@/utils/imageHelpers.js';
import markdown from '@/utils/renderMarkdown.js';

function renderMarkdown (field) {
  return markdown(field[0].text);
}

function getImageVersions (
  imageField,
  versions = ['Small', 'Medium', 'Large']
) {
  if (imageField[versions[0]]) {
    return versions.map((version) => {
      return {
        path: imageField[version].url,
        size: imageField[version].dimensions.width
      }
    })
  }

  // if the image doesn't have versions, return the original
  return [
    {
      path: imageField.url,
      size: imageField.dimensions.width
    }
  ]
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

  let { title, subtitle, body, highlight } = await response.data.page;

  title = title?.[0]?.text;
  subtitle = subtitle?.[0]?.text;

  body = body.map((slice) => {
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
          columnSize: slice.primary.column_size,
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

  res.end(JSON.stringify({
    title,
    subtitle,
    body,
    highlight
  }));
}
