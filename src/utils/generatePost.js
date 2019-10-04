import fs from 'fs'
import render from './renderMarkdown.js'

export default function (filePath) {
  const data = JSON.parse(
    fs.readFileSync(
      filePath,
      {encoding: 'utf-8'},
      (error, data) => {
        if (error) return false
        return data.json()
      }
    )
  )

  data.body.sections.forEach((section) => {
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
