'use strict';

angular.module('Doob.procurementplan').factory('ServicePlanningPeriod', ['restResource', function ($restResource) {
	var ServicePlanningPeriod = $restResource('/procurementplan/planningperiods');
  	return ServicePlanningPeriod;
}]);