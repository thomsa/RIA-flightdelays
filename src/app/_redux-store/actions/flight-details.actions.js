export const types = {
  FLIGHT_DETAILS_FETCH: 'FLIGHT_DETAILS_FETCH_ALL',
  FLIGHT_DETAILS_FETCH_ERROR: 'FLIGHT_DETAILS_FETCH_ERROR',
  FLIGHT_DETAILS_FETCH_SUCCESS: 'FLIGHT_DETAILS_FETCH_SUCCESS',
  SET_FLIGHT_DATA_WITH_MINIMUM_DELAY: 'SET_FLIGHT_DATA_WITH_MINIMUM_DELAY'
};

export function receive(data) {
  return {
    type: types.FLIGHT_DETAILS_FETCH_SUCCESS,
    data
  };
}
export function fetchStart() {
  return {
    type: types.FLIGHT_DETAILS_FETCH
  };
}

export function error(error) {
  return {
    type: types.FLIGHT_DETAILS_FETCH_SUCCESS,
    error
  };
}

export function setFlightDataWithMiniumumDelay(data) {
  return {
    type: types.SET_FLIGHT_DATA_WITH_MINIMUM_DELAY,
    data
  };
}
