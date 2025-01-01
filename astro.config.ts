import { defineConfig } from 'astro/config';
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
	compressHTML: true,
	image: {
    domains: ['jayperry.works', 'jayperryworks.com'],
  },
	integrations: [
		sitemap(),
	]
});
