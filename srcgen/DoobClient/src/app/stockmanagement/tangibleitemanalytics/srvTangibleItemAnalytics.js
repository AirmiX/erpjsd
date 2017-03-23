'use strict';

angular.module('Doob.stockmanagement').factory('ServiceTangibleItemAnalytics', ['restResource', function ($restResource) {
	var ServiceTangibleItemAnalytics = $restResource('/stockmanagement/tangibleitemanalyticss');
  	return ServiceTangibleItemAnalytics;
}]);