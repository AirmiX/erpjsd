'use strict';

angular.module('Doob.capacitymanagement').factory('ServiceAsset', ['restResource', function ($restResource) {
	var ServiceAsset = $restResource('/capacitymanagement/assets');
  	return ServiceAsset;
}]);