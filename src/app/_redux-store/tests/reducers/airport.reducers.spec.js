import reducer from '../../reducers/airport.reducers';
import {types} from '../../actions/airport.actions';

const testData = [{data: 'test data'}];
describe('airport reducer', () => {
  it('should return the initial state', () => {
    expect(
      reducer(undefined, {})
    ).toEqual(
      {
        fetchingAirports: false,
        allAirports: [],
        selectedOrigin: undefined,
        selectedDestination: undefined,
        fetchingConnectedAirports: false,
        connectedAirports: [],
        filteredOriginAirports: [],
        filteredDestinationAirports: [],
        error: undefined
      }
      );
  });

  it('should handle AIRPORTS_FETCH', () => {
    expect(
      reducer([], {
        type: types.AIRPORTS_FETCH
      })
    ).toEqual({
      fetchingAirports: true
    });
  });

  it('should handle AIRPORTS_FETCH_SUCCESS', () => {
    expect(
      reducer([], {
        type: types.AIRPORTS_FETCH_SUCCESS,
        data: testData
      })
    ).toEqual({
      fetchingAirports: false,
      filteredOriginAirports: testData,
      allAirports: testData,
      error: undefined
    });
  });

  it('should handle AIRPORTS_FETCH_ERROR', () => {
    expect(
      reducer([], {
        type: types.AIRPORTS_FETCH_ERROR,
        error: 'error'
      })
    ).toEqual({
      fetchingAirports: false,
      error: 'error'
    });
  });

  it('should handle CONNECTED_AIRPORTS_FETCH', () => {
    expect(
      reducer([], {
        type: types.CONNECTED_AIRPORTS_FETCH
      })
    ).toEqual({
      fetchingConnectedAirports: true
    });
  });

  it('should handle CONNECTED_AIRPORTS_FETCH_SUCCESS', () => {
    expect(
      reducer([], {
        type: types.CONNECTED_AIRPORTS_FETCH_SUCCESS,
        data: testData
      })
    ).toEqual({
      fetchingConnectedAirports: false,
      connectedAirports: testData,
      filteredDestinationAirports: testData,
      error: undefined
    });
  });

  it('should handle CONNECTED_AIRPORTS_FETCH_ERROR', () => {
    expect(
      reducer([], {
        type: types.CONNECTED_AIRPORTS_FETCH_ERROR,
        error: 'error'
      })
    ).toEqual({
      fetchingConnectedAirports: false,
      error: 'error'
    });
  });

  it('should handle FILTER_ORIGIN_AIRPORTS', () => {
    expect(
      reducer([], {
        type: types.FILTER_ORIGIN_AIRPORTS,
        data: testData
      })
    ).toEqual({
      filteredOriginAirports: testData
    });
  });

  it('should handle FILTER_DESTINATION_AIRPORTS', () => {
    expect(
      reducer([], {
        type: types.FILTER_DESTINATION_AIRPORTS,
        data: testData
      })
    ).toEqual({
      filteredDestinationAirports: testData
    });
  });

  it('should handle SET_DESTINATION_AIRPORT', () => {
    expect(
      reducer([], {
        type: types.SET_DESTINATION_AIRPORT,
        airport: testData
      })
    ).toEqual({
      selectedDestination: testData
    });
  });

  it('should handle SET_ORIGIN_AIRPORT', () => {
    expect(
      reducer([], {
        type: types.SET_ORIGIN_AIRPORT,
        airport: testData
      })
    ).toEqual({
      selectedOrigin: testData,
      selectedDestination: undefined,
      connectedAirports: [],
      filteredDestinationAirports: []
    });
  });
});
