import fs from 'fs'
import path from 'path'
import yaml from 'js-yaml'
import render from './renderMarkdown.js'

export default function (dir) {
  return fs.readdirSync(dir).reduce((result, file) => {
    const filename = path.parse(file).name

    // make sure we aren't accidentally reading a system dotfile
    if (filename[0] !== '.') {
      const metadata = filename.split('-')
      const year = metadata[0]
      const slug = metadata.slice(1, metadata.length).join('-')

      const data = yaml.safeLoad(
        fs.readFileSync(`${dir}/${filename}.yml`, 'utf-8')
      )

      result.unshift({
        title: data.title,
        date: { year },
        slug,
        thumbnail: data.thumb,
        path: `pictures/${year}/${slug}`
      })
    }
    return result
  }, []) // order by most recent
}
