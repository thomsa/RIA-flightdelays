export default config;

/** @ngInject */
function config($stateProvider, $urlRouterProvider, $locationProvider) {
  $locationProvider.html5Mode({enabled: true, requireBase: false}).hashPrefix('!');
  $urlRouterProvider.otherwise('/not-found');

  $stateProvider
    .state('notFound', {
      url: '/not-found',
      template: require('./not-found-template/HTTP404.html')
    });
}
