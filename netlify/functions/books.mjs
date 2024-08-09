// run `netlify dev` to test locally

// On request:
// 1. Pull books records from Prismic/CMS
// 2. Loop through them and check to see if each has metadata in the blob
// 3. If so, continue
// 4. If not, connect the OpenLibrary API and query for the book's ISBN
// 5. Add the book's info to the blob
// 6. Download its cover image, make versions, and save to the blob (or maybe do this on Astro?)
// 7. Send the books data as JSON as response

import * as prismicHelpers from '@prismicio/helpers';
import * as prismic from '@prismicio/client';
import { format } from 'date-fns';
import { getStore } from '@netlify/blobs';

const prismicEndpoint = process.env.PRISMIC_REPOSITORY;
const prismicToken = process.env.PRISMIC_TOKEN;
const contactEmail = process.env.CONTACT_EMAIL;

async function queryOpenLibraryData(data = {}) {
	const {
		isbn,
		olid,
	} = data;

	// try to fetch additional data from OpenLibrary
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

export default async function () {
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

	const books = await Promise.all(booksResponse.map(async ({
		uid,
		tags,
		data,
	}) => {
		const cachedBook = await bookStore.getWithMetadata(uid);

		if (cachedBook) {

			if (!cachedBook.hasOpenLibraryData) {
				// query openlibrary for data and add it
				const openLibraryData = await queryOpenLibraryData(data);

				// bookData.actions.openlibrary = openLibraryData.url;
				// delete openLibraryData.url;

				// bookData = {
				// 	...bookData,
				// 	...openLibraryData,
				// };
			}

			return cachedBook;
		}

		const {
			author,
			isbn,
			olid,
			purchase_url: purchaseURL,
			related_content: relatedContent,
			title,
		} = data;

		// query the Open Library API with the book's ISBN number
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

			const openLibraryData = await queryOpenLibraryData(bookData);

			if (openLibraryData) {
				bookData.actions.openlibrary = openLibraryData.url;
				delete openLibraryData.url;

				bookData = {
					...bookData,
					...openLibraryData,
				};
			}

			console.log(bookData);
			// if the request to OL fails, just use the data we have from the CMS
			return bookData;
		}
	}));


	const firstBook = books[0];
	const firstStoreItem = await bookStore.get(firstBook.uid);

	if (!firstStoreItem) {
		await bookStore.setJSON(firstBook.uid, { ...firstBook });
	}

	return new Response(
		JSON.stringify(await bookStore.get(firstBook.uid)),
		{
			status: 200,
			headers: {
				'Content-Type': 'application/json'
			},
		},
	);
}
