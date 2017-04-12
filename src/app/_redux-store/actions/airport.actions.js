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

export function receiveAirports(data) {
  return {
    type: types.AIRPORTS_FETCH_SUCCESS,
    data
  };
}
export function fetchAirportsStart() {
  return {
    type: types.AIRPORTS_FETCH
  };
}

export function airportsError(error) {
  return {
    type: types.AIRPORTS_FETCH_SUCCESS,
    error
  };
}

export function receiveConnectedAirports(data) {
  return {
    type: types.CONNECTED_AIRPORTS_FETCH_SUCCESS,
    data
  };
}
export function fetchConnectedAirportsStart() {
  return {
    type: types.CONNECTED_AIRPORTS_FETCH
  };
}

export function connectedAirportsError(error) {
  return {
    type: types.CONNECTED_AIRPORTS_FETCH_ERROR,
    error
  };
}

export function setOriginAirport(airport) {
  return {
    type: types.SET_ORIGIN_AIRPORT,
    airport
  };
}

export function setDestinationAirport(airport) {
  return {
    type: types.SET_DESTINATION_AIRPORT,
    airport
  };
}

export function filterOriginAirport(query) {
  return {
    type: types.FILTER_ORIGIN_AIRPORTS,
    query
  };
}

export function filterDestinationAirport(query) {
  return {
    type: types.FILTER_DESTINATION_AIRPORTS,
    query
  };
}
