'use strict';

angular.module('Doob.procurement')


.controller('ctrlShippingDocument',['$scope', '$rootScope', '$modal', 'dialogs', 'CheckSelected', 'ServiceShippingDocument',
    function($scope, $rootScope, $modal, dialogs, CheckSelected, ServiceShippingDocument) {

	// main entity (shippingDocument) properties names and labels
	$scope.itemDefinition = {
		label: 'procurement.shippingDocument',
		properties: [
			{ label: 'sDDocumentNumber', name:'SDDocumentNumber', inTable:  true  },
			{ label: 'sDDispositionDate', name:'SDDispositionDate', inTable:  true  },
			{ label: 'sDFinalPackagingDate', name:'SDFinalPackagingDate', inTable:  false  },
			{ label: 'sDIssueDocumentDate', name:'SDIssueDocumentDate', inTable:  false  },
			{ label: 'sDShippingDocumentNumber', name:'SDShippingDocumentNumber', inTable:  false  },
			{ label: 'sDCancellationDocumentNumber', name:'SDCancellationDocumentNumber', inTable:  false  },
			{ label: 'sDStatus', name:'SDStatus', inTable:  true  },
			{ label: 'sDInvoiceDate', name:'SDInvoiceDate', inTable:  false  },
			{ label: 'sDCurrencyDate', name:'SDCurrencyDate', inTable:  false  },
			{ label: 'sDShipmentDate', name:'SDShipmentDate', inTable:  false  },
			{ label: 'sDCrateNumber', name:'SDCrateNumber', inTable:  false  },
			{ label: 'sDPostsCosts', name:'SDPostsCosts', inTable:  false  },
			{ label: 'sDStatementNumber', name:'SDStatementNumber', inTable:  false  },
			{ label: 'sDConfirmationNumber', name:'SDConfirmationNumber', inTable:  false  },
			{ label: 'sDStatementDate', name:'SDStatementDate', inTable:  false  },
			{ label: 'sDConfirmationDate', name:'SDConfirmationDate', inTable:  false  },
			{ label: 'sDPrintingStatusPackOrder', name:'SDPrintingStatusPackOrder', inTable:  false  },
			{ label: 'sDPrintingStatusInvoice', name:'SDPrintingStatusInvoice', inTable:  false  },
			{ label: 'sDPrintingStatusDispatch', name:'SDPrintingStatusDispatch', inTable:  false  },
			{ label: 'sDPrintingStatusTransactions', name:'SDPrintingStatusTransactions', inTable:  false  },
			{ label: 'sDOldDocument', name:'SDOldDocument', inTable:  false  },
			{ label: 'sDTransactionDiaryNumber', name:'SDTransactionDiaryNumber', inTable:  false  },
			{ label: 'sDUnified', name:'SDUnified', inTable:  false  },
			{ label: 'sDPrintingPackagingOrder', name:'SDPrintingPackagingOrder', inTable:  false  },
			{ label: 'sDTranslated', name:'SDTranslated', inTable:  false  },
			{ label: 'sDForConsignment', name:'SDForConsignment', inTable:  false  },
			{ label: 'sDDiaryConsignmentNumber', name:'SDDiaryConsignmentNumber', inTable:  false  },
			{ label: 'sDBookkeepingDate', name:'SDBookkeepingDate', inTable:  false  },
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
	// goodsIdentification with properties names and labels
	$scope.goodsIdentificationDefinition = {
		label: 'commonbusinessentities.identification',
		properties : [
			{ label: 'iIdentificationCode', name:'IIdentificationCode' },
		]
	};
	// invoiceIdentification with properties names and labels
	$scope.invoiceIdentificationDefinition = {
		label: 'commonbusinessentities.identification',
		properties : [
			{ label: 'iIdentificationCode', name:'IIdentificationCode' },
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
	// paymentMethod with properties names and labels
	$scope.paymentMethodDefinition = {
		label: 'initialization.paymentMethod',
		properties : [
			{ label: 'pMCode', name:'PMCode' },
			{ label: 'pMName', name:'PMName' },
			{ label: 'pMEnabled', name:'PMEnabled' },
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
	// consignmentStockroom with properties names and labels
	$scope.consignmentStockroomDefinition = {
		label: 'stock.stockroom',
		properties : [
			{ label: 'sCode', name:'SCode' },
			{ label: 'sName', name:'SName' },
			{ label: 'sFullName', name:'SFullName' },
			{ label: 'sType', name:'SType' },
			{ label: 'sConditions', name:'SConditions' },
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
	// exporterIdentification with properties names and labels
	$scope.exporterIdentificationDefinition = {
		label: 'commonbusinessentities.identification',
		properties : [
			{ label: 'iIdentificationCode', name:'IIdentificationCode' },
		]
	};
	// deliveryMethod with properties names and labels
	$scope.deliveryMethodDefinition = {
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

	// fill table with data
	$scope.items = [];
	$scope.loaded = false;
	var getShippingDocuments = function() {
		if(!$scope.loaded && $scope.items.length === 0) {
			$scope.isLoading = true;
			ServiceShippingDocument.query(function(data) {
				$scope.items = data;
				$scope.isLoading = false;
				$scope.loaded = true;
			});
		}
	};
	getShippingDocuments();

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

	$scope.$watch('ShippingDocumentCollection', function() {
		$scope.itemEdit = CheckSelected.checkSelectedInTable($scope.itemEdit, $scope.ShippingDocumentCollection, $scope.items);
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
			templateUrl: 'procurement/shippingdocument/tmplShippingDocumentEdit.tpl.html',
			size: 'lg',
			windowClass: 'hmodal-info',
			controller: 'ctrlShippingDocumentEdit',
			resolve: {
				itemEdit: function() {
					if(isNew) {
						return new ServiceShippingDocument();
					} else {
						return $scope.itemEdit;
					}
				},
				organizationUnitDefinition: function() {
					return $scope.organizationUnitDefinition;
				},
				goodsIdentificationDefinition: function() {
					return $scope.goodsIdentificationDefinition;
				},
				invoiceIdentificationDefinition: function() {
					return $scope.invoiceIdentificationDefinition;
				},
				orderHeadingDefinition: function() {
					return $scope.orderHeadingDefinition;
				},
				paymentMethodDefinition: function() {
					return $scope.paymentMethodDefinition;
				},
				declarationBasisDefinition: function() {
					return $scope.declarationBasisDefinition;
				},
				documentTypeDefinition: function() {
					return $scope.documentTypeDefinition;
				},
				consignmentStockroomDefinition: function() {
					return $scope.consignmentStockroomDefinition;
				},
				stockroomDefinition: function() {
					return $scope.stockroomDefinition;
				},
				exporterIdentificationDefinition: function() {
					return $scope.exporterIdentificationDefinition;
				},
				deliveryMethodDefinition: function() {
					return $scope.deliveryMethodDefinition;
				},
				currencyDefinition: function() {
					return $scope.currencyDefinition;
				},
				shippingDocumentItemsDefinition: function() {
					return $scope.shippingDocumentItemsDefinition;
				},
				invoicesDefinition: function() {
					return $scope.invoicesDefinition;
				},
			}
		})
		.result.then(function(result) {
			if(!angular.isDefined(result.id)) {
				ServiceShippingDocument.saveCustom('stockmanagement/shippingdocuments', result, function(savedObject) {
					$scope.items.unshift(savedObject);
					if($scope.itemEdit !== null) {
						var index = $scope.items.map(function(it) { return it.id; }).indexOf($scope.itemEdit.id);
						$scope.items[index].isSelected = false;
					}
					$scope.itemEdit = angular.extend(savedObject);
					$scope.items[0].isSelected = true;
				});
			 } else {
				 ServiceShippingDocument.updateCustom('stockmanagement/shippingdocuments/'+result.id, result, function(savedObject) {
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


.controller('ctrlShippingDocumentEdit',['$scope', 'Localization', '$modal', '$modalInstance', 'dialogs',
	'ServiceShippingDocument', 'ServiceOrganizationUnit', 'ServiceIdentification', 'ServiceOrderHeading', 'ServicePaymentMethod', 'ServiceDeclarationBasis', 'ServiceDocumentType', 'ServiceStockroom', 'ServiceCurrency', 'ServiceShippingDocumentItem', 'ServiceInvoice',   'organizationUnitDefinition',  'goodsIdentificationDefinition',  'invoiceIdentificationDefinition',  'orderHeadingDefinition',  'paymentMethodDefinition',  'declarationBasisDefinition',  'documentTypeDefinition',  'consignmentStockroomDefinition',  'stockroomDefinition',  'exporterIdentificationDefinition',  'deliveryMethodDefinition',  'currencyDefinition',  'shippingDocumentItemsDefinition',  'invoicesDefinition',   'itemEdit',
function($scope, Localization, $modal, $modalInstance, dialogs,
	ServiceShippingDocument, ServiceOrganizationUnit, ServiceIdentification, ServiceOrderHeading, ServicePaymentMethod, ServiceDeclarationBasis, ServiceDocumentType, ServiceStockroom, ServiceCurrency, ServiceShippingDocumentItem, ServiceInvoice,  organizationUnitDefinition,  goodsIdentificationDefinition,  invoiceIdentificationDefinition,  orderHeadingDefinition,  paymentMethodDefinition,  declarationBasisDefinition,  documentTypeDefinition,  consignmentStockroomDefinition,  stockroomDefinition,  exporterIdentificationDefinition,  deliveryMethodDefinition,  currencyDefinition,  shippingDocumentItemsDefinition,  invoicesDefinition,  itemEdit) {

	// dialog mode
	$scope.mode = 'edit';

	// original item state
	var original = angular.copy(itemEdit);
	// item state
	$scope.itemEdit = angular.copy(original);

	// organizationUnit with properties
	$scope.organizationUnitDefinition = organizationUnitDefinition;
	// goodsIdentification with properties
	$scope.goodsIdentificationDefinition = goodsIdentificationDefinition;
	// invoiceIdentification with properties
	$scope.invoiceIdentificationDefinition = invoiceIdentificationDefinition;
	// orderHeading with properties
	$scope.orderHeadingDefinition = orderHeadingDefinition;
	// paymentMethod with properties
	$scope.paymentMethodDefinition = paymentMethodDefinition;
	// declarationBasis with properties
	$scope.declarationBasisDefinition = declarationBasisDefinition;
	// documentType with properties
	$scope.documentTypeDefinition = documentTypeDefinition;
	// consignmentStockroom with properties
	$scope.consignmentStockroomDefinition = consignmentStockroomDefinition;
	// stockroom with properties
	$scope.stockroomDefinition = stockroomDefinition;
	// exporterIdentification with properties
	$scope.exporterIdentificationDefinition = exporterIdentificationDefinition;
	// deliveryMethod with properties
	$scope.deliveryMethodDefinition = deliveryMethodDefinition;
	// currency with properties
	$scope.currencyDefinition = currencyDefinition;
	// shippingDocumentItems with properties
	$scope.shippingDocumentItemsDefinition = shippingDocumentItemsDefinition;
	// invoices with properties
	$scope.invoicesDefinition = invoicesDefinition;

	// datepicker logic

	// date properties
	$scope.openedSDDispositionDate = false;
	$scope.openedSDFinalPackagingDate = false;
	$scope.openedSDIssueDocumentDate = false;
	$scope.openedSDInvoiceDate = false;
	$scope.openedSDCurrencyDate = false;
	$scope.openedSDShipmentDate = false;
	$scope.openedSDStatementDate = false;
	$scope.openedSDConfirmationDate = false;
	$scope.openedSDBookkeepingDate = false;

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
            templateUrl: 'corporation/shippingdocument/tmplOrganizationUnitChoose.tpl.html',
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


	// Choose goodsIdentification
	$scope.openChooseGoodsIdentificationDialog = function() {
        $modal.open({
            backdrop: 'static',
            keyboard : false,
            templateUrl: 'commonbusinessentities/shippingdocument/tmplIdentificationChoose.tpl.html',
            size: 'lg',
            controller: 'ctrlIdentificationChoose',
            windowClass: 'hmodal-info',
            resolve: {
				itemEdit: function() {
					if(angular.isDefined($scope.itemEdit.goodsIdentification)){
						return $scope.itemEdit.goodsIdentification;
					}
				}
			}
		}).result.then(function(result) {
			$scope.itemEdit.goodsIdentification = angular.copy(result);
		});
    };


	// Choose invoiceIdentification
	$scope.openChooseInvoiceIdentificationDialog = function() {
        $modal.open({
            backdrop: 'static',
            keyboard : false,
            templateUrl: 'commonbusinessentities/shippingdocument/tmplIdentificationChoose.tpl.html',
            size: 'lg',
            controller: 'ctrlIdentificationChoose',
            windowClass: 'hmodal-info',
            resolve: {
				itemEdit: function() {
					if(angular.isDefined($scope.itemEdit.invoiceIdentification)){
						return $scope.itemEdit.invoiceIdentification;
					}
				}
			}
		}).result.then(function(result) {
			$scope.itemEdit.invoiceIdentification = angular.copy(result);
		});
    };


	// Choose orderHeading
	$scope.openChooseOrderHeadingDialog = function() {
        $modal.open({
            backdrop: 'static',
            keyboard : false,
            templateUrl: 'order/shippingdocument/tmplOrderHeadingChoose.tpl.html',
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


	// Choose paymentMethod
	$scope.openChoosePaymentMethodDialog = function() {
        $modal.open({
            backdrop: 'static',
            keyboard : false,
            templateUrl: 'initialization/shippingdocument/tmplPaymentMethodChoose.tpl.html',
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


	// Choose declarationBasis
	$scope.openChooseDeclarationBasisDialog = function() {
        $modal.open({
            backdrop: 'static',
            keyboard : false,
            templateUrl: 'initialization/shippingdocument/tmplDeclarationBasisChoose.tpl.html',
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
            templateUrl: 'corporation/shippingdocument/tmplDocumentTypeChoose.tpl.html',
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


	// Choose consignmentStockroom
	$scope.openChooseConsignmentStockroomDialog = function() {
        $modal.open({
            backdrop: 'static',
            keyboard : false,
            templateUrl: 'stock/shippingdocument/tmplStockroomChoose.tpl.html',
            size: 'lg',
            controller: 'ctrlStockroomChoose',
            windowClass: 'hmodal-info',
            resolve: {
				itemEdit: function() {
					if(angular.isDefined($scope.itemEdit.consignmentStockroom)){
						return $scope.itemEdit.consignmentStockroom;
					}
				}
			}
		}).result.then(function(result) {
			$scope.itemEdit.consignmentStockroom = angular.copy(result);
		});
    };


	// Choose stockroom
	$scope.openChooseStockroomDialog = function() {
        $modal.open({
            backdrop: 'static',
            keyboard : false,
            templateUrl: 'stock/shippingdocument/tmplStockroomChoose.tpl.html',
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


	// Choose exporterIdentification
	$scope.openChooseExporterIdentificationDialog = function() {
        $modal.open({
            backdrop: 'static',
            keyboard : false,
            templateUrl: 'commonbusinessentities/shippingdocument/tmplIdentificationChoose.tpl.html',
            size: 'lg',
            controller: 'ctrlIdentificationChoose',
            windowClass: 'hmodal-info',
            resolve: {
				itemEdit: function() {
					if(angular.isDefined($scope.itemEdit.exporterIdentification)){
						return $scope.itemEdit.exporterIdentification;
					}
				}
			}
		}).result.then(function(result) {
			$scope.itemEdit.exporterIdentification = angular.copy(result);
		});
    };


	// Choose deliveryMethod
	$scope.openChooseDeliveryMethodDialog = function() {
        $modal.open({
            backdrop: 'static',
            keyboard : false,
            templateUrl: 'commonbusinessentities/shippingdocument/tmplIdentificationChoose.tpl.html',
            size: 'lg',
            controller: 'ctrlIdentificationChoose',
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


	// Choose currency
	$scope.openChooseCurrencyDialog = function() {
        $modal.open({
            backdrop: 'static',
            keyboard : false,
            templateUrl: 'capacitymanagement/shippingdocument/tmplCurrencyChoose.tpl.html',
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


    $scope.shippingDocumentItemEdit = null;

    // shippingDocumentItems table selection logic
    $scope.shippingDocumentItemSelection = function(item, index) {
        if(item.isSelected) {
            if($scope.shippingDocumentItemEdit !== null) {
                var index1 = $scope.itemEdit.shippingDocumentItems.map(function(it) { return it.id; }).indexOf($scope.shippingDocumentItemEdit.id);
                $scope.itemEdit.shippingDocumentItems[index1].isSelected = false;
            }
            $scope.shippingDocumentItemEdit = item;
        } else {
            $scope.shippingDocumentItemEdit = null;
            item.isSelected = false;
        }
    };

    // New/Edit shippingDocumentItems dialog
    $scope.openShippingDocumentItemEditDialog = function(isNew) {
        $modal.open({
            backdrop: 'static',
            keyboard : false,
            templateUrl: 'procurement/shippingdocument/tmplShippingDocumentItemEdit.tpl.html',
            size: 'lg',
            controller: 'ctrlShippingDocumentItemEdit',
            windowClass: 'hmodal-info',
            resolve: {
                itemEdit: function() {
                    if(isNew) {
                        return new ServiceShippingDocumentItem();
                    } else {
                        return $scope.shippingDocumentItemEdit;
                    }
                }
            }
        }).result.then(function(result) {
            var i;
            if(isNew) {
                if(!angular.isDefined($scope.itemEdit.shippingDocumentItems)) {
                    $scope.itemEdit.shippingDocumentItems = [];
                }
                $scope.itemEdit.shippingDocumentItems.unshift(result);
                for(i in $scope.itemEdit.shippingDocumentItems) {
                    $scope.itemEdit.shippingDocumentItems[i].isSelected = false;
                }
                $scope.shippingDocumentItemEdit = angular.extend(result);
                $scope.itemEdit.shippingDocumentItems[0].isSelected = true;
            }
            else {
                for(i in $scope.itemEdit.shippingDocumentItems) {
                    $scope.itemEdit.shippingDocumentItems[i].isSelected = false;
                }
                $scope.shippingDocumentItemEdit = angular.extend(result);
                var index = $scope.itemEdit.shippingDocumentItems.map(function(it) { return it.id; }).indexOf(result.id);
                for(var key in result) {
                    $scope.itemEdit.shippingDocumentItems[index][key] = result[key];
                }
                $scope.itemEdit.shippingDocumentItems[index].isSelected = true;
            }
        });
    };

    $scope.removeShippingDocumentItem = function(item) {
        var dialog = dialogs.confirm('Please confirm', 'Are you sure you want to delete item?');
        dialog.result.then(function(btn) {
            var removeIndex = $scope.itemEdit.shippingDocumentItems.map(function(it) { return it.id; }).indexOf(item.id);
            $scope.itemEdit.shippingDocumentItems[removeIndex].deleted = true;
        });
    };


	// Save Button
	$scope.save = function() {
		correctDateTime($scope.itemEdit.SDDispositionDate);
		correctDateTime($scope.itemEdit.SDFinalPackagingDate);
		correctDateTime($scope.itemEdit.SDIssueDocumentDate);
		correctDateTime($scope.itemEdit.SDInvoiceDate);
		correctDateTime($scope.itemEdit.SDCurrencyDate);
		correctDateTime($scope.itemEdit.SDShipmentDate);
		correctDateTime($scope.itemEdit.SDStatementDate);
		correctDateTime($scope.itemEdit.SDConfirmationDate);
		correctDateTime($scope.itemEdit.SDBookkeepingDate);
	   //	delete $scope.itemEdit.isSelected;
        var item;
        var i;
        for(i in $scope.itemEdit.invoices) {
    		item = $scope.itemEdit.invoices[i];
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
		return                 item.SDDocumentNumber  &&                 item.SDDispositionDate  &&                 item.SDStatus  ;
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


.controller('ctrlShippingDocumentChoose', ['$scope','ServiceShippingDocument', 'dialogs', '$modal', '$modalInstance', 'itemEdit',
function($scope, ServiceShippingDocument, dialogs, $modal,  $modalInstance, itemEdit) {

    // entity with properties
    $scope.itemDefinition = {
        label: 'procurement.shippingDocument',
        properties: [
            { label: 'sDDocumentNumber', name:'SDDocumentNumber', inTable:  true  },
            { label: 'sDDispositionDate', name:'SDDispositionDate', inTable:  true  },
            { label: 'sDFinalPackagingDate', name:'SDFinalPackagingDate', inTable:  false  },
            { label: 'sDIssueDocumentDate', name:'SDIssueDocumentDate', inTable:  false  },
            { label: 'sDShippingDocumentNumber', name:'SDShippingDocumentNumber', inTable:  false  },
            { label: 'sDCancellationDocumentNumber', name:'SDCancellationDocumentNumber', inTable:  false  },
            { label: 'sDStatus', name:'SDStatus', inTable:  true  },
            { label: 'sDInvoiceDate', name:'SDInvoiceDate', inTable:  false  },
            { label: 'sDCurrencyDate', name:'SDCurrencyDate', inTable:  false  },
            { label: 'sDShipmentDate', name:'SDShipmentDate', inTable:  false  },
            { label: 'sDCrateNumber', name:'SDCrateNumber', inTable:  false  },
            { label: 'sDPostsCosts', name:'SDPostsCosts', inTable:  false  },
            { label: 'sDStatementNumber', name:'SDStatementNumber', inTable:  false  },
            { label: 'sDConfirmationNumber', name:'SDConfirmationNumber', inTable:  false  },
            { label: 'sDStatementDate', name:'SDStatementDate', inTable:  false  },
            { label: 'sDConfirmationDate', name:'SDConfirmationDate', inTable:  false  },
            { label: 'sDPrintingStatusPackOrder', name:'SDPrintingStatusPackOrder', inTable:  false  },
            { label: 'sDPrintingStatusInvoice', name:'SDPrintingStatusInvoice', inTable:  false  },
            { label: 'sDPrintingStatusDispatch', name:'SDPrintingStatusDispatch', inTable:  false  },
            { label: 'sDPrintingStatusTransactions', name:'SDPrintingStatusTransactions', inTable:  false  },
            { label: 'sDOldDocument', name:'SDOldDocument', inTable:  false  },
            { label: 'sDTransactionDiaryNumber', name:'SDTransactionDiaryNumber', inTable:  false  },
            { label: 'sDUnified', name:'SDUnified', inTable:  false  },
            { label: 'sDPrintingPackagingOrder', name:'SDPrintingPackagingOrder', inTable:  false  },
            { label: 'sDTranslated', name:'SDTranslated', inTable:  false  },
            { label: 'sDForConsignment', name:'SDForConsignment', inTable:  false  },
            { label: 'sDDiaryConsignmentNumber', name:'SDDiaryConsignmentNumber', inTable:  false  },
            { label: 'sDBookkeepingDate', name:'SDBookkeepingDate', inTable:  false  },
        ]
    };

	$scope.items = [];
	$scope.itemEdit = {};

	// fill table with data
	$scope.loaded = false;
	var getShippingDocuments = function() {
		if(!$scope.loaded && $scope.items.length === 0) {
			$scope.isLoading = true;
			ServiceShippingDocument.query(function(data) {
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
	getShippingDocuments();

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