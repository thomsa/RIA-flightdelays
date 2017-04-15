
class AirportSearchInputController {
  /** @ngInject */
  constructor($ngRedux, $scope, riaAirportActions, riaFlightDetailsActions) {
    this.props = {};
    const unsubscribe = $ngRedux.connect(this.mapStateToThis,
      Object.assign({},
        riaAirportActions,
        riaFlightDetailsActions))(this.props);
    $scope.$on('$destroy', unsubscribe);
  }

  $onInit() {
    if (this.type !== 'origin' && this.type !== 'destination') {
      throw new Error('Airport search input supports only "origin" and "destination" as type');
    }
  }

  searchTextChange(searchText) {
    if (this.type === 'origin') {
      this.props.filterOriginAirport(searchText);
    } else if (this.type === 'destination') {
      this.props.filterDestinationAirport(searchText);
    }
  }

  setSelectedAirport(item) {
    if (this.type === 'origin') {
      this.props.setOriginAirport(item);
      this.props.getConnectedAirports(item);
    } else if (this.type === 'destination') {
      this.props.setDestinationAirport(item);
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
