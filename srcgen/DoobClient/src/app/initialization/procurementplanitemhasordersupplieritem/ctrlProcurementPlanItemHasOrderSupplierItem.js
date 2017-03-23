'use strict';

angular.module('Doob.initialization')


.controller('ctrlProcurementPlanItemHasOrderSupplierItem',['$scope', '$rootScope', '$modal', 'dialogs', 'CheckSelected', 'ServiceProcurementPlanItemHasOrderSupplierItem',
    function($scope, $rootScope, $modal, dialogs, CheckSelected, ServiceProcurementPlanItemHasOrderSupplierItem) {

	// main entity (procurementPlanItemHasOrderSupplierItem) properties names and labels
	$scope.itemDefinition = {
		label: 'initialization.procurementPlanItemHasOrderSupplierItem',
		properties: [
			{ label: 'date', name:'Date', inTable:  true  },
		]
	};


	// fill table with data
	$scope.items = [];
	$scope.loaded = false;
	var getProcurementPlanItemHasOrderSupplierItems = function() {
		if(!$scope.loaded && $scope.items.length === 0) {
			$scope.isLoading = true;
			ServiceProcurementPlanItemHasOrderSupplierItem.query(function(data) {
				$scope.items = data;
				$scope.isLoading = false;
				$scope.loaded = true;
			});
		}
	};
	getProcurementPlanItemHasOrderSupplierItems();

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

	$scope.$watch('ProcurementPlanItemHasOrderSupplierItemCollection', function() {
		$scope.itemEdit = CheckSelected.checkSelectedInTable($scope.itemEdit, $scope.ProcurementPlanItemHasOrderSupplierItemCollection, $scope.items);
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
			templateUrl: 'initialization/procurementplanitemhasordersupplieritem/tmplProcurementPlanItemHasOrderSupplierItemEdit.tpl.html',
			size: 'lg',
			windowClass: 'hmodal-info',
			controller: 'ctrlProcurementPlanItemHasOrderSupplierItemEdit',
			resolve: {
				itemEdit: function() {
					if(isNew) {
						return new ServiceProcurementPlanItemHasOrderSupplierItem();
					} else {
						return $scope.itemEdit;
					}
				},
			}
		})
		.result.then(function(result) {
			if(!angular.isDefined(result.id)) {
				ServiceProcurementPlanItemHasOrderSupplierItem.saveCustom('stockmanagement/procurementplanitemhasordersupplieritems', result, function(savedObject) {
					$scope.items.unshift(savedObject);
					if($scope.itemEdit !== null) {
						var index = $scope.items.map(function(it) { return it.id; }).indexOf($scope.itemEdit.id);
						$scope.items[index].isSelected = false;
					}
					$scope.itemEdit = angular.extend(savedObject);
					$scope.items[0].isSelected = true;
				});
			 } else {
				 ServiceProcurementPlanItemHasOrderSupplierItem.updateCustom('stockmanagement/procurementplanitemhasordersupplieritems/'+result.id, result, function(savedObject) {
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


.controller('ctrlProcurementPlanItemHasOrderSupplierItemEdit',['$scope', 'Localization', '$modal', '$modalInstance', 'dialogs',
	'ServiceProcurementPlanItemHasOrderSupplierItem',    'itemEdit',
function($scope, Localization, $modal, $modalInstance, dialogs,
	ServiceProcurementPlanItemHasOrderSupplierItem,  itemEdit) {

	// dialog mode
	$scope.mode = 'edit';

	// original item state
	var original = angular.copy(itemEdit);
	// item state
	$scope.itemEdit = angular.copy(original);


	// datepicker logic

	// date properties
	$scope.openedDate = false;

	$scope.open = function($event, opened) {
		$event.preventDefault();
		$event.stopPropagation();
		$scope[opened] = true;
	};



	// Save Button
	$scope.save = function() {
		correctDateTime($scope.itemEdit.Date);
	   //	delete $scope.itemEdit.isSelected;
		$modalInstance.close($scope.itemEdit);
	};

    var correctDateTime = function(date) {
        if(date instanceof Date && date !== '') {
            date.setMinutes(date.getMinutes() - date.getTimezoneOffset());
        }
    };

	$scope.canSave = function() {
		var item = $scope.itemEdit;
		return                 item.Date  ;
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


.controller('ctrlProcurementPlanItemHasOrderSupplierItemChoose', ['$scope','ServiceProcurementPlanItemHasOrderSupplierItem', 'dialogs', '$modal', '$modalInstance', 'itemEdit',
function($scope, ServiceProcurementPlanItemHasOrderSupplierItem, dialogs, $modal,  $modalInstance, itemEdit) {

    // entity with properties
    $scope.itemDefinition = {
        label: 'initialization.procurementPlanItemHasOrderSupplierItem',
        properties: [
            { label: 'date', name:'Date', inTable:  true  },
        ]
    };

	$scope.items = [];
	$scope.itemEdit = {};

	// fill table with data
	$scope.loaded = false;
	var getProcurementPlanItemHasOrderSupplierItems = function() {
		if(!$scope.loaded && $scope.items.length === 0) {
			$scope.isLoading = true;
			ServiceProcurementPlanItemHasOrderSupplierItem.query(function(data) {
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
	getProcurementPlanItemHasOrderSupplierItems();

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