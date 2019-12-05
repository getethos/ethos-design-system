/**
 * An extension of the Response class, tailored to our needs.
 */
export interface IXhrRequest extends Request {
  /**
   * @type {Number} Timestampe
   */
  timestamp: number
  setTimestamp?(): void
}

/**
 * @class XhrRequest
 * @see https://fetch.spec.whatwg.org/#request-class
 * @see https://developer.mozilla.org/en-US/docs/Web/API/Request
 * @see https://caniuse.com/#feat=mdn-api_request (no IE?)
 */
export default class XhrRequest extends Request {
  public timestamp!: number

  public setTimestamp() {
    this.timestamp = Date.now()
  }
}
