// Global markdown renderer for the 'generate' utils
import markdown from 'markdown-it';
import footnotes from 'markdown-it-footnote';

export default function render(
	content: string,
	{
		inline = false,
		html = false,
	} = {},
): string {
	// markdown-it options
	const renderOptions = {
		typographer: true,
		html,
	};

	// Modify the output rules for footnotes
	const blockRenderer = markdown(renderOptions).use(footnotes);

	// Remember old renderer, if overridden, or proxy to default renderer
	function proxyRenderer(tokens, idx, options, env, self) {
		return self.renderToken(tokens, idx, options);
	}

	const defaultRender = blockRenderer.renderer.rules.link_open || proxyRenderer;

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
				/* eslint-disable no-param-reassign */
				// -> this is code pulled from markdown-it's documentation,
				// 		assuming this is a legit reassignment case
				tokens[idx].attrs[targetIndex][1] = '_blank';
				/* eslint-enable no-param-reassign */
			}
		}

		// pass token to default renderer.
		return defaultRender(tokens, idx, options, env, self);
	};

	// if the 'inline' option is true, render without surrounding p tag
	// and leave out block-level plugins (e.g. footnotes)
	return inline
		? markdown(renderOptions).renderInline(content)
		: blockRenderer.render(content);
}
