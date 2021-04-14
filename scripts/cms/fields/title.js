module.exports = ({ required = true } = {}) => {
	return {
		label: 'Title',
		name: 'title',
		widget: 'string',
		required
	}
}