import 'angular-mocks';
import start from './index';
import reduxStore from '../_redux-store';
import core from '../_core';

describe('start container component', () => {
  beforeEach(() => {
    angular.mock.module(reduxStore);
    angular.mock.module(core);
    angular.mock.module(start);
  });

  it('should compile', angular.mock.inject(($rootScope, $compile) => {
    const element = $compile('<ria-start></ria-start>')($rootScope);
    $rootScope.$digest();
    expect(element).not.toBeNull();
  }));

  it('should call statego function when calling getStartedClick()',
    angular.mock.inject(($rootScope, $componentController, $ngRedux) => {
      const scope = $rootScope.$new();
      const controller = $componentController('riaStart',
        {$ngRedux, $scope: scope},
        {});
      const spy = spyOn(controller.props, 'stateGo').and.callThrough();
      controller.getStartedClick();
      expect(spy).toHaveBeenCalled();
    }));
});
