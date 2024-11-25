import * as path from 'path';
import * as report from 'cypress-mochawesome-reporter/plugin';
import { addMatchImageSnapshotPlugin } from '@simonsmith/cypress-image-snapshot/plugin';
import base from './cypress.config';
import { defineConfig } from 'cypress';
import { glob } from 'glob';
import { mergeFiles } from 'junit-report-merger';
import { delay, EventForwarder } from './utils';

export default defineConfig({
	...base,
	reporter: 'cypress-multi-reporters',
	e2e:      {
		...base.e2e,

		// eslint-disable-next-line @typescript-eslint/no-unused-vars
		setupNodeEvents(on: Cypress.PluginEvents, config: Cypress.PluginConfigOptions) {
			const eventForwarder: EventForwarder = new EventForwarder();
			const onCustom: Cypress.PluginEvents = eventForwarder.on;

			onCustom('after:run', async () => {
				const outputFile: string = path.join(__dirname, 'junitreport.xml');

				// merge the junit report files from the 'results' folder
				mergeFiles(outputFile, ['./results/*.xml']);

				while (glob.sync('./results/*.xml').length > 0) {
					await delay(2000);
				}

				console.log(outputFile);
			});

			addMatchImageSnapshotPlugin(onCustom);

			report(onCustom);

			// Handle the multiple listeners to same cypress event
			eventForwarder.forward(on);
		}
	}
});
