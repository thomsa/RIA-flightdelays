import * as globals from '../../_core/core.globals';
class CalendarController {
   /** @ngInject */
  constructor() {
    this.months = globals.MONTHS;
  }

  $onInit() {
    this.day = parseInt(this.day, 10);
    const Calendar = new Date();
    const currentYear = Calendar.getFullYear();     // Returns year
    const currentMonth = Calendar.getMonth();    // Returns month (0-11)
    const today = Calendar.getDate();    // Returns day (1-31)

    if (this.day >= today) {
      this.startingDayOfTheMonth = new Array(new Date(currentYear + '-' + (currentMonth + 1) + '-01').getDay() - 1);
      this.month = this.months[currentMonth];
      this.daysInMonth = new Array(new Date(currentYear, (currentMonth + 1), 0).getDate());
    } else {
      this.startingDayOfTheMonth = new Array(new Date(currentYear + '-' + (currentMonth + 2) + '-01').getDay() - 1);
      this.month = this.months[currentMonth + 1];
      this.daysInMonth = new Array(new Date(currentYear, (currentMonth + 2), 0).getDate());
    }
  }
}
export default angular.module('ria.components.calendar', [])
  .component('riaCalendar', {
    template: require('./calendar.html'),
    controller: CalendarController,
    controllerAs: 'ctrl',
    bindings: {
      day: '@'
    }
  }).name;
