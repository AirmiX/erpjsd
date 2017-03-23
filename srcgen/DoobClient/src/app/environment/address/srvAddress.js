'use strict';

angular.module('Doob.environment').factory('ServiceAddress', ['restResource', function ($restResource) {
	var ServiceAddress = $restResource('/environment/addresss');
  	return ServiceAddress;
}]);