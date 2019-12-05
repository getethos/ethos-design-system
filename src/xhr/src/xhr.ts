import errorReporter from './errorReporter'
import XhrError from './XhrError'
import { configureRequestOptions, parseResponseBody } from './xhrHelpers'
import XhrLog from './XhrLog'
import XhrOptions from './XhrOptions'
import XhrRequest from './XhrRequest'
import XhrResponse from './XhrResponse'
import { HttpMethodType } from './XhrTypes'

async function xhr(options: XhrOptions) {
  const baseURL = options.baseURL
  const path = options.path

  // rm any props not part of the Request/RequestInit spec
  delete options.baseURL
  delete options.path

  // TODO: Guard against not having enough parameters

  let err: XhrError
  let response: XhrResponse
  const xhrLog = new XhrLog()

  return new Promise((resolve) => {
    const xhrOptions = configureRequestOptions(options)

    // path may be either a PathBuilder, or for convenience a path string e.g. path: 'api/posts',
    const resolvedPath = typeof path === 'string' ? path : path.buildPath()

    // Create a new XhrRequest object that will be passed into browser fetch
    const request = new XhrRequest(`${baseURL}/${resolvedPath}`, xhrOptions)

    // Begin timing how long our request will take
    request.setTimestamp()

    // Log request
    xhrLog.request(request)

    fetch(request)
      .then((rawResponse: Response) => {
        return parseResponseBody(rawResponse, xhrOptions)
      })
      // Use the XhrLog to log everything going on in the Xhr layer
      .then((xhrResponse: XhrResponse) => {
        xhrLog.response.bind(xhrLog)(xhrResponse, request.timestamp)
        return xhrResponse
      })
      // Handle HTTP status codes
      .then((xhrResponse: XhrResponse) => {
        if (xhrResponse.ok === true) {
          // Set response if request was successful
          response = xhrResponse
        } else {
          // Set err and report if request was unsuccessful
          err = new XhrError(xhrResponse)
          errorReporter.captureException(xhrResponse)
        }

        resolve({ err, response })
      })
      // Handle network errors
      .catch((xhrError: XhrError) => {
        // Log the error with our reporter
        errorReporter.captureException(xhrError)
        err = xhrError

        resolve({ err })
      })
  })
}

xhr.factory = {}

/**
 * Defines several properties on the xhr function that
 * allows certain things to be statically-obtained, like
 * the standard HTTP method names and our PathBuilder class.
 */
function defineXhrProperties(xhrFunction: any) {
  /**
   * A factory function that allows the xhr
   * function to be pre-loaded with a given baseURL.
   */
  Object.defineProperty(xhrFunction, 'factory', {
    configurable: false,
    enumerable: true,
    writable: false,
    value: function xhrFactoryFunc({ baseURL }: { baseURL: string }) {
      async function xhrWithBaseURL(options: XhrOptions) {
        const createdXhr = xhrFunction({ baseURL, ...options })
        return defineXhrProperties(createdXhr)
      }

      return defineXhrProperties(xhrWithBaseURL)
    },
  })

  defineHttpMethod(xhrFunction, 'GET')
  defineHttpMethod(xhrFunction, 'POST')
  defineHttpMethod(xhrFunction, 'PUT')
  defineHttpMethod(xhrFunction, 'PATCH')
  defineHttpMethod(xhrFunction, 'DELETE')
  defineHttpMethod(xhrFunction, 'HEAD')
  defineHttpMethod(xhrFunction, 'OPTIONS')

  return xhrFunction
}

function defineHttpMethod(xhrFunction: any, method: HttpMethodType) {
  Object.defineProperty(xhrFunction, method, {
    configurable: false,
    enumerable: true,
    writable: false,
    value: method,
  })
}

export default defineXhrProperties(xhr)
export const xhrFactory = xhr.factory
