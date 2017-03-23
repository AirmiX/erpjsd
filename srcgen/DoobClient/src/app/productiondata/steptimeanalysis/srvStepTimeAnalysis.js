'use strict';

angular.module('Doob.productiondata').factory('ServiceStepTimeAnalysis', ['restResource', function ($restResource) {
	var ServiceStepTimeAnalysis = $restResource('/productiondata/steptimeanalysiss');
  	return ServiceStepTimeAnalysis;
}]);