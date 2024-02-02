import { visit } from 'unist-util-visit';
import { Root } from 'mdast';

export default function remarkJPFootnotes() {
	return (tree: Root) => {
		visit(tree, (node) => {
			console.log(node);
		});
	};
}
