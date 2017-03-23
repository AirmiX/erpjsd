'use strict';

angular.module('Doob.environment').config(['$routeProvider', function ($routeProvider) {
  $routeProvider
    .when('/environment/postoffices', {
	    templateUrl:'environment/postoffice/tmplPostOfficeView.tpl.html',
	    controller:'ctrlPostOffice'
    })
    .when('/environment/mvcountrys', {
	    templateUrl:'environment/mvcountry/tmplMVCountryView.tpl.html',
	    controller:'ctrlMVCountry'
    })
    .when('/environment/addresss', {
	    templateUrl:'environment/address/tmplAddressView.tpl.html',
	    controller:'ctrlAddress'
    })
    .when('/environment/mvcitys', {
	    templateUrl:'environment/mvcity/tmplMVCityView.tpl.html',
	    controller:'ctrlMVCity'
    })
    .when('/environment/territorialunits', {
	    templateUrl:'environment/territorialunit/tmplTerritorialUnitView.tpl.html',
	    controller:'ctrlTerritorialUnit'
    })
    .when('/environment/mvstates', {
	    templateUrl:'environment/mvstate/tmplMVStateView.tpl.html',
	    controller:'ctrlMVState'
    })
    .when('/environment/territorialunittypes', {
	    templateUrl:'environment/territorialunittype/tmplTerritorialUnitTypeView.tpl.html',
	    controller:'ctrlTerritorialUnitType'
    })
    ;
}]);