import { camelCase, paramCase } from 'change-case';

/**
 * Convert a string to Title Case
 * - cheers to https://joshtronic.com/2016/02/14/how-to-capitalize-the-first-letter-in-a-string-in-javascript/
 *
 * @param {string} string - the string to convert to title case
 * @returns {string}
 */

function titleCase(string: string): string {
	return string.replace(/^\w/, (c) => c.toUpperCase());
}


/**
 * Convert a string to Sentence case (inital letter capitalized)
 *
 * @param {string} string - the string to convert
 * @returns {string}
 */
function sentenceCase(string: string): string {
	return `${string.charAt(0).toUpperCase()}${string.slice(1)}`;
}


/**
 * Truncate a string to a given number of words
 *
 * @param {string} string - the string to shorten
 * @param {number} [length=5] - how many words to display
 * @returns {string}
 */
function truncate(string: string, length = 5): string {
	if (string?.length > 0) {
		return string.split(' ').splice(0, length).join(' ').concat('...');
	}

	return '';
}


//
// -> adds an oxford comma
// -> ['first', 'Second'] => First and second
// -> ['first', 'Second', 'THIRD'] => First, second, and third

type arrayToSentenceOptions = {
	period?: boolean; // add a period at the end
	capitalize?: boolean;
};

/**
 * Convert an array to a sentence with capitalization, commas, and punctuation.
 * e.g. ['item', 'another item', 'a third item'] => Item, another item, and a third item.
 *
 * @param {string[]} array - the array to convert
 * @param {arrayToSentenceOptions} [options] - configuration
 * @returns {string}
 */
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


/**
 * Add a non-breaking space between the last two words of a string
 *
 * @param {string} string - the string to process
 * @param {number} [minWordCount=4] - how many words are needed for a linebreak
 * @returns {string}
 */
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

// convert an array to a string with 'separator' punctuation after each item
// -> ['--variable: 1', '--another: 2'] -> '--variable: 1; --another: 2;'
// -> removes any falsey or null items
function arrayToPunctatedString(items: string[], separator = ';') {
	return items.reduce((result, item) => {
		if (item) {
			result.push(item.slice(-1) !== separator ? item.concat(separator) : item);
		}

		return result;
	}, []).join(' ');
}

/**
 * Remove article words (a, the, etc.) from the beginning of a string
 * - Helps with alphabetizing, e.g. book titles
 * - Cheers to https://stackoverflow.com/questions/34347008/how-can-i-sort-a-javascript-array-while-ignoring-articles-a-an-the
 *
 * @param {string} string - the string to process
 * @returns {string} - the string, with article words removed
 */
function removeArticles(string: string): string {
	const articles = [
		'a',
		'the',
		'an',
	];
	let words = string.toLowerCase().split(' ');

	if (words.length <= 1) return string;

	for (const article of articles) {
		if (words[0] === article) words.shift();
	}

	return words.join(' ');
}

export {
	arrayToPunctatedString,
	arrayToSentence,
	camelCase,
	paramCase,
	removeArticles,
	removeWidows,
	sentenceCase,
	titleCase,
	truncate,
};
