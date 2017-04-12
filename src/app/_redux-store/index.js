import ngRedux from 'ng-redux';
import ngReduxUiRouter from 'redux-ui-router';
import thunkMiddleware from 'redux-thunk';

import reduxStore from './redux-store';
import airportService from './services/airports.service';
import flightDetailsService from './services/flight-details.service';

const enhancer = [];
if (ENV.__DEBUG__) {
  enhancer.push(window.devToolsExtension());
}

export default angular
  .module('ria.redux-store.module', [
    ngRedux,
    ngReduxUiRouter,
    airportService,
    flightDetailsService
  ])
  .config($ngReduxProvider => {
    $ngReduxProvider.createStoreWith(reduxStore, [thunkMiddleware, 'ngUiRouterMiddleware'], enhancer);
  }).run(($ngRedux, $rootScope, $timeout) => {
    $ngRedux.subscribe(() => {
      $timeout(() => {
        $rootScope.$apply(() => {});
      }, 100);
    });
  }).name;
