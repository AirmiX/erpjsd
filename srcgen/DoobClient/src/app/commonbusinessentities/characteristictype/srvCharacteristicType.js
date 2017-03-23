'use strict';

angular.module('Doob.commonbusinessentities').factory('ServiceCharacteristicType', ['restResource', function ($restResource) {
	var ServiceCharacteristicType = $restResource('/commonbusinessentities/characteristictypes');
  	return ServiceCharacteristicType;
}]);