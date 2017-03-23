'use strict';

angular.module('Doob.initialization').config(['$routeProvider', function ($routeProvider) {
  $routeProvider
    .when('/initialization/discounttypes', {
	    templateUrl:'initialization/discounttype/tmplDiscountTypeView.tpl.html',
	    controller:'ctrlDiscountType'
    })
    .when('/initialization/declarationbasiss', {
	    templateUrl:'initialization/declarationbasis/tmplDeclarationBasisView.tpl.html',
	    controller:'ctrlDeclarationBasis'
    })
    .when('/initialization/procurementplanitemhasordersupplieritems', {
	    templateUrl:'initialization/procurementplanitemhasordersupplieritem/tmplProcurementPlanItemHasOrderSupplierItemView.tpl.html',
	    controller:'ctrlProcurementPlanItemHasOrderSupplierItem'
    })
    .when('/initialization/goodsacceptancestatuss', {
	    templateUrl:'initialization/goodsacceptancestatus/tmplGoodsAcceptanceStatusView.tpl.html',
	    controller:'ctrlGoodsAcceptanceStatus'
    })
    .when('/initialization/packagingstatuss', {
	    templateUrl:'initialization/packagingstatus/tmplPackagingStatusView.tpl.html',
	    controller:'ctrlPackagingStatus'
    })
    .when('/initialization/paymentmethods', {
	    templateUrl:'initialization/paymentmethod/tmplPaymentMethodView.tpl.html',
	    controller:'ctrlPaymentMethod'
    })
    .when('/initialization/procurementplanitems', {
	    templateUrl:'initialization/procurementplanitem/tmplProcurementPlanItemView.tpl.html',
	    controller:'ctrlProcurementPlanItem'
    })
    .when('/initialization/packingmethods', {
	    templateUrl:'initialization/packingmethod/tmplPackingMethodView.tpl.html',
	    controller:'ctrlPackingMethod'
    })
    .when('/initialization/procurementplanheadings', {
	    templateUrl:'initialization/procurementplanheading/tmplProcurementPlanHeadingView.tpl.html',
	    controller:'ctrlProcurementPlanHeading'
    })
    .when('/initialization/workorders', {
	    templateUrl:'initialization/workorder/tmplWorkOrderView.tpl.html',
	    controller:'ctrlWorkOrder'
    })
    .when('/initialization/commercialitystatuss', {
	    templateUrl:'initialization/commercialitystatus/tmplCommercialityStatusView.tpl.html',
	    controller:'ctrlCommercialityStatus'
    })
    .when('/initialization/sourceattentions', {
	    templateUrl:'initialization/sourceattention/tmplSourceAttentionView.tpl.html',
	    controller:'ctrlSourceAttention'
    })
    .when('/initialization/tasktypes', {
	    templateUrl:'initialization/tasktype/tmplTaskTypeView.tpl.html',
	    controller:'ctrlTaskType'
    })
    .when('/initialization/genders', {
	    templateUrl:'initialization/gender/tmplGenderView.tpl.html',
	    controller:'ctrlGender'
    })
    .when('/initialization/taxheadings', {
	    templateUrl:'initialization/taxheading/tmplTaxHeadingView.tpl.html',
	    controller:'ctrlTaxHeading'
    })
    .when('/initialization/urgentstatuss', {
	    templateUrl:'initialization/urgentstatus/tmplUrgentStatusView.tpl.html',
	    controller:'ctrlUrgentStatus'
    })
    .when('/initialization/procurementrequestheadings', {
	    templateUrl:'initialization/procurementrequestheading/tmplProcurementRequestHeadingView.tpl.html',
	    controller:'ctrlProcurementRequestHeading'
    })
    .when('/initialization/procurementrequestitems', {
	    templateUrl:'initialization/procurementrequestitem/tmplProcurementRequestItemView.tpl.html',
	    controller:'ctrlProcurementRequestItem'
    })
    .when('/initialization/taxs', {
	    templateUrl:'initialization/tax/tmplTaxView.tpl.html',
	    controller:'ctrlTax'
    })
    .when('/initialization/workorderhasproductionrequestss', {
	    templateUrl:'initialization/workorderhasproductionrequests/tmplWorkOrderHasProductionRequestsView.tpl.html',
	    controller:'ctrlWorkOrderHasProductionRequests'
    })
    .when('/initialization/denotationmethods', {
	    templateUrl:'initialization/denotationmethod/tmplDenotationMethodView.tpl.html',
	    controller:'ctrlDenotationMethod'
    })
    .when('/initialization/paymentconditions', {
	    templateUrl:'initialization/paymentcondition/tmplPaymentConditionView.tpl.html',
	    controller:'ctrlPaymentCondition'
    })
    ;
}]);