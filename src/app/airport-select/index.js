/**
 * CONTAINERS MODULE
 * responsible for gathering the containers needed for the application to work
 * containers are workins as pages, they are the highest DOM element on a certain route
 *
 * THE CONTAINER NAMES CAN'T CONTAIN DASHES, THE ROUTER CAN NOT RECOGNIZE THEM AS VALID COMPONENTS
 */
import airportSelect from './airport-select.component';
import routes from './airport-select.routes.js';

export default angular
    .module('ria-airport-select-module', [])
    .config(routes)
    .component('riaAirportSelect', airportSelect).name;
