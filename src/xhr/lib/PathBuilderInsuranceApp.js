import PathBuilder from './PathBuilder';
export default class PathBuilderInsuranceApp extends PathBuilder {
    login() {
        this.pathSegments.push('login');
        return this;
    }
    logout() {
        this.pathSegments.push('logout');
        return this;
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
}
