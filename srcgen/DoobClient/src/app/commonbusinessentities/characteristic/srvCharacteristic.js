'use strict';

angular.module('Doob.commonbusinessentities').factory('ServiceCharacteristic', ['restResource', function ($restResource) {
	var ServiceCharacteristic = $restResource('/commonbusinessentities/characteristics');
  	return ServiceCharacteristic;
}]);