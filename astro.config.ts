import { createLogger } from 'vite';
import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';
import svgLoader from 'vite-svg-loader';

const logger = createLogger();
const originalWarning = logger.warn;
logger.warn = (msg, options) => {
	// ignore 'unrecognized text' warnings in CSS triggered by new relative color syntax
  if (msg.includes('vite:css') && msg.includes(' Unrecognized text')) return;
  originalWarning(msg, options);
};

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
		],
		customLogger: logger,
	},
	compressHTML: true,
	image: {
    domains: ['jayperry.works', 'jayperryworks.com'],
  },
	integrations: [
		sitemap(),
	]
});
