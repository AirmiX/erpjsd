'use strict';

angular.module('Doob.productionrequest')


.controller('ctrlRequestForProductionItem',['$scope', '$rootScope', '$modal', 'dialogs', 'CheckSelected', 'ServiceRequestForProductionItem',
    function($scope, $rootScope, $modal, dialogs, CheckSelected, ServiceRequestForProductionItem) {

	// main entity (requestForProductionItem) properties names and labels
	$scope.itemDefinition = {
		label: 'productionrequest.requestForProductionItem',
		properties: [
			{ label: 'rFPIItemNumber', name:'RFPIItemNumber', inTable:  true  },
			{ label: 'rFPIQuantity', name:'RFPIQuantity', inTable:  true  },
			{ label: 'rFPICreationDeadline', name:'RFPICreationDeadline', inTable:  true  },
			{ label: 'rFPISellingPrice', name:'RFPISellingPrice', inTable:  true  },
			{ label: 'rFPIDeleteStatus', name:'RFPIDeleteStatus', inTable:  false  },
		]
	};

	// currency with properties names and labels
	$scope.currencyDefinition = {
		label: 'capacitymanagement.currency',
		properties : [
			{ label: 'cCurrencyDesignation', name:'CCurrencyDesignation' },
		]
	};
	// requestForProduction with properties names and labels
	$scope.requestForProductionDefinition = {
		label: 'productionrequest.requestForProduction',
		properties : [
			{ label: 'rFPDocumentNumber', name:'RFPDocumentNumber' },
			{ label: 'rFPCreationDate', name:'RFPCreationDate' },
		]
	};
	// identification with properties names and labels
	$scope.identificationDefinition = {
		label: 'commonbusinessentities.identification',
		properties : [
			{ label: 'iIdentificationCode', name:'IIdentificationCode' },
		]
	};
	// orderItem with properties names and labels
	$scope.orderItemDefinition = {
		label: 'order.orderItem',
		properties : [
			{ label: 'oIOrdinalNumber', name:'OIOrdinalNumber' },
			{ label: 'oIOrderedQuantity', name:'OIOrderedQuantity' },
			{ label: 'oIReservedQuantity', name:'OIReservedQuantity' },
			{ label: 'oIProductionQuantity', name:'OIProductionQuantity' },
			{ label: 'oINextPeriodQuantity', name:'OINextPeriodQuantity' },
			{ label: 'oIValue', name:'OIValue' },
			{ label: 'oILeftQuantity', name:'OILeftQuantity' },
			{ label: 'oIDeliveryPeriod', name:'OIDeliveryPeriod' },
			{ label: 'oITechnologyStatus', name:'OITechnologyStatus' },
		]
	};
	// mesurementUnit with properties names and labels
	$scope.mesurementUnitDefinition = {
		label: 'commonbusinessentities.measurementUnit',
		properties : [
			{ label: 'mUIdentificationCode', name:'MUIdentificationCode' },
			{ label: 'mUName', name:'MUName' },
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

	// fill table with data
	$scope.items = [];
	$scope.loaded = false;
	var getRequestForProductionItems = function() {
		if(!$scope.loaded && $scope.items.length === 0) {
			$scope.isLoading = true;
			ServiceRequestForProductionItem.query(function(data) {
				$scope.items = data;
				$scope.isLoading = false;
				$scope.loaded = true;
			});
		}
	};
	getRequestForProductionItems();

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

	$scope.$watch('RequestForProductionItemCollection', function() {
		$scope.itemEdit = CheckSelected.checkSelectedInTable($scope.itemEdit, $scope.RequestForProductionItemCollection, $scope.items);
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
			templateUrl: 'productionrequest/requestforproductionitem/tmplRequestForProductionItemEdit.tpl.html',
			size: 'lg',
			windowClass: 'hmodal-info',
			controller: 'ctrlRequestForProductionItemEdit',
			resolve: {
				itemEdit: function() {
					if(isNew) {
						return new ServiceRequestForProductionItem();
					} else {
						return $scope.itemEdit;
					}
				},
				currencyDefinition: function() {
					return $scope.currencyDefinition;
				},
				requestForProductionDefinition: function() {
					return $scope.requestForProductionDefinition;
				},
				identificationDefinition: function() {
					return $scope.identificationDefinition;
				},
				orderItemDefinition: function() {
					return $scope.orderItemDefinition;
				},
				mesurementUnitDefinition: function() {
					return $scope.mesurementUnitDefinition;
				},
				stockroomDefinition: function() {
					return $scope.stockroomDefinition;
				},
			}
		})
		.result.then(function(result) {
			if(!angular.isDefined(result.id)) {
				ServiceRequestForProductionItem.saveCustom('stockmanagement/requestforproductionitems', result, function(savedObject) {
					$scope.items.unshift(savedObject);
					if($scope.itemEdit !== null) {
						var index = $scope.items.map(function(it) { return it.id; }).indexOf($scope.itemEdit.id);
						$scope.items[index].isSelected = false;
					}
					$scope.itemEdit = angular.extend(savedObject);
					$scope.items[0].isSelected = true;
				});
			 } else {
				 ServiceRequestForProductionItem.updateCustom('stockmanagement/requestforproductionitems/'+result.id, result, function(savedObject) {
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


.controller('ctrlRequestForProductionItemEdit',['$scope', 'Localization', '$modal', '$modalInstance', 'dialogs',
	'ServiceRequestForProductionItem', 'ServiceCurrency', 'ServiceRequestForProduction', 'ServiceIdentification', 'ServiceOrderItem', 'ServiceMeasurementUnit', 'ServiceStockroom',   'currencyDefinition',  'requestForProductionDefinition',  'identificationDefinition',  'orderItemDefinition',  'mesurementUnitDefinition',  'stockroomDefinition',   'itemEdit',
function($scope, Localization, $modal, $modalInstance, dialogs,
	ServiceRequestForProductionItem, ServiceCurrency, ServiceRequestForProduction, ServiceIdentification, ServiceOrderItem, ServiceMeasurementUnit, ServiceStockroom,  currencyDefinition,  requestForProductionDefinition,  identificationDefinition,  orderItemDefinition,  mesurementUnitDefinition,  stockroomDefinition,  itemEdit) {

	// dialog mode
	$scope.mode = 'edit';

	// original item state
	var original = angular.copy(itemEdit);
	// item state
	$scope.itemEdit = angular.copy(original);

	// currency with properties
	$scope.currencyDefinition = currencyDefinition;
	// requestForProduction with properties
	$scope.requestForProductionDefinition = requestForProductionDefinition;
	// identification with properties
	$scope.identificationDefinition = identificationDefinition;
	// orderItem with properties
	$scope.orderItemDefinition = orderItemDefinition;
	// mesurementUnit with properties
	$scope.mesurementUnitDefinition = mesurementUnitDefinition;
	// stockroom with properties
	$scope.stockroomDefinition = stockroomDefinition;

	// datepicker logic

	// date properties
	$scope.openedRFPICreationDeadline = false;

	$scope.open = function($event, opened) {
		$event.preventDefault();
		$event.stopPropagation();
		$scope[opened] = true;
	};



	// Choose currency
	$scope.openChooseCurrencyDialog = function() {
        $modal.open({
            backdrop: 'static',
            keyboard : false,
            templateUrl: 'capacitymanagement/requestforproductionitem/tmplCurrencyChoose.tpl.html',
            size: 'lg',
            controller: 'ctrlCurrencyChoose',
            windowClass: 'hmodal-info',
            resolve: {
				itemEdit: function() {
					if(angular.isDefined($scope.itemEdit.currency)){
						return $scope.itemEdit.currency;
					}
				}
			}
		}).result.then(function(result) {
			$scope.itemEdit.currency = angular.copy(result);
		});
    };


	// Choose requestForProduction
	$scope.openChooseRequestForProductionDialog = function() {
        $modal.open({
            backdrop: 'static',
            keyboard : false,
            templateUrl: 'productionrequest/requestforproductionitem/tmplRequestForProductionChoose.tpl.html',
            size: 'lg',
            controller: 'ctrlRequestForProductionChoose',
            windowClass: 'hmodal-info',
            resolve: {
				itemEdit: function() {
					if(angular.isDefined($scope.itemEdit.requestForProduction)){
						return $scope.itemEdit.requestForProduction;
					}
				}
			}
		}).result.then(function(result) {
			$scope.itemEdit.requestForProduction = angular.copy(result);
		});
    };


	// Choose identification
	$scope.openChooseIdentificationDialog = function() {
        $modal.open({
            backdrop: 'static',
            keyboard : false,
            templateUrl: 'commonbusinessentities/requestforproductionitem/tmplIdentificationChoose.tpl.html',
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


	// Choose orderItem
	$scope.openChooseOrderItemDialog = function() {
        $modal.open({
            backdrop: 'static',
            keyboard : false,
            templateUrl: 'order/requestforproductionitem/tmplOrderItemChoose.tpl.html',
            size: 'lg',
            controller: 'ctrlOrderItemChoose',
            windowClass: 'hmodal-info',
            resolve: {
				itemEdit: function() {
					if(angular.isDefined($scope.itemEdit.orderItem)){
						return $scope.itemEdit.orderItem;
					}
				}
			}
		}).result.then(function(result) {
			$scope.itemEdit.orderItem = angular.copy(result);
		});
    };


	// Choose mesurementUnit
	$scope.openChooseMesurementUnitDialog = function() {
        $modal.open({
            backdrop: 'static',
            keyboard : false,
            templateUrl: 'commonbusinessentities/requestforproductionitem/tmplMeasurementUnitChoose.tpl.html',
            size: 'lg',
            controller: 'ctrlMeasurementUnitChoose',
            windowClass: 'hmodal-info',
            resolve: {
				itemEdit: function() {
					if(angular.isDefined($scope.itemEdit.mesurementUnit)){
						return $scope.itemEdit.mesurementUnit;
					}
				}
			}
		}).result.then(function(result) {
			$scope.itemEdit.mesurementUnit = angular.copy(result);
		});
    };


	// Choose stockroom
	$scope.openChooseStockroomDialog = function() {
        $modal.open({
            backdrop: 'static',
            keyboard : false,
            templateUrl: 'stock/requestforproductionitem/tmplStockroomChoose.tpl.html',
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


	// Save Button
	$scope.save = function() {
		correctDateTime($scope.itemEdit.RFPICreationDeadline);
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
		return                 item.RFPIItemNumber  &&                 item.RFPIQuantity  &&                 item.RFPICreationDeadline  &&                 item.RFPISellingPrice  ;
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


.controller('ctrlRequestForProductionItemChoose', ['$scope','ServiceRequestForProductionItem', 'dialogs', '$modal', '$modalInstance', 'itemEdit',
function($scope, ServiceRequestForProductionItem, dialogs, $modal,  $modalInstance, itemEdit) {

    // entity with properties
    $scope.itemDefinition = {
        label: 'productionrequest.requestForProductionItem',
        properties: [
            { label: 'rFPIItemNumber', name:'RFPIItemNumber', inTable:  true  },
            { label: 'rFPIQuantity', name:'RFPIQuantity', inTable:  true  },
            { label: 'rFPICreationDeadline', name:'RFPICreationDeadline', inTable:  true  },
            { label: 'rFPISellingPrice', name:'RFPISellingPrice', inTable:  true  },
            { label: 'rFPIDeleteStatus', name:'RFPIDeleteStatus', inTable:  false  },
        ]
    };

	$scope.items = [];
	$scope.itemEdit = {};

	// fill table with data
	$scope.loaded = false;
	var getRequestForProductionItems = function() {
		if(!$scope.loaded && $scope.items.length === 0) {
			$scope.isLoading = true;
			ServiceRequestForProductionItem.query(function(data) {
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
	getRequestForProductionItems();

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