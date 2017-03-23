'use strict';

angular.module('Doob.initialization')


.controller('ctrlGender',['$scope', '$rootScope', '$modal', 'dialogs', 'CheckSelected', 'ServiceGender',
    function($scope, $rootScope, $modal, dialogs, CheckSelected, ServiceGender) {

	// main entity (gender) properties names and labels
	$scope.itemDefinition = {
		label: 'initialization.gender',
		properties: [
			{ label: 'gName', name:'GName', inTable:  true  },
			{ label: 'gActive', name:'GActive', inTable:  false  },
		]
	};

	// customers with properties names and labels
	$scope.customersDefinition = {
		label: 'order.customer',
		properties : [
			{ label: 'cFirstName', name:'CFirstName' },
			{ label: 'cLastName', name:'CLastName' },
		]
	};
	// employees with properties names and labels
	$scope.employeesDefinition = {
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
	var getGenders = function() {
		if(!$scope.loaded && $scope.items.length === 0) {
			$scope.isLoading = true;
			ServiceGender.query(function(data) {
				$scope.items = data;
				$scope.isLoading = false;
				$scope.loaded = true;
			});
		}
	};
	getGenders();

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

	$scope.$watch('GenderCollection', function() {
		$scope.itemEdit = CheckSelected.checkSelectedInTable($scope.itemEdit, $scope.GenderCollection, $scope.items);
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
			templateUrl: 'initialization/gender/tmplGenderEdit.tpl.html',
			size: 'lg',
			windowClass: 'hmodal-info',
			controller: 'ctrlGenderEdit',
			resolve: {
				itemEdit: function() {
					if(isNew) {
						return new ServiceGender();
					} else {
						return $scope.itemEdit;
					}
				},
				customersDefinition: function() {
					return $scope.customersDefinition;
				},
				employeesDefinition: function() {
					return $scope.employeesDefinition;
				},
			}
		})
		.result.then(function(result) {
			if(!angular.isDefined(result.id)) {
				ServiceGender.saveCustom('stockmanagement/genders', result, function(savedObject) {
					$scope.items.unshift(savedObject);
					if($scope.itemEdit !== null) {
						var index = $scope.items.map(function(it) { return it.id; }).indexOf($scope.itemEdit.id);
						$scope.items[index].isSelected = false;
					}
					$scope.itemEdit = angular.extend(savedObject);
					$scope.items[0].isSelected = true;
				});
			 } else {
				 ServiceGender.updateCustom('stockmanagement/genders/'+result.id, result, function(savedObject) {
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


.controller('ctrlGenderEdit',['$scope', 'Localization', '$modal', '$modalInstance', 'dialogs',
	'ServiceGender', 'ServiceCustomer', 'ServiceEmployee',   'customersDefinition',  'employeesDefinition',   'itemEdit',
function($scope, Localization, $modal, $modalInstance, dialogs,
	ServiceGender, ServiceCustomer, ServiceEmployee,  customersDefinition,  employeesDefinition,  itemEdit) {

	// dialog mode
	$scope.mode = 'edit';

	// original item state
	var original = angular.copy(itemEdit);
	// item state
	$scope.itemEdit = angular.copy(original);

	// customers with properties
	$scope.customersDefinition = customersDefinition;
	// employees with properties
	$scope.employeesDefinition = employeesDefinition;

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
        for(i in $scope.itemEdit.customers) {
    		item = $scope.itemEdit.customers[i];
    		delete item.isSelected;
    	}
        for(i in $scope.itemEdit.employees) {
    		item = $scope.itemEdit.employees[i];
    		delete item.isSelected;
    	}
		$modalInstance.close($scope.itemEdit);
	};


	$scope.canSave = function() {
		var item = $scope.itemEdit;
		return                 item.GName  ;
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


.controller('ctrlGenderChoose', ['$scope','ServiceGender', 'dialogs', '$modal', '$modalInstance', 'itemEdit',
function($scope, ServiceGender, dialogs, $modal,  $modalInstance, itemEdit) {

    // entity with properties
    $scope.itemDefinition = {
        label: 'initialization.gender',
        properties: [
            { label: 'gName', name:'GName', inTable:  true  },
            { label: 'gActive', name:'GActive', inTable:  false  },
        ]
    };

	$scope.items = [];
	$scope.itemEdit = {};

	// fill table with data
	$scope.loaded = false;
	var getGenders = function() {
		if(!$scope.loaded && $scope.items.length === 0) {
			$scope.isLoading = true;
			ServiceGender.query(function(data) {
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
	getGenders();

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