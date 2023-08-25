///<reference types="cypress"/>

import Interceptors from './home-api-intercepts';
import Elements from './home-elements';

class Home extends Elements {
	api = new Interceptors();

	rejectCookies() {
		this.cookiesContainer()
			.should('be.visible');

		this.rejectCookiesBtn()
			.click();
	}
}

export default Home;