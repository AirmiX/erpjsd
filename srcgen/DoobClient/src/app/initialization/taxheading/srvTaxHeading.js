'use strict';

angular.module('Doob.initialization').factory('ServiceTaxHeading', ['restResource', function ($restResource) {
	var ServiceTaxHeading = $restResource('/initialization/taxheadings');
  	return ServiceTaxHeading;
}]);