module.exports = ({
	options = [
		'xnarrow',
	  'narrow',
	  'default',
	  'wide'
	],
	hint = 'Specify how wide this block should be, relative to the page layout.',
	defaultValue = 'default'
} = {}) => {
	return {
		label: 'Prominence',
    name: 'prominence',
    widget: 'select',
    required: false,
    default: defaultValue,
    hint,
    options
	}
}