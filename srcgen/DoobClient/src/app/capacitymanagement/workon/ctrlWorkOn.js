'use strict';

angular.module('Doob.capacitymanagement')


.controller('ctrlWorkOn',['$scope', '$rootScope', '$modal', 'dialogs', 'CheckSelected', 'ServiceWorkOn',
    function($scope, $rootScope, $modal, dialogs, CheckSelected, ServiceWorkOn) {

	// main entity (workOn) properties names and labels
	$scope.itemDefinition = {
		label: 'capacitymanagement.workOn',
		properties: [
			{ label: 'wOEngageTime', name:'WOEngageTime', inTable:  false  },
			{ label: 'wOFromDate', name:'WOFromDate', inTable:  false  },
			{ label: 'wOToDate', name:'WOToDate', inTable:  false  },
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
	var getWorkOns = function() {
		if(!$scope.loaded && $scope.items.length === 0) {
			$scope.isLoading = true;
			ServiceWorkOn.query(function(data) {
				$scope.items = data;
				$scope.isLoading = false;
				$scope.loaded = true;
			});
		}
	};
	getWorkOns();

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

	$scope.$watch('WorkOnCollection', function() {
		$scope.itemEdit = CheckSelected.checkSelectedInTable($scope.itemEdit, $scope.WorkOnCollection, $scope.items);
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
			templateUrl: 'capacitymanagement/workon/tmplWorkOnEdit.tpl.html',
			size: 'lg',
			windowClass: 'hmodal-info',
			controller: 'ctrlWorkOnEdit',
			resolve: {
				itemEdit: function() {
					if(isNew) {
						return new ServiceWorkOn();
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
				ServiceWorkOn.saveCustom('stockmanagement/workons', result, function(savedObject) {
					$scope.items.unshift(savedObject);
					if($scope.itemEdit !== null) {
						var index = $scope.items.map(function(it) { return it.id; }).indexOf($scope.itemEdit.id);
						$scope.items[index].isSelected = false;
					}
					$scope.itemEdit = angular.extend(savedObject);
					$scope.items[0].isSelected = true;
				});
			 } else {
				 ServiceWorkOn.updateCustom('stockmanagement/workons/'+result.id, result, function(savedObject) {
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


.controller('ctrlWorkOnEdit',['$scope', 'Localization', '$modal', '$modalInstance', 'dialogs',
	'ServiceWorkOn', 'ServiceEmployee', 'ServiceTechnologicalUnit',   'employeeDefinition',  'technologicalUnitDefinition',   'itemEdit',
function($scope, Localization, $modal, $modalInstance, dialogs,
	ServiceWorkOn, ServiceEmployee, ServiceTechnologicalUnit,  employeeDefinition,  technologicalUnitDefinition,  itemEdit) {

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
	$scope.openedWOFromDate = false;
	$scope.openedWOToDate = false;

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
            templateUrl: 'corporation/workon/tmplEmployeeChoose.tpl.html',
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
            templateUrl: 'capacitymanagement/workon/tmplTechnologicalUnitChoose.tpl.html',
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
		correctDateTime($scope.itemEdit.WOFromDate);
		correctDateTime($scope.itemEdit.WOToDate);
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


.controller('ctrlWorkOnChoose', ['$scope','ServiceWorkOn', 'dialogs', '$modal', '$modalInstance', 'itemEdit',
function($scope, ServiceWorkOn, dialogs, $modal,  $modalInstance, itemEdit) {

    // entity with properties
    $scope.itemDefinition = {
        label: 'capacitymanagement.workOn',
        properties: [
            { label: 'wOEngageTime', name:'WOEngageTime', inTable:  false  },
            { label: 'wOFromDate', name:'WOFromDate', inTable:  false  },
            { label: 'wOToDate', name:'WOToDate', inTable:  false  },
        ]
    };

	$scope.items = [];
	$scope.itemEdit = {};

	// fill table with data
	$scope.loaded = false;
	var getWorkOns = function() {
		if(!$scope.loaded && $scope.items.length === 0) {
			$scope.isLoading = true;
			ServiceWorkOn.query(function(data) {
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
	getWorkOns();

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