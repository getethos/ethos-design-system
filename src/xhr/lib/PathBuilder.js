import q from 'querystring';
export default class PathBuilder {
    constructor() {
        this.pathSegments = [];
        this.queryString = '';
    }
    path(segment) {
        this.pathSegments.push(segment);
        return this;
    }
    query(obj) {
        this.queryString = q.stringify(obj);
        return this;
    }
    id(id) {
        if (id != null) {
            this.pathSegments.push(id);
        }
    }
    buildPath() {
        const url = [this.pathSegments.join('/')];
        if (this.queryString !== '') {
            url.push(this.queryString);
        }
        // Reinit pathSegments so subsequent calls don't retain previous segments
        this.pathSegments = [];
        return url.join('?');
    }
}
