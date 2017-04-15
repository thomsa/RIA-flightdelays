
import chartResults from './chart-results.component';
import routes from './chart-results.routes';

export default angular
    .module('ria-chart-results-module', [])
    .config(routes)
    .component('riaChartResults', chartResults).name;
