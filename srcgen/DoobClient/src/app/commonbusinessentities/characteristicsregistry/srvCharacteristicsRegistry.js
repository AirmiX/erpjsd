'use strict';

angular.module('Doob.commonbusinessentities').factory('ServiceCharacteristicsRegistry', ['restResource', function ($restResource) {
	var ServiceCharacteristicsRegistry = $restResource('/commonbusinessentities/characteristicsregistrys');
  	return ServiceCharacteristicsRegistry;
}]);