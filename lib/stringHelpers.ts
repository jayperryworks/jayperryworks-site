import { camelCase, paramCase } from 'change-case';

// cheers to https://joshtronic.com/2016/02/14/how-to-capitalize-the-first-letter-in-a-string-in-javascript/
function titleCase(string: string): string {
	return string.replace(/^\w/, (c) => c.toUpperCase());
}

function sentenceCase(string: string): string {
	return `${string.charAt(0).toUpperCase()}${string.slice(1)}`;
}

// convert an array to a sentence
// -> adds an oxford comma
// -> ['first', 'Second'] => First and second
// -> ['first', 'Second', 'THIRD'] => First, second, and third
type arrayToSentenceOptions = {
	period?: boolean; // add a period at the end
};

function arrayToSentence(
	array: string[],
	{ period = true }: arrayToSentenceOptions,
): string {
	// Adjust the case for each string
	return array.reduce((
		result: string[],
		string: string,
		index: number,
	) => {
		if (index === 0) {
			result.push(sentenceCase(string));
			return result;
		}

		if (index === array.length - 1) {
			// prepend 'and' to the last item
			result.push(`and ${string.toLowerCase()}${period ? '.' : ''}`);
			return result;
		}

		result.push(string.toLowerCase());
		return result;
	}, []).join(array.length > 2 ? ', ' : ' ');
}

// add a non-breaking space between the last two words of a string
function removeWidows(string: string): string {
	const words = string.split(' ');

	if (words.length > 2) {
		return words.reduce((result, word, index) => (
			result + (index < words.length - 1 ? ' ' : '&nbsp;') + word
		));
	}

	return string;
}

export {
	arrayToSentence,
	camelCase,
	paramCase,
	removeWidows,
	sentenceCase,
	titleCase,
};
