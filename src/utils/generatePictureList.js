import fs from 'fs'
import path from 'path'
import yaml from 'js-yaml'
import render from './renderMarkdown.js'

export default function (dir) {
  return fs.readdirSync(dir).map((file) => {

    const metadata = path.parse(file).name.split('-')

    const data = yaml.safeLoad(
      fs.readFileSync(
        `${dir}/${file}`,
        {encoding: 'utf-8'},
        (err, data) => {
          if (error) return false
          return data.json()
        }
      )
    )

    return {
      title: data.title,
      date: metadata[0],
      slug: metadata.slice(1, metadata.length).join('-'),
      thumbnail: data.thumb
  })
}
