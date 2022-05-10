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
	period?: boolean;
};

function arrayToSentence(
	array: Array<string>,
	{ period = true }: arrayToSentenceOptions,
): string {
	// Adjust the case for each string
	return array.reduce((result: Array<string>, string: string, index: number) => {
		if (index === 0) {
			result.push(sentenceCase(string));
			return result;
		}

		if (index === array.length - 1) {
			// and prepend 'and' to the last item
			result.push(`and ${string.toLowerCase()}${period ? '.' : ''}`);
			return result;
		}

		result.push(string.toLowerCase());
		return result;
	}, []).join(array.length > 2 ? ', ' : ' ');
}

export {
	arrayToSentence,
	camelCase,
	paramCase,
	sentenceCase,
	titleCase,
};
