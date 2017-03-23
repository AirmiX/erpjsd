
'use strict';
angular.module('resources.users', ['Doob.common']);
angular.module('resources.users').factory('Users', ['restResource', function ($restResource) {
  var Users = $restResource('user/appUsers');
  return Users;
}]);