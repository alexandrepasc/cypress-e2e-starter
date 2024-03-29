import { DictMatcher, RouteMatcherOptions, StaticResponse, StringMatcher } from 'cypress/types/net-stubbing';

export interface InterceptorsProps {
	queryParameters?: DictMatcher<StringMatcher>,
	interceptNumber?: number,
	reqExpect?:       object[],
	responseCode?:    number,
	responseFile?:    string,
	resExpect?:       object[],
}

export interface InterceptorProps {
	filter:     RouteMatcherOptions;
	response?:  StaticResponse,
	reqExpect?: object[],
	resExpect?: object[],
	name?:      string
}