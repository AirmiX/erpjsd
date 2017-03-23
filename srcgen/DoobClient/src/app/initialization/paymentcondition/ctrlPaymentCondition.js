'use strict';

angular.module('Doob.initialization')


.controller('ctrlPaymentCondition',['$scope', '$rootScope', '$modal', 'dialogs', 'CheckSelected', 'ServicePaymentCondition',
    function($scope, $rootScope, $modal, dialogs, CheckSelected, ServicePaymentCondition) {

	// main entity (paymentCondition) properties names and labels
	$scope.itemDefinition = {
		label: 'initialization.paymentCondition',
		properties: [
			{ label: 'pCCode', name:'PCCode', inTable:  true  },
			{ label: 'pCDescription', name:'PCDescription', inTable:  true  },
			{ label: 'pCEnglish', name:'PCEnglish', inTable:  false  },
		]
	};

	// invoices with properties names and labels
	$scope.invoicesDefinition = {
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
	// beOrderHeadings with properties names and labels
	$scope.beOrderHeadingsDefinition = {
		label: 'internalorder.bEOrderHeading',
		properties : [
			{ label: 'bEOHDocumentNumber', name:'BEOHDocumentNumber' },
			{ label: 'bEOHCreationDate', name:'BEOHCreationDate' },
			{ label: 'bEOHOrderDate', name:'BEOHOrderDate' },
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
	// proFormaInvoices with properties names and labels
	$scope.proFormaInvoicesDefinition = {
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
	var getPaymentConditions = function() {
		if(!$scope.loaded && $scope.items.length === 0) {
			$scope.isLoading = true;
			ServicePaymentCondition.query(function(data) {
				$scope.items = data;
				$scope.isLoading = false;
				$scope.loaded = true;
			});
		}
	};
	getPaymentConditions();

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

	$scope.$watch('PaymentConditionCollection', function() {
		$scope.itemEdit = CheckSelected.checkSelectedInTable($scope.itemEdit, $scope.PaymentConditionCollection, $scope.items);
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
			templateUrl: 'initialization/paymentcondition/tmplPaymentConditionEdit.tpl.html',
			size: 'lg',
			windowClass: 'hmodal-info',
			controller: 'ctrlPaymentConditionEdit',
			resolve: {
				itemEdit: function() {
					if(isNew) {
						return new ServicePaymentCondition();
					} else {
						return $scope.itemEdit;
					}
				},
				invoicesDefinition: function() {
					return $scope.invoicesDefinition;
				},
				beOrderHeadingsDefinition: function() {
					return $scope.beOrderHeadingsDefinition;
				},
				orderHeadingsDefinition: function() {
					return $scope.orderHeadingsDefinition;
				},
				proFormaInvoicesDefinition: function() {
					return $scope.proFormaInvoicesDefinition;
				},
				beInvoiceDefinition: function() {
					return $scope.beInvoiceDefinition;
				},
			}
		})
		.result.then(function(result) {
			if(!angular.isDefined(result.id)) {
				ServicePaymentCondition.saveCustom('stockmanagement/paymentconditions', result, function(savedObject) {
					$scope.items.unshift(savedObject);
					if($scope.itemEdit !== null) {
						var index = $scope.items.map(function(it) { return it.id; }).indexOf($scope.itemEdit.id);
						$scope.items[index].isSelected = false;
					}
					$scope.itemEdit = angular.extend(savedObject);
					$scope.items[0].isSelected = true;
				});
			 } else {
				 ServicePaymentCondition.updateCustom('stockmanagement/paymentconditions/'+result.id, result, function(savedObject) {
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


.controller('ctrlPaymentConditionEdit',['$scope', 'Localization', '$modal', '$modalInstance', 'dialogs',
	'ServicePaymentCondition', 'ServiceInvoice', 'ServiceBEOrderHeading', 'ServiceOrderHeading', 'ServiceProFormaInvoice', 'ServiceBEInvoice',   'invoicesDefinition',  'beOrderHeadingsDefinition',  'orderHeadingsDefinition',  'proFormaInvoicesDefinition',  'beInvoiceDefinition',   'itemEdit',
function($scope, Localization, $modal, $modalInstance, dialogs,
	ServicePaymentCondition, ServiceInvoice, ServiceBEOrderHeading, ServiceOrderHeading, ServiceProFormaInvoice, ServiceBEInvoice,  invoicesDefinition,  beOrderHeadingsDefinition,  orderHeadingsDefinition,  proFormaInvoicesDefinition,  beInvoiceDefinition,  itemEdit) {

	// dialog mode
	$scope.mode = 'edit';

	// original item state
	var original = angular.copy(itemEdit);
	// item state
	$scope.itemEdit = angular.copy(original);

	// invoices with properties
	$scope.invoicesDefinition = invoicesDefinition;
	// beOrderHeadings with properties
	$scope.beOrderHeadingsDefinition = beOrderHeadingsDefinition;
	// orderHeadings with properties
	$scope.orderHeadingsDefinition = orderHeadingsDefinition;
	// proFormaInvoices with properties
	$scope.proFormaInvoicesDefinition = proFormaInvoicesDefinition;
	// beInvoice with properties
	$scope.beInvoiceDefinition = beInvoiceDefinition;

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
        for(i in $scope.itemEdit.invoices) {
    		item = $scope.itemEdit.invoices[i];
    		delete item.isSelected;
    	}
        for(i in $scope.itemEdit.beOrderHeadings) {
    		item = $scope.itemEdit.beOrderHeadings[i];
    		delete item.isSelected;
    	}
        for(i in $scope.itemEdit.orderHeadings) {
    		item = $scope.itemEdit.orderHeadings[i];
    		delete item.isSelected;
    	}
        for(i in $scope.itemEdit.proFormaInvoices) {
    		item = $scope.itemEdit.proFormaInvoices[i];
    		delete item.isSelected;
    	}
        for(i in $scope.itemEdit.beInvoice) {
    		item = $scope.itemEdit.beInvoice[i];
    		delete item.isSelected;
    	}
		$modalInstance.close($scope.itemEdit);
	};


	$scope.canSave = function() {
		var item = $scope.itemEdit;
		return                 item.PCCode  &&                 item.PCDescription  ;
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


.controller('ctrlPaymentConditionChoose', ['$scope','ServicePaymentCondition', 'dialogs', '$modal', '$modalInstance', 'itemEdit',
function($scope, ServicePaymentCondition, dialogs, $modal,  $modalInstance, itemEdit) {

    // entity with properties
    $scope.itemDefinition = {
        label: 'initialization.paymentCondition',
        properties: [
            { label: 'pCCode', name:'PCCode', inTable:  true  },
            { label: 'pCDescription', name:'PCDescription', inTable:  true  },
            { label: 'pCEnglish', name:'PCEnglish', inTable:  false  },
        ]
    };

	$scope.items = [];
	$scope.itemEdit = {};

	// fill table with data
	$scope.loaded = false;
	var getPaymentConditions = function() {
		if(!$scope.loaded && $scope.items.length === 0) {
			$scope.isLoading = true;
			ServicePaymentCondition.query(function(data) {
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
	getPaymentConditions();

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