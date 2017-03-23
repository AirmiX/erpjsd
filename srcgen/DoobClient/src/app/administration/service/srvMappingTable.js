'use strict';
angular.module('Doob.administration').factory('ServiceMappingTable', ['restResource', function ($restResource) {
	var ServiceMappingTable = $restResource('administration/mappingTables');
  	return ServiceMappingTable;
}]);		
