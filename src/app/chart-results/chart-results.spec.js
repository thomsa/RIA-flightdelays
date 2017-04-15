import angular from 'angular';
import 'angular-mocks';
import result from './index';
import reduxStore from '../_redux-store';
import core from '../_core';

describe('chart results container component', () => {
  beforeEach(() => {
    angular.mock.module(reduxStore);
    angular.mock.module(core);
    angular.mock.module(result);
  });

  it('should compile', angular.mock.inject(($rootScope, $compile) => {
    const element = $compile('<ria-chart-results></ria-chart-results>')($rootScope);
    $rootScope.$digest();
    expect(element).not.toBeNull();
  }));

  it('should get the flight data on init',
    angular.mock.inject(($rootScope, $componentController, $ngRedux, riaFlightDetailsActions, $stateParams) => {
      const scope = $rootScope.$new();
      $stateParams.originCode = 'ABQ';
      $stateParams.destinationCode = 'LAX';
      const controller = $componentController('riaChartResults',
        {$ngRedux, $scope: scope, riaFlightDetailsActions, $stateParams},
        {});
      const spy = spyOn(controller.props, 'getFlightData').and.callThrough();
      controller.$onInit();
      expect(spy).toHaveBeenCalled();
    }));
});
