import angular from 'angular';
import 'angular-mocks';
import calendar from './calendar';

describe('calendar component', () => {
  beforeEach(() => {
    angular.mock.module(calendar);
  });

  it('should compile', angular.mock.inject(($rootScope, $componentController) => {
    const nextTravelData = {
      year: 2017,
      month: 2
    };
    const scope = $rootScope.$new();
    const controller = $componentController('riaCalendar', {$scope: scope}, {nextTravelData});
    controller.$onInit();
    expect(controller.daysInMonth.length).toBe(28);
  }));

  it('should mark the good day as active', angular.mock.inject(($rootScope, $compile) => {
    const scope = $rootScope.$new();
    scope.nextTravelData = {
      year: 2017,
      month: 2,
      day: 12,
      monthText: 'February'
    };
    const element = $compile('<ria-calendar next-travel-data="nextTravelData"></ria-calendar>')(scope);
    scope.$digest();
    const elems = element.find('li'); // returns all the div's in the $elements
    angular.forEach(elems, v => {
      if (angular.element(v).hasClass('active')) {
        expect(angular.element(v).html()).toBe('12');
      }
    });
    expect(element).not.toBeNull();
  }));
});
