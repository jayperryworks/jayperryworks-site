import fs from 'fs'
import yaml from 'js-yaml'
import render from '../utils/renderMarkdown.js'
import { findInManifest } from '../utils/imageHelpers.js'

export function get(req, res) {
  let data = yaml.safeLoad(
    fs.readFileSync('content/home.yml', 'utf-8')
  )

  if (data.cover) {
  	data.cover.image = findInManifest(data.cover.image)
  }

  data.tableOfContents.forEach((item) => {
    if (item.description) {
      item.description = render(item.description)
    }
    return item
  })

  res.writeHead(200, {
    'Content-type': 'application/json'
  })

  res.end(JSON.stringify(data))
}
