import { markdownToHtml, defineMdastPlugin, defineHastPlugin } from 'satteri';

let counter = 0;

function template(id, index) {
	return `<sup class="footnote-annotation"><a href="#${id}">${index}</a></sup>`;
}

/**
 * Taking the wrong approach here?
 * MDAST plugin instead of HAST - better to define a custom node, not raw html
 * find matching text nodes and store a reference
 * delete the matching node
 * append new nodes (parts[] => children[]) to the parent
 */

// strip wrapping paragraphs away so text renders inline
export default defineHastPlugin({
	name: 'footnote-annotations',
	options: { position: false },
	text(node, ctx) {
		// the pattern for a footnote annotation: [^ (id string) ]
		const pattern = /\[\^([^\]]+)\]/g;
		// an array of strings that match the above pattern
		const matches = [...node.value.matchAll(pattern)];

		if (matches.length === 0) return;
		console.log('original node', node);

		// an array of chunks that surround the matched strings
		const parts = [];
		// the 'cursor' records the starting position for each chunk before and after the matched string
		let cursor = 0;

		// for each match, add the preceeding part (text chunk) and match to the parts array
		// parts = [ textChunk, match, textChunk, match, ... ];
		for (const match of matches) {
			counter += 1;
			const id = match[1];

			// add the preceeding part to the array
			if (match.index > cursor) {
				parts.push({
					type: 'text',
					value: node.value.slice(cursor, match.index),
					// position: node.position,
				});
			}

			// add the match to the array
			parts.push({
				type: 'raw',
				value: template(id, counter),
				// position: node.position,
			});

			// advance the cursor to the position at the end of the match string
			cursor = match.index + match[0].length;
		}

		// if there's non-matching text remaining after the cursor, add it to the parts array
		if (cursor < node.value.length) {
			parts.push({
				type: 'text',
				value: node.value.slice(cursor),
				// position: node.position,
			});
		}
		console.log('parts', parts);
		// ctx.replaceNode(node, parts);
	},
});
