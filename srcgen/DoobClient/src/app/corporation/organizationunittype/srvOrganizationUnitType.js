'use strict';

angular.module('Doob.corporation').factory('ServiceOrganizationUnitType', ['restResource', function ($restResource) {
	var ServiceOrganizationUnitType = $restResource('/corporation/organizationunittypes');
  	return ServiceOrganizationUnitType;
}]);