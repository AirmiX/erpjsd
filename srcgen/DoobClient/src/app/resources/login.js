'use strict';
angular.module('resources.login',['ngResource'])
.service('Login', ['$resource', function($resource){
    return $resource('/DoobIISServer/api/user/appUsers/login');
}]);
