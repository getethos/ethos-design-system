import PathBuilder from './PathBuilder'

export default class PathBuilderInsuranceApp extends PathBuilder {
  public login() {
    this.pathSegments.push('login')
    return this
  }

  public logout() {
    this.pathSegments.push('logout')
    return this
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
}
