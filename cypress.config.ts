import {addMatchImageSnapshotPlugin} from '@simonsmith/cypress-image-snapshot/plugin';
import { defineConfig } from 'cypress';

export default defineConfig({
	watchForFileChanges: false,
	viewportWidth:       1920,
	viewportHeight:      1080,
	e2e:                 {
		baseUrl:                 'https://poupaenergia.pt',
		experimentalRunAllSpecs: true,
		// eslint-disable-next-line @typescript-eslint/no-unused-vars
		setupNodeEvents(on: Cypress.PluginEvents, config: Cypress.PluginConfigOptions) {
			// implement node event listeners here
			addMatchImageSnapshotPlugin(on);
		},
	},
});
