import { defineConfig } from 'astro/config';
// import compress from 'astro-compress';
import sitemap from '@astrojs/sitemap';
import svgLoader from 'vite-svg-loader';

// https://astro.build/config
export default defineConfig({
	site: 'https://jayperry.works',
	vite: {
		plugins: [
			svgLoader({
				svgoConfig: {
					removeDimensions: true,
				}
			})
		]
	},
	integrations: [
		// compress({
		// 	svg: false,
		// 	html: {
		// 		removeComments: true,
		// 		removeEmptyAttributes: true,
		// 	},
		// }),
		sitemap(),
	]
});
