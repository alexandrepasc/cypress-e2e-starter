///<reference types="cypress"/>

import Login from '../pages/login';

describe('Login test', () => {
	const login: Login = new Login();

	beforeEach(() => {
		cy.visit('/');
	});

	it('Elements are visible', () => {
		login.title()
			.should('be.visible');

		login.usernameInput()
			.should('be.visible');

		login.passwordInput()
			.should('be.visible');

		login.loginBtn()
			.should('be.visible');
	});

	it('Visual testing', () => {
		login.loginBtn()
			.matchImageSnapshot();
	});

	it('Visual testing enabled', () => {
		login.fillLoginForm();

		login.loginBtn()
			.matchImageSnapshot();
	});
});