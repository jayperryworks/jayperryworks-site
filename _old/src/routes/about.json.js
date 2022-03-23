import { camelCase, paramCase } from 'change-case';
import { query, blockQueries, renderBlockContent } from '@/utils/prismicQuery.js';
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
  let response = await query(`
    query{
      page(uid: "about", lang: "en-us") {
        title
        subtitle
        body {
          ${Object.keys(blockQueries).map((name) => {
						return blockQueries[name]();
					})}
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

	let { title, subtitle, body } = data;

  let content = {};

  content.title = title?.[0]?.text;
  content.subtitle = subtitle?.[0]?.text;

	content.body = renderBlockContent(body);

  res.writeHead(200, {
    'Content-Type': 'application/json'
  });

  res.end(JSON.stringify(content));
}
