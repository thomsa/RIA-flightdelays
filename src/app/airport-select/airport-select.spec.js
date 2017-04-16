import 'angular-mocks';
import airportSelect from './index';
import reduxStore from '../_redux-store';
import core from '../_core';

describe('airport select container component', () => {
  beforeEach(() => {
    angular.mock.module(reduxStore);
    angular.mock.module(core);
    angular.mock.module(airportSelect);
  });

  it('should compile', angular.mock.inject(($rootScope, $compile) => {
    const element = $compile('<ria-airport-select></ria-airport-select>')($rootScope);
    $rootScope.$digest();
    expect(element).not.toBeNull();
  }));

  it('should call getAllAirports() on init',
    angular.mock.inject(($rootScope, $componentController, $ngRedux, $mdMedia, riaAirportActions) => {
      const scope = $rootScope.$new();
      const controller = $componentController('riaAirportSelect',
        {$ngRedux, $scope: scope, $mdMedia, riaAirportActions},
        {});
      const spy = spyOn(controller.props, 'getAllAirports').and.callThrough();
      controller.$onInit();
      expect(spy).toHaveBeenCalled();
    }));

  it('should call stateGo() after submitting with origin and destination airport set',
    angular.mock.inject(($rootScope, $componentController, $ngRedux, $mdMedia, riaAirportActions) => {
      const scope = $rootScope.$new();
      const controller = $componentController('riaAirportSelect',
        {$ngRedux, $scope: scope, $mdMedia, riaAirportActions},
        {});
      controller.props.airports.selectedOrigin = {code: 'test'};
      controller.props.airports.selectedDestination = {code: 'test'};
      const spy = spyOn(controller.props, 'stateGo').and.callThrough();
      controller.submit();
      expect(spy).toHaveBeenCalled();
    }));

  it('should NOT call stateGo() after submitting without destination airport set',
    angular.mock.inject(($rootScope, $componentController, $ngRedux, $mdMedia, riaAirportActions) => {
      const scope = $rootScope.$new();
      const controller = $componentController('riaAirportSelect',
        {$ngRedux, $scope: scope, $mdMedia, riaAirportActions},
        {});

      controller.props.airports.selectedOrigin = {code: 'test'};
      controller.props.airports.selectedDestination = undefined;
      const spy = spyOn(controller.props, 'stateGo').and.callThrough();
      controller.submit();
      expect(spy).not.toHaveBeenCalled();
    }));

  it('should NOT call stateGo() after submitting without origin airport set',
    angular.mock.inject(($rootScope, $componentController, $ngRedux, $mdMedia, riaAirportActions) => {
      const scope = $rootScope.$new();
      const controller = $componentController('riaAirportSelect',
        {$ngRedux, $scope: scope, $mdMedia, riaAirportActions},
        {});

      controller.props.airports.selectedOrigin = undefined;
      controller.props.airports.selectedDestination = {code: 'test'};
      const spy = spyOn(controller.props, 'stateGo').and.callThrough();
      controller.submit();
      expect(spy).not.toHaveBeenCalled();
    }));

  it('should NOT call stateGo() after submitting without origin and destination airport set',
    angular.mock.inject(($rootScope, $componentController, $ngRedux, $mdMedia, riaAirportActions) => {
      const scope = $rootScope.$new();
      const controller = $componentController('riaAirportSelect',
        {$ngRedux, $scope: scope, $mdMedia, riaAirportActions},
        {});

      controller.props.airports.selectedOrigin = undefined;
      controller.props.airports.selectedDestination = undefined;
      const spy = spyOn(controller.props, 'stateGo').and.callThrough();
      controller.submit();
      expect(spy).not.toHaveBeenCalled();
    }));
});
