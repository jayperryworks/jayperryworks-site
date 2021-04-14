module.exports = ({
	label = 'Content',
	name = 'markdown',
	required = false
} = {}) => {
	return {
		label,
		name,
		widget: 'markdown',
		required
	}
}