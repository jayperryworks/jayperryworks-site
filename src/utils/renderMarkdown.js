// Global markdown renderer for the 'generate' utils
const markdown = require('markdown-it')
const footnotes = require('markdown-it-footnote')

module.exports = (
	content,
	{
		inline = false,
		html = false
	} = {}
) => {
	// markdown-it options
	const options = {
		typographer: true,
		html
	}

	// if the 'inline' option is true, render without surrounding p tag
	// and leave out block-level plugins (e.g. footnotes)
	return inline
		? markdown(options).renderInline(content)
		: markdown(options).use(footnotes).render(content)
}
