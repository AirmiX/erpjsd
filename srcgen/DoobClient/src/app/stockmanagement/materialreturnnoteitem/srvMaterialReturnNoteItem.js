'use strict';

angular.module('Doob.stockmanagement').factory('ServiceMaterialReturnNoteItem', ['restResource', function ($restResource) {
	var ServiceMaterialReturnNoteItem = $restResource('/stockmanagement/materialreturnnoteitems');
  	return ServiceMaterialReturnNoteItem;
}]);