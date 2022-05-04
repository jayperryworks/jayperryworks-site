import { defineConfig } from 'astro/config';
import svgLoader from 'vite-svg-loader';
import svelte from '@astrojs/svelte';
import sitemap from '@astrojs/sitemap';

// https://astro.build/config
export default defineConfig({
	site: 'https://jayperryworks.com',
	vite: {
		plugins: [svgLoader({
			svgoConfig: {
				removeDimensions: true
			}
		})]
	},
	integrations: [svelte(), sitemap()],
});
