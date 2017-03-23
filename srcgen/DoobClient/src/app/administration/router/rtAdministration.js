'use strict';

angular.module('Doob.administration').config(['$routeProvider', function ($routeProvider) {
  $routeProvider
    
    /*.when('/administration', {
	    templateUrl:'administration/template/administration.tpl.html',
	    controller:'ctrlAdministration'
    })*/
    .when('/administration/mappingTable', {
	    templateUrl:'common/directive/GenericView/tmplGenericView.tpl.html',
	    controller:'ctrlMappingTable'
    })
    .when('/login', {
	    templateUrl:'administration/template/login.tpl.html',
	    controller:'ctrlLogin'    
	  })
    .when('/administration/users', {
	    templateUrl:'administration/template/tmpUsersView.tpl.html',
	    controller:'ctrlUsers'    
	  })
    .when('/administration/usergroups', {
	    templateUrl:'administration/template/tmpUserGroupsView.tpl.html',
	    controller:'ctrlUserGroups'    
	  })
    .when('/administration/servicegroups', {
	    templateUrl:'administration/template/tmpServiceGroupsView.tpl.html',
	    controller:'ctrlServiceGroups'    
	  })
    .when('/administration/services', {
	    templateUrl:'administration/template/tmpServicesView.tpl.html',
	    controller:'ctrlServices'    
	  })
    .when('/administration/language', {
	    templateUrl:'administration/template/tmplLanguageView.tpl.html',
	    controller:'ctrlLanguage'    
	  })
    .when('/changepassword', {
	    templateUrl:'administration/template/tmpChangePassword.tpl.html',
	    controller:'ctrlChangePass'    
	  });
}]);
