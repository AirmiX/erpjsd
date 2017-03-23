'use strict';

angular.module('Doob.stockmanagement').config(['$routeProvider', function ($routeProvider) {
  $routeProvider
    .when('/stockmanagement/goodsreceivednoteheadings', {
	    templateUrl:'stockmanagement/goodsreceivednoteheading/tmplGoodsReceivedNoteHeadingView.tpl.html',
	    controller:'ctrlGoodsReceivedNoteHeading'
    })
    .when('/stockmanagement/tangibleitemammountbylots', {
	    templateUrl:'stockmanagement/tangibleitemammountbylot/tmplTangibleItemAmmountByLotView.tpl.html',
	    controller:'ctrlTangibleItemAmmountByLot'
    })
    .when('/stockmanagement/requisitionitems', {
	    templateUrl:'stockmanagement/requisitionitem/tmplRequisitionItemView.tpl.html',
	    controller:'ctrlRequisitionItem'
    })
    .when('/stockmanagement/requestforproposalheadings', {
	    templateUrl:'stockmanagement/requestforproposalheading/tmplRequestForProposalHeadingView.tpl.html',
	    controller:'ctrlRequestForProposalHeading'
    })
    .when('/stockmanagement/expensesaccountassignments', {
	    templateUrl:'stockmanagement/expensesaccountassignment/tmplExpensesAccountAssignmentView.tpl.html',
	    controller:'ctrlExpensesAccountAssignment'
    })
    .when('/stockmanagement/transactionlogs', {
	    templateUrl:'stockmanagement/transactionlog/tmplTransactionLogView.tpl.html',
	    controller:'ctrlTransactionLog'
    })
    .when('/stockmanagement/items', {
	    templateUrl:'stockmanagement/item/tmplItemView.tpl.html',
	    controller:'ctrlItem'
    })
    .when('/stockmanagement/materialreturnnotes', {
	    templateUrl:'stockmanagement/materialreturnnote/tmplMaterialReturnNoteView.tpl.html',
	    controller:'ctrlMaterialReturnNote'
    })
    .when('/stockmanagement/pricearchives', {
	    templateUrl:'stockmanagement/pricearchive/tmplPriceArchiveView.tpl.html',
	    controller:'ctrlPriceArchive'
    })
    .when('/stockmanagement/pricedesignations', {
	    templateUrl:'stockmanagement/pricedesignation/tmplPriceDesignationView.tpl.html',
	    controller:'ctrlPriceDesignation'
    })
    .when('/stockmanagement/tangibleitemammountbyaddresss', {
	    templateUrl:'stockmanagement/tangibleitemammountbyaddress/tmplTangibleItemAmmountByAddressView.tpl.html',
	    controller:'ctrlTangibleItemAmmountByAddress'
    })
    .when('/stockmanagement/deliverynoteitems', {
	    templateUrl:'stockmanagement/deliverynoteitem/tmplDeliveryNoteItemView.tpl.html',
	    controller:'ctrlDeliveryNoteItem'
    })
    .when('/stockmanagement/deliverynotes', {
	    templateUrl:'stockmanagement/deliverynote/tmplDeliveryNoteView.tpl.html',
	    controller:'ctrlDeliveryNote'
    })
    .when('/stockmanagement/productionrequests', {
	    templateUrl:'stockmanagement/productionrequest/tmplProductionRequestView.tpl.html',
	    controller:'ctrlProductionRequest'
    })
    .when('/stockmanagement/tangibleitemanalyticss', {
	    templateUrl:'stockmanagement/tangibleitemanalytics/tmplTangibleItemAnalyticsView.tpl.html',
	    controller:'ctrlTangibleItemAnalytics'
    })
    .when('/stockmanagement/revokedprocurementrequests', {
	    templateUrl:'stockmanagement/revokedprocurementrequest/tmplRevokedProcurementRequestView.tpl.html',
	    controller:'ctrlRevokedProcurementRequest'
    })
    .when('/stockmanagement/transferorders', {
	    templateUrl:'stockmanagement/transferorder/tmplTransferOrderView.tpl.html',
	    controller:'ctrlTransferOrder'
    })
    .when('/stockmanagement/stockroomorgunis', {
	    templateUrl:'stockmanagement/stockroomorguni/tmplStockroomOrgUniView.tpl.html',
	    controller:'ctrlStockroomOrgUni'
    })
    .when('/stockmanagement/tangibleitemstatuss', {
	    templateUrl:'stockmanagement/tangibleitemstatus/tmplTangibleItemStatusView.tpl.html',
	    controller:'ctrlTangibleItemStatus'
    })
    .when('/stockmanagement/spoilagecauses', {
	    templateUrl:'stockmanagement/spoilagecause/tmplSpoilageCauseView.tpl.html',
	    controller:'ctrlSpoilageCause'
    })
    .when('/stockmanagement/goodsreceivednoteitems', {
	    templateUrl:'stockmanagement/goodsreceivednoteitem/tmplGoodsReceivedNoteItemView.tpl.html',
	    controller:'ctrlGoodsReceivedNoteItem'
    })
    .when('/stockmanagement/tangibleitemconditions', {
	    templateUrl:'stockmanagement/tangibleitemcondition/tmplTangibleItemConditionView.tpl.html',
	    controller:'ctrlTangibleItemCondition'
    })
    .when('/stockmanagement/requisitions', {
	    templateUrl:'stockmanagement/requisition/tmplRequisitionView.tpl.html',
	    controller:'ctrlRequisition'
    })
    .when('/stockmanagement/packings', {
	    templateUrl:'stockmanagement/packing/tmplPackingView.tpl.html',
	    controller:'ctrlPacking'
    })
    .when('/stockmanagement/tangibleitemammounttools', {
	    templateUrl:'stockmanagement/tangibleitemammounttool/tmplTangibleItemAmmountToolView.tpl.html',
	    controller:'ctrlTangibleItemAmmountTool'
    })
    .when('/stockmanagement/rfpitemprocurementplanitems', {
	    templateUrl:'stockmanagement/rfpitemprocurementplanitem/tmplRFPItemProcurementPlanItemView.tpl.html',
	    controller:'ctrlRFPItemProcurementPlanItem'
    })
    .when('/stockmanagement/stockaccountassignments', {
	    templateUrl:'stockmanagement/stockaccountassignment/tmplStockAccountAssignmentView.tpl.html',
	    controller:'ctrlStockAccountAssignment'
    })
    .when('/stockmanagement/productstatuss', {
	    templateUrl:'stockmanagement/productstatus/tmplProductStatusView.tpl.html',
	    controller:'ctrlProductStatus'
    })
    .when('/stockmanagement/materialreturnnoteitems', {
	    templateUrl:'stockmanagement/materialreturnnoteitem/tmplMaterialReturnNoteItemView.tpl.html',
	    controller:'ctrlMaterialReturnNoteItem'
    })
    .when('/stockmanagement/requestforproposalitems', {
	    templateUrl:'stockmanagement/requestforproposalitem/tmplRequestForProposalItemView.tpl.html',
	    controller:'ctrlRequestForProposalItem'
    })
    .when('/stockmanagement/prices', {
	    templateUrl:'stockmanagement/price/tmplPriceView.tpl.html',
	    controller:'ctrlPrice'
    })
    ;
}]);