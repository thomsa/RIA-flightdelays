import * as globals from '../_core/core.globals';
import * as helpers from '../_core/core.helpers';
import * as stateActions from 'redux-ui-router';

class ResultsController {
  /** @ngInject */
  constructor($ngRedux, $scope, riaFlightDetailsActions, $stateParams) {
    this.ROUTES = globals.ROUTES;
    this.$stateParams = $stateParams;
    this.props = {};
    const unsubscribe = $ngRedux.connect(this.mapStateToThis,
      Object.assign({},
        riaFlightDetailsActions,
        stateActions
        ))(this.props);
    $scope.$on('$destroy', unsubscribe);
  }

  goToChart() {
    this.props.stateGo(globals.ROUTES.FLIGHT_RESULTS_CHART_PAGE, {
      originCode: this.$stateParams.originCode,
      destinationCode: this.$stateParams.destinationCode
    });
  }

  $onInit() {
    if (this.$stateParams.originCode && this.$stateParams.destinationCode) {
      this.props.getFlightData(this.$stateParams.originCode, this.$stateParams.destinationCode);
    }
  }

  mapStateToThis(state) {
    let nextTravel = {};

    if (state.flightDetails && state.flightDetails.minimumDelay) {
      nextTravel = helpers.getNextTravelInfoFromFlighDetailWithMinimumDelay(state.flightDetails.minimumDelay, new Date());
    }

    return {
      nextTravel,
      ui: state.ui,
      flightDetails: state.flightDetails,
      router: state.router
    };
  }
}

export default {
  template: require('./results.template.html'),
  controller: ResultsController,
  controllerAs: 'ctrl',
  bindings: {
    layout: '@',
    flex: '@'
  }
};
