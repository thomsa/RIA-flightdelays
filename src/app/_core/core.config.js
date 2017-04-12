export default config;

/** @ngInject */
function config($stateProvider, $urlRouterProvider, $locationProvider) {
  $locationProvider.html5Mode(true).hashPrefix('!');
  $urlRouterProvider.otherwise('/not-found');

  $stateProvider
    .state('notFound', {
      url: '/not-found',
      templateUrl: './not-found-template/HTTP404.html'
    });
}
