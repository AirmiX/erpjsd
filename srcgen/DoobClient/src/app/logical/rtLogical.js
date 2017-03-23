'use strict';

angular.module('Doob.logical').config(['$routeProvider', function ($routeProvider) {
  $routeProvider
    .when('/logical/ordersupplierheadings', {
	    templateUrl:'logical/ordersupplierheading/tmplOrderSupplierHeadingView.tpl.html',
	    controller:'ctrlOrderSupplierHeading'
    })
    .when('/logical/ordersupplieritems', {
	    templateUrl:'logical/ordersupplieritem/tmplOrderSupplierItemView.tpl.html',
	    controller:'ctrlOrderSupplierItem'
    })
    .when('/logical/paritys', {
	    templateUrl:'logical/parity/tmplParityView.tpl.html',
	    controller:'ctrlParity'
    })
    .when('/logical/offersupplieritems', {
	    templateUrl:'logical/offersupplieritem/tmplOfferSupplierItemView.tpl.html',
	    controller:'ctrlOfferSupplierItem'
    })
    .when('/logical/offersupplierheadings', {
	    templateUrl:'logical/offersupplierheading/tmplOfferSupplierHeadingView.tpl.html',
	    controller:'ctrlOfferSupplierHeading'
    })
    .when('/logical/transferorderitems', {
	    templateUrl:'logical/transferorderitem/tmplTransferOrderItemView.tpl.html',
	    controller:'ctrlTransferOrderItem'
    })
    .when('/logical/procurementrequestsettlements', {
	    templateUrl:'logical/procurementrequestsettlement/tmplProcurementRequestSettlementView.tpl.html',
	    controller:'ctrlProcurementRequestSettlement'
    })
    ;
}]);