
class MainController {

}

export default {
  template: require('./main-layout.template.html'),
  controller: MainController,
  controllerAs: 'ctrl',
  bindings: {
    layout: '@',
    flex: '@'
  }
};
