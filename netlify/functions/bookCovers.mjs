import { getStore } from '@netlify/blobs';

/**
 * Download a file and write it to a local folder
 *
 * @async
 * @param {string} url - the file to download
 * @param {string} outputPath - the path where the local file should be written
 * @param {string} filename - name of the output file
 * @returns {ArrayBuffer}
 */
async function downloadFile(url) {
	// https://sabe.io/blog/node-download-image
	try {
		const response = await fetch(url);
		const blob = await response.blob();
		return await blob.arrayBuffer();
	} catch(error) {
		console.log(error);
	}
}

/**
 * Format the data for the book cover
 *
 * @param {String[]} covers
 * @returns {{
* 	small: string;
* 	medium: string;
* 	large: string;
* }}
*/
async function setCover(uid, filename) {
	const original = `https://covers.openlibrary.org/b/id/${filename}`;

	// const file = await fetch(original);
	const file = await downloadFile(original);
	console.log(uid, file);

	const coverStore = getStore({ name: 'bookCovers' });
	await coverStore.set(uid, file);

	return {
		original,
		filename,
	};
}

export default async function(request, context) {
	const { isbn, olid } = context.params;
	const key = isbn || olid;
	const headers = { 'Content-Type': 'image/jpeg' };

	// store of cached book covers
	const store = getStore({ name: 'bookCovers' });
	const cachedCover = await store.get(key);

	// if the cover has already been stored
	if (cachedCover.status === 200) {
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
	await store.set(key, file);

	return new Response(
		file,
		{ headers },
	);
}

export const config = {
	path: [
		'/books/covers/isbn/:isbn',
		'/books/covers/olid/:olid',
	],
};
