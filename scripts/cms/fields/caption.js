module.exports = ({
	name = 'caption',
	required = false
} = {}) => {
	return {
		label: 'Caption',
		name,
		widget: 'markdown',
		minimal: true,
		required
	}
}