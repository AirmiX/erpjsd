'use strict';

angular.module('Doob.common')
.controller('ctrlShowRelationship',['$scope', 'Localization',
function($scope, Localization){
    $scope.localization = Localization;
    
	var colSpan=0;
	for(var ind=0;ind<$scope.relationshipModel.entity.fields.length;ind=ind+1){
		if($scope.relationshipModel.entity.fields[ind].important){
			colSpan=colSpan+1;
		}
	}
	$scope.colSpan=colSpan;
}]);
