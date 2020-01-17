import xhr from './xhr'

export default function defaultXhr(options: XhrOptions): Promise<any>

export function xhrFactory({ baseURL }: { baseURL: string }): xhr
