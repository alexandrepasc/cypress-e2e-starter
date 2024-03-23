///<reference types="cypress"/>

import Elements from './login-elements';
import Interceptors from './login-api-intercepts';

class Login extends Elements {
	api = new Interceptors();

	fillLoginForm(mail: string, pwd: string) {
		this.usernameInput()
			.type(mail);

		this.passwordInput()
			.type(pwd);
	}

	submitLogin(username: string, password: string) {
		this.usernameInput()
			.type(username);

		this.passwordInput()
			.type(password);

		this.loginBtn()
			.click();
	}
}

export default Login;