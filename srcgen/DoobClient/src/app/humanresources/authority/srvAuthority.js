'use strict';

angular.module('Doob.humanresources').factory('ServiceAuthority', ['restResource', function ($restResource) {
	var ServiceAuthority = $restResource('/humanresources/authoritys');
  	return ServiceAuthority;
}]);