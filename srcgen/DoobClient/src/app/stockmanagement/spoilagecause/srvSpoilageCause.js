'use strict';

angular.module('Doob.stockmanagement').factory('ServiceSpoilageCause', ['restResource', function ($restResource) {
	var ServiceSpoilageCause = $restResource('/stockmanagement/spoilagecauses');
  	return ServiceSpoilageCause;
}]);