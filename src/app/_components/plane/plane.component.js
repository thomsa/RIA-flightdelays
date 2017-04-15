import {ROUTES} from '../../_core/core.globals';
class PlaneController {
  /** @ngInject */
  constructor($rootScope, $ngRedux, $document) {
    this.$rootScope = $rootScope;
    this.$document = $document;
  }
  $onInit() {
    this.$rootScope.$on('$stateChangeSuccess', (event, toState) => {
      this.$document.ready(() => {
        if (!this.landThePlane && toState.name !== ROUTES.START_PAGE) {
          this.landThePlane = true;
        }
      });
    });
  }
}

export default angular.module('ria.components.plane', [])
  .component('riaPlane', {
    controller: PlaneController,
    controllerAs: 'ctrl',
    template: require('./plane.template.html')
  })
  .name;
