'use strict';

angular.module('Doob.customerrequest').config(['$routeProvider', function ($routeProvider) {
  $routeProvider
    .when('/customerrequest/customerrequestheadings', {
	    templateUrl:'customerrequest/customerrequestheading/tmplCustomerRequestHeadingView.tpl.html',
	    controller:'ctrlCustomerRequestHeading'
    })
    .when('/customerrequest/customerrequestitems', {
	    templateUrl:'customerrequest/customerrequestitem/tmplCustomerRequestItemView.tpl.html',
	    controller:'ctrlCustomerRequestItem'
    })
    ;
}]);