///<reference types="cypress"/>

import {
	DictMatcher,
	GenericStaticResponse,
	RouteMatcherOptionsGeneric,
	StringMatcher
} from 'cypress/types/net-stubbing';

interface Props {
	queryParameters?: DictMatcher<StringMatcher>
	interceptNumber?: number,
	responseCode?:    number,
	responseFile?:    string,
}

class Interceptors {
	getSearch(props: Props) {
		const method: string = 'GET';
		const endpoint: string = '/complete/search';
		const filePath: string = 'complete/search/';
		const name: string = 'getSearch';

		const filter: RouteMatcherOptionsGeneric<StringMatcher> = {
			method:   method,
			pathname: endpoint
		};

		if (props.queryParameters) {filter.query = props.queryParameters;}

		if (props.interceptNumber) {filter.times = props.interceptNumber;}

		const response: GenericStaticResponse<
			string, string | object | boolean | ArrayBuffer | null
		> = {};

		if (props.responseCode) {response.statusCode = props.responseCode;}

		if (props.responseFile) {response.fixture = filePath + props.responseFile;}

		cy.interceptor({
			filter:   filter,
			response: response,
			name:     name,
		});
	}
}

export default Interceptors;