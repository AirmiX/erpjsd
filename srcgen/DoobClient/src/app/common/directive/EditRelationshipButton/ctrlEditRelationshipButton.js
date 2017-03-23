'use strict';

angular.module('Doob.common')
.controller('ctrlEditRelationshipButton',['$scope','$modal', 'Localization',
function($scope,$modal, Localization){
    $scope.localization = Localization;
    
	$scope.openChooseDialog=function(){
		$scope.modalInstance={};
		$scope.modalInstance=$modal.open({
			templateUrl: 'common/directive/EditRelationship/tmplEditRelationship.tpl.html', 
			windowTemplateUrl: 'common/directive/EditRelationshipButton/tmplEditRelationship-modalWindow.tpl.html',
            size: 'lg',
            windowClass: 'hmodal-info',
            scope: $scope
		});
	};
}]);
