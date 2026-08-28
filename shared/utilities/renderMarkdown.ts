// Global markdown renderer for the 'generate' utils
import { unified } from 'unified';
import rehypeStringify from 'rehype-stringify';
import remarkGFM from 'remark-gfm';
import remarkParse from 'remark-parse';
import remarkRehype from 'remark-rehype';
import remarkSmartypants from 'remark-smartypants';
import remarkJPFootnotes from './remarkJPFootnotes.js';
import remarkJPInline from './remarkJPInline.js';
import remarkJPExternalLink from './remarkJPExternalLink.js';
import rehypeRaw from 'rehype-raw';
import rehypeSanitize from 'rehype-sanitize';

/**
 * @typedef {object} Options
 * @prop {boolean} [inline=false] - if 'inline' is true, surrounding p tags will be removed.
 * @param {boolean} [footnotes=false] if 'footnotes' is true, footnotes will be added
 * @param {boolean} [html=false] all unescaped, inline html markup
 */

/**
 * Render markdown text to HTML
 *
 * @function
 * @export
 * @async
 * @param {string} content - markdown-formatted text
 * @param {Options} [options={}] - options object
 * @returns {Promise<string>} HTML template
 */
export default async function render(content, options = {}) {
	const { inline = false, footnotes = false, html = false } = options;

	const result = await unified()
		.use(remarkParse)
		.use(remarkGFM)
		.use(remarkSmartypants)
		.use(remarkRehype, { allowDangerousHtml: html })
		.use(rehypeRaw)
		.use(rehypeSanitize)
		.use(rehypeStringify)
		.use(remarkJPExternalLink)
		.use(remarkJPInline, { renderInline: inline })
		// .use(remarkJPFootnotes, { renderFootnotes: footnotes })
		.process(content);

	return result.toString();
}
