module.exports = ({ defaultValue = false } = {}) => {
	return {
		label: 'Use in excerpt',
	  name: 'useInExcerpt',
	  widget: 'boolean',
	  default: defaultValue,
	  hint: 'Include this section in the post excerpt?'
	}
}