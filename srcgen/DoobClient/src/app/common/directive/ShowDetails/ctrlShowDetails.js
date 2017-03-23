'use strict';

angular.module('Doob.common')
.controller('ctrlShowDetails',['$scope','ServiceUtil', 'Localization',
function($scope,ServiceUtil, Localization){
    $scope.localization = Localization;
	$scope.currentItem={};
	$scope.$watch('item', function(newValue,oldValue) {
		if($scope.item){
	        $scope.item.$getEager(function (it){
	        	if($scope.item.id===it.id){
					$scope.currentItem=it;
					/*new ServiceUtil().fromNumberToEnum($scope.currentItem,$scope.model,true);*/
				}
			});
   		}
    },true);

    $scope.calculateSpan=function(relationshipModel){
    	var colSpan=0;
		for(var ind=0;ind<relationshipModel.entity.fields.length;ind=ind+1){
			if(relationshipModel.entity.fields[ind].important){
				colSpan=colSpan+1;
			}
		}
		return colSpan;
    };
  $scope.calculateProps = function(relationshipModel) {
    var props = [];
    for(var ind=0;ind<relationshipModel.entity.fields.length;ind=ind+1){
			if(relationshipModel.entity.fields[ind].important){
				props.push(relationshipModel.entity.fields[ind].name);
			}
		}
    return props;
  };
}]);
