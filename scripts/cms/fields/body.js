const types = [
	require('../blocks/figure.js'),
	require('../blocks/gallery.js'),
	require('../blocks/heading.js'),
	require('../blocks/note.js'),
	require('../blocks/passage.js'),
	require('../blocks/sectionStart.js'),
	require('../blocks/table.js')
]

module.exports = ({ required = false } = {}) => {
	return {
		label: 'Body blocks',
		name: 'body',
		widget: 'list',
		required,
		types
	}
}