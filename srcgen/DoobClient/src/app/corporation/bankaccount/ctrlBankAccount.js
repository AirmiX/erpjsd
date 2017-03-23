'use strict';

angular.module('Doob.corporation')


.controller('ctrlBankAccount',['$scope', '$rootScope', '$modal', 'dialogs', 'CheckSelected', 'ServiceBankAccount',
    function($scope, $rootScope, $modal, dialogs, CheckSelected, ServiceBankAccount) {

	// main entity (bankAccount) properties names and labels
	$scope.itemDefinition = {
		label: 'corporation.bankAccount',
		properties: [
			{ label: 'bAAccountNumber', name:'BAAccountNumber', inTable:  true  },
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
	// entities with properties names and labels
	$scope.entitiesDefinition = {
		label: 'corporation.businessEntity',
		properties : [
			{ label: 'bEIdentificationCode', name:'BEIdentificationCode' },
			{ label: 'bEName', name:'BEName' },
			{ label: 'bEShortName', name:'BEShortName' },
			{ label: 'bETelephone', name:'BETelephone' },
			{ label: 'bEFax', name:'BEFax' },
			{ label: 'bECompanyNumber', name:'BECompanyNumber' },
			{ label: 'bERegistrationNumber', name:'BERegistrationNumber' },
		]
	};
	// bank with properties names and labels
	$scope.bankDefinition = {
		label: 'corporation.bank',
		properties : [
			{ label: 'bAName', name:'BAName' },
			{ label: 'bACode', name:'BACode' },
		]
	};

	// fill table with data
	$scope.items = [];
	$scope.loaded = false;
	var getBankAccounts = function() {
		if(!$scope.loaded && $scope.items.length === 0) {
			$scope.isLoading = true;
			ServiceBankAccount.query(function(data) {
				$scope.items = data;
				$scope.isLoading = false;
				$scope.loaded = true;
			});
		}
	};
	getBankAccounts();

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

	$scope.$watch('BankAccountCollection', function() {
		$scope.itemEdit = CheckSelected.checkSelectedInTable($scope.itemEdit, $scope.BankAccountCollection, $scope.items);
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
			templateUrl: 'corporation/bankaccount/tmplBankAccountEdit.tpl.html',
			size: 'lg',
			windowClass: 'hmodal-info',
			controller: 'ctrlBankAccountEdit',
			resolve: {
				itemEdit: function() {
					if(isNew) {
						return new ServiceBankAccount();
					} else {
						return $scope.itemEdit;
					}
				},
				employeeDefinition: function() {
					return $scope.employeeDefinition;
				},
				entitiesDefinition: function() {
					return $scope.entitiesDefinition;
				},
				bankDefinition: function() {
					return $scope.bankDefinition;
				},
			}
		})
		.result.then(function(result) {
			if(!angular.isDefined(result.id)) {
				ServiceBankAccount.saveCustom('stockmanagement/bankaccounts', result, function(savedObject) {
					$scope.items.unshift(savedObject);
					if($scope.itemEdit !== null) {
						var index = $scope.items.map(function(it) { return it.id; }).indexOf($scope.itemEdit.id);
						$scope.items[index].isSelected = false;
					}
					$scope.itemEdit = angular.extend(savedObject);
					$scope.items[0].isSelected = true;
				});
			 } else {
				 ServiceBankAccount.updateCustom('stockmanagement/bankaccounts/'+result.id, result, function(savedObject) {
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


.controller('ctrlBankAccountEdit',['$scope', 'Localization', '$modal', '$modalInstance', 'dialogs',
	'ServiceBankAccount', 'ServiceEmployee', 'ServiceBusinessEntity', 'ServiceBank',   'employeeDefinition',  'entitiesDefinition',  'bankDefinition',   'itemEdit',
function($scope, Localization, $modal, $modalInstance, dialogs,
	ServiceBankAccount, ServiceEmployee, ServiceBusinessEntity, ServiceBank,  employeeDefinition,  entitiesDefinition,  bankDefinition,  itemEdit) {

	// dialog mode
	$scope.mode = 'edit';

	// original item state
	var original = angular.copy(itemEdit);
	// item state
	$scope.itemEdit = angular.copy(original);

	// employee with properties
	$scope.employeeDefinition = employeeDefinition;
	// entities with properties
	$scope.entitiesDefinition = entitiesDefinition;
	// bank with properties
	$scope.bankDefinition = bankDefinition;

	// datepicker logic

	// date properties

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
            templateUrl: 'corporation/bankaccount/tmplEmployeeChoose.tpl.html',
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


	// Choose entities
	$scope.openChooseEntitiesDialog = function() {
        $modal.open({
            backdrop: 'static',
            keyboard : false,
            templateUrl: 'corporation/bankaccount/tmplBusinessEntityChoose.tpl.html',
            size: 'lg',
            controller: 'ctrlBusinessEntityChoose',
            windowClass: 'hmodal-info',
            resolve: {
				itemEdit: function() {
					if(angular.isDefined($scope.itemEdit.entities)){
						return $scope.itemEdit.entities;
					}
				}
			}
		}).result.then(function(result) {
			$scope.itemEdit.entities = angular.copy(result);
		});
    };


	// Choose bank
	$scope.openChooseBankDialog = function() {
        $modal.open({
            backdrop: 'static',
            keyboard : false,
            templateUrl: 'corporation/bankaccount/tmplBankChoose.tpl.html',
            size: 'lg',
            controller: 'ctrlBankChoose',
            windowClass: 'hmodal-info',
            resolve: {
				itemEdit: function() {
					if(angular.isDefined($scope.itemEdit.bank)){
						return $scope.itemEdit.bank;
					}
				}
			}
		}).result.then(function(result) {
			$scope.itemEdit.bank = angular.copy(result);
		});
    };


	// Save Button
	$scope.save = function() {
	   //	delete $scope.itemEdit.isSelected;
		$modalInstance.close($scope.itemEdit);
	};


	$scope.canSave = function() {
		var item = $scope.itemEdit;
		return                 item.BAAccountNumber  ;
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


.controller('ctrlBankAccountChoose', ['$scope','ServiceBankAccount', 'dialogs', '$modal', '$modalInstance', 'itemEdit',
function($scope, ServiceBankAccount, dialogs, $modal,  $modalInstance, itemEdit) {

    // entity with properties
    $scope.itemDefinition = {
        label: 'corporation.bankAccount',
        properties: [
            { label: 'bAAccountNumber', name:'BAAccountNumber', inTable:  true  },
        ]
    };

	$scope.items = [];
	$scope.itemEdit = {};

	// fill table with data
	$scope.loaded = false;
	var getBankAccounts = function() {
		if(!$scope.loaded && $scope.items.length === 0) {
			$scope.isLoading = true;
			ServiceBankAccount.query(function(data) {
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
	getBankAccounts();

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