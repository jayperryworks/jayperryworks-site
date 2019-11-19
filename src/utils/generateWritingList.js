import fs from 'fs'
import path from 'path'
import yaml from 'js-yaml'
import render from './renderMarkdown.js'

export default function (dir) {
  return fs.readdirSync(dir).map((file) => {

    const metadata = path.parse(file).name.split('-')
    const date = {
      year: metadata[0],
      month: metadata[1],
      day: metadata[2]
    }
    const slug = metadata.slice(3, metadata.length).join('-')

    const data = yaml.safeLoad(
      fs.readFileSync(`${dir}/${file}`, 'utf-8')
    )

    return {
      title: data.title,
      subtitle: data.subtitle,
      date,
      slug,
      path: `writing/${date.year}/${date.month}/${date.day}/${slug}`,
      excerpt: data.body
        .filter((section) => {
          // keep only the sections flagged with useInExcerpt
          return section.useInExcerpt
        }).map((excerpt) => {
          // render out any markdown content
          // -> place render in 'html' prop and delete 'markdown' prop
          if (excerpt.markdown) {
            excerpt.html = render(excerpt.markdown)
            delete excerpt.markdown
            return excerpt
          }
          return excerpt
        })
    }
  })
}
