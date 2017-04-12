import {types} from '../actions/airport.actions';

const defaultState = {
  fetchingAirports: false,
  allAirports: [],
  selectedOrigin: undefined,
  selectedDestination: undefined,
  fetchingConnectedAirports: false,
  connectedAirports: [],
  filteredOriginAirports: [],
  filteredDestinationAirports: []
};

export default function airport(state = defaultState, action) {
  switch (action.type) {
    case types.AIRPORTS_FETCH:
      return Object.assign({}, state, {
        fetchingAirports: true
      });
    case types.AIRPORTS_FETCH_ERROR:
      return Object.assign({}, state, {
        fetchingAirports: false,
        error: action.error
      });
    case types.AIRPORTS_FETCH_SUCCESS:
      return Object.assign({}, state, {
        fetchingAirports: false,
        allAirports: action.data,
        filteredOriginAirports: action.data
      });
    case types.SET_DESTINATION_AIRPORT:
      return Object.assign({}, state, {
        selectedDestination: action.airport
      });
    case types.SET_ORIGIN_AIRPORT:
      return Object.assign({}, state, {
        selectedOrigin: action.airport
      });
    case types.CONNECTED_AIRPORTS_FETCH:
      return Object.assign({}, state, {
        fetchingConnectedAirports: true
      });
    case types.CONNECTED_AIRPORTS_FETCH_ERROR:
      return Object.assign({}, state, {
        fetchingConnectedAirports: false,
        error: action.error
      });
    case types.CONNECTED_AIRPORTS_FETCH_SUCCESS:
      return Object.assign({}, state, {
        fetchingConnectedAirports: false,
        connectedAirports: action.data,
        filteredDestinationAirports: action.data
      });
    case types.FILTER_ORIGIN_AIRPORTS:
      return Object.assign({}, state, {
        filteredOriginAirports: filterAirports(state.allAirports, action.query)
      });
    case types.FILTER_DESTINATION_AIRPORTS:
      return Object.assign({}, state, {
        filteredDestinationAirports: filterAirports(state.connectedAirports, action.query)
      });
    default:
      return state;
  }
}

function filterAirports(array, query) {
  const lowercase = query.toLowerCase();
  const items = array.filter(value => {
    return value.code.toLowerCase().indexOf(lowercase) >= 0 ||
      value.country_name.toLowerCase().indexOf(lowercase) >= 0 ||
      value.name.toLowerCase().indexOf(lowercase) >= 0;
  });
  return items;
}
