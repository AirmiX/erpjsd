'use strict';

angular.module('Doob.initialization')


.controller('ctrlCommercialityStatus',['$scope', '$rootScope', '$modal', 'dialogs', 'CheckSelected', 'ServiceCommercialityStatus',
    function($scope, $rootScope, $modal, dialogs, CheckSelected, ServiceCommercialityStatus) {

	// main entity (commercialityStatus) properties names and labels
	$scope.itemDefinition = {
		label: 'initialization.commercialityStatus',
		properties: [
			{ label: 'cSCode', name:'CSCode', inTable:  true  },
			{ label: 'cSName', name:'CSName', inTable:  true  },
			{ label: 'cSDescription', name:'CSDescription', inTable:  false  },
		]
	};

	// sellingPrices with properties names and labels
	$scope.sellingPricesDefinition = {
		label: 'sellingprice.sellingPrice',
		properties : [
			{ label: 'sPPrice', name:'SPPrice' },
			{ label: 'sPDateFrom', name:'SPDateFrom' },
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
	var getCommercialityStatuss = function() {
		if(!$scope.loaded && $scope.items.length === 0) {
			$scope.isLoading = true;
			ServiceCommercialityStatus.query(function(data) {
				$scope.items = data;
				$scope.isLoading = false;
				$scope.loaded = true;
			});
		}
	};
	getCommercialityStatuss();

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

	$scope.$watch('CommercialityStatusCollection', function() {
		$scope.itemEdit = CheckSelected.checkSelectedInTable($scope.itemEdit, $scope.CommercialityStatusCollection, $scope.items);
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
			templateUrl: 'initialization/commercialitystatus/tmplCommercialityStatusEdit.tpl.html',
			size: 'lg',
			windowClass: 'hmodal-info',
			controller: 'ctrlCommercialityStatusEdit',
			resolve: {
				itemEdit: function() {
					if(isNew) {
						return new ServiceCommercialityStatus();
					} else {
						return $scope.itemEdit;
					}
				},
				sellingPricesDefinition: function() {
					return $scope.sellingPricesDefinition;
				},
				customerRequestItemsDefinition: function() {
					return $scope.customerRequestItemsDefinition;
				},
				orderItemsDefinition: function() {
					return $scope.orderItemsDefinition;
				},
			}
		})
		.result.then(function(result) {
			if(!angular.isDefined(result.id)) {
				ServiceCommercialityStatus.saveCustom('stockmanagement/commercialitystatuss', result, function(savedObject) {
					$scope.items.unshift(savedObject);
					if($scope.itemEdit !== null) {
						var index = $scope.items.map(function(it) { return it.id; }).indexOf($scope.itemEdit.id);
						$scope.items[index].isSelected = false;
					}
					$scope.itemEdit = angular.extend(savedObject);
					$scope.items[0].isSelected = true;
				});
			 } else {
				 ServiceCommercialityStatus.updateCustom('stockmanagement/commercialitystatuss/'+result.id, result, function(savedObject) {
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


.controller('ctrlCommercialityStatusEdit',['$scope', 'Localization', '$modal', '$modalInstance', 'dialogs',
	'ServiceCommercialityStatus', 'ServiceSellingPrice', 'ServiceCustomerRequestItem', 'ServiceOrderItem',   'sellingPricesDefinition',  'customerRequestItemsDefinition',  'orderItemsDefinition',   'itemEdit',
function($scope, Localization, $modal, $modalInstance, dialogs,
	ServiceCommercialityStatus, ServiceSellingPrice, ServiceCustomerRequestItem, ServiceOrderItem,  sellingPricesDefinition,  customerRequestItemsDefinition,  orderItemsDefinition,  itemEdit) {

	// dialog mode
	$scope.mode = 'edit';

	// original item state
	var original = angular.copy(itemEdit);
	// item state
	$scope.itemEdit = angular.copy(original);

	// sellingPrices with properties
	$scope.sellingPricesDefinition = sellingPricesDefinition;
	// customerRequestItems with properties
	$scope.customerRequestItemsDefinition = customerRequestItemsDefinition;
	// orderItems with properties
	$scope.orderItemsDefinition = orderItemsDefinition;

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
        for(i in $scope.itemEdit.sellingPrices) {
    		item = $scope.itemEdit.sellingPrices[i];
    		delete item.isSelected;
    	}
        for(i in $scope.itemEdit.customerRequestItems) {
    		item = $scope.itemEdit.customerRequestItems[i];
    		delete item.isSelected;
    	}
        for(i in $scope.itemEdit.orderItems) {
    		item = $scope.itemEdit.orderItems[i];
    		delete item.isSelected;
    	}
		$modalInstance.close($scope.itemEdit);
	};


	$scope.canSave = function() {
		var item = $scope.itemEdit;
		return                 item.CSCode  &&                 item.CSName  ;
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


.controller('ctrlCommercialityStatusChoose', ['$scope','ServiceCommercialityStatus', 'dialogs', '$modal', '$modalInstance', 'itemEdit',
function($scope, ServiceCommercialityStatus, dialogs, $modal,  $modalInstance, itemEdit) {

    // entity with properties
    $scope.itemDefinition = {
        label: 'initialization.commercialityStatus',
        properties: [
            { label: 'cSCode', name:'CSCode', inTable:  true  },
            { label: 'cSName', name:'CSName', inTable:  true  },
            { label: 'cSDescription', name:'CSDescription', inTable:  false  },
        ]
    };

	$scope.items = [];
	$scope.itemEdit = {};

	// fill table with data
	$scope.loaded = false;
	var getCommercialityStatuss = function() {
		if(!$scope.loaded && $scope.items.length === 0) {
			$scope.isLoading = true;
			ServiceCommercialityStatus.query(function(data) {
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
	getCommercialityStatuss();

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