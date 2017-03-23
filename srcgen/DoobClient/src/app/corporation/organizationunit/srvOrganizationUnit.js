'use strict';

angular.module('Doob.corporation').factory('ServiceOrganizationUnit', ['restResource', function ($restResource) {
	var ServiceOrganizationUnit = $restResource('/corporation/organizationunits');
  	return ServiceOrganizationUnit;
}]);