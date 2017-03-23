'use strict';

angular.module('Doob.corporation').factory('ServiceDocumentType', ['restResource', function ($restResource) {
	var ServiceDocumentType = $restResource('/corporation/documenttypes');
  	return ServiceDocumentType;
}]);