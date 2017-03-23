'use strict';
angular.module('Doob.administration').factory('ServiceLogin', ['restResource', function ($restResource) {
	var ServiceLogin = $restResource('/user/appUsers');
  	return ServiceLogin;
}]);		
