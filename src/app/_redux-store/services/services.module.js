import airportsService from './airports.service';
import flightDetailsService from './flightDetails.Service';

export default angular
  .module('ria.services.module', [
    airportsService,
    flightDetailsService
  ]).name;
