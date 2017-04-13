import {ROUTES} from '../_core/core.globals';
export default routesConfig;

/** @ngInject */
function routesConfig($stateProvider) {
  $stateProvider
    .state(ROUTES.START_PAGE, {
      url: '/',
      component: 'riaStart',
      resolve: {
        // this hack has to be done for all containers, otherwise the height won't be flex
        layout() {
          return 'row';
        },
        flex() {
          return '100';
        }
      }
    });
}
