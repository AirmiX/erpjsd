'use strict';

angular.module('Doob.logical')


.controller('ctrlOrderSupplierHeading',['$scope', '$rootScope', '$modal', 'dialogs', 'CheckSelected', 'ServiceOrderSupplierHeading',
    function($scope, $rootScope, $modal, dialogs, CheckSelected, ServiceOrderSupplierHeading) {

	// main entity (orderSupplierHeading) properties names and labels
	$scope.itemDefinition = {
		label: 'logical.orderSupplierHeading',
		properties: [
			{ label: 'oSHNumber', name:'OSHNumber', inTable:  true  },
			{ label: 'oSHDate', name:'OSHDate', inTable:  true  },
			{ label: 'oSHApprovalDate', name:'OSHApprovalDate', inTable:  true  },
			{ label: 'oSHStatus', name:'OSHStatus', inTable:  false  },
			{ label: 'oSHOrderConfirmation', name:'OSHOrderConfirmation', inTable:  false  },
			{ label: 'oSHRemark', name:'OSHRemark', inTable:  false  },
			{ label: 'oSHStatementNumber', name:'OSHStatementNumber', inTable:  false  },
			{ label: 'oSHStatementDate', name:'OSHStatementDate', inTable:  false  },
			{ label: 'oSHConfirmationNumber', name:'OSHConfirmationNumber', inTable:  false  },
			{ label: 'oSHConfirmationDate', name:'OSHConfirmationDate', inTable:  false  },
			{ label: 'oSHPrintStatus', name:'OSHPrintStatus', inTable:  false  },
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
	// parity with properties names and labels
	$scope.parityDefinition = {
		label: 'logical.parity',
		properties : [
			{ label: 'pDesignation', name:'PDesignation' },
			{ label: 'pDescription', name:'PDescription' },
		]
	};
	// paymentMethod with properties names and labels
	$scope.paymentMethodDefinition = {
		label: 'initialization.paymentMethod',
		properties : [
			{ label: 'pMCode', name:'PMCode' },
			{ label: 'pMName', name:'PMName' },
			{ label: 'pMEnabled', name:'PMEnabled' },
		]
	};
	// packagingStatus with properties names and labels
	$scope.packagingStatusDefinition = {
		label: 'initialization.packagingStatus',
		properties : [
			{ label: 'pSDesignation', name:'PSDesignation' },
			{ label: 'pSName', name:'PSName' },
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
	// supplier with properties names and labels
	$scope.supplierDefinition = {
		label: 'commonbusinessentities.identification',
		properties : [
			{ label: 'iIdentificationCode', name:'IIdentificationCode' },
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
	// currency with properties names and labels
	$scope.currencyDefinition = {
		label: 'capacitymanagement.currency',
		properties : [
			{ label: 'cCurrencyDesignation', name:'CCurrencyDesignation' },
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

	// fill table with data
	$scope.items = [];
	$scope.loaded = false;
	var getOrderSupplierHeadings = function() {
		if(!$scope.loaded && $scope.items.length === 0) {
			$scope.isLoading = true;
			ServiceOrderSupplierHeading.query(function(data) {
				$scope.items = data;
				$scope.isLoading = false;
				$scope.loaded = true;
			});
		}
	};
	getOrderSupplierHeadings();

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

	$scope.$watch('OrderSupplierHeadingCollection', function() {
		$scope.itemEdit = CheckSelected.checkSelectedInTable($scope.itemEdit, $scope.OrderSupplierHeadingCollection, $scope.items);
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
			templateUrl: 'logical/ordersupplierheading/tmplOrderSupplierHeadingEdit.tpl.html',
			size: 'lg',
			windowClass: 'hmodal-info',
			controller: 'ctrlOrderSupplierHeadingEdit',
			resolve: {
				itemEdit: function() {
					if(isNew) {
						return new ServiceOrderSupplierHeading();
					} else {
						return $scope.itemEdit;
					}
				},
				deliveryMethodDefinition: function() {
					return $scope.deliveryMethodDefinition;
				},
				parityDefinition: function() {
					return $scope.parityDefinition;
				},
				paymentMethodDefinition: function() {
					return $scope.paymentMethodDefinition;
				},
				packagingStatusDefinition: function() {
					return $scope.packagingStatusDefinition;
				},
				documentTypeDefinition: function() {
					return $scope.documentTypeDefinition;
				},
				supplierDefinition: function() {
					return $scope.supplierDefinition;
				},
				declarationBasisDefinition: function() {
					return $scope.declarationBasisDefinition;
				},
				currencyDefinition: function() {
					return $scope.currencyDefinition;
				},
				organizationUnitDefinition: function() {
					return $scope.organizationUnitDefinition;
				},
				orderSupplierItemsDefinition: function() {
					return $scope.orderSupplierItemsDefinition;
				},
				goodsReceivedNoteHeadingsDefinition: function() {
					return $scope.goodsReceivedNoteHeadingsDefinition;
				},
			}
		})
		.result.then(function(result) {
			if(!angular.isDefined(result.id)) {
				ServiceOrderSupplierHeading.saveCustom('stockmanagement/ordersupplierheadings', result, function(savedObject) {
					$scope.items.unshift(savedObject);
					if($scope.itemEdit !== null) {
						var index = $scope.items.map(function(it) { return it.id; }).indexOf($scope.itemEdit.id);
						$scope.items[index].isSelected = false;
					}
					$scope.itemEdit = angular.extend(savedObject);
					$scope.items[0].isSelected = true;
				});
			 } else {
				 ServiceOrderSupplierHeading.updateCustom('stockmanagement/ordersupplierheadings/'+result.id, result, function(savedObject) {
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


.controller('ctrlOrderSupplierHeadingEdit',['$scope', 'Localization', '$modal', '$modalInstance', 'dialogs',
	'ServiceOrderSupplierHeading', 'ServiceDeliveryMethod', 'ServiceParity', 'ServicePaymentMethod', 'ServicePackagingStatus', 'ServiceDocumentType', 'ServiceIdentification', 'ServiceDeclarationBasis', 'ServiceCurrency', 'ServiceOrganizationUnit', 'ServiceOrderSupplierItem', 'ServiceGoodsReceivedNoteHeading',   'deliveryMethodDefinition',  'parityDefinition',  'paymentMethodDefinition',  'packagingStatusDefinition',  'documentTypeDefinition',  'supplierDefinition',  'declarationBasisDefinition',  'currencyDefinition',  'organizationUnitDefinition',  'orderSupplierItemsDefinition',  'goodsReceivedNoteHeadingsDefinition',   'itemEdit',
function($scope, Localization, $modal, $modalInstance, dialogs,
	ServiceOrderSupplierHeading, ServiceDeliveryMethod, ServiceParity, ServicePaymentMethod, ServicePackagingStatus, ServiceDocumentType, ServiceIdentification, ServiceDeclarationBasis, ServiceCurrency, ServiceOrganizationUnit, ServiceOrderSupplierItem, ServiceGoodsReceivedNoteHeading,  deliveryMethodDefinition,  parityDefinition,  paymentMethodDefinition,  packagingStatusDefinition,  documentTypeDefinition,  supplierDefinition,  declarationBasisDefinition,  currencyDefinition,  organizationUnitDefinition,  orderSupplierItemsDefinition,  goodsReceivedNoteHeadingsDefinition,  itemEdit) {

	// dialog mode
	$scope.mode = 'edit';

	// original item state
	var original = angular.copy(itemEdit);
	// item state
	$scope.itemEdit = angular.copy(original);

	// deliveryMethod with properties
	$scope.deliveryMethodDefinition = deliveryMethodDefinition;
	// parity with properties
	$scope.parityDefinition = parityDefinition;
	// paymentMethod with properties
	$scope.paymentMethodDefinition = paymentMethodDefinition;
	// packagingStatus with properties
	$scope.packagingStatusDefinition = packagingStatusDefinition;
	// documentType with properties
	$scope.documentTypeDefinition = documentTypeDefinition;
	// supplier with properties
	$scope.supplierDefinition = supplierDefinition;
	// declarationBasis with properties
	$scope.declarationBasisDefinition = declarationBasisDefinition;
	// currency with properties
	$scope.currencyDefinition = currencyDefinition;
	// organizationUnit with properties
	$scope.organizationUnitDefinition = organizationUnitDefinition;
	// orderSupplierItems with properties
	$scope.orderSupplierItemsDefinition = orderSupplierItemsDefinition;
	// goodsReceivedNoteHeadings with properties
	$scope.goodsReceivedNoteHeadingsDefinition = goodsReceivedNoteHeadingsDefinition;

	// datepicker logic

	// date properties
	$scope.openedOSHDate = false;
	$scope.openedOSHApprovalDate = false;
	$scope.openedOSHStatementDate = false;
	$scope.openedOSHConfirmationDate = false;

	$scope.open = function($event, opened) {
		$event.preventDefault();
		$event.stopPropagation();
		$scope[opened] = true;
	};



	// Choose deliveryMethod
	$scope.openChooseDeliveryMethodDialog = function() {
        $modal.open({
            backdrop: 'static',
            keyboard : false,
            templateUrl: 'order/ordersupplierheading/tmplDeliveryMethodChoose.tpl.html',
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


	// Choose parity
	$scope.openChooseParityDialog = function() {
        $modal.open({
            backdrop: 'static',
            keyboard : false,
            templateUrl: 'logical/ordersupplierheading/tmplParityChoose.tpl.html',
            size: 'lg',
            controller: 'ctrlParityChoose',
            windowClass: 'hmodal-info',
            resolve: {
				itemEdit: function() {
					if(angular.isDefined($scope.itemEdit.parity)){
						return $scope.itemEdit.parity;
					}
				}
			}
		}).result.then(function(result) {
			$scope.itemEdit.parity = angular.copy(result);
		});
    };


	// Choose paymentMethod
	$scope.openChoosePaymentMethodDialog = function() {
        $modal.open({
            backdrop: 'static',
            keyboard : false,
            templateUrl: 'initialization/ordersupplierheading/tmplPaymentMethodChoose.tpl.html',
            size: 'lg',
            controller: 'ctrlPaymentMethodChoose',
            windowClass: 'hmodal-info',
            resolve: {
				itemEdit: function() {
					if(angular.isDefined($scope.itemEdit.paymentMethod)){
						return $scope.itemEdit.paymentMethod;
					}
				}
			}
		}).result.then(function(result) {
			$scope.itemEdit.paymentMethod = angular.copy(result);
		});
    };


	// Choose packagingStatus
	$scope.openChoosePackagingStatusDialog = function() {
        $modal.open({
            backdrop: 'static',
            keyboard : false,
            templateUrl: 'initialization/ordersupplierheading/tmplPackagingStatusChoose.tpl.html',
            size: 'lg',
            controller: 'ctrlPackagingStatusChoose',
            windowClass: 'hmodal-info',
            resolve: {
				itemEdit: function() {
					if(angular.isDefined($scope.itemEdit.packagingStatus)){
						return $scope.itemEdit.packagingStatus;
					}
				}
			}
		}).result.then(function(result) {
			$scope.itemEdit.packagingStatus = angular.copy(result);
		});
    };


	// Choose documentType
	$scope.openChooseDocumentTypeDialog = function() {
        $modal.open({
            backdrop: 'static',
            keyboard : false,
            templateUrl: 'corporation/ordersupplierheading/tmplDocumentTypeChoose.tpl.html',
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


	// Choose supplier
	$scope.openChooseSupplierDialog = function() {
        $modal.open({
            backdrop: 'static',
            keyboard : false,
            templateUrl: 'commonbusinessentities/ordersupplierheading/tmplIdentificationChoose.tpl.html',
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


	// Choose declarationBasis
	$scope.openChooseDeclarationBasisDialog = function() {
        $modal.open({
            backdrop: 'static',
            keyboard : false,
            templateUrl: 'initialization/ordersupplierheading/tmplDeclarationBasisChoose.tpl.html',
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


	// Choose currency
	$scope.openChooseCurrencyDialog = function() {
        $modal.open({
            backdrop: 'static',
            keyboard : false,
            templateUrl: 'capacitymanagement/ordersupplierheading/tmplCurrencyChoose.tpl.html',
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


	// Choose organizationUnit
	$scope.openChooseOrganizationUnitDialog = function() {
        $modal.open({
            backdrop: 'static',
            keyboard : false,
            templateUrl: 'corporation/ordersupplierheading/tmplOrganizationUnitChoose.tpl.html',
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


    $scope.orderSupplierItemEdit = null;

    // orderSupplierItems table selection logic
    $scope.orderSupplierItemSelection = function(item, index) {
        if(item.isSelected) {
            if($scope.orderSupplierItemEdit !== null) {
                var index1 = $scope.itemEdit.orderSupplierItems.map(function(it) { return it.id; }).indexOf($scope.orderSupplierItemEdit.id);
                $scope.itemEdit.orderSupplierItems[index1].isSelected = false;
            }
            $scope.orderSupplierItemEdit = item;
        } else {
            $scope.orderSupplierItemEdit = null;
            item.isSelected = false;
        }
    };

    // New/Edit orderSupplierItems dialog
    $scope.openOrderSupplierItemEditDialog = function(isNew) {
        $modal.open({
            backdrop: 'static',
            keyboard : false,
            templateUrl: 'logical/ordersupplierheading/tmplOrderSupplierItemEdit.tpl.html',
            size: 'lg',
            controller: 'ctrlOrderSupplierItemEdit',
            windowClass: 'hmodal-info',
            resolve: {
                itemEdit: function() {
                    if(isNew) {
                        return new ServiceOrderSupplierItem();
                    } else {
                        return $scope.orderSupplierItemEdit;
                    }
                }
            }
        }).result.then(function(result) {
            var i;
            if(isNew) {
                if(!angular.isDefined($scope.itemEdit.orderSupplierItems)) {
                    $scope.itemEdit.orderSupplierItems = [];
                }
                $scope.itemEdit.orderSupplierItems.unshift(result);
                for(i in $scope.itemEdit.orderSupplierItems) {
                    $scope.itemEdit.orderSupplierItems[i].isSelected = false;
                }
                $scope.orderSupplierItemEdit = angular.extend(result);
                $scope.itemEdit.orderSupplierItems[0].isSelected = true;
            }
            else {
                for(i in $scope.itemEdit.orderSupplierItems) {
                    $scope.itemEdit.orderSupplierItems[i].isSelected = false;
                }
                $scope.orderSupplierItemEdit = angular.extend(result);
                var index = $scope.itemEdit.orderSupplierItems.map(function(it) { return it.id; }).indexOf(result.id);
                for(var key in result) {
                    $scope.itemEdit.orderSupplierItems[index][key] = result[key];
                }
                $scope.itemEdit.orderSupplierItems[index].isSelected = true;
            }
        });
    };

    $scope.removeOrderSupplierItem = function(item) {
        var dialog = dialogs.confirm('Please confirm', 'Are you sure you want to delete item?');
        dialog.result.then(function(btn) {
            var removeIndex = $scope.itemEdit.orderSupplierItems.map(function(it) { return it.id; }).indexOf(item.id);
            $scope.itemEdit.orderSupplierItems[removeIndex].deleted = true;
        });
    };


	// Save Button
	$scope.save = function() {
		correctDateTime($scope.itemEdit.OSHDate);
		correctDateTime($scope.itemEdit.OSHApprovalDate);
		correctDateTime($scope.itemEdit.OSHStatementDate);
		correctDateTime($scope.itemEdit.OSHConfirmationDate);
	   //	delete $scope.itemEdit.isSelected;
        var item;
        var i;
        for(i in $scope.itemEdit.goodsReceivedNoteHeadings) {
    		item = $scope.itemEdit.goodsReceivedNoteHeadings[i];
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
		return                 item.OSHNumber  &&                 item.OSHDate  &&                 item.OSHApprovalDate  ;
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


.controller('ctrlOrderSupplierHeadingChoose', ['$scope','ServiceOrderSupplierHeading', 'dialogs', '$modal', '$modalInstance', 'itemEdit',
function($scope, ServiceOrderSupplierHeading, dialogs, $modal,  $modalInstance, itemEdit) {

    // entity with properties
    $scope.itemDefinition = {
        label: 'logical.orderSupplierHeading',
        properties: [
            { label: 'oSHNumber', name:'OSHNumber', inTable:  true  },
            { label: 'oSHDate', name:'OSHDate', inTable:  true  },
            { label: 'oSHApprovalDate', name:'OSHApprovalDate', inTable:  true  },
            { label: 'oSHStatus', name:'OSHStatus', inTable:  false  },
            { label: 'oSHOrderConfirmation', name:'OSHOrderConfirmation', inTable:  false  },
            { label: 'oSHRemark', name:'OSHRemark', inTable:  false  },
            { label: 'oSHStatementNumber', name:'OSHStatementNumber', inTable:  false  },
            { label: 'oSHStatementDate', name:'OSHStatementDate', inTable:  false  },
            { label: 'oSHConfirmationNumber', name:'OSHConfirmationNumber', inTable:  false  },
            { label: 'oSHConfirmationDate', name:'OSHConfirmationDate', inTable:  false  },
            { label: 'oSHPrintStatus', name:'OSHPrintStatus', inTable:  false  },
        ]
    };

	$scope.items = [];
	$scope.itemEdit = {};

	// fill table with data
	$scope.loaded = false;
	var getOrderSupplierHeadings = function() {
		if(!$scope.loaded && $scope.items.length === 0) {
			$scope.isLoading = true;
			ServiceOrderSupplierHeading.query(function(data) {
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
	getOrderSupplierHeadings();

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