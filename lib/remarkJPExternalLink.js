import { visit } from 'unist-util-visit';

/**
 * Remark plugin: render external links with a few extra attributes
 * @date 3/27/2024
 *
 * @export
 * @returns {(tree: any) => void}
 */

export default function remarkJPExternalLink() {
	return (tree) => {
		visit(tree, { tagName: 'a' }, (node) => {
			if (node.properties.href.includes('http')) {
				node.properties = {
					target: '_blank',
					rel: 'noopener',
					...node.properties,
				};
			}
		});
	};
}
