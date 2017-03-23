'use strict';

angular.module('Doob.commonbusinessentities')


.controller('ctrlMeasurementUnit',['$scope', '$rootScope', '$modal', 'dialogs', 'CheckSelected', 'ServiceMeasurementUnit',
    function($scope, $rootScope, $modal, dialogs, CheckSelected, ServiceMeasurementUnit) {

	// main entity (measurementUnit) properties names and labels
	$scope.itemDefinition = {
		label: 'commonbusinessentities.measurementUnit',
		properties: [
			{ label: 'mUIdentificationCode', name:'MUIdentificationCode', inTable:  true  },
			{ label: 'mUName', name:'MUName', inTable:  true  },
			{ label: 'mUShortName', name:'MUShortName', inTable:  false  },
			{ label: 'mUUnit', name:'MUUnit', inTable:  false  },
		]
	};

	// productionRequests with properties names and labels
	$scope.productionRequestsDefinition = {
		label: 'stockmanagement.productionRequest',
		properties : [
			{ label: 'pROrdinalNumber', name:'PROrdinalNumber' },
			{ label: 'pRQuantity', name:'PRQuantity' },
			{ label: 'pRProductionDeadline', name:'PRProductionDeadline' },
		]
	};
	// characteristics with properties names and labels
	$scope.characteristicsDefinition = {
		label: 'commonbusinessentities.characteristicsRegistry',
		properties : [
			{ label: 'cRIdentificationNumber', name:'CRIdentificationNumber' },
			{ label: 'cRName', name:'CRName' },
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
	// requestForProductionItem with properties names and labels
	$scope.requestForProductionItemDefinition = {
		label: 'productionrequest.requestForProductionItem',
		properties : [
			{ label: 'rFPIItemNumber', name:'RFPIItemNumber' },
			{ label: 'rFPIQuantity', name:'RFPIQuantity' },
			{ label: 'rFPICreationDeadline', name:'RFPICreationDeadline' },
			{ label: 'rFPISellingPrice', name:'RFPISellingPrice' },
		]
	};
	// invoiceItemsWithousDisps with properties names and labels
	$scope.invoiceItemsWithousDispsDefinition = {
		label: 'procurement.invoiceItemsWithoutDisp',
		properties : [
			{ label: 'iIDOrdinalNumber', name:'IIDOrdinalNumber' },
			{ label: 'iIDAmount', name:'IIDAmount' },
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
	// requisitionItems with properties names and labels
	$scope.requisitionItemsDefinition = {
		label: 'stockmanagement.requisitionItem',
		properties : [
			{ label: 'rIOrdinalNumber', name:'RIOrdinalNumber' },
			{ label: 'rILocationAddress', name:'RILocationAddress' },
			{ label: 'rIQuantityStandardized', name:'RIQuantityStandardized' },
			{ label: 'rIQuantityRequisitioned', name:'RIQuantityRequisitioned' },
			{ label: 'rIQuantityReserved', name:'RIQuantityReserved' },
			{ label: 'rIQuantityIssued', name:'RIQuantityIssued' },
			{ label: 'rIBookValueAmmount', name:'RIBookValueAmmount' },
			{ label: 'rIPriceDesignation', name:'RIPriceDesignation' },
			{ label: 'rIPostingPosition', name:'RIPostingPosition' },
			{ label: 'rIAmmountAfterPosting', name:'RIAmmountAfterPosting' },
			{ label: 'rIStatusReservedNotIssued', name:'RIStatusReservedNotIssued' },
		]
	};

	// fill table with data
	$scope.items = [];
	$scope.loaded = false;
	var getMeasurementUnits = function() {
		if(!$scope.loaded && $scope.items.length === 0) {
			$scope.isLoading = true;
			ServiceMeasurementUnit.query(function(data) {
				$scope.items = data;
				$scope.isLoading = false;
				$scope.loaded = true;
			});
		}
	};
	getMeasurementUnits();

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

	$scope.$watch('MeasurementUnitCollection', function() {
		$scope.itemEdit = CheckSelected.checkSelectedInTable($scope.itemEdit, $scope.MeasurementUnitCollection, $scope.items);
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
			templateUrl: 'commonbusinessentities/measurementunit/tmplMeasurementUnitEdit.tpl.html',
			size: 'lg',
			windowClass: 'hmodal-info',
			controller: 'ctrlMeasurementUnitEdit',
			resolve: {
				itemEdit: function() {
					if(isNew) {
						return new ServiceMeasurementUnit();
					} else {
						return $scope.itemEdit;
					}
				},
				productionRequestsDefinition: function() {
					return $scope.productionRequestsDefinition;
				},
				characteristicsDefinition: function() {
					return $scope.characteristicsDefinition;
				},
				beOrderItemsDefinition: function() {
					return $scope.beOrderItemsDefinition;
				},
				shippingDocumentItemsDefinition: function() {
					return $scope.shippingDocumentItemsDefinition;
				},
				orderItemsDefinition: function() {
					return $scope.orderItemsDefinition;
				},
				orderSupplierItemsDefinition: function() {
					return $scope.orderSupplierItemsDefinition;
				},
				requestForProductionItemDefinition: function() {
					return $scope.requestForProductionItemDefinition;
				},
				invoiceItemsWithousDispsDefinition: function() {
					return $scope.invoiceItemsWithousDispsDefinition;
				},
				tangibleItemConditionsDefinition: function() {
					return $scope.tangibleItemConditionsDefinition;
				},
				requisitionItemsDefinition: function() {
					return $scope.requisitionItemsDefinition;
				},
			}
		})
		.result.then(function(result) {
			if(!angular.isDefined(result.id)) {
				ServiceMeasurementUnit.saveCustom('stockmanagement/measurementunits', result, function(savedObject) {
					$scope.items.unshift(savedObject);
					if($scope.itemEdit !== null) {
						var index = $scope.items.map(function(it) { return it.id; }).indexOf($scope.itemEdit.id);
						$scope.items[index].isSelected = false;
					}
					$scope.itemEdit = angular.extend(savedObject);
					$scope.items[0].isSelected = true;
				});
			 } else {
				 ServiceMeasurementUnit.updateCustom('stockmanagement/measurementunits/'+result.id, result, function(savedObject) {
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


.controller('ctrlMeasurementUnitEdit',['$scope', 'Localization', '$modal', '$modalInstance', 'dialogs',
	'ServiceMeasurementUnit', 'ServiceProductionRequest', 'ServiceCharacteristicsRegistry', 'ServiceBEOrderItem', 'ServiceShippingDocumentItem', 'ServiceOrderItem', 'ServiceOrderSupplierItem', 'ServiceRequestForProductionItem', 'ServiceInvoiceItemsWithoutDisp', 'ServiceTangibleItemCondition', 'ServiceRequisitionItem',   'productionRequestsDefinition',  'characteristicsDefinition',  'beOrderItemsDefinition',  'shippingDocumentItemsDefinition',  'orderItemsDefinition',  'orderSupplierItemsDefinition',  'requestForProductionItemDefinition',  'invoiceItemsWithousDispsDefinition',  'tangibleItemConditionsDefinition',  'requisitionItemsDefinition',   'itemEdit',
function($scope, Localization, $modal, $modalInstance, dialogs,
	ServiceMeasurementUnit, ServiceProductionRequest, ServiceCharacteristicsRegistry, ServiceBEOrderItem, ServiceShippingDocumentItem, ServiceOrderItem, ServiceOrderSupplierItem, ServiceRequestForProductionItem, ServiceInvoiceItemsWithoutDisp, ServiceTangibleItemCondition, ServiceRequisitionItem,  productionRequestsDefinition,  characteristicsDefinition,  beOrderItemsDefinition,  shippingDocumentItemsDefinition,  orderItemsDefinition,  orderSupplierItemsDefinition,  requestForProductionItemDefinition,  invoiceItemsWithousDispsDefinition,  tangibleItemConditionsDefinition,  requisitionItemsDefinition,  itemEdit) {

	// dialog mode
	$scope.mode = 'edit';

	// original item state
	var original = angular.copy(itemEdit);
	// item state
	$scope.itemEdit = angular.copy(original);

	// productionRequests with properties
	$scope.productionRequestsDefinition = productionRequestsDefinition;
	// characteristics with properties
	$scope.characteristicsDefinition = characteristicsDefinition;
	// beOrderItems with properties
	$scope.beOrderItemsDefinition = beOrderItemsDefinition;
	// shippingDocumentItems with properties
	$scope.shippingDocumentItemsDefinition = shippingDocumentItemsDefinition;
	// orderItems with properties
	$scope.orderItemsDefinition = orderItemsDefinition;
	// orderSupplierItems with properties
	$scope.orderSupplierItemsDefinition = orderSupplierItemsDefinition;
	// requestForProductionItem with properties
	$scope.requestForProductionItemDefinition = requestForProductionItemDefinition;
	// invoiceItemsWithousDisps with properties
	$scope.invoiceItemsWithousDispsDefinition = invoiceItemsWithousDispsDefinition;
	// tangibleItemConditions with properties
	$scope.tangibleItemConditionsDefinition = tangibleItemConditionsDefinition;
	// requisitionItems with properties
	$scope.requisitionItemsDefinition = requisitionItemsDefinition;

	// datepicker logic

	// date properties

	$scope.open = function($event, opened) {
		$event.preventDefault();
		$event.stopPropagation();
		$scope[opened] = true;
	};



	// Save Button
	$scope.save = function() {
	   //	delete $scope.itemEdit.isSelected;
        var item;
        var i;
        for(i in $scope.itemEdit.productionRequests) {
    		item = $scope.itemEdit.productionRequests[i];
    		delete item.isSelected;
    	}
        for(i in $scope.itemEdit.characteristics) {
    		item = $scope.itemEdit.characteristics[i];
    		delete item.isSelected;
    	}
        for(i in $scope.itemEdit.beOrderItems) {
    		item = $scope.itemEdit.beOrderItems[i];
    		delete item.isSelected;
    	}
        for(i in $scope.itemEdit.shippingDocumentItems) {
    		item = $scope.itemEdit.shippingDocumentItems[i];
    		delete item.isSelected;
    	}
        for(i in $scope.itemEdit.orderItems) {
    		item = $scope.itemEdit.orderItems[i];
    		delete item.isSelected;
    	}
        for(i in $scope.itemEdit.orderSupplierItems) {
    		item = $scope.itemEdit.orderSupplierItems[i];
    		delete item.isSelected;
    	}
        for(i in $scope.itemEdit.requestForProductionItem) {
    		item = $scope.itemEdit.requestForProductionItem[i];
    		delete item.isSelected;
    	}
        for(i in $scope.itemEdit.invoiceItemsWithousDisps) {
    		item = $scope.itemEdit.invoiceItemsWithousDisps[i];
    		delete item.isSelected;
    	}
        for(i in $scope.itemEdit.tangibleItemConditions) {
    		item = $scope.itemEdit.tangibleItemConditions[i];
    		delete item.isSelected;
    	}
        for(i in $scope.itemEdit.requisitionItems) {
    		item = $scope.itemEdit.requisitionItems[i];
    		delete item.isSelected;
    	}
		$modalInstance.close($scope.itemEdit);
	};


	$scope.canSave = function() {
		var item = $scope.itemEdit;
		return                 item.MUIdentificationCode  &&                 item.MUName  ;
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


.controller('ctrlMeasurementUnitChoose', ['$scope','ServiceMeasurementUnit', 'dialogs', '$modal', '$modalInstance', 'itemEdit',
function($scope, ServiceMeasurementUnit, dialogs, $modal,  $modalInstance, itemEdit) {

    // entity with properties
    $scope.itemDefinition = {
        label: 'commonbusinessentities.measurementUnit',
        properties: [
            { label: 'mUIdentificationCode', name:'MUIdentificationCode', inTable:  true  },
            { label: 'mUName', name:'MUName', inTable:  true  },
            { label: 'mUShortName', name:'MUShortName', inTable:  false  },
            { label: 'mUUnit', name:'MUUnit', inTable:  false  },
        ]
    };

	$scope.items = [];
	$scope.itemEdit = {};

	// fill table with data
	$scope.loaded = false;
	var getMeasurementUnits = function() {
		if(!$scope.loaded && $scope.items.length === 0) {
			$scope.isLoading = true;
			ServiceMeasurementUnit.query(function(data) {
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
	getMeasurementUnits();

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