'use strict';

angular.module('Doob.common')
.directive('ngShowEntity',function() {
	var directive={};
	directive.restrict='A';
	directive.scope={
		model:'='
	};
	directive.templateUrl='common/directive/ShowEntity/tmplShowEntity.tpl.html';
	directive.controller='ctrlShowEntity';
	directive.link= function (scope, element, attributes) {};
    return directive;
});