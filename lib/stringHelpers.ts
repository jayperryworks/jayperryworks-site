import { camelCase, paramCase } from 'change-case';

// cheers to https://joshtronic.com/2016/02/14/how-to-capitalize-the-first-letter-in-a-string-in-javascript/
function titleCase(string: string): string {
	return string.replace(/^\w/, (c) => c.toUpperCase());
}

function sentenceCase(string: string): string {
	return `${string.charAt(0).toUpperCase()}${string.slice(1)}`;
}

function truncate(string: string, length = 5): string {
	if (string?.length > 0) {
		return string.split(' ').splice(0, length).join(' ').concat('...');
	}

	return '';
}

// convert an array to a sentence
// -> adds an oxford comma
// -> ['first', 'Second'] => First and second
// -> ['first', 'Second', 'THIRD'] => First, second, and third
type arrayToSentenceOptions = {
	period?: boolean; // add a period at the end
	capitalize?: boolean;
};

function arrayToSentence(
	array: string[],
	options: arrayToSentenceOptions = {},
): string {
	// default values for options argument
	const {
		period = true,
		capitalize = true,
	} = options;

	// Adjust the case for each string
	return array.reduce((
		result: string[],
		string: string,
		index: number,
	) => {
		if (index === 0) {
			result.push(capitalize ? sentenceCase(string) : string);
			return result;
		}

		if (index === array.length - 1) {
			// prepend 'and' to the last item
			result.push(`and ${string}${period ? '.' : ''}`);
			return result;
		}

		result.push(string);
		return result;
	}, []).join(array.length > 2 ? ', ' : ' ');
}

// add a non-breaking space between the last two words of a string
function removeWidows(string: string, minWordCount = 4): string {
	const words = string.split(' ');

	if (words.length >= minWordCount) {
		return words.reduce((
			result: string,
			word: string,
			index: number,
		): string => {
			const separator = (index < words.length - 1) ? ' ' : '&nbsp;';
			return result + separator + word;
		});
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
	truncate,
};
