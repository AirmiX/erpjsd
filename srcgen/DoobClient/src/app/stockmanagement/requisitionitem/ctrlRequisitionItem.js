'use strict';

angular.module('Doob.stockmanagement')


.controller('ctrlRequisitionItem',['$scope', '$rootScope', '$modal', 'dialogs', 'CheckSelected', 'ServiceRequisitionItem',
    function($scope, $rootScope, $modal, dialogs, CheckSelected, ServiceRequisitionItem) {

	// main entity (requisitionItem) properties names and labels
	$scope.itemDefinition = {
		label: 'stockmanagement.requisitionItem',
		properties: [
			{ label: 'rIOrdinalNumber', name:'RIOrdinalNumber', inTable:  true  },
			{ label: 'rILocationAddress', name:'RILocationAddress', inTable:  true  },
			{ label: 'rIQuantityStandardized', name:'RIQuantityStandardized', inTable:  true  },
			{ label: 'rIQuantityRequisitioned', name:'RIQuantityRequisitioned', inTable:  true  },
			{ label: 'rIQuantityReserved', name:'RIQuantityReserved', inTable:  true  },
			{ label: 'rIQuantityIssued', name:'RIQuantityIssued', inTable:  true  },
			{ label: 'rIBookValueAmmount', name:'RIBookValueAmmount', inTable:  true  },
			{ label: 'rIPriceDesignation', name:'RIPriceDesignation', inTable:  true  },
			{ label: 'rIPostingPosition', name:'RIPostingPosition', inTable:  true  },
			{ label: 'rIAmmountAfterPosting', name:'RIAmmountAfterPosting', inTable:  true  },
			{ label: 'rIBatchNumber', name:'RIBatchNumber', inTable:  false  },
			{ label: 'rIStorno', name:'RIStorno', inTable:  false  },
			{ label: 'rIStepNumber', name:'RIStepNumber', inTable:  false  },
			{ label: 'rIStatusReservedNotIssued', name:'RIStatusReservedNotIssued', inTable:  true  },
			{ label: 'rIDocumentNumber', name:'RIDocumentNumber', inTable:  false  },
			{ label: 'rISecurityIndicator', name:'RISecurityIndicator', inTable:  false  },
		]
	};

	// requisition with properties names and labels
	$scope.requisitionDefinition = {
		label: 'stockmanagement.requisition',
		properties : [
			{ label: 'rDocumentNumber', name:'RDocumentNumber' },
			{ label: 'rReservationDate', name:'RReservationDate' },
			{ label: 'rQuantityLaunched', name:'RQuantityLaunched' },
			{ label: 'rStatusIndicator', name:'RStatusIndicator' },
			{ label: 'rPrintDate', name:'RPrintDate' },
		]
	};
	// account with properties names and labels
	$scope.accountDefinition = {
		label: 'corporation.account',
		properties : [
			{ label: 'aAccountNumber', name:'AAccountNumber' },
			{ label: 'aName', name:'AName' },
			{ label: 'aIsTransfer', name:'AIsTransfer' },
			{ label: 'aEntrySide', name:'AEntrySide' },
			{ label: 'aDisplaySide', name:'ADisplaySide' },
		]
	};
	// tangibleItemCondition with properties names and labels
	$scope.tangibleItemConditionDefinition = {
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
	// accountStock with properties names and labels
	$scope.accountStockDefinition = {
		label: 'corporation.account',
		properties : [
			{ label: 'aAccountNumber', name:'AAccountNumber' },
			{ label: 'aName', name:'AName' },
			{ label: 'aIsTransfer', name:'AIsTransfer' },
			{ label: 'aEntrySide', name:'AEntrySide' },
			{ label: 'aDisplaySide', name:'ADisplaySide' },
		]
	};
	// measurementUnit with properties names and labels
	$scope.measurementUnitDefinition = {
		label: 'commonbusinessentities.measurementUnit',
		properties : [
			{ label: 'mUIdentificationCode', name:'MUIdentificationCode' },
			{ label: 'mUName', name:'MUName' },
		]
	};

	// fill table with data
	$scope.items = [];
	$scope.loaded = false;
	var getRequisitionItems = function() {
		if(!$scope.loaded && $scope.items.length === 0) {
			$scope.isLoading = true;
			ServiceRequisitionItem.query(function(data) {
				$scope.items = data;
				$scope.isLoading = false;
				$scope.loaded = true;
			});
		}
	};
	getRequisitionItems();

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

	$scope.$watch('RequisitionItemCollection', function() {
		$scope.itemEdit = CheckSelected.checkSelectedInTable($scope.itemEdit, $scope.RequisitionItemCollection, $scope.items);
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
			templateUrl: 'stockmanagement/requisitionitem/tmplRequisitionItemEdit.tpl.html',
			size: 'lg',
			windowClass: 'hmodal-info',
			controller: 'ctrlRequisitionItemEdit',
			resolve: {
				itemEdit: function() {
					if(isNew) {
						return new ServiceRequisitionItem();
					} else {
						return $scope.itemEdit;
					}
				},
				requisitionDefinition: function() {
					return $scope.requisitionDefinition;
				},
				accountDefinition: function() {
					return $scope.accountDefinition;
				},
				tangibleItemConditionDefinition: function() {
					return $scope.tangibleItemConditionDefinition;
				},
				accountStockDefinition: function() {
					return $scope.accountStockDefinition;
				},
				measurementUnitDefinition: function() {
					return $scope.measurementUnitDefinition;
				},
			}
		})
		.result.then(function(result) {
			if(!angular.isDefined(result.id)) {
				ServiceRequisitionItem.saveCustom('stockmanagement/requisitionitems', result, function(savedObject) {
					$scope.items.unshift(savedObject);
					if($scope.itemEdit !== null) {
						var index = $scope.items.map(function(it) { return it.id; }).indexOf($scope.itemEdit.id);
						$scope.items[index].isSelected = false;
					}
					$scope.itemEdit = angular.extend(savedObject);
					$scope.items[0].isSelected = true;
				});
			 } else {
				 ServiceRequisitionItem.updateCustom('stockmanagement/requisitionitems/'+result.id, result, function(savedObject) {
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


.controller('ctrlRequisitionItemEdit',['$scope', 'Localization', '$modal', '$modalInstance', 'dialogs',
	'ServiceRequisitionItem', 'ServiceRequisition', 'ServiceAccount', 'ServiceTangibleItemCondition', 'ServiceMeasurementUnit',   'requisitionDefinition',  'accountDefinition',  'tangibleItemConditionDefinition',  'accountStockDefinition',  'measurementUnitDefinition',   'itemEdit',
function($scope, Localization, $modal, $modalInstance, dialogs,
	ServiceRequisitionItem, ServiceRequisition, ServiceAccount, ServiceTangibleItemCondition, ServiceMeasurementUnit,  requisitionDefinition,  accountDefinition,  tangibleItemConditionDefinition,  accountStockDefinition,  measurementUnitDefinition,  itemEdit) {

	// dialog mode
	$scope.mode = 'edit';

	// original item state
	var original = angular.copy(itemEdit);
	// item state
	$scope.itemEdit = angular.copy(original);

	// requisition with properties
	$scope.requisitionDefinition = requisitionDefinition;
	// account with properties
	$scope.accountDefinition = accountDefinition;
	// tangibleItemCondition with properties
	$scope.tangibleItemConditionDefinition = tangibleItemConditionDefinition;
	// accountStock with properties
	$scope.accountStockDefinition = accountStockDefinition;
	// measurementUnit with properties
	$scope.measurementUnitDefinition = measurementUnitDefinition;

	// datepicker logic

	// date properties

	$scope.open = function($event, opened) {
		$event.preventDefault();
		$event.stopPropagation();
		$scope[opened] = true;
	};



	// Choose requisition
	$scope.openChooseRequisitionDialog = function() {
        $modal.open({
            backdrop: 'static',
            keyboard : false,
            templateUrl: 'stockmanagement/requisitionitem/tmplRequisitionChoose.tpl.html',
            size: 'lg',
            controller: 'ctrlRequisitionChoose',
            windowClass: 'hmodal-info',
            resolve: {
				itemEdit: function() {
					if(angular.isDefined($scope.itemEdit.requisition)){
						return $scope.itemEdit.requisition;
					}
				}
			}
		}).result.then(function(result) {
			$scope.itemEdit.requisition = angular.copy(result);
		});
    };


	// Choose account
	$scope.openChooseAccountDialog = function() {
        $modal.open({
            backdrop: 'static',
            keyboard : false,
            templateUrl: 'corporation/requisitionitem/tmplAccountChoose.tpl.html',
            size: 'lg',
            controller: 'ctrlAccountChoose',
            windowClass: 'hmodal-info',
            resolve: {
				itemEdit: function() {
					if(angular.isDefined($scope.itemEdit.account)){
						return $scope.itemEdit.account;
					}
				}
			}
		}).result.then(function(result) {
			$scope.itemEdit.account = angular.copy(result);
		});
    };


	// Choose tangibleItemCondition
	$scope.openChooseTangibleItemConditionDialog = function() {
        $modal.open({
            backdrop: 'static',
            keyboard : false,
            templateUrl: 'stockmanagement/requisitionitem/tmplTangibleItemConditionChoose.tpl.html',
            size: 'lg',
            controller: 'ctrlTangibleItemConditionChoose',
            windowClass: 'hmodal-info',
            resolve: {
				itemEdit: function() {
					if(angular.isDefined($scope.itemEdit.tangibleItemCondition)){
						return $scope.itemEdit.tangibleItemCondition;
					}
				}
			}
		}).result.then(function(result) {
			$scope.itemEdit.tangibleItemCondition = angular.copy(result);
		});
    };


	// Choose accountStock
	$scope.openChooseAccountStockDialog = function() {
        $modal.open({
            backdrop: 'static',
            keyboard : false,
            templateUrl: 'corporation/requisitionitem/tmplAccountChoose.tpl.html',
            size: 'lg',
            controller: 'ctrlAccountChoose',
            windowClass: 'hmodal-info',
            resolve: {
				itemEdit: function() {
					if(angular.isDefined($scope.itemEdit.accountStock)){
						return $scope.itemEdit.accountStock;
					}
				}
			}
		}).result.then(function(result) {
			$scope.itemEdit.accountStock = angular.copy(result);
		});
    };


	// Choose measurementUnit
	$scope.openChooseMeasurementUnitDialog = function() {
        $modal.open({
            backdrop: 'static',
            keyboard : false,
            templateUrl: 'commonbusinessentities/requisitionitem/tmplMeasurementUnitChoose.tpl.html',
            size: 'lg',
            controller: 'ctrlMeasurementUnitChoose',
            windowClass: 'hmodal-info',
            resolve: {
				itemEdit: function() {
					if(angular.isDefined($scope.itemEdit.measurementUnit)){
						return $scope.itemEdit.measurementUnit;
					}
				}
			}
		}).result.then(function(result) {
			$scope.itemEdit.measurementUnit = angular.copy(result);
		});
    };


	// Save Button
	$scope.save = function() {
	   //	delete $scope.itemEdit.isSelected;
		$modalInstance.close($scope.itemEdit);
	};


	$scope.canSave = function() {
		var item = $scope.itemEdit;
		return                 item.RIOrdinalNumber  &&                 item.RILocationAddress  &&                 item.RIQuantityStandardized  &&                 item.RIQuantityRequisitioned  &&                 item.RIQuantityReserved  &&                 item.RIQuantityIssued  &&                 item.RIBookValueAmmount  &&                 item.RIPriceDesignation  &&                 item.RIPostingPosition  &&                 item.RIAmmountAfterPosting  &&                 item.RIStatusReservedNotIssued  ;
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


.controller('ctrlRequisitionItemChoose', ['$scope','ServiceRequisitionItem', 'dialogs', '$modal', '$modalInstance', 'itemEdit',
function($scope, ServiceRequisitionItem, dialogs, $modal,  $modalInstance, itemEdit) {

    // entity with properties
    $scope.itemDefinition = {
        label: 'stockmanagement.requisitionItem',
        properties: [
            { label: 'rIOrdinalNumber', name:'RIOrdinalNumber', inTable:  true  },
            { label: 'rILocationAddress', name:'RILocationAddress', inTable:  true  },
            { label: 'rIQuantityStandardized', name:'RIQuantityStandardized', inTable:  true  },
            { label: 'rIQuantityRequisitioned', name:'RIQuantityRequisitioned', inTable:  true  },
            { label: 'rIQuantityReserved', name:'RIQuantityReserved', inTable:  true  },
            { label: 'rIQuantityIssued', name:'RIQuantityIssued', inTable:  true  },
            { label: 'rIBookValueAmmount', name:'RIBookValueAmmount', inTable:  true  },
            { label: 'rIPriceDesignation', name:'RIPriceDesignation', inTable:  true  },
            { label: 'rIPostingPosition', name:'RIPostingPosition', inTable:  true  },
            { label: 'rIAmmountAfterPosting', name:'RIAmmountAfterPosting', inTable:  true  },
            { label: 'rIBatchNumber', name:'RIBatchNumber', inTable:  false  },
            { label: 'rIStorno', name:'RIStorno', inTable:  false  },
            { label: 'rIStepNumber', name:'RIStepNumber', inTable:  false  },
            { label: 'rIStatusReservedNotIssued', name:'RIStatusReservedNotIssued', inTable:  true  },
            { label: 'rIDocumentNumber', name:'RIDocumentNumber', inTable:  false  },
            { label: 'rISecurityIndicator', name:'RISecurityIndicator', inTable:  false  },
        ]
    };

	$scope.items = [];
	$scope.itemEdit = {};

	// fill table with data
	$scope.loaded = false;
	var getRequisitionItems = function() {
		if(!$scope.loaded && $scope.items.length === 0) {
			$scope.isLoading = true;
			ServiceRequisitionItem.query(function(data) {
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
	getRequisitionItems();

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