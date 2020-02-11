import fs from 'fs'
import yaml from 'js-yaml'
import renderMarkdown from '@/utils/renderMarkdown.js'
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

  if (data.cover) {
    // render the cover image caption if present
    if (data.cover.caption) {
      data.cover.caption = renderMarkdown(data.cover.caption, {
        inline: true,
        html: true
      })
    }

    // render the cover image attribution if present
    if (data.cover.credit) {
      data.cover.credit = renderMarkdown(data.cover.credit, {
        inline: true,
        html: true
      })
    }
  }

  data.body = renderPostBody(data.body)

  res.writeHead(200, header)
  res.end(JSON.stringify(data))
}
