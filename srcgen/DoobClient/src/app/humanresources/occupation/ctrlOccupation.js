'use strict';

angular.module('Doob.humanresources')


.controller('ctrlOccupation',['$scope', '$rootScope', '$modal', 'dialogs', 'CheckSelected', 'ServiceOccupation',
    function($scope, $rootScope, $modal, dialogs, CheckSelected, ServiceOccupation) {

	// main entity (occupation) properties names and labels
	$scope.itemDefinition = {
		label: 'humanresources.occupation',
		properties: [
			{ label: 'oCode', name:'OCode', inTable:  true  },
			{ label: 'oName', name:'OName', inTable:  true  },
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
	// balanceResources with properties names and labels
	$scope.balanceResourcesDefinition = {
		label: 'capacitymanagement.balanceResource',
		properties : [
			{ label: 'bRBalanceUnit', name:'BRBalanceUnit' },
			{ label: 'bRResourceType', name:'BRResourceType' },
			{ label: 'bRStartDate', name:'BRStartDate' },
		]
	};
	// occupationDescriptions with properties names and labels
	$scope.occupationDescriptionsDefinition = {
		label: 'humanresources.occupationDescription',
		properties : [
			{ label: 'oDOrdinalNumber', name:'ODOrdinalNumber' },
			{ label: 'oDDescription', name:'ODDescription' },
		]
	};
	// occupationDemands with properties names and labels
	$scope.occupationDemandsDefinition = {
		label: 'humanresources.occupationDemand',
		properties : [
			{ label: 'oDOrdinalNumber', name:'ODOrdinalNumber' },
			{ label: 'oDDescription', name:'ODDescription' },
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
	var getOccupations = function() {
		if(!$scope.loaded && $scope.items.length === 0) {
			$scope.isLoading = true;
			ServiceOccupation.query(function(data) {
				$scope.items = data;
				$scope.isLoading = false;
				$scope.loaded = true;
			});
		}
	};
	getOccupations();

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

	$scope.$watch('OccupationCollection', function() {
		$scope.itemEdit = CheckSelected.checkSelectedInTable($scope.itemEdit, $scope.OccupationCollection, $scope.items);
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
			templateUrl: 'humanresources/occupation/tmplOccupationEdit.tpl.html',
			size: 'lg',
			windowClass: 'hmodal-info',
			controller: 'ctrlOccupationEdit',
			resolve: {
				itemEdit: function() {
					if(isNew) {
						return new ServiceOccupation();
					} else {
						return $scope.itemEdit;
					}
				},
				technologicalUnitsDefinition: function() {
					return $scope.technologicalUnitsDefinition;
				},
				balanceResourcesDefinition: function() {
					return $scope.balanceResourcesDefinition;
				},
				occupationDescriptionsDefinition: function() {
					return $scope.occupationDescriptionsDefinition;
				},
				occupationDemandsDefinition: function() {
					return $scope.occupationDemandsDefinition;
				},
				productionProcessStepsDefinition: function() {
					return $scope.productionProcessStepsDefinition;
				},
			}
		})
		.result.then(function(result) {
			if(!angular.isDefined(result.id)) {
				ServiceOccupation.saveCustom('stockmanagement/occupations', result, function(savedObject) {
					$scope.items.unshift(savedObject);
					if($scope.itemEdit !== null) {
						var index = $scope.items.map(function(it) { return it.id; }).indexOf($scope.itemEdit.id);
						$scope.items[index].isSelected = false;
					}
					$scope.itemEdit = angular.extend(savedObject);
					$scope.items[0].isSelected = true;
				});
			 } else {
				 ServiceOccupation.updateCustom('stockmanagement/occupations/'+result.id, result, function(savedObject) {
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


.controller('ctrlOccupationEdit',['$scope', 'Localization', '$modal', '$modalInstance', 'dialogs',
	'ServiceOccupation', 'ServiceTechnologicalUnit', 'ServiceBalanceResource', 'ServiceOccupationDescription', 'ServiceOccupationDemand', 'ServiceProductionProcessSteps',   'technologicalUnitsDefinition',  'balanceResourcesDefinition',  'occupationDescriptionsDefinition',  'occupationDemandsDefinition',  'productionProcessStepsDefinition',   'itemEdit',
function($scope, Localization, $modal, $modalInstance, dialogs,
	ServiceOccupation, ServiceTechnologicalUnit, ServiceBalanceResource, ServiceOccupationDescription, ServiceOccupationDemand, ServiceProductionProcessSteps,  technologicalUnitsDefinition,  balanceResourcesDefinition,  occupationDescriptionsDefinition,  occupationDemandsDefinition,  productionProcessStepsDefinition,  itemEdit) {

	// dialog mode
	$scope.mode = 'edit';

	// original item state
	var original = angular.copy(itemEdit);
	// item state
	$scope.itemEdit = angular.copy(original);

	// technologicalUnits with properties
	$scope.technologicalUnitsDefinition = technologicalUnitsDefinition;
	// balanceResources with properties
	$scope.balanceResourcesDefinition = balanceResourcesDefinition;
	// occupationDescriptions with properties
	$scope.occupationDescriptionsDefinition = occupationDescriptionsDefinition;
	// occupationDemands with properties
	$scope.occupationDemandsDefinition = occupationDemandsDefinition;
	// productionProcessSteps with properties
	$scope.productionProcessStepsDefinition = productionProcessStepsDefinition;

	// datepicker logic

	// date properties

	$scope.open = function($event, opened) {
		$event.preventDefault();
		$event.stopPropagation();
		$scope[opened] = true;
	};



    $scope.occupationDescriptionEdit = null;

    // occupationDescriptions table selection logic
    $scope.occupationDescriptionSelection = function(item, index) {
        if(item.isSelected) {
            if($scope.occupationDescriptionEdit !== null) {
                var index1 = $scope.itemEdit.occupationDescriptions.map(function(it) { return it.id; }).indexOf($scope.occupationDescriptionEdit.id);
                $scope.itemEdit.occupationDescriptions[index1].isSelected = false;
            }
            $scope.occupationDescriptionEdit = item;
        } else {
            $scope.occupationDescriptionEdit = null;
            item.isSelected = false;
        }
    };

    // New/Edit occupationDescriptions dialog
    $scope.openOccupationDescriptionEditDialog = function(isNew) {
        $modal.open({
            backdrop: 'static',
            keyboard : false,
            templateUrl: 'humanresources/occupation/tmplOccupationDescriptionEdit.tpl.html',
            size: 'lg',
            controller: 'ctrlOccupationDescriptionEdit',
            windowClass: 'hmodal-info',
            resolve: {
                itemEdit: function() {
                    if(isNew) {
                        return new ServiceOccupationDescription();
                    } else {
                        return $scope.occupationDescriptionEdit;
                    }
                }
            }
        }).result.then(function(result) {
            var i;
            if(isNew) {
                if(!angular.isDefined($scope.itemEdit.occupationDescriptions)) {
                    $scope.itemEdit.occupationDescriptions = [];
                }
                $scope.itemEdit.occupationDescriptions.unshift(result);
                for(i in $scope.itemEdit.occupationDescriptions) {
                    $scope.itemEdit.occupationDescriptions[i].isSelected = false;
                }
                $scope.occupationDescriptionEdit = angular.extend(result);
                $scope.itemEdit.occupationDescriptions[0].isSelected = true;
            }
            else {
                for(i in $scope.itemEdit.occupationDescriptions) {
                    $scope.itemEdit.occupationDescriptions[i].isSelected = false;
                }
                $scope.occupationDescriptionEdit = angular.extend(result);
                var index = $scope.itemEdit.occupationDescriptions.map(function(it) { return it.id; }).indexOf(result.id);
                for(var key in result) {
                    $scope.itemEdit.occupationDescriptions[index][key] = result[key];
                }
                $scope.itemEdit.occupationDescriptions[index].isSelected = true;
            }
        });
    };

    $scope.removeOccupationDescription = function(item) {
        var dialog = dialogs.confirm('Please confirm', 'Are you sure you want to delete item?');
        dialog.result.then(function(btn) {
            var removeIndex = $scope.itemEdit.occupationDescriptions.map(function(it) { return it.id; }).indexOf(item.id);
            $scope.itemEdit.occupationDescriptions[removeIndex].deleted = true;
        });
    };


    $scope.occupationDemandEdit = null;

    // occupationDemands table selection logic
    $scope.occupationDemandSelection = function(item, index) {
        if(item.isSelected) {
            if($scope.occupationDemandEdit !== null) {
                var index1 = $scope.itemEdit.occupationDemands.map(function(it) { return it.id; }).indexOf($scope.occupationDemandEdit.id);
                $scope.itemEdit.occupationDemands[index1].isSelected = false;
            }
            $scope.occupationDemandEdit = item;
        } else {
            $scope.occupationDemandEdit = null;
            item.isSelected = false;
        }
    };

    // New/Edit occupationDemands dialog
    $scope.openOccupationDemandEditDialog = function(isNew) {
        $modal.open({
            backdrop: 'static',
            keyboard : false,
            templateUrl: 'humanresources/occupation/tmplOccupationDemandEdit.tpl.html',
            size: 'lg',
            controller: 'ctrlOccupationDemandEdit',
            windowClass: 'hmodal-info',
            resolve: {
                itemEdit: function() {
                    if(isNew) {
                        return new ServiceOccupationDemand();
                    } else {
                        return $scope.occupationDemandEdit;
                    }
                }
            }
        }).result.then(function(result) {
            var i;
            if(isNew) {
                if(!angular.isDefined($scope.itemEdit.occupationDemands)) {
                    $scope.itemEdit.occupationDemands = [];
                }
                $scope.itemEdit.occupationDemands.unshift(result);
                for(i in $scope.itemEdit.occupationDemands) {
                    $scope.itemEdit.occupationDemands[i].isSelected = false;
                }
                $scope.occupationDemandEdit = angular.extend(result);
                $scope.itemEdit.occupationDemands[0].isSelected = true;
            }
            else {
                for(i in $scope.itemEdit.occupationDemands) {
                    $scope.itemEdit.occupationDemands[i].isSelected = false;
                }
                $scope.occupationDemandEdit = angular.extend(result);
                var index = $scope.itemEdit.occupationDemands.map(function(it) { return it.id; }).indexOf(result.id);
                for(var key in result) {
                    $scope.itemEdit.occupationDemands[index][key] = result[key];
                }
                $scope.itemEdit.occupationDemands[index].isSelected = true;
            }
        });
    };

    $scope.removeOccupationDemand = function(item) {
        var dialog = dialogs.confirm('Please confirm', 'Are you sure you want to delete item?');
        dialog.result.then(function(btn) {
            var removeIndex = $scope.itemEdit.occupationDemands.map(function(it) { return it.id; }).indexOf(item.id);
            $scope.itemEdit.occupationDemands[removeIndex].deleted = true;
        });
    };


	// Save Button
	$scope.save = function() {
	   //	delete $scope.itemEdit.isSelected;
        var item;
        var i;
        for(i in $scope.itemEdit.technologicalUnits) {
    		item = $scope.itemEdit.technologicalUnits[i];
    		delete item.isSelected;
    	}
        for(i in $scope.itemEdit.balanceResources) {
    		item = $scope.itemEdit.balanceResources[i];
    		delete item.isSelected;
    	}
        for(i in $scope.itemEdit.productionProcessSteps) {
    		item = $scope.itemEdit.productionProcessSteps[i];
    		delete item.isSelected;
    	}
		$modalInstance.close($scope.itemEdit);
	};


	$scope.canSave = function() {
		var item = $scope.itemEdit;
		return                 item.OCode  &&                 item.OName  ;
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


.controller('ctrlOccupationChoose', ['$scope','ServiceOccupation', 'dialogs', '$modal', '$modalInstance', 'itemEdit',
function($scope, ServiceOccupation, dialogs, $modal,  $modalInstance, itemEdit) {

    // entity with properties
    $scope.itemDefinition = {
        label: 'humanresources.occupation',
        properties: [
            { label: 'oCode', name:'OCode', inTable:  true  },
            { label: 'oName', name:'OName', inTable:  true  },
        ]
    };

	$scope.items = [];
	$scope.itemEdit = {};

	// fill table with data
	$scope.loaded = false;
	var getOccupations = function() {
		if(!$scope.loaded && $scope.items.length === 0) {
			$scope.isLoading = true;
			ServiceOccupation.query(function(data) {
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
	getOccupations();

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