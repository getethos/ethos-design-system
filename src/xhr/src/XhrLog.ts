import { IXhrRequest } from './XhrRequest'
import XhrResponse from './XhrResponse'

export default class XhrLog {
  private logger: any

  constructor(logger = console) {
    this.logger = logger
  }

  public request(request: IXhrRequest) {
    if (process.env.NODE_ENV !== 'development') return request

    const { method } = request

    this.logger.groupCollapsed(
      '↑' + `%c ${method || 'UNKNOWN'}` + `%c ${request.url}`,
      'color: #bb0',
      'color: static'
    )
    this.logger.info({
      body: request.body,
      headers: request.headers,
      // params: request.formData(), ??
    })
    this.logger.groupEnd()

    return request
  }

  public response(response: XhrResponse, requestTimestamp: number) {
    if (process.env.NODE_ENV !== 'development') return response

    const responseTime = this.calculateResponseTime(requestTimestamp)

    const logColor = response.ok ? 'color: #099' : 'color: #F00'

    if (response && responseTime && logColor) {
      this.logger.groupCollapsed(
        '↓' +
          `%c ${response.method.toUpperCase()}` +
          `%c ${response.url}` +
          `%c ${response.status}` +
          `%c ${response.statusText}` +
          ` (${responseTime.number} ${responseTime.label})`,
        logColor,
        'color: static',
        logColor,
        'color: static'
      )
    }
    this.logger.info({ headers: response.headers, body: response.parsedBody })
    this.logger.groupEnd()

    return response
  }

  private calculateResponseTime(requestTimestamp: number) {
    const responseTime = {
      label: 'ms',
      number: Date.now() - requestTimestamp,
    }

    if (responseTime.number > 1000) {
      responseTime.number = responseTime.number / 1000
      responseTime.label = 's'
    }

    return responseTime
  }
}
