module.exports = ({
	name = 'caption',
	required = false
} = {}) => {
	return {
		label: 'Caption',
		name,
		widget: 'markdown',
		modes: [ 'raw' ],
		minimal: true,
		required
	}
}