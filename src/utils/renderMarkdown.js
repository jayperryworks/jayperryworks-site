// Global markdown renderer for the 'generate' utils
const markdown = require('markdown-it')
const footnotes = require('markdown-it-footnote')

const caption = (tokens, idx) => {
	const n = Number(tokens[idx].meta.id + 1).toString();

	if (tokens[idx].meta.subId > 0) {
		n += ':' + tokens[idx].meta.subId;
	}

	return n;
}

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

	// Modify the output rules for footnotes
	const blockRenderer = markdown(options).use(footnotes);

	// blockRenderer.renderer.rules.footnote_caption = (tokens, idx) => {
	// 	const n = Number(tokens[idx].meta.id + 1).toString();

	// 	if (tokens[idx].meta.subId > 0) {
	// 		n += ':' + tokens[idx].meta.subId;
	// 	}

	// 	return n;
	// };

	// if the 'inline' option is true, render without surrounding p tag
	// and leave out block-level plugins (e.g. footnotes)
	return inline
		? markdown(options).renderInline(content)
		: blockRenderer.render(content)
}
