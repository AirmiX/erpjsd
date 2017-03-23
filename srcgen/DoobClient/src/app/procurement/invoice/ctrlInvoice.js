'use strict';

angular.module('Doob.procurement')


.controller('ctrlInvoice',['$scope', '$rootScope', '$modal', 'dialogs', 'CheckSelected', 'ServiceInvoice',
    function($scope, $rootScope, $modal, dialogs, CheckSelected, ServiceInvoice) {

	// main entity (invoice) properties names and labels
	$scope.itemDefinition = {
		label: 'procurement.invoice',
		properties: [
			{ label: 'iInvoiceNumber', name:'IInvoiceNumber', inTable:  true  },
			{ label: 'iInvoiceDate', name:'IInvoiceDate', inTable:  true  },
			{ label: 'iPaymentDate', name:'IPaymentDate', inTable:  true  },
			{ label: 'iShippingDocumentNumber', name:'IShippingDocumentNumber', inTable:  false  },
			{ label: 'iShippingDate', name:'IShippingDate', inTable:  false  },
			{ label: 'iInvoiceStatus', name:'IInvoiceStatus', inTable:  true  },
			{ label: 'iPrintStatus', name:'IPrintStatus', inTable:  true  },
			{ label: 'iSubTotal', name:'ISubTotal', inTable:  true  },
			{ label: 'iTurnoverCosts', name:'ITurnoverCosts', inTable:  false  },
			{ label: 'iTotal', name:'ITotal', inTable:  false  },
			{ label: 'iPostCosts', name:'IPostCosts', inTable:  false  },
			{ label: 'iPackingCosts', name:'IPackingCosts', inTable:  false  },
			{ label: 'iAmountWithoutTax', name:'IAmountWithoutTax', inTable:  false  },
			{ label: 'iTaxAmount', name:'ITaxAmount', inTable:  false  },
			{ label: 'iPaymentAmount', name:'IPaymentAmount', inTable:  true  },
			{ label: 'iForeignCommission', name:'IForeignCommission', inTable:  false  },
			{ label: 'iDiscountPercentage', name:'IDiscountPercentage', inTable:  false  },
			{ label: 'iForeignCurrencyNetAmount', name:'IForeignCurrencyNetAmount', inTable:  false  },
			{ label: 'iTotalRSD', name:'ITotalRSD', inTable:  false  },
			{ label: 'iExportCommission', name:'IExportCommission', inTable:  false  },
			{ label: 'iRemark', name:'IRemark', inTable:  false  },
			{ label: 'iTaxDeclarationNumber', name:'ITaxDeclarationNumber', inTable:  false  },
			{ label: 'iConfirmationNumber', name:'IConfirmationNumber', inTable:  false  },
			{ label: 'iDeclarationDate', name:'IDeclarationDate', inTable:  false  },
			{ label: 'iConfirmationDate', name:'IConfirmationDate', inTable:  false  },
			{ label: 'iKOrderNumber', name:'IKOrderNumber', inTable:  false  },
			{ label: 'iFreeInvoice', name:'IFreeInvoice', inTable:  false  },
			{ label: 'iUnified', name:'IUnified', inTable:  false  },
			{ label: 'iConclusionNumber', name:'IConclusionNumber', inTable:  false  },
			{ label: 'iUniqueCustomsIdentifier', name:'IUniqueCustomsIdentifier', inTable:  false  },
			{ label: 'iCustomsDate', name:'ICustomsDate', inTable:  false  },
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
	// identification with properties names and labels
	$scope.identificationDefinition = {
		label: 'commonbusinessentities.identification',
		properties : [
			{ label: 'iIdentificationCode', name:'IIdentificationCode' },
		]
	};
	// paymentCondition with properties names and labels
	$scope.paymentConditionDefinition = {
		label: 'initialization.paymentCondition',
		properties : [
			{ label: 'pCCode', name:'PCCode' },
			{ label: 'pCDescription', name:'PCDescription' },
		]
	};
	// currency with properties names and labels
	$scope.currencyDefinition = {
		label: 'capacitymanagement.currency',
		properties : [
			{ label: 'cCurrencyDesignation', name:'CCurrencyDesignation' },
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
	// organizationUnit with properties names and labels
	$scope.organizationUnitDefinition = {
		label: 'corporation.organizationUnit',
		properties : [
			{ label: 'oUIdentificationCode', name:'OUIdentificationCode' },
			{ label: 'oUName', name:'OUName' },
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
	// shippingDocument with properties names and labels
	$scope.shippingDocumentDefinition = {
		label: 'procurement.shippingDocument',
		properties : [
			{ label: 'sDDocumentNumber', name:'SDDocumentNumber' },
			{ label: 'sDDispositionDate', name:'SDDispositionDate' },
			{ label: 'sDStatus', name:'SDStatus' },
		]
	};
	// taxInvoices with properties names and labels
	$scope.taxInvoicesDefinition = {
		label: 'procurement.taxInvoice',
		properties : [
			{ label: 'tIOrdinalNumber', name:'TIOrdinalNumber' },
			{ label: 'tIPercentage', name:'TIPercentage' },
			{ label: 'tIAmount', name:'TIAmount' },
		]
	};
	// invoiceItemsWithoutDisp with properties names and labels
	$scope.invoiceItemsWithoutDispDefinition = {
		label: 'procurement.invoiceItemsWithoutDisp',
		properties : [
			{ label: 'iIDOrdinalNumber', name:'IIDOrdinalNumber' },
			{ label: 'iIDAmount', name:'IIDAmount' },
		]
	};
	// invoiceItems with properties names and labels
	$scope.invoiceItemsDefinition = {
		label: 'procurement.invoiceItem',
		properties : [
			{ label: 'iIOrdinalNumber', name:'IIOrdinalNumber' },
		]
	};

	// fill table with data
	$scope.items = [];
	$scope.loaded = false;
	var getInvoices = function() {
		if(!$scope.loaded && $scope.items.length === 0) {
			$scope.isLoading = true;
			ServiceInvoice.query(function(data) {
				$scope.items = data;
				$scope.isLoading = false;
				$scope.loaded = true;
			});
		}
	};
	getInvoices();

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

	$scope.$watch('InvoiceCollection', function() {
		$scope.itemEdit = CheckSelected.checkSelectedInTable($scope.itemEdit, $scope.InvoiceCollection, $scope.items);
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
			templateUrl: 'procurement/invoice/tmplInvoiceEdit.tpl.html',
			size: 'lg',
			windowClass: 'hmodal-info',
			controller: 'ctrlInvoiceEdit',
			resolve: {
				itemEdit: function() {
					if(isNew) {
						return new ServiceInvoice();
					} else {
						return $scope.itemEdit;
					}
				},
				documentTypeDefinition: function() {
					return $scope.documentTypeDefinition;
				},
				identificationDefinition: function() {
					return $scope.identificationDefinition;
				},
				paymentConditionDefinition: function() {
					return $scope.paymentConditionDefinition;
				},
				currencyDefinition: function() {
					return $scope.currencyDefinition;
				},
				orderHeadingDefinition: function() {
					return $scope.orderHeadingDefinition;
				},
				organizationUnitDefinition: function() {
					return $scope.organizationUnitDefinition;
				},
				declarationBasisDefinition: function() {
					return $scope.declarationBasisDefinition;
				},
				shippingDocumentDefinition: function() {
					return $scope.shippingDocumentDefinition;
				},
				taxInvoicesDefinition: function() {
					return $scope.taxInvoicesDefinition;
				},
				invoiceItemsWithoutDispDefinition: function() {
					return $scope.invoiceItemsWithoutDispDefinition;
				},
				invoiceItemsDefinition: function() {
					return $scope.invoiceItemsDefinition;
				},
			}
		})
		.result.then(function(result) {
			if(!angular.isDefined(result.id)) {
				ServiceInvoice.saveCustom('stockmanagement/invoices', result, function(savedObject) {
					$scope.items.unshift(savedObject);
					if($scope.itemEdit !== null) {
						var index = $scope.items.map(function(it) { return it.id; }).indexOf($scope.itemEdit.id);
						$scope.items[index].isSelected = false;
					}
					$scope.itemEdit = angular.extend(savedObject);
					$scope.items[0].isSelected = true;
				});
			 } else {
				 ServiceInvoice.updateCustom('stockmanagement/invoices/'+result.id, result, function(savedObject) {
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


.controller('ctrlInvoiceEdit',['$scope', 'Localization', '$modal', '$modalInstance', 'dialogs',
	'ServiceInvoice', 'ServiceDocumentType', 'ServiceIdentification', 'ServicePaymentCondition', 'ServiceCurrency', 'ServiceOrderHeading', 'ServiceOrganizationUnit', 'ServiceDeclarationBasis', 'ServiceShippingDocument', 'ServiceTaxInvoice', 'ServiceInvoiceItemsWithoutDisp', 'ServiceInvoiceItem',   'documentTypeDefinition',  'identificationDefinition',  'paymentConditionDefinition',  'currencyDefinition',  'orderHeadingDefinition',  'organizationUnitDefinition',  'declarationBasisDefinition',  'shippingDocumentDefinition',  'taxInvoicesDefinition',  'invoiceItemsWithoutDispDefinition',  'invoiceItemsDefinition',   'itemEdit',
function($scope, Localization, $modal, $modalInstance, dialogs,
	ServiceInvoice, ServiceDocumentType, ServiceIdentification, ServicePaymentCondition, ServiceCurrency, ServiceOrderHeading, ServiceOrganizationUnit, ServiceDeclarationBasis, ServiceShippingDocument, ServiceTaxInvoice, ServiceInvoiceItemsWithoutDisp, ServiceInvoiceItem,  documentTypeDefinition,  identificationDefinition,  paymentConditionDefinition,  currencyDefinition,  orderHeadingDefinition,  organizationUnitDefinition,  declarationBasisDefinition,  shippingDocumentDefinition,  taxInvoicesDefinition,  invoiceItemsWithoutDispDefinition,  invoiceItemsDefinition,  itemEdit) {

	// dialog mode
	$scope.mode = 'edit';

	// original item state
	var original = angular.copy(itemEdit);
	// item state
	$scope.itemEdit = angular.copy(original);

	// documentType with properties
	$scope.documentTypeDefinition = documentTypeDefinition;
	// identification with properties
	$scope.identificationDefinition = identificationDefinition;
	// paymentCondition with properties
	$scope.paymentConditionDefinition = paymentConditionDefinition;
	// currency with properties
	$scope.currencyDefinition = currencyDefinition;
	// orderHeading with properties
	$scope.orderHeadingDefinition = orderHeadingDefinition;
	// organizationUnit with properties
	$scope.organizationUnitDefinition = organizationUnitDefinition;
	// declarationBasis with properties
	$scope.declarationBasisDefinition = declarationBasisDefinition;
	// shippingDocument with properties
	$scope.shippingDocumentDefinition = shippingDocumentDefinition;
	// taxInvoices with properties
	$scope.taxInvoicesDefinition = taxInvoicesDefinition;
	// invoiceItemsWithoutDisp with properties
	$scope.invoiceItemsWithoutDispDefinition = invoiceItemsWithoutDispDefinition;
	// invoiceItems with properties
	$scope.invoiceItemsDefinition = invoiceItemsDefinition;

	// datepicker logic

	// date properties
	$scope.openedIInvoiceDate = false;
	$scope.openedIPaymentDate = false;
	$scope.openedIShippingDate = false;
	$scope.openedIDeclarationDate = false;
	$scope.openedIConfirmationDate = false;
	$scope.openedICustomsDate = false;

	$scope.open = function($event, opened) {
		$event.preventDefault();
		$event.stopPropagation();
		$scope[opened] = true;
	};



	// Choose documentType
	$scope.openChooseDocumentTypeDialog = function() {
        $modal.open({
            backdrop: 'static',
            keyboard : false,
            templateUrl: 'corporation/invoice/tmplDocumentTypeChoose.tpl.html',
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


	// Choose identification
	$scope.openChooseIdentificationDialog = function() {
        $modal.open({
            backdrop: 'static',
            keyboard : false,
            templateUrl: 'commonbusinessentities/invoice/tmplIdentificationChoose.tpl.html',
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


	// Choose paymentCondition
	$scope.openChoosePaymentConditionDialog = function() {
        $modal.open({
            backdrop: 'static',
            keyboard : false,
            templateUrl: 'initialization/invoice/tmplPaymentConditionChoose.tpl.html',
            size: 'lg',
            controller: 'ctrlPaymentConditionChoose',
            windowClass: 'hmodal-info',
            resolve: {
				itemEdit: function() {
					if(angular.isDefined($scope.itemEdit.paymentCondition)){
						return $scope.itemEdit.paymentCondition;
					}
				}
			}
		}).result.then(function(result) {
			$scope.itemEdit.paymentCondition = angular.copy(result);
		});
    };


	// Choose currency
	$scope.openChooseCurrencyDialog = function() {
        $modal.open({
            backdrop: 'static',
            keyboard : false,
            templateUrl: 'capacitymanagement/invoice/tmplCurrencyChoose.tpl.html',
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


	// Choose orderHeading
	$scope.openChooseOrderHeadingDialog = function() {
        $modal.open({
            backdrop: 'static',
            keyboard : false,
            templateUrl: 'order/invoice/tmplOrderHeadingChoose.tpl.html',
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


	// Choose organizationUnit
	$scope.openChooseOrganizationUnitDialog = function() {
        $modal.open({
            backdrop: 'static',
            keyboard : false,
            templateUrl: 'corporation/invoice/tmplOrganizationUnitChoose.tpl.html',
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


	// Choose declarationBasis
	$scope.openChooseDeclarationBasisDialog = function() {
        $modal.open({
            backdrop: 'static',
            keyboard : false,
            templateUrl: 'initialization/invoice/tmplDeclarationBasisChoose.tpl.html',
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


	// Choose shippingDocument
	$scope.openChooseShippingDocumentDialog = function() {
        $modal.open({
            backdrop: 'static',
            keyboard : false,
            templateUrl: 'procurement/invoice/tmplShippingDocumentChoose.tpl.html',
            size: 'lg',
            controller: 'ctrlShippingDocumentChoose',
            windowClass: 'hmodal-info',
            resolve: {
				itemEdit: function() {
					if(angular.isDefined($scope.itemEdit.shippingDocument)){
						return $scope.itemEdit.shippingDocument;
					}
				}
			}
		}).result.then(function(result) {
			$scope.itemEdit.shippingDocument = angular.copy(result);
		});
    };


    $scope.taxInvoiceEdit = null;

    // taxInvoices table selection logic
    $scope.taxInvoiceSelection = function(item, index) {
        if(item.isSelected) {
            if($scope.taxInvoiceEdit !== null) {
                var index1 = $scope.itemEdit.taxInvoices.map(function(it) { return it.id; }).indexOf($scope.taxInvoiceEdit.id);
                $scope.itemEdit.taxInvoices[index1].isSelected = false;
            }
            $scope.taxInvoiceEdit = item;
        } else {
            $scope.taxInvoiceEdit = null;
            item.isSelected = false;
        }
    };

    // New/Edit taxInvoices dialog
    $scope.openTaxInvoiceEditDialog = function(isNew) {
        $modal.open({
            backdrop: 'static',
            keyboard : false,
            templateUrl: 'procurement/invoice/tmplTaxInvoiceEdit.tpl.html',
            size: 'lg',
            controller: 'ctrlTaxInvoiceEdit',
            windowClass: 'hmodal-info',
            resolve: {
                itemEdit: function() {
                    if(isNew) {
                        return new ServiceTaxInvoice();
                    } else {
                        return $scope.taxInvoiceEdit;
                    }
                }
            }
        }).result.then(function(result) {
            var i;
            if(isNew) {
                if(!angular.isDefined($scope.itemEdit.taxInvoices)) {
                    $scope.itemEdit.taxInvoices = [];
                }
                $scope.itemEdit.taxInvoices.unshift(result);
                for(i in $scope.itemEdit.taxInvoices) {
                    $scope.itemEdit.taxInvoices[i].isSelected = false;
                }
                $scope.taxInvoiceEdit = angular.extend(result);
                $scope.itemEdit.taxInvoices[0].isSelected = true;
            }
            else {
                for(i in $scope.itemEdit.taxInvoices) {
                    $scope.itemEdit.taxInvoices[i].isSelected = false;
                }
                $scope.taxInvoiceEdit = angular.extend(result);
                var index = $scope.itemEdit.taxInvoices.map(function(it) { return it.id; }).indexOf(result.id);
                for(var key in result) {
                    $scope.itemEdit.taxInvoices[index][key] = result[key];
                }
                $scope.itemEdit.taxInvoices[index].isSelected = true;
            }
        });
    };

    $scope.removeTaxInvoice = function(item) {
        var dialog = dialogs.confirm('Please confirm', 'Are you sure you want to delete item?');
        dialog.result.then(function(btn) {
            var removeIndex = $scope.itemEdit.taxInvoices.map(function(it) { return it.id; }).indexOf(item.id);
            $scope.itemEdit.taxInvoices[removeIndex].deleted = true;
        });
    };


    $scope.invoiceItemsWithoutDispEdit = null;

    // invoiceItemsWithoutDisp table selection logic
    $scope.invoiceItemsWithoutDispSelection = function(item, index) {
        if(item.isSelected) {
            if($scope.invoiceItemsWithoutDispEdit !== null) {
                var index1 = $scope.itemEdit.invoiceItemsWithoutDisp.map(function(it) { return it.id; }).indexOf($scope.invoiceItemsWithoutDispEdit.id);
                $scope.itemEdit.invoiceItemsWithoutDisp[index1].isSelected = false;
            }
            $scope.invoiceItemsWithoutDispEdit = item;
        } else {
            $scope.invoiceItemsWithoutDispEdit = null;
            item.isSelected = false;
        }
    };

    // New/Edit invoiceItemsWithoutDisp dialog
    $scope.openInvoiceItemsWithoutDispEditDialog = function(isNew) {
        $modal.open({
            backdrop: 'static',
            keyboard : false,
            templateUrl: 'procurement/invoice/tmplInvoiceItemsWithoutDispEdit.tpl.html',
            size: 'lg',
            controller: 'ctrlInvoiceItemsWithoutDispEdit',
            windowClass: 'hmodal-info',
            resolve: {
                itemEdit: function() {
                    if(isNew) {
                        return new ServiceInvoiceItemsWithoutDisp();
                    } else {
                        return $scope.invoiceItemsWithoutDispEdit;
                    }
                }
            }
        }).result.then(function(result) {
            var i;
            if(isNew) {
                if(!angular.isDefined($scope.itemEdit.invoiceItemsWithoutDisp)) {
                    $scope.itemEdit.invoiceItemsWithoutDisp = [];
                }
                $scope.itemEdit.invoiceItemsWithoutDisp.unshift(result);
                for(i in $scope.itemEdit.invoiceItemsWithoutDisp) {
                    $scope.itemEdit.invoiceItemsWithoutDisp[i].isSelected = false;
                }
                $scope.invoiceItemsWithoutDispEdit = angular.extend(result);
                $scope.itemEdit.invoiceItemsWithoutDisp[0].isSelected = true;
            }
            else {
                for(i in $scope.itemEdit.invoiceItemsWithoutDisp) {
                    $scope.itemEdit.invoiceItemsWithoutDisp[i].isSelected = false;
                }
                $scope.invoiceItemsWithoutDispEdit = angular.extend(result);
                var index = $scope.itemEdit.invoiceItemsWithoutDisp.map(function(it) { return it.id; }).indexOf(result.id);
                for(var key in result) {
                    $scope.itemEdit.invoiceItemsWithoutDisp[index][key] = result[key];
                }
                $scope.itemEdit.invoiceItemsWithoutDisp[index].isSelected = true;
            }
        });
    };

    $scope.removeInvoiceItemsWithoutDisp = function(item) {
        var dialog = dialogs.confirm('Please confirm', 'Are you sure you want to delete item?');
        dialog.result.then(function(btn) {
            var removeIndex = $scope.itemEdit.invoiceItemsWithoutDisp.map(function(it) { return it.id; }).indexOf(item.id);
            $scope.itemEdit.invoiceItemsWithoutDisp[removeIndex].deleted = true;
        });
    };


    $scope.invoiceItemEdit = null;

    // invoiceItems table selection logic
    $scope.invoiceItemSelection = function(item, index) {
        if(item.isSelected) {
            if($scope.invoiceItemEdit !== null) {
                var index1 = $scope.itemEdit.invoiceItems.map(function(it) { return it.id; }).indexOf($scope.invoiceItemEdit.id);
                $scope.itemEdit.invoiceItems[index1].isSelected = false;
            }
            $scope.invoiceItemEdit = item;
        } else {
            $scope.invoiceItemEdit = null;
            item.isSelected = false;
        }
    };

    // New/Edit invoiceItems dialog
    $scope.openInvoiceItemEditDialog = function(isNew) {
        $modal.open({
            backdrop: 'static',
            keyboard : false,
            templateUrl: 'procurement/invoice/tmplInvoiceItemEdit.tpl.html',
            size: 'lg',
            controller: 'ctrlInvoiceItemEdit',
            windowClass: 'hmodal-info',
            resolve: {
                itemEdit: function() {
                    if(isNew) {
                        return new ServiceInvoiceItem();
                    } else {
                        return $scope.invoiceItemEdit;
                    }
                }
            }
        }).result.then(function(result) {
            var i;
            if(isNew) {
                if(!angular.isDefined($scope.itemEdit.invoiceItems)) {
                    $scope.itemEdit.invoiceItems = [];
                }
                $scope.itemEdit.invoiceItems.unshift(result);
                for(i in $scope.itemEdit.invoiceItems) {
                    $scope.itemEdit.invoiceItems[i].isSelected = false;
                }
                $scope.invoiceItemEdit = angular.extend(result);
                $scope.itemEdit.invoiceItems[0].isSelected = true;
            }
            else {
                for(i in $scope.itemEdit.invoiceItems) {
                    $scope.itemEdit.invoiceItems[i].isSelected = false;
                }
                $scope.invoiceItemEdit = angular.extend(result);
                var index = $scope.itemEdit.invoiceItems.map(function(it) { return it.id; }).indexOf(result.id);
                for(var key in result) {
                    $scope.itemEdit.invoiceItems[index][key] = result[key];
                }
                $scope.itemEdit.invoiceItems[index].isSelected = true;
            }
        });
    };

    $scope.removeInvoiceItem = function(item) {
        var dialog = dialogs.confirm('Please confirm', 'Are you sure you want to delete item?');
        dialog.result.then(function(btn) {
            var removeIndex = $scope.itemEdit.invoiceItems.map(function(it) { return it.id; }).indexOf(item.id);
            $scope.itemEdit.invoiceItems[removeIndex].deleted = true;
        });
    };


	// Save Button
	$scope.save = function() {
		correctDateTime($scope.itemEdit.IInvoiceDate);
		correctDateTime($scope.itemEdit.IPaymentDate);
		correctDateTime($scope.itemEdit.IShippingDate);
		correctDateTime($scope.itemEdit.IDeclarationDate);
		correctDateTime($scope.itemEdit.IConfirmationDate);
		correctDateTime($scope.itemEdit.ICustomsDate);
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
		return                 item.IInvoiceNumber  &&                 item.IInvoiceDate  &&                 item.IPaymentDate  &&                 item.IInvoiceStatus  &&                 item.IPrintStatus  &&                 item.ISubTotal  &&                 item.IPaymentAmount  ;
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


.controller('ctrlInvoiceChoose', ['$scope','ServiceInvoice', 'dialogs', '$modal', '$modalInstance', 'itemEdit',
function($scope, ServiceInvoice, dialogs, $modal,  $modalInstance, itemEdit) {

    // entity with properties
    $scope.itemDefinition = {
        label: 'procurement.invoice',
        properties: [
            { label: 'iInvoiceNumber', name:'IInvoiceNumber', inTable:  true  },
            { label: 'iInvoiceDate', name:'IInvoiceDate', inTable:  true  },
            { label: 'iPaymentDate', name:'IPaymentDate', inTable:  true  },
            { label: 'iShippingDocumentNumber', name:'IShippingDocumentNumber', inTable:  false  },
            { label: 'iShippingDate', name:'IShippingDate', inTable:  false  },
            { label: 'iInvoiceStatus', name:'IInvoiceStatus', inTable:  true  },
            { label: 'iPrintStatus', name:'IPrintStatus', inTable:  true  },
            { label: 'iSubTotal', name:'ISubTotal', inTable:  true  },
            { label: 'iTurnoverCosts', name:'ITurnoverCosts', inTable:  false  },
            { label: 'iTotal', name:'ITotal', inTable:  false  },
            { label: 'iPostCosts', name:'IPostCosts', inTable:  false  },
            { label: 'iPackingCosts', name:'IPackingCosts', inTable:  false  },
            { label: 'iAmountWithoutTax', name:'IAmountWithoutTax', inTable:  false  },
            { label: 'iTaxAmount', name:'ITaxAmount', inTable:  false  },
            { label: 'iPaymentAmount', name:'IPaymentAmount', inTable:  true  },
            { label: 'iForeignCommission', name:'IForeignCommission', inTable:  false  },
            { label: 'iDiscountPercentage', name:'IDiscountPercentage', inTable:  false  },
            { label: 'iForeignCurrencyNetAmount', name:'IForeignCurrencyNetAmount', inTable:  false  },
            { label: 'iTotalRSD', name:'ITotalRSD', inTable:  false  },
            { label: 'iExportCommission', name:'IExportCommission', inTable:  false  },
            { label: 'iRemark', name:'IRemark', inTable:  false  },
            { label: 'iTaxDeclarationNumber', name:'ITaxDeclarationNumber', inTable:  false  },
            { label: 'iConfirmationNumber', name:'IConfirmationNumber', inTable:  false  },
            { label: 'iDeclarationDate', name:'IDeclarationDate', inTable:  false  },
            { label: 'iConfirmationDate', name:'IConfirmationDate', inTable:  false  },
            { label: 'iKOrderNumber', name:'IKOrderNumber', inTable:  false  },
            { label: 'iFreeInvoice', name:'IFreeInvoice', inTable:  false  },
            { label: 'iUnified', name:'IUnified', inTable:  false  },
            { label: 'iConclusionNumber', name:'IConclusionNumber', inTable:  false  },
            { label: 'iUniqueCustomsIdentifier', name:'IUniqueCustomsIdentifier', inTable:  false  },
            { label: 'iCustomsDate', name:'ICustomsDate', inTable:  false  },
        ]
    };

	$scope.items = [];
	$scope.itemEdit = {};

	// fill table with data
	$scope.loaded = false;
	var getInvoices = function() {
		if(!$scope.loaded && $scope.items.length === 0) {
			$scope.isLoading = true;
			ServiceInvoice.query(function(data) {
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
	getInvoices();

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