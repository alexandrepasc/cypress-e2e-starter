///<reference types="cypress"/>

class Elements {
	title = () => cy.get('img[alt="Google"]');
	searchInput = () =>  cy.get('#APjFqb');
}

export default Elements;