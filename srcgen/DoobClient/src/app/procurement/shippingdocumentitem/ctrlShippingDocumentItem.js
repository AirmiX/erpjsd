'use strict';

angular.module('Doob.procurement')


.controller('ctrlShippingDocumentItem',['$scope', '$rootScope', '$modal', 'dialogs', 'CheckSelected', 'ServiceShippingDocumentItem',
    function($scope, $rootScope, $modal, dialogs, CheckSelected, ServiceShippingDocumentItem) {

	// main entity (shippingDocumentItem) properties names and labels
	$scope.itemDefinition = {
		label: 'procurement.shippingDocumentItem',
		properties: [
			{ label: 'sDIOrdinalNumber', name:'SDIOrdinalNumber', inTable:  true  },
			{ label: 'sDIQuantityDisposed', name:'SDIQuantityDisposed', inTable:  true  },
			{ label: 'sDIQuantityPacked', name:'SDIQuantityPacked', inTable:  true  },
			{ label: 'sDIQuantityForRepacking', name:'SDIQuantityForRepacking', inTable:  false  },
			{ label: 'sDIQuantityDispatched', name:'SDIQuantityDispatched', inTable:  true  },
			{ label: 'sDIBookValueAmmount', name:'SDIBookValueAmmount', inTable:  false  },
			{ label: 'sDISellingPrice', name:'SDISellingPrice', inTable:  false  },
			{ label: 'sDIRebate', name:'SDIRebate', inTable:  false  },
			{ label: 'sDIPostingPosition', name:'SDIPostingPosition', inTable:  false  },
			{ label: 'sDIStorno', name:'SDIStorno', inTable:  false  },
			{ label: 'sDIPostingDate', name:'SDIPostingDate', inTable:  false  },
			{ label: 'sDILocationAddress', name:'SDILocationAddress', inTable:  false  },
			{ label: 'sDIQuantityAfterPosting', name:'SDIQuantityAfterPosting', inTable:  false  },
			{ label: 'sDIAccount', name:'SDIAccount', inTable:  false  },
			{ label: 'sDIQuantityForShipping', name:'SDIQuantityForShipping', inTable:  false  },
			{ label: 'sDIConsignmentPostingPosition', name:'SDIConsignmentPostingPosition', inTable:  false  },
			{ label: 'sDIConsignmentValue', name:'SDIConsignmentValue', inTable:  false  },
			{ label: 'sDIConsignemntAddress', name:'SDIConsignemntAddress', inTable:  false  },
			{ label: 'sDIStockroom', name:'SDIStockroom', inTable:  false  },
			{ label: 'sDIIdentification', name:'SDIIdentification', inTable:  false  },
			{ label: 'sDITangibleItemStatus', name:'SDITangibleItemStatus', inTable:  false  },
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
	// tangibleItemCondition with properties names and labels
	$scope.tangibleItemConditionDefinition = {
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
	// measurementUnit with properties names and labels
	$scope.measurementUnitDefinition = {
		label: 'commonbusinessentities.measurementUnit',
		properties : [
			{ label: 'mUIdentificationCode', name:'MUIdentificationCode' },
			{ label: 'mUName', name:'MUName' },
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
	// currency with properties names and labels
	$scope.currencyDefinition = {
		label: 'capacitymanagement.currency',
		properties : [
			{ label: 'cCurrencyDesignation', name:'CCurrencyDesignation' },
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
	// packings with properties names and labels
	$scope.packingsDefinition = {
		label: 'stockmanagement.packing',
		properties : [
			{ label: 'pOrdinalNumber', name:'POrdinalNumber' },
			{ label: 'pPackedQuantity', name:'PPackedQuantity' },
			{ label: 'pPackingDate', name:'PPackingDate' },
		]
	};

	// fill table with data
	$scope.items = [];
	$scope.loaded = false;
	var getShippingDocumentItems = function() {
		if(!$scope.loaded && $scope.items.length === 0) {
			$scope.isLoading = true;
			ServiceShippingDocumentItem.query(function(data) {
				$scope.items = data;
				$scope.isLoading = false;
				$scope.loaded = true;
			});
		}
	};
	getShippingDocumentItems();

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

	$scope.$watch('ShippingDocumentItemCollection', function() {
		$scope.itemEdit = CheckSelected.checkSelectedInTable($scope.itemEdit, $scope.ShippingDocumentItemCollection, $scope.items);
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
			templateUrl: 'procurement/shippingdocumentitem/tmplShippingDocumentItemEdit.tpl.html',
			size: 'lg',
			windowClass: 'hmodal-info',
			controller: 'ctrlShippingDocumentItemEdit',
			resolve: {
				itemEdit: function() {
					if(isNew) {
						return new ServiceShippingDocumentItem();
					} else {
						return $scope.itemEdit;
					}
				},
				shippingDocumentDefinition: function() {
					return $scope.shippingDocumentDefinition;
				},
				tangibleItemConditionDefinition: function() {
					return $scope.tangibleItemConditionDefinition;
				},
				measurementUnitDefinition: function() {
					return $scope.measurementUnitDefinition;
				},
				orderItemDefinition: function() {
					return $scope.orderItemDefinition;
				},
				currencyDefinition: function() {
					return $scope.currencyDefinition;
				},
				taxHeadingDefinition: function() {
					return $scope.taxHeadingDefinition;
				},
				packingsDefinition: function() {
					return $scope.packingsDefinition;
				},
			}
		})
		.result.then(function(result) {
			if(!angular.isDefined(result.id)) {
				ServiceShippingDocumentItem.saveCustom('stockmanagement/shippingdocumentitems', result, function(savedObject) {
					$scope.items.unshift(savedObject);
					if($scope.itemEdit !== null) {
						var index = $scope.items.map(function(it) { return it.id; }).indexOf($scope.itemEdit.id);
						$scope.items[index].isSelected = false;
					}
					$scope.itemEdit = angular.extend(savedObject);
					$scope.items[0].isSelected = true;
				});
			 } else {
				 ServiceShippingDocumentItem.updateCustom('stockmanagement/shippingdocumentitems/'+result.id, result, function(savedObject) {
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


.controller('ctrlShippingDocumentItemEdit',['$scope', 'Localization', '$modal', '$modalInstance', 'dialogs',
	'ServiceShippingDocumentItem', 'ServiceShippingDocument', 'ServiceTangibleItemCondition', 'ServiceMeasurementUnit', 'ServiceOrderItem', 'ServiceCurrency', 'ServiceTaxHeading', 'ServicePacking',   'shippingDocumentDefinition',  'tangibleItemConditionDefinition',  'measurementUnitDefinition',  'orderItemDefinition',  'currencyDefinition',  'taxHeadingDefinition',  'packingsDefinition',   'itemEdit',
function($scope, Localization, $modal, $modalInstance, dialogs,
	ServiceShippingDocumentItem, ServiceShippingDocument, ServiceTangibleItemCondition, ServiceMeasurementUnit, ServiceOrderItem, ServiceCurrency, ServiceTaxHeading, ServicePacking,  shippingDocumentDefinition,  tangibleItemConditionDefinition,  measurementUnitDefinition,  orderItemDefinition,  currencyDefinition,  taxHeadingDefinition,  packingsDefinition,  itemEdit) {

	// dialog mode
	$scope.mode = 'edit';

	// original item state
	var original = angular.copy(itemEdit);
	// item state
	$scope.itemEdit = angular.copy(original);

	// shippingDocument with properties
	$scope.shippingDocumentDefinition = shippingDocumentDefinition;
	// tangibleItemCondition with properties
	$scope.tangibleItemConditionDefinition = tangibleItemConditionDefinition;
	// measurementUnit with properties
	$scope.measurementUnitDefinition = measurementUnitDefinition;
	// orderItem with properties
	$scope.orderItemDefinition = orderItemDefinition;
	// currency with properties
	$scope.currencyDefinition = currencyDefinition;
	// taxHeading with properties
	$scope.taxHeadingDefinition = taxHeadingDefinition;
	// packings with properties
	$scope.packingsDefinition = packingsDefinition;

	// datepicker logic

	// date properties
	$scope.openedSDIPostingDate = false;

	$scope.open = function($event, opened) {
		$event.preventDefault();
		$event.stopPropagation();
		$scope[opened] = true;
	};



	// Choose shippingDocument
	$scope.openChooseShippingDocumentDialog = function() {
        $modal.open({
            backdrop: 'static',
            keyboard : false,
            templateUrl: 'procurement/shippingdocumentitem/tmplShippingDocumentChoose.tpl.html',
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


	// Choose tangibleItemCondition
	$scope.openChooseTangibleItemConditionDialog = function() {
        $modal.open({
            backdrop: 'static',
            keyboard : false,
            templateUrl: 'stockmanagement/shippingdocumentitem/tmplTangibleItemConditionChoose.tpl.html',
            size: 'lg',
            controller: 'ctrlTangibleItemConditionChoose',
            windowClass: 'hmodal-info',
            resolve: {
				itemEdit: function() {
					if(angular.isDefined($scope.itemEdit.tangibleItemCondition)){
						return $scope.itemEdit.tangibleItemCondition;
					}
				}
			}
		}).result.then(function(result) {
			$scope.itemEdit.tangibleItemCondition = angular.copy(result);
		});
    };


	// Choose measurementUnit
	$scope.openChooseMeasurementUnitDialog = function() {
        $modal.open({
            backdrop: 'static',
            keyboard : false,
            templateUrl: 'commonbusinessentities/shippingdocumentitem/tmplMeasurementUnitChoose.tpl.html',
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


	// Choose orderItem
	$scope.openChooseOrderItemDialog = function() {
        $modal.open({
            backdrop: 'static',
            keyboard : false,
            templateUrl: 'order/shippingdocumentitem/tmplOrderItemChoose.tpl.html',
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


	// Choose currency
	$scope.openChooseCurrencyDialog = function() {
        $modal.open({
            backdrop: 'static',
            keyboard : false,
            templateUrl: 'capacitymanagement/shippingdocumentitem/tmplCurrencyChoose.tpl.html',
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


	// Choose taxHeading
	$scope.openChooseTaxHeadingDialog = function() {
        $modal.open({
            backdrop: 'static',
            keyboard : false,
            templateUrl: 'initialization/shippingdocumentitem/tmplTaxHeadingChoose.tpl.html',
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


    $scope.packingEdit = null;

    // packings table selection logic
    $scope.packingSelection = function(item, index) {
        if(item.isSelected) {
            if($scope.packingEdit !== null) {
                var index1 = $scope.itemEdit.packings.map(function(it) { return it.id; }).indexOf($scope.packingEdit.id);
                $scope.itemEdit.packings[index1].isSelected = false;
            }
            $scope.packingEdit = item;
        } else {
            $scope.packingEdit = null;
            item.isSelected = false;
        }
    };

    // New/Edit packings dialog
    $scope.openPackingEditDialog = function(isNew) {
        $modal.open({
            backdrop: 'static',
            keyboard : false,
            templateUrl: 'stockmanagement/shippingdocumentitem/tmplPackingEdit.tpl.html',
            size: 'lg',
            controller: 'ctrlPackingEdit',
            windowClass: 'hmodal-info',
            resolve: {
                itemEdit: function() {
                    if(isNew) {
                        return new ServicePacking();
                    } else {
                        return $scope.packingEdit;
                    }
                }
            }
        }).result.then(function(result) {
            var i;
            if(isNew) {
                if(!angular.isDefined($scope.itemEdit.packings)) {
                    $scope.itemEdit.packings = [];
                }
                $scope.itemEdit.packings.unshift(result);
                for(i in $scope.itemEdit.packings) {
                    $scope.itemEdit.packings[i].isSelected = false;
                }
                $scope.packingEdit = angular.extend(result);
                $scope.itemEdit.packings[0].isSelected = true;
            }
            else {
                for(i in $scope.itemEdit.packings) {
                    $scope.itemEdit.packings[i].isSelected = false;
                }
                $scope.packingEdit = angular.extend(result);
                var index = $scope.itemEdit.packings.map(function(it) { return it.id; }).indexOf(result.id);
                for(var key in result) {
                    $scope.itemEdit.packings[index][key] = result[key];
                }
                $scope.itemEdit.packings[index].isSelected = true;
            }
        });
    };

    $scope.removePacking = function(item) {
        var dialog = dialogs.confirm('Please confirm', 'Are you sure you want to delete item?');
        dialog.result.then(function(btn) {
            var removeIndex = $scope.itemEdit.packings.map(function(it) { return it.id; }).indexOf(item.id);
            $scope.itemEdit.packings[removeIndex].deleted = true;
        });
    };


	// Save Button
	$scope.save = function() {
		correctDateTime($scope.itemEdit.SDIPostingDate);
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
		return                 item.SDIOrdinalNumber  &&                 item.SDIQuantityDisposed  &&                 item.SDIQuantityPacked  &&                 item.SDIQuantityDispatched  ;
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


.controller('ctrlShippingDocumentItemChoose', ['$scope','ServiceShippingDocumentItem', 'dialogs', '$modal', '$modalInstance', 'itemEdit',
function($scope, ServiceShippingDocumentItem, dialogs, $modal,  $modalInstance, itemEdit) {

    // entity with properties
    $scope.itemDefinition = {
        label: 'procurement.shippingDocumentItem',
        properties: [
            { label: 'sDIOrdinalNumber', name:'SDIOrdinalNumber', inTable:  true  },
            { label: 'sDIQuantityDisposed', name:'SDIQuantityDisposed', inTable:  true  },
            { label: 'sDIQuantityPacked', name:'SDIQuantityPacked', inTable:  true  },
            { label: 'sDIQuantityForRepacking', name:'SDIQuantityForRepacking', inTable:  false  },
            { label: 'sDIQuantityDispatched', name:'SDIQuantityDispatched', inTable:  true  },
            { label: 'sDIBookValueAmmount', name:'SDIBookValueAmmount', inTable:  false  },
            { label: 'sDISellingPrice', name:'SDISellingPrice', inTable:  false  },
            { label: 'sDIRebate', name:'SDIRebate', inTable:  false  },
            { label: 'sDIPostingPosition', name:'SDIPostingPosition', inTable:  false  },
            { label: 'sDIStorno', name:'SDIStorno', inTable:  false  },
            { label: 'sDIPostingDate', name:'SDIPostingDate', inTable:  false  },
            { label: 'sDILocationAddress', name:'SDILocationAddress', inTable:  false  },
            { label: 'sDIQuantityAfterPosting', name:'SDIQuantityAfterPosting', inTable:  false  },
            { label: 'sDIAccount', name:'SDIAccount', inTable:  false  },
            { label: 'sDIQuantityForShipping', name:'SDIQuantityForShipping', inTable:  false  },
            { label: 'sDIConsignmentPostingPosition', name:'SDIConsignmentPostingPosition', inTable:  false  },
            { label: 'sDIConsignmentValue', name:'SDIConsignmentValue', inTable:  false  },
            { label: 'sDIConsignemntAddress', name:'SDIConsignemntAddress', inTable:  false  },
            { label: 'sDIStockroom', name:'SDIStockroom', inTable:  false  },
            { label: 'sDIIdentification', name:'SDIIdentification', inTable:  false  },
            { label: 'sDITangibleItemStatus', name:'SDITangibleItemStatus', inTable:  false  },
        ]
    };

	$scope.items = [];
	$scope.itemEdit = {};

	// fill table with data
	$scope.loaded = false;
	var getShippingDocumentItems = function() {
		if(!$scope.loaded && $scope.items.length === 0) {
			$scope.isLoading = true;
			ServiceShippingDocumentItem.query(function(data) {
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
	getShippingDocumentItems();

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