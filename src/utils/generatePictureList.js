import fs from 'fs'
import path from 'path'
import yaml from 'js-yaml'
import render from './renderMarkdown.js'

export default function (dir) {
  // Use reduce to eliminate dotfiles from directory array
  // https://stackoverflow.com/questions/24806772/how-to-skip-over-an-element-in-map#24806827
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

      // place at front of array to order by most recent
      result.unshift({
        title: data.title,
        date: { year },
        slug,
        thumbnail: data.thumb,
        path: `pictures/${year}/${slug}`
      })
    }
    return result
  }, [])
}
