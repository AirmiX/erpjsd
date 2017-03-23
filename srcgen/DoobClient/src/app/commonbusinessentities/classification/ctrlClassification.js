'use strict';

angular.module('Doob.commonbusinessentities')


.controller('ctrlClassification',['$scope', '$rootScope', '$modal', 'dialogs', 'CheckSelected', 'ServiceClassification',
    function($scope, $rootScope, $modal, dialogs, CheckSelected, ServiceClassification) {

	// main entity (classification) properties names and labels
	$scope.itemDefinition = {
		label: 'commonbusinessentities.classification',
		properties: [
			{ label: 'cIdentificationCode', name:'CIdentificationCode', inTable:  true  },
			{ label: 'cName', name:'CName', inTable:  false  },
			{ label: 'cShortName', name:'CShortName', inTable:  false  },
			{ label: 'cFinalClassification', name:'CFinalClassification', inTable:  false  },
			{ label: 'cIsAutomatic', name:'CIsAutomatic', inTable:  false  },
			{ label: 'cNameFormat', name:'CNameFormat', inTable:  false  },
			{ label: 'cSpecialApproval', name:'CSpecialApproval', inTable:  false  },
		]
	};

	// identifications with properties names and labels
	$scope.identificationsDefinition = {
		label: 'commonbusinessentities.identification',
		properties : [
			{ label: 'iIdentificationCode', name:'IIdentificationCode' },
		]
	};
	// previousValues with properties names and labels
	$scope.previousValuesDefinition = {
		label: 'commonbusinessentities.classificationArchive',
		properties : [
			{ label: 'cATime', name:'CATime' },
			{ label: 'cAName', name:'CAName' },
		]
	};
	// stockAccountAssignments with properties names and labels
	$scope.stockAccountAssignmentsDefinition = {
		label: 'stockmanagement.stockAccountAssignment',
		properties : [
			{ label: 'sAAValueStatus', name:'SAAValueStatus' },
		]
	};
	// productionProcesses with properties names and labels
	$scope.productionProcessesDefinition = {
		label: 'productiondata.productionProcess',
		properties : [
			{ label: 'pPVariant', name:'PPVariant' },
			{ label: 'pPName', name:'PPName' },
			{ label: 'pPStatus', name:'PPStatus' },
			{ label: 'pPValidStartDate', name:'PPValidStartDate' },
		]
	};
	// characteristics with properties names and labels
	$scope.characteristicsDefinition = {
		label: 'commonbusinessentities.characteristicsRegistry',
		properties : [
			{ label: 'cRIdentificationNumber', name:'CRIdentificationNumber' },
			{ label: 'cRName', name:'CRName' },
		]
	};

	// fill table with data
	$scope.items = [];
	$scope.loaded = false;
	var getClassifications = function() {
		if(!$scope.loaded && $scope.items.length === 0) {
			$scope.isLoading = true;
			ServiceClassification.query(function(data) {
				$scope.items = data;
				$scope.isLoading = false;
				$scope.loaded = true;
			});
		}
	};
	getClassifications();

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

	$scope.$watch('ClassificationCollection', function() {
		$scope.itemEdit = CheckSelected.checkSelectedInTable($scope.itemEdit, $scope.ClassificationCollection, $scope.items);
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
			templateUrl: 'commonbusinessentities/classification/tmplClassificationEdit.tpl.html',
			size: 'lg',
			windowClass: 'hmodal-info',
			controller: 'ctrlClassificationEdit',
			resolve: {
				itemEdit: function() {
					if(isNew) {
						return new ServiceClassification();
					} else {
						return $scope.itemEdit;
					}
				},
				identificationsDefinition: function() {
					return $scope.identificationsDefinition;
				},
				previousValuesDefinition: function() {
					return $scope.previousValuesDefinition;
				},
				stockAccountAssignmentsDefinition: function() {
					return $scope.stockAccountAssignmentsDefinition;
				},
				productionProcessesDefinition: function() {
					return $scope.productionProcessesDefinition;
				},
				characteristicsDefinition: function() {
					return $scope.characteristicsDefinition;
				},
			}
		})
		.result.then(function(result) {
			if(!angular.isDefined(result.id)) {
				ServiceClassification.saveCustom('stockmanagement/classifications', result, function(savedObject) {
					$scope.items.unshift(savedObject);
					if($scope.itemEdit !== null) {
						var index = $scope.items.map(function(it) { return it.id; }).indexOf($scope.itemEdit.id);
						$scope.items[index].isSelected = false;
					}
					$scope.itemEdit = angular.extend(savedObject);
					$scope.items[0].isSelected = true;
				});
			 } else {
				 ServiceClassification.updateCustom('stockmanagement/classifications/'+result.id, result, function(savedObject) {
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


.controller('ctrlClassificationEdit',['$scope', 'Localization', '$modal', '$modalInstance', 'dialogs',
	'ServiceClassification', 'ServiceIdentification', 'ServiceClassificationArchive', 'ServiceStockAccountAssignment', 'ServiceProductionProcess', 'ServiceCharacteristicsRegistry',   'identificationsDefinition',  'previousValuesDefinition',  'stockAccountAssignmentsDefinition',  'productionProcessesDefinition',  'characteristicsDefinition',   'itemEdit',
function($scope, Localization, $modal, $modalInstance, dialogs,
	ServiceClassification, ServiceIdentification, ServiceClassificationArchive, ServiceStockAccountAssignment, ServiceProductionProcess, ServiceCharacteristicsRegistry,  identificationsDefinition,  previousValuesDefinition,  stockAccountAssignmentsDefinition,  productionProcessesDefinition,  characteristicsDefinition,  itemEdit) {

	// dialog mode
	$scope.mode = 'edit';

	// original item state
	var original = angular.copy(itemEdit);
	// item state
	$scope.itemEdit = angular.copy(original);

	// identifications with properties
	$scope.identificationsDefinition = identificationsDefinition;
	// previousValues with properties
	$scope.previousValuesDefinition = previousValuesDefinition;
	// stockAccountAssignments with properties
	$scope.stockAccountAssignmentsDefinition = stockAccountAssignmentsDefinition;
	// productionProcesses with properties
	$scope.productionProcessesDefinition = productionProcessesDefinition;
	// characteristics with properties
	$scope.characteristicsDefinition = characteristicsDefinition;

	// datepicker logic

	// date properties

	$scope.open = function($event, opened) {
		$event.preventDefault();
		$event.stopPropagation();
		$scope[opened] = true;
	};



    $scope.classificationArchiveEdit = null;

    // previousValues table selection logic
    $scope.classificationArchiveSelection = function(item, index) {
        if(item.isSelected) {
            if($scope.classificationArchiveEdit !== null) {
                var index1 = $scope.itemEdit.previousValues.map(function(it) { return it.id; }).indexOf($scope.classificationArchiveEdit.id);
                $scope.itemEdit.previousValues[index1].isSelected = false;
            }
            $scope.classificationArchiveEdit = item;
        } else {
            $scope.classificationArchiveEdit = null;
            item.isSelected = false;
        }
    };

    // New/Edit previousValues dialog
    $scope.openClassificationArchiveEditDialog = function(isNew) {
        $modal.open({
            backdrop: 'static',
            keyboard : false,
            templateUrl: 'commonbusinessentities/classification/tmplClassificationArchiveEdit.tpl.html',
            size: 'lg',
            controller: 'ctrlClassificationArchiveEdit',
            windowClass: 'hmodal-info',
            resolve: {
                itemEdit: function() {
                    if(isNew) {
                        return new ServiceClassificationArchive();
                    } else {
                        return $scope.classificationArchiveEdit;
                    }
                }
            }
        }).result.then(function(result) {
            var i;
            if(isNew) {
                if(!angular.isDefined($scope.itemEdit.previousValues)) {
                    $scope.itemEdit.previousValues = [];
                }
                $scope.itemEdit.previousValues.unshift(result);
                for(i in $scope.itemEdit.previousValues) {
                    $scope.itemEdit.previousValues[i].isSelected = false;
                }
                $scope.classificationArchiveEdit = angular.extend(result);
                $scope.itemEdit.previousValues[0].isSelected = true;
            }
            else {
                for(i in $scope.itemEdit.previousValues) {
                    $scope.itemEdit.previousValues[i].isSelected = false;
                }
                $scope.classificationArchiveEdit = angular.extend(result);
                var index = $scope.itemEdit.previousValues.map(function(it) { return it.id; }).indexOf(result.id);
                for(var key in result) {
                    $scope.itemEdit.previousValues[index][key] = result[key];
                }
                $scope.itemEdit.previousValues[index].isSelected = true;
            }
        });
    };

    $scope.removeClassificationArchive = function(item) {
        var dialog = dialogs.confirm('Please confirm', 'Are you sure you want to delete item?');
        dialog.result.then(function(btn) {
            var removeIndex = $scope.itemEdit.previousValues.map(function(it) { return it.id; }).indexOf(item.id);
            $scope.itemEdit.previousValues[removeIndex].deleted = true;
        });
    };


    $scope.stockAccountAssignmentEdit = null;

    // stockAccountAssignments table selection logic
    $scope.stockAccountAssignmentSelection = function(item, index) {
        if(item.isSelected) {
            if($scope.stockAccountAssignmentEdit !== null) {
                var index1 = $scope.itemEdit.stockAccountAssignments.map(function(it) { return it.id; }).indexOf($scope.stockAccountAssignmentEdit.id);
                $scope.itemEdit.stockAccountAssignments[index1].isSelected = false;
            }
            $scope.stockAccountAssignmentEdit = item;
        } else {
            $scope.stockAccountAssignmentEdit = null;
            item.isSelected = false;
        }
    };

    // New/Edit stockAccountAssignments dialog
    $scope.openStockAccountAssignmentEditDialog = function(isNew) {
        $modal.open({
            backdrop: 'static',
            keyboard : false,
            templateUrl: 'stockmanagement/classification/tmplStockAccountAssignmentEdit.tpl.html',
            size: 'lg',
            controller: 'ctrlStockAccountAssignmentEdit',
            windowClass: 'hmodal-info',
            resolve: {
                itemEdit: function() {
                    if(isNew) {
                        return new ServiceStockAccountAssignment();
                    } else {
                        return $scope.stockAccountAssignmentEdit;
                    }
                }
            }
        }).result.then(function(result) {
            var i;
            if(isNew) {
                if(!angular.isDefined($scope.itemEdit.stockAccountAssignments)) {
                    $scope.itemEdit.stockAccountAssignments = [];
                }
                $scope.itemEdit.stockAccountAssignments.unshift(result);
                for(i in $scope.itemEdit.stockAccountAssignments) {
                    $scope.itemEdit.stockAccountAssignments[i].isSelected = false;
                }
                $scope.stockAccountAssignmentEdit = angular.extend(result);
                $scope.itemEdit.stockAccountAssignments[0].isSelected = true;
            }
            else {
                for(i in $scope.itemEdit.stockAccountAssignments) {
                    $scope.itemEdit.stockAccountAssignments[i].isSelected = false;
                }
                $scope.stockAccountAssignmentEdit = angular.extend(result);
                var index = $scope.itemEdit.stockAccountAssignments.map(function(it) { return it.id; }).indexOf(result.id);
                for(var key in result) {
                    $scope.itemEdit.stockAccountAssignments[index][key] = result[key];
                }
                $scope.itemEdit.stockAccountAssignments[index].isSelected = true;
            }
        });
    };

    $scope.removeStockAccountAssignment = function(item) {
        var dialog = dialogs.confirm('Please confirm', 'Are you sure you want to delete item?');
        dialog.result.then(function(btn) {
            var removeIndex = $scope.itemEdit.stockAccountAssignments.map(function(it) { return it.id; }).indexOf(item.id);
            $scope.itemEdit.stockAccountAssignments[removeIndex].deleted = true;
        });
    };


    $scope.productionProcessEdit = null;

    // productionProcesses table selection logic
    $scope.productionProcessSelection = function(item, index) {
        if(item.isSelected) {
            if($scope.productionProcessEdit !== null) {
                var index1 = $scope.itemEdit.productionProcesses.map(function(it) { return it.id; }).indexOf($scope.productionProcessEdit.id);
                $scope.itemEdit.productionProcesses[index1].isSelected = false;
            }
            $scope.productionProcessEdit = item;
        } else {
            $scope.productionProcessEdit = null;
            item.isSelected = false;
        }
    };

    // New/Edit productionProcesses dialog
    $scope.openProductionProcessEditDialog = function(isNew) {
        $modal.open({
            backdrop: 'static',
            keyboard : false,
            templateUrl: 'productiondata/classification/tmplProductionProcessEdit.tpl.html',
            size: 'lg',
            controller: 'ctrlProductionProcessEdit',
            windowClass: 'hmodal-info',
            resolve: {
                itemEdit: function() {
                    if(isNew) {
                        return new ServiceProductionProcess();
                    } else {
                        return $scope.productionProcessEdit;
                    }
                }
            }
        }).result.then(function(result) {
            var i;
            if(isNew) {
                if(!angular.isDefined($scope.itemEdit.productionProcesses)) {
                    $scope.itemEdit.productionProcesses = [];
                }
                $scope.itemEdit.productionProcesses.unshift(result);
                for(i in $scope.itemEdit.productionProcesses) {
                    $scope.itemEdit.productionProcesses[i].isSelected = false;
                }
                $scope.productionProcessEdit = angular.extend(result);
                $scope.itemEdit.productionProcesses[0].isSelected = true;
            }
            else {
                for(i in $scope.itemEdit.productionProcesses) {
                    $scope.itemEdit.productionProcesses[i].isSelected = false;
                }
                $scope.productionProcessEdit = angular.extend(result);
                var index = $scope.itemEdit.productionProcesses.map(function(it) { return it.id; }).indexOf(result.id);
                for(var key in result) {
                    $scope.itemEdit.productionProcesses[index][key] = result[key];
                }
                $scope.itemEdit.productionProcesses[index].isSelected = true;
            }
        });
    };

    $scope.removeProductionProcess = function(item) {
        var dialog = dialogs.confirm('Please confirm', 'Are you sure you want to delete item?');
        dialog.result.then(function(btn) {
            var removeIndex = $scope.itemEdit.productionProcesses.map(function(it) { return it.id; }).indexOf(item.id);
            $scope.itemEdit.productionProcesses[removeIndex].deleted = true;
        });
    };


    $scope.characteristicsRegistryEdit = null;

    // characteristics table selection logic
    $scope.characteristicsRegistrySelection = function(item, index) {
        if(item.isSelected) {
            if($scope.characteristicsRegistryEdit !== null) {
                var index1 = $scope.itemEdit.characteristics.map(function(it) { return it.id; }).indexOf($scope.characteristicsRegistryEdit.id);
                $scope.itemEdit.characteristics[index1].isSelected = false;
            }
            $scope.characteristicsRegistryEdit = item;
        } else {
            $scope.characteristicsRegistryEdit = null;
            item.isSelected = false;
        }
    };

    // New/Edit characteristics dialog
    $scope.openCharacteristicsRegistryEditDialog = function(isNew) {
        $modal.open({
            backdrop: 'static',
            keyboard : false,
            templateUrl: 'commonbusinessentities/classification/tmplCharacteristicsRegistryEdit.tpl.html',
            size: 'lg',
            controller: 'ctrlCharacteristicsRegistryEdit',
            windowClass: 'hmodal-info',
            resolve: {
                itemEdit: function() {
                    if(isNew) {
                        return new ServiceCharacteristicsRegistry();
                    } else {
                        return $scope.characteristicsRegistryEdit;
                    }
                }
            }
        }).result.then(function(result) {
            var i;
            if(isNew) {
                if(!angular.isDefined($scope.itemEdit.characteristics)) {
                    $scope.itemEdit.characteristics = [];
                }
                $scope.itemEdit.characteristics.unshift(result);
                for(i in $scope.itemEdit.characteristics) {
                    $scope.itemEdit.characteristics[i].isSelected = false;
                }
                $scope.characteristicsRegistryEdit = angular.extend(result);
                $scope.itemEdit.characteristics[0].isSelected = true;
            }
            else {
                for(i in $scope.itemEdit.characteristics) {
                    $scope.itemEdit.characteristics[i].isSelected = false;
                }
                $scope.characteristicsRegistryEdit = angular.extend(result);
                var index = $scope.itemEdit.characteristics.map(function(it) { return it.id; }).indexOf(result.id);
                for(var key in result) {
                    $scope.itemEdit.characteristics[index][key] = result[key];
                }
                $scope.itemEdit.characteristics[index].isSelected = true;
            }
        });
    };

    $scope.removeCharacteristicsRegistry = function(item) {
        var dialog = dialogs.confirm('Please confirm', 'Are you sure you want to delete item?');
        dialog.result.then(function(btn) {
            var removeIndex = $scope.itemEdit.characteristics.map(function(it) { return it.id; }).indexOf(item.id);
            $scope.itemEdit.characteristics[removeIndex].deleted = true;
        });
    };


	// Save Button
	$scope.save = function() {
	   //	delete $scope.itemEdit.isSelected;
        var item;
        var i;
        for(i in $scope.itemEdit.identifications) {
    		item = $scope.itemEdit.identifications[i];
    		delete item.isSelected;
    	}
		$modalInstance.close($scope.itemEdit);
	};


	$scope.canSave = function() {
		var item = $scope.itemEdit;
		return                 item.CIdentificationCode  ;
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


.controller('ctrlClassificationChoose', ['$scope','ServiceClassification', 'dialogs', '$modal', '$modalInstance', 'itemEdit',
function($scope, ServiceClassification, dialogs, $modal,  $modalInstance, itemEdit) {

    // entity with properties
    $scope.itemDefinition = {
        label: 'commonbusinessentities.classification',
        properties: [
            { label: 'cIdentificationCode', name:'CIdentificationCode', inTable:  true  },
            { label: 'cName', name:'CName', inTable:  false  },
            { label: 'cShortName', name:'CShortName', inTable:  false  },
            { label: 'cFinalClassification', name:'CFinalClassification', inTable:  false  },
            { label: 'cIsAutomatic', name:'CIsAutomatic', inTable:  false  },
            { label: 'cNameFormat', name:'CNameFormat', inTable:  false  },
            { label: 'cSpecialApproval', name:'CSpecialApproval', inTable:  false  },
        ]
    };

	$scope.items = [];
	$scope.itemEdit = {};

	// fill table with data
	$scope.loaded = false;
	var getClassifications = function() {
		if(!$scope.loaded && $scope.items.length === 0) {
			$scope.isLoading = true;
			ServiceClassification.query(function(data) {
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
	getClassifications();

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