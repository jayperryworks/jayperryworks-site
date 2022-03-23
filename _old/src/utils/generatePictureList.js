const { format } = require('date-fns');
const { query, queryAll, getImageVersions } = require('./prismicQuery.js');
const calculateAspectRatio = require('calculate-aspect-ratio');

module.exports = async (groupBy = null) => {
	// query all pictures from Prismic
	const listData = await queryAll({
		fieldString: `
			title
			cover
			date_completed
			_meta {
				id
				uid
			}
			series {
				... on Picture_series {
					_meta {
						uid
						id
					}
				}
			}
		`
	});

	// clean up the data to build an array of pictures
	let pictures = listData.map(({ node }) => {
		let picture = {};

		picture.title = node.title?.[0]?.text;
		picture.yearCompleted = format(new Date(node.date_completed), 'yyyy');
		picture.path = `/pictures/${picture.yearCompleted}/${node._meta.uid}/`;
		picture.slug = node._meta.uid;

		if (node.series) {
			picture.series = node.series._meta.uid;
		}

		// cover image
		if (node.cover) {
			picture.cover = {
				image: getImageVersions(node.cover),
				alt: node.cover.alt
			};
			picture.ratio = calculateAspectRatio(picture.cover.image[0].width, picture.cover.image[0].height).split(':').join('/');
		}

		return picture;
	});

	const picturesWithoutSeries = pictures.filter(picture => !picture.series);

	if (groupBy === 'series') {
		// loop through pictures and clean up the data
		// so it's easier to work with on the client
		let seriesData = await query(`
			query{
				allPicture_seriess {
					edges {
						node {
							title
							description
							_meta {
								uid
								id
							}
						}
					}
				}
			}
		`);

		const picturesBySeries = seriesData.data.allPicture_seriess.edges.map(({ node }) => {
			const { title, description, _meta } = node;
			const seriesPictures = pictures.filter(picture => picture.series === _meta.uid);

			return {
				title: title?.[0]?.text,
				description: description?.[0]?.text,
				ratio: seriesPictures?.[0]?.ratio,
				pictures: seriesPictures
			}
		});

		// add pictures to the array that aren't part of a series
		picturesBySeries.push({ pictures: picturesWithoutSeries });

		return picturesBySeries;
	}

	// sort pictures by series, then by date within each series
	const sortedPictures = pictures
		.filter(p => p.series)
		.sort((a, b) => {
			if (b.series > a.series) {
				return -1;
			};
			return 1;
		})
		.concat(picturesWithoutSeries);

	return sortedPictures;
}
