import angular from 'angular';
import 'angular-mocks';
import flipclock from './flip-clock.component';

describe('flip-clock component', () => {
  beforeEach(() => {
    angular.mock.module(flipclock);
  });

  it('should compile', angular.mock.inject(($rootScope, $compile) => {
    const element = $compile('<ria-flip-clock></ria-flip-clock>')($rootScope);
    $rootScope.$digest();
    expect(element).not.toBeNull();
  }));

  it('should have bindings defined', angular.mock.inject(($rootScope, $compile) => {
    const element = $compile('<ria-flip-clock minute="15" hour="20"></ria-flip-clock>')($rootScope);
    $rootScope.$digest();
    const controller = element.controller('riaFlipClock');
    expect(controller).toBeDefined();
    expect(controller.minute).toBeDefined();
    expect(controller.minute).toBe('15');
    expect(controller.hour).toBeDefined();
    expect(controller.hour).toBe('20');
  }));

  it('should show the right minute', angular.mock.inject(($rootScope, $compile) => {
    const element = $compile('<ria-flip-clock minute="15" hour="20"></ria-flip-clock>')($rootScope);
    $rootScope.$digest();
    expect(element.html()).toContain('15');
  }));

  it('should show the right hour', angular.mock.inject(($rootScope, $compile) => {
    const element = $compile('<ria-flip-clock minute="15" hour="20"></ria-flip-clock>')($rootScope);
    $rootScope.$digest();
    expect(element.html()).toContain('20');
  }));
});
