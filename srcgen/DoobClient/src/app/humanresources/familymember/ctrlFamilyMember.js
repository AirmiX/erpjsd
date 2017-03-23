'use strict';

angular.module('Doob.humanresources')


.controller('ctrlFamilyMember',['$scope', '$rootScope', '$modal', 'dialogs', 'CheckSelected', 'ServiceFamilyMember',
    function($scope, $rootScope, $modal, dialogs, CheckSelected, ServiceFamilyMember) {

	// main entity (familyMember) properties names and labels
	$scope.itemDefinition = {
		label: 'humanresources.familyMember',
		properties: [
			{ label: 'fMOrdinalNumber', name:'FMOrdinalNumber', inTable:  true  },
			{ label: 'fMRelationship', name:'FMRelationship', inTable:  true  },
			{ label: 'fMName', name:'FMName', inTable:  true  },
			{ label: 'fMLastName', name:'FMLastName', inTable:  true  },
			{ label: 'fMDateOfBirth', name:'FMDateOfBirth', inTable:  true  },
			{ label: 'fMEmployment', name:'FMEmployment', inTable:  true  },
			{ label: 'fMIsDependent', name:'FMIsDependent', inTable:  true  },
			{ label: 'fMHealthCard', name:'FMHealthCard', inTable:  false  },
			{ label: 'fMInsurance', name:'FMInsurance', inTable:  true  },
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

	// fill table with data
	$scope.items = [];
	$scope.loaded = false;
	var getFamilyMembers = function() {
		if(!$scope.loaded && $scope.items.length === 0) {
			$scope.isLoading = true;
			ServiceFamilyMember.query(function(data) {
				$scope.items = data;
				$scope.isLoading = false;
				$scope.loaded = true;
			});
		}
	};
	getFamilyMembers();

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

	$scope.$watch('FamilyMemberCollection', function() {
		$scope.itemEdit = CheckSelected.checkSelectedInTable($scope.itemEdit, $scope.FamilyMemberCollection, $scope.items);
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
			templateUrl: 'humanresources/familymember/tmplFamilyMemberEdit.tpl.html',
			size: 'lg',
			windowClass: 'hmodal-info',
			controller: 'ctrlFamilyMemberEdit',
			resolve: {
				itemEdit: function() {
					if(isNew) {
						return new ServiceFamilyMember();
					} else {
						return $scope.itemEdit;
					}
				},
				employeeDefinition: function() {
					return $scope.employeeDefinition;
				},
			}
		})
		.result.then(function(result) {
			if(!angular.isDefined(result.id)) {
				ServiceFamilyMember.saveCustom('stockmanagement/familymembers', result, function(savedObject) {
					$scope.items.unshift(savedObject);
					if($scope.itemEdit !== null) {
						var index = $scope.items.map(function(it) { return it.id; }).indexOf($scope.itemEdit.id);
						$scope.items[index].isSelected = false;
					}
					$scope.itemEdit = angular.extend(savedObject);
					$scope.items[0].isSelected = true;
				});
			 } else {
				 ServiceFamilyMember.updateCustom('stockmanagement/familymembers/'+result.id, result, function(savedObject) {
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


.controller('ctrlFamilyMemberEdit',['$scope', 'Localization', '$modal', '$modalInstance', 'dialogs',
	'ServiceFamilyMember', 'ServiceEmployee',   'employeeDefinition',   'itemEdit',
function($scope, Localization, $modal, $modalInstance, dialogs,
	ServiceFamilyMember, ServiceEmployee,  employeeDefinition,  itemEdit) {

	// dialog mode
	$scope.mode = 'edit';

	// original item state
	var original = angular.copy(itemEdit);
	// item state
	$scope.itemEdit = angular.copy(original);

	// employee with properties
	$scope.employeeDefinition = employeeDefinition;

	// datepicker logic

	// date properties
	$scope.openedFMDateOfBirth = false;

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
            templateUrl: 'corporation/familymember/tmplEmployeeChoose.tpl.html',
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


	// Save Button
	$scope.save = function() {
		correctDateTime($scope.itemEdit.FMDateOfBirth);
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
		return                 item.FMOrdinalNumber  &&                 item.FMRelationship  &&                 item.FMName  &&                 item.FMLastName  &&                 item.FMDateOfBirth  &&                 item.FMEmployment  &&                 item.FMIsDependent  &&                 item.FMInsurance  ;
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


.controller('ctrlFamilyMemberChoose', ['$scope','ServiceFamilyMember', 'dialogs', '$modal', '$modalInstance', 'itemEdit',
function($scope, ServiceFamilyMember, dialogs, $modal,  $modalInstance, itemEdit) {

    // entity with properties
    $scope.itemDefinition = {
        label: 'humanresources.familyMember',
        properties: [
            { label: 'fMOrdinalNumber', name:'FMOrdinalNumber', inTable:  true  },
            { label: 'fMRelationship', name:'FMRelationship', inTable:  true  },
            { label: 'fMName', name:'FMName', inTable:  true  },
            { label: 'fMLastName', name:'FMLastName', inTable:  true  },
            { label: 'fMDateOfBirth', name:'FMDateOfBirth', inTable:  true  },
            { label: 'fMEmployment', name:'FMEmployment', inTable:  true  },
            { label: 'fMIsDependent', name:'FMIsDependent', inTable:  true  },
            { label: 'fMHealthCard', name:'FMHealthCard', inTable:  false  },
            { label: 'fMInsurance', name:'FMInsurance', inTable:  true  },
        ]
    };

	$scope.items = [];
	$scope.itemEdit = {};

	// fill table with data
	$scope.loaded = false;
	var getFamilyMembers = function() {
		if(!$scope.loaded && $scope.items.length === 0) {
			$scope.isLoading = true;
			ServiceFamilyMember.query(function(data) {
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
	getFamilyMembers();

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