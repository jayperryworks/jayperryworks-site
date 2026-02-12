import { defineConfig } from "astro/config";
import sharedConfig from "../../shared/shared.astro.config";

// https://astro.build/config
export default defineConfig({
	root: "./personal",
	site: "https://jayperry.works",
	...sharedConfig,
});
