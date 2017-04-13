import {types} from '../actions/airport.actions';

const defaultState = {
  fetchingAirports: false,
  allAirports: [],
  selectedOrigin: undefined,
  selectedDestination: undefined,
  fetchingConnectedAirports: false,
  connectedAirports: [],
  filteredOriginAirports: [],
  filteredDestinationAirports: [],
  error: undefined
};

export default function airport(state = defaultState, action) {
  switch (action.type) {
    case types.AIRPORTS_FETCH:
      return {...state,
        fetchingAirports: true
      };
    case types.AIRPORTS_FETCH_ERROR:
      return {...state,
        fetchingAirports: false,
        error: action.error
      };
    case types.AIRPORTS_FETCH_SUCCESS:
      return {...state,
        fetchingAirports: false,
        allAirports: action.data,
        filteredOriginAirports: action.data,
        error: undefined
      };
    case types.SET_DESTINATION_AIRPORT:
      return {...state,
        selectedDestination: action.airport
      };
    case types.SET_ORIGIN_AIRPORT:
      return {...state,
        selectedOrigin: action.airport,
        selectedDestination: undefined,
        connectedAirports: [],
        filteredDestinationAirports: []
      };
    case types.CONNECTED_AIRPORTS_FETCH:
      return {...state,
        fetchingConnectedAirports: true
      };
    case types.CONNECTED_AIRPORTS_FETCH_ERROR:
      return {...state,
        fetchingConnectedAirports: false,
        error: action.error
      };
    case types.CONNECTED_AIRPORTS_FETCH_SUCCESS:
      return {...state,
        fetchingConnectedAirports: false,
        connectedAirports: action.data,
        filteredDestinationAirports: action.data,
        error: undefined
      };
    case types.FILTER_ORIGIN_AIRPORTS:
      return {...state,
        filteredOriginAirports: filterAirports(state.allAirports, action.query)
      };
    case types.FILTER_DESTINATION_AIRPORTS:
      return {...state,
        filteredDestinationAirports: filterAirports(state.connectedAirports, action.query)
      };
    default:
      return state;
  }
}

function filterAirports(array = [], query) {
  if (array) {
    const lowercase = query.toLowerCase();
    return array.filter(({code, name, country_name: country}) =>
      code.toLowerCase().includes(lowercase) ||
      country.toLowerCase().includes(lowercase) ||
      name.toLowerCase().includes(lowercase)
    );
  }
  return [];
}
