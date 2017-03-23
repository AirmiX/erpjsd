'use strict';

angular.module('Doob.capacitymanagement')


.controller('ctrlCurrency',['$scope', '$rootScope', '$modal', 'dialogs', 'CheckSelected', 'ServiceCurrency',
    function($scope, $rootScope, $modal, dialogs, CheckSelected, ServiceCurrency) {

	// main entity (currency) properties names and labels
	$scope.itemDefinition = {
		label: 'capacitymanagement.currency',
		properties: [
			{ label: 'cCurrencyDesignation', name:'CCurrencyDesignation', inTable:  true  },
			{ label: 'cDescription', name:'CDescription', inTable:  false  },
		]
	};

	// workCenters with properties names and labels
	$scope.workCentersDefinition = {
		label: 'productiondata.workCenter',
		properties : [
			{ label: 'wCIndentificationCode', name:'WCIndentificationCode' },
			{ label: 'wCShortName', name:'WCShortName' },
			{ label: 'wCName', name:'WCName' },
			{ label: 'wCWorkingDayLenght', name:'WCWorkingDayLenght' },
			{ label: 'wCWorkingWeekLenght', name:'WCWorkingWeekLenght' },
			{ label: 'wCShiftsNumber', name:'WCShiftsNumber' },
			{ label: 'wCWorkStationsNumber', name:'WCWorkStationsNumber' },
			{ label: 'wCNumberOfEmployees', name:'WCNumberOfEmployees' },
			{ label: 'wCNumberOfSteps', name:'WCNumberOfSteps' },
			{ label: 'wCAverageWaitingTimeInFrontOfWorkCenter', name:'WCAverageWaitingTimeInFrontOfWorkCenter' },
			{ label: 'wCMaterialTransferAverageTime', name:'WCMaterialTransferAverageTime' },
			{ label: 'wCTechnicalCapacity', name:'WCTechnicalCapacity' },
			{ label: 'wCAvailableCapacity', name:'WCAvailableCapacity' },
			{ label: 'wCLoadAnalysisIndicator', name:'WCLoadAnalysisIndicator' },
			{ label: 'wCDataCompletenessStatus', name:'WCDataCompletenessStatus' },
			{ label: 'wCActitvityStatus', name:'WCActitvityStatus' },
		]
	};
	// beInvoices with properties names and labels
	$scope.beInvoicesDefinition = {
		label: 'internalinvoice.bEInvoice',
		properties : [
			{ label: 'bEIHInvoiceNumber', name:'BEIHInvoiceNumber' },
			{ label: 'bEIHCreationDateDate', name:'BEIHCreationDateDate' },
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
	// productionRequestItems with properties names and labels
	$scope.productionRequestItemsDefinition = {
		label: 'productionrequest.requestForProductionItem',
		properties : [
			{ label: 'rFPIItemNumber', name:'RFPIItemNumber' },
			{ label: 'rFPIQuantity', name:'RFPIQuantity' },
			{ label: 'rFPICreationDeadline', name:'RFPICreationDeadline' },
			{ label: 'rFPISellingPrice', name:'RFPISellingPrice' },
		]
	};
	// proformaInvoices with properties names and labels
	$scope.proformaInvoicesDefinition = {
		label: 'procurement.proFormaInvoice',
		properties : [
			{ label: 'pFINumber1', name:'PFINumber1' },
			{ label: 'pFIDate', name:'PFIDate' },
			{ label: 'pFIStatus', name:'PFIStatus' },
			{ label: 'pFIPrint', name:'PFIPrint' },
			{ label: 'pFIPaymentDate', name:'PFIPaymentDate' },
			{ label: 'pFISubTotal', name:'PFISubTotal' },
			{ label: 'pFIForPayment', name:'PFIForPayment' },
		]
	};
	// invoices with properties names and labels
	$scope.invoicesDefinition = {
		label: 'procurement.invoice',
		properties : [
			{ label: 'iInvoiceNumber', name:'IInvoiceNumber' },
			{ label: 'iInvoiceDate', name:'IInvoiceDate' },
			{ label: 'iPaymentDate', name:'IPaymentDate' },
			{ label: 'iInvoiceStatus', name:'IInvoiceStatus' },
			{ label: 'iPrintStatus', name:'IPrintStatus' },
			{ label: 'iSubTotal', name:'ISubTotal' },
			{ label: 'iPaymentAmount', name:'IPaymentAmount' },
		]
	};
	// customerRequestItems with properties names and labels
	$scope.customerRequestItemsDefinition = {
		label: 'customerrequest.customerRequestItem',
		properties : [
			{ label: 'cRIOrdinalNumber', name:'CRIOrdinalNumber' },
			{ label: 'cRIQuantity', name:'CRIQuantity' },
			{ label: 'cRIDeliveryTime', name:'CRIDeliveryTime' },
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
	// offerSupplierHeadings with properties names and labels
	$scope.offerSupplierHeadingsDefinition = {
		label: 'logical.offerSupplierHeading',
		properties : [
			{ label: 'oSHNumber', name:'OSHNumber' },
			{ label: 'oSHOfferAcceptStatus', name:'OSHOfferAcceptStatus' },
			{ label: 'oSHReceivingDate', name:'OSHReceivingDate' },
			{ label: 'oSHExpiryDate', name:'OSHExpiryDate' },
		]
	};
	// beOrderHeadings with properties names and labels
	$scope.beOrderHeadingsDefinition = {
		label: 'internalorder.bEOrderHeading',
		properties : [
			{ label: 'bEOHDocumentNumber', name:'BEOHDocumentNumber' },
			{ label: 'bEOHCreationDate', name:'BEOHCreationDate' },
			{ label: 'bEOHOrderDate', name:'BEOHOrderDate' },
		]
	};
	// shippingDocumentItems with properties names and labels
	$scope.shippingDocumentItemsDefinition = {
		label: 'procurement.shippingDocumentItem',
		properties : [
			{ label: 'sDIOrdinalNumber', name:'SDIOrdinalNumber' },
			{ label: 'sDIQuantityDisposed', name:'SDIQuantityDisposed' },
			{ label: 'sDIQuantityPacked', name:'SDIQuantityPacked' },
			{ label: 'sDIQuantityDispatched', name:'SDIQuantityDispatched' },
		]
	};
	// productionRequests with properties names and labels
	$scope.productionRequestsDefinition = {
		label: 'productionrequest.requestForProduction',
		properties : [
			{ label: 'rFPDocumentNumber', name:'RFPDocumentNumber' },
			{ label: 'rFPCreationDate', name:'RFPCreationDate' },
		]
	};
	// beOrderItems with properties names and labels
	$scope.beOrderItemsDefinition = {
		label: 'internalorder.bEOrderItem',
		properties : [
			{ label: 'bEOIOrdinalNumber', name:'BEOIOrdinalNumber' },
			{ label: 'bEOIOrderedQuantity', name:'BEOIOrderedQuantity' },
		]
	};
	// orderItems with properties names and labels
	$scope.orderItemsDefinition = {
		label: 'order.orderItem',
		properties : [
			{ label: 'oIOrdinalNumber', name:'OIOrdinalNumber' },
			{ label: 'oIOrderedQuantity', name:'OIOrderedQuantity' },
			{ label: 'oIReservedQuantity', name:'OIReservedQuantity' },
			{ label: 'oIProductionQuantity', name:'OIProductionQuantity' },
			{ label: 'oINextPeriodQuantity', name:'OINextPeriodQuantity' },
			{ label: 'oIValue', name:'OIValue' },
			{ label: 'oILeftQuantity', name:'OILeftQuantity' },
			{ label: 'oIDeliveryPeriod', name:'OIDeliveryPeriod' },
			{ label: 'oITechnologyStatus', name:'OITechnologyStatus' },
		]
	};
	// orderSupplierHeadings with properties names and labels
	$scope.orderSupplierHeadingsDefinition = {
		label: 'logical.orderSupplierHeading',
		properties : [
			{ label: 'oSHNumber', name:'OSHNumber' },
			{ label: 'oSHDate', name:'OSHDate' },
			{ label: 'oSHApprovalDate', name:'OSHApprovalDate' },
		]
	};
	// prices with properties names and labels
	$scope.pricesDefinition = {
		label: 'stockmanagement.price',
		properties : [
			{ label: 'pPrice', name:'PPrice' },
		]
	};
	// customerRequestHeaders with properties names and labels
	$scope.customerRequestHeadersDefinition = {
		label: 'customerrequest.customerRequestHeading',
		properties : [
			{ label: 'cRHDocumentNumber', name:'CRHDocumentNumber' },
			{ label: 'cRHRegistrationDate', name:'CRHRegistrationDate' },
			{ label: 'cRHSignNumberCustomerInquiry', name:'CRHSignNumberCustomerInquiry' },
			{ label: 'cRHInquiryDate', name:'CRHInquiryDate' },
		]
	};
	// shippingDocuments with properties names and labels
	$scope.shippingDocumentsDefinition = {
		label: 'procurement.shippingDocument',
		properties : [
			{ label: 'sDDocumentNumber', name:'SDDocumentNumber' },
			{ label: 'sDDispositionDate', name:'SDDispositionDate' },
			{ label: 'sDStatus', name:'SDStatus' },
		]
	};

	// fill table with data
	$scope.items = [];
	$scope.loaded = false;
	var getCurrencys = function() {
		if(!$scope.loaded && $scope.items.length === 0) {
			$scope.isLoading = true;
			ServiceCurrency.query(function(data) {
				$scope.items = data;
				$scope.isLoading = false;
				$scope.loaded = true;
			});
		}
	};
	getCurrencys();

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

	$scope.$watch('CurrencyCollection', function() {
		$scope.itemEdit = CheckSelected.checkSelectedInTable($scope.itemEdit, $scope.CurrencyCollection, $scope.items);
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
			templateUrl: 'capacitymanagement/currency/tmplCurrencyEdit.tpl.html',
			size: 'lg',
			windowClass: 'hmodal-info',
			controller: 'ctrlCurrencyEdit',
			resolve: {
				itemEdit: function() {
					if(isNew) {
						return new ServiceCurrency();
					} else {
						return $scope.itemEdit;
					}
				},
				workCentersDefinition: function() {
					return $scope.workCentersDefinition;
				},
				beInvoicesDefinition: function() {
					return $scope.beInvoicesDefinition;
				},
				orderHeadingsDefinition: function() {
					return $scope.orderHeadingsDefinition;
				},
				productionRequestItemsDefinition: function() {
					return $scope.productionRequestItemsDefinition;
				},
				proformaInvoicesDefinition: function() {
					return $scope.proformaInvoicesDefinition;
				},
				invoicesDefinition: function() {
					return $scope.invoicesDefinition;
				},
				customerRequestItemsDefinition: function() {
					return $scope.customerRequestItemsDefinition;
				},
				technologicalUnitsDefinition: function() {
					return $scope.technologicalUnitsDefinition;
				},
				offerSupplierHeadingsDefinition: function() {
					return $scope.offerSupplierHeadingsDefinition;
				},
				beOrderHeadingsDefinition: function() {
					return $scope.beOrderHeadingsDefinition;
				},
				shippingDocumentItemsDefinition: function() {
					return $scope.shippingDocumentItemsDefinition;
				},
				productionRequestsDefinition: function() {
					return $scope.productionRequestsDefinition;
				},
				beOrderItemsDefinition: function() {
					return $scope.beOrderItemsDefinition;
				},
				orderItemsDefinition: function() {
					return $scope.orderItemsDefinition;
				},
				orderSupplierHeadingsDefinition: function() {
					return $scope.orderSupplierHeadingsDefinition;
				},
				pricesDefinition: function() {
					return $scope.pricesDefinition;
				},
				customerRequestHeadersDefinition: function() {
					return $scope.customerRequestHeadersDefinition;
				},
				shippingDocumentsDefinition: function() {
					return $scope.shippingDocumentsDefinition;
				},
			}
		})
		.result.then(function(result) {
			if(!angular.isDefined(result.id)) {
				ServiceCurrency.saveCustom('stockmanagement/currencys', result, function(savedObject) {
					$scope.items.unshift(savedObject);
					if($scope.itemEdit !== null) {
						var index = $scope.items.map(function(it) { return it.id; }).indexOf($scope.itemEdit.id);
						$scope.items[index].isSelected = false;
					}
					$scope.itemEdit = angular.extend(savedObject);
					$scope.items[0].isSelected = true;
				});
			 } else {
				 ServiceCurrency.updateCustom('stockmanagement/currencys/'+result.id, result, function(savedObject) {
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


.controller('ctrlCurrencyEdit',['$scope', 'Localization', '$modal', '$modalInstance', 'dialogs',
	'ServiceCurrency', 'ServiceWorkCenter', 'ServiceBEInvoice', 'ServiceOrderHeading', 'ServiceRequestForProductionItem', 'ServiceProFormaInvoice', 'ServiceInvoice', 'ServiceCustomerRequestItem', 'ServiceTechnologicalUnit', 'ServiceOfferSupplierHeading', 'ServiceBEOrderHeading', 'ServiceShippingDocumentItem', 'ServiceRequestForProduction', 'ServiceBEOrderItem', 'ServiceOrderItem', 'ServiceOrderSupplierHeading', 'ServicePrice', 'ServiceCustomerRequestHeading', 'ServiceShippingDocument',   'workCentersDefinition',  'beInvoicesDefinition',  'orderHeadingsDefinition',  'productionRequestItemsDefinition',  'proformaInvoicesDefinition',  'invoicesDefinition',  'customerRequestItemsDefinition',  'technologicalUnitsDefinition',  'offerSupplierHeadingsDefinition',  'beOrderHeadingsDefinition',  'shippingDocumentItemsDefinition',  'productionRequestsDefinition',  'beOrderItemsDefinition',  'orderItemsDefinition',  'orderSupplierHeadingsDefinition',  'pricesDefinition',  'customerRequestHeadersDefinition',  'shippingDocumentsDefinition',   'itemEdit',
function($scope, Localization, $modal, $modalInstance, dialogs,
	ServiceCurrency, ServiceWorkCenter, ServiceBEInvoice, ServiceOrderHeading, ServiceRequestForProductionItem, ServiceProFormaInvoice, ServiceInvoice, ServiceCustomerRequestItem, ServiceTechnologicalUnit, ServiceOfferSupplierHeading, ServiceBEOrderHeading, ServiceShippingDocumentItem, ServiceRequestForProduction, ServiceBEOrderItem, ServiceOrderItem, ServiceOrderSupplierHeading, ServicePrice, ServiceCustomerRequestHeading, ServiceShippingDocument,  workCentersDefinition,  beInvoicesDefinition,  orderHeadingsDefinition,  productionRequestItemsDefinition,  proformaInvoicesDefinition,  invoicesDefinition,  customerRequestItemsDefinition,  technologicalUnitsDefinition,  offerSupplierHeadingsDefinition,  beOrderHeadingsDefinition,  shippingDocumentItemsDefinition,  productionRequestsDefinition,  beOrderItemsDefinition,  orderItemsDefinition,  orderSupplierHeadingsDefinition,  pricesDefinition,  customerRequestHeadersDefinition,  shippingDocumentsDefinition,  itemEdit) {

	// dialog mode
	$scope.mode = 'edit';

	// original item state
	var original = angular.copy(itemEdit);
	// item state
	$scope.itemEdit = angular.copy(original);

	// workCenters with properties
	$scope.workCentersDefinition = workCentersDefinition;
	// beInvoices with properties
	$scope.beInvoicesDefinition = beInvoicesDefinition;
	// orderHeadings with properties
	$scope.orderHeadingsDefinition = orderHeadingsDefinition;
	// productionRequestItems with properties
	$scope.productionRequestItemsDefinition = productionRequestItemsDefinition;
	// proformaInvoices with properties
	$scope.proformaInvoicesDefinition = proformaInvoicesDefinition;
	// invoices with properties
	$scope.invoicesDefinition = invoicesDefinition;
	// customerRequestItems with properties
	$scope.customerRequestItemsDefinition = customerRequestItemsDefinition;
	// technologicalUnits with properties
	$scope.technologicalUnitsDefinition = technologicalUnitsDefinition;
	// offerSupplierHeadings with properties
	$scope.offerSupplierHeadingsDefinition = offerSupplierHeadingsDefinition;
	// beOrderHeadings with properties
	$scope.beOrderHeadingsDefinition = beOrderHeadingsDefinition;
	// shippingDocumentItems with properties
	$scope.shippingDocumentItemsDefinition = shippingDocumentItemsDefinition;
	// productionRequests with properties
	$scope.productionRequestsDefinition = productionRequestsDefinition;
	// beOrderItems with properties
	$scope.beOrderItemsDefinition = beOrderItemsDefinition;
	// orderItems with properties
	$scope.orderItemsDefinition = orderItemsDefinition;
	// orderSupplierHeadings with properties
	$scope.orderSupplierHeadingsDefinition = orderSupplierHeadingsDefinition;
	// prices with properties
	$scope.pricesDefinition = pricesDefinition;
	// customerRequestHeaders with properties
	$scope.customerRequestHeadersDefinition = customerRequestHeadersDefinition;
	// shippingDocuments with properties
	$scope.shippingDocumentsDefinition = shippingDocumentsDefinition;

	// datepicker logic

	// date properties

	$scope.open = function($event, opened) {
		$event.preventDefault();
		$event.stopPropagation();
		$scope[opened] = true;
	};



    $scope.priceEdit = null;

    // prices table selection logic
    $scope.priceSelection = function(item, index) {
        if(item.isSelected) {
            if($scope.priceEdit !== null) {
                var index1 = $scope.itemEdit.prices.map(function(it) { return it.id; }).indexOf($scope.priceEdit.id);
                $scope.itemEdit.prices[index1].isSelected = false;
            }
            $scope.priceEdit = item;
        } else {
            $scope.priceEdit = null;
            item.isSelected = false;
        }
    };

    // New/Edit prices dialog
    $scope.openPriceEditDialog = function(isNew) {
        $modal.open({
            backdrop: 'static',
            keyboard : false,
            templateUrl: 'stockmanagement/currency/tmplPriceEdit.tpl.html',
            size: 'lg',
            controller: 'ctrlPriceEdit',
            windowClass: 'hmodal-info',
            resolve: {
                itemEdit: function() {
                    if(isNew) {
                        return new ServicePrice();
                    } else {
                        return $scope.priceEdit;
                    }
                }
            }
        }).result.then(function(result) {
            var i;
            if(isNew) {
                if(!angular.isDefined($scope.itemEdit.prices)) {
                    $scope.itemEdit.prices = [];
                }
                $scope.itemEdit.prices.unshift(result);
                for(i in $scope.itemEdit.prices) {
                    $scope.itemEdit.prices[i].isSelected = false;
                }
                $scope.priceEdit = angular.extend(result);
                $scope.itemEdit.prices[0].isSelected = true;
            }
            else {
                for(i in $scope.itemEdit.prices) {
                    $scope.itemEdit.prices[i].isSelected = false;
                }
                $scope.priceEdit = angular.extend(result);
                var index = $scope.itemEdit.prices.map(function(it) { return it.id; }).indexOf(result.id);
                for(var key in result) {
                    $scope.itemEdit.prices[index][key] = result[key];
                }
                $scope.itemEdit.prices[index].isSelected = true;
            }
        });
    };

    $scope.removePrice = function(item) {
        var dialog = dialogs.confirm('Please confirm', 'Are you sure you want to delete item?');
        dialog.result.then(function(btn) {
            var removeIndex = $scope.itemEdit.prices.map(function(it) { return it.id; }).indexOf(item.id);
            $scope.itemEdit.prices[removeIndex].deleted = true;
        });
    };


	// Save Button
	$scope.save = function() {
	   //	delete $scope.itemEdit.isSelected;
        var item;
        var i;
        for(i in $scope.itemEdit.workCenters) {
    		item = $scope.itemEdit.workCenters[i];
    		delete item.isSelected;
    	}
        for(i in $scope.itemEdit.beInvoices) {
    		item = $scope.itemEdit.beInvoices[i];
    		delete item.isSelected;
    	}
        for(i in $scope.itemEdit.orderHeadings) {
    		item = $scope.itemEdit.orderHeadings[i];
    		delete item.isSelected;
    	}
        for(i in $scope.itemEdit.productionRequestItems) {
    		item = $scope.itemEdit.productionRequestItems[i];
    		delete item.isSelected;
    	}
        for(i in $scope.itemEdit.proformaInvoices) {
    		item = $scope.itemEdit.proformaInvoices[i];
    		delete item.isSelected;
    	}
        for(i in $scope.itemEdit.invoices) {
    		item = $scope.itemEdit.invoices[i];
    		delete item.isSelected;
    	}
        for(i in $scope.itemEdit.customerRequestItems) {
    		item = $scope.itemEdit.customerRequestItems[i];
    		delete item.isSelected;
    	}
        for(i in $scope.itemEdit.technologicalUnits) {
    		item = $scope.itemEdit.technologicalUnits[i];
    		delete item.isSelected;
    	}
        for(i in $scope.itemEdit.offerSupplierHeadings) {
    		item = $scope.itemEdit.offerSupplierHeadings[i];
    		delete item.isSelected;
    	}
        for(i in $scope.itemEdit.beOrderHeadings) {
    		item = $scope.itemEdit.beOrderHeadings[i];
    		delete item.isSelected;
    	}
        for(i in $scope.itemEdit.shippingDocumentItems) {
    		item = $scope.itemEdit.shippingDocumentItems[i];
    		delete item.isSelected;
    	}
        for(i in $scope.itemEdit.productionRequests) {
    		item = $scope.itemEdit.productionRequests[i];
    		delete item.isSelected;
    	}
        for(i in $scope.itemEdit.beOrderItems) {
    		item = $scope.itemEdit.beOrderItems[i];
    		delete item.isSelected;
    	}
        for(i in $scope.itemEdit.orderItems) {
    		item = $scope.itemEdit.orderItems[i];
    		delete item.isSelected;
    	}
        for(i in $scope.itemEdit.orderSupplierHeadings) {
    		item = $scope.itemEdit.orderSupplierHeadings[i];
    		delete item.isSelected;
    	}
        for(i in $scope.itemEdit.customerRequestHeaders) {
    		item = $scope.itemEdit.customerRequestHeaders[i];
    		delete item.isSelected;
    	}
        for(i in $scope.itemEdit.shippingDocuments) {
    		item = $scope.itemEdit.shippingDocuments[i];
    		delete item.isSelected;
    	}
		$modalInstance.close($scope.itemEdit);
	};


	$scope.canSave = function() {
		var item = $scope.itemEdit;
		return                 item.CCurrencyDesignation  ;
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


.controller('ctrlCurrencyChoose', ['$scope','ServiceCurrency', 'dialogs', '$modal', '$modalInstance', 'itemEdit',
function($scope, ServiceCurrency, dialogs, $modal,  $modalInstance, itemEdit) {

    // entity with properties
    $scope.itemDefinition = {
        label: 'capacitymanagement.currency',
        properties: [
            { label: 'cCurrencyDesignation', name:'CCurrencyDesignation', inTable:  true  },
            { label: 'cDescription', name:'CDescription', inTable:  false  },
        ]
    };

	$scope.items = [];
	$scope.itemEdit = {};

	// fill table with data
	$scope.loaded = false;
	var getCurrencys = function() {
		if(!$scope.loaded && $scope.items.length === 0) {
			$scope.isLoading = true;
			ServiceCurrency.query(function(data) {
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
	getCurrencys();

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