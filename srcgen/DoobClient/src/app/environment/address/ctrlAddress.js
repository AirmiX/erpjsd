'use strict';

angular.module('Doob.environment')


.controller('ctrlAddress',['$scope', '$rootScope', '$modal', 'dialogs', 'CheckSelected', 'ServiceAddress',
    function($scope, $rootScope, $modal, dialogs, CheckSelected, ServiceAddress) {

	// main entity (address) properties names and labels
	$scope.itemDefinition = {
		label: 'environment.address',
		properties: [
			{ label: 'aStreet', name:'AStreet', inTable:  false  },
			{ label: 'aNumber', name:'ANumber', inTable:  false  },
			{ label: 'aDateFrom', name:'ADateFrom', inTable:  false  },
			{ label: 'aDateUntil', name:'ADateUntil', inTable:  false  },
			{ label: 'aPostCode', name:'APostCode', inTable:  false  },
			{ label: 'aState', name:'AState', inTable:  false  },
			{ label: 'aCity', name:'ACity', inTable:  false  },
		]
	};

	// company with properties names and labels
	$scope.companyDefinition = {
		label: 'order.company',
		properties : [
			{ label: 'cCode', name:'CCode' },
		]
	};
	// customerCompany with properties names and labels
	$scope.customerCompanyDefinition = {
		label: 'order.customer',
		properties : [
			{ label: 'cFirstName', name:'CFirstName' },
			{ label: 'cLastName', name:'CLastName' },
		]
	};
	// customer with properties names and labels
	$scope.customerDefinition = {
		label: 'order.customer',
		properties : [
			{ label: 'cFirstName', name:'CFirstName' },
			{ label: 'cLastName', name:'CLastName' },
		]
	};
	// postOffice with properties names and labels
	$scope.postOfficeDefinition = {
		label: 'environment.postOffice',
		properties : [
			{ label: 'pONumber', name:'PONumber' },
		]
	};
	// stockrooms with properties names and labels
	$scope.stockroomsDefinition = {
		label: 'stock.stockroom',
		properties : [
			{ label: 'sCode', name:'SCode' },
			{ label: 'sName', name:'SName' },
			{ label: 'sFullName', name:'SFullName' },
			{ label: 'sType', name:'SType' },
			{ label: 'sConditions', name:'SConditions' },
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
	// organizationUnits with properties names and labels
	$scope.organizationUnitsDefinition = {
		label: 'corporation.organizationUnit',
		properties : [
			{ label: 'oUIdentificationCode', name:'OUIdentificationCode' },
			{ label: 'oUName', name:'OUName' },
		]
	};
	// businessEntities with properties names and labels
	$scope.businessEntitiesDefinition = {
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

	// fill table with data
	$scope.items = [];
	$scope.loaded = false;
	var getAddresss = function() {
		if(!$scope.loaded && $scope.items.length === 0) {
			$scope.isLoading = true;
			ServiceAddress.query(function(data) {
				$scope.items = data;
				$scope.isLoading = false;
				$scope.loaded = true;
			});
		}
	};
	getAddresss();

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

	$scope.$watch('AddressCollection', function() {
		$scope.itemEdit = CheckSelected.checkSelectedInTable($scope.itemEdit, $scope.AddressCollection, $scope.items);
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
			templateUrl: 'environment/address/tmplAddressEdit.tpl.html',
			size: 'lg',
			windowClass: 'hmodal-info',
			controller: 'ctrlAddressEdit',
			resolve: {
				itemEdit: function() {
					if(isNew) {
						return new ServiceAddress();
					} else {
						return $scope.itemEdit;
					}
				},
				companyDefinition: function() {
					return $scope.companyDefinition;
				},
				customerCompanyDefinition: function() {
					return $scope.customerCompanyDefinition;
				},
				customerDefinition: function() {
					return $scope.customerDefinition;
				},
				postOfficeDefinition: function() {
					return $scope.postOfficeDefinition;
				},
				stockroomsDefinition: function() {
					return $scope.stockroomsDefinition;
				},
				employeesDefinition: function() {
					return $scope.employeesDefinition;
				},
				organizationUnitsDefinition: function() {
					return $scope.organizationUnitsDefinition;
				},
				businessEntitiesDefinition: function() {
					return $scope.businessEntitiesDefinition;
				},
			}
		})
		.result.then(function(result) {
			if(!angular.isDefined(result.id)) {
				ServiceAddress.saveCustom('stockmanagement/addresss', result, function(savedObject) {
					$scope.items.unshift(savedObject);
					if($scope.itemEdit !== null) {
						var index = $scope.items.map(function(it) { return it.id; }).indexOf($scope.itemEdit.id);
						$scope.items[index].isSelected = false;
					}
					$scope.itemEdit = angular.extend(savedObject);
					$scope.items[0].isSelected = true;
				});
			 } else {
				 ServiceAddress.updateCustom('stockmanagement/addresss/'+result.id, result, function(savedObject) {
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


.controller('ctrlAddressEdit',['$scope', 'Localization', '$modal', '$modalInstance', 'dialogs',
	'ServiceAddress', 'ServiceCompany', 'ServiceCustomer', 'ServicePostOffice', 'ServiceStockroom', 'ServiceEmployee', 'ServiceOrganizationUnit', 'ServiceBusinessEntity',   'companyDefinition',  'customerCompanyDefinition',  'customerDefinition',  'postOfficeDefinition',  'stockroomsDefinition',  'employeesDefinition',  'organizationUnitsDefinition',  'businessEntitiesDefinition',   'itemEdit',
function($scope, Localization, $modal, $modalInstance, dialogs,
	ServiceAddress, ServiceCompany, ServiceCustomer, ServicePostOffice, ServiceStockroom, ServiceEmployee, ServiceOrganizationUnit, ServiceBusinessEntity,  companyDefinition,  customerCompanyDefinition,  customerDefinition,  postOfficeDefinition,  stockroomsDefinition,  employeesDefinition,  organizationUnitsDefinition,  businessEntitiesDefinition,  itemEdit) {

	// dialog mode
	$scope.mode = 'edit';

	// original item state
	var original = angular.copy(itemEdit);
	// item state
	$scope.itemEdit = angular.copy(original);

	// company with properties
	$scope.companyDefinition = companyDefinition;
	// customerCompany with properties
	$scope.customerCompanyDefinition = customerCompanyDefinition;
	// customer with properties
	$scope.customerDefinition = customerDefinition;
	// postOffice with properties
	$scope.postOfficeDefinition = postOfficeDefinition;
	// stockrooms with properties
	$scope.stockroomsDefinition = stockroomsDefinition;
	// employees with properties
	$scope.employeesDefinition = employeesDefinition;
	// organizationUnits with properties
	$scope.organizationUnitsDefinition = organizationUnitsDefinition;
	// businessEntities with properties
	$scope.businessEntitiesDefinition = businessEntitiesDefinition;

	// datepicker logic

	// date properties
	$scope.openedADateFrom = false;
	$scope.openedADateUntil = false;

	$scope.open = function($event, opened) {
		$event.preventDefault();
		$event.stopPropagation();
		$scope[opened] = true;
	};



	// Choose company
	$scope.openChooseCompanyDialog = function() {
        $modal.open({
            backdrop: 'static',
            keyboard : false,
            templateUrl: 'order/address/tmplCompanyChoose.tpl.html',
            size: 'lg',
            controller: 'ctrlCompanyChoose',
            windowClass: 'hmodal-info',
            resolve: {
				itemEdit: function() {
					if(angular.isDefined($scope.itemEdit.company)){
						return $scope.itemEdit.company;
					}
				}
			}
		}).result.then(function(result) {
			$scope.itemEdit.company = angular.copy(result);
		});
    };


	// Choose customerCompany
	$scope.openChooseCustomerCompanyDialog = function() {
        $modal.open({
            backdrop: 'static',
            keyboard : false,
            templateUrl: 'order/address/tmplCustomerChoose.tpl.html',
            size: 'lg',
            controller: 'ctrlCustomerChoose',
            windowClass: 'hmodal-info',
            resolve: {
				itemEdit: function() {
					if(angular.isDefined($scope.itemEdit.customerCompany)){
						return $scope.itemEdit.customerCompany;
					}
				}
			}
		}).result.then(function(result) {
			$scope.itemEdit.customerCompany = angular.copy(result);
		});
    };


	// Choose customer
	$scope.openChooseCustomerDialog = function() {
        $modal.open({
            backdrop: 'static',
            keyboard : false,
            templateUrl: 'order/address/tmplCustomerChoose.tpl.html',
            size: 'lg',
            controller: 'ctrlCustomerChoose',
            windowClass: 'hmodal-info',
            resolve: {
				itemEdit: function() {
					if(angular.isDefined($scope.itemEdit.customer)){
						return $scope.itemEdit.customer;
					}
				}
			}
		}).result.then(function(result) {
			$scope.itemEdit.customer = angular.copy(result);
		});
    };


	// Choose postOffice
	$scope.openChoosePostOfficeDialog = function() {
        $modal.open({
            backdrop: 'static',
            keyboard : false,
            templateUrl: 'environment/address/tmplPostOfficeChoose.tpl.html',
            size: 'lg',
            controller: 'ctrlPostOfficeChoose',
            windowClass: 'hmodal-info',
            resolve: {
				itemEdit: function() {
					if(angular.isDefined($scope.itemEdit.postOffice)){
						return $scope.itemEdit.postOffice;
					}
				}
			}
		}).result.then(function(result) {
			$scope.itemEdit.postOffice = angular.copy(result);
		});
    };


	// Save Button
	$scope.save = function() {
		correctDateTime($scope.itemEdit.ADateFrom);
		correctDateTime($scope.itemEdit.ADateUntil);
	   //	delete $scope.itemEdit.isSelected;
        var item;
        var i;
        for(i in $scope.itemEdit.stockrooms) {
    		item = $scope.itemEdit.stockrooms[i];
    		delete item.isSelected;
    	}
        for(i in $scope.itemEdit.employees) {
    		item = $scope.itemEdit.employees[i];
    		delete item.isSelected;
    	}
        for(i in $scope.itemEdit.organizationUnits) {
    		item = $scope.itemEdit.organizationUnits[i];
    		delete item.isSelected;
    	}
        for(i in $scope.itemEdit.businessEntities) {
    		item = $scope.itemEdit.businessEntities[i];
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


.controller('ctrlAddressChoose', ['$scope','ServiceAddress', 'dialogs', '$modal', '$modalInstance', 'itemEdit',
function($scope, ServiceAddress, dialogs, $modal,  $modalInstance, itemEdit) {

    // entity with properties
    $scope.itemDefinition = {
        label: 'environment.address',
        properties: [
            { label: 'aStreet', name:'AStreet', inTable:  false  },
            { label: 'aNumber', name:'ANumber', inTable:  false  },
            { label: 'aDateFrom', name:'ADateFrom', inTable:  false  },
            { label: 'aDateUntil', name:'ADateUntil', inTable:  false  },
            { label: 'aPostCode', name:'APostCode', inTable:  false  },
            { label: 'aState', name:'AState', inTable:  false  },
            { label: 'aCity', name:'ACity', inTable:  false  },
        ]
    };

	$scope.items = [];
	$scope.itemEdit = {};

	// fill table with data
	$scope.loaded = false;
	var getAddresss = function() {
		if(!$scope.loaded && $scope.items.length === 0) {
			$scope.isLoading = true;
			ServiceAddress.query(function(data) {
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
	getAddresss();

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