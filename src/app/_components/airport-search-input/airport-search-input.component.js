
class AirportSearchInputController {
  /** @ngInject */
  constructor($ngRedux, $scope, riaAirportActions) {
    this.ORIGIN = 'origin';
    this.DESTINATION = 'destination';
    this.props = {};
    const unsubscribe = $ngRedux.connect(this.mapStateToThis,
      Object.assign({},
        riaAirportActions))(this.props);
    $scope.$on('$destroy', unsubscribe);
  }

  $onChanges(changes) {
    if (this.type === this.DESTINATION) {
      if (!this.props.airports.selectedOrigin) {
        this.notFoundMessage = undefined;
      } else if (!this.notFoundMessage && this.searchText) {
        const thisItems = changes.items.currentValue;
        if ((thisItems && thisItems.length === 0)) {
          this.notFoundMessage = 'Sorry, no connected airports were found for this origin';
          return;
        }
        this.notFoundMessage = 'No such airport was found in our database';
      }
    }
  }

  $onInit() {
    if (this.type !== this.ORIGIN && this.type !== this.DESTINATION) {
      throw new Error('Airport search input supports only "origin" and "destination" as type');
    }
    if (this.type === this.ORIGIN) {
      this.notFoundMessage = 'No such airport was found in our database';
    }
  }

  searchTextChange(searchText) {
    if (this.type === this.ORIGIN) {
      this.props.filterOriginAirport(searchText);
    } else if (this.type === this.DESTINATION) {
      this.props.filterDestinationAirport(searchText);
    }
  }

  setSelectedAirport(item) {
    if (this.type === this.ORIGIN) {
      this.props.setOriginAirport(item);
      this.props.getConnectedAirports(item);
    } else if (this.type === this.DESTINATION) {
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
      items: '<'
    }
  }).name;
