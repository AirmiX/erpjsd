'use strict';

angular.module('Doob.initialization').factory('ServiceProcurementRequestHeading', ['restResource', function ($restResource) {
	var ServiceProcurementRequestHeading = $restResource('/initialization/procurementrequestheadings');
  	return ServiceProcurementRequestHeading;
}]);