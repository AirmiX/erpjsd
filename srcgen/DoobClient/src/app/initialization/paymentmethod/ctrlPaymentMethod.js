'use strict';

angular.module('Doob.initialization')


.controller('ctrlPaymentMethod',['$scope', '$rootScope', '$modal', 'dialogs', 'CheckSelected', 'ServicePaymentMethod',
    function($scope, $rootScope, $modal, dialogs, CheckSelected, ServicePaymentMethod) {

	// main entity (paymentMethod) properties names and labels
	$scope.itemDefinition = {
		label: 'initialization.paymentMethod',
		properties: [
			{ label: 'pMCode', name:'PMCode', inTable:  true  },
			{ label: 'pMName', name:'PMName', inTable:  true  },
			{ label: 'pMDescription', name:'PMDescription', inTable:  false  },
			{ label: 'pMEnabled', name:'PMEnabled', inTable:  true  },
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
	// orderSupplierHeadings with properties names and labels
	$scope.orderSupplierHeadingsDefinition = {
		label: 'logical.orderSupplierHeading',
		properties : [
			{ label: 'oSHNumber', name:'OSHNumber' },
			{ label: 'oSHDate', name:'OSHDate' },
			{ label: 'oSHApprovalDate', name:'OSHApprovalDate' },
		]
	};
	// shippingDocuments with properties names and labels
	$scope.shippingDocumentsDefinition = {
		label: 'procurement.shippingDocument',
		properties : [
			{ label: 'sDDocumentNumber', name:'SDDocumentNumber' },
			{ label: 'sDDispositionDate', name:'SDDispositionDate' },
			{ label: 'sDStatus', name:'SDStatus' },
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
	// offerSupplierHeadings with properties names and labels
	$scope.offerSupplierHeadingsDefinition = {
		label: 'logical.offerSupplierHeading',
		properties : [
			{ label: 'oSHNumber', name:'OSHNumber' },
			{ label: 'oSHOfferAcceptStatus', name:'OSHOfferAcceptStatus' },
			{ label: 'oSHReceivingDate', name:'OSHReceivingDate' },
			{ label: 'oSHExpiryDate', name:'OSHExpiryDate' },
		]
	};

	// fill table with data
	$scope.items = [];
	$scope.loaded = false;
	var getPaymentMethods = function() {
		if(!$scope.loaded && $scope.items.length === 0) {
			$scope.isLoading = true;
			ServicePaymentMethod.query(function(data) {
				$scope.items = data;
				$scope.isLoading = false;
				$scope.loaded = true;
			});
		}
	};
	getPaymentMethods();

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

	$scope.$watch('PaymentMethodCollection', function() {
		$scope.itemEdit = CheckSelected.checkSelectedInTable($scope.itemEdit, $scope.PaymentMethodCollection, $scope.items);
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
			templateUrl: 'initialization/paymentmethod/tmplPaymentMethodEdit.tpl.html',
			size: 'lg',
			windowClass: 'hmodal-info',
			controller: 'ctrlPaymentMethodEdit',
			resolve: {
				itemEdit: function() {
					if(isNew) {
						return new ServicePaymentMethod();
					} else {
						return $scope.itemEdit;
					}
				},
				beOrderHeadingsDefinition: function() {
					return $scope.beOrderHeadingsDefinition;
				},
				orderSupplierHeadingsDefinition: function() {
					return $scope.orderSupplierHeadingsDefinition;
				},
				shippingDocumentsDefinition: function() {
					return $scope.shippingDocumentsDefinition;
				},
				orderHeadingsDefinition: function() {
					return $scope.orderHeadingsDefinition;
				},
				offerSupplierHeadingsDefinition: function() {
					return $scope.offerSupplierHeadingsDefinition;
				},
			}
		})
		.result.then(function(result) {
			if(!angular.isDefined(result.id)) {
				ServicePaymentMethod.saveCustom('stockmanagement/paymentmethods', result, function(savedObject) {
					$scope.items.unshift(savedObject);
					if($scope.itemEdit !== null) {
						var index = $scope.items.map(function(it) { return it.id; }).indexOf($scope.itemEdit.id);
						$scope.items[index].isSelected = false;
					}
					$scope.itemEdit = angular.extend(savedObject);
					$scope.items[0].isSelected = true;
				});
			 } else {
				 ServicePaymentMethod.updateCustom('stockmanagement/paymentmethods/'+result.id, result, function(savedObject) {
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


.controller('ctrlPaymentMethodEdit',['$scope', 'Localization', '$modal', '$modalInstance', 'dialogs',
	'ServicePaymentMethod', 'ServiceBEOrderHeading', 'ServiceOrderSupplierHeading', 'ServiceShippingDocument', 'ServiceOrderHeading', 'ServiceOfferSupplierHeading',   'beOrderHeadingsDefinition',  'orderSupplierHeadingsDefinition',  'shippingDocumentsDefinition',  'orderHeadingsDefinition',  'offerSupplierHeadingsDefinition',   'itemEdit',
function($scope, Localization, $modal, $modalInstance, dialogs,
	ServicePaymentMethod, ServiceBEOrderHeading, ServiceOrderSupplierHeading, ServiceShippingDocument, ServiceOrderHeading, ServiceOfferSupplierHeading,  beOrderHeadingsDefinition,  orderSupplierHeadingsDefinition,  shippingDocumentsDefinition,  orderHeadingsDefinition,  offerSupplierHeadingsDefinition,  itemEdit) {

	// dialog mode
	$scope.mode = 'edit';

	// original item state
	var original = angular.copy(itemEdit);
	// item state
	$scope.itemEdit = angular.copy(original);

	// beOrderHeadings with properties
	$scope.beOrderHeadingsDefinition = beOrderHeadingsDefinition;
	// orderSupplierHeadings with properties
	$scope.orderSupplierHeadingsDefinition = orderSupplierHeadingsDefinition;
	// shippingDocuments with properties
	$scope.shippingDocumentsDefinition = shippingDocumentsDefinition;
	// orderHeadings with properties
	$scope.orderHeadingsDefinition = orderHeadingsDefinition;
	// offerSupplierHeadings with properties
	$scope.offerSupplierHeadingsDefinition = offerSupplierHeadingsDefinition;

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
        for(i in $scope.itemEdit.beOrderHeadings) {
    		item = $scope.itemEdit.beOrderHeadings[i];
    		delete item.isSelected;
    	}
        for(i in $scope.itemEdit.orderSupplierHeadings) {
    		item = $scope.itemEdit.orderSupplierHeadings[i];
    		delete item.isSelected;
    	}
        for(i in $scope.itemEdit.shippingDocuments) {
    		item = $scope.itemEdit.shippingDocuments[i];
    		delete item.isSelected;
    	}
        for(i in $scope.itemEdit.orderHeadings) {
    		item = $scope.itemEdit.orderHeadings[i];
    		delete item.isSelected;
    	}
        for(i in $scope.itemEdit.offerSupplierHeadings) {
    		item = $scope.itemEdit.offerSupplierHeadings[i];
    		delete item.isSelected;
    	}
		$modalInstance.close($scope.itemEdit);
	};


	$scope.canSave = function() {
		var item = $scope.itemEdit;
		return                 item.PMCode  &&                 item.PMName  &&                 item.PMEnabled  ;
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


.controller('ctrlPaymentMethodChoose', ['$scope','ServicePaymentMethod', 'dialogs', '$modal', '$modalInstance', 'itemEdit',
function($scope, ServicePaymentMethod, dialogs, $modal,  $modalInstance, itemEdit) {

    // entity with properties
    $scope.itemDefinition = {
        label: 'initialization.paymentMethod',
        properties: [
            { label: 'pMCode', name:'PMCode', inTable:  true  },
            { label: 'pMName', name:'PMName', inTable:  true  },
            { label: 'pMDescription', name:'PMDescription', inTable:  false  },
            { label: 'pMEnabled', name:'PMEnabled', inTable:  true  },
        ]
    };

	$scope.items = [];
	$scope.itemEdit = {};

	// fill table with data
	$scope.loaded = false;
	var getPaymentMethods = function() {
		if(!$scope.loaded && $scope.items.length === 0) {
			$scope.isLoading = true;
			ServicePaymentMethod.query(function(data) {
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
	getPaymentMethods();

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