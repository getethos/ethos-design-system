import { HttpMethodType } from './XhrTypes'

/**
 * @class Response
 * The Response class is a standard class that is defined
 * according to the WHATWG standard. It is always available
 * in the browser runtime.
 * @see https://fetch.spec.whatwg.org/#response-class
 * @see https://developer.mozilla.org/en-US/docs/Web/API/Response
 * @see https://github.com/microsoft/TypeScript/blob/aff7ef12305de00cca7ac405fdaf8402ba0e6973/src/lib/webworker.generated.d.ts#L2798
 */

/**
 * An extension of the Response class, tailored to our needs.
 */
export default interface XhrResponse extends Response {
  /**
   * @type {*} The parsed response body.
   */
  parsedBody?: any

  /**
   * Add the request method so that our response
   * logger (XhrLog) can output the method as well.
   * @type {HttpMethodType}
   */
  method?: HttpMethodType
}
