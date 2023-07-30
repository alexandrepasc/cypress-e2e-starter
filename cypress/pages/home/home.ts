///<reference types="cypress"/>

import Elements from './home-elements';

class Home extends Elements {
	rejectCookies() {
		this.cookiesContainer()
			.should('be.visible');

		this.rejectCookiesBtn()
			.click();
	}
}

export default Home;