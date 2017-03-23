'use strict';

angular.module('Doob.logical')


.controller('ctrlOrderSupplierItem',['$scope', '$rootScope', '$modal', 'dialogs', 'CheckSelected', 'ServiceOrderSupplierItem',
    function($scope, $rootScope, $modal, dialogs, CheckSelected, ServiceOrderSupplierItem) {

	// main entity (orderSupplierItem) properties names and labels
	$scope.itemDefinition = {
		label: 'logical.orderSupplierItem',
		properties: [
			{ label: 'oSIOrdinalNumber', name:'OSIOrdinalNumber', inTable:  true  },
			{ label: 'oSIOrderedQuantity', name:'OSIOrderedQuantity', inTable:  true  },
			{ label: 'oSIDeliveryDeadline', name:'OSIDeliveryDeadline', inTable:  true  },
			{ label: 'oSIQuantityReceived', name:'OSIQuantityReceived', inTable:  true  },
			{ label: 'oSIProcurementStatus', name:'OSIProcurementStatus', inTable:  true  },
			{ label: 'oSIPrice', name:'OSIPrice', inTable:  false  },
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
	// identification with properties names and labels
	$scope.identificationDefinition = {
		label: 'commonbusinessentities.identification',
		properties : [
			{ label: 'iIdentificationCode', name:'IIdentificationCode' },
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
	// offerSupplierItem with properties names and labels
	$scope.offerSupplierItemDefinition = {
		label: 'logical.offerSupplierItem',
		properties : [
			{ label: 'oSIOrdinalNumber', name:'OSIOrdinalNumber' },
			{ label: 'oSIMeasurementUnit', name:'OSIMeasurementUnit' },
			{ label: 'oSIOfferedQuantity', name:'OSIOfferedQuantity' },
			{ label: 'oSIOfferedPrice', name:'OSIOfferedPrice' },
			{ label: 'oSIDeliveryDeadline', name:'OSIDeliveryDeadline' },
			{ label: 'oSIStatus', name:'OSIStatus' },
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
	var getOrderSupplierItems = function() {
		if(!$scope.loaded && $scope.items.length === 0) {
			$scope.isLoading = true;
			ServiceOrderSupplierItem.query(function(data) {
				$scope.items = data;
				$scope.isLoading = false;
				$scope.loaded = true;
			});
		}
	};
	getOrderSupplierItems();

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

	$scope.$watch('OrderSupplierItemCollection', function() {
		$scope.itemEdit = CheckSelected.checkSelectedInTable($scope.itemEdit, $scope.OrderSupplierItemCollection, $scope.items);
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
			templateUrl: 'logical/ordersupplieritem/tmplOrderSupplierItemEdit.tpl.html',
			size: 'lg',
			windowClass: 'hmodal-info',
			controller: 'ctrlOrderSupplierItemEdit',
			resolve: {
				itemEdit: function() {
					if(isNew) {
						return new ServiceOrderSupplierItem();
					} else {
						return $scope.itemEdit;
					}
				},
				orderSupplierHeadingDefinition: function() {
					return $scope.orderSupplierHeadingDefinition;
				},
				identificationDefinition: function() {
					return $scope.identificationDefinition;
				},
				measurementUnitDefinition: function() {
					return $scope.measurementUnitDefinition;
				},
				offerSupplierItemDefinition: function() {
					return $scope.offerSupplierItemDefinition;
				},
				goodsReceivedNoteItemsDefinition: function() {
					return $scope.goodsReceivedNoteItemsDefinition;
				},
			}
		})
		.result.then(function(result) {
			if(!angular.isDefined(result.id)) {
				ServiceOrderSupplierItem.saveCustom('stockmanagement/ordersupplieritems', result, function(savedObject) {
					$scope.items.unshift(savedObject);
					if($scope.itemEdit !== null) {
						var index = $scope.items.map(function(it) { return it.id; }).indexOf($scope.itemEdit.id);
						$scope.items[index].isSelected = false;
					}
					$scope.itemEdit = angular.extend(savedObject);
					$scope.items[0].isSelected = true;
				});
			 } else {
				 ServiceOrderSupplierItem.updateCustom('stockmanagement/ordersupplieritems/'+result.id, result, function(savedObject) {
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


.controller('ctrlOrderSupplierItemEdit',['$scope', 'Localization', '$modal', '$modalInstance', 'dialogs',
	'ServiceOrderSupplierItem', 'ServiceOrderSupplierHeading', 'ServiceIdentification', 'ServiceMeasurementUnit', 'ServiceOfferSupplierItem', 'ServiceGoodsReceivedNoteItem',   'orderSupplierHeadingDefinition',  'identificationDefinition',  'measurementUnitDefinition',  'offerSupplierItemDefinition',  'goodsReceivedNoteItemsDefinition',   'itemEdit',
function($scope, Localization, $modal, $modalInstance, dialogs,
	ServiceOrderSupplierItem, ServiceOrderSupplierHeading, ServiceIdentification, ServiceMeasurementUnit, ServiceOfferSupplierItem, ServiceGoodsReceivedNoteItem,  orderSupplierHeadingDefinition,  identificationDefinition,  measurementUnitDefinition,  offerSupplierItemDefinition,  goodsReceivedNoteItemsDefinition,  itemEdit) {

	// dialog mode
	$scope.mode = 'edit';

	// original item state
	var original = angular.copy(itemEdit);
	// item state
	$scope.itemEdit = angular.copy(original);

	// orderSupplierHeading with properties
	$scope.orderSupplierHeadingDefinition = orderSupplierHeadingDefinition;
	// identification with properties
	$scope.identificationDefinition = identificationDefinition;
	// measurementUnit with properties
	$scope.measurementUnitDefinition = measurementUnitDefinition;
	// offerSupplierItem with properties
	$scope.offerSupplierItemDefinition = offerSupplierItemDefinition;
	// goodsReceivedNoteItems with properties
	$scope.goodsReceivedNoteItemsDefinition = goodsReceivedNoteItemsDefinition;

	// datepicker logic

	// date properties
	$scope.openedOSIDeliveryDeadline = false;

	$scope.open = function($event, opened) {
		$event.preventDefault();
		$event.stopPropagation();
		$scope[opened] = true;
	};



	// Choose orderSupplierHeading
	$scope.openChooseOrderSupplierHeadingDialog = function() {
        $modal.open({
            backdrop: 'static',
            keyboard : false,
            templateUrl: 'logical/ordersupplieritem/tmplOrderSupplierHeadingChoose.tpl.html',
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


	// Choose identification
	$scope.openChooseIdentificationDialog = function() {
        $modal.open({
            backdrop: 'static',
            keyboard : false,
            templateUrl: 'commonbusinessentities/ordersupplieritem/tmplIdentificationChoose.tpl.html',
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


	// Choose measurementUnit
	$scope.openChooseMeasurementUnitDialog = function() {
        $modal.open({
            backdrop: 'static',
            keyboard : false,
            templateUrl: 'commonbusinessentities/ordersupplieritem/tmplMeasurementUnitChoose.tpl.html',
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


	// Choose offerSupplierItem
	$scope.openChooseOfferSupplierItemDialog = function() {
        $modal.open({
            backdrop: 'static',
            keyboard : false,
            templateUrl: 'logical/ordersupplieritem/tmplOfferSupplierItemChoose.tpl.html',
            size: 'lg',
            controller: 'ctrlOfferSupplierItemChoose',
            windowClass: 'hmodal-info',
            resolve: {
				itemEdit: function() {
					if(angular.isDefined($scope.itemEdit.offerSupplierItem)){
						return $scope.itemEdit.offerSupplierItem;
					}
				}
			}
		}).result.then(function(result) {
			$scope.itemEdit.offerSupplierItem = angular.copy(result);
		});
    };


	// Save Button
	$scope.save = function() {
		correctDateTime($scope.itemEdit.OSIDeliveryDeadline);
	   //	delete $scope.itemEdit.isSelected;
        var item;
        var i;
        for(i in $scope.itemEdit.goodsReceivedNoteItems) {
    		item = $scope.itemEdit.goodsReceivedNoteItems[i];
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
		return                 item.OSIOrdinalNumber  &&                 item.OSIOrderedQuantity  &&                 item.OSIDeliveryDeadline  &&                 item.OSIQuantityReceived  &&                 item.OSIProcurementStatus  ;
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


.controller('ctrlOrderSupplierItemChoose', ['$scope','ServiceOrderSupplierItem', 'dialogs', '$modal', '$modalInstance', 'itemEdit',
function($scope, ServiceOrderSupplierItem, dialogs, $modal,  $modalInstance, itemEdit) {

    // entity with properties
    $scope.itemDefinition = {
        label: 'logical.orderSupplierItem',
        properties: [
            { label: 'oSIOrdinalNumber', name:'OSIOrdinalNumber', inTable:  true  },
            { label: 'oSIOrderedQuantity', name:'OSIOrderedQuantity', inTable:  true  },
            { label: 'oSIDeliveryDeadline', name:'OSIDeliveryDeadline', inTable:  true  },
            { label: 'oSIQuantityReceived', name:'OSIQuantityReceived', inTable:  true  },
            { label: 'oSIProcurementStatus', name:'OSIProcurementStatus', inTable:  true  },
            { label: 'oSIPrice', name:'OSIPrice', inTable:  false  },
        ]
    };

	$scope.items = [];
	$scope.itemEdit = {};

	// fill table with data
	$scope.loaded = false;
	var getOrderSupplierItems = function() {
		if(!$scope.loaded && $scope.items.length === 0) {
			$scope.isLoading = true;
			ServiceOrderSupplierItem.query(function(data) {
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
	getOrderSupplierItems();

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