'use strict';

angular.module('Doob.humanresources').factory('ServiceNationality', ['restResource', function ($restResource) {
	var ServiceNationality = $restResource('/humanresources/nationalitys');
  	return ServiceNationality;
}]);