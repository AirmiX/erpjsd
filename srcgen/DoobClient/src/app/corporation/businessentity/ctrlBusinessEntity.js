'use strict';

angular.module('Doob.corporation')


.controller('ctrlBusinessEntity',['$scope', '$rootScope', '$modal', 'dialogs', 'CheckSelected', 'ServiceBusinessEntity',
    function($scope, $rootScope, $modal, dialogs, CheckSelected, ServiceBusinessEntity) {

	// main entity (businessEntity) properties names and labels
	$scope.itemDefinition = {
		label: 'corporation.businessEntity',
		properties: [
			{ label: 'bEIdentificationCode', name:'BEIdentificationCode', inTable:  true  },
			{ label: 'bEName', name:'BEName', inTable:  true  },
			{ label: 'bEShortName', name:'BEShortName', inTable:  true  },
			{ label: 'bELogo', name:'BELogo', inTable:  false  },
			{ label: 'bELogoCounter', name:'BELogoCounter', inTable:  false  },
			{ label: 'bETelephone', name:'BETelephone', inTable:  true  },
			{ label: 'bEFax', name:'BEFax', inTable:  true  },
			{ label: 'bEEmail', name:'BEEmail', inTable:  false  },
			{ label: 'bEWeb', name:'BEWeb', inTable:  false  },
			{ label: 'bECompanyNumber', name:'BECompanyNumber', inTable:  true  },
			{ label: 'bERegistrationNumber', name:'BERegistrationNumber', inTable:  true  },
			{ label: 'bEActivityType', name:'BEActivityType', inTable:  false  },
		]
	};

	// address with properties names and labels
	$scope.addressDefinition = {
		label: 'environment.address',
		properties : [
		]
	};
	// beOrderHeadingsCustomer with properties names and labels
	$scope.beOrderHeadingsCustomerDefinition = {
		label: 'internalorder.bEOrderHeading',
		properties : [
			{ label: 'bEOHDocumentNumber', name:'BEOHDocumentNumber' },
			{ label: 'bEOHCreationDate', name:'BEOHCreationDate' },
			{ label: 'bEOHOrderDate', name:'BEOHOrderDate' },
		]
	};
	// organizationSchema with properties names and labels
	$scope.organizationSchemaDefinition = {
		label: 'corporation.organizationSchema',
		properties : [
			{ label: 'oSName', name:'OSName' },
			{ label: 'oSYear', name:'OSYear' },
			{ label: 'oSStartDate', name:'OSStartDate' },
			{ label: 'oSCreationDate', name:'OSCreationDate' },
		]
	};
	// accounts with properties names and labels
	$scope.accountsDefinition = {
		label: 'corporation.bankAccount',
		properties : [
			{ label: 'bAAccountNumber', name:'BAAccountNumber' },
		]
	};
	// beOrderHeadingsSeller with properties names and labels
	$scope.beOrderHeadingsSellerDefinition = {
		label: 'internalorder.bEOrderHeading',
		properties : [
			{ label: 'bEOHDocumentNumber', name:'BEOHDocumentNumber' },
			{ label: 'bEOHCreationDate', name:'BEOHCreationDate' },
			{ label: 'bEOHOrderDate', name:'BEOHOrderDate' },
		]
	};

	// fill table with data
	$scope.items = [];
	$scope.loaded = false;
	var getBusinessEntitys = function() {
		if(!$scope.loaded && $scope.items.length === 0) {
			$scope.isLoading = true;
			ServiceBusinessEntity.query(function(data) {
				$scope.items = data;
				$scope.isLoading = false;
				$scope.loaded = true;
			});
		}
	};
	getBusinessEntitys();

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

	$scope.$watch('BusinessEntityCollection', function() {
		$scope.itemEdit = CheckSelected.checkSelectedInTable($scope.itemEdit, $scope.BusinessEntityCollection, $scope.items);
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
			templateUrl: 'corporation/businessentity/tmplBusinessEntityEdit.tpl.html',
			size: 'lg',
			windowClass: 'hmodal-info',
			controller: 'ctrlBusinessEntityEdit',
			resolve: {
				itemEdit: function() {
					if(isNew) {
						return new ServiceBusinessEntity();
					} else {
						return $scope.itemEdit;
					}
				},
				addressDefinition: function() {
					return $scope.addressDefinition;
				},
				beOrderHeadingsCustomerDefinition: function() {
					return $scope.beOrderHeadingsCustomerDefinition;
				},
				organizationSchemaDefinition: function() {
					return $scope.organizationSchemaDefinition;
				},
				accountsDefinition: function() {
					return $scope.accountsDefinition;
				},
				beOrderHeadingsSellerDefinition: function() {
					return $scope.beOrderHeadingsSellerDefinition;
				},
			}
		})
		.result.then(function(result) {
			if(!angular.isDefined(result.id)) {
				ServiceBusinessEntity.saveCustom('stockmanagement/businessentitys', result, function(savedObject) {
					$scope.items.unshift(savedObject);
					if($scope.itemEdit !== null) {
						var index = $scope.items.map(function(it) { return it.id; }).indexOf($scope.itemEdit.id);
						$scope.items[index].isSelected = false;
					}
					$scope.itemEdit = angular.extend(savedObject);
					$scope.items[0].isSelected = true;
				});
			 } else {
				 ServiceBusinessEntity.updateCustom('stockmanagement/businessentitys/'+result.id, result, function(savedObject) {
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


.controller('ctrlBusinessEntityEdit',['$scope', 'Localization', '$modal', '$modalInstance', 'dialogs',
	'ServiceBusinessEntity', 'ServiceAddress', 'ServiceBEOrderHeading', 'ServiceOrganizationSchema', 'ServiceBankAccount',   'addressDefinition',  'beOrderHeadingsCustomerDefinition',  'organizationSchemaDefinition',  'accountsDefinition',  'beOrderHeadingsSellerDefinition',   'itemEdit',
function($scope, Localization, $modal, $modalInstance, dialogs,
	ServiceBusinessEntity, ServiceAddress, ServiceBEOrderHeading, ServiceOrganizationSchema, ServiceBankAccount,  addressDefinition,  beOrderHeadingsCustomerDefinition,  organizationSchemaDefinition,  accountsDefinition,  beOrderHeadingsSellerDefinition,  itemEdit) {

	// dialog mode
	$scope.mode = 'edit';

	// original item state
	var original = angular.copy(itemEdit);
	// item state
	$scope.itemEdit = angular.copy(original);

	// address with properties
	$scope.addressDefinition = addressDefinition;
	// beOrderHeadingsCustomer with properties
	$scope.beOrderHeadingsCustomerDefinition = beOrderHeadingsCustomerDefinition;
	// organizationSchema with properties
	$scope.organizationSchemaDefinition = organizationSchemaDefinition;
	// accounts with properties
	$scope.accountsDefinition = accountsDefinition;
	// beOrderHeadingsSeller with properties
	$scope.beOrderHeadingsSellerDefinition = beOrderHeadingsSellerDefinition;

	// datepicker logic

	// date properties

	$scope.open = function($event, opened) {
		$event.preventDefault();
		$event.stopPropagation();
		$scope[opened] = true;
	};



	// Choose address
	$scope.openChooseAddressDialog = function() {
        $modal.open({
            backdrop: 'static',
            keyboard : false,
            templateUrl: 'environment/businessentity/tmplAddressChoose.tpl.html',
            size: 'lg',
            controller: 'ctrlAddressChoose',
            windowClass: 'hmodal-info',
            resolve: {
				itemEdit: function() {
					if(angular.isDefined($scope.itemEdit.address)){
						return $scope.itemEdit.address;
					}
				}
			}
		}).result.then(function(result) {
			$scope.itemEdit.address = angular.copy(result);
		});
    };


	// Save Button
	$scope.save = function() {
	   //	delete $scope.itemEdit.isSelected;
        var item;
        var i;
        for(i in $scope.itemEdit.beOrderHeadingsCustomer) {
    		item = $scope.itemEdit.beOrderHeadingsCustomer[i];
    		delete item.isSelected;
    	}
        for(i in $scope.itemEdit.organizationSchema) {
    		item = $scope.itemEdit.organizationSchema[i];
    		delete item.isSelected;
    	}
        for(i in $scope.itemEdit.accounts) {
    		item = $scope.itemEdit.accounts[i];
    		delete item.isSelected;
    	}
        for(i in $scope.itemEdit.beOrderHeadingsSeller) {
    		item = $scope.itemEdit.beOrderHeadingsSeller[i];
    		delete item.isSelected;
    	}
		$modalInstance.close($scope.itemEdit);
	};


	$scope.canSave = function() {
		var item = $scope.itemEdit;
		return                 item.BEIdentificationCode  &&                 item.BEName  &&                 item.BEShortName  &&                 item.BETelephone  &&                 item.BEFax  &&                 item.BECompanyNumber  &&                 item.BERegistrationNumber  ;
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


.controller('ctrlBusinessEntityChoose', ['$scope','ServiceBusinessEntity', 'dialogs', '$modal', '$modalInstance', 'itemEdit',
function($scope, ServiceBusinessEntity, dialogs, $modal,  $modalInstance, itemEdit) {

    // entity with properties
    $scope.itemDefinition = {
        label: 'corporation.businessEntity',
        properties: [
            { label: 'bEIdentificationCode', name:'BEIdentificationCode', inTable:  true  },
            { label: 'bEName', name:'BEName', inTable:  true  },
            { label: 'bEShortName', name:'BEShortName', inTable:  true  },
            { label: 'bELogo', name:'BELogo', inTable:  false  },
            { label: 'bELogoCounter', name:'BELogoCounter', inTable:  false  },
            { label: 'bETelephone', name:'BETelephone', inTable:  true  },
            { label: 'bEFax', name:'BEFax', inTable:  true  },
            { label: 'bEEmail', name:'BEEmail', inTable:  false  },
            { label: 'bEWeb', name:'BEWeb', inTable:  false  },
            { label: 'bECompanyNumber', name:'BECompanyNumber', inTable:  true  },
            { label: 'bERegistrationNumber', name:'BERegistrationNumber', inTable:  true  },
            { label: 'bEActivityType', name:'BEActivityType', inTable:  false  },
        ]
    };

	$scope.items = [];
	$scope.itemEdit = {};

	// fill table with data
	$scope.loaded = false;
	var getBusinessEntitys = function() {
		if(!$scope.loaded && $scope.items.length === 0) {
			$scope.isLoading = true;
			ServiceBusinessEntity.query(function(data) {
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
	getBusinessEntitys();

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