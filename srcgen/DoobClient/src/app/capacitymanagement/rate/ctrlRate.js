'use strict';

angular.module('Doob.capacitymanagement')


.controller('ctrlRate',['$scope', '$rootScope', '$modal', 'dialogs', 'CheckSelected', 'ServiceRate',
    function($scope, $rootScope, $modal, dialogs, CheckSelected, ServiceRate) {

	// main entity (rate) properties names and labels
	$scope.itemDefinition = {
		label: 'capacitymanagement.rate',
		properties: [
			{ label: 'rDateFrom', name:'RDateFrom', inTable:  false  },
			{ label: 'rValue', name:'RValue', inTable:  false  },
		]
	};

	// defaultCurrency with properties names and labels
	$scope.defaultCurrencyDefinition = {
		label: 'capacitymanagement.countryCurrency',
		properties : [
		]
	};

	// fill table with data
	$scope.items = [];
	$scope.loaded = false;
	var getRates = function() {
		if(!$scope.loaded && $scope.items.length === 0) {
			$scope.isLoading = true;
			ServiceRate.query(function(data) {
				$scope.items = data;
				$scope.isLoading = false;
				$scope.loaded = true;
			});
		}
	};
	getRates();

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

	$scope.$watch('RateCollection', function() {
		$scope.itemEdit = CheckSelected.checkSelectedInTable($scope.itemEdit, $scope.RateCollection, $scope.items);
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
			templateUrl: 'capacitymanagement/rate/tmplRateEdit.tpl.html',
			size: 'lg',
			windowClass: 'hmodal-info',
			controller: 'ctrlRateEdit',
			resolve: {
				itemEdit: function() {
					if(isNew) {
						return new ServiceRate();
					} else {
						return $scope.itemEdit;
					}
				},
				defaultCurrencyDefinition: function() {
					return $scope.defaultCurrencyDefinition;
				},
			}
		})
		.result.then(function(result) {
			if(!angular.isDefined(result.id)) {
				ServiceRate.saveCustom('stockmanagement/rates', result, function(savedObject) {
					$scope.items.unshift(savedObject);
					if($scope.itemEdit !== null) {
						var index = $scope.items.map(function(it) { return it.id; }).indexOf($scope.itemEdit.id);
						$scope.items[index].isSelected = false;
					}
					$scope.itemEdit = angular.extend(savedObject);
					$scope.items[0].isSelected = true;
				});
			 } else {
				 ServiceRate.updateCustom('stockmanagement/rates/'+result.id, result, function(savedObject) {
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


.controller('ctrlRateEdit',['$scope', 'Localization', '$modal', '$modalInstance', 'dialogs',
	'ServiceRate', 'ServiceCountryCurrency',   'defaultCurrencyDefinition',   'itemEdit',
function($scope, Localization, $modal, $modalInstance, dialogs,
	ServiceRate, ServiceCountryCurrency,  defaultCurrencyDefinition,  itemEdit) {

	// dialog mode
	$scope.mode = 'edit';

	// original item state
	var original = angular.copy(itemEdit);
	// item state
	$scope.itemEdit = angular.copy(original);

	// defaultCurrency with properties
	$scope.defaultCurrencyDefinition = defaultCurrencyDefinition;

	// datepicker logic

	// date properties
	$scope.openedRDateFrom = false;

	$scope.open = function($event, opened) {
		$event.preventDefault();
		$event.stopPropagation();
		$scope[opened] = true;
	};



	// Choose defaultCurrency
	$scope.openChooseDefaultCurrencyDialog = function() {
        $modal.open({
            backdrop: 'static',
            keyboard : false,
            templateUrl: 'capacitymanagement/rate/tmplCountryCurrencyChoose.tpl.html',
            size: 'lg',
            controller: 'ctrlCountryCurrencyChoose',
            windowClass: 'hmodal-info',
            resolve: {
				itemEdit: function() {
					if(angular.isDefined($scope.itemEdit.defaultCurrency)){
						return $scope.itemEdit.defaultCurrency;
					}
				}
			}
		}).result.then(function(result) {
			$scope.itemEdit.defaultCurrency = angular.copy(result);
		});
    };


	// Save Button
	$scope.save = function() {
		correctDateTime($scope.itemEdit.RDateFrom);
	   //	delete $scope.itemEdit.isSelected;
		$modalInstance.close($scope.itemEdit);
	};

    var correctDateTime = function(date) {
        if(date instanceof Date && date !== '') {
            date.setMinutes(date.getMinutes() - date.getTimezoneOffset());
        }
    };

	$scope.canSave = function() {
        return true;
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


.controller('ctrlRateChoose', ['$scope','ServiceRate', 'dialogs', '$modal', '$modalInstance', 'itemEdit',
function($scope, ServiceRate, dialogs, $modal,  $modalInstance, itemEdit) {

    // entity with properties
    $scope.itemDefinition = {
        label: 'capacitymanagement.rate',
        properties: [
            { label: 'rDateFrom', name:'RDateFrom', inTable:  false  },
            { label: 'rValue', name:'RValue', inTable:  false  },
        ]
    };

	$scope.items = [];
	$scope.itemEdit = {};

	// fill table with data
	$scope.loaded = false;
	var getRates = function() {
		if(!$scope.loaded && $scope.items.length === 0) {
			$scope.isLoading = true;
			ServiceRate.query(function(data) {
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
	getRates();

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