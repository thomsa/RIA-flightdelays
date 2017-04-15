import {ROUTES} from '../_core/core.globals';
import * as stateActions from 'redux-ui-router';
class StartController {
  /** @ngInject */
  constructor($ngRedux, $scope, riaUiActions) {
    this.props = {};
    const unsubscribe = $ngRedux.connect(this.mapStateToThis,
      Object.assign({},
        riaUiActions,
        stateActions))(this.props);
    $scope.$on('$destroy', unsubscribe);
  }

  getStartedClick() {
    this.props.getStartedClicked();
    this.props.stateGo(ROUTES.AIRPORT_SEARCH_PAGE);
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
