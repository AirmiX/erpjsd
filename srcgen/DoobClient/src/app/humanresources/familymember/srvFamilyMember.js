'use strict';

angular.module('Doob.humanresources').factory('ServiceFamilyMember', ['restResource', function ($restResource) {
	var ServiceFamilyMember = $restResource('/humanresources/familymembers');
  	return ServiceFamilyMember;
}]);