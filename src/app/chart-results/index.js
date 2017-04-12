/**
 * CONTAINERS MODULE
 * responsible for gathering the containers needed for the application to work
 * containers are workins as pages, they are the highest DOM element on a certain route
 *
 * THE CONTAINER NAMES CAN'T CONTAIN DASHES, THE ROUTER CAN NOT RECOGNIZE THEM AS VALID COMPONENTS
 */
import chartResults from './chart-results.component';
import routes from './chart-results.routes';

export default angular
    .module('ria-chart-results-module', [])
    .config(routes)
    .component('riaChartResults', chartResults).name;
