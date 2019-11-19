import fs from 'fs'
import path from 'path'
import yaml from 'js-yaml'
import render from './renderMarkdown.js'

export default function (dir) {
  return fs.readdirSync(dir).map((file) => {

    const metadata = path.parse(file).name.split('-')
    const year = metadata[0]
    const slug = metadata.slice(1, metadata.length).join('-')

    const data = yaml.safeLoad(
      fs.readFileSync(`${dir}/${file}`, 'utf-8')
    )

    return {
      title: data.title,
      date: { year },
      slug,
      thumbnail: data.thumb,
      path: `pictures/${year}/${slug}`
    }
  })
}
