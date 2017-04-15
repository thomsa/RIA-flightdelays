import {ROUTES} from '../_core/core.globals';
import * as stateActions from 'redux-ui-router';

class AirportSelectController {
  /** @ngInject */
  constructor($ngRedux, $scope, $mdMedia, riaAirportActions, riaUiActions) {
    this.props = {};
    this.$mdMedia = $mdMedia;
    const unsubscribe = $ngRedux.connect(this.mapStateToThis,
       Object.assign({},
        stateActions,
        riaAirportActions,
        riaUiActions))(this.props);
    $scope.$on('$destroy', unsubscribe);
  }

  $onInit() {
    if (!this.props.airports.allAirports.length) {
      this.props.getAllAirports();
    }
  }

  submit() {
    if (this.props.airports.selectedOrigin && this.props.airports.selectedDestination) {
      this.props.stateGo(ROUTES.FLIGHT_RESULTS_PAGE,
        {
          originCode: this.props.airports.selectedOrigin.code,
          destinationCode: this.props.airports.selectedDestination.code
        });
    }
  }

  getNotFoundMessageForDest() {
    if (this.props.airports.selectedOrigin && !this.props.airports.connectedAirports) {
      return 'Sorry, no connected airports were found for this origin';
    }
    return 'No such airport was found in our database';
  }

  mapStateToThis(state) {
    return {
      airports: state.airport,
      ui: state.ui
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
