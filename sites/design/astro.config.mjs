// @ts-check
import { defineConfig } from 'astro/config';
import netlify from '@astrojs/netlify';
import sharedConfig from '../../shared/shared.astro.config';
import sitemap from '@astrojs/sitemap';
import svgLoader from 'vite-svg-loader';

// https://astro.build/config
export default defineConfig({
	...sharedConfig,

	adapter: netlify(),
	integrations: [sitemap()],
	site: 'https://design.jayperry.works',
	vite: {
		plugins: [svgLoader()],
		envDir: '../../',
	},
});
