'use strict';

angular.module('Doob.order')


.controller('ctrlOrderItem',['$scope', '$rootScope', '$modal', 'dialogs', 'CheckSelected', 'ServiceOrderItem',
    function($scope, $rootScope, $modal, dialogs, CheckSelected, ServiceOrderItem) {

	// main entity (orderItem) properties names and labels
	$scope.itemDefinition = {
		label: 'order.orderItem',
		properties: [
			{ label: 'oIOrdinalNumber', name:'OIOrdinalNumber', inTable:  true  },
			{ label: 'oIOrderedQuantity', name:'OIOrderedQuantity', inTable:  true  },
			{ label: 'oIReservedQuantity', name:'OIReservedQuantity', inTable:  true  },
			{ label: 'oIProductionQuantity', name:'OIProductionQuantity', inTable:  true  },
			{ label: 'oINextPeriodQuantity', name:'OINextPeriodQuantity', inTable:  true  },
			{ label: 'oIValue', name:'OIValue', inTable:  true  },
			{ label: 'oILeftQuantity', name:'OILeftQuantity', inTable:  true  },
			{ label: 'oIDeliveryPeriod', name:'OIDeliveryPeriod', inTable:  true  },
			{ label: 'oITechnologyStatus', name:'OITechnologyStatus', inTable:  true  },
			{ label: 'oIPreviousRealizedQuantity', name:'OIPreviousRealizedQuantity', inTable:  false  },
			{ label: 'oIRealizedQuantity', name:'OIRealizedQuantity', inTable:  false  },
			{ label: 'oIDeletedStatus', name:'OIDeletedStatus', inTable:  false  },
			{ label: 'oICompletionStatus', name:'OICompletionStatus', inTable:  false  },
			{ label: 'oIRequiredProducedStatus', name:'OIRequiredProducedStatus', inTable:  false  },
			{ label: 'oIDiscount', name:'OIDiscount', inTable:  false  },
			{ label: 'oISettlementProcedure', name:'OISettlementProcedure', inTable:  false  },
			{ label: 'oIShippedQuantity', name:'OIShippedQuantity', inTable:  false  },
		]
	};

	// packingMethods with properties names and labels
	$scope.packingMethodsDefinition = {
		label: 'initialization.packingMethod',
		properties : [
			{ label: 'pMCode', name:'PMCode' },
			{ label: 'pMName', name:'PMName' },
		]
	};
	// orderGroup with properties names and labels
	$scope.orderGroupDefinition = {
		label: 'order.orderGroup',
		properties : [
		]
	};
	// taxHeading with properties names and labels
	$scope.taxHeadingDefinition = {
		label: 'initialization.taxHeading',
		properties : [
			{ label: 'tHDesignation', name:'THDesignation' },
			{ label: 'tHDescription', name:'THDescription' },
			{ label: 'tHStartDate', name:'THStartDate' },
			{ label: 'tHTotalPercent', name:'THTotalPercent' },
		]
	};
	// productInstance with properties names and labels
	$scope.productInstanceDefinition = {
		label: 'order.productInstance',
		properties : [
			{ label: 'pIName', name:'PIName' },
		]
	};
	// discountType with properties names and labels
	$scope.discountTypeDefinition = {
		label: 'initialization.discountType',
		properties : [
			{ label: 'dMCode', name:'DMCode' },
			{ label: 'dMName', name:'DMName' },
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
	// measurementUnit with properties names and labels
	$scope.measurementUnitDefinition = {
		label: 'commonbusinessentities.measurementUnit',
		properties : [
			{ label: 'mUIdentificationCode', name:'MUIdentificationCode' },
			{ label: 'mUName', name:'MUName' },
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
	// identification with properties names and labels
	$scope.identificationDefinition = {
		label: 'commonbusinessentities.identification',
		properties : [
			{ label: 'iIdentificationCode', name:'IIdentificationCode' },
		]
	};
	// currency with properties names and labels
	$scope.currencyDefinition = {
		label: 'capacitymanagement.currency',
		properties : [
			{ label: 'cCurrencyDesignation', name:'CCurrencyDesignation' },
		]
	};
	// stockroom with properties names and labels
	$scope.stockroomDefinition = {
		label: 'stock.stockroom',
		properties : [
			{ label: 'sCode', name:'SCode' },
			{ label: 'sName', name:'SName' },
			{ label: 'sFullName', name:'SFullName' },
			{ label: 'sType', name:'SType' },
			{ label: 'sConditions', name:'SConditions' },
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
	// invoiceItems with properties names and labels
	$scope.invoiceItemsDefinition = {
		label: 'procurement.invoiceItem',
		properties : [
			{ label: 'iIOrdinalNumber', name:'IIOrdinalNumber' },
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
	// requestForProductionItem with properties names and labels
	$scope.requestForProductionItemDefinition = {
		label: 'productionrequest.requestForProductionItem',
		properties : [
			{ label: 'rFPIItemNumber', name:'RFPIItemNumber' },
			{ label: 'rFPIQuantity', name:'RFPIQuantity' },
			{ label: 'rFPICreationDeadline', name:'RFPICreationDeadline' },
			{ label: 'rFPISellingPrice', name:'RFPISellingPrice' },
		]
	};

	// fill table with data
	$scope.items = [];
	$scope.loaded = false;
	var getOrderItems = function() {
		if(!$scope.loaded && $scope.items.length === 0) {
			$scope.isLoading = true;
			ServiceOrderItem.query(function(data) {
				$scope.items = data;
				$scope.isLoading = false;
				$scope.loaded = true;
			});
		}
	};
	getOrderItems();

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

	$scope.$watch('OrderItemCollection', function() {
		$scope.itemEdit = CheckSelected.checkSelectedInTable($scope.itemEdit, $scope.OrderItemCollection, $scope.items);
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
			templateUrl: 'order/orderitem/tmplOrderItemEdit.tpl.html',
			size: 'lg',
			windowClass: 'hmodal-info',
			controller: 'ctrlOrderItemEdit',
			resolve: {
				itemEdit: function() {
					if(isNew) {
						return new ServiceOrderItem();
					} else {
						return $scope.itemEdit;
					}
				},
				packingMethodsDefinition: function() {
					return $scope.packingMethodsDefinition;
				},
				orderGroupDefinition: function() {
					return $scope.orderGroupDefinition;
				},
				taxHeadingDefinition: function() {
					return $scope.taxHeadingDefinition;
				},
				productInstanceDefinition: function() {
					return $scope.productInstanceDefinition;
				},
				discountTypeDefinition: function() {
					return $scope.discountTypeDefinition;
				},
				organizationUnitDefinition: function() {
					return $scope.organizationUnitDefinition;
				},
				measurementUnitDefinition: function() {
					return $scope.measurementUnitDefinition;
				},
				urgentStatusDefinition: function() {
					return $scope.urgentStatusDefinition;
				},
				identificationDefinition: function() {
					return $scope.identificationDefinition;
				},
				currencyDefinition: function() {
					return $scope.currencyDefinition;
				},
				stockroomDefinition: function() {
					return $scope.stockroomDefinition;
				},
				commercialityStatusDefinition: function() {
					return $scope.commercialityStatusDefinition;
				},
				invoiceItemsDefinition: function() {
					return $scope.invoiceItemsDefinition;
				},
				beOrderItemsDefinition: function() {
					return $scope.beOrderItemsDefinition;
				},
				shippingDocumentItemsDefinition: function() {
					return $scope.shippingDocumentItemsDefinition;
				},
				requestForProductionItemDefinition: function() {
					return $scope.requestForProductionItemDefinition;
				},
			}
		})
		.result.then(function(result) {
			if(!angular.isDefined(result.id)) {
				ServiceOrderItem.saveCustom('stockmanagement/orderitems', result, function(savedObject) {
					$scope.items.unshift(savedObject);
					if($scope.itemEdit !== null) {
						var index = $scope.items.map(function(it) { return it.id; }).indexOf($scope.itemEdit.id);
						$scope.items[index].isSelected = false;
					}
					$scope.itemEdit = angular.extend(savedObject);
					$scope.items[0].isSelected = true;
				});
			 } else {
				 ServiceOrderItem.updateCustom('stockmanagement/orderitems/'+result.id, result, function(savedObject) {
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


.controller('ctrlOrderItemEdit',['$scope', 'Localization', '$modal', '$modalInstance', 'dialogs',
	'ServiceOrderItem', 'ServicePackingMethod', 'ServiceOrderGroup', 'ServiceTaxHeading', 'ServiceProductInstance', 'ServiceDiscountType', 'ServiceOrganizationUnit', 'ServiceMeasurementUnit', 'ServiceUrgentStatus', 'ServiceIdentification', 'ServiceCurrency', 'ServiceStockroom', 'ServiceCommercialityStatus', 'ServiceInvoiceItem', 'ServiceBEOrderItem', 'ServiceShippingDocumentItem', 'ServiceRequestForProductionItem',   'packingMethodsDefinition',  'orderGroupDefinition',  'taxHeadingDefinition',  'productInstanceDefinition',  'discountTypeDefinition',  'organizationUnitDefinition',  'measurementUnitDefinition',  'urgentStatusDefinition',  'identificationDefinition',  'currencyDefinition',  'stockroomDefinition',  'commercialityStatusDefinition',  'invoiceItemsDefinition',  'beOrderItemsDefinition',  'shippingDocumentItemsDefinition',  'requestForProductionItemDefinition',   'itemEdit',
function($scope, Localization, $modal, $modalInstance, dialogs,
	ServiceOrderItem, ServicePackingMethod, ServiceOrderGroup, ServiceTaxHeading, ServiceProductInstance, ServiceDiscountType, ServiceOrganizationUnit, ServiceMeasurementUnit, ServiceUrgentStatus, ServiceIdentification, ServiceCurrency, ServiceStockroom, ServiceCommercialityStatus, ServiceInvoiceItem, ServiceBEOrderItem, ServiceShippingDocumentItem, ServiceRequestForProductionItem,  packingMethodsDefinition,  orderGroupDefinition,  taxHeadingDefinition,  productInstanceDefinition,  discountTypeDefinition,  organizationUnitDefinition,  measurementUnitDefinition,  urgentStatusDefinition,  identificationDefinition,  currencyDefinition,  stockroomDefinition,  commercialityStatusDefinition,  invoiceItemsDefinition,  beOrderItemsDefinition,  shippingDocumentItemsDefinition,  requestForProductionItemDefinition,  itemEdit) {

	// dialog mode
	$scope.mode = 'edit';

	// original item state
	var original = angular.copy(itemEdit);
	// item state
	$scope.itemEdit = angular.copy(original);

	// packingMethods with properties
	$scope.packingMethodsDefinition = packingMethodsDefinition;
	// orderGroup with properties
	$scope.orderGroupDefinition = orderGroupDefinition;
	// taxHeading with properties
	$scope.taxHeadingDefinition = taxHeadingDefinition;
	// productInstance with properties
	$scope.productInstanceDefinition = productInstanceDefinition;
	// discountType with properties
	$scope.discountTypeDefinition = discountTypeDefinition;
	// organizationUnit with properties
	$scope.organizationUnitDefinition = organizationUnitDefinition;
	// measurementUnit with properties
	$scope.measurementUnitDefinition = measurementUnitDefinition;
	// urgentStatus with properties
	$scope.urgentStatusDefinition = urgentStatusDefinition;
	// identification with properties
	$scope.identificationDefinition = identificationDefinition;
	// currency with properties
	$scope.currencyDefinition = currencyDefinition;
	// stockroom with properties
	$scope.stockroomDefinition = stockroomDefinition;
	// commercialityStatus with properties
	$scope.commercialityStatusDefinition = commercialityStatusDefinition;
	// invoiceItems with properties
	$scope.invoiceItemsDefinition = invoiceItemsDefinition;
	// beOrderItems with properties
	$scope.beOrderItemsDefinition = beOrderItemsDefinition;
	// shippingDocumentItems with properties
	$scope.shippingDocumentItemsDefinition = shippingDocumentItemsDefinition;
	// requestForProductionItem with properties
	$scope.requestForProductionItemDefinition = requestForProductionItemDefinition;

	// datepicker logic

	// date properties
	$scope.openedOIDeliveryPeriod = false;

	$scope.open = function($event, opened) {
		$event.preventDefault();
		$event.stopPropagation();
		$scope[opened] = true;
	};



	// Choose packingMethods
	$scope.openChoosePackingMethodsDialog = function() {
        $modal.open({
            backdrop: 'static',
            keyboard : false,
            templateUrl: 'initialization/orderitem/tmplPackingMethodChoose.tpl.html',
            size: 'lg',
            controller: 'ctrlPackingMethodChoose',
            windowClass: 'hmodal-info',
            resolve: {
				itemEdit: function() {
					if(angular.isDefined($scope.itemEdit.packingMethods)){
						return $scope.itemEdit.packingMethods;
					}
				}
			}
		}).result.then(function(result) {
			$scope.itemEdit.packingMethods = angular.copy(result);
		});
    };


	// Choose orderGroup
	$scope.openChooseOrderGroupDialog = function() {
        $modal.open({
            backdrop: 'static',
            keyboard : false,
            templateUrl: 'order/orderitem/tmplOrderGroupChoose.tpl.html',
            size: 'lg',
            controller: 'ctrlOrderGroupChoose',
            windowClass: 'hmodal-info',
            resolve: {
				itemEdit: function() {
					if(angular.isDefined($scope.itemEdit.orderGroup)){
						return $scope.itemEdit.orderGroup;
					}
				}
			}
		}).result.then(function(result) {
			$scope.itemEdit.orderGroup = angular.copy(result);
		});
    };


	// Choose taxHeading
	$scope.openChooseTaxHeadingDialog = function() {
        $modal.open({
            backdrop: 'static',
            keyboard : false,
            templateUrl: 'initialization/orderitem/tmplTaxHeadingChoose.tpl.html',
            size: 'lg',
            controller: 'ctrlTaxHeadingChoose',
            windowClass: 'hmodal-info',
            resolve: {
				itemEdit: function() {
					if(angular.isDefined($scope.itemEdit.taxHeading)){
						return $scope.itemEdit.taxHeading;
					}
				}
			}
		}).result.then(function(result) {
			$scope.itemEdit.taxHeading = angular.copy(result);
		});
    };


	// Choose productInstance
	$scope.openChooseProductInstanceDialog = function() {
        $modal.open({
            backdrop: 'static',
            keyboard : false,
            templateUrl: 'order/orderitem/tmplProductInstanceChoose.tpl.html',
            size: 'lg',
            controller: 'ctrlProductInstanceChoose',
            windowClass: 'hmodal-info',
            resolve: {
				itemEdit: function() {
					if(angular.isDefined($scope.itemEdit.productInstance)){
						return $scope.itemEdit.productInstance;
					}
				}
			}
		}).result.then(function(result) {
			$scope.itemEdit.productInstance = angular.copy(result);
		});
    };


	// Choose discountType
	$scope.openChooseDiscountTypeDialog = function() {
        $modal.open({
            backdrop: 'static',
            keyboard : false,
            templateUrl: 'initialization/orderitem/tmplDiscountTypeChoose.tpl.html',
            size: 'lg',
            controller: 'ctrlDiscountTypeChoose',
            windowClass: 'hmodal-info',
            resolve: {
				itemEdit: function() {
					if(angular.isDefined($scope.itemEdit.discountType)){
						return $scope.itemEdit.discountType;
					}
				}
			}
		}).result.then(function(result) {
			$scope.itemEdit.discountType = angular.copy(result);
		});
    };


	// Choose organizationUnit
	$scope.openChooseOrganizationUnitDialog = function() {
        $modal.open({
            backdrop: 'static',
            keyboard : false,
            templateUrl: 'corporation/orderitem/tmplOrganizationUnitChoose.tpl.html',
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


	// Choose measurementUnit
	$scope.openChooseMeasurementUnitDialog = function() {
        $modal.open({
            backdrop: 'static',
            keyboard : false,
            templateUrl: 'commonbusinessentities/orderitem/tmplMeasurementUnitChoose.tpl.html',
            size: 'lg',
            controller: 'ctrlMeasurementUnitChoose',
            windowClass: 'hmodal-info',
            resolve: {
				itemEdit: function() {
					if(angular.isDefined($scope.itemEdit.measurementUnit)){
						return $scope.itemEdit.measurementUnit;
					}
				}
			}
		}).result.then(function(result) {
			$scope.itemEdit.measurementUnit = angular.copy(result);
		});
    };


	// Choose urgentStatus
	$scope.openChooseUrgentStatusDialog = function() {
        $modal.open({
            backdrop: 'static',
            keyboard : false,
            templateUrl: 'initialization/orderitem/tmplUrgentStatusChoose.tpl.html',
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


	// Choose identification
	$scope.openChooseIdentificationDialog = function() {
        $modal.open({
            backdrop: 'static',
            keyboard : false,
            templateUrl: 'commonbusinessentities/orderitem/tmplIdentificationChoose.tpl.html',
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


	// Choose currency
	$scope.openChooseCurrencyDialog = function() {
        $modal.open({
            backdrop: 'static',
            keyboard : false,
            templateUrl: 'capacitymanagement/orderitem/tmplCurrencyChoose.tpl.html',
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


	// Choose stockroom
	$scope.openChooseStockroomDialog = function() {
        $modal.open({
            backdrop: 'static',
            keyboard : false,
            templateUrl: 'stock/orderitem/tmplStockroomChoose.tpl.html',
            size: 'lg',
            controller: 'ctrlStockroomChoose',
            windowClass: 'hmodal-info',
            resolve: {
				itemEdit: function() {
					if(angular.isDefined($scope.itemEdit.stockroom)){
						return $scope.itemEdit.stockroom;
					}
				}
			}
		}).result.then(function(result) {
			$scope.itemEdit.stockroom = angular.copy(result);
		});
    };


	// Choose commercialityStatus
	$scope.openChooseCommercialityStatusDialog = function() {
        $modal.open({
            backdrop: 'static',
            keyboard : false,
            templateUrl: 'initialization/orderitem/tmplCommercialityStatusChoose.tpl.html',
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


	// Save Button
	$scope.save = function() {
		correctDateTime($scope.itemEdit.OIDeliveryPeriod);
	   //	delete $scope.itemEdit.isSelected;
        var item;
        var i;
        for(i in $scope.itemEdit.invoiceItems) {
    		item = $scope.itemEdit.invoiceItems[i];
    		delete item.isSelected;
    	}
        for(i in $scope.itemEdit.beOrderItems) {
    		item = $scope.itemEdit.beOrderItems[i];
    		delete item.isSelected;
    	}
        for(i in $scope.itemEdit.shippingDocumentItems) {
    		item = $scope.itemEdit.shippingDocumentItems[i];
    		delete item.isSelected;
    	}
        for(i in $scope.itemEdit.requestForProductionItem) {
    		item = $scope.itemEdit.requestForProductionItem[i];
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
		return                 item.OIOrdinalNumber  &&                 item.OIOrderedQuantity  &&                 item.OIReservedQuantity  &&                 item.OIProductionQuantity  &&                 item.OINextPeriodQuantity  &&                 item.OIValue  &&                 item.OILeftQuantity  &&                 item.OIDeliveryPeriod  &&                 item.OITechnologyStatus  ;
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


.controller('ctrlOrderItemChoose', ['$scope','ServiceOrderItem', 'dialogs', '$modal', '$modalInstance', 'itemEdit',
function($scope, ServiceOrderItem, dialogs, $modal,  $modalInstance, itemEdit) {

    // entity with properties
    $scope.itemDefinition = {
        label: 'order.orderItem',
        properties: [
            { label: 'oIOrdinalNumber', name:'OIOrdinalNumber', inTable:  true  },
            { label: 'oIOrderedQuantity', name:'OIOrderedQuantity', inTable:  true  },
            { label: 'oIReservedQuantity', name:'OIReservedQuantity', inTable:  true  },
            { label: 'oIProductionQuantity', name:'OIProductionQuantity', inTable:  true  },
            { label: 'oINextPeriodQuantity', name:'OINextPeriodQuantity', inTable:  true  },
            { label: 'oIValue', name:'OIValue', inTable:  true  },
            { label: 'oILeftQuantity', name:'OILeftQuantity', inTable:  true  },
            { label: 'oIDeliveryPeriod', name:'OIDeliveryPeriod', inTable:  true  },
            { label: 'oITechnologyStatus', name:'OITechnologyStatus', inTable:  true  },
            { label: 'oIPreviousRealizedQuantity', name:'OIPreviousRealizedQuantity', inTable:  false  },
            { label: 'oIRealizedQuantity', name:'OIRealizedQuantity', inTable:  false  },
            { label: 'oIDeletedStatus', name:'OIDeletedStatus', inTable:  false  },
            { label: 'oICompletionStatus', name:'OICompletionStatus', inTable:  false  },
            { label: 'oIRequiredProducedStatus', name:'OIRequiredProducedStatus', inTable:  false  },
            { label: 'oIDiscount', name:'OIDiscount', inTable:  false  },
            { label: 'oISettlementProcedure', name:'OISettlementProcedure', inTable:  false  },
            { label: 'oIShippedQuantity', name:'OIShippedQuantity', inTable:  false  },
        ]
    };

	$scope.items = [];
	$scope.itemEdit = {};

	// fill table with data
	$scope.loaded = false;
	var getOrderItems = function() {
		if(!$scope.loaded && $scope.items.length === 0) {
			$scope.isLoading = true;
			ServiceOrderItem.query(function(data) {
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
	getOrderItems();

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