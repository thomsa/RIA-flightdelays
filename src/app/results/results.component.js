import * as globals from '../_core/core.globals';
import * as helpers from '../_core/core.helpers';
import * as uiActions from '../_redux-store/actions/ui.actions';
import * as stateActions from 'redux-ui-router';

class ResultsController {
  /** @ngInject */
  constructor($ngRedux, $scope, riaFlightDetailsService, $stateParams) {
    this.ROUTES = globals.ROUTES;
    this.$stateParams = $stateParams;
    this.props = {};
    const unsubscribe = $ngRedux.connect(this.mapStateToThis,
      Object.assign({},
        uiActions,
        riaFlightDetailsService,
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
      nextTravel = helpers.getNextTravelInfoFromFlighDetailWithMinimumDelay(state.flightDetails.minimumDelay);
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
