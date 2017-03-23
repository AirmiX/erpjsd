'use strict';

angular.module('Doob.productiondata')


.controller('ctrlProduct',['$scope', '$rootScope', '$modal', 'dialogs', 'CheckSelected', 'ServiceProduct',
    function($scope, $rootScope, $modal, dialogs, CheckSelected, ServiceProduct) {

	// main entity (product) properties names and labels
	$scope.itemDefinition = {
		label: 'productiondata.product',
		properties: [
			{ label: 'pProductIndicator', name:'PProductIndicator', inTable:  false  },
			{ label: 'pProcurementIndicator', name:'PProcurementIndicator', inTable:  false  },
			{ label: 'pProductWeight', name:'PProductWeight', inTable:  false  },
			{ label: 'pProductStatus', name:'PProductStatus', inTable:  false  },
			{ label: 'pSecurityIndicator', name:'PSecurityIndicator', inTable:  false  },
			{ label: 'pSparePartIndicator', name:'PSparePartIndicator', inTable:  false  },
			{ label: 'pDrawingFormat', name:'PDrawingFormat', inTable:  false  },
			{ label: 'pDrawingDate', name:'PDrawingDate', inTable:  false  },
		]
	};

	// stockroom with properties names and labels
	$scope.stockroomDefinition = {
		label: 'stock.stockroom',
		properties : [
			{ label: 'sCode', name:'SCode' },
			{ label: 'sName', name:'SName' },
			{ label: 'sFullName', name:'SFullName' },
			{ label: 'sType', name:'SType' },
			{ label: 'sConditions', name:'SConditions' },
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

	// fill table with data
	$scope.items = [];
	$scope.loaded = false;
	var getProducts = function() {
		if(!$scope.loaded && $scope.items.length === 0) {
			$scope.isLoading = true;
			ServiceProduct.query(function(data) {
				$scope.items = data;
				$scope.isLoading = false;
				$scope.loaded = true;
			});
		}
	};
	getProducts();

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

	$scope.$watch('ProductCollection', function() {
		$scope.itemEdit = CheckSelected.checkSelectedInTable($scope.itemEdit, $scope.ProductCollection, $scope.items);
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
			templateUrl: 'productiondata/product/tmplProductEdit.tpl.html',
			size: 'lg',
			windowClass: 'hmodal-info',
			controller: 'ctrlProductEdit',
			resolve: {
				itemEdit: function() {
					if(isNew) {
						return new ServiceProduct();
					} else {
						return $scope.itemEdit;
					}
				},
				stockroomDefinition: function() {
					return $scope.stockroomDefinition;
				},
				organizationUnitDefinition: function() {
					return $scope.organizationUnitDefinition;
				},
			}
		})
		.result.then(function(result) {
			if(!angular.isDefined(result.id)) {
				ServiceProduct.saveCustom('stockmanagement/products', result, function(savedObject) {
					$scope.items.unshift(savedObject);
					if($scope.itemEdit !== null) {
						var index = $scope.items.map(function(it) { return it.id; }).indexOf($scope.itemEdit.id);
						$scope.items[index].isSelected = false;
					}
					$scope.itemEdit = angular.extend(savedObject);
					$scope.items[0].isSelected = true;
				});
			 } else {
				 ServiceProduct.updateCustom('stockmanagement/products/'+result.id, result, function(savedObject) {
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


.controller('ctrlProductEdit',['$scope', 'Localization', '$modal', '$modalInstance', 'dialogs',
	'ServiceProduct', 'ServiceStockroom', 'ServiceOrganizationUnit',   'stockroomDefinition',  'organizationUnitDefinition',   'itemEdit',
function($scope, Localization, $modal, $modalInstance, dialogs,
	ServiceProduct, ServiceStockroom, ServiceOrganizationUnit,  stockroomDefinition,  organizationUnitDefinition,  itemEdit) {

	// dialog mode
	$scope.mode = 'edit';

	// original item state
	var original = angular.copy(itemEdit);
	// item state
	$scope.itemEdit = angular.copy(original);

	// stockroom with properties
	$scope.stockroomDefinition = stockroomDefinition;
	// organizationUnit with properties
	$scope.organizationUnitDefinition = organizationUnitDefinition;

	// datepicker logic

	// date properties
	$scope.openedPDrawingDate = false;

	$scope.open = function($event, opened) {
		$event.preventDefault();
		$event.stopPropagation();
		$scope[opened] = true;
	};



	// Choose stockroom
	$scope.openChooseStockroomDialog = function() {
        $modal.open({
            backdrop: 'static',
            keyboard : false,
            templateUrl: 'stock/product/tmplStockroomChoose.tpl.html',
            size: 'lg',
            controller: 'ctrlStockroomChoose',
            windowClass: 'hmodal-info',
            resolve: {
				itemEdit: function() {
					if(angular.isDefined($scope.itemEdit.stockroom)){
						return $scope.itemEdit.stockroom;
					}
				}
			}
		}).result.then(function(result) {
			$scope.itemEdit.stockroom = angular.copy(result);
		});
    };


	// Choose organizationUnit
	$scope.openChooseOrganizationUnitDialog = function() {
        $modal.open({
            backdrop: 'static',
            keyboard : false,
            templateUrl: 'corporation/product/tmplOrganizationUnitChoose.tpl.html',
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
		correctDateTime($scope.itemEdit.PDrawingDate);
	   //	delete $scope.itemEdit.isSelected;
		$modalInstance.close($scope.itemEdit);
	};

    var correctDateTime = function(date) {
        if(date instanceof Date && date !== '') {
            date.setMinutes(date.getMinutes() - date.getTimezoneOffset());
        }
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


.controller('ctrlProductChoose', ['$scope','ServiceProduct', 'dialogs', '$modal', '$modalInstance', 'itemEdit',
function($scope, ServiceProduct, dialogs, $modal,  $modalInstance, itemEdit) {

    // entity with properties
    $scope.itemDefinition = {
        label: 'productiondata.product',
        properties: [
            { label: 'pProductIndicator', name:'PProductIndicator', inTable:  false  },
            { label: 'pProcurementIndicator', name:'PProcurementIndicator', inTable:  false  },
            { label: 'pProductWeight', name:'PProductWeight', inTable:  false  },
            { label: 'pProductStatus', name:'PProductStatus', inTable:  false  },
            { label: 'pSecurityIndicator', name:'PSecurityIndicator', inTable:  false  },
            { label: 'pSparePartIndicator', name:'PSparePartIndicator', inTable:  false  },
            { label: 'pDrawingFormat', name:'PDrawingFormat', inTable:  false  },
            { label: 'pDrawingDate', name:'PDrawingDate', inTable:  false  },
        ]
    };

	$scope.items = [];
	$scope.itemEdit = {};

	// fill table with data
	$scope.loaded = false;
	var getProducts = function() {
		if(!$scope.loaded && $scope.items.length === 0) {
			$scope.isLoading = true;
			ServiceProduct.query(function(data) {
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
	getProducts();

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