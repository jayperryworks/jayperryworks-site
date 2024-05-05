// On request:
// 1. Pull books records from Prismic/CMS
// 2. Loop through them and check to see if each has metadata in the blob
// 3. If so, continue
// 4. If not, connect the OpenLibrary API and query for the book's ISBN
// 5. Add the book's info to the blob
// 6. Download its cover image, make versions, and save to the blob (or maybe do this on Astro?)
