import * as uiActions from '../../_redux-store/actions/ui.actions';
import * as airportActions from '../../_redux-store/actions/airport.actions';

class AirportSearchInputController {
  /** @ngInject */
  constructor($ngRedux, $scope, riaAirportService, riaFlightDetailsService) {
    this.props = {};
    const unsubscribe = $ngRedux.connect(this.mapStateToThis,
      Object.assign({},
        airportActions,
        uiActions,
        riaAirportService,
        riaFlightDetailsService))(this.props);
    $scope.$on('$destroy', unsubscribe);
  }
  getItems() {
    return this.items;
  }

  setSelectedAirport(item) {
    if (this.type === 'origin') {
      this.props.getConnectedAirports(item);
    }
  }

  mapStateToThis(state) {
    return {
      ui: state.ui,
      airports: state.airport
    };
  }
}

export default angular.module('ria.components.airport-search-input', [])
  .component('riaAirportSearchInput', {
    template: require('./airport-search-input.template.html'),
    controller: AirportSearchInputController,
    controllerAs: 'ctrl',
    bindings: {
      type: '@',
      placeHolder: '@',
      ngDisabled: '=',
      model: '=',
      items: '=',
      notFoundMessage: '@'
    }
  }).name;
