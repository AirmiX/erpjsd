'use strict';

angular.module('Doob.common')
.controller('ctrlShowEntity',['$scope', '$rootScope', '$injector', 'dialogs','ServiceUtil', 'Localization', 'CheckSelected',
function($scope, $rootScope, $injector,dialogs,ServiceUtil, Localization, CheckSelected){

    $scope.localization = Localization;
	$scope.service=$injector.get($scope.model.serviceName);

	$scope.spanSize=1;
	//If there is not fields in model, shows important in table.
	if(angular.isDefined($scope.model.fields)) {
		for(var ind=0;ind<$scope.model.fields.length;ind=ind+1){
			if($scope.model.fields[ind].important){
				$scope.spanSize=$scope.spanSize+1;
			}
		}
	}

	$scope.$watch('items', function () {
        $scope.selectedItem = CheckSelected.checkSelectedInTable($scope.selectedItem, $scope.items);
        });

	/*$scope.remove=function(item){
		var dlg = dialogs.confirm('Please confirm', 'Are you sure you want to delete item ' + item.id + ' ?');
		dlg.result.then(function(btn) {
			var removeIndex = $scope.items.map(function(it) { return it.id; }).indexOf(item.id);
			$scope.items.splice(removeIndex, 1);
			item.$remove();
			$scope.selectedItem  = null;
		});   
	};*/
  $scope.remove=function(item){
    $rootScope.sweetAlert.swal($rootScope.swalOptions,
      function (isConfirm) {
        if (isConfirm) {
          item.$remove(function(){
            var removeIndex = $scope.items.map(function(it) { return it.id; }).indexOf(item.id);
            $scope.items.splice(removeIndex, 1);
            $scope.itemEdit = null;
            $rootScope.deleteConfirmationDialog(item.id);
          }
        );
      }
    });
	};    
	
	$scope.selectedItem = null;
	$scope.selection = function(item) {
		if(item.isSelected) {
			$scope.selectedItem  = item;
		} else {
			$scope.selectedItem  = null;
			item.isSelected = false; 
		}
	};
	

	$scope.isLoading = false;
	$scope.items=[];

	$scope.callServer = function getData(tableState) {
		$scope.isLoading = true;
		console.log(tableState);
		$scope.service.allPagingSearch(
			1+(tableState.pagination.number?tableState.pagination.start/tableState.pagination.number:0),
			null,
			tableState.sort.predicate,
			tableState.sort.reverse,
			tableState.search.predicateObject,
			function(items) {
			if(items && items.data){
				if(tableState.pagination.start===0){
					$scope.items=[];
				}
				$scope.items.push.apply($scope.items,items.data);
				/*new ServiceUtil().fromNumberToEnumList($scope.items,$scope.model,false);*/
			}
			$scope.isLoading = false;
		});
	};
}]);
