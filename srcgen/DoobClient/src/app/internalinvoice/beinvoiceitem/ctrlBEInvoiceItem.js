'use strict';

angular.module('Doob.internalinvoice')


.controller('ctrlBEInvoiceItem',['$scope', '$rootScope', '$modal', 'dialogs', 'CheckSelected', 'ServiceBEInvoiceItem',
    function($scope, $rootScope, $modal, dialogs, CheckSelected, ServiceBEInvoiceItem) {

	// main entity (bEInvoiceItem) properties names and labels
	$scope.itemDefinition = {
		label: 'internalinvoice.bEInvoiceItem',
		properties: [
			{ label: 'bEIIOrdinalNumber', name:'BEIIOrdinalNumber', inTable:  true  },
			{ label: 'bEIIQuantity', name:'BEIIQuantity', inTable:  true  },
			{ label: 'bEIIPrice', name:'BEIIPrice', inTable:  false  },
			{ label: 'bEIIValue', name:'BEIIValue', inTable:  false  },
			{ label: 'bEIIRebate', name:'BEIIRebate', inTable:  false  },
		]
	};

	// beOrderItem with properties names and labels
	$scope.beOrderItemDefinition = {
		label: 'internalorder.bEOrderItem',
		properties : [
			{ label: 'bEOIOrdinalNumber', name:'BEOIOrdinalNumber' },
			{ label: 'bEOIOrderedQuantity', name:'BEOIOrderedQuantity' },
		]
	};
	// beInvoice with properties names and labels
	$scope.beInvoiceDefinition = {
		label: 'internalinvoice.bEInvoice',
		properties : [
			{ label: 'bEIHInvoiceNumber', name:'BEIHInvoiceNumber' },
			{ label: 'bEIHCreationDateDate', name:'BEIHCreationDateDate' },
		]
	};

	// fill table with data
	$scope.items = [];
	$scope.loaded = false;
	var getBEInvoiceItems = function() {
		if(!$scope.loaded && $scope.items.length === 0) {
			$scope.isLoading = true;
			ServiceBEInvoiceItem.query(function(data) {
				$scope.items = data;
				$scope.isLoading = false;
				$scope.loaded = true;
			});
		}
	};
	getBEInvoiceItems();

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

	$scope.$watch('BEInvoiceItemCollection', function() {
		$scope.itemEdit = CheckSelected.checkSelectedInTable($scope.itemEdit, $scope.BEInvoiceItemCollection, $scope.items);
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
			templateUrl: 'internalinvoice/beinvoiceitem/tmplBEInvoiceItemEdit.tpl.html',
			size: 'lg',
			windowClass: 'hmodal-info',
			controller: 'ctrlBEInvoiceItemEdit',
			resolve: {
				itemEdit: function() {
					if(isNew) {
						return new ServiceBEInvoiceItem();
					} else {
						return $scope.itemEdit;
					}
				},
				beOrderItemDefinition: function() {
					return $scope.beOrderItemDefinition;
				},
				beInvoiceDefinition: function() {
					return $scope.beInvoiceDefinition;
				},
			}
		})
		.result.then(function(result) {
			if(!angular.isDefined(result.id)) {
				ServiceBEInvoiceItem.saveCustom('stockmanagement/beinvoiceitems', result, function(savedObject) {
					$scope.items.unshift(savedObject);
					if($scope.itemEdit !== null) {
						var index = $scope.items.map(function(it) { return it.id; }).indexOf($scope.itemEdit.id);
						$scope.items[index].isSelected = false;
					}
					$scope.itemEdit = angular.extend(savedObject);
					$scope.items[0].isSelected = true;
				});
			 } else {
				 ServiceBEInvoiceItem.updateCustom('stockmanagement/beinvoiceitems/'+result.id, result, function(savedObject) {
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


.controller('ctrlBEInvoiceItemEdit',['$scope', 'Localization', '$modal', '$modalInstance', 'dialogs',
	'ServiceBEInvoiceItem', 'ServiceBEOrderItem', 'ServiceBEInvoice',   'beOrderItemDefinition',  'beInvoiceDefinition',   'itemEdit',
function($scope, Localization, $modal, $modalInstance, dialogs,
	ServiceBEInvoiceItem, ServiceBEOrderItem, ServiceBEInvoice,  beOrderItemDefinition,  beInvoiceDefinition,  itemEdit) {

	// dialog mode
	$scope.mode = 'edit';

	// original item state
	var original = angular.copy(itemEdit);
	// item state
	$scope.itemEdit = angular.copy(original);

	// beOrderItem with properties
	$scope.beOrderItemDefinition = beOrderItemDefinition;
	// beInvoice with properties
	$scope.beInvoiceDefinition = beInvoiceDefinition;

	// datepicker logic

	// date properties

	$scope.open = function($event, opened) {
		$event.preventDefault();
		$event.stopPropagation();
		$scope[opened] = true;
	};



	// Choose beOrderItem
	$scope.openChooseBeOrderItemDialog = function() {
        $modal.open({
            backdrop: 'static',
            keyboard : false,
            templateUrl: 'internalorder/beinvoiceitem/tmplBEOrderItemChoose.tpl.html',
            size: 'lg',
            controller: 'ctrlBEOrderItemChoose',
            windowClass: 'hmodal-info',
            resolve: {
				itemEdit: function() {
					if(angular.isDefined($scope.itemEdit.beOrderItem)){
						return $scope.itemEdit.beOrderItem;
					}
				}
			}
		}).result.then(function(result) {
			$scope.itemEdit.beOrderItem = angular.copy(result);
		});
    };


	// Choose beInvoice
	$scope.openChooseBeInvoiceDialog = function() {
        $modal.open({
            backdrop: 'static',
            keyboard : false,
            templateUrl: 'internalinvoice/beinvoiceitem/tmplBEInvoiceChoose.tpl.html',
            size: 'lg',
            controller: 'ctrlBEInvoiceChoose',
            windowClass: 'hmodal-info',
            resolve: {
				itemEdit: function() {
					if(angular.isDefined($scope.itemEdit.beInvoice)){
						return $scope.itemEdit.beInvoice;
					}
				}
			}
		}).result.then(function(result) {
			$scope.itemEdit.beInvoice = angular.copy(result);
		});
    };


	// Save Button
	$scope.save = function() {
	   //	delete $scope.itemEdit.isSelected;
		$modalInstance.close($scope.itemEdit);
	};


	$scope.canSave = function() {
		var item = $scope.itemEdit;
		return                 item.BEIIOrdinalNumber  &&                 item.BEIIQuantity  ;
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


.controller('ctrlBEInvoiceItemChoose', ['$scope','ServiceBEInvoiceItem', 'dialogs', '$modal', '$modalInstance', 'itemEdit',
function($scope, ServiceBEInvoiceItem, dialogs, $modal,  $modalInstance, itemEdit) {

    // entity with properties
    $scope.itemDefinition = {
        label: 'internalinvoice.bEInvoiceItem',
        properties: [
            { label: 'bEIIOrdinalNumber', name:'BEIIOrdinalNumber', inTable:  true  },
            { label: 'bEIIQuantity', name:'BEIIQuantity', inTable:  true  },
            { label: 'bEIIPrice', name:'BEIIPrice', inTable:  false  },
            { label: 'bEIIValue', name:'BEIIValue', inTable:  false  },
            { label: 'bEIIRebate', name:'BEIIRebate', inTable:  false  },
        ]
    };

	$scope.items = [];
	$scope.itemEdit = {};

	// fill table with data
	$scope.loaded = false;
	var getBEInvoiceItems = function() {
		if(!$scope.loaded && $scope.items.length === 0) {
			$scope.isLoading = true;
			ServiceBEInvoiceItem.query(function(data) {
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
	getBEInvoiceItems();

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