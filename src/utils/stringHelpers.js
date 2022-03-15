// cheers to https://joshtronic.com/2016/02/14/how-to-capitalize-the-first-letter-in-a-string-in-javascript/
module.exports = {
	titleize: (string) => {
	  return string.replace(/^\w/, c => c.toUpperCase());
	},
	sentenceCase: (string) => {
		return `${string.charAt(0).toUpperCase()}${string.slice(1)}`;
	},
	// convert an array to a sentence
	// -> adds an oxford comma
	// -> ['first', 'Second'] => First and second
	// -> ['first', 'Second', 'THIRD'] => First, second, and third
	arrayToSentence: (array, { period = true }) => {
		let string;

		if (array.length <= 2) {
			string = array.map(s => s.toLowerCase()).join(' and ');
		}

		string = array.map((item, index) => {
			const lowercase = item.toLowerCase();
			if (index < array.length - 1) return lowercase;
			return `and ${lowercase}`;
		}).join(', ');

		return period ? `${string}.` : string;
	}
}
