'use strict';

angular.module('Doob.stockmanagement').factory('ServiceTangibleItemCondition', ['restResource', function ($restResource) {
	var ServiceTangibleItemCondition = $restResource('/stockmanagement/tangibleitemconditions');
  	return ServiceTangibleItemCondition;
}]);