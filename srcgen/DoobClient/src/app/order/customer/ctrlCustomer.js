'use strict';

angular.module('Doob.order')


.controller('ctrlCustomer',['$scope', '$rootScope', '$modal', 'dialogs', 'CheckSelected', 'ServiceCustomer',
    function($scope, $rootScope, $modal, dialogs, CheckSelected, ServiceCustomer) {

	// main entity (customer) properties names and labels
	$scope.itemDefinition = {
		label: 'order.customer',
		properties: [
			{ label: 'cFirstName', name:'CFirstName', inTable:  true  },
			{ label: 'cLastName', name:'CLastName', inTable:  true  },
			{ label: 'cPhone', name:'CPhone', inTable:  false  },
			{ label: 'cEmail', name:'CEmail', inTable:  false  },
			{ label: 'cCreateDate', name:'CCreateDate', inTable:  false  },
			{ label: 'cGender', name:'CGender', inTable:  false  },
		]
	};

	// gender with properties names and labels
	$scope.genderDefinition = {
		label: 'initialization.gender',
		properties : [
			{ label: 'gName', name:'GName' },
		]
	};
	// sourceAttention with properties names and labels
	$scope.sourceAttentionDefinition = {
		label: 'initialization.sourceAttention',
		properties : [
			{ label: 'sAName', name:'SAName' },
		]
	};
	// addressesCompany with properties names and labels
	$scope.addressesCompanyDefinition = {
		label: 'environment.address',
		properties : [
		]
	};
	// addresses with properties names and labels
	$scope.addressesDefinition = {
		label: 'environment.address',
		properties : [
		]
	};
	// orderHeadings with properties names and labels
	$scope.orderHeadingsDefinition = {
		label: 'order.orderHeading',
		properties : [
			{ label: 'oHDocumentNumber', name:'OHDocumentNumber' },
			{ label: 'oHCreationDate', name:'OHCreationDate' },
			{ label: 'oHOrderNumberOfBuyer', name:'OHOrderNumberOfBuyer' },
			{ label: 'oHOrderDate', name:'OHOrderDate' },
			{ label: 'oHPaymentPeriodBuyer', name:'OHPaymentPeriodBuyer' },
		]
	};

	// fill table with data
	$scope.items = [];
	$scope.loaded = false;
	var getCustomers = function() {
		if(!$scope.loaded && $scope.items.length === 0) {
			$scope.isLoading = true;
			ServiceCustomer.query(function(data) {
				$scope.items = data;
				$scope.isLoading = false;
				$scope.loaded = true;
			});
		}
	};
	getCustomers();

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

	$scope.$watch('CustomerCollection', function() {
		$scope.itemEdit = CheckSelected.checkSelectedInTable($scope.itemEdit, $scope.CustomerCollection, $scope.items);
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
			templateUrl: 'order/customer/tmplCustomerEdit.tpl.html',
			size: 'lg',
			windowClass: 'hmodal-info',
			controller: 'ctrlCustomerEdit',
			resolve: {
				itemEdit: function() {
					if(isNew) {
						return new ServiceCustomer();
					} else {
						return $scope.itemEdit;
					}
				},
				genderDefinition: function() {
					return $scope.genderDefinition;
				},
				sourceAttentionDefinition: function() {
					return $scope.sourceAttentionDefinition;
				},
				addressesCompanyDefinition: function() {
					return $scope.addressesCompanyDefinition;
				},
				addressesDefinition: function() {
					return $scope.addressesDefinition;
				},
				orderHeadingsDefinition: function() {
					return $scope.orderHeadingsDefinition;
				},
			}
		})
		.result.then(function(result) {
			if(!angular.isDefined(result.id)) {
				ServiceCustomer.saveCustom('stockmanagement/customers', result, function(savedObject) {
					$scope.items.unshift(savedObject);
					if($scope.itemEdit !== null) {
						var index = $scope.items.map(function(it) { return it.id; }).indexOf($scope.itemEdit.id);
						$scope.items[index].isSelected = false;
					}
					$scope.itemEdit = angular.extend(savedObject);
					$scope.items[0].isSelected = true;
				});
			 } else {
				 ServiceCustomer.updateCustom('stockmanagement/customers/'+result.id, result, function(savedObject) {
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


.controller('ctrlCustomerEdit',['$scope', 'Localization', '$modal', '$modalInstance', 'dialogs',
	'ServiceCustomer', 'ServiceGender', 'ServiceSourceAttention', 'ServiceAddress', 'ServiceOrderHeading',   'genderDefinition',  'sourceAttentionDefinition',  'addressesCompanyDefinition',  'addressesDefinition',  'orderHeadingsDefinition',   'itemEdit',
function($scope, Localization, $modal, $modalInstance, dialogs,
	ServiceCustomer, ServiceGender, ServiceSourceAttention, ServiceAddress, ServiceOrderHeading,  genderDefinition,  sourceAttentionDefinition,  addressesCompanyDefinition,  addressesDefinition,  orderHeadingsDefinition,  itemEdit) {

	// dialog mode
	$scope.mode = 'edit';

	// original item state
	var original = angular.copy(itemEdit);
	// item state
	$scope.itemEdit = angular.copy(original);

	// gender with properties
	$scope.genderDefinition = genderDefinition;
	// sourceAttention with properties
	$scope.sourceAttentionDefinition = sourceAttentionDefinition;
	// addressesCompany with properties
	$scope.addressesCompanyDefinition = addressesCompanyDefinition;
	// addresses with properties
	$scope.addressesDefinition = addressesDefinition;
	// orderHeadings with properties
	$scope.orderHeadingsDefinition = orderHeadingsDefinition;

	// datepicker logic

	// date properties
	$scope.openedCCreateDate = false;

	$scope.open = function($event, opened) {
		$event.preventDefault();
		$event.stopPropagation();
		$scope[opened] = true;
	};



	// Choose gender
	$scope.openChooseGenderDialog = function() {
        $modal.open({
            backdrop: 'static',
            keyboard : false,
            templateUrl: 'initialization/customer/tmplGenderChoose.tpl.html',
            size: 'lg',
            controller: 'ctrlGenderChoose',
            windowClass: 'hmodal-info',
            resolve: {
				itemEdit: function() {
					if(angular.isDefined($scope.itemEdit.gender)){
						return $scope.itemEdit.gender;
					}
				}
			}
		}).result.then(function(result) {
			$scope.itemEdit.gender = angular.copy(result);
		});
    };


	// Choose sourceAttention
	$scope.openChooseSourceAttentionDialog = function() {
        $modal.open({
            backdrop: 'static',
            keyboard : false,
            templateUrl: 'initialization/customer/tmplSourceAttentionChoose.tpl.html',
            size: 'lg',
            controller: 'ctrlSourceAttentionChoose',
            windowClass: 'hmodal-info',
            resolve: {
				itemEdit: function() {
					if(angular.isDefined($scope.itemEdit.sourceAttention)){
						return $scope.itemEdit.sourceAttention;
					}
				}
			}
		}).result.then(function(result) {
			$scope.itemEdit.sourceAttention = angular.copy(result);
		});
    };


	// Save Button
	$scope.save = function() {
		correctDateTime($scope.itemEdit.CCreateDate);
	   //	delete $scope.itemEdit.isSelected;
        var item;
        var i;
        for(i in $scope.itemEdit.addressesCompany) {
    		item = $scope.itemEdit.addressesCompany[i];
    		delete item.isSelected;
    	}
        for(i in $scope.itemEdit.addresses) {
    		item = $scope.itemEdit.addresses[i];
    		delete item.isSelected;
    	}
        for(i in $scope.itemEdit.orderHeadings) {
    		item = $scope.itemEdit.orderHeadings[i];
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
		var item = $scope.itemEdit;
		return                 item.CFirstName  &&                 item.CLastName  ;
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


.controller('ctrlCustomerChoose', ['$scope','ServiceCustomer', 'dialogs', '$modal', '$modalInstance', 'itemEdit',
function($scope, ServiceCustomer, dialogs, $modal,  $modalInstance, itemEdit) {

    // entity with properties
    $scope.itemDefinition = {
        label: 'order.customer',
        properties: [
            { label: 'cFirstName', name:'CFirstName', inTable:  true  },
            { label: 'cLastName', name:'CLastName', inTable:  true  },
            { label: 'cPhone', name:'CPhone', inTable:  false  },
            { label: 'cEmail', name:'CEmail', inTable:  false  },
            { label: 'cCreateDate', name:'CCreateDate', inTable:  false  },
            { label: 'cGender', name:'CGender', inTable:  false  },
        ]
    };

	$scope.items = [];
	$scope.itemEdit = {};

	// fill table with data
	$scope.loaded = false;
	var getCustomers = function() {
		if(!$scope.loaded && $scope.items.length === 0) {
			$scope.isLoading = true;
			ServiceCustomer.query(function(data) {
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
	getCustomers();

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