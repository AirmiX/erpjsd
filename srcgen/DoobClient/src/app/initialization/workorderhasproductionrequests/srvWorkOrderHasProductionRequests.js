'use strict';

angular.module('Doob.initialization').factory('ServiceWorkOrderHasProductionRequests', ['restResource', function ($restResource) {
	var ServiceWorkOrderHasProductionRequests = $restResource('/initialization/workorderhasproductionrequestss');
  	return ServiceWorkOrderHasProductionRequests;
}]);