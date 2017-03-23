'use strict';

angular.module('Doob.productiondata').factory('ServiceWorkCenter', ['restResource', function ($restResource) {
	var ServiceWorkCenter = $restResource('/productiondata/workcenters');
  	return ServiceWorkCenter;
}]);