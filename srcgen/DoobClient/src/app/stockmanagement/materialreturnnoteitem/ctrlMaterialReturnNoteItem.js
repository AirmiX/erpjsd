'use strict';

angular.module('Doob.stockmanagement')


.controller('ctrlMaterialReturnNoteItem',['$scope', '$rootScope', '$modal', 'dialogs', 'CheckSelected', 'ServiceMaterialReturnNoteItem',
    function($scope, $rootScope, $modal, dialogs, CheckSelected, ServiceMaterialReturnNoteItem) {

	// main entity (materialReturnNoteItem) properties names and labels
	$scope.itemDefinition = {
		label: 'stockmanagement.materialReturnNoteItem',
		properties: [
			{ label: 'mRNIOrdinalNumber', name:'MRNIOrdinalNumber', inTable:  true  },
			{ label: 'mRNILocationAddress', name:'MRNILocationAddress', inTable:  false  },
			{ label: 'mRNIBatch', name:'MRNIBatch', inTable:  false  },
			{ label: 'mRNIMeasurementUnit', name:'MRNIMeasurementUnit', inTable:  false  },
			{ label: 'mRNIQuantityReturned', name:'MRNIQuantityReturned', inTable:  true  },
			{ label: 'mRNIBookValueAmmount', name:'MRNIBookValueAmmount', inTable:  false  },
			{ label: 'mRNIPriceDesignation', name:'MRNIPriceDesignation', inTable:  true  },
			{ label: 'mRNIPostingDate', name:'MRNIPostingDate', inTable:  false  },
			{ label: 'mRNIPostingPosition', name:'MRNIPostingPosition', inTable:  false  },
			{ label: 'mRNIAmmountAfterPosting', name:'MRNIAmmountAfterPosting', inTable:  false  },
			{ label: 'mRNIStorno', name:'MRNIStorno', inTable:  false  },
			{ label: 'mRNIPrice', name:'MRNIPrice', inTable:  false  },
			{ label: 'mRNIExpensesAccount', name:'MRNIExpensesAccount', inTable:  false  },
		]
	};

	// identification with properties names and labels
	$scope.identificationDefinition = {
		label: 'commonbusinessentities.identification',
		properties : [
			{ label: 'iIdentificationCode', name:'IIdentificationCode' },
		]
	};
	// materialReturnNote with properties names and labels
	$scope.materialReturnNoteDefinition = {
		label: 'stockmanagement.materialReturnNote',
		properties : [
			{ label: 'mRNDocumentNumber', name:'MRNDocumentNumber' },
			{ label: 'mRNIssuanceDate', name:'MRNIssuanceDate' },
			{ label: 'mRNDocumentStatus', name:'MRNDocumentStatus' },
			{ label: 'mRNPrintStatus', name:'MRNPrintStatus' },
			{ label: 'mRNTransactionLogPrint', name:'MRNTransactionLogPrint' },
		]
	};
	// tangibleItemStatus with properties names and labels
	$scope.tangibleItemStatusDefinition = {
		label: 'stockmanagement.tangibleItemStatus',
		properties : [
			{ label: 'tISDesignation', name:'TISDesignation' },
			{ label: 'tISName', name:'TISName' },
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

	// fill table with data
	$scope.items = [];
	$scope.loaded = false;
	var getMaterialReturnNoteItems = function() {
		if(!$scope.loaded && $scope.items.length === 0) {
			$scope.isLoading = true;
			ServiceMaterialReturnNoteItem.query(function(data) {
				$scope.items = data;
				$scope.isLoading = false;
				$scope.loaded = true;
			});
		}
	};
	getMaterialReturnNoteItems();

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

	$scope.$watch('MaterialReturnNoteItemCollection', function() {
		$scope.itemEdit = CheckSelected.checkSelectedInTable($scope.itemEdit, $scope.MaterialReturnNoteItemCollection, $scope.items);
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
			templateUrl: 'stockmanagement/materialreturnnoteitem/tmplMaterialReturnNoteItemEdit.tpl.html',
			size: 'lg',
			windowClass: 'hmodal-info',
			controller: 'ctrlMaterialReturnNoteItemEdit',
			resolve: {
				itemEdit: function() {
					if(isNew) {
						return new ServiceMaterialReturnNoteItem();
					} else {
						return $scope.itemEdit;
					}
				},
				identificationDefinition: function() {
					return $scope.identificationDefinition;
				},
				materialReturnNoteDefinition: function() {
					return $scope.materialReturnNoteDefinition;
				},
				tangibleItemStatusDefinition: function() {
					return $scope.tangibleItemStatusDefinition;
				},
				tangibleItemConditionDefinition: function() {
					return $scope.tangibleItemConditionDefinition;
				},
				accountDefinition: function() {
					return $scope.accountDefinition;
				},
			}
		})
		.result.then(function(result) {
			if(!angular.isDefined(result.id)) {
				ServiceMaterialReturnNoteItem.saveCustom('stockmanagement/materialreturnnoteitems', result, function(savedObject) {
					$scope.items.unshift(savedObject);
					if($scope.itemEdit !== null) {
						var index = $scope.items.map(function(it) { return it.id; }).indexOf($scope.itemEdit.id);
						$scope.items[index].isSelected = false;
					}
					$scope.itemEdit = angular.extend(savedObject);
					$scope.items[0].isSelected = true;
				});
			 } else {
				 ServiceMaterialReturnNoteItem.updateCustom('stockmanagement/materialreturnnoteitems/'+result.id, result, function(savedObject) {
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


.controller('ctrlMaterialReturnNoteItemEdit',['$scope', 'Localization', '$modal', '$modalInstance', 'dialogs',
	'ServiceMaterialReturnNoteItem', 'ServiceIdentification', 'ServiceMaterialReturnNote', 'ServiceTangibleItemStatus', 'ServiceTangibleItemCondition', 'ServiceAccount',   'identificationDefinition',  'materialReturnNoteDefinition',  'tangibleItemStatusDefinition',  'tangibleItemConditionDefinition',  'accountDefinition',   'itemEdit',
function($scope, Localization, $modal, $modalInstance, dialogs,
	ServiceMaterialReturnNoteItem, ServiceIdentification, ServiceMaterialReturnNote, ServiceTangibleItemStatus, ServiceTangibleItemCondition, ServiceAccount,  identificationDefinition,  materialReturnNoteDefinition,  tangibleItemStatusDefinition,  tangibleItemConditionDefinition,  accountDefinition,  itemEdit) {

	// dialog mode
	$scope.mode = 'edit';

	// original item state
	var original = angular.copy(itemEdit);
	// item state
	$scope.itemEdit = angular.copy(original);

	// identification with properties
	$scope.identificationDefinition = identificationDefinition;
	// materialReturnNote with properties
	$scope.materialReturnNoteDefinition = materialReturnNoteDefinition;
	// tangibleItemStatus with properties
	$scope.tangibleItemStatusDefinition = tangibleItemStatusDefinition;
	// tangibleItemCondition with properties
	$scope.tangibleItemConditionDefinition = tangibleItemConditionDefinition;
	// account with properties
	$scope.accountDefinition = accountDefinition;

	// datepicker logic

	// date properties
	$scope.openedMRNIPostingDate = false;

	$scope.open = function($event, opened) {
		$event.preventDefault();
		$event.stopPropagation();
		$scope[opened] = true;
	};



	// Choose identification
	$scope.openChooseIdentificationDialog = function() {
        $modal.open({
            backdrop: 'static',
            keyboard : false,
            templateUrl: 'commonbusinessentities/materialreturnnoteitem/tmplIdentificationChoose.tpl.html',
            size: 'lg',
            controller: 'ctrlIdentificationChoose',
            windowClass: 'hmodal-info',
            resolve: {
				itemEdit: function() {
					if(angular.isDefined($scope.itemEdit.identification)){
						return $scope.itemEdit.identification;
					}
				}
			}
		}).result.then(function(result) {
			$scope.itemEdit.identification = angular.copy(result);
		});
    };


	// Choose materialReturnNote
	$scope.openChooseMaterialReturnNoteDialog = function() {
        $modal.open({
            backdrop: 'static',
            keyboard : false,
            templateUrl: 'stockmanagement/materialreturnnoteitem/tmplMaterialReturnNoteChoose.tpl.html',
            size: 'lg',
            controller: 'ctrlMaterialReturnNoteChoose',
            windowClass: 'hmodal-info',
            resolve: {
				itemEdit: function() {
					if(angular.isDefined($scope.itemEdit.materialReturnNote)){
						return $scope.itemEdit.materialReturnNote;
					}
				}
			}
		}).result.then(function(result) {
			$scope.itemEdit.materialReturnNote = angular.copy(result);
		});
    };


	// Choose tangibleItemStatus
	$scope.openChooseTangibleItemStatusDialog = function() {
        $modal.open({
            backdrop: 'static',
            keyboard : false,
            templateUrl: 'stockmanagement/materialreturnnoteitem/tmplTangibleItemStatusChoose.tpl.html',
            size: 'lg',
            controller: 'ctrlTangibleItemStatusChoose',
            windowClass: 'hmodal-info',
            resolve: {
				itemEdit: function() {
					if(angular.isDefined($scope.itemEdit.tangibleItemStatus)){
						return $scope.itemEdit.tangibleItemStatus;
					}
				}
			}
		}).result.then(function(result) {
			$scope.itemEdit.tangibleItemStatus = angular.copy(result);
		});
    };


	// Choose tangibleItemCondition
	$scope.openChooseTangibleItemConditionDialog = function() {
        $modal.open({
            backdrop: 'static',
            keyboard : false,
            templateUrl: 'stockmanagement/materialreturnnoteitem/tmplTangibleItemConditionChoose.tpl.html',
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


	// Choose account
	$scope.openChooseAccountDialog = function() {
        $modal.open({
            backdrop: 'static',
            keyboard : false,
            templateUrl: 'corporation/materialreturnnoteitem/tmplAccountChoose.tpl.html',
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


	// Save Button
	$scope.save = function() {
		correctDateTime($scope.itemEdit.MRNIPostingDate);
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
		return                 item.MRNIOrdinalNumber  &&                 item.MRNIQuantityReturned  &&                 item.MRNIPriceDesignation  ;
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


.controller('ctrlMaterialReturnNoteItemChoose', ['$scope','ServiceMaterialReturnNoteItem', 'dialogs', '$modal', '$modalInstance', 'itemEdit',
function($scope, ServiceMaterialReturnNoteItem, dialogs, $modal,  $modalInstance, itemEdit) {

    // entity with properties
    $scope.itemDefinition = {
        label: 'stockmanagement.materialReturnNoteItem',
        properties: [
            { label: 'mRNIOrdinalNumber', name:'MRNIOrdinalNumber', inTable:  true  },
            { label: 'mRNILocationAddress', name:'MRNILocationAddress', inTable:  false  },
            { label: 'mRNIBatch', name:'MRNIBatch', inTable:  false  },
            { label: 'mRNIMeasurementUnit', name:'MRNIMeasurementUnit', inTable:  false  },
            { label: 'mRNIQuantityReturned', name:'MRNIQuantityReturned', inTable:  true  },
            { label: 'mRNIBookValueAmmount', name:'MRNIBookValueAmmount', inTable:  false  },
            { label: 'mRNIPriceDesignation', name:'MRNIPriceDesignation', inTable:  true  },
            { label: 'mRNIPostingDate', name:'MRNIPostingDate', inTable:  false  },
            { label: 'mRNIPostingPosition', name:'MRNIPostingPosition', inTable:  false  },
            { label: 'mRNIAmmountAfterPosting', name:'MRNIAmmountAfterPosting', inTable:  false  },
            { label: 'mRNIStorno', name:'MRNIStorno', inTable:  false  },
            { label: 'mRNIPrice', name:'MRNIPrice', inTable:  false  },
            { label: 'mRNIExpensesAccount', name:'MRNIExpensesAccount', inTable:  false  },
        ]
    };

	$scope.items = [];
	$scope.itemEdit = {};

	// fill table with data
	$scope.loaded = false;
	var getMaterialReturnNoteItems = function() {
		if(!$scope.loaded && $scope.items.length === 0) {
			$scope.isLoading = true;
			ServiceMaterialReturnNoteItem.query(function(data) {
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
	getMaterialReturnNoteItems();

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