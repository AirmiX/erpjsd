'use strict';

angular.module('Doob.initialization').factory('ServiceDeclarationBasis', ['restResource', function ($restResource) {
	var ServiceDeclarationBasis = $restResource('/initialization/declarationbasiss');
  	return ServiceDeclarationBasis;
}]);