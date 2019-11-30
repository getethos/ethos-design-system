import PathBuilder from './PathBuilder'
import { HttpMethodType, ResponseBodyType } from './XhrTypes'

/**
 * @class RequestInit
 * The RequestInit class is a standard class that is defined
 * according to the WHATWG standard. It is always available
 * in the browser and is a map of all the options
 * available for configuring the Fetch() API.
 * @see https://fetch.spec.whatwg.org/#request-class
 * @see https://developer.mozilla.org/en-US/docs/Web/API/Request
 * @see https://github.com/microsoft/TypeScript/blob/v3.5.3/src/lib/webworker.generated.d.ts
 */

/**
 * Extends the WHATWG RequestInit (request options) class.
 * @param {ResponseBodyType} responseBodyType
 *    The type of response body we expect to receive (and parse) from the XHR.
 */
export default interface XhrOptions extends RequestInit {
  baseURL?: string
  path: PathBuilder
  method: HttpMethodType
  responseType?: ResponseBodyType
}
