'use strict';

angular.module('Doob.productiondata').factory('ServiceStepTool', ['restResource', function ($restResource) {
	var ServiceStepTool = $restResource('/productiondata/steptools');
  	return ServiceStepTool;
}]);