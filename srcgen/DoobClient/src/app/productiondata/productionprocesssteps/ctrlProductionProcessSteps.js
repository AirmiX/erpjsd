'use strict';

angular.module('Doob.productiondata')


.controller('ctrlProductionProcessSteps',['$scope', '$rootScope', '$modal', 'dialogs', 'CheckSelected', 'ServiceProductionProcessSteps',
    function($scope, $rootScope, $modal, dialogs, CheckSelected, ServiceProductionProcessSteps) {

	// main entity (productionProcessSteps) properties names and labels
	$scope.itemDefinition = {
		label: 'productiondata.productionProcessSteps',
		properties: [
			{ label: 'pPSOrdinalNumber', name:'PPSOrdinalNumber', inTable:  true  },
			{ label: 'pPSSuffix', name:'PPSSuffix', inTable:  false  },
			{ label: 'pPSDescription', name:'PPSDescription', inTable:  false  },
			{ label: 'pPSPreparatoryFinishTime', name:'PPSPreparatoryFinishTime', inTable:  false  },
			{ label: 'pPSStepDuration', name:'PPSStepDuration', inTable:  true  },
			{ label: 'pPSPaymentTime', name:'PPSPaymentTime', inTable:  false  },
			{ label: 'pPSAllowedWaste', name:'PPSAllowedWaste', inTable:  false  },
			{ label: 'pPSNormOverthrowAllowed', name:'PPSNormOverthrowAllowed', inTable:  false  },
			{ label: 'pPSControlIndicator', name:'PPSControlIndicator', inTable:  true  },
			{ label: 'pPSValidStartDate', name:'PPSValidStartDate', inTable:  true  },
			{ label: 'pPSValidEndDate', name:'PPSValidEndDate', inTable:  false  },
			{ label: 'pPSPiecesInStep', name:'PPSPiecesInStep', inTable:  false  },
			{ label: 'pPSEnteredBy', name:'PPSEnteredBy', inTable:  false  },
			{ label: 'pPSEntryDate', name:'PPSEntryDate', inTable:  false  },
			{ label: 'pPSModifiedBy', name:'PPSModifiedBy', inTable:  false  },
			{ label: 'pPSModificationDate', name:'PPSModificationDate', inTable:  false  },
		]
	};

	// stepClassification with properties names and labels
	$scope.stepClassificationDefinition = {
		label: 'productiondata.stepsClassification',
		properties : [
			{ label: 'sCClassificationNumber', name:'SCClassificationNumber' },
			{ label: 'sCName', name:'SCName' },
		]
	};
	// workCenter with properties names and labels
	$scope.workCenterDefinition = {
		label: 'productiondata.workCenter',
		properties : [
			{ label: 'wCIndentificationCode', name:'WCIndentificationCode' },
			{ label: 'wCShortName', name:'WCShortName' },
			{ label: 'wCName', name:'WCName' },
			{ label: 'wCWorkingDayLenght', name:'WCWorkingDayLenght' },
			{ label: 'wCWorkingWeekLenght', name:'WCWorkingWeekLenght' },
			{ label: 'wCShiftsNumber', name:'WCShiftsNumber' },
			{ label: 'wCWorkStationsNumber', name:'WCWorkStationsNumber' },
			{ label: 'wCNumberOfEmployees', name:'WCNumberOfEmployees' },
			{ label: 'wCNumberOfSteps', name:'WCNumberOfSteps' },
			{ label: 'wCAverageWaitingTimeInFrontOfWorkCenter', name:'WCAverageWaitingTimeInFrontOfWorkCenter' },
			{ label: 'wCMaterialTransferAverageTime', name:'WCMaterialTransferAverageTime' },
			{ label: 'wCTechnicalCapacity', name:'WCTechnicalCapacity' },
			{ label: 'wCAvailableCapacity', name:'WCAvailableCapacity' },
			{ label: 'wCLoadAnalysisIndicator', name:'WCLoadAnalysisIndicator' },
			{ label: 'wCDataCompletenessStatus', name:'WCDataCompletenessStatus' },
			{ label: 'wCActitvityStatus', name:'WCActitvityStatus' },
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
	// occupation with properties names and labels
	$scope.occupationDefinition = {
		label: 'humanresources.occupation',
		properties : [
			{ label: 'oCode', name:'OCode' },
			{ label: 'oName', name:'OName' },
		]
	};
	// stepTools with properties names and labels
	$scope.stepToolsDefinition = {
		label: 'productiondata.stepTool',
		properties : [
			{ label: 'sTNormativ', name:'STNormativ' },
			{ label: 'sTTypeStatus', name:'STTypeStatus' },
			{ label: 'sTSupplySource', name:'STSupplySource' },
		]
	};
	// stepUserManuals with properties names and labels
	$scope.stepUserManualsDefinition = {
		label: 'productiondata.stepUserManual',
		properties : [
			{ label: 'sUMOrdinalNumber', name:'SUMOrdinalNumber' },
			{ label: 'sUMText', name:'SUMText' },
			{ label: 'sUMValidStartDate', name:'SUMValidStartDate' },
		]
	};
	// controlDemands with properties names and labels
	$scope.controlDemandsDefinition = {
		label: 'productiondata.controlDemands',
		properties : [
			{ label: 'cDOrdinalNumber', name:'CDOrdinalNumber' },
			{ label: 'cDMeasureType', name:'CDMeasureType' },
		]
	};

	// fill table with data
	$scope.items = [];
	$scope.loaded = false;
	var getProductionProcessStepss = function() {
		if(!$scope.loaded && $scope.items.length === 0) {
			$scope.isLoading = true;
			ServiceProductionProcessSteps.query(function(data) {
				$scope.items = data;
				$scope.isLoading = false;
				$scope.loaded = true;
			});
		}
	};
	getProductionProcessStepss();

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

	$scope.$watch('ProductionProcessStepsCollection', function() {
		$scope.itemEdit = CheckSelected.checkSelectedInTable($scope.itemEdit, $scope.ProductionProcessStepsCollection, $scope.items);
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
			templateUrl: 'productiondata/productionprocesssteps/tmplProductionProcessStepsEdit.tpl.html',
			size: 'lg',
			windowClass: 'hmodal-info',
			controller: 'ctrlProductionProcessStepsEdit',
			resolve: {
				itemEdit: function() {
					if(isNew) {
						return new ServiceProductionProcessSteps();
					} else {
						return $scope.itemEdit;
					}
				},
				stepClassificationDefinition: function() {
					return $scope.stepClassificationDefinition;
				},
				workCenterDefinition: function() {
					return $scope.workCenterDefinition;
				},
				productionProcessDefinition: function() {
					return $scope.productionProcessDefinition;
				},
				occupationDefinition: function() {
					return $scope.occupationDefinition;
				},
				stepToolsDefinition: function() {
					return $scope.stepToolsDefinition;
				},
				stepUserManualsDefinition: function() {
					return $scope.stepUserManualsDefinition;
				},
				controlDemandsDefinition: function() {
					return $scope.controlDemandsDefinition;
				},
			}
		})
		.result.then(function(result) {
			if(!angular.isDefined(result.id)) {
				ServiceProductionProcessSteps.saveCustom('stockmanagement/productionprocessstepss', result, function(savedObject) {
					$scope.items.unshift(savedObject);
					if($scope.itemEdit !== null) {
						var index = $scope.items.map(function(it) { return it.id; }).indexOf($scope.itemEdit.id);
						$scope.items[index].isSelected = false;
					}
					$scope.itemEdit = angular.extend(savedObject);
					$scope.items[0].isSelected = true;
				});
			 } else {
				 ServiceProductionProcessSteps.updateCustom('stockmanagement/productionprocessstepss/'+result.id, result, function(savedObject) {
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


.controller('ctrlProductionProcessStepsEdit',['$scope', 'Localization', '$modal', '$modalInstance', 'dialogs',
	'ServiceProductionProcessSteps', 'ServiceStepsClassification', 'ServiceWorkCenter', 'ServiceProductionProcess', 'ServiceOccupation', 'ServiceStepTool', 'ServiceStepUserManual', 'ServiceControlDemands',   'stepClassificationDefinition',  'workCenterDefinition',  'productionProcessDefinition',  'occupationDefinition',  'stepToolsDefinition',  'stepUserManualsDefinition',  'controlDemandsDefinition',   'itemEdit',
function($scope, Localization, $modal, $modalInstance, dialogs,
	ServiceProductionProcessSteps, ServiceStepsClassification, ServiceWorkCenter, ServiceProductionProcess, ServiceOccupation, ServiceStepTool, ServiceStepUserManual, ServiceControlDemands,  stepClassificationDefinition,  workCenterDefinition,  productionProcessDefinition,  occupationDefinition,  stepToolsDefinition,  stepUserManualsDefinition,  controlDemandsDefinition,  itemEdit) {

	// dialog mode
	$scope.mode = 'edit';

	// original item state
	var original = angular.copy(itemEdit);
	// item state
	$scope.itemEdit = angular.copy(original);

	// stepClassification with properties
	$scope.stepClassificationDefinition = stepClassificationDefinition;
	// workCenter with properties
	$scope.workCenterDefinition = workCenterDefinition;
	// productionProcess with properties
	$scope.productionProcessDefinition = productionProcessDefinition;
	// occupation with properties
	$scope.occupationDefinition = occupationDefinition;
	// stepTools with properties
	$scope.stepToolsDefinition = stepToolsDefinition;
	// stepUserManuals with properties
	$scope.stepUserManualsDefinition = stepUserManualsDefinition;
	// controlDemands with properties
	$scope.controlDemandsDefinition = controlDemandsDefinition;

	// datepicker logic

	// date properties
	$scope.openedPPSValidStartDate = false;
	$scope.openedPPSValidEndDate = false;
	$scope.openedPPSEntryDate = false;
	$scope.openedPPSModificationDate = false;

	$scope.open = function($event, opened) {
		$event.preventDefault();
		$event.stopPropagation();
		$scope[opened] = true;
	};



	// Choose stepClassification
	$scope.openChooseStepClassificationDialog = function() {
        $modal.open({
            backdrop: 'static',
            keyboard : false,
            templateUrl: 'productiondata/productionprocesssteps/tmplStepsClassificationChoose.tpl.html',
            size: 'lg',
            controller: 'ctrlStepsClassificationChoose',
            windowClass: 'hmodal-info',
            resolve: {
				itemEdit: function() {
					if(angular.isDefined($scope.itemEdit.stepClassification)){
						return $scope.itemEdit.stepClassification;
					}
				}
			}
		}).result.then(function(result) {
			$scope.itemEdit.stepClassification = angular.copy(result);
		});
    };


	// Choose workCenter
	$scope.openChooseWorkCenterDialog = function() {
        $modal.open({
            backdrop: 'static',
            keyboard : false,
            templateUrl: 'productiondata/productionprocesssteps/tmplWorkCenterChoose.tpl.html',
            size: 'lg',
            controller: 'ctrlWorkCenterChoose',
            windowClass: 'hmodal-info',
            resolve: {
				itemEdit: function() {
					if(angular.isDefined($scope.itemEdit.workCenter)){
						return $scope.itemEdit.workCenter;
					}
				}
			}
		}).result.then(function(result) {
			$scope.itemEdit.workCenter = angular.copy(result);
		});
    };


	// Choose productionProcess
	$scope.openChooseProductionProcessDialog = function() {
        $modal.open({
            backdrop: 'static',
            keyboard : false,
            templateUrl: 'productiondata/productionprocesssteps/tmplProductionProcessChoose.tpl.html',
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


	// Choose occupation
	$scope.openChooseOccupationDialog = function() {
        $modal.open({
            backdrop: 'static',
            keyboard : false,
            templateUrl: 'humanresources/productionprocesssteps/tmplOccupationChoose.tpl.html',
            size: 'lg',
            controller: 'ctrlOccupationChoose',
            windowClass: 'hmodal-info',
            resolve: {
				itemEdit: function() {
					if(angular.isDefined($scope.itemEdit.occupation)){
						return $scope.itemEdit.occupation;
					}
				}
			}
		}).result.then(function(result) {
			$scope.itemEdit.occupation = angular.copy(result);
		});
    };


    $scope.stepToolEdit = null;

    // stepTools table selection logic
    $scope.stepToolSelection = function(item, index) {
        if(item.isSelected) {
            if($scope.stepToolEdit !== null) {
                var index1 = $scope.itemEdit.stepTools.map(function(it) { return it.id; }).indexOf($scope.stepToolEdit.id);
                $scope.itemEdit.stepTools[index1].isSelected = false;
            }
            $scope.stepToolEdit = item;
        } else {
            $scope.stepToolEdit = null;
            item.isSelected = false;
        }
    };

    // New/Edit stepTools dialog
    $scope.openStepToolEditDialog = function(isNew) {
        $modal.open({
            backdrop: 'static',
            keyboard : false,
            templateUrl: 'productiondata/productionprocesssteps/tmplStepToolEdit.tpl.html',
            size: 'lg',
            controller: 'ctrlStepToolEdit',
            windowClass: 'hmodal-info',
            resolve: {
                itemEdit: function() {
                    if(isNew) {
                        return new ServiceStepTool();
                    } else {
                        return $scope.stepToolEdit;
                    }
                }
            }
        }).result.then(function(result) {
            var i;
            if(isNew) {
                if(!angular.isDefined($scope.itemEdit.stepTools)) {
                    $scope.itemEdit.stepTools = [];
                }
                $scope.itemEdit.stepTools.unshift(result);
                for(i in $scope.itemEdit.stepTools) {
                    $scope.itemEdit.stepTools[i].isSelected = false;
                }
                $scope.stepToolEdit = angular.extend(result);
                $scope.itemEdit.stepTools[0].isSelected = true;
            }
            else {
                for(i in $scope.itemEdit.stepTools) {
                    $scope.itemEdit.stepTools[i].isSelected = false;
                }
                $scope.stepToolEdit = angular.extend(result);
                var index = $scope.itemEdit.stepTools.map(function(it) { return it.id; }).indexOf(result.id);
                for(var key in result) {
                    $scope.itemEdit.stepTools[index][key] = result[key];
                }
                $scope.itemEdit.stepTools[index].isSelected = true;
            }
        });
    };

    $scope.removeStepTool = function(item) {
        var dialog = dialogs.confirm('Please confirm', 'Are you sure you want to delete item?');
        dialog.result.then(function(btn) {
            var removeIndex = $scope.itemEdit.stepTools.map(function(it) { return it.id; }).indexOf(item.id);
            $scope.itemEdit.stepTools[removeIndex].deleted = true;
        });
    };


    $scope.stepUserManualEdit = null;

    // stepUserManuals table selection logic
    $scope.stepUserManualSelection = function(item, index) {
        if(item.isSelected) {
            if($scope.stepUserManualEdit !== null) {
                var index1 = $scope.itemEdit.stepUserManuals.map(function(it) { return it.id; }).indexOf($scope.stepUserManualEdit.id);
                $scope.itemEdit.stepUserManuals[index1].isSelected = false;
            }
            $scope.stepUserManualEdit = item;
        } else {
            $scope.stepUserManualEdit = null;
            item.isSelected = false;
        }
    };

    // New/Edit stepUserManuals dialog
    $scope.openStepUserManualEditDialog = function(isNew) {
        $modal.open({
            backdrop: 'static',
            keyboard : false,
            templateUrl: 'productiondata/productionprocesssteps/tmplStepUserManualEdit.tpl.html',
            size: 'lg',
            controller: 'ctrlStepUserManualEdit',
            windowClass: 'hmodal-info',
            resolve: {
                itemEdit: function() {
                    if(isNew) {
                        return new ServiceStepUserManual();
                    } else {
                        return $scope.stepUserManualEdit;
                    }
                }
            }
        }).result.then(function(result) {
            var i;
            if(isNew) {
                if(!angular.isDefined($scope.itemEdit.stepUserManuals)) {
                    $scope.itemEdit.stepUserManuals = [];
                }
                $scope.itemEdit.stepUserManuals.unshift(result);
                for(i in $scope.itemEdit.stepUserManuals) {
                    $scope.itemEdit.stepUserManuals[i].isSelected = false;
                }
                $scope.stepUserManualEdit = angular.extend(result);
                $scope.itemEdit.stepUserManuals[0].isSelected = true;
            }
            else {
                for(i in $scope.itemEdit.stepUserManuals) {
                    $scope.itemEdit.stepUserManuals[i].isSelected = false;
                }
                $scope.stepUserManualEdit = angular.extend(result);
                var index = $scope.itemEdit.stepUserManuals.map(function(it) { return it.id; }).indexOf(result.id);
                for(var key in result) {
                    $scope.itemEdit.stepUserManuals[index][key] = result[key];
                }
                $scope.itemEdit.stepUserManuals[index].isSelected = true;
            }
        });
    };

    $scope.removeStepUserManual = function(item) {
        var dialog = dialogs.confirm('Please confirm', 'Are you sure you want to delete item?');
        dialog.result.then(function(btn) {
            var removeIndex = $scope.itemEdit.stepUserManuals.map(function(it) { return it.id; }).indexOf(item.id);
            $scope.itemEdit.stepUserManuals[removeIndex].deleted = true;
        });
    };


    $scope.controlDemandsEdit = null;

    // controlDemands table selection logic
    $scope.controlDemandsSelection = function(item, index) {
        if(item.isSelected) {
            if($scope.controlDemandsEdit !== null) {
                var index1 = $scope.itemEdit.controlDemands.map(function(it) { return it.id; }).indexOf($scope.controlDemandsEdit.id);
                $scope.itemEdit.controlDemands[index1].isSelected = false;
            }
            $scope.controlDemandsEdit = item;
        } else {
            $scope.controlDemandsEdit = null;
            item.isSelected = false;
        }
    };

    // New/Edit controlDemands dialog
    $scope.openControlDemandsEditDialog = function(isNew) {
        $modal.open({
            backdrop: 'static',
            keyboard : false,
            templateUrl: 'productiondata/productionprocesssteps/tmplControlDemandsEdit.tpl.html',
            size: 'lg',
            controller: 'ctrlControlDemandsEdit',
            windowClass: 'hmodal-info',
            resolve: {
                itemEdit: function() {
                    if(isNew) {
                        return new ServiceControlDemands();
                    } else {
                        return $scope.controlDemandsEdit;
                    }
                }
            }
        }).result.then(function(result) {
            var i;
            if(isNew) {
                if(!angular.isDefined($scope.itemEdit.controlDemands)) {
                    $scope.itemEdit.controlDemands = [];
                }
                $scope.itemEdit.controlDemands.unshift(result);
                for(i in $scope.itemEdit.controlDemands) {
                    $scope.itemEdit.controlDemands[i].isSelected = false;
                }
                $scope.controlDemandsEdit = angular.extend(result);
                $scope.itemEdit.controlDemands[0].isSelected = true;
            }
            else {
                for(i in $scope.itemEdit.controlDemands) {
                    $scope.itemEdit.controlDemands[i].isSelected = false;
                }
                $scope.controlDemandsEdit = angular.extend(result);
                var index = $scope.itemEdit.controlDemands.map(function(it) { return it.id; }).indexOf(result.id);
                for(var key in result) {
                    $scope.itemEdit.controlDemands[index][key] = result[key];
                }
                $scope.itemEdit.controlDemands[index].isSelected = true;
            }
        });
    };

    $scope.removeControlDemands = function(item) {
        var dialog = dialogs.confirm('Please confirm', 'Are you sure you want to delete item?');
        dialog.result.then(function(btn) {
            var removeIndex = $scope.itemEdit.controlDemands.map(function(it) { return it.id; }).indexOf(item.id);
            $scope.itemEdit.controlDemands[removeIndex].deleted = true;
        });
    };


	// Save Button
	$scope.save = function() {
		correctDateTime($scope.itemEdit.PPSValidStartDate);
		correctDateTime($scope.itemEdit.PPSValidEndDate);
		correctDateTime($scope.itemEdit.PPSEntryDate);
		correctDateTime($scope.itemEdit.PPSModificationDate);
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
		return                 item.PPSOrdinalNumber  &&                 item.PPSStepDuration  &&                 item.PPSControlIndicator  &&                 item.PPSValidStartDate  ;
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


.controller('ctrlProductionProcessStepsChoose', ['$scope','ServiceProductionProcessSteps', 'dialogs', '$modal', '$modalInstance', 'itemEdit',
function($scope, ServiceProductionProcessSteps, dialogs, $modal,  $modalInstance, itemEdit) {

    // entity with properties
    $scope.itemDefinition = {
        label: 'productiondata.productionProcessSteps',
        properties: [
            { label: 'pPSOrdinalNumber', name:'PPSOrdinalNumber', inTable:  true  },
            { label: 'pPSSuffix', name:'PPSSuffix', inTable:  false  },
            { label: 'pPSDescription', name:'PPSDescription', inTable:  false  },
            { label: 'pPSPreparatoryFinishTime', name:'PPSPreparatoryFinishTime', inTable:  false  },
            { label: 'pPSStepDuration', name:'PPSStepDuration', inTable:  true  },
            { label: 'pPSPaymentTime', name:'PPSPaymentTime', inTable:  false  },
            { label: 'pPSAllowedWaste', name:'PPSAllowedWaste', inTable:  false  },
            { label: 'pPSNormOverthrowAllowed', name:'PPSNormOverthrowAllowed', inTable:  false  },
            { label: 'pPSControlIndicator', name:'PPSControlIndicator', inTable:  true  },
            { label: 'pPSValidStartDate', name:'PPSValidStartDate', inTable:  true  },
            { label: 'pPSValidEndDate', name:'PPSValidEndDate', inTable:  false  },
            { label: 'pPSPiecesInStep', name:'PPSPiecesInStep', inTable:  false  },
            { label: 'pPSEnteredBy', name:'PPSEnteredBy', inTable:  false  },
            { label: 'pPSEntryDate', name:'PPSEntryDate', inTable:  false  },
            { label: 'pPSModifiedBy', name:'PPSModifiedBy', inTable:  false  },
            { label: 'pPSModificationDate', name:'PPSModificationDate', inTable:  false  },
        ]
    };

	$scope.items = [];
	$scope.itemEdit = {};

	// fill table with data
	$scope.loaded = false;
	var getProductionProcessStepss = function() {
		if(!$scope.loaded && $scope.items.length === 0) {
			$scope.isLoading = true;
			ServiceProductionProcessSteps.query(function(data) {
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
	getProductionProcessStepss();

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