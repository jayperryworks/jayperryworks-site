import { visit } from 'unist-util-visit';

export default function remarkJPFootnotes() {
	return (tree) => {
		visit(tree, (node) => {
			console.log(node);
		});
	};
}
