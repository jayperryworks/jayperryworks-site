/**
 * @fileoverview Query OpenLibrary for data about a book and then store it in a Netlify Blob
 * - run `netlify dev`/ `npm run netlify` to test locally
 * - use the netlify port (~8888), not the Astro one
 */

import { format } from 'date-fns';
import { getStore } from '@netlify/blobs';

const contactEmail = process.env.CONTACT_EMAIL;

/**
 * Get the query string parameters from a url
 *
 * @param {string} url - a full, valid url
 * @returns {{
 * 	uid: string,
 * 	isbn?: string,
 * 	olid?: string,
 * 	update?: boolean,
 * }}
 */
function getURLParams(url) {
	const { searchParams } = new URL(url);
	return {
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
 * @typedef {Object} Book
 * @property {String} url - OpenLibrary URL
 * @property {String} publishDate - publish date for this edition
 * @property {String} publisher - name of the publisher
 */

/**
 * @typedef {Object} Key
 * @prop {Number} [isbn] - the book's ISBN number
 * @prop {String} [olid] - the book's Open Library ID
 */

/**
 * Try to fetch book data from OpenLibrary
 *
 * @async
 * @param {Key} - book data needed to reach OL endpoints
 * @returns {Book}
 */
async function queryOpenLibraryData({ isbn, olid }) {

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
			key,
		} = openLibraryData;

		return {
			data: {
				url: `https://openlibrary.org${key}`,
				publishDate: publish_date && format(new Date(publish_date), 'yyyy'),
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
export default async function(request, context) {
	const { isbn, olid } = context.params;
	const { update } = getURLParams(request.url);
	const key = isbn || olid;
	const headers = { 'Content-Type': 'application/json' };

	// store of cached book data
	const bookStore = getStore('books');
	const cachedBook = await bookStore.getWithMetadata(key);

	// if the book exists in the cache (blob)
	// and OpenLibrary successfully responded with data...
	if (!update && cachedBook?.metadata?.status == '200') {
		const { data, metadata } = cachedBook;
		// ...return the cached data in a response
		return new Response(
			JSON.stringify(data),
			{
				...metadata,
				headers,
			},
		);
	}

	// if the book doesn't exist in the cache,
	// query OpenLibrary for data and add it
	const { data, metadata } = await queryOpenLibraryData({ isbn, olid });
	await bookStore.setJSON(key, data, { metadata });

	return new Response(
		JSON.stringify(data),
		{
			...metadata,
			headers,
		},
	);
}

export const config = {
	path: [
		'/books/data/isbn/:isbn',
		'/books/data/olid/:olid',
	]
};
