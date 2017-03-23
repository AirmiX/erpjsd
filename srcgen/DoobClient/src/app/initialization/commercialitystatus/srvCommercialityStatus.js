'use strict';

angular.module('Doob.initialization').factory('ServiceCommercialityStatus', ['restResource', function ($restResource) {
	var ServiceCommercialityStatus = $restResource('/initialization/commercialitystatuss');
  	return ServiceCommercialityStatus;
}]);