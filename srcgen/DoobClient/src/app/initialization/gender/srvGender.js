'use strict';

angular.module('Doob.initialization').factory('ServiceGender', ['restResource', function ($restResource) {
	var ServiceGender = $restResource('/initialization/genders');
  	return ServiceGender;
}]);