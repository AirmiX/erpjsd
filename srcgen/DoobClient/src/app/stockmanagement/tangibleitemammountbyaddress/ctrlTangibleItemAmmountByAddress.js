'use strict';

angular.module('Doob.stockmanagement')


.controller('ctrlTangibleItemAmmountByAddress',['$scope', '$rootScope', '$modal', 'dialogs', 'CheckSelected', 'ServiceTangibleItemAmmountByAddress',
    function($scope, $rootScope, $modal, dialogs, CheckSelected, ServiceTangibleItemAmmountByAddress) {

	// main entity (tangibleItemAmmountByAddress) properties names and labels
	$scope.itemDefinition = {
		label: 'stockmanagement.tangibleItemAmmountByAddress',
		properties: [
			{ label: 'tIAALocationAddress', name:'TIAALocationAddress', inTable:  true  },
			{ label: 'tIAAAvailableAmmount', name:'TIAAAvailableAmmount', inTable:  true  },
			{ label: 'tIAAAddressCapacity', name:'TIAAAddressCapacity', inTable:  false  },
			{ label: 'tIAAActivationDate', name:'TIAAActivationDate', inTable:  true  },
			{ label: 'tIAAQuantity', name:'TIAAQuantity', inTable:  true  },
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

	// fill table with data
	$scope.items = [];
	$scope.loaded = false;
	var getTangibleItemAmmountByAddresss = function() {
		if(!$scope.loaded && $scope.items.length === 0) {
			$scope.isLoading = true;
			ServiceTangibleItemAmmountByAddress.query(function(data) {
				$scope.items = data;
				$scope.isLoading = false;
				$scope.loaded = true;
			});
		}
	};
	getTangibleItemAmmountByAddresss();

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

	$scope.$watch('TangibleItemAmmountByAddressCollection', function() {
		$scope.itemEdit = CheckSelected.checkSelectedInTable($scope.itemEdit, $scope.TangibleItemAmmountByAddressCollection, $scope.items);
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
			templateUrl: 'stockmanagement/tangibleitemammountbyaddress/tmplTangibleItemAmmountByAddressEdit.tpl.html',
			size: 'lg',
			windowClass: 'hmodal-info',
			controller: 'ctrlTangibleItemAmmountByAddressEdit',
			resolve: {
				itemEdit: function() {
					if(isNew) {
						return new ServiceTangibleItemAmmountByAddress();
					} else {
						return $scope.itemEdit;
					}
				},
				tangibleItemConditionDefinition: function() {
					return $scope.tangibleItemConditionDefinition;
				},
			}
		})
		.result.then(function(result) {
			if(!angular.isDefined(result.id)) {
				ServiceTangibleItemAmmountByAddress.saveCustom('stockmanagement/tangibleitemammountbyaddresss', result, function(savedObject) {
					$scope.items.unshift(savedObject);
					if($scope.itemEdit !== null) {
						var index = $scope.items.map(function(it) { return it.id; }).indexOf($scope.itemEdit.id);
						$scope.items[index].isSelected = false;
					}
					$scope.itemEdit = angular.extend(savedObject);
					$scope.items[0].isSelected = true;
				});
			 } else {
				 ServiceTangibleItemAmmountByAddress.updateCustom('stockmanagement/tangibleitemammountbyaddresss/'+result.id, result, function(savedObject) {
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


.controller('ctrlTangibleItemAmmountByAddressEdit',['$scope', 'Localization', '$modal', '$modalInstance', 'dialogs',
	'ServiceTangibleItemAmmountByAddress', 'ServiceTangibleItemCondition',   'tangibleItemConditionDefinition',   'itemEdit',
function($scope, Localization, $modal, $modalInstance, dialogs,
	ServiceTangibleItemAmmountByAddress, ServiceTangibleItemCondition,  tangibleItemConditionDefinition,  itemEdit) {

	// dialog mode
	$scope.mode = 'edit';

	// original item state
	var original = angular.copy(itemEdit);
	// item state
	$scope.itemEdit = angular.copy(original);

	// tangibleItemCondition with properties
	$scope.tangibleItemConditionDefinition = tangibleItemConditionDefinition;

	// datepicker logic

	// date properties
	$scope.openedTIAAActivationDate = false;

	$scope.open = function($event, opened) {
		$event.preventDefault();
		$event.stopPropagation();
		$scope[opened] = true;
	};



	// Choose tangibleItemCondition
	$scope.openChooseTangibleItemConditionDialog = function() {
        $modal.open({
            backdrop: 'static',
            keyboard : false,
            templateUrl: 'stockmanagement/tangibleitemammountbyaddress/tmplTangibleItemConditionChoose.tpl.html',
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


	// Save Button
	$scope.save = function() {
		correctDateTime($scope.itemEdit.TIAAActivationDate);
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
		return                 item.TIAALocationAddress  &&                 item.TIAAAvailableAmmount  &&                 item.TIAAActivationDate  &&                 item.TIAAQuantity  ;
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


.controller('ctrlTangibleItemAmmountByAddressChoose', ['$scope','ServiceTangibleItemAmmountByAddress', 'dialogs', '$modal', '$modalInstance', 'itemEdit',
function($scope, ServiceTangibleItemAmmountByAddress, dialogs, $modal,  $modalInstance, itemEdit) {

    // entity with properties
    $scope.itemDefinition = {
        label: 'stockmanagement.tangibleItemAmmountByAddress',
        properties: [
            { label: 'tIAALocationAddress', name:'TIAALocationAddress', inTable:  true  },
            { label: 'tIAAAvailableAmmount', name:'TIAAAvailableAmmount', inTable:  true  },
            { label: 'tIAAAddressCapacity', name:'TIAAAddressCapacity', inTable:  false  },
            { label: 'tIAAActivationDate', name:'TIAAActivationDate', inTable:  true  },
            { label: 'tIAAQuantity', name:'TIAAQuantity', inTable:  true  },
        ]
    };

	$scope.items = [];
	$scope.itemEdit = {};

	// fill table with data
	$scope.loaded = false;
	var getTangibleItemAmmountByAddresss = function() {
		if(!$scope.loaded && $scope.items.length === 0) {
			$scope.isLoading = true;
			ServiceTangibleItemAmmountByAddress.query(function(data) {
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
	getTangibleItemAmmountByAddresss();

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