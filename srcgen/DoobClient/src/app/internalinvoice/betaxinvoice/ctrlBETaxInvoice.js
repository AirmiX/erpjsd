'use strict';

angular.module('Doob.internalinvoice')


.controller('ctrlBETaxInvoice',['$scope', '$rootScope', '$modal', 'dialogs', 'CheckSelected', 'ServiceBETaxInvoice',
    function($scope, $rootScope, $modal, dialogs, CheckSelected, ServiceBETaxInvoice) {

	// main entity (bETaxInvoice) properties names and labels
	$scope.itemDefinition = {
		label: 'internalinvoice.bETaxInvoice',
		properties: [
			{ label: 'bETIOrdinalNumber', name:'BETIOrdinalNumber', inTable:  true  },
			{ label: 'bETIDescription', name:'BETIDescription', inTable:  false  },
			{ label: 'bETIPercentage', name:'BETIPercentage', inTable:  true  },
			{ label: 'bETIAmmount', name:'BETIAmmount', inTable:  true  },
		]
	};

	// invoice with properties names and labels
	$scope.invoiceDefinition = {
		label: 'internalinvoice.bEInvoice',
		properties : [
			{ label: 'bEIHInvoiceNumber', name:'BEIHInvoiceNumber' },
			{ label: 'bEIHCreationDateDate', name:'BEIHCreationDateDate' },
		]
	};

	// fill table with data
	$scope.items = [];
	$scope.loaded = false;
	var getBETaxInvoices = function() {
		if(!$scope.loaded && $scope.items.length === 0) {
			$scope.isLoading = true;
			ServiceBETaxInvoice.query(function(data) {
				$scope.items = data;
				$scope.isLoading = false;
				$scope.loaded = true;
			});
		}
	};
	getBETaxInvoices();

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

	$scope.$watch('BETaxInvoiceCollection', function() {
		$scope.itemEdit = CheckSelected.checkSelectedInTable($scope.itemEdit, $scope.BETaxInvoiceCollection, $scope.items);
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
			templateUrl: 'internalinvoice/betaxinvoice/tmplBETaxInvoiceEdit.tpl.html',
			size: 'lg',
			windowClass: 'hmodal-info',
			controller: 'ctrlBETaxInvoiceEdit',
			resolve: {
				itemEdit: function() {
					if(isNew) {
						return new ServiceBETaxInvoice();
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
				ServiceBETaxInvoice.saveCustom('stockmanagement/betaxinvoices', result, function(savedObject) {
					$scope.items.unshift(savedObject);
					if($scope.itemEdit !== null) {
						var index = $scope.items.map(function(it) { return it.id; }).indexOf($scope.itemEdit.id);
						$scope.items[index].isSelected = false;
					}
					$scope.itemEdit = angular.extend(savedObject);
					$scope.items[0].isSelected = true;
				});
			 } else {
				 ServiceBETaxInvoice.updateCustom('stockmanagement/betaxinvoices/'+result.id, result, function(savedObject) {
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


.controller('ctrlBETaxInvoiceEdit',['$scope', 'Localization', '$modal', '$modalInstance', 'dialogs',
	'ServiceBETaxInvoice', 'ServiceBEInvoice',   'invoiceDefinition',   'itemEdit',
function($scope, Localization, $modal, $modalInstance, dialogs,
	ServiceBETaxInvoice, ServiceBEInvoice,  invoiceDefinition,  itemEdit) {

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
            templateUrl: 'internalinvoice/betaxinvoice/tmplBEInvoiceChoose.tpl.html',
            size: 'lg',
            controller: 'ctrlBEInvoiceChoose',
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
		return                 item.BETIOrdinalNumber  &&                 item.BETIPercentage  &&                 item.BETIAmmount  ;
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


.controller('ctrlBETaxInvoiceChoose', ['$scope','ServiceBETaxInvoice', 'dialogs', '$modal', '$modalInstance', 'itemEdit',
function($scope, ServiceBETaxInvoice, dialogs, $modal,  $modalInstance, itemEdit) {

    // entity with properties
    $scope.itemDefinition = {
        label: 'internalinvoice.bETaxInvoice',
        properties: [
            { label: 'bETIOrdinalNumber', name:'BETIOrdinalNumber', inTable:  true  },
            { label: 'bETIDescription', name:'BETIDescription', inTable:  false  },
            { label: 'bETIPercentage', name:'BETIPercentage', inTable:  true  },
            { label: 'bETIAmmount', name:'BETIAmmount', inTable:  true  },
        ]
    };

	$scope.items = [];
	$scope.itemEdit = {};

	// fill table with data
	$scope.loaded = false;
	var getBETaxInvoices = function() {
		if(!$scope.loaded && $scope.items.length === 0) {
			$scope.isLoading = true;
			ServiceBETaxInvoice.query(function(data) {
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
	getBETaxInvoices();

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