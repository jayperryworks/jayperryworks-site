// Global markdown renderer for the 'generate' utils
import markdown from 'markdown-it';

export default function renderMarkdown(
	content,
	options = {},
) {
	const {
		inline = false,
		html = false,
	} = options;

	// markdown-it options
	const renderSettings = {
		typographer: true,
		html,
	};

	// Modify the output rules for footnotes
	const blockRenderer = markdown(renderSettings);

	// if the 'inline' option is true, render without surrounding p tag
	// and leave out block-level plugins (e.g. footnotes)
	return inline
		? markdown(renderSettings).renderInline(content)
		: blockRenderer.render(content);
}
