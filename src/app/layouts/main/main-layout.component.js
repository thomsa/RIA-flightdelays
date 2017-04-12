import * as uiActions from '../../_redux-store/actions/ui.actions';

class MainController {
  /** @ngInject */
  constructor($ngRedux, $scope, riaAirportService) {
    this.props = {};
    const unsubscribe = $ngRedux.connect(this.mapStateToThis,
      Object.assign({}, uiActions))(this.props);
    $scope.$on('$destroy', unsubscribe);
  }

  mapStateToThis(state) {
    return {
      ui: state.ui
    };
  }
}

export default {
  template: require('./main-layout.template.html'),
  controller: MainController,
  controllerAs: 'ctrl',
  bindings: {
    layout: '@',
    flex: '@'
  }
};
