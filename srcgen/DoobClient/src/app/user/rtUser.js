'use strict';

angular.module('Doob.user').config(['$routeProvider', function ($routeProvider) {
  $routeProvider
    .when('/user/services', {
	    templateUrl:'user/service/tmplServiceView.tpl.html',
	    controller:'ctrlService'
    })
    .when('/user/languages', {
	    templateUrl:'user/language/tmplLanguageView.tpl.html',
	    controller:'ctrlLanguage'
    })
    .when('/user/appusers', {
	    templateUrl:'user/appuser/tmplAppUserView.tpl.html',
	    controller:'ctrlAppUser'
    })
    .when('/user/usergroups', {
	    templateUrl:'user/usergroup/tmplUserGroupView.tpl.html',
	    controller:'ctrlUserGroup'
    })
    .when('/user/servicegroups', {
	    templateUrl:'user/servicegroup/tmplServiceGroupView.tpl.html',
	    controller:'ctrlServiceGroup'
    })
    ;
}]);