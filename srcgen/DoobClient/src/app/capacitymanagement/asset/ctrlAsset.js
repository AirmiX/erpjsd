'use strict';

angular.module('Doob.capacitymanagement')


.controller('ctrlAsset',['$scope', '$rootScope', '$modal', 'dialogs', 'CheckSelected', 'ServiceAsset',
    function($scope, $rootScope, $modal, dialogs, CheckSelected, ServiceAsset) {

	// main entity (asset) properties names and labels
	$scope.itemDefinition = {
		label: 'capacitymanagement.asset',
		properties: [
			{ label: 'aInventoryNumber', name:'AInventoryNumber', inTable:  true  },
			{ label: 'aBuyingValue', name:'ABuyingValue', inTable:  false  },
			{ label: 'aPurchaseValueInitialState', name:'APurchaseValueInitialState', inTable:  false  },
			{ label: 'aDepreciatedValueInitialState', name:'ADepreciatedValueInitialState', inTable:  false  },
			{ label: 'aPurchaseValue', name:'APurchaseValue', inTable:  false  },
			{ label: 'aDepreciatedValue', name:'ADepreciatedValue', inTable:  false  },
			{ label: 'aCurrentValue', name:'ACurrentValue', inTable:  false  },
			{ label: 'aCurrentAmortization', name:'ACurrentAmortization', inTable:  false  },
			{ label: 'aCurrentRevaluation', name:'ACurrentRevaluation', inTable:  false  },
			{ label: 'aRemark', name:'ARemark', inTable:  false  },
			{ label: 'aPurchasingDate', name:'APurchasingDate', inTable:  true  },
			{ label: 'aExchangeRate', name:'AExchangeRate', inTable:  false  },
			{ label: 'aExchangeRateDate', name:'AExchangeRateDate', inTable:  false  },
			{ label: 'aBuyingValueVal', name:'ABuyingValueVal', inTable:  false  },
			{ label: 'aStatus', name:'AStatus', inTable:  false  },
			{ label: 'aAmortizationRate', name:'AAmortizationRate', inTable:  false  },
			{ label: 'aAmortizationType', name:'AAmortizationType', inTable:  false  },
			{ label: 'aQuantity', name:'AQuantity', inTable:  true  },
			{ label: 'aAmortizationDate', name:'AAmortizationDate', inTable:  false  },
			{ label: 'aRevaluationDate', name:'ARevaluationDate', inTable:  false  },
			{ label: 'aDeactivationDate', name:'ADeactivationDate', inTable:  false  },
			{ label: 'aActivationDate', name:'AActivationDate', inTable:  false  },
			{ label: 'aDescription', name:'ADescription', inTable:  false  },
			{ label: 'aProductionYear', name:'AProductionYear', inTable:  false  },
			{ label: 'aProductCode', name:'AProductCode', inTable:  false  },
			{ label: 'aProductName', name:'AProductName', inTable:  false  },
			{ label: 'aSupplierCode', name:'ASupplierCode', inTable:  false  },
			{ label: 'aSupplierName', name:'ASupplierName', inTable:  false  },
			{ label: 'aPosition', name:'APosition', inTable:  false  },
			{ label: 'aEnteredBy', name:'AEnteredBy', inTable:  false  },
			{ label: 'aEntryDate', name:'AEntryDate', inTable:  false  },
			{ label: 'aChangedBy', name:'AChangedBy', inTable:  false  },
			{ label: 'aChangeDate', name:'AChangeDate', inTable:  false  },
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

	// fill table with data
	$scope.items = [];
	$scope.loaded = false;
	var getAssets = function() {
		if(!$scope.loaded && $scope.items.length === 0) {
			$scope.isLoading = true;
			ServiceAsset.query(function(data) {
				$scope.items = data;
				$scope.isLoading = false;
				$scope.loaded = true;
			});
		}
	};
	getAssets();

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

	$scope.$watch('AssetCollection', function() {
		$scope.itemEdit = CheckSelected.checkSelectedInTable($scope.itemEdit, $scope.AssetCollection, $scope.items);
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
			templateUrl: 'capacitymanagement/asset/tmplAssetEdit.tpl.html',
			size: 'lg',
			windowClass: 'hmodal-info',
			controller: 'ctrlAssetEdit',
			resolve: {
				itemEdit: function() {
					if(isNew) {
						return new ServiceAsset();
					} else {
						return $scope.itemEdit;
					}
				},
				technologicalUnitsDefinition: function() {
					return $scope.technologicalUnitsDefinition;
				},
			}
		})
		.result.then(function(result) {
			if(!angular.isDefined(result.id)) {
				ServiceAsset.saveCustom('stockmanagement/assets', result, function(savedObject) {
					$scope.items.unshift(savedObject);
					if($scope.itemEdit !== null) {
						var index = $scope.items.map(function(it) { return it.id; }).indexOf($scope.itemEdit.id);
						$scope.items[index].isSelected = false;
					}
					$scope.itemEdit = angular.extend(savedObject);
					$scope.items[0].isSelected = true;
				});
			 } else {
				 ServiceAsset.updateCustom('stockmanagement/assets/'+result.id, result, function(savedObject) {
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


.controller('ctrlAssetEdit',['$scope', 'Localization', '$modal', '$modalInstance', 'dialogs',
	'ServiceAsset', 'ServiceTechnologicalUnit',   'technologicalUnitsDefinition',   'itemEdit',
function($scope, Localization, $modal, $modalInstance, dialogs,
	ServiceAsset, ServiceTechnologicalUnit,  technologicalUnitsDefinition,  itemEdit) {

	// dialog mode
	$scope.mode = 'edit';

	// original item state
	var original = angular.copy(itemEdit);
	// item state
	$scope.itemEdit = angular.copy(original);

	// technologicalUnits with properties
	$scope.technologicalUnitsDefinition = technologicalUnitsDefinition;

	// datepicker logic

	// date properties
	$scope.openedAPurchasingDate = false;
	$scope.openedAExchangeRateDate = false;
	$scope.openedAAmortizationDate = false;
	$scope.openedARevaluationDate = false;
	$scope.openedADeactivationDate = false;
	$scope.openedAActivationDate = false;
	$scope.openedAEntryDate = false;

	$scope.open = function($event, opened) {
		$event.preventDefault();
		$event.stopPropagation();
		$scope[opened] = true;
	};



	// Save Button
	$scope.save = function() {
		correctDateTime($scope.itemEdit.APurchasingDate);
		correctDateTime($scope.itemEdit.AExchangeRateDate);
		correctDateTime($scope.itemEdit.AAmortizationDate);
		correctDateTime($scope.itemEdit.ARevaluationDate);
		correctDateTime($scope.itemEdit.ADeactivationDate);
		correctDateTime($scope.itemEdit.AActivationDate);
		correctDateTime($scope.itemEdit.AEntryDate);
	   //	delete $scope.itemEdit.isSelected;
        var item;
        var i;
        for(i in $scope.itemEdit.technologicalUnits) {
    		item = $scope.itemEdit.technologicalUnits[i];
    		delete item.isSelected;
    	}
		$modalInstance.close($scope.itemEdit);
	};

    var correctDateTime = function(date) {
        if(date instanceof Date && date !== '') {
            date.setMinutes(date.getMinutes() - date.getTimezoneOffset());
        }
    };

	$scope.canSave = function() {
		var item = $scope.itemEdit;
		return                 item.AInventoryNumber  &&                 item.APurchasingDate  &&                 item.AQuantity  ;
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


.controller('ctrlAssetChoose', ['$scope','ServiceAsset', 'dialogs', '$modal', '$modalInstance', 'itemEdit',
function($scope, ServiceAsset, dialogs, $modal,  $modalInstance, itemEdit) {

    // entity with properties
    $scope.itemDefinition = {
        label: 'capacitymanagement.asset',
        properties: [
            { label: 'aInventoryNumber', name:'AInventoryNumber', inTable:  true  },
            { label: 'aBuyingValue', name:'ABuyingValue', inTable:  false  },
            { label: 'aPurchaseValueInitialState', name:'APurchaseValueInitialState', inTable:  false  },
            { label: 'aDepreciatedValueInitialState', name:'ADepreciatedValueInitialState', inTable:  false  },
            { label: 'aPurchaseValue', name:'APurchaseValue', inTable:  false  },
            { label: 'aDepreciatedValue', name:'ADepreciatedValue', inTable:  false  },
            { label: 'aCurrentValue', name:'ACurrentValue', inTable:  false  },
            { label: 'aCurrentAmortization', name:'ACurrentAmortization', inTable:  false  },
            { label: 'aCurrentRevaluation', name:'ACurrentRevaluation', inTable:  false  },
            { label: 'aRemark', name:'ARemark', inTable:  false  },
            { label: 'aPurchasingDate', name:'APurchasingDate', inTable:  true  },
            { label: 'aExchangeRate', name:'AExchangeRate', inTable:  false  },
            { label: 'aExchangeRateDate', name:'AExchangeRateDate', inTable:  false  },
            { label: 'aBuyingValueVal', name:'ABuyingValueVal', inTable:  false  },
            { label: 'aStatus', name:'AStatus', inTable:  false  },
            { label: 'aAmortizationRate', name:'AAmortizationRate', inTable:  false  },
            { label: 'aAmortizationType', name:'AAmortizationType', inTable:  false  },
            { label: 'aQuantity', name:'AQuantity', inTable:  true  },
            { label: 'aAmortizationDate', name:'AAmortizationDate', inTable:  false  },
            { label: 'aRevaluationDate', name:'ARevaluationDate', inTable:  false  },
            { label: 'aDeactivationDate', name:'ADeactivationDate', inTable:  false  },
            { label: 'aActivationDate', name:'AActivationDate', inTable:  false  },
            { label: 'aDescription', name:'ADescription', inTable:  false  },
            { label: 'aProductionYear', name:'AProductionYear', inTable:  false  },
            { label: 'aProductCode', name:'AProductCode', inTable:  false  },
            { label: 'aProductName', name:'AProductName', inTable:  false  },
            { label: 'aSupplierCode', name:'ASupplierCode', inTable:  false  },
            { label: 'aSupplierName', name:'ASupplierName', inTable:  false  },
            { label: 'aPosition', name:'APosition', inTable:  false  },
            { label: 'aEnteredBy', name:'AEnteredBy', inTable:  false  },
            { label: 'aEntryDate', name:'AEntryDate', inTable:  false  },
            { label: 'aChangedBy', name:'AChangedBy', inTable:  false  },
            { label: 'aChangeDate', name:'AChangeDate', inTable:  false  },
        ]
    };

	$scope.items = [];
	$scope.itemEdit = {};

	// fill table with data
	$scope.loaded = false;
	var getAssets = function() {
		if(!$scope.loaded && $scope.items.length === 0) {
			$scope.isLoading = true;
			ServiceAsset.query(function(data) {
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
	getAssets();

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