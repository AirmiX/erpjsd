'use strict';

angular.module('Doob.stock').config(['$routeProvider', function ($routeProvider) {
  $routeProvider
    .when('/stock/stockrooms', {
	    templateUrl:'stock/stockroom/tmplStockroomView.tpl.html',
	    controller:'ctrlStockroom'
    })
    ;
}]);