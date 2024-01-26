// Global markdown renderer for the 'generate' utils
import { marked } from 'marked';
import markedFootnote from 'marked-footnote';
import markedSmartyPants from 'marked-smartypants-lite';

// sidenote custom element
import * as sidenotes from '@lib/model/sidenotes';

export default function render(
	content: string,
	{
		inline = false,
		html = false,
		footnotes = false,
	} = {},
): string {
	// markdown-it options
	const renderOptions = {
		gfm: true,
	};

	// https://marked.js.org/using_pro#renderer
	const renderer = {
		link(href, title, text) {
			if (href.includes('http')) {
				// add target=_blank attr
			}
		},
		footnote() {
			// need to figure out what params it accepts and how to overwrite it
		},
	};

	// https://github.com/bent10/marked-extensions/tree/main/packages/footnote
	marked.use(
		markedSmartyPants(),
		markedFootnote(),
		renderOptions,
		{ renderer }
	);

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
	return inline
		? markdown(renderOptions).renderInline(content)
		: blockRenderer.render(content);
}
