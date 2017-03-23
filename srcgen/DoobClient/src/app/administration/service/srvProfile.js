'use strict';
angular.module('Doob.administration').factory('ServiceProfile', ['restResource', function ($restResource) {
	var ServiceMappingTable = $restResource('/user/appUsers');
  	return ServiceMappingTable;
}]);		
