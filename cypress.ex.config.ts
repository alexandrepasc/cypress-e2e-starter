import * as report from 'cypress-mochawesome-reporter/plugin';
import { addMatchImageSnapshotPlugin } from '@simonsmith/cypress-image-snapshot/plugin';
import base from './cypress.config';
import { defineConfig } from 'cypress';

export default defineConfig({
	...base,
	reporter: 'cypress-multi-reporters',
	e2e:      {
		...base.e2e,

		// eslint-disable-next-line @typescript-eslint/no-unused-vars
		setupNodeEvents(on: Cypress.PluginEvents, config: Cypress.PluginConfigOptions) {
			addMatchImageSnapshotPlugin(on);

			report(on);
		}
	}
});
