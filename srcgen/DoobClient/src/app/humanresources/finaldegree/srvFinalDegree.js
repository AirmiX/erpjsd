'use strict';

angular.module('Doob.humanresources').factory('ServiceFinalDegree', ['restResource', function ($restResource) {
	var ServiceFinalDegree = $restResource('/humanresources/finaldegrees');
  	return ServiceFinalDegree;
}]);