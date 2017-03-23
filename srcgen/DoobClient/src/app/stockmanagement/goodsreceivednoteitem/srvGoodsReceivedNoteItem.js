'use strict';

angular.module('Doob.stockmanagement').factory('ServiceGoodsReceivedNoteItem', ['restResource', function ($restResource) {
	var ServiceGoodsReceivedNoteItem = $restResource('/stockmanagement/goodsreceivednoteitems');
  	return ServiceGoodsReceivedNoteItem;
}]);