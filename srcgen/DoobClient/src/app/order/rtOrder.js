'use strict';

angular.module('Doob.order').config(['$routeProvider', function ($routeProvider) {
  $routeProvider
    .when('/order/customers', {
	    templateUrl:'order/customer/tmplCustomerView.tpl.html',
	    controller:'ctrlCustomer'
    })
    .when('/order/ordergroups', {
	    templateUrl:'order/ordergroup/tmplOrderGroupView.tpl.html',
	    controller:'ctrlOrderGroup'
    })
    .when('/order/deliverymethods', {
	    templateUrl:'order/deliverymethod/tmplDeliveryMethodView.tpl.html',
	    controller:'ctrlDeliveryMethod'
    })
    .when('/order/ordercategorys', {
	    templateUrl:'order/ordercategory/tmplOrderCategoryView.tpl.html',
	    controller:'ctrlOrderCategory'
    })
    .when('/order/orderitems', {
	    templateUrl:'order/orderitem/tmplOrderItemView.tpl.html',
	    controller:'ctrlOrderItem'
    })
    .when('/order/productinstances', {
	    templateUrl:'order/productinstance/tmplProductInstanceView.tpl.html',
	    controller:'ctrlProductInstance'
    })
    .when('/order/specialprojects', {
	    templateUrl:'order/specialproject/tmplSpecialProjectView.tpl.html',
	    controller:'ctrlSpecialProject'
    })
    .when('/order/companys', {
	    templateUrl:'order/company/tmplCompanyView.tpl.html',
	    controller:'ctrlCompany'
    })
    .when('/order/orderheadings', {
	    templateUrl:'order/orderheading/tmplOrderHeadingView.tpl.html',
	    controller:'ctrlOrderHeading'
    })
    ;
}]);