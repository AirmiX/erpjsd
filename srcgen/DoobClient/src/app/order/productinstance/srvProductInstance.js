'use strict';

angular.module('Doob.order').factory('ServiceProductInstance', ['restResource', function ($restResource) {
	var ServiceProductInstance = $restResource('/order/productinstances');
  	return ServiceProductInstance;
}]);