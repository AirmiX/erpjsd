'use strict';

angular.module('Doob.initialization')


.controller('ctrlUrgentStatus',['$scope', '$rootScope', '$modal', 'dialogs', 'CheckSelected', 'ServiceUrgentStatus',
    function($scope, $rootScope, $modal, dialogs, CheckSelected, ServiceUrgentStatus) {

	// main entity (urgentStatus) properties names and labels
	$scope.itemDefinition = {
		label: 'initialization.urgentStatus',
		properties: [
			{ label: 'uSCode', name:'USCode', inTable:  true  },
			{ label: 'uSDescription', name:'USDescription', inTable:  true  },
		]
	};

	// customerRequestItems with properties names and labels
	$scope.customerRequestItemsDefinition = {
		label: 'customerrequest.customerRequestItem',
		properties : [
			{ label: 'cRIOrdinalNumber', name:'CRIOrdinalNumber' },
			{ label: 'cRIQuantity', name:'CRIQuantity' },
			{ label: 'cRIDeliveryTime', name:'CRIDeliveryTime' },
		]
	};
	// customerRequestHeaders with properties names and labels
	$scope.customerRequestHeadersDefinition = {
		label: 'customerrequest.customerRequestHeading',
		properties : [
			{ label: 'cRHDocumentNumber', name:'CRHDocumentNumber' },
			{ label: 'cRHRegistrationDate', name:'CRHRegistrationDate' },
			{ label: 'cRHSignNumberCustomerInquiry', name:'CRHSignNumberCustomerInquiry' },
			{ label: 'cRHInquiryDate', name:'CRHInquiryDate' },
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
	// orderHeadings with properties names and labels
	$scope.orderHeadingsDefinition = {
		label: 'order.orderHeading',
		properties : [
			{ label: 'oHDocumentNumber', name:'OHDocumentNumber' },
			{ label: 'oHCreationDate', name:'OHCreationDate' },
			{ label: 'oHOrderNumberOfBuyer', name:'OHOrderNumberOfBuyer' },
			{ label: 'oHOrderDate', name:'OHOrderDate' },
			{ label: 'oHPaymentPeriodBuyer', name:'OHPaymentPeriodBuyer' },
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

	// fill table with data
	$scope.items = [];
	$scope.loaded = false;
	var getUrgentStatuss = function() {
		if(!$scope.loaded && $scope.items.length === 0) {
			$scope.isLoading = true;
			ServiceUrgentStatus.query(function(data) {
				$scope.items = data;
				$scope.isLoading = false;
				$scope.loaded = true;
			});
		}
	};
	getUrgentStatuss();

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

	$scope.$watch('UrgentStatusCollection', function() {
		$scope.itemEdit = CheckSelected.checkSelectedInTable($scope.itemEdit, $scope.UrgentStatusCollection, $scope.items);
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
			templateUrl: 'initialization/urgentstatus/tmplUrgentStatusEdit.tpl.html',
			size: 'lg',
			windowClass: 'hmodal-info',
			controller: 'ctrlUrgentStatusEdit',
			resolve: {
				itemEdit: function() {
					if(isNew) {
						return new ServiceUrgentStatus();
					} else {
						return $scope.itemEdit;
					}
				},
				customerRequestItemsDefinition: function() {
					return $scope.customerRequestItemsDefinition;
				},
				customerRequestHeadersDefinition: function() {
					return $scope.customerRequestHeadersDefinition;
				},
				orderItemsDefinition: function() {
					return $scope.orderItemsDefinition;
				},
				orderHeadingsDefinition: function() {
					return $scope.orderHeadingsDefinition;
				},
				beOrderItemsDefinition: function() {
					return $scope.beOrderItemsDefinition;
				},
			}
		})
		.result.then(function(result) {
			if(!angular.isDefined(result.id)) {
				ServiceUrgentStatus.saveCustom('stockmanagement/urgentstatuss', result, function(savedObject) {
					$scope.items.unshift(savedObject);
					if($scope.itemEdit !== null) {
						var index = $scope.items.map(function(it) { return it.id; }).indexOf($scope.itemEdit.id);
						$scope.items[index].isSelected = false;
					}
					$scope.itemEdit = angular.extend(savedObject);
					$scope.items[0].isSelected = true;
				});
			 } else {
				 ServiceUrgentStatus.updateCustom('stockmanagement/urgentstatuss/'+result.id, result, function(savedObject) {
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


.controller('ctrlUrgentStatusEdit',['$scope', 'Localization', '$modal', '$modalInstance', 'dialogs',
	'ServiceUrgentStatus', 'ServiceCustomerRequestItem', 'ServiceCustomerRequestHeading', 'ServiceOrderItem', 'ServiceOrderHeading', 'ServiceBEOrderItem',   'customerRequestItemsDefinition',  'customerRequestHeadersDefinition',  'orderItemsDefinition',  'orderHeadingsDefinition',  'beOrderItemsDefinition',   'itemEdit',
function($scope, Localization, $modal, $modalInstance, dialogs,
	ServiceUrgentStatus, ServiceCustomerRequestItem, ServiceCustomerRequestHeading, ServiceOrderItem, ServiceOrderHeading, ServiceBEOrderItem,  customerRequestItemsDefinition,  customerRequestHeadersDefinition,  orderItemsDefinition,  orderHeadingsDefinition,  beOrderItemsDefinition,  itemEdit) {

	// dialog mode
	$scope.mode = 'edit';

	// original item state
	var original = angular.copy(itemEdit);
	// item state
	$scope.itemEdit = angular.copy(original);

	// customerRequestItems with properties
	$scope.customerRequestItemsDefinition = customerRequestItemsDefinition;
	// customerRequestHeaders with properties
	$scope.customerRequestHeadersDefinition = customerRequestHeadersDefinition;
	// orderItems with properties
	$scope.orderItemsDefinition = orderItemsDefinition;
	// orderHeadings with properties
	$scope.orderHeadingsDefinition = orderHeadingsDefinition;
	// beOrderItems with properties
	$scope.beOrderItemsDefinition = beOrderItemsDefinition;

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
        for(i in $scope.itemEdit.customerRequestItems) {
    		item = $scope.itemEdit.customerRequestItems[i];
    		delete item.isSelected;
    	}
        for(i in $scope.itemEdit.customerRequestHeaders) {
    		item = $scope.itemEdit.customerRequestHeaders[i];
    		delete item.isSelected;
    	}
        for(i in $scope.itemEdit.orderItems) {
    		item = $scope.itemEdit.orderItems[i];
    		delete item.isSelected;
    	}
        for(i in $scope.itemEdit.orderHeadings) {
    		item = $scope.itemEdit.orderHeadings[i];
    		delete item.isSelected;
    	}
        for(i in $scope.itemEdit.beOrderItems) {
    		item = $scope.itemEdit.beOrderItems[i];
    		delete item.isSelected;
    	}
		$modalInstance.close($scope.itemEdit);
	};


	$scope.canSave = function() {
		var item = $scope.itemEdit;
		return                 item.USCode  &&                 item.USDescription  ;
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


.controller('ctrlUrgentStatusChoose', ['$scope','ServiceUrgentStatus', 'dialogs', '$modal', '$modalInstance', 'itemEdit',
function($scope, ServiceUrgentStatus, dialogs, $modal,  $modalInstance, itemEdit) {

    // entity with properties
    $scope.itemDefinition = {
        label: 'initialization.urgentStatus',
        properties: [
            { label: 'uSCode', name:'USCode', inTable:  true  },
            { label: 'uSDescription', name:'USDescription', inTable:  true  },
        ]
    };

	$scope.items = [];
	$scope.itemEdit = {};

	// fill table with data
	$scope.loaded = false;
	var getUrgentStatuss = function() {
		if(!$scope.loaded && $scope.items.length === 0) {
			$scope.isLoading = true;
			ServiceUrgentStatus.query(function(data) {
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
	getUrgentStatuss();

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