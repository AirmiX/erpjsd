'use strict';

angular.module('Doob.capacitymanagement').factory('ServiceCurrency', ['restResource', function ($restResource) {
	var ServiceCurrency = $restResource('/capacitymanagement/currencys');
  	return ServiceCurrency;
}]);