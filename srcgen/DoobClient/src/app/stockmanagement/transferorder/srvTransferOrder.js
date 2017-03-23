'use strict';

angular.module('Doob.stockmanagement').factory('ServiceTransferOrder', ['restResource', function ($restResource) {
	var ServiceTransferOrder = $restResource('/stockmanagement/transferorders');
  	return ServiceTransferOrder;
}]);