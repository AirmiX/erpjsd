'use strict';

angular.module('Doob.procurement')


.controller('ctrlInvoiceItem',['$scope', '$rootScope', '$modal', 'dialogs', 'CheckSelected', 'ServiceInvoiceItem',
    function($scope, $rootScope, $modal, dialogs, CheckSelected, ServiceInvoiceItem) {

	// main entity (invoiceItem) properties names and labels
	$scope.itemDefinition = {
		label: 'procurement.invoiceItem',
		properties: [
			{ label: 'iIOrdinalNumber', name:'IIOrdinalNumber', inTable:  true  },
			{ label: 'iIQuantity', name:'IIQuantity', inTable:  false  },
			{ label: 'iIRebate', name:'IIRebate', inTable:  false  },
			{ label: 'iIPrice', name:'IIPrice', inTable:  false  },
			{ label: 'iIValue', name:'IIValue', inTable:  false  },
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
	// invoice with properties names and labels
	$scope.invoiceDefinition = {
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
	var getInvoiceItems = function() {
		if(!$scope.loaded && $scope.items.length === 0) {
			$scope.isLoading = true;
			ServiceInvoiceItem.query(function(data) {
				$scope.items = data;
				$scope.isLoading = false;
				$scope.loaded = true;
			});
		}
	};
	getInvoiceItems();

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

	$scope.$watch('InvoiceItemCollection', function() {
		$scope.itemEdit = CheckSelected.checkSelectedInTable($scope.itemEdit, $scope.InvoiceItemCollection, $scope.items);
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
			templateUrl: 'procurement/invoiceitem/tmplInvoiceItemEdit.tpl.html',
			size: 'lg',
			windowClass: 'hmodal-info',
			controller: 'ctrlInvoiceItemEdit',
			resolve: {
				itemEdit: function() {
					if(isNew) {
						return new ServiceInvoiceItem();
					} else {
						return $scope.itemEdit;
					}
				},
				orderItemDefinition: function() {
					return $scope.orderItemDefinition;
				},
				invoiceDefinition: function() {
					return $scope.invoiceDefinition;
				},
			}
		})
		.result.then(function(result) {
			if(!angular.isDefined(result.id)) {
				ServiceInvoiceItem.saveCustom('stockmanagement/invoiceitems', result, function(savedObject) {
					$scope.items.unshift(savedObject);
					if($scope.itemEdit !== null) {
						var index = $scope.items.map(function(it) { return it.id; }).indexOf($scope.itemEdit.id);
						$scope.items[index].isSelected = false;
					}
					$scope.itemEdit = angular.extend(savedObject);
					$scope.items[0].isSelected = true;
				});
			 } else {
				 ServiceInvoiceItem.updateCustom('stockmanagement/invoiceitems/'+result.id, result, function(savedObject) {
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


.controller('ctrlInvoiceItemEdit',['$scope', 'Localization', '$modal', '$modalInstance', 'dialogs',
	'ServiceInvoiceItem', 'ServiceOrderItem', 'ServiceInvoice',   'orderItemDefinition',  'invoiceDefinition',   'itemEdit',
function($scope, Localization, $modal, $modalInstance, dialogs,
	ServiceInvoiceItem, ServiceOrderItem, ServiceInvoice,  orderItemDefinition,  invoiceDefinition,  itemEdit) {

	// dialog mode
	$scope.mode = 'edit';

	// original item state
	var original = angular.copy(itemEdit);
	// item state
	$scope.itemEdit = angular.copy(original);

	// orderItem with properties
	$scope.orderItemDefinition = orderItemDefinition;
	// invoice with properties
	$scope.invoiceDefinition = invoiceDefinition;

	// datepicker logic

	// date properties

	$scope.open = function($event, opened) {
		$event.preventDefault();
		$event.stopPropagation();
		$scope[opened] = true;
	};



	// Choose orderItem
	$scope.openChooseOrderItemDialog = function() {
        $modal.open({
            backdrop: 'static',
            keyboard : false,
            templateUrl: 'order/invoiceitem/tmplOrderItemChoose.tpl.html',
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


	// Choose invoice
	$scope.openChooseInvoiceDialog = function() {
        $modal.open({
            backdrop: 'static',
            keyboard : false,
            templateUrl: 'procurement/invoiceitem/tmplInvoiceChoose.tpl.html',
            size: 'lg',
            controller: 'ctrlInvoiceChoose',
            windowClass: 'hmodal-info',
            resolve: {
				itemEdit: function() {
					if(angular.isDefined($scope.itemEdit.invoice)){
						return $scope.itemEdit.invoice;
					}
				}
			}
		}).result.then(function(result) {
			$scope.itemEdit.invoice = angular.copy(result);
		});
    };


	// Save Button
	$scope.save = function() {
	   //	delete $scope.itemEdit.isSelected;
		$modalInstance.close($scope.itemEdit);
	};


	$scope.canSave = function() {
		var item = $scope.itemEdit;
		return                 item.IIOrdinalNumber  ;
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


.controller('ctrlInvoiceItemChoose', ['$scope','ServiceInvoiceItem', 'dialogs', '$modal', '$modalInstance', 'itemEdit',
function($scope, ServiceInvoiceItem, dialogs, $modal,  $modalInstance, itemEdit) {

    // entity with properties
    $scope.itemDefinition = {
        label: 'procurement.invoiceItem',
        properties: [
            { label: 'iIOrdinalNumber', name:'IIOrdinalNumber', inTable:  true  },
            { label: 'iIQuantity', name:'IIQuantity', inTable:  false  },
            { label: 'iIRebate', name:'IIRebate', inTable:  false  },
            { label: 'iIPrice', name:'IIPrice', inTable:  false  },
            { label: 'iIValue', name:'IIValue', inTable:  false  },
        ]
    };

	$scope.items = [];
	$scope.itemEdit = {};

	// fill table with data
	$scope.loaded = false;
	var getInvoiceItems = function() {
		if(!$scope.loaded && $scope.items.length === 0) {
			$scope.isLoading = true;
			ServiceInvoiceItem.query(function(data) {
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
	getInvoiceItems();

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