/**
 * Created by davidmansy on 05/05/15.
 */
'use strict';

angular
.module('app', ['ngMessages'])
.config(routing)
.run(handleRoutingError);

routing.$inject = ['$routeProvider'];
handleRoutingError.$inject = ['$rootScope', '$location'];

function routing($routeProvider) {
  $routeProvider
  .when('/', {
    templateUrl: 'home/home.html'
  })
  .when('/newmeal', {
    templateUrl: 'newmeal/newmeal.hmtl'
  })
  .when('/earnings', {
    templateUrl: 'earnings/earnings.html'
  })
  .when('error', {
    template: '<p>Error - Not found</p>'
  });
}

function handleRoutingError($rootScope, $location) {
  $rootScope.$on('$routeChangeError', function() {
    $location.path('/error');
  });
}