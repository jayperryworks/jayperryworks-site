/**
 * Generate the url to transform the image to a given width
 * TODO: add format transformations, somehow
 *
 * @function
 * @param {number} width
 * @returns {string}
 */
export function getImageUrl(id, width) {
	// get the url string based on which environment we're using
	const host = import.meta.env.DEV
		? import.meta.env.LOCAL_DEV_URL
		: import.meta.env.CONTENT_API_URL;

	return `${host}/thumbs/${id}?width=${width}`;
}
