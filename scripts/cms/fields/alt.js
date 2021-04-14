module.exports = ({ required = false } = {}) => {
	return {
	  label: 'Alt',
	  name: 'alt',
	  widget: 'string',
	  required,
	  hint: 'Add an alt attribute to describe the image for screen readers, etc.'
	}
}