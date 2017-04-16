import 'angular-mocks';
import layouts from './index';
import reduxStore from '../_redux-store';
import core from '../_core';

describe('layouts container component', () => {
  beforeEach(() => {
    angular.mock.module(reduxStore);
    angular.mock.module(core);
    angular.mock.module(layouts);
  });

  it('should compile with main layout', angular.mock.inject(($rootScope, $compile) => {
    const element = $compile('<ria-main-layout></ria-main-layout>')($rootScope);
    $rootScope.$digest();
    expect(element).not.toBeNull();
  }));
});
