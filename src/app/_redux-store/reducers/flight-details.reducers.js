import {types} from '../actions/flight-details.actions';

const defaultState = {
  error: undefined,
  fetching: false,
  data: undefined,
  minimumDelay: undefined,
  delayDistanceData: undefined
};

export default function flightDetails(state = defaultState, action) {
  switch (action.type) {
    case types.FLIGHT_DETAILS_FETCH:
      return {...state,
        fetching: true,
        error: undefined
      };
    case types.FLIGHT_DETAILS_FETCH_ERROR:
      return {...state,
        fetching: false,
        error: action.error
      };
    case types.FLIGHT_DETAILS_FETCH_SUCCESS:
      return {...state,
        fetching: false,
        data: action.data,
        error: undefined
      };
    case types.SET_FLIGHT_DATA_WITH_MINIMUM_DELAY:
      return {...state,
        fetching: false,
        minimumDelay: action.data
      };
    case types.CLEAR_FLIGHT_DATA:
      return {...state,
        data: undefined
      };
    default:
      return state;
  }
}

