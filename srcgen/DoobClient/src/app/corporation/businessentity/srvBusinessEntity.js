'use strict';

angular.module('Doob.corporation').factory('ServiceBusinessEntity', ['restResource', function ($restResource) {
	var ServiceBusinessEntity = $restResource('/corporation/businessentitys');
  	return ServiceBusinessEntity;
}]);