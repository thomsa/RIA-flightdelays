
import start from './start.component';
import routes from './start.routes.js';

export default angular
    .module('ria-start-module', [])
    .config(routes)
    .component('riaStart', start).name;
