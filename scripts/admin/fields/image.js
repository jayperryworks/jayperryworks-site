module.exports = ({ required = true } = {}) => {
	return {
		label: 'Image',
		name: 'image',
		widget: 'image',
		required
	}
}