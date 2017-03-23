'use strict';

angular.module('Doob.capacitymanagement')


.controller('ctrlTechnicalCharacteristicProductionEquipment',['$scope', '$rootScope', '$modal', 'dialogs', 'CheckSelected', 'ServiceTechnicalCharacteristicProductionEquipment',
    function($scope, $rootScope, $modal, dialogs, CheckSelected, ServiceTechnicalCharacteristicProductionEquipment) {

	// main entity (technicalCharacteristicProductionEquipment) properties names and labels
	$scope.itemDefinition = {
		label: 'capacitymanagement.technicalCharacteristicProductionEquipment',
		properties: [
			{ label: 'tCPEOrdinalNumber', name:'TCPEOrdinalNumber', inTable:  true  },
			{ label: 'tCPECharacteristicDescription', name:'TCPECharacteristicDescription', inTable:  true  },
			{ label: 'tCPECharacteristicValue', name:'TCPECharacteristicValue', inTable:  true  },
			{ label: 'tCPEMeasurementUnit', name:'TCPEMeasurementUnit', inTable:  false  },
		]
	};

	// technologicalUnit with properties names and labels
	$scope.technologicalUnitDefinition = {
		label: 'capacitymanagement.technologicalUnit',
		properties : [
			{ label: 'tUNumber', name:'TUNumber' },
			{ label: 'tUShortName', name:'TUShortName' },
			{ label: 'tUName', name:'TUName' },
			{ label: 'tUType', name:'TUType' },
			{ label: 'tUTechnicalCapacity', name:'TUTechnicalCapacity' },
			{ label: 'tUAvailableCapacity', name:'TUAvailableCapacity' },
			{ label: 'tUWorkingDayLength', name:'TUWorkingDayLength' },
			{ label: 'tUWorkingWeekLength', name:'TUWorkingWeekLength' },
			{ label: 'tUShiftsNumber', name:'TUShiftsNumber' },
			{ label: 'tUNumberOfEmployee', name:'TUNumberOfEmployee' },
			{ label: 'tUActivityStatus', name:'TUActivityStatus' },
			{ label: 'tUCompletenessStatus', name:'TUCompletenessStatus' },
		]
	};

	// fill table with data
	$scope.items = [];
	$scope.loaded = false;
	var getTechnicalCharacteristicProductionEquipments = function() {
		if(!$scope.loaded && $scope.items.length === 0) {
			$scope.isLoading = true;
			ServiceTechnicalCharacteristicProductionEquipment.query(function(data) {
				$scope.items = data;
				$scope.isLoading = false;
				$scope.loaded = true;
			});
		}
	};
	getTechnicalCharacteristicProductionEquipments();

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

	$scope.$watch('TechnicalCharacteristicProductionEquipmentCollection', function() {
		$scope.itemEdit = CheckSelected.checkSelectedInTable($scope.itemEdit, $scope.TechnicalCharacteristicProductionEquipmentCollection, $scope.items);
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
			templateUrl: 'capacitymanagement/technicalcharacteristicproductionequipment/tmplTechnicalCharacteristicProductionEquipmentEdit.tpl.html',
			size: 'lg',
			windowClass: 'hmodal-info',
			controller: 'ctrlTechnicalCharacteristicProductionEquipmentEdit',
			resolve: {
				itemEdit: function() {
					if(isNew) {
						return new ServiceTechnicalCharacteristicProductionEquipment();
					} else {
						return $scope.itemEdit;
					}
				},
				technologicalUnitDefinition: function() {
					return $scope.technologicalUnitDefinition;
				},
			}
		})
		.result.then(function(result) {
			if(!angular.isDefined(result.id)) {
				ServiceTechnicalCharacteristicProductionEquipment.saveCustom('stockmanagement/technicalcharacteristicproductionequipments', result, function(savedObject) {
					$scope.items.unshift(savedObject);
					if($scope.itemEdit !== null) {
						var index = $scope.items.map(function(it) { return it.id; }).indexOf($scope.itemEdit.id);
						$scope.items[index].isSelected = false;
					}
					$scope.itemEdit = angular.extend(savedObject);
					$scope.items[0].isSelected = true;
				});
			 } else {
				 ServiceTechnicalCharacteristicProductionEquipment.updateCustom('stockmanagement/technicalcharacteristicproductionequipments/'+result.id, result, function(savedObject) {
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


.controller('ctrlTechnicalCharacteristicProductionEquipmentEdit',['$scope', 'Localization', '$modal', '$modalInstance', 'dialogs',
	'ServiceTechnicalCharacteristicProductionEquipment', 'ServiceTechnologicalUnit',   'technologicalUnitDefinition',   'itemEdit',
function($scope, Localization, $modal, $modalInstance, dialogs,
	ServiceTechnicalCharacteristicProductionEquipment, ServiceTechnologicalUnit,  technologicalUnitDefinition,  itemEdit) {

	// dialog mode
	$scope.mode = 'edit';

	// original item state
	var original = angular.copy(itemEdit);
	// item state
	$scope.itemEdit = angular.copy(original);

	// technologicalUnit with properties
	$scope.technologicalUnitDefinition = technologicalUnitDefinition;

	// datepicker logic

	// date properties

	$scope.open = function($event, opened) {
		$event.preventDefault();
		$event.stopPropagation();
		$scope[opened] = true;
	};



	// Choose technologicalUnit
	$scope.openChooseTechnologicalUnitDialog = function() {
        $modal.open({
            backdrop: 'static',
            keyboard : false,
            templateUrl: 'capacitymanagement/technicalcharacteristicproductionequipment/tmplTechnologicalUnitChoose.tpl.html',
            size: 'lg',
            controller: 'ctrlTechnologicalUnitChoose',
            windowClass: 'hmodal-info',
            resolve: {
				itemEdit: function() {
					if(angular.isDefined($scope.itemEdit.technologicalUnit)){
						return $scope.itemEdit.technologicalUnit;
					}
				}
			}
		}).result.then(function(result) {
			$scope.itemEdit.technologicalUnit = angular.copy(result);
		});
    };


	// Save Button
	$scope.save = function() {
	   //	delete $scope.itemEdit.isSelected;
		$modalInstance.close($scope.itemEdit);
	};


	$scope.canSave = function() {
		var item = $scope.itemEdit;
		return                 item.TCPEOrdinalNumber  &&                 item.TCPECharacteristicDescription  &&                 item.TCPECharacteristicValue  ;
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


.controller('ctrlTechnicalCharacteristicProductionEquipmentChoose', ['$scope','ServiceTechnicalCharacteristicProductionEquipment', 'dialogs', '$modal', '$modalInstance', 'itemEdit',
function($scope, ServiceTechnicalCharacteristicProductionEquipment, dialogs, $modal,  $modalInstance, itemEdit) {

    // entity with properties
    $scope.itemDefinition = {
        label: 'capacitymanagement.technicalCharacteristicProductionEquipment',
        properties: [
            { label: 'tCPEOrdinalNumber', name:'TCPEOrdinalNumber', inTable:  true  },
            { label: 'tCPECharacteristicDescription', name:'TCPECharacteristicDescription', inTable:  true  },
            { label: 'tCPECharacteristicValue', name:'TCPECharacteristicValue', inTable:  true  },
            { label: 'tCPEMeasurementUnit', name:'TCPEMeasurementUnit', inTable:  false  },
        ]
    };

	$scope.items = [];
	$scope.itemEdit = {};

	// fill table with data
	$scope.loaded = false;
	var getTechnicalCharacteristicProductionEquipments = function() {
		if(!$scope.loaded && $scope.items.length === 0) {
			$scope.isLoading = true;
			ServiceTechnicalCharacteristicProductionEquipment.query(function(data) {
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
	getTechnicalCharacteristicProductionEquipments();

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