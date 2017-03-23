'use strict';

angular.module('Doob.capacitymanagement')


.controller('ctrlAvailabilityTechnologicalUnits',['$scope', '$rootScope', '$modal', 'dialogs', 'CheckSelected', 'ServiceAvailabilityTechnologicalUnits',
    function($scope, $rootScope, $modal, dialogs, CheckSelected, ServiceAvailabilityTechnologicalUnits) {

	// main entity (availabilityTechnologicalUnits) properties names and labels
	$scope.itemDefinition = {
		label: 'capacitymanagement.availabilityTechnologicalUnits',
		properties: [
			{ label: 'aTUOrdinalNumber', name:'ATUOrdinalNumber', inTable:  true  },
			{ label: 'aTUStartDate', name:'ATUStartDate', inTable:  true  },
			{ label: 'aTUEndDate', name:'ATUEndDate', inTable:  false  },
			{ label: 'aTUCapacityChange', name:'ATUCapacityChange', inTable:  true  },
			{ label: 'aTUHoldupReason', name:'ATUHoldupReason', inTable:  false  },
		]
	};

	// employee with properties names and labels
	$scope.employeeDefinition = {
		label: 'corporation.employee',
		properties : [
			{ label: 'ePersonellNumber', name:'EPersonellNumber' },
			{ label: 'eName', name:'EName' },
			{ label: 'eLastName', name:'ELastName' },
			{ label: 'eDateOfBirth', name:'EDateOfBirth' },
		]
	};
	// technologicalUnit with properties names and labels
	$scope.technologicalUnitDefinition = {
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
	var getAvailabilityTechnologicalUnitss = function() {
		if(!$scope.loaded && $scope.items.length === 0) {
			$scope.isLoading = true;
			ServiceAvailabilityTechnologicalUnits.query(function(data) {
				$scope.items = data;
				$scope.isLoading = false;
				$scope.loaded = true;
			});
		}
	};
	getAvailabilityTechnologicalUnitss();

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

	$scope.$watch('AvailabilityTechnologicalUnitsCollection', function() {
		$scope.itemEdit = CheckSelected.checkSelectedInTable($scope.itemEdit, $scope.AvailabilityTechnologicalUnitsCollection, $scope.items);
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
			templateUrl: 'capacitymanagement/availabilitytechnologicalunits/tmplAvailabilityTechnologicalUnitsEdit.tpl.html',
			size: 'lg',
			windowClass: 'hmodal-info',
			controller: 'ctrlAvailabilityTechnologicalUnitsEdit',
			resolve: {
				itemEdit: function() {
					if(isNew) {
						return new ServiceAvailabilityTechnologicalUnits();
					} else {
						return $scope.itemEdit;
					}
				},
				employeeDefinition: function() {
					return $scope.employeeDefinition;
				},
				technologicalUnitDefinition: function() {
					return $scope.technologicalUnitDefinition;
				},
			}
		})
		.result.then(function(result) {
			if(!angular.isDefined(result.id)) {
				ServiceAvailabilityTechnologicalUnits.saveCustom('stockmanagement/availabilitytechnologicalunitss', result, function(savedObject) {
					$scope.items.unshift(savedObject);
					if($scope.itemEdit !== null) {
						var index = $scope.items.map(function(it) { return it.id; }).indexOf($scope.itemEdit.id);
						$scope.items[index].isSelected = false;
					}
					$scope.itemEdit = angular.extend(savedObject);
					$scope.items[0].isSelected = true;
				});
			 } else {
				 ServiceAvailabilityTechnologicalUnits.updateCustom('stockmanagement/availabilitytechnologicalunitss/'+result.id, result, function(savedObject) {
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


.controller('ctrlAvailabilityTechnologicalUnitsEdit',['$scope', 'Localization', '$modal', '$modalInstance', 'dialogs',
	'ServiceAvailabilityTechnologicalUnits', 'ServiceEmployee', 'ServiceTechnologicalUnit',   'employeeDefinition',  'technologicalUnitDefinition',   'itemEdit',
function($scope, Localization, $modal, $modalInstance, dialogs,
	ServiceAvailabilityTechnologicalUnits, ServiceEmployee, ServiceTechnologicalUnit,  employeeDefinition,  technologicalUnitDefinition,  itemEdit) {

	// dialog mode
	$scope.mode = 'edit';

	// original item state
	var original = angular.copy(itemEdit);
	// item state
	$scope.itemEdit = angular.copy(original);

	// employee with properties
	$scope.employeeDefinition = employeeDefinition;
	// technologicalUnit with properties
	$scope.technologicalUnitDefinition = technologicalUnitDefinition;

	// datepicker logic

	// date properties
	$scope.openedATUStartDate = false;
	$scope.openedATUEndDate = false;

	$scope.open = function($event, opened) {
		$event.preventDefault();
		$event.stopPropagation();
		$scope[opened] = true;
	};



	// Choose employee
	$scope.openChooseEmployeeDialog = function() {
        $modal.open({
            backdrop: 'static',
            keyboard : false,
            templateUrl: 'corporation/availabilitytechnologicalunits/tmplEmployeeChoose.tpl.html',
            size: 'lg',
            controller: 'ctrlEmployeeChoose',
            windowClass: 'hmodal-info',
            resolve: {
				itemEdit: function() {
					if(angular.isDefined($scope.itemEdit.employee)){
						return $scope.itemEdit.employee;
					}
				}
			}
		}).result.then(function(result) {
			$scope.itemEdit.employee = angular.copy(result);
		});
    };


	// Choose technologicalUnit
	$scope.openChooseTechnologicalUnitDialog = function() {
        $modal.open({
            backdrop: 'static',
            keyboard : false,
            templateUrl: 'capacitymanagement/availabilitytechnologicalunits/tmplTechnologicalUnitChoose.tpl.html',
            size: 'lg',
            controller: 'ctrlTechnologicalUnitChoose',
            windowClass: 'hmodal-info',
            resolve: {
				itemEdit: function() {
					if(angular.isDefined($scope.itemEdit.technologicalUnit)){
						return $scope.itemEdit.technologicalUnit;
					}
				}
			}
		}).result.then(function(result) {
			$scope.itemEdit.technologicalUnit = angular.copy(result);
		});
    };


	// Save Button
	$scope.save = function() {
		correctDateTime($scope.itemEdit.ATUStartDate);
		correctDateTime($scope.itemEdit.ATUEndDate);
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
		return                 item.ATUOrdinalNumber  &&                 item.ATUStartDate  &&                 item.ATUCapacityChange  ;
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


.controller('ctrlAvailabilityTechnologicalUnitsChoose', ['$scope','ServiceAvailabilityTechnologicalUnits', 'dialogs', '$modal', '$modalInstance', 'itemEdit',
function($scope, ServiceAvailabilityTechnologicalUnits, dialogs, $modal,  $modalInstance, itemEdit) {

    // entity with properties
    $scope.itemDefinition = {
        label: 'capacitymanagement.availabilityTechnologicalUnits',
        properties: [
            { label: 'aTUOrdinalNumber', name:'ATUOrdinalNumber', inTable:  true  },
            { label: 'aTUStartDate', name:'ATUStartDate', inTable:  true  },
            { label: 'aTUEndDate', name:'ATUEndDate', inTable:  false  },
            { label: 'aTUCapacityChange', name:'ATUCapacityChange', inTable:  true  },
            { label: 'aTUHoldupReason', name:'ATUHoldupReason', inTable:  false  },
        ]
    };

	$scope.items = [];
	$scope.itemEdit = {};

	// fill table with data
	$scope.loaded = false;
	var getAvailabilityTechnologicalUnitss = function() {
		if(!$scope.loaded && $scope.items.length === 0) {
			$scope.isLoading = true;
			ServiceAvailabilityTechnologicalUnits.query(function(data) {
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
	getAvailabilityTechnologicalUnitss();

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