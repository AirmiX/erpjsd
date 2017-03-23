'use strict';

angular.module('Doob.sellingprice').factory('ServiceOUBelonging', ['restResource', function ($restResource) {
	var ServiceOUBelonging = $restResource('/sellingprice/oubelongings');
  	return ServiceOUBelonging;
}]);