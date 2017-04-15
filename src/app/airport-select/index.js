
import airportSelect from './airport-select.component';
import routes from './airport-select.routes.js';

export default angular
    .module('ria-airport-select-module', [])
    .config(routes)
    .component('riaAirportSelect', airportSelect).name;
