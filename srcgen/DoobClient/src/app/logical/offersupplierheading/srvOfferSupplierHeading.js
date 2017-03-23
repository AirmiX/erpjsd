'use strict';

angular.module('Doob.logical').factory('ServiceOfferSupplierHeading', ['restResource', function ($restResource) {
	var ServiceOfferSupplierHeading = $restResource('/logical/offersupplierheadings');
  	return ServiceOfferSupplierHeading;
}]);