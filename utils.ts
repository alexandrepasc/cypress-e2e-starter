import { EventEmitter } from 'node:events';

// Workaround to prevent cypress to close the browser before some action (plugin) is still working.
export const delay: (ms: number) => Promise<unknown> = async (ms: number) => new Promise((res: (args: void) => void) => setTimeout(res, ms));

// Workaround to be able to have multiple listeners to the same cypress event.
// This is used in the cypress configuration file.
export class EventForwarder {
	private emitter: EventEmitter;
	private task: Cypress.Tasks;
	public on: Cypress.PluginEvents;

	public constructor() {
		this.emitter = new EventEmitter();

		this.task = {};

		this.on = (action: string, arg: unknown) => {
			if (action === 'task') {
				Object.assign(this.task, arg);
			} else {
				this.emitter.on(action, arg as () => void);
			}
		};
	}

	public async forward(on: Cypress.PluginEvents): Promise<void> {
		for (const event of this.emitter.eventNames()) {
			/* eslint-disable-next-line @typescript-eslint/no-explicit-any */
			await on(event as any, (...args: unknown[]) => {
				for (const listener of this.emitter.listeners(event)) {
					listener(...args);
				}
			});
		}
		on('task', this.task);
	}
}