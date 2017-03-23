'use strict';

angular.module('Doob.corporation')


.controller('ctrlDocumentType',['$scope', '$rootScope', '$modal', 'dialogs', 'CheckSelected', 'ServiceDocumentType',
    function($scope, $rootScope, $modal, dialogs, CheckSelected, ServiceDocumentType) {

	// main entity (documentType) properties names and labels
	$scope.itemDefinition = {
		label: 'corporation.documentType',
		properties: [
			{ label: 'dTIdentificationNumber', name:'DTIdentificationNumber', inTable:  true  },
			{ label: 'dTName', name:'DTName', inTable:  true  },
			{ label: 'dTShortName', name:'DTShortName', inTable:  true  },
			{ label: 'dTCounter', name:'DTCounter', inTable:  false  },
		]
	};

	// tangibleItemAnalytics with properties names and labels
	$scope.tangibleItemAnalyticsDefinition = {
		label: 'stockmanagement.tangibleItemAnalytics',
		properties : [
			{ label: 'tIAMeasurementUnit', name:'TIAMeasurementUnit' },
			{ label: 'tIAStocksAccount', name:'TIAStocksAccount' },
			{ label: 'tIAPriceDesignation', name:'TIAPriceDesignation' },
			{ label: 'tIAUser', name:'TIAUser' },
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
	// requisitions with properties names and labels
	$scope.requisitionsDefinition = {
		label: 'stockmanagement.requisition',
		properties : [
			{ label: 'rDocumentNumber', name:'RDocumentNumber' },
			{ label: 'rReservationDate', name:'RReservationDate' },
			{ label: 'rQuantityLaunched', name:'RQuantityLaunched' },
			{ label: 'rStatusIndicator', name:'RStatusIndicator' },
			{ label: 'rPrintDate', name:'RPrintDate' },
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
	// rfpHeadings with properties names and labels
	$scope.rfpHeadingsDefinition = {
		label: 'stockmanagement.requestForProposalHeading',
		properties : [
			{ label: 'rFPHNumber', name:'RFPHNumber' },
			{ label: 'rFPHIssueDate', name:'RFPHIssueDate' },
			{ label: 'rFPHResponseDeadline', name:'RFPHResponseDeadline' },
			{ label: 'rFPHStatus', name:'RFPHStatus' },
		]
	};
	// transferOrders with properties names and labels
	$scope.transferOrdersDefinition = {
		label: 'stockmanagement.transferOrder',
		properties : [
			{ label: 'tODocumentNumber', name:'TODocumentNumber' },
			{ label: 'tOIssuanceDate', name:'TOIssuanceDate' },
			{ label: 'tODocumentStatus', name:'TODocumentStatus' },
			{ label: 'tOPrintStatus', name:'TOPrintStatus' },
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
	// procurementPlanHeadings with properties names and labels
	$scope.procurementPlanHeadingsDefinition = {
		label: 'initialization.procurementPlanHeading',
		properties : [
			{ label: 'pPHDocumentNumber', name:'PPHDocumentNumber' },
			{ label: 'pPHPlanningDate', name:'PPHPlanningDate' },
			{ label: 'pPHPlanVersion', name:'PPHPlanVersion' },
		]
	};
	// deliveryNotes with properties names and labels
	$scope.deliveryNotesDefinition = {
		label: 'stockmanagement.deliveryNote',
		properties : [
			{ label: 'dNDocumentNumber', name:'DNDocumentNumber' },
			{ label: 'dNDeliveryDate', name:'DNDeliveryDate' },
			{ label: 'dNDocumentStatus', name:'DNDocumentStatus' },
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
	// requestForProduction with properties names and labels
	$scope.requestForProductionDefinition = {
		label: 'productionrequest.requestForProduction',
		properties : [
			{ label: 'rFPDocumentNumber', name:'RFPDocumentNumber' },
			{ label: 'rFPCreationDate', name:'RFPCreationDate' },
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
	// beOrderHeadings with properties names and labels
	$scope.beOrderHeadingsDefinition = {
		label: 'internalorder.bEOrderHeading',
		properties : [
			{ label: 'bEOHDocumentNumber', name:'BEOHDocumentNumber' },
			{ label: 'bEOHCreationDate', name:'BEOHCreationDate' },
			{ label: 'bEOHOrderDate', name:'BEOHOrderDate' },
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
	// materialReturnNotes with properties names and labels
	$scope.materialReturnNotesDefinition = {
		label: 'stockmanagement.materialReturnNote',
		properties : [
			{ label: 'mRNDocumentNumber', name:'MRNDocumentNumber' },
			{ label: 'mRNIssuanceDate', name:'MRNIssuanceDate' },
			{ label: 'mRNDocumentStatus', name:'MRNDocumentStatus' },
			{ label: 'mRNPrintStatus', name:'MRNPrintStatus' },
			{ label: 'mRNTransactionLogPrint', name:'MRNTransactionLogPrint' },
		]
	};
	// procurementRequestHeadings with properties names and labels
	$scope.procurementRequestHeadingsDefinition = {
		label: 'initialization.procurementRequestHeading',
		properties : [
			{ label: 'pRHCode', name:'PRHCode' },
			{ label: 'pRHCreationDate', name:'PRHCreationDate' },
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
	// renamings with properties names and labels
	$scope.renamingsDefinition = {
		label: 'renaming.renaming',
		properties : [
			{ label: 'rDocumentNumber', name:'RDocumentNumber' },
			{ label: 'rDeliveryDate', name:'RDeliveryDate' },
			{ label: 'rDocumentStatus', name:'RDocumentStatus' },
			{ label: 'rPrintStatus', name:'RPrintStatus' },
			{ label: 'iIdentificationCode', name:'IIdentificationCode' },
			{ label: 'tISDesignation', name:'TISDesignation' },
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

	// fill table with data
	$scope.items = [];
	$scope.loaded = false;
	var getDocumentTypes = function() {
		if(!$scope.loaded && $scope.items.length === 0) {
			$scope.isLoading = true;
			ServiceDocumentType.query(function(data) {
				$scope.items = data;
				$scope.isLoading = false;
				$scope.loaded = true;
			});
		}
	};
	getDocumentTypes();

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

	$scope.$watch('DocumentTypeCollection', function() {
		$scope.itemEdit = CheckSelected.checkSelectedInTable($scope.itemEdit, $scope.DocumentTypeCollection, $scope.items);
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
			templateUrl: 'corporation/documenttype/tmplDocumentTypeEdit.tpl.html',
			size: 'lg',
			windowClass: 'hmodal-info',
			controller: 'ctrlDocumentTypeEdit',
			resolve: {
				itemEdit: function() {
					if(isNew) {
						return new ServiceDocumentType();
					} else {
						return $scope.itemEdit;
					}
				},
				tangibleItemAnalyticsDefinition: function() {
					return $scope.tangibleItemAnalyticsDefinition;
				},
				invoicesDefinition: function() {
					return $scope.invoicesDefinition;
				},
				requisitionsDefinition: function() {
					return $scope.requisitionsDefinition;
				},
				customerRequestHeadersDefinition: function() {
					return $scope.customerRequestHeadersDefinition;
				},
				transactionLogsDefinition: function() {
					return $scope.transactionLogsDefinition;
				},
				rfpHeadingsDefinition: function() {
					return $scope.rfpHeadingsDefinition;
				},
				transferOrdersDefinition: function() {
					return $scope.transferOrdersDefinition;
				},
				tangibleItemConditionsDefinition: function() {
					return $scope.tangibleItemConditionsDefinition;
				},
				offerSupplierHeadingsDefinition: function() {
					return $scope.offerSupplierHeadingsDefinition;
				},
				procurementPlanHeadingsDefinition: function() {
					return $scope.procurementPlanHeadingsDefinition;
				},
				deliveryNotesDefinition: function() {
					return $scope.deliveryNotesDefinition;
				},
				beInvoicesDefinition: function() {
					return $scope.beInvoicesDefinition;
				},
				goodsReceivedNoteHeadingsDefinition: function() {
					return $scope.goodsReceivedNoteHeadingsDefinition;
				},
				requestForProductionDefinition: function() {
					return $scope.requestForProductionDefinition;
				},
				proformaInvoicesDefinition: function() {
					return $scope.proformaInvoicesDefinition;
				},
				beOrderHeadingsDefinition: function() {
					return $scope.beOrderHeadingsDefinition;
				},
				orderSupplierHeadingsDefinition: function() {
					return $scope.orderSupplierHeadingsDefinition;
				},
				orderHeadingsDefinition: function() {
					return $scope.orderHeadingsDefinition;
				},
				materialReturnNotesDefinition: function() {
					return $scope.materialReturnNotesDefinition;
				},
				procurementRequestHeadingsDefinition: function() {
					return $scope.procurementRequestHeadingsDefinition;
				},
				shippingDocumentsDefinition: function() {
					return $scope.shippingDocumentsDefinition;
				},
				renamingsDefinition: function() {
					return $scope.renamingsDefinition;
				},
				workOrdersDefinition: function() {
					return $scope.workOrdersDefinition;
				},
			}
		})
		.result.then(function(result) {
			if(!angular.isDefined(result.id)) {
				ServiceDocumentType.saveCustom('stockmanagement/documenttypes', result, function(savedObject) {
					$scope.items.unshift(savedObject);
					if($scope.itemEdit !== null) {
						var index = $scope.items.map(function(it) { return it.id; }).indexOf($scope.itemEdit.id);
						$scope.items[index].isSelected = false;
					}
					$scope.itemEdit = angular.extend(savedObject);
					$scope.items[0].isSelected = true;
				});
			 } else {
				 ServiceDocumentType.updateCustom('stockmanagement/documenttypes/'+result.id, result, function(savedObject) {
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


.controller('ctrlDocumentTypeEdit',['$scope', 'Localization', '$modal', '$modalInstance', 'dialogs',
	'ServiceDocumentType', 'ServiceTangibleItemAnalytics', 'ServiceInvoice', 'ServiceRequisition', 'ServiceCustomerRequestHeading', 'ServiceTransactionLog', 'ServiceRequestForProposalHeading', 'ServiceTransferOrder', 'ServiceTangibleItemCondition', 'ServiceOfferSupplierHeading', 'ServiceProcurementPlanHeading', 'ServiceDeliveryNote', 'ServiceBEInvoice', 'ServiceGoodsReceivedNoteHeading', 'ServiceRequestForProduction', 'ServiceProFormaInvoice', 'ServiceBEOrderHeading', 'ServiceOrderSupplierHeading', 'ServiceOrderHeading', 'ServiceMaterialReturnNote', 'ServiceProcurementRequestHeading', 'ServiceShippingDocument', 'ServiceRenaming', 'ServiceWorkOrder',   'tangibleItemAnalyticsDefinition',  'invoicesDefinition',  'requisitionsDefinition',  'customerRequestHeadersDefinition',  'transactionLogsDefinition',  'rfpHeadingsDefinition',  'transferOrdersDefinition',  'tangibleItemConditionsDefinition',  'offerSupplierHeadingsDefinition',  'procurementPlanHeadingsDefinition',  'deliveryNotesDefinition',  'beInvoicesDefinition',  'goodsReceivedNoteHeadingsDefinition',  'requestForProductionDefinition',  'proformaInvoicesDefinition',  'beOrderHeadingsDefinition',  'orderSupplierHeadingsDefinition',  'orderHeadingsDefinition',  'materialReturnNotesDefinition',  'procurementRequestHeadingsDefinition',  'shippingDocumentsDefinition',  'renamingsDefinition',  'workOrdersDefinition',   'itemEdit',
function($scope, Localization, $modal, $modalInstance, dialogs,
	ServiceDocumentType, ServiceTangibleItemAnalytics, ServiceInvoice, ServiceRequisition, ServiceCustomerRequestHeading, ServiceTransactionLog, ServiceRequestForProposalHeading, ServiceTransferOrder, ServiceTangibleItemCondition, ServiceOfferSupplierHeading, ServiceProcurementPlanHeading, ServiceDeliveryNote, ServiceBEInvoice, ServiceGoodsReceivedNoteHeading, ServiceRequestForProduction, ServiceProFormaInvoice, ServiceBEOrderHeading, ServiceOrderSupplierHeading, ServiceOrderHeading, ServiceMaterialReturnNote, ServiceProcurementRequestHeading, ServiceShippingDocument, ServiceRenaming, ServiceWorkOrder,  tangibleItemAnalyticsDefinition,  invoicesDefinition,  requisitionsDefinition,  customerRequestHeadersDefinition,  transactionLogsDefinition,  rfpHeadingsDefinition,  transferOrdersDefinition,  tangibleItemConditionsDefinition,  offerSupplierHeadingsDefinition,  procurementPlanHeadingsDefinition,  deliveryNotesDefinition,  beInvoicesDefinition,  goodsReceivedNoteHeadingsDefinition,  requestForProductionDefinition,  proformaInvoicesDefinition,  beOrderHeadingsDefinition,  orderSupplierHeadingsDefinition,  orderHeadingsDefinition,  materialReturnNotesDefinition,  procurementRequestHeadingsDefinition,  shippingDocumentsDefinition,  renamingsDefinition,  workOrdersDefinition,  itemEdit) {

	// dialog mode
	$scope.mode = 'edit';

	// original item state
	var original = angular.copy(itemEdit);
	// item state
	$scope.itemEdit = angular.copy(original);

	// tangibleItemAnalytics with properties
	$scope.tangibleItemAnalyticsDefinition = tangibleItemAnalyticsDefinition;
	// invoices with properties
	$scope.invoicesDefinition = invoicesDefinition;
	// requisitions with properties
	$scope.requisitionsDefinition = requisitionsDefinition;
	// customerRequestHeaders with properties
	$scope.customerRequestHeadersDefinition = customerRequestHeadersDefinition;
	// transactionLogs with properties
	$scope.transactionLogsDefinition = transactionLogsDefinition;
	// rfpHeadings with properties
	$scope.rfpHeadingsDefinition = rfpHeadingsDefinition;
	// transferOrders with properties
	$scope.transferOrdersDefinition = transferOrdersDefinition;
	// tangibleItemConditions with properties
	$scope.tangibleItemConditionsDefinition = tangibleItemConditionsDefinition;
	// offerSupplierHeadings with properties
	$scope.offerSupplierHeadingsDefinition = offerSupplierHeadingsDefinition;
	// procurementPlanHeadings with properties
	$scope.procurementPlanHeadingsDefinition = procurementPlanHeadingsDefinition;
	// deliveryNotes with properties
	$scope.deliveryNotesDefinition = deliveryNotesDefinition;
	// beInvoices with properties
	$scope.beInvoicesDefinition = beInvoicesDefinition;
	// goodsReceivedNoteHeadings with properties
	$scope.goodsReceivedNoteHeadingsDefinition = goodsReceivedNoteHeadingsDefinition;
	// requestForProduction with properties
	$scope.requestForProductionDefinition = requestForProductionDefinition;
	// proformaInvoices with properties
	$scope.proformaInvoicesDefinition = proformaInvoicesDefinition;
	// beOrderHeadings with properties
	$scope.beOrderHeadingsDefinition = beOrderHeadingsDefinition;
	// orderSupplierHeadings with properties
	$scope.orderSupplierHeadingsDefinition = orderSupplierHeadingsDefinition;
	// orderHeadings with properties
	$scope.orderHeadingsDefinition = orderHeadingsDefinition;
	// materialReturnNotes with properties
	$scope.materialReturnNotesDefinition = materialReturnNotesDefinition;
	// procurementRequestHeadings with properties
	$scope.procurementRequestHeadingsDefinition = procurementRequestHeadingsDefinition;
	// shippingDocuments with properties
	$scope.shippingDocumentsDefinition = shippingDocumentsDefinition;
	// renamings with properties
	$scope.renamingsDefinition = renamingsDefinition;
	// workOrders with properties
	$scope.workOrdersDefinition = workOrdersDefinition;

	// datepicker logic

	// date properties

	$scope.open = function($event, opened) {
		$event.preventDefault();
		$event.stopPropagation();
		$scope[opened] = true;
	};



    $scope.requisitionEdit = null;

    // requisitions table selection logic
    $scope.requisitionSelection = function(item, index) {
        if(item.isSelected) {
            if($scope.requisitionEdit !== null) {
                var index1 = $scope.itemEdit.requisitions.map(function(it) { return it.id; }).indexOf($scope.requisitionEdit.id);
                $scope.itemEdit.requisitions[index1].isSelected = false;
            }
            $scope.requisitionEdit = item;
        } else {
            $scope.requisitionEdit = null;
            item.isSelected = false;
        }
    };

    // New/Edit requisitions dialog
    $scope.openRequisitionEditDialog = function(isNew) {
        $modal.open({
            backdrop: 'static',
            keyboard : false,
            templateUrl: 'stockmanagement/documenttype/tmplRequisitionEdit.tpl.html',
            size: 'lg',
            controller: 'ctrlRequisitionEdit',
            windowClass: 'hmodal-info',
            resolve: {
                itemEdit: function() {
                    if(isNew) {
                        return new ServiceRequisition();
                    } else {
                        return $scope.requisitionEdit;
                    }
                }
            }
        }).result.then(function(result) {
            var i;
            if(isNew) {
                if(!angular.isDefined($scope.itemEdit.requisitions)) {
                    $scope.itemEdit.requisitions = [];
                }
                $scope.itemEdit.requisitions.unshift(result);
                for(i in $scope.itemEdit.requisitions) {
                    $scope.itemEdit.requisitions[i].isSelected = false;
                }
                $scope.requisitionEdit = angular.extend(result);
                $scope.itemEdit.requisitions[0].isSelected = true;
            }
            else {
                for(i in $scope.itemEdit.requisitions) {
                    $scope.itemEdit.requisitions[i].isSelected = false;
                }
                $scope.requisitionEdit = angular.extend(result);
                var index = $scope.itemEdit.requisitions.map(function(it) { return it.id; }).indexOf(result.id);
                for(var key in result) {
                    $scope.itemEdit.requisitions[index][key] = result[key];
                }
                $scope.itemEdit.requisitions[index].isSelected = true;
            }
        });
    };

    $scope.removeRequisition = function(item) {
        var dialog = dialogs.confirm('Please confirm', 'Are you sure you want to delete item?');
        dialog.result.then(function(btn) {
            var removeIndex = $scope.itemEdit.requisitions.map(function(it) { return it.id; }).indexOf(item.id);
            $scope.itemEdit.requisitions[removeIndex].deleted = true;
        });
    };


    $scope.customerRequestHeadingEdit = null;

    // customerRequestHeaders table selection logic
    $scope.customerRequestHeadingSelection = function(item, index) {
        if(item.isSelected) {
            if($scope.customerRequestHeadingEdit !== null) {
                var index1 = $scope.itemEdit.customerRequestHeaders.map(function(it) { return it.id; }).indexOf($scope.customerRequestHeadingEdit.id);
                $scope.itemEdit.customerRequestHeaders[index1].isSelected = false;
            }
            $scope.customerRequestHeadingEdit = item;
        } else {
            $scope.customerRequestHeadingEdit = null;
            item.isSelected = false;
        }
    };

    // New/Edit customerRequestHeaders dialog
    $scope.openCustomerRequestHeadingEditDialog = function(isNew) {
        $modal.open({
            backdrop: 'static',
            keyboard : false,
            templateUrl: 'customerrequest/documenttype/tmplCustomerRequestHeadingEdit.tpl.html',
            size: 'lg',
            controller: 'ctrlCustomerRequestHeadingEdit',
            windowClass: 'hmodal-info',
            resolve: {
                itemEdit: function() {
                    if(isNew) {
                        return new ServiceCustomerRequestHeading();
                    } else {
                        return $scope.customerRequestHeadingEdit;
                    }
                }
            }
        }).result.then(function(result) {
            var i;
            if(isNew) {
                if(!angular.isDefined($scope.itemEdit.customerRequestHeaders)) {
                    $scope.itemEdit.customerRequestHeaders = [];
                }
                $scope.itemEdit.customerRequestHeaders.unshift(result);
                for(i in $scope.itemEdit.customerRequestHeaders) {
                    $scope.itemEdit.customerRequestHeaders[i].isSelected = false;
                }
                $scope.customerRequestHeadingEdit = angular.extend(result);
                $scope.itemEdit.customerRequestHeaders[0].isSelected = true;
            }
            else {
                for(i in $scope.itemEdit.customerRequestHeaders) {
                    $scope.itemEdit.customerRequestHeaders[i].isSelected = false;
                }
                $scope.customerRequestHeadingEdit = angular.extend(result);
                var index = $scope.itemEdit.customerRequestHeaders.map(function(it) { return it.id; }).indexOf(result.id);
                for(var key in result) {
                    $scope.itemEdit.customerRequestHeaders[index][key] = result[key];
                }
                $scope.itemEdit.customerRequestHeaders[index].isSelected = true;
            }
        });
    };

    $scope.removeCustomerRequestHeading = function(item) {
        var dialog = dialogs.confirm('Please confirm', 'Are you sure you want to delete item?');
        dialog.result.then(function(btn) {
            var removeIndex = $scope.itemEdit.customerRequestHeaders.map(function(it) { return it.id; }).indexOf(item.id);
            $scope.itemEdit.customerRequestHeaders[removeIndex].deleted = true;
        });
    };


    $scope.requestForProposalHeadingEdit = null;

    // rfpHeadings table selection logic
    $scope.requestForProposalHeadingSelection = function(item, index) {
        if(item.isSelected) {
            if($scope.requestForProposalHeadingEdit !== null) {
                var index1 = $scope.itemEdit.rfpHeadings.map(function(it) { return it.id; }).indexOf($scope.requestForProposalHeadingEdit.id);
                $scope.itemEdit.rfpHeadings[index1].isSelected = false;
            }
            $scope.requestForProposalHeadingEdit = item;
        } else {
            $scope.requestForProposalHeadingEdit = null;
            item.isSelected = false;
        }
    };

    // New/Edit rfpHeadings dialog
    $scope.openRequestForProposalHeadingEditDialog = function(isNew) {
        $modal.open({
            backdrop: 'static',
            keyboard : false,
            templateUrl: 'stockmanagement/documenttype/tmplRequestForProposalHeadingEdit.tpl.html',
            size: 'lg',
            controller: 'ctrlRequestForProposalHeadingEdit',
            windowClass: 'hmodal-info',
            resolve: {
                itemEdit: function() {
                    if(isNew) {
                        return new ServiceRequestForProposalHeading();
                    } else {
                        return $scope.requestForProposalHeadingEdit;
                    }
                }
            }
        }).result.then(function(result) {
            var i;
            if(isNew) {
                if(!angular.isDefined($scope.itemEdit.rfpHeadings)) {
                    $scope.itemEdit.rfpHeadings = [];
                }
                $scope.itemEdit.rfpHeadings.unshift(result);
                for(i in $scope.itemEdit.rfpHeadings) {
                    $scope.itemEdit.rfpHeadings[i].isSelected = false;
                }
                $scope.requestForProposalHeadingEdit = angular.extend(result);
                $scope.itemEdit.rfpHeadings[0].isSelected = true;
            }
            else {
                for(i in $scope.itemEdit.rfpHeadings) {
                    $scope.itemEdit.rfpHeadings[i].isSelected = false;
                }
                $scope.requestForProposalHeadingEdit = angular.extend(result);
                var index = $scope.itemEdit.rfpHeadings.map(function(it) { return it.id; }).indexOf(result.id);
                for(var key in result) {
                    $scope.itemEdit.rfpHeadings[index][key] = result[key];
                }
                $scope.itemEdit.rfpHeadings[index].isSelected = true;
            }
        });
    };

    $scope.removeRequestForProposalHeading = function(item) {
        var dialog = dialogs.confirm('Please confirm', 'Are you sure you want to delete item?');
        dialog.result.then(function(btn) {
            var removeIndex = $scope.itemEdit.rfpHeadings.map(function(it) { return it.id; }).indexOf(item.id);
            $scope.itemEdit.rfpHeadings[removeIndex].deleted = true;
        });
    };


    $scope.transferOrderEdit = null;

    // transferOrders table selection logic
    $scope.transferOrderSelection = function(item, index) {
        if(item.isSelected) {
            if($scope.transferOrderEdit !== null) {
                var index1 = $scope.itemEdit.transferOrders.map(function(it) { return it.id; }).indexOf($scope.transferOrderEdit.id);
                $scope.itemEdit.transferOrders[index1].isSelected = false;
            }
            $scope.transferOrderEdit = item;
        } else {
            $scope.transferOrderEdit = null;
            item.isSelected = false;
        }
    };

    // New/Edit transferOrders dialog
    $scope.openTransferOrderEditDialog = function(isNew) {
        $modal.open({
            backdrop: 'static',
            keyboard : false,
            templateUrl: 'stockmanagement/documenttype/tmplTransferOrderEdit.tpl.html',
            size: 'lg',
            controller: 'ctrlTransferOrderEdit',
            windowClass: 'hmodal-info',
            resolve: {
                itemEdit: function() {
                    if(isNew) {
                        return new ServiceTransferOrder();
                    } else {
                        return $scope.transferOrderEdit;
                    }
                }
            }
        }).result.then(function(result) {
            var i;
            if(isNew) {
                if(!angular.isDefined($scope.itemEdit.transferOrders)) {
                    $scope.itemEdit.transferOrders = [];
                }
                $scope.itemEdit.transferOrders.unshift(result);
                for(i in $scope.itemEdit.transferOrders) {
                    $scope.itemEdit.transferOrders[i].isSelected = false;
                }
                $scope.transferOrderEdit = angular.extend(result);
                $scope.itemEdit.transferOrders[0].isSelected = true;
            }
            else {
                for(i in $scope.itemEdit.transferOrders) {
                    $scope.itemEdit.transferOrders[i].isSelected = false;
                }
                $scope.transferOrderEdit = angular.extend(result);
                var index = $scope.itemEdit.transferOrders.map(function(it) { return it.id; }).indexOf(result.id);
                for(var key in result) {
                    $scope.itemEdit.transferOrders[index][key] = result[key];
                }
                $scope.itemEdit.transferOrders[index].isSelected = true;
            }
        });
    };

    $scope.removeTransferOrder = function(item) {
        var dialog = dialogs.confirm('Please confirm', 'Are you sure you want to delete item?');
        dialog.result.then(function(btn) {
            var removeIndex = $scope.itemEdit.transferOrders.map(function(it) { return it.id; }).indexOf(item.id);
            $scope.itemEdit.transferOrders[removeIndex].deleted = true;
        });
    };


    $scope.offerSupplierHeadingEdit = null;

    // offerSupplierHeadings table selection logic
    $scope.offerSupplierHeadingSelection = function(item, index) {
        if(item.isSelected) {
            if($scope.offerSupplierHeadingEdit !== null) {
                var index1 = $scope.itemEdit.offerSupplierHeadings.map(function(it) { return it.id; }).indexOf($scope.offerSupplierHeadingEdit.id);
                $scope.itemEdit.offerSupplierHeadings[index1].isSelected = false;
            }
            $scope.offerSupplierHeadingEdit = item;
        } else {
            $scope.offerSupplierHeadingEdit = null;
            item.isSelected = false;
        }
    };

    // New/Edit offerSupplierHeadings dialog
    $scope.openOfferSupplierHeadingEditDialog = function(isNew) {
        $modal.open({
            backdrop: 'static',
            keyboard : false,
            templateUrl: 'logical/documenttype/tmplOfferSupplierHeadingEdit.tpl.html',
            size: 'lg',
            controller: 'ctrlOfferSupplierHeadingEdit',
            windowClass: 'hmodal-info',
            resolve: {
                itemEdit: function() {
                    if(isNew) {
                        return new ServiceOfferSupplierHeading();
                    } else {
                        return $scope.offerSupplierHeadingEdit;
                    }
                }
            }
        }).result.then(function(result) {
            var i;
            if(isNew) {
                if(!angular.isDefined($scope.itemEdit.offerSupplierHeadings)) {
                    $scope.itemEdit.offerSupplierHeadings = [];
                }
                $scope.itemEdit.offerSupplierHeadings.unshift(result);
                for(i in $scope.itemEdit.offerSupplierHeadings) {
                    $scope.itemEdit.offerSupplierHeadings[i].isSelected = false;
                }
                $scope.offerSupplierHeadingEdit = angular.extend(result);
                $scope.itemEdit.offerSupplierHeadings[0].isSelected = true;
            }
            else {
                for(i in $scope.itemEdit.offerSupplierHeadings) {
                    $scope.itemEdit.offerSupplierHeadings[i].isSelected = false;
                }
                $scope.offerSupplierHeadingEdit = angular.extend(result);
                var index = $scope.itemEdit.offerSupplierHeadings.map(function(it) { return it.id; }).indexOf(result.id);
                for(var key in result) {
                    $scope.itemEdit.offerSupplierHeadings[index][key] = result[key];
                }
                $scope.itemEdit.offerSupplierHeadings[index].isSelected = true;
            }
        });
    };

    $scope.removeOfferSupplierHeading = function(item) {
        var dialog = dialogs.confirm('Please confirm', 'Are you sure you want to delete item?');
        dialog.result.then(function(btn) {
            var removeIndex = $scope.itemEdit.offerSupplierHeadings.map(function(it) { return it.id; }).indexOf(item.id);
            $scope.itemEdit.offerSupplierHeadings[removeIndex].deleted = true;
        });
    };


    $scope.procurementPlanHeadingEdit = null;

    // procurementPlanHeadings table selection logic
    $scope.procurementPlanHeadingSelection = function(item, index) {
        if(item.isSelected) {
            if($scope.procurementPlanHeadingEdit !== null) {
                var index1 = $scope.itemEdit.procurementPlanHeadings.map(function(it) { return it.id; }).indexOf($scope.procurementPlanHeadingEdit.id);
                $scope.itemEdit.procurementPlanHeadings[index1].isSelected = false;
            }
            $scope.procurementPlanHeadingEdit = item;
        } else {
            $scope.procurementPlanHeadingEdit = null;
            item.isSelected = false;
        }
    };

    // New/Edit procurementPlanHeadings dialog
    $scope.openProcurementPlanHeadingEditDialog = function(isNew) {
        $modal.open({
            backdrop: 'static',
            keyboard : false,
            templateUrl: 'initialization/documenttype/tmplProcurementPlanHeadingEdit.tpl.html',
            size: 'lg',
            controller: 'ctrlProcurementPlanHeadingEdit',
            windowClass: 'hmodal-info',
            resolve: {
                itemEdit: function() {
                    if(isNew) {
                        return new ServiceProcurementPlanHeading();
                    } else {
                        return $scope.procurementPlanHeadingEdit;
                    }
                }
            }
        }).result.then(function(result) {
            var i;
            if(isNew) {
                if(!angular.isDefined($scope.itemEdit.procurementPlanHeadings)) {
                    $scope.itemEdit.procurementPlanHeadings = [];
                }
                $scope.itemEdit.procurementPlanHeadings.unshift(result);
                for(i in $scope.itemEdit.procurementPlanHeadings) {
                    $scope.itemEdit.procurementPlanHeadings[i].isSelected = false;
                }
                $scope.procurementPlanHeadingEdit = angular.extend(result);
                $scope.itemEdit.procurementPlanHeadings[0].isSelected = true;
            }
            else {
                for(i in $scope.itemEdit.procurementPlanHeadings) {
                    $scope.itemEdit.procurementPlanHeadings[i].isSelected = false;
                }
                $scope.procurementPlanHeadingEdit = angular.extend(result);
                var index = $scope.itemEdit.procurementPlanHeadings.map(function(it) { return it.id; }).indexOf(result.id);
                for(var key in result) {
                    $scope.itemEdit.procurementPlanHeadings[index][key] = result[key];
                }
                $scope.itemEdit.procurementPlanHeadings[index].isSelected = true;
            }
        });
    };

    $scope.removeProcurementPlanHeading = function(item) {
        var dialog = dialogs.confirm('Please confirm', 'Are you sure you want to delete item?');
        dialog.result.then(function(btn) {
            var removeIndex = $scope.itemEdit.procurementPlanHeadings.map(function(it) { return it.id; }).indexOf(item.id);
            $scope.itemEdit.procurementPlanHeadings[removeIndex].deleted = true;
        });
    };


    $scope.deliveryNoteEdit = null;

    // deliveryNotes table selection logic
    $scope.deliveryNoteSelection = function(item, index) {
        if(item.isSelected) {
            if($scope.deliveryNoteEdit !== null) {
                var index1 = $scope.itemEdit.deliveryNotes.map(function(it) { return it.id; }).indexOf($scope.deliveryNoteEdit.id);
                $scope.itemEdit.deliveryNotes[index1].isSelected = false;
            }
            $scope.deliveryNoteEdit = item;
        } else {
            $scope.deliveryNoteEdit = null;
            item.isSelected = false;
        }
    };

    // New/Edit deliveryNotes dialog
    $scope.openDeliveryNoteEditDialog = function(isNew) {
        $modal.open({
            backdrop: 'static',
            keyboard : false,
            templateUrl: 'stockmanagement/documenttype/tmplDeliveryNoteEdit.tpl.html',
            size: 'lg',
            controller: 'ctrlDeliveryNoteEdit',
            windowClass: 'hmodal-info',
            resolve: {
                itemEdit: function() {
                    if(isNew) {
                        return new ServiceDeliveryNote();
                    } else {
                        return $scope.deliveryNoteEdit;
                    }
                }
            }
        }).result.then(function(result) {
            var i;
            if(isNew) {
                if(!angular.isDefined($scope.itemEdit.deliveryNotes)) {
                    $scope.itemEdit.deliveryNotes = [];
                }
                $scope.itemEdit.deliveryNotes.unshift(result);
                for(i in $scope.itemEdit.deliveryNotes) {
                    $scope.itemEdit.deliveryNotes[i].isSelected = false;
                }
                $scope.deliveryNoteEdit = angular.extend(result);
                $scope.itemEdit.deliveryNotes[0].isSelected = true;
            }
            else {
                for(i in $scope.itemEdit.deliveryNotes) {
                    $scope.itemEdit.deliveryNotes[i].isSelected = false;
                }
                $scope.deliveryNoteEdit = angular.extend(result);
                var index = $scope.itemEdit.deliveryNotes.map(function(it) { return it.id; }).indexOf(result.id);
                for(var key in result) {
                    $scope.itemEdit.deliveryNotes[index][key] = result[key];
                }
                $scope.itemEdit.deliveryNotes[index].isSelected = true;
            }
        });
    };

    $scope.removeDeliveryNote = function(item) {
        var dialog = dialogs.confirm('Please confirm', 'Are you sure you want to delete item?');
        dialog.result.then(function(btn) {
            var removeIndex = $scope.itemEdit.deliveryNotes.map(function(it) { return it.id; }).indexOf(item.id);
            $scope.itemEdit.deliveryNotes[removeIndex].deleted = true;
        });
    };


    $scope.goodsReceivedNoteHeadingEdit = null;

    // goodsReceivedNoteHeadings table selection logic
    $scope.goodsReceivedNoteHeadingSelection = function(item, index) {
        if(item.isSelected) {
            if($scope.goodsReceivedNoteHeadingEdit !== null) {
                var index1 = $scope.itemEdit.goodsReceivedNoteHeadings.map(function(it) { return it.id; }).indexOf($scope.goodsReceivedNoteHeadingEdit.id);
                $scope.itemEdit.goodsReceivedNoteHeadings[index1].isSelected = false;
            }
            $scope.goodsReceivedNoteHeadingEdit = item;
        } else {
            $scope.goodsReceivedNoteHeadingEdit = null;
            item.isSelected = false;
        }
    };

    // New/Edit goodsReceivedNoteHeadings dialog
    $scope.openGoodsReceivedNoteHeadingEditDialog = function(isNew) {
        $modal.open({
            backdrop: 'static',
            keyboard : false,
            templateUrl: 'stockmanagement/documenttype/tmplGoodsReceivedNoteHeadingEdit.tpl.html',
            size: 'lg',
            controller: 'ctrlGoodsReceivedNoteHeadingEdit',
            windowClass: 'hmodal-info',
            resolve: {
                itemEdit: function() {
                    if(isNew) {
                        return new ServiceGoodsReceivedNoteHeading();
                    } else {
                        return $scope.goodsReceivedNoteHeadingEdit;
                    }
                }
            }
        }).result.then(function(result) {
            var i;
            if(isNew) {
                if(!angular.isDefined($scope.itemEdit.goodsReceivedNoteHeadings)) {
                    $scope.itemEdit.goodsReceivedNoteHeadings = [];
                }
                $scope.itemEdit.goodsReceivedNoteHeadings.unshift(result);
                for(i in $scope.itemEdit.goodsReceivedNoteHeadings) {
                    $scope.itemEdit.goodsReceivedNoteHeadings[i].isSelected = false;
                }
                $scope.goodsReceivedNoteHeadingEdit = angular.extend(result);
                $scope.itemEdit.goodsReceivedNoteHeadings[0].isSelected = true;
            }
            else {
                for(i in $scope.itemEdit.goodsReceivedNoteHeadings) {
                    $scope.itemEdit.goodsReceivedNoteHeadings[i].isSelected = false;
                }
                $scope.goodsReceivedNoteHeadingEdit = angular.extend(result);
                var index = $scope.itemEdit.goodsReceivedNoteHeadings.map(function(it) { return it.id; }).indexOf(result.id);
                for(var key in result) {
                    $scope.itemEdit.goodsReceivedNoteHeadings[index][key] = result[key];
                }
                $scope.itemEdit.goodsReceivedNoteHeadings[index].isSelected = true;
            }
        });
    };

    $scope.removeGoodsReceivedNoteHeading = function(item) {
        var dialog = dialogs.confirm('Please confirm', 'Are you sure you want to delete item?');
        dialog.result.then(function(btn) {
            var removeIndex = $scope.itemEdit.goodsReceivedNoteHeadings.map(function(it) { return it.id; }).indexOf(item.id);
            $scope.itemEdit.goodsReceivedNoteHeadings[removeIndex].deleted = true;
        });
    };


    $scope.requestForProductionEdit = null;

    // requestForProduction table selection logic
    $scope.requestForProductionSelection = function(item, index) {
        if(item.isSelected) {
            if($scope.requestForProductionEdit !== null) {
                var index1 = $scope.itemEdit.requestForProduction.map(function(it) { return it.id; }).indexOf($scope.requestForProductionEdit.id);
                $scope.itemEdit.requestForProduction[index1].isSelected = false;
            }
            $scope.requestForProductionEdit = item;
        } else {
            $scope.requestForProductionEdit = null;
            item.isSelected = false;
        }
    };

    // New/Edit requestForProduction dialog
    $scope.openRequestForProductionEditDialog = function(isNew) {
        $modal.open({
            backdrop: 'static',
            keyboard : false,
            templateUrl: 'productionrequest/documenttype/tmplRequestForProductionEdit.tpl.html',
            size: 'lg',
            controller: 'ctrlRequestForProductionEdit',
            windowClass: 'hmodal-info',
            resolve: {
                itemEdit: function() {
                    if(isNew) {
                        return new ServiceRequestForProduction();
                    } else {
                        return $scope.requestForProductionEdit;
                    }
                }
            }
        }).result.then(function(result) {
            var i;
            if(isNew) {
                if(!angular.isDefined($scope.itemEdit.requestForProduction)) {
                    $scope.itemEdit.requestForProduction = [];
                }
                $scope.itemEdit.requestForProduction.unshift(result);
                for(i in $scope.itemEdit.requestForProduction) {
                    $scope.itemEdit.requestForProduction[i].isSelected = false;
                }
                $scope.requestForProductionEdit = angular.extend(result);
                $scope.itemEdit.requestForProduction[0].isSelected = true;
            }
            else {
                for(i in $scope.itemEdit.requestForProduction) {
                    $scope.itemEdit.requestForProduction[i].isSelected = false;
                }
                $scope.requestForProductionEdit = angular.extend(result);
                var index = $scope.itemEdit.requestForProduction.map(function(it) { return it.id; }).indexOf(result.id);
                for(var key in result) {
                    $scope.itemEdit.requestForProduction[index][key] = result[key];
                }
                $scope.itemEdit.requestForProduction[index].isSelected = true;
            }
        });
    };

    $scope.removeRequestForProduction = function(item) {
        var dialog = dialogs.confirm('Please confirm', 'Are you sure you want to delete item?');
        dialog.result.then(function(btn) {
            var removeIndex = $scope.itemEdit.requestForProduction.map(function(it) { return it.id; }).indexOf(item.id);
            $scope.itemEdit.requestForProduction[removeIndex].deleted = true;
        });
    };


    $scope.orderSupplierHeadingEdit = null;

    // orderSupplierHeadings table selection logic
    $scope.orderSupplierHeadingSelection = function(item, index) {
        if(item.isSelected) {
            if($scope.orderSupplierHeadingEdit !== null) {
                var index1 = $scope.itemEdit.orderSupplierHeadings.map(function(it) { return it.id; }).indexOf($scope.orderSupplierHeadingEdit.id);
                $scope.itemEdit.orderSupplierHeadings[index1].isSelected = false;
            }
            $scope.orderSupplierHeadingEdit = item;
        } else {
            $scope.orderSupplierHeadingEdit = null;
            item.isSelected = false;
        }
    };

    // New/Edit orderSupplierHeadings dialog
    $scope.openOrderSupplierHeadingEditDialog = function(isNew) {
        $modal.open({
            backdrop: 'static',
            keyboard : false,
            templateUrl: 'logical/documenttype/tmplOrderSupplierHeadingEdit.tpl.html',
            size: 'lg',
            controller: 'ctrlOrderSupplierHeadingEdit',
            windowClass: 'hmodal-info',
            resolve: {
                itemEdit: function() {
                    if(isNew) {
                        return new ServiceOrderSupplierHeading();
                    } else {
                        return $scope.orderSupplierHeadingEdit;
                    }
                }
            }
        }).result.then(function(result) {
            var i;
            if(isNew) {
                if(!angular.isDefined($scope.itemEdit.orderSupplierHeadings)) {
                    $scope.itemEdit.orderSupplierHeadings = [];
                }
                $scope.itemEdit.orderSupplierHeadings.unshift(result);
                for(i in $scope.itemEdit.orderSupplierHeadings) {
                    $scope.itemEdit.orderSupplierHeadings[i].isSelected = false;
                }
                $scope.orderSupplierHeadingEdit = angular.extend(result);
                $scope.itemEdit.orderSupplierHeadings[0].isSelected = true;
            }
            else {
                for(i in $scope.itemEdit.orderSupplierHeadings) {
                    $scope.itemEdit.orderSupplierHeadings[i].isSelected = false;
                }
                $scope.orderSupplierHeadingEdit = angular.extend(result);
                var index = $scope.itemEdit.orderSupplierHeadings.map(function(it) { return it.id; }).indexOf(result.id);
                for(var key in result) {
                    $scope.itemEdit.orderSupplierHeadings[index][key] = result[key];
                }
                $scope.itemEdit.orderSupplierHeadings[index].isSelected = true;
            }
        });
    };

    $scope.removeOrderSupplierHeading = function(item) {
        var dialog = dialogs.confirm('Please confirm', 'Are you sure you want to delete item?');
        dialog.result.then(function(btn) {
            var removeIndex = $scope.itemEdit.orderSupplierHeadings.map(function(it) { return it.id; }).indexOf(item.id);
            $scope.itemEdit.orderSupplierHeadings[removeIndex].deleted = true;
        });
    };


    $scope.materialReturnNoteEdit = null;

    // materialReturnNotes table selection logic
    $scope.materialReturnNoteSelection = function(item, index) {
        if(item.isSelected) {
            if($scope.materialReturnNoteEdit !== null) {
                var index1 = $scope.itemEdit.materialReturnNotes.map(function(it) { return it.id; }).indexOf($scope.materialReturnNoteEdit.id);
                $scope.itemEdit.materialReturnNotes[index1].isSelected = false;
            }
            $scope.materialReturnNoteEdit = item;
        } else {
            $scope.materialReturnNoteEdit = null;
            item.isSelected = false;
        }
    };

    // New/Edit materialReturnNotes dialog
    $scope.openMaterialReturnNoteEditDialog = function(isNew) {
        $modal.open({
            backdrop: 'static',
            keyboard : false,
            templateUrl: 'stockmanagement/documenttype/tmplMaterialReturnNoteEdit.tpl.html',
            size: 'lg',
            controller: 'ctrlMaterialReturnNoteEdit',
            windowClass: 'hmodal-info',
            resolve: {
                itemEdit: function() {
                    if(isNew) {
                        return new ServiceMaterialReturnNote();
                    } else {
                        return $scope.materialReturnNoteEdit;
                    }
                }
            }
        }).result.then(function(result) {
            var i;
            if(isNew) {
                if(!angular.isDefined($scope.itemEdit.materialReturnNotes)) {
                    $scope.itemEdit.materialReturnNotes = [];
                }
                $scope.itemEdit.materialReturnNotes.unshift(result);
                for(i in $scope.itemEdit.materialReturnNotes) {
                    $scope.itemEdit.materialReturnNotes[i].isSelected = false;
                }
                $scope.materialReturnNoteEdit = angular.extend(result);
                $scope.itemEdit.materialReturnNotes[0].isSelected = true;
            }
            else {
                for(i in $scope.itemEdit.materialReturnNotes) {
                    $scope.itemEdit.materialReturnNotes[i].isSelected = false;
                }
                $scope.materialReturnNoteEdit = angular.extend(result);
                var index = $scope.itemEdit.materialReturnNotes.map(function(it) { return it.id; }).indexOf(result.id);
                for(var key in result) {
                    $scope.itemEdit.materialReturnNotes[index][key] = result[key];
                }
                $scope.itemEdit.materialReturnNotes[index].isSelected = true;
            }
        });
    };

    $scope.removeMaterialReturnNote = function(item) {
        var dialog = dialogs.confirm('Please confirm', 'Are you sure you want to delete item?');
        dialog.result.then(function(btn) {
            var removeIndex = $scope.itemEdit.materialReturnNotes.map(function(it) { return it.id; }).indexOf(item.id);
            $scope.itemEdit.materialReturnNotes[removeIndex].deleted = true;
        });
    };


    $scope.shippingDocumentEdit = null;

    // shippingDocuments table selection logic
    $scope.shippingDocumentSelection = function(item, index) {
        if(item.isSelected) {
            if($scope.shippingDocumentEdit !== null) {
                var index1 = $scope.itemEdit.shippingDocuments.map(function(it) { return it.id; }).indexOf($scope.shippingDocumentEdit.id);
                $scope.itemEdit.shippingDocuments[index1].isSelected = false;
            }
            $scope.shippingDocumentEdit = item;
        } else {
            $scope.shippingDocumentEdit = null;
            item.isSelected = false;
        }
    };

    // New/Edit shippingDocuments dialog
    $scope.openShippingDocumentEditDialog = function(isNew) {
        $modal.open({
            backdrop: 'static',
            keyboard : false,
            templateUrl: 'procurement/documenttype/tmplShippingDocumentEdit.tpl.html',
            size: 'lg',
            controller: 'ctrlShippingDocumentEdit',
            windowClass: 'hmodal-info',
            resolve: {
                itemEdit: function() {
                    if(isNew) {
                        return new ServiceShippingDocument();
                    } else {
                        return $scope.shippingDocumentEdit;
                    }
                }
            }
        }).result.then(function(result) {
            var i;
            if(isNew) {
                if(!angular.isDefined($scope.itemEdit.shippingDocuments)) {
                    $scope.itemEdit.shippingDocuments = [];
                }
                $scope.itemEdit.shippingDocuments.unshift(result);
                for(i in $scope.itemEdit.shippingDocuments) {
                    $scope.itemEdit.shippingDocuments[i].isSelected = false;
                }
                $scope.shippingDocumentEdit = angular.extend(result);
                $scope.itemEdit.shippingDocuments[0].isSelected = true;
            }
            else {
                for(i in $scope.itemEdit.shippingDocuments) {
                    $scope.itemEdit.shippingDocuments[i].isSelected = false;
                }
                $scope.shippingDocumentEdit = angular.extend(result);
                var index = $scope.itemEdit.shippingDocuments.map(function(it) { return it.id; }).indexOf(result.id);
                for(var key in result) {
                    $scope.itemEdit.shippingDocuments[index][key] = result[key];
                }
                $scope.itemEdit.shippingDocuments[index].isSelected = true;
            }
        });
    };

    $scope.removeShippingDocument = function(item) {
        var dialog = dialogs.confirm('Please confirm', 'Are you sure you want to delete item?');
        dialog.result.then(function(btn) {
            var removeIndex = $scope.itemEdit.shippingDocuments.map(function(it) { return it.id; }).indexOf(item.id);
            $scope.itemEdit.shippingDocuments[removeIndex].deleted = true;
        });
    };


    $scope.renamingEdit = null;

    // renamings table selection logic
    $scope.renamingSelection = function(item, index) {
        if(item.isSelected) {
            if($scope.renamingEdit !== null) {
                var index1 = $scope.itemEdit.renamings.map(function(it) { return it.id; }).indexOf($scope.renamingEdit.id);
                $scope.itemEdit.renamings[index1].isSelected = false;
            }
            $scope.renamingEdit = item;
        } else {
            $scope.renamingEdit = null;
            item.isSelected = false;
        }
    };

    // New/Edit renamings dialog
    $scope.openRenamingEditDialog = function(isNew) {
        $modal.open({
            backdrop: 'static',
            keyboard : false,
            templateUrl: 'renaming/documenttype/tmplRenamingEdit.tpl.html',
            size: 'lg',
            controller: 'ctrlRenamingEdit',
            windowClass: 'hmodal-info',
            resolve: {
                itemEdit: function() {
                    if(isNew) {
                        return new ServiceRenaming();
                    } else {
                        return $scope.renamingEdit;
                    }
                }
            }
        }).result.then(function(result) {
            var i;
            if(isNew) {
                if(!angular.isDefined($scope.itemEdit.renamings)) {
                    $scope.itemEdit.renamings = [];
                }
                $scope.itemEdit.renamings.unshift(result);
                for(i in $scope.itemEdit.renamings) {
                    $scope.itemEdit.renamings[i].isSelected = false;
                }
                $scope.renamingEdit = angular.extend(result);
                $scope.itemEdit.renamings[0].isSelected = true;
            }
            else {
                for(i in $scope.itemEdit.renamings) {
                    $scope.itemEdit.renamings[i].isSelected = false;
                }
                $scope.renamingEdit = angular.extend(result);
                var index = $scope.itemEdit.renamings.map(function(it) { return it.id; }).indexOf(result.id);
                for(var key in result) {
                    $scope.itemEdit.renamings[index][key] = result[key];
                }
                $scope.itemEdit.renamings[index].isSelected = true;
            }
        });
    };

    $scope.removeRenaming = function(item) {
        var dialog = dialogs.confirm('Please confirm', 'Are you sure you want to delete item?');
        dialog.result.then(function(btn) {
            var removeIndex = $scope.itemEdit.renamings.map(function(it) { return it.id; }).indexOf(item.id);
            $scope.itemEdit.renamings[removeIndex].deleted = true;
        });
    };


    $scope.workOrderEdit = null;

    // workOrders table selection logic
    $scope.workOrderSelection = function(item, index) {
        if(item.isSelected) {
            if($scope.workOrderEdit !== null) {
                var index1 = $scope.itemEdit.workOrders.map(function(it) { return it.id; }).indexOf($scope.workOrderEdit.id);
                $scope.itemEdit.workOrders[index1].isSelected = false;
            }
            $scope.workOrderEdit = item;
        } else {
            $scope.workOrderEdit = null;
            item.isSelected = false;
        }
    };

    // New/Edit workOrders dialog
    $scope.openWorkOrderEditDialog = function(isNew) {
        $modal.open({
            backdrop: 'static',
            keyboard : false,
            templateUrl: 'initialization/documenttype/tmplWorkOrderEdit.tpl.html',
            size: 'lg',
            controller: 'ctrlWorkOrderEdit',
            windowClass: 'hmodal-info',
            resolve: {
                itemEdit: function() {
                    if(isNew) {
                        return new ServiceWorkOrder();
                    } else {
                        return $scope.workOrderEdit;
                    }
                }
            }
        }).result.then(function(result) {
            var i;
            if(isNew) {
                if(!angular.isDefined($scope.itemEdit.workOrders)) {
                    $scope.itemEdit.workOrders = [];
                }
                $scope.itemEdit.workOrders.unshift(result);
                for(i in $scope.itemEdit.workOrders) {
                    $scope.itemEdit.workOrders[i].isSelected = false;
                }
                $scope.workOrderEdit = angular.extend(result);
                $scope.itemEdit.workOrders[0].isSelected = true;
            }
            else {
                for(i in $scope.itemEdit.workOrders) {
                    $scope.itemEdit.workOrders[i].isSelected = false;
                }
                $scope.workOrderEdit = angular.extend(result);
                var index = $scope.itemEdit.workOrders.map(function(it) { return it.id; }).indexOf(result.id);
                for(var key in result) {
                    $scope.itemEdit.workOrders[index][key] = result[key];
                }
                $scope.itemEdit.workOrders[index].isSelected = true;
            }
        });
    };

    $scope.removeWorkOrder = function(item) {
        var dialog = dialogs.confirm('Please confirm', 'Are you sure you want to delete item?');
        dialog.result.then(function(btn) {
            var removeIndex = $scope.itemEdit.workOrders.map(function(it) { return it.id; }).indexOf(item.id);
            $scope.itemEdit.workOrders[removeIndex].deleted = true;
        });
    };


	// Save Button
	$scope.save = function() {
	   //	delete $scope.itemEdit.isSelected;
        var item;
        var i;
        for(i in $scope.itemEdit.tangibleItemAnalytics) {
    		item = $scope.itemEdit.tangibleItemAnalytics[i];
    		delete item.isSelected;
    	}
        for(i in $scope.itemEdit.invoices) {
    		item = $scope.itemEdit.invoices[i];
    		delete item.isSelected;
    	}
        for(i in $scope.itemEdit.transactionLogs) {
    		item = $scope.itemEdit.transactionLogs[i];
    		delete item.isSelected;
    	}
        for(i in $scope.itemEdit.tangibleItemConditions) {
    		item = $scope.itemEdit.tangibleItemConditions[i];
    		delete item.isSelected;
    	}
        for(i in $scope.itemEdit.beInvoices) {
    		item = $scope.itemEdit.beInvoices[i];
    		delete item.isSelected;
    	}
        for(i in $scope.itemEdit.proformaInvoices) {
    		item = $scope.itemEdit.proformaInvoices[i];
    		delete item.isSelected;
    	}
        for(i in $scope.itemEdit.beOrderHeadings) {
    		item = $scope.itemEdit.beOrderHeadings[i];
    		delete item.isSelected;
    	}
        for(i in $scope.itemEdit.orderHeadings) {
    		item = $scope.itemEdit.orderHeadings[i];
    		delete item.isSelected;
    	}
        for(i in $scope.itemEdit.procurementRequestHeadings) {
    		item = $scope.itemEdit.procurementRequestHeadings[i];
    		delete item.isSelected;
    	}
		$modalInstance.close($scope.itemEdit);
	};


	$scope.canSave = function() {
		var item = $scope.itemEdit;
		return                 item.DTIdentificationNumber  &&                 item.DTName  &&                 item.DTShortName  ;
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


.controller('ctrlDocumentTypeChoose', ['$scope','ServiceDocumentType', 'dialogs', '$modal', '$modalInstance', 'itemEdit',
function($scope, ServiceDocumentType, dialogs, $modal,  $modalInstance, itemEdit) {

    // entity with properties
    $scope.itemDefinition = {
        label: 'corporation.documentType',
        properties: [
            { label: 'dTIdentificationNumber', name:'DTIdentificationNumber', inTable:  true  },
            { label: 'dTName', name:'DTName', inTable:  true  },
            { label: 'dTShortName', name:'DTShortName', inTable:  true  },
            { label: 'dTCounter', name:'DTCounter', inTable:  false  },
        ]
    };

	$scope.items = [];
	$scope.itemEdit = {};

	// fill table with data
	$scope.loaded = false;
	var getDocumentTypes = function() {
		if(!$scope.loaded && $scope.items.length === 0) {
			$scope.isLoading = true;
			ServiceDocumentType.query(function(data) {
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
	getDocumentTypes();

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