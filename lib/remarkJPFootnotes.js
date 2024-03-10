import { visit } from 'unist-util-visit';

// https://www.ryanfiller.com/blog/remark-and-rehype-plugins/
export default function remarkJPFootnotes() {
	return (tree) => {
		visit(
			tree,
			{ tagName: 'sup' },
			(node) => {
				node.children = [
					{
						type: 'element',
						tagName: 'jp-sidenote-markdown',
						children: node.children,
					}
				];
			}
		);
	};
}
