'use strict';

angular.module('Doob.productiondata').factory('ServiceControlDemands', ['restResource', function ($restResource) {
	var ServiceControlDemands = $restResource('/productiondata/controldemandss');
  	return ServiceControlDemands;
}]);