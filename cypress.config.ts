import { defineConfig } from 'cypress';

export default defineConfig({
	watchForFileChanges: false,
	viewportWidth: 1920,
	viewportHeight: 1080,
	e2e: {
		baseUrl: 'https://www.google.com',
		experimentalRunAllSpecs: true,
		// setupNodeEvents(on, config) {
		// 	// implement node event listeners here
		// },
	},
});
