'use strict';

angular.module('Doob.stockmanagement').factory('ServiceRFPItemProcurementPlanItem', ['restResource', function ($restResource) {
	var ServiceRFPItemProcurementPlanItem = $restResource('/stockmanagement/rfpitemprocurementplanitems');
  	return ServiceRFPItemProcurementPlanItem;
}]);