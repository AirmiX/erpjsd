'use strict';

angular.module('Doob.capacitymanagement').factory('ServiceBalanceResource', ['restResource', function ($restResource) {
	var ServiceBalanceResource = $restResource('/capacitymanagement/balanceresources');
  	return ServiceBalanceResource;
}]);