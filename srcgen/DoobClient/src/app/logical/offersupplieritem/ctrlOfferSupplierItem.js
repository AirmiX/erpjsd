'use strict';

angular.module('Doob.logical')


.controller('ctrlOfferSupplierItem',['$scope', '$rootScope', '$modal', 'dialogs', 'CheckSelected', 'ServiceOfferSupplierItem',
    function($scope, $rootScope, $modal, dialogs, CheckSelected, ServiceOfferSupplierItem) {

	// main entity (offerSupplierItem) properties names and labels
	$scope.itemDefinition = {
		label: 'logical.offerSupplierItem',
		properties: [
			{ label: 'oSIOrdinalNumber', name:'OSIOrdinalNumber', inTable:  true  },
			{ label: 'oSIMeasurementUnit', name:'OSIMeasurementUnit', inTable:  true  },
			{ label: 'oSIOfferedQuantity', name:'OSIOfferedQuantity', inTable:  true  },
			{ label: 'oSIOfferedPrice', name:'OSIOfferedPrice', inTable:  true  },
			{ label: 'oSIDeliveryDeadline', name:'OSIDeliveryDeadline', inTable:  true  },
			{ label: 'oSIStatus', name:'OSIStatus', inTable:  true  },
			{ label: 'oSIRemark', name:'OSIRemark', inTable:  false  },
		]
	};

	// identification with properties names and labels
	$scope.identificationDefinition = {
		label: 'commonbusinessentities.identification',
		properties : [
			{ label: 'iIdentificationCode', name:'IIdentificationCode' },
		]
	};
	// offerSupplierHeading with properties names and labels
	$scope.offerSupplierHeadingDefinition = {
		label: 'logical.offerSupplierHeading',
		properties : [
			{ label: 'oSHNumber', name:'OSHNumber' },
			{ label: 'oSHOfferAcceptStatus', name:'OSHOfferAcceptStatus' },
			{ label: 'oSHReceivingDate', name:'OSHReceivingDate' },
			{ label: 'oSHExpiryDate', name:'OSHExpiryDate' },
		]
	};
	// rfpItem with properties names and labels
	$scope.rfpItemDefinition = {
		label: 'stockmanagement.requestForProposalItem',
		properties : [
			{ label: 'rFPIOrdinalNumber', name:'RFPIOrdinalNumber' },
			{ label: 'rFPIMeasurementUnit', name:'RFPIMeasurementUnit' },
			{ label: 'rFPIRequestedQuantity', name:'RFPIRequestedQuantity' },
			{ label: 'rFPIProcurementSourceStatus', name:'RFPIProcurementSourceStatus' },
		]
	};
	// orderSupplierItems with properties names and labels
	$scope.orderSupplierItemsDefinition = {
		label: 'logical.orderSupplierItem',
		properties : [
			{ label: 'oSIOrdinalNumber', name:'OSIOrdinalNumber' },
			{ label: 'oSIOrderedQuantity', name:'OSIOrderedQuantity' },
			{ label: 'oSIDeliveryDeadline', name:'OSIDeliveryDeadline' },
			{ label: 'oSIQuantityReceived', name:'OSIQuantityReceived' },
			{ label: 'oSIProcurementStatus', name:'OSIProcurementStatus' },
		]
	};

	// fill table with data
	$scope.items = [];
	$scope.loaded = false;
	var getOfferSupplierItems = function() {
		if(!$scope.loaded && $scope.items.length === 0) {
			$scope.isLoading = true;
			ServiceOfferSupplierItem.query(function(data) {
				$scope.items = data;
				$scope.isLoading = false;
				$scope.loaded = true;
			});
		}
	};
	getOfferSupplierItems();

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

	$scope.$watch('OfferSupplierItemCollection', function() {
		$scope.itemEdit = CheckSelected.checkSelectedInTable($scope.itemEdit, $scope.OfferSupplierItemCollection, $scope.items);
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
			templateUrl: 'logical/offersupplieritem/tmplOfferSupplierItemEdit.tpl.html',
			size: 'lg',
			windowClass: 'hmodal-info',
			controller: 'ctrlOfferSupplierItemEdit',
			resolve: {
				itemEdit: function() {
					if(isNew) {
						return new ServiceOfferSupplierItem();
					} else {
						return $scope.itemEdit;
					}
				},
				identificationDefinition: function() {
					return $scope.identificationDefinition;
				},
				offerSupplierHeadingDefinition: function() {
					return $scope.offerSupplierHeadingDefinition;
				},
				rfpItemDefinition: function() {
					return $scope.rfpItemDefinition;
				},
				orderSupplierItemsDefinition: function() {
					return $scope.orderSupplierItemsDefinition;
				},
			}
		})
		.result.then(function(result) {
			if(!angular.isDefined(result.id)) {
				ServiceOfferSupplierItem.saveCustom('stockmanagement/offersupplieritems', result, function(savedObject) {
					$scope.items.unshift(savedObject);
					if($scope.itemEdit !== null) {
						var index = $scope.items.map(function(it) { return it.id; }).indexOf($scope.itemEdit.id);
						$scope.items[index].isSelected = false;
					}
					$scope.itemEdit = angular.extend(savedObject);
					$scope.items[0].isSelected = true;
				});
			 } else {
				 ServiceOfferSupplierItem.updateCustom('stockmanagement/offersupplieritems/'+result.id, result, function(savedObject) {
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


.controller('ctrlOfferSupplierItemEdit',['$scope', 'Localization', '$modal', '$modalInstance', 'dialogs',
	'ServiceOfferSupplierItem', 'ServiceIdentification', 'ServiceOfferSupplierHeading', 'ServiceRequestForProposalItem', 'ServiceOrderSupplierItem',   'identificationDefinition',  'offerSupplierHeadingDefinition',  'rfpItemDefinition',  'orderSupplierItemsDefinition',   'itemEdit',
function($scope, Localization, $modal, $modalInstance, dialogs,
	ServiceOfferSupplierItem, ServiceIdentification, ServiceOfferSupplierHeading, ServiceRequestForProposalItem, ServiceOrderSupplierItem,  identificationDefinition,  offerSupplierHeadingDefinition,  rfpItemDefinition,  orderSupplierItemsDefinition,  itemEdit) {

	// dialog mode
	$scope.mode = 'edit';

	// original item state
	var original = angular.copy(itemEdit);
	// item state
	$scope.itemEdit = angular.copy(original);

	// identification with properties
	$scope.identificationDefinition = identificationDefinition;
	// offerSupplierHeading with properties
	$scope.offerSupplierHeadingDefinition = offerSupplierHeadingDefinition;
	// rfpItem with properties
	$scope.rfpItemDefinition = rfpItemDefinition;
	// orderSupplierItems with properties
	$scope.orderSupplierItemsDefinition = orderSupplierItemsDefinition;

	// datepicker logic

	// date properties
	$scope.openedOSIDeliveryDeadline = false;

	$scope.open = function($event, opened) {
		$event.preventDefault();
		$event.stopPropagation();
		$scope[opened] = true;
	};



	// Choose identification
	$scope.openChooseIdentificationDialog = function() {
        $modal.open({
            backdrop: 'static',
            keyboard : false,
            templateUrl: 'commonbusinessentities/offersupplieritem/tmplIdentificationChoose.tpl.html',
            size: 'lg',
            controller: 'ctrlIdentificationChoose',
            windowClass: 'hmodal-info',
            resolve: {
				itemEdit: function() {
					if(angular.isDefined($scope.itemEdit.identification)){
						return $scope.itemEdit.identification;
					}
				}
			}
		}).result.then(function(result) {
			$scope.itemEdit.identification = angular.copy(result);
		});
    };


	// Choose offerSupplierHeading
	$scope.openChooseOfferSupplierHeadingDialog = function() {
        $modal.open({
            backdrop: 'static',
            keyboard : false,
            templateUrl: 'logical/offersupplieritem/tmplOfferSupplierHeadingChoose.tpl.html',
            size: 'lg',
            controller: 'ctrlOfferSupplierHeadingChoose',
            windowClass: 'hmodal-info',
            resolve: {
				itemEdit: function() {
					if(angular.isDefined($scope.itemEdit.offerSupplierHeading)){
						return $scope.itemEdit.offerSupplierHeading;
					}
				}
			}
		}).result.then(function(result) {
			$scope.itemEdit.offerSupplierHeading = angular.copy(result);
		});
    };


	// Choose rfpItem
	$scope.openChooseRfpItemDialog = function() {
        $modal.open({
            backdrop: 'static',
            keyboard : false,
            templateUrl: 'stockmanagement/offersupplieritem/tmplRequestForProposalItemChoose.tpl.html',
            size: 'lg',
            controller: 'ctrlRequestForProposalItemChoose',
            windowClass: 'hmodal-info',
            resolve: {
				itemEdit: function() {
					if(angular.isDefined($scope.itemEdit.rfpItem)){
						return $scope.itemEdit.rfpItem;
					}
				}
			}
		}).result.then(function(result) {
			$scope.itemEdit.rfpItem = angular.copy(result);
		});
    };


	// Save Button
	$scope.save = function() {
		correctDateTime($scope.itemEdit.OSIDeliveryDeadline);
	   //	delete $scope.itemEdit.isSelected;
        var item;
        var i;
        for(i in $scope.itemEdit.orderSupplierItems) {
    		item = $scope.itemEdit.orderSupplierItems[i];
    		delete item.isSelected;
    	}
		$modalInstance.close($scope.itemEdit);
	};

    var correctDateTime = function(date) {
        if(date instanceof Date && date !== '') {
            date.setMinutes(date.getMinutes() - date.getTimezoneOffset());
        }
    };

	$scope.canSave = function() {
		var item = $scope.itemEdit;
		return                 item.OSIOrdinalNumber  &&                 item.OSIMeasurementUnit  &&                 item.OSIOfferedQuantity  &&                 item.OSIOfferedPrice  &&                 item.OSIDeliveryDeadline  &&                 item.OSIStatus  ;
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


.controller('ctrlOfferSupplierItemChoose', ['$scope','ServiceOfferSupplierItem', 'dialogs', '$modal', '$modalInstance', 'itemEdit',
function($scope, ServiceOfferSupplierItem, dialogs, $modal,  $modalInstance, itemEdit) {

    // entity with properties
    $scope.itemDefinition = {
        label: 'logical.offerSupplierItem',
        properties: [
            { label: 'oSIOrdinalNumber', name:'OSIOrdinalNumber', inTable:  true  },
            { label: 'oSIMeasurementUnit', name:'OSIMeasurementUnit', inTable:  true  },
            { label: 'oSIOfferedQuantity', name:'OSIOfferedQuantity', inTable:  true  },
            { label: 'oSIOfferedPrice', name:'OSIOfferedPrice', inTable:  true  },
            { label: 'oSIDeliveryDeadline', name:'OSIDeliveryDeadline', inTable:  true  },
            { label: 'oSIStatus', name:'OSIStatus', inTable:  true  },
            { label: 'oSIRemark', name:'OSIRemark', inTable:  false  },
        ]
    };

	$scope.items = [];
	$scope.itemEdit = {};

	// fill table with data
	$scope.loaded = false;
	var getOfferSupplierItems = function() {
		if(!$scope.loaded && $scope.items.length === 0) {
			$scope.isLoading = true;
			ServiceOfferSupplierItem.query(function(data) {
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
	getOfferSupplierItems();

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