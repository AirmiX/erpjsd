'use strict';

angular.module('Doob.user').factory('ServiceAppUser', ['restResource', function ($restResource) {
	var ServiceAppUser = $restResource('/user/appusers');
  	return ServiceAppUser;
}]);