import reducer from '../../reducers/flight-details.reducers';
import {types} from '../../actions/flight-details.actions';

const testData = [{data: 'test data'}];

describe('flight details reducer', () => {
  it('should return the initial state', () => {
    expect(
      reducer(undefined, {})
    ).toEqual(
      {
        error: undefined,
        fetching: false,
        data: undefined,
        minimumDelay: undefined,
        delayDistanceData: undefined
      }
      );
  });

  it('should handle FLIGHT_DETAILS_FETCH', () => {
    expect(
      reducer([], {
        type: types.FLIGHT_DETAILS_FETCH
      })
    ).toEqual({
      fetching: true,
      error: undefined
    });
  });

  it('should handle FLIGHT_DETAILS_FETCH_ERROR', () => {
    expect(
      reducer([], {
        type: types.FLIGHT_DETAILS_FETCH_ERROR,
        error: 'error'
      })
    ).toEqual({
      fetching: false,
      error: 'error'
    });
  });

  it('should handle FLIGHT_DETAILS_FETCH_SUCCESS', () => {
    expect(
      reducer([], {
        type: types.FLIGHT_DETAILS_FETCH_SUCCESS,
        data: testData
      })
    ).toEqual({
      fetching: false,
      data: testData,
      error: undefined
    });
  });
  it('should handle SET_FLIGHT_DATA_WITH_MINIMUM_DELAY', () => {
    expect(
      reducer([], {
        type: types.SET_FLIGHT_DATA_WITH_MINIMUM_DELAY,
        data: testData
      })
    ).toEqual({
      fetching: false,
      minimumDelay: testData
    });
  });
  it('should handle CLEAR_FLIGHT_DATA', () => {
    expect(
      reducer([], {
        type: types.CLEAR_FLIGHT_DATA
      })
    ).toEqual({
      data: undefined
    });
  });
});
