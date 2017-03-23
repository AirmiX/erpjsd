'use strict';

angular.module('Doob.initialization')


.controller('ctrlTaxHeading',['$scope', '$rootScope', '$modal', 'dialogs', 'CheckSelected', 'ServiceTaxHeading',
    function($scope, $rootScope, $modal, dialogs, CheckSelected, ServiceTaxHeading) {

	// main entity (taxHeading) properties names and labels
	$scope.itemDefinition = {
		label: 'initialization.taxHeading',
		properties: [
			{ label: 'tHDesignation', name:'THDesignation', inTable:  true  },
			{ label: 'tHDescription', name:'THDescription', inTable:  true  },
			{ label: 'tHStartDate', name:'THStartDate', inTable:  true  },
			{ label: 'tHEndDate', name:'THEndDate', inTable:  false  },
			{ label: 'tHTotalPercent', name:'THTotalPercent', inTable:  true  },
			{ label: 'tHRecalculatedTaxRate', name:'THRecalculatedTaxRate', inTable:  false  },
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
	// taxes with properties names and labels
	$scope.taxesDefinition = {
		label: 'initialization.tax',
		properties : [
			{ label: 'tOrdinalNumber', name:'TOrdinalNumber' },
			{ label: 'tName', name:'TName' },
			{ label: 'tPercent', name:'TPercent' },
		]
	};
	// invoiceItemWithoutDisp with properties names and labels
	$scope.invoiceItemWithoutDispDefinition = {
		label: 'procurement.invoiceItemsWithoutDisp',
		properties : [
			{ label: 'iIDOrdinalNumber', name:'IIDOrdinalNumber' },
			{ label: 'iIDAmount', name:'IIDAmount' },
		]
	};

	// fill table with data
	$scope.items = [];
	$scope.loaded = false;
	var getTaxHeadings = function() {
		if(!$scope.loaded && $scope.items.length === 0) {
			$scope.isLoading = true;
			ServiceTaxHeading.query(function(data) {
				$scope.items = data;
				$scope.isLoading = false;
				$scope.loaded = true;
			});
		}
	};
	getTaxHeadings();

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

	$scope.$watch('TaxHeadingCollection', function() {
		$scope.itemEdit = CheckSelected.checkSelectedInTable($scope.itemEdit, $scope.TaxHeadingCollection, $scope.items);
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
			templateUrl: 'initialization/taxheading/tmplTaxHeadingEdit.tpl.html',
			size: 'lg',
			windowClass: 'hmodal-info',
			controller: 'ctrlTaxHeadingEdit',
			resolve: {
				itemEdit: function() {
					if(isNew) {
						return new ServiceTaxHeading();
					} else {
						return $scope.itemEdit;
					}
				},
				beOrderItemsDefinition: function() {
					return $scope.beOrderItemsDefinition;
				},
				orderItemsDefinition: function() {
					return $scope.orderItemsDefinition;
				},
				shippingDocumentItemsDefinition: function() {
					return $scope.shippingDocumentItemsDefinition;
				},
				taxesDefinition: function() {
					return $scope.taxesDefinition;
				},
				invoiceItemWithoutDispDefinition: function() {
					return $scope.invoiceItemWithoutDispDefinition;
				},
			}
		})
		.result.then(function(result) {
			if(!angular.isDefined(result.id)) {
				ServiceTaxHeading.saveCustom('stockmanagement/taxheadings', result, function(savedObject) {
					$scope.items.unshift(savedObject);
					if($scope.itemEdit !== null) {
						var index = $scope.items.map(function(it) { return it.id; }).indexOf($scope.itemEdit.id);
						$scope.items[index].isSelected = false;
					}
					$scope.itemEdit = angular.extend(savedObject);
					$scope.items[0].isSelected = true;
				});
			 } else {
				 ServiceTaxHeading.updateCustom('stockmanagement/taxheadings/'+result.id, result, function(savedObject) {
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


.controller('ctrlTaxHeadingEdit',['$scope', 'Localization', '$modal', '$modalInstance', 'dialogs',
	'ServiceTaxHeading', 'ServiceBEOrderItem', 'ServiceOrderItem', 'ServiceShippingDocumentItem', 'ServiceTax', 'ServiceInvoiceItemsWithoutDisp',   'beOrderItemsDefinition',  'orderItemsDefinition',  'shippingDocumentItemsDefinition',  'taxesDefinition',  'invoiceItemWithoutDispDefinition',   'itemEdit',
function($scope, Localization, $modal, $modalInstance, dialogs,
	ServiceTaxHeading, ServiceBEOrderItem, ServiceOrderItem, ServiceShippingDocumentItem, ServiceTax, ServiceInvoiceItemsWithoutDisp,  beOrderItemsDefinition,  orderItemsDefinition,  shippingDocumentItemsDefinition,  taxesDefinition,  invoiceItemWithoutDispDefinition,  itemEdit) {

	// dialog mode
	$scope.mode = 'edit';

	// original item state
	var original = angular.copy(itemEdit);
	// item state
	$scope.itemEdit = angular.copy(original);

	// beOrderItems with properties
	$scope.beOrderItemsDefinition = beOrderItemsDefinition;
	// orderItems with properties
	$scope.orderItemsDefinition = orderItemsDefinition;
	// shippingDocumentItems with properties
	$scope.shippingDocumentItemsDefinition = shippingDocumentItemsDefinition;
	// taxes with properties
	$scope.taxesDefinition = taxesDefinition;
	// invoiceItemWithoutDisp with properties
	$scope.invoiceItemWithoutDispDefinition = invoiceItemWithoutDispDefinition;

	// datepicker logic

	// date properties
	$scope.openedTHStartDate = false;
	$scope.openedTHEndDate = false;

	$scope.open = function($event, opened) {
		$event.preventDefault();
		$event.stopPropagation();
		$scope[opened] = true;
	};



    $scope.taxEdit = null;

    // taxes table selection logic
    $scope.taxSelection = function(item, index) {
        if(item.isSelected) {
            if($scope.taxEdit !== null) {
                var index1 = $scope.itemEdit.taxes.map(function(it) { return it.id; }).indexOf($scope.taxEdit.id);
                $scope.itemEdit.taxes[index1].isSelected = false;
            }
            $scope.taxEdit = item;
        } else {
            $scope.taxEdit = null;
            item.isSelected = false;
        }
    };

    // New/Edit taxes dialog
    $scope.openTaxEditDialog = function(isNew) {
        $modal.open({
            backdrop: 'static',
            keyboard : false,
            templateUrl: 'initialization/taxheading/tmplTaxEdit.tpl.html',
            size: 'lg',
            controller: 'ctrlTaxEdit',
            windowClass: 'hmodal-info',
            resolve: {
                itemEdit: function() {
                    if(isNew) {
                        return new ServiceTax();
                    } else {
                        return $scope.taxEdit;
                    }
                }
            }
        }).result.then(function(result) {
            var i;
            if(isNew) {
                if(!angular.isDefined($scope.itemEdit.taxes)) {
                    $scope.itemEdit.taxes = [];
                }
                $scope.itemEdit.taxes.unshift(result);
                for(i in $scope.itemEdit.taxes) {
                    $scope.itemEdit.taxes[i].isSelected = false;
                }
                $scope.taxEdit = angular.extend(result);
                $scope.itemEdit.taxes[0].isSelected = true;
            }
            else {
                for(i in $scope.itemEdit.taxes) {
                    $scope.itemEdit.taxes[i].isSelected = false;
                }
                $scope.taxEdit = angular.extend(result);
                var index = $scope.itemEdit.taxes.map(function(it) { return it.id; }).indexOf(result.id);
                for(var key in result) {
                    $scope.itemEdit.taxes[index][key] = result[key];
                }
                $scope.itemEdit.taxes[index].isSelected = true;
            }
        });
    };

    $scope.removeTax = function(item) {
        var dialog = dialogs.confirm('Please confirm', 'Are you sure you want to delete item?');
        dialog.result.then(function(btn) {
            var removeIndex = $scope.itemEdit.taxes.map(function(it) { return it.id; }).indexOf(item.id);
            $scope.itemEdit.taxes[removeIndex].deleted = true;
        });
    };


	// Save Button
	$scope.save = function() {
		correctDateTime($scope.itemEdit.THStartDate);
		correctDateTime($scope.itemEdit.THEndDate);
	   //	delete $scope.itemEdit.isSelected;
        var item;
        var i;
        for(i in $scope.itemEdit.beOrderItems) {
    		item = $scope.itemEdit.beOrderItems[i];
    		delete item.isSelected;
    	}
        for(i in $scope.itemEdit.orderItems) {
    		item = $scope.itemEdit.orderItems[i];
    		delete item.isSelected;
    	}
        for(i in $scope.itemEdit.shippingDocumentItems) {
    		item = $scope.itemEdit.shippingDocumentItems[i];
    		delete item.isSelected;
    	}
        for(i in $scope.itemEdit.invoiceItemWithoutDisp) {
    		item = $scope.itemEdit.invoiceItemWithoutDisp[i];
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
		return                 item.THDesignation  &&                 item.THDescription  &&                 item.THStartDate  &&                 item.THTotalPercent  ;
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


.controller('ctrlTaxHeadingChoose', ['$scope','ServiceTaxHeading', 'dialogs', '$modal', '$modalInstance', 'itemEdit',
function($scope, ServiceTaxHeading, dialogs, $modal,  $modalInstance, itemEdit) {

    // entity with properties
    $scope.itemDefinition = {
        label: 'initialization.taxHeading',
        properties: [
            { label: 'tHDesignation', name:'THDesignation', inTable:  true  },
            { label: 'tHDescription', name:'THDescription', inTable:  true  },
            { label: 'tHStartDate', name:'THStartDate', inTable:  true  },
            { label: 'tHEndDate', name:'THEndDate', inTable:  false  },
            { label: 'tHTotalPercent', name:'THTotalPercent', inTable:  true  },
            { label: 'tHRecalculatedTaxRate', name:'THRecalculatedTaxRate', inTable:  false  },
        ]
    };

	$scope.items = [];
	$scope.itemEdit = {};

	// fill table with data
	$scope.loaded = false;
	var getTaxHeadings = function() {
		if(!$scope.loaded && $scope.items.length === 0) {
			$scope.isLoading = true;
			ServiceTaxHeading.query(function(data) {
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
	getTaxHeadings();

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