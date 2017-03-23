'use strict';

angular.module('Doob.commonbusinessentities')


.controller('ctrlCharacteristicsRegistry',['$scope', '$rootScope', '$modal', 'dialogs', 'CheckSelected', 'ServiceCharacteristicsRegistry',
    function($scope, $rootScope, $modal, dialogs, CheckSelected, ServiceCharacteristicsRegistry) {

	// main entity (characteristicsRegistry) properties names and labels
	$scope.itemDefinition = {
		label: 'commonbusinessentities.characteristicsRegistry',
		properties: [
			{ label: 'cRIdentificationNumber', name:'CRIdentificationNumber', inTable:  true  },
			{ label: 'cRName', name:'CRName', inTable:  true  },
			{ label: 'cRPriority', name:'CRPriority', inTable:  false  },
			{ label: 'cRPrintPriority', name:'CRPrintPriority', inTable:  false  },
			{ label: 'cRStatus', name:'CRStatus', inTable:  false  },
			{ label: 'cRLength', name:'CRLength', inTable:  false  },
			{ label: 'cRPrecision', name:'CRPrecision', inTable:  false  },
		]
	};

	// unit with properties names and labels
	$scope.unitDefinition = {
		label: 'commonbusinessentities.measurementUnit',
		properties : [
			{ label: 'mUIdentificationCode', name:'MUIdentificationCode' },
			{ label: 'mUName', name:'MUName' },
		]
	};
	// type with properties names and labels
	$scope.typeDefinition = {
		label: 'commonbusinessentities.characteristicType',
		properties : [
			{ label: 'cTName', name:'CTName' },
		]
	};
	// classification with properties names and labels
	$scope.classificationDefinition = {
		label: 'commonbusinessentities.classification',
		properties : [
			{ label: 'cIdentificationCode', name:'CIdentificationCode' },
		]
	};
	// karakteristike with properties names and labels
	$scope.karakteristikeDefinition = {
		label: 'commonbusinessentities.characteristic',
		properties : [
			{ label: 'cValue', name:'CValue' },
		]
	};

	// fill table with data
	$scope.items = [];
	$scope.loaded = false;
	var getCharacteristicsRegistrys = function() {
		if(!$scope.loaded && $scope.items.length === 0) {
			$scope.isLoading = true;
			ServiceCharacteristicsRegistry.query(function(data) {
				$scope.items = data;
				$scope.isLoading = false;
				$scope.loaded = true;
			});
		}
	};
	getCharacteristicsRegistrys();

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

	$scope.$watch('CharacteristicsRegistryCollection', function() {
		$scope.itemEdit = CheckSelected.checkSelectedInTable($scope.itemEdit, $scope.CharacteristicsRegistryCollection, $scope.items);
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
			templateUrl: 'commonbusinessentities/characteristicsregistry/tmplCharacteristicsRegistryEdit.tpl.html',
			size: 'lg',
			windowClass: 'hmodal-info',
			controller: 'ctrlCharacteristicsRegistryEdit',
			resolve: {
				itemEdit: function() {
					if(isNew) {
						return new ServiceCharacteristicsRegistry();
					} else {
						return $scope.itemEdit;
					}
				},
				unitDefinition: function() {
					return $scope.unitDefinition;
				},
				typeDefinition: function() {
					return $scope.typeDefinition;
				},
				classificationDefinition: function() {
					return $scope.classificationDefinition;
				},
				karakteristikeDefinition: function() {
					return $scope.karakteristikeDefinition;
				},
			}
		})
		.result.then(function(result) {
			if(!angular.isDefined(result.id)) {
				ServiceCharacteristicsRegistry.saveCustom('stockmanagement/characteristicsregistrys', result, function(savedObject) {
					$scope.items.unshift(savedObject);
					if($scope.itemEdit !== null) {
						var index = $scope.items.map(function(it) { return it.id; }).indexOf($scope.itemEdit.id);
						$scope.items[index].isSelected = false;
					}
					$scope.itemEdit = angular.extend(savedObject);
					$scope.items[0].isSelected = true;
				});
			 } else {
				 ServiceCharacteristicsRegistry.updateCustom('stockmanagement/characteristicsregistrys/'+result.id, result, function(savedObject) {
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


.controller('ctrlCharacteristicsRegistryEdit',['$scope', 'Localization', '$modal', '$modalInstance', 'dialogs',
	'ServiceCharacteristicsRegistry', 'ServiceMeasurementUnit', 'ServiceCharacteristicType', 'ServiceClassification', 'ServiceCharacteristic',   'unitDefinition',  'typeDefinition',  'classificationDefinition',  'karakteristikeDefinition',   'itemEdit',
function($scope, Localization, $modal, $modalInstance, dialogs,
	ServiceCharacteristicsRegistry, ServiceMeasurementUnit, ServiceCharacteristicType, ServiceClassification, ServiceCharacteristic,  unitDefinition,  typeDefinition,  classificationDefinition,  karakteristikeDefinition,  itemEdit) {

	// dialog mode
	$scope.mode = 'edit';

	// original item state
	var original = angular.copy(itemEdit);
	// item state
	$scope.itemEdit = angular.copy(original);

	// unit with properties
	$scope.unitDefinition = unitDefinition;
	// type with properties
	$scope.typeDefinition = typeDefinition;
	// classification with properties
	$scope.classificationDefinition = classificationDefinition;
	// karakteristike with properties
	$scope.karakteristikeDefinition = karakteristikeDefinition;

	// datepicker logic

	// date properties

	$scope.open = function($event, opened) {
		$event.preventDefault();
		$event.stopPropagation();
		$scope[opened] = true;
	};



	// Choose unit
	$scope.openChooseUnitDialog = function() {
        $modal.open({
            backdrop: 'static',
            keyboard : false,
            templateUrl: 'commonbusinessentities/characteristicsregistry/tmplMeasurementUnitChoose.tpl.html',
            size: 'lg',
            controller: 'ctrlMeasurementUnitChoose',
            windowClass: 'hmodal-info',
            resolve: {
				itemEdit: function() {
					if(angular.isDefined($scope.itemEdit.unit)){
						return $scope.itemEdit.unit;
					}
				}
			}
		}).result.then(function(result) {
			$scope.itemEdit.unit = angular.copy(result);
		});
    };


	// Choose type
	$scope.openChooseTypeDialog = function() {
        $modal.open({
            backdrop: 'static',
            keyboard : false,
            templateUrl: 'commonbusinessentities/characteristicsregistry/tmplCharacteristicTypeChoose.tpl.html',
            size: 'lg',
            controller: 'ctrlCharacteristicTypeChoose',
            windowClass: 'hmodal-info',
            resolve: {
				itemEdit: function() {
					if(angular.isDefined($scope.itemEdit.type)){
						return $scope.itemEdit.type;
					}
				}
			}
		}).result.then(function(result) {
			$scope.itemEdit.type = angular.copy(result);
		});
    };


	// Choose classification
	$scope.openChooseClassificationDialog = function() {
        $modal.open({
            backdrop: 'static',
            keyboard : false,
            templateUrl: 'commonbusinessentities/characteristicsregistry/tmplClassificationChoose.tpl.html',
            size: 'lg',
            controller: 'ctrlClassificationChoose',
            windowClass: 'hmodal-info',
            resolve: {
				itemEdit: function() {
					if(angular.isDefined($scope.itemEdit.classification)){
						return $scope.itemEdit.classification;
					}
				}
			}
		}).result.then(function(result) {
			$scope.itemEdit.classification = angular.copy(result);
		});
    };


    $scope.characteristicEdit = null;

    // karakteristike table selection logic
    $scope.characteristicSelection = function(item, index) {
        if(item.isSelected) {
            if($scope.characteristicEdit !== null) {
                var index1 = $scope.itemEdit.karakteristike.map(function(it) { return it.id; }).indexOf($scope.characteristicEdit.id);
                $scope.itemEdit.karakteristike[index1].isSelected = false;
            }
            $scope.characteristicEdit = item;
        } else {
            $scope.characteristicEdit = null;
            item.isSelected = false;
        }
    };

    // New/Edit karakteristike dialog
    $scope.openCharacteristicEditDialog = function(isNew) {
        $modal.open({
            backdrop: 'static',
            keyboard : false,
            templateUrl: 'commonbusinessentities/characteristicsregistry/tmplCharacteristicEdit.tpl.html',
            size: 'lg',
            controller: 'ctrlCharacteristicEdit',
            windowClass: 'hmodal-info',
            resolve: {
                itemEdit: function() {
                    if(isNew) {
                        return new ServiceCharacteristic();
                    } else {
                        return $scope.characteristicEdit;
                    }
                }
            }
        }).result.then(function(result) {
            var i;
            if(isNew) {
                if(!angular.isDefined($scope.itemEdit.karakteristike)) {
                    $scope.itemEdit.karakteristike = [];
                }
                $scope.itemEdit.karakteristike.unshift(result);
                for(i in $scope.itemEdit.karakteristike) {
                    $scope.itemEdit.karakteristike[i].isSelected = false;
                }
                $scope.characteristicEdit = angular.extend(result);
                $scope.itemEdit.karakteristike[0].isSelected = true;
            }
            else {
                for(i in $scope.itemEdit.karakteristike) {
                    $scope.itemEdit.karakteristike[i].isSelected = false;
                }
                $scope.characteristicEdit = angular.extend(result);
                var index = $scope.itemEdit.karakteristike.map(function(it) { return it.id; }).indexOf(result.id);
                for(var key in result) {
                    $scope.itemEdit.karakteristike[index][key] = result[key];
                }
                $scope.itemEdit.karakteristike[index].isSelected = true;
            }
        });
    };

    $scope.removeCharacteristic = function(item) {
        var dialog = dialogs.confirm('Please confirm', 'Are you sure you want to delete item?');
        dialog.result.then(function(btn) {
            var removeIndex = $scope.itemEdit.karakteristike.map(function(it) { return it.id; }).indexOf(item.id);
            $scope.itemEdit.karakteristike[removeIndex].deleted = true;
        });
    };


	// Save Button
	$scope.save = function() {
	   //	delete $scope.itemEdit.isSelected;
		$modalInstance.close($scope.itemEdit);
	};


	$scope.canSave = function() {
		var item = $scope.itemEdit;
		return                 item.CRIdentificationNumber  &&                 item.CRName  ;
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


.controller('ctrlCharacteristicsRegistryChoose', ['$scope','ServiceCharacteristicsRegistry', 'dialogs', '$modal', '$modalInstance', 'itemEdit',
function($scope, ServiceCharacteristicsRegistry, dialogs, $modal,  $modalInstance, itemEdit) {

    // entity with properties
    $scope.itemDefinition = {
        label: 'commonbusinessentities.characteristicsRegistry',
        properties: [
            { label: 'cRIdentificationNumber', name:'CRIdentificationNumber', inTable:  true  },
            { label: 'cRName', name:'CRName', inTable:  true  },
            { label: 'cRPriority', name:'CRPriority', inTable:  false  },
            { label: 'cRPrintPriority', name:'CRPrintPriority', inTable:  false  },
            { label: 'cRStatus', name:'CRStatus', inTable:  false  },
            { label: 'cRLength', name:'CRLength', inTable:  false  },
            { label: 'cRPrecision', name:'CRPrecision', inTable:  false  },
        ]
    };

	$scope.items = [];
	$scope.itemEdit = {};

	// fill table with data
	$scope.loaded = false;
	var getCharacteristicsRegistrys = function() {
		if(!$scope.loaded && $scope.items.length === 0) {
			$scope.isLoading = true;
			ServiceCharacteristicsRegistry.query(function(data) {
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
	getCharacteristicsRegistrys();

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