import fs from 'fs'
import path from 'path'
import yaml from 'js-yaml'
import renderPostBody from './renderPostBody.js'

export default function (dir) {
  return fs.readdirSync(dir).map((file) => {

    const metadata = path.parse(file).name.split('-')
    const date = {
      year: metadata[0],
      month: metadata[1],
      day: metadata[2]
    }
    const slug = metadata.slice(3, metadata.length).join('-')

    let data = yaml.safeLoad(
      fs.readFileSync(`${dir}/${file}`, 'utf-8')
    )

    // pull any sections marked to be used in the excerpt
    let excerpt = data.body.filter((section) => {
      return section.useInExcerpt
    })

    const hasExcerpt = excerpt.length > 0

    return {
      cover: data.cover,
      title: data.title,
      subtitle: data.subtitle,
      date,
      slug,
      path: `writing/${date.year}/${date.month}/${date.day}/${slug}`,
      readMore: hasExcerpt,
      excerpt: hasExcerpt
        ? renderPostBody(excerpt)
        : renderPostBody(data.body)
    }
  }).reverse() // display in order of most recent
}
