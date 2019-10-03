import fs from 'fs'
import path from 'path'
import { format } from 'date-fns'

export default function generatePostList (dir) {
  return fs.readdirSync(dir).map((file) => {

    const metadata = path
      .parse(file).name
      .split('-')

    const slug = metadata.slice(3, metadata.length).join('-')

    const data = JSON.parse(
      fs.readFileSync(
        `${dir}/${file}`,
        {encoding: 'utf-8'},
        (err, data) => {
          return data.json()
        }
      )
    )

    return {
      title: data.title,
      subtitle: data.subtitle,
      date: {
        year: metadata[0],
        month: metadata[1],
        day: metadata[2]
      },
      slug,
      excerpt: data.body.sections.filter((section) => {
        return section.useInExcerpt
      })
    }
  })
}
