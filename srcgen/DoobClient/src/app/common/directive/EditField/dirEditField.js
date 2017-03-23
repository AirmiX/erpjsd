'use strict';

angular.module('Doob.common')
.directive('ngEditField',[ function() {
	var directive={};
	directive.transclude = true;
	directive.restrict='A';
	directive.scope={
		fieldModel:'=',
		item:'=',
		error:'=',
		model:'=',
		service:'=',
		validpk:'='
	};
	directive.templateUrl='common/directive/EditField/tmplEditField.tpl.html';
	directive.controller='ctrlEditField';
	directive.link= function (scope, element, attributes) {};
    return directive;
}]);