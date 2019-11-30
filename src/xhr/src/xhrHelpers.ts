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
  // Ensure headers object is present
  if (xhrOptions.headers == null) xhrOptions.headers = {}

  // Default to using cookies
  xhrOptions.credentials = xhrOptions.credentials || 'include'

  // Include our anti-cross-site-request-forgery token
  if (xhrOptions.headers['X-XSRF-TOKEN'] == null) {
    xhrOptions.headers['X-XSRF-TOKEN'] = Cookies.get('XSRF-TOKEN')
  }

  // Ensure that the Content-Type and Content-Length
  // headers are set if we are sending POST/form data.
  if (['POST', 'PUT', 'PATCH'].includes(xhrOptions.method)) {
    if (typeof xhrOptions.body !== 'string') {
      // TODO: Support other Content-Types (if we use them… XML?)
      xhrOptions.body = JSON.stringify(xhrOptions.body)
    }

    if (xhrOptions.headers['Content-Type'] == null) {
      xhrOptions.headers['Content-Type'] = 'application/json'
    }

    if (xhrOptions.headers['Content-Length'] == null) {
      const contentLength = Buffer.byteLength(JSON.stringify(xhrOptions.body))
      xhrOptions.headers['Content-Length'] = contentLength
    }
  }

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
  const response: XhrResponse = rawResponse.clone()

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
