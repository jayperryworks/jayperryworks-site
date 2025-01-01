import { getStore } from '@netlify/blobs';

const contactEmail = process.env.CONTACT_EMAIL;

/**
 * Download a file and convert it to an ArrayBuffer
 * hat tip to https://sabe.io/blog/node-download-image
 *
 * @async
 * @param {string} url - the address of the file to download (w/o extension or size suffix)
 * @param {string} outputPath - the path where the local file should be written
 * @param {string} filename - name of the output file
 * @returns {ArrayBuffer}
 */
async function downloadFile(url) {
	try {
		const response = await fetch(
			`${url}-L.jpg?default=false`,
			{
				headers: { 'User-Agent': `JayPerryWebsite/5.0 (${contactEmail})` }
			}
		);

		if (response.status === 200) {
			const blob = await response.blob();
			return await blob.arrayBuffer();
		}

		return false;
	} catch(error) {
		console.log(error);
	}
}

/**
 * Query OpenLibrary for a book's cover image and store it in a Netlify Blob
 *
 * @export
 * @async
 * @param {Object} request
 * @param {String} request.url - the endpoint url, with query string
 * @param {Object} context
 * @param {Number} context.isbn - the book's ISBN number
 * @param {String} context.olid - the book's OLID number
 * @returns {unknown}
 */
export default async function(request, context) {
	const { isbn, olid } = context.params;
	const id = isbn || olid;
	const { searchParams } = new URL(request.url);
	const update = searchParams.get('update');
	const headers = { 'Content-Type': 'image/jpeg' };

	// store of cached book covers
	const store = getStore({ name: 'bookCovers' });
	const cachedCover = await store.get(id, { type: 'arrayBuffer' });

	// if the cover has already been stored
	if (!update && cachedCover) {
		return new Response(
			cachedCover,
			{ headers },
		);
	}

	// otherwise, download it, store, and return in the response
	const url = isbn
		? `https://covers.openlibrary.org/b/isbn/${isbn}`
		: `https://covers.openlibrary.org/b/olid/${olid}`;

	const file = await downloadFile(url);

	if (file) {
		await store.set(id, file);

		return new Response(
			file,
			{ headers },
		);
	}

	// if the image can't be downloaded from OpenLibrary, return an error
	return new Response(
		'Error: this image is not available on OpenLibrary.',
		{
			status: 404,
			headers: {
				'Content-Type': 'text/plain',
			},
		}
	);
}

export const config = {
	path: [
		'/books/covers/isbn/:isbn',
		'/books/covers/olid/:olid',
	],
};
