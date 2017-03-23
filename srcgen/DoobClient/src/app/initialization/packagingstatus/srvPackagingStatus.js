'use strict';

angular.module('Doob.initialization').factory('ServicePackagingStatus', ['restResource', function ($restResource) {
	var ServicePackagingStatus = $restResource('/initialization/packagingstatuss');
  	return ServicePackagingStatus;
}]);