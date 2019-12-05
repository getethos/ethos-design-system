import XhrError from './XhrError'
import XhrResponse from './XhrResponse'

// TODO: Add in Sentry
export default {
  captureException: (errorOrResponse: XhrError | XhrResponse) => {
    if (process.env.NODE_ENV === 'production') return

    let name = 'XhrError'
    let message
    let response
    let stack: '' | string[] | undefined = []

    if (errorOrResponse instanceof XhrError) {
      const error = errorOrResponse
      name = error.name
      message = error.message
      response = error.response
      stack = error.stack && error.stack.split('\n').filter((v) => v)
    } else if (
      typeof errorOrResponse.ok !== 'undefined' &&
      errorOrResponse.ok !== true
    ) {
      // Must be an XhrResponse
      response = errorOrResponse
      message = response.parsedBody.message
      name = response.parsedBody.name
      status = response.parsedBody.status
    } else {
      // tslint:disable-next-line no-console
      console.error(
        'Unrecognized type--errorOrResponse is not an XhrError or XhrResponse'
      )
    }

    // tslint:disable-next-line no-console
    console.error(`[${name}] ${message}`, { response, stack })
  },
  ...console,
}
