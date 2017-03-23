'use strict';

angular.module('Doob.logical').factory('ServiceProcurementRequestSettlement', ['restResource', function ($restResource) {
	var ServiceProcurementRequestSettlement = $restResource('/logical/procurementrequestsettlements');
  	return ServiceProcurementRequestSettlement;
}]);