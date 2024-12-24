// run `netlify dev` to test locally
// - use the netlify port, not the astro one

// On request:
// 1. Check to see if a blob exists for the book UID
// 3. If so, return it as JSON
// 4. If not, connect the OpenLibrary API and query for the book's ISBN/OLID
// 5. Add the book's info to the blob under the given UID
// 6. Download its cover image, make versions, and save to the blob
// 7. Send the books data as JSON as response

/**
 * @typedef {Object} Cover
 * @property {string} small - url of the small cover image size
 * @property {string} medium - url of the medium cover image size
 * @property {string} large - url of the large cover image size
 */

/**
 * @typedef {Object} Book
 * @property {String} url - OpenLibrary URL
 * @property {String} publishDate - publish date for this edition
 * @property {Cover} cover - data for the cover image
 * @property {String} publisher - name of the publisher
 * @property {Boolean} hasOpenLibraryData - flag: have we successfully loaded OL data?
 */

import { finished } from 'stream/promises';
import { format } from 'date-fns';
import { getStore } from '@netlify/blobs';
import { Readable } from 'stream';
import fs from 'fs';
import path from 'path';

const contactEmail = process.env.CONTACT_EMAIL;

/**
 * Get the query string parameters from a url
 *
 * @param {string} url - a full, valid url
 * @returns {{
 * 	uid: string;
 * 	isbn?: string;
 * 	olid?: string;
 * }}
 */
function getURLParams(url) {
	const { searchParams } = new URL(url);
	return {
		uid: searchParams.get('uid'),
		isbn: searchParams.get('isbn'),
		olid: searchParams.get('olid'),
		update: searchParams.get('update'),
	};
}

/**
 * Format response headers as an object
 *
 * @param {*} headers - weird iterable format of response headers
 * @returns {{*}} - an object with string keys and values
 */
function formatResponseHeaders(headers) {
	let object = {};

	headers.forEach((value, key) => {
		object[key] = value;
	});

	return object;
}

/**
 * Download a file and write it to a local folder
 *
 * @async
 * @param {string} url - the file to download
 * @param {string} outputPath - the path where the local file should be written
 * @param {string} filename - name of the output file
 * @returns {void}
 */
async function downloadFile(url, outputPath, filename) {
	const destination = `${outputPath}/${filename}`;

	if (!fs.existsSync(destination)) {
		const response = await fetch(url);
		const filestream = fs.createWriteStream(destination, { flags: 'wx' });
		await finished(Readable.fromWeb(response.body).pipe(filestream));
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
async function getCover(covers) {
	// TODO:
	// - download each cover size, save to disk
	// - get width/height for each file
	// - output new url as well as original url
	// [size]: {
	//		original: [OL url],
	// 		cached: [blob url],
	// 		width: [number],
	// 		height: [number],
	// }

	const filename = `${covers[0]}-L.jpg`;
	const original = `https://covers.openlibrary.org/b/id/${filename}`;
	const outputPath = '.netlify/blobs/deploy';
	const local = await downloadFile(original, outputPath, filename);

	return {
		original,
		// local,
	};
}

/**
 * Try to fetch book data from OpenLibrary
 *
 * @async
 * @param {Object} data - book data needed to reach OL endpoints
 * @param {Number} [data.isbn] - the book's ISBN number
 * @param {String} [data.olid] - the book's Open Library ID
 * @returns {Book}
 */
async function queryOpenLibraryData(data) {
	const {
		isbn,
		olid,
	} = data;

	// -> if there's an isbn number, use OL's ISBN api endpoint
	// -> if not, use OL's ID number in their regular book search api
	const endpoint = isbn
		? `https://openlibrary.org/isbn/${isbn}.json`
		: `https://openlibrary.org/books/${olid}.json`;

	const headers = {
		'User-Agent': `JayPerryWebsite/5.0 (${contactEmail})`,
	};

	// Open Library API docs: https://openlibrary.org/dev/docs/api/books
	const openLibraryResponse = await fetch(
		endpoint,
		{ headers },
	);

	const metadata = {
		status: Number(openLibraryResponse.status),
		headers: formatResponseHeaders(openLibraryResponse.headers),
	};

	if (openLibraryResponse.status === 200) {
		const openLibraryData = await openLibraryResponse.json();

		const {
			publish_date,
			publishers,
			covers: coverList,
			key,
		} = openLibraryData;

		return {
			data: {
				url: `https://openlibrary.org${key}`,
				publishDate: publish_date && format(new Date(publish_date), 'yyyy'),
				cover: coverList && await getCover(coverList),
				publisher: publishers?.length > 0 ? publishers[0] : undefined,
			},
			metadata,
		};
	}

	return { metadata };
}

/**
 * Return JSON data from the 'books' blob
 *
 * @export
 * @async
 * @param {object} req - the request object
 * @param {string} req.url - the full URL of the request; needs to contain these query params:
 * 	- uid: UID of the book title, provided by Prismic
 * 	- isbn: the book's ISBN number
 * 		OR
 * 	- olid: the book's OpenLibrary ID
 * @returns {Book}
 */
export default async function(req) {
	const { uid, isbn, olid, update } = getURLParams(req.url);
	const headers = { 'Content-Type': 'application/json' };

	// store of cached book data
	const bookStore = getStore('books');
	const cachedBook = await bookStore.getWithMetadata(uid);

	// if the book exists in the cache (blob)...
	if (!update && cachedBook?.metadata?.status == '200') {
		const { data, metadata } = cachedBook;
		// return the data in a response
		return new Response(
			JSON.stringify(data),
			{
				headers,
				...metadata,
			},
		);
	}

	// if the book doesn't exist in the cache, query openlibrary for data and add it
	const { data, metadata } = await queryOpenLibraryData({ isbn, olid });
	await bookStore.setJSON(uid, data, { metadata });

	return new Response(
		JSON.stringify(data),
		{
			headers,
			...metadata,
		},
	);
}

export const config = {
	path: '/books'
};
