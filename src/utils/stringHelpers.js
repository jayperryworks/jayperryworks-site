// cheers to https://joshtronic.com/2016/02/14/how-to-capitalize-the-first-letter-in-a-string-in-javascript/
module.exports = {
	titleize: (string) => {
	  return string.replace(/^\w/, c => c.toUpperCase());
	}
}
