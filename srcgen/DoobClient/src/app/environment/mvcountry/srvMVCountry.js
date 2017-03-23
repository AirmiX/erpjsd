'use strict';

angular.module('Doob.environment').factory('ServiceMVCountry', ['restResource', function ($restResource) {
	var ServiceMVCountry = $restResource('/environment/mvcountrys');
  	return ServiceMVCountry;
}]);