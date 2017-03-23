'use strict';

angular.module('Doob.initialization').factory('ServiceGoodsAcceptanceStatus', ['restResource', function ($restResource) {
	var ServiceGoodsAcceptanceStatus = $restResource('/initialization/goodsacceptancestatuss');
  	return ServiceGoodsAcceptanceStatus;
}]);