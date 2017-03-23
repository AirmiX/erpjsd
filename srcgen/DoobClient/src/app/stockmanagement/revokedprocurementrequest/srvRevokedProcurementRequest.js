'use strict';

angular.module('Doob.stockmanagement').factory('ServiceRevokedProcurementRequest', ['restResource', function ($restResource) {
	var ServiceRevokedProcurementRequest = $restResource('/stockmanagement/revokedprocurementrequests');
  	return ServiceRevokedProcurementRequest;
}]);