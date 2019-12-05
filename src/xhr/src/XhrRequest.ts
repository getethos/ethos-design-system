let xhrRequestClass

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

// When Gatsby is bundling, window is not available,
// and niether is the Request class, so stub it out:
if (typeof window === 'undefined') {
  xhrRequestClass = {}
} else {
  /**
   * @class XhrRequest
   * @see https://fetch.spec.whatwg.org/#request-class
   * @see https://developer.mozilla.org/en-US/docs/Web/API/Request
   * @see https://caniuse.com/#feat=mdn-api_request (no IE?)
   */
  xhrRequestClass = class XhrRequest extends Request {
    public timestamp!: number

    public setTimestamp() {
      this.timestamp = Date.now()
    }
  }
}

export default xhrRequestClass
