'use strict';

angular.module('Doob.logical')


.controller('ctrlTransferOrderItem',['$scope', '$rootScope', '$modal', 'dialogs', 'CheckSelected', 'ServiceTransferOrderItem',
    function($scope, $rootScope, $modal, dialogs, CheckSelected, ServiceTransferOrderItem) {

	// main entity (transferOrderItem) properties names and labels
	$scope.itemDefinition = {
		label: 'logical.transferOrderItem',
		properties: [
			{ label: 'tOIOrdinalNumber', name:'TOIOrdinalNumber', inTable:  true  },
			{ label: 'tOILocationAddress', name:'TOILocationAddress', inTable:  false  },
			{ label: 'tOIMeasurementUnit', name:'TOIMeasurementUnit', inTable:  false  },
			{ label: 'tOIQuantityNeeded', name:'TOIQuantityNeeded', inTable:  true  },
			{ label: 'tOIQuantityTransferred', name:'TOIQuantityTransferred', inTable:  true  },
			{ label: 'tOIPriceDesignation', name:'TOIPriceDesignation', inTable:  true  },
			{ label: 'tOIPrice', name:'TOIPrice', inTable:  false  },
			{ label: 'tOIBookValueAmmount', name:'TOIBookValueAmmount', inTable:  false  },
			{ label: 'tOIPostingDate', name:'TOIPostingDate', inTable:  false  },
			{ label: 'tOIPostingPosition', name:'TOIPostingPosition', inTable:  false  },
			{ label: 'tOIAmmountAfterPosting', name:'TOIAmmountAfterPosting', inTable:  false  },
			{ label: 'tOIBatchNumber', name:'TOIBatchNumber', inTable:  false  },
			{ label: 'tOIStorno', name:'TOIStorno', inTable:  false  },
			{ label: 'tOIFAGroup', name:'TOIFAGroup', inTable:  false  },
			{ label: 'tOIFASubgroup', name:'TOIFASubgroup', inTable:  false  },
			{ label: 'tOIFANomenclature', name:'TOIFANomenclature', inTable:  false  },
			{ label: 'tOIFAAmortizationRate', name:'TOIFAAmortizationRate', inTable:  false  },
			{ label: 'tOIFAGroupCode', name:'TOIFAGroupCode', inTable:  false  },
		]
	};

	// transferOrder with properties names and labels
	$scope.transferOrderDefinition = {
		label: 'stockmanagement.transferOrder',
		properties : [
			{ label: 'tODocumentNumber', name:'TODocumentNumber' },
			{ label: 'tOIssuanceDate', name:'TOIssuanceDate' },
			{ label: 'tODocumentStatus', name:'TODocumentStatus' },
			{ label: 'tOPrintStatus', name:'TOPrintStatus' },
		]
	};

	// fill table with data
	$scope.items = [];
	$scope.loaded = false;
	var getTransferOrderItems = function() {
		if(!$scope.loaded && $scope.items.length === 0) {
			$scope.isLoading = true;
			ServiceTransferOrderItem.query(function(data) {
				$scope.items = data;
				$scope.isLoading = false;
				$scope.loaded = true;
			});
		}
	};
	getTransferOrderItems();

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

	$scope.$watch('TransferOrderItemCollection', function() {
		$scope.itemEdit = CheckSelected.checkSelectedInTable($scope.itemEdit, $scope.TransferOrderItemCollection, $scope.items);
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
			templateUrl: 'logical/transferorderitem/tmplTransferOrderItemEdit.tpl.html',
			size: 'lg',
			windowClass: 'hmodal-info',
			controller: 'ctrlTransferOrderItemEdit',
			resolve: {
				itemEdit: function() {
					if(isNew) {
						return new ServiceTransferOrderItem();
					} else {
						return $scope.itemEdit;
					}
				},
				transferOrderDefinition: function() {
					return $scope.transferOrderDefinition;
				},
			}
		})
		.result.then(function(result) {
			if(!angular.isDefined(result.id)) {
				ServiceTransferOrderItem.saveCustom('stockmanagement/transferorderitems', result, function(savedObject) {
					$scope.items.unshift(savedObject);
					if($scope.itemEdit !== null) {
						var index = $scope.items.map(function(it) { return it.id; }).indexOf($scope.itemEdit.id);
						$scope.items[index].isSelected = false;
					}
					$scope.itemEdit = angular.extend(savedObject);
					$scope.items[0].isSelected = true;
				});
			 } else {
				 ServiceTransferOrderItem.updateCustom('stockmanagement/transferorderitems/'+result.id, result, function(savedObject) {
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


.controller('ctrlTransferOrderItemEdit',['$scope', 'Localization', '$modal', '$modalInstance', 'dialogs',
	'ServiceTransferOrderItem', 'ServiceTransferOrder',   'transferOrderDefinition',   'itemEdit',
function($scope, Localization, $modal, $modalInstance, dialogs,
	ServiceTransferOrderItem, ServiceTransferOrder,  transferOrderDefinition,  itemEdit) {

	// dialog mode
	$scope.mode = 'edit';

	// original item state
	var original = angular.copy(itemEdit);
	// item state
	$scope.itemEdit = angular.copy(original);

	// transferOrder with properties
	$scope.transferOrderDefinition = transferOrderDefinition;

	// datepicker logic

	// date properties
	$scope.openedTOIPostingDate = false;

	$scope.open = function($event, opened) {
		$event.preventDefault();
		$event.stopPropagation();
		$scope[opened] = true;
	};



	// Choose transferOrder
	$scope.openChooseTransferOrderDialog = function() {
        $modal.open({
            backdrop: 'static',
            keyboard : false,
            templateUrl: 'stockmanagement/transferorderitem/tmplTransferOrderChoose.tpl.html',
            size: 'lg',
            controller: 'ctrlTransferOrderChoose',
            windowClass: 'hmodal-info',
            resolve: {
				itemEdit: function() {
					if(angular.isDefined($scope.itemEdit.transferOrder)){
						return $scope.itemEdit.transferOrder;
					}
				}
			}
		}).result.then(function(result) {
			$scope.itemEdit.transferOrder = angular.copy(result);
		});
    };


	// Save Button
	$scope.save = function() {
		correctDateTime($scope.itemEdit.TOIPostingDate);
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
		return                 item.TOIOrdinalNumber  &&                 item.TOIQuantityNeeded  &&                 item.TOIQuantityTransferred  &&                 item.TOIPriceDesignation  ;
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


.controller('ctrlTransferOrderItemChoose', ['$scope','ServiceTransferOrderItem', 'dialogs', '$modal', '$modalInstance', 'itemEdit',
function($scope, ServiceTransferOrderItem, dialogs, $modal,  $modalInstance, itemEdit) {

    // entity with properties
    $scope.itemDefinition = {
        label: 'logical.transferOrderItem',
        properties: [
            { label: 'tOIOrdinalNumber', name:'TOIOrdinalNumber', inTable:  true  },
            { label: 'tOILocationAddress', name:'TOILocationAddress', inTable:  false  },
            { label: 'tOIMeasurementUnit', name:'TOIMeasurementUnit', inTable:  false  },
            { label: 'tOIQuantityNeeded', name:'TOIQuantityNeeded', inTable:  true  },
            { label: 'tOIQuantityTransferred', name:'TOIQuantityTransferred', inTable:  true  },
            { label: 'tOIPriceDesignation', name:'TOIPriceDesignation', inTable:  true  },
            { label: 'tOIPrice', name:'TOIPrice', inTable:  false  },
            { label: 'tOIBookValueAmmount', name:'TOIBookValueAmmount', inTable:  false  },
            { label: 'tOIPostingDate', name:'TOIPostingDate', inTable:  false  },
            { label: 'tOIPostingPosition', name:'TOIPostingPosition', inTable:  false  },
            { label: 'tOIAmmountAfterPosting', name:'TOIAmmountAfterPosting', inTable:  false  },
            { label: 'tOIBatchNumber', name:'TOIBatchNumber', inTable:  false  },
            { label: 'tOIStorno', name:'TOIStorno', inTable:  false  },
            { label: 'tOIFAGroup', name:'TOIFAGroup', inTable:  false  },
            { label: 'tOIFASubgroup', name:'TOIFASubgroup', inTable:  false  },
            { label: 'tOIFANomenclature', name:'TOIFANomenclature', inTable:  false  },
            { label: 'tOIFAAmortizationRate', name:'TOIFAAmortizationRate', inTable:  false  },
            { label: 'tOIFAGroupCode', name:'TOIFAGroupCode', inTable:  false  },
        ]
    };

	$scope.items = [];
	$scope.itemEdit = {};

	// fill table with data
	$scope.loaded = false;
	var getTransferOrderItems = function() {
		if(!$scope.loaded && $scope.items.length === 0) {
			$scope.isLoading = true;
			ServiceTransferOrderItem.query(function(data) {
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
	getTransferOrderItems();

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