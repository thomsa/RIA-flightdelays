import ngRedux from 'ng-redux';
import ngReduxUiRouter from 'redux-ui-router';
import thunkMiddleware from 'redux-thunk';

import reduxStore from './redux-store';
import airportActions from './actions/airport.actions';
import flightDetailsActions from './actions/flight-details.actions';
import uiActions from './actions/ui.actions';

const enhancer = [];
if (ENV.__DEBUG__) {
  enhancer.push(window.devToolsExtension());
}

export default angular
  .module('ria.redux-store.module', [
    ngRedux,
    ngReduxUiRouter
  ])
  .factory('riaAirportActions', airportActions)
  .factory('riaFlightDetailsActions', flightDetailsActions)
  .factory('riaUiActions', uiActions)
  .config($ngReduxProvider => {
    $ngReduxProvider.createStoreWith(reduxStore, [thunkMiddleware, 'ngUiRouterMiddleware'], enhancer);
  }).name;
