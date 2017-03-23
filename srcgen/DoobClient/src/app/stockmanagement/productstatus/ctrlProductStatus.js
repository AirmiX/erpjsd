'use strict';

angular.module('Doob.stockmanagement')


.controller('ctrlProductStatus',['$scope', '$rootScope', '$modal', 'dialogs', 'CheckSelected', 'ServiceProductStatus',
    function($scope, $rootScope, $modal, dialogs, CheckSelected, ServiceProductStatus) {

	// main entity (productStatus) properties names and labels
	$scope.itemDefinition = {
		label: 'stockmanagement.productStatus',
		properties: [
			{ label: 'pSDesignation', name:'PSDesignation', inTable:  true  },
			{ label: 'pSDescription', name:'PSDescription', inTable:  true  },
		]
	};

	// workOrders with properties names and labels
	$scope.workOrdersDefinition = {
		label: 'initialization.workOrder',
		properties : [
			{ label: 'wOCode', name:'WOCode' },
			{ label: 'wOCreationDate', name:'WOCreationDate' },
			{ label: 'wOScheduledDate', name:'WOScheduledDate' },
			{ label: 'wOLuanchedQuantity', name:'WOLuanchedQuantity' },
			{ label: 'wOAcceptedQuantity', name:'WOAcceptedQuantity' },
			{ label: 'wORejectedQuantity', name:'WORejectedQuantity' },
			{ label: 'wOZanovljenaQuantity', name:'WOZanovljenaQuantity' },
			{ label: 'wOCalculationStatus', name:'WOCalculationStatus' },
			{ label: 'tISDesignation', name:'TISDesignation' },
		]
	};

	// fill table with data
	$scope.items = [];
	$scope.loaded = false;
	var getProductStatuss = function() {
		if(!$scope.loaded && $scope.items.length === 0) {
			$scope.isLoading = true;
			ServiceProductStatus.query(function(data) {
				$scope.items = data;
				$scope.isLoading = false;
				$scope.loaded = true;
			});
		}
	};
	getProductStatuss();

	// table selection logic
	$scope.itemEdit = null;

	$scope.selection = function(item, index) {
		if(item.isSelected) {
			if($scope.itemEdit !== null) {
				var index1 = $scope.items.map(function(it) { return it.id; }).indexOf($scope.itemEdit.id);
				$scope.items[index1].isSelected = false;
			}
			item.$getEager(function(item) {
				$scope.itemEdit = item;
			});
		} else {
			$scope.itemEdit = null;
			item.isSelected = false;
		}
	};

	$scope.$watch('ProductStatusCollection', function() {
		$scope.itemEdit = CheckSelected.checkSelectedInTable($scope.itemEdit, $scope.ProductStatusCollection, $scope.items);
	});

	// Remove button
	$scope.remove = function(item) {
		$rootScope.sweetAlert.swal($rootScope.swalOptions, function(isConfirm) {
			if(isConfirm) {
				item.$remove(function() {
					var removeIndex = $scope.items.map(function(it) { return it.id; }).indexOf(item.id);
					$scope.items.splice(removeIndex, 1);
					$scope.itemEdit = null;
					$rootScope.deleteConfirmationDialog();
				});
			}
			window.onkeydown = null;
			window.onfocus = null;
		});
	};

	// New/Update dialog
	$scope.openEditDialog = function(isNew) {
		$modal.open(
		{
			backdrop: 'static',
			keyboard : false,
			templateUrl: 'stockmanagement/productstatus/tmplProductStatusEdit.tpl.html',
			size: 'lg',
			windowClass: 'hmodal-info',
			controller: 'ctrlProductStatusEdit',
			resolve: {
				itemEdit: function() {
					if(isNew) {
						return new ServiceProductStatus();
					} else {
						return $scope.itemEdit;
					}
				},
				workOrdersDefinition: function() {
					return $scope.workOrdersDefinition;
				},
			}
		})
		.result.then(function(result) {
			if(!angular.isDefined(result.id)) {
				ServiceProductStatus.saveCustom('stockmanagement/productstatuss', result, function(savedObject) {
					$scope.items.unshift(savedObject);
					if($scope.itemEdit !== null) {
						var index = $scope.items.map(function(it) { return it.id; }).indexOf($scope.itemEdit.id);
						$scope.items[index].isSelected = false;
					}
					$scope.itemEdit = angular.extend(savedObject);
					$scope.items[0].isSelected = true;
				});
			 } else {
				 ServiceProductStatus.updateCustom('stockmanagement/productstatuss/'+result.id, result, function(savedObject) {
					$scope.itemEdit = angular.extend(savedObject);
					var index = $scope.items.map(function(it) { return it.id; }).indexOf(savedObject.id);
					for(var key in result) {
						$scope.items[index][key] = savedObject[key];
					}
					$scope.items[index].isSelected = true;
				 });
			 }
		});
	};
}])


.controller('ctrlProductStatusEdit',['$scope', 'Localization', '$modal', '$modalInstance', 'dialogs',
	'ServiceProductStatus', 'ServiceWorkOrder',   'workOrdersDefinition',   'itemEdit',
function($scope, Localization, $modal, $modalInstance, dialogs,
	ServiceProductStatus, ServiceWorkOrder,  workOrdersDefinition,  itemEdit) {

	// dialog mode
	$scope.mode = 'edit';

	// original item state
	var original = angular.copy(itemEdit);
	// item state
	$scope.itemEdit = angular.copy(original);

	// workOrders with properties
	$scope.workOrdersDefinition = workOrdersDefinition;

	// datepicker logic

	// date properties

	$scope.open = function($event, opened) {
		$event.preventDefault();
		$event.stopPropagation();
		$scope[opened] = true;
	};



	// Save Button
	$scope.save = function() {
	   //	delete $scope.itemEdit.isSelected;
        var item;
        var i;
        for(i in $scope.itemEdit.workOrders) {
    		item = $scope.itemEdit.workOrders[i];
    		delete item.isSelected;
    	}
		$modalInstance.close($scope.itemEdit);
	};


	$scope.canSave = function() {
		var item = $scope.itemEdit;
		return                 item.PSDesignation  &&                 item.PSDescription  ;
	};

	// Clear and Close buttons
	$scope.revert = function() {
		$scope.itemEdit = angular.copy(original);
	};

	$scope.canRevert = function() {
		return !angular.equals($scope.itemEdit, original);
	};

	$scope.cancel = function() {
		$modalInstance.dismiss();
	};

}])


.controller('ctrlProductStatusChoose', ['$scope','ServiceProductStatus', 'dialogs', '$modal', '$modalInstance', 'itemEdit',
function($scope, ServiceProductStatus, dialogs, $modal,  $modalInstance, itemEdit) {

    // entity with properties
    $scope.itemDefinition = {
        label: 'stockmanagement.productStatus',
        properties: [
            { label: 'pSDesignation', name:'PSDesignation', inTable:  true  },
            { label: 'pSDescription', name:'PSDescription', inTable:  true  },
        ]
    };

	$scope.items = [];
	$scope.itemEdit = {};

	// fill table with data
	$scope.loaded = false;
	var getProductStatuss = function() {
		if(!$scope.loaded && $scope.items.length === 0) {
			$scope.isLoading = true;
			ServiceProductStatus.query(function(data) {
				$scope.items = data;
				$scope.isLoading = false;
				$scope.loaded = true;
				if(angular.isDefined(itemEdit)) {
					var index = $scope.items.map(function(it) { return it.id; }).indexOf(itemEdit.id);
					$scope.itemEdit = $scope.items[index];
					$scope.lastId = itemEdit.id;
				}
				else {
					$scope.itemEdit = {};
					$scope.lastId = -1;
				}
			});
		}
	};
	getProductStatuss();

	$scope.check = function(item) {
		if ($scope.lastId !== item.id) {
			$scope.itemEdit = item;
			$scope.lastId = item.id;
		}
		else {
			$scope.itemEdit = {};
			$scope.lastId = -1;
		}
	};

	$scope.choose = function() {
		$modalInstance.close($scope.itemEdit);
	};

	$scope.cancel = function() {
		$modalInstance.dismiss();
	};

}])
;