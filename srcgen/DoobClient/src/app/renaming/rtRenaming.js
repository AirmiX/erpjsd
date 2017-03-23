'use strict';

angular.module('Doob.renaming').config(['$routeProvider', function ($routeProvider) {
  $routeProvider
    .when('/renaming/renamings', {
	    templateUrl:'renaming/renaming/tmplRenamingView.tpl.html',
	    controller:'ctrlRenaming'
    })
    .when('/renaming/renamingitems', {
	    templateUrl:'renaming/renamingitem/tmplRenamingItemView.tpl.html',
	    controller:'ctrlRenamingItem'
    })
    ;
}]);