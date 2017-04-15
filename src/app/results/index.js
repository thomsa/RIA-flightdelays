
import results from './results.component';
import routes from './results.routes';

export default angular
    .module('ria-results-module', [])
    .config(routes)
    .component('riaResults', results).name;
