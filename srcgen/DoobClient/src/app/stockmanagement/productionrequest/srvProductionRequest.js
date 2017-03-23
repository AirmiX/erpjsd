'use strict';

angular.module('Doob.stockmanagement').factory('ServiceProductionRequest', ['restResource', function ($restResource) {
	var ServiceProductionRequest = $restResource('/stockmanagement/productionrequests');
  	return ServiceProductionRequest;
}]);