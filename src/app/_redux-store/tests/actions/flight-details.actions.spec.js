import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import 'angular-mocks';

import * as helpers from '../helpers';

import riaReduxStore from '../../index';
import {types} from '../../actions/flight-details.actions';

const middlewares = [thunk];
const mockStore = configureMockStore(middlewares);

describe('flight details actions', () => {
  let mockriaFlightDetailsActions;
  let store;
  beforeEach(() => {
    angular.mock.module(riaReduxStore);
    angular.mock.inject(riaFlightDetailsActions => {
      mockriaFlightDetailsActions = riaFlightDetailsActions;
    });
    store = mockStore({});
  });

  it('should send clear flight data action', () => {
    const expectedAction = [{
      type: types.CLEAR_FLIGHT_DATA
    }];

    store.subscribe(() => {
      expect(store.getActions()).toEqual(expectedAction);
    });

    store.dispatch(mockriaFlightDetailsActions.clearFlightData());
  });

  describe('async', () => {
    let httpBackend;
    beforeEach(() => {
      angular.mock.inject($httpBackend => {
        httpBackend = $httpBackend;
      });
    });

    it('should get the right flight data for existing origin and destination airports', () => {
      const data = require('../../../../data/ABQ_LAX.json');
      const min = data.reduce((prev, current) => {
        return (prev.ARR_DELAY < current.ARR_DELAY) ? prev : current;
      });
      httpBackend.when('GET', '/data/ABQ_LAX.json').respond(data);

      const expectedActions = [
        {type: types.FLIGHT_DETAILS_FETCH},
        {
          type: types.SET_FLIGHT_DATA_WITH_MINIMUM_DELAY,
          data: min
        },
        {
          type: types.FLIGHT_DETAILS_FETCH_SUCCESS,
          data
        }
      ];
      const store = mockStore({});

      store.dispatch(mockriaFlightDetailsActions.getFlightData('ABQ', 'LAX')).then(() => {
        expect(store.getActions()).toEqual(expectedActions);
      });

      httpBackend.flush();
    });

    it('should handle error when flight data fetch fails', () => {
      httpBackend.when('GET', '/data/ABQ_LAX.json').respond(404, 'error');

      const expectedActions = [
        {type: types.FLIGHT_DETAILS_FETCH},
        {
          type: types.FLIGHT_DETAILS_FETCH_ERROR,
          error: {data: 'error'}
        }
      ];
      const store = mockStore({});

      store.dispatch(mockriaFlightDetailsActions.getFlightData('ABQ', 'LAX')).then(() => {
        expect(helpers.getErrorDataFromActions(store)).toEqual(expectedActions);
      });

      httpBackend.flush();
    });
  });
});
