import * as uiActions from '../_redux-store/actions/ui.actions';
import * as stateActions from 'redux-ui-router';
class StartController {
  /** @ngInject */
  constructor($ngRedux, $scope) {
    this.props = {};
    const unsubscribe = $ngRedux.connect(this.mapStateToThis,
      Object.assign({},
        uiActions,
        stateActions))(this.props);
    $scope.$on('$destroy', unsubscribe);
  }

  getStarteClick() {
    this.props.getStartedClicked();
    this.props.stateGo('main.selectAirports');
  }

  mapStateToThis(state) {
    return {
      ui: state.ui
    };
  }
}

export default {
  template: require('./start.template.html'),
  controller: StartController,
  controllerAs: 'ctrl',
  bindings: {
    layout: '@',
    flex: '@'
  }
};
