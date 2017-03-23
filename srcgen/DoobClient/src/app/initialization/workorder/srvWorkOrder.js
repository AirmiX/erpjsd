'use strict';

angular.module('Doob.initialization').factory('ServiceWorkOrder', ['restResource', function ($restResource) {
	var ServiceWorkOrder = $restResource('/initialization/workorders');
  	return ServiceWorkOrder;
}]);