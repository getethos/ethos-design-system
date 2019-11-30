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
    login() {
        this.pathSegments.push('login');
        return this;
    }
    logout() {
        this.pathSegments.push('logout');
        return this;
    }
    id(id) {
        if (id != null) {
            this.pathSegments.push(id);
        }
    }
    admin() {
        this.pathSegments.push('admin');
        return this;
    }
    user(id) {
        this.pathSegments.push('user');
        this.id(id);
        return this;
    }
    group(id) {
        this.pathSegments.push('group');
        this.id(id);
        return this;
    }
    email(id) {
        this.pathSegments.push('email');
        this.id(id);
        return this;
    }
    identity(id) {
        this.pathSegments.push('identity');
        this.id(id);
        return this;
    }
    termPolicy(id) {
        this.pathSegments.push('term-policy');
        this.id(id);
        return this;
    }
    document(id) {
        this.pathSegments.push('document');
        this.id(id);
        return this;
    }
    policyLog(id) {
        this.pathSegments.push('policy-log');
        this.id(id);
        return this;
    }
    buildPath() {
        const url = [this.pathSegments.join('/')];
        if (this.queryString !== '') {
            url.push(this.queryString);
        }
        return url.join('?');
    }
}
