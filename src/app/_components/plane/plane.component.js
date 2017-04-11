
class PlaneController {
  /** @ngInject */
  constructor($rootScope, $ngRedux, $scope, $document) {
    this.props = {};
    this.$rootScope = $rootScope;
    this.$document = $document;
    const unsubscribe = $ngRedux.connect(this.mapStateToThis, {})(this.props);
    $scope.$on('$destroy', unsubscribe);
  }
  $onInit() {
    this.$rootScope.$on('$stateChangeSuccess', (event, toState) => {
      this.$document.ready(() => {
        if (!this.landThePlane && toState.name !== 'main.start') {
          this.landThePlane = true;
        }
      });
    });
  }
  // Which part of the Redux global state does our component want to receive?
  mapStateToThis(state) {
    return {
      ui: state.ui,
      router: state.router
    };
  }
}

export default angular.module('ria.components.plane', [])
  .component('riaPlane', {
    controller: PlaneController,
    controllerAs: 'ctrl',
    template: require('./plane.template.html')
  })
  .name;
