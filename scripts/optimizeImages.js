const fs = require('fs')
const path = require('path')
const yaml = require('js-yaml')
const resizeImage = require('../src/utils/resizeImage.js')

// [
// 	{
// 	  "original": "/path/to/big/original/image.jpg",
// 	  "versions": [
// 	    {
// 				"format": "jpg",
// 				"default": true,
// 				"sizes": [
// 	        {
// 	          "path": "/path/to/resized/image@[SIZE]w.jpg",
// 	          "size": "[SIZE]"
// 	        }
// 	      ]
// 	    },
// 			 ...
// 	  ]
// 	},
// 	...
// ]

function getFiles(dir) {
	const dirPath = path.join(__dirname, dir)

	return fs.readdirSync(dirPath).reduce((result, file) => {
		// skip system dotfiles
	  if (file[0] === '.') return result

		result.unshift(yaml.safeLoad(
		  fs.readFileSync(`${dirPath}/${file}`, 'utf-8')
		))

		return result
	}, [])
}

function getPictureImages (dir) {
	return getFiles(dir).reduce((result, data) => {
		const images = [
			data.cover,
			data.thumb,
			...(data.editions && data.editions.map(edition => edition.photo))
		]
		images.forEach((original) => {
			result.push({ original })
		})
		return result
	}, [])
}

function getWritingImages (dir) {
	return getFiles(dir).reduce((result, data) => {
		let images = []
		// cover image
		data.cover && data.cover.resize && images.push(data.cover.image)
		// body block images
		data.body.forEach((block) => {
			if (block.resize) {
				block.image && images.push(block.image)
				block.images && block.images.map((item) => {
					images.push(item.image)
				})
			}
		})
		images.forEach((original) => {
			result.push({ original })
		})
		return result
	}, [])
}

function getAboutImages (file) {
	const data = yaml.safeLoad(
	  fs.readFileSync(`${path.join(__dirname, file)}.yml`, 'utf-8')
	)
	// same as writing images, but optimize all of them
	return [
		(data.cover && data.cover.image),
		...data.body.reduce((result, block) => {
			block.image && result.push(block.image)
			block.images && result.push(
				...block.images.map(item => item.image)
			)
			return result
		}, [])
	].map((image) => {
		return { original: image }
	})
}

async function resizeAndGenerateManifest (images) {
	const data = await Promise.all(images.map(async (image) => {
		return await resizeImage(image.original, image.options)
	}))

	fs.writeFileSync(
		path.join(__dirname, '../static/images/resizes/_manifest.json'),
		JSON.stringify(data)
	)
}

resizeAndGenerateManifest([
	...getPictureImages('../content/pictures'),
	...getAboutImages('../content/about'),
	...getWritingImages('../content/writing')
])
