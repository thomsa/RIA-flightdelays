import * as globals from '../_core/core.globals';
import * as helpers from '../_core/core.helpers';
import * as uiActions from '../_redux-store/actions/ui.actions';
import * as stateActions from 'redux-ui-router';

class ResultsController {
  /** @ngInject */
  constructor($ngRedux, $scope, riaFlightDetailsService, $stateParams) {
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
    this.props.stateGo('main.chartResults', {
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
    let monthToTravel;
    let dayToTravel;
    let timeToTravel;
    let hourToTravel;
    let minuteToTravel;

    if (state.flightDetails && state.flightDetails.minimumDelay) {
      dayToTravel = new Date(state.flightDetails.minimumDelay.FL_DATE).getDate();
      timeToTravel = helpers.getReadableTimeFromInt(state.flightDetails.minimumDelay.CRS_DEP_TIME);
      hourToTravel = timeToTravel.slice(0, 2);
      minuteToTravel = timeToTravel.slice(3);
      // TODO: MOVE THIS OUT TO A SERVICE
      const Calendar = new Date();
      const currentMonth = Calendar.getMonth();
      const today = Calendar.getDate();

      if (dayToTravel >= today) {
        monthToTravel = globals.MONTHS[currentMonth];
      } else {
        monthToTravel = globals.MONTHS[currentMonth + 1];
      }
    }

    return {
      timeToTravel,
      dayToTravel,
      minuteToTravel,
      hourToTravel,
      monthToTravel,
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
