'use strict';
angular.module('Doob.administration').factory('ServiceChangePassword', ['restResource', function ($restResource) {
	var ServiceChangePassword = $restResource('/user/appUsers');
  	return ServiceChangePassword;
}]);		
