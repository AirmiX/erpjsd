'use strict';

angular.module('Doob.stock')


.controller('ctrlStockroom',['$scope', '$rootScope', '$modal', 'dialogs', 'CheckSelected', 'ServiceStockroom',
    function($scope, $rootScope, $modal, dialogs, CheckSelected, ServiceStockroom) {

	// main entity (stockroom) properties names and labels
	$scope.itemDefinition = {
		label: 'stock.stockroom',
		properties: [
			{ label: 'sCode', name:'SCode', inTable:  true  },
			{ label: 'sName', name:'SName', inTable:  true  },
			{ label: 'sFullName', name:'SFullName', inTable:  true  },
			{ label: 'sType', name:'SType', inTable:  true  },
			{ label: 'sConditions', name:'SConditions', inTable:  true  },
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
	// address with properties names and labels
	$scope.addressDefinition = {
		label: 'environment.address',
		properties : [
		]
	};
	// assistantOfAccountable with properties names and labels
	$scope.assistantOfAccountableDefinition = {
		label: 'corporation.employee',
		properties : [
			{ label: 'ePersonellNumber', name:'EPersonellNumber' },
			{ label: 'eName', name:'EName' },
			{ label: 'eLastName', name:'ELastName' },
			{ label: 'eDateOfBirth', name:'EDateOfBirth' },
		]
	};
	// accountable with properties names and labels
	$scope.accountableDefinition = {
		label: 'corporation.employee',
		properties : [
			{ label: 'ePersonellNumber', name:'EPersonellNumber' },
			{ label: 'eName', name:'EName' },
			{ label: 'eLastName', name:'ELastName' },
			{ label: 'eDateOfBirth', name:'EDateOfBirth' },
		]
	};
	// stockroomOrgUnis with properties names and labels
	$scope.stockroomOrgUnisDefinition = {
		label: 'stockmanagement.stockroomOrgUni',
		properties : [
		]
	};
	// stockAccountAssignment with properties names and labels
	$scope.stockAccountAssignmentDefinition = {
		label: 'stockmanagement.stockAccountAssignment',
		properties : [
			{ label: 'sAAValueStatus', name:'SAAValueStatus' },
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
	// deliveryNotes with properties names and labels
	$scope.deliveryNotesDefinition = {
		label: 'stockmanagement.deliveryNote',
		properties : [
			{ label: 'dNDocumentNumber', name:'DNDocumentNumber' },
			{ label: 'dNDeliveryDate', name:'DNDeliveryDate' },
			{ label: 'dNDocumentStatus', name:'DNDocumentStatus' },
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
	// products with properties names and labels
	$scope.productsDefinition = {
		label: 'productiondata.product',
		properties : [
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
	// materialRetunNote with properties names and labels
	$scope.materialRetunNoteDefinition = {
		label: 'stockmanagement.materialReturnNote',
		properties : [
			{ label: 'mRNDocumentNumber', name:'MRNDocumentNumber' },
			{ label: 'mRNIssuanceDate', name:'MRNIssuanceDate' },
			{ label: 'mRNDocumentStatus', name:'MRNDocumentStatus' },
			{ label: 'mRNPrintStatus', name:'MRNPrintStatus' },
			{ label: 'mRNTransactionLogPrint', name:'MRNTransactionLogPrint' },
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
	// consignmentShippingDocuments with properties names and labels
	$scope.consignmentShippingDocumentsDefinition = {
		label: 'procurement.shippingDocument',
		properties : [
			{ label: 'sDDocumentNumber', name:'SDDocumentNumber' },
			{ label: 'sDDispositionDate', name:'SDDispositionDate' },
			{ label: 'sDStatus', name:'SDStatus' },
		]
	};
	// shippingDocument with properties names and labels
	$scope.shippingDocumentDefinition = {
		label: 'procurement.shippingDocument',
		properties : [
			{ label: 'sDDocumentNumber', name:'SDDocumentNumber' },
			{ label: 'sDDispositionDate', name:'SDDispositionDate' },
			{ label: 'sDStatus', name:'SDStatus' },
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
	// beOrderItems with properties names and labels
	$scope.beOrderItemsDefinition = {
		label: 'internalorder.bEOrderItem',
		properties : [
			{ label: 'bEOIOrdinalNumber', name:'BEOIOrdinalNumber' },
			{ label: 'bEOIOrderedQuantity', name:'BEOIOrderedQuantity' },
		]
	};

	// fill table with data
	$scope.items = [];
	$scope.loaded = false;
	var getStockrooms = function() {
		if(!$scope.loaded && $scope.items.length === 0) {
			$scope.isLoading = true;
			ServiceStockroom.query(function(data) {
				$scope.items = data;
				$scope.isLoading = false;
				$scope.loaded = true;
			});
		}
	};
	getStockrooms();

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

	$scope.$watch('StockroomCollection', function() {
		$scope.itemEdit = CheckSelected.checkSelectedInTable($scope.itemEdit, $scope.StockroomCollection, $scope.items);
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
			templateUrl: 'stock/stockroom/tmplStockroomEdit.tpl.html',
			size: 'lg',
			windowClass: 'hmodal-info',
			controller: 'ctrlStockroomEdit',
			resolve: {
				itemEdit: function() {
					if(isNew) {
						return new ServiceStockroom();
					} else {
						return $scope.itemEdit;
					}
				},
				organizationUnitDefinition: function() {
					return $scope.organizationUnitDefinition;
				},
				addressDefinition: function() {
					return $scope.addressDefinition;
				},
				assistantOfAccountableDefinition: function() {
					return $scope.assistantOfAccountableDefinition;
				},
				accountableDefinition: function() {
					return $scope.accountableDefinition;
				},
				stockroomOrgUnisDefinition: function() {
					return $scope.stockroomOrgUnisDefinition;
				},
				stockAccountAssignmentDefinition: function() {
					return $scope.stockAccountAssignmentDefinition;
				},
				renamingsDefinition: function() {
					return $scope.renamingsDefinition;
				},
				tangibleItemConditionsDefinition: function() {
					return $scope.tangibleItemConditionsDefinition;
				},
				deliveryNotesDefinition: function() {
					return $scope.deliveryNotesDefinition;
				},
				workOrdersDefinition: function() {
					return $scope.workOrdersDefinition;
				},
				tangibleItemAmmountToolsDefinition: function() {
					return $scope.tangibleItemAmmountToolsDefinition;
				},
				productsDefinition: function() {
					return $scope.productsDefinition;
				},
				transactionLogsDefinition: function() {
					return $scope.transactionLogsDefinition;
				},
				requisitionsDefinition: function() {
					return $scope.requisitionsDefinition;
				},
				materialRetunNoteDefinition: function() {
					return $scope.materialRetunNoteDefinition;
				},
				requestForProductionDefinition: function() {
					return $scope.requestForProductionDefinition;
				},
				goodsReceivedNoteHeadingsDefinition: function() {
					return $scope.goodsReceivedNoteHeadingsDefinition;
				},
				consignmentShippingDocumentsDefinition: function() {
					return $scope.consignmentShippingDocumentsDefinition;
				},
				shippingDocumentDefinition: function() {
					return $scope.shippingDocumentDefinition;
				},
				orderItemsDefinition: function() {
					return $scope.orderItemsDefinition;
				},
				beOrderItemsDefinition: function() {
					return $scope.beOrderItemsDefinition;
				},
			}
		})
		.result.then(function(result) {
			if(!angular.isDefined(result.id)) {
				ServiceStockroom.saveCustom('stockmanagement/stockrooms', result, function(savedObject) {
					$scope.items.unshift(savedObject);
					if($scope.itemEdit !== null) {
						var index = $scope.items.map(function(it) { return it.id; }).indexOf($scope.itemEdit.id);
						$scope.items[index].isSelected = false;
					}
					$scope.itemEdit = angular.extend(savedObject);
					$scope.items[0].isSelected = true;
				});
			 } else {
				 ServiceStockroom.updateCustom('stockmanagement/stockrooms/'+result.id, result, function(savedObject) {
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


.controller('ctrlStockroomEdit',['$scope', 'Localization', '$modal', '$modalInstance', 'dialogs',
	'ServiceStockroom', 'ServiceOrganizationUnit', 'ServiceAddress', 'ServiceEmployee', 'ServiceStockroomOrgUni', 'ServiceStockAccountAssignment', 'ServiceRenaming', 'ServiceTangibleItemCondition', 'ServiceDeliveryNote', 'ServiceWorkOrder', 'ServiceTangibleItemAmmountTool', 'ServiceProduct', 'ServiceTransactionLog', 'ServiceRequisition', 'ServiceMaterialReturnNote', 'ServiceRequestForProductionItem', 'ServiceGoodsReceivedNoteHeading', 'ServiceShippingDocument', 'ServiceOrderItem', 'ServiceBEOrderItem',   'organizationUnitDefinition',  'addressDefinition',  'assistantOfAccountableDefinition',  'accountableDefinition',  'stockroomOrgUnisDefinition',  'stockAccountAssignmentDefinition',  'renamingsDefinition',  'tangibleItemConditionsDefinition',  'deliveryNotesDefinition',  'workOrdersDefinition',  'tangibleItemAmmountToolsDefinition',  'productsDefinition',  'transactionLogsDefinition',  'requisitionsDefinition',  'materialRetunNoteDefinition',  'requestForProductionDefinition',  'goodsReceivedNoteHeadingsDefinition',  'consignmentShippingDocumentsDefinition',  'shippingDocumentDefinition',  'orderItemsDefinition',  'beOrderItemsDefinition',   'itemEdit',
function($scope, Localization, $modal, $modalInstance, dialogs,
	ServiceStockroom, ServiceOrganizationUnit, ServiceAddress, ServiceEmployee, ServiceStockroomOrgUni, ServiceStockAccountAssignment, ServiceRenaming, ServiceTangibleItemCondition, ServiceDeliveryNote, ServiceWorkOrder, ServiceTangibleItemAmmountTool, ServiceProduct, ServiceTransactionLog, ServiceRequisition, ServiceMaterialReturnNote, ServiceRequestForProductionItem, ServiceGoodsReceivedNoteHeading, ServiceShippingDocument, ServiceOrderItem, ServiceBEOrderItem,  organizationUnitDefinition,  addressDefinition,  assistantOfAccountableDefinition,  accountableDefinition,  stockroomOrgUnisDefinition,  stockAccountAssignmentDefinition,  renamingsDefinition,  tangibleItemConditionsDefinition,  deliveryNotesDefinition,  workOrdersDefinition,  tangibleItemAmmountToolsDefinition,  productsDefinition,  transactionLogsDefinition,  requisitionsDefinition,  materialRetunNoteDefinition,  requestForProductionDefinition,  goodsReceivedNoteHeadingsDefinition,  consignmentShippingDocumentsDefinition,  shippingDocumentDefinition,  orderItemsDefinition,  beOrderItemsDefinition,  itemEdit) {

	// dialog mode
	$scope.mode = 'edit';

	// original item state
	var original = angular.copy(itemEdit);
	// item state
	$scope.itemEdit = angular.copy(original);

	// organizationUnit with properties
	$scope.organizationUnitDefinition = organizationUnitDefinition;
	// address with properties
	$scope.addressDefinition = addressDefinition;
	// assistantOfAccountable with properties
	$scope.assistantOfAccountableDefinition = assistantOfAccountableDefinition;
	// accountable with properties
	$scope.accountableDefinition = accountableDefinition;
	// stockroomOrgUnis with properties
	$scope.stockroomOrgUnisDefinition = stockroomOrgUnisDefinition;
	// stockAccountAssignment with properties
	$scope.stockAccountAssignmentDefinition = stockAccountAssignmentDefinition;
	// renamings with properties
	$scope.renamingsDefinition = renamingsDefinition;
	// tangibleItemConditions with properties
	$scope.tangibleItemConditionsDefinition = tangibleItemConditionsDefinition;
	// deliveryNotes with properties
	$scope.deliveryNotesDefinition = deliveryNotesDefinition;
	// workOrders with properties
	$scope.workOrdersDefinition = workOrdersDefinition;
	// tangibleItemAmmountTools with properties
	$scope.tangibleItemAmmountToolsDefinition = tangibleItemAmmountToolsDefinition;
	// products with properties
	$scope.productsDefinition = productsDefinition;
	// transactionLogs with properties
	$scope.transactionLogsDefinition = transactionLogsDefinition;
	// requisitions with properties
	$scope.requisitionsDefinition = requisitionsDefinition;
	// materialRetunNote with properties
	$scope.materialRetunNoteDefinition = materialRetunNoteDefinition;
	// requestForProduction with properties
	$scope.requestForProductionDefinition = requestForProductionDefinition;
	// goodsReceivedNoteHeadings with properties
	$scope.goodsReceivedNoteHeadingsDefinition = goodsReceivedNoteHeadingsDefinition;
	// consignmentShippingDocuments with properties
	$scope.consignmentShippingDocumentsDefinition = consignmentShippingDocumentsDefinition;
	// shippingDocument with properties
	$scope.shippingDocumentDefinition = shippingDocumentDefinition;
	// orderItems with properties
	$scope.orderItemsDefinition = orderItemsDefinition;
	// beOrderItems with properties
	$scope.beOrderItemsDefinition = beOrderItemsDefinition;

	// datepicker logic

	// date properties

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
            templateUrl: 'corporation/stockroom/tmplOrganizationUnitChoose.tpl.html',
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


	// Choose address
	$scope.openChooseAddressDialog = function() {
        $modal.open({
            backdrop: 'static',
            keyboard : false,
            templateUrl: 'environment/stockroom/tmplAddressChoose.tpl.html',
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


	// Choose assistantOfAccountable
	$scope.openChooseAssistantOfAccountableDialog = function() {
        $modal.open({
            backdrop: 'static',
            keyboard : false,
            templateUrl: 'corporation/stockroom/tmplEmployeeChoose.tpl.html',
            size: 'lg',
            controller: 'ctrlEmployeeChoose',
            windowClass: 'hmodal-info',
            resolve: {
				itemEdit: function() {
					if(angular.isDefined($scope.itemEdit.assistantOfAccountable)){
						return $scope.itemEdit.assistantOfAccountable;
					}
				}
			}
		}).result.then(function(result) {
			$scope.itemEdit.assistantOfAccountable = angular.copy(result);
		});
    };


	// Choose accountable
	$scope.openChooseAccountableDialog = function() {
        $modal.open({
            backdrop: 'static',
            keyboard : false,
            templateUrl: 'corporation/stockroom/tmplEmployeeChoose.tpl.html',
            size: 'lg',
            controller: 'ctrlEmployeeChoose',
            windowClass: 'hmodal-info',
            resolve: {
				itemEdit: function() {
					if(angular.isDefined($scope.itemEdit.accountable)){
						return $scope.itemEdit.accountable;
					}
				}
			}
		}).result.then(function(result) {
			$scope.itemEdit.accountable = angular.copy(result);
		});
    };


    $scope.stockroomOrgUniEdit = null;

    // stockroomOrgUnis table selection logic
    $scope.stockroomOrgUniSelection = function(item, index) {
        if(item.isSelected) {
            if($scope.stockroomOrgUniEdit !== null) {
                var index1 = $scope.itemEdit.stockroomOrgUnis.map(function(it) { return it.id; }).indexOf($scope.stockroomOrgUniEdit.id);
                $scope.itemEdit.stockroomOrgUnis[index1].isSelected = false;
            }
            $scope.stockroomOrgUniEdit = item;
        } else {
            $scope.stockroomOrgUniEdit = null;
            item.isSelected = false;
        }
    };

    // New/Edit stockroomOrgUnis dialog
    $scope.openStockroomOrgUniEditDialog = function(isNew) {
        $modal.open({
            backdrop: 'static',
            keyboard : false,
            templateUrl: 'stockmanagement/stockroom/tmplStockroomOrgUniEdit.tpl.html',
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
                if(!angular.isDefined($scope.itemEdit.stockroomOrgUnis)) {
                    $scope.itemEdit.stockroomOrgUnis = [];
                }
                $scope.itemEdit.stockroomOrgUnis.unshift(result);
                for(i in $scope.itemEdit.stockroomOrgUnis) {
                    $scope.itemEdit.stockroomOrgUnis[i].isSelected = false;
                }
                $scope.stockroomOrgUniEdit = angular.extend(result);
                $scope.itemEdit.stockroomOrgUnis[0].isSelected = true;
            }
            else {
                for(i in $scope.itemEdit.stockroomOrgUnis) {
                    $scope.itemEdit.stockroomOrgUnis[i].isSelected = false;
                }
                $scope.stockroomOrgUniEdit = angular.extend(result);
                var index = $scope.itemEdit.stockroomOrgUnis.map(function(it) { return it.id; }).indexOf(result.id);
                for(var key in result) {
                    $scope.itemEdit.stockroomOrgUnis[index][key] = result[key];
                }
                $scope.itemEdit.stockroomOrgUnis[index].isSelected = true;
            }
        });
    };

    $scope.removeStockroomOrgUni = function(item) {
        var dialog = dialogs.confirm('Please confirm', 'Are you sure you want to delete item?');
        dialog.result.then(function(btn) {
            var removeIndex = $scope.itemEdit.stockroomOrgUnis.map(function(it) { return it.id; }).indexOf(item.id);
            $scope.itemEdit.stockroomOrgUnis[removeIndex].deleted = true;
        });
    };


    $scope.stockAccountAssignmentEdit = null;

    // stockAccountAssignment table selection logic
    $scope.stockAccountAssignmentSelection = function(item, index) {
        if(item.isSelected) {
            if($scope.stockAccountAssignmentEdit !== null) {
                var index1 = $scope.itemEdit.stockAccountAssignment.map(function(it) { return it.id; }).indexOf($scope.stockAccountAssignmentEdit.id);
                $scope.itemEdit.stockAccountAssignment[index1].isSelected = false;
            }
            $scope.stockAccountAssignmentEdit = item;
        } else {
            $scope.stockAccountAssignmentEdit = null;
            item.isSelected = false;
        }
    };

    // New/Edit stockAccountAssignment dialog
    $scope.openStockAccountAssignmentEditDialog = function(isNew) {
        $modal.open({
            backdrop: 'static',
            keyboard : false,
            templateUrl: 'stockmanagement/stockroom/tmplStockAccountAssignmentEdit.tpl.html',
            size: 'lg',
            controller: 'ctrlStockAccountAssignmentEdit',
            windowClass: 'hmodal-info',
            resolve: {
                itemEdit: function() {
                    if(isNew) {
                        return new ServiceStockAccountAssignment();
                    } else {
                        return $scope.stockAccountAssignmentEdit;
                    }
                }
            }
        }).result.then(function(result) {
            var i;
            if(isNew) {
                if(!angular.isDefined($scope.itemEdit.stockAccountAssignment)) {
                    $scope.itemEdit.stockAccountAssignment = [];
                }
                $scope.itemEdit.stockAccountAssignment.unshift(result);
                for(i in $scope.itemEdit.stockAccountAssignment) {
                    $scope.itemEdit.stockAccountAssignment[i].isSelected = false;
                }
                $scope.stockAccountAssignmentEdit = angular.extend(result);
                $scope.itemEdit.stockAccountAssignment[0].isSelected = true;
            }
            else {
                for(i in $scope.itemEdit.stockAccountAssignment) {
                    $scope.itemEdit.stockAccountAssignment[i].isSelected = false;
                }
                $scope.stockAccountAssignmentEdit = angular.extend(result);
                var index = $scope.itemEdit.stockAccountAssignment.map(function(it) { return it.id; }).indexOf(result.id);
                for(var key in result) {
                    $scope.itemEdit.stockAccountAssignment[index][key] = result[key];
                }
                $scope.itemEdit.stockAccountAssignment[index].isSelected = true;
            }
        });
    };

    $scope.removeStockAccountAssignment = function(item) {
        var dialog = dialogs.confirm('Please confirm', 'Are you sure you want to delete item?');
        dialog.result.then(function(btn) {
            var removeIndex = $scope.itemEdit.stockAccountAssignment.map(function(it) { return it.id; }).indexOf(item.id);
            $scope.itemEdit.stockAccountAssignment[removeIndex].deleted = true;
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
            templateUrl: 'stockmanagement/stockroom/tmplTangibleItemAmmountToolEdit.tpl.html',
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


	// Save Button
	$scope.save = function() {
	   //	delete $scope.itemEdit.isSelected;
        var item;
        var i;
        for(i in $scope.itemEdit.renamings) {
    		item = $scope.itemEdit.renamings[i];
    		delete item.isSelected;
    	}
        for(i in $scope.itemEdit.tangibleItemConditions) {
    		item = $scope.itemEdit.tangibleItemConditions[i];
    		delete item.isSelected;
    	}
        for(i in $scope.itemEdit.deliveryNotes) {
    		item = $scope.itemEdit.deliveryNotes[i];
    		delete item.isSelected;
    	}
        for(i in $scope.itemEdit.workOrders) {
    		item = $scope.itemEdit.workOrders[i];
    		delete item.isSelected;
    	}
        for(i in $scope.itemEdit.products) {
    		item = $scope.itemEdit.products[i];
    		delete item.isSelected;
    	}
        for(i in $scope.itemEdit.transactionLogs) {
    		item = $scope.itemEdit.transactionLogs[i];
    		delete item.isSelected;
    	}
        for(i in $scope.itemEdit.requisitions) {
    		item = $scope.itemEdit.requisitions[i];
    		delete item.isSelected;
    	}
        for(i in $scope.itemEdit.materialRetunNote) {
    		item = $scope.itemEdit.materialRetunNote[i];
    		delete item.isSelected;
    	}
        for(i in $scope.itemEdit.requestForProduction) {
    		item = $scope.itemEdit.requestForProduction[i];
    		delete item.isSelected;
    	}
        for(i in $scope.itemEdit.goodsReceivedNoteHeadings) {
    		item = $scope.itemEdit.goodsReceivedNoteHeadings[i];
    		delete item.isSelected;
    	}
        for(i in $scope.itemEdit.consignmentShippingDocuments) {
    		item = $scope.itemEdit.consignmentShippingDocuments[i];
    		delete item.isSelected;
    	}
        for(i in $scope.itemEdit.shippingDocument) {
    		item = $scope.itemEdit.shippingDocument[i];
    		delete item.isSelected;
    	}
        for(i in $scope.itemEdit.orderItems) {
    		item = $scope.itemEdit.orderItems[i];
    		delete item.isSelected;
    	}
        for(i in $scope.itemEdit.beOrderItems) {
    		item = $scope.itemEdit.beOrderItems[i];
    		delete item.isSelected;
    	}
		$modalInstance.close($scope.itemEdit);
	};


	$scope.canSave = function() {
		var item = $scope.itemEdit;
		return                 item.SCode  &&                 item.SName  &&                 item.SFullName  &&                 item.SType  &&                 item.SConditions  ;
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


.controller('ctrlStockroomChoose', ['$scope','ServiceStockroom', 'dialogs', '$modal', '$modalInstance', 'itemEdit',
function($scope, ServiceStockroom, dialogs, $modal,  $modalInstance, itemEdit) {

    // entity with properties
    $scope.itemDefinition = {
        label: 'stock.stockroom',
        properties: [
            { label: 'sCode', name:'SCode', inTable:  true  },
            { label: 'sName', name:'SName', inTable:  true  },
            { label: 'sFullName', name:'SFullName', inTable:  true  },
            { label: 'sType', name:'SType', inTable:  true  },
            { label: 'sConditions', name:'SConditions', inTable:  true  },
        ]
    };

	$scope.items = [];
	$scope.itemEdit = {};

	// fill table with data
	$scope.loaded = false;
	var getStockrooms = function() {
		if(!$scope.loaded && $scope.items.length === 0) {
			$scope.isLoading = true;
			ServiceStockroom.query(function(data) {
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
	getStockrooms();

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