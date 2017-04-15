import './app.scss';
import angular from 'angular';

// DI

// CORE
import core from './_core';
import components from './_components';
import reduxStoreModule from './_redux-store';

// FEATURES
import layouts from './layouts';
import start from './start';
import airportSelect from './airport-select';
import results from './results';
import chartResults from './chart-results';

angular
  .module('riaApp', [
    /**
     * CORE MODULES
     */
    core,
    components,
    reduxStoreModule,
    /**
     * FEATURE MODULES
     */
    layouts,
    start,
    airportSelect,
    results,
    chartResults
  ]);

angular.element(document)
  .ready(() => {
    angular.bootstrap(document, ['riaApp'], {
      strictDi: true
    });
  });
