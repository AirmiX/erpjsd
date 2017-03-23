'use strict';

angular.module('Doob.productiondata')


.controller('ctrlProductionProcess',['$scope', '$rootScope', '$modal', 'dialogs', 'CheckSelected', 'ServiceProductionProcess',
    function($scope, $rootScope, $modal, dialogs, CheckSelected, ServiceProductionProcess) {

	// main entity (productionProcess) properties names and labels
	$scope.itemDefinition = {
		label: 'productiondata.productionProcess',
		properties: [
			{ label: 'pPVariant', name:'PPVariant', inTable:  true  },
			{ label: 'pPName', name:'PPName', inTable:  true  },
			{ label: 'pPStatus', name:'PPStatus', inTable:  true  },
			{ label: 'pPValidStartDate', name:'PPValidStartDate', inTable:  true  },
			{ label: 'pPValidEndDate', name:'PPValidEndDate', inTable:  false  },
			{ label: 'pPOptimumBatchSize', name:'PPOptimumBatchSize', inTable:  false  },
			{ label: 'pPProductionCycle', name:'PPProductionCycle', inTable:  false  },
			{ label: 'pPTechnologist', name:'PPTechnologist', inTable:  false  },
			{ label: 'pPCreationDate', name:'PPCreationDate', inTable:  false  },
			{ label: 'pPNormedBy', name:'PPNormedBy', inTable:  false  },
			{ label: 'pPNormingDate', name:'PPNormingDate', inTable:  false  },
			{ label: 'pPControledBy', name:'PPControledBy', inTable:  false  },
			{ label: 'pPControlDate', name:'PPControlDate', inTable:  false  },
			{ label: 'pPApprovedBy', name:'PPApprovedBy', inTable:  false  },
			{ label: 'pPApprovalDate', name:'PPApprovalDate', inTable:  false  },
		]
	};

	// classification with properties names and labels
	$scope.classificationDefinition = {
		label: 'commonbusinessentities.classification',
		properties : [
			{ label: 'cIdentificationCode', name:'CIdentificationCode' },
		]
	};
	// productionProcessType with properties names and labels
	$scope.productionProcessTypeDefinition = {
		label: 'productiondata.productionProcessType',
		properties : [
			{ label: 'pPTDesignation', name:'PPTDesignation' },
			{ label: 'pPTName', name:'PPTName' },
			{ label: 'pPTShortName', name:'PPTShortName' },
		]
	};
	// organizationUnit with properties names and labels
	$scope.organizationUnitDefinition = {
		label: 'corporation.organizationUnit',
		properties : [
			{ label: 'oUIdentificationCode', name:'OUIdentificationCode' },
			{ label: 'oUName', name:'OUName' },
		]
	};
	// consumableSupplies with properties names and labels
	$scope.consumableSuppliesDefinition = {
		label: 'productiondata.consumableSupplies',
		properties : [
			{ label: 'cSNormativ', name:'CSNormativ' },
		]
	};
	// productionProcessSteps with properties names and labels
	$scope.productionProcessStepsDefinition = {
		label: 'productiondata.productionProcessSteps',
		properties : [
			{ label: 'pPSOrdinalNumber', name:'PPSOrdinalNumber' },
			{ label: 'pPSStepDuration', name:'PPSStepDuration' },
			{ label: 'pPSControlIndicator', name:'PPSControlIndicator' },
			{ label: 'pPSValidStartDate', name:'PPSValidStartDate' },
		]
	};

	// fill table with data
	$scope.items = [];
	$scope.loaded = false;
	var getProductionProcesss = function() {
		if(!$scope.loaded && $scope.items.length === 0) {
			$scope.isLoading = true;
			ServiceProductionProcess.query(function(data) {
				$scope.items = data;
				$scope.isLoading = false;
				$scope.loaded = true;
			});
		}
	};
	getProductionProcesss();

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

	$scope.$watch('ProductionProcessCollection', function() {
		$scope.itemEdit = CheckSelected.checkSelectedInTable($scope.itemEdit, $scope.ProductionProcessCollection, $scope.items);
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
			templateUrl: 'productiondata/productionprocess/tmplProductionProcessEdit.tpl.html',
			size: 'lg',
			windowClass: 'hmodal-info',
			controller: 'ctrlProductionProcessEdit',
			resolve: {
				itemEdit: function() {
					if(isNew) {
						return new ServiceProductionProcess();
					} else {
						return $scope.itemEdit;
					}
				},
				classificationDefinition: function() {
					return $scope.classificationDefinition;
				},
				productionProcessTypeDefinition: function() {
					return $scope.productionProcessTypeDefinition;
				},
				organizationUnitDefinition: function() {
					return $scope.organizationUnitDefinition;
				},
				consumableSuppliesDefinition: function() {
					return $scope.consumableSuppliesDefinition;
				},
				productionProcessStepsDefinition: function() {
					return $scope.productionProcessStepsDefinition;
				},
			}
		})
		.result.then(function(result) {
			if(!angular.isDefined(result.id)) {
				ServiceProductionProcess.saveCustom('stockmanagement/productionprocesss', result, function(savedObject) {
					$scope.items.unshift(savedObject);
					if($scope.itemEdit !== null) {
						var index = $scope.items.map(function(it) { return it.id; }).indexOf($scope.itemEdit.id);
						$scope.items[index].isSelected = false;
					}
					$scope.itemEdit = angular.extend(savedObject);
					$scope.items[0].isSelected = true;
				});
			 } else {
				 ServiceProductionProcess.updateCustom('stockmanagement/productionprocesss/'+result.id, result, function(savedObject) {
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


.controller('ctrlProductionProcessEdit',['$scope', 'Localization', '$modal', '$modalInstance', 'dialogs',
	'ServiceProductionProcess', 'ServiceClassification', 'ServiceProductionProcessType', 'ServiceOrganizationUnit', 'ServiceConsumableSupplies', 'ServiceProductionProcessSteps',   'classificationDefinition',  'productionProcessTypeDefinition',  'organizationUnitDefinition',  'consumableSuppliesDefinition',  'productionProcessStepsDefinition',   'itemEdit',
function($scope, Localization, $modal, $modalInstance, dialogs,
	ServiceProductionProcess, ServiceClassification, ServiceProductionProcessType, ServiceOrganizationUnit, ServiceConsumableSupplies, ServiceProductionProcessSteps,  classificationDefinition,  productionProcessTypeDefinition,  organizationUnitDefinition,  consumableSuppliesDefinition,  productionProcessStepsDefinition,  itemEdit) {

	// dialog mode
	$scope.mode = 'edit';

	// original item state
	var original = angular.copy(itemEdit);
	// item state
	$scope.itemEdit = angular.copy(original);

	// classification with properties
	$scope.classificationDefinition = classificationDefinition;
	// productionProcessType with properties
	$scope.productionProcessTypeDefinition = productionProcessTypeDefinition;
	// organizationUnit with properties
	$scope.organizationUnitDefinition = organizationUnitDefinition;
	// consumableSupplies with properties
	$scope.consumableSuppliesDefinition = consumableSuppliesDefinition;
	// productionProcessSteps with properties
	$scope.productionProcessStepsDefinition = productionProcessStepsDefinition;

	// datepicker logic

	// date properties
	$scope.openedPPValidStartDate = false;
	$scope.openedPPValidEndDate = false;
	$scope.openedPPCreationDate = false;
	$scope.openedPPNormingDate = false;
	$scope.openedPPControlDate = false;
	$scope.openedPPApprovalDate = false;

	$scope.open = function($event, opened) {
		$event.preventDefault();
		$event.stopPropagation();
		$scope[opened] = true;
	};



	// Choose classification
	$scope.openChooseClassificationDialog = function() {
        $modal.open({
            backdrop: 'static',
            keyboard : false,
            templateUrl: 'commonbusinessentities/productionprocess/tmplClassificationChoose.tpl.html',
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


	// Choose productionProcessType
	$scope.openChooseProductionProcessTypeDialog = function() {
        $modal.open({
            backdrop: 'static',
            keyboard : false,
            templateUrl: 'productiondata/productionprocess/tmplProductionProcessTypeChoose.tpl.html',
            size: 'lg',
            controller: 'ctrlProductionProcessTypeChoose',
            windowClass: 'hmodal-info',
            resolve: {
				itemEdit: function() {
					if(angular.isDefined($scope.itemEdit.productionProcessType)){
						return $scope.itemEdit.productionProcessType;
					}
				}
			}
		}).result.then(function(result) {
			$scope.itemEdit.productionProcessType = angular.copy(result);
		});
    };


	// Choose organizationUnit
	$scope.openChooseOrganizationUnitDialog = function() {
        $modal.open({
            backdrop: 'static',
            keyboard : false,
            templateUrl: 'corporation/productionprocess/tmplOrganizationUnitChoose.tpl.html',
            size: 'lg',
            controller: 'ctrlOrganizationUnitChoose',
            windowClass: 'hmodal-info',
            resolve: {
				itemEdit: function() {
					if(angular.isDefined($scope.itemEdit.organizationUnit)){
						return $scope.itemEdit.organizationUnit;
					}
				}
			}
		}).result.then(function(result) {
			$scope.itemEdit.organizationUnit = angular.copy(result);
		});
    };


    $scope.consumableSuppliesEdit = null;

    // consumableSupplies table selection logic
    $scope.consumableSuppliesSelection = function(item, index) {
        if(item.isSelected) {
            if($scope.consumableSuppliesEdit !== null) {
                var index1 = $scope.itemEdit.consumableSupplies.map(function(it) { return it.id; }).indexOf($scope.consumableSuppliesEdit.id);
                $scope.itemEdit.consumableSupplies[index1].isSelected = false;
            }
            $scope.consumableSuppliesEdit = item;
        } else {
            $scope.consumableSuppliesEdit = null;
            item.isSelected = false;
        }
    };

    // New/Edit consumableSupplies dialog
    $scope.openConsumableSuppliesEditDialog = function(isNew) {
        $modal.open({
            backdrop: 'static',
            keyboard : false,
            templateUrl: 'productiondata/productionprocess/tmplConsumableSuppliesEdit.tpl.html',
            size: 'lg',
            controller: 'ctrlConsumableSuppliesEdit',
            windowClass: 'hmodal-info',
            resolve: {
                itemEdit: function() {
                    if(isNew) {
                        return new ServiceConsumableSupplies();
                    } else {
                        return $scope.consumableSuppliesEdit;
                    }
                }
            }
        }).result.then(function(result) {
            var i;
            if(isNew) {
                if(!angular.isDefined($scope.itemEdit.consumableSupplies)) {
                    $scope.itemEdit.consumableSupplies = [];
                }
                $scope.itemEdit.consumableSupplies.unshift(result);
                for(i in $scope.itemEdit.consumableSupplies) {
                    $scope.itemEdit.consumableSupplies[i].isSelected = false;
                }
                $scope.consumableSuppliesEdit = angular.extend(result);
                $scope.itemEdit.consumableSupplies[0].isSelected = true;
            }
            else {
                for(i in $scope.itemEdit.consumableSupplies) {
                    $scope.itemEdit.consumableSupplies[i].isSelected = false;
                }
                $scope.consumableSuppliesEdit = angular.extend(result);
                var index = $scope.itemEdit.consumableSupplies.map(function(it) { return it.id; }).indexOf(result.id);
                for(var key in result) {
                    $scope.itemEdit.consumableSupplies[index][key] = result[key];
                }
                $scope.itemEdit.consumableSupplies[index].isSelected = true;
            }
        });
    };

    $scope.removeConsumableSupplies = function(item) {
        var dialog = dialogs.confirm('Please confirm', 'Are you sure you want to delete item?');
        dialog.result.then(function(btn) {
            var removeIndex = $scope.itemEdit.consumableSupplies.map(function(it) { return it.id; }).indexOf(item.id);
            $scope.itemEdit.consumableSupplies[removeIndex].deleted = true;
        });
    };


    $scope.productionProcessStepsEdit = null;

    // productionProcessSteps table selection logic
    $scope.productionProcessStepsSelection = function(item, index) {
        if(item.isSelected) {
            if($scope.productionProcessStepsEdit !== null) {
                var index1 = $scope.itemEdit.productionProcessSteps.map(function(it) { return it.id; }).indexOf($scope.productionProcessStepsEdit.id);
                $scope.itemEdit.productionProcessSteps[index1].isSelected = false;
            }
            $scope.productionProcessStepsEdit = item;
        } else {
            $scope.productionProcessStepsEdit = null;
            item.isSelected = false;
        }
    };

    // New/Edit productionProcessSteps dialog
    $scope.openProductionProcessStepsEditDialog = function(isNew) {
        $modal.open({
            backdrop: 'static',
            keyboard : false,
            templateUrl: 'productiondata/productionprocess/tmplProductionProcessStepsEdit.tpl.html',
            size: 'lg',
            controller: 'ctrlProductionProcessStepsEdit',
            windowClass: 'hmodal-info',
            resolve: {
                itemEdit: function() {
                    if(isNew) {
                        return new ServiceProductionProcessSteps();
                    } else {
                        return $scope.productionProcessStepsEdit;
                    }
                }
            }
        }).result.then(function(result) {
            var i;
            if(isNew) {
                if(!angular.isDefined($scope.itemEdit.productionProcessSteps)) {
                    $scope.itemEdit.productionProcessSteps = [];
                }
                $scope.itemEdit.productionProcessSteps.unshift(result);
                for(i in $scope.itemEdit.productionProcessSteps) {
                    $scope.itemEdit.productionProcessSteps[i].isSelected = false;
                }
                $scope.productionProcessStepsEdit = angular.extend(result);
                $scope.itemEdit.productionProcessSteps[0].isSelected = true;
            }
            else {
                for(i in $scope.itemEdit.productionProcessSteps) {
                    $scope.itemEdit.productionProcessSteps[i].isSelected = false;
                }
                $scope.productionProcessStepsEdit = angular.extend(result);
                var index = $scope.itemEdit.productionProcessSteps.map(function(it) { return it.id; }).indexOf(result.id);
                for(var key in result) {
                    $scope.itemEdit.productionProcessSteps[index][key] = result[key];
                }
                $scope.itemEdit.productionProcessSteps[index].isSelected = true;
            }
        });
    };

    $scope.removeProductionProcessSteps = function(item) {
        var dialog = dialogs.confirm('Please confirm', 'Are you sure you want to delete item?');
        dialog.result.then(function(btn) {
            var removeIndex = $scope.itemEdit.productionProcessSteps.map(function(it) { return it.id; }).indexOf(item.id);
            $scope.itemEdit.productionProcessSteps[removeIndex].deleted = true;
        });
    };


	// Save Button
	$scope.save = function() {
		correctDateTime($scope.itemEdit.PPValidStartDate);
		correctDateTime($scope.itemEdit.PPValidEndDate);
		correctDateTime($scope.itemEdit.PPCreationDate);
		correctDateTime($scope.itemEdit.PPNormingDate);
		correctDateTime($scope.itemEdit.PPControlDate);
		correctDateTime($scope.itemEdit.PPApprovalDate);
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
		return                 item.PPVariant  &&                 item.PPName  &&                 item.PPStatus  &&                 item.PPValidStartDate  ;
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


.controller('ctrlProductionProcessChoose', ['$scope','ServiceProductionProcess', 'dialogs', '$modal', '$modalInstance', 'itemEdit',
function($scope, ServiceProductionProcess, dialogs, $modal,  $modalInstance, itemEdit) {

    // entity with properties
    $scope.itemDefinition = {
        label: 'productiondata.productionProcess',
        properties: [
            { label: 'pPVariant', name:'PPVariant', inTable:  true  },
            { label: 'pPName', name:'PPName', inTable:  true  },
            { label: 'pPStatus', name:'PPStatus', inTable:  true  },
            { label: 'pPValidStartDate', name:'PPValidStartDate', inTable:  true  },
            { label: 'pPValidEndDate', name:'PPValidEndDate', inTable:  false  },
            { label: 'pPOptimumBatchSize', name:'PPOptimumBatchSize', inTable:  false  },
            { label: 'pPProductionCycle', name:'PPProductionCycle', inTable:  false  },
            { label: 'pPTechnologist', name:'PPTechnologist', inTable:  false  },
            { label: 'pPCreationDate', name:'PPCreationDate', inTable:  false  },
            { label: 'pPNormedBy', name:'PPNormedBy', inTable:  false  },
            { label: 'pPNormingDate', name:'PPNormingDate', inTable:  false  },
            { label: 'pPControledBy', name:'PPControledBy', inTable:  false  },
            { label: 'pPControlDate', name:'PPControlDate', inTable:  false  },
            { label: 'pPApprovedBy', name:'PPApprovedBy', inTable:  false  },
            { label: 'pPApprovalDate', name:'PPApprovalDate', inTable:  false  },
        ]
    };

	$scope.items = [];
	$scope.itemEdit = {};

	// fill table with data
	$scope.loaded = false;
	var getProductionProcesss = function() {
		if(!$scope.loaded && $scope.items.length === 0) {
			$scope.isLoading = true;
			ServiceProductionProcess.query(function(data) {
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
	getProductionProcesss();

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