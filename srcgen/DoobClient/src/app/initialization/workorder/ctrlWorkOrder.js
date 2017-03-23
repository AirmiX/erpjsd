'use strict';

angular.module('Doob.initialization')


.controller('ctrlWorkOrder',['$scope', '$rootScope', '$modal', 'dialogs', 'CheckSelected', 'ServiceWorkOrder',
    function($scope, $rootScope, $modal, dialogs, CheckSelected, ServiceWorkOrder) {

	// main entity (workOrder) properties names and labels
	$scope.itemDefinition = {
		label: 'initialization.workOrder',
		properties: [
			{ label: 'wOCode', name:'WOCode', inTable:  true  },
			{ label: 'wOCreationDate', name:'WOCreationDate', inTable:  true  },
			{ label: 'wOScheduledDate', name:'WOScheduledDate', inTable:  true  },
			{ label: 'wOLunchingProductionDate', name:'WOLunchingProductionDate', inTable:  false  },
			{ label: 'wOFinishingDate', name:'WOFinishingDate', inTable:  false  },
			{ label: 'wOCalculationDate', name:'WOCalculationDate', inTable:  false  },
			{ label: 'wOLuanchedQuantity', name:'WOLuanchedQuantity', inTable:  true  },
			{ label: 'wOAcceptedQuantity', name:'WOAcceptedQuantity', inTable:  true  },
			{ label: 'wORejectedQuantity', name:'WORejectedQuantity', inTable:  true  },
			{ label: 'wOZanovljenaQuantity', name:'WOZanovljenaQuantity', inTable:  true  },
			{ label: 'wOCalculationStatus', name:'WOCalculationStatus', inTable:  true  },
			{ label: 'wOPrintingStatus', name:'WOPrintingStatus', inTable:  false  },
			{ label: 'wOCurrentNumber', name:'WOCurrentNumber', inTable:  false  },
			{ label: 'wOPrintingReceipt', name:'WOPrintingReceipt', inTable:  false  },
			{ label: 'wOTransferredMaterial', name:'WOTransferredMaterial', inTable:  false  },
			{ label: 'wOSellingPrice', name:'WOSellingPrice', inTable:  false  },
			{ label: 'wOLansiranaKnjigovodstvena', name:'WOLansiranaKnjigovodstvena', inTable:  false  },
			{ label: 'wOPrescribedQuantity', name:'WOPrescribedQuantity', inTable:  false  },
			{ label: 'wOClosed', name:'WOClosed', inTable:  false  },
			{ label: 'wOTechnologicalProcessType', name:'WOTechnologicalProcessType', inTable:  false  },
			{ label: 'wOMarketStatus', name:'WOMarketStatus', inTable:  false  },
			{ label: 'wOPriorityStatus', name:'WOPriorityStatus', inTable:  false  },
			{ label: 'wOLucnhedDocumentStatus', name:'WOLucnhedDocumentStatus', inTable:  false  },
			{ label: 'wODirectLaborCost', name:'WODirectLaborCost', inTable:  false  },
			{ label: 'wOEffectiveOperatingTime', name:'WOEffectiveOperatingTime', inTable:  false  },
			{ label: 'wOStandardizedOperatingTime', name:'WOStandardizedOperatingTime', inTable:  false  },
			{ label: 'wODirectMaterialCost', name:'WODirectMaterialCost', inTable:  false  },
			{ label: 'wOServiceCost', name:'WOServiceCost', inTable:  false  },
			{ label: 'wOGeneralCost', name:'WOGeneralCost', inTable:  false  },
			{ label: 'wOGeneralMaterialCost', name:'WOGeneralMaterialCost', inTable:  false  },
			{ label: 'wOInvoicingStatus', name:'WOInvoicingStatus', inTable:  false  },
			{ label: 'wOImplementationValue', name:'WOImplementationValue', inTable:  false  },
			{ label: 'tISDesignation', name:'TISDesignation', inTable:  true  },
		]
	};

	// productStatus with properties names and labels
	$scope.productStatusDefinition = {
		label: 'stockmanagement.productStatus',
		properties : [
			{ label: 'pSDesignation', name:'PSDesignation' },
			{ label: 'pSDescription', name:'PSDescription' },
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
	// tangibleItemStatus with properties names and labels
	$scope.tangibleItemStatusDefinition = {
		label: 'stockmanagement.tangibleItemStatus',
		properties : [
			{ label: 'tISDesignation', name:'TISDesignation' },
			{ label: 'tISName', name:'TISName' },
		]
	};
	// identification with properties names and labels
	$scope.identificationDefinition = {
		label: 'commonbusinessentities.identification',
		properties : [
			{ label: 'iIdentificationCode', name:'IIdentificationCode' },
		]
	};
	// productionUnit with properties names and labels
	$scope.productionUnitDefinition = {
		label: 'corporation.organizationUnit',
		properties : [
			{ label: 'oUIdentificationCode', name:'OUIdentificationCode' },
			{ label: 'oUName', name:'OUName' },
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
	// procurementRequestHeadings with properties names and labels
	$scope.procurementRequestHeadingsDefinition = {
		label: 'initialization.procurementRequestHeading',
		properties : [
			{ label: 'pRHCode', name:'PRHCode' },
			{ label: 'pRHCreationDate', name:'PRHCreationDate' },
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
	// deliveryNotes with properties names and labels
	$scope.deliveryNotesDefinition = {
		label: 'stockmanagement.deliveryNote',
		properties : [
			{ label: 'dNDocumentNumber', name:'DNDocumentNumber' },
			{ label: 'dNDeliveryDate', name:'DNDeliveryDate' },
			{ label: 'dNDocumentStatus', name:'DNDocumentStatus' },
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

	// fill table with data
	$scope.items = [];
	$scope.loaded = false;
	var getWorkOrders = function() {
		if(!$scope.loaded && $scope.items.length === 0) {
			$scope.isLoading = true;
			ServiceWorkOrder.query(function(data) {
				$scope.items = data;
				$scope.isLoading = false;
				$scope.loaded = true;
			});
		}
	};
	getWorkOrders();

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

	$scope.$watch('WorkOrderCollection', function() {
		$scope.itemEdit = CheckSelected.checkSelectedInTable($scope.itemEdit, $scope.WorkOrderCollection, $scope.items);
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
			templateUrl: 'initialization/workorder/tmplWorkOrderEdit.tpl.html',
			size: 'lg',
			windowClass: 'hmodal-info',
			controller: 'ctrlWorkOrderEdit',
			resolve: {
				itemEdit: function() {
					if(isNew) {
						return new ServiceWorkOrder();
					} else {
						return $scope.itemEdit;
					}
				},
				productStatusDefinition: function() {
					return $scope.productStatusDefinition;
				},
				organizationUnitDefinition: function() {
					return $scope.organizationUnitDefinition;
				},
				stockroomDefinition: function() {
					return $scope.stockroomDefinition;
				},
				tangibleItemStatusDefinition: function() {
					return $scope.tangibleItemStatusDefinition;
				},
				identificationDefinition: function() {
					return $scope.identificationDefinition;
				},
				productionUnitDefinition: function() {
					return $scope.productionUnitDefinition;
				},
				documentTypeDefinition: function() {
					return $scope.documentTypeDefinition;
				},
				procurementRequestHeadingsDefinition: function() {
					return $scope.procurementRequestHeadingsDefinition;
				},
				requisitionsDefinition: function() {
					return $scope.requisitionsDefinition;
				},
				deliveryNotesDefinition: function() {
					return $scope.deliveryNotesDefinition;
				},
				materialReturnNotesDefinition: function() {
					return $scope.materialReturnNotesDefinition;
				},
			}
		})
		.result.then(function(result) {
			if(!angular.isDefined(result.id)) {
				ServiceWorkOrder.saveCustom('stockmanagement/workorders', result, function(savedObject) {
					$scope.items.unshift(savedObject);
					if($scope.itemEdit !== null) {
						var index = $scope.items.map(function(it) { return it.id; }).indexOf($scope.itemEdit.id);
						$scope.items[index].isSelected = false;
					}
					$scope.itemEdit = angular.extend(savedObject);
					$scope.items[0].isSelected = true;
				});
			 } else {
				 ServiceWorkOrder.updateCustom('stockmanagement/workorders/'+result.id, result, function(savedObject) {
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


.controller('ctrlWorkOrderEdit',['$scope', 'Localization', '$modal', '$modalInstance', 'dialogs',
	'ServiceWorkOrder', 'ServiceProductStatus', 'ServiceOrganizationUnit', 'ServiceStockroom', 'ServiceTangibleItemStatus', 'ServiceIdentification', 'ServiceDocumentType', 'ServiceProcurementRequestHeading', 'ServiceRequisition', 'ServiceDeliveryNote', 'ServiceMaterialReturnNote',   'productStatusDefinition',  'organizationUnitDefinition',  'stockroomDefinition',  'tangibleItemStatusDefinition',  'identificationDefinition',  'productionUnitDefinition',  'documentTypeDefinition',  'procurementRequestHeadingsDefinition',  'requisitionsDefinition',  'deliveryNotesDefinition',  'materialReturnNotesDefinition',   'itemEdit',
function($scope, Localization, $modal, $modalInstance, dialogs,
	ServiceWorkOrder, ServiceProductStatus, ServiceOrganizationUnit, ServiceStockroom, ServiceTangibleItemStatus, ServiceIdentification, ServiceDocumentType, ServiceProcurementRequestHeading, ServiceRequisition, ServiceDeliveryNote, ServiceMaterialReturnNote,  productStatusDefinition,  organizationUnitDefinition,  stockroomDefinition,  tangibleItemStatusDefinition,  identificationDefinition,  productionUnitDefinition,  documentTypeDefinition,  procurementRequestHeadingsDefinition,  requisitionsDefinition,  deliveryNotesDefinition,  materialReturnNotesDefinition,  itemEdit) {

	// dialog mode
	$scope.mode = 'edit';

	// original item state
	var original = angular.copy(itemEdit);
	// item state
	$scope.itemEdit = angular.copy(original);

	// productStatus with properties
	$scope.productStatusDefinition = productStatusDefinition;
	// organizationUnit with properties
	$scope.organizationUnitDefinition = organizationUnitDefinition;
	// stockroom with properties
	$scope.stockroomDefinition = stockroomDefinition;
	// tangibleItemStatus with properties
	$scope.tangibleItemStatusDefinition = tangibleItemStatusDefinition;
	// identification with properties
	$scope.identificationDefinition = identificationDefinition;
	// productionUnit with properties
	$scope.productionUnitDefinition = productionUnitDefinition;
	// documentType with properties
	$scope.documentTypeDefinition = documentTypeDefinition;
	// procurementRequestHeadings with properties
	$scope.procurementRequestHeadingsDefinition = procurementRequestHeadingsDefinition;
	// requisitions with properties
	$scope.requisitionsDefinition = requisitionsDefinition;
	// deliveryNotes with properties
	$scope.deliveryNotesDefinition = deliveryNotesDefinition;
	// materialReturnNotes with properties
	$scope.materialReturnNotesDefinition = materialReturnNotesDefinition;

	// datepicker logic

	// date properties
	$scope.openedWOCreationDate = false;
	$scope.openedWOScheduledDate = false;
	$scope.openedWOLunchingProductionDate = false;
	$scope.openedWOFinishingDate = false;
	$scope.openedWOCalculationDate = false;

	$scope.open = function($event, opened) {
		$event.preventDefault();
		$event.stopPropagation();
		$scope[opened] = true;
	};



	// Choose productStatus
	$scope.openChooseProductStatusDialog = function() {
        $modal.open({
            backdrop: 'static',
            keyboard : false,
            templateUrl: 'stockmanagement/workorder/tmplProductStatusChoose.tpl.html',
            size: 'lg',
            controller: 'ctrlProductStatusChoose',
            windowClass: 'hmodal-info',
            resolve: {
				itemEdit: function() {
					if(angular.isDefined($scope.itemEdit.productStatus)){
						return $scope.itemEdit.productStatus;
					}
				}
			}
		}).result.then(function(result) {
			$scope.itemEdit.productStatus = angular.copy(result);
		});
    };


	// Choose organizationUnit
	$scope.openChooseOrganizationUnitDialog = function() {
        $modal.open({
            backdrop: 'static',
            keyboard : false,
            templateUrl: 'corporation/workorder/tmplOrganizationUnitChoose.tpl.html',
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


	// Choose stockroom
	$scope.openChooseStockroomDialog = function() {
        $modal.open({
            backdrop: 'static',
            keyboard : false,
            templateUrl: 'stock/workorder/tmplStockroomChoose.tpl.html',
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


	// Choose tangibleItemStatus
	$scope.openChooseTangibleItemStatusDialog = function() {
        $modal.open({
            backdrop: 'static',
            keyboard : false,
            templateUrl: 'stockmanagement/workorder/tmplTangibleItemStatusChoose.tpl.html',
            size: 'lg',
            controller: 'ctrlTangibleItemStatusChoose',
            windowClass: 'hmodal-info',
            resolve: {
				itemEdit: function() {
					if(angular.isDefined($scope.itemEdit.tangibleItemStatus)){
						return $scope.itemEdit.tangibleItemStatus;
					}
				}
			}
		}).result.then(function(result) {
			$scope.itemEdit.tangibleItemStatus = angular.copy(result);
		});
    };


	// Choose identification
	$scope.openChooseIdentificationDialog = function() {
        $modal.open({
            backdrop: 'static',
            keyboard : false,
            templateUrl: 'commonbusinessentities/workorder/tmplIdentificationChoose.tpl.html',
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


	// Choose productionUnit
	$scope.openChooseProductionUnitDialog = function() {
        $modal.open({
            backdrop: 'static',
            keyboard : false,
            templateUrl: 'corporation/workorder/tmplOrganizationUnitChoose.tpl.html',
            size: 'lg',
            controller: 'ctrlOrganizationUnitChoose',
            windowClass: 'hmodal-info',
            resolve: {
				itemEdit: function() {
					if(angular.isDefined($scope.itemEdit.productionUnit)){
						return $scope.itemEdit.productionUnit;
					}
				}
			}
		}).result.then(function(result) {
			$scope.itemEdit.productionUnit = angular.copy(result);
		});
    };


	// Choose documentType
	$scope.openChooseDocumentTypeDialog = function() {
        $modal.open({
            backdrop: 'static',
            keyboard : false,
            templateUrl: 'corporation/workorder/tmplDocumentTypeChoose.tpl.html',
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


	// Save Button
	$scope.save = function() {
		correctDateTime($scope.itemEdit.WOCreationDate);
		correctDateTime($scope.itemEdit.WOScheduledDate);
		correctDateTime($scope.itemEdit.WOLunchingProductionDate);
		correctDateTime($scope.itemEdit.WOFinishingDate);
		correctDateTime($scope.itemEdit.WOCalculationDate);
	   //	delete $scope.itemEdit.isSelected;
        var item;
        var i;
        for(i in $scope.itemEdit.procurementRequestHeadings) {
    		item = $scope.itemEdit.procurementRequestHeadings[i];
    		delete item.isSelected;
    	}
        for(i in $scope.itemEdit.requisitions) {
    		item = $scope.itemEdit.requisitions[i];
    		delete item.isSelected;
    	}
        for(i in $scope.itemEdit.deliveryNotes) {
    		item = $scope.itemEdit.deliveryNotes[i];
    		delete item.isSelected;
    	}
        for(i in $scope.itemEdit.materialReturnNotes) {
    		item = $scope.itemEdit.materialReturnNotes[i];
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
		return                 item.WOCode  &&                 item.WOCreationDate  &&                 item.WOScheduledDate  &&                 item.WOLuanchedQuantity  &&                 item.WOAcceptedQuantity  &&                 item.WORejectedQuantity  &&                 item.WOZanovljenaQuantity  &&                 item.WOCalculationStatus  &&                 item.TISDesignation  ;
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


.controller('ctrlWorkOrderChoose', ['$scope','ServiceWorkOrder', 'dialogs', '$modal', '$modalInstance', 'itemEdit',
function($scope, ServiceWorkOrder, dialogs, $modal,  $modalInstance, itemEdit) {

    // entity with properties
    $scope.itemDefinition = {
        label: 'initialization.workOrder',
        properties: [
            { label: 'wOCode', name:'WOCode', inTable:  true  },
            { label: 'wOCreationDate', name:'WOCreationDate', inTable:  true  },
            { label: 'wOScheduledDate', name:'WOScheduledDate', inTable:  true  },
            { label: 'wOLunchingProductionDate', name:'WOLunchingProductionDate', inTable:  false  },
            { label: 'wOFinishingDate', name:'WOFinishingDate', inTable:  false  },
            { label: 'wOCalculationDate', name:'WOCalculationDate', inTable:  false  },
            { label: 'wOLuanchedQuantity', name:'WOLuanchedQuantity', inTable:  true  },
            { label: 'wOAcceptedQuantity', name:'WOAcceptedQuantity', inTable:  true  },
            { label: 'wORejectedQuantity', name:'WORejectedQuantity', inTable:  true  },
            { label: 'wOZanovljenaQuantity', name:'WOZanovljenaQuantity', inTable:  true  },
            { label: 'wOCalculationStatus', name:'WOCalculationStatus', inTable:  true  },
            { label: 'wOPrintingStatus', name:'WOPrintingStatus', inTable:  false  },
            { label: 'wOCurrentNumber', name:'WOCurrentNumber', inTable:  false  },
            { label: 'wOPrintingReceipt', name:'WOPrintingReceipt', inTable:  false  },
            { label: 'wOTransferredMaterial', name:'WOTransferredMaterial', inTable:  false  },
            { label: 'wOSellingPrice', name:'WOSellingPrice', inTable:  false  },
            { label: 'wOLansiranaKnjigovodstvena', name:'WOLansiranaKnjigovodstvena', inTable:  false  },
            { label: 'wOPrescribedQuantity', name:'WOPrescribedQuantity', inTable:  false  },
            { label: 'wOClosed', name:'WOClosed', inTable:  false  },
            { label: 'wOTechnologicalProcessType', name:'WOTechnologicalProcessType', inTable:  false  },
            { label: 'wOMarketStatus', name:'WOMarketStatus', inTable:  false  },
            { label: 'wOPriorityStatus', name:'WOPriorityStatus', inTable:  false  },
            { label: 'wOLucnhedDocumentStatus', name:'WOLucnhedDocumentStatus', inTable:  false  },
            { label: 'wODirectLaborCost', name:'WODirectLaborCost', inTable:  false  },
            { label: 'wOEffectiveOperatingTime', name:'WOEffectiveOperatingTime', inTable:  false  },
            { label: 'wOStandardizedOperatingTime', name:'WOStandardizedOperatingTime', inTable:  false  },
            { label: 'wODirectMaterialCost', name:'WODirectMaterialCost', inTable:  false  },
            { label: 'wOServiceCost', name:'WOServiceCost', inTable:  false  },
            { label: 'wOGeneralCost', name:'WOGeneralCost', inTable:  false  },
            { label: 'wOGeneralMaterialCost', name:'WOGeneralMaterialCost', inTable:  false  },
            { label: 'wOInvoicingStatus', name:'WOInvoicingStatus', inTable:  false  },
            { label: 'wOImplementationValue', name:'WOImplementationValue', inTable:  false  },
            { label: 'tISDesignation', name:'TISDesignation', inTable:  true  },
        ]
    };

	$scope.items = [];
	$scope.itemEdit = {};

	// fill table with data
	$scope.loaded = false;
	var getWorkOrders = function() {
		if(!$scope.loaded && $scope.items.length === 0) {
			$scope.isLoading = true;
			ServiceWorkOrder.query(function(data) {
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
	getWorkOrders();

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