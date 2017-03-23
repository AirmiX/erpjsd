'use strict';

angular.module('Doob.productionrequest').config(['$routeProvider', function ($routeProvider) {
  $routeProvider
    .when('/productionrequest/requestforproductionitems', {
	    templateUrl:'productionrequest/requestforproductionitem/tmplRequestForProductionItemView.tpl.html',
	    controller:'ctrlRequestForProductionItem'
    })
    .when('/productionrequest/requestforproductions', {
	    templateUrl:'productionrequest/requestforproduction/tmplRequestForProductionView.tpl.html',
	    controller:'ctrlRequestForProduction'
    })
    ;
}]);