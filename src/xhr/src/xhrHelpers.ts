import Cookies from 'js-cookie'
import XhrOptions, { HeadersWithProps } from './XhrOptions'
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
  if (!xhrOptions.headers)
    xhrOptions.headers = {
      'X-XSRF-TOKEN': undefined,
      'Content-Type': undefined,
      'Content-Length': undefined,
    } as HeadersWithProps

  // Default to using cookies
  xhrOptions.credentials = xhrOptions.credentials || 'include'

  // Include our anti-cross-site-request-forgery token
  if (!xhrOptions.headers['X-XSRF-TOKEN']) {
    xhrOptions.headers['X-XSRF-TOKEN'] = Cookies.get('XSRF-TOKEN')
  }

  // Ensure that the Content-Type and Content-Length
  // headers are set if we are sending POST/form data.
  if (['POST', 'PUT', 'PATCH'].includes(xhrOptions.method)) {
    if (typeof xhrOptions.body !== 'string') {
      xhrOptions.body = JSON.stringify(xhrOptions.body)
    }

    if (!xhrOptions.headers['Content-Type']) {
      xhrOptions.headers['Content-Type'] = 'application/json'
    }
    // const contentLength = Buffer.byteLength(JSON.stringify(xhrOptions.body))
    // requestHeaders.set('Content-Length', contentLength.toString())
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
  // Cast to XhrResponse since Response doesn't have .method property
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
