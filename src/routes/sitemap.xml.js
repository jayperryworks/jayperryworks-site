import generatePictureList from '@/utils/generatePictureList.js'
import generateWritingList from '@/utils/generateWritingList.js'
import { format } from 'date-fns'

const siteurl = 'https://jayperryworks.com'

const pages = [
  {
    title: 'Home',
    path: '',
    date: {
      year: 2019,
      month: 12,
      day: 16
    },
    priority: 1,
  },
  {
    title: 'About',
    path: 'about',
    date: {
      year: 2019,
      month: 12,
      day: 16
    },
    priority: 0.5,
  },
  {
    title: 'Prints & paintings',
    path: 'pictures',
    date: {
      year: format(new Date(), 'YYYY'),
      month: format(new Date(), 'M'),
      day: format(new Date(), 'd')
    },
    priority: 0.8,
    change: 'monthly'
  },
  {
    title: 'Writing',
    path: 'writing',
    date: {
      year: format(new Date(), 'YYYY'),
      month: format(new Date(), 'M'),
      day: format(new Date(), 'd')
    },
    priority: 0.8,
    change: 'monthly'
  }
]

function render(pages, siteurl) {
  return `
    <?xml version="1.0" encoding="UTF-8"?>
    <urlset>
      ${
        pages.map((page) => {
          `
            <url>
              <loc>${siteurl}/${page.path}</loc>
              <lastmod></lastmod>
              <changefreq>${page.date.year || '2020'}-${page.date.month || '01'}-${page.date.day || '01'}</changefreq>
              <priority>${page.priority || 0.5}</priority>
            </url>
          `
        })
      }
    </urlset>
  `
}

export function get(req, res) {

}
