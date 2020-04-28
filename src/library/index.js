import helper from './helper';
import http from './http';

export function install(app) {
    app.use(helper);
    app.use(http);
}