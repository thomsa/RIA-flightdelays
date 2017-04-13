
class CalendarController {
   /** @ngInject */
  $onInit() {
    this.startingDayOfTheMonth = new Array(new Date(this.nextTravelData.year, this.nextTravelData.month, 1).getDay() - 1);
    this.daysInMonth = new Array(new Date(this.nextTravelData.year, this.nextTravelData.month, 0).getDate());
  }
}
export default angular.module('ria.components.calendar', [])
  .component('riaCalendar', {
    template: require('./calendar.html'),
    controller: CalendarController,
    controllerAs: 'ctrl',
    bindings: {
      nextTravelData: '<'
    }
  }).name;
