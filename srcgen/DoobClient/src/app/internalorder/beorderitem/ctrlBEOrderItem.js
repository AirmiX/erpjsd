'use strict';

angular.module('Doob.internalorder')


.controller('ctrlBEOrderItem',['$scope', '$rootScope', '$modal', 'dialogs', 'CheckSelected', 'ServiceBEOrderItem',
    function($scope, $rootScope, $modal, dialogs, CheckSelected, ServiceBEOrderItem) {

	// main entity (bEOrderItem) properties names and labels
	$scope.itemDefinition = {
		label: 'internalorder.bEOrderItem',
		properties: [
			{ label: 'bEOIOrdinalNumber', name:'BEOIOrdinalNumber', inTable:  true  },
			{ label: 'bEOIPrice', name:'BEOIPrice', inTable:  false  },
			{ label: 'bEOIOrderedQuantity', name:'BEOIOrderedQuantity', inTable:  true  },
			{ label: 'bEOIProductionQuantity', name:'BEOIProductionQuantity', inTable:  false  },
			{ label: 'bEOIDeliveryPeriod', name:'BEOIDeliveryPeriod', inTable:  false  },
			{ label: 'bEOIValue', name:'BEOIValue', inTable:  false  },
			{ label: 'bEOICompletionStatus', name:'BEOICompletionStatus', inTable:  false  },
			{ label: 'bEOIDiscount', name:'BEOIDiscount', inTable:  false  },
			{ label: 'bEOILeftQuantity', name:'BEOILeftQuantity', inTable:  false  },
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
	// orderItem with properties names and labels
	$scope.orderItemDefinition = {
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
	// measurementUnit with properties names and labels
	$scope.measurementUnitDefinition = {
		label: 'commonbusinessentities.measurementUnit',
		properties : [
			{ label: 'mUIdentificationCode', name:'MUIdentificationCode' },
			{ label: 'mUName', name:'MUName' },
		]
	};
	// productInstance with properties names and labels
	$scope.productInstanceDefinition = {
		label: 'order.productInstance',
		properties : [
			{ label: 'pIName', name:'PIName' },
		]
	};
	// beOrderHeading with properties names and labels
	$scope.beOrderHeadingDefinition = {
		label: 'internalorder.bEOrderHeading',
		properties : [
			{ label: 'bEOHDocumentNumber', name:'BEOHDocumentNumber' },
			{ label: 'bEOHCreationDate', name:'BEOHCreationDate' },
			{ label: 'bEOHOrderDate', name:'BEOHOrderDate' },
		]
	};
	// productType with properties names and labels
	$scope.productTypeDefinition = {
		label: 'commonbusinessentities.identification',
		properties : [
			{ label: 'iIdentificationCode', name:'IIdentificationCode' },
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
	// currency with properties names and labels
	$scope.currencyDefinition = {
		label: 'capacitymanagement.currency',
		properties : [
			{ label: 'cCurrencyDesignation', name:'CCurrencyDesignation' },
		]
	};
	// packingMethod with properties names and labels
	$scope.packingMethodDefinition = {
		label: 'initialization.packingMethod',
		properties : [
			{ label: 'pMCode', name:'PMCode' },
			{ label: 'pMName', name:'PMName' },
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
	// beInvoiceItems with properties names and labels
	$scope.beInvoiceItemsDefinition = {
		label: 'internalinvoice.bEInvoiceItem',
		properties : [
			{ label: 'bEIIOrdinalNumber', name:'BEIIOrdinalNumber' },
			{ label: 'bEIIQuantity', name:'BEIIQuantity' },
		]
	};

	// fill table with data
	$scope.items = [];
	$scope.loaded = false;
	var getBEOrderItems = function() {
		if(!$scope.loaded && $scope.items.length === 0) {
			$scope.isLoading = true;
			ServiceBEOrderItem.query(function(data) {
				$scope.items = data;
				$scope.isLoading = false;
				$scope.loaded = true;
			});
		}
	};
	getBEOrderItems();

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

	$scope.$watch('BEOrderItemCollection', function() {
		$scope.itemEdit = CheckSelected.checkSelectedInTable($scope.itemEdit, $scope.BEOrderItemCollection, $scope.items);
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
			templateUrl: 'internalorder/beorderitem/tmplBEOrderItemEdit.tpl.html',
			size: 'lg',
			windowClass: 'hmodal-info',
			controller: 'ctrlBEOrderItemEdit',
			resolve: {
				itemEdit: function() {
					if(isNew) {
						return new ServiceBEOrderItem();
					} else {
						return $scope.itemEdit;
					}
				},
				taxHeadingDefinition: function() {
					return $scope.taxHeadingDefinition;
				},
				orderItemDefinition: function() {
					return $scope.orderItemDefinition;
				},
				measurementUnitDefinition: function() {
					return $scope.measurementUnitDefinition;
				},
				productInstanceDefinition: function() {
					return $scope.productInstanceDefinition;
				},
				beOrderHeadingDefinition: function() {
					return $scope.beOrderHeadingDefinition;
				},
				productTypeDefinition: function() {
					return $scope.productTypeDefinition;
				},
				organizationUnitDefinition: function() {
					return $scope.organizationUnitDefinition;
				},
				currencyDefinition: function() {
					return $scope.currencyDefinition;
				},
				packingMethodDefinition: function() {
					return $scope.packingMethodDefinition;
				},
				urgentStatusDefinition: function() {
					return $scope.urgentStatusDefinition;
				},
				stockroomDefinition: function() {
					return $scope.stockroomDefinition;
				},
				beInvoiceItemsDefinition: function() {
					return $scope.beInvoiceItemsDefinition;
				},
			}
		})
		.result.then(function(result) {
			if(!angular.isDefined(result.id)) {
				ServiceBEOrderItem.saveCustom('stockmanagement/beorderitems', result, function(savedObject) {
					$scope.items.unshift(savedObject);
					if($scope.itemEdit !== null) {
						var index = $scope.items.map(function(it) { return it.id; }).indexOf($scope.itemEdit.id);
						$scope.items[index].isSelected = false;
					}
					$scope.itemEdit = angular.extend(savedObject);
					$scope.items[0].isSelected = true;
				});
			 } else {
				 ServiceBEOrderItem.updateCustom('stockmanagement/beorderitems/'+result.id, result, function(savedObject) {
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


.controller('ctrlBEOrderItemEdit',['$scope', 'Localization', '$modal', '$modalInstance', 'dialogs',
	'ServiceBEOrderItem', 'ServiceTaxHeading', 'ServiceOrderItem', 'ServiceMeasurementUnit', 'ServiceProductInstance', 'ServiceBEOrderHeading', 'ServiceIdentification', 'ServiceOrganizationUnit', 'ServiceCurrency', 'ServicePackingMethod', 'ServiceUrgentStatus', 'ServiceStockroom', 'ServiceBEInvoiceItem',   'taxHeadingDefinition',  'orderItemDefinition',  'measurementUnitDefinition',  'productInstanceDefinition',  'beOrderHeadingDefinition',  'productTypeDefinition',  'organizationUnitDefinition',  'currencyDefinition',  'packingMethodDefinition',  'urgentStatusDefinition',  'stockroomDefinition',  'beInvoiceItemsDefinition',   'itemEdit',
function($scope, Localization, $modal, $modalInstance, dialogs,
	ServiceBEOrderItem, ServiceTaxHeading, ServiceOrderItem, ServiceMeasurementUnit, ServiceProductInstance, ServiceBEOrderHeading, ServiceIdentification, ServiceOrganizationUnit, ServiceCurrency, ServicePackingMethod, ServiceUrgentStatus, ServiceStockroom, ServiceBEInvoiceItem,  taxHeadingDefinition,  orderItemDefinition,  measurementUnitDefinition,  productInstanceDefinition,  beOrderHeadingDefinition,  productTypeDefinition,  organizationUnitDefinition,  currencyDefinition,  packingMethodDefinition,  urgentStatusDefinition,  stockroomDefinition,  beInvoiceItemsDefinition,  itemEdit) {

	// dialog mode
	$scope.mode = 'edit';

	// original item state
	var original = angular.copy(itemEdit);
	// item state
	$scope.itemEdit = angular.copy(original);

	// taxHeading with properties
	$scope.taxHeadingDefinition = taxHeadingDefinition;
	// orderItem with properties
	$scope.orderItemDefinition = orderItemDefinition;
	// measurementUnit with properties
	$scope.measurementUnitDefinition = measurementUnitDefinition;
	// productInstance with properties
	$scope.productInstanceDefinition = productInstanceDefinition;
	// beOrderHeading with properties
	$scope.beOrderHeadingDefinition = beOrderHeadingDefinition;
	// productType with properties
	$scope.productTypeDefinition = productTypeDefinition;
	// organizationUnit with properties
	$scope.organizationUnitDefinition = organizationUnitDefinition;
	// currency with properties
	$scope.currencyDefinition = currencyDefinition;
	// packingMethod with properties
	$scope.packingMethodDefinition = packingMethodDefinition;
	// urgentStatus with properties
	$scope.urgentStatusDefinition = urgentStatusDefinition;
	// stockroom with properties
	$scope.stockroomDefinition = stockroomDefinition;
	// beInvoiceItems with properties
	$scope.beInvoiceItemsDefinition = beInvoiceItemsDefinition;

	// datepicker logic

	// date properties
	$scope.openedBEOIDeliveryPeriod = false;

	$scope.open = function($event, opened) {
		$event.preventDefault();
		$event.stopPropagation();
		$scope[opened] = true;
	};



	// Choose taxHeading
	$scope.openChooseTaxHeadingDialog = function() {
        $modal.open({
            backdrop: 'static',
            keyboard : false,
            templateUrl: 'initialization/beorderitem/tmplTaxHeadingChoose.tpl.html',
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


	// Choose orderItem
	$scope.openChooseOrderItemDialog = function() {
        $modal.open({
            backdrop: 'static',
            keyboard : false,
            templateUrl: 'order/beorderitem/tmplOrderItemChoose.tpl.html',
            size: 'lg',
            controller: 'ctrlOrderItemChoose',
            windowClass: 'hmodal-info',
            resolve: {
				itemEdit: function() {
					if(angular.isDefined($scope.itemEdit.orderItem)){
						return $scope.itemEdit.orderItem;
					}
				}
			}
		}).result.then(function(result) {
			$scope.itemEdit.orderItem = angular.copy(result);
		});
    };


	// Choose measurementUnit
	$scope.openChooseMeasurementUnitDialog = function() {
        $modal.open({
            backdrop: 'static',
            keyboard : false,
            templateUrl: 'commonbusinessentities/beorderitem/tmplMeasurementUnitChoose.tpl.html',
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


	// Choose productInstance
	$scope.openChooseProductInstanceDialog = function() {
        $modal.open({
            backdrop: 'static',
            keyboard : false,
            templateUrl: 'order/beorderitem/tmplProductInstanceChoose.tpl.html',
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


	// Choose beOrderHeading
	$scope.openChooseBeOrderHeadingDialog = function() {
        $modal.open({
            backdrop: 'static',
            keyboard : false,
            templateUrl: 'internalorder/beorderitem/tmplBEOrderHeadingChoose.tpl.html',
            size: 'lg',
            controller: 'ctrlBEOrderHeadingChoose',
            windowClass: 'hmodal-info',
            resolve: {
				itemEdit: function() {
					if(angular.isDefined($scope.itemEdit.beOrderHeading)){
						return $scope.itemEdit.beOrderHeading;
					}
				}
			}
		}).result.then(function(result) {
			$scope.itemEdit.beOrderHeading = angular.copy(result);
		});
    };


	// Choose productType
	$scope.openChooseProductTypeDialog = function() {
        $modal.open({
            backdrop: 'static',
            keyboard : false,
            templateUrl: 'commonbusinessentities/beorderitem/tmplIdentificationChoose.tpl.html',
            size: 'lg',
            controller: 'ctrlIdentificationChoose',
            windowClass: 'hmodal-info',
            resolve: {
				itemEdit: function() {
					if(angular.isDefined($scope.itemEdit.productType)){
						return $scope.itemEdit.productType;
					}
				}
			}
		}).result.then(function(result) {
			$scope.itemEdit.productType = angular.copy(result);
		});
    };


	// Choose organizationUnit
	$scope.openChooseOrganizationUnitDialog = function() {
        $modal.open({
            backdrop: 'static',
            keyboard : false,
            templateUrl: 'corporation/beorderitem/tmplOrganizationUnitChoose.tpl.html',
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


	// Choose currency
	$scope.openChooseCurrencyDialog = function() {
        $modal.open({
            backdrop: 'static',
            keyboard : false,
            templateUrl: 'capacitymanagement/beorderitem/tmplCurrencyChoose.tpl.html',
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


	// Choose packingMethod
	$scope.openChoosePackingMethodDialog = function() {
        $modal.open({
            backdrop: 'static',
            keyboard : false,
            templateUrl: 'initialization/beorderitem/tmplPackingMethodChoose.tpl.html',
            size: 'lg',
            controller: 'ctrlPackingMethodChoose',
            windowClass: 'hmodal-info',
            resolve: {
				itemEdit: function() {
					if(angular.isDefined($scope.itemEdit.packingMethod)){
						return $scope.itemEdit.packingMethod;
					}
				}
			}
		}).result.then(function(result) {
			$scope.itemEdit.packingMethod = angular.copy(result);
		});
    };


	// Choose urgentStatus
	$scope.openChooseUrgentStatusDialog = function() {
        $modal.open({
            backdrop: 'static',
            keyboard : false,
            templateUrl: 'initialization/beorderitem/tmplUrgentStatusChoose.tpl.html',
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


	// Choose stockroom
	$scope.openChooseStockroomDialog = function() {
        $modal.open({
            backdrop: 'static',
            keyboard : false,
            templateUrl: 'stock/beorderitem/tmplStockroomChoose.tpl.html',
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


	// Save Button
	$scope.save = function() {
		correctDateTime($scope.itemEdit.BEOIDeliveryPeriod);
	   //	delete $scope.itemEdit.isSelected;
        var item;
        var i;
        for(i in $scope.itemEdit.beInvoiceItems) {
    		item = $scope.itemEdit.beInvoiceItems[i];
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
		return                 item.BEOIOrdinalNumber  &&                 item.BEOIOrderedQuantity  ;
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


.controller('ctrlBEOrderItemChoose', ['$scope','ServiceBEOrderItem', 'dialogs', '$modal', '$modalInstance', 'itemEdit',
function($scope, ServiceBEOrderItem, dialogs, $modal,  $modalInstance, itemEdit) {

    // entity with properties
    $scope.itemDefinition = {
        label: 'internalorder.bEOrderItem',
        properties: [
            { label: 'bEOIOrdinalNumber', name:'BEOIOrdinalNumber', inTable:  true  },
            { label: 'bEOIPrice', name:'BEOIPrice', inTable:  false  },
            { label: 'bEOIOrderedQuantity', name:'BEOIOrderedQuantity', inTable:  true  },
            { label: 'bEOIProductionQuantity', name:'BEOIProductionQuantity', inTable:  false  },
            { label: 'bEOIDeliveryPeriod', name:'BEOIDeliveryPeriod', inTable:  false  },
            { label: 'bEOIValue', name:'BEOIValue', inTable:  false  },
            { label: 'bEOICompletionStatus', name:'BEOICompletionStatus', inTable:  false  },
            { label: 'bEOIDiscount', name:'BEOIDiscount', inTable:  false  },
            { label: 'bEOILeftQuantity', name:'BEOILeftQuantity', inTable:  false  },
        ]
    };

	$scope.items = [];
	$scope.itemEdit = {};

	// fill table with data
	$scope.loaded = false;
	var getBEOrderItems = function() {
		if(!$scope.loaded && $scope.items.length === 0) {
			$scope.isLoading = true;
			ServiceBEOrderItem.query(function(data) {
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
	getBEOrderItems();

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