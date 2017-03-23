'use strict';

angular.module('Doob.stockmanagement')


.controller('ctrlDeliveryNoteItem',['$scope', '$rootScope', '$modal', 'dialogs', 'CheckSelected', 'ServiceDeliveryNoteItem',
    function($scope, $rootScope, $modal, dialogs, CheckSelected, ServiceDeliveryNoteItem) {

	// main entity (deliveryNoteItem) properties names and labels
	$scope.itemDefinition = {
		label: 'stockmanagement.deliveryNoteItem',
		properties: [
			{ label: 'dNIOrdinalNumber', name:'DNIOrdinalNumber', inTable:  true  },
			{ label: 'dNILocationAddress', name:'DNILocationAddress', inTable:  false  },
			{ label: 'dNIMeasurementUnit', name:'DNIMeasurementUnit', inTable:  true  },
			{ label: 'dNIQuantityLaunched', name:'DNIQuantityLaunched', inTable:  false  },
			{ label: 'dNIQuantityRejected', name:'DNIQuantityRejected', inTable:  false  },
			{ label: 'dNIQuantityReceived', name:'DNIQuantityReceived', inTable:  true  },
			{ label: 'dNIPlannedPrice', name:'DNIPlannedPrice', inTable:  false  },
			{ label: 'dNIBookValueAmmount', name:'DNIBookValueAmmount', inTable:  false  },
			{ label: 'dNIRealizationAmmount', name:'DNIRealizationAmmount', inTable:  false  },
			{ label: 'dNIPostingPosition', name:'DNIPostingPosition', inTable:  false  },
			{ label: 'dNIAmmountAfterPosting', name:'DNIAmmountAfterPosting', inTable:  false  },
			{ label: 'dNIBatchNumber', name:'DNIBatchNumber', inTable:  false  },
			{ label: 'dNIStorno', name:'DNIStorno', inTable:  false  },
			{ label: 'dNIStepNumber', name:'DNIStepNumber', inTable:  false  },
			{ label: 'dNISecurityIndicator', name:'DNISecurityIndicator', inTable:  false  },
			{ label: 'dNIPriceDesignation', name:'DNIPriceDesignation', inTable:  true  },
			{ label: 'dNISellingPrice', name:'DNISellingPrice', inTable:  false  },
			{ label: 'dNIQuantityReserved', name:'DNIQuantityReserved', inTable:  false  },
		]
	};

	// identification with properties names and labels
	$scope.identificationDefinition = {
		label: 'commonbusinessentities.identification',
		properties : [
			{ label: 'iIdentificationCode', name:'IIdentificationCode' },
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
	// deliveryNote with properties names and labels
	$scope.deliveryNoteDefinition = {
		label: 'stockmanagement.deliveryNote',
		properties : [
			{ label: 'dNDocumentNumber', name:'DNDocumentNumber' },
			{ label: 'dNDeliveryDate', name:'DNDeliveryDate' },
			{ label: 'dNDocumentStatus', name:'DNDocumentStatus' },
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

	// fill table with data
	$scope.items = [];
	$scope.loaded = false;
	var getDeliveryNoteItems = function() {
		if(!$scope.loaded && $scope.items.length === 0) {
			$scope.isLoading = true;
			ServiceDeliveryNoteItem.query(function(data) {
				$scope.items = data;
				$scope.isLoading = false;
				$scope.loaded = true;
			});
		}
	};
	getDeliveryNoteItems();

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

	$scope.$watch('DeliveryNoteItemCollection', function() {
		$scope.itemEdit = CheckSelected.checkSelectedInTable($scope.itemEdit, $scope.DeliveryNoteItemCollection, $scope.items);
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
			templateUrl: 'stockmanagement/deliverynoteitem/tmplDeliveryNoteItemEdit.tpl.html',
			size: 'lg',
			windowClass: 'hmodal-info',
			controller: 'ctrlDeliveryNoteItemEdit',
			resolve: {
				itemEdit: function() {
					if(isNew) {
						return new ServiceDeliveryNoteItem();
					} else {
						return $scope.itemEdit;
					}
				},
				identificationDefinition: function() {
					return $scope.identificationDefinition;
				},
				tangibleItemConditionDefinition: function() {
					return $scope.tangibleItemConditionDefinition;
				},
				accountDefinition: function() {
					return $scope.accountDefinition;
				},
				deliveryNoteDefinition: function() {
					return $scope.deliveryNoteDefinition;
				},
				tangibleItemStatusDefinition: function() {
					return $scope.tangibleItemStatusDefinition;
				},
			}
		})
		.result.then(function(result) {
			if(!angular.isDefined(result.id)) {
				ServiceDeliveryNoteItem.saveCustom('stockmanagement/deliverynoteitems', result, function(savedObject) {
					$scope.items.unshift(savedObject);
					if($scope.itemEdit !== null) {
						var index = $scope.items.map(function(it) { return it.id; }).indexOf($scope.itemEdit.id);
						$scope.items[index].isSelected = false;
					}
					$scope.itemEdit = angular.extend(savedObject);
					$scope.items[0].isSelected = true;
				});
			 } else {
				 ServiceDeliveryNoteItem.updateCustom('stockmanagement/deliverynoteitems/'+result.id, result, function(savedObject) {
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


.controller('ctrlDeliveryNoteItemEdit',['$scope', 'Localization', '$modal', '$modalInstance', 'dialogs',
	'ServiceDeliveryNoteItem', 'ServiceIdentification', 'ServiceTangibleItemCondition', 'ServiceAccount', 'ServiceDeliveryNote', 'ServiceTangibleItemStatus',   'identificationDefinition',  'tangibleItemConditionDefinition',  'accountDefinition',  'deliveryNoteDefinition',  'tangibleItemStatusDefinition',   'itemEdit',
function($scope, Localization, $modal, $modalInstance, dialogs,
	ServiceDeliveryNoteItem, ServiceIdentification, ServiceTangibleItemCondition, ServiceAccount, ServiceDeliveryNote, ServiceTangibleItemStatus,  identificationDefinition,  tangibleItemConditionDefinition,  accountDefinition,  deliveryNoteDefinition,  tangibleItemStatusDefinition,  itemEdit) {

	// dialog mode
	$scope.mode = 'edit';

	// original item state
	var original = angular.copy(itemEdit);
	// item state
	$scope.itemEdit = angular.copy(original);

	// identification with properties
	$scope.identificationDefinition = identificationDefinition;
	// tangibleItemCondition with properties
	$scope.tangibleItemConditionDefinition = tangibleItemConditionDefinition;
	// account with properties
	$scope.accountDefinition = accountDefinition;
	// deliveryNote with properties
	$scope.deliveryNoteDefinition = deliveryNoteDefinition;
	// tangibleItemStatus with properties
	$scope.tangibleItemStatusDefinition = tangibleItemStatusDefinition;

	// datepicker logic

	// date properties

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
            templateUrl: 'commonbusinessentities/deliverynoteitem/tmplIdentificationChoose.tpl.html',
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


	// Choose tangibleItemCondition
	$scope.openChooseTangibleItemConditionDialog = function() {
        $modal.open({
            backdrop: 'static',
            keyboard : false,
            templateUrl: 'stockmanagement/deliverynoteitem/tmplTangibleItemConditionChoose.tpl.html',
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
            templateUrl: 'corporation/deliverynoteitem/tmplAccountChoose.tpl.html',
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


	// Choose deliveryNote
	$scope.openChooseDeliveryNoteDialog = function() {
        $modal.open({
            backdrop: 'static',
            keyboard : false,
            templateUrl: 'stockmanagement/deliverynoteitem/tmplDeliveryNoteChoose.tpl.html',
            size: 'lg',
            controller: 'ctrlDeliveryNoteChoose',
            windowClass: 'hmodal-info',
            resolve: {
				itemEdit: function() {
					if(angular.isDefined($scope.itemEdit.deliveryNote)){
						return $scope.itemEdit.deliveryNote;
					}
				}
			}
		}).result.then(function(result) {
			$scope.itemEdit.deliveryNote = angular.copy(result);
		});
    };


	// Choose tangibleItemStatus
	$scope.openChooseTangibleItemStatusDialog = function() {
        $modal.open({
            backdrop: 'static',
            keyboard : false,
            templateUrl: 'stockmanagement/deliverynoteitem/tmplTangibleItemStatusChoose.tpl.html',
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


	// Save Button
	$scope.save = function() {
	   //	delete $scope.itemEdit.isSelected;
		$modalInstance.close($scope.itemEdit);
	};


	$scope.canSave = function() {
		var item = $scope.itemEdit;
		return                 item.DNIOrdinalNumber  &&                 item.DNIMeasurementUnit  &&                 item.DNIQuantityReceived  &&                 item.DNIPriceDesignation  ;
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


.controller('ctrlDeliveryNoteItemChoose', ['$scope','ServiceDeliveryNoteItem', 'dialogs', '$modal', '$modalInstance', 'itemEdit',
function($scope, ServiceDeliveryNoteItem, dialogs, $modal,  $modalInstance, itemEdit) {

    // entity with properties
    $scope.itemDefinition = {
        label: 'stockmanagement.deliveryNoteItem',
        properties: [
            { label: 'dNIOrdinalNumber', name:'DNIOrdinalNumber', inTable:  true  },
            { label: 'dNILocationAddress', name:'DNILocationAddress', inTable:  false  },
            { label: 'dNIMeasurementUnit', name:'DNIMeasurementUnit', inTable:  true  },
            { label: 'dNIQuantityLaunched', name:'DNIQuantityLaunched', inTable:  false  },
            { label: 'dNIQuantityRejected', name:'DNIQuantityRejected', inTable:  false  },
            { label: 'dNIQuantityReceived', name:'DNIQuantityReceived', inTable:  true  },
            { label: 'dNIPlannedPrice', name:'DNIPlannedPrice', inTable:  false  },
            { label: 'dNIBookValueAmmount', name:'DNIBookValueAmmount', inTable:  false  },
            { label: 'dNIRealizationAmmount', name:'DNIRealizationAmmount', inTable:  false  },
            { label: 'dNIPostingPosition', name:'DNIPostingPosition', inTable:  false  },
            { label: 'dNIAmmountAfterPosting', name:'DNIAmmountAfterPosting', inTable:  false  },
            { label: 'dNIBatchNumber', name:'DNIBatchNumber', inTable:  false  },
            { label: 'dNIStorno', name:'DNIStorno', inTable:  false  },
            { label: 'dNIStepNumber', name:'DNIStepNumber', inTable:  false  },
            { label: 'dNISecurityIndicator', name:'DNISecurityIndicator', inTable:  false  },
            { label: 'dNIPriceDesignation', name:'DNIPriceDesignation', inTable:  true  },
            { label: 'dNISellingPrice', name:'DNISellingPrice', inTable:  false  },
            { label: 'dNIQuantityReserved', name:'DNIQuantityReserved', inTable:  false  },
        ]
    };

	$scope.items = [];
	$scope.itemEdit = {};

	// fill table with data
	$scope.loaded = false;
	var getDeliveryNoteItems = function() {
		if(!$scope.loaded && $scope.items.length === 0) {
			$scope.isLoading = true;
			ServiceDeliveryNoteItem.query(function(data) {
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
	getDeliveryNoteItems();

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