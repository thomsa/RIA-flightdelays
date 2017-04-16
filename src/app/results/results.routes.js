import {ROUTES} from '../_core/core.globals';
export default routesConfig;

/** @ngInject */
function routesConfig($stateProvider) {
  $stateProvider
    .state(ROUTES.FLIGHT_RESULTS_PAGE, {
      url: '/results/:originCode/:destinationCode',
      component: 'riaResults',
      resolve: {
        // this hack has to be done for all containers, otherwise the height won't be flex
        layout() {
          return 'column';
        },
        flex() {
          return '100';
        },
        showChartsTemplate() {
          return false;
        }
      }
    })
    .state(ROUTES.FLIGHT_RESULTS_CHART_PAGE, {
      url: '/results-chart/:originCode/:destinationCode',
      component: 'riaResults',
      resolve: {
        // this hack has to be done for all containers, otherwise the height won't be flex
        layout() {
          return 'column';
        },
        flex() {
          return '100';
        },
        showChartsTemplate() {
          return true;
        }
      }
    });
}
