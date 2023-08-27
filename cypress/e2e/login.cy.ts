///<reference types="cypress"/>

import Login from '../pages/login';

describe.only('Login test', () => {
	const login: Login = new Login();

	beforeEach(() => {
		cy.visit('/entrar/');
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

		login.container()
			.matchImageSnapshot();
	});

	it('Visual testing enabled', () => {

		login.loginBtn()
			.click();

		login.container()
			.matchImageSnapshot();
	});

	it('Login request validation', () => {

		login.api.postLogin({
			reqExpect: [
				{email: 'username'},
				{password: 'password'}
			]
		});

		login.fillLoginForm();

		login.loginBtn()
			.click();
	});

	it('Login', () => {

		login.api.postLogin({
			responseCode: 400,
			responseFile: 'post-login-bad-request.json'
		});

		login.submitLogin('test1@mail.com', '123qweasd');

		cy.wait('@postLogin');

		login.title()
			.should('be.visible');
	});

	it.only('Login fail response', () => {
		login.api.postLogin({
			resExpect: [
				{'non_field_errors[0].message': 'Unable to log in with provided credentials.'},
				{'non_field_errors[0].code': 'invalid'}
			]
		});

		login.submitLogin('invalid', 'invalid');
	});
});