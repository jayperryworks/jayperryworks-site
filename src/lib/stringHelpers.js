import { camelCase, paramCase } from 'change-case';

// cheers to https://joshtronic.com/2016/02/14/how-to-capitalize-the-first-letter-in-a-string-in-javascript/
export function titleize(string) {
	return string.replace(/^\w/, (c) => c.toUpperCase());
}

export function sentenceCase(string) {
	return `${string.charAt(0).toUpperCase()}${string.slice(1)}`;
}

// convert an array to a sentence
// -> adds an oxford comma
// -> ['first', 'Second'] => First and second
// -> ['first', 'Second', 'THIRD'] => First, second, and third
export function arrayToSentence(array, { period = true } = {}) {
	// Adjust the case for each string
	return array.reduce((result, string, index) => {
		/* eslint-disable no-param-reassign */
		// -> appending to the result param to create a string, not reassigning it per se
		if (index === 0) {
			result += sentenceCase(string);
			return result;
		}

		if (index === array.length - 1) {
			// and prepend 'and' to the last item
			result += ` and ${string.toLowerCase()}${period ? '.' : ''}`;
			return result;
		}

		if (array.length > 2) {
			result += `, ${string.toLowerCase()}`;
			return result;
		}

		result += ` ${string.toLowerCase()}`;
		return result;
		/* eslint-enable no-param-reassign */
	}, '').join(array.length > 2 ? ', ' : ' ');
}

export { camelCase, paramCase };
