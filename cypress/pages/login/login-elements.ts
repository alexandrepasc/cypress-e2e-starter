///<reference types="cypress"/>

/**
 * The `class Elements {` is defining a class named `Elements`. This class contains methods that return Cypress commands to locate and
 * interact with specific elements on a web page. Each method corresponds to a specific element on the page, such as a container, title,
 * username input field, password input field, and login button. These methods use Cypress commands like `cy.get` to select the elements
 * based on their CSS selectors. The class is then exported for use in other modules.
 * @kind class
 */
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