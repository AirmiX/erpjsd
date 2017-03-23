'use strict';

angular.module('Doob.humanresources')


.controller('ctrlSchoolDegree',['$scope', '$rootScope', '$modal', 'dialogs', 'CheckSelected', 'ServiceSchoolDegree',
    function($scope, $rootScope, $modal, dialogs, CheckSelected, ServiceSchoolDegree) {

	// main entity (schoolDegree) properties names and labels
	$scope.itemDefinition = {
		label: 'humanresources.schoolDegree',
		properties: [
			{ label: 'sDCode', name:'SDCode', inTable:  true  },
			{ label: 'sDName', name:'SDName', inTable:  true  },
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
	// balanceRecources with properties names and labels
	$scope.balanceRecourcesDefinition = {
		label: 'capacitymanagement.balanceResource',
		properties : [
			{ label: 'bRBalanceUnit', name:'BRBalanceUnit' },
			{ label: 'bRResourceType', name:'BRResourceType' },
			{ label: 'bRStartDate', name:'BRStartDate' },
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
	var getSchoolDegrees = function() {
		if(!$scope.loaded && $scope.items.length === 0) {
			$scope.isLoading = true;
			ServiceSchoolDegree.query(function(data) {
				$scope.items = data;
				$scope.isLoading = false;
				$scope.loaded = true;
			});
		}
	};
	getSchoolDegrees();

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

	$scope.$watch('SchoolDegreeCollection', function() {
		$scope.itemEdit = CheckSelected.checkSelectedInTable($scope.itemEdit, $scope.SchoolDegreeCollection, $scope.items);
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
			templateUrl: 'humanresources/schooldegree/tmplSchoolDegreeEdit.tpl.html',
			size: 'lg',
			windowClass: 'hmodal-info',
			controller: 'ctrlSchoolDegreeEdit',
			resolve: {
				itemEdit: function() {
					if(isNew) {
						return new ServiceSchoolDegree();
					} else {
						return $scope.itemEdit;
					}
				},
				employeesDefinition: function() {
					return $scope.employeesDefinition;
				},
				balanceRecourcesDefinition: function() {
					return $scope.balanceRecourcesDefinition;
				},
				technologicalUnitsDefinition: function() {
					return $scope.technologicalUnitsDefinition;
				},
			}
		})
		.result.then(function(result) {
			if(!angular.isDefined(result.id)) {
				ServiceSchoolDegree.saveCustom('stockmanagement/schooldegrees', result, function(savedObject) {
					$scope.items.unshift(savedObject);
					if($scope.itemEdit !== null) {
						var index = $scope.items.map(function(it) { return it.id; }).indexOf($scope.itemEdit.id);
						$scope.items[index].isSelected = false;
					}
					$scope.itemEdit = angular.extend(savedObject);
					$scope.items[0].isSelected = true;
				});
			 } else {
				 ServiceSchoolDegree.updateCustom('stockmanagement/schooldegrees/'+result.id, result, function(savedObject) {
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


.controller('ctrlSchoolDegreeEdit',['$scope', 'Localization', '$modal', '$modalInstance', 'dialogs',
	'ServiceSchoolDegree', 'ServiceEmployee', 'ServiceBalanceResource', 'ServiceTechnologicalUnit',   'employeesDefinition',  'balanceRecourcesDefinition',  'technologicalUnitsDefinition',   'itemEdit',
function($scope, Localization, $modal, $modalInstance, dialogs,
	ServiceSchoolDegree, ServiceEmployee, ServiceBalanceResource, ServiceTechnologicalUnit,  employeesDefinition,  balanceRecourcesDefinition,  technologicalUnitsDefinition,  itemEdit) {

	// dialog mode
	$scope.mode = 'edit';

	// original item state
	var original = angular.copy(itemEdit);
	// item state
	$scope.itemEdit = angular.copy(original);

	// employees with properties
	$scope.employeesDefinition = employeesDefinition;
	// balanceRecources with properties
	$scope.balanceRecourcesDefinition = balanceRecourcesDefinition;
	// technologicalUnits with properties
	$scope.technologicalUnitsDefinition = technologicalUnitsDefinition;

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
        for(i in $scope.itemEdit.employees) {
    		item = $scope.itemEdit.employees[i];
    		delete item.isSelected;
    	}
        for(i in $scope.itemEdit.balanceRecources) {
    		item = $scope.itemEdit.balanceRecources[i];
    		delete item.isSelected;
    	}
        for(i in $scope.itemEdit.technologicalUnits) {
    		item = $scope.itemEdit.technologicalUnits[i];
    		delete item.isSelected;
    	}
		$modalInstance.close($scope.itemEdit);
	};


	$scope.canSave = function() {
		var item = $scope.itemEdit;
		return                 item.SDCode  &&                 item.SDName  ;
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


.controller('ctrlSchoolDegreeChoose', ['$scope','ServiceSchoolDegree', 'dialogs', '$modal', '$modalInstance', 'itemEdit',
function($scope, ServiceSchoolDegree, dialogs, $modal,  $modalInstance, itemEdit) {

    // entity with properties
    $scope.itemDefinition = {
        label: 'humanresources.schoolDegree',
        properties: [
            { label: 'sDCode', name:'SDCode', inTable:  true  },
            { label: 'sDName', name:'SDName', inTable:  true  },
        ]
    };

	$scope.items = [];
	$scope.itemEdit = {};

	// fill table with data
	$scope.loaded = false;
	var getSchoolDegrees = function() {
		if(!$scope.loaded && $scope.items.length === 0) {
			$scope.isLoading = true;
			ServiceSchoolDegree.query(function(data) {
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
	getSchoolDegrees();

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