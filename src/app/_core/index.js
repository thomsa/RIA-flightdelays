import 'angular-material/angular-material.min.css';
import 'highcharts-ng/dist/highcharts-ng.css';
import 'jquery';

// ANGULAR IMPORTS
import ngMaterial from 'angular-material';
import ngAnimate from 'angular-animate';
import ngAria from 'angular-aria';
import uiRouter from 'angular-ui-router';
import 'angular-ui-router/release/stateEvents';
/**
 * 3rd PARTY IMPORTS
 */
window.Highcharts = require('highcharts');
require('highcharts-drilldown')(Highcharts);
import highChartsng from 'highcharts-ng';

// reusable custom modules
import config from './core.config';
import constants from './core.constants';

export default angular
    .module('ria.core.module', [
        /**
         * ANGULAR MODULES
         */
      ngMaterial,
      ngAnimate,
      ngAria,
      uiRouter,
      'ui.router.state.events',
        /*
         * Reusable cross app modules
         */
      constants,
        /**
         * 3RD PARTY MODULES
         */
      highChartsng
    ]).config(config)
    .name;
