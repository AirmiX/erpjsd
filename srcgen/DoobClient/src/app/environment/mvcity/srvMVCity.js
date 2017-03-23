'use strict';

angular.module('Doob.environment').factory('ServiceMVCity', ['restResource', function ($restResource) {
	var ServiceMVCity = $restResource('/environment/mvcitys');
  	return ServiceMVCity;
}]);