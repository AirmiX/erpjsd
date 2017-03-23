'use strict';

angular.module('Doob.corporation').factory('ServiceBank', ['restResource', function ($restResource) {
	var ServiceBank = $restResource('/corporation/banks');
  	return ServiceBank;
}]);