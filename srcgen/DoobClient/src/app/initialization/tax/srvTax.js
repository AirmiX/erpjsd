'use strict';

angular.module('Doob.initialization').factory('ServiceTax', ['restResource', function ($restResource) {
	var ServiceTax = $restResource('/initialization/taxs');
  	return ServiceTax;
}]);