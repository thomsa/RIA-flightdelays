import angular from 'angular';
import 'angular-mocks';
import plane from './plane.component';

import {ROUTES} from '../../_core/core.globals';

describe('plane component', () => {
  beforeEach(() => {
    angular.mock.module(plane);
  });

  it('should compile', angular.mock.inject(($rootScope, $compile) => {
    const element = $compile('<ria-plane></ria-plane>')($rootScope);
    $rootScope.$digest();
    expect(element).not.toBeNull();
  }));

  it('should set the landed flag to true of route changes and it is not the starting page', angular.mock.inject(($rootScope, $componentController, $document) => {
    const scope = $rootScope.$new();
    const controller = $componentController('riaPlane', {$scope: scope, $document}, {});
    controller.onReady({name: ROUTES.AIRPORT_SEARCH_PAGE});
    expect(controller.landThePlane).toBe(true);
  }));

  it('should NOT set the landed flag to true of route changes and it is not the starting page', angular.mock.inject(($rootScope, $componentController, $document) => {
    const scope = $rootScope.$new();
    const controller = $componentController('riaPlane', {$scope: scope, $document}, {});
    controller.onReady({name: ROUTES.START_PAGE});
    expect(controller.landThePlane).toBeFalsy();
  }));
});
