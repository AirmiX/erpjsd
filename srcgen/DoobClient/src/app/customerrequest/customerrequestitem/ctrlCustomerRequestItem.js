'use strict';

angular.module('Doob.customerrequest')


.controller('ctrlCustomerRequestItem',['$scope', '$rootScope', '$modal', 'dialogs', 'CheckSelected', 'ServiceCustomerRequestItem',
    function($scope, $rootScope, $modal, dialogs, CheckSelected, ServiceCustomerRequestItem) {

	// main entity (customerRequestItem) properties names and labels
	$scope.itemDefinition = {
		label: 'customerrequest.customerRequestItem',
		properties: [
			{ label: 'cRIOrdinalNumber', name:'CRIOrdinalNumber', inTable:  true  },
			{ label: 'cRIQuantity', name:'CRIQuantity', inTable:  true  },
			{ label: 'cRICostingPrice', name:'CRICostingPrice', inTable:  false  },
			{ label: 'cRISellingPrice', name:'CRISellingPrice', inTable:  false  },
			{ label: 'cRIDeliveryTime', name:'CRIDeliveryTime', inTable:  true  },
			{ label: 'cRIDrawingNumber', name:'CRIDrawingNumber', inTable:  false  },
			{ label: 'cRICustomerProuctCode', name:'CRICustomerProuctCode', inTable:  false  },
			{ label: 'cRIRemark', name:'CRIRemark', inTable:  false  },
			{ label: 'cRICalculation', name:'CRICalculation', inTable:  false  },
			{ label: 'cRIPreviouslyProduced', name:'CRIPreviouslyProduced', inTable:  false  },
			{ label: 'cRIPrintingStatus', name:'CRIPrintingStatus', inTable:  false  },
			{ label: 'cRIDeadlineTime', name:'CRIDeadlineTime', inTable:  false  },
			{ label: 'cRIDeltedStatus', name:'CRIDeltedStatus', inTable:  false  },
		]
	};

	// urgentStatus with properties names and labels
	$scope.urgentStatusDefinition = {
		label: 'initialization.urgentStatus',
		properties : [
			{ label: 'uSCode', name:'USCode' },
			{ label: 'uSDescription', name:'USDescription' },
		]
	};
	// currency with properties names and labels
	$scope.currencyDefinition = {
		label: 'capacitymanagement.currency',
		properties : [
			{ label: 'cCurrencyDesignation', name:'CCurrencyDesignation' },
		]
	};
	// customerRequestHeader with properties names and labels
	$scope.customerRequestHeaderDefinition = {
		label: 'customerrequest.customerRequestHeading',
		properties : [
			{ label: 'cRHDocumentNumber', name:'CRHDocumentNumber' },
			{ label: 'cRHRegistrationDate', name:'CRHRegistrationDate' },
			{ label: 'cRHSignNumberCustomerInquiry', name:'CRHSignNumberCustomerInquiry' },
			{ label: 'cRHInquiryDate', name:'CRHInquiryDate' },
		]
	};
	// organizationUnit with properties names and labels
	$scope.organizationUnitDefinition = {
		label: 'corporation.organizationUnit',
		properties : [
			{ label: 'oUIdentificationCode', name:'OUIdentificationCode' },
			{ label: 'oUName', name:'OUName' },
		]
	};
	// commercialityStatus with properties names and labels
	$scope.commercialityStatusDefinition = {
		label: 'initialization.commercialityStatus',
		properties : [
			{ label: 'cSCode', name:'CSCode' },
			{ label: 'cSName', name:'CSName' },
		]
	};
	// identification with properties names and labels
	$scope.identificationDefinition = {
		label: 'commonbusinessentities.identification',
		properties : [
			{ label: 'iIdentificationCode', name:'IIdentificationCode' },
		]
	};

	// fill table with data
	$scope.items = [];
	$scope.loaded = false;
	var getCustomerRequestItems = function() {
		if(!$scope.loaded && $scope.items.length === 0) {
			$scope.isLoading = true;
			ServiceCustomerRequestItem.query(function(data) {
				$scope.items = data;
				$scope.isLoading = false;
				$scope.loaded = true;
			});
		}
	};
	getCustomerRequestItems();

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

	$scope.$watch('CustomerRequestItemCollection', function() {
		$scope.itemEdit = CheckSelected.checkSelectedInTable($scope.itemEdit, $scope.CustomerRequestItemCollection, $scope.items);
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
			templateUrl: 'customerrequest/customerrequestitem/tmplCustomerRequestItemEdit.tpl.html',
			size: 'lg',
			windowClass: 'hmodal-info',
			controller: 'ctrlCustomerRequestItemEdit',
			resolve: {
				itemEdit: function() {
					if(isNew) {
						return new ServiceCustomerRequestItem();
					} else {
						return $scope.itemEdit;
					}
				},
				urgentStatusDefinition: function() {
					return $scope.urgentStatusDefinition;
				},
				currencyDefinition: function() {
					return $scope.currencyDefinition;
				},
				customerRequestHeaderDefinition: function() {
					return $scope.customerRequestHeaderDefinition;
				},
				organizationUnitDefinition: function() {
					return $scope.organizationUnitDefinition;
				},
				commercialityStatusDefinition: function() {
					return $scope.commercialityStatusDefinition;
				},
				identificationDefinition: function() {
					return $scope.identificationDefinition;
				},
			}
		})
		.result.then(function(result) {
			if(!angular.isDefined(result.id)) {
				ServiceCustomerRequestItem.saveCustom('stockmanagement/customerrequestitems', result, function(savedObject) {
					$scope.items.unshift(savedObject);
					if($scope.itemEdit !== null) {
						var index = $scope.items.map(function(it) { return it.id; }).indexOf($scope.itemEdit.id);
						$scope.items[index].isSelected = false;
					}
					$scope.itemEdit = angular.extend(savedObject);
					$scope.items[0].isSelected = true;
				});
			 } else {
				 ServiceCustomerRequestItem.updateCustom('stockmanagement/customerrequestitems/'+result.id, result, function(savedObject) {
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


.controller('ctrlCustomerRequestItemEdit',['$scope', 'Localization', '$modal', '$modalInstance', 'dialogs',
	'ServiceCustomerRequestItem', 'ServiceUrgentStatus', 'ServiceCurrency', 'ServiceCustomerRequestHeading', 'ServiceOrganizationUnit', 'ServiceCommercialityStatus', 'ServiceIdentification',   'urgentStatusDefinition',  'currencyDefinition',  'customerRequestHeaderDefinition',  'organizationUnitDefinition',  'commercialityStatusDefinition',  'identificationDefinition',   'itemEdit',
function($scope, Localization, $modal, $modalInstance, dialogs,
	ServiceCustomerRequestItem, ServiceUrgentStatus, ServiceCurrency, ServiceCustomerRequestHeading, ServiceOrganizationUnit, ServiceCommercialityStatus, ServiceIdentification,  urgentStatusDefinition,  currencyDefinition,  customerRequestHeaderDefinition,  organizationUnitDefinition,  commercialityStatusDefinition,  identificationDefinition,  itemEdit) {

	// dialog mode
	$scope.mode = 'edit';

	// original item state
	var original = angular.copy(itemEdit);
	// item state
	$scope.itemEdit = angular.copy(original);

	// urgentStatus with properties
	$scope.urgentStatusDefinition = urgentStatusDefinition;
	// currency with properties
	$scope.currencyDefinition = currencyDefinition;
	// customerRequestHeader with properties
	$scope.customerRequestHeaderDefinition = customerRequestHeaderDefinition;
	// organizationUnit with properties
	$scope.organizationUnitDefinition = organizationUnitDefinition;
	// commercialityStatus with properties
	$scope.commercialityStatusDefinition = commercialityStatusDefinition;
	// identification with properties
	$scope.identificationDefinition = identificationDefinition;

	// datepicker logic

	// date properties
	$scope.openedCRIDeadlineTime = false;

	$scope.open = function($event, opened) {
		$event.preventDefault();
		$event.stopPropagation();
		$scope[opened] = true;
	};



	// Choose urgentStatus
	$scope.openChooseUrgentStatusDialog = function() {
        $modal.open({
            backdrop: 'static',
            keyboard : false,
            templateUrl: 'initialization/customerrequestitem/tmplUrgentStatusChoose.tpl.html',
            size: 'lg',
            controller: 'ctrlUrgentStatusChoose',
            windowClass: 'hmodal-info',
            resolve: {
				itemEdit: function() {
					if(angular.isDefined($scope.itemEdit.urgentStatus)){
						return $scope.itemEdit.urgentStatus;
					}
				}
			}
		}).result.then(function(result) {
			$scope.itemEdit.urgentStatus = angular.copy(result);
		});
    };


	// Choose currency
	$scope.openChooseCurrencyDialog = function() {
        $modal.open({
            backdrop: 'static',
            keyboard : false,
            templateUrl: 'capacitymanagement/customerrequestitem/tmplCurrencyChoose.tpl.html',
            size: 'lg',
            controller: 'ctrlCurrencyChoose',
            windowClass: 'hmodal-info',
            resolve: {
				itemEdit: function() {
					if(angular.isDefined($scope.itemEdit.currency)){
						return $scope.itemEdit.currency;
					}
				}
			}
		}).result.then(function(result) {
			$scope.itemEdit.currency = angular.copy(result);
		});
    };


	// Choose customerRequestHeader
	$scope.openChooseCustomerRequestHeaderDialog = function() {
        $modal.open({
            backdrop: 'static',
            keyboard : false,
            templateUrl: 'customerrequest/customerrequestitem/tmplCustomerRequestHeadingChoose.tpl.html',
            size: 'lg',
            controller: 'ctrlCustomerRequestHeadingChoose',
            windowClass: 'hmodal-info',
            resolve: {
				itemEdit: function() {
					if(angular.isDefined($scope.itemEdit.customerRequestHeader)){
						return $scope.itemEdit.customerRequestHeader;
					}
				}
			}
		}).result.then(function(result) {
			$scope.itemEdit.customerRequestHeader = angular.copy(result);
		});
    };


	// Choose organizationUnit
	$scope.openChooseOrganizationUnitDialog = function() {
        $modal.open({
            backdrop: 'static',
            keyboard : false,
            templateUrl: 'corporation/customerrequestitem/tmplOrganizationUnitChoose.tpl.html',
            size: 'lg',
            controller: 'ctrlOrganizationUnitChoose',
            windowClass: 'hmodal-info',
            resolve: {
				itemEdit: function() {
					if(angular.isDefined($scope.itemEdit.organizationUnit)){
						return $scope.itemEdit.organizationUnit;
					}
				}
			}
		}).result.then(function(result) {
			$scope.itemEdit.organizationUnit = angular.copy(result);
		});
    };


	// Choose commercialityStatus
	$scope.openChooseCommercialityStatusDialog = function() {
        $modal.open({
            backdrop: 'static',
            keyboard : false,
            templateUrl: 'initialization/customerrequestitem/tmplCommercialityStatusChoose.tpl.html',
            size: 'lg',
            controller: 'ctrlCommercialityStatusChoose',
            windowClass: 'hmodal-info',
            resolve: {
				itemEdit: function() {
					if(angular.isDefined($scope.itemEdit.commercialityStatus)){
						return $scope.itemEdit.commercialityStatus;
					}
				}
			}
		}).result.then(function(result) {
			$scope.itemEdit.commercialityStatus = angular.copy(result);
		});
    };


	// Choose identification
	$scope.openChooseIdentificationDialog = function() {
        $modal.open({
            backdrop: 'static',
            keyboard : false,
            templateUrl: 'commonbusinessentities/customerrequestitem/tmplIdentificationChoose.tpl.html',
            size: 'lg',
            controller: 'ctrlIdentificationChoose',
            windowClass: 'hmodal-info',
            resolve: {
				itemEdit: function() {
					if(angular.isDefined($scope.itemEdit.identification)){
						return $scope.itemEdit.identification;
					}
				}
			}
		}).result.then(function(result) {
			$scope.itemEdit.identification = angular.copy(result);
		});
    };


	// Save Button
	$scope.save = function() {
		correctDateTime($scope.itemEdit.CRIDeadlineTime);
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
		return                 item.CRIOrdinalNumber  &&                 item.CRIQuantity  &&                 item.CRIDeliveryTime  ;
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


.controller('ctrlCustomerRequestItemChoose', ['$scope','ServiceCustomerRequestItem', 'dialogs', '$modal', '$modalInstance', 'itemEdit',
function($scope, ServiceCustomerRequestItem, dialogs, $modal,  $modalInstance, itemEdit) {

    // entity with properties
    $scope.itemDefinition = {
        label: 'customerrequest.customerRequestItem',
        properties: [
            { label: 'cRIOrdinalNumber', name:'CRIOrdinalNumber', inTable:  true  },
            { label: 'cRIQuantity', name:'CRIQuantity', inTable:  true  },
            { label: 'cRICostingPrice', name:'CRICostingPrice', inTable:  false  },
            { label: 'cRISellingPrice', name:'CRISellingPrice', inTable:  false  },
            { label: 'cRIDeliveryTime', name:'CRIDeliveryTime', inTable:  true  },
            { label: 'cRIDrawingNumber', name:'CRIDrawingNumber', inTable:  false  },
            { label: 'cRICustomerProuctCode', name:'CRICustomerProuctCode', inTable:  false  },
            { label: 'cRIRemark', name:'CRIRemark', inTable:  false  },
            { label: 'cRICalculation', name:'CRICalculation', inTable:  false  },
            { label: 'cRIPreviouslyProduced', name:'CRIPreviouslyProduced', inTable:  false  },
            { label: 'cRIPrintingStatus', name:'CRIPrintingStatus', inTable:  false  },
            { label: 'cRIDeadlineTime', name:'CRIDeadlineTime', inTable:  false  },
            { label: 'cRIDeltedStatus', name:'CRIDeltedStatus', inTable:  false  },
        ]
    };

	$scope.items = [];
	$scope.itemEdit = {};

	// fill table with data
	$scope.loaded = false;
	var getCustomerRequestItems = function() {
		if(!$scope.loaded && $scope.items.length === 0) {
			$scope.isLoading = true;
			ServiceCustomerRequestItem.query(function(data) {
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
	getCustomerRequestItems();

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