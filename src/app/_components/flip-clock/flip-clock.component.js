
class FlipClockController {

}

export default angular.module('ria.components.flip-clock', [])
  .component('riaFlipClock', {
    template: require('./flip-clock.html'),
    controller: FlipClockController,
    controllerAs: 'ctrl',
    bindings: {
      hour: '@',
      minute: '@'
    }
  }).name;
