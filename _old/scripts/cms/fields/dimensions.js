const { titleize } = require('../../../src/utils/stringHelpers.js')

module.exports = ({ props = [ 'width', 'height'] } = {}) => {
	return props.map((prop) => {
		return {
			label: titleize(prop),
			name: prop,
			hint: `${titleize(prop)}, in inches`,
			widget: 'number',
			valueType: 'int',
			required: false			
		}
	})
}
