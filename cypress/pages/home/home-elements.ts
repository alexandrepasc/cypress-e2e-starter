///<reference types="cypress"/>

class Elements {
	cookiesContainer = () => cy.get('#CXQnmb');
	rejectCookiesBtn = () => cy.get('#W0wltc');

	title = () => cy.get('img[alt="Google"]');
	titleAnimated = () => cy.get('#hplogo');
	searchInput = () =>  cy.get('#APjFqb');
	searchBtn = () => cy.get('form[action="/search"] > div:nth-child(1) > div:nth-child(1) > ' +
		'div:nth-child(6) > center > input[name="btnK"]');
}

export default Elements;