'use strict';

angular.module('Doob.initialization').factory('ServiceDenotationMethod', ['restResource', function ($restResource) {
	var ServiceDenotationMethod = $restResource('/initialization/denotationmethods');
  	return ServiceDenotationMethod;
}]);