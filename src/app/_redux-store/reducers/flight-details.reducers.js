import {types} from '../actions/flight-details.actions';

const defaultState = {
  error: undefined,
  fetching: false,
  data: [],
  minimumDelay: undefined,
  delayDistanceData: []
};

export default function flightDetails(state = defaultState, action) {
  switch (action.type) {
    case types.FLIGHT_DETAILS_FETCH:
      return Object.assign({}, state, {
        fetching: true
      });
    case types.FLIGHT_DETAILS_FETCH_ERROR:
      return Object.assign({}, state, {
        fetching: false,
        error: action.error
      });
    case types.FLIGHT_DETAILS_FETCH_SUCCESS:
      return Object.assign({}, state, {
        fetching: false,
        data: action.data
      });
    case types.SET_FLIGHT_DATA_WITH_MINIMUM_DELAY:
      return Object.assign({}, state, {
        fetching: false,
        minimumDelay: action.data
      });
    case types.FLIGHT_DETAILS_DELAY_TO_DISTANCE_FETCH:
      return Object.assign({}, state, {
        fetching: true
      });
    case types.FLIGHT_DETAILS_DELAY_TO_DISTANCE_FETCH_SUCCESS:
      return Object.assign({}, state, {
        fetching: false,
        delayDistanceData: action.data
      });
    case types.FLIGHT_DETAILS_DELAY_TO_DISTANCE_FETCH_ERROR:
      return Object.assign({}, state, {
        fetching: false,
        error: action.error
      });
    default:
      return state;
  }
}

