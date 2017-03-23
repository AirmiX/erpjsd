'use strict';

angular.module('Doob.corporation').factory('ServiceEmployee', ['restResource', function ($restResource) {
	var ServiceEmployee = $restResource('/corporation/employees');
  	return ServiceEmployee;
}]);