'use strict';

angular.module('Doob.corporation')


.controller('ctrlAccount',['$scope', '$rootScope', '$modal', 'dialogs', 'CheckSelected', 'ServiceAccount',
    function($scope, $rootScope, $modal, dialogs, CheckSelected, ServiceAccount) {

	// main entity (account) properties names and labels
	$scope.itemDefinition = {
		label: 'corporation.account',
		properties: [
			{ label: 'aAccountNumber', name:'AAccountNumber', inTable:  true  },
			{ label: 'aName', name:'AName', inTable:  true  },
			{ label: 'aIsTransfer', name:'AIsTransfer', inTable:  true  },
			{ label: 'aHasCostLocation', name:'AHasCostLocation', inTable:  false  },
			{ label: 'aIsForeignCurrencyAccount', name:'AIsForeignCurrencyAccount', inTable:  false  },
			{ label: 'aHasPartner', name:'AHasPartner', inTable:  false  },
			{ label: 'aHasAnalytics', name:'AHasAnalytics', inTable:  false  },
			{ label: 'aIsBalanceSheet', name:'AIsBalanceSheet', inTable:  false  },
			{ label: 'aEntrySide', name:'AEntrySide', inTable:  true  },
			{ label: 'aDisplaySide', name:'ADisplaySide', inTable:  true  },
		]
	};

	// assignedStockAccount with properties names and labels
	$scope.assignedStockAccountDefinition = {
		label: 'stockmanagement.expensesAccountAssignment',
		properties : [
			{ label: 'eAAOutputReason', name:'EAAOutputReason' },
		]
	};
	// deliveryNoteItems with properties names and labels
	$scope.deliveryNoteItemsDefinition = {
		label: 'stockmanagement.deliveryNoteItem',
		properties : [
			{ label: 'dNIOrdinalNumber', name:'DNIOrdinalNumber' },
			{ label: 'dNIMeasurementUnit', name:'DNIMeasurementUnit' },
			{ label: 'dNIQuantityReceived', name:'DNIQuantityReceived' },
			{ label: 'dNIPriceDesignation', name:'DNIPriceDesignation' },
		]
	};
	// taxes with properties names and labels
	$scope.taxesDefinition = {
		label: 'initialization.tax',
		properties : [
			{ label: 'tOrdinalNumber', name:'TOrdinalNumber' },
			{ label: 'tName', name:'TName' },
			{ label: 'tPercent', name:'TPercent' },
		]
	};
	// requsitionItems with properties names and labels
	$scope.requsitionItemsDefinition = {
		label: 'stockmanagement.requisitionItem',
		properties : [
			{ label: 'rIOrdinalNumber', name:'RIOrdinalNumber' },
			{ label: 'rILocationAddress', name:'RILocationAddress' },
			{ label: 'rIQuantityStandardized', name:'RIQuantityStandardized' },
			{ label: 'rIQuantityRequisitioned', name:'RIQuantityRequisitioned' },
			{ label: 'rIQuantityReserved', name:'RIQuantityReserved' },
			{ label: 'rIQuantityIssued', name:'RIQuantityIssued' },
			{ label: 'rIBookValueAmmount', name:'RIBookValueAmmount' },
			{ label: 'rIPriceDesignation', name:'RIPriceDesignation' },
			{ label: 'rIPostingPosition', name:'RIPostingPosition' },
			{ label: 'rIAmmountAfterPosting', name:'RIAmmountAfterPosting' },
			{ label: 'rIStatusReservedNotIssued', name:'RIStatusReservedNotIssued' },
		]
	};
	// assignedExpensesAccounts with properties names and labels
	$scope.assignedExpensesAccountsDefinition = {
		label: 'stockmanagement.expensesAccountAssignment',
		properties : [
			{ label: 'eAAOutputReason', name:'EAAOutputReason' },
		]
	};
	// stockAccountAssignments with properties names and labels
	$scope.stockAccountAssignmentsDefinition = {
		label: 'stockmanagement.stockAccountAssignment',
		properties : [
			{ label: 'sAAValueStatus', name:'SAAValueStatus' },
		]
	};
	// requsitionItemsStock with properties names and labels
	$scope.requsitionItemsStockDefinition = {
		label: 'stockmanagement.requisitionItem',
		properties : [
			{ label: 'rIOrdinalNumber', name:'RIOrdinalNumber' },
			{ label: 'rILocationAddress', name:'RILocationAddress' },
			{ label: 'rIQuantityStandardized', name:'RIQuantityStandardized' },
			{ label: 'rIQuantityRequisitioned', name:'RIQuantityRequisitioned' },
			{ label: 'rIQuantityReserved', name:'RIQuantityReserved' },
			{ label: 'rIQuantityIssued', name:'RIQuantityIssued' },
			{ label: 'rIBookValueAmmount', name:'RIBookValueAmmount' },
			{ label: 'rIPriceDesignation', name:'RIPriceDesignation' },
			{ label: 'rIPostingPosition', name:'RIPostingPosition' },
			{ label: 'rIAmmountAfterPosting', name:'RIAmmountAfterPosting' },
			{ label: 'rIStatusReservedNotIssued', name:'RIStatusReservedNotIssued' },
		]
	};
	// transactionLogs with properties names and labels
	$scope.transactionLogsDefinition = {
		label: 'stockmanagement.transactionLog',
		properties : [
			{ label: 'tLOrdinalNumber', name:'TLOrdinalNumber' },
			{ label: 'tLDocumentNumber', name:'TLDocumentNumber' },
			{ label: 'tLLogNumber', name:'TLLogNumber' },
			{ label: 'tLMeasurementUnit', name:'TLMeasurementUnit' },
			{ label: 'tLStatusDesignation', name:'TLStatusDesignation' },
			{ label: 'tLPrice', name:'TLPrice' },
			{ label: 'tLValue', name:'TLValue' },
			{ label: 'tLDate', name:'TLDate' },
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
	// materialReturnNoteItems with properties names and labels
	$scope.materialReturnNoteItemsDefinition = {
		label: 'stockmanagement.materialReturnNoteItem',
		properties : [
			{ label: 'mRNIOrdinalNumber', name:'MRNIOrdinalNumber' },
			{ label: 'mRNIQuantityReturned', name:'MRNIQuantityReturned' },
			{ label: 'mRNIPriceDesignation', name:'MRNIPriceDesignation' },
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
	var getAccounts = function() {
		if(!$scope.loaded && $scope.items.length === 0) {
			$scope.isLoading = true;
			ServiceAccount.query(function(data) {
				$scope.items = data;
				$scope.isLoading = false;
				$scope.loaded = true;
			});
		}
	};
	getAccounts();

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

	$scope.$watch('AccountCollection', function() {
		$scope.itemEdit = CheckSelected.checkSelectedInTable($scope.itemEdit, $scope.AccountCollection, $scope.items);
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
			templateUrl: 'corporation/account/tmplAccountEdit.tpl.html',
			size: 'lg',
			windowClass: 'hmodal-info',
			controller: 'ctrlAccountEdit',
			resolve: {
				itemEdit: function() {
					if(isNew) {
						return new ServiceAccount();
					} else {
						return $scope.itemEdit;
					}
				},
				assignedStockAccountDefinition: function() {
					return $scope.assignedStockAccountDefinition;
				},
				deliveryNoteItemsDefinition: function() {
					return $scope.deliveryNoteItemsDefinition;
				},
				taxesDefinition: function() {
					return $scope.taxesDefinition;
				},
				requsitionItemsDefinition: function() {
					return $scope.requsitionItemsDefinition;
				},
				assignedExpensesAccountsDefinition: function() {
					return $scope.assignedExpensesAccountsDefinition;
				},
				stockAccountAssignmentsDefinition: function() {
					return $scope.stockAccountAssignmentsDefinition;
				},
				requsitionItemsStockDefinition: function() {
					return $scope.requsitionItemsStockDefinition;
				},
				transactionLogsDefinition: function() {
					return $scope.transactionLogsDefinition;
				},
				renamingItemsOutputDefinition: function() {
					return $scope.renamingItemsOutputDefinition;
				},
				tangibleItemAmmountToolsDefinition: function() {
					return $scope.tangibleItemAmmountToolsDefinition;
				},
				tangibleItemConditionsDefinition: function() {
					return $scope.tangibleItemConditionsDefinition;
				},
				materialReturnNoteItemsDefinition: function() {
					return $scope.materialReturnNoteItemsDefinition;
				},
				renamingItemsInputDefinition: function() {
					return $scope.renamingItemsInputDefinition;
				},
			}
		})
		.result.then(function(result) {
			if(!angular.isDefined(result.id)) {
				ServiceAccount.saveCustom('stockmanagement/accounts', result, function(savedObject) {
					$scope.items.unshift(savedObject);
					if($scope.itemEdit !== null) {
						var index = $scope.items.map(function(it) { return it.id; }).indexOf($scope.itemEdit.id);
						$scope.items[index].isSelected = false;
					}
					$scope.itemEdit = angular.extend(savedObject);
					$scope.items[0].isSelected = true;
				});
			 } else {
				 ServiceAccount.updateCustom('stockmanagement/accounts/'+result.id, result, function(savedObject) {
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


.controller('ctrlAccountEdit',['$scope', 'Localization', '$modal', '$modalInstance', 'dialogs',
	'ServiceAccount', 'ServiceExpensesAccountAssignment', 'ServiceDeliveryNoteItem', 'ServiceTax', 'ServiceRequisitionItem', 'ServiceStockAccountAssignment', 'ServiceTransactionLog', 'ServiceRenamingItem', 'ServiceTangibleItemAmmountTool', 'ServiceTangibleItemCondition', 'ServiceMaterialReturnNoteItem',   'assignedStockAccountDefinition',  'deliveryNoteItemsDefinition',  'taxesDefinition',  'requsitionItemsDefinition',  'assignedExpensesAccountsDefinition',  'stockAccountAssignmentsDefinition',  'requsitionItemsStockDefinition',  'transactionLogsDefinition',  'renamingItemsOutputDefinition',  'tangibleItemAmmountToolsDefinition',  'tangibleItemConditionsDefinition',  'materialReturnNoteItemsDefinition',  'renamingItemsInputDefinition',   'itemEdit',
function($scope, Localization, $modal, $modalInstance, dialogs,
	ServiceAccount, ServiceExpensesAccountAssignment, ServiceDeliveryNoteItem, ServiceTax, ServiceRequisitionItem, ServiceStockAccountAssignment, ServiceTransactionLog, ServiceRenamingItem, ServiceTangibleItemAmmountTool, ServiceTangibleItemCondition, ServiceMaterialReturnNoteItem,  assignedStockAccountDefinition,  deliveryNoteItemsDefinition,  taxesDefinition,  requsitionItemsDefinition,  assignedExpensesAccountsDefinition,  stockAccountAssignmentsDefinition,  requsitionItemsStockDefinition,  transactionLogsDefinition,  renamingItemsOutputDefinition,  tangibleItemAmmountToolsDefinition,  tangibleItemConditionsDefinition,  materialReturnNoteItemsDefinition,  renamingItemsInputDefinition,  itemEdit) {

	// dialog mode
	$scope.mode = 'edit';

	// original item state
	var original = angular.copy(itemEdit);
	// item state
	$scope.itemEdit = angular.copy(original);

	// assignedStockAccount with properties
	$scope.assignedStockAccountDefinition = assignedStockAccountDefinition;
	// deliveryNoteItems with properties
	$scope.deliveryNoteItemsDefinition = deliveryNoteItemsDefinition;
	// taxes with properties
	$scope.taxesDefinition = taxesDefinition;
	// requsitionItems with properties
	$scope.requsitionItemsDefinition = requsitionItemsDefinition;
	// assignedExpensesAccounts with properties
	$scope.assignedExpensesAccountsDefinition = assignedExpensesAccountsDefinition;
	// stockAccountAssignments with properties
	$scope.stockAccountAssignmentsDefinition = stockAccountAssignmentsDefinition;
	// requsitionItemsStock with properties
	$scope.requsitionItemsStockDefinition = requsitionItemsStockDefinition;
	// transactionLogs with properties
	$scope.transactionLogsDefinition = transactionLogsDefinition;
	// renamingItemsOutput with properties
	$scope.renamingItemsOutputDefinition = renamingItemsOutputDefinition;
	// tangibleItemAmmountTools with properties
	$scope.tangibleItemAmmountToolsDefinition = tangibleItemAmmountToolsDefinition;
	// tangibleItemConditions with properties
	$scope.tangibleItemConditionsDefinition = tangibleItemConditionsDefinition;
	// materialReturnNoteItems with properties
	$scope.materialReturnNoteItemsDefinition = materialReturnNoteItemsDefinition;
	// renamingItemsInput with properties
	$scope.renamingItemsInputDefinition = renamingItemsInputDefinition;

	// datepicker logic

	// date properties

	$scope.open = function($event, opened) {
		$event.preventDefault();
		$event.stopPropagation();
		$scope[opened] = true;
	};



    $scope.expensesAccountAssignmentEdit = null;

    // assignedStockAccount table selection logic
    $scope.expensesAccountAssignmentSelection = function(item, index) {
        if(item.isSelected) {
            if($scope.expensesAccountAssignmentEdit !== null) {
                var index1 = $scope.itemEdit.assignedStockAccount.map(function(it) { return it.id; }).indexOf($scope.expensesAccountAssignmentEdit.id);
                $scope.itemEdit.assignedStockAccount[index1].isSelected = false;
            }
            $scope.expensesAccountAssignmentEdit = item;
        } else {
            $scope.expensesAccountAssignmentEdit = null;
            item.isSelected = false;
        }
    };

    // New/Edit assignedStockAccount dialog
    $scope.openExpensesAccountAssignmentEditDialog = function(isNew) {
        $modal.open({
            backdrop: 'static',
            keyboard : false,
            templateUrl: 'stockmanagement/account/tmplExpensesAccountAssignmentEdit.tpl.html',
            size: 'lg',
            controller: 'ctrlExpensesAccountAssignmentEdit',
            windowClass: 'hmodal-info',
            resolve: {
                itemEdit: function() {
                    if(isNew) {
                        return new ServiceExpensesAccountAssignment();
                    } else {
                        return $scope.expensesAccountAssignmentEdit;
                    }
                }
            }
        }).result.then(function(result) {
            var i;
            if(isNew) {
                if(!angular.isDefined($scope.itemEdit.assignedStockAccount)) {
                    $scope.itemEdit.assignedStockAccount = [];
                }
                $scope.itemEdit.assignedStockAccount.unshift(result);
                for(i in $scope.itemEdit.assignedStockAccount) {
                    $scope.itemEdit.assignedStockAccount[i].isSelected = false;
                }
                $scope.expensesAccountAssignmentEdit = angular.extend(result);
                $scope.itemEdit.assignedStockAccount[0].isSelected = true;
            }
            else {
                for(i in $scope.itemEdit.assignedStockAccount) {
                    $scope.itemEdit.assignedStockAccount[i].isSelected = false;
                }
                $scope.expensesAccountAssignmentEdit = angular.extend(result);
                var index = $scope.itemEdit.assignedStockAccount.map(function(it) { return it.id; }).indexOf(result.id);
                for(var key in result) {
                    $scope.itemEdit.assignedStockAccount[index][key] = result[key];
                }
                $scope.itemEdit.assignedStockAccount[index].isSelected = true;
            }
        });
    };

    $scope.removeExpensesAccountAssignment = function(item) {
        var dialog = dialogs.confirm('Please confirm', 'Are you sure you want to delete item?');
        dialog.result.then(function(btn) {
            var removeIndex = $scope.itemEdit.assignedStockAccount.map(function(it) { return it.id; }).indexOf(item.id);
            $scope.itemEdit.assignedStockAccount[removeIndex].deleted = true;
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
            templateUrl: 'stockmanagement/account/tmplStockAccountAssignmentEdit.tpl.html',
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


	// Save Button
	$scope.save = function() {
	   //	delete $scope.itemEdit.isSelected;
        var item;
        var i;
        for(i in $scope.itemEdit.deliveryNoteItems) {
    		item = $scope.itemEdit.deliveryNoteItems[i];
    		delete item.isSelected;
    	}
        for(i in $scope.itemEdit.taxes) {
    		item = $scope.itemEdit.taxes[i];
    		delete item.isSelected;
    	}
        for(i in $scope.itemEdit.requsitionItems) {
    		item = $scope.itemEdit.requsitionItems[i];
    		delete item.isSelected;
    	}
        for(i in $scope.itemEdit.assignedExpensesAccounts) {
    		item = $scope.itemEdit.assignedExpensesAccounts[i];
    		delete item.isSelected;
    	}
        for(i in $scope.itemEdit.requsitionItemsStock) {
    		item = $scope.itemEdit.requsitionItemsStock[i];
    		delete item.isSelected;
    	}
        for(i in $scope.itemEdit.transactionLogs) {
    		item = $scope.itemEdit.transactionLogs[i];
    		delete item.isSelected;
    	}
        for(i in $scope.itemEdit.renamingItemsOutput) {
    		item = $scope.itemEdit.renamingItemsOutput[i];
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
        for(i in $scope.itemEdit.materialReturnNoteItems) {
    		item = $scope.itemEdit.materialReturnNoteItems[i];
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
		return                 item.AAccountNumber  &&                 item.AName  &&                 item.AIsTransfer  &&                 item.AEntrySide  &&                 item.ADisplaySide  ;
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


.controller('ctrlAccountChoose', ['$scope','ServiceAccount', 'dialogs', '$modal', '$modalInstance', 'itemEdit',
function($scope, ServiceAccount, dialogs, $modal,  $modalInstance, itemEdit) {

    // entity with properties
    $scope.itemDefinition = {
        label: 'corporation.account',
        properties: [
            { label: 'aAccountNumber', name:'AAccountNumber', inTable:  true  },
            { label: 'aName', name:'AName', inTable:  true  },
            { label: 'aIsTransfer', name:'AIsTransfer', inTable:  true  },
            { label: 'aHasCostLocation', name:'AHasCostLocation', inTable:  false  },
            { label: 'aIsForeignCurrencyAccount', name:'AIsForeignCurrencyAccount', inTable:  false  },
            { label: 'aHasPartner', name:'AHasPartner', inTable:  false  },
            { label: 'aHasAnalytics', name:'AHasAnalytics', inTable:  false  },
            { label: 'aIsBalanceSheet', name:'AIsBalanceSheet', inTable:  false  },
            { label: 'aEntrySide', name:'AEntrySide', inTable:  true  },
            { label: 'aDisplaySide', name:'ADisplaySide', inTable:  true  },
        ]
    };

	$scope.items = [];
	$scope.itemEdit = {};

	// fill table with data
	$scope.loaded = false;
	var getAccounts = function() {
		if(!$scope.loaded && $scope.items.length === 0) {
			$scope.isLoading = true;
			ServiceAccount.query(function(data) {
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
	getAccounts();

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