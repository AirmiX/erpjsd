'use strict';

angular.module('Doob.order').factory('ServiceSpecialProject', ['restResource', function ($restResource) {
	var ServiceSpecialProject = $restResource('/order/specialprojects');
  	return ServiceSpecialProject;
}]);