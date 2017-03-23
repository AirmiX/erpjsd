'use strict';

angular.module('Doob.productiondata').factory('ServiceStepsClassification', ['restResource', function ($restResource) {
	var ServiceStepsClassification = $restResource('/productiondata/stepsclassifications');
  	return ServiceStepsClassification;
}]);