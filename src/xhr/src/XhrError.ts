import XhrResponse from './XhrResponse'

/**
 * An extended Error class sepcifically tailored for
 * handling errors emitted by the Fetch API and,
 * consequently, our Xhr class.
 */
export default class XhrError extends Error {
  public response: XhrResponse
  public details: any
  public message: string
  public name: string
  public status: string

  constructor(response: XhrResponse) {
    super(
      (response.parsedBody && response.parsedBody.message) ||
        response.statusText
    )

    this.name = response.statusText
    this.response = response
    this.details = response.parsedBody.details
    this.message = response.parsedBody.message
    this.name = response.parsedBody.name
    this.status = response.parsedBody.status
  }
}
