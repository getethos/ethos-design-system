import xhr from './xhr'

export default defaultXhr(options: XhrOptions): Promise<any>
export function xhrFactory({ baseURL }: { baseURL: string }): xhr
