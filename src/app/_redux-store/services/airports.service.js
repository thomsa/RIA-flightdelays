import * as airportActions from '../../_redux-store/actions/airport.actions';
const basePath = '/data/';

/** @ngInject */
export function AirportService($http, $q, $log) {
  function getAllAirports() {
    return (dispatch, getState) => {
      dispatch(airportActions.fetchAirportsStart());
      $http({
        method: 'GET',
        url: basePath + ('/airport_lookup/airports.json')
      }).then(response => {
        const result = response.data.map(element => {
          const newElement = element;
          newElement.display = element.name + ', ' + element.country_name + ', ' + element.code;
          return newElement;
        });
        dispatch(airportActions.receiveAirports(result));
      }, error => {
        dispatch(airportActions.airportsError(error));
      });
    };
  }

  function getConnectedAirports(originAirport) {
    return (dispatch, getState) => {
      if (originAirport) {
        dispatch(airportActions.fetchConnectedAirportsStart());
        $http({
          method: 'GET',
          url: basePath + ('/airport_lookup/connected_airports.json')
        }).then(response => {
          const connectedAirports = response.data[originAirport.code];
          if (connectedAirports) {
            const state = getState();
            const result = state.airport.allAirports.filter(element => {
              return connectedAirports.includes(element.code);
            });
            dispatch(airportActions.receiveConnectedAirports(result));
          } else {
            dispatch(airportActions.receiveConnectedAirports([]));
          }
        }, error => {
          dispatch(airportActions.connectedAirportsError(error));
        });
      } else {
        dispatch(airportActions.setDestinationAirport(undefined));
        dispatch(airportActions.receiveConnectedAirports([]));
      }
    };
  }

  return {
    getAllAirports,
    getConnectedAirports
  };
}

export default angular
  .module('ria-airport-service-module', [])
  .factory('riaAirportService', AirportService).name;

