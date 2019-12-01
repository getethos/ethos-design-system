import PathBuilder from './PathBuilder'
export default class PathBuilderExample extends PathBuilder {
  posts() {
    this.pathSegments.push('posts')
    return this
  }
  delete(id) {
    this.pathSegments.push('posts')
    this.id(id)
    return this
  }
}
