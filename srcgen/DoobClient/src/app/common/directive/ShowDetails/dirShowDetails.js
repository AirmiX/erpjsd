'use strict';

angular.module('Doob.common')
.directive('ngShowDetails',function() {
	var directive={};
	directive.restrict='A';
	directive.controller='ctrlShowDetails';
	directive.scope={
		model:'=',
		item:'='
	};
	directive.templateUrl='common/directive/ShowDetails/tmplShowDetails.tpl.html';
	directive.controller='ctrlShowDetails';
	directive.link= function (scope, element, attributes) {};
    return directive;
});