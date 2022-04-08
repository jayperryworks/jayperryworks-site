const render = require('./renderMarkdown.js')

module.exports = (body) => {
  return body.map((section) => {
    // render out any markdown content
    // -> place render in 'html' prop and delete 'markdown' prop
    if (section.markdown) {
      section.html = render(section.markdown, { html: true })
      delete section.markdown
      return section
    }

    if (section.inlineMarkdown) {
      section.html = render(section.inlineMarkdown, { inline: true, html: true })
      delete section.inlineMarkdown
      return section
    }

    if (section.caption) {
      section.caption = render(section.caption)
    }

    return section
  })
}
