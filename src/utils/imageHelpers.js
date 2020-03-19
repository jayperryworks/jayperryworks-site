const fs = require('fs')
const path = require('path')
const sharp = require('sharp')

// https://github.com/jayperryworks/jayperryworks-site/issues/87
// "figure": {
//   "original": "/path/to/big/original/image.jpg",
//   "versions": [
//     {
// 			"format": "jpg",
// 			"default": true,
// 			"sizes": [
//         {
//           "source": "/path/to/resized/image@480w.jpg",
//           "size": "480w"
//         }
//       ]
//     }
//   ]
// }

const resize = (imagePath, {
		widths = ['400', '800', '1200', '1600', '2000'],
		formats = ['jpg', 'webp']
	} = {}) => {
	// load image at path
	// resize to each width and format
	// save to static/resizes folder
	// // return an object with data
	// {
	// 	original: PATH,
	// 	sizes: [
	// 		{
	// 			path: PATH,
	// 			width: NUMBER
	// 		}
	// 	]
	// }
	const resizedImages = widths.reduce((result, width) => {
		// need to get metadata to find original image size
		// so we don't accidentally blow it up
		// https://sharp.pixelplumbing.com/api-input
		sharp(imagePath)
			.resize({
				width: width
			})
			.toFormat(format)
			.toFile(`static/resizes/${filename}.${format}`)
	}, [])
}

module.exports = {
	resize
}
