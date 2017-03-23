'use strict';

angular.module('Doob.productiondata').factory('ServiceProductionProcessSteps', ['restResource', function ($restResource) {
	var ServiceProductionProcessSteps = $restResource('/productiondata/productionprocessstepss');
  	return ServiceProductionProcessSteps;
}]);