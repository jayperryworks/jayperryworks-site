/**
 * @fileoverview Custom markup for footnotes
 * @description Wrap footnote references in a custom element
 * - based on this excellent tutorial: https://www.ryanfiller.com/blog/remark-and-rehype-plugins/
 */

// utils
import { visit } from 'unist-util-visit';

// model
import * as sidenotes from '@lib/model/sidenotes';

export default function remarkJPFootnotes() {
	return (tree) => {
		visit(
			tree,
			{ tagName: 'sup' },
			(node) => {
				sidenotes.increment();

				// find the anchor tag referring to the footnote...
				const anchor = node.children.find(({ tagName }) => tagName === 'a');
				// ...and add a 'label' class to it
				anchor.properties.class = 'sidenote-label';
				// ... then change its text value to the global sidenote index
				const anchorText = anchor.children.find(({ type }) => type === 'text');
				anchorText.value = sidenotes.getCount().toString();

				// replace the children prop with my custom element
				// and assign the original children to it
				node.children = [
					{
						type: 'element',
						tagName: 'jp-sidenote-markdown',
						properties: {
							id: `sidenote-${sidenotes.getCount()}`,
							number: sidenotes.getCount(),
						},
						children: node.children,
					}
				];
			}
		);
	};
}
