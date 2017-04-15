import {API_BASE_PATH} from '../../_core/core.globals';

export const types = {
  AIRPORTS_FETCH: 'AIRPORTS_FETCH',
  AIRPORTS_FETCH_ERROR: 'AIRPORTS_FETCH_ERROR',
  AIRPORTS_FETCH_SUCCESS: 'AIRPORTS_FETCH_SUCCESS',
  CONNECTED_AIRPORTS_FETCH: 'CONNECTED_AIRPORTS_FETCH',
  CONNECTED_AIRPORTS_FETCH_ERROR: 'CONNECTED_AIRPORTS_FETCH_ERROR',
  CONNECTED_AIRPORTS_FETCH_SUCCESS: 'CONNECTED_AIRPORTS_FETCH_SUCCESS',
  SET_ORIGIN_AIRPORT: 'SET_ORIGIN_AIRPORT',
  SET_DESTINATION_AIRPORT: 'SET_DESTINATION_AIRPORT',
  FILTER_ORIGIN_AIRPORTS: 'FILTER_ORIGIN_AIRPORTS',
  FILTER_DESTINATION_AIRPORTS: 'FILTER_DESTINATION_AIRPORTS'
};

function receiveAirports(data) {
  return {
    type: types.AIRPORTS_FETCH_SUCCESS,
    data
  };
}
function fetchAirportsStart() {
  return {
    type: types.AIRPORTS_FETCH
  };
}

function airportsError(error) {
  return {
    type: types.AIRPORTS_FETCH_ERROR,
    error
  };
}

function receiveConnectedAirports(data) {
  return {
    type: types.CONNECTED_AIRPORTS_FETCH_SUCCESS,
    data
  };
}
function fetchConnectedAirportsStart() {
  return {
    type: types.CONNECTED_AIRPORTS_FETCH
  };
}

function connectedAirportsError(error) {
  return {
    type: types.CONNECTED_AIRPORTS_FETCH_ERROR,
    error
  };
}

function setOriginAirport(airport) {
  return {
    type: types.SET_ORIGIN_AIRPORT,
    airport
  };
}

function setDestinationAirport(airport) {
  return {
    type: types.SET_DESTINATION_AIRPORT,
    airport
  };
}

function filterOriginAirport(query) {
  return {
    type: types.FILTER_ORIGIN_AIRPORTS,
    query
  };
}

function filterDestinationAirport(query) {
  return {
    type: types.FILTER_DESTINATION_AIRPORTS,
    query
  };
}

/** @ngInject */
export default function AirportActions($http) {
  function getAllAirports() {
    return dispatch => {
      dispatch(fetchAirportsStart());
      return $http({
        method: 'GET',
        url: `${API_BASE_PATH}/airport_lookup/airports.json`
      }).then(response => {
        const result = response.data.map(element => {
          const newElement = element;
          newElement.display = element.name + ', ' + element.country_name + ', ' + element.code;
          return newElement;
        });
        dispatch(receiveAirports(result));
      }, error => {
        dispatch(airportsError(error));
      });
    };
  }

  function getConnectedAirports(originAirport) {
    return (dispatch, getState) => {
      if (originAirport) {
        dispatch(fetchConnectedAirportsStart());
        return $http({
          method: 'GET',
          url: `${API_BASE_PATH}/airport_lookup/connected_airports.json`
        }).then(response => {
          const connectedAirports = response.data[originAirport.code];
          if (connectedAirports) {
            const state = getState();
            const result = state.airport.allAirports.filter(element => {
              return connectedAirports.includes(element.code);
            });
            dispatch(receiveConnectedAirports(result));
          } else {
            dispatch(receiveConnectedAirports([]));
          }
        }, error => {
          dispatch(connectedAirportsError(error));
        });
      }
      dispatch(setDestinationAirport(undefined));
      dispatch(receiveConnectedAirports([]));
    };
  }

  return {
    getAllAirports,
    getConnectedAirports,
    setOriginAirport: airport => {
      return dispatch => dispatch(setOriginAirport(airport));
    },
    setDestinationAirport: airport => {
      return dispatch => dispatch(setDestinationAirport(airport));
    },
    filterOriginAirport: query => {
      return dispatch => dispatch(filterOriginAirport(query));
    },
    filterDestinationAirport: query => {
      return dispatch => dispatch(filterDestinationAirport(query));
    }
  };
}
