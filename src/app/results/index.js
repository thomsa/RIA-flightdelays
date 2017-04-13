/**
 * CONTAINERS MODULE
 * responsible for gathering the containers needed for the application to work
 * containers are workins as pages, they are the highest DOM element on a certain route
 *
 * THE CONTAINER NAMES CAN'T CONTAIN DASHES, THE ROUTER CAN NOT RECOGNIZE THEM AS VALID COMPONENTS
 */
import results from './results.component';
import routes from './results.routes';

export default angular
    .module('ria-results-module', [])
    .config(routes)
    .component('riaResults', results).name;
