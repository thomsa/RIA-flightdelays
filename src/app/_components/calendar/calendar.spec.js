import angular from 'angular';
import 'angular-mocks';
import calendar from './calendar';

describe('calendar component', () => {
  beforeEach(() => {
    angular
      .module('calendar', [calendar]);
    angular.mock.module(calendar);
  });

  xit('should compile', angular.mock.inject(($rootScope, $compile) => {
    const element = $compile('<ria-calendar day="15"></ria-calendar>')($rootScope);
    $rootScope.$digest();
    expect(element).not.toBeNull();
  }));

  xit('should mark the good day as active', angular.mock.inject(($rootScope, $compile) => {
    const element = $compile('<ria-calendar day="12"></ria-calendar>')($rootScope);
    $rootScope.$digest();
    console.info(element.find('.active'));
    expect(element).not.toBeNull();
  }));
});
