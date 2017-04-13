import angular from 'angular';
import 'angular-mocks';
import fliplock from './flip-clock';

describe('flip-clock component', () => {
  beforeEach(() => {
    angular
      .module('flipClock', [fliplock]);

    angular.mock.module('flipClock');
  });
  it('should compile', angular.mock.inject(($rootScope, $compile) => {
    const element = $compile('<flip-clock></flip-clock>')($rootScope);
    $rootScope.$digest();
    expect(element).not.toBeNull();
  }));

  it('should have bindings defined', angular.mock.inject(($rootScope, $compile) => {
    const element = $compile('<flip-clock minute="15" hour="20"></flip-clock>')($rootScope);
    $rootScope.$digest();
// controller = $componentController('myComponent', {$scope: scope}, {myBinding: '1.5'});
    const controller = element.controller('flipClock');

    expect(controller).toBeDefined();
    expect(controller.minute).toBeDefined();
    expect(controller.minute).toBe('15');
    expect(controller.hour).toBeDefined();
    expect(controller.hour).toBe('20');
  }));

  it('should contain the right minute', angular.mock.inject(($rootScope, $compile) => {
    const element = $compile('<flip-clock minute="15" hour="20"></flip-clock>')($rootScope);
    $rootScope.$digest();
    expect(element.html()).toContain('15');
  }));

  it('should contain the right hour', angular.mock.inject(($rootScope, $compile) => {
    const element = $compile('<flip-clock minute="15" hour="20"></flip-clock>')($rootScope);
    $rootScope.$digest();
    expect(element.html()).toContain('20');
  }));
});
