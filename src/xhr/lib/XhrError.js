/**
 * An extended Error class sepcifically tailored for
 * handling errors emitted by the Fetch API and,
 * consequently, our Xhr class. Also, supports Nest.js
 * which, for example, uses `statusCode` not `status`
 */
export default class XhrError extends Error {
    constructor(response) {
        super((response.parsedBody && response.parsedBody.message) ||
            response.statusText);
        this.response = response;
        this.details = response.parsedBody.details;
        this.message = response.parsedBody.message;
        this.name = response.parsedBody.name || response.statusText;
        this.status = response.parsedBody.status || response.parsedBody.statusCode;
    }
}
