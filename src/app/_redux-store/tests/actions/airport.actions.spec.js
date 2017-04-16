import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import 'angular-mocks';

import * as helpers from '../helpers';

import riaReduxStore from '../../index';
import {types} from '../../actions/airport.actions';

const middlewares = [thunk];
const mockStore = configureMockStore(middlewares);

const airports = [
  {
    code: 'ABQ',
    name: 'Albuquerque International',
    country_name: 'United States',
    display: 'Albuquerque International, United States, ABQ'
  },
  {
    code: 'LAX',
    name: 'Los Angeles International',
    country_name: 'United States',
    display: 'Los Angeles International, United States, LAX'
  }
];
const connectedAirport = [{
  code: 'LAX',
  name: 'Los Angeles International',
  country_name: 'United States',
  display: 'Los Angeles International, United States, LAX'
}];
const connectedAirportCodes = {
  ABQ: [
    'LAX',
    'OAK',
    'SAN',
    'SFO'
  ]
};

describe('airport actions', () => {
  let mockriaAirportActions;
  let store;
  beforeEach(() => {
    angular.mock.module(riaReduxStore);
    angular.mock.inject(riaAirportActions => {
      mockriaAirportActions = riaAirportActions;
    });
    store = mockStore({});
  });

  it('should set the correct destination airport', () => {
    const airport = {
      code: 'test'
    };
    const expectedAction = [{
      type: types.SET_DESTINATION_AIRPORT,
      airport
    }];

    store.subscribe(() => {
      expect(store.getActions()).toEqual(expectedAction);
    });

    store.dispatch(mockriaAirportActions.setDestinationAirport(airport));
  });

  it('should set the correct origin airport', () => {
    const airport = {
      code: 'test'
    };
    const expectedAction = [{
      type: types.SET_ORIGIN_AIRPORT,
      airport
    }];
    store.subscribe(() => {
      expect(store.getActions()).toEqual(expectedAction);
    });

    store.dispatch(mockriaAirportActions.setOriginAirport(airport));
  });

  it('should filter the correct origin airport', () => {
    const filteredAirports = [{
      code: 'ABQ',
      name: 'Albuquerque International',
      country_name: 'United States',
      display: 'Albuquerque International, United States, ABQ'
    }];
    const expectedAction = [{
      type: types.FILTER_ORIGIN_AIRPORTS,
      data: filteredAirports
    }];
    const store = mockStore({airport: {allAirports: airports}});
    store.subscribe(() => {
      expect(store.getActions()).toEqual(expectedAction);
    });

    store.dispatch(mockriaAirportActions.filterOriginAirport('Albu'));
  });

  it('should filter the correct destination airport', () => {
    const filteredAirports = [{
      code: 'ABQ',
      name: 'Albuquerque International',
      country_name: 'United States',
      display: 'Albuquerque International, United States, ABQ'
    }];
    const expectedAction = [{
      type: types.FILTER_DESTINATION_AIRPORTS,
      data: filteredAirports
    }];
    const store = mockStore({airport: {connectedAirports: airports}});
    store.subscribe(() => {
      expect(store.getActions()).toEqual(expectedAction);
    });

    store.dispatch(mockriaAirportActions.filterDestinationAirport('Albu'));
  });

  describe('async', () => {
    let httpBackend;
    beforeEach(() => {
      angular.mock.inject($httpBackend => {
        httpBackend = $httpBackend;
      });
    });

    it('creates AIRPORTS_FETCH_SUCCESS with data when fetching airports has been done', () => {
      httpBackend.when('GET', '/data/airport_lookup/airports.json').respond(airports);

      const expectedActions = [
        {type: types.AIRPORTS_FETCH},
        {
          type: types.AIRPORTS_FETCH_SUCCESS,
          data: airports
        }
      ];
      const store = mockStore({});

      store.dispatch(mockriaAirportActions.getAllAirports()).then(() => {
        expect(store.getActions()).toEqual(expectedActions);
      });

      httpBackend.flush();
    });

    it('creates AIRPORTS_FETCH_ERROR with data when fetching connected airports throws error', () => {
      httpBackend.when('GET', '/data/airport_lookup/airports.json').respond(404, 'mock error');

      const expectedActions = [
        {type: types.AIRPORTS_FETCH},
        {
          type: types.AIRPORTS_FETCH_ERROR,
          error: {
            data: 'mock error'
          }
        }
      ];
      const store = mockStore({airport: {allAirports: airports}});

      store.dispatch(mockriaAirportActions.getAllAirports()).then(() => {
        expect(helpers.getErrorDataFromActions(store)).toEqual(expectedActions);
      });

      httpBackend.flush();
    });

    it('creates CONNECTED_AIRPORTS_FETCH_SUCCESS with data when fetching connected airports has been done', () => {
      httpBackend.when('GET', '/data/airport_lookup/connected_airports.json').respond(connectedAirportCodes);

      const expectedActions = [
        {type: types.CONNECTED_AIRPORTS_FETCH},
        {
          type: types.CONNECTED_AIRPORTS_FETCH_SUCCESS,
          data: connectedAirport
        }
      ];
      const store = mockStore({airport: {allAirports: airports}});

      store.dispatch(mockriaAirportActions.getConnectedAirports({code: 'ABQ'})).then(() => {
        expect(store.getActions()).toEqual(expectedActions);
      });

      httpBackend.flush();
    });

    it('returns empty array if there are no connected airports to the origin', () => {
      httpBackend.when('GET', '/data/airport_lookup/connected_airports.json').respond(connectedAirportCodes);

      const expectedActions = [
        {
          type: types.CONNECTED_AIRPORTS_FETCH
        },
        {
          type: types.CONNECTED_AIRPORTS_FETCH_SUCCESS,
          data: []
        }
      ];
      const store = mockStore({airport: {allAirports: airports}});

      store.dispatch(mockriaAirportActions.getConnectedAirports({code: 'cant be found airport'})).then(() => {
        expect(store.getActions()).toEqual(expectedActions);
      });

      httpBackend.flush();
    });

    it('returns empty array and sets destination to undefined, if query string is null or empty when fetching connected airports', () => {
      const expectedActions = [
        {
          type: types.SET_DESTINATION_AIRPORT,
          airport: undefined
        },
        {
          type: types.CONNECTED_AIRPORTS_FETCH_SUCCESS,
          data: []
        }
      ];
      let dispatchCount = 0;
      store.subscribe(() => {
        if (dispatchCount === 0) {
          expect(store.getActions()).toEqual([expectedActions[0]]);
        } else if (dispatchCount === 1) {
          expect(store.getActions()).toEqual(expectedActions);
        }
        dispatchCount++;
      });

      store.dispatch(mockriaAirportActions.getConnectedAirports());
    });

    it('creates CONNECTED_AIRPORTS_FETCH_ERROR with data when fetching connected airports throws error', () => {
      httpBackend.when('GET', '/data/airport_lookup/connected_airports.json').respond(404, 'mock error');

      const expectedActions = [
        {type: types.CONNECTED_AIRPORTS_FETCH},
        {
          type: types.CONNECTED_AIRPORTS_FETCH_ERROR,
          error: {
            data: 'mock error'
          }
        }
      ];
      const store = mockStore({airport: {allAirports: airports}});

      store.dispatch(mockriaAirportActions.getConnectedAirports({code: 'ABQ'})).then(() => {
        expect(helpers.getErrorDataFromActions(store)).toEqual(expectedActions);
      });

      httpBackend.flush();
    });
  });
});
