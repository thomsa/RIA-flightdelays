import {ROUTES} from '../../_core/core.globals';
class PlaneController {
  /** @ngInject */
  constructor($rootScope, $document) {
    this.$rootScope = $rootScope;
    this.$document = $document;
  }

  onReady(toState) {
    if (!this.landThePlane && toState.name !== ROUTES.START_PAGE) {
      this.landThePlane = true;
    }
  }

  $onInit() {
    this.$rootScope.$on('$stateChangeSuccess', (event, toState) => {
      this.$document.ready(() => {
        this.onReady(toState);
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
