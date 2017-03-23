'use strict';

angular.module('Doob.renaming')


.controller('ctrlRenamingItem',['$scope', '$rootScope', '$modal', 'dialogs', 'CheckSelected', 'ServiceRenamingItem',
    function($scope, $rootScope, $modal, dialogs, CheckSelected, ServiceRenamingItem) {

	// main entity (renamingItem) properties names and labels
	$scope.itemDefinition = {
		label: 'renaming.renamingItem',
		properties: [
			{ label: 'rIOrdinalNumber', name:'RIOrdinalNumber', inTable:  true  },
			{ label: 'rIMeasurementUnitInput', name:'RIMeasurementUnitInput', inTable:  true  },
			{ label: 'rIMeasurementUnitOutput', name:'RIMeasurementUnitOutput', inTable:  true  },
			{ label: 'rIQuantityForTransfer', name:'RIQuantityForTransfer', inTable:  true  },
			{ label: 'rIAddressOutput', name:'RIAddressOutput', inTable:  true  },
			{ label: 'rIBatchOutput', name:'RIBatchOutput', inTable:  false  },
			{ label: 'rIAddressInput', name:'RIAddressInput', inTable:  false  },
			{ label: 'rIBatchInput', name:'RIBatchInput', inTable:  false  },
			{ label: 'rIStorno', name:'RIStorno', inTable:  false  },
			{ label: 'rIQuantityTransfered', name:'RIQuantityTransfered', inTable:  false  },
			{ label: 'rIPriceOutput', name:'RIPriceOutput', inTable:  false  },
			{ label: 'rIPriceInput', name:'RIPriceInput', inTable:  false  },
			{ label: 'rIValueOutput', name:'RIValueOutput', inTable:  false  },
			{ label: 'rIValueInput', name:'RIValueInput', inTable:  false  },
			{ label: 'rIPostingPositionInput', name:'RIPostingPositionInput', inTable:  false  },
			{ label: 'rIPostingPositionOutput', name:'RIPostingPositionOutput', inTable:  false  },
			{ label: 'rIPostingDate', name:'RIPostingDate', inTable:  false  },
			{ label: 'rIAmmountAfterPostingInput', name:'RIAmmountAfterPostingInput', inTable:  false  },
			{ label: 'rIAmmountAfterPostingOutput', name:'RIAmmountAfterPostingOutput', inTable:  false  },
		]
	};

	// identificationOutput with properties names and labels
	$scope.identificationOutputDefinition = {
		label: 'commonbusinessentities.identification',
		properties : [
			{ label: 'iIdentificationCode', name:'IIdentificationCode' },
		]
	};
	// identificationInput with properties names and labels
	$scope.identificationInputDefinition = {
		label: 'commonbusinessentities.identification',
		properties : [
			{ label: 'iIdentificationCode', name:'IIdentificationCode' },
		]
	};
	// accountOutput with properties names and labels
	$scope.accountOutputDefinition = {
		label: 'corporation.account',
		properties : [
			{ label: 'aAccountNumber', name:'AAccountNumber' },
			{ label: 'aName', name:'AName' },
			{ label: 'aIsTransfer', name:'AIsTransfer' },
			{ label: 'aEntrySide', name:'AEntrySide' },
			{ label: 'aDisplaySide', name:'ADisplaySide' },
		]
	};
	// priceDesignationOutput with properties names and labels
	$scope.priceDesignationOutputDefinition = {
		label: 'stockmanagement.priceDesignation',
		properties : [
			{ label: 'pDPriceDesignation', name:'PDPriceDesignation' },
			{ label: 'pDName', name:'PDName' },
		]
	};
	// accountInput with properties names and labels
	$scope.accountInputDefinition = {
		label: 'corporation.account',
		properties : [
			{ label: 'aAccountNumber', name:'AAccountNumber' },
			{ label: 'aName', name:'AName' },
			{ label: 'aIsTransfer', name:'AIsTransfer' },
			{ label: 'aEntrySide', name:'AEntrySide' },
			{ label: 'aDisplaySide', name:'ADisplaySide' },
		]
	};
	// priceDesignationInput with properties names and labels
	$scope.priceDesignationInputDefinition = {
		label: 'stockmanagement.priceDesignation',
		properties : [
			{ label: 'pDPriceDesignation', name:'PDPriceDesignation' },
			{ label: 'pDName', name:'PDName' },
		]
	};
	// renaming with properties names and labels
	$scope.renamingDefinition = {
		label: 'renaming.renaming',
		properties : [
			{ label: 'rDocumentNumber', name:'RDocumentNumber' },
			{ label: 'rDeliveryDate', name:'RDeliveryDate' },
			{ label: 'rDocumentStatus', name:'RDocumentStatus' },
			{ label: 'rPrintStatus', name:'RPrintStatus' },
			{ label: 'iIdentificationCode', name:'IIdentificationCode' },
			{ label: 'tISDesignation', name:'TISDesignation' },
		]
	};

	// fill table with data
	$scope.items = [];
	$scope.loaded = false;
	var getRenamingItems = function() {
		if(!$scope.loaded && $scope.items.length === 0) {
			$scope.isLoading = true;
			ServiceRenamingItem.query(function(data) {
				$scope.items = data;
				$scope.isLoading = false;
				$scope.loaded = true;
			});
		}
	};
	getRenamingItems();

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

	$scope.$watch('RenamingItemCollection', function() {
		$scope.itemEdit = CheckSelected.checkSelectedInTable($scope.itemEdit, $scope.RenamingItemCollection, $scope.items);
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
			templateUrl: 'renaming/renamingitem/tmplRenamingItemEdit.tpl.html',
			size: 'lg',
			windowClass: 'hmodal-info',
			controller: 'ctrlRenamingItemEdit',
			resolve: {
				itemEdit: function() {
					if(isNew) {
						return new ServiceRenamingItem();
					} else {
						return $scope.itemEdit;
					}
				},
				identificationOutputDefinition: function() {
					return $scope.identificationOutputDefinition;
				},
				identificationInputDefinition: function() {
					return $scope.identificationInputDefinition;
				},
				accountOutputDefinition: function() {
					return $scope.accountOutputDefinition;
				},
				priceDesignationOutputDefinition: function() {
					return $scope.priceDesignationOutputDefinition;
				},
				accountInputDefinition: function() {
					return $scope.accountInputDefinition;
				},
				priceDesignationInputDefinition: function() {
					return $scope.priceDesignationInputDefinition;
				},
				renamingDefinition: function() {
					return $scope.renamingDefinition;
				},
			}
		})
		.result.then(function(result) {
			if(!angular.isDefined(result.id)) {
				ServiceRenamingItem.saveCustom('stockmanagement/renamingitems', result, function(savedObject) {
					$scope.items.unshift(savedObject);
					if($scope.itemEdit !== null) {
						var index = $scope.items.map(function(it) { return it.id; }).indexOf($scope.itemEdit.id);
						$scope.items[index].isSelected = false;
					}
					$scope.itemEdit = angular.extend(savedObject);
					$scope.items[0].isSelected = true;
				});
			 } else {
				 ServiceRenamingItem.updateCustom('stockmanagement/renamingitems/'+result.id, result, function(savedObject) {
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


.controller('ctrlRenamingItemEdit',['$scope', 'Localization', '$modal', '$modalInstance', 'dialogs',
	'ServiceRenamingItem', 'ServiceIdentification', 'ServiceAccount', 'ServicePriceDesignation', 'ServiceRenaming',   'identificationOutputDefinition',  'identificationInputDefinition',  'accountOutputDefinition',  'priceDesignationOutputDefinition',  'accountInputDefinition',  'priceDesignationInputDefinition',  'renamingDefinition',   'itemEdit',
function($scope, Localization, $modal, $modalInstance, dialogs,
	ServiceRenamingItem, ServiceIdentification, ServiceAccount, ServicePriceDesignation, ServiceRenaming,  identificationOutputDefinition,  identificationInputDefinition,  accountOutputDefinition,  priceDesignationOutputDefinition,  accountInputDefinition,  priceDesignationInputDefinition,  renamingDefinition,  itemEdit) {

	// dialog mode
	$scope.mode = 'edit';

	// original item state
	var original = angular.copy(itemEdit);
	// item state
	$scope.itemEdit = angular.copy(original);

	// identificationOutput with properties
	$scope.identificationOutputDefinition = identificationOutputDefinition;
	// identificationInput with properties
	$scope.identificationInputDefinition = identificationInputDefinition;
	// accountOutput with properties
	$scope.accountOutputDefinition = accountOutputDefinition;
	// priceDesignationOutput with properties
	$scope.priceDesignationOutputDefinition = priceDesignationOutputDefinition;
	// accountInput with properties
	$scope.accountInputDefinition = accountInputDefinition;
	// priceDesignationInput with properties
	$scope.priceDesignationInputDefinition = priceDesignationInputDefinition;
	// renaming with properties
	$scope.renamingDefinition = renamingDefinition;

	// datepicker logic

	// date properties
	$scope.openedRIPostingDate = false;

	$scope.open = function($event, opened) {
		$event.preventDefault();
		$event.stopPropagation();
		$scope[opened] = true;
	};



	// Choose identificationOutput
	$scope.openChooseIdentificationOutputDialog = function() {
        $modal.open({
            backdrop: 'static',
            keyboard : false,
            templateUrl: 'commonbusinessentities/renamingitem/tmplIdentificationChoose.tpl.html',
            size: 'lg',
            controller: 'ctrlIdentificationChoose',
            windowClass: 'hmodal-info',
            resolve: {
				itemEdit: function() {
					if(angular.isDefined($scope.itemEdit.identificationOutput)){
						return $scope.itemEdit.identificationOutput;
					}
				}
			}
		}).result.then(function(result) {
			$scope.itemEdit.identificationOutput = angular.copy(result);
		});
    };


	// Choose identificationInput
	$scope.openChooseIdentificationInputDialog = function() {
        $modal.open({
            backdrop: 'static',
            keyboard : false,
            templateUrl: 'commonbusinessentities/renamingitem/tmplIdentificationChoose.tpl.html',
            size: 'lg',
            controller: 'ctrlIdentificationChoose',
            windowClass: 'hmodal-info',
            resolve: {
				itemEdit: function() {
					if(angular.isDefined($scope.itemEdit.identificationInput)){
						return $scope.itemEdit.identificationInput;
					}
				}
			}
		}).result.then(function(result) {
			$scope.itemEdit.identificationInput = angular.copy(result);
		});
    };


	// Choose accountOutput
	$scope.openChooseAccountOutputDialog = function() {
        $modal.open({
            backdrop: 'static',
            keyboard : false,
            templateUrl: 'corporation/renamingitem/tmplAccountChoose.tpl.html',
            size: 'lg',
            controller: 'ctrlAccountChoose',
            windowClass: 'hmodal-info',
            resolve: {
				itemEdit: function() {
					if(angular.isDefined($scope.itemEdit.accountOutput)){
						return $scope.itemEdit.accountOutput;
					}
				}
			}
		}).result.then(function(result) {
			$scope.itemEdit.accountOutput = angular.copy(result);
		});
    };


	// Choose priceDesignationOutput
	$scope.openChoosePriceDesignationOutputDialog = function() {
        $modal.open({
            backdrop: 'static',
            keyboard : false,
            templateUrl: 'stockmanagement/renamingitem/tmplPriceDesignationChoose.tpl.html',
            size: 'lg',
            controller: 'ctrlPriceDesignationChoose',
            windowClass: 'hmodal-info',
            resolve: {
				itemEdit: function() {
					if(angular.isDefined($scope.itemEdit.priceDesignationOutput)){
						return $scope.itemEdit.priceDesignationOutput;
					}
				}
			}
		}).result.then(function(result) {
			$scope.itemEdit.priceDesignationOutput = angular.copy(result);
		});
    };


	// Choose accountInput
	$scope.openChooseAccountInputDialog = function() {
        $modal.open({
            backdrop: 'static',
            keyboard : false,
            templateUrl: 'corporation/renamingitem/tmplAccountChoose.tpl.html',
            size: 'lg',
            controller: 'ctrlAccountChoose',
            windowClass: 'hmodal-info',
            resolve: {
				itemEdit: function() {
					if(angular.isDefined($scope.itemEdit.accountInput)){
						return $scope.itemEdit.accountInput;
					}
				}
			}
		}).result.then(function(result) {
			$scope.itemEdit.accountInput = angular.copy(result);
		});
    };


	// Choose priceDesignationInput
	$scope.openChoosePriceDesignationInputDialog = function() {
        $modal.open({
            backdrop: 'static',
            keyboard : false,
            templateUrl: 'stockmanagement/renamingitem/tmplPriceDesignationChoose.tpl.html',
            size: 'lg',
            controller: 'ctrlPriceDesignationChoose',
            windowClass: 'hmodal-info',
            resolve: {
				itemEdit: function() {
					if(angular.isDefined($scope.itemEdit.priceDesignationInput)){
						return $scope.itemEdit.priceDesignationInput;
					}
				}
			}
		}).result.then(function(result) {
			$scope.itemEdit.priceDesignationInput = angular.copy(result);
		});
    };


	// Choose renaming
	$scope.openChooseRenamingDialog = function() {
        $modal.open({
            backdrop: 'static',
            keyboard : false,
            templateUrl: 'renaming/renamingitem/tmplRenamingChoose.tpl.html',
            size: 'lg',
            controller: 'ctrlRenamingChoose',
            windowClass: 'hmodal-info',
            resolve: {
				itemEdit: function() {
					if(angular.isDefined($scope.itemEdit.renaming)){
						return $scope.itemEdit.renaming;
					}
				}
			}
		}).result.then(function(result) {
			$scope.itemEdit.renaming = angular.copy(result);
		});
    };


	// Save Button
	$scope.save = function() {
		correctDateTime($scope.itemEdit.RIPostingDate);
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
		return                 item.RIOrdinalNumber  &&                 item.RIMeasurementUnitInput  &&                 item.RIMeasurementUnitOutput  &&                 item.RIQuantityForTransfer  &&                 item.RIAddressOutput  ;
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


.controller('ctrlRenamingItemChoose', ['$scope','ServiceRenamingItem', 'dialogs', '$modal', '$modalInstance', 'itemEdit',
function($scope, ServiceRenamingItem, dialogs, $modal,  $modalInstance, itemEdit) {

    // entity with properties
    $scope.itemDefinition = {
        label: 'renaming.renamingItem',
        properties: [
            { label: 'rIOrdinalNumber', name:'RIOrdinalNumber', inTable:  true  },
            { label: 'rIMeasurementUnitInput', name:'RIMeasurementUnitInput', inTable:  true  },
            { label: 'rIMeasurementUnitOutput', name:'RIMeasurementUnitOutput', inTable:  true  },
            { label: 'rIQuantityForTransfer', name:'RIQuantityForTransfer', inTable:  true  },
            { label: 'rIAddressOutput', name:'RIAddressOutput', inTable:  true  },
            { label: 'rIBatchOutput', name:'RIBatchOutput', inTable:  false  },
            { label: 'rIAddressInput', name:'RIAddressInput', inTable:  false  },
            { label: 'rIBatchInput', name:'RIBatchInput', inTable:  false  },
            { label: 'rIStorno', name:'RIStorno', inTable:  false  },
            { label: 'rIQuantityTransfered', name:'RIQuantityTransfered', inTable:  false  },
            { label: 'rIPriceOutput', name:'RIPriceOutput', inTable:  false  },
            { label: 'rIPriceInput', name:'RIPriceInput', inTable:  false  },
            { label: 'rIValueOutput', name:'RIValueOutput', inTable:  false  },
            { label: 'rIValueInput', name:'RIValueInput', inTable:  false  },
            { label: 'rIPostingPositionInput', name:'RIPostingPositionInput', inTable:  false  },
            { label: 'rIPostingPositionOutput', name:'RIPostingPositionOutput', inTable:  false  },
            { label: 'rIPostingDate', name:'RIPostingDate', inTable:  false  },
            { label: 'rIAmmountAfterPostingInput', name:'RIAmmountAfterPostingInput', inTable:  false  },
            { label: 'rIAmmountAfterPostingOutput', name:'RIAmmountAfterPostingOutput', inTable:  false  },
        ]
    };

	$scope.items = [];
	$scope.itemEdit = {};

	// fill table with data
	$scope.loaded = false;
	var getRenamingItems = function() {
		if(!$scope.loaded && $scope.items.length === 0) {
			$scope.isLoading = true;
			ServiceRenamingItem.query(function(data) {
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
	getRenamingItems();

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