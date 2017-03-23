'use strict';

angular.module('Doob.logical')


.controller('ctrlParity',['$scope', '$rootScope', '$modal', 'dialogs', 'CheckSelected', 'ServiceParity',
    function($scope, $rootScope, $modal, dialogs, CheckSelected, ServiceParity) {

	// main entity (parity) properties names and labels
	$scope.itemDefinition = {
		label: 'logical.parity',
		properties: [
			{ label: 'pDesignation', name:'PDesignation', inTable:  true  },
			{ label: 'pDescription', name:'PDescription', inTable:  true  },
		]
	};

	// orderSupplierHeadings with properties names and labels
	$scope.orderSupplierHeadingsDefinition = {
		label: 'logical.orderSupplierHeading',
		properties : [
			{ label: 'oSHNumber', name:'OSHNumber' },
			{ label: 'oSHDate', name:'OSHDate' },
			{ label: 'oSHApprovalDate', name:'OSHApprovalDate' },
		]
	};

	// fill table with data
	$scope.items = [];
	$scope.loaded = false;
	var getParitys = function() {
		if(!$scope.loaded && $scope.items.length === 0) {
			$scope.isLoading = true;
			ServiceParity.query(function(data) {
				$scope.items = data;
				$scope.isLoading = false;
				$scope.loaded = true;
			});
		}
	};
	getParitys();

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

	$scope.$watch('ParityCollection', function() {
		$scope.itemEdit = CheckSelected.checkSelectedInTable($scope.itemEdit, $scope.ParityCollection, $scope.items);
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
			templateUrl: 'logical/parity/tmplParityEdit.tpl.html',
			size: 'lg',
			windowClass: 'hmodal-info',
			controller: 'ctrlParityEdit',
			resolve: {
				itemEdit: function() {
					if(isNew) {
						return new ServiceParity();
					} else {
						return $scope.itemEdit;
					}
				},
				orderSupplierHeadingsDefinition: function() {
					return $scope.orderSupplierHeadingsDefinition;
				},
			}
		})
		.result.then(function(result) {
			if(!angular.isDefined(result.id)) {
				ServiceParity.saveCustom('stockmanagement/paritys', result, function(savedObject) {
					$scope.items.unshift(savedObject);
					if($scope.itemEdit !== null) {
						var index = $scope.items.map(function(it) { return it.id; }).indexOf($scope.itemEdit.id);
						$scope.items[index].isSelected = false;
					}
					$scope.itemEdit = angular.extend(savedObject);
					$scope.items[0].isSelected = true;
				});
			 } else {
				 ServiceParity.updateCustom('stockmanagement/paritys/'+result.id, result, function(savedObject) {
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


.controller('ctrlParityEdit',['$scope', 'Localization', '$modal', '$modalInstance', 'dialogs',
	'ServiceParity', 'ServiceOrderSupplierHeading',   'orderSupplierHeadingsDefinition',   'itemEdit',
function($scope, Localization, $modal, $modalInstance, dialogs,
	ServiceParity, ServiceOrderSupplierHeading,  orderSupplierHeadingsDefinition,  itemEdit) {

	// dialog mode
	$scope.mode = 'edit';

	// original item state
	var original = angular.copy(itemEdit);
	// item state
	$scope.itemEdit = angular.copy(original);

	// orderSupplierHeadings with properties
	$scope.orderSupplierHeadingsDefinition = orderSupplierHeadingsDefinition;

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
        for(i in $scope.itemEdit.orderSupplierHeadings) {
    		item = $scope.itemEdit.orderSupplierHeadings[i];
    		delete item.isSelected;
    	}
		$modalInstance.close($scope.itemEdit);
	};


	$scope.canSave = function() {
		var item = $scope.itemEdit;
		return                 item.PDesignation  &&                 item.PDescription  ;
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


.controller('ctrlParityChoose', ['$scope','ServiceParity', 'dialogs', '$modal', '$modalInstance', 'itemEdit',
function($scope, ServiceParity, dialogs, $modal,  $modalInstance, itemEdit) {

    // entity with properties
    $scope.itemDefinition = {
        label: 'logical.parity',
        properties: [
            { label: 'pDesignation', name:'PDesignation', inTable:  true  },
            { label: 'pDescription', name:'PDescription', inTable:  true  },
        ]
    };

	$scope.items = [];
	$scope.itemEdit = {};

	// fill table with data
	$scope.loaded = false;
	var getParitys = function() {
		if(!$scope.loaded && $scope.items.length === 0) {
			$scope.isLoading = true;
			ServiceParity.query(function(data) {
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
	getParitys();

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