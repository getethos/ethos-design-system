import XhrError from './XhrError';
// TODO: Add in Sentry
export default {
    captureException: (errorOrResponse) => {
        if (process.env.NODE_ENV === 'production')
            return;
        let name = 'XhrError';
        let message;
        let response;
        let stack = [];
        if (errorOrResponse instanceof XhrError) {
            const error = errorOrResponse;
            name = error.name;
            message = error.message;
            response = error.response;
            stack = error.stack && error.stack.split('\n').filter((v) => v);
        }
        else if (typeof errorOrResponse.ok !== 'undefined' &&
            errorOrResponse.ok !== true) {
            // Must be an XhrResponse
            response = errorOrResponse;
            message = response.parsedBody.message;
            name = response.parsedBody.name || name;
            // Need to account for ether parsedBody.status || parsedBody.statusCode
            // to work with both Nest.js which uses statusCode and Fetch API's Response
            // See https://docs.nestjs.com/exception-filters
            // See https://developer.mozilla.org/en-US/docs/Web/API/Response
            status = response.parsedBody.status || response.parsedBody.statusCode;
        }
        else {
            // tslint:disable-next-line no-console
            console.error('Unrecognized type--errorOrResponse is not an XhrError or XhrResponse');
        }
        // tslint:disable-next-line no-console
        console.error(`[${name}] ${message}`, { response, stack });
    },
    ...console,
};
