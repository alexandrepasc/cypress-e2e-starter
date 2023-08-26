///<reference types="cypress"/>

class Elements {
	title = () => cy.get('div[data-testid="login-title"]');
	usernameInput = () => cy.get('#username');
	passwordInput = () => cy.get('#password');
	loginBtn = () => cy.get('button[data-testid="login-button"]');
}

export default Elements;