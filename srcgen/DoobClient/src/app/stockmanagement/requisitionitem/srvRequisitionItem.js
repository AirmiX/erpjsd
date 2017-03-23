'use strict';

angular.module('Doob.stockmanagement').factory('ServiceRequisitionItem', ['restResource', function ($restResource) {
	var ServiceRequisitionItem = $restResource('/stockmanagement/requisitionitems');
  	return ServiceRequisitionItem;
}]);