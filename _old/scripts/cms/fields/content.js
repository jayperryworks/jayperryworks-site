module.exports = ({
	label = 'Content',
	name = 'markdown',
	required = false
} = {}) => {
	return {
		label,
		name,
		widget: 'markdown',
		modes: ['raw' ],
		buttons: [],
		required
	}
}