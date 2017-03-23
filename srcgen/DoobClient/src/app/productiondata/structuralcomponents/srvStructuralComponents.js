'use strict';

angular.module('Doob.productiondata').factory('ServiceStructuralComponents', ['restResource', function ($restResource) {
	var ServiceStructuralComponents = $restResource('/productiondata/structuralcomponentss');
  	return ServiceStructuralComponents;
}]);