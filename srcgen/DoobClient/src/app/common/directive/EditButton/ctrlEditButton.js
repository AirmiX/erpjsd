'use strict';

angular.module('Doob.common')
.controller('ctrlEditButton',['$scope','$modal', 'Localization',
function($scope,$modal, Localization){
    $scope.localization = Localization;
    
	$scope.openEditDialog=function(){
		$scope.modalInstance={};
		$scope.modalInstance=$modal.open({
			templateUrl: 'common/directive/GeneralEdit/tmplGeneralEdit.tpl.html',
			windowTemplateUrl: 'common/directive/GeneralEdit/tmplGeneralEdit-modalWindow.tpl.html',
            size: 'lg',
            windowClass: 'hmodal-info',
            scope: $scope
		});
		/*$scope.modalInstance.result.then(function(newPost) {
			if(newPost) $scope.posts.push(newPost);
		});*/
	};
}]);
