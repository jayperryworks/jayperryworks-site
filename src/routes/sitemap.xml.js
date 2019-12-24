// https://github.com/sveltejs/v2.svelte.dev/blob/8aad909631fd94e203f14ac3cf168c3c97c0ecd5/src/routes/blog/rss.xml.js
// https://github.com/sveltejs/hn.svelte.technology/blob/master/src/routes/%5Blist%5D/rss.js
// https://github.com/sveltejs/sapper/issues/461
import fs from 'fs'
import yaml from 'js-yaml'
import generatePictureList from '@/utils/generatePictureList.js'
import generateWritingList from '@/utils/generateWritingList.js'
// import { formatISO } from 'date-fns'

const siteData = yaml.safeLoad(
  fs.readFileSync('content/site.yml', 'utf-8')
)

function generatePagesList() {
  return siteData.pages.map(page => {
    if (page.data) {
      const pageData = yaml.safeLoad(
        fs.readFileSync(page.data, 'utf-8')
      )

      return {
        date: pageData.date,
        ...page
      }
    }

    return page
  })
}

// ${page.date && `<lastmod>${formatISO(new Date(page.date))}</lastmod>`}
function render(pages) {
  return `
    <?xml version="1.0" encoding="UTF-8"?>
    <urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
      ${
        pages.map(page => `
            <url>
              <loc>${siteData.url}/${page.path}</loc>
              <changefreq>${page.change || 'yearly'}</changefreq>
              <priority>${page.priority || 0.6}</priority>
            </url>
          `
        )
      }
    </urlset>
  `.trim()
}

export function get(req, res) {
  res.writeHead(200, {
    'Content-Type': 'application/xml'
  })

  res.end(render([
    ...generatePagesList(),
    ...generatePictureList('content/pictures'),
    ...generateWritingList('content/writing')
  ]))
}
