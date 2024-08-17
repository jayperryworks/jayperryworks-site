// run `netlify dev` to test locally

// On request:
// 1. Check to see if a blob exists for the book UID
// 3. If so, return it as JSON
// 4. If not, connect the OpenLibrary API and query for the book's ISBN/OLID
// 5. Add the book's info to the blob under the given UID
// 6. Download its cover image, make versions, and save to the blob
// 7. Send the books data as JSON as response

/**
 * @typedef {Object} OpenLibraryData
 * @property {String} url - OpenLibrary URL
 * @property {String} publishDate - publish date for this edition
 * @property {String} cover - url of the cover image
 * @property {String} publisher - name of the publisher
 * @property {Boolean} hasOpenLibraryData - flag: have we successfully loaded OL data?
 */

/**
 * @typedef {Object} Book
 * @property {String} uid - unique identifier for the book
 * @property {Object} uid.actions - links to buy/view/borrow the book
 * @property {String} uid.actions.purchase - url to buy the book, e.g. Bookshop.org
 * @property {String} uid.actions.openLibrary - url to find the book on OpenLibrary
 * @property {Boolean} uid.hasOpenLibraryData - flag: have we successfully loaded OL data?
 * @property {Number} uid.isbn - ISBN number
 * @property {Object} uid.relatedContent - related content from Prismic
 * @property {String[]} uid.tags - list of tags for the book
 * @property {String} uid.author - author's name
 * @property {String} uid.cover - url of the cover image
 * @property {String} uid.olid - OpenLibrary ID
 * @property {String} uid.publishDate - publish date for this edition
 * @property {String} uid.publisher - name of the publisher
 * @property {String} uid.title - title of the book
 */

import * as prismicHelpers from '@prismicio/helpers';
import * as prismic from '@prismicio/client';
import { format } from 'date-fns';
import { getStore } from '@netlify/blobs';

const prismicEndpoint = process.env.PRISMIC_REPOSITORY;
const prismicToken = process.env.PRISMIC_TOKEN;
const contactEmail = process.env.CONTACT_EMAIL;

/**
 * Try to fetch book data from OpenLibrary
 *
 * @async
 * @param {Object} data - book data needed to reach OL endpoints
 * @param {Number} [data.isbn] - the book's ISBN number
 * @param {String} [data.olid] - the book's Open Library ID
 * @returns {OpenLibraryData}
 */
async function queryOpenLibraryData(data) {
	const {
		isbn,
		olid,
	} = data;

	// -> if there's an isbn number, use OL's ISBN api endpoint
	// -> if not, use OL's ID number in their regular book search api
	const openLibraryEndpoint = isbn
		? `https://openlibrary.org/isbn/${isbn}.json`
		: `https://openlibrary.org/books/${olid}.json`;

	const openLibraryHeaders = {
		'User-Agent': `JayPerryWebsite/5.0 (${contactEmail})`,
	};

	// Open Library API docs: https://openlibrary.org/dev/docs/api/books
	const openLibraryResponse = await fetch(
		openLibraryEndpoint,
		{ headers: openLibraryHeaders },
	);

	if (openLibraryResponse.status === 200) {
		const openLibraryData = await openLibraryResponse.json();

		const {
			publish_date,
			publishers,
			covers: coverList,
			key,
		} = openLibraryData;

		return {
			url: `https://openlibrary.org${key}`,
			publishDate: publish_date && format(new Date(publish_date), 'yyyy'),
			cover: coverList && coverList[0],
			publisher: publishers?.length > 0 ? publishers[0] : undefined,
			hasOpenLibraryData: true,
		};
	}

	return { hasOpenLibraryData: false };
}

/**
 * Return JSON data from the 'books' blob
 *
 * @export
 * @async
 * @returns {Bookstore}
 */
export default async function() {
	// store of cached book data
	const bookStore = getStore('books');

	const prismicClient = prismic.createClient(
		prismic.getRepositoryEndpoint(prismicEndpoint),
		{ accessToken: prismicToken },
	);

	const booksResponse = await prismicClient.getAllByType('book', {
		orderings: {
			field: 'my.book.uid',
			direction: 'asc',
		},
	});

	await Promise.all(booksResponse.map(async ({
		uid,
		tags,
		data,
	}) => {
		const cachedBook = await bookStore.get(uid);

		// if the book already exists in the cache (blob)...
		if (cachedBook) {
			// if the book is cached but does not have OL data...
			if (!cachedBook.hasOpenLibraryData) {
				// query openlibrary for data and add it
				const openLibraryData = await queryOpenLibraryData(data);
				console.log('no OL data', cachedBook.data);

				const actions = {
					...cachedBook.actions,
					openLibrary: openLibraryData.url,
				};

				delete openLibraryData.url;

				await bookStore.setJSON(uid, {
					...cachedBook,
					...openLibraryData,
					actions,
				});
			}

			// stop and use the cached data
			return;
		}

		const {
			author,
			isbn,
			olid,
			purchase_url: purchaseURL,
			related_content: relatedContent,
			title,
		} = data;

		// format the prismic data if there's an ISBN or OLID available
		if (isbn || olid) {
			let bookData = {
				isbn,
				olid,
				actions: {
					purchase: prismicHelpers.asLink(purchaseURL),
				},
				tags: tags || [],
				author,
				relatedContent,
				title: prismicHelpers.asText(title),
				uid,
			};

			// query the Open Library API
			const openLibraryData = await queryOpenLibraryData(bookData);

			if (openLibraryData) {
				bookData.actions.openlibrary = openLibraryData.url;
				delete openLibraryData.url;

				await bookStore.setJSON(uid, {
					...bookData,
					...openLibraryData,
				});
			}

			// if the request to OpenLibrary fails, just use the data we have
			await bookStore.setJSON(uid, bookData);
		}
	}));


	// const firstBook = books[0];
	// const firstStoreItem = await bookStore.get(firstBook.uid);

	// if (!firstStoreItem) {
	// 	await bookStore.setJSON(firstBook.uid, { ...firstBook });
	// }

	return new Response(
		JSON.Stringify(await bookStore.list()),
		{
			status: 200,
			headers: {
				'Content-Type': 'application/json'
			},
		},
	);
}
