import PathBuilder from './PathBuilder'

export default class PathBuilderExample extends PathBuilder {
  public posts() {
    this.pathSegments.push('posts')
    return this
  }
  public delete(id) {
    this.pathSegments.push('posts')
    this.id(id)
    return this
  }
  public update(id) {
    this.pathSegments.push('posts')
    this.id(id)
    return this
  }
}
