import { defineConfig } from "astro/config";
import { createLogger } from "vite";
import sitemap from "@astrojs/sitemap";
import sharedConfig from "../../shared/shared.astro.config";
import svgLoader from "vite-svg-loader";

// ignore 'unrecognized text' warnings in CSS triggered by new relative color syntax
// https://github.com/vitejs/vite/issues/9597
const logger = createLogger();
const originalWarning = logger.warn;
logger.warn = (msg, options) => {
	if (msg.includes("vite:css") && msg.includes(" Unrecognized text")) return;
	originalWarning(msg, options);
};

// https://astro.build/config
export default defineConfig({
	...sharedConfig,

	integrations: [sitemap()],
	site: "https://jayperry.works",
	vite: {
		plugins: [svgLoader()],
		customLogger: logger,
		envDir: "../../shared",
	},
});
