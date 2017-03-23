'use strict';

angular.module('Doob.productiondata').factory('ServiceConsumableSupplies', ['restResource', function ($restResource) {
	var ServiceConsumableSupplies = $restResource('/productiondata/consumablesuppliess');
  	return ServiceConsumableSupplies;
}]);