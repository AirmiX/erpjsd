'use strict';

angular.module('Doob.corporation').factory('ServiceAccount', ['restResource', function ($restResource) {
	var ServiceAccount = $restResource('/corporation/accounts');
  	return ServiceAccount;
}]);