///<reference types="cypress"/>

class Elements {
	container = () => cy.get('#auth-card > div > div:nth-child(1)');
	title = () => cy.get('#auth-card > div > div:nth-child(1) > h3');
	usernameInput =
		() => cy.get('#auth-card > div > div:nth-child(1) > div:nth-of-type(1) > label > input');
	passwordInput =
		() => cy.get('#auth-card > div > div:nth-child(1) > div:nth-of-type(2) > label > input');
	loginBtn =
		() => cy.get('#auth-card > div > div:nth-child(1) > div:nth-of-type(3) > div > button');
}

export default Elements;