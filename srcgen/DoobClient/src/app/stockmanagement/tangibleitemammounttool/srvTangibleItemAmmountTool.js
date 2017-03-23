'use strict';

angular.module('Doob.stockmanagement').factory('ServiceTangibleItemAmmountTool', ['restResource', function ($restResource) {
	var ServiceTangibleItemAmmountTool = $restResource('/stockmanagement/tangibleitemammounttools');
  	return ServiceTangibleItemAmmountTool;
}]);