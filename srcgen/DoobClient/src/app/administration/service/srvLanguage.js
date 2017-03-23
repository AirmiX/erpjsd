'use strict';
angular.module('Doob.administration').factory('ServiceLanguage', ['restResource', function ($restResource) {
	var ServiceLanguage = $restResource('/user/languages');
  	return ServiceLanguage;
}]);		
