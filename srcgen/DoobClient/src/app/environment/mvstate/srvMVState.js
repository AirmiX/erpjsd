'use strict';

angular.module('Doob.environment').factory('ServiceMVState', ['restResource', function ($restResource) {
	var ServiceMVState = $restResource('/environment/mvstates');
  	return ServiceMVState;
}]);