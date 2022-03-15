// cheers to https://joshtronic.com/2016/02/14/how-to-capitalize-the-first-letter-in-a-string-in-javascript/
function titleize (string) {
	return string.replace(/^\w/, c => c.toUpperCase());
}

function sentenceCase (string) {
	return `${string.charAt(0).toUpperCase()}${string.slice(1)}`;
}

// convert an array to a sentence
// -> adds an oxford comma
// -> ['first', 'Second'] => First and second
// -> ['first', 'Second', 'THIRD'] => First, second, and third
function arrayToSentence (array, { period = true } = {}) {
	const end = period ? '.' : '';

	// Adjust the case for each string
	// and prepend 'and' to the last item if there's more than 1 item
	array = array.map((string, index) => {
		if (index === 0) return sentenceCase(string);
		if (index === array.length - 1) return `and ${string.toLowerCase()}`;
		return string.toLowerCase();
	});

	// if there's only 2 items, don't add commas
	if (array.length <= 2) {
		return array.join(' ') + end;
	}

	// add commas otherwise, including an oxford comma
	return array.join(', ') + end;
}

module.exports = {
	titleize,
	sentenceCase,
	arrayToSentence
}
