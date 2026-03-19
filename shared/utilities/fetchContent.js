/**
 *
 * @param {string} endpoint - path to the api endpoint, e.g. 'books'
 * @param {'prod'|'dev'} env - which server env to fetch from - defaults to local for dev, live server for prod
 * @returns {object | Error}
 */
export default async function (endpoint, options = {}) {
	const { env = 'prod' } = options;

	const apiURL =
		env === 'prod' ? import.meta.env.CONTENT_API_URL : 'http://jpw-api.test';
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
