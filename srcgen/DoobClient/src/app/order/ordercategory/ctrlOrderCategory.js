'use strict';

angular.module('Doob.order')


.controller('ctrlOrderCategory',['$scope', '$rootScope', '$modal', 'dialogs', 'CheckSelected', 'ServiceOrderCategory',
    function($scope, $rootScope, $modal, dialogs, CheckSelected, ServiceOrderCategory) {

	// main entity (orderCategory) properties names and labels
	$scope.itemDefinition = {
		label: 'order.orderCategory',
		properties: [
			{ label: 'oCCode', name:'OCCode', inTable:  true  },
			{ label: 'oCName', name:'OCName', inTable:  false  },
			{ label: 'oCOrderPrefix', name:'OCOrderPrefix', inTable:  true  },
			{ label: 'oCFreeOfCharge', name:'OCFreeOfCharge', inTable:  true  },
			{ label: 'oCEnabled', name:'OCEnabled', inTable:  true  },
			{ label: 'oCModelName', name:'OCModelName', inTable:  false  },
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

	// fill table with data
	$scope.items = [];
	$scope.loaded = false;
	var getOrderCategorys = function() {
		if(!$scope.loaded && $scope.items.length === 0) {
			$scope.isLoading = true;
			ServiceOrderCategory.query(function(data) {
				$scope.items = data;
				$scope.isLoading = false;
				$scope.loaded = true;
			});
		}
	};
	getOrderCategorys();

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

	$scope.$watch('OrderCategoryCollection', function() {
		$scope.itemEdit = CheckSelected.checkSelectedInTable($scope.itemEdit, $scope.OrderCategoryCollection, $scope.items);
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
			templateUrl: 'order/ordercategory/tmplOrderCategoryEdit.tpl.html',
			size: 'lg',
			windowClass: 'hmodal-info',
			controller: 'ctrlOrderCategoryEdit',
			resolve: {
				itemEdit: function() {
					if(isNew) {
						return new ServiceOrderCategory();
					} else {
						return $scope.itemEdit;
					}
				},
				organizationUnitDefinition: function() {
					return $scope.organizationUnitDefinition;
				},
				orderHeadingsDefinition: function() {
					return $scope.orderHeadingsDefinition;
				},
			}
		})
		.result.then(function(result) {
			if(!angular.isDefined(result.id)) {
				ServiceOrderCategory.saveCustom('stockmanagement/ordercategorys', result, function(savedObject) {
					$scope.items.unshift(savedObject);
					if($scope.itemEdit !== null) {
						var index = $scope.items.map(function(it) { return it.id; }).indexOf($scope.itemEdit.id);
						$scope.items[index].isSelected = false;
					}
					$scope.itemEdit = angular.extend(savedObject);
					$scope.items[0].isSelected = true;
				});
			 } else {
				 ServiceOrderCategory.updateCustom('stockmanagement/ordercategorys/'+result.id, result, function(savedObject) {
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


.controller('ctrlOrderCategoryEdit',['$scope', 'Localization', '$modal', '$modalInstance', 'dialogs',
	'ServiceOrderCategory', 'ServiceOrganizationUnit', 'ServiceOrderHeading',   'organizationUnitDefinition',  'orderHeadingsDefinition',   'itemEdit',
function($scope, Localization, $modal, $modalInstance, dialogs,
	ServiceOrderCategory, ServiceOrganizationUnit, ServiceOrderHeading,  organizationUnitDefinition,  orderHeadingsDefinition,  itemEdit) {

	// dialog mode
	$scope.mode = 'edit';

	// original item state
	var original = angular.copy(itemEdit);
	// item state
	$scope.itemEdit = angular.copy(original);

	// organizationUnit with properties
	$scope.organizationUnitDefinition = organizationUnitDefinition;
	// orderHeadings with properties
	$scope.orderHeadingsDefinition = orderHeadingsDefinition;

	// datepicker logic

	// date properties

	$scope.open = function($event, opened) {
		$event.preventDefault();
		$event.stopPropagation();
		$scope[opened] = true;
	};



	// Choose organizationUnit
	$scope.openChooseOrganizationUnitDialog = function() {
        $modal.open({
            backdrop: 'static',
            keyboard : false,
            templateUrl: 'corporation/ordercategory/tmplOrganizationUnitChoose.tpl.html',
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


	// Save Button
	$scope.save = function() {
	   //	delete $scope.itemEdit.isSelected;
        var item;
        var i;
        for(i in $scope.itemEdit.orderHeadings) {
    		item = $scope.itemEdit.orderHeadings[i];
    		delete item.isSelected;
    	}
		$modalInstance.close($scope.itemEdit);
	};


	$scope.canSave = function() {
		var item = $scope.itemEdit;
		return                 item.OCCode  &&                 item.OCOrderPrefix  &&                 item.OCFreeOfCharge  &&                 item.OCEnabled  ;
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


.controller('ctrlOrderCategoryChoose', ['$scope','ServiceOrderCategory', 'dialogs', '$modal', '$modalInstance', 'itemEdit',
function($scope, ServiceOrderCategory, dialogs, $modal,  $modalInstance, itemEdit) {

    // entity with properties
    $scope.itemDefinition = {
        label: 'order.orderCategory',
        properties: [
            { label: 'oCCode', name:'OCCode', inTable:  true  },
            { label: 'oCName', name:'OCName', inTable:  false  },
            { label: 'oCOrderPrefix', name:'OCOrderPrefix', inTable:  true  },
            { label: 'oCFreeOfCharge', name:'OCFreeOfCharge', inTable:  true  },
            { label: 'oCEnabled', name:'OCEnabled', inTable:  true  },
            { label: 'oCModelName', name:'OCModelName', inTable:  false  },
        ]
    };

	$scope.items = [];
	$scope.itemEdit = {};

	// fill table with data
	$scope.loaded = false;
	var getOrderCategorys = function() {
		if(!$scope.loaded && $scope.items.length === 0) {
			$scope.isLoading = true;
			ServiceOrderCategory.query(function(data) {
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
	getOrderCategorys();

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