module.exports = ({ required = false } = {}) => {
	return {
		label: 'Tags',
		name: 'tags',
		widget: 'list',
		required
	}
}