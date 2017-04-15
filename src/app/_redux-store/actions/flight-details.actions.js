import {API_BASE_PATH} from '../../_core/core.globals';

export const types = {
  FLIGHT_DETAILS_FETCH: 'FLIGHT_DETAILS_FETCH_ALL',
  FLIGHT_DETAILS_FETCH_ERROR: 'FLIGHT_DETAILS_FETCH_ERROR',
  FLIGHT_DETAILS_FETCH_SUCCESS: 'FLIGHT_DETAILS_FETCH_SUCCESS',
  SET_FLIGHT_DATA_WITH_MINIMUM_DELAY: 'SET_FLIGHT_DATA_WITH_MINIMUM_DELAY',
  FLIGHT_DETAILS_DELAY_TO_DISTANCE_FETCH: 'FLIGHT_DETAILS_DELAY_TO_DISTANCE_FETCH',
  FLIGHT_DETAILS_DELAY_TO_DISTANCE_FETCH_ERROR: 'FLIGHT_DETAILS_DELAY_TO_DISTANCE_FETCH_ERROR',
  FLIGHT_DETAILS_DELAY_TO_DISTANCE_FETCH_SUCCESS: 'FLIGHT_DETAILS_DELAY_TO_DISTANCE_FETCH_SUCCESS'
};

function setFlightDetails(data) {
  return {
    type: types.FLIGHT_DETAILS_FETCH_SUCCESS,
    data
  };
}
function flightDetailsFetchStart() {
  return {
    type: types.FLIGHT_DETAILS_FETCH
  };
}

function flightDetailsFetchError(error) {
  return {
    type: types.FLIGHT_DETAILS_FETCH_ERROR,
    error
  };
}

function setFlightDataWithMiniumumDelay(data) {
  return {
    type: types.SET_FLIGHT_DATA_WITH_MINIMUM_DELAY,
    data
  };
}

function setDelayDistanceCorrelation(data) {
  return {
    type: types.FLIGHT_DETAILS_DELAY_TO_DISTANCE_FETCH_SUCCESS,
    data
  };
}

function delayDistanceCorrelationFetchStart() {
  return {
    type: types.FLIGHT_DETAILS_DELAY_TO_DISTANCE_FETCH
  };
}

function delayDistanceCorrelationFetchError(error) {
  return {
    type: types.FLIGHT_DETAILS_DELAY_TO_DISTANCE_FETCH_ERROR,
    error
  };
}

/** @ngInject */
export default function FlightDetailsActions($http, $q, $log, $timeout) {
  function getFlightData(origin, destination) {
    return dispatch => {
      dispatch(flightDetailsFetchStart());
      $timeout(() => {
        $http({
          method: 'GET',
          url: `${API_BASE_PATH}/${origin}_${destination}.json`
        }).then(response => {
          // get object with minimum delay time
          const min = response.data.reduce((prev, current) => {
            return (prev.ARR_DELAY < current.ARR_DELAY) ? prev : current;
          });
          dispatch(setFlightDataWithMiniumumDelay(min));
          dispatch(setFlightDetails(response.data));
        }, error => {
          dispatch(flightDetailsFetchError(error));
        });
      },
        3500
      );
    };
  }

  function getAvarageDelayByDistance() {
    return dispatch => {
      dispatch(delayDistanceCorrelationFetchStart());
      $http({
        method: 'GET',
        url: `${API_BASE_PATH}/delay_distance/delay_distance.json`
      }).then(response => {
        dispatch(setDelayDistanceCorrelation(response.data));
      }, error => {
        dispatch(delayDistanceCorrelationFetchError(error));
      });
    };
  }

  return {
    getFlightData,
    getAvarageDelayByDistance
  };
}
