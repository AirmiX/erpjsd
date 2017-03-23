'use strict';

angular.module('Doob.procurement')


.controller('ctrlInvoiceItemsWithoutDisp',['$scope', '$rootScope', '$modal', 'dialogs', 'CheckSelected', 'ServiceInvoiceItemsWithoutDisp',
    function($scope, $rootScope, $modal, dialogs, CheckSelected, ServiceInvoiceItemsWithoutDisp) {

	// main entity (invoiceItemsWithoutDisp) properties names and labels
	$scope.itemDefinition = {
		label: 'procurement.invoiceItemsWithoutDisp',
		properties: [
			{ label: 'iIDOrdinalNumber', name:'IIDOrdinalNumber', inTable:  true  },
			{ label: 'iIDDescription', name:'IIDDescription', inTable:  false  },
			{ label: 'iIDAmount', name:'IIDAmount', inTable:  true  },
			{ label: 'iIDQuantity', name:'IIDQuantity', inTable:  false  },
			{ label: 'iIDPrice', name:'IIDPrice', inTable:  false  },
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
	// taxHeading with properties names and labels
	$scope.taxHeadingDefinition = {
		label: 'initialization.taxHeading',
		properties : [
			{ label: 'tHDesignation', name:'THDesignation' },
			{ label: 'tHDescription', name:'THDescription' },
			{ label: 'tHStartDate', name:'THStartDate' },
			{ label: 'tHTotalPercent', name:'THTotalPercent' },
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

	// fill table with data
	$scope.items = [];
	$scope.loaded = false;
	var getInvoiceItemsWithoutDisps = function() {
		if(!$scope.loaded && $scope.items.length === 0) {
			$scope.isLoading = true;
			ServiceInvoiceItemsWithoutDisp.query(function(data) {
				$scope.items = data;
				$scope.isLoading = false;
				$scope.loaded = true;
			});
		}
	};
	getInvoiceItemsWithoutDisps();

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

	$scope.$watch('InvoiceItemsWithoutDispCollection', function() {
		$scope.itemEdit = CheckSelected.checkSelectedInTable($scope.itemEdit, $scope.InvoiceItemsWithoutDispCollection, $scope.items);
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
			templateUrl: 'procurement/invoiceitemswithoutdisp/tmplInvoiceItemsWithoutDispEdit.tpl.html',
			size: 'lg',
			windowClass: 'hmodal-info',
			controller: 'ctrlInvoiceItemsWithoutDispEdit',
			resolve: {
				itemEdit: function() {
					if(isNew) {
						return new ServiceInvoiceItemsWithoutDisp();
					} else {
						return $scope.itemEdit;
					}
				},
				invoiceDefinition: function() {
					return $scope.invoiceDefinition;
				},
				taxHeadingDefinition: function() {
					return $scope.taxHeadingDefinition;
				},
				measurementUnitDefinition: function() {
					return $scope.measurementUnitDefinition;
				},
			}
		})
		.result.then(function(result) {
			if(!angular.isDefined(result.id)) {
				ServiceInvoiceItemsWithoutDisp.saveCustom('stockmanagement/invoiceitemswithoutdisps', result, function(savedObject) {
					$scope.items.unshift(savedObject);
					if($scope.itemEdit !== null) {
						var index = $scope.items.map(function(it) { return it.id; }).indexOf($scope.itemEdit.id);
						$scope.items[index].isSelected = false;
					}
					$scope.itemEdit = angular.extend(savedObject);
					$scope.items[0].isSelected = true;
				});
			 } else {
				 ServiceInvoiceItemsWithoutDisp.updateCustom('stockmanagement/invoiceitemswithoutdisps/'+result.id, result, function(savedObject) {
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


.controller('ctrlInvoiceItemsWithoutDispEdit',['$scope', 'Localization', '$modal', '$modalInstance', 'dialogs',
	'ServiceInvoiceItemsWithoutDisp', 'ServiceInvoice', 'ServiceTaxHeading', 'ServiceMeasurementUnit',   'invoiceDefinition',  'taxHeadingDefinition',  'measurementUnitDefinition',   'itemEdit',
function($scope, Localization, $modal, $modalInstance, dialogs,
	ServiceInvoiceItemsWithoutDisp, ServiceInvoice, ServiceTaxHeading, ServiceMeasurementUnit,  invoiceDefinition,  taxHeadingDefinition,  measurementUnitDefinition,  itemEdit) {

	// dialog mode
	$scope.mode = 'edit';

	// original item state
	var original = angular.copy(itemEdit);
	// item state
	$scope.itemEdit = angular.copy(original);

	// invoice with properties
	$scope.invoiceDefinition = invoiceDefinition;
	// taxHeading with properties
	$scope.taxHeadingDefinition = taxHeadingDefinition;
	// measurementUnit with properties
	$scope.measurementUnitDefinition = measurementUnitDefinition;

	// datepicker logic

	// date properties

	$scope.open = function($event, opened) {
		$event.preventDefault();
		$event.stopPropagation();
		$scope[opened] = true;
	};



	// Choose invoice
	$scope.openChooseInvoiceDialog = function() {
        $modal.open({
            backdrop: 'static',
            keyboard : false,
            templateUrl: 'procurement/invoiceitemswithoutdisp/tmplInvoiceChoose.tpl.html',
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


	// Choose taxHeading
	$scope.openChooseTaxHeadingDialog = function() {
        $modal.open({
            backdrop: 'static',
            keyboard : false,
            templateUrl: 'initialization/invoiceitemswithoutdisp/tmplTaxHeadingChoose.tpl.html',
            size: 'lg',
            controller: 'ctrlTaxHeadingChoose',
            windowClass: 'hmodal-info',
            resolve: {
				itemEdit: function() {
					if(angular.isDefined($scope.itemEdit.taxHeading)){
						return $scope.itemEdit.taxHeading;
					}
				}
			}
		}).result.then(function(result) {
			$scope.itemEdit.taxHeading = angular.copy(result);
		});
    };


	// Choose measurementUnit
	$scope.openChooseMeasurementUnitDialog = function() {
        $modal.open({
            backdrop: 'static',
            keyboard : false,
            templateUrl: 'commonbusinessentities/invoiceitemswithoutdisp/tmplMeasurementUnitChoose.tpl.html',
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


	// Save Button
	$scope.save = function() {
	   //	delete $scope.itemEdit.isSelected;
		$modalInstance.close($scope.itemEdit);
	};


	$scope.canSave = function() {
		var item = $scope.itemEdit;
		return                 item.IIDOrdinalNumber  &&                 item.IIDAmount  ;
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


.controller('ctrlInvoiceItemsWithoutDispChoose', ['$scope','ServiceInvoiceItemsWithoutDisp', 'dialogs', '$modal', '$modalInstance', 'itemEdit',
function($scope, ServiceInvoiceItemsWithoutDisp, dialogs, $modal,  $modalInstance, itemEdit) {

    // entity with properties
    $scope.itemDefinition = {
        label: 'procurement.invoiceItemsWithoutDisp',
        properties: [
            { label: 'iIDOrdinalNumber', name:'IIDOrdinalNumber', inTable:  true  },
            { label: 'iIDDescription', name:'IIDDescription', inTable:  false  },
            { label: 'iIDAmount', name:'IIDAmount', inTable:  true  },
            { label: 'iIDQuantity', name:'IIDQuantity', inTable:  false  },
            { label: 'iIDPrice', name:'IIDPrice', inTable:  false  },
        ]
    };

	$scope.items = [];
	$scope.itemEdit = {};

	// fill table with data
	$scope.loaded = false;
	var getInvoiceItemsWithoutDisps = function() {
		if(!$scope.loaded && $scope.items.length === 0) {
			$scope.isLoading = true;
			ServiceInvoiceItemsWithoutDisp.query(function(data) {
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
	getInvoiceItemsWithoutDisps();

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