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

export default async function (request, context) {
	const prismicEndpoint = process.env.PRISMIC_REPOSITORY;
	const prismicToken = process.env.PRISMIC_TOKEN;

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

	// const books = await Promise.all(booksResponse.map(async ({
	// 	uid,
	// 	tags,
	// 	data,
	// }) => {
	// 	const {
	// 		author,
	// 		isbn,
	// 		olid,
	// 		purchase_url: purchaseURL,
	// 		related_content: relatedContent,
	// 		title,
	// 	} = data;

	// 	// query the Open Library API with the book's ISBN number
	// 	if (isbn || olid) {
	// 		let bookData = {
	// 			actions: [
	// 				{
	// 					label: 'Purchase',
	// 					url: prismicHelpers.asLink(purchaseURL),
	// 					type: 'external'
	// 				},
	// 			],
	// 			tags: tags || [],
	// 			author,
	// 			relatedContent,
	// 			title,
	// 			uid,
	// 		};

	// 		// try to fetch additional data from OpenLibrary
	// 		const queryParams = {
	// 			bibkeys: isbn ? `ISBN:${isbn}` : `OLID:${olid}`,
	// 			format: 'json',
	// 			jscmd: 'data',
	// 		}
	// 		const queryString = Object.keys(queryParams)
	// 			.map((key) => `${key}=${queryParams[key]}`)
	// 			.join('&');

	// 		// Open Library API docs: https://openlibrary.org/dev/docs/api/books
	// 		const openLibraryResponse = await fetch(`http://openlibrary.org/api/books?${queryString}`);

	// 		if (openLibraryResponse.status === 200) {
	// 			const openLibraryData = await openLibraryResponse.json();

	// 			const {
	// 				publish_date,
	// 				publishers,
	// 				cover: coverList,
	// 				url: infoURL,
	// 			} = openLibraryData[queryParams.bibkeys];

	// 			bookData.publishDate = publish_date && format(new Date(publish_date), 'yyyy');
	// 			bookData.cover = coverList && Object.values(coverList).pop();

	// 			bookData.publisher = publishers?.length > 0 && publishers[0].name;

	// 			bookData.actions.unshift({
	// 				label: 'Open Library',
	// 				url: infoURL,
	// 				type: 'external'
	// 			});

	// 			return bookData;
	// 		}

	// 		// if the request to OL fails, just use the data we have from the CMS
	// 		return bookData;
	// 	}
	// }));


	return new Response(JSON.stringify(booksResponse));
}
