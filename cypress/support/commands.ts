/// <reference types="cypress" />

import {
	RouteMatcherOptionsGeneric,
	StringMatcher,
	StaticResponse
} from 'cypress/types/net-stubbing';

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
			interceptor(props: Props): void
		}
	}
}

interface Props {
	filter: RouteMatcherOptionsGeneric<StringMatcher>;
	response?: StaticResponse,
	name?:     string
}

Cypress.Commands.add('interceptor', (props: Props) => {
	cy.intercept(
		props.filter,
		props.response
	)
		.as(props.name);
});