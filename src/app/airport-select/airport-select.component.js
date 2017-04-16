import {ROUTES} from '../_core/core.globals';
import * as stateActions from 'redux-ui-router';

class AirportSelectController {
  /** @ngInject */
  constructor($ngRedux, $scope, $mdMedia, riaAirportActions, riaFlightDetailsActions) {
    this.props = {};
    this.$mdMedia = $mdMedia;
    const unsubscribe = $ngRedux.connect(this.mapStateToThis,
       Object.assign({},
        stateActions,
        riaAirportActions,
        riaFlightDetailsActions))(this.props);
    $scope.$on('$destroy', unsubscribe);
  }

  $onInit() {
    if (this.props.airports.allAirports.length === 0) {
      this.props.getAllAirports();
    }
  }

  submit() {
    if (this.props.airports.selectedOrigin && this.props.airports.selectedDestination) {
      if (this.props.flightDetails.data) {
        this.props.clearFlightData();
      }
      this.props.stateGo(ROUTES.FLIGHT_RESULTS_PAGE,
        {
          originCode: this.props.airports.selectedOrigin.code,
          destinationCode: this.props.airports.selectedDestination.code
        });
    }
  }

  mapStateToThis(state) {
    return {
      airports: state.airport,
      ui: state.ui,
      flightDetails: state.flightDetails
    };
  }
}

export default {
  template: require('./airport-select.template.html'),
  controller: AirportSelectController,
  controllerAs: 'ctrl',
  bindings: {
    layout: '@',
    flex: '@'
  }
};
