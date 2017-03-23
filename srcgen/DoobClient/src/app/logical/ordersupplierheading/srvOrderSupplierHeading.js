'use strict';

angular.module('Doob.logical').factory('ServiceOrderSupplierHeading', ['restResource', function ($restResource) {
	var ServiceOrderSupplierHeading = $restResource('/logical/ordersupplierheadings');
  	return ServiceOrderSupplierHeading;
}]);