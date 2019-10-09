import fs from 'fs'
import yaml from 'js-yaml'
import render from './renderMarkdown.js'

export default function (filePath) {
  const data = yaml.safeLoad(
    fs.readFileSync(filePath, 'utf-8')
  )

  data.body.forEach((section) => {
    // render out any markdown content
    // -> place render in 'html' prop and delete 'markdown' prop
    if (section.markdown) {
      section.html = render(section.markdown)
      delete section.markdown
      return section
    }
    return section
  })

  return data
}
