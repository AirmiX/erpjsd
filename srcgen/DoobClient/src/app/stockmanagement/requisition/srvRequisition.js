'use strict';

angular.module('Doob.stockmanagement').factory('ServiceRequisition', ['restResource', function ($restResource) {
	var ServiceRequisition = $restResource('/stockmanagement/requisitions');
  	return ServiceRequisition;
}]);