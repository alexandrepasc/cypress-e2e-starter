///<reference types="cypress"/>

import Interceptors from './login-api-intercepts';
import Elements from './login-elements';

class Login extends Elements {
	api = new Interceptors();

	fillLoginForm() {
		this.usernameInput()
			.type('username');

		this.passwordInput()
			.type('password');
	}
}

export default Login;