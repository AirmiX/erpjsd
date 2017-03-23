'use strict';

angular.module('Doob.sellingprice').config(['$routeProvider', function ($routeProvider) {
  $routeProvider
    .when('/sellingprice/markets', {
	    templateUrl:'sellingprice/market/tmplMarketView.tpl.html',
	    controller:'ctrlMarket'
    })
    .when('/sellingprice/oubelongings', {
	    templateUrl:'sellingprice/oubelonging/tmplOUBelongingView.tpl.html',
	    controller:'ctrlOUBelonging'
    })
    .when('/sellingprice/sellingprices', {
	    templateUrl:'sellingprice/sellingprice/tmplSellingPriceView.tpl.html',
	    controller:'ctrlSellingPrice'
    })
    ;
}]);