'use strict';

angular.module('Doob.common')
.controller('ctrlEditField',['$scope','$filter', 'Localization',
function($scope,$filter, Localization){
	//date
    $scope.localization = Localization;
	$scope.dateOptions = {
		formatYear: 'yy',
		startingDay: 1
	};
	$scope.opened=false;
	$scope.open = function($event) {
		$event.preventDefault();
		$event.stopPropagation();
		$scope.opened = true;
	};

	if($scope.fieldModel.defaultValue && ($scope.item[$scope.fieldModel.name]===undefined || $scope.item[$scope.fieldModel.name]==='')){
		$scope.item[$scope.fieldModel.name]=$scope.fieldModel.defaultValue;
	}

	$scope.validateKey=function(field){
		
		if(field.key) {
			$scope.validpk.valid = true;
			var validKey = true;
			for(var ind=0;ind<$scope.model.fields.length;ind=ind+1){
				if($scope.model.fields[ind].key && (!$scope.item[$scope.model.fields[ind].name] || $scope.item[$scope.model.fields[ind].name] === '')) {
					validKey = false;
					$scope.error=undefined;
					break;
				}

			}
			if(validKey) {
				$scope.service.saveCustom($scope.service.getCollectionName() + '/validateKey',$scope.item, function(data) {
					if(data.response === 'rsp_found') {
						$scope.error='Existed key';
						$scope.validpk.valid = false;
					}
					else {
						$scope.error=undefined;
					}
				});
			}
		}

	};
}]);
