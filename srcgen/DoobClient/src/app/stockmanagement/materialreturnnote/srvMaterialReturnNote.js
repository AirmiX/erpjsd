'use strict';

angular.module('Doob.stockmanagement').factory('ServiceMaterialReturnNote', ['restResource', function ($restResource) {
	var ServiceMaterialReturnNote = $restResource('/stockmanagement/materialreturnnotes');
  	return ServiceMaterialReturnNote;
}]);