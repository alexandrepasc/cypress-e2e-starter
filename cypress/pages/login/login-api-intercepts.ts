///<reference types="cypress"/>

import { InterceptorProps } from '../../support/types';
import {
	DictMatcher,
	RouteMatcherOptions,
	StaticResponse,
	StringMatcher
} from 'cypress/types/net-stubbing';

interface Props {
	queryParameters?: DictMatcher<StringMatcher>,
	interceptNumber?: number,
	reqExpect?:       object[],
	responseCode?:    number,
	responseFile?:    string,
	resExpect?:       object[],
}

class Interceptors {

	/**
 	* Props {
	*     queryParameters?: DictMatcher<StringMatcher>,
	*     interceptNumber?: number,
	*     reqExpect?:       object[],
	*     responseCode?:    number,
	*     responseFile?:    string,
	*     resExpect?:       object[],
	* }
	*/
	postLogin(props: Props) {
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