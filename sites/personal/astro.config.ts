import sharedConfig from "../shared/astro.config.shared";

// https://astro.build/config
export default defineConfig({
	root: "./personal",
	site: "https://jayperry.works",
	...sharedConfig,
});
