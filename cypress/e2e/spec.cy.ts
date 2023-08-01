///<reference types="cypress"/>

import Home from '../pages/home';

describe('Google home', () => {
	const home: Home = new Home();

	beforeEach(() => {
		cy.visit('/');

		home.rejectCookies();
	});

	it('Elements are visible', () => {
		home.title()
			.then(($img: JQuery<HTMLElement>) => {
				if ($img.is(':visible')) {
					home.title()
						.should('be.visible');
				} else {
					home.titleAnimated()
						.should('be.visible');
				}
			});

		home.searchInput()
			.should('be.visible')
			.should('not.have.value');

		home.searchBtn()
			.should('be.visible')
			.should('be.enabled');
	});

	it('Visual test', () => {
		home.searchInput()
			.matchImageSnapshot();
	});
});