import { createLogger } from 'vite';
import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';
import svgLoader from 'vite-svg-loader';

// ignore 'unrecognized text' warnings in CSS triggered by new relative color syntax
// https://github.com/vitejs/vite/issues/9597
const logger = createLogger();
const originalWarning = logger.warn;
logger.warn = (msg, options) => {
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
