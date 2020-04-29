import fs from 'fs'
import generateWritingList from '@/utils/generateWritingList.js'
import resizeImage from '@/utils/resizeImage.js'

export async function get(req, res) {
	const { number } = req.params
	const postsPerPage = 10
	const totalPosts = fs.readdirSync('content/writing').length
	const totalPages = Math.ceil(totalPosts / postsPerPage)

	const posts = generateWritingList('content/writing', {
			start: ((number - 1) * postsPerPage),
			end: (number * postsPerPage)
		})

	// create responsive resizes of images as needed
	await Promise.all(posts.map(async (post) => {
		// resize the cover
		if (post.cover && post.cover.resize) {
	  	post.cover.image = await resizeImage(post.cover.image)
	  }

	  // excerpt
	  // check for figures & resize as needed
	  const figures = post.excerpt.filter((section) => {
	  	return section.type === 'figure' && section.resize
	  })

		if (figures.length > 0) {
			figures.map(async (figure) => {
				figure.image = await resizeImage(figure.image)
			})
		}

		// check for galleries & resize as needed
		const galleries = post.excerpt.filter((section) => {
			return section.type === 'gallery'
				&& section.images.find(image => image.resize)
		})

		if (galleries.length > 0) {
			galleries.map(async (gallery) => {
				gallery.images.map(async (item) => {
					if (item.resize) {
						item.image = await resizeImage(item.image)
					}
				})
			})
		}
	}))

	res.writeHead(200, {
		'Content-Type': 'application/json'
	})

	res.end(JSON.stringify(
		{
			totalPages,
			posts
		}
	))
}
