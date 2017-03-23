'use strict';

angular.module('Doob.corporation').factory('ServiceOrganizationSchema', ['restResource', function ($restResource) {
	var ServiceOrganizationSchema = $restResource('/corporation/organizationschemas');
  	return ServiceOrganizationSchema;
}]);