'use strict';

angular.module('Doob.stockmanagement').factory('ServiceGoodsReceivedNoteHeading', ['restResource', function ($restResource) {
	var ServiceGoodsReceivedNoteHeading = $restResource('/stockmanagement/goodsreceivednoteheadings');
  	return ServiceGoodsReceivedNoteHeading;
}]);