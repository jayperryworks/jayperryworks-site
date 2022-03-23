import { camelCase, paramCase } from 'change-case';

// cheers to https://joshtronic.com/2016/02/14/how-to-capitalize-the-first-letter-in-a-string-in-javascript/
export function titleize (string) {
	return string.replace(/^\w/, c => c.toUpperCase());
}

export function sentenceCase (string) {
	return `${string.charAt(0).toUpperCase()}${string.slice(1)}`;
}

// convert an array to a sentence
// -> adds an oxford comma
// -> ['first', 'Second'] => First and second
// -> ['first', 'Second', 'THIRD'] => First, second, and third
export function arrayToSentence (array, { period = true } = {}) {
	const end = period ? '.' : '';

	// Adjust the case for each string
	// and prepend 'and' to the last item if there's more than 1 item
	array = array.map((string, index) => {
		if (index === 0) return sentenceCase(string);
		if (index === array.length - 1) return `and ${string.toLowerCase()}${end}`;
		return string.toLowerCase();
	});

	// add commas if there are more than 2 items
	return (array.length > 2) ? array.join(', ') : array.join(' ');
}

export { camelCase, paramCase };
