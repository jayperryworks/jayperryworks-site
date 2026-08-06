/**
 * @description Satteri plugin: Render a footnote annotation for any matching string: [^ (id) ]
 * @module
 * @exports
 * @file
 */

import { markdownToHtml, defineMdastPlugin, defineHastPlugin } from 'satteri';
import * as sidenotes from '@shared/lib/sidenotes';

let counter = 0;

/**
 * Render the raw HTML for a footnote reference with the ID and index
 *
 * @function
 * @param {string | number} id
 * @param {number} index
 * @returns {string}
 */
function template(id, index) {
	return `<a class="footnote-reference" href="#note-${id}" id="reference-${id}"><sup>${index}</sup></a>`;
}

// strip wrapping paragraphs away so text renders inline
export default defineHastPlugin({
	name: 'footnote-annotations',
	options: { position: false },
	text(node, ctx, parent) {
		// the pattern for a footnote annotation: [^ (id string) ]
		const pattern = /\[\^([^\]]+)\]/g;
		// an array of strings that match the above pattern
		const matches = [...node.value.matchAll(pattern)];

		if (matches.length === 0) return;

		// the 'cursor' records the starting position for each chunk before and after the matched string
		let cursor = 0;

		// for each match, insert the preceeding part (text chunk) and match as nodes in this context
		for (const match of matches) {
			counter += 1;
			const id = match[1];

			// add the preceeding part as a new node
			if (match.index > cursor) {
				ctx.insertBefore(node, {
					type: 'text',
					value: node.value.slice(cursor, match.index),
				});
			}

			// add the match as a new node
			ctx.insertBefore(node, {
				type: 'raw',
				value: template(id, counter),
			});

			// advance the cursor to the position at the end of the match string
			cursor = match.index + match[0].length;
		}

		// if there's non-matching text remaining after the cursor, add it to the parts array
		if (node.value.length > cursor) {
			ctx.insertBefore(node, {
				type: 'text',
				value: node.value.slice(cursor),
			});
		}

		// finally, remove the old node, since we've replaced it with the chunks we inserted above
		ctx.removeNode(node);
	},
});
