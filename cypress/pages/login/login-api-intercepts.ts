///<reference types="cypress"/>

import {
	DictMatcher,
	RouteMatcherOptions,
	StaticResponse,
	StringMatcher
} from 'cypress/types/net-stubbing';

interface Props {
	queryParameters?: DictMatcher<StringMatcher>
	interceptNumber?: number,
	reqExpect?:       object[],
	responseCode?:    number,
	responseFile?:    string,
}

class Interceptors {

	/**
 	* Props {
	*     queryParameters?: DictMatcher<StringMatcher>
	*     interceptNumber?: number,
	*     reqExpect?:       object[],
	*     responseCode?:    number,
	*     responseFile?:    string,
	* }
	*/
	postLogin(props: Props) {
		const method: string = 'POST';
		const endpoint: string = '/api/v1/public/user/login/';
		const filePath: string = 'user/login/';
		const name: string = 'postLogin';
		let expect: object[];

		const filter: RouteMatcherOptions = {
			method:   method,
			pathname: endpoint
		};

		if (props && props.queryParameters) {filter.query = props.queryParameters;}

		if (props && props.interceptNumber) {filter.times = props.interceptNumber;}

		if (props && props.reqExpect) {expect = props.reqExpect;}

		const response: StaticResponse = {};

		if (props && props.responseCode) {response.statusCode = props.responseCode;}

		if (props && props.responseFile) {response.fixture = filePath + props.responseFile;}

		cy.interceptor({
			filter:    filter,
			response:  response,
			reqExpect: expect,
			name:      name,
		});
	}
}

export default Interceptors;