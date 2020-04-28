import fs from 'fs'
import yaml from 'js-yaml'
import render from '@/utils/renderPostBody.js'

export function get(req, res) {
  let data = yaml.safeLoad(
    fs.readFileSync('content/about.yml', 'utf-8')
  )

  renderPostBody(data.body)

  res.writeHead(200, {
    'Content-Type': 'application/json'
  })

  res.end(JSON.stringify(data))
}
