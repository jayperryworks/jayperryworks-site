import { visit, SKIP } from 'unist-util-visit';

/**
 * Remark plugin: render markdown as 'inline', without surrounding p tags
 * @date 2/28/2024 - 10:49:50 AM
 *
 * @export
 * @param {Object} options
 * @param {boolean} [options.renderInline] pass 'true' to activate this plugin
 * @returns {(tree: any) => void}
 */

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
