import * as uiActions from '../_redux-store/actions/ui.actions';
import * as stateActions from 'redux-ui-router';
class AirportSelectController {
  /** @ngInject */
  constructor($ngRedux, $scope, $mdMedia, riaAirportService) {
    this.props = {};
    this.$mdMedia = $mdMedia;
    const unsubscribe = $ngRedux.connect(this.mapStateToThis,
      Object.assign({},
        uiActions,
        stateActions,
        riaAirportService))(this.props);
    $scope.$on('$destroy', unsubscribe);
  }
  $onInit() {
    if (!this.props.airports.allAirports.length) {
      this.props.getAllAirports();
    }
  }
  submit() {
    if (this.props.airports.selectedOrigin && this.props.airports.selectedDestination) {
      this.props.stateGo('main.results',
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
  getStarteClick() {
    this.props.getStartedClicked();
    this.props.stateGo('main.test');
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
