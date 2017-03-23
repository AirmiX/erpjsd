'use strict';

angular.module('Doob.productiondata').factory('ServiceProductionProcessType', ['restResource', function ($restResource) {
	var ServiceProductionProcessType = $restResource('/productiondata/productionprocesstypes');
  	return ServiceProductionProcessType;
}]);