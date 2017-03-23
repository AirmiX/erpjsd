'use strict';

angular.module('Doob.corporation')


.controller('ctrlOrganizationUnit',['$scope', '$rootScope', '$modal', 'dialogs', 'CheckSelected', 'ServiceOrganizationUnit',
    function($scope, $rootScope, $modal, dialogs, CheckSelected, ServiceOrganizationUnit) {

	// main entity (organizationUnit) properties names and labels
	$scope.itemDefinition = {
		label: 'corporation.organizationUnit',
		properties: [
			{ label: 'oUIdentificationCode', name:'OUIdentificationCode', inTable:  true  },
			{ label: 'oUName', name:'OUName', inTable:  true  },
			{ label: 'oUShortName', name:'OUShortName', inTable:  false  },
			{ label: 'oUTelephone', name:'OUTelephone', inTable:  false  },
			{ label: 'oUFax', name:'OUFax', inTable:  false  },
			{ label: 'oUEmail', name:'OUEmail', inTable:  false  },
			{ label: 'oUCalculationLevelStatus', name:'OUCalculationLevelStatus', inTable:  false  },
			{ label: 'oUClassificationNumber', name:'OUClassificationNumber', inTable:  false  },
		]
	};

	// market with properties names and labels
	$scope.marketDefinition = {
		label: 'sellingprice.market',
		properties : [
			{ label: 'mMarket', name:'MMarket' },
			{ label: 'mName', name:'MName' },
		]
	};
	// type with properties names and labels
	$scope.typeDefinition = {
		label: 'corporation.organizationUnitType',
		properties : [
			{ label: 'oUTName', name:'OUTName' },
		]
	};
	// address with properties names and labels
	$scope.addressDefinition = {
		label: 'environment.address',
		properties : [
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
	// shippingDocuments with properties names and labels
	$scope.shippingDocumentsDefinition = {
		label: 'procurement.shippingDocument',
		properties : [
			{ label: 'sDDocumentNumber', name:'SDDocumentNumber' },
			{ label: 'sDDispositionDate', name:'SDDispositionDate' },
			{ label: 'sDStatus', name:'SDStatus' },
		]
	};
	// taskTypes with properties names and labels
	$scope.taskTypesDefinition = {
		label: 'initialization.taskType',
		properties : [
			{ label: 'tTCode', name:'TTCode' },
			{ label: 'tTName', name:'TTName' },
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
	// proFormaInvoices with properties names and labels
	$scope.proFormaInvoicesDefinition = {
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
	// procurementRequestHeadings with properties names and labels
	$scope.procurementRequestHeadingsDefinition = {
		label: 'initialization.procurementRequestHeading',
		properties : [
			{ label: 'pRHCode', name:'PRHCode' },
			{ label: 'pRHCreationDate', name:'PRHCreationDate' },
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
	// workOrder with properties names and labels
	$scope.workOrderDefinition = {
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
	// deliveryNotes with properties names and labels
	$scope.deliveryNotesDefinition = {
		label: 'stockmanagement.deliveryNote',
		properties : [
			{ label: 'dNDocumentNumber', name:'DNDocumentNumber' },
			{ label: 'dNDeliveryDate', name:'DNDeliveryDate' },
			{ label: 'dNDocumentStatus', name:'DNDocumentStatus' },
		]
	};
	// workCalendars with properties names and labels
	$scope.workCalendarsDefinition = {
		label: 'corporation.workCalendar',
		properties : [
			{ label: 'wCYear', name:'WCYear' },
			{ label: 'wCMonth', name:'WCMonth' },
			{ label: 'wCDay', name:'WCDay' },
			{ label: 'wCTimeUnit', name:'WCTimeUnit' },
			{ label: 'wCDaysInWeek', name:'WCDaysInWeek' },
			{ label: 'wCDayStatus', name:'WCDayStatus' },
			{ label: 'wCDayOrdinalNumber', name:'WCDayOrdinalNumber' },
			{ label: 'wCWorkingDayOrdinalNumber', name:'WCWorkingDayOrdinalNumber' },
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
	// ouBelonging with properties names and labels
	$scope.ouBelongingDefinition = {
		label: 'sellingprice.oUBelonging',
		properties : [
		]
	};
	// stckroomOrgiUnis with properties names and labels
	$scope.stckroomOrgiUnisDefinition = {
		label: 'stockmanagement.stockroomOrgUni',
		properties : [
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
	// sellingPrice with properties names and labels
	$scope.sellingPriceDefinition = {
		label: 'sellingprice.sellingPrice',
		properties : [
			{ label: 'sPPrice', name:'SPPrice' },
			{ label: 'sPDateFrom', name:'SPDateFrom' },
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
	// workstations with properties names and labels
	$scope.workstationsDefinition = {
		label: 'humanresources.workstation',
		properties : [
			{ label: 'wOrdinalNumber', name:'WOrdinalNumber' },
			{ label: 'wName', name:'WName' },
			{ label: 'wNumberOfPerformers', name:'WNumberOfPerformers' },
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
	// beOrderItems with properties names and labels
	$scope.beOrderItemsDefinition = {
		label: 'internalorder.bEOrderItem',
		properties : [
			{ label: 'bEOIOrdinalNumber', name:'BEOIOrdinalNumber' },
			{ label: 'bEOIOrderedQuantity', name:'BEOIOrderedQuantity' },
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
	// customerRequestitems with properties names and labels
	$scope.customerRequestitemsDefinition = {
		label: 'customerrequest.customerRequestItem',
		properties : [
			{ label: 'cRIOrdinalNumber', name:'CRIOrdinalNumber' },
			{ label: 'cRIQuantity', name:'CRIQuantity' },
			{ label: 'cRIDeliveryTime', name:'CRIDeliveryTime' },
		]
	};
	// products with properties names and labels
	$scope.productsDefinition = {
		label: 'productiondata.product',
		properties : [
		]
	};
	// workOrdersProduction with properties names and labels
	$scope.workOrdersProductionDefinition = {
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
	// procurementPlanHeadings with properties names and labels
	$scope.procurementPlanHeadingsDefinition = {
		label: 'initialization.procurementPlanHeading',
		properties : [
			{ label: 'pPHDocumentNumber', name:'PPHDocumentNumber' },
			{ label: 'pPHPlanningDate', name:'PPHPlanningDate' },
			{ label: 'pPHPlanVersion', name:'PPHPlanVersion' },
		]
	};
	// orderCategories with properties names and labels
	$scope.orderCategoriesDefinition = {
		label: 'order.orderCategory',
		properties : [
			{ label: 'oCCode', name:'OCCode' },
			{ label: 'oCOrderPrefix', name:'OCOrderPrefix' },
			{ label: 'oCFreeOfCharge', name:'OCFreeOfCharge' },
			{ label: 'oCEnabled', name:'OCEnabled' },
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
	// productionProcesses with properties names and labels
	$scope.productionProcessesDefinition = {
		label: 'productiondata.productionProcess',
		properties : [
			{ label: 'pPVariant', name:'PPVariant' },
			{ label: 'pPName', name:'PPName' },
			{ label: 'pPStatus', name:'PPStatus' },
			{ label: 'pPValidStartDate', name:'PPValidStartDate' },
		]
	};

	// fill table with data
	$scope.items = [];
	$scope.loaded = false;
	var getOrganizationUnits = function() {
		if(!$scope.loaded && $scope.items.length === 0) {
			$scope.isLoading = true;
			ServiceOrganizationUnit.query(function(data) {
				$scope.items = data;
				$scope.isLoading = false;
				$scope.loaded = true;
			});
		}
	};
	getOrganizationUnits();

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

	$scope.$watch('OrganizationUnitCollection', function() {
		$scope.itemEdit = CheckSelected.checkSelectedInTable($scope.itemEdit, $scope.OrganizationUnitCollection, $scope.items);
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
			templateUrl: 'corporation/organizationunit/tmplOrganizationUnitEdit.tpl.html',
			size: 'lg',
			windowClass: 'hmodal-info',
			controller: 'ctrlOrganizationUnitEdit',
			resolve: {
				itemEdit: function() {
					if(isNew) {
						return new ServiceOrganizationUnit();
					} else {
						return $scope.itemEdit;
					}
				},
				marketDefinition: function() {
					return $scope.marketDefinition;
				},
				typeDefinition: function() {
					return $scope.typeDefinition;
				},
				addressDefinition: function() {
					return $scope.addressDefinition;
				},
				employeesDefinition: function() {
					return $scope.employeesDefinition;
				},
				shippingDocumentsDefinition: function() {
					return $scope.shippingDocumentsDefinition;
				},
				taskTypesDefinition: function() {
					return $scope.taskTypesDefinition;
				},
				rfpHeadingsDefinition: function() {
					return $scope.rfpHeadingsDefinition;
				},
				proFormaInvoicesDefinition: function() {
					return $scope.proFormaInvoicesDefinition;
				},
				procurementRequestHeadingsDefinition: function() {
					return $scope.procurementRequestHeadingsDefinition;
				},
				requestForProductionDefinition: function() {
					return $scope.requestForProductionDefinition;
				},
				workOrderDefinition: function() {
					return $scope.workOrderDefinition;
				},
				deliveryNotesDefinition: function() {
					return $scope.deliveryNotesDefinition;
				},
				workCalendarsDefinition: function() {
					return $scope.workCalendarsDefinition;
				},
				stockroomsDefinition: function() {
					return $scope.stockroomsDefinition;
				},
				orderItemsDefinition: function() {
					return $scope.orderItemsDefinition;
				},
				ouBelongingDefinition: function() {
					return $scope.ouBelongingDefinition;
				},
				stckroomOrgiUnisDefinition: function() {
					return $scope.stckroomOrgiUnisDefinition;
				},
				renamingsDefinition: function() {
					return $scope.renamingsDefinition;
				},
				sellingPriceDefinition: function() {
					return $scope.sellingPriceDefinition;
				},
				workCentersDefinition: function() {
					return $scope.workCentersDefinition;
				},
				requisitionsDefinition: function() {
					return $scope.requisitionsDefinition;
				},
				materialReturnNotesDefinition: function() {
					return $scope.materialReturnNotesDefinition;
				},
				workstationsDefinition: function() {
					return $scope.workstationsDefinition;
				},
				orderHeadingsDefinition: function() {
					return $scope.orderHeadingsDefinition;
				},
				invoicesDefinition: function() {
					return $scope.invoicesDefinition;
				},
				goodsReceivedNoteHeadingsDefinition: function() {
					return $scope.goodsReceivedNoteHeadingsDefinition;
				},
				beOrderItemsDefinition: function() {
					return $scope.beOrderItemsDefinition;
				},
				offerSupplierHeadingsDefinition: function() {
					return $scope.offerSupplierHeadingsDefinition;
				},
				customerRequestitemsDefinition: function() {
					return $scope.customerRequestitemsDefinition;
				},
				productsDefinition: function() {
					return $scope.productsDefinition;
				},
				workOrdersProductionDefinition: function() {
					return $scope.workOrdersProductionDefinition;
				},
				procurementPlanHeadingsDefinition: function() {
					return $scope.procurementPlanHeadingsDefinition;
				},
				orderCategoriesDefinition: function() {
					return $scope.orderCategoriesDefinition;
				},
				orderSupplierHeadingsDefinition: function() {
					return $scope.orderSupplierHeadingsDefinition;
				},
				productionProcessesDefinition: function() {
					return $scope.productionProcessesDefinition;
				},
			}
		})
		.result.then(function(result) {
			if(!angular.isDefined(result.id)) {
				ServiceOrganizationUnit.saveCustom('stockmanagement/organizationunits', result, function(savedObject) {
					$scope.items.unshift(savedObject);
					if($scope.itemEdit !== null) {
						var index = $scope.items.map(function(it) { return it.id; }).indexOf($scope.itemEdit.id);
						$scope.items[index].isSelected = false;
					}
					$scope.itemEdit = angular.extend(savedObject);
					$scope.items[0].isSelected = true;
				});
			 } else {
				 ServiceOrganizationUnit.updateCustom('stockmanagement/organizationunits/'+result.id, result, function(savedObject) {
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


.controller('ctrlOrganizationUnitEdit',['$scope', 'Localization', '$modal', '$modalInstance', 'dialogs',
	'ServiceOrganizationUnit', 'ServiceMarket', 'ServiceOrganizationUnitType', 'ServiceAddress', 'ServiceEmployee', 'ServiceShippingDocument', 'ServiceTaskType', 'ServiceRequestForProposalHeading', 'ServiceProFormaInvoice', 'ServiceProcurementRequestHeading', 'ServiceRequestForProduction', 'ServiceWorkOrder', 'ServiceDeliveryNote', 'ServiceWorkCalendar', 'ServiceStockroom', 'ServiceOrderItem', 'ServiceOUBelonging', 'ServiceStockroomOrgUni', 'ServiceRenaming', 'ServiceSellingPrice', 'ServiceWorkCenter', 'ServiceRequisition', 'ServiceMaterialReturnNote', 'ServiceWorkstation', 'ServiceOrderHeading', 'ServiceInvoice', 'ServiceGoodsReceivedNoteHeading', 'ServiceBEOrderItem', 'ServiceOfferSupplierHeading', 'ServiceCustomerRequestItem', 'ServiceProduct', 'ServiceProcurementPlanHeading', 'ServiceOrderCategory', 'ServiceOrderSupplierHeading', 'ServiceProductionProcess',   'marketDefinition',  'typeDefinition',  'addressDefinition',  'employeesDefinition',  'shippingDocumentsDefinition',  'taskTypesDefinition',  'rfpHeadingsDefinition',  'proFormaInvoicesDefinition',  'procurementRequestHeadingsDefinition',  'requestForProductionDefinition',  'workOrderDefinition',  'deliveryNotesDefinition',  'workCalendarsDefinition',  'stockroomsDefinition',  'orderItemsDefinition',  'ouBelongingDefinition',  'stckroomOrgiUnisDefinition',  'renamingsDefinition',  'sellingPriceDefinition',  'workCentersDefinition',  'requisitionsDefinition',  'materialReturnNotesDefinition',  'workstationsDefinition',  'orderHeadingsDefinition',  'invoicesDefinition',  'goodsReceivedNoteHeadingsDefinition',  'beOrderItemsDefinition',  'offerSupplierHeadingsDefinition',  'customerRequestitemsDefinition',  'productsDefinition',  'workOrdersProductionDefinition',  'procurementPlanHeadingsDefinition',  'orderCategoriesDefinition',  'orderSupplierHeadingsDefinition',  'productionProcessesDefinition',   'itemEdit',
function($scope, Localization, $modal, $modalInstance, dialogs,
	ServiceOrganizationUnit, ServiceMarket, ServiceOrganizationUnitType, ServiceAddress, ServiceEmployee, ServiceShippingDocument, ServiceTaskType, ServiceRequestForProposalHeading, ServiceProFormaInvoice, ServiceProcurementRequestHeading, ServiceRequestForProduction, ServiceWorkOrder, ServiceDeliveryNote, ServiceWorkCalendar, ServiceStockroom, ServiceOrderItem, ServiceOUBelonging, ServiceStockroomOrgUni, ServiceRenaming, ServiceSellingPrice, ServiceWorkCenter, ServiceRequisition, ServiceMaterialReturnNote, ServiceWorkstation, ServiceOrderHeading, ServiceInvoice, ServiceGoodsReceivedNoteHeading, ServiceBEOrderItem, ServiceOfferSupplierHeading, ServiceCustomerRequestItem, ServiceProduct, ServiceProcurementPlanHeading, ServiceOrderCategory, ServiceOrderSupplierHeading, ServiceProductionProcess,  marketDefinition,  typeDefinition,  addressDefinition,  employeesDefinition,  shippingDocumentsDefinition,  taskTypesDefinition,  rfpHeadingsDefinition,  proFormaInvoicesDefinition,  procurementRequestHeadingsDefinition,  requestForProductionDefinition,  workOrderDefinition,  deliveryNotesDefinition,  workCalendarsDefinition,  stockroomsDefinition,  orderItemsDefinition,  ouBelongingDefinition,  stckroomOrgiUnisDefinition,  renamingsDefinition,  sellingPriceDefinition,  workCentersDefinition,  requisitionsDefinition,  materialReturnNotesDefinition,  workstationsDefinition,  orderHeadingsDefinition,  invoicesDefinition,  goodsReceivedNoteHeadingsDefinition,  beOrderItemsDefinition,  offerSupplierHeadingsDefinition,  customerRequestitemsDefinition,  productsDefinition,  workOrdersProductionDefinition,  procurementPlanHeadingsDefinition,  orderCategoriesDefinition,  orderSupplierHeadingsDefinition,  productionProcessesDefinition,  itemEdit) {

	// dialog mode
	$scope.mode = 'edit';

	// original item state
	var original = angular.copy(itemEdit);
	// item state
	$scope.itemEdit = angular.copy(original);

	// market with properties
	$scope.marketDefinition = marketDefinition;
	// type with properties
	$scope.typeDefinition = typeDefinition;
	// address with properties
	$scope.addressDefinition = addressDefinition;
	// employees with properties
	$scope.employeesDefinition = employeesDefinition;
	// shippingDocuments with properties
	$scope.shippingDocumentsDefinition = shippingDocumentsDefinition;
	// taskTypes with properties
	$scope.taskTypesDefinition = taskTypesDefinition;
	// rfpHeadings with properties
	$scope.rfpHeadingsDefinition = rfpHeadingsDefinition;
	// proFormaInvoices with properties
	$scope.proFormaInvoicesDefinition = proFormaInvoicesDefinition;
	// procurementRequestHeadings with properties
	$scope.procurementRequestHeadingsDefinition = procurementRequestHeadingsDefinition;
	// requestForProduction with properties
	$scope.requestForProductionDefinition = requestForProductionDefinition;
	// workOrder with properties
	$scope.workOrderDefinition = workOrderDefinition;
	// deliveryNotes with properties
	$scope.deliveryNotesDefinition = deliveryNotesDefinition;
	// workCalendars with properties
	$scope.workCalendarsDefinition = workCalendarsDefinition;
	// stockrooms with properties
	$scope.stockroomsDefinition = stockroomsDefinition;
	// orderItems with properties
	$scope.orderItemsDefinition = orderItemsDefinition;
	// ouBelonging with properties
	$scope.ouBelongingDefinition = ouBelongingDefinition;
	// stckroomOrgiUnis with properties
	$scope.stckroomOrgiUnisDefinition = stckroomOrgiUnisDefinition;
	// renamings with properties
	$scope.renamingsDefinition = renamingsDefinition;
	// sellingPrice with properties
	$scope.sellingPriceDefinition = sellingPriceDefinition;
	// workCenters with properties
	$scope.workCentersDefinition = workCentersDefinition;
	// requisitions with properties
	$scope.requisitionsDefinition = requisitionsDefinition;
	// materialReturnNotes with properties
	$scope.materialReturnNotesDefinition = materialReturnNotesDefinition;
	// workstations with properties
	$scope.workstationsDefinition = workstationsDefinition;
	// orderHeadings with properties
	$scope.orderHeadingsDefinition = orderHeadingsDefinition;
	// invoices with properties
	$scope.invoicesDefinition = invoicesDefinition;
	// goodsReceivedNoteHeadings with properties
	$scope.goodsReceivedNoteHeadingsDefinition = goodsReceivedNoteHeadingsDefinition;
	// beOrderItems with properties
	$scope.beOrderItemsDefinition = beOrderItemsDefinition;
	// offerSupplierHeadings with properties
	$scope.offerSupplierHeadingsDefinition = offerSupplierHeadingsDefinition;
	// customerRequestitems with properties
	$scope.customerRequestitemsDefinition = customerRequestitemsDefinition;
	// products with properties
	$scope.productsDefinition = productsDefinition;
	// workOrdersProduction with properties
	$scope.workOrdersProductionDefinition = workOrdersProductionDefinition;
	// procurementPlanHeadings with properties
	$scope.procurementPlanHeadingsDefinition = procurementPlanHeadingsDefinition;
	// orderCategories with properties
	$scope.orderCategoriesDefinition = orderCategoriesDefinition;
	// orderSupplierHeadings with properties
	$scope.orderSupplierHeadingsDefinition = orderSupplierHeadingsDefinition;
	// productionProcesses with properties
	$scope.productionProcessesDefinition = productionProcessesDefinition;

	// datepicker logic

	// date properties

	$scope.open = function($event, opened) {
		$event.preventDefault();
		$event.stopPropagation();
		$scope[opened] = true;
	};



	// Choose market
	$scope.openChooseMarketDialog = function() {
        $modal.open({
            backdrop: 'static',
            keyboard : false,
            templateUrl: 'sellingprice/organizationunit/tmplMarketChoose.tpl.html',
            size: 'lg',
            controller: 'ctrlMarketChoose',
            windowClass: 'hmodal-info',
            resolve: {
				itemEdit: function() {
					if(angular.isDefined($scope.itemEdit.market)){
						return $scope.itemEdit.market;
					}
				}
			}
		}).result.then(function(result) {
			$scope.itemEdit.market = angular.copy(result);
		});
    };


	// Choose type
	$scope.openChooseTypeDialog = function() {
        $modal.open({
            backdrop: 'static',
            keyboard : false,
            templateUrl: 'corporation/organizationunit/tmplOrganizationUnitTypeChoose.tpl.html',
            size: 'lg',
            controller: 'ctrlOrganizationUnitTypeChoose',
            windowClass: 'hmodal-info',
            resolve: {
				itemEdit: function() {
					if(angular.isDefined($scope.itemEdit.type)){
						return $scope.itemEdit.type;
					}
				}
			}
		}).result.then(function(result) {
			$scope.itemEdit.type = angular.copy(result);
		});
    };


	// Choose address
	$scope.openChooseAddressDialog = function() {
        $modal.open({
            backdrop: 'static',
            keyboard : false,
            templateUrl: 'environment/organizationunit/tmplAddressChoose.tpl.html',
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


    $scope.proFormaInvoiceEdit = null;

    // proFormaInvoices table selection logic
    $scope.proFormaInvoiceSelection = function(item, index) {
        if(item.isSelected) {
            if($scope.proFormaInvoiceEdit !== null) {
                var index1 = $scope.itemEdit.proFormaInvoices.map(function(it) { return it.id; }).indexOf($scope.proFormaInvoiceEdit.id);
                $scope.itemEdit.proFormaInvoices[index1].isSelected = false;
            }
            $scope.proFormaInvoiceEdit = item;
        } else {
            $scope.proFormaInvoiceEdit = null;
            item.isSelected = false;
        }
    };

    // New/Edit proFormaInvoices dialog
    $scope.openProFormaInvoiceEditDialog = function(isNew) {
        $modal.open({
            backdrop: 'static',
            keyboard : false,
            templateUrl: 'procurement/organizationunit/tmplProFormaInvoiceEdit.tpl.html',
            size: 'lg',
            controller: 'ctrlProFormaInvoiceEdit',
            windowClass: 'hmodal-info',
            resolve: {
                itemEdit: function() {
                    if(isNew) {
                        return new ServiceProFormaInvoice();
                    } else {
                        return $scope.proFormaInvoiceEdit;
                    }
                }
            }
        }).result.then(function(result) {
            var i;
            if(isNew) {
                if(!angular.isDefined($scope.itemEdit.proFormaInvoices)) {
                    $scope.itemEdit.proFormaInvoices = [];
                }
                $scope.itemEdit.proFormaInvoices.unshift(result);
                for(i in $scope.itemEdit.proFormaInvoices) {
                    $scope.itemEdit.proFormaInvoices[i].isSelected = false;
                }
                $scope.proFormaInvoiceEdit = angular.extend(result);
                $scope.itemEdit.proFormaInvoices[0].isSelected = true;
            }
            else {
                for(i in $scope.itemEdit.proFormaInvoices) {
                    $scope.itemEdit.proFormaInvoices[i].isSelected = false;
                }
                $scope.proFormaInvoiceEdit = angular.extend(result);
                var index = $scope.itemEdit.proFormaInvoices.map(function(it) { return it.id; }).indexOf(result.id);
                for(var key in result) {
                    $scope.itemEdit.proFormaInvoices[index][key] = result[key];
                }
                $scope.itemEdit.proFormaInvoices[index].isSelected = true;
            }
        });
    };

    $scope.removeProFormaInvoice = function(item) {
        var dialog = dialogs.confirm('Please confirm', 'Are you sure you want to delete item?');
        dialog.result.then(function(btn) {
            var removeIndex = $scope.itemEdit.proFormaInvoices.map(function(it) { return it.id; }).indexOf(item.id);
            $scope.itemEdit.proFormaInvoices[removeIndex].deleted = true;
        });
    };


    $scope.workCalendarEdit = null;

    // workCalendars table selection logic
    $scope.workCalendarSelection = function(item, index) {
        if(item.isSelected) {
            if($scope.workCalendarEdit !== null) {
                var index1 = $scope.itemEdit.workCalendars.map(function(it) { return it.id; }).indexOf($scope.workCalendarEdit.id);
                $scope.itemEdit.workCalendars[index1].isSelected = false;
            }
            $scope.workCalendarEdit = item;
        } else {
            $scope.workCalendarEdit = null;
            item.isSelected = false;
        }
    };

    // New/Edit workCalendars dialog
    $scope.openWorkCalendarEditDialog = function(isNew) {
        $modal.open({
            backdrop: 'static',
            keyboard : false,
            templateUrl: 'corporation/organizationunit/tmplWorkCalendarEdit.tpl.html',
            size: 'lg',
            controller: 'ctrlWorkCalendarEdit',
            windowClass: 'hmodal-info',
            resolve: {
                itemEdit: function() {
                    if(isNew) {
                        return new ServiceWorkCalendar();
                    } else {
                        return $scope.workCalendarEdit;
                    }
                }
            }
        }).result.then(function(result) {
            var i;
            if(isNew) {
                if(!angular.isDefined($scope.itemEdit.workCalendars)) {
                    $scope.itemEdit.workCalendars = [];
                }
                $scope.itemEdit.workCalendars.unshift(result);
                for(i in $scope.itemEdit.workCalendars) {
                    $scope.itemEdit.workCalendars[i].isSelected = false;
                }
                $scope.workCalendarEdit = angular.extend(result);
                $scope.itemEdit.workCalendars[0].isSelected = true;
            }
            else {
                for(i in $scope.itemEdit.workCalendars) {
                    $scope.itemEdit.workCalendars[i].isSelected = false;
                }
                $scope.workCalendarEdit = angular.extend(result);
                var index = $scope.itemEdit.workCalendars.map(function(it) { return it.id; }).indexOf(result.id);
                for(var key in result) {
                    $scope.itemEdit.workCalendars[index][key] = result[key];
                }
                $scope.itemEdit.workCalendars[index].isSelected = true;
            }
        });
    };

    $scope.removeWorkCalendar = function(item) {
        var dialog = dialogs.confirm('Please confirm', 'Are you sure you want to delete item?');
        dialog.result.then(function(btn) {
            var removeIndex = $scope.itemEdit.workCalendars.map(function(it) { return it.id; }).indexOf(item.id);
            $scope.itemEdit.workCalendars[removeIndex].deleted = true;
        });
    };


    $scope.oUBelongingEdit = null;

    // ouBelonging table selection logic
    $scope.oUBelongingSelection = function(item, index) {
        if(item.isSelected) {
            if($scope.oUBelongingEdit !== null) {
                var index1 = $scope.itemEdit.ouBelonging.map(function(it) { return it.id; }).indexOf($scope.oUBelongingEdit.id);
                $scope.itemEdit.ouBelonging[index1].isSelected = false;
            }
            $scope.oUBelongingEdit = item;
        } else {
            $scope.oUBelongingEdit = null;
            item.isSelected = false;
        }
    };

    // New/Edit ouBelonging dialog
    $scope.openOUBelongingEditDialog = function(isNew) {
        $modal.open({
            backdrop: 'static',
            keyboard : false,
            templateUrl: 'sellingprice/organizationunit/tmplOUBelongingEdit.tpl.html',
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
                if(!angular.isDefined($scope.itemEdit.ouBelonging)) {
                    $scope.itemEdit.ouBelonging = [];
                }
                $scope.itemEdit.ouBelonging.unshift(result);
                for(i in $scope.itemEdit.ouBelonging) {
                    $scope.itemEdit.ouBelonging[i].isSelected = false;
                }
                $scope.oUBelongingEdit = angular.extend(result);
                $scope.itemEdit.ouBelonging[0].isSelected = true;
            }
            else {
                for(i in $scope.itemEdit.ouBelonging) {
                    $scope.itemEdit.ouBelonging[i].isSelected = false;
                }
                $scope.oUBelongingEdit = angular.extend(result);
                var index = $scope.itemEdit.ouBelonging.map(function(it) { return it.id; }).indexOf(result.id);
                for(var key in result) {
                    $scope.itemEdit.ouBelonging[index][key] = result[key];
                }
                $scope.itemEdit.ouBelonging[index].isSelected = true;
            }
        });
    };

    $scope.removeOUBelonging = function(item) {
        var dialog = dialogs.confirm('Please confirm', 'Are you sure you want to delete item?');
        dialog.result.then(function(btn) {
            var removeIndex = $scope.itemEdit.ouBelonging.map(function(it) { return it.id; }).indexOf(item.id);
            $scope.itemEdit.ouBelonging[removeIndex].deleted = true;
        });
    };


    $scope.stockroomOrgUniEdit = null;

    // stckroomOrgiUnis table selection logic
    $scope.stockroomOrgUniSelection = function(item, index) {
        if(item.isSelected) {
            if($scope.stockroomOrgUniEdit !== null) {
                var index1 = $scope.itemEdit.stckroomOrgiUnis.map(function(it) { return it.id; }).indexOf($scope.stockroomOrgUniEdit.id);
                $scope.itemEdit.stckroomOrgiUnis[index1].isSelected = false;
            }
            $scope.stockroomOrgUniEdit = item;
        } else {
            $scope.stockroomOrgUniEdit = null;
            item.isSelected = false;
        }
    };

    // New/Edit stckroomOrgiUnis dialog
    $scope.openStockroomOrgUniEditDialog = function(isNew) {
        $modal.open({
            backdrop: 'static',
            keyboard : false,
            templateUrl: 'stockmanagement/organizationunit/tmplStockroomOrgUniEdit.tpl.html',
            size: 'lg',
            controller: 'ctrlStockroomOrgUniEdit',
            windowClass: 'hmodal-info',
            resolve: {
                itemEdit: function() {
                    if(isNew) {
                        return new ServiceStockroomOrgUni();
                    } else {
                        return $scope.stockroomOrgUniEdit;
                    }
                }
            }
        }).result.then(function(result) {
            var i;
            if(isNew) {
                if(!angular.isDefined($scope.itemEdit.stckroomOrgiUnis)) {
                    $scope.itemEdit.stckroomOrgiUnis = [];
                }
                $scope.itemEdit.stckroomOrgiUnis.unshift(result);
                for(i in $scope.itemEdit.stckroomOrgiUnis) {
                    $scope.itemEdit.stckroomOrgiUnis[i].isSelected = false;
                }
                $scope.stockroomOrgUniEdit = angular.extend(result);
                $scope.itemEdit.stckroomOrgiUnis[0].isSelected = true;
            }
            else {
                for(i in $scope.itemEdit.stckroomOrgiUnis) {
                    $scope.itemEdit.stckroomOrgiUnis[i].isSelected = false;
                }
                $scope.stockroomOrgUniEdit = angular.extend(result);
                var index = $scope.itemEdit.stckroomOrgiUnis.map(function(it) { return it.id; }).indexOf(result.id);
                for(var key in result) {
                    $scope.itemEdit.stckroomOrgiUnis[index][key] = result[key];
                }
                $scope.itemEdit.stckroomOrgiUnis[index].isSelected = true;
            }
        });
    };

    $scope.removeStockroomOrgUni = function(item) {
        var dialog = dialogs.confirm('Please confirm', 'Are you sure you want to delete item?');
        dialog.result.then(function(btn) {
            var removeIndex = $scope.itemEdit.stckroomOrgiUnis.map(function(it) { return it.id; }).indexOf(item.id);
            $scope.itemEdit.stckroomOrgiUnis[removeIndex].deleted = true;
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
            templateUrl: 'sellingprice/organizationunit/tmplSellingPriceEdit.tpl.html',
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


    $scope.workCenterEdit = null;

    // workCenters table selection logic
    $scope.workCenterSelection = function(item, index) {
        if(item.isSelected) {
            if($scope.workCenterEdit !== null) {
                var index1 = $scope.itemEdit.workCenters.map(function(it) { return it.id; }).indexOf($scope.workCenterEdit.id);
                $scope.itemEdit.workCenters[index1].isSelected = false;
            }
            $scope.workCenterEdit = item;
        } else {
            $scope.workCenterEdit = null;
            item.isSelected = false;
        }
    };

    // New/Edit workCenters dialog
    $scope.openWorkCenterEditDialog = function(isNew) {
        $modal.open({
            backdrop: 'static',
            keyboard : false,
            templateUrl: 'productiondata/organizationunit/tmplWorkCenterEdit.tpl.html',
            size: 'lg',
            controller: 'ctrlWorkCenterEdit',
            windowClass: 'hmodal-info',
            resolve: {
                itemEdit: function() {
                    if(isNew) {
                        return new ServiceWorkCenter();
                    } else {
                        return $scope.workCenterEdit;
                    }
                }
            }
        }).result.then(function(result) {
            var i;
            if(isNew) {
                if(!angular.isDefined($scope.itemEdit.workCenters)) {
                    $scope.itemEdit.workCenters = [];
                }
                $scope.itemEdit.workCenters.unshift(result);
                for(i in $scope.itemEdit.workCenters) {
                    $scope.itemEdit.workCenters[i].isSelected = false;
                }
                $scope.workCenterEdit = angular.extend(result);
                $scope.itemEdit.workCenters[0].isSelected = true;
            }
            else {
                for(i in $scope.itemEdit.workCenters) {
                    $scope.itemEdit.workCenters[i].isSelected = false;
                }
                $scope.workCenterEdit = angular.extend(result);
                var index = $scope.itemEdit.workCenters.map(function(it) { return it.id; }).indexOf(result.id);
                for(var key in result) {
                    $scope.itemEdit.workCenters[index][key] = result[key];
                }
                $scope.itemEdit.workCenters[index].isSelected = true;
            }
        });
    };

    $scope.removeWorkCenter = function(item) {
        var dialog = dialogs.confirm('Please confirm', 'Are you sure you want to delete item?');
        dialog.result.then(function(btn) {
            var removeIndex = $scope.itemEdit.workCenters.map(function(it) { return it.id; }).indexOf(item.id);
            $scope.itemEdit.workCenters[removeIndex].deleted = true;
        });
    };


    $scope.workstationEdit = null;

    // workstations table selection logic
    $scope.workstationSelection = function(item, index) {
        if(item.isSelected) {
            if($scope.workstationEdit !== null) {
                var index1 = $scope.itemEdit.workstations.map(function(it) { return it.id; }).indexOf($scope.workstationEdit.id);
                $scope.itemEdit.workstations[index1].isSelected = false;
            }
            $scope.workstationEdit = item;
        } else {
            $scope.workstationEdit = null;
            item.isSelected = false;
        }
    };

    // New/Edit workstations dialog
    $scope.openWorkstationEditDialog = function(isNew) {
        $modal.open({
            backdrop: 'static',
            keyboard : false,
            templateUrl: 'humanresources/organizationunit/tmplWorkstationEdit.tpl.html',
            size: 'lg',
            controller: 'ctrlWorkstationEdit',
            windowClass: 'hmodal-info',
            resolve: {
                itemEdit: function() {
                    if(isNew) {
                        return new ServiceWorkstation();
                    } else {
                        return $scope.workstationEdit;
                    }
                }
            }
        }).result.then(function(result) {
            var i;
            if(isNew) {
                if(!angular.isDefined($scope.itemEdit.workstations)) {
                    $scope.itemEdit.workstations = [];
                }
                $scope.itemEdit.workstations.unshift(result);
                for(i in $scope.itemEdit.workstations) {
                    $scope.itemEdit.workstations[i].isSelected = false;
                }
                $scope.workstationEdit = angular.extend(result);
                $scope.itemEdit.workstations[0].isSelected = true;
            }
            else {
                for(i in $scope.itemEdit.workstations) {
                    $scope.itemEdit.workstations[i].isSelected = false;
                }
                $scope.workstationEdit = angular.extend(result);
                var index = $scope.itemEdit.workstations.map(function(it) { return it.id; }).indexOf(result.id);
                for(var key in result) {
                    $scope.itemEdit.workstations[index][key] = result[key];
                }
                $scope.itemEdit.workstations[index].isSelected = true;
            }
        });
    };

    $scope.removeWorkstation = function(item) {
        var dialog = dialogs.confirm('Please confirm', 'Are you sure you want to delete item?');
        dialog.result.then(function(btn) {
            var removeIndex = $scope.itemEdit.workstations.map(function(it) { return it.id; }).indexOf(item.id);
            $scope.itemEdit.workstations[removeIndex].deleted = true;
        });
    };


    $scope.invoiceEdit = null;

    // invoices table selection logic
    $scope.invoiceSelection = function(item, index) {
        if(item.isSelected) {
            if($scope.invoiceEdit !== null) {
                var index1 = $scope.itemEdit.invoices.map(function(it) { return it.id; }).indexOf($scope.invoiceEdit.id);
                $scope.itemEdit.invoices[index1].isSelected = false;
            }
            $scope.invoiceEdit = item;
        } else {
            $scope.invoiceEdit = null;
            item.isSelected = false;
        }
    };

    // New/Edit invoices dialog
    $scope.openInvoiceEditDialog = function(isNew) {
        $modal.open({
            backdrop: 'static',
            keyboard : false,
            templateUrl: 'procurement/organizationunit/tmplInvoiceEdit.tpl.html',
            size: 'lg',
            controller: 'ctrlInvoiceEdit',
            windowClass: 'hmodal-info',
            resolve: {
                itemEdit: function() {
                    if(isNew) {
                        return new ServiceInvoice();
                    } else {
                        return $scope.invoiceEdit;
                    }
                }
            }
        }).result.then(function(result) {
            var i;
            if(isNew) {
                if(!angular.isDefined($scope.itemEdit.invoices)) {
                    $scope.itemEdit.invoices = [];
                }
                $scope.itemEdit.invoices.unshift(result);
                for(i in $scope.itemEdit.invoices) {
                    $scope.itemEdit.invoices[i].isSelected = false;
                }
                $scope.invoiceEdit = angular.extend(result);
                $scope.itemEdit.invoices[0].isSelected = true;
            }
            else {
                for(i in $scope.itemEdit.invoices) {
                    $scope.itemEdit.invoices[i].isSelected = false;
                }
                $scope.invoiceEdit = angular.extend(result);
                var index = $scope.itemEdit.invoices.map(function(it) { return it.id; }).indexOf(result.id);
                for(var key in result) {
                    $scope.itemEdit.invoices[index][key] = result[key];
                }
                $scope.itemEdit.invoices[index].isSelected = true;
            }
        });
    };

    $scope.removeInvoice = function(item) {
        var dialog = dialogs.confirm('Please confirm', 'Are you sure you want to delete item?');
        dialog.result.then(function(btn) {
            var removeIndex = $scope.itemEdit.invoices.map(function(it) { return it.id; }).indexOf(item.id);
            $scope.itemEdit.invoices[removeIndex].deleted = true;
        });
    };


    $scope.workOrderEdit = null;

    // workOrdersProduction table selection logic
    $scope.workOrderSelection = function(item, index) {
        if(item.isSelected) {
            if($scope.workOrderEdit !== null) {
                var index1 = $scope.itemEdit.workOrdersProduction.map(function(it) { return it.id; }).indexOf($scope.workOrderEdit.id);
                $scope.itemEdit.workOrdersProduction[index1].isSelected = false;
            }
            $scope.workOrderEdit = item;
        } else {
            $scope.workOrderEdit = null;
            item.isSelected = false;
        }
    };

    // New/Edit workOrdersProduction dialog
    $scope.openWorkOrderEditDialog = function(isNew) {
        $modal.open({
            backdrop: 'static',
            keyboard : false,
            templateUrl: 'initialization/organizationunit/tmplWorkOrderEdit.tpl.html',
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
                if(!angular.isDefined($scope.itemEdit.workOrdersProduction)) {
                    $scope.itemEdit.workOrdersProduction = [];
                }
                $scope.itemEdit.workOrdersProduction.unshift(result);
                for(i in $scope.itemEdit.workOrdersProduction) {
                    $scope.itemEdit.workOrdersProduction[i].isSelected = false;
                }
                $scope.workOrderEdit = angular.extend(result);
                $scope.itemEdit.workOrdersProduction[0].isSelected = true;
            }
            else {
                for(i in $scope.itemEdit.workOrdersProduction) {
                    $scope.itemEdit.workOrdersProduction[i].isSelected = false;
                }
                $scope.workOrderEdit = angular.extend(result);
                var index = $scope.itemEdit.workOrdersProduction.map(function(it) { return it.id; }).indexOf(result.id);
                for(var key in result) {
                    $scope.itemEdit.workOrdersProduction[index][key] = result[key];
                }
                $scope.itemEdit.workOrdersProduction[index].isSelected = true;
            }
        });
    };

    $scope.removeWorkOrder = function(item) {
        var dialog = dialogs.confirm('Please confirm', 'Are you sure you want to delete item?');
        dialog.result.then(function(btn) {
            var removeIndex = $scope.itemEdit.workOrdersProduction.map(function(it) { return it.id; }).indexOf(item.id);
            $scope.itemEdit.workOrdersProduction[removeIndex].deleted = true;
        });
    };


    $scope.productionProcessEdit = null;

    // productionProcesses table selection logic
    $scope.productionProcessSelection = function(item, index) {
        if(item.isSelected) {
            if($scope.productionProcessEdit !== null) {
                var index1 = $scope.itemEdit.productionProcesses.map(function(it) { return it.id; }).indexOf($scope.productionProcessEdit.id);
                $scope.itemEdit.productionProcesses[index1].isSelected = false;
            }
            $scope.productionProcessEdit = item;
        } else {
            $scope.productionProcessEdit = null;
            item.isSelected = false;
        }
    };

    // New/Edit productionProcesses dialog
    $scope.openProductionProcessEditDialog = function(isNew) {
        $modal.open({
            backdrop: 'static',
            keyboard : false,
            templateUrl: 'productiondata/organizationunit/tmplProductionProcessEdit.tpl.html',
            size: 'lg',
            controller: 'ctrlProductionProcessEdit',
            windowClass: 'hmodal-info',
            resolve: {
                itemEdit: function() {
                    if(isNew) {
                        return new ServiceProductionProcess();
                    } else {
                        return $scope.productionProcessEdit;
                    }
                }
            }
        }).result.then(function(result) {
            var i;
            if(isNew) {
                if(!angular.isDefined($scope.itemEdit.productionProcesses)) {
                    $scope.itemEdit.productionProcesses = [];
                }
                $scope.itemEdit.productionProcesses.unshift(result);
                for(i in $scope.itemEdit.productionProcesses) {
                    $scope.itemEdit.productionProcesses[i].isSelected = false;
                }
                $scope.productionProcessEdit = angular.extend(result);
                $scope.itemEdit.productionProcesses[0].isSelected = true;
            }
            else {
                for(i in $scope.itemEdit.productionProcesses) {
                    $scope.itemEdit.productionProcesses[i].isSelected = false;
                }
                $scope.productionProcessEdit = angular.extend(result);
                var index = $scope.itemEdit.productionProcesses.map(function(it) { return it.id; }).indexOf(result.id);
                for(var key in result) {
                    $scope.itemEdit.productionProcesses[index][key] = result[key];
                }
                $scope.itemEdit.productionProcesses[index].isSelected = true;
            }
        });
    };

    $scope.removeProductionProcess = function(item) {
        var dialog = dialogs.confirm('Please confirm', 'Are you sure you want to delete item?');
        dialog.result.then(function(btn) {
            var removeIndex = $scope.itemEdit.productionProcesses.map(function(it) { return it.id; }).indexOf(item.id);
            $scope.itemEdit.productionProcesses[removeIndex].deleted = true;
        });
    };


	// Save Button
	$scope.save = function() {
	   //	delete $scope.itemEdit.isSelected;
        var item;
        var i;
        for(i in $scope.itemEdit.employees) {
    		item = $scope.itemEdit.employees[i];
    		delete item.isSelected;
    	}
        for(i in $scope.itemEdit.shippingDocuments) {
    		item = $scope.itemEdit.shippingDocuments[i];
    		delete item.isSelected;
    	}
        for(i in $scope.itemEdit.taskTypes) {
    		item = $scope.itemEdit.taskTypes[i];
    		delete item.isSelected;
    	}
        for(i in $scope.itemEdit.rfpHeadings) {
    		item = $scope.itemEdit.rfpHeadings[i];
    		delete item.isSelected;
    	}
        for(i in $scope.itemEdit.procurementRequestHeadings) {
    		item = $scope.itemEdit.procurementRequestHeadings[i];
    		delete item.isSelected;
    	}
        for(i in $scope.itemEdit.requestForProduction) {
    		item = $scope.itemEdit.requestForProduction[i];
    		delete item.isSelected;
    	}
        for(i in $scope.itemEdit.workOrder) {
    		item = $scope.itemEdit.workOrder[i];
    		delete item.isSelected;
    	}
        for(i in $scope.itemEdit.deliveryNotes) {
    		item = $scope.itemEdit.deliveryNotes[i];
    		delete item.isSelected;
    	}
        for(i in $scope.itemEdit.stockrooms) {
    		item = $scope.itemEdit.stockrooms[i];
    		delete item.isSelected;
    	}
        for(i in $scope.itemEdit.orderItems) {
    		item = $scope.itemEdit.orderItems[i];
    		delete item.isSelected;
    	}
        for(i in $scope.itemEdit.renamings) {
    		item = $scope.itemEdit.renamings[i];
    		delete item.isSelected;
    	}
        for(i in $scope.itemEdit.requisitions) {
    		item = $scope.itemEdit.requisitions[i];
    		delete item.isSelected;
    	}
        for(i in $scope.itemEdit.materialReturnNotes) {
    		item = $scope.itemEdit.materialReturnNotes[i];
    		delete item.isSelected;
    	}
        for(i in $scope.itemEdit.orderHeadings) {
    		item = $scope.itemEdit.orderHeadings[i];
    		delete item.isSelected;
    	}
        for(i in $scope.itemEdit.goodsReceivedNoteHeadings) {
    		item = $scope.itemEdit.goodsReceivedNoteHeadings[i];
    		delete item.isSelected;
    	}
        for(i in $scope.itemEdit.beOrderItems) {
    		item = $scope.itemEdit.beOrderItems[i];
    		delete item.isSelected;
    	}
        for(i in $scope.itemEdit.offerSupplierHeadings) {
    		item = $scope.itemEdit.offerSupplierHeadings[i];
    		delete item.isSelected;
    	}
        for(i in $scope.itemEdit.customerRequestitems) {
    		item = $scope.itemEdit.customerRequestitems[i];
    		delete item.isSelected;
    	}
        for(i in $scope.itemEdit.products) {
    		item = $scope.itemEdit.products[i];
    		delete item.isSelected;
    	}
        for(i in $scope.itemEdit.procurementPlanHeadings) {
    		item = $scope.itemEdit.procurementPlanHeadings[i];
    		delete item.isSelected;
    	}
        for(i in $scope.itemEdit.orderCategories) {
    		item = $scope.itemEdit.orderCategories[i];
    		delete item.isSelected;
    	}
        for(i in $scope.itemEdit.orderSupplierHeadings) {
    		item = $scope.itemEdit.orderSupplierHeadings[i];
    		delete item.isSelected;
    	}
		$modalInstance.close($scope.itemEdit);
	};


	$scope.canSave = function() {
		var item = $scope.itemEdit;
		return                 item.OUIdentificationCode  &&                 item.OUName  ;
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


.controller('ctrlOrganizationUnitChoose', ['$scope','ServiceOrganizationUnit', 'dialogs', '$modal', '$modalInstance', 'itemEdit',
function($scope, ServiceOrganizationUnit, dialogs, $modal,  $modalInstance, itemEdit) {

    // entity with properties
    $scope.itemDefinition = {
        label: 'corporation.organizationUnit',
        properties: [
            { label: 'oUIdentificationCode', name:'OUIdentificationCode', inTable:  true  },
            { label: 'oUName', name:'OUName', inTable:  true  },
            { label: 'oUShortName', name:'OUShortName', inTable:  false  },
            { label: 'oUTelephone', name:'OUTelephone', inTable:  false  },
            { label: 'oUFax', name:'OUFax', inTable:  false  },
            { label: 'oUEmail', name:'OUEmail', inTable:  false  },
            { label: 'oUCalculationLevelStatus', name:'OUCalculationLevelStatus', inTable:  false  },
            { label: 'oUClassificationNumber', name:'OUClassificationNumber', inTable:  false  },
        ]
    };

	$scope.items = [];
	$scope.itemEdit = {};

	// fill table with data
	$scope.loaded = false;
	var getOrganizationUnits = function() {
		if(!$scope.loaded && $scope.items.length === 0) {
			$scope.isLoading = true;
			ServiceOrganizationUnit.query(function(data) {
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
	getOrganizationUnits();

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