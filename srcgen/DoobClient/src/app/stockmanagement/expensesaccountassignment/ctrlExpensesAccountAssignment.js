'use strict';

angular.module('Doob.stockmanagement')


.controller('ctrlExpensesAccountAssignment',['$scope', '$rootScope', '$modal', 'dialogs', 'CheckSelected', 'ServiceExpensesAccountAssignment',
    function($scope, $rootScope, $modal, dialogs, CheckSelected, ServiceExpensesAccountAssignment) {

	// main entity (expensesAccountAssignment) properties names and labels
	$scope.itemDefinition = {
		label: 'stockmanagement.expensesAccountAssignment',
		properties: [
			{ label: 'eAAOutputReason', name:'EAAOutputReason', inTable:  true  },
		]
	};

	// account with properties names and labels
	$scope.accountDefinition = {
		label: 'corporation.account',
		properties : [
			{ label: 'aAccountNumber', name:'AAccountNumber' },
			{ label: 'aName', name:'AName' },
			{ label: 'aIsTransfer', name:'AIsTransfer' },
			{ label: 'aEntrySide', name:'AEntrySide' },
			{ label: 'aDisplaySide', name:'ADisplaySide' },
		]
	};
	// account2 with properties names and labels
	$scope.account2Definition = {
		label: 'corporation.account',
		properties : [
			{ label: 'aAccountNumber', name:'AAccountNumber' },
			{ label: 'aName', name:'AName' },
			{ label: 'aIsTransfer', name:'AIsTransfer' },
			{ label: 'aEntrySide', name:'AEntrySide' },
			{ label: 'aDisplaySide', name:'ADisplaySide' },
		]
	};

	// fill table with data
	$scope.items = [];
	$scope.loaded = false;
	var getExpensesAccountAssignments = function() {
		if(!$scope.loaded && $scope.items.length === 0) {
			$scope.isLoading = true;
			ServiceExpensesAccountAssignment.query(function(data) {
				$scope.items = data;
				$scope.isLoading = false;
				$scope.loaded = true;
			});
		}
	};
	getExpensesAccountAssignments();

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

	$scope.$watch('ExpensesAccountAssignmentCollection', function() {
		$scope.itemEdit = CheckSelected.checkSelectedInTable($scope.itemEdit, $scope.ExpensesAccountAssignmentCollection, $scope.items);
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
			templateUrl: 'stockmanagement/expensesaccountassignment/tmplExpensesAccountAssignmentEdit.tpl.html',
			size: 'lg',
			windowClass: 'hmodal-info',
			controller: 'ctrlExpensesAccountAssignmentEdit',
			resolve: {
				itemEdit: function() {
					if(isNew) {
						return new ServiceExpensesAccountAssignment();
					} else {
						return $scope.itemEdit;
					}
				},
				accountDefinition: function() {
					return $scope.accountDefinition;
				},
				account2Definition: function() {
					return $scope.account2Definition;
				},
			}
		})
		.result.then(function(result) {
			if(!angular.isDefined(result.id)) {
				ServiceExpensesAccountAssignment.saveCustom('stockmanagement/expensesaccountassignments', result, function(savedObject) {
					$scope.items.unshift(savedObject);
					if($scope.itemEdit !== null) {
						var index = $scope.items.map(function(it) { return it.id; }).indexOf($scope.itemEdit.id);
						$scope.items[index].isSelected = false;
					}
					$scope.itemEdit = angular.extend(savedObject);
					$scope.items[0].isSelected = true;
				});
			 } else {
				 ServiceExpensesAccountAssignment.updateCustom('stockmanagement/expensesaccountassignments/'+result.id, result, function(savedObject) {
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


.controller('ctrlExpensesAccountAssignmentEdit',['$scope', 'Localization', '$modal', '$modalInstance', 'dialogs',
	'ServiceExpensesAccountAssignment', 'ServiceAccount',   'accountDefinition',  'account2Definition',   'itemEdit',
function($scope, Localization, $modal, $modalInstance, dialogs,
	ServiceExpensesAccountAssignment, ServiceAccount,  accountDefinition,  account2Definition,  itemEdit) {

	// dialog mode
	$scope.mode = 'edit';

	// original item state
	var original = angular.copy(itemEdit);
	// item state
	$scope.itemEdit = angular.copy(original);

	// account with properties
	$scope.accountDefinition = accountDefinition;
	// account2 with properties
	$scope.account2Definition = account2Definition;

	// datepicker logic

	// date properties

	$scope.open = function($event, opened) {
		$event.preventDefault();
		$event.stopPropagation();
		$scope[opened] = true;
	};



	// Choose account
	$scope.openChooseAccountDialog = function() {
        $modal.open({
            backdrop: 'static',
            keyboard : false,
            templateUrl: 'corporation/expensesaccountassignment/tmplAccountChoose.tpl.html',
            size: 'lg',
            controller: 'ctrlAccountChoose',
            windowClass: 'hmodal-info',
            resolve: {
				itemEdit: function() {
					if(angular.isDefined($scope.itemEdit.account)){
						return $scope.itemEdit.account;
					}
				}
			}
		}).result.then(function(result) {
			$scope.itemEdit.account = angular.copy(result);
		});
    };


	// Choose account2
	$scope.openChooseAccount2Dialog = function() {
        $modal.open({
            backdrop: 'static',
            keyboard : false,
            templateUrl: 'corporation/expensesaccountassignment/tmplAccountChoose.tpl.html',
            size: 'lg',
            controller: 'ctrlAccountChoose',
            windowClass: 'hmodal-info',
            resolve: {
				itemEdit: function() {
					if(angular.isDefined($scope.itemEdit.account2)){
						return $scope.itemEdit.account2;
					}
				}
			}
		}).result.then(function(result) {
			$scope.itemEdit.account2 = angular.copy(result);
		});
    };


	// Save Button
	$scope.save = function() {
	   //	delete $scope.itemEdit.isSelected;
		$modalInstance.close($scope.itemEdit);
	};


	$scope.canSave = function() {
		var item = $scope.itemEdit;
		return                 item.EAAOutputReason  ;
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


.controller('ctrlExpensesAccountAssignmentChoose', ['$scope','ServiceExpensesAccountAssignment', 'dialogs', '$modal', '$modalInstance', 'itemEdit',
function($scope, ServiceExpensesAccountAssignment, dialogs, $modal,  $modalInstance, itemEdit) {

    // entity with properties
    $scope.itemDefinition = {
        label: 'stockmanagement.expensesAccountAssignment',
        properties: [
            { label: 'eAAOutputReason', name:'EAAOutputReason', inTable:  true  },
        ]
    };

	$scope.items = [];
	$scope.itemEdit = {};

	// fill table with data
	$scope.loaded = false;
	var getExpensesAccountAssignments = function() {
		if(!$scope.loaded && $scope.items.length === 0) {
			$scope.isLoading = true;
			ServiceExpensesAccountAssignment.query(function(data) {
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
	getExpensesAccountAssignments();

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