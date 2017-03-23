'use strict';

angular.module('Doob.productiondata')


.controller('ctrlConsumableSupplies',['$scope', '$rootScope', '$modal', 'dialogs', 'CheckSelected', 'ServiceConsumableSupplies',
    function($scope, $rootScope, $modal, dialogs, CheckSelected, ServiceConsumableSupplies) {

	// main entity (consumableSupplies) properties names and labels
	$scope.itemDefinition = {
		label: 'productiondata.consumableSupplies',
		properties: [
			{ label: 'cSNormativ', name:'CSNormativ', inTable:  true  },
		]
	};

	// productionProcess with properties names and labels
	$scope.productionProcessDefinition = {
		label: 'productiondata.productionProcess',
		properties : [
			{ label: 'pPVariant', name:'PPVariant' },
			{ label: 'pPName', name:'PPName' },
			{ label: 'pPStatus', name:'PPStatus' },
			{ label: 'pPValidStartDate', name:'PPValidStartDate' },
		]
	};
	// identification with properties names and labels
	$scope.identificationDefinition = {
		label: 'commonbusinessentities.identification',
		properties : [
			{ label: 'iIdentificationCode', name:'IIdentificationCode' },
		]
	};

	// fill table with data
	$scope.items = [];
	$scope.loaded = false;
	var getConsumableSuppliess = function() {
		if(!$scope.loaded && $scope.items.length === 0) {
			$scope.isLoading = true;
			ServiceConsumableSupplies.query(function(data) {
				$scope.items = data;
				$scope.isLoading = false;
				$scope.loaded = true;
			});
		}
	};
	getConsumableSuppliess();

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

	$scope.$watch('ConsumableSuppliesCollection', function() {
		$scope.itemEdit = CheckSelected.checkSelectedInTable($scope.itemEdit, $scope.ConsumableSuppliesCollection, $scope.items);
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
			templateUrl: 'productiondata/consumablesupplies/tmplConsumableSuppliesEdit.tpl.html',
			size: 'lg',
			windowClass: 'hmodal-info',
			controller: 'ctrlConsumableSuppliesEdit',
			resolve: {
				itemEdit: function() {
					if(isNew) {
						return new ServiceConsumableSupplies();
					} else {
						return $scope.itemEdit;
					}
				},
				productionProcessDefinition: function() {
					return $scope.productionProcessDefinition;
				},
				identificationDefinition: function() {
					return $scope.identificationDefinition;
				},
			}
		})
		.result.then(function(result) {
			if(!angular.isDefined(result.id)) {
				ServiceConsumableSupplies.saveCustom('stockmanagement/consumablesuppliess', result, function(savedObject) {
					$scope.items.unshift(savedObject);
					if($scope.itemEdit !== null) {
						var index = $scope.items.map(function(it) { return it.id; }).indexOf($scope.itemEdit.id);
						$scope.items[index].isSelected = false;
					}
					$scope.itemEdit = angular.extend(savedObject);
					$scope.items[0].isSelected = true;
				});
			 } else {
				 ServiceConsumableSupplies.updateCustom('stockmanagement/consumablesuppliess/'+result.id, result, function(savedObject) {
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


.controller('ctrlConsumableSuppliesEdit',['$scope', 'Localization', '$modal', '$modalInstance', 'dialogs',
	'ServiceConsumableSupplies', 'ServiceProductionProcess', 'ServiceIdentification',   'productionProcessDefinition',  'identificationDefinition',   'itemEdit',
function($scope, Localization, $modal, $modalInstance, dialogs,
	ServiceConsumableSupplies, ServiceProductionProcess, ServiceIdentification,  productionProcessDefinition,  identificationDefinition,  itemEdit) {

	// dialog mode
	$scope.mode = 'edit';

	// original item state
	var original = angular.copy(itemEdit);
	// item state
	$scope.itemEdit = angular.copy(original);

	// productionProcess with properties
	$scope.productionProcessDefinition = productionProcessDefinition;
	// identification with properties
	$scope.identificationDefinition = identificationDefinition;

	// datepicker logic

	// date properties

	$scope.open = function($event, opened) {
		$event.preventDefault();
		$event.stopPropagation();
		$scope[opened] = true;
	};



	// Choose productionProcess
	$scope.openChooseProductionProcessDialog = function() {
        $modal.open({
            backdrop: 'static',
            keyboard : false,
            templateUrl: 'productiondata/consumablesupplies/tmplProductionProcessChoose.tpl.html',
            size: 'lg',
            controller: 'ctrlProductionProcessChoose',
            windowClass: 'hmodal-info',
            resolve: {
				itemEdit: function() {
					if(angular.isDefined($scope.itemEdit.productionProcess)){
						return $scope.itemEdit.productionProcess;
					}
				}
			}
		}).result.then(function(result) {
			$scope.itemEdit.productionProcess = angular.copy(result);
		});
    };


	// Choose identification
	$scope.openChooseIdentificationDialog = function() {
        $modal.open({
            backdrop: 'static',
            keyboard : false,
            templateUrl: 'commonbusinessentities/consumablesupplies/tmplIdentificationChoose.tpl.html',
            size: 'lg',
            controller: 'ctrlIdentificationChoose',
            windowClass: 'hmodal-info',
            resolve: {
				itemEdit: function() {
					if(angular.isDefined($scope.itemEdit.identification)){
						return $scope.itemEdit.identification;
					}
				}
			}
		}).result.then(function(result) {
			$scope.itemEdit.identification = angular.copy(result);
		});
    };


	// Save Button
	$scope.save = function() {
	   //	delete $scope.itemEdit.isSelected;
		$modalInstance.close($scope.itemEdit);
	};


	$scope.canSave = function() {
		var item = $scope.itemEdit;
		return                 item.CSNormativ  ;
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


.controller('ctrlConsumableSuppliesChoose', ['$scope','ServiceConsumableSupplies', 'dialogs', '$modal', '$modalInstance', 'itemEdit',
function($scope, ServiceConsumableSupplies, dialogs, $modal,  $modalInstance, itemEdit) {

    // entity with properties
    $scope.itemDefinition = {
        label: 'productiondata.consumableSupplies',
        properties: [
            { label: 'cSNormativ', name:'CSNormativ', inTable:  true  },
        ]
    };

	$scope.items = [];
	$scope.itemEdit = {};

	// fill table with data
	$scope.loaded = false;
	var getConsumableSuppliess = function() {
		if(!$scope.loaded && $scope.items.length === 0) {
			$scope.isLoading = true;
			ServiceConsumableSupplies.query(function(data) {
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
	getConsumableSuppliess();

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