export const types = {
  FLIGHT_DETAILS_FETCH: 'FLIGHT_DETAILS_FETCH_ALL',
  FLIGHT_DETAILS_FETCH_ERROR: 'FLIGHT_DETAILS_FETCH_ERROR',
  FLIGHT_DETAILS_FETCH_SUCCESS: 'FLIGHT_DETAILS_FETCH_SUCCESS',
  SET_FLIGHT_DATA_WITH_MINIMUM_DELAY: 'SET_FLIGHT_DATA_WITH_MINIMUM_DELAY',
  FLIGHT_DETAILS_DELAY_TO_DISTANCE_FETCH: 'FLIGHT_DETAILS_DELAY_TO_DISTANCE_FETCH',
  FLIGHT_DETAILS_DELAY_TO_DISTANCE_FETCH_ERROR: 'FLIGHT_DETAILS_DELAY_TO_DISTANCE_FETCH_ERROR',
  FLIGHT_DETAILS_DELAY_TO_DISTANCE_FETCH_SUCCESS: 'FLIGHT_DETAILS_DELAY_TO_DISTANCE_FETCH_SUCCESS'
};

export function setFlightDetails(data) {
  return {
    type: types.FLIGHT_DETAILS_FETCH_SUCCESS,
    data
  };
}
export function flightDetailsFetchStart() {
  return {
    type: types.FLIGHT_DETAILS_FETCH
  };
}

export function flightDetailsFetchError(error) {
  return {
    type: types.FLIGHT_DETAILS_FETCH_ERROR,
    error
  };
}

export function setFlightDataWithMiniumumDelay(data) {
  return {
    type: types.SET_FLIGHT_DATA_WITH_MINIMUM_DELAY,
    data
  };
}

export function setDelayDistanceCorrelation(data) {
  return {
    type: types.FLIGHT_DETAILS_DELAY_TO_DISTANCE_FETCH_SUCCESS,
    data
  };
}

export function delayDistanceCorrelationFetchStart() {
  return {
    type: types.FLIGHT_DETAILS_DELAY_TO_DISTANCE_FETCH
  };
}

export function delayDistanceCorrelationFetchError(error) {
  return {
    type: types.FLIGHT_DETAILS_DELAY_TO_DISTANCE_FETCH_ERROR,
    error
  };
}
