'use strict';

angular.module('Doob.initialization').factory('ServiceProcurementRequestItem', ['restResource', function ($restResource) {
	var ServiceProcurementRequestItem = $restResource('/initialization/procurementrequestitems');
  	return ServiceProcurementRequestItem;
}]);