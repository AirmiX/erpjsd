'use strict';

angular.module('Doob.environment')


.controller('ctrlMVCountry',['$scope', '$rootScope', '$modal', 'dialogs', 'CheckSelected', 'ServiceMVCountry',
    function($scope, $rootScope, $modal, dialogs, CheckSelected, ServiceMVCountry) {

	// main entity (mVCountry) properties names and labels
	$scope.itemDefinition = {
		label: 'environment.mVCountry',
		properties: [
			{ label: 'tUCode', name:'TUCode', inTable:  false  },
			{ label: 'tUIsLeaf', name:'TUIsLeaf', inTable:  false  },
			{ label: 'tUName', name:'TUName', inTable:  false  },
			{ label: 'tUNumberOfSubordinateTus', name:'TUNumberOfSubordinateTus', inTable:  false  },
			{ label: 'tUShortName', name:'TUShortName', inTable:  false  },
		]
	};

	// currencies with properties names and labels
	$scope.currenciesDefinition = {
		label: 'capacitymanagement.countryCurrency',
		properties : [
		]
	};
	// employeesBornCountry with properties names and labels
	$scope.employeesBornCountryDefinition = {
		label: 'corporation.employee',
		properties : [
			{ label: 'ePersonellNumber', name:'EPersonellNumber' },
			{ label: 'eName', name:'EName' },
			{ label: 'eLastName', name:'ELastName' },
			{ label: 'eDateOfBirth', name:'EDateOfBirth' },
		]
	};

	// fill table with data
	$scope.items = [];
	$scope.loaded = false;
	var getMVCountrys = function() {
		if(!$scope.loaded && $scope.items.length === 0) {
			$scope.isLoading = true;
			ServiceMVCountry.query(function(data) {
				$scope.items = data;
				$scope.isLoading = false;
				$scope.loaded = true;
			});
		}
	};
	getMVCountrys();

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

	$scope.$watch('MVCountryCollection', function() {
		$scope.itemEdit = CheckSelected.checkSelectedInTable($scope.itemEdit, $scope.MVCountryCollection, $scope.items);
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
			templateUrl: 'environment/mvcountry/tmplMVCountryEdit.tpl.html',
			size: 'lg',
			windowClass: 'hmodal-info',
			controller: 'ctrlMVCountryEdit',
			resolve: {
				itemEdit: function() {
					if(isNew) {
						return new ServiceMVCountry();
					} else {
						return $scope.itemEdit;
					}
				},
				currenciesDefinition: function() {
					return $scope.currenciesDefinition;
				},
				employeesBornCountryDefinition: function() {
					return $scope.employeesBornCountryDefinition;
				},
			}
		})
		.result.then(function(result) {
			if(!angular.isDefined(result.id)) {
				ServiceMVCountry.saveCustom('stockmanagement/mvcountrys', result, function(savedObject) {
					$scope.items.unshift(savedObject);
					if($scope.itemEdit !== null) {
						var index = $scope.items.map(function(it) { return it.id; }).indexOf($scope.itemEdit.id);
						$scope.items[index].isSelected = false;
					}
					$scope.itemEdit = angular.extend(savedObject);
					$scope.items[0].isSelected = true;
				});
			 } else {
				 ServiceMVCountry.updateCustom('stockmanagement/mvcountrys/'+result.id, result, function(savedObject) {
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


.controller('ctrlMVCountryEdit',['$scope', 'Localization', '$modal', '$modalInstance', 'dialogs',
	'ServiceMVCountry', 'ServiceCountryCurrency', 'ServiceEmployee',   'currenciesDefinition',  'employeesBornCountryDefinition',   'itemEdit',
function($scope, Localization, $modal, $modalInstance, dialogs,
	ServiceMVCountry, ServiceCountryCurrency, ServiceEmployee,  currenciesDefinition,  employeesBornCountryDefinition,  itemEdit) {

	// dialog mode
	$scope.mode = 'edit';

	// original item state
	var original = angular.copy(itemEdit);
	// item state
	$scope.itemEdit = angular.copy(original);

	// currencies with properties
	$scope.currenciesDefinition = currenciesDefinition;
	// employeesBornCountry with properties
	$scope.employeesBornCountryDefinition = employeesBornCountryDefinition;

	// datepicker logic

	// date properties

	$scope.open = function($event, opened) {
		$event.preventDefault();
		$event.stopPropagation();
		$scope[opened] = true;
	};



	// Save Button
	$scope.save = function() {
	   //	delete $scope.itemEdit.isSelected;
        var item;
        var i;
        for(i in $scope.itemEdit.currencies) {
    		item = $scope.itemEdit.currencies[i];
    		delete item.isSelected;
    	}
        for(i in $scope.itemEdit.employeesBornCountry) {
    		item = $scope.itemEdit.employeesBornCountry[i];
    		delete item.isSelected;
    	}
		$modalInstance.close($scope.itemEdit);
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


.controller('ctrlMVCountryChoose', ['$scope','ServiceMVCountry', 'dialogs', '$modal', '$modalInstance', 'itemEdit',
function($scope, ServiceMVCountry, dialogs, $modal,  $modalInstance, itemEdit) {

    // entity with properties
    $scope.itemDefinition = {
        label: 'environment.mVCountry',
        properties: [
            { label: 'tUCode', name:'TUCode', inTable:  false  },
            { label: 'tUIsLeaf', name:'TUIsLeaf', inTable:  false  },
            { label: 'tUName', name:'TUName', inTable:  false  },
            { label: 'tUNumberOfSubordinateTus', name:'TUNumberOfSubordinateTus', inTable:  false  },
            { label: 'tUShortName', name:'TUShortName', inTable:  false  },
        ]
    };

	$scope.items = [];
	$scope.itemEdit = {};

	// fill table with data
	$scope.loaded = false;
	var getMVCountrys = function() {
		if(!$scope.loaded && $scope.items.length === 0) {
			$scope.isLoading = true;
			ServiceMVCountry.query(function(data) {
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
	getMVCountrys();

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