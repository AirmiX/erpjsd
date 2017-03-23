'use strict';

angular.module('Doob.capacitymanagement').factory('ServiceWorkOn', ['restResource', function ($restResource) {
	var ServiceWorkOn = $restResource('/capacitymanagement/workons');
  	return ServiceWorkOn;
}]);