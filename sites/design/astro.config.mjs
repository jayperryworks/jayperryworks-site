// @ts-check
import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';
import sharedConfig from '../../shared/shared.astro.config';
import svgLoader from 'vite-svg-loader';

// https://astro.build/config
export default defineConfig({
	...sharedConfig,

	integrations: [sitemap()],
	site: 'https://design.jayperry.works',
	vite: {
		plugins: [svgLoader()],
		envDir: '../../',
	},
});
