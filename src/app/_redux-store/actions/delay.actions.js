export const types = {
  DELAYS_FETCH: 'DELAYS_FETCH_ALL',
  DELAYS_FETCH_ERROR: 'DELAYS_FETCH_ERROR',
  DELAYS_FETCH_SUCCESS: 'DELAYS_FETCH_SUCCESS',
  SET_FLIGHT_DATA_WITH_MINIMUM_DELAY: 'SET_FLIGHT_DATA_WITH_MINIMUM_DELAY'
};

export function receive(data) {
  return {
    type: types.DELAYS_FETCH_SUCCESS,
    data
  };
}
export function fetchStart() {
  return {
    type: types.DELAYS_FETCH
  };
}

export function error(error) {
  return {
    type: types.DELAYS_FETCH_SUCCESS,
    error
  };
}

export function setFlightDataWithMiniumumDelay(data) {
  return {
    type: types.SET_FLIGHT_DATA_WITH_MINIMUM_DELAY,
    data
  };
}
