'use strict';

angular.module('Doob.common')
.controller('ctrlEditRelationship',['$scope','$injector','ServiceUtil', 'Localization',
function($scope,$injector,ServiceUtil, Localization){
    
    $scope.localization = Localization;
    
	$scope.relationshipModel=$scope.$parent.$parent.$parent.relationshipModel;
	$scope.globalModel=$scope.$parent.$parent.$parent.globalModel;
	$scope.item=$scope.$parent.$parent.$parent.relationshipItem;
	$scope.globalItem=$scope.$parent.$parent.$parent.globalItem;
	$scope.modalInstance=$scope.$parent.$parent.modalInstance;

	$scope.service=$injector.get($scope.relationshipModel.entity.serviceName);

	$scope.spanSize=1;
	for(var ind=0;ind<$scope.relationshipModel.entity.fields.length;ind=ind+1){
		if($scope.relationshipModel.entity.fields[ind].important){
			$scope.spanSize=$scope.spanSize+1;
		}
	}

	$scope.choosen={};
	$scope.choosens=[];
	$scope.selectedItem={};
	$scope.selectedItems=[];

	$scope.flagSingle=($scope.relationshipModel.type==='one');
	$scope.flagMultiple=($scope.relationshipModel.type==='many');

	if($scope.flagSingle){
		angular.copy($scope.item,$scope.choosen);
	}else if($scope.flagMultiple){
		angular.copy($scope.item,$scope.choosens);
	}

	var checkItems=function(items){
		if($scope.item){
			if($scope.flagMultiple){
				for(var ind=0;ind<$scope.choosens.length;ind=ind+1){
					var addIndex = items.map(function(item) { return item.id; }).indexOf($scope.choosens[ind].id);
					if(addIndex!==-1){
						$scope.selectedItems.push(items[addIndex]);
					}
				}
			}else{
				var currentIndex = items.map(function(item) { return item.id; }).indexOf($scope.choosen.id);
				if(currentIndex!==-1){
					$scope.selectedItem=items[currentIndex];
					$scope.lastId=$scope.choosen.id;
				}
			}

			//remove myself
			if($scope.globalModel.serviceName===$scope.relationshipModel.entity.serviceName){
				var removeIndex = items.map(function(item) { return item.id; }).indexOf($scope.globalItem.id);
				if(removeIndex!==-1){
					items.splice(removeIndex, 1);
				}
			}
		}
	};

	$scope.callServer = function getData(tableState) {
		$scope.isLoading = true;
		var pageNumber=tableState.pagination.number?tableState.pagination.start/tableState.pagination.number:0;
		$scope.service.allPagingSearch(
			1+pageNumber,
			null,
			tableState.sort.predicate,
			tableState.sort.reverse,
			tableState.search.predicateObject,
			function(items) {
			if(items && items.data.length>0){
				if(tableState.pagination.start===0){
					$scope.items=[];
					$scope.selectedItem={};
					$scope.selectedItems=[];
				}
				checkItems(items.data);
				$scope.items.push.apply($scope.items,items.data);
				/*new ServiceUtil().fromNumberToEnumList($scope.items,$scope.model,false);*/
			}
			$scope.isLoading = false;
		});
	};

	$scope.choose=function(){
		if($scope.flagSingle){
			angular.copy($scope.choosen,$scope.item);
		}else if($scope.flagMultiple){
			angular.copy($scope.choosens,$scope.item);
		}
		$scope.modalInstance.close();
	};

	$scope.cancel=function(){
		$scope.modalInstance.close();
	};

	$scope.checkboxClick = function (item) {
		var index = $scope.selectedItems.map(function(item) { return item.id; }).indexOf(item.id);
		var removed = index===-1;
		if(!removed){
			index = $scope.choosens.map(function(item) { return item.id; }).indexOf(item.id);
			$scope.choosens.splice(index, 1);
		}else{
			$scope.choosens.push(item);
		}
	};

	$scope.radioClick = function (item) {
		if ($scope.lastId === item.id){
			$scope.choosen = {};
			$scope.selectedItem = {};
			$scope.lastId = -1;
		}else{
			$scope.choosen = item;
			$scope.selectedItem = item;
			$scope.lastId = item.id;
		}
	};

}]);
