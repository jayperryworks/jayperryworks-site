import fs from 'fs'
import yaml from 'js-yaml'
import renderPostBody from '@/utils/renderPostBody.js'

export function get(req, res, next) {
  const { year, month, day, slug } = req.params
  const header = {
    'Content-Type': 'application/json'
  }

  let data = yaml.safeLoad(
    fs.readFileSync(
      `content/writing/${year}-${month}-${day}-${slug}.yml`,
      'utf-8'
    )
  )

  if (!data) {
    res.writeHead(404, header)
    res.end(JSON.stringify({
      message: 'Oh dear, this bicycle has gone rubber-side-up. Much appreciated if you could let <a href="https://twitter.com/inkpixelswords" target="_blank">@inkpixelswords</a> know.'
    }))
  }

  data.body = renderPostBody(data.body)

  res.writeHead(200, header)
  res.end(JSON.stringify(data))
}
