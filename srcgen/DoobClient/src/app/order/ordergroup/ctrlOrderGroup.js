'use strict';

angular.module('Doob.order')


.controller('ctrlOrderGroup',['$scope', '$rootScope', '$modal', 'dialogs', 'CheckSelected', 'ServiceOrderGroup',
    function($scope, $rootScope, $modal, dialogs, CheckSelected, ServiceOrderGroup) {

	// main entity (orderGroup) properties names and labels
	$scope.itemDefinition = {
		label: 'order.orderGroup',
		properties: [
			{ label: 'oGDescription', name:'OGDescription', inTable:  false  },
			{ label: 'oGCode', name:'OGCode', inTable:  false  },
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

	// fill table with data
	$scope.items = [];
	$scope.loaded = false;
	var getOrderGroups = function() {
		if(!$scope.loaded && $scope.items.length === 0) {
			$scope.isLoading = true;
			ServiceOrderGroup.query(function(data) {
				$scope.items = data;
				$scope.isLoading = false;
				$scope.loaded = true;
			});
		}
	};
	getOrderGroups();

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

	$scope.$watch('OrderGroupCollection', function() {
		$scope.itemEdit = CheckSelected.checkSelectedInTable($scope.itemEdit, $scope.OrderGroupCollection, $scope.items);
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
			templateUrl: 'order/ordergroup/tmplOrderGroupEdit.tpl.html',
			size: 'lg',
			windowClass: 'hmodal-info',
			controller: 'ctrlOrderGroupEdit',
			resolve: {
				itemEdit: function() {
					if(isNew) {
						return new ServiceOrderGroup();
					} else {
						return $scope.itemEdit;
					}
				},
				orderHeadingDefinition: function() {
					return $scope.orderHeadingDefinition;
				},
				orderItemsDefinition: function() {
					return $scope.orderItemsDefinition;
				},
			}
		})
		.result.then(function(result) {
			if(!angular.isDefined(result.id)) {
				ServiceOrderGroup.saveCustom('stockmanagement/ordergroups', result, function(savedObject) {
					$scope.items.unshift(savedObject);
					if($scope.itemEdit !== null) {
						var index = $scope.items.map(function(it) { return it.id; }).indexOf($scope.itemEdit.id);
						$scope.items[index].isSelected = false;
					}
					$scope.itemEdit = angular.extend(savedObject);
					$scope.items[0].isSelected = true;
				});
			 } else {
				 ServiceOrderGroup.updateCustom('stockmanagement/ordergroups/'+result.id, result, function(savedObject) {
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


.controller('ctrlOrderGroupEdit',['$scope', 'Localization', '$modal', '$modalInstance', 'dialogs',
	'ServiceOrderGroup', 'ServiceOrderHeading', 'ServiceOrderItem',   'orderHeadingDefinition',  'orderItemsDefinition',   'itemEdit',
function($scope, Localization, $modal, $modalInstance, dialogs,
	ServiceOrderGroup, ServiceOrderHeading, ServiceOrderItem,  orderHeadingDefinition,  orderItemsDefinition,  itemEdit) {

	// dialog mode
	$scope.mode = 'edit';

	// original item state
	var original = angular.copy(itemEdit);
	// item state
	$scope.itemEdit = angular.copy(original);

	// orderHeading with properties
	$scope.orderHeadingDefinition = orderHeadingDefinition;
	// orderItems with properties
	$scope.orderItemsDefinition = orderItemsDefinition;

	// datepicker logic

	// date properties

	$scope.open = function($event, opened) {
		$event.preventDefault();
		$event.stopPropagation();
		$scope[opened] = true;
	};



	// Choose orderHeading
	$scope.openChooseOrderHeadingDialog = function() {
        $modal.open({
            backdrop: 'static',
            keyboard : false,
            templateUrl: 'order/ordergroup/tmplOrderHeadingChoose.tpl.html',
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


	// Save Button
	$scope.save = function() {
	   //	delete $scope.itemEdit.isSelected;
        var item;
        var i;
        for(i in $scope.itemEdit.orderItems) {
    		item = $scope.itemEdit.orderItems[i];
    		delete item.isSelected;
    	}
		$modalInstance.close($scope.itemEdit);
	};


	$scope.canSave = function() {
        return true;
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


.controller('ctrlOrderGroupChoose', ['$scope','ServiceOrderGroup', 'dialogs', '$modal', '$modalInstance', 'itemEdit',
function($scope, ServiceOrderGroup, dialogs, $modal,  $modalInstance, itemEdit) {

    // entity with properties
    $scope.itemDefinition = {
        label: 'order.orderGroup',
        properties: [
            { label: 'oGDescription', name:'OGDescription', inTable:  false  },
            { label: 'oGCode', name:'OGCode', inTable:  false  },
        ]
    };

	$scope.items = [];
	$scope.itemEdit = {};

	// fill table with data
	$scope.loaded = false;
	var getOrderGroups = function() {
		if(!$scope.loaded && $scope.items.length === 0) {
			$scope.isLoading = true;
			ServiceOrderGroup.query(function(data) {
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
	getOrderGroups();

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