'use strict';

angular.module('Doob.logical').factory('ServiceOfferSupplierItem', ['restResource', function ($restResource) {
	var ServiceOfferSupplierItem = $restResource('/logical/offersupplieritems');
  	return ServiceOfferSupplierItem;
}]);