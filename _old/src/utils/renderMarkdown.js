// Global markdown renderer for the 'generate' utils
const markdown = require('markdown-it');
const footnotes = require('markdown-it-footnote');

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

	// Remember old renderer, if overridden, or proxy to default renderer
	const defaultRender = blockRenderer.renderer.rules.link_open || function (tokens, idx, options, env, self) {
		return self.renderToken(tokens, idx, options);
	};

	// add target="_blank" to external links
	blockRenderer.renderer.rules.link_open = (tokens, idx, options, env, self) => {
		// If you are sure other plugins can't add `target` - drop check below
		const url = tokens[idx].attrGet('href');
		const targetIndex = tokens[idx].attrIndex('target');

		// if the link uses an absolute url...
		if (url.includes('http')) {
			if (targetIndex < 0) {
				// add new attribute
				tokens[idx].attrPush(['target', '_blank']);
			} else {
				// replace value of existing attr
				tokens[idx].attrs[targetIndex][1] = '_blank';
			}
		}

		// pass token to default renderer.
		return defaultRender(tokens, idx, options, env, self);
	};

	// if the 'inline' option is true, render without surrounding p tag
	// and leave out block-level plugins (e.g. footnotes)
	return inline
		? markdown(options).renderInline(content)
		: blockRenderer.render(content)
}
