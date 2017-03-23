'use strict';

angular.module('Doob.capacitymanagement')


.controller('ctrlTechnologicalUnit',['$scope', '$rootScope', '$modal', 'dialogs', 'CheckSelected', 'ServiceTechnologicalUnit',
    function($scope, $rootScope, $modal, dialogs, CheckSelected, ServiceTechnologicalUnit) {

	// main entity (technologicalUnit) properties names and labels
	$scope.itemDefinition = {
		label: 'capacitymanagement.technologicalUnit',
		properties: [
			{ label: 'tUNumber', name:'TUNumber', inTable:  true  },
			{ label: 'tUShortName', name:'TUShortName', inTable:  true  },
			{ label: 'tUName', name:'TUName', inTable:  true  },
			{ label: 'tUType', name:'TUType', inTable:  true  },
			{ label: 'tUTechnicalCapacity', name:'TUTechnicalCapacity', inTable:  true  },
			{ label: 'tUAvailableCapacity', name:'TUAvailableCapacity', inTable:  true  },
			{ label: 'tUWorkingDayLength', name:'TUWorkingDayLength', inTable:  true  },
			{ label: 'tUWorkingWeekLength', name:'TUWorkingWeekLength', inTable:  true  },
			{ label: 'tUShiftsNumber', name:'TUShiftsNumber', inTable:  true  },
			{ label: 'tUNumberOfEmployee', name:'TUNumberOfEmployee', inTable:  true  },
			{ label: 'tUStandardHourPrice', name:'TUStandardHourPrice', inTable:  false  },
			{ label: 'tUMaterialsCostsPercentage', name:'TUMaterialsCostsPercentage', inTable:  false  },
			{ label: 'tULaborCostsPercentage', name:'TULaborCostsPercentage', inTable:  false  },
			{ label: 'tUActivityStatus', name:'TUActivityStatus', inTable:  true  },
			{ label: 'tUCompletenessStatus', name:'TUCompletenessStatus', inTable:  true  },
			{ label: 'tUEnteredBy', name:'TUEnteredBy', inTable:  false  },
			{ label: 'tUEntryDate', name:'TUEntryDate', inTable:  false  },
			{ label: 'tUModifiedBy', name:'TUModifiedBy', inTable:  false  },
			{ label: 'tUModificationDate', name:'TUModificationDate', inTable:  false  },
			{ label: 'tUApprovedBy', name:'TUApprovedBy', inTable:  false  },
			{ label: 'tUApprovalDate', name:'TUApprovalDate', inTable:  false  },
		]
	};

	// profession with properties names and labels
	$scope.professionDefinition = {
		label: 'humanresources.occupation',
		properties : [
			{ label: 'oCode', name:'OCode' },
			{ label: 'oName', name:'OName' },
		]
	};
	// currency with properties names and labels
	$scope.currencyDefinition = {
		label: 'capacitymanagement.currency',
		properties : [
			{ label: 'cCurrencyDesignation', name:'CCurrencyDesignation' },
		]
	};
	// schoolDegree with properties names and labels
	$scope.schoolDegreeDefinition = {
		label: 'humanresources.schoolDegree',
		properties : [
			{ label: 'sDCode', name:'SDCode' },
			{ label: 'sDName', name:'SDName' },
		]
	};
	// asset with properties names and labels
	$scope.assetDefinition = {
		label: 'capacitymanagement.asset',
		properties : [
			{ label: 'aInventoryNumber', name:'AInventoryNumber' },
			{ label: 'aPurchasingDate', name:'APurchasingDate' },
			{ label: 'aQuantity', name:'AQuantity' },
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
	// availabilities with properties names and labels
	$scope.availabilitiesDefinition = {
		label: 'capacitymanagement.availabilityTechnologicalUnits',
		properties : [
			{ label: 'aTUOrdinalNumber', name:'ATUOrdinalNumber' },
			{ label: 'aTUStartDate', name:'ATUStartDate' },
			{ label: 'aTUCapacityChange', name:'ATUCapacityChange' },
		]
	};
	// technologicalCharacterics with properties names and labels
	$scope.technologicalCharactericsDefinition = {
		label: 'capacitymanagement.technicalCharacteristicProductionEquipment',
		properties : [
			{ label: 'tCPEOrdinalNumber', name:'TCPEOrdinalNumber' },
			{ label: 'tCPECharacteristicDescription', name:'TCPECharacteristicDescription' },
			{ label: 'tCPECharacteristicValue', name:'TCPECharacteristicValue' },
		]
	};
	// works with properties names and labels
	$scope.worksDefinition = {
		label: 'capacitymanagement.workOn',
		properties : [
		]
	};

	// fill table with data
	$scope.items = [];
	$scope.loaded = false;
	var getTechnologicalUnits = function() {
		if(!$scope.loaded && $scope.items.length === 0) {
			$scope.isLoading = true;
			ServiceTechnologicalUnit.query(function(data) {
				$scope.items = data;
				$scope.isLoading = false;
				$scope.loaded = true;
			});
		}
	};
	getTechnologicalUnits();

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

	$scope.$watch('TechnologicalUnitCollection', function() {
		$scope.itemEdit = CheckSelected.checkSelectedInTable($scope.itemEdit, $scope.TechnologicalUnitCollection, $scope.items);
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
			templateUrl: 'capacitymanagement/technologicalunit/tmplTechnologicalUnitEdit.tpl.html',
			size: 'lg',
			windowClass: 'hmodal-info',
			controller: 'ctrlTechnologicalUnitEdit',
			resolve: {
				itemEdit: function() {
					if(isNew) {
						return new ServiceTechnologicalUnit();
					} else {
						return $scope.itemEdit;
					}
				},
				professionDefinition: function() {
					return $scope.professionDefinition;
				},
				currencyDefinition: function() {
					return $scope.currencyDefinition;
				},
				schoolDegreeDefinition: function() {
					return $scope.schoolDegreeDefinition;
				},
				assetDefinition: function() {
					return $scope.assetDefinition;
				},
				workCenterDefinition: function() {
					return $scope.workCenterDefinition;
				},
				availabilitiesDefinition: function() {
					return $scope.availabilitiesDefinition;
				},
				technologicalCharactericsDefinition: function() {
					return $scope.technologicalCharactericsDefinition;
				},
				worksDefinition: function() {
					return $scope.worksDefinition;
				},
			}
		})
		.result.then(function(result) {
			if(!angular.isDefined(result.id)) {
				ServiceTechnologicalUnit.saveCustom('stockmanagement/technologicalunits', result, function(savedObject) {
					$scope.items.unshift(savedObject);
					if($scope.itemEdit !== null) {
						var index = $scope.items.map(function(it) { return it.id; }).indexOf($scope.itemEdit.id);
						$scope.items[index].isSelected = false;
					}
					$scope.itemEdit = angular.extend(savedObject);
					$scope.items[0].isSelected = true;
				});
			 } else {
				 ServiceTechnologicalUnit.updateCustom('stockmanagement/technologicalunits/'+result.id, result, function(savedObject) {
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


.controller('ctrlTechnologicalUnitEdit',['$scope', 'Localization', '$modal', '$modalInstance', 'dialogs',
	'ServiceTechnologicalUnit', 'ServiceOccupation', 'ServiceCurrency', 'ServiceSchoolDegree', 'ServiceAsset', 'ServiceWorkCenter', 'ServiceAvailabilityTechnologicalUnits', 'ServiceTechnicalCharacteristicProductionEquipment', 'ServiceWorkOn',   'professionDefinition',  'currencyDefinition',  'schoolDegreeDefinition',  'assetDefinition',  'workCenterDefinition',  'availabilitiesDefinition',  'technologicalCharactericsDefinition',  'worksDefinition',   'itemEdit',
function($scope, Localization, $modal, $modalInstance, dialogs,
	ServiceTechnologicalUnit, ServiceOccupation, ServiceCurrency, ServiceSchoolDegree, ServiceAsset, ServiceWorkCenter, ServiceAvailabilityTechnologicalUnits, ServiceTechnicalCharacteristicProductionEquipment, ServiceWorkOn,  professionDefinition,  currencyDefinition,  schoolDegreeDefinition,  assetDefinition,  workCenterDefinition,  availabilitiesDefinition,  technologicalCharactericsDefinition,  worksDefinition,  itemEdit) {

	// dialog mode
	$scope.mode = 'edit';

	// original item state
	var original = angular.copy(itemEdit);
	// item state
	$scope.itemEdit = angular.copy(original);

	// profession with properties
	$scope.professionDefinition = professionDefinition;
	// currency with properties
	$scope.currencyDefinition = currencyDefinition;
	// schoolDegree with properties
	$scope.schoolDegreeDefinition = schoolDegreeDefinition;
	// asset with properties
	$scope.assetDefinition = assetDefinition;
	// workCenter with properties
	$scope.workCenterDefinition = workCenterDefinition;
	// availabilities with properties
	$scope.availabilitiesDefinition = availabilitiesDefinition;
	// technologicalCharacterics with properties
	$scope.technologicalCharactericsDefinition = technologicalCharactericsDefinition;
	// works with properties
	$scope.worksDefinition = worksDefinition;

	// datepicker logic

	// date properties
	$scope.openedTUEntryDate = false;
	$scope.openedTUModificationDate = false;
	$scope.openedTUApprovalDate = false;

	$scope.open = function($event, opened) {
		$event.preventDefault();
		$event.stopPropagation();
		$scope[opened] = true;
	};



	// Choose profession
	$scope.openChooseProfessionDialog = function() {
        $modal.open({
            backdrop: 'static',
            keyboard : false,
            templateUrl: 'humanresources/technologicalunit/tmplOccupationChoose.tpl.html',
            size: 'lg',
            controller: 'ctrlOccupationChoose',
            windowClass: 'hmodal-info',
            resolve: {
				itemEdit: function() {
					if(angular.isDefined($scope.itemEdit.profession)){
						return $scope.itemEdit.profession;
					}
				}
			}
		}).result.then(function(result) {
			$scope.itemEdit.profession = angular.copy(result);
		});
    };


	// Choose currency
	$scope.openChooseCurrencyDialog = function() {
        $modal.open({
            backdrop: 'static',
            keyboard : false,
            templateUrl: 'capacitymanagement/technologicalunit/tmplCurrencyChoose.tpl.html',
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


	// Choose schoolDegree
	$scope.openChooseSchoolDegreeDialog = function() {
        $modal.open({
            backdrop: 'static',
            keyboard : false,
            templateUrl: 'humanresources/technologicalunit/tmplSchoolDegreeChoose.tpl.html',
            size: 'lg',
            controller: 'ctrlSchoolDegreeChoose',
            windowClass: 'hmodal-info',
            resolve: {
				itemEdit: function() {
					if(angular.isDefined($scope.itemEdit.schoolDegree)){
						return $scope.itemEdit.schoolDegree;
					}
				}
			}
		}).result.then(function(result) {
			$scope.itemEdit.schoolDegree = angular.copy(result);
		});
    };


	// Choose asset
	$scope.openChooseAssetDialog = function() {
        $modal.open({
            backdrop: 'static',
            keyboard : false,
            templateUrl: 'capacitymanagement/technologicalunit/tmplAssetChoose.tpl.html',
            size: 'lg',
            controller: 'ctrlAssetChoose',
            windowClass: 'hmodal-info',
            resolve: {
				itemEdit: function() {
					if(angular.isDefined($scope.itemEdit.asset)){
						return $scope.itemEdit.asset;
					}
				}
			}
		}).result.then(function(result) {
			$scope.itemEdit.asset = angular.copy(result);
		});
    };


	// Choose workCenter
	$scope.openChooseWorkCenterDialog = function() {
        $modal.open({
            backdrop: 'static',
            keyboard : false,
            templateUrl: 'productiondata/technologicalunit/tmplWorkCenterChoose.tpl.html',
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


    $scope.availabilityTechnologicalUnitsEdit = null;

    // availabilities table selection logic
    $scope.availabilityTechnologicalUnitsSelection = function(item, index) {
        if(item.isSelected) {
            if($scope.availabilityTechnologicalUnitsEdit !== null) {
                var index1 = $scope.itemEdit.availabilities.map(function(it) { return it.id; }).indexOf($scope.availabilityTechnologicalUnitsEdit.id);
                $scope.itemEdit.availabilities[index1].isSelected = false;
            }
            $scope.availabilityTechnologicalUnitsEdit = item;
        } else {
            $scope.availabilityTechnologicalUnitsEdit = null;
            item.isSelected = false;
        }
    };

    // New/Edit availabilities dialog
    $scope.openAvailabilityTechnologicalUnitsEditDialog = function(isNew) {
        $modal.open({
            backdrop: 'static',
            keyboard : false,
            templateUrl: 'capacitymanagement/technologicalunit/tmplAvailabilityTechnologicalUnitsEdit.tpl.html',
            size: 'lg',
            controller: 'ctrlAvailabilityTechnologicalUnitsEdit',
            windowClass: 'hmodal-info',
            resolve: {
                itemEdit: function() {
                    if(isNew) {
                        return new ServiceAvailabilityTechnologicalUnits();
                    } else {
                        return $scope.availabilityTechnologicalUnitsEdit;
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
                $scope.availabilityTechnologicalUnitsEdit = angular.extend(result);
                $scope.itemEdit.availabilities[0].isSelected = true;
            }
            else {
                for(i in $scope.itemEdit.availabilities) {
                    $scope.itemEdit.availabilities[i].isSelected = false;
                }
                $scope.availabilityTechnologicalUnitsEdit = angular.extend(result);
                var index = $scope.itemEdit.availabilities.map(function(it) { return it.id; }).indexOf(result.id);
                for(var key in result) {
                    $scope.itemEdit.availabilities[index][key] = result[key];
                }
                $scope.itemEdit.availabilities[index].isSelected = true;
            }
        });
    };

    $scope.removeAvailabilityTechnologicalUnits = function(item) {
        var dialog = dialogs.confirm('Please confirm', 'Are you sure you want to delete item?');
        dialog.result.then(function(btn) {
            var removeIndex = $scope.itemEdit.availabilities.map(function(it) { return it.id; }).indexOf(item.id);
            $scope.itemEdit.availabilities[removeIndex].deleted = true;
        });
    };


    $scope.technicalCharacteristicProductionEquipmentEdit = null;

    // technologicalCharacterics table selection logic
    $scope.technicalCharacteristicProductionEquipmentSelection = function(item, index) {
        if(item.isSelected) {
            if($scope.technicalCharacteristicProductionEquipmentEdit !== null) {
                var index1 = $scope.itemEdit.technologicalCharacterics.map(function(it) { return it.id; }).indexOf($scope.technicalCharacteristicProductionEquipmentEdit.id);
                $scope.itemEdit.technologicalCharacterics[index1].isSelected = false;
            }
            $scope.technicalCharacteristicProductionEquipmentEdit = item;
        } else {
            $scope.technicalCharacteristicProductionEquipmentEdit = null;
            item.isSelected = false;
        }
    };

    // New/Edit technologicalCharacterics dialog
    $scope.openTechnicalCharacteristicProductionEquipmentEditDialog = function(isNew) {
        $modal.open({
            backdrop: 'static',
            keyboard : false,
            templateUrl: 'capacitymanagement/technologicalunit/tmplTechnicalCharacteristicProductionEquipmentEdit.tpl.html',
            size: 'lg',
            controller: 'ctrlTechnicalCharacteristicProductionEquipmentEdit',
            windowClass: 'hmodal-info',
            resolve: {
                itemEdit: function() {
                    if(isNew) {
                        return new ServiceTechnicalCharacteristicProductionEquipment();
                    } else {
                        return $scope.technicalCharacteristicProductionEquipmentEdit;
                    }
                }
            }
        }).result.then(function(result) {
            var i;
            if(isNew) {
                if(!angular.isDefined($scope.itemEdit.technologicalCharacterics)) {
                    $scope.itemEdit.technologicalCharacterics = [];
                }
                $scope.itemEdit.technologicalCharacterics.unshift(result);
                for(i in $scope.itemEdit.technologicalCharacterics) {
                    $scope.itemEdit.technologicalCharacterics[i].isSelected = false;
                }
                $scope.technicalCharacteristicProductionEquipmentEdit = angular.extend(result);
                $scope.itemEdit.technologicalCharacterics[0].isSelected = true;
            }
            else {
                for(i in $scope.itemEdit.technologicalCharacterics) {
                    $scope.itemEdit.technologicalCharacterics[i].isSelected = false;
                }
                $scope.technicalCharacteristicProductionEquipmentEdit = angular.extend(result);
                var index = $scope.itemEdit.technologicalCharacterics.map(function(it) { return it.id; }).indexOf(result.id);
                for(var key in result) {
                    $scope.itemEdit.technologicalCharacterics[index][key] = result[key];
                }
                $scope.itemEdit.technologicalCharacterics[index].isSelected = true;
            }
        });
    };

    $scope.removeTechnicalCharacteristicProductionEquipment = function(item) {
        var dialog = dialogs.confirm('Please confirm', 'Are you sure you want to delete item?');
        dialog.result.then(function(btn) {
            var removeIndex = $scope.itemEdit.technologicalCharacterics.map(function(it) { return it.id; }).indexOf(item.id);
            $scope.itemEdit.technologicalCharacterics[removeIndex].deleted = true;
        });
    };


    $scope.workOnEdit = null;

    // works table selection logic
    $scope.workOnSelection = function(item, index) {
        if(item.isSelected) {
            if($scope.workOnEdit !== null) {
                var index1 = $scope.itemEdit.works.map(function(it) { return it.id; }).indexOf($scope.workOnEdit.id);
                $scope.itemEdit.works[index1].isSelected = false;
            }
            $scope.workOnEdit = item;
        } else {
            $scope.workOnEdit = null;
            item.isSelected = false;
        }
    };

    // New/Edit works dialog
    $scope.openWorkOnEditDialog = function(isNew) {
        $modal.open({
            backdrop: 'static',
            keyboard : false,
            templateUrl: 'capacitymanagement/technologicalunit/tmplWorkOnEdit.tpl.html',
            size: 'lg',
            controller: 'ctrlWorkOnEdit',
            windowClass: 'hmodal-info',
            resolve: {
                itemEdit: function() {
                    if(isNew) {
                        return new ServiceWorkOn();
                    } else {
                        return $scope.workOnEdit;
                    }
                }
            }
        }).result.then(function(result) {
            var i;
            if(isNew) {
                if(!angular.isDefined($scope.itemEdit.works)) {
                    $scope.itemEdit.works = [];
                }
                $scope.itemEdit.works.unshift(result);
                for(i in $scope.itemEdit.works) {
                    $scope.itemEdit.works[i].isSelected = false;
                }
                $scope.workOnEdit = angular.extend(result);
                $scope.itemEdit.works[0].isSelected = true;
            }
            else {
                for(i in $scope.itemEdit.works) {
                    $scope.itemEdit.works[i].isSelected = false;
                }
                $scope.workOnEdit = angular.extend(result);
                var index = $scope.itemEdit.works.map(function(it) { return it.id; }).indexOf(result.id);
                for(var key in result) {
                    $scope.itemEdit.works[index][key] = result[key];
                }
                $scope.itemEdit.works[index].isSelected = true;
            }
        });
    };

    $scope.removeWorkOn = function(item) {
        var dialog = dialogs.confirm('Please confirm', 'Are you sure you want to delete item?');
        dialog.result.then(function(btn) {
            var removeIndex = $scope.itemEdit.works.map(function(it) { return it.id; }).indexOf(item.id);
            $scope.itemEdit.works[removeIndex].deleted = true;
        });
    };


	// Save Button
	$scope.save = function() {
		correctDateTime($scope.itemEdit.TUEntryDate);
		correctDateTime($scope.itemEdit.TUModificationDate);
		correctDateTime($scope.itemEdit.TUApprovalDate);
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
		return                 item.TUNumber  &&                 item.TUShortName  &&                 item.TUName  &&                 item.TUType  &&                 item.TUTechnicalCapacity  &&                 item.TUAvailableCapacity  &&                 item.TUWorkingDayLength  &&                 item.TUWorkingWeekLength  &&                 item.TUShiftsNumber  &&                 item.TUNumberOfEmployee  &&                 item.TUActivityStatus  &&                 item.TUCompletenessStatus  ;
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


.controller('ctrlTechnologicalUnitChoose', ['$scope','ServiceTechnologicalUnit', 'dialogs', '$modal', '$modalInstance', 'itemEdit',
function($scope, ServiceTechnologicalUnit, dialogs, $modal,  $modalInstance, itemEdit) {

    // entity with properties
    $scope.itemDefinition = {
        label: 'capacitymanagement.technologicalUnit',
        properties: [
            { label: 'tUNumber', name:'TUNumber', inTable:  true  },
            { label: 'tUShortName', name:'TUShortName', inTable:  true  },
            { label: 'tUName', name:'TUName', inTable:  true  },
            { label: 'tUType', name:'TUType', inTable:  true  },
            { label: 'tUTechnicalCapacity', name:'TUTechnicalCapacity', inTable:  true  },
            { label: 'tUAvailableCapacity', name:'TUAvailableCapacity', inTable:  true  },
            { label: 'tUWorkingDayLength', name:'TUWorkingDayLength', inTable:  true  },
            { label: 'tUWorkingWeekLength', name:'TUWorkingWeekLength', inTable:  true  },
            { label: 'tUShiftsNumber', name:'TUShiftsNumber', inTable:  true  },
            { label: 'tUNumberOfEmployee', name:'TUNumberOfEmployee', inTable:  true  },
            { label: 'tUStandardHourPrice', name:'TUStandardHourPrice', inTable:  false  },
            { label: 'tUMaterialsCostsPercentage', name:'TUMaterialsCostsPercentage', inTable:  false  },
            { label: 'tULaborCostsPercentage', name:'TULaborCostsPercentage', inTable:  false  },
            { label: 'tUActivityStatus', name:'TUActivityStatus', inTable:  true  },
            { label: 'tUCompletenessStatus', name:'TUCompletenessStatus', inTable:  true  },
            { label: 'tUEnteredBy', name:'TUEnteredBy', inTable:  false  },
            { label: 'tUEntryDate', name:'TUEntryDate', inTable:  false  },
            { label: 'tUModifiedBy', name:'TUModifiedBy', inTable:  false  },
            { label: 'tUModificationDate', name:'TUModificationDate', inTable:  false  },
            { label: 'tUApprovedBy', name:'TUApprovedBy', inTable:  false  },
            { label: 'tUApprovalDate', name:'TUApprovalDate', inTable:  false  },
        ]
    };

	$scope.items = [];
	$scope.itemEdit = {};

	// fill table with data
	$scope.loaded = false;
	var getTechnologicalUnits = function() {
		if(!$scope.loaded && $scope.items.length === 0) {
			$scope.isLoading = true;
			ServiceTechnologicalUnit.query(function(data) {
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
	getTechnologicalUnits();

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