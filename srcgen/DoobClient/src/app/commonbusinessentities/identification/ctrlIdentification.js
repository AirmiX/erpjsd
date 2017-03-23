'use strict';

angular.module('Doob.commonbusinessentities')


.controller('ctrlIdentification',['$scope', '$rootScope', '$modal', 'dialogs', 'CheckSelected', 'ServiceIdentification',
    function($scope, $rootScope, $modal, dialogs, CheckSelected, ServiceIdentification) {

	// main entity (identification) properties names and labels
	$scope.itemDefinition = {
		label: 'commonbusinessentities.identification',
		properties: [
			{ label: 'iIdentificationCode', name:'IIdentificationCode', inTable:  true  },
			{ label: 'iName', name:'IName', inTable:  false  },
			{ label: 'iShortName', name:'IShortName', inTable:  false  },
			{ label: 'iParallelCode', name:'IParallelCode', inTable:  false  },
			{ label: 'iDrawingIdentificationNumber', name:'IDrawingIdentificationNumber', inTable:  false  },
			{ label: 'iIsPayable', name:'IIsPayable', inTable:  false  },
		]
	};

	// classification with properties names and labels
	$scope.classificationDefinition = {
		label: 'commonbusinessentities.classification',
		properties : [
			{ label: 'cIdentificationCode', name:'CIdentificationCode' },
		]
	};
	// materialReturnNoteItems with properties names and labels
	$scope.materialReturnNoteItemsDefinition = {
		label: 'stockmanagement.materialReturnNoteItem',
		properties : [
			{ label: 'mRNIOrdinalNumber', name:'MRNIOrdinalNumber' },
			{ label: 'mRNIQuantityReturned', name:'MRNIQuantityReturned' },
			{ label: 'mRNIPriceDesignation', name:'MRNIPriceDesignation' },
		]
	};
	// stepTools with properties names and labels
	$scope.stepToolsDefinition = {
		label: 'productiondata.stepTool',
		properties : [
			{ label: 'sTNormativ', name:'STNormativ' },
			{ label: 'sTTypeStatus', name:'STTypeStatus' },
			{ label: 'sTSupplySource', name:'STSupplySource' },
		]
	};
	// procurementRequestItemSuppliers with properties names and labels
	$scope.procurementRequestItemSuppliersDefinition = {
		label: 'initialization.procurementRequestItem',
		properties : [
			{ label: 'pRIOrdinalNumber', name:'PRIOrdinalNumber' },
			{ label: 'pRIRequestedQuantity', name:'PRIRequestedQuantity' },
			{ label: 'pRIRealizedQuantity', name:'PRIRealizedQuantity' },
			{ label: 'pRIDeadlineDate', name:'PRIDeadlineDate' },
			{ label: 'pRISupplyStatus', name:'PRISupplyStatus' },
			{ label: 'pRIIncludedQunatityInPlan', name:'PRIIncludedQunatityInPlan' },
			{ label: 'pRIResolutionStatus', name:'PRIResolutionStatus' },
			{ label: 'mUIdentificationCode', name:'MUIdentificationCode' },
		]
	};
	// tangibleItemConditions with properties names and labels
	$scope.tangibleItemConditionsDefinition = {
		label: 'stockmanagement.tangibleItemCondition',
		properties : [
			{ label: 'tICLocatonAddress', name:'TICLocatonAddress' },
			{ label: 'tICBookkeepingPosition', name:'TICBookkeepingPosition' },
			{ label: 'tICQuantityCumulativeInput', name:'TICQuantityCumulativeInput' },
			{ label: 'tICValueInitialState', name:'TICValueInitialState' },
			{ label: 'tICValueCumulativeInput', name:'TICValueCumulativeInput' },
			{ label: 'tICUnitPrice', name:'TICUnitPrice' },
			{ label: 'tICAvailableBalance', name:'TICAvailableBalance' },
			{ label: 'tICOpeningDate', name:'TICOpeningDate' },
			{ label: 'tICLastInputDate', name:'TICLastInputDate' },
			{ label: 'tICLastOutputDate', name:'TICLastOutputDate' },
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
	// deliveryNoteItems with properties names and labels
	$scope.deliveryNoteItemsDefinition = {
		label: 'stockmanagement.deliveryNoteItem',
		properties : [
			{ label: 'dNIOrdinalNumber', name:'DNIOrdinalNumber' },
			{ label: 'dNIMeasurementUnit', name:'DNIMeasurementUnit' },
			{ label: 'dNIQuantityReceived', name:'DNIQuantityReceived' },
			{ label: 'dNIPriceDesignation', name:'DNIPriceDesignation' },
		]
	};
	// renamingItemsOutput with properties names and labels
	$scope.renamingItemsOutputDefinition = {
		label: 'renaming.renamingItem',
		properties : [
			{ label: 'rIOrdinalNumber', name:'RIOrdinalNumber' },
			{ label: 'rIMeasurementUnitInput', name:'RIMeasurementUnitInput' },
			{ label: 'rIMeasurementUnitOutput', name:'RIMeasurementUnitOutput' },
			{ label: 'rIQuantityForTransfer', name:'RIQuantityForTransfer' },
			{ label: 'rIAddressOutput', name:'RIAddressOutput' },
		]
	};
	// renamingItemsInput with properties names and labels
	$scope.renamingItemsInputDefinition = {
		label: 'renaming.renamingItem',
		properties : [
			{ label: 'rIOrdinalNumber', name:'RIOrdinalNumber' },
			{ label: 'rIMeasurementUnitInput', name:'RIMeasurementUnitInput' },
			{ label: 'rIMeasurementUnitOutput', name:'RIMeasurementUnitOutput' },
			{ label: 'rIQuantityForTransfer', name:'RIQuantityForTransfer' },
			{ label: 'rIAddressOutput', name:'RIAddressOutput' },
		]
	};
	// orderHeadingsDelivery with properties names and labels
	$scope.orderHeadingsDeliveryDefinition = {
		label: 'order.orderHeading',
		properties : [
			{ label: 'oHDocumentNumber', name:'OHDocumentNumber' },
			{ label: 'oHCreationDate', name:'OHCreationDate' },
			{ label: 'oHOrderNumberOfBuyer', name:'OHOrderNumberOfBuyer' },
			{ label: 'oHOrderDate', name:'OHOrderDate' },
			{ label: 'oHPaymentPeriodBuyer', name:'OHPaymentPeriodBuyer' },
		]
	};
	// characteristics with properties names and labels
	$scope.characteristicsDefinition = {
		label: 'commonbusinessentities.characteristic',
		properties : [
			{ label: 'cValue', name:'CValue' },
		]
	};
	// rfpItems with properties names and labels
	$scope.rfpItemsDefinition = {
		label: 'stockmanagement.requestForProposalItem',
		properties : [
			{ label: 'rFPIOrdinalNumber', name:'RFPIOrdinalNumber' },
			{ label: 'rFPIMeasurementUnit', name:'RFPIMeasurementUnit' },
			{ label: 'rFPIRequestedQuantity', name:'RFPIRequestedQuantity' },
			{ label: 'rFPIProcurementSourceStatus', name:'RFPIProcurementSourceStatus' },
		]
	};
	// goodsSDs with properties names and labels
	$scope.goodsSDsDefinition = {
		label: 'procurement.shippingDocument',
		properties : [
			{ label: 'sDDocumentNumber', name:'SDDocumentNumber' },
			{ label: 'sDDispositionDate', name:'SDDispositionDate' },
			{ label: 'sDStatus', name:'SDStatus' },
		]
	};
	// orderSupplierItems with properties names and labels
	$scope.orderSupplierItemsDefinition = {
		label: 'logical.orderSupplierItem',
		properties : [
			{ label: 'oSIOrdinalNumber', name:'OSIOrdinalNumber' },
			{ label: 'oSIOrderedQuantity', name:'OSIOrderedQuantity' },
			{ label: 'oSIDeliveryDeadline', name:'OSIDeliveryDeadline' },
			{ label: 'oSIQuantityReceived', name:'OSIQuantityReceived' },
			{ label: 'oSIProcurementStatus', name:'OSIProcurementStatus' },
		]
	};
	// sellingPrice with properties names and labels
	$scope.sellingPriceDefinition = {
		label: 'sellingprice.sellingPrice',
		properties : [
			{ label: 'sPPrice', name:'SPPrice' },
			{ label: 'sPDateFrom', name:'SPDateFrom' },
		]
	};
	// offerSupplierItems with properties names and labels
	$scope.offerSupplierItemsDefinition = {
		label: 'logical.offerSupplierItem',
		properties : [
			{ label: 'oSIOrdinalNumber', name:'OSIOrdinalNumber' },
			{ label: 'oSIMeasurementUnit', name:'OSIMeasurementUnit' },
			{ label: 'oSIOfferedQuantity', name:'OSIOfferedQuantity' },
			{ label: 'oSIOfferedPrice', name:'OSIOfferedPrice' },
			{ label: 'oSIDeliveryDeadline', name:'OSIDeliveryDeadline' },
			{ label: 'oSIStatus', name:'OSIStatus' },
		]
	};
	// goodsReceivedNoteHeadings with properties names and labels
	$scope.goodsReceivedNoteHeadingsDefinition = {
		label: 'stockmanagement.goodsReceivedNoteHeading',
		properties : [
			{ label: 'gRNHNumber', name:'GRNHNumber' },
			{ label: 'gRNHSupplierShippingDocument', name:'GRNHSupplierShippingDocument' },
			{ label: 'gRNHShippingDocumentDate', name:'GRNHShippingDocumentDate' },
			{ label: 'gRNHArrivalDate', name:'GRNHArrivalDate' },
			{ label: 'gRNHCompletionStatus', name:'GRNHCompletionStatus' },
			{ label: 'gRNHPrintStatus', name:'GRNHPrintStatus' },
		]
	};
	// transactionLogs with properties names and labels
	$scope.transactionLogsDefinition = {
		label: 'stockmanagement.transactionLog',
		properties : [
			{ label: 'tLOrdinalNumber', name:'TLOrdinalNumber' },
			{ label: 'tLDocumentNumber', name:'TLDocumentNumber' },
			{ label: 'tLLogNumber', name:'TLLogNumber' },
			{ label: 'tLMeasurementUnit', name:'TLMeasurementUnit' },
			{ label: 'tLStatusDesignation', name:'TLStatusDesignation' },
			{ label: 'tLPrice', name:'TLPrice' },
			{ label: 'tLValue', name:'TLValue' },
			{ label: 'tLDate', name:'TLDate' },
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
	// marketBelonging with properties names and labels
	$scope.marketBelongingDefinition = {
		label: 'sellingprice.oUBelonging',
		properties : [
		]
	};
	// invoiceSDs with properties names and labels
	$scope.invoiceSDsDefinition = {
		label: 'procurement.shippingDocument',
		properties : [
			{ label: 'sDDocumentNumber', name:'SDDocumentNumber' },
			{ label: 'sDDispositionDate', name:'SDDispositionDate' },
			{ label: 'sDStatus', name:'SDStatus' },
		]
	};
	// customerRequestHeaders1 with properties names and labels
	$scope.customerRequestHeaders1Definition = {
		label: 'customerrequest.customerRequestHeading',
		properties : [
			{ label: 'cRHDocumentNumber', name:'CRHDocumentNumber' },
			{ label: 'cRHRegistrationDate', name:'CRHRegistrationDate' },
			{ label: 'cRHSignNumberCustomerInquiry', name:'CRHSignNumberCustomerInquiry' },
			{ label: 'cRHInquiryDate', name:'CRHInquiryDate' },
		]
	};
	// superComponent with properties names and labels
	$scope.superComponentDefinition = {
		label: 'productiondata.structuralComponents',
		properties : [
			{ label: 'sCLevel', name:'SCLevel' },
			{ label: 'sCOrdinalNumberAtLevel', name:'SCOrdinalNumberAtLevel' },
			{ label: 'sCVariantNumber', name:'SCVariantNumber' },
			{ label: 'sCNormativUgradnje', name:'SCNormativUgradnje' },
			{ label: 'sCSupplyingStatus', name:'SCSupplyingStatus' },
			{ label: 'sCValidStartDate', name:'SCValidStartDate' },
		]
	};
	// requestForProduction with properties names and labels
	$scope.requestForProductionDefinition = {
		label: 'productionrequest.requestForProductionItem',
		properties : [
			{ label: 'rFPIItemNumber', name:'RFPIItemNumber' },
			{ label: 'rFPIQuantity', name:'RFPIQuantity' },
			{ label: 'rFPICreationDeadline', name:'RFPICreationDeadline' },
			{ label: 'rFPISellingPrice', name:'RFPISellingPrice' },
		]
	};
	// tangibleItemAmmountTools with properties names and labels
	$scope.tangibleItemAmmountToolsDefinition = {
		label: 'stockmanagement.tangibleItemAmmountTool',
		properties : [
			{ label: 'tICLocatonAddress', name:'TICLocatonAddress' },
			{ label: 'tICBookkeepingPosition', name:'TICBookkeepingPosition' },
			{ label: 'tICQuantityCumulativeInput', name:'TICQuantityCumulativeInput' },
			{ label: 'tICValueInitialState', name:'TICValueInitialState' },
			{ label: 'tICValueCumulativeInput', name:'TICValueCumulativeInput' },
			{ label: 'tICUnitPrice', name:'TICUnitPrice' },
			{ label: 'tICAvailableBalance', name:'TICAvailableBalance' },
			{ label: 'tICLastInputDate', name:'TICLastInputDate' },
			{ label: 'tICLastOutputDate', name:'TICLastOutputDate' },
		]
	};
	// subComponent with properties names and labels
	$scope.subComponentDefinition = {
		label: 'productiondata.structuralComponents',
		properties : [
			{ label: 'sCLevel', name:'SCLevel' },
			{ label: 'sCOrdinalNumberAtLevel', name:'SCOrdinalNumberAtLevel' },
			{ label: 'sCVariantNumber', name:'SCVariantNumber' },
			{ label: 'sCNormativUgradnje', name:'SCNormativUgradnje' },
			{ label: 'sCSupplyingStatus', name:'SCSupplyingStatus' },
			{ label: 'sCValidStartDate', name:'SCValidStartDate' },
		]
	};
	// productInstances with properties names and labels
	$scope.productInstancesDefinition = {
		label: 'order.productInstance',
		properties : [
			{ label: 'pIName', name:'PIName' },
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
	// previousValues with properties names and labels
	$scope.previousValuesDefinition = {
		label: 'commonbusinessentities.identificationArchive',
		properties : [
			{ label: 'iATime', name:'IATime' },
		]
	};
	// workOrders with properties names and labels
	$scope.workOrdersDefinition = {
		label: 'initialization.workOrder',
		properties : [
			{ label: 'wOCode', name:'WOCode' },
			{ label: 'wOCreationDate', name:'WOCreationDate' },
			{ label: 'wOScheduledDate', name:'WOScheduledDate' },
			{ label: 'wOLuanchedQuantity', name:'WOLuanchedQuantity' },
			{ label: 'wOAcceptedQuantity', name:'WOAcceptedQuantity' },
			{ label: 'wORejectedQuantity', name:'WORejectedQuantity' },
			{ label: 'wOZanovljenaQuantity', name:'WOZanovljenaQuantity' },
			{ label: 'wOCalculationStatus', name:'WOCalculationStatus' },
			{ label: 'tISDesignation', name:'TISDesignation' },
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
	// procurementRequestItems with properties names and labels
	$scope.procurementRequestItemsDefinition = {
		label: 'initialization.procurementRequestItem',
		properties : [
			{ label: 'pRIOrdinalNumber', name:'PRIOrdinalNumber' },
			{ label: 'pRIRequestedQuantity', name:'PRIRequestedQuantity' },
			{ label: 'pRIRealizedQuantity', name:'PRIRealizedQuantity' },
			{ label: 'pRIDeadlineDate', name:'PRIDeadlineDate' },
			{ label: 'pRISupplyStatus', name:'PRISupplyStatus' },
			{ label: 'pRIIncludedQunatityInPlan', name:'PRIIncludedQunatityInPlan' },
			{ label: 'pRIResolutionStatus', name:'PRIResolutionStatus' },
			{ label: 'mUIdentificationCode', name:'MUIdentificationCode' },
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
	// goodsReceivedNoteItems with properties names and labels
	$scope.goodsReceivedNoteItemsDefinition = {
		label: 'stockmanagement.goodsReceivedNoteItem',
		properties : [
			{ label: 'gRNIOrdinalNumber', name:'GRNIOrdinalNumber' },
			{ label: 'gRNIStockAccount', name:'GRNIStockAccount' },
			{ label: 'gRNIPriceDesignation', name:'GRNIPriceDesignation' },
			{ label: 'gRNIMeasurementUnit', name:'GRNIMeasurementUnit' },
			{ label: 'gRNIQuantityByShippingDocument', name:'GRNIQuantityByShippingDocument' },
			{ label: 'gRNIQunaityReceived', name:'GRNIQunaityReceived' },
			{ label: 'gRNIQuantityIssued', name:'GRNIQuantityIssued' },
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
	// customerRequestItems with properties names and labels
	$scope.customerRequestItemsDefinition = {
		label: 'customerrequest.customerRequestItem',
		properties : [
			{ label: 'cRIOrdinalNumber', name:'CRIOrdinalNumber' },
			{ label: 'cRIQuantity', name:'CRIQuantity' },
			{ label: 'cRIDeliveryTime', name:'CRIDeliveryTime' },
		]
	};
	// consumableSupplies with properties names and labels
	$scope.consumableSuppliesDefinition = {
		label: 'productiondata.consumableSupplies',
		properties : [
			{ label: 'cSNormativ', name:'CSNormativ' },
		]
	};
	// balanceResources with properties names and labels
	$scope.balanceResourcesDefinition = {
		label: 'capacitymanagement.balanceResource',
		properties : [
			{ label: 'bRBalanceUnit', name:'BRBalanceUnit' },
			{ label: 'bRResourceType', name:'BRResourceType' },
			{ label: 'bRStartDate', name:'BRStartDate' },
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
	// exporterSDs with properties names and labels
	$scope.exporterSDsDefinition = {
		label: 'procurement.shippingDocument',
		properties : [
			{ label: 'sDDocumentNumber', name:'SDDocumentNumber' },
			{ label: 'sDDispositionDate', name:'SDDispositionDate' },
			{ label: 'sDStatus', name:'SDStatus' },
		]
	};
	// prices with properties names and labels
	$scope.pricesDefinition = {
		label: 'stockmanagement.price',
		properties : [
			{ label: 'pPrice', name:'PPrice' },
		]
	};
	// procurementPlanItems with properties names and labels
	$scope.procurementPlanItemsDefinition = {
		label: 'initialization.procurementPlanItem',
		properties : [
			{ label: 'pPIOrdinalNumber', name:'PPIOrdinalNumber' },
			{ label: 'pPIPlannedQuantity', name:'PPIPlannedQuantity' },
			{ label: 'pPIOrderedQuantity', name:'PPIOrderedQuantity' },
			{ label: 'pPIRecievedQuantity', name:'PPIRecievedQuantity' },
			{ label: 'pPISourceProvider', name:'PPISourceProvider' },
			{ label: 'mUIdentificationCode', name:'MUIdentificationCode' },
		]
	};
	// shippingDocumentsDelivery with properties names and labels
	$scope.shippingDocumentsDeliveryDefinition = {
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
	var getIdentifications = function() {
		if(!$scope.loaded && $scope.items.length === 0) {
			$scope.isLoading = true;
			ServiceIdentification.query(function(data) {
				$scope.items = data;
				$scope.isLoading = false;
				$scope.loaded = true;
			});
		}
	};
	getIdentifications();

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

	$scope.$watch('IdentificationCollection', function() {
		$scope.itemEdit = CheckSelected.checkSelectedInTable($scope.itemEdit, $scope.IdentificationCollection, $scope.items);
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
			templateUrl: 'commonbusinessentities/identification/tmplIdentificationEdit.tpl.html',
			size: 'lg',
			windowClass: 'hmodal-info',
			controller: 'ctrlIdentificationEdit',
			resolve: {
				itemEdit: function() {
					if(isNew) {
						return new ServiceIdentification();
					} else {
						return $scope.itemEdit;
					}
				},
				classificationDefinition: function() {
					return $scope.classificationDefinition;
				},
				materialReturnNoteItemsDefinition: function() {
					return $scope.materialReturnNoteItemsDefinition;
				},
				stepToolsDefinition: function() {
					return $scope.stepToolsDefinition;
				},
				procurementRequestItemSuppliersDefinition: function() {
					return $scope.procurementRequestItemSuppliersDefinition;
				},
				tangibleItemConditionsDefinition: function() {
					return $scope.tangibleItemConditionsDefinition;
				},
				invoicesDefinition: function() {
					return $scope.invoicesDefinition;
				},
				deliveryNoteItemsDefinition: function() {
					return $scope.deliveryNoteItemsDefinition;
				},
				renamingItemsOutputDefinition: function() {
					return $scope.renamingItemsOutputDefinition;
				},
				renamingItemsInputDefinition: function() {
					return $scope.renamingItemsInputDefinition;
				},
				orderHeadingsDeliveryDefinition: function() {
					return $scope.orderHeadingsDeliveryDefinition;
				},
				characteristicsDefinition: function() {
					return $scope.characteristicsDefinition;
				},
				rfpItemsDefinition: function() {
					return $scope.rfpItemsDefinition;
				},
				goodsSDsDefinition: function() {
					return $scope.goodsSDsDefinition;
				},
				orderSupplierItemsDefinition: function() {
					return $scope.orderSupplierItemsDefinition;
				},
				sellingPriceDefinition: function() {
					return $scope.sellingPriceDefinition;
				},
				offerSupplierItemsDefinition: function() {
					return $scope.offerSupplierItemsDefinition;
				},
				goodsReceivedNoteHeadingsDefinition: function() {
					return $scope.goodsReceivedNoteHeadingsDefinition;
				},
				transactionLogsDefinition: function() {
					return $scope.transactionLogsDefinition;
				},
				offerSupplierHeadingsDefinition: function() {
					return $scope.offerSupplierHeadingsDefinition;
				},
				marketBelongingDefinition: function() {
					return $scope.marketBelongingDefinition;
				},
				invoiceSDsDefinition: function() {
					return $scope.invoiceSDsDefinition;
				},
				customerRequestHeaders1Definition: function() {
					return $scope.customerRequestHeaders1Definition;
				},
				superComponentDefinition: function() {
					return $scope.superComponentDefinition;
				},
				requestForProductionDefinition: function() {
					return $scope.requestForProductionDefinition;
				},
				tangibleItemAmmountToolsDefinition: function() {
					return $scope.tangibleItemAmmountToolsDefinition;
				},
				subComponentDefinition: function() {
					return $scope.subComponentDefinition;
				},
				productInstancesDefinition: function() {
					return $scope.productInstancesDefinition;
				},
				beOrderItemsDefinition: function() {
					return $scope.beOrderItemsDefinition;
				},
				previousValuesDefinition: function() {
					return $scope.previousValuesDefinition;
				},
				workOrdersDefinition: function() {
					return $scope.workOrdersDefinition;
				},
				orderItemsDefinition: function() {
					return $scope.orderItemsDefinition;
				},
				procurementRequestItemsDefinition: function() {
					return $scope.procurementRequestItemsDefinition;
				},
				proformaInvoicesDefinition: function() {
					return $scope.proformaInvoicesDefinition;
				},
				goodsReceivedNoteItemsDefinition: function() {
					return $scope.goodsReceivedNoteItemsDefinition;
				},
				orderSupplierHeadingsDefinition: function() {
					return $scope.orderSupplierHeadingsDefinition;
				},
				customerRequestHeadersDefinition: function() {
					return $scope.customerRequestHeadersDefinition;
				},
				customerRequestItemsDefinition: function() {
					return $scope.customerRequestItemsDefinition;
				},
				consumableSuppliesDefinition: function() {
					return $scope.consumableSuppliesDefinition;
				},
				balanceResourcesDefinition: function() {
					return $scope.balanceResourcesDefinition;
				},
				orderHeadingsDefinition: function() {
					return $scope.orderHeadingsDefinition;
				},
				exporterSDsDefinition: function() {
					return $scope.exporterSDsDefinition;
				},
				pricesDefinition: function() {
					return $scope.pricesDefinition;
				},
				procurementPlanItemsDefinition: function() {
					return $scope.procurementPlanItemsDefinition;
				},
				shippingDocumentsDeliveryDefinition: function() {
					return $scope.shippingDocumentsDeliveryDefinition;
				},
			}
		})
		.result.then(function(result) {
			if(!angular.isDefined(result.id)) {
				ServiceIdentification.saveCustom('stockmanagement/identifications', result, function(savedObject) {
					$scope.items.unshift(savedObject);
					if($scope.itemEdit !== null) {
						var index = $scope.items.map(function(it) { return it.id; }).indexOf($scope.itemEdit.id);
						$scope.items[index].isSelected = false;
					}
					$scope.itemEdit = angular.extend(savedObject);
					$scope.items[0].isSelected = true;
				});
			 } else {
				 ServiceIdentification.updateCustom('stockmanagement/identifications/'+result.id, result, function(savedObject) {
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


.controller('ctrlIdentificationEdit',['$scope', 'Localization', '$modal', '$modalInstance', 'dialogs',
	'ServiceIdentification', 'ServiceClassification', 'ServiceMaterialReturnNoteItem', 'ServiceStepTool', 'ServiceProcurementRequestItem', 'ServiceTangibleItemCondition', 'ServiceInvoice', 'ServiceDeliveryNoteItem', 'ServiceRenamingItem', 'ServiceOrderHeading', 'ServiceCharacteristic', 'ServiceRequestForProposalItem', 'ServiceShippingDocument', 'ServiceOrderSupplierItem', 'ServiceSellingPrice', 'ServiceOfferSupplierItem', 'ServiceGoodsReceivedNoteHeading', 'ServiceTransactionLog', 'ServiceOfferSupplierHeading', 'ServiceOUBelonging', 'ServiceCustomerRequestHeading', 'ServiceStructuralComponents', 'ServiceRequestForProductionItem', 'ServiceTangibleItemAmmountTool', 'ServiceProductInstance', 'ServiceBEOrderItem', 'ServiceIdentificationArchive', 'ServiceWorkOrder', 'ServiceOrderItem', 'ServiceProFormaInvoice', 'ServiceGoodsReceivedNoteItem', 'ServiceOrderSupplierHeading', 'ServiceCustomerRequestItem', 'ServiceConsumableSupplies', 'ServiceBalanceResource', 'ServicePrice', 'ServiceProcurementPlanItem',   'classificationDefinition',  'materialReturnNoteItemsDefinition',  'stepToolsDefinition',  'procurementRequestItemSuppliersDefinition',  'tangibleItemConditionsDefinition',  'invoicesDefinition',  'deliveryNoteItemsDefinition',  'renamingItemsOutputDefinition',  'renamingItemsInputDefinition',  'orderHeadingsDeliveryDefinition',  'characteristicsDefinition',  'rfpItemsDefinition',  'goodsSDsDefinition',  'orderSupplierItemsDefinition',  'sellingPriceDefinition',  'offerSupplierItemsDefinition',  'goodsReceivedNoteHeadingsDefinition',  'transactionLogsDefinition',  'offerSupplierHeadingsDefinition',  'marketBelongingDefinition',  'invoiceSDsDefinition',  'customerRequestHeaders1Definition',  'superComponentDefinition',  'requestForProductionDefinition',  'tangibleItemAmmountToolsDefinition',  'subComponentDefinition',  'productInstancesDefinition',  'beOrderItemsDefinition',  'previousValuesDefinition',  'workOrdersDefinition',  'orderItemsDefinition',  'procurementRequestItemsDefinition',  'proformaInvoicesDefinition',  'goodsReceivedNoteItemsDefinition',  'orderSupplierHeadingsDefinition',  'customerRequestHeadersDefinition',  'customerRequestItemsDefinition',  'consumableSuppliesDefinition',  'balanceResourcesDefinition',  'orderHeadingsDefinition',  'exporterSDsDefinition',  'pricesDefinition',  'procurementPlanItemsDefinition',  'shippingDocumentsDeliveryDefinition',   'itemEdit',
function($scope, Localization, $modal, $modalInstance, dialogs,
	ServiceIdentification, ServiceClassification, ServiceMaterialReturnNoteItem, ServiceStepTool, ServiceProcurementRequestItem, ServiceTangibleItemCondition, ServiceInvoice, ServiceDeliveryNoteItem, ServiceRenamingItem, ServiceOrderHeading, ServiceCharacteristic, ServiceRequestForProposalItem, ServiceShippingDocument, ServiceOrderSupplierItem, ServiceSellingPrice, ServiceOfferSupplierItem, ServiceGoodsReceivedNoteHeading, ServiceTransactionLog, ServiceOfferSupplierHeading, ServiceOUBelonging, ServiceCustomerRequestHeading, ServiceStructuralComponents, ServiceRequestForProductionItem, ServiceTangibleItemAmmountTool, ServiceProductInstance, ServiceBEOrderItem, ServiceIdentificationArchive, ServiceWorkOrder, ServiceOrderItem, ServiceProFormaInvoice, ServiceGoodsReceivedNoteItem, ServiceOrderSupplierHeading, ServiceCustomerRequestItem, ServiceConsumableSupplies, ServiceBalanceResource, ServicePrice, ServiceProcurementPlanItem,  classificationDefinition,  materialReturnNoteItemsDefinition,  stepToolsDefinition,  procurementRequestItemSuppliersDefinition,  tangibleItemConditionsDefinition,  invoicesDefinition,  deliveryNoteItemsDefinition,  renamingItemsOutputDefinition,  renamingItemsInputDefinition,  orderHeadingsDeliveryDefinition,  characteristicsDefinition,  rfpItemsDefinition,  goodsSDsDefinition,  orderSupplierItemsDefinition,  sellingPriceDefinition,  offerSupplierItemsDefinition,  goodsReceivedNoteHeadingsDefinition,  transactionLogsDefinition,  offerSupplierHeadingsDefinition,  marketBelongingDefinition,  invoiceSDsDefinition,  customerRequestHeaders1Definition,  superComponentDefinition,  requestForProductionDefinition,  tangibleItemAmmountToolsDefinition,  subComponentDefinition,  productInstancesDefinition,  beOrderItemsDefinition,  previousValuesDefinition,  workOrdersDefinition,  orderItemsDefinition,  procurementRequestItemsDefinition,  proformaInvoicesDefinition,  goodsReceivedNoteItemsDefinition,  orderSupplierHeadingsDefinition,  customerRequestHeadersDefinition,  customerRequestItemsDefinition,  consumableSuppliesDefinition,  balanceResourcesDefinition,  orderHeadingsDefinition,  exporterSDsDefinition,  pricesDefinition,  procurementPlanItemsDefinition,  shippingDocumentsDeliveryDefinition,  itemEdit) {

	// dialog mode
	$scope.mode = 'edit';

	// original item state
	var original = angular.copy(itemEdit);
	// item state
	$scope.itemEdit = angular.copy(original);

	// classification with properties
	$scope.classificationDefinition = classificationDefinition;
	// materialReturnNoteItems with properties
	$scope.materialReturnNoteItemsDefinition = materialReturnNoteItemsDefinition;
	// stepTools with properties
	$scope.stepToolsDefinition = stepToolsDefinition;
	// procurementRequestItemSuppliers with properties
	$scope.procurementRequestItemSuppliersDefinition = procurementRequestItemSuppliersDefinition;
	// tangibleItemConditions with properties
	$scope.tangibleItemConditionsDefinition = tangibleItemConditionsDefinition;
	// invoices with properties
	$scope.invoicesDefinition = invoicesDefinition;
	// deliveryNoteItems with properties
	$scope.deliveryNoteItemsDefinition = deliveryNoteItemsDefinition;
	// renamingItemsOutput with properties
	$scope.renamingItemsOutputDefinition = renamingItemsOutputDefinition;
	// renamingItemsInput with properties
	$scope.renamingItemsInputDefinition = renamingItemsInputDefinition;
	// orderHeadingsDelivery with properties
	$scope.orderHeadingsDeliveryDefinition = orderHeadingsDeliveryDefinition;
	// characteristics with properties
	$scope.characteristicsDefinition = characteristicsDefinition;
	// rfpItems with properties
	$scope.rfpItemsDefinition = rfpItemsDefinition;
	// goodsSDs with properties
	$scope.goodsSDsDefinition = goodsSDsDefinition;
	// orderSupplierItems with properties
	$scope.orderSupplierItemsDefinition = orderSupplierItemsDefinition;
	// sellingPrice with properties
	$scope.sellingPriceDefinition = sellingPriceDefinition;
	// offerSupplierItems with properties
	$scope.offerSupplierItemsDefinition = offerSupplierItemsDefinition;
	// goodsReceivedNoteHeadings with properties
	$scope.goodsReceivedNoteHeadingsDefinition = goodsReceivedNoteHeadingsDefinition;
	// transactionLogs with properties
	$scope.transactionLogsDefinition = transactionLogsDefinition;
	// offerSupplierHeadings with properties
	$scope.offerSupplierHeadingsDefinition = offerSupplierHeadingsDefinition;
	// marketBelonging with properties
	$scope.marketBelongingDefinition = marketBelongingDefinition;
	// invoiceSDs with properties
	$scope.invoiceSDsDefinition = invoiceSDsDefinition;
	// customerRequestHeaders1 with properties
	$scope.customerRequestHeaders1Definition = customerRequestHeaders1Definition;
	// superComponent with properties
	$scope.superComponentDefinition = superComponentDefinition;
	// requestForProduction with properties
	$scope.requestForProductionDefinition = requestForProductionDefinition;
	// tangibleItemAmmountTools with properties
	$scope.tangibleItemAmmountToolsDefinition = tangibleItemAmmountToolsDefinition;
	// subComponent with properties
	$scope.subComponentDefinition = subComponentDefinition;
	// productInstances with properties
	$scope.productInstancesDefinition = productInstancesDefinition;
	// beOrderItems with properties
	$scope.beOrderItemsDefinition = beOrderItemsDefinition;
	// previousValues with properties
	$scope.previousValuesDefinition = previousValuesDefinition;
	// workOrders with properties
	$scope.workOrdersDefinition = workOrdersDefinition;
	// orderItems with properties
	$scope.orderItemsDefinition = orderItemsDefinition;
	// procurementRequestItems with properties
	$scope.procurementRequestItemsDefinition = procurementRequestItemsDefinition;
	// proformaInvoices with properties
	$scope.proformaInvoicesDefinition = proformaInvoicesDefinition;
	// goodsReceivedNoteItems with properties
	$scope.goodsReceivedNoteItemsDefinition = goodsReceivedNoteItemsDefinition;
	// orderSupplierHeadings with properties
	$scope.orderSupplierHeadingsDefinition = orderSupplierHeadingsDefinition;
	// customerRequestHeaders with properties
	$scope.customerRequestHeadersDefinition = customerRequestHeadersDefinition;
	// customerRequestItems with properties
	$scope.customerRequestItemsDefinition = customerRequestItemsDefinition;
	// consumableSupplies with properties
	$scope.consumableSuppliesDefinition = consumableSuppliesDefinition;
	// balanceResources with properties
	$scope.balanceResourcesDefinition = balanceResourcesDefinition;
	// orderHeadings with properties
	$scope.orderHeadingsDefinition = orderHeadingsDefinition;
	// exporterSDs with properties
	$scope.exporterSDsDefinition = exporterSDsDefinition;
	// prices with properties
	$scope.pricesDefinition = pricesDefinition;
	// procurementPlanItems with properties
	$scope.procurementPlanItemsDefinition = procurementPlanItemsDefinition;
	// shippingDocumentsDelivery with properties
	$scope.shippingDocumentsDeliveryDefinition = shippingDocumentsDeliveryDefinition;

	// datepicker logic

	// date properties

	$scope.open = function($event, opened) {
		$event.preventDefault();
		$event.stopPropagation();
		$scope[opened] = true;
	};



	// Choose classification
	$scope.openChooseClassificationDialog = function() {
        $modal.open({
            backdrop: 'static',
            keyboard : false,
            templateUrl: 'commonbusinessentities/identification/tmplClassificationChoose.tpl.html',
            size: 'lg',
            controller: 'ctrlClassificationChoose',
            windowClass: 'hmodal-info',
            resolve: {
				itemEdit: function() {
					if(angular.isDefined($scope.itemEdit.classification)){
						return $scope.itemEdit.classification;
					}
				}
			}
		}).result.then(function(result) {
			$scope.itemEdit.classification = angular.copy(result);
		});
    };


    $scope.stepToolEdit = null;

    // stepTools table selection logic
    $scope.stepToolSelection = function(item, index) {
        if(item.isSelected) {
            if($scope.stepToolEdit !== null) {
                var index1 = $scope.itemEdit.stepTools.map(function(it) { return it.id; }).indexOf($scope.stepToolEdit.id);
                $scope.itemEdit.stepTools[index1].isSelected = false;
            }
            $scope.stepToolEdit = item;
        } else {
            $scope.stepToolEdit = null;
            item.isSelected = false;
        }
    };

    // New/Edit stepTools dialog
    $scope.openStepToolEditDialog = function(isNew) {
        $modal.open({
            backdrop: 'static',
            keyboard : false,
            templateUrl: 'productiondata/identification/tmplStepToolEdit.tpl.html',
            size: 'lg',
            controller: 'ctrlStepToolEdit',
            windowClass: 'hmodal-info',
            resolve: {
                itemEdit: function() {
                    if(isNew) {
                        return new ServiceStepTool();
                    } else {
                        return $scope.stepToolEdit;
                    }
                }
            }
        }).result.then(function(result) {
            var i;
            if(isNew) {
                if(!angular.isDefined($scope.itemEdit.stepTools)) {
                    $scope.itemEdit.stepTools = [];
                }
                $scope.itemEdit.stepTools.unshift(result);
                for(i in $scope.itemEdit.stepTools) {
                    $scope.itemEdit.stepTools[i].isSelected = false;
                }
                $scope.stepToolEdit = angular.extend(result);
                $scope.itemEdit.stepTools[0].isSelected = true;
            }
            else {
                for(i in $scope.itemEdit.stepTools) {
                    $scope.itemEdit.stepTools[i].isSelected = false;
                }
                $scope.stepToolEdit = angular.extend(result);
                var index = $scope.itemEdit.stepTools.map(function(it) { return it.id; }).indexOf(result.id);
                for(var key in result) {
                    $scope.itemEdit.stepTools[index][key] = result[key];
                }
                $scope.itemEdit.stepTools[index].isSelected = true;
            }
        });
    };

    $scope.removeStepTool = function(item) {
        var dialog = dialogs.confirm('Please confirm', 'Are you sure you want to delete item?');
        dialog.result.then(function(btn) {
            var removeIndex = $scope.itemEdit.stepTools.map(function(it) { return it.id; }).indexOf(item.id);
            $scope.itemEdit.stepTools[removeIndex].deleted = true;
        });
    };


    $scope.tangibleItemConditionEdit = null;

    // tangibleItemConditions table selection logic
    $scope.tangibleItemConditionSelection = function(item, index) {
        if(item.isSelected) {
            if($scope.tangibleItemConditionEdit !== null) {
                var index1 = $scope.itemEdit.tangibleItemConditions.map(function(it) { return it.id; }).indexOf($scope.tangibleItemConditionEdit.id);
                $scope.itemEdit.tangibleItemConditions[index1].isSelected = false;
            }
            $scope.tangibleItemConditionEdit = item;
        } else {
            $scope.tangibleItemConditionEdit = null;
            item.isSelected = false;
        }
    };

    // New/Edit tangibleItemConditions dialog
    $scope.openTangibleItemConditionEditDialog = function(isNew) {
        $modal.open({
            backdrop: 'static',
            keyboard : false,
            templateUrl: 'stockmanagement/identification/tmplTangibleItemConditionEdit.tpl.html',
            size: 'lg',
            controller: 'ctrlTangibleItemConditionEdit',
            windowClass: 'hmodal-info',
            resolve: {
                itemEdit: function() {
                    if(isNew) {
                        return new ServiceTangibleItemCondition();
                    } else {
                        return $scope.tangibleItemConditionEdit;
                    }
                }
            }
        }).result.then(function(result) {
            var i;
            if(isNew) {
                if(!angular.isDefined($scope.itemEdit.tangibleItemConditions)) {
                    $scope.itemEdit.tangibleItemConditions = [];
                }
                $scope.itemEdit.tangibleItemConditions.unshift(result);
                for(i in $scope.itemEdit.tangibleItemConditions) {
                    $scope.itemEdit.tangibleItemConditions[i].isSelected = false;
                }
                $scope.tangibleItemConditionEdit = angular.extend(result);
                $scope.itemEdit.tangibleItemConditions[0].isSelected = true;
            }
            else {
                for(i in $scope.itemEdit.tangibleItemConditions) {
                    $scope.itemEdit.tangibleItemConditions[i].isSelected = false;
                }
                $scope.tangibleItemConditionEdit = angular.extend(result);
                var index = $scope.itemEdit.tangibleItemConditions.map(function(it) { return it.id; }).indexOf(result.id);
                for(var key in result) {
                    $scope.itemEdit.tangibleItemConditions[index][key] = result[key];
                }
                $scope.itemEdit.tangibleItemConditions[index].isSelected = true;
            }
        });
    };

    $scope.removeTangibleItemCondition = function(item) {
        var dialog = dialogs.confirm('Please confirm', 'Are you sure you want to delete item?');
        dialog.result.then(function(btn) {
            var removeIndex = $scope.itemEdit.tangibleItemConditions.map(function(it) { return it.id; }).indexOf(item.id);
            $scope.itemEdit.tangibleItemConditions[removeIndex].deleted = true;
        });
    };


    $scope.characteristicEdit = null;

    // characteristics table selection logic
    $scope.characteristicSelection = function(item, index) {
        if(item.isSelected) {
            if($scope.characteristicEdit !== null) {
                var index1 = $scope.itemEdit.characteristics.map(function(it) { return it.id; }).indexOf($scope.characteristicEdit.id);
                $scope.itemEdit.characteristics[index1].isSelected = false;
            }
            $scope.characteristicEdit = item;
        } else {
            $scope.characteristicEdit = null;
            item.isSelected = false;
        }
    };

    // New/Edit characteristics dialog
    $scope.openCharacteristicEditDialog = function(isNew) {
        $modal.open({
            backdrop: 'static',
            keyboard : false,
            templateUrl: 'commonbusinessentities/identification/tmplCharacteristicEdit.tpl.html',
            size: 'lg',
            controller: 'ctrlCharacteristicEdit',
            windowClass: 'hmodal-info',
            resolve: {
                itemEdit: function() {
                    if(isNew) {
                        return new ServiceCharacteristic();
                    } else {
                        return $scope.characteristicEdit;
                    }
                }
            }
        }).result.then(function(result) {
            var i;
            if(isNew) {
                if(!angular.isDefined($scope.itemEdit.characteristics)) {
                    $scope.itemEdit.characteristics = [];
                }
                $scope.itemEdit.characteristics.unshift(result);
                for(i in $scope.itemEdit.characteristics) {
                    $scope.itemEdit.characteristics[i].isSelected = false;
                }
                $scope.characteristicEdit = angular.extend(result);
                $scope.itemEdit.characteristics[0].isSelected = true;
            }
            else {
                for(i in $scope.itemEdit.characteristics) {
                    $scope.itemEdit.characteristics[i].isSelected = false;
                }
                $scope.characteristicEdit = angular.extend(result);
                var index = $scope.itemEdit.characteristics.map(function(it) { return it.id; }).indexOf(result.id);
                for(var key in result) {
                    $scope.itemEdit.characteristics[index][key] = result[key];
                }
                $scope.itemEdit.characteristics[index].isSelected = true;
            }
        });
    };

    $scope.removeCharacteristic = function(item) {
        var dialog = dialogs.confirm('Please confirm', 'Are you sure you want to delete item?');
        dialog.result.then(function(btn) {
            var removeIndex = $scope.itemEdit.characteristics.map(function(it) { return it.id; }).indexOf(item.id);
            $scope.itemEdit.characteristics[removeIndex].deleted = true;
        });
    };


    $scope.sellingPriceEdit = null;

    // sellingPrice table selection logic
    $scope.sellingPriceSelection = function(item, index) {
        if(item.isSelected) {
            if($scope.sellingPriceEdit !== null) {
                var index1 = $scope.itemEdit.sellingPrice.map(function(it) { return it.id; }).indexOf($scope.sellingPriceEdit.id);
                $scope.itemEdit.sellingPrice[index1].isSelected = false;
            }
            $scope.sellingPriceEdit = item;
        } else {
            $scope.sellingPriceEdit = null;
            item.isSelected = false;
        }
    };

    // New/Edit sellingPrice dialog
    $scope.openSellingPriceEditDialog = function(isNew) {
        $modal.open({
            backdrop: 'static',
            keyboard : false,
            templateUrl: 'sellingprice/identification/tmplSellingPriceEdit.tpl.html',
            size: 'lg',
            controller: 'ctrlSellingPriceEdit',
            windowClass: 'hmodal-info',
            resolve: {
                itemEdit: function() {
                    if(isNew) {
                        return new ServiceSellingPrice();
                    } else {
                        return $scope.sellingPriceEdit;
                    }
                }
            }
        }).result.then(function(result) {
            var i;
            if(isNew) {
                if(!angular.isDefined($scope.itemEdit.sellingPrice)) {
                    $scope.itemEdit.sellingPrice = [];
                }
                $scope.itemEdit.sellingPrice.unshift(result);
                for(i in $scope.itemEdit.sellingPrice) {
                    $scope.itemEdit.sellingPrice[i].isSelected = false;
                }
                $scope.sellingPriceEdit = angular.extend(result);
                $scope.itemEdit.sellingPrice[0].isSelected = true;
            }
            else {
                for(i in $scope.itemEdit.sellingPrice) {
                    $scope.itemEdit.sellingPrice[i].isSelected = false;
                }
                $scope.sellingPriceEdit = angular.extend(result);
                var index = $scope.itemEdit.sellingPrice.map(function(it) { return it.id; }).indexOf(result.id);
                for(var key in result) {
                    $scope.itemEdit.sellingPrice[index][key] = result[key];
                }
                $scope.itemEdit.sellingPrice[index].isSelected = true;
            }
        });
    };

    $scope.removeSellingPrice = function(item) {
        var dialog = dialogs.confirm('Please confirm', 'Are you sure you want to delete item?');
        dialog.result.then(function(btn) {
            var removeIndex = $scope.itemEdit.sellingPrice.map(function(it) { return it.id; }).indexOf(item.id);
            $scope.itemEdit.sellingPrice[removeIndex].deleted = true;
        });
    };


    $scope.oUBelongingEdit = null;

    // marketBelonging table selection logic
    $scope.oUBelongingSelection = function(item, index) {
        if(item.isSelected) {
            if($scope.oUBelongingEdit !== null) {
                var index1 = $scope.itemEdit.marketBelonging.map(function(it) { return it.id; }).indexOf($scope.oUBelongingEdit.id);
                $scope.itemEdit.marketBelonging[index1].isSelected = false;
            }
            $scope.oUBelongingEdit = item;
        } else {
            $scope.oUBelongingEdit = null;
            item.isSelected = false;
        }
    };

    // New/Edit marketBelonging dialog
    $scope.openOUBelongingEditDialog = function(isNew) {
        $modal.open({
            backdrop: 'static',
            keyboard : false,
            templateUrl: 'sellingprice/identification/tmplOUBelongingEdit.tpl.html',
            size: 'lg',
            controller: 'ctrlOUBelongingEdit',
            windowClass: 'hmodal-info',
            resolve: {
                itemEdit: function() {
                    if(isNew) {
                        return new ServiceOUBelonging();
                    } else {
                        return $scope.oUBelongingEdit;
                    }
                }
            }
        }).result.then(function(result) {
            var i;
            if(isNew) {
                if(!angular.isDefined($scope.itemEdit.marketBelonging)) {
                    $scope.itemEdit.marketBelonging = [];
                }
                $scope.itemEdit.marketBelonging.unshift(result);
                for(i in $scope.itemEdit.marketBelonging) {
                    $scope.itemEdit.marketBelonging[i].isSelected = false;
                }
                $scope.oUBelongingEdit = angular.extend(result);
                $scope.itemEdit.marketBelonging[0].isSelected = true;
            }
            else {
                for(i in $scope.itemEdit.marketBelonging) {
                    $scope.itemEdit.marketBelonging[i].isSelected = false;
                }
                $scope.oUBelongingEdit = angular.extend(result);
                var index = $scope.itemEdit.marketBelonging.map(function(it) { return it.id; }).indexOf(result.id);
                for(var key in result) {
                    $scope.itemEdit.marketBelonging[index][key] = result[key];
                }
                $scope.itemEdit.marketBelonging[index].isSelected = true;
            }
        });
    };

    $scope.removeOUBelonging = function(item) {
        var dialog = dialogs.confirm('Please confirm', 'Are you sure you want to delete item?');
        dialog.result.then(function(btn) {
            var removeIndex = $scope.itemEdit.marketBelonging.map(function(it) { return it.id; }).indexOf(item.id);
            $scope.itemEdit.marketBelonging[removeIndex].deleted = true;
        });
    };


    $scope.structuralComponentsEdit = null;

    // superComponent table selection logic
    $scope.structuralComponentsSelection = function(item, index) {
        if(item.isSelected) {
            if($scope.structuralComponentsEdit !== null) {
                var index1 = $scope.itemEdit.superComponent.map(function(it) { return it.id; }).indexOf($scope.structuralComponentsEdit.id);
                $scope.itemEdit.superComponent[index1].isSelected = false;
            }
            $scope.structuralComponentsEdit = item;
        } else {
            $scope.structuralComponentsEdit = null;
            item.isSelected = false;
        }
    };

    // New/Edit superComponent dialog
    $scope.openStructuralComponentsEditDialog = function(isNew) {
        $modal.open({
            backdrop: 'static',
            keyboard : false,
            templateUrl: 'productiondata/identification/tmplStructuralComponentsEdit.tpl.html',
            size: 'lg',
            controller: 'ctrlStructuralComponentsEdit',
            windowClass: 'hmodal-info',
            resolve: {
                itemEdit: function() {
                    if(isNew) {
                        return new ServiceStructuralComponents();
                    } else {
                        return $scope.structuralComponentsEdit;
                    }
                }
            }
        }).result.then(function(result) {
            var i;
            if(isNew) {
                if(!angular.isDefined($scope.itemEdit.superComponent)) {
                    $scope.itemEdit.superComponent = [];
                }
                $scope.itemEdit.superComponent.unshift(result);
                for(i in $scope.itemEdit.superComponent) {
                    $scope.itemEdit.superComponent[i].isSelected = false;
                }
                $scope.structuralComponentsEdit = angular.extend(result);
                $scope.itemEdit.superComponent[0].isSelected = true;
            }
            else {
                for(i in $scope.itemEdit.superComponent) {
                    $scope.itemEdit.superComponent[i].isSelected = false;
                }
                $scope.structuralComponentsEdit = angular.extend(result);
                var index = $scope.itemEdit.superComponent.map(function(it) { return it.id; }).indexOf(result.id);
                for(var key in result) {
                    $scope.itemEdit.superComponent[index][key] = result[key];
                }
                $scope.itemEdit.superComponent[index].isSelected = true;
            }
        });
    };

    $scope.removeStructuralComponents = function(item) {
        var dialog = dialogs.confirm('Please confirm', 'Are you sure you want to delete item?');
        dialog.result.then(function(btn) {
            var removeIndex = $scope.itemEdit.superComponent.map(function(it) { return it.id; }).indexOf(item.id);
            $scope.itemEdit.superComponent[removeIndex].deleted = true;
        });
    };


    $scope.tangibleItemAmmountToolEdit = null;

    // tangibleItemAmmountTools table selection logic
    $scope.tangibleItemAmmountToolSelection = function(item, index) {
        if(item.isSelected) {
            if($scope.tangibleItemAmmountToolEdit !== null) {
                var index1 = $scope.itemEdit.tangibleItemAmmountTools.map(function(it) { return it.id; }).indexOf($scope.tangibleItemAmmountToolEdit.id);
                $scope.itemEdit.tangibleItemAmmountTools[index1].isSelected = false;
            }
            $scope.tangibleItemAmmountToolEdit = item;
        } else {
            $scope.tangibleItemAmmountToolEdit = null;
            item.isSelected = false;
        }
    };

    // New/Edit tangibleItemAmmountTools dialog
    $scope.openTangibleItemAmmountToolEditDialog = function(isNew) {
        $modal.open({
            backdrop: 'static',
            keyboard : false,
            templateUrl: 'stockmanagement/identification/tmplTangibleItemAmmountToolEdit.tpl.html',
            size: 'lg',
            controller: 'ctrlTangibleItemAmmountToolEdit',
            windowClass: 'hmodal-info',
            resolve: {
                itemEdit: function() {
                    if(isNew) {
                        return new ServiceTangibleItemAmmountTool();
                    } else {
                        return $scope.tangibleItemAmmountToolEdit;
                    }
                }
            }
        }).result.then(function(result) {
            var i;
            if(isNew) {
                if(!angular.isDefined($scope.itemEdit.tangibleItemAmmountTools)) {
                    $scope.itemEdit.tangibleItemAmmountTools = [];
                }
                $scope.itemEdit.tangibleItemAmmountTools.unshift(result);
                for(i in $scope.itemEdit.tangibleItemAmmountTools) {
                    $scope.itemEdit.tangibleItemAmmountTools[i].isSelected = false;
                }
                $scope.tangibleItemAmmountToolEdit = angular.extend(result);
                $scope.itemEdit.tangibleItemAmmountTools[0].isSelected = true;
            }
            else {
                for(i in $scope.itemEdit.tangibleItemAmmountTools) {
                    $scope.itemEdit.tangibleItemAmmountTools[i].isSelected = false;
                }
                $scope.tangibleItemAmmountToolEdit = angular.extend(result);
                var index = $scope.itemEdit.tangibleItemAmmountTools.map(function(it) { return it.id; }).indexOf(result.id);
                for(var key in result) {
                    $scope.itemEdit.tangibleItemAmmountTools[index][key] = result[key];
                }
                $scope.itemEdit.tangibleItemAmmountTools[index].isSelected = true;
            }
        });
    };

    $scope.removeTangibleItemAmmountTool = function(item) {
        var dialog = dialogs.confirm('Please confirm', 'Are you sure you want to delete item?');
        dialog.result.then(function(btn) {
            var removeIndex = $scope.itemEdit.tangibleItemAmmountTools.map(function(it) { return it.id; }).indexOf(item.id);
            $scope.itemEdit.tangibleItemAmmountTools[removeIndex].deleted = true;
        });
    };


    $scope.structuralComponentsEdit = null;

    // subComponent table selection logic
    $scope.structuralComponentsSelection = function(item, index) {
        if(item.isSelected) {
            if($scope.structuralComponentsEdit !== null) {
                var index1 = $scope.itemEdit.subComponent.map(function(it) { return it.id; }).indexOf($scope.structuralComponentsEdit.id);
                $scope.itemEdit.subComponent[index1].isSelected = false;
            }
            $scope.structuralComponentsEdit = item;
        } else {
            $scope.structuralComponentsEdit = null;
            item.isSelected = false;
        }
    };

    // New/Edit subComponent dialog
    $scope.openStructuralComponentsEditDialog = function(isNew) {
        $modal.open({
            backdrop: 'static',
            keyboard : false,
            templateUrl: 'productiondata/identification/tmplStructuralComponentsEdit.tpl.html',
            size: 'lg',
            controller: 'ctrlStructuralComponentsEdit',
            windowClass: 'hmodal-info',
            resolve: {
                itemEdit: function() {
                    if(isNew) {
                        return new ServiceStructuralComponents();
                    } else {
                        return $scope.structuralComponentsEdit;
                    }
                }
            }
        }).result.then(function(result) {
            var i;
            if(isNew) {
                if(!angular.isDefined($scope.itemEdit.subComponent)) {
                    $scope.itemEdit.subComponent = [];
                }
                $scope.itemEdit.subComponent.unshift(result);
                for(i in $scope.itemEdit.subComponent) {
                    $scope.itemEdit.subComponent[i].isSelected = false;
                }
                $scope.structuralComponentsEdit = angular.extend(result);
                $scope.itemEdit.subComponent[0].isSelected = true;
            }
            else {
                for(i in $scope.itemEdit.subComponent) {
                    $scope.itemEdit.subComponent[i].isSelected = false;
                }
                $scope.structuralComponentsEdit = angular.extend(result);
                var index = $scope.itemEdit.subComponent.map(function(it) { return it.id; }).indexOf(result.id);
                for(var key in result) {
                    $scope.itemEdit.subComponent[index][key] = result[key];
                }
                $scope.itemEdit.subComponent[index].isSelected = true;
            }
        });
    };

    $scope.removeStructuralComponents = function(item) {
        var dialog = dialogs.confirm('Please confirm', 'Are you sure you want to delete item?');
        dialog.result.then(function(btn) {
            var removeIndex = $scope.itemEdit.subComponent.map(function(it) { return it.id; }).indexOf(item.id);
            $scope.itemEdit.subComponent[removeIndex].deleted = true;
        });
    };


    $scope.identificationArchiveEdit = null;

    // previousValues table selection logic
    $scope.identificationArchiveSelection = function(item, index) {
        if(item.isSelected) {
            if($scope.identificationArchiveEdit !== null) {
                var index1 = $scope.itemEdit.previousValues.map(function(it) { return it.id; }).indexOf($scope.identificationArchiveEdit.id);
                $scope.itemEdit.previousValues[index1].isSelected = false;
            }
            $scope.identificationArchiveEdit = item;
        } else {
            $scope.identificationArchiveEdit = null;
            item.isSelected = false;
        }
    };

    // New/Edit previousValues dialog
    $scope.openIdentificationArchiveEditDialog = function(isNew) {
        $modal.open({
            backdrop: 'static',
            keyboard : false,
            templateUrl: 'commonbusinessentities/identification/tmplIdentificationArchiveEdit.tpl.html',
            size: 'lg',
            controller: 'ctrlIdentificationArchiveEdit',
            windowClass: 'hmodal-info',
            resolve: {
                itemEdit: function() {
                    if(isNew) {
                        return new ServiceIdentificationArchive();
                    } else {
                        return $scope.identificationArchiveEdit;
                    }
                }
            }
        }).result.then(function(result) {
            var i;
            if(isNew) {
                if(!angular.isDefined($scope.itemEdit.previousValues)) {
                    $scope.itemEdit.previousValues = [];
                }
                $scope.itemEdit.previousValues.unshift(result);
                for(i in $scope.itemEdit.previousValues) {
                    $scope.itemEdit.previousValues[i].isSelected = false;
                }
                $scope.identificationArchiveEdit = angular.extend(result);
                $scope.itemEdit.previousValues[0].isSelected = true;
            }
            else {
                for(i in $scope.itemEdit.previousValues) {
                    $scope.itemEdit.previousValues[i].isSelected = false;
                }
                $scope.identificationArchiveEdit = angular.extend(result);
                var index = $scope.itemEdit.previousValues.map(function(it) { return it.id; }).indexOf(result.id);
                for(var key in result) {
                    $scope.itemEdit.previousValues[index][key] = result[key];
                }
                $scope.itemEdit.previousValues[index].isSelected = true;
            }
        });
    };

    $scope.removeIdentificationArchive = function(item) {
        var dialog = dialogs.confirm('Please confirm', 'Are you sure you want to delete item?');
        dialog.result.then(function(btn) {
            var removeIndex = $scope.itemEdit.previousValues.map(function(it) { return it.id; }).indexOf(item.id);
            $scope.itemEdit.previousValues[removeIndex].deleted = true;
        });
    };


    $scope.consumableSuppliesEdit = null;

    // consumableSupplies table selection logic
    $scope.consumableSuppliesSelection = function(item, index) {
        if(item.isSelected) {
            if($scope.consumableSuppliesEdit !== null) {
                var index1 = $scope.itemEdit.consumableSupplies.map(function(it) { return it.id; }).indexOf($scope.consumableSuppliesEdit.id);
                $scope.itemEdit.consumableSupplies[index1].isSelected = false;
            }
            $scope.consumableSuppliesEdit = item;
        } else {
            $scope.consumableSuppliesEdit = null;
            item.isSelected = false;
        }
    };

    // New/Edit consumableSupplies dialog
    $scope.openConsumableSuppliesEditDialog = function(isNew) {
        $modal.open({
            backdrop: 'static',
            keyboard : false,
            templateUrl: 'productiondata/identification/tmplConsumableSuppliesEdit.tpl.html',
            size: 'lg',
            controller: 'ctrlConsumableSuppliesEdit',
            windowClass: 'hmodal-info',
            resolve: {
                itemEdit: function() {
                    if(isNew) {
                        return new ServiceConsumableSupplies();
                    } else {
                        return $scope.consumableSuppliesEdit;
                    }
                }
            }
        }).result.then(function(result) {
            var i;
            if(isNew) {
                if(!angular.isDefined($scope.itemEdit.consumableSupplies)) {
                    $scope.itemEdit.consumableSupplies = [];
                }
                $scope.itemEdit.consumableSupplies.unshift(result);
                for(i in $scope.itemEdit.consumableSupplies) {
                    $scope.itemEdit.consumableSupplies[i].isSelected = false;
                }
                $scope.consumableSuppliesEdit = angular.extend(result);
                $scope.itemEdit.consumableSupplies[0].isSelected = true;
            }
            else {
                for(i in $scope.itemEdit.consumableSupplies) {
                    $scope.itemEdit.consumableSupplies[i].isSelected = false;
                }
                $scope.consumableSuppliesEdit = angular.extend(result);
                var index = $scope.itemEdit.consumableSupplies.map(function(it) { return it.id; }).indexOf(result.id);
                for(var key in result) {
                    $scope.itemEdit.consumableSupplies[index][key] = result[key];
                }
                $scope.itemEdit.consumableSupplies[index].isSelected = true;
            }
        });
    };

    $scope.removeConsumableSupplies = function(item) {
        var dialog = dialogs.confirm('Please confirm', 'Are you sure you want to delete item?');
        dialog.result.then(function(btn) {
            var removeIndex = $scope.itemEdit.consumableSupplies.map(function(it) { return it.id; }).indexOf(item.id);
            $scope.itemEdit.consumableSupplies[removeIndex].deleted = true;
        });
    };


    $scope.balanceResourceEdit = null;

    // balanceResources table selection logic
    $scope.balanceResourceSelection = function(item, index) {
        if(item.isSelected) {
            if($scope.balanceResourceEdit !== null) {
                var index1 = $scope.itemEdit.balanceResources.map(function(it) { return it.id; }).indexOf($scope.balanceResourceEdit.id);
                $scope.itemEdit.balanceResources[index1].isSelected = false;
            }
            $scope.balanceResourceEdit = item;
        } else {
            $scope.balanceResourceEdit = null;
            item.isSelected = false;
        }
    };

    // New/Edit balanceResources dialog
    $scope.openBalanceResourceEditDialog = function(isNew) {
        $modal.open({
            backdrop: 'static',
            keyboard : false,
            templateUrl: 'capacitymanagement/identification/tmplBalanceResourceEdit.tpl.html',
            size: 'lg',
            controller: 'ctrlBalanceResourceEdit',
            windowClass: 'hmodal-info',
            resolve: {
                itemEdit: function() {
                    if(isNew) {
                        return new ServiceBalanceResource();
                    } else {
                        return $scope.balanceResourceEdit;
                    }
                }
            }
        }).result.then(function(result) {
            var i;
            if(isNew) {
                if(!angular.isDefined($scope.itemEdit.balanceResources)) {
                    $scope.itemEdit.balanceResources = [];
                }
                $scope.itemEdit.balanceResources.unshift(result);
                for(i in $scope.itemEdit.balanceResources) {
                    $scope.itemEdit.balanceResources[i].isSelected = false;
                }
                $scope.balanceResourceEdit = angular.extend(result);
                $scope.itemEdit.balanceResources[0].isSelected = true;
            }
            else {
                for(i in $scope.itemEdit.balanceResources) {
                    $scope.itemEdit.balanceResources[i].isSelected = false;
                }
                $scope.balanceResourceEdit = angular.extend(result);
                var index = $scope.itemEdit.balanceResources.map(function(it) { return it.id; }).indexOf(result.id);
                for(var key in result) {
                    $scope.itemEdit.balanceResources[index][key] = result[key];
                }
                $scope.itemEdit.balanceResources[index].isSelected = true;
            }
        });
    };

    $scope.removeBalanceResource = function(item) {
        var dialog = dialogs.confirm('Please confirm', 'Are you sure you want to delete item?');
        dialog.result.then(function(btn) {
            var removeIndex = $scope.itemEdit.balanceResources.map(function(it) { return it.id; }).indexOf(item.id);
            $scope.itemEdit.balanceResources[removeIndex].deleted = true;
        });
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
            templateUrl: 'stockmanagement/identification/tmplPriceEdit.tpl.html',
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
        for(i in $scope.itemEdit.materialReturnNoteItems) {
    		item = $scope.itemEdit.materialReturnNoteItems[i];
    		delete item.isSelected;
    	}
        for(i in $scope.itemEdit.procurementRequestItemSuppliers) {
    		item = $scope.itemEdit.procurementRequestItemSuppliers[i];
    		delete item.isSelected;
    	}
        for(i in $scope.itemEdit.invoices) {
    		item = $scope.itemEdit.invoices[i];
    		delete item.isSelected;
    	}
        for(i in $scope.itemEdit.deliveryNoteItems) {
    		item = $scope.itemEdit.deliveryNoteItems[i];
    		delete item.isSelected;
    	}
        for(i in $scope.itemEdit.renamingItemsOutput) {
    		item = $scope.itemEdit.renamingItemsOutput[i];
    		delete item.isSelected;
    	}
        for(i in $scope.itemEdit.renamingItemsInput) {
    		item = $scope.itemEdit.renamingItemsInput[i];
    		delete item.isSelected;
    	}
        for(i in $scope.itemEdit.orderHeadingsDelivery) {
    		item = $scope.itemEdit.orderHeadingsDelivery[i];
    		delete item.isSelected;
    	}
        for(i in $scope.itemEdit.rfpItems) {
    		item = $scope.itemEdit.rfpItems[i];
    		delete item.isSelected;
    	}
        for(i in $scope.itemEdit.goodsSDs) {
    		item = $scope.itemEdit.goodsSDs[i];
    		delete item.isSelected;
    	}
        for(i in $scope.itemEdit.orderSupplierItems) {
    		item = $scope.itemEdit.orderSupplierItems[i];
    		delete item.isSelected;
    	}
        for(i in $scope.itemEdit.offerSupplierItems) {
    		item = $scope.itemEdit.offerSupplierItems[i];
    		delete item.isSelected;
    	}
        for(i in $scope.itemEdit.goodsReceivedNoteHeadings) {
    		item = $scope.itemEdit.goodsReceivedNoteHeadings[i];
    		delete item.isSelected;
    	}
        for(i in $scope.itemEdit.transactionLogs) {
    		item = $scope.itemEdit.transactionLogs[i];
    		delete item.isSelected;
    	}
        for(i in $scope.itemEdit.offerSupplierHeadings) {
    		item = $scope.itemEdit.offerSupplierHeadings[i];
    		delete item.isSelected;
    	}
        for(i in $scope.itemEdit.invoiceSDs) {
    		item = $scope.itemEdit.invoiceSDs[i];
    		delete item.isSelected;
    	}
        for(i in $scope.itemEdit.customerRequestHeaders1) {
    		item = $scope.itemEdit.customerRequestHeaders1[i];
    		delete item.isSelected;
    	}
        for(i in $scope.itemEdit.requestForProduction) {
    		item = $scope.itemEdit.requestForProduction[i];
    		delete item.isSelected;
    	}
        for(i in $scope.itemEdit.productInstances) {
    		item = $scope.itemEdit.productInstances[i];
    		delete item.isSelected;
    	}
        for(i in $scope.itemEdit.beOrderItems) {
    		item = $scope.itemEdit.beOrderItems[i];
    		delete item.isSelected;
    	}
        for(i in $scope.itemEdit.workOrders) {
    		item = $scope.itemEdit.workOrders[i];
    		delete item.isSelected;
    	}
        for(i in $scope.itemEdit.orderItems) {
    		item = $scope.itemEdit.orderItems[i];
    		delete item.isSelected;
    	}
        for(i in $scope.itemEdit.procurementRequestItems) {
    		item = $scope.itemEdit.procurementRequestItems[i];
    		delete item.isSelected;
    	}
        for(i in $scope.itemEdit.proformaInvoices) {
    		item = $scope.itemEdit.proformaInvoices[i];
    		delete item.isSelected;
    	}
        for(i in $scope.itemEdit.goodsReceivedNoteItems) {
    		item = $scope.itemEdit.goodsReceivedNoteItems[i];
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
        for(i in $scope.itemEdit.customerRequestItems) {
    		item = $scope.itemEdit.customerRequestItems[i];
    		delete item.isSelected;
    	}
        for(i in $scope.itemEdit.orderHeadings) {
    		item = $scope.itemEdit.orderHeadings[i];
    		delete item.isSelected;
    	}
        for(i in $scope.itemEdit.exporterSDs) {
    		item = $scope.itemEdit.exporterSDs[i];
    		delete item.isSelected;
    	}
        for(i in $scope.itemEdit.procurementPlanItems) {
    		item = $scope.itemEdit.procurementPlanItems[i];
    		delete item.isSelected;
    	}
        for(i in $scope.itemEdit.shippingDocumentsDelivery) {
    		item = $scope.itemEdit.shippingDocumentsDelivery[i];
    		delete item.isSelected;
    	}
		$modalInstance.close($scope.itemEdit);
	};


	$scope.canSave = function() {
		var item = $scope.itemEdit;
		return                 item.IIdentificationCode  ;
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


.controller('ctrlIdentificationChoose', ['$scope','ServiceIdentification', 'dialogs', '$modal', '$modalInstance', 'itemEdit',
function($scope, ServiceIdentification, dialogs, $modal,  $modalInstance, itemEdit) {

    // entity with properties
    $scope.itemDefinition = {
        label: 'commonbusinessentities.identification',
        properties: [
            { label: 'iIdentificationCode', name:'IIdentificationCode', inTable:  true  },
            { label: 'iName', name:'IName', inTable:  false  },
            { label: 'iShortName', name:'IShortName', inTable:  false  },
            { label: 'iParallelCode', name:'IParallelCode', inTable:  false  },
            { label: 'iDrawingIdentificationNumber', name:'IDrawingIdentificationNumber', inTable:  false  },
            { label: 'iIsPayable', name:'IIsPayable', inTable:  false  },
        ]
    };

	$scope.items = [];
	$scope.itemEdit = {};

	// fill table with data
	$scope.loaded = false;
	var getIdentifications = function() {
		if(!$scope.loaded && $scope.items.length === 0) {
			$scope.isLoading = true;
			ServiceIdentification.query(function(data) {
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
	getIdentifications();

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