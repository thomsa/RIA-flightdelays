class ChartController {
  /** @ngInject */
  constructor($ngRedux, $scope) {
    const unsubscribe = $ngRedux.connect(this.mapStateToThis, {})(this);
    $scope.$on('$destroy', unsubscribe);
  }
  // Which part of the Redux global state does our component want to receive?
  mapStateToThis(state) {
    return {
      ui: state.ui
    };
  }
}

export default angular.module('ria.components.drill-down-chart', [])
  .component('riaDrillDownChart', {
    controller: ChartController,
    controllerAs: 'ctrl',
    template: require('./drill-down-chart.template.html')
  }).name;

