///<reference types="cypress"/>

import Elements from './login-elements';
import Interceptors from './login-api-intercepts';

/**
 * The `class Login extends Elements {` statement is creating a new class named `Login` that extends the `Elements` class.
 * This means that the `Login` class inherits all the properties and methods from the `Elements` class, allowing it to access
 * and use those properties and methods within its own class definition.
 * @class
 * @name Login
 * @kind class
 * @augments Elements
 */
class Login extends Elements {
	api = new Interceptors();

	/**
	 * The `fillLoginForm(mail: string, pwd: string)` method in the `Login` class is a method that takes two parameters:
	 * `mail` and `pwd`, both of type `string`. Inside this method, it first accesses the `usernameInput()` method from the `Elements` class
	 * (which `Login` extends) to locate the username input field on the login form and then types the `mail` parameter into that input field.
	 * @function
	 * @name fillLoginForm
	 * @kind function
	 * @memberof Login
	 * @param {string} mail User account e-mail
	 * @param {string} pwd User account password
	 * @returns {void}
	 */
	fillLoginForm(mail: string, pwd: string): void {
		this.usernameInput()
			.type(mail);

		this.passwordInput()
			.type(pwd);
	}

	/**
	 * The `submitLogin(username: string, password: string)` method in the `Login` class is a method that takes two parameters:
	 * `username` and `password`, both of type `string`. Inside this method, it first accesses the `usernameInput()` method from the `Elements` class
	 * (which `Login` extends) to locate the username input field on the login form and types the `username` parameter into that input field.
	 * Then, it accesses the `passwordInput()` method to locate the password input field on the login form and types the `password` parameter
	 * into that input field. Finally, it clicks on the login button by calling the `loginBtn()` method. This method essentially fills in the username
	 * and password fields on the login form and submits the form by clicking the login button.
	 * @function
	 * @name submitLogin
	 * @kind function
	 * @memberof Login
	 * @param {string} username User account e-mail
	 * @param {string} password User account password
	 * @returns {void}
	 */
	submitLogin(username: string, password: string): void {
		this.usernameInput()
			.type(username);

		this.passwordInput()
			.type(password);

		this.loginBtn()
			.click();
	}
}

export default Login;