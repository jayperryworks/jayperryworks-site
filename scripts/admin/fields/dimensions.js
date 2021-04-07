const { titlelize } = require('../../../src/utils/stringHelpers.js')

module.exports = (props = [ 'width', 'height']) => {
	return props.map(prop => {
		return {
			label: titlelize(prop),
			name: prop,
			hint: `Physical ${prop}, in inches`,
			widget: 'number',
			valueType: 'int',
			required: false			
		}
	}
}