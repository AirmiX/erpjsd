'use strict';

angular.module('Doob.procurement')


.controller('ctrlTaxInvoice',['$scope', '$rootScope', '$modal', 'dialogs', 'CheckSelected', 'ServiceTaxInvoice',
    function($scope, $rootScope, $modal, dialogs, CheckSelected, ServiceTaxInvoice) {

	// main entity (taxInvoice) properties names and labels
	$scope.itemDefinition = {
		label: 'procurement.taxInvoice',
		properties: [
			{ label: 'tIOrdinalNumber', name:'TIOrdinalNumber', inTable:  true  },
			{ label: 'tIDescription', name:'TIDescription', inTable:  false  },
			{ label: 'tIPercentage', name:'TIPercentage', inTable:  true  },
			{ label: 'tIAmount', name:'TIAmount', inTable:  true  },
			{ label: 'tIAccount', name:'TIAccount', inTable:  false  },
			{ label: 'tIBaseAmount', name:'TIBaseAmount', inTable:  false  },
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
	var getTaxInvoices = function() {
		if(!$scope.loaded && $scope.items.length === 0) {
			$scope.isLoading = true;
			ServiceTaxInvoice.query(function(data) {
				$scope.items = data;
				$scope.isLoading = false;
				$scope.loaded = true;
			});
		}
	};
	getTaxInvoices();

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

	$scope.$watch('TaxInvoiceCollection', function() {
		$scope.itemEdit = CheckSelected.checkSelectedInTable($scope.itemEdit, $scope.TaxInvoiceCollection, $scope.items);
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
			templateUrl: 'procurement/taxinvoice/tmplTaxInvoiceEdit.tpl.html',
			size: 'lg',
			windowClass: 'hmodal-info',
			controller: 'ctrlTaxInvoiceEdit',
			resolve: {
				itemEdit: function() {
					if(isNew) {
						return new ServiceTaxInvoice();
					} else {
						return $scope.itemEdit;
					}
				},
				invoiceDefinition: function() {
					return $scope.invoiceDefinition;
				},
			}
		})
		.result.then(function(result) {
			if(!angular.isDefined(result.id)) {
				ServiceTaxInvoice.saveCustom('stockmanagement/taxinvoices', result, function(savedObject) {
					$scope.items.unshift(savedObject);
					if($scope.itemEdit !== null) {
						var index = $scope.items.map(function(it) { return it.id; }).indexOf($scope.itemEdit.id);
						$scope.items[index].isSelected = false;
					}
					$scope.itemEdit = angular.extend(savedObject);
					$scope.items[0].isSelected = true;
				});
			 } else {
				 ServiceTaxInvoice.updateCustom('stockmanagement/taxinvoices/'+result.id, result, function(savedObject) {
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


.controller('ctrlTaxInvoiceEdit',['$scope', 'Localization', '$modal', '$modalInstance', 'dialogs',
	'ServiceTaxInvoice', 'ServiceInvoice',   'invoiceDefinition',   'itemEdit',
function($scope, Localization, $modal, $modalInstance, dialogs,
	ServiceTaxInvoice, ServiceInvoice,  invoiceDefinition,  itemEdit) {

	// dialog mode
	$scope.mode = 'edit';

	// original item state
	var original = angular.copy(itemEdit);
	// item state
	$scope.itemEdit = angular.copy(original);

	// invoice with properties
	$scope.invoiceDefinition = invoiceDefinition;

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
            templateUrl: 'procurement/taxinvoice/tmplInvoiceChoose.tpl.html',
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
		return                 item.TIOrdinalNumber  &&                 item.TIPercentage  &&                 item.TIAmount  ;
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


.controller('ctrlTaxInvoiceChoose', ['$scope','ServiceTaxInvoice', 'dialogs', '$modal', '$modalInstance', 'itemEdit',
function($scope, ServiceTaxInvoice, dialogs, $modal,  $modalInstance, itemEdit) {

    // entity with properties
    $scope.itemDefinition = {
        label: 'procurement.taxInvoice',
        properties: [
            { label: 'tIOrdinalNumber', name:'TIOrdinalNumber', inTable:  true  },
            { label: 'tIDescription', name:'TIDescription', inTable:  false  },
            { label: 'tIPercentage', name:'TIPercentage', inTable:  true  },
            { label: 'tIAmount', name:'TIAmount', inTable:  true  },
            { label: 'tIAccount', name:'TIAccount', inTable:  false  },
            { label: 'tIBaseAmount', name:'TIBaseAmount', inTable:  false  },
        ]
    };

	$scope.items = [];
	$scope.itemEdit = {};

	// fill table with data
	$scope.loaded = false;
	var getTaxInvoices = function() {
		if(!$scope.loaded && $scope.items.length === 0) {
			$scope.isLoading = true;
			ServiceTaxInvoice.query(function(data) {
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
	getTaxInvoices();

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