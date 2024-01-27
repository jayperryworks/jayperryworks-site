// Global markdown renderer for the 'generate' utils
import { marked } from 'marked';
import markedFootnote from 'marked-footnote';
import { markedSmartypantsLite as markedSmartyPants } from 'marked-smartypants-lite';

export default function render(
	content: string,
	{
		inline = false,
		footnotes = false,
	} = {},
): string {
	// override default output for links if they point to an outside url
	// https://marked.js.org/using_pro#renderer
	const renderer = {
		link(href, title, text) {
			return href.includes('http')
				? `<a href="${href}" target="_blank" title="${title}">${text}</a>`
				: `<a href="${href}" title="${title}">${text}</a>`;
		},
		footnotes() {
			console.log('footnote');
			return `
				<jp-sidenote-markdown>
					<sup><a href="#id">ref</a></sup>
				</jp-sidenote-markdown>
			`;
		}
	};

	// https://github.com/bent10/marked-extensions/tree/main/packages/footnote
	marked.use(
		{
			gfm: true,
			renderer,
		},
		markedSmartyPants(),
		footnotes && markedFootnote(),
	);

	// output footnotes as usual but use JS to find the target footnote content and move it into the sidenote element? That would create a fallback that's more accessible/useful than the parenthesis I'm using now?

	// Modify the output rules for footnotes
	// const blockRenderer = markdown(renderOptions).use(footnotes);

	// Remember old renderer, if overridden, or proxy to default renderer
	// function proxyRenderer(tokens, idx, options, env, self) {
	// 	return self.renderToken(tokens, idx, options);
	// }

	// const defaultRender = blockRenderer.renderer.rules.link_open || proxyRenderer;

	// add target="_blank" to external links
	// blockRenderer.renderer.rules.link_open = (tokens, idx, options, env, self) => {
	// 	// If you are sure other plugins can't add `target` - drop check below
	// 	const url = tokens[idx].attrGet('href');
	// 	const targetIndex = tokens[idx].attrIndex('target');

	// 	// if the link uses an absolute url...
	// 	if (url.includes('http')) {
	// 		if (targetIndex < 0) {
	// 			// add new attribute
	// 			tokens[idx].attrPush(['target', '_blank']);
	// 		} else {
	// 			// replace value of existing attr
	// 			/* eslint-disable no-param-reassign */
	// 			// -> this is code pulled from markdown-it's documentation,
	// 			// 		assuming this is a legit reassignment case
	// 			tokens[idx].attrs[targetIndex][1] = '_blank';
	// 			/* eslint-enable no-param-reassign */
	// 		}
	// 	}

	// 	// pass token to default renderer.
	// 	return defaultRender(tokens, idx, options, env, self);
	// };

	// from the footnote reference, get the footnote body
	// replace the reference with the custom element
	// add the footnote body to the custom element slot, wrapped with:
	//
	// blockRenderer.renderer.rules.footnote_

	// remove the fallback parentheses around the label text
	// -> https://stackoverflow.com/questions/19134860/javascript-remove-strings-in-beginning-and-end#19135220
	// let note = children.toString().trim().replace(/(^\(|\)$)/mg, '');

	// // add a period at the end of the note text, if there isn't one.
	// if (note.slice(-1) !== '.') note = note.concat('.');

	// // add to sidenote count model so each gets a unique number
	// sidenotes.increment();

	// return `
	// 	<jp-sidenote
	// 		id="sidenote-${sidenotes.getCount()}"
	// 		number="${sidenotes.getCount()}"
	// 	>
	// 		<span class="fallback">(Note: </span>${sentenceCase(note)}<span class="fallback">)</span>
	// 	</jp-sidenote>
	// `;

	// if the 'inline' option is true, render without surrounding p tag
	// and leave out block-level plugins (e.g. footnotes)
	return inline ? marked.parseInline(content) : marked.parse(content);
}
