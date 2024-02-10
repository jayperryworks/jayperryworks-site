// Global markdown renderer for the 'generate' utils
import { unified } from 'unified';
import remarkParse from 'remark-parse';
import remarkGFM from 'remark-gfm';
import rehypeStringify from 'rehype-stringify';
import remarkRehype from 'remark-rehype';
import remarkJPFootnotes from './remarkJPFootnotes.ts';

// probably the best option:
// - the custom element is repeatable for each and keeps it out of the global namespace
// - will need to modify the output anyway to use global numbering
// const option1 = `
// 	<sup>
// 		<jp-sidenote>
// 			<a href="footnote-${sidenotes.getCount()}">${sidenotes.getCount()}</a>
// 		</jp-sidenote>
// 	</sup>
// `;

// simplest but will still need global numbering
// - except that we need to hide the footnotes at the bottom, so maybe we need BOTH a wrapper and individual elements?
// const option2 = `
// 	<jp-sidenotes>
// 		<p>Lorem ipsum dolor sit amet<sup><a href="#footnote-1">1</a></sup></p>

// 		<aside>
// 			<h2>Footnotes</h2>
// 			<ul>
// 				<li>1. Note lorem ipsum</li>
// 			</ul>
// 		</aside>
// 	</jp-sidenotes>
// `;

export default async function render(
	content: string,
	{
		inline = false,
	} = {},
): Promise<string> {
	const result = await unified()
		.use(remarkParse)
		.use(remarkGFM)
		.use(remarkRehype)
		.use(rehypeStringify)
		// .use(remarkJPFootnotes)
		.process(content);

	// console.log(result.toString());
	return result.toString();

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
	// return inline ? marked.parseInline(content) : marked.parse(content);
}
