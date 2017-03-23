'use strict';

angular.module('Doob.stockmanagement')


.controller('ctrlGoodsReceivedNoteHeading',['$scope', '$rootScope', '$modal', 'dialogs', 'CheckSelected', 'ServiceGoodsReceivedNoteHeading',
    function($scope, $rootScope, $modal, dialogs, CheckSelected, ServiceGoodsReceivedNoteHeading) {

	// main entity (goodsReceivedNoteHeading) properties names and labels
	$scope.itemDefinition = {
		label: 'stockmanagement.goodsReceivedNoteHeading',
		properties: [
			{ label: 'gRNHNumber', name:'GRNHNumber', inTable:  true  },
			{ label: 'gRNHWaybillNumber', name:'GRNHWaybillNumber', inTable:  false  },
			{ label: 'gRNHSupplierShippingDocument', name:'GRNHSupplierShippingDocument', inTable:  true  },
			{ label: 'gRNHShippingDocumentDate', name:'GRNHShippingDocumentDate', inTable:  true  },
			{ label: 'gRNHArrivalDate', name:'GRNHArrivalDate', inTable:  true  },
			{ label: 'gRNHInvoiceNumber', name:'GRNHInvoiceNumber', inTable:  false  },
			{ label: 'gRNHInvoiceDate', name:'GRNHInvoiceDate', inTable:  false  },
			{ label: 'gRNHBookkeepingDate', name:'GRNHBookkeepingDate', inTable:  false  },
			{ label: 'gRNHRemark', name:'GRNHRemark', inTable:  false  },
			{ label: 'gRNHStornoDocumentNumber', name:'GRNHStornoDocumentNumber', inTable:  false  },
			{ label: 'gRNHCompletionStatus', name:'GRNHCompletionStatus', inTable:  true  },
			{ label: 'gRNHPrintStatus', name:'GRNHPrintStatus', inTable:  true  },
			{ label: 'gRNHPrintDate', name:'GRNHPrintDate', inTable:  false  },
			{ label: 'gRNHTransactionLogPrint', name:'GRNHTransactionLogPrint', inTable:  false  },
			{ label: 'gRNHOldDocument', name:'GRNHOldDocument', inTable:  false  },
			{ label: 'gRNHRemarkKvant', name:'GRNHRemarkKvant', inTable:  false  },
			{ label: 'gRNHNotificationNumber', name:'GRNHNotificationNumber', inTable:  false  },
			{ label: 'gRNHReclamationNumber', name:'GRNHReclamationNumber', inTable:  false  },
			{ label: 'gRNHReclamationNumberKvant', name:'GRNHReclamationNumberKvant', inTable:  false  },
			{ label: 'gRNHConclusionPrint', name:'GRNHConclusionPrint', inTable:  false  },
			{ label: 'gRNHTransactionLog', name:'GRNHTransactionLog', inTable:  false  },
			{ label: 'gRNHCurrency', name:'GRNHCurrency', inTable:  false  },
			{ label: 'gRNHCalculationStatus', name:'GRNHCalculationStatus', inTable:  false  },
			{ label: 'gRNHThisYear', name:'GRNHThisYear', inTable:  false  },
			{ label: 'gRNHByShippingDocument', name:'GRNHByShippingDocument', inTable:  false  },
			{ label: 'gRNHBookkeepingStatus', name:'GRNHBookkeepingStatus', inTable:  false  },
		]
	};

	// supplier with properties names and labels
	$scope.supplierDefinition = {
		label: 'commonbusinessentities.identification',
		properties : [
			{ label: 'iIdentificationCode', name:'IIdentificationCode' },
		]
	};
	// orderSupplierHeading with properties names and labels
	$scope.orderSupplierHeadingDefinition = {
		label: 'logical.orderSupplierHeading',
		properties : [
			{ label: 'oSHNumber', name:'OSHNumber' },
			{ label: 'oSHDate', name:'OSHDate' },
			{ label: 'oSHApprovalDate', name:'OSHApprovalDate' },
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
	// deliveryMethod with properties names and labels
	$scope.deliveryMethodDefinition = {
		label: 'order.deliveryMethod',
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

	// fill table with data
	$scope.items = [];
	$scope.loaded = false;
	var getGoodsReceivedNoteHeadings = function() {
		if(!$scope.loaded && $scope.items.length === 0) {
			$scope.isLoading = true;
			ServiceGoodsReceivedNoteHeading.query(function(data) {
				$scope.items = data;
				$scope.isLoading = false;
				$scope.loaded = true;
			});
		}
	};
	getGoodsReceivedNoteHeadings();

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

	$scope.$watch('GoodsReceivedNoteHeadingCollection', function() {
		$scope.itemEdit = CheckSelected.checkSelectedInTable($scope.itemEdit, $scope.GoodsReceivedNoteHeadingCollection, $scope.items);
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
			templateUrl: 'stockmanagement/goodsreceivednoteheading/tmplGoodsReceivedNoteHeadingEdit.tpl.html',
			size: 'lg',
			windowClass: 'hmodal-info',
			controller: 'ctrlGoodsReceivedNoteHeadingEdit',
			resolve: {
				itemEdit: function() {
					if(isNew) {
						return new ServiceGoodsReceivedNoteHeading();
					} else {
						return $scope.itemEdit;
					}
				},
				supplierDefinition: function() {
					return $scope.supplierDefinition;
				},
				orderSupplierHeadingDefinition: function() {
					return $scope.orderSupplierHeadingDefinition;
				},
				documentTypeDefinition: function() {
					return $scope.documentTypeDefinition;
				},
				deliveryMethodDefinition: function() {
					return $scope.deliveryMethodDefinition;
				},
				organizationUnitDefinition: function() {
					return $scope.organizationUnitDefinition;
				},
				stockroomDefinition: function() {
					return $scope.stockroomDefinition;
				},
				goodsReceivedNoteItemsDefinition: function() {
					return $scope.goodsReceivedNoteItemsDefinition;
				},
			}
		})
		.result.then(function(result) {
			if(!angular.isDefined(result.id)) {
				ServiceGoodsReceivedNoteHeading.saveCustom('stockmanagement/goodsreceivednoteheadings', result, function(savedObject) {
					$scope.items.unshift(savedObject);
					if($scope.itemEdit !== null) {
						var index = $scope.items.map(function(it) { return it.id; }).indexOf($scope.itemEdit.id);
						$scope.items[index].isSelected = false;
					}
					$scope.itemEdit = angular.extend(savedObject);
					$scope.items[0].isSelected = true;
				});
			 } else {
				 ServiceGoodsReceivedNoteHeading.updateCustom('stockmanagement/goodsreceivednoteheadings/'+result.id, result, function(savedObject) {
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


.controller('ctrlGoodsReceivedNoteHeadingEdit',['$scope', 'Localization', '$modal', '$modalInstance', 'dialogs',
	'ServiceGoodsReceivedNoteHeading', 'ServiceIdentification', 'ServiceOrderSupplierHeading', 'ServiceDocumentType', 'ServiceDeliveryMethod', 'ServiceOrganizationUnit', 'ServiceStockroom', 'ServiceGoodsReceivedNoteItem',   'supplierDefinition',  'orderSupplierHeadingDefinition',  'documentTypeDefinition',  'deliveryMethodDefinition',  'organizationUnitDefinition',  'stockroomDefinition',  'goodsReceivedNoteItemsDefinition',   'itemEdit',
function($scope, Localization, $modal, $modalInstance, dialogs,
	ServiceGoodsReceivedNoteHeading, ServiceIdentification, ServiceOrderSupplierHeading, ServiceDocumentType, ServiceDeliveryMethod, ServiceOrganizationUnit, ServiceStockroom, ServiceGoodsReceivedNoteItem,  supplierDefinition,  orderSupplierHeadingDefinition,  documentTypeDefinition,  deliveryMethodDefinition,  organizationUnitDefinition,  stockroomDefinition,  goodsReceivedNoteItemsDefinition,  itemEdit) {

	// dialog mode
	$scope.mode = 'edit';

	// original item state
	var original = angular.copy(itemEdit);
	// item state
	$scope.itemEdit = angular.copy(original);

	// supplier with properties
	$scope.supplierDefinition = supplierDefinition;
	// orderSupplierHeading with properties
	$scope.orderSupplierHeadingDefinition = orderSupplierHeadingDefinition;
	// documentType with properties
	$scope.documentTypeDefinition = documentTypeDefinition;
	// deliveryMethod with properties
	$scope.deliveryMethodDefinition = deliveryMethodDefinition;
	// organizationUnit with properties
	$scope.organizationUnitDefinition = organizationUnitDefinition;
	// stockroom with properties
	$scope.stockroomDefinition = stockroomDefinition;
	// goodsReceivedNoteItems with properties
	$scope.goodsReceivedNoteItemsDefinition = goodsReceivedNoteItemsDefinition;

	// datepicker logic

	// date properties
	$scope.openedGRNHShippingDocumentDate = false;
	$scope.openedGRNHArrivalDate = false;
	$scope.openedGRNHInvoiceDate = false;
	$scope.openedGRNHBookkeepingDate = false;
	$scope.openedGRNHPrintDate = false;

	$scope.open = function($event, opened) {
		$event.preventDefault();
		$event.stopPropagation();
		$scope[opened] = true;
	};



	// Choose supplier
	$scope.openChooseSupplierDialog = function() {
        $modal.open({
            backdrop: 'static',
            keyboard : false,
            templateUrl: 'commonbusinessentities/goodsreceivednoteheading/tmplIdentificationChoose.tpl.html',
            size: 'lg',
            controller: 'ctrlIdentificationChoose',
            windowClass: 'hmodal-info',
            resolve: {
				itemEdit: function() {
					if(angular.isDefined($scope.itemEdit.supplier)){
						return $scope.itemEdit.supplier;
					}
				}
			}
		}).result.then(function(result) {
			$scope.itemEdit.supplier = angular.copy(result);
		});
    };


	// Choose orderSupplierHeading
	$scope.openChooseOrderSupplierHeadingDialog = function() {
        $modal.open({
            backdrop: 'static',
            keyboard : false,
            templateUrl: 'logical/goodsreceivednoteheading/tmplOrderSupplierHeadingChoose.tpl.html',
            size: 'lg',
            controller: 'ctrlOrderSupplierHeadingChoose',
            windowClass: 'hmodal-info',
            resolve: {
				itemEdit: function() {
					if(angular.isDefined($scope.itemEdit.orderSupplierHeading)){
						return $scope.itemEdit.orderSupplierHeading;
					}
				}
			}
		}).result.then(function(result) {
			$scope.itemEdit.orderSupplierHeading = angular.copy(result);
		});
    };


	// Choose documentType
	$scope.openChooseDocumentTypeDialog = function() {
        $modal.open({
            backdrop: 'static',
            keyboard : false,
            templateUrl: 'corporation/goodsreceivednoteheading/tmplDocumentTypeChoose.tpl.html',
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


	// Choose deliveryMethod
	$scope.openChooseDeliveryMethodDialog = function() {
        $modal.open({
            backdrop: 'static',
            keyboard : false,
            templateUrl: 'order/goodsreceivednoteheading/tmplDeliveryMethodChoose.tpl.html',
            size: 'lg',
            controller: 'ctrlDeliveryMethodChoose',
            windowClass: 'hmodal-info',
            resolve: {
				itemEdit: function() {
					if(angular.isDefined($scope.itemEdit.deliveryMethod)){
						return $scope.itemEdit.deliveryMethod;
					}
				}
			}
		}).result.then(function(result) {
			$scope.itemEdit.deliveryMethod = angular.copy(result);
		});
    };


	// Choose organizationUnit
	$scope.openChooseOrganizationUnitDialog = function() {
        $modal.open({
            backdrop: 'static',
            keyboard : false,
            templateUrl: 'corporation/goodsreceivednoteheading/tmplOrganizationUnitChoose.tpl.html',
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
            templateUrl: 'stock/goodsreceivednoteheading/tmplStockroomChoose.tpl.html',
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


    $scope.goodsReceivedNoteItemEdit = null;

    // goodsReceivedNoteItems table selection logic
    $scope.goodsReceivedNoteItemSelection = function(item, index) {
        if(item.isSelected) {
            if($scope.goodsReceivedNoteItemEdit !== null) {
                var index1 = $scope.itemEdit.goodsReceivedNoteItems.map(function(it) { return it.id; }).indexOf($scope.goodsReceivedNoteItemEdit.id);
                $scope.itemEdit.goodsReceivedNoteItems[index1].isSelected = false;
            }
            $scope.goodsReceivedNoteItemEdit = item;
        } else {
            $scope.goodsReceivedNoteItemEdit = null;
            item.isSelected = false;
        }
    };

    // New/Edit goodsReceivedNoteItems dialog
    $scope.openGoodsReceivedNoteItemEditDialog = function(isNew) {
        $modal.open({
            backdrop: 'static',
            keyboard : false,
            templateUrl: 'stockmanagement/goodsreceivednoteheading/tmplGoodsReceivedNoteItemEdit.tpl.html',
            size: 'lg',
            controller: 'ctrlGoodsReceivedNoteItemEdit',
            windowClass: 'hmodal-info',
            resolve: {
                itemEdit: function() {
                    if(isNew) {
                        return new ServiceGoodsReceivedNoteItem();
                    } else {
                        return $scope.goodsReceivedNoteItemEdit;
                    }
                }
            }
        }).result.then(function(result) {
            var i;
            if(isNew) {
                if(!angular.isDefined($scope.itemEdit.goodsReceivedNoteItems)) {
                    $scope.itemEdit.goodsReceivedNoteItems = [];
                }
                $scope.itemEdit.goodsReceivedNoteItems.unshift(result);
                for(i in $scope.itemEdit.goodsReceivedNoteItems) {
                    $scope.itemEdit.goodsReceivedNoteItems[i].isSelected = false;
                }
                $scope.goodsReceivedNoteItemEdit = angular.extend(result);
                $scope.itemEdit.goodsReceivedNoteItems[0].isSelected = true;
            }
            else {
                for(i in $scope.itemEdit.goodsReceivedNoteItems) {
                    $scope.itemEdit.goodsReceivedNoteItems[i].isSelected = false;
                }
                $scope.goodsReceivedNoteItemEdit = angular.extend(result);
                var index = $scope.itemEdit.goodsReceivedNoteItems.map(function(it) { return it.id; }).indexOf(result.id);
                for(var key in result) {
                    $scope.itemEdit.goodsReceivedNoteItems[index][key] = result[key];
                }
                $scope.itemEdit.goodsReceivedNoteItems[index].isSelected = true;
            }
        });
    };

    $scope.removeGoodsReceivedNoteItem = function(item) {
        var dialog = dialogs.confirm('Please confirm', 'Are you sure you want to delete item?');
        dialog.result.then(function(btn) {
            var removeIndex = $scope.itemEdit.goodsReceivedNoteItems.map(function(it) { return it.id; }).indexOf(item.id);
            $scope.itemEdit.goodsReceivedNoteItems[removeIndex].deleted = true;
        });
    };


	// Save Button
	$scope.save = function() {
		correctDateTime($scope.itemEdit.GRNHShippingDocumentDate);
		correctDateTime($scope.itemEdit.GRNHArrivalDate);
		correctDateTime($scope.itemEdit.GRNHInvoiceDate);
		correctDateTime($scope.itemEdit.GRNHBookkeepingDate);
		correctDateTime($scope.itemEdit.GRNHPrintDate);
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
		return                 item.GRNHNumber  &&                 item.GRNHSupplierShippingDocument  &&                 item.GRNHShippingDocumentDate  &&                 item.GRNHArrivalDate  &&                 item.GRNHCompletionStatus  &&                 item.GRNHPrintStatus  ;
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


.controller('ctrlGoodsReceivedNoteHeadingChoose', ['$scope','ServiceGoodsReceivedNoteHeading', 'dialogs', '$modal', '$modalInstance', 'itemEdit',
function($scope, ServiceGoodsReceivedNoteHeading, dialogs, $modal,  $modalInstance, itemEdit) {

    // entity with properties
    $scope.itemDefinition = {
        label: 'stockmanagement.goodsReceivedNoteHeading',
        properties: [
            { label: 'gRNHNumber', name:'GRNHNumber', inTable:  true  },
            { label: 'gRNHWaybillNumber', name:'GRNHWaybillNumber', inTable:  false  },
            { label: 'gRNHSupplierShippingDocument', name:'GRNHSupplierShippingDocument', inTable:  true  },
            { label: 'gRNHShippingDocumentDate', name:'GRNHShippingDocumentDate', inTable:  true  },
            { label: 'gRNHArrivalDate', name:'GRNHArrivalDate', inTable:  true  },
            { label: 'gRNHInvoiceNumber', name:'GRNHInvoiceNumber', inTable:  false  },
            { label: 'gRNHInvoiceDate', name:'GRNHInvoiceDate', inTable:  false  },
            { label: 'gRNHBookkeepingDate', name:'GRNHBookkeepingDate', inTable:  false  },
            { label: 'gRNHRemark', name:'GRNHRemark', inTable:  false  },
            { label: 'gRNHStornoDocumentNumber', name:'GRNHStornoDocumentNumber', inTable:  false  },
            { label: 'gRNHCompletionStatus', name:'GRNHCompletionStatus', inTable:  true  },
            { label: 'gRNHPrintStatus', name:'GRNHPrintStatus', inTable:  true  },
            { label: 'gRNHPrintDate', name:'GRNHPrintDate', inTable:  false  },
            { label: 'gRNHTransactionLogPrint', name:'GRNHTransactionLogPrint', inTable:  false  },
            { label: 'gRNHOldDocument', name:'GRNHOldDocument', inTable:  false  },
            { label: 'gRNHRemarkKvant', name:'GRNHRemarkKvant', inTable:  false  },
            { label: 'gRNHNotificationNumber', name:'GRNHNotificationNumber', inTable:  false  },
            { label: 'gRNHReclamationNumber', name:'GRNHReclamationNumber', inTable:  false  },
            { label: 'gRNHReclamationNumberKvant', name:'GRNHReclamationNumberKvant', inTable:  false  },
            { label: 'gRNHConclusionPrint', name:'GRNHConclusionPrint', inTable:  false  },
            { label: 'gRNHTransactionLog', name:'GRNHTransactionLog', inTable:  false  },
            { label: 'gRNHCurrency', name:'GRNHCurrency', inTable:  false  },
            { label: 'gRNHCalculationStatus', name:'GRNHCalculationStatus', inTable:  false  },
            { label: 'gRNHThisYear', name:'GRNHThisYear', inTable:  false  },
            { label: 'gRNHByShippingDocument', name:'GRNHByShippingDocument', inTable:  false  },
            { label: 'gRNHBookkeepingStatus', name:'GRNHBookkeepingStatus', inTable:  false  },
        ]
    };

	$scope.items = [];
	$scope.itemEdit = {};

	// fill table with data
	$scope.loaded = false;
	var getGoodsReceivedNoteHeadings = function() {
		if(!$scope.loaded && $scope.items.length === 0) {
			$scope.isLoading = true;
			ServiceGoodsReceivedNoteHeading.query(function(data) {
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
	getGoodsReceivedNoteHeadings();

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