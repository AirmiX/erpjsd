'use strict';

angular.module('Doob.productiondata').factory('ServiceProductionProcess', ['restResource', function ($restResource) {
	var ServiceProductionProcess = $restResource('/productiondata/productionprocesss');
  	return ServiceProductionProcess;
}]);