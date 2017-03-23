'use strict';

angular.module('Doob.user').factory('ServiceLanguage', ['restResource', function ($restResource) {
	var ServiceLanguage = $restResource('/user/languages');
  	return ServiceLanguage;
}]);