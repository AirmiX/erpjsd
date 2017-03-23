'use strict';

angular.module('Doob.internalinvoice').config(['$routeProvider', function ($routeProvider) {
  $routeProvider
    .when('/internalinvoice/betaxinvoices', {
	    templateUrl:'internalinvoice/betaxinvoice/tmplBETaxInvoiceView.tpl.html',
	    controller:'ctrlBETaxInvoice'
    })
    .when('/internalinvoice/beinvoices', {
	    templateUrl:'internalinvoice/beinvoice/tmplBEInvoiceView.tpl.html',
	    controller:'ctrlBEInvoice'
    })
    .when('/internalinvoice/beinvoiceitems', {
	    templateUrl:'internalinvoice/beinvoiceitem/tmplBEInvoiceItemView.tpl.html',
	    controller:'ctrlBEInvoiceItem'
    })
    ;
}]);