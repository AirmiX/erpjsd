'use strict';

angular.module('Doob.stockmanagement')


.controller('ctrlPriceDesignation',['$scope', '$rootScope', '$modal', 'dialogs', 'CheckSelected', 'ServicePriceDesignation',
    function($scope, $rootScope, $modal, dialogs, CheckSelected, ServicePriceDesignation) {

	// main entity (priceDesignation) properties names and labels
	$scope.itemDefinition = {
		label: 'stockmanagement.priceDesignation',
		properties: [
			{ label: 'pDPriceDesignation', name:'PDPriceDesignation', inTable:  true  },
			{ label: 'pDName', name:'PDName', inTable:  true  },
		]
	};

	// prices with properties names and labels
	$scope.pricesDefinition = {
		label: 'stockmanagement.price',
		properties : [
			{ label: 'pPrice', name:'PPrice' },
		]
	};
	// stockAccountAssignments with properties names and labels
	$scope.stockAccountAssignmentsDefinition = {
		label: 'stockmanagement.stockAccountAssignment',
		properties : [
			{ label: 'sAAValueStatus', name:'SAAValueStatus' },
		]
	};
	// tangibleItemAmmountTools with properties names and labels
	$scope.tangibleItemAmmountToolsDefinition = {
		label: 'stockmanagement.tangibleItemAmmountTool',
		properties : [
			{ label: 'tICLocatonAddress', name:'TICLocatonAddress' },
			{ label: 'tICBookkeepingPosition', name:'TICBookkeepingPosition' },
			{ label: 'tICQuantityCumulativeInput', name:'TICQuantityCumulativeInput' },
			{ label: 'tICValueInitialState', name:'TICValueInitialState' },
			{ label: 'tICValueCumulativeInput', name:'TICValueCumulativeInput' },
			{ label: 'tICUnitPrice', name:'TICUnitPrice' },
			{ label: 'tICAvailableBalance', name:'TICAvailableBalance' },
			{ label: 'tICLastInputDate', name:'TICLastInputDate' },
			{ label: 'tICLastOutputDate', name:'TICLastOutputDate' },
		]
	};
	// tangibleItemConditions with properties names and labels
	$scope.tangibleItemConditionsDefinition = {
		label: 'stockmanagement.tangibleItemCondition',
		properties : [
			{ label: 'tICLocatonAddress', name:'TICLocatonAddress' },
			{ label: 'tICBookkeepingPosition', name:'TICBookkeepingPosition' },
			{ label: 'tICQuantityCumulativeInput', name:'TICQuantityCumulativeInput' },
			{ label: 'tICValueInitialState', name:'TICValueInitialState' },
			{ label: 'tICValueCumulativeInput', name:'TICValueCumulativeInput' },
			{ label: 'tICUnitPrice', name:'TICUnitPrice' },
			{ label: 'tICAvailableBalance', name:'TICAvailableBalance' },
			{ label: 'tICOpeningDate', name:'TICOpeningDate' },
			{ label: 'tICLastInputDate', name:'TICLastInputDate' },
			{ label: 'tICLastOutputDate', name:'TICLastOutputDate' },
		]
	};
	// renamingItemsOutput with properties names and labels
	$scope.renamingItemsOutputDefinition = {
		label: 'renaming.renamingItem',
		properties : [
			{ label: 'rIOrdinalNumber', name:'RIOrdinalNumber' },
			{ label: 'rIMeasurementUnitInput', name:'RIMeasurementUnitInput' },
			{ label: 'rIMeasurementUnitOutput', name:'RIMeasurementUnitOutput' },
			{ label: 'rIQuantityForTransfer', name:'RIQuantityForTransfer' },
			{ label: 'rIAddressOutput', name:'RIAddressOutput' },
		]
	};
	// renamingItemsInput with properties names and labels
	$scope.renamingItemsInputDefinition = {
		label: 'renaming.renamingItem',
		properties : [
			{ label: 'rIOrdinalNumber', name:'RIOrdinalNumber' },
			{ label: 'rIMeasurementUnitInput', name:'RIMeasurementUnitInput' },
			{ label: 'rIMeasurementUnitOutput', name:'RIMeasurementUnitOutput' },
			{ label: 'rIQuantityForTransfer', name:'RIQuantityForTransfer' },
			{ label: 'rIAddressOutput', name:'RIAddressOutput' },
		]
	};

	// fill table with data
	$scope.items = [];
	$scope.loaded = false;
	var getPriceDesignations = function() {
		if(!$scope.loaded && $scope.items.length === 0) {
			$scope.isLoading = true;
			ServicePriceDesignation.query(function(data) {
				$scope.items = data;
				$scope.isLoading = false;
				$scope.loaded = true;
			});
		}
	};
	getPriceDesignations();

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

	$scope.$watch('PriceDesignationCollection', function() {
		$scope.itemEdit = CheckSelected.checkSelectedInTable($scope.itemEdit, $scope.PriceDesignationCollection, $scope.items);
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
			templateUrl: 'stockmanagement/pricedesignation/tmplPriceDesignationEdit.tpl.html',
			size: 'lg',
			windowClass: 'hmodal-info',
			controller: 'ctrlPriceDesignationEdit',
			resolve: {
				itemEdit: function() {
					if(isNew) {
						return new ServicePriceDesignation();
					} else {
						return $scope.itemEdit;
					}
				},
				pricesDefinition: function() {
					return $scope.pricesDefinition;
				},
				stockAccountAssignmentsDefinition: function() {
					return $scope.stockAccountAssignmentsDefinition;
				},
				tangibleItemAmmountToolsDefinition: function() {
					return $scope.tangibleItemAmmountToolsDefinition;
				},
				tangibleItemConditionsDefinition: function() {
					return $scope.tangibleItemConditionsDefinition;
				},
				renamingItemsOutputDefinition: function() {
					return $scope.renamingItemsOutputDefinition;
				},
				renamingItemsInputDefinition: function() {
					return $scope.renamingItemsInputDefinition;
				},
			}
		})
		.result.then(function(result) {
			if(!angular.isDefined(result.id)) {
				ServicePriceDesignation.saveCustom('stockmanagement/pricedesignations', result, function(savedObject) {
					$scope.items.unshift(savedObject);
					if($scope.itemEdit !== null) {
						var index = $scope.items.map(function(it) { return it.id; }).indexOf($scope.itemEdit.id);
						$scope.items[index].isSelected = false;
					}
					$scope.itemEdit = angular.extend(savedObject);
					$scope.items[0].isSelected = true;
				});
			 } else {
				 ServicePriceDesignation.updateCustom('stockmanagement/pricedesignations/'+result.id, result, function(savedObject) {
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


.controller('ctrlPriceDesignationEdit',['$scope', 'Localization', '$modal', '$modalInstance', 'dialogs',
	'ServicePriceDesignation', 'ServicePrice', 'ServiceStockAccountAssignment', 'ServiceTangibleItemAmmountTool', 'ServiceTangibleItemCondition', 'ServiceRenamingItem',   'pricesDefinition',  'stockAccountAssignmentsDefinition',  'tangibleItemAmmountToolsDefinition',  'tangibleItemConditionsDefinition',  'renamingItemsOutputDefinition',  'renamingItemsInputDefinition',   'itemEdit',
function($scope, Localization, $modal, $modalInstance, dialogs,
	ServicePriceDesignation, ServicePrice, ServiceStockAccountAssignment, ServiceTangibleItemAmmountTool, ServiceTangibleItemCondition, ServiceRenamingItem,  pricesDefinition,  stockAccountAssignmentsDefinition,  tangibleItemAmmountToolsDefinition,  tangibleItemConditionsDefinition,  renamingItemsOutputDefinition,  renamingItemsInputDefinition,  itemEdit) {

	// dialog mode
	$scope.mode = 'edit';

	// original item state
	var original = angular.copy(itemEdit);
	// item state
	$scope.itemEdit = angular.copy(original);

	// prices with properties
	$scope.pricesDefinition = pricesDefinition;
	// stockAccountAssignments with properties
	$scope.stockAccountAssignmentsDefinition = stockAccountAssignmentsDefinition;
	// tangibleItemAmmountTools with properties
	$scope.tangibleItemAmmountToolsDefinition = tangibleItemAmmountToolsDefinition;
	// tangibleItemConditions with properties
	$scope.tangibleItemConditionsDefinition = tangibleItemConditionsDefinition;
	// renamingItemsOutput with properties
	$scope.renamingItemsOutputDefinition = renamingItemsOutputDefinition;
	// renamingItemsInput with properties
	$scope.renamingItemsInputDefinition = renamingItemsInputDefinition;

	// datepicker logic

	// date properties

	$scope.open = function($event, opened) {
		$event.preventDefault();
		$event.stopPropagation();
		$scope[opened] = true;
	};



    $scope.priceEdit = null;

    // prices table selection logic
    $scope.priceSelection = function(item, index) {
        if(item.isSelected) {
            if($scope.priceEdit !== null) {
                var index1 = $scope.itemEdit.prices.map(function(it) { return it.id; }).indexOf($scope.priceEdit.id);
                $scope.itemEdit.prices[index1].isSelected = false;
            }
            $scope.priceEdit = item;
        } else {
            $scope.priceEdit = null;
            item.isSelected = false;
        }
    };

    // New/Edit prices dialog
    $scope.openPriceEditDialog = function(isNew) {
        $modal.open({
            backdrop: 'static',
            keyboard : false,
            templateUrl: 'stockmanagement/pricedesignation/tmplPriceEdit.tpl.html',
            size: 'lg',
            controller: 'ctrlPriceEdit',
            windowClass: 'hmodal-info',
            resolve: {
                itemEdit: function() {
                    if(isNew) {
                        return new ServicePrice();
                    } else {
                        return $scope.priceEdit;
                    }
                }
            }
        }).result.then(function(result) {
            var i;
            if(isNew) {
                if(!angular.isDefined($scope.itemEdit.prices)) {
                    $scope.itemEdit.prices = [];
                }
                $scope.itemEdit.prices.unshift(result);
                for(i in $scope.itemEdit.prices) {
                    $scope.itemEdit.prices[i].isSelected = false;
                }
                $scope.priceEdit = angular.extend(result);
                $scope.itemEdit.prices[0].isSelected = true;
            }
            else {
                for(i in $scope.itemEdit.prices) {
                    $scope.itemEdit.prices[i].isSelected = false;
                }
                $scope.priceEdit = angular.extend(result);
                var index = $scope.itemEdit.prices.map(function(it) { return it.id; }).indexOf(result.id);
                for(var key in result) {
                    $scope.itemEdit.prices[index][key] = result[key];
                }
                $scope.itemEdit.prices[index].isSelected = true;
            }
        });
    };

    $scope.removePrice = function(item) {
        var dialog = dialogs.confirm('Please confirm', 'Are you sure you want to delete item?');
        dialog.result.then(function(btn) {
            var removeIndex = $scope.itemEdit.prices.map(function(it) { return it.id; }).indexOf(item.id);
            $scope.itemEdit.prices[removeIndex].deleted = true;
        });
    };


	// Save Button
	$scope.save = function() {
	   //	delete $scope.itemEdit.isSelected;
        var item;
        var i;
        for(i in $scope.itemEdit.stockAccountAssignments) {
    		item = $scope.itemEdit.stockAccountAssignments[i];
    		delete item.isSelected;
    	}
        for(i in $scope.itemEdit.tangibleItemAmmountTools) {
    		item = $scope.itemEdit.tangibleItemAmmountTools[i];
    		delete item.isSelected;
    	}
        for(i in $scope.itemEdit.tangibleItemConditions) {
    		item = $scope.itemEdit.tangibleItemConditions[i];
    		delete item.isSelected;
    	}
        for(i in $scope.itemEdit.renamingItemsOutput) {
    		item = $scope.itemEdit.renamingItemsOutput[i];
    		delete item.isSelected;
    	}
        for(i in $scope.itemEdit.renamingItemsInput) {
    		item = $scope.itemEdit.renamingItemsInput[i];
    		delete item.isSelected;
    	}
		$modalInstance.close($scope.itemEdit);
	};


	$scope.canSave = function() {
		var item = $scope.itemEdit;
		return                 item.PDPriceDesignation  &&                 item.PDName  ;
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


.controller('ctrlPriceDesignationChoose', ['$scope','ServicePriceDesignation', 'dialogs', '$modal', '$modalInstance', 'itemEdit',
function($scope, ServicePriceDesignation, dialogs, $modal,  $modalInstance, itemEdit) {

    // entity with properties
    $scope.itemDefinition = {
        label: 'stockmanagement.priceDesignation',
        properties: [
            { label: 'pDPriceDesignation', name:'PDPriceDesignation', inTable:  true  },
            { label: 'pDName', name:'PDName', inTable:  true  },
        ]
    };

	$scope.items = [];
	$scope.itemEdit = {};

	// fill table with data
	$scope.loaded = false;
	var getPriceDesignations = function() {
		if(!$scope.loaded && $scope.items.length === 0) {
			$scope.isLoading = true;
			ServicePriceDesignation.query(function(data) {
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
	getPriceDesignations();

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