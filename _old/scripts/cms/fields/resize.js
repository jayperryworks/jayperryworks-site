module.exports = ({
	label = 'Optimize the image(s)',
	defaultValue = false
} = {}) => {
	return {
	  label,
	  name: 'resize',
	  widget: 'boolean',
	  default: defaultValue
	}
}