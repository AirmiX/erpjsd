'use strict';

angular.module('Doob.order').factory('ServiceCompany', ['restResource', function ($restResource) {
	var ServiceCompany = $restResource('/order/companys');
  	return ServiceCompany;
}]);