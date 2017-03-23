'use strict';

angular.module('Doob.initialization').factory('ServiceDiscountType', ['restResource', function ($restResource) {
	var ServiceDiscountType = $restResource('/initialization/discounttypes');
  	return ServiceDiscountType;
}]);