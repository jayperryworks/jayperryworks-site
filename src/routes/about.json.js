import fs from 'fs'
import yaml from 'js-yaml'
import render from '@/utils/renderMarkdown.js'

export function get(req, res) {
  let data = yaml.safeLoad(
    fs.readFileSync('content/about.yml', 'utf-8')
  )

  data.body.forEach((section) => {
    // render out any markdown content
    // -> place render in 'html' prop and delete 'markdown' prop
    if (section.markdown) {
      section.html = render(section.markdown)
      delete section.markdown
      return section
    }

    if (section.caption) {
      section.caption = render(section.caption)
    }

    return section
  })

  res.writeHead(200, {
    'Content-Type': 'application/json'
  })

  res.end(JSON.stringify(data))
}
