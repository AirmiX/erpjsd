'use strict';

angular.module('Doob.procurement').config(['$routeProvider', function ($routeProvider) {
  $routeProvider
    .when('/procurement/proformainvoices', {
	    templateUrl:'procurement/proformainvoice/tmplProFormaInvoiceView.tpl.html',
	    controller:'ctrlProFormaInvoice'
    })
    .when('/procurement/taxproformainvoices', {
	    templateUrl:'procurement/taxproformainvoice/tmplTaxProformaInvoiceView.tpl.html',
	    controller:'ctrlTaxProformaInvoice'
    })
    .when('/procurement/invoiceitems', {
	    templateUrl:'procurement/invoiceitem/tmplInvoiceItemView.tpl.html',
	    controller:'ctrlInvoiceItem'
    })
    .when('/procurement/invoices', {
	    templateUrl:'procurement/invoice/tmplInvoiceView.tpl.html',
	    controller:'ctrlInvoice'
    })
    .when('/procurement/shippingdocuments', {
	    templateUrl:'procurement/shippingdocument/tmplShippingDocumentView.tpl.html',
	    controller:'ctrlShippingDocument'
    })
    .when('/procurement/invoiceitemswithoutdisps', {
	    templateUrl:'procurement/invoiceitemswithoutdisp/tmplInvoiceItemsWithoutDispView.tpl.html',
	    controller:'ctrlInvoiceItemsWithoutDisp'
    })
    .when('/procurement/shippingdocumentitems', {
	    templateUrl:'procurement/shippingdocumentitem/tmplShippingDocumentItemView.tpl.html',
	    controller:'ctrlShippingDocumentItem'
    })
    .when('/procurement/taxinvoices', {
	    templateUrl:'procurement/taxinvoice/tmplTaxInvoiceView.tpl.html',
	    controller:'ctrlTaxInvoice'
    })
    ;
}]);