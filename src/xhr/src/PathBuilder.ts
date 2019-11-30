import q from 'querystring'
import { KeyValMap } from './helpers'

export default class PathBuilder {
  private pathSegments: Array<string | number>
  private queryString: string

  constructor() {
    this.pathSegments = []
    this.queryString = ''
  }

  public path(segment: string) {
    this.pathSegments.push(segment)
    return this
  }

  public query(obj: KeyValMap) {
    this.queryString = q.stringify(obj)
    return this
  }

  public login() {
    this.pathSegments.push('login')
    return this
  }

  public logout() {
    this.pathSegments.push('logout')
    return this
  }

  public id(id?: number) {
    if (id != null) {
      this.pathSegments.push(id)
    }
  }

  public admin() {
    this.pathSegments.push('admin')
    return this
  }

  public user(id?: number) {
    this.pathSegments.push('user')
    this.id(id)
    return this
  }

  public group(id?: number) {
    this.pathSegments.push('group')
    this.id(id)
    return this
  }

  public email(id?: number) {
    this.pathSegments.push('email')
    this.id(id)
    return this
  }

  public identity(id?: number) {
    this.pathSegments.push('identity')
    this.id(id)
    return this
  }

  public termPolicy(id?: number) {
    this.pathSegments.push('term-policy')
    this.id(id)
    return this
  }

  public document(id?: number) {
    this.pathSegments.push('document')
    this.id(id)
    return this
  }

  public policyLog(id?: number) {
    this.pathSegments.push('policy-log')
    this.id(id)
    return this
  }

  public buildPath(): string {
    const url = [this.pathSegments.join('/')]

    if (this.queryString !== '') {
      url.push(this.queryString)
    }

    return url.join('?')
  }
}
