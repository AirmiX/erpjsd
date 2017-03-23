'use strict';

angular.module('Doob.productiondata')


.controller('ctrlProductionProcessType',['$scope', '$rootScope', '$modal', 'dialogs', 'CheckSelected', 'ServiceProductionProcessType',
    function($scope, $rootScope, $modal, dialogs, CheckSelected, ServiceProductionProcessType) {

	// main entity (productionProcessType) properties names and labels
	$scope.itemDefinition = {
		label: 'productiondata.productionProcessType',
		properties: [
			{ label: 'pPTDesignation', name:'PPTDesignation', inTable:  true  },
			{ label: 'pPTName', name:'PPTName', inTable:  true  },
			{ label: 'pPTShortName', name:'PPTShortName', inTable:  true  },
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

	// fill table with data
	$scope.items = [];
	$scope.loaded = false;
	var getProductionProcessTypes = function() {
		if(!$scope.loaded && $scope.items.length === 0) {
			$scope.isLoading = true;
			ServiceProductionProcessType.query(function(data) {
				$scope.items = data;
				$scope.isLoading = false;
				$scope.loaded = true;
			});
		}
	};
	getProductionProcessTypes();

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

	$scope.$watch('ProductionProcessTypeCollection', function() {
		$scope.itemEdit = CheckSelected.checkSelectedInTable($scope.itemEdit, $scope.ProductionProcessTypeCollection, $scope.items);
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
			templateUrl: 'productiondata/productionprocesstype/tmplProductionProcessTypeEdit.tpl.html',
			size: 'lg',
			windowClass: 'hmodal-info',
			controller: 'ctrlProductionProcessTypeEdit',
			resolve: {
				itemEdit: function() {
					if(isNew) {
						return new ServiceProductionProcessType();
					} else {
						return $scope.itemEdit;
					}
				},
				balanceResourcesDefinition: function() {
					return $scope.balanceResourcesDefinition;
				},
				productionProcessesDefinition: function() {
					return $scope.productionProcessesDefinition;
				},
			}
		})
		.result.then(function(result) {
			if(!angular.isDefined(result.id)) {
				ServiceProductionProcessType.saveCustom('stockmanagement/productionprocesstypes', result, function(savedObject) {
					$scope.items.unshift(savedObject);
					if($scope.itemEdit !== null) {
						var index = $scope.items.map(function(it) { return it.id; }).indexOf($scope.itemEdit.id);
						$scope.items[index].isSelected = false;
					}
					$scope.itemEdit = angular.extend(savedObject);
					$scope.items[0].isSelected = true;
				});
			 } else {
				 ServiceProductionProcessType.updateCustom('stockmanagement/productionprocesstypes/'+result.id, result, function(savedObject) {
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


.controller('ctrlProductionProcessTypeEdit',['$scope', 'Localization', '$modal', '$modalInstance', 'dialogs',
	'ServiceProductionProcessType', 'ServiceBalanceResource', 'ServiceProductionProcess',   'balanceResourcesDefinition',  'productionProcessesDefinition',   'itemEdit',
function($scope, Localization, $modal, $modalInstance, dialogs,
	ServiceProductionProcessType, ServiceBalanceResource, ServiceProductionProcess,  balanceResourcesDefinition,  productionProcessesDefinition,  itemEdit) {

	// dialog mode
	$scope.mode = 'edit';

	// original item state
	var original = angular.copy(itemEdit);
	// item state
	$scope.itemEdit = angular.copy(original);

	// balanceResources with properties
	$scope.balanceResourcesDefinition = balanceResourcesDefinition;
	// productionProcesses with properties
	$scope.productionProcessesDefinition = productionProcessesDefinition;

	// datepicker logic

	// date properties

	$scope.open = function($event, opened) {
		$event.preventDefault();
		$event.stopPropagation();
		$scope[opened] = true;
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
            templateUrl: 'capacitymanagement/productionprocesstype/tmplBalanceResourceEdit.tpl.html',
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
            templateUrl: 'productiondata/productionprocesstype/tmplProductionProcessEdit.tpl.html',
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


	// Save Button
	$scope.save = function() {
	   //	delete $scope.itemEdit.isSelected;
		$modalInstance.close($scope.itemEdit);
	};


	$scope.canSave = function() {
		var item = $scope.itemEdit;
		return                 item.PPTDesignation  &&                 item.PPTName  &&                 item.PPTShortName  ;
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


.controller('ctrlProductionProcessTypeChoose', ['$scope','ServiceProductionProcessType', 'dialogs', '$modal', '$modalInstance', 'itemEdit',
function($scope, ServiceProductionProcessType, dialogs, $modal,  $modalInstance, itemEdit) {

    // entity with properties
    $scope.itemDefinition = {
        label: 'productiondata.productionProcessType',
        properties: [
            { label: 'pPTDesignation', name:'PPTDesignation', inTable:  true  },
            { label: 'pPTName', name:'PPTName', inTable:  true  },
            { label: 'pPTShortName', name:'PPTShortName', inTable:  true  },
        ]
    };

	$scope.items = [];
	$scope.itemEdit = {};

	// fill table with data
	$scope.loaded = false;
	var getProductionProcessTypes = function() {
		if(!$scope.loaded && $scope.items.length === 0) {
			$scope.isLoading = true;
			ServiceProductionProcessType.query(function(data) {
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
	getProductionProcessTypes();

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