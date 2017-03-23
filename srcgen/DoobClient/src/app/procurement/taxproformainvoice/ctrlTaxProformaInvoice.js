'use strict';

angular.module('Doob.procurement')


.controller('ctrlTaxProformaInvoice',['$scope', '$rootScope', '$modal', 'dialogs', 'CheckSelected', 'ServiceTaxProformaInvoice',
    function($scope, $rootScope, $modal, dialogs, CheckSelected, ServiceTaxProformaInvoice) {

	// main entity (taxProformaInvoice) properties names and labels
	$scope.itemDefinition = {
		label: 'procurement.taxProformaInvoice',
		properties: [
			{ label: 'tPIOrdinalNumber', name:'TPIOrdinalNumber', inTable:  true  },
			{ label: 'tPIDescription', name:'TPIDescription', inTable:  true  },
			{ label: 'tPIRate', name:'TPIRate', inTable:  true  },
			{ label: 'tPIAmount', name:'TPIAmount', inTable:  true  },
			{ label: 'tPIAccount', name:'TPIAccount', inTable:  true  },
			{ label: 'tPIBase', name:'TPIBase', inTable:  false  },
		]
	};

	// proFormaInvoice with properties names and labels
	$scope.proFormaInvoiceDefinition = {
		label: 'procurement.proFormaInvoice',
		properties : [
			{ label: 'pFINumber1', name:'PFINumber1' },
			{ label: 'pFIDate', name:'PFIDate' },
			{ label: 'pFIStatus', name:'PFIStatus' },
			{ label: 'pFIPrint', name:'PFIPrint' },
			{ label: 'pFIPaymentDate', name:'PFIPaymentDate' },
			{ label: 'pFISubTotal', name:'PFISubTotal' },
			{ label: 'pFIForPayment', name:'PFIForPayment' },
		]
	};

	// fill table with data
	$scope.items = [];
	$scope.loaded = false;
	var getTaxProformaInvoices = function() {
		if(!$scope.loaded && $scope.items.length === 0) {
			$scope.isLoading = true;
			ServiceTaxProformaInvoice.query(function(data) {
				$scope.items = data;
				$scope.isLoading = false;
				$scope.loaded = true;
			});
		}
	};
	getTaxProformaInvoices();

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

	$scope.$watch('TaxProformaInvoiceCollection', function() {
		$scope.itemEdit = CheckSelected.checkSelectedInTable($scope.itemEdit, $scope.TaxProformaInvoiceCollection, $scope.items);
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
			templateUrl: 'procurement/taxproformainvoice/tmplTaxProformaInvoiceEdit.tpl.html',
			size: 'lg',
			windowClass: 'hmodal-info',
			controller: 'ctrlTaxProformaInvoiceEdit',
			resolve: {
				itemEdit: function() {
					if(isNew) {
						return new ServiceTaxProformaInvoice();
					} else {
						return $scope.itemEdit;
					}
				},
				proFormaInvoiceDefinition: function() {
					return $scope.proFormaInvoiceDefinition;
				},
			}
		})
		.result.then(function(result) {
			if(!angular.isDefined(result.id)) {
				ServiceTaxProformaInvoice.saveCustom('stockmanagement/taxproformainvoices', result, function(savedObject) {
					$scope.items.unshift(savedObject);
					if($scope.itemEdit !== null) {
						var index = $scope.items.map(function(it) { return it.id; }).indexOf($scope.itemEdit.id);
						$scope.items[index].isSelected = false;
					}
					$scope.itemEdit = angular.extend(savedObject);
					$scope.items[0].isSelected = true;
				});
			 } else {
				 ServiceTaxProformaInvoice.updateCustom('stockmanagement/taxproformainvoices/'+result.id, result, function(savedObject) {
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


.controller('ctrlTaxProformaInvoiceEdit',['$scope', 'Localization', '$modal', '$modalInstance', 'dialogs',
	'ServiceTaxProformaInvoice', 'ServiceProFormaInvoice',   'proFormaInvoiceDefinition',   'itemEdit',
function($scope, Localization, $modal, $modalInstance, dialogs,
	ServiceTaxProformaInvoice, ServiceProFormaInvoice,  proFormaInvoiceDefinition,  itemEdit) {

	// dialog mode
	$scope.mode = 'edit';

	// original item state
	var original = angular.copy(itemEdit);
	// item state
	$scope.itemEdit = angular.copy(original);

	// proFormaInvoice with properties
	$scope.proFormaInvoiceDefinition = proFormaInvoiceDefinition;

	// datepicker logic

	// date properties

	$scope.open = function($event, opened) {
		$event.preventDefault();
		$event.stopPropagation();
		$scope[opened] = true;
	};



	// Choose proFormaInvoice
	$scope.openChooseProFormaInvoiceDialog = function() {
        $modal.open({
            backdrop: 'static',
            keyboard : false,
            templateUrl: 'procurement/taxproformainvoice/tmplProFormaInvoiceChoose.tpl.html',
            size: 'lg',
            controller: 'ctrlProFormaInvoiceChoose',
            windowClass: 'hmodal-info',
            resolve: {
				itemEdit: function() {
					if(angular.isDefined($scope.itemEdit.proFormaInvoice)){
						return $scope.itemEdit.proFormaInvoice;
					}
				}
			}
		}).result.then(function(result) {
			$scope.itemEdit.proFormaInvoice = angular.copy(result);
		});
    };


	// Save Button
	$scope.save = function() {
	   //	delete $scope.itemEdit.isSelected;
		$modalInstance.close($scope.itemEdit);
	};


	$scope.canSave = function() {
		var item = $scope.itemEdit;
		return                 item.TPIOrdinalNumber  &&                 item.TPIDescription  &&                 item.TPIRate  &&                 item.TPIAmount  &&                 item.TPIAccount  ;
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


.controller('ctrlTaxProformaInvoiceChoose', ['$scope','ServiceTaxProformaInvoice', 'dialogs', '$modal', '$modalInstance', 'itemEdit',
function($scope, ServiceTaxProformaInvoice, dialogs, $modal,  $modalInstance, itemEdit) {

    // entity with properties
    $scope.itemDefinition = {
        label: 'procurement.taxProformaInvoice',
        properties: [
            { label: 'tPIOrdinalNumber', name:'TPIOrdinalNumber', inTable:  true  },
            { label: 'tPIDescription', name:'TPIDescription', inTable:  true  },
            { label: 'tPIRate', name:'TPIRate', inTable:  true  },
            { label: 'tPIAmount', name:'TPIAmount', inTable:  true  },
            { label: 'tPIAccount', name:'TPIAccount', inTable:  true  },
            { label: 'tPIBase', name:'TPIBase', inTable:  false  },
        ]
    };

	$scope.items = [];
	$scope.itemEdit = {};

	// fill table with data
	$scope.loaded = false;
	var getTaxProformaInvoices = function() {
		if(!$scope.loaded && $scope.items.length === 0) {
			$scope.isLoading = true;
			ServiceTaxProformaInvoice.query(function(data) {
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
	getTaxProformaInvoices();

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