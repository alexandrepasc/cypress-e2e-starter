import {addMatchImageSnapshotPlugin} from '@simonsmith/cypress-image-snapshot/plugin';
import { defineConfig } from 'cypress';

export default defineConfig({
	watchForFileChanges: false,
	viewportWidth:       1920,
	viewportHeight:      1080,
	e2e:                 {
		baseUrl:                 'https://poupaenergia.pt',
		experimentalRunAllSpecs: true,
		setupNodeEvents(on: Cypress.PluginEvents, config: Cypress.PluginConfigOptions) {
			// Define the browser window size on start with the viewport configurations
			on('before:browser:launch', (browser: Cypress.Browser, launchOptions: Cypress.BeforeBrowserLaunchOptions) => {
				if (browser.name === 'chrome' && browser.isHeadless) {
					console.log('Google Chrome Browser');

					// fullPage screenshot size is 1400x1200 on non-retina screens
					// and 2800x2400 on retina screens
					launchOptions.args.push(`--window-size=${config.viewportWidth},${config.viewportHeight}`);

					// force screen to be non-retina (1400x1200 size)
					launchOptions.args.push('--force-device-scale-factor=1');
				}

				if (browser.name === 'edge' && browser.isHeadless) {
					console.log('MS Edge Browser');

					// fullPage screenshot size is 1400x1200 on non-retina screens
					// and 2800x2400 on retina screens
					launchOptions.args.push(`--window-size=${config.viewportWidth},${config.viewportHeight}`);

					// force screen to be non-retina (1400x1200 size)
					launchOptions.args.push('--force-device-scale-factor=1');

				// force screen to be retina (2800x2400 size)
				// launchOptions.args.push('--force-device-scale-factor=2')
				}

				if (browser.name === 'electron' && browser.isHeadless) {
					console.log('Electron Browser');

					// fullPage screenshot size is 1400x1200
					launchOptions.preferences.width = config.viewportWidth;

					launchOptions.preferences.height = config.viewportHeight;
				}

				if (browser.name === 'firefox' && browser.isHeadless) {
					console.log('Mozilla Firefox Browser');

					// menubars take up height on the screen
					// so fullPage screenshot size is 1400x1126
					launchOptions.args.push(`--width=${config.viewportWidth}`);

					launchOptions.args.push(`--height=${config.viewportHeight}`);
				}

				return launchOptions;
			});

			addMatchImageSnapshotPlugin(on);
		},
	},
});
