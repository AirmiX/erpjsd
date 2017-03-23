'use strict';

angular.module('Doob.initialization').factory('ServiceProcurementPlanHeading', ['restResource', function ($restResource) {
	var ServiceProcurementPlanHeading = $restResource('/initialization/procurementplanheadings');
  	return ServiceProcurementPlanHeading;
}]);