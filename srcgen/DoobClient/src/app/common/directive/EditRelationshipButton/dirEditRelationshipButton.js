'use strict';

angular.module('Doob.common')
.directive('ngEditRelationshipButton',[ function() {
	var directive={};
	directive.restrict='A';
	directive.scope={
		relationshipModel:'=',
		globalModel:'=',
		relationshipItem:'=',
		globalItem:'='
	};
	directive.templateUrl='common/directive/EditRelationshipButton/tmplEditRelationshipButton.tpl.html';
	directive.controller='ctrlEditRelationshipButton';
	directive.link= function (scope, element, attributes) {};
    return directive;
}]);