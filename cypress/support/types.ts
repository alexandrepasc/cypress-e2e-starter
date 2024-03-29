import { DictMatcher, RouteMatcherOptions, StaticResponse, StringMatcher } from 'cypress/types/net-stubbing';

/**
 * `export interface InterceptorsProps {` is defining an interface named `InterceptorsProps` that specifies the structure of an object
 * used to configure interceptors for network requests. It includes properties such as `queryParameters`, `interceptNumber`, `reqExpect`,
 * `responseCode`, `responseFile`, and `resExpect`, each with their respective data types. This interface can be exported and used in other parts
 * of the codebase to ensure consistency in defining and using interceptor configurations.
 * @interface
 * @name InterceptorsProps
 * @kind typedef
 * @exports
 * @property {DictMatcher<StringMatcher>} [queryParameters] URL query para meters to filter
 * @property {number} [interceptNumber] Number of time to intercept
 * @property {object[]} [reqExpect] Request body assertions
 * @property {number} [responseCode] Response code to mock
 * @property {string} [responseFile] File with the response body to mock
 * @property {object[]} [resExpect] Response body assertions
 */
export interface InterceptorsProps {
	queryParameters?: DictMatcher<StringMatcher>,
	interceptNumber?: number,
	reqExpect?:       object[],
	responseCode?:    number,
	responseFile?:    string,
	resExpect?:       object[],
}

/**
 * The `export interface InterceptorProps {` statement is defining an interface named `InterceptorProps`.
 * This interface specifies the structure of an object that is used to configure interceptors for network requests.
 * It includes properties such as `filter`, `response`, `reqExpect`, `resExpect`, and `name`, each with their respective data types.
 * By exporting this interface, it can be used in other parts of the codebase to ensure consistency in defining and using interceptor configurations.
 * @interface
 * @name InterceptorProps
 * @kind typedef
 * @exports
 * @property {RouteMatcherOptions} filter Object with all the required information to filter the request
 * @property {StaticResponse} [response] Object with the mock information
 * @property {object[]} [reqExpect] Request assertions
 * @property {object[]} [resExpect] Response assertions
 * @property {string} [name] Alias name to this intercept
 */
export interface InterceptorProps {
	filter:     RouteMatcherOptions;
	response?:  StaticResponse,
	reqExpect?: object[],
	resExpect?: object[],
	name?:      string
}