'use strict';

angular.module('Doob.order')


.controller('ctrlDeliveryMethod',['$scope', '$rootScope', '$modal', 'dialogs', 'CheckSelected', 'ServiceDeliveryMethod',
    function($scope, $rootScope, $modal, dialogs, CheckSelected, ServiceDeliveryMethod) {

	// main entity (deliveryMethod) properties names and labels
	$scope.itemDefinition = {
		label: 'order.deliveryMethod',
		properties: [
			{ label: 'dMCode', name:'DMCode', inTable:  true  },
			{ label: 'dMName', name:'DMName', inTable:  true  },
			{ label: 'dMDescription', name:'DMDescription', inTable:  false  },
		]
	};

	// orderSupplierHeadings with properties names and labels
	$scope.orderSupplierHeadingsDefinition = {
		label: 'logical.orderSupplierHeading',
		properties : [
			{ label: 'oSHNumber', name:'OSHNumber' },
			{ label: 'oSHDate', name:'OSHDate' },
			{ label: 'oSHApprovalDate', name:'OSHApprovalDate' },
		]
	};
	// beOrderHeadings with properties names and labels
	$scope.beOrderHeadingsDefinition = {
		label: 'internalorder.bEOrderHeading',
		properties : [
			{ label: 'bEOHDocumentNumber', name:'BEOHDocumentNumber' },
			{ label: 'bEOHCreationDate', name:'BEOHCreationDate' },
			{ label: 'bEOHOrderDate', name:'BEOHOrderDate' },
		]
	};
	// offerSupplierHeadings with properties names and labels
	$scope.offerSupplierHeadingsDefinition = {
		label: 'logical.offerSupplierHeading',
		properties : [
			{ label: 'oSHNumber', name:'OSHNumber' },
			{ label: 'oSHOfferAcceptStatus', name:'OSHOfferAcceptStatus' },
			{ label: 'oSHReceivingDate', name:'OSHReceivingDate' },
			{ label: 'oSHExpiryDate', name:'OSHExpiryDate' },
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
	var getDeliveryMethods = function() {
		if(!$scope.loaded && $scope.items.length === 0) {
			$scope.isLoading = true;
			ServiceDeliveryMethod.query(function(data) {
				$scope.items = data;
				$scope.isLoading = false;
				$scope.loaded = true;
			});
		}
	};
	getDeliveryMethods();

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

	$scope.$watch('DeliveryMethodCollection', function() {
		$scope.itemEdit = CheckSelected.checkSelectedInTable($scope.itemEdit, $scope.DeliveryMethodCollection, $scope.items);
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
			templateUrl: 'order/deliverymethod/tmplDeliveryMethodEdit.tpl.html',
			size: 'lg',
			windowClass: 'hmodal-info',
			controller: 'ctrlDeliveryMethodEdit',
			resolve: {
				itemEdit: function() {
					if(isNew) {
						return new ServiceDeliveryMethod();
					} else {
						return $scope.itemEdit;
					}
				},
				orderSupplierHeadingsDefinition: function() {
					return $scope.orderSupplierHeadingsDefinition;
				},
				beOrderHeadingsDefinition: function() {
					return $scope.beOrderHeadingsDefinition;
				},
				offerSupplierHeadingsDefinition: function() {
					return $scope.offerSupplierHeadingsDefinition;
				},
				goodsReceivedNoteHeadingsDefinition: function() {
					return $scope.goodsReceivedNoteHeadingsDefinition;
				},
			}
		})
		.result.then(function(result) {
			if(!angular.isDefined(result.id)) {
				ServiceDeliveryMethod.saveCustom('stockmanagement/deliverymethods', result, function(savedObject) {
					$scope.items.unshift(savedObject);
					if($scope.itemEdit !== null) {
						var index = $scope.items.map(function(it) { return it.id; }).indexOf($scope.itemEdit.id);
						$scope.items[index].isSelected = false;
					}
					$scope.itemEdit = angular.extend(savedObject);
					$scope.items[0].isSelected = true;
				});
			 } else {
				 ServiceDeliveryMethod.updateCustom('stockmanagement/deliverymethods/'+result.id, result, function(savedObject) {
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


.controller('ctrlDeliveryMethodEdit',['$scope', 'Localization', '$modal', '$modalInstance', 'dialogs',
	'ServiceDeliveryMethod', 'ServiceOrderSupplierHeading', 'ServiceBEOrderHeading', 'ServiceOfferSupplierHeading', 'ServiceGoodsReceivedNoteHeading',   'orderSupplierHeadingsDefinition',  'beOrderHeadingsDefinition',  'offerSupplierHeadingsDefinition',  'goodsReceivedNoteHeadingsDefinition',   'itemEdit',
function($scope, Localization, $modal, $modalInstance, dialogs,
	ServiceDeliveryMethod, ServiceOrderSupplierHeading, ServiceBEOrderHeading, ServiceOfferSupplierHeading, ServiceGoodsReceivedNoteHeading,  orderSupplierHeadingsDefinition,  beOrderHeadingsDefinition,  offerSupplierHeadingsDefinition,  goodsReceivedNoteHeadingsDefinition,  itemEdit) {

	// dialog mode
	$scope.mode = 'edit';

	// original item state
	var original = angular.copy(itemEdit);
	// item state
	$scope.itemEdit = angular.copy(original);

	// orderSupplierHeadings with properties
	$scope.orderSupplierHeadingsDefinition = orderSupplierHeadingsDefinition;
	// beOrderHeadings with properties
	$scope.beOrderHeadingsDefinition = beOrderHeadingsDefinition;
	// offerSupplierHeadings with properties
	$scope.offerSupplierHeadingsDefinition = offerSupplierHeadingsDefinition;
	// goodsReceivedNoteHeadings with properties
	$scope.goodsReceivedNoteHeadingsDefinition = goodsReceivedNoteHeadingsDefinition;

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
        for(i in $scope.itemEdit.orderSupplierHeadings) {
    		item = $scope.itemEdit.orderSupplierHeadings[i];
    		delete item.isSelected;
    	}
        for(i in $scope.itemEdit.beOrderHeadings) {
    		item = $scope.itemEdit.beOrderHeadings[i];
    		delete item.isSelected;
    	}
        for(i in $scope.itemEdit.offerSupplierHeadings) {
    		item = $scope.itemEdit.offerSupplierHeadings[i];
    		delete item.isSelected;
    	}
        for(i in $scope.itemEdit.goodsReceivedNoteHeadings) {
    		item = $scope.itemEdit.goodsReceivedNoteHeadings[i];
    		delete item.isSelected;
    	}
		$modalInstance.close($scope.itemEdit);
	};


	$scope.canSave = function() {
		var item = $scope.itemEdit;
		return                 item.DMCode  &&                 item.DMName  ;
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


.controller('ctrlDeliveryMethodChoose', ['$scope','ServiceDeliveryMethod', 'dialogs', '$modal', '$modalInstance', 'itemEdit',
function($scope, ServiceDeliveryMethod, dialogs, $modal,  $modalInstance, itemEdit) {

    // entity with properties
    $scope.itemDefinition = {
        label: 'order.deliveryMethod',
        properties: [
            { label: 'dMCode', name:'DMCode', inTable:  true  },
            { label: 'dMName', name:'DMName', inTable:  true  },
            { label: 'dMDescription', name:'DMDescription', inTable:  false  },
        ]
    };

	$scope.items = [];
	$scope.itemEdit = {};

	// fill table with data
	$scope.loaded = false;
	var getDeliveryMethods = function() {
		if(!$scope.loaded && $scope.items.length === 0) {
			$scope.isLoading = true;
			ServiceDeliveryMethod.query(function(data) {
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
	getDeliveryMethods();

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