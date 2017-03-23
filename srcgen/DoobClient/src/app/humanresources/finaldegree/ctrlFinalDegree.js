'use strict';

angular.module('Doob.humanresources')


.controller('ctrlFinalDegree',['$scope', '$rootScope', '$modal', 'dialogs', 'CheckSelected', 'ServiceFinalDegree',
    function($scope, $rootScope, $modal, dialogs, CheckSelected, ServiceFinalDegree) {

	// main entity (finalDegree) properties names and labels
	$scope.itemDefinition = {
		label: 'humanresources.finalDegree',
		properties: [
			{ label: 'fDCode', name:'FDCode', inTable:  true  },
			{ label: 'fDName', name:'FDName', inTable:  true  },
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
	var getFinalDegrees = function() {
		if(!$scope.loaded && $scope.items.length === 0) {
			$scope.isLoading = true;
			ServiceFinalDegree.query(function(data) {
				$scope.items = data;
				$scope.isLoading = false;
				$scope.loaded = true;
			});
		}
	};
	getFinalDegrees();

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

	$scope.$watch('FinalDegreeCollection', function() {
		$scope.itemEdit = CheckSelected.checkSelectedInTable($scope.itemEdit, $scope.FinalDegreeCollection, $scope.items);
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
			templateUrl: 'humanresources/finaldegree/tmplFinalDegreeEdit.tpl.html',
			size: 'lg',
			windowClass: 'hmodal-info',
			controller: 'ctrlFinalDegreeEdit',
			resolve: {
				itemEdit: function() {
					if(isNew) {
						return new ServiceFinalDegree();
					} else {
						return $scope.itemEdit;
					}
				},
				employeesDefinition: function() {
					return $scope.employeesDefinition;
				},
			}
		})
		.result.then(function(result) {
			if(!angular.isDefined(result.id)) {
				ServiceFinalDegree.saveCustom('stockmanagement/finaldegrees', result, function(savedObject) {
					$scope.items.unshift(savedObject);
					if($scope.itemEdit !== null) {
						var index = $scope.items.map(function(it) { return it.id; }).indexOf($scope.itemEdit.id);
						$scope.items[index].isSelected = false;
					}
					$scope.itemEdit = angular.extend(savedObject);
					$scope.items[0].isSelected = true;
				});
			 } else {
				 ServiceFinalDegree.updateCustom('stockmanagement/finaldegrees/'+result.id, result, function(savedObject) {
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


.controller('ctrlFinalDegreeEdit',['$scope', 'Localization', '$modal', '$modalInstance', 'dialogs',
	'ServiceFinalDegree', 'ServiceEmployee',   'employeesDefinition',   'itemEdit',
function($scope, Localization, $modal, $modalInstance, dialogs,
	ServiceFinalDegree, ServiceEmployee,  employeesDefinition,  itemEdit) {

	// dialog mode
	$scope.mode = 'edit';

	// original item state
	var original = angular.copy(itemEdit);
	// item state
	$scope.itemEdit = angular.copy(original);

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
        for(i in $scope.itemEdit.employees) {
    		item = $scope.itemEdit.employees[i];
    		delete item.isSelected;
    	}
		$modalInstance.close($scope.itemEdit);
	};


	$scope.canSave = function() {
		var item = $scope.itemEdit;
		return                 item.FDCode  &&                 item.FDName  ;
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


.controller('ctrlFinalDegreeChoose', ['$scope','ServiceFinalDegree', 'dialogs', '$modal', '$modalInstance', 'itemEdit',
function($scope, ServiceFinalDegree, dialogs, $modal,  $modalInstance, itemEdit) {

    // entity with properties
    $scope.itemDefinition = {
        label: 'humanresources.finalDegree',
        properties: [
            { label: 'fDCode', name:'FDCode', inTable:  true  },
            { label: 'fDName', name:'FDName', inTable:  true  },
        ]
    };

	$scope.items = [];
	$scope.itemEdit = {};

	// fill table with data
	$scope.loaded = false;
	var getFinalDegrees = function() {
		if(!$scope.loaded && $scope.items.length === 0) {
			$scope.isLoading = true;
			ServiceFinalDegree.query(function(data) {
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
	getFinalDegrees();

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