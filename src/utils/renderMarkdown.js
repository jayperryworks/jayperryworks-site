// Global markdown renderer for the 'generate' utils
import markdown from 'markdown-it'
import footnotes from 'markdown-it-footnote'

export default function (
  content,
  {
    inline = false,
    html = false
  } = {}
) {
  // markdown-it options
  const options = { typographer: true, html: html }

  // if the 'inline' option is true, strip out p tags
  // and leave out block-level plugins (e.g. footnotes)
  // -> renderer surrounds all text with p tags by default
  if (inline) {
    return markdown(options)
      .render(content)
      .replace(/<\/?p[^>]*>/g, '')
  }

  // otherwise assume it's body text
  return markdown(options)
    .use(footnotes)
    .render(content)
}
