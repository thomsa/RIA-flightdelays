import airportsService from './airports.service';
import flightDetailsService from './flight-details.service';

export default angular
  .module('ria.services.module', [
    airportsService,
    flightDetailsService
  ]).name;
