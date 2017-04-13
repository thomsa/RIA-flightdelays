import {ROUTES} from '../_core/core.globals';
export default routesConfig;

/** @ngInject */
function routesConfig($stateProvider) {
  $stateProvider
    .state(ROUTES.AIRPORT_SEARCH_PAGE, {
      url: '/select-airports',
      component: 'riaAirportSelect',
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
