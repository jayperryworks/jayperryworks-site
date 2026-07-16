import { markdownToHtml, defineMdastPlugin } from 'satteri';

// strip wrapping paragraphs away so text renders inline
export default defineMdastPlugin({
	name: 'inline-text',
	paragraph(node) {
		return node.children[0];
	},
});
