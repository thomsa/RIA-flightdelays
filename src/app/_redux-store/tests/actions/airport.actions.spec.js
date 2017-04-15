import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import angular from 'angular';
import 'angular-mocks';

import riaReduxStore from '../../index';
import * as actions from '../../actions/airport.actions';

const middlewares = [thunk];
const mockStore = configureMockStore(middlewares);

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
      type: actions.types.SET_DESTINATION_AIRPORT,
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
      type: actions.types.SET_ORIGIN_AIRPORT,
      airport
    }];
    store.subscribe(() => {
      expect(store.getActions()).toEqual(expectedAction);
    });

    store.dispatch(mockriaAirportActions.setOriginAirport(airport));
  });

  describe('async', () => {
    const airport = [
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
    let httpBackend;
    beforeEach(() => {
      angular.mock.inject($httpBackend => {
        httpBackend = $httpBackend;
      });
    });

    it('creates AIRPORTS_FETCH_SUCCESS with data when fetching airports has been done', () => {
      httpBackend.when('GET', '/data/airport_lookup/airports.json').respond(airport);

      const expectedActions = [
        {type: actions.types.AIRPORTS_FETCH},
        {
          type: actions.types.AIRPORTS_FETCH_SUCCESS,
          data: airport
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
        {type: actions.types.AIRPORTS_FETCH},
        {
          type: actions.types.AIRPORTS_FETCH_ERROR,
          error: {
            data: 'mock error'
          }
        }
      ];
      const store = mockStore({airport: {allAirports: airport}});

      store.dispatch(mockriaAirportActions.getAllAirports()).then(() => {
        const finalActions = store.getActions();
        const tempData = finalActions[1].error.data;
        finalActions[1].error = {data: tempData};
        expect(finalActions).toEqual(expectedActions);
      });

      httpBackend.flush();
    });

    it('creates CONNECTED_AIRPORTS_FETCH_SUCCESS with data when fetching connected airports has been done', () => {
      httpBackend.when('GET', '/data/airport_lookup/connected_airports.json').respond(connectedAirportCodes);

      const expectedActions = [
        {type: actions.types.CONNECTED_AIRPORTS_FETCH},
        {
          type: actions.types.CONNECTED_AIRPORTS_FETCH_SUCCESS,
          data: connectedAirport
        }
      ];
      const store = mockStore({airport: {allAirports: airport}});

      store.dispatch(mockriaAirportActions.getConnectedAirports({code: 'ABQ'})).then(() => {
        expect(store.getActions()).toEqual(expectedActions);
      });

      httpBackend.flush();
    });

    it('creates CONNECTED_AIRPORTS_FETCH_ERROR with data when fetching connected airports throws error', () => {
      httpBackend.when('GET', '/data/airport_lookup/connected_airports.json').respond(404, 'mock error');

      const expectedActions = [
        {type: actions.types.CONNECTED_AIRPORTS_FETCH},
        {
          type: actions.types.CONNECTED_AIRPORTS_FETCH_ERROR,
          error: {
            data: 'mock error'
          }
        }
      ];
      const store = mockStore({airport: {allAirports: airport}});

      store.dispatch(mockriaAirportActions.getConnectedAirports({code: 'ABQ'})).then(() => {
        const finalActions = store.getActions();
        const tempData = finalActions[1].error.data;
        finalActions[1].error = {data: tempData};
        expect(finalActions).toEqual(expectedActions);
      });

      httpBackend.flush();
    });
  });
});
