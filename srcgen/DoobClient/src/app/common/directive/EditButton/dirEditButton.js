'use strict';

angular.module('Doob.common')
.directive('ngEditButton',[ function() {
	var directive={};
	directive.restrict='A';
	directive.scope={
		current:'=',
		all:'=',
		model:'=',
		update:'='
	};
	directive.templateUrl='common/directive/EditButton/tmplEditButton.tpl.html';
	directive.controller='ctrlEditButton';
	directive.link= function (scope, element, attributes) {};
    return directive;
}]);