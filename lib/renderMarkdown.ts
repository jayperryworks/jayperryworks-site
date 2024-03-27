// Global markdown renderer for the 'generate' utils
import { unified } from 'unified';
import rehypeStringify from 'rehype-stringify';
import remarkGFM from 'remark-gfm';
import remarkParse from 'remark-parse';
import remarkRehype from 'remark-rehype';
import remarkJPFootnotes from './remarkJPFootnotes.js';
import remarkJPInline from './remarkJPInline.js';

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


/**
 * Render markdown text to HTML
 * @date 3/1/2024 - 4:53:14 PM
 *
 * @export
 * @async
 * @param {string} content - markdown-formatted text
 * @param {Object} [options={}] - options object
 * @param {boolean} [options.inline=false] if 'inline' is true, surrounding p tags will be removed.
 * @param {boolean} [options.footnotes=false] if 'footnotes' is true, footnotes will be added
 * @returns {Promise<string>} HTML template
 */

export default async function render(content, options = {}) {
	const {
		inline = false,
		footnotes = false,
	} = options;

	const result = await unified()
		.use(remarkParse)
		.use(remarkGFM)
		.use(remarkRehype)
		.use(remarkJPFootnotes, { renderFootnotes: footnotes })
		.use(remarkJPInline, { renderInline: inline })
		.use(rehypeStringify)
		.process(content);

	return result.toString();
}
