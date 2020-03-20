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

module.exports = (sourceFile, outputPath, {
		widths = [600, 1200, 1600, 2000],
		formats = ['jpg', 'webp']
	} = {}) => {
	// load image at path
	// resize to each width and format
	// save to static/resizes folder
	// return an object with data
	// sizes: [
	// 	{
	// 		path: PATH,
	// 		width: NUMBER
	// 	}
	// ]
	return formats.map((format, index) => {
		// add an object with format and size data to the array
		return {
			format: format,
			// set the first format in the array as the default/fallback
			default: index === 0,
			sizes: widths.map((width) => {
				// output file path template
				const path = `${outputPath}@${width}w.${format}`

				// resize the image and save out the file
				sharp(sourceFile)
					.resize({
						width: width
					})
					.toFormat(format)
					.toFile(path)

				// add an object with path and size info to the array
				return {
					source: path,
					size: `${width}w`
				}
			})
		}
	})
}
