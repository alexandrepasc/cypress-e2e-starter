import { RouteMatcherOptions, StaticResponse } from 'cypress/types/net-stubbing';

export interface InterceptorProps {
	filter:     RouteMatcherOptions;
	response?:  StaticResponse,
	reqExpect?: object[],
	resExpect?: object[],
	name?:      string
}