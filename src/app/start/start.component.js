import {ROUTES} from '../_core/core.globals';
import * as stateActions from 'redux-ui-router';
class StartController {
  /** @ngInject */
  constructor($ngRedux, $scope) {
    this.props = {};
    const unsubscribe = $ngRedux.connect(this.mapStateToThis,
      Object.assign({},
        stateActions))(this.props);
    $scope.$on('$destroy', unsubscribe);
  }

  getStartedClick() {
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
