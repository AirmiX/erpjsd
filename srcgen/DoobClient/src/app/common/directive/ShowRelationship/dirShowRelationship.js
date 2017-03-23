'use strict';

angular.module('Doob.common')
.directive('ngShowRelationship',function() {
	var directive={};
	directive.restrict='A';
	directive.scope={
		globalModel:'=',
		globalItem:'=',
		relationshipModel:'=',
		relationshipItem:'='
	};
	directive.templateUrl='common/directive/ShowRelationship/tmplShowRelationship.tpl.html';
	directive.controller='ctrlShowRelationship';
	directive.link= function (scope, element, attributes) {};
    return directive;
});