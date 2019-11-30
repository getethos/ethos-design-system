export default class XhrLog {
    constructor(logger = console) {
        this.logger = logger;
    }
    request(request) {
        if (process.env.NODE_ENV !== 'development')
            return request;
        const { method } = request;
        this.logger.groupCollapsed('↑' + `%c ${method || 'UNKNOWN'}` + `%c ${request.url}`, 'color: #bb0', 'color: static');
        this.logger.info({
            body: request.body,
            headers: request.headers,
        });
        this.logger.groupEnd();
        return request;
    }
    response(response, requestTimestamp) {
        if (process.env.NODE_ENV !== 'development')
            return response;
        const responseTime = this.calculateResponseTime(requestTimestamp);
        const logColor = response.ok ? 'color: #099' : 'color: #F00';
        this.logger.groupCollapsed('↓' +
            `%c ${response.method.toUpperCase()}` +
            `%c ${response.url}` +
            `%c ${response.status}` +
            `%c ${response.statusText}` +
            ` (${responseTime.number} ${responseTime.label})`, logColor, 'color: static', logColor, 'color: static');
        this.logger.info({ headers: response.headers, body: response.parsedBody });
        this.logger.groupEnd();
        return response;
    }
    calculateResponseTime(requestTimestamp) {
        const responseTime = {
            label: 'ms',
            number: Date.now() - requestTimestamp,
        };
        if (responseTime.number > 1000) {
            responseTime.number = responseTime.number / 1000;
            responseTime.label = 's';
        }
        return responseTime;
    }
}
