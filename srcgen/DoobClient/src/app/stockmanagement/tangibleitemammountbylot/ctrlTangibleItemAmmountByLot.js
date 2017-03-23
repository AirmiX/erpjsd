'use strict';

angular.module('Doob.stockmanagement')


.controller('ctrlTangibleItemAmmountByLot',['$scope', '$rootScope', '$modal', 'dialogs', 'CheckSelected', 'ServiceTangibleItemAmmountByLot',
    function($scope, $rootScope, $modal, dialogs, CheckSelected, ServiceTangibleItemAmmountByLot) {

	// main entity (tangibleItemAmmountByLot) properties names and labels
	$scope.itemDefinition = {
		label: 'stockmanagement.tangibleItemAmmountByLot',
		properties: [
			{ label: 'tIALLotNumber', name:'TIALLotNumber', inTable:  true  },
			{ label: 'tIALLocationAddress', name:'TIALLocationAddress', inTable:  true  },
			{ label: 'tIALAvailableAmmount', name:'TIALAvailableAmmount', inTable:  true  },
			{ label: 'tIALAddressCapacity', name:'TIALAddressCapacity', inTable:  false  },
			{ label: 'tIALActivationDate', name:'TIALActivationDate', inTable:  true  },
			{ label: 'tIALQuantity', name:'TIALQuantity', inTable:  true  },
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
	var getTangibleItemAmmountByLots = function() {
		if(!$scope.loaded && $scope.items.length === 0) {
			$scope.isLoading = true;
			ServiceTangibleItemAmmountByLot.query(function(data) {
				$scope.items = data;
				$scope.isLoading = false;
				$scope.loaded = true;
			});
		}
	};
	getTangibleItemAmmountByLots();

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

	$scope.$watch('TangibleItemAmmountByLotCollection', function() {
		$scope.itemEdit = CheckSelected.checkSelectedInTable($scope.itemEdit, $scope.TangibleItemAmmountByLotCollection, $scope.items);
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
			templateUrl: 'stockmanagement/tangibleitemammountbylot/tmplTangibleItemAmmountByLotEdit.tpl.html',
			size: 'lg',
			windowClass: 'hmodal-info',
			controller: 'ctrlTangibleItemAmmountByLotEdit',
			resolve: {
				itemEdit: function() {
					if(isNew) {
						return new ServiceTangibleItemAmmountByLot();
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
				ServiceTangibleItemAmmountByLot.saveCustom('stockmanagement/tangibleitemammountbylots', result, function(savedObject) {
					$scope.items.unshift(savedObject);
					if($scope.itemEdit !== null) {
						var index = $scope.items.map(function(it) { return it.id; }).indexOf($scope.itemEdit.id);
						$scope.items[index].isSelected = false;
					}
					$scope.itemEdit = angular.extend(savedObject);
					$scope.items[0].isSelected = true;
				});
			 } else {
				 ServiceTangibleItemAmmountByLot.updateCustom('stockmanagement/tangibleitemammountbylots/'+result.id, result, function(savedObject) {
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


.controller('ctrlTangibleItemAmmountByLotEdit',['$scope', 'Localization', '$modal', '$modalInstance', 'dialogs',
	'ServiceTangibleItemAmmountByLot', 'ServiceTangibleItemCondition',   'tangibleItemConditionDefinition',   'itemEdit',
function($scope, Localization, $modal, $modalInstance, dialogs,
	ServiceTangibleItemAmmountByLot, ServiceTangibleItemCondition,  tangibleItemConditionDefinition,  itemEdit) {

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
	$scope.openedTIALActivationDate = false;

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
            templateUrl: 'stockmanagement/tangibleitemammountbylot/tmplTangibleItemConditionChoose.tpl.html',
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
		correctDateTime($scope.itemEdit.TIALActivationDate);
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
		return                 item.TIALLotNumber  &&                 item.TIALLocationAddress  &&                 item.TIALAvailableAmmount  &&                 item.TIALActivationDate  &&                 item.TIALQuantity  ;
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


.controller('ctrlTangibleItemAmmountByLotChoose', ['$scope','ServiceTangibleItemAmmountByLot', 'dialogs', '$modal', '$modalInstance', 'itemEdit',
function($scope, ServiceTangibleItemAmmountByLot, dialogs, $modal,  $modalInstance, itemEdit) {

    // entity with properties
    $scope.itemDefinition = {
        label: 'stockmanagement.tangibleItemAmmountByLot',
        properties: [
            { label: 'tIALLotNumber', name:'TIALLotNumber', inTable:  true  },
            { label: 'tIALLocationAddress', name:'TIALLocationAddress', inTable:  true  },
            { label: 'tIALAvailableAmmount', name:'TIALAvailableAmmount', inTable:  true  },
            { label: 'tIALAddressCapacity', name:'TIALAddressCapacity', inTable:  false  },
            { label: 'tIALActivationDate', name:'TIALActivationDate', inTable:  true  },
            { label: 'tIALQuantity', name:'TIALQuantity', inTable:  true  },
        ]
    };

	$scope.items = [];
	$scope.itemEdit = {};

	// fill table with data
	$scope.loaded = false;
	var getTangibleItemAmmountByLots = function() {
		if(!$scope.loaded && $scope.items.length === 0) {
			$scope.isLoading = true;
			ServiceTangibleItemAmmountByLot.query(function(data) {
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
	getTangibleItemAmmountByLots();

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