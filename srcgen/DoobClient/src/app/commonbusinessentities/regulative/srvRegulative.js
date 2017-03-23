'use strict';

angular.module('Doob.commonbusinessentities').factory('ServiceRegulative', ['restResource', function ($restResource) {
	var ServiceRegulative = $restResource('/commonbusinessentities/regulatives');
  	return ServiceRegulative;
}]);