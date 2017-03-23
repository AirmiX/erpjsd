'use strict';

angular.module('Doob.internalorder').config(['$routeProvider', function ($routeProvider) {
  $routeProvider
    .when('/internalorder/beorderheadings', {
	    templateUrl:'internalorder/beorderheading/tmplBEOrderHeadingView.tpl.html',
	    controller:'ctrlBEOrderHeading'
    })
    .when('/internalorder/beorderitems', {
	    templateUrl:'internalorder/beorderitem/tmplBEOrderItemView.tpl.html',
	    controller:'ctrlBEOrderItem'
    })
    ;
}]);