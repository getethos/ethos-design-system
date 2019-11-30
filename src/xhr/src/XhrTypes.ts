/** Valid HTTP methods. */
export type HttpMethodType = 'GET' | 'POST' | 'PUT' | 'PATCH' | 'DELETE' | 'HEAD' | 'OPTIONS'

/**
 * Define the type of an instantiated Request object.
 * i.e., requestInstance: RequestInstanceType = new Request(...)
 */
export type RequestInstanceType = InstanceType<typeof Request>

/** Valid response body types. */
export type ResponseBodyType =
  | 'arrayBuffer'
  | 'blob'
  | 'formData'
  | 'json'
  | 'text'
