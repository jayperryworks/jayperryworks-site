// Global markdown renderer for the 'generate' utils
import markdown from 'markdown-it'
import footnotes from 'markdown-it-footnote'

export default function (content) {
  return markdown({ typographer: true })
    .use(footnotes)
    .render(content)
}
