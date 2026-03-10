/**
 *
 * @param {string} endpoint - path to the api endpoint, e.g. 'books'
 * @returns {JSON | Error}
 */
export default async function (endpoint) {
	const apiURL = import.meta.env.CONTENT_API_URL;
	const apiToken = import.meta.env.CONTENT_API_TOKEN;

	try {
		const request = await fetch(`${apiURL}/${endpoint}/`, {
			headers: {
				Authorization: `Bearer ${apiToken}`,
			},
		});
		return await request.json();
	} catch (error) {
		console.error('Failed to fetch book data:', error);
	}
}
