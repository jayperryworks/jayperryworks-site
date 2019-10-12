import fs from 'fs'
import path from 'path'
import yaml from 'js-yaml'
import render from '../../utils/renderMarkdown.js'

const dir = 'content/pictures'

export function get(req, res) {
	res.writeHead(200, {
		'Content-Type': 'application/json'
	})

	res.end(JSON.stringify(
    fs.readdirSync(dir).map((file) => {
      const metadata = path.parse(file).name.split('-')

      const data = yaml.safeLoad(
        fs.readFileSync(`${dir}/${file}`, 'utf-8')
      )

      return {
        title: data.title,
        date: {
          year: metadata[0]
        },
        slug: metadata.slice(1, metadata.length).join('-'),
        thumbnail: data.thumb
      }
    })
  ))
}
