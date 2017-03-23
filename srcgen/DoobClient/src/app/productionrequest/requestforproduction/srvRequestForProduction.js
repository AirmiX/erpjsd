'use strict';

angular.module('Doob.productionrequest').factory('ServiceRequestForProduction', ['restResource', function ($restResource) {
	var ServiceRequestForProduction = $restResource('/productionrequest/requestforproductions');
  	return ServiceRequestForProduction;
}]);