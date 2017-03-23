'use strict';

angular.module('Doob.capacitymanagement')


.controller('ctrlCountryCurrency',['$scope', '$rootScope', '$modal', 'dialogs', 'CheckSelected', 'ServiceCountryCurrency',
    function($scope, $rootScope, $modal, dialogs, CheckSelected, ServiceCountryCurrency) {

	// main entity (countryCurrency) properties names and labels
	$scope.itemDefinition = {
		label: 'capacitymanagement.countryCurrency',
		properties: [
			{ label: 'cCDateFrom', name:'CCDateFrom', inTable:  false  },
			{ label: 'cCDateUntil', name:'CCDateUntil', inTable:  false  },
		]
	};

	// country with properties names and labels
	$scope.countryDefinition = {
		label: 'environment.mVCountry',
		properties : [
		]
	};
	// defaultRates with properties names and labels
	$scope.defaultRatesDefinition = {
		label: 'capacitymanagement.rate',
		properties : [
		]
	};
	// sellingPrices with properties names and labels
	$scope.sellingPricesDefinition = {
		label: 'sellingprice.sellingPrice',
		properties : [
			{ label: 'sPPrice', name:'SPPrice' },
			{ label: 'sPDateFrom', name:'SPDateFrom' },
		]
	};

	// fill table with data
	$scope.items = [];
	$scope.loaded = false;
	var getCountryCurrencys = function() {
		if(!$scope.loaded && $scope.items.length === 0) {
			$scope.isLoading = true;
			ServiceCountryCurrency.query(function(data) {
				$scope.items = data;
				$scope.isLoading = false;
				$scope.loaded = true;
			});
		}
	};
	getCountryCurrencys();

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

	$scope.$watch('CountryCurrencyCollection', function() {
		$scope.itemEdit = CheckSelected.checkSelectedInTable($scope.itemEdit, $scope.CountryCurrencyCollection, $scope.items);
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
			templateUrl: 'capacitymanagement/countrycurrency/tmplCountryCurrencyEdit.tpl.html',
			size: 'lg',
			windowClass: 'hmodal-info',
			controller: 'ctrlCountryCurrencyEdit',
			resolve: {
				itemEdit: function() {
					if(isNew) {
						return new ServiceCountryCurrency();
					} else {
						return $scope.itemEdit;
					}
				},
				countryDefinition: function() {
					return $scope.countryDefinition;
				},
				defaultRatesDefinition: function() {
					return $scope.defaultRatesDefinition;
				},
				sellingPricesDefinition: function() {
					return $scope.sellingPricesDefinition;
				},
			}
		})
		.result.then(function(result) {
			if(!angular.isDefined(result.id)) {
				ServiceCountryCurrency.saveCustom('stockmanagement/countrycurrencys', result, function(savedObject) {
					$scope.items.unshift(savedObject);
					if($scope.itemEdit !== null) {
						var index = $scope.items.map(function(it) { return it.id; }).indexOf($scope.itemEdit.id);
						$scope.items[index].isSelected = false;
					}
					$scope.itemEdit = angular.extend(savedObject);
					$scope.items[0].isSelected = true;
				});
			 } else {
				 ServiceCountryCurrency.updateCustom('stockmanagement/countrycurrencys/'+result.id, result, function(savedObject) {
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


.controller('ctrlCountryCurrencyEdit',['$scope', 'Localization', '$modal', '$modalInstance', 'dialogs',
	'ServiceCountryCurrency', 'ServiceMVCountry', 'ServiceRate', 'ServiceSellingPrice',   'countryDefinition',  'defaultRatesDefinition',  'sellingPricesDefinition',   'itemEdit',
function($scope, Localization, $modal, $modalInstance, dialogs,
	ServiceCountryCurrency, ServiceMVCountry, ServiceRate, ServiceSellingPrice,  countryDefinition,  defaultRatesDefinition,  sellingPricesDefinition,  itemEdit) {

	// dialog mode
	$scope.mode = 'edit';

	// original item state
	var original = angular.copy(itemEdit);
	// item state
	$scope.itemEdit = angular.copy(original);

	// country with properties
	$scope.countryDefinition = countryDefinition;
	// defaultRates with properties
	$scope.defaultRatesDefinition = defaultRatesDefinition;
	// sellingPrices with properties
	$scope.sellingPricesDefinition = sellingPricesDefinition;

	// datepicker logic

	// date properties
	$scope.openedCCDateFrom = false;
	$scope.openedCCDateUntil = false;

	$scope.open = function($event, opened) {
		$event.preventDefault();
		$event.stopPropagation();
		$scope[opened] = true;
	};



	// Choose country
	$scope.openChooseCountryDialog = function() {
        $modal.open({
            backdrop: 'static',
            keyboard : false,
            templateUrl: 'environment/countrycurrency/tmplMVCountryChoose.tpl.html',
            size: 'lg',
            controller: 'ctrlMVCountryChoose',
            windowClass: 'hmodal-info',
            resolve: {
				itemEdit: function() {
					if(angular.isDefined($scope.itemEdit.country)){
						return $scope.itemEdit.country;
					}
				}
			}
		}).result.then(function(result) {
			$scope.itemEdit.country = angular.copy(result);
		});
    };


	// Save Button
	$scope.save = function() {
		correctDateTime($scope.itemEdit.CCDateFrom);
		correctDateTime($scope.itemEdit.CCDateUntil);
	   //	delete $scope.itemEdit.isSelected;
        var item;
        var i;
        for(i in $scope.itemEdit.defaultRates) {
    		item = $scope.itemEdit.defaultRates[i];
    		delete item.isSelected;
    	}
        for(i in $scope.itemEdit.sellingPrices) {
    		item = $scope.itemEdit.sellingPrices[i];
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


.controller('ctrlCountryCurrencyChoose', ['$scope','ServiceCountryCurrency', 'dialogs', '$modal', '$modalInstance', 'itemEdit',
function($scope, ServiceCountryCurrency, dialogs, $modal,  $modalInstance, itemEdit) {

    // entity with properties
    $scope.itemDefinition = {
        label: 'capacitymanagement.countryCurrency',
        properties: [
            { label: 'cCDateFrom', name:'CCDateFrom', inTable:  false  },
            { label: 'cCDateUntil', name:'CCDateUntil', inTable:  false  },
        ]
    };

	$scope.items = [];
	$scope.itemEdit = {};

	// fill table with data
	$scope.loaded = false;
	var getCountryCurrencys = function() {
		if(!$scope.loaded && $scope.items.length === 0) {
			$scope.isLoading = true;
			ServiceCountryCurrency.query(function(data) {
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
	getCountryCurrencys();

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