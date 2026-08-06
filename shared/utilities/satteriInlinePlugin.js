/**
 * @description Satteri plugin: Strip wrapping paragraphs away so text renders inline
 * @module
 * @exports
 */

import { markdownToHtml, defineMdastPlugin } from 'satteri';

export default defineMdastPlugin({
	name: 'inline-text',
	options: { position: false },
	paragraph(node) {
		return node.children[0];
	},
});
