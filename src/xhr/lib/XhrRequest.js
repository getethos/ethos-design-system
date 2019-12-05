/**
 * @class XhrRequest
 * @see https://fetch.spec.whatwg.org/#request-class
 * @see https://developer.mozilla.org/en-US/docs/Web/API/Request
 * @see https://caniuse.com/#feat=mdn-api_request (no IE?)
 */
export default class XhrRequest extends Request {
    setTimestamp() {
        this.timestamp = Date.now();
    }
}
