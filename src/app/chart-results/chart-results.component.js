import {ROUTES} from '../_core/core.globals';
import * as stateActions from 'redux-ui-router';
class ChartResultsController {
  /** @ngInject */
  constructor($ngRedux, $scope, riaFlightDetailsActions, $stateParams) {
    this.ROUTES = ROUTES;
    this.$stateParams = $stateParams;
    this.props = {};
    const unsubscribe = $ngRedux.connect(this.mapStateToThis,
      Object.assign({},
        riaFlightDetailsActions,
        stateActions
        ))(this.props);
    $scope.$on('$destroy', unsubscribe);
  }

  $onInit() {
    if (!this.props.flightDetails.data && this.$stateParams.originCode && this.$stateParams.destinationCode) {
      this.props.getFlightData(this.$stateParams.originCode, this.$stateParams.destinationCode);
    }
  }

  mapStateToThis(state) {
    return {
      ui: state.ui,
      flightDetails: state.flightDetails,
      router: state.router
    };
  }
}

export default {
  template: require('./chart-results.template.html'),
  controller: ChartResultsController,
  controllerAs: 'ctrl',
  bindings: {
    layout: '@',
    flex: '@'
  }
};
