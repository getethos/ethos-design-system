import Cookies from 'js-cookie'
import XhrOptions from './XhrOptions'
import XhrResponse from './XhrResponse'
import { ResponseBodyType } from './XhrTypes'

// Functions are hoisted, so we put this export at the top for visibility:
export const configureRequestOptions = _configureRequestOptions
export const parseResponseBody = _parseResponseBody

/**
 * Configures the default (or overriden) request options
 * that will be passed into the Request class constructor.
 */
function _configureRequestOptions(xhrOptions: XhrOptions): XhrOptions {
  let requestHeaders: HeadersInit = new Headers()

  // Default to using cookies
  xhrOptions.credentials = xhrOptions.credentials || 'include'

  // Include our anti-cross-site-request-forgery token
  const xsrf =
    xhrOptions.headers['X-XSRF-TOKEN'] != null
      ? xhrOptions.headers['X-XSRF-TOKEN']
      : Cookies.get('XSRF-TOKEN')

  requestHeaders.set('X-XSRF-TOKEN', xsrf)

  // Ensure that the Content-Type and Content-Length
  // headers are set if we are sending POST/form data.
  if (['POST', 'PUT', 'PATCH'].includes(xhrOptions.method)) {
    if (typeof xhrOptions.body !== 'string') {
      xhrOptions.body = JSON.stringify(xhrOptions.body)
    }

    const contentType =
      xhrOptions.headers['Content-Type'] != null
        ? xhrOptions.headers['Content-Type']
        : 'application/json'

    requestHeaders.set('Content-Type', contentType)

    const contentLength = Buffer.byteLength(JSON.stringify(xhrOptions.body))
    requestHeaders.set('Content-Length', contentLength.toString())
  }
  xhrOptions.headers = requestHeaders

  return xhrOptions
}

/**
 * Waits for the response body stream to end and then
 * parses the result depending on the responseType.
 */
async function _parseResponseBody(
  rawResponse: Response,
  xhrOptions: XhrOptions
): Promise<XhrResponse> {
  const response: XhrResponse = <XhrResponse>rawResponse.clone()

  response.method = xhrOptions.method

  // Default to assuming the response body of an XHR is JSON.
  const responseType: ResponseBodyType = xhrOptions.responseType || 'json'

  try {
    // The parsing of the response is unfortunately an async operation
    response.parsedBody = await rawResponse[responseType]()
  } catch (e) {
    response.parsedBody = rawResponse.body
  }

  return response
}
