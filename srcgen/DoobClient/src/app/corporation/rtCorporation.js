'use strict';

angular.module('Doob.corporation').config(['$routeProvider', function ($routeProvider) {
  $routeProvider
    .when('/corporation/banks', {
	    templateUrl:'corporation/bank/tmplBankView.tpl.html',
	    controller:'ctrlBank'
    })
    .when('/corporation/organizationunits', {
	    templateUrl:'corporation/organizationunit/tmplOrganizationUnitView.tpl.html',
	    controller:'ctrlOrganizationUnit'
    })
    .when('/corporation/bankaccounttypes', {
	    templateUrl:'corporation/bankaccounttype/tmplBankAccountTypeView.tpl.html',
	    controller:'ctrlBankAccountType'
    })
    .when('/corporation/locationtypes', {
	    templateUrl:'corporation/locationtype/tmplLocationTypeView.tpl.html',
	    controller:'ctrlLocationType'
    })
    .when('/corporation/locations', {
	    templateUrl:'corporation/location/tmplLocationView.tpl.html',
	    controller:'ctrlLocation'
    })
    .when('/corporation/documenttypes', {
	    templateUrl:'corporation/documenttype/tmplDocumentTypeView.tpl.html',
	    controller:'ctrlDocumentType'
    })
    .when('/corporation/accounts', {
	    templateUrl:'corporation/account/tmplAccountView.tpl.html',
	    controller:'ctrlAccount'
    })
    .when('/corporation/workcalendars', {
	    templateUrl:'corporation/workcalendar/tmplWorkCalendarView.tpl.html',
	    controller:'ctrlWorkCalendar'
    })
    .when('/corporation/businessentitys', {
	    templateUrl:'corporation/businessentity/tmplBusinessEntityView.tpl.html',
	    controller:'ctrlBusinessEntity'
    })
    .when('/corporation/organizationschemas', {
	    templateUrl:'corporation/organizationschema/tmplOrganizationSchemaView.tpl.html',
	    controller:'ctrlOrganizationSchema'
    })
    .when('/corporation/employees', {
	    templateUrl:'corporation/employee/tmplEmployeeView.tpl.html',
	    controller:'ctrlEmployee'
    })
    .when('/corporation/organizationunittypes', {
	    templateUrl:'corporation/organizationunittype/tmplOrganizationUnitTypeView.tpl.html',
	    controller:'ctrlOrganizationUnitType'
    })
    .when('/corporation/bankaccounts', {
	    templateUrl:'corporation/bankaccount/tmplBankAccountView.tpl.html',
	    controller:'ctrlBankAccount'
    })
    ;
}]);