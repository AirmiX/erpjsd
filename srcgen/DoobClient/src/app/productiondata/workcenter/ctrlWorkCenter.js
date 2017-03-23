'use strict';

angular.module('Doob.productiondata')


.controller('ctrlWorkCenter',['$scope', '$rootScope', '$modal', 'dialogs', 'CheckSelected', 'ServiceWorkCenter',
    function($scope, $rootScope, $modal, dialogs, CheckSelected, ServiceWorkCenter) {

	// main entity (workCenter) properties names and labels
	$scope.itemDefinition = {
		label: 'productiondata.workCenter',
		properties: [
			{ label: 'wCIndentificationCode', name:'WCIndentificationCode', inTable:  true  },
			{ label: 'wCShortName', name:'WCShortName', inTable:  true  },
			{ label: 'wCName', name:'WCName', inTable:  true  },
			{ label: 'wCWorkingDayLenght', name:'WCWorkingDayLenght', inTable:  true  },
			{ label: 'wCWorkingWeekLenght', name:'WCWorkingWeekLenght', inTable:  true  },
			{ label: 'wCShiftsNumber', name:'WCShiftsNumber', inTable:  true  },
			{ label: 'wCWorkStationsNumber', name:'WCWorkStationsNumber', inTable:  true  },
			{ label: 'wCNumberOfEmployees', name:'WCNumberOfEmployees', inTable:  true  },
			{ label: 'wCNumberOfSteps', name:'WCNumberOfSteps', inTable:  true  },
			{ label: 'wCResourceConstraintIndicator', name:'WCResourceConstraintIndicator', inTable:  false  },
			{ label: 'wCAverageWaitingTimeInFrontOfWorkCenter', name:'WCAverageWaitingTimeInFrontOfWorkCenter', inTable:  true  },
			{ label: 'wCMaterialTransferAverageTime', name:'WCMaterialTransferAverageTime', inTable:  true  },
			{ label: 'wCTechnicalCapacity', name:'WCTechnicalCapacity', inTable:  true  },
			{ label: 'wCAvailableCapacity', name:'WCAvailableCapacity', inTable:  true  },
			{ label: 'wCLoadAnalysisIndicator', name:'WCLoadAnalysisIndicator', inTable:  true  },
			{ label: 'wCStandardHourPrice', name:'WCStandardHourPrice', inTable:  false  },
			{ label: 'wCMaterialsCostsPercentage', name:'WCMaterialsCostsPercentage', inTable:  false  },
			{ label: 'wCLaborCostsPercentage', name:'WCLaborCostsPercentage', inTable:  false  },
			{ label: 'wCDataCompletenessStatus', name:'WCDataCompletenessStatus', inTable:  true  },
			{ label: 'wCActitvityStatus', name:'WCActitvityStatus', inTable:  true  },
			{ label: 'wCEnteredBy', name:'WCEnteredBy', inTable:  false  },
			{ label: 'wCEntryDate', name:'WCEntryDate', inTable:  false  },
			{ label: 'wCModifiedBy', name:'WCModifiedBy', inTable:  false  },
			{ label: 'wCModificationDate', name:'WCModificationDate', inTable:  false  },
			{ label: 'wCApprovedBy', name:'WCApprovedBy', inTable:  false  },
			{ label: 'wCApprovalDate', name:'WCApprovalDate', inTable:  false  },
			{ label: 'wCAffiliationStatus', name:'WCAffiliationStatus', inTable:  false  },
		]
	};

	// currency with properties names and labels
	$scope.currencyDefinition = {
		label: 'capacitymanagement.currency',
		properties : [
			{ label: 'cCurrencyDesignation', name:'CCurrencyDesignation' },
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
	// location with properties names and labels
	$scope.locationDefinition = {
		label: 'corporation.location',
		properties : [
			{ label: 'lIdentificationCode', name:'LIdentificationCode' },
			{ label: 'lName', name:'LName' },
		]
	};
	// alternativeWorkCenters1 with properties names and labels
	$scope.alternativeWorkCenters1Definition = {
		label: 'capacitymanagement.alternativeWorkCenter',
		properties : [
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
	// workCenterSteps with properties names and labels
	$scope.workCenterStepsDefinition = {
		label: 'capacitymanagement.workCenterSteps',
		properties : [
		]
	};
	// balanceResources with properties names and labels
	$scope.balanceResourcesDefinition = {
		label: 'capacitymanagement.balanceResource',
		properties : [
			{ label: 'bRBalanceUnit', name:'BRBalanceUnit' },
			{ label: 'bRResourceType', name:'BRResourceType' },
			{ label: 'bRStartDate', name:'BRStartDate' },
		]
	};
	// technologicalUnits with properties names and labels
	$scope.technologicalUnitsDefinition = {
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
	// alternativeWorkCenters with properties names and labels
	$scope.alternativeWorkCentersDefinition = {
		label: 'capacitymanagement.alternativeWorkCenter',
		properties : [
		]
	};
	// availabilities with properties names and labels
	$scope.availabilitiesDefinition = {
		label: 'capacitymanagement.availabilityWorkCenter',
		properties : [
			{ label: 'aWCOrdinalNumber', name:'AWCOrdinalNumber' },
			{ label: 'aWCStartDate', name:'AWCStartDate' },
			{ label: 'aWCCapacityChange', name:'AWCCapacityChange' },
		]
	};

	// fill table with data
	$scope.items = [];
	$scope.loaded = false;
	var getWorkCenters = function() {
		if(!$scope.loaded && $scope.items.length === 0) {
			$scope.isLoading = true;
			ServiceWorkCenter.query(function(data) {
				$scope.items = data;
				$scope.isLoading = false;
				$scope.loaded = true;
			});
		}
	};
	getWorkCenters();

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

	$scope.$watch('WorkCenterCollection', function() {
		$scope.itemEdit = CheckSelected.checkSelectedInTable($scope.itemEdit, $scope.WorkCenterCollection, $scope.items);
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
			templateUrl: 'productiondata/workcenter/tmplWorkCenterEdit.tpl.html',
			size: 'lg',
			windowClass: 'hmodal-info',
			controller: 'ctrlWorkCenterEdit',
			resolve: {
				itemEdit: function() {
					if(isNew) {
						return new ServiceWorkCenter();
					} else {
						return $scope.itemEdit;
					}
				},
				currencyDefinition: function() {
					return $scope.currencyDefinition;
				},
				organizationUnitDefinition: function() {
					return $scope.organizationUnitDefinition;
				},
				locationDefinition: function() {
					return $scope.locationDefinition;
				},
				alternativeWorkCenters1Definition: function() {
					return $scope.alternativeWorkCenters1Definition;
				},
				productionProcessStepsDefinition: function() {
					return $scope.productionProcessStepsDefinition;
				},
				workCenterStepsDefinition: function() {
					return $scope.workCenterStepsDefinition;
				},
				balanceResourcesDefinition: function() {
					return $scope.balanceResourcesDefinition;
				},
				technologicalUnitsDefinition: function() {
					return $scope.technologicalUnitsDefinition;
				},
				alternativeWorkCentersDefinition: function() {
					return $scope.alternativeWorkCentersDefinition;
				},
				availabilitiesDefinition: function() {
					return $scope.availabilitiesDefinition;
				},
			}
		})
		.result.then(function(result) {
			if(!angular.isDefined(result.id)) {
				ServiceWorkCenter.saveCustom('stockmanagement/workcenters', result, function(savedObject) {
					$scope.items.unshift(savedObject);
					if($scope.itemEdit !== null) {
						var index = $scope.items.map(function(it) { return it.id; }).indexOf($scope.itemEdit.id);
						$scope.items[index].isSelected = false;
					}
					$scope.itemEdit = angular.extend(savedObject);
					$scope.items[0].isSelected = true;
				});
			 } else {
				 ServiceWorkCenter.updateCustom('stockmanagement/workcenters/'+result.id, result, function(savedObject) {
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


.controller('ctrlWorkCenterEdit',['$scope', 'Localization', '$modal', '$modalInstance', 'dialogs',
	'ServiceWorkCenter', 'ServiceCurrency', 'ServiceOrganizationUnit', 'ServiceLocation', 'ServiceAlternativeWorkCenter', 'ServiceProductionProcessSteps', 'ServiceWorkCenterSteps', 'ServiceBalanceResource', 'ServiceTechnologicalUnit', 'ServiceAvailabilityWorkCenter',   'currencyDefinition',  'organizationUnitDefinition',  'locationDefinition',  'alternativeWorkCenters1Definition',  'productionProcessStepsDefinition',  'workCenterStepsDefinition',  'balanceResourcesDefinition',  'technologicalUnitsDefinition',  'alternativeWorkCentersDefinition',  'availabilitiesDefinition',   'itemEdit',
function($scope, Localization, $modal, $modalInstance, dialogs,
	ServiceWorkCenter, ServiceCurrency, ServiceOrganizationUnit, ServiceLocation, ServiceAlternativeWorkCenter, ServiceProductionProcessSteps, ServiceWorkCenterSteps, ServiceBalanceResource, ServiceTechnologicalUnit, ServiceAvailabilityWorkCenter,  currencyDefinition,  organizationUnitDefinition,  locationDefinition,  alternativeWorkCenters1Definition,  productionProcessStepsDefinition,  workCenterStepsDefinition,  balanceResourcesDefinition,  technologicalUnitsDefinition,  alternativeWorkCentersDefinition,  availabilitiesDefinition,  itemEdit) {

	// dialog mode
	$scope.mode = 'edit';

	// original item state
	var original = angular.copy(itemEdit);
	// item state
	$scope.itemEdit = angular.copy(original);

	// currency with properties
	$scope.currencyDefinition = currencyDefinition;
	// organizationUnit with properties
	$scope.organizationUnitDefinition = organizationUnitDefinition;
	// location with properties
	$scope.locationDefinition = locationDefinition;
	// alternativeWorkCenters1 with properties
	$scope.alternativeWorkCenters1Definition = alternativeWorkCenters1Definition;
	// productionProcessSteps with properties
	$scope.productionProcessStepsDefinition = productionProcessStepsDefinition;
	// workCenterSteps with properties
	$scope.workCenterStepsDefinition = workCenterStepsDefinition;
	// balanceResources with properties
	$scope.balanceResourcesDefinition = balanceResourcesDefinition;
	// technologicalUnits with properties
	$scope.technologicalUnitsDefinition = technologicalUnitsDefinition;
	// alternativeWorkCenters with properties
	$scope.alternativeWorkCentersDefinition = alternativeWorkCentersDefinition;
	// availabilities with properties
	$scope.availabilitiesDefinition = availabilitiesDefinition;

	// datepicker logic

	// date properties
	$scope.openedWCEntryDate = false;
	$scope.openedWCModificationDate = false;
	$scope.openedWCApprovalDate = false;

	$scope.open = function($event, opened) {
		$event.preventDefault();
		$event.stopPropagation();
		$scope[opened] = true;
	};



	// Choose currency
	$scope.openChooseCurrencyDialog = function() {
        $modal.open({
            backdrop: 'static',
            keyboard : false,
            templateUrl: 'capacitymanagement/workcenter/tmplCurrencyChoose.tpl.html',
            size: 'lg',
            controller: 'ctrlCurrencyChoose',
            windowClass: 'hmodal-info',
            resolve: {
				itemEdit: function() {
					if(angular.isDefined($scope.itemEdit.currency)){
						return $scope.itemEdit.currency;
					}
				}
			}
		}).result.then(function(result) {
			$scope.itemEdit.currency = angular.copy(result);
		});
    };


	// Choose organizationUnit
	$scope.openChooseOrganizationUnitDialog = function() {
        $modal.open({
            backdrop: 'static',
            keyboard : false,
            templateUrl: 'corporation/workcenter/tmplOrganizationUnitChoose.tpl.html',
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


	// Choose location
	$scope.openChooseLocationDialog = function() {
        $modal.open({
            backdrop: 'static',
            keyboard : false,
            templateUrl: 'corporation/workcenter/tmplLocationChoose.tpl.html',
            size: 'lg',
            controller: 'ctrlLocationChoose',
            windowClass: 'hmodal-info',
            resolve: {
				itemEdit: function() {
					if(angular.isDefined($scope.itemEdit.location)){
						return $scope.itemEdit.location;
					}
				}
			}
		}).result.then(function(result) {
			$scope.itemEdit.location = angular.copy(result);
		});
    };


    $scope.alternativeWorkCenterEdit = null;

    // alternativeWorkCenters1 table selection logic
    $scope.alternativeWorkCenterSelection = function(item, index) {
        if(item.isSelected) {
            if($scope.alternativeWorkCenterEdit !== null) {
                var index1 = $scope.itemEdit.alternativeWorkCenters1.map(function(it) { return it.id; }).indexOf($scope.alternativeWorkCenterEdit.id);
                $scope.itemEdit.alternativeWorkCenters1[index1].isSelected = false;
            }
            $scope.alternativeWorkCenterEdit = item;
        } else {
            $scope.alternativeWorkCenterEdit = null;
            item.isSelected = false;
        }
    };

    // New/Edit alternativeWorkCenters1 dialog
    $scope.openAlternativeWorkCenterEditDialog = function(isNew) {
        $modal.open({
            backdrop: 'static',
            keyboard : false,
            templateUrl: 'capacitymanagement/workcenter/tmplAlternativeWorkCenterEdit.tpl.html',
            size: 'lg',
            controller: 'ctrlAlternativeWorkCenterEdit',
            windowClass: 'hmodal-info',
            resolve: {
                itemEdit: function() {
                    if(isNew) {
                        return new ServiceAlternativeWorkCenter();
                    } else {
                        return $scope.alternativeWorkCenterEdit;
                    }
                }
            }
        }).result.then(function(result) {
            var i;
            if(isNew) {
                if(!angular.isDefined($scope.itemEdit.alternativeWorkCenters1)) {
                    $scope.itemEdit.alternativeWorkCenters1 = [];
                }
                $scope.itemEdit.alternativeWorkCenters1.unshift(result);
                for(i in $scope.itemEdit.alternativeWorkCenters1) {
                    $scope.itemEdit.alternativeWorkCenters1[i].isSelected = false;
                }
                $scope.alternativeWorkCenterEdit = angular.extend(result);
                $scope.itemEdit.alternativeWorkCenters1[0].isSelected = true;
            }
            else {
                for(i in $scope.itemEdit.alternativeWorkCenters1) {
                    $scope.itemEdit.alternativeWorkCenters1[i].isSelected = false;
                }
                $scope.alternativeWorkCenterEdit = angular.extend(result);
                var index = $scope.itemEdit.alternativeWorkCenters1.map(function(it) { return it.id; }).indexOf(result.id);
                for(var key in result) {
                    $scope.itemEdit.alternativeWorkCenters1[index][key] = result[key];
                }
                $scope.itemEdit.alternativeWorkCenters1[index].isSelected = true;
            }
        });
    };

    $scope.removeAlternativeWorkCenter = function(item) {
        var dialog = dialogs.confirm('Please confirm', 'Are you sure you want to delete item?');
        dialog.result.then(function(btn) {
            var removeIndex = $scope.itemEdit.alternativeWorkCenters1.map(function(it) { return it.id; }).indexOf(item.id);
            $scope.itemEdit.alternativeWorkCenters1[removeIndex].deleted = true;
        });
    };


    $scope.workCenterStepsEdit = null;

    // workCenterSteps table selection logic
    $scope.workCenterStepsSelection = function(item, index) {
        if(item.isSelected) {
            if($scope.workCenterStepsEdit !== null) {
                var index1 = $scope.itemEdit.workCenterSteps.map(function(it) { return it.id; }).indexOf($scope.workCenterStepsEdit.id);
                $scope.itemEdit.workCenterSteps[index1].isSelected = false;
            }
            $scope.workCenterStepsEdit = item;
        } else {
            $scope.workCenterStepsEdit = null;
            item.isSelected = false;
        }
    };

    // New/Edit workCenterSteps dialog
    $scope.openWorkCenterStepsEditDialog = function(isNew) {
        $modal.open({
            backdrop: 'static',
            keyboard : false,
            templateUrl: 'capacitymanagement/workcenter/tmplWorkCenterStepsEdit.tpl.html',
            size: 'lg',
            controller: 'ctrlWorkCenterStepsEdit',
            windowClass: 'hmodal-info',
            resolve: {
                itemEdit: function() {
                    if(isNew) {
                        return new ServiceWorkCenterSteps();
                    } else {
                        return $scope.workCenterStepsEdit;
                    }
                }
            }
        }).result.then(function(result) {
            var i;
            if(isNew) {
                if(!angular.isDefined($scope.itemEdit.workCenterSteps)) {
                    $scope.itemEdit.workCenterSteps = [];
                }
                $scope.itemEdit.workCenterSteps.unshift(result);
                for(i in $scope.itemEdit.workCenterSteps) {
                    $scope.itemEdit.workCenterSteps[i].isSelected = false;
                }
                $scope.workCenterStepsEdit = angular.extend(result);
                $scope.itemEdit.workCenterSteps[0].isSelected = true;
            }
            else {
                for(i in $scope.itemEdit.workCenterSteps) {
                    $scope.itemEdit.workCenterSteps[i].isSelected = false;
                }
                $scope.workCenterStepsEdit = angular.extend(result);
                var index = $scope.itemEdit.workCenterSteps.map(function(it) { return it.id; }).indexOf(result.id);
                for(var key in result) {
                    $scope.itemEdit.workCenterSteps[index][key] = result[key];
                }
                $scope.itemEdit.workCenterSteps[index].isSelected = true;
            }
        });
    };

    $scope.removeWorkCenterSteps = function(item) {
        var dialog = dialogs.confirm('Please confirm', 'Are you sure you want to delete item?');
        dialog.result.then(function(btn) {
            var removeIndex = $scope.itemEdit.workCenterSteps.map(function(it) { return it.id; }).indexOf(item.id);
            $scope.itemEdit.workCenterSteps[removeIndex].deleted = true;
        });
    };


    $scope.balanceResourceEdit = null;

    // balanceResources table selection logic
    $scope.balanceResourceSelection = function(item, index) {
        if(item.isSelected) {
            if($scope.balanceResourceEdit !== null) {
                var index1 = $scope.itemEdit.balanceResources.map(function(it) { return it.id; }).indexOf($scope.balanceResourceEdit.id);
                $scope.itemEdit.balanceResources[index1].isSelected = false;
            }
            $scope.balanceResourceEdit = item;
        } else {
            $scope.balanceResourceEdit = null;
            item.isSelected = false;
        }
    };

    // New/Edit balanceResources dialog
    $scope.openBalanceResourceEditDialog = function(isNew) {
        $modal.open({
            backdrop: 'static',
            keyboard : false,
            templateUrl: 'capacitymanagement/workcenter/tmplBalanceResourceEdit.tpl.html',
            size: 'lg',
            controller: 'ctrlBalanceResourceEdit',
            windowClass: 'hmodal-info',
            resolve: {
                itemEdit: function() {
                    if(isNew) {
                        return new ServiceBalanceResource();
                    } else {
                        return $scope.balanceResourceEdit;
                    }
                }
            }
        }).result.then(function(result) {
            var i;
            if(isNew) {
                if(!angular.isDefined($scope.itemEdit.balanceResources)) {
                    $scope.itemEdit.balanceResources = [];
                }
                $scope.itemEdit.balanceResources.unshift(result);
                for(i in $scope.itemEdit.balanceResources) {
                    $scope.itemEdit.balanceResources[i].isSelected = false;
                }
                $scope.balanceResourceEdit = angular.extend(result);
                $scope.itemEdit.balanceResources[0].isSelected = true;
            }
            else {
                for(i in $scope.itemEdit.balanceResources) {
                    $scope.itemEdit.balanceResources[i].isSelected = false;
                }
                $scope.balanceResourceEdit = angular.extend(result);
                var index = $scope.itemEdit.balanceResources.map(function(it) { return it.id; }).indexOf(result.id);
                for(var key in result) {
                    $scope.itemEdit.balanceResources[index][key] = result[key];
                }
                $scope.itemEdit.balanceResources[index].isSelected = true;
            }
        });
    };

    $scope.removeBalanceResource = function(item) {
        var dialog = dialogs.confirm('Please confirm', 'Are you sure you want to delete item?');
        dialog.result.then(function(btn) {
            var removeIndex = $scope.itemEdit.balanceResources.map(function(it) { return it.id; }).indexOf(item.id);
            $scope.itemEdit.balanceResources[removeIndex].deleted = true;
        });
    };


    $scope.technologicalUnitEdit = null;

    // technologicalUnits table selection logic
    $scope.technologicalUnitSelection = function(item, index) {
        if(item.isSelected) {
            if($scope.technologicalUnitEdit !== null) {
                var index1 = $scope.itemEdit.technologicalUnits.map(function(it) { return it.id; }).indexOf($scope.technologicalUnitEdit.id);
                $scope.itemEdit.technologicalUnits[index1].isSelected = false;
            }
            $scope.technologicalUnitEdit = item;
        } else {
            $scope.technologicalUnitEdit = null;
            item.isSelected = false;
        }
    };

    // New/Edit technologicalUnits dialog
    $scope.openTechnologicalUnitEditDialog = function(isNew) {
        $modal.open({
            backdrop: 'static',
            keyboard : false,
            templateUrl: 'capacitymanagement/workcenter/tmplTechnologicalUnitEdit.tpl.html',
            size: 'lg',
            controller: 'ctrlTechnologicalUnitEdit',
            windowClass: 'hmodal-info',
            resolve: {
                itemEdit: function() {
                    if(isNew) {
                        return new ServiceTechnologicalUnit();
                    } else {
                        return $scope.technologicalUnitEdit;
                    }
                }
            }
        }).result.then(function(result) {
            var i;
            if(isNew) {
                if(!angular.isDefined($scope.itemEdit.technologicalUnits)) {
                    $scope.itemEdit.technologicalUnits = [];
                }
                $scope.itemEdit.technologicalUnits.unshift(result);
                for(i in $scope.itemEdit.technologicalUnits) {
                    $scope.itemEdit.technologicalUnits[i].isSelected = false;
                }
                $scope.technologicalUnitEdit = angular.extend(result);
                $scope.itemEdit.technologicalUnits[0].isSelected = true;
            }
            else {
                for(i in $scope.itemEdit.technologicalUnits) {
                    $scope.itemEdit.technologicalUnits[i].isSelected = false;
                }
                $scope.technologicalUnitEdit = angular.extend(result);
                var index = $scope.itemEdit.technologicalUnits.map(function(it) { return it.id; }).indexOf(result.id);
                for(var key in result) {
                    $scope.itemEdit.technologicalUnits[index][key] = result[key];
                }
                $scope.itemEdit.technologicalUnits[index].isSelected = true;
            }
        });
    };

    $scope.removeTechnologicalUnit = function(item) {
        var dialog = dialogs.confirm('Please confirm', 'Are you sure you want to delete item?');
        dialog.result.then(function(btn) {
            var removeIndex = $scope.itemEdit.technologicalUnits.map(function(it) { return it.id; }).indexOf(item.id);
            $scope.itemEdit.technologicalUnits[removeIndex].deleted = true;
        });
    };


    $scope.alternativeWorkCenterEdit = null;

    // alternativeWorkCenters table selection logic
    $scope.alternativeWorkCenterSelection = function(item, index) {
        if(item.isSelected) {
            if($scope.alternativeWorkCenterEdit !== null) {
                var index1 = $scope.itemEdit.alternativeWorkCenters.map(function(it) { return it.id; }).indexOf($scope.alternativeWorkCenterEdit.id);
                $scope.itemEdit.alternativeWorkCenters[index1].isSelected = false;
            }
            $scope.alternativeWorkCenterEdit = item;
        } else {
            $scope.alternativeWorkCenterEdit = null;
            item.isSelected = false;
        }
    };

    // New/Edit alternativeWorkCenters dialog
    $scope.openAlternativeWorkCenterEditDialog = function(isNew) {
        $modal.open({
            backdrop: 'static',
            keyboard : false,
            templateUrl: 'capacitymanagement/workcenter/tmplAlternativeWorkCenterEdit.tpl.html',
            size: 'lg',
            controller: 'ctrlAlternativeWorkCenterEdit',
            windowClass: 'hmodal-info',
            resolve: {
                itemEdit: function() {
                    if(isNew) {
                        return new ServiceAlternativeWorkCenter();
                    } else {
                        return $scope.alternativeWorkCenterEdit;
                    }
                }
            }
        }).result.then(function(result) {
            var i;
            if(isNew) {
                if(!angular.isDefined($scope.itemEdit.alternativeWorkCenters)) {
                    $scope.itemEdit.alternativeWorkCenters = [];
                }
                $scope.itemEdit.alternativeWorkCenters.unshift(result);
                for(i in $scope.itemEdit.alternativeWorkCenters) {
                    $scope.itemEdit.alternativeWorkCenters[i].isSelected = false;
                }
                $scope.alternativeWorkCenterEdit = angular.extend(result);
                $scope.itemEdit.alternativeWorkCenters[0].isSelected = true;
            }
            else {
                for(i in $scope.itemEdit.alternativeWorkCenters) {
                    $scope.itemEdit.alternativeWorkCenters[i].isSelected = false;
                }
                $scope.alternativeWorkCenterEdit = angular.extend(result);
                var index = $scope.itemEdit.alternativeWorkCenters.map(function(it) { return it.id; }).indexOf(result.id);
                for(var key in result) {
                    $scope.itemEdit.alternativeWorkCenters[index][key] = result[key];
                }
                $scope.itemEdit.alternativeWorkCenters[index].isSelected = true;
            }
        });
    };

    $scope.removeAlternativeWorkCenter = function(item) {
        var dialog = dialogs.confirm('Please confirm', 'Are you sure you want to delete item?');
        dialog.result.then(function(btn) {
            var removeIndex = $scope.itemEdit.alternativeWorkCenters.map(function(it) { return it.id; }).indexOf(item.id);
            $scope.itemEdit.alternativeWorkCenters[removeIndex].deleted = true;
        });
    };


    $scope.availabilityWorkCenterEdit = null;

    // availabilities table selection logic
    $scope.availabilityWorkCenterSelection = function(item, index) {
        if(item.isSelected) {
            if($scope.availabilityWorkCenterEdit !== null) {
                var index1 = $scope.itemEdit.availabilities.map(function(it) { return it.id; }).indexOf($scope.availabilityWorkCenterEdit.id);
                $scope.itemEdit.availabilities[index1].isSelected = false;
            }
            $scope.availabilityWorkCenterEdit = item;
        } else {
            $scope.availabilityWorkCenterEdit = null;
            item.isSelected = false;
        }
    };

    // New/Edit availabilities dialog
    $scope.openAvailabilityWorkCenterEditDialog = function(isNew) {
        $modal.open({
            backdrop: 'static',
            keyboard : false,
            templateUrl: 'capacitymanagement/workcenter/tmplAvailabilityWorkCenterEdit.tpl.html',
            size: 'lg',
            controller: 'ctrlAvailabilityWorkCenterEdit',
            windowClass: 'hmodal-info',
            resolve: {
                itemEdit: function() {
                    if(isNew) {
                        return new ServiceAvailabilityWorkCenter();
                    } else {
                        return $scope.availabilityWorkCenterEdit;
                    }
                }
            }
        }).result.then(function(result) {
            var i;
            if(isNew) {
                if(!angular.isDefined($scope.itemEdit.availabilities)) {
                    $scope.itemEdit.availabilities = [];
                }
                $scope.itemEdit.availabilities.unshift(result);
                for(i in $scope.itemEdit.availabilities) {
                    $scope.itemEdit.availabilities[i].isSelected = false;
                }
                $scope.availabilityWorkCenterEdit = angular.extend(result);
                $scope.itemEdit.availabilities[0].isSelected = true;
            }
            else {
                for(i in $scope.itemEdit.availabilities) {
                    $scope.itemEdit.availabilities[i].isSelected = false;
                }
                $scope.availabilityWorkCenterEdit = angular.extend(result);
                var index = $scope.itemEdit.availabilities.map(function(it) { return it.id; }).indexOf(result.id);
                for(var key in result) {
                    $scope.itemEdit.availabilities[index][key] = result[key];
                }
                $scope.itemEdit.availabilities[index].isSelected = true;
            }
        });
    };

    $scope.removeAvailabilityWorkCenter = function(item) {
        var dialog = dialogs.confirm('Please confirm', 'Are you sure you want to delete item?');
        dialog.result.then(function(btn) {
            var removeIndex = $scope.itemEdit.availabilities.map(function(it) { return it.id; }).indexOf(item.id);
            $scope.itemEdit.availabilities[removeIndex].deleted = true;
        });
    };


	// Save Button
	$scope.save = function() {
		correctDateTime($scope.itemEdit.WCEntryDate);
		correctDateTime($scope.itemEdit.WCModificationDate);
		correctDateTime($scope.itemEdit.WCApprovalDate);
	   //	delete $scope.itemEdit.isSelected;
        var item;
        var i;
        for(i in $scope.itemEdit.productionProcessSteps) {
    		item = $scope.itemEdit.productionProcessSteps[i];
    		delete item.isSelected;
    	}
		$modalInstance.close($scope.itemEdit);
	};

    var correctDateTime = function(date) {
        if(date instanceof Date && date !== '') {
            date.setMinutes(date.getMinutes() - date.getTimezoneOffset());
        }
    };

	$scope.canSave = function() {
		var item = $scope.itemEdit;
		return                 item.WCIndentificationCode  &&                 item.WCShortName  &&                 item.WCName  &&                 item.WCWorkingDayLenght  &&                 item.WCWorkingWeekLenght  &&                 item.WCShiftsNumber  &&                 item.WCWorkStationsNumber  &&                 item.WCNumberOfEmployees  &&                 item.WCNumberOfSteps  &&                 item.WCAverageWaitingTimeInFrontOfWorkCenter  &&                 item.WCMaterialTransferAverageTime  &&                 item.WCTechnicalCapacity  &&                 item.WCAvailableCapacity  &&                 item.WCLoadAnalysisIndicator  &&                 item.WCDataCompletenessStatus  &&                 item.WCActitvityStatus  ;
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


.controller('ctrlWorkCenterChoose', ['$scope','ServiceWorkCenter', 'dialogs', '$modal', '$modalInstance', 'itemEdit',
function($scope, ServiceWorkCenter, dialogs, $modal,  $modalInstance, itemEdit) {

    // entity with properties
    $scope.itemDefinition = {
        label: 'productiondata.workCenter',
        properties: [
            { label: 'wCIndentificationCode', name:'WCIndentificationCode', inTable:  true  },
            { label: 'wCShortName', name:'WCShortName', inTable:  true  },
            { label: 'wCName', name:'WCName', inTable:  true  },
            { label: 'wCWorkingDayLenght', name:'WCWorkingDayLenght', inTable:  true  },
            { label: 'wCWorkingWeekLenght', name:'WCWorkingWeekLenght', inTable:  true  },
            { label: 'wCShiftsNumber', name:'WCShiftsNumber', inTable:  true  },
            { label: 'wCWorkStationsNumber', name:'WCWorkStationsNumber', inTable:  true  },
            { label: 'wCNumberOfEmployees', name:'WCNumberOfEmployees', inTable:  true  },
            { label: 'wCNumberOfSteps', name:'WCNumberOfSteps', inTable:  true  },
            { label: 'wCResourceConstraintIndicator', name:'WCResourceConstraintIndicator', inTable:  false  },
            { label: 'wCAverageWaitingTimeInFrontOfWorkCenter', name:'WCAverageWaitingTimeInFrontOfWorkCenter', inTable:  true  },
            { label: 'wCMaterialTransferAverageTime', name:'WCMaterialTransferAverageTime', inTable:  true  },
            { label: 'wCTechnicalCapacity', name:'WCTechnicalCapacity', inTable:  true  },
            { label: 'wCAvailableCapacity', name:'WCAvailableCapacity', inTable:  true  },
            { label: 'wCLoadAnalysisIndicator', name:'WCLoadAnalysisIndicator', inTable:  true  },
            { label: 'wCStandardHourPrice', name:'WCStandardHourPrice', inTable:  false  },
            { label: 'wCMaterialsCostsPercentage', name:'WCMaterialsCostsPercentage', inTable:  false  },
            { label: 'wCLaborCostsPercentage', name:'WCLaborCostsPercentage', inTable:  false  },
            { label: 'wCDataCompletenessStatus', name:'WCDataCompletenessStatus', inTable:  true  },
            { label: 'wCActitvityStatus', name:'WCActitvityStatus', inTable:  true  },
            { label: 'wCEnteredBy', name:'WCEnteredBy', inTable:  false  },
            { label: 'wCEntryDate', name:'WCEntryDate', inTable:  false  },
            { label: 'wCModifiedBy', name:'WCModifiedBy', inTable:  false  },
            { label: 'wCModificationDate', name:'WCModificationDate', inTable:  false  },
            { label: 'wCApprovedBy', name:'WCApprovedBy', inTable:  false  },
            { label: 'wCApprovalDate', name:'WCApprovalDate', inTable:  false  },
            { label: 'wCAffiliationStatus', name:'WCAffiliationStatus', inTable:  false  },
        ]
    };

	$scope.items = [];
	$scope.itemEdit = {};

	// fill table with data
	$scope.loaded = false;
	var getWorkCenters = function() {
		if(!$scope.loaded && $scope.items.length === 0) {
			$scope.isLoading = true;
			ServiceWorkCenter.query(function(data) {
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
	getWorkCenters();

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