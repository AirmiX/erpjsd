'use strict';

angular.module('Doob.stockmanagement')


.controller('ctrlRequestForProposalItem',['$scope', '$rootScope', '$modal', 'dialogs', 'CheckSelected', 'ServiceRequestForProposalItem',
    function($scope, $rootScope, $modal, dialogs, CheckSelected, ServiceRequestForProposalItem) {

	// main entity (requestForProposalItem) properties names and labels
	$scope.itemDefinition = {
		label: 'stockmanagement.requestForProposalItem',
		properties: [
			{ label: 'rFPIOrdinalNumber', name:'RFPIOrdinalNumber', inTable:  true  },
			{ label: 'rFPIMeasurementUnit', name:'RFPIMeasurementUnit', inTable:  true  },
			{ label: 'rFPIRequestedQuantity', name:'RFPIRequestedQuantity', inTable:  true  },
			{ label: 'rFPIDrawingNumber', name:'RFPIDrawingNumber', inTable:  false  },
			{ label: 'rFPIProductCode', name:'RFPIProductCode', inTable:  false  },
			{ label: 'rFPIProcurementSourceStatus', name:'RFPIProcurementSourceStatus', inTable:  true  },
			{ label: 'rFPIRemark', name:'RFPIRemark', inTable:  false  },
			{ label: 'rFPIDeliveryDeadline', name:'RFPIDeliveryDeadline', inTable:  false  },
		]
	};

	// identification with properties names and labels
	$scope.identificationDefinition = {
		label: 'commonbusinessentities.identification',
		properties : [
			{ label: 'iIdentificationCode', name:'IIdentificationCode' },
		]
	};
	// rfpHeading with properties names and labels
	$scope.rfpHeadingDefinition = {
		label: 'stockmanagement.requestForProposalHeading',
		properties : [
			{ label: 'rFPHNumber', name:'RFPHNumber' },
			{ label: 'rFPHIssueDate', name:'RFPHIssueDate' },
			{ label: 'rFPHResponseDeadline', name:'RFPHResponseDeadline' },
			{ label: 'rFPHStatus', name:'RFPHStatus' },
		]
	};
	// offerSupplierItems with properties names and labels
	$scope.offerSupplierItemsDefinition = {
		label: 'logical.offerSupplierItem',
		properties : [
			{ label: 'oSIOrdinalNumber', name:'OSIOrdinalNumber' },
			{ label: 'oSIMeasurementUnit', name:'OSIMeasurementUnit' },
			{ label: 'oSIOfferedQuantity', name:'OSIOfferedQuantity' },
			{ label: 'oSIOfferedPrice', name:'OSIOfferedPrice' },
			{ label: 'oSIDeliveryDeadline', name:'OSIDeliveryDeadline' },
			{ label: 'oSIStatus', name:'OSIStatus' },
		]
	};

	// fill table with data
	$scope.items = [];
	$scope.loaded = false;
	var getRequestForProposalItems = function() {
		if(!$scope.loaded && $scope.items.length === 0) {
			$scope.isLoading = true;
			ServiceRequestForProposalItem.query(function(data) {
				$scope.items = data;
				$scope.isLoading = false;
				$scope.loaded = true;
			});
		}
	};
	getRequestForProposalItems();

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

	$scope.$watch('RequestForProposalItemCollection', function() {
		$scope.itemEdit = CheckSelected.checkSelectedInTable($scope.itemEdit, $scope.RequestForProposalItemCollection, $scope.items);
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
			templateUrl: 'stockmanagement/requestforproposalitem/tmplRequestForProposalItemEdit.tpl.html',
			size: 'lg',
			windowClass: 'hmodal-info',
			controller: 'ctrlRequestForProposalItemEdit',
			resolve: {
				itemEdit: function() {
					if(isNew) {
						return new ServiceRequestForProposalItem();
					} else {
						return $scope.itemEdit;
					}
				},
				identificationDefinition: function() {
					return $scope.identificationDefinition;
				},
				rfpHeadingDefinition: function() {
					return $scope.rfpHeadingDefinition;
				},
				offerSupplierItemsDefinition: function() {
					return $scope.offerSupplierItemsDefinition;
				},
			}
		})
		.result.then(function(result) {
			if(!angular.isDefined(result.id)) {
				ServiceRequestForProposalItem.saveCustom('stockmanagement/requestforproposalitems', result, function(savedObject) {
					$scope.items.unshift(savedObject);
					if($scope.itemEdit !== null) {
						var index = $scope.items.map(function(it) { return it.id; }).indexOf($scope.itemEdit.id);
						$scope.items[index].isSelected = false;
					}
					$scope.itemEdit = angular.extend(savedObject);
					$scope.items[0].isSelected = true;
				});
			 } else {
				 ServiceRequestForProposalItem.updateCustom('stockmanagement/requestforproposalitems/'+result.id, result, function(savedObject) {
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


.controller('ctrlRequestForProposalItemEdit',['$scope', 'Localization', '$modal', '$modalInstance', 'dialogs',
	'ServiceRequestForProposalItem', 'ServiceIdentification', 'ServiceRequestForProposalHeading', 'ServiceOfferSupplierItem',   'identificationDefinition',  'rfpHeadingDefinition',  'offerSupplierItemsDefinition',   'itemEdit',
function($scope, Localization, $modal, $modalInstance, dialogs,
	ServiceRequestForProposalItem, ServiceIdentification, ServiceRequestForProposalHeading, ServiceOfferSupplierItem,  identificationDefinition,  rfpHeadingDefinition,  offerSupplierItemsDefinition,  itemEdit) {

	// dialog mode
	$scope.mode = 'edit';

	// original item state
	var original = angular.copy(itemEdit);
	// item state
	$scope.itemEdit = angular.copy(original);

	// identification with properties
	$scope.identificationDefinition = identificationDefinition;
	// rfpHeading with properties
	$scope.rfpHeadingDefinition = rfpHeadingDefinition;
	// offerSupplierItems with properties
	$scope.offerSupplierItemsDefinition = offerSupplierItemsDefinition;

	// datepicker logic

	// date properties
	$scope.openedRFPIDeliveryDeadline = false;

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
            templateUrl: 'commonbusinessentities/requestforproposalitem/tmplIdentificationChoose.tpl.html',
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


	// Choose rfpHeading
	$scope.openChooseRfpHeadingDialog = function() {
        $modal.open({
            backdrop: 'static',
            keyboard : false,
            templateUrl: 'stockmanagement/requestforproposalitem/tmplRequestForProposalHeadingChoose.tpl.html',
            size: 'lg',
            controller: 'ctrlRequestForProposalHeadingChoose',
            windowClass: 'hmodal-info',
            resolve: {
				itemEdit: function() {
					if(angular.isDefined($scope.itemEdit.rfpHeading)){
						return $scope.itemEdit.rfpHeading;
					}
				}
			}
		}).result.then(function(result) {
			$scope.itemEdit.rfpHeading = angular.copy(result);
		});
    };


	// Save Button
	$scope.save = function() {
		correctDateTime($scope.itemEdit.RFPIDeliveryDeadline);
	   //	delete $scope.itemEdit.isSelected;
        var item;
        var i;
        for(i in $scope.itemEdit.offerSupplierItems) {
    		item = $scope.itemEdit.offerSupplierItems[i];
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
		return                 item.RFPIOrdinalNumber  &&                 item.RFPIMeasurementUnit  &&                 item.RFPIRequestedQuantity  &&                 item.RFPIProcurementSourceStatus  ;
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


.controller('ctrlRequestForProposalItemChoose', ['$scope','ServiceRequestForProposalItem', 'dialogs', '$modal', '$modalInstance', 'itemEdit',
function($scope, ServiceRequestForProposalItem, dialogs, $modal,  $modalInstance, itemEdit) {

    // entity with properties
    $scope.itemDefinition = {
        label: 'stockmanagement.requestForProposalItem',
        properties: [
            { label: 'rFPIOrdinalNumber', name:'RFPIOrdinalNumber', inTable:  true  },
            { label: 'rFPIMeasurementUnit', name:'RFPIMeasurementUnit', inTable:  true  },
            { label: 'rFPIRequestedQuantity', name:'RFPIRequestedQuantity', inTable:  true  },
            { label: 'rFPIDrawingNumber', name:'RFPIDrawingNumber', inTable:  false  },
            { label: 'rFPIProductCode', name:'RFPIProductCode', inTable:  false  },
            { label: 'rFPIProcurementSourceStatus', name:'RFPIProcurementSourceStatus', inTable:  true  },
            { label: 'rFPIRemark', name:'RFPIRemark', inTable:  false  },
            { label: 'rFPIDeliveryDeadline', name:'RFPIDeliveryDeadline', inTable:  false  },
        ]
    };

	$scope.items = [];
	$scope.itemEdit = {};

	// fill table with data
	$scope.loaded = false;
	var getRequestForProposalItems = function() {
		if(!$scope.loaded && $scope.items.length === 0) {
			$scope.isLoading = true;
			ServiceRequestForProposalItem.query(function(data) {
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
	getRequestForProposalItems();

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