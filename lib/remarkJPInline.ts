import { visit, SKIP } from 'unist-util-visit';

export default function remarkJPInline(options) {
	const { renderInline } = options;

	if (renderInline) {
		return (tree) => {
			visit(tree, { tagName: 'p' }, (node, index, parent) => {
				parent.children.splice(index, 1, ...node.children);
				return [SKIP, index];
			});
		};
	}
}
