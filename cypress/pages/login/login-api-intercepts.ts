///<reference types="cypress"/>

import { InterceptorProps, InterceptorsProps } from '../../support/types';
import {
	RouteMatcherOptions,
	StaticResponse
} from 'cypress/types/net-stubbing';

/**
 * The `class Interceptors {` is defining a class named `Interceptors`. This class contains a method `postLogin`
 * that sets up an interceptor for a POST request to a specific endpoint `/api/v1/public/user/login/`.
 * The method allows for customization of various properties such as query parameters, intercept number, request expectations,
 * response code, response file, and response expectations. The interceptor is then set up using these properties with the help of
 * Cypress `cy.interceptor` method.
 * @class
 * @name Interceptors
 * @kind class
 */
class Interceptors {

	/**
	 * The `postLogin` method within the `Interceptors` class is setting up an interceptor for a POST request to
	 * the endpoint `/api/v1/public/user/login/`. This method allows for customization of various properties such as query parameters,
	 * intercept number, request expectations, response code, response file, and response expectations. The interceptor is then set up
	 * using these properties with the help of Cypress `cy.interceptor` method.
	 * @function
	 * @name postLogin
	 * @kind function
	 * @memberof Interceptors
	 * @param {InterceptorsProps} props Has all the necessary properties to filter, assert, and response the request
	 * @returns {void}
	 */
	postLogin(props: InterceptorsProps) {
		const method: string = 'POST';
		const endpoint: string = '/api/v1/public/user/login/';
		const filePath: string = 'user/login/';
		const name: string = 'postLogin';

		const filter: RouteMatcherOptions = {
			method:   method,
			pathname: endpoint
		};

		if (props && props.queryParameters) {filter.query = props.queryParameters;}

		if (props && props.interceptNumber) {filter.times = props.interceptNumber;}

		const interceptProps: InterceptorProps = {
			filter: filter,
			name:   name,
		};

		if (props && props.reqExpect) {interceptProps['reqExpect'] = props.reqExpect;}

		let response: StaticResponse = undefined;

		if (props) {
			if (props.responseCode || props.responseFile) {
				response = {};
			}
		}

		if (props && props.responseCode) {response.statusCode = props.responseCode;}

		if (props && props.responseFile) {response.fixture = filePath + props.responseFile;}

		if (response != undefined) {interceptProps['response'] = response;}

		if (props && props.resExpect) {interceptProps['resExpect'] = props.resExpect;}

		cy.interceptor(interceptProps);
	}
}

export default Interceptors;