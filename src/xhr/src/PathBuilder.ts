import { stringify } from 'querystring'
import { KeyValMap } from './helpers'

export interface IPathBuilder {
  path(segment: string): this

  query(obj: KeyValMap): this

  id(id?: number): void

  buildPath(): string
}

export default class PathBuilder implements IPathBuilder {
  protected pathSegments: Array<string | number>
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
    this.queryString = stringify(obj)
    return this
  }

  public id(id?: number) {
    if (id != null) {
      this.pathSegments.push(id)
    }
  }

  public buildPath(): string {
    const url = [this.pathSegments.join('/')]

    if (this.queryString !== '') {
      url.push(this.queryString)
    }

    // Reinit pathSegments so subsequent calls don't retain previous segments
    this.pathSegments = []

    return url.join('?')
  }
}
