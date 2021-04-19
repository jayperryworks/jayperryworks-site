module.exports = ({ required = false } = {}) => {
	return {
		label: 'Call to action',
		name: 'cta',
		widget: 'object',
		required,
		fields: [
			{
				label: 'Label',
				name: 'label',
				widget: 'string'
			},
			{
				label: 'Link',
				name: 'link',
				widget: 'string'
			}
		]
	}
}