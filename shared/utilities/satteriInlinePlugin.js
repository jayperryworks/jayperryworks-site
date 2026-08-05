import { markdownToHtml, defineMdastPlugin } from 'satteri';

// strip wrapping paragraphs away so text renders inline
export default defineMdastPlugin({
	name: 'inline-text',
	options: { position: false },
	paragraph(node) {
		return node.children[0];
	},
});
