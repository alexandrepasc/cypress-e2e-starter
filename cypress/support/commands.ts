/// <reference types="cypress" />

import {CyHttpMessages} from 'cypress/types/net-stubbing';
import { InterceptorProps } from './types';

// ***********************************************
// This example commands.ts shows you how to
// create various custom commands and overwrite
// existing commands.
//
// For more comprehensive examples of custom
// commands please read more here:
// https://on.cypress.io/custom-commands
// ***********************************************
//
//
// -- This is a parent command --
// Cypress.Commands.add('login', (email, password) => { ... })
//
//
// -- This is a child command --
// Cypress.Commands.add('drag', { prevSubject: 'element'}, (subject, options) => { ... })
//
//
// -- This is a dual command --
// Cypress.Commands.add('dismiss', { prevSubject: 'optional'}, (subject, options) => { ... })
//
//
// -- This will overwrite an existing command --
// Cypress.Commands.overwrite('visit', (originalFn, url, options) => { ... })
//

declare global {
	// eslint-disable-next-line @typescript-eslint/no-namespace
	namespace Cypress {
		interface Chainable {
			//       login(email: string, password: string): Chainable<void>
			//       drag(subject: string, options?: Partial<TypeOptions>): Chainable<Element>
			//       dismiss(subject: string, options?: Partial<TypeOptions>): Chainable<Element>
			// eslint-disable-next-line max-len
			// visit(originalFn: CommandOriginalFn, url: string, options: Partial<VisitOptions>): Chainable<Element>
			interceptor(props: InterceptorProps): void
		}
	}
}

Cypress.Commands.add('interceptor', (props: InterceptorProps) => {
	cy.intercept(
		props.filter,
		(request: CyHttpMessages.IncomingHttpRequest) => {
			if (props.reqExpect) {
				props.reqExpect.forEach((item: object) => {
					expect(request.body).to.nested.include(item);
				});
			}

			if (props.response && props.response != undefined) {
				request.reply(props.response);
			} else {
				if (props.resExpect) {
					request.continue((response: CyHttpMessages.IncomingHttpResponse) => {
						props.resExpect.forEach((item: object) => {
							expect(response.body).to.nested.include(item);
						});
					});
				}
			}
		}
	)
		.as(props.name);
});