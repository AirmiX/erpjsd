'use strict';

angular.module('Doob.stockmanagement')


.controller('ctrlPacking',['$scope', '$rootScope', '$modal', 'dialogs', 'CheckSelected', 'ServicePacking',
    function($scope, $rootScope, $modal, dialogs, CheckSelected, ServicePacking) {

	// main entity (packing) properties names and labels
	$scope.itemDefinition = {
		label: 'stockmanagement.packing',
		properties: [
			{ label: 'pOrdinalNumber', name:'POrdinalNumber', inTable:  true  },
			{ label: 'pPackedQuantity', name:'PPackedQuantity', inTable:  true  },
			{ label: 'pPackingDate', name:'PPackingDate', inTable:  true  },
			{ label: 'pAddress', name:'PAddress', inTable:  false  },
			{ label: 'pBatch', name:'PBatch', inTable:  false  },
		]
	};

	// shippingDocumentItem with properties names and labels
	$scope.shippingDocumentItemDefinition = {
		label: 'procurement.shippingDocumentItem',
		properties : [
			{ label: 'sDIOrdinalNumber', name:'SDIOrdinalNumber' },
			{ label: 'sDIQuantityDisposed', name:'SDIQuantityDisposed' },
			{ label: 'sDIQuantityPacked', name:'SDIQuantityPacked' },
			{ label: 'sDIQuantityDispatched', name:'SDIQuantityDispatched' },
		]
	};

	// fill table with data
	$scope.items = [];
	$scope.loaded = false;
	var getPackings = function() {
		if(!$scope.loaded && $scope.items.length === 0) {
			$scope.isLoading = true;
			ServicePacking.query(function(data) {
				$scope.items = data;
				$scope.isLoading = false;
				$scope.loaded = true;
			});
		}
	};
	getPackings();

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

	$scope.$watch('PackingCollection', function() {
		$scope.itemEdit = CheckSelected.checkSelectedInTable($scope.itemEdit, $scope.PackingCollection, $scope.items);
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
			templateUrl: 'stockmanagement/packing/tmplPackingEdit.tpl.html',
			size: 'lg',
			windowClass: 'hmodal-info',
			controller: 'ctrlPackingEdit',
			resolve: {
				itemEdit: function() {
					if(isNew) {
						return new ServicePacking();
					} else {
						return $scope.itemEdit;
					}
				},
				shippingDocumentItemDefinition: function() {
					return $scope.shippingDocumentItemDefinition;
				},
			}
		})
		.result.then(function(result) {
			if(!angular.isDefined(result.id)) {
				ServicePacking.saveCustom('stockmanagement/packings', result, function(savedObject) {
					$scope.items.unshift(savedObject);
					if($scope.itemEdit !== null) {
						var index = $scope.items.map(function(it) { return it.id; }).indexOf($scope.itemEdit.id);
						$scope.items[index].isSelected = false;
					}
					$scope.itemEdit = angular.extend(savedObject);
					$scope.items[0].isSelected = true;
				});
			 } else {
				 ServicePacking.updateCustom('stockmanagement/packings/'+result.id, result, function(savedObject) {
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


.controller('ctrlPackingEdit',['$scope', 'Localization', '$modal', '$modalInstance', 'dialogs',
	'ServicePacking', 'ServiceShippingDocumentItem',   'shippingDocumentItemDefinition',   'itemEdit',
function($scope, Localization, $modal, $modalInstance, dialogs,
	ServicePacking, ServiceShippingDocumentItem,  shippingDocumentItemDefinition,  itemEdit) {

	// dialog mode
	$scope.mode = 'edit';

	// original item state
	var original = angular.copy(itemEdit);
	// item state
	$scope.itemEdit = angular.copy(original);

	// shippingDocumentItem with properties
	$scope.shippingDocumentItemDefinition = shippingDocumentItemDefinition;

	// datepicker logic

	// date properties
	$scope.openedPPackingDate = false;

	$scope.open = function($event, opened) {
		$event.preventDefault();
		$event.stopPropagation();
		$scope[opened] = true;
	};



	// Choose shippingDocumentItem
	$scope.openChooseShippingDocumentItemDialog = function() {
        $modal.open({
            backdrop: 'static',
            keyboard : false,
            templateUrl: 'procurement/packing/tmplShippingDocumentItemChoose.tpl.html',
            size: 'lg',
            controller: 'ctrlShippingDocumentItemChoose',
            windowClass: 'hmodal-info',
            resolve: {
				itemEdit: function() {
					if(angular.isDefined($scope.itemEdit.shippingDocumentItem)){
						return $scope.itemEdit.shippingDocumentItem;
					}
				}
			}
		}).result.then(function(result) {
			$scope.itemEdit.shippingDocumentItem = angular.copy(result);
		});
    };


	// Save Button
	$scope.save = function() {
		correctDateTime($scope.itemEdit.PPackingDate);
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
		return                 item.POrdinalNumber  &&                 item.PPackedQuantity  &&                 item.PPackingDate  ;
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


.controller('ctrlPackingChoose', ['$scope','ServicePacking', 'dialogs', '$modal', '$modalInstance', 'itemEdit',
function($scope, ServicePacking, dialogs, $modal,  $modalInstance, itemEdit) {

    // entity with properties
    $scope.itemDefinition = {
        label: 'stockmanagement.packing',
        properties: [
            { label: 'pOrdinalNumber', name:'POrdinalNumber', inTable:  true  },
            { label: 'pPackedQuantity', name:'PPackedQuantity', inTable:  true  },
            { label: 'pPackingDate', name:'PPackingDate', inTable:  true  },
            { label: 'pAddress', name:'PAddress', inTable:  false  },
            { label: 'pBatch', name:'PBatch', inTable:  false  },
        ]
    };

	$scope.items = [];
	$scope.itemEdit = {};

	// fill table with data
	$scope.loaded = false;
	var getPackings = function() {
		if(!$scope.loaded && $scope.items.length === 0) {
			$scope.isLoading = true;
			ServicePacking.query(function(data) {
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
	getPackings();

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