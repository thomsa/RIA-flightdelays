import 'angular-mocks';
import $ from 'jquery';
import result from './index';
import reduxStore from '../_redux-store';
import core from '../_core';
// auto assignment of jQuery doesn't work in angular for some reason.
angular.element = $;

describe('results container component', () => {
  beforeEach(() => {
    angular.mock.module(reduxStore);
    angular.mock.module(core);
    angular.mock.module(result);
  });

  it('should compile', angular.mock.inject(($rootScope, $compile) => {
    const element = $compile('<ria-results show-charts-template="false"></ria-results>')($rootScope);
    $rootScope.$digest();
    expect(element).not.toBeNull();
  }));

  it('should show the CHARTS template if showChartsTemplate is TRUE',
      angular.mock.inject(($rootScope, $compile) => {
        const scope = $rootScope.$new();
        const element = $compile('<div><ria-results show-charts-template="true"></ria-results></div>')(scope);
        scope.$apply();

        expect(angular.element(element).find('#charts-content').length).toBe(1);
        expect(angular.element(element).find('#calendar-content').length).toBe(0);
      }));

  it('should show the CALENDAR template if showChartsTemplate is FALSE',
       angular.mock.inject(($rootScope, $compile) => {
         const scope = $rootScope.$new();
         const element = $compile('<div><ria-results show-charts-template="false"></ria-results></div>')(scope);
         scope.$apply();

         expect(angular.element(element).find('#charts-content').length).toBe(0);
         expect(angular.element(element).find('#calendar-content').length).toBe(1);
       }));

  it('should call statego function when redirecting to charts page',
    angular.mock.inject(($rootScope, $componentController, $ngRedux, riaFlightDetailsActions, $stateParams) => {
      const scope = $rootScope.$new();
      const controller = $componentController('riaResults',
        {$ngRedux, $scope: scope, riaFlightDetailsActions, $stateParams},
        {});
      const spy = spyOn(controller.props, 'stateGo').and.callThrough();
      controller.goToChart();
      expect(spy).toHaveBeenCalled();
    }));

  it('should get the flight data on init',
    angular.mock.inject(($rootScope, $componentController, $ngRedux, riaFlightDetailsActions, $stateParams) => {
      const scope = $rootScope.$new();
      $stateParams.originCode = 'ABQ';
      $stateParams.destinationCode = 'LAX';
      const controller = $componentController('riaResults',
        {$ngRedux, $scope: scope, riaFlightDetailsActions, $stateParams},
        {});
      const spy = spyOn(controller.props, 'getFlightData').and.callThrough();
      controller.$onInit();
      expect(spy).toHaveBeenCalled();
    }));
});
