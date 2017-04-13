import {ROUTES} from '../_core/core.globals';
export default routesConfig;

/** @ngInject */
function routesConfig($stateProvider) {
  $stateProvider
    .state(ROUTES.FLIGHT_RESULTS_CHART_PAGE, {
      url: '/results-chart/:originCode/:destinationCode',
      component: 'riaChartResults',
      resolve: {
        // this hack has to be done for all containers, otherwise the height won't be flex
        layout() {
          return 'column';
        },
        flex() {
          return '100';
        }
      }
    });
}
