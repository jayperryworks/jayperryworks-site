const fs = require('fs')
const path = require('path')
const yaml = require('js-yaml')
const prettify = require('prettify-xml')
const generatePictureList = require('../src/utils/generatePictureList.js')
const generateBlogList = require('../src/utils/generateBlogList.js')
const siteData = require('../src/utils/siteData.js')

async function render(pages, {
  change = 'yearly',
  priority = 0.6
} = {}) {
  return prettify(`
    <?xml version="1.0" encoding="UTF-8"?>
    <urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
      ${
        pages.map(page => `
          <url>
            <loc>${siteData.get('url')}/${page.path}</loc>
            <changefreq>${page.change || change}</changefreq>
            <priority>${page.priority || priority}</priority>
          </url>
        `).join('')
      }
    </urlset>
  `)
}

fs.writeFileSync(
  path.join(__dirname, '../static/sitemap.xml'),
  await render([
    ...siteData.get('pages'),
    ...generatePictureList(
      path.join(__dirname, '../content/pictures')
    ),
    ...generateBlogList(
      path.join(__dirname, '../content/blog')
    )
  ])
)
