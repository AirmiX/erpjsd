'use strict';

angular.module('Doob.initialization').factory('ServiceProcurementPlanItemHasOrderSupplierItem', ['restResource', function ($restResource) {
	var ServiceProcurementPlanItemHasOrderSupplierItem = $restResource('/initialization/procurementplanitemhasordersupplieritems');
  	return ServiceProcurementPlanItemHasOrderSupplierItem;
}]);