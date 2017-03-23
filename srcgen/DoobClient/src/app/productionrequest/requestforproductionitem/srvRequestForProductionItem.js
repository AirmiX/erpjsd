'use strict';

angular.module('Doob.productionrequest').factory('ServiceRequestForProductionItem', ['restResource', function ($restResource) {
	var ServiceRequestForProductionItem = $restResource('/productionrequest/requestforproductionitems');
  	return ServiceRequestForProductionItem;
}]);