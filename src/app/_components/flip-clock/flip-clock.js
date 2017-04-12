import angular from 'angular';

class FlipClockController {

}

export default angular.module('ria.components.flip-clock', [])
  .component('flipClock', {
    template: require('./flip-clock.html'),
    controller: FlipClockController,
    controllerAs: 'ctrl',
    bindings: {
      hour: '@',
      minute: '@'
    }
  }).name;
