'use strict';

angular.module('Doob.procurement')


.controller('ctrlProFormaInvoice',['$scope', '$rootScope', '$modal', 'dialogs', 'CheckSelected', 'ServiceProFormaInvoice',
    function($scope, $rootScope, $modal, dialogs, CheckSelected, ServiceProFormaInvoice) {

	// main entity (proFormaInvoice) properties names and labels
	$scope.itemDefinition = {
		label: 'procurement.proFormaInvoice',
		properties: [
			{ label: 'pFINumber1', name:'PFINumber1', inTable:  true  },
			{ label: 'pFIDate', name:'PFIDate', inTable:  true  },
			{ label: 'pFIStatus', name:'PFIStatus', inTable:  true  },
			{ label: 'pFIPrint', name:'PFIPrint', inTable:  true  },
			{ label: 'pFIPaymentDate', name:'PFIPaymentDate', inTable:  true  },
			{ label: 'pFISubTotal', name:'PFISubTotal', inTable:  true  },
			{ label: 'pFIRebateAmount', name:'PFIRebateAmount', inTable:  false  },
			{ label: 'pFITotal', name:'PFITotal', inTable:  false  },
			{ label: 'pFIPostalCosts', name:'PFIPostalCosts', inTable:  false  },
			{ label: 'pFIPackaging', name:'PFIPackaging', inTable:  false  },
			{ label: 'pFIAmountWithoutTax', name:'PFIAmountWithoutTax', inTable:  false  },
			{ label: 'pFITaxAmount', name:'PFITaxAmount', inTable:  false  },
			{ label: 'pFIForPayment', name:'PFIForPayment', inTable:  true  },
			{ label: 'pFIRemark', name:'PFIRemark', inTable:  false  },
			{ label: 'pFIDeclarationNumber', name:'PFIDeclarationNumber', inTable:  false  },
			{ label: 'pFIConfirmationNumber', name:'PFIConfirmationNumber', inTable:  false  },
			{ label: 'pFIDeclarationDate', name:'PFIDeclarationDate', inTable:  false  },
			{ label: 'pFIConfirmationDate', name:'PFIConfirmationDate', inTable:  false  },
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
	// currency with properties names and labels
	$scope.currencyDefinition = {
		label: 'capacitymanagement.currency',
		properties : [
			{ label: 'cCurrencyDesignation', name:'CCurrencyDesignation' },
		]
	};
	// declarationBasis with properties names and labels
	$scope.declarationBasisDefinition = {
		label: 'initialization.declarationBasis',
		properties : [
			{ label: 'dBCode', name:'DBCode' },
			{ label: 'dBDescription', name:'DBDescription' },
		]
	};
	// documentType with properties names and labels
	$scope.documentTypeDefinition = {
		label: 'corporation.documentType',
		properties : [
			{ label: 'dTIdentificationNumber', name:'DTIdentificationNumber' },
			{ label: 'dTName', name:'DTName' },
			{ label: 'dTShortName', name:'DTShortName' },
		]
	};
	// orderHeading with properties names and labels
	$scope.orderHeadingDefinition = {
		label: 'order.orderHeading',
		properties : [
			{ label: 'oHDocumentNumber', name:'OHDocumentNumber' },
			{ label: 'oHCreationDate', name:'OHCreationDate' },
			{ label: 'oHOrderNumberOfBuyer', name:'OHOrderNumberOfBuyer' },
			{ label: 'oHOrderDate', name:'OHOrderDate' },
			{ label: 'oHPaymentPeriodBuyer', name:'OHPaymentPeriodBuyer' },
		]
	};
	// identifications with properties names and labels
	$scope.identificationsDefinition = {
		label: 'commonbusinessentities.identification',
		properties : [
			{ label: 'iIdentificationCode', name:'IIdentificationCode' },
		]
	};
	// paymentCondition with properties names and labels
	$scope.paymentConditionDefinition = {
		label: 'initialization.paymentCondition',
		properties : [
			{ label: 'pCCode', name:'PCCode' },
			{ label: 'pCDescription', name:'PCDescription' },
		]
	};
	// taxesProFormaInvoices with properties names and labels
	$scope.taxesProFormaInvoicesDefinition = {
		label: 'procurement.taxProformaInvoice',
		properties : [
			{ label: 'tPIOrdinalNumber', name:'TPIOrdinalNumber' },
			{ label: 'tPIDescription', name:'TPIDescription' },
			{ label: 'tPIRate', name:'TPIRate' },
			{ label: 'tPIAmount', name:'TPIAmount' },
			{ label: 'tPIAccount', name:'TPIAccount' },
		]
	};

	// fill table with data
	$scope.items = [];
	$scope.loaded = false;
	var getProFormaInvoices = function() {
		if(!$scope.loaded && $scope.items.length === 0) {
			$scope.isLoading = true;
			ServiceProFormaInvoice.query(function(data) {
				$scope.items = data;
				$scope.isLoading = false;
				$scope.loaded = true;
			});
		}
	};
	getProFormaInvoices();

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

	$scope.$watch('ProFormaInvoiceCollection', function() {
		$scope.itemEdit = CheckSelected.checkSelectedInTable($scope.itemEdit, $scope.ProFormaInvoiceCollection, $scope.items);
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
			templateUrl: 'procurement/proformainvoice/tmplProFormaInvoiceEdit.tpl.html',
			size: 'lg',
			windowClass: 'hmodal-info',
			controller: 'ctrlProFormaInvoiceEdit',
			resolve: {
				itemEdit: function() {
					if(isNew) {
						return new ServiceProFormaInvoice();
					} else {
						return $scope.itemEdit;
					}
				},
				organizationUnitDefinition: function() {
					return $scope.organizationUnitDefinition;
				},
				currencyDefinition: function() {
					return $scope.currencyDefinition;
				},
				declarationBasisDefinition: function() {
					return $scope.declarationBasisDefinition;
				},
				documentTypeDefinition: function() {
					return $scope.documentTypeDefinition;
				},
				orderHeadingDefinition: function() {
					return $scope.orderHeadingDefinition;
				},
				identificationsDefinition: function() {
					return $scope.identificationsDefinition;
				},
				paymentConditionDefinition: function() {
					return $scope.paymentConditionDefinition;
				},
				taxesProFormaInvoicesDefinition: function() {
					return $scope.taxesProFormaInvoicesDefinition;
				},
			}
		})
		.result.then(function(result) {
			if(!angular.isDefined(result.id)) {
				ServiceProFormaInvoice.saveCustom('stockmanagement/proformainvoices', result, function(savedObject) {
					$scope.items.unshift(savedObject);
					if($scope.itemEdit !== null) {
						var index = $scope.items.map(function(it) { return it.id; }).indexOf($scope.itemEdit.id);
						$scope.items[index].isSelected = false;
					}
					$scope.itemEdit = angular.extend(savedObject);
					$scope.items[0].isSelected = true;
				});
			 } else {
				 ServiceProFormaInvoice.updateCustom('stockmanagement/proformainvoices/'+result.id, result, function(savedObject) {
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


.controller('ctrlProFormaInvoiceEdit',['$scope', 'Localization', '$modal', '$modalInstance', 'dialogs',
	'ServiceProFormaInvoice', 'ServiceOrganizationUnit', 'ServiceCurrency', 'ServiceDeclarationBasis', 'ServiceDocumentType', 'ServiceOrderHeading', 'ServiceIdentification', 'ServicePaymentCondition', 'ServiceTaxProformaInvoice',   'organizationUnitDefinition',  'currencyDefinition',  'declarationBasisDefinition',  'documentTypeDefinition',  'orderHeadingDefinition',  'identificationsDefinition',  'paymentConditionDefinition',  'taxesProFormaInvoicesDefinition',   'itemEdit',
function($scope, Localization, $modal, $modalInstance, dialogs,
	ServiceProFormaInvoice, ServiceOrganizationUnit, ServiceCurrency, ServiceDeclarationBasis, ServiceDocumentType, ServiceOrderHeading, ServiceIdentification, ServicePaymentCondition, ServiceTaxProformaInvoice,  organizationUnitDefinition,  currencyDefinition,  declarationBasisDefinition,  documentTypeDefinition,  orderHeadingDefinition,  identificationsDefinition,  paymentConditionDefinition,  taxesProFormaInvoicesDefinition,  itemEdit) {

	// dialog mode
	$scope.mode = 'edit';

	// original item state
	var original = angular.copy(itemEdit);
	// item state
	$scope.itemEdit = angular.copy(original);

	// organizationUnit with properties
	$scope.organizationUnitDefinition = organizationUnitDefinition;
	// currency with properties
	$scope.currencyDefinition = currencyDefinition;
	// declarationBasis with properties
	$scope.declarationBasisDefinition = declarationBasisDefinition;
	// documentType with properties
	$scope.documentTypeDefinition = documentTypeDefinition;
	// orderHeading with properties
	$scope.orderHeadingDefinition = orderHeadingDefinition;
	// identifications with properties
	$scope.identificationsDefinition = identificationsDefinition;
	// paymentCondition with properties
	$scope.paymentConditionDefinition = paymentConditionDefinition;
	// taxesProFormaInvoices with properties
	$scope.taxesProFormaInvoicesDefinition = taxesProFormaInvoicesDefinition;

	// datepicker logic

	// date properties
	$scope.openedPFIDate = false;
	$scope.openedPFIPaymentDate = false;
	$scope.openedPFIDeclarationDate = false;
	$scope.openedPFIConfirmationDate = false;

	$scope.open = function($event, opened) {
		$event.preventDefault();
		$event.stopPropagation();
		$scope[opened] = true;
	};



	// Choose organizationUnit
	$scope.openChooseOrganizationUnitDialog = function() {
        $modal.open({
            backdrop: 'static',
            keyboard : false,
            templateUrl: 'corporation/proformainvoice/tmplOrganizationUnitChoose.tpl.html',
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


	// Choose currency
	$scope.openChooseCurrencyDialog = function() {
        $modal.open({
            backdrop: 'static',
            keyboard : false,
            templateUrl: 'capacitymanagement/proformainvoice/tmplCurrencyChoose.tpl.html',
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


	// Choose declarationBasis
	$scope.openChooseDeclarationBasisDialog = function() {
        $modal.open({
            backdrop: 'static',
            keyboard : false,
            templateUrl: 'initialization/proformainvoice/tmplDeclarationBasisChoose.tpl.html',
            size: 'lg',
            controller: 'ctrlDeclarationBasisChoose',
            windowClass: 'hmodal-info',
            resolve: {
				itemEdit: function() {
					if(angular.isDefined($scope.itemEdit.declarationBasis)){
						return $scope.itemEdit.declarationBasis;
					}
				}
			}
		}).result.then(function(result) {
			$scope.itemEdit.declarationBasis = angular.copy(result);
		});
    };


	// Choose documentType
	$scope.openChooseDocumentTypeDialog = function() {
        $modal.open({
            backdrop: 'static',
            keyboard : false,
            templateUrl: 'corporation/proformainvoice/tmplDocumentTypeChoose.tpl.html',
            size: 'lg',
            controller: 'ctrlDocumentTypeChoose',
            windowClass: 'hmodal-info',
            resolve: {
				itemEdit: function() {
					if(angular.isDefined($scope.itemEdit.documentType)){
						return $scope.itemEdit.documentType;
					}
				}
			}
		}).result.then(function(result) {
			$scope.itemEdit.documentType = angular.copy(result);
		});
    };


	// Choose orderHeading
	$scope.openChooseOrderHeadingDialog = function() {
        $modal.open({
            backdrop: 'static',
            keyboard : false,
            templateUrl: 'order/proformainvoice/tmplOrderHeadingChoose.tpl.html',
            size: 'lg',
            controller: 'ctrlOrderHeadingChoose',
            windowClass: 'hmodal-info',
            resolve: {
				itemEdit: function() {
					if(angular.isDefined($scope.itemEdit.orderHeading)){
						return $scope.itemEdit.orderHeading;
					}
				}
			}
		}).result.then(function(result) {
			$scope.itemEdit.orderHeading = angular.copy(result);
		});
    };


	// Choose identifications
	$scope.openChooseIdentificationsDialog = function() {
        $modal.open({
            backdrop: 'static',
            keyboard : false,
            templateUrl: 'commonbusinessentities/proformainvoice/tmplIdentificationChoose.tpl.html',
            size: 'lg',
            controller: 'ctrlIdentificationChoose',
            windowClass: 'hmodal-info',
            resolve: {
				itemEdit: function() {
					if(angular.isDefined($scope.itemEdit.identifications)){
						return $scope.itemEdit.identifications;
					}
				}
			}
		}).result.then(function(result) {
			$scope.itemEdit.identifications = angular.copy(result);
		});
    };


	// Choose paymentCondition
	$scope.openChoosePaymentConditionDialog = function() {
        $modal.open({
            backdrop: 'static',
            keyboard : false,
            templateUrl: 'initialization/proformainvoice/tmplPaymentConditionChoose.tpl.html',
            size: 'lg',
            controller: 'ctrlPaymentConditionChoose',
            windowClass: 'hmodal-info',
            resolve: {
				itemEdit: function() {
					if(angular.isDefined($scope.itemEdit.paymentCondition)){
						return $scope.itemEdit.paymentCondition;
					}
				}
			}
		}).result.then(function(result) {
			$scope.itemEdit.paymentCondition = angular.copy(result);
		});
    };


	// Save Button
	$scope.save = function() {
		correctDateTime($scope.itemEdit.PFIDate);
		correctDateTime($scope.itemEdit.PFIPaymentDate);
		correctDateTime($scope.itemEdit.PFIDeclarationDate);
		correctDateTime($scope.itemEdit.PFIConfirmationDate);
	   //	delete $scope.itemEdit.isSelected;
        var item;
        var i;
        for(i in $scope.itemEdit.taxesProFormaInvoices) {
    		item = $scope.itemEdit.taxesProFormaInvoices[i];
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
		return                 item.PFINumber1  &&                 item.PFIDate  &&                 item.PFIStatus  &&                 item.PFIPrint  &&                 item.PFIPaymentDate  &&                 item.PFISubTotal  &&                 item.PFIForPayment  ;
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


.controller('ctrlProFormaInvoiceChoose', ['$scope','ServiceProFormaInvoice', 'dialogs', '$modal', '$modalInstance', 'itemEdit',
function($scope, ServiceProFormaInvoice, dialogs, $modal,  $modalInstance, itemEdit) {

    // entity with properties
    $scope.itemDefinition = {
        label: 'procurement.proFormaInvoice',
        properties: [
            { label: 'pFINumber1', name:'PFINumber1', inTable:  true  },
            { label: 'pFIDate', name:'PFIDate', inTable:  true  },
            { label: 'pFIStatus', name:'PFIStatus', inTable:  true  },
            { label: 'pFIPrint', name:'PFIPrint', inTable:  true  },
            { label: 'pFIPaymentDate', name:'PFIPaymentDate', inTable:  true  },
            { label: 'pFISubTotal', name:'PFISubTotal', inTable:  true  },
            { label: 'pFIRebateAmount', name:'PFIRebateAmount', inTable:  false  },
            { label: 'pFITotal', name:'PFITotal', inTable:  false  },
            { label: 'pFIPostalCosts', name:'PFIPostalCosts', inTable:  false  },
            { label: 'pFIPackaging', name:'PFIPackaging', inTable:  false  },
            { label: 'pFIAmountWithoutTax', name:'PFIAmountWithoutTax', inTable:  false  },
            { label: 'pFITaxAmount', name:'PFITaxAmount', inTable:  false  },
            { label: 'pFIForPayment', name:'PFIForPayment', inTable:  true  },
            { label: 'pFIRemark', name:'PFIRemark', inTable:  false  },
            { label: 'pFIDeclarationNumber', name:'PFIDeclarationNumber', inTable:  false  },
            { label: 'pFIConfirmationNumber', name:'PFIConfirmationNumber', inTable:  false  },
            { label: 'pFIDeclarationDate', name:'PFIDeclarationDate', inTable:  false  },
            { label: 'pFIConfirmationDate', name:'PFIConfirmationDate', inTable:  false  },
        ]
    };

	$scope.items = [];
	$scope.itemEdit = {};

	// fill table with data
	$scope.loaded = false;
	var getProFormaInvoices = function() {
		if(!$scope.loaded && $scope.items.length === 0) {
			$scope.isLoading = true;
			ServiceProFormaInvoice.query(function(data) {
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
	getProFormaInvoices();

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