'use strict';

angular.module('Doob.capacitymanagement').factory('ServiceCountryCurrency', ['restResource', function ($restResource) {
	var ServiceCountryCurrency = $restResource('/capacitymanagement/countrycurrencys');
  	return ServiceCountryCurrency;
}]);