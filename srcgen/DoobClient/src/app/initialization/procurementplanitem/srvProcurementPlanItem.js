'use strict';

angular.module('Doob.initialization').factory('ServiceProcurementPlanItem', ['restResource', function ($restResource) {
	var ServiceProcurementPlanItem = $restResource('/initialization/procurementplanitems');
  	return ServiceProcurementPlanItem;
}]);