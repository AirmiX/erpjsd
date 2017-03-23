'use strict';

angular.module('Doob.productionrequest')


.controller('ctrlRequestForProduction',['$scope', '$rootScope', '$modal', 'dialogs', 'CheckSelected', 'ServiceRequestForProduction',
    function($scope, $rootScope, $modal, dialogs, CheckSelected, ServiceRequestForProduction) {

	// main entity (requestForProduction) properties names and labels
	$scope.itemDefinition = {
		label: 'productionrequest.requestForProduction',
		properties: [
			{ label: 'rFPDocumentNumber', name:'RFPDocumentNumber', inTable:  true  },
			{ label: 'rFPCreationDate', name:'RFPCreationDate', inTable:  true  },
			{ label: 'rFPRemark', name:'RFPRemark', inTable:  false  },
			{ label: 'rFPPrintStatus', name:'RFPPrintStatus', inTable:  false  },
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
	// orderHeading with properties names and labels
	$scope.orderHeadingDefinition = {
		label: 'order.orderHeading',
		properties : [
			{ label: 'oHDocumentNumber', name:'OHDocumentNumber' },
			{ label: 'oHCreationDate', name:'OHCreationDate' },
			{ label: 'oHOrderNumberOfBuyer', name:'OHOrderNumberOfBuyer' },
			{ label: 'oHOrderDate', name:'OHOrderDate' },
			{ label: 'oHPaymentPeriodBuyer', name:'OHPaymentPeriodBuyer' },
		]
	};
	// documentType with properties names and labels
	$scope.documentTypeDefinition = {
		label: 'corporation.documentType',
		properties : [
			{ label: 'dTIdentificationNumber', name:'DTIdentificationNumber' },
			{ label: 'dTName', name:'DTName' },
			{ label: 'dTShortName', name:'DTShortName' },
		]
	};
	// currency with properties names and labels
	$scope.currencyDefinition = {
		label: 'capacitymanagement.currency',
		properties : [
			{ label: 'cCurrencyDesignation', name:'CCurrencyDesignation' },
		]
	};
	// taskType with properties names and labels
	$scope.taskTypeDefinition = {
		label: 'initialization.taskType',
		properties : [
			{ label: 'tTCode', name:'TTCode' },
			{ label: 'tTName', name:'TTName' },
		]
	};
	// requestForProductionItem with properties names and labels
	$scope.requestForProductionItemDefinition = {
		label: 'productionrequest.requestForProductionItem',
		properties : [
			{ label: 'rFPIItemNumber', name:'RFPIItemNumber' },
			{ label: 'rFPIQuantity', name:'RFPIQuantity' },
			{ label: 'rFPICreationDeadline', name:'RFPICreationDeadline' },
			{ label: 'rFPISellingPrice', name:'RFPISellingPrice' },
		]
	};

	// fill table with data
	$scope.items = [];
	$scope.loaded = false;
	var getRequestForProductions = function() {
		if(!$scope.loaded && $scope.items.length === 0) {
			$scope.isLoading = true;
			ServiceRequestForProduction.query(function(data) {
				$scope.items = data;
				$scope.isLoading = false;
				$scope.loaded = true;
			});
		}
	};
	getRequestForProductions();

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

	$scope.$watch('RequestForProductionCollection', function() {
		$scope.itemEdit = CheckSelected.checkSelectedInTable($scope.itemEdit, $scope.RequestForProductionCollection, $scope.items);
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
			templateUrl: 'productionrequest/requestforproduction/tmplRequestForProductionEdit.tpl.html',
			size: 'lg',
			windowClass: 'hmodal-info',
			controller: 'ctrlRequestForProductionEdit',
			resolve: {
				itemEdit: function() {
					if(isNew) {
						return new ServiceRequestForProduction();
					} else {
						return $scope.itemEdit;
					}
				},
				organizationUnitDefinition: function() {
					return $scope.organizationUnitDefinition;
				},
				orderHeadingDefinition: function() {
					return $scope.orderHeadingDefinition;
				},
				documentTypeDefinition: function() {
					return $scope.documentTypeDefinition;
				},
				currencyDefinition: function() {
					return $scope.currencyDefinition;
				},
				taskTypeDefinition: function() {
					return $scope.taskTypeDefinition;
				},
				requestForProductionItemDefinition: function() {
					return $scope.requestForProductionItemDefinition;
				},
			}
		})
		.result.then(function(result) {
			if(!angular.isDefined(result.id)) {
				ServiceRequestForProduction.saveCustom('stockmanagement/requestforproductions', result, function(savedObject) {
					$scope.items.unshift(savedObject);
					if($scope.itemEdit !== null) {
						var index = $scope.items.map(function(it) { return it.id; }).indexOf($scope.itemEdit.id);
						$scope.items[index].isSelected = false;
					}
					$scope.itemEdit = angular.extend(savedObject);
					$scope.items[0].isSelected = true;
				});
			 } else {
				 ServiceRequestForProduction.updateCustom('stockmanagement/requestforproductions/'+result.id, result, function(savedObject) {
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


.controller('ctrlRequestForProductionEdit',['$scope', 'Localization', '$modal', '$modalInstance', 'dialogs',
	'ServiceRequestForProduction', 'ServiceOrganizationUnit', 'ServiceOrderHeading', 'ServiceDocumentType', 'ServiceCurrency', 'ServiceTaskType', 'ServiceRequestForProductionItem',   'organizationUnitDefinition',  'orderHeadingDefinition',  'documentTypeDefinition',  'currencyDefinition',  'taskTypeDefinition',  'requestForProductionItemDefinition',   'itemEdit',
function($scope, Localization, $modal, $modalInstance, dialogs,
	ServiceRequestForProduction, ServiceOrganizationUnit, ServiceOrderHeading, ServiceDocumentType, ServiceCurrency, ServiceTaskType, ServiceRequestForProductionItem,  organizationUnitDefinition,  orderHeadingDefinition,  documentTypeDefinition,  currencyDefinition,  taskTypeDefinition,  requestForProductionItemDefinition,  itemEdit) {

	// dialog mode
	$scope.mode = 'edit';

	// original item state
	var original = angular.copy(itemEdit);
	// item state
	$scope.itemEdit = angular.copy(original);

	// organizationUnit with properties
	$scope.organizationUnitDefinition = organizationUnitDefinition;
	// orderHeading with properties
	$scope.orderHeadingDefinition = orderHeadingDefinition;
	// documentType with properties
	$scope.documentTypeDefinition = documentTypeDefinition;
	// currency with properties
	$scope.currencyDefinition = currencyDefinition;
	// taskType with properties
	$scope.taskTypeDefinition = taskTypeDefinition;
	// requestForProductionItem with properties
	$scope.requestForProductionItemDefinition = requestForProductionItemDefinition;

	// datepicker logic

	// date properties
	$scope.openedRFPCreationDate = false;

	$scope.open = function($event, opened) {
		$event.preventDefault();
		$event.stopPropagation();
		$scope[opened] = true;
	};



	// Choose organizationUnit
	$scope.openChooseOrganizationUnitDialog = function() {
        $modal.open({
            backdrop: 'static',
            keyboard : false,
            templateUrl: 'corporation/requestforproduction/tmplOrganizationUnitChoose.tpl.html',
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


	// Choose orderHeading
	$scope.openChooseOrderHeadingDialog = function() {
        $modal.open({
            backdrop: 'static',
            keyboard : false,
            templateUrl: 'order/requestforproduction/tmplOrderHeadingChoose.tpl.html',
            size: 'lg',
            controller: 'ctrlOrderHeadingChoose',
            windowClass: 'hmodal-info',
            resolve: {
				itemEdit: function() {
					if(angular.isDefined($scope.itemEdit.orderHeading)){
						return $scope.itemEdit.orderHeading;
					}
				}
			}
		}).result.then(function(result) {
			$scope.itemEdit.orderHeading = angular.copy(result);
		});
    };


	// Choose documentType
	$scope.openChooseDocumentTypeDialog = function() {
        $modal.open({
            backdrop: 'static',
            keyboard : false,
            templateUrl: 'corporation/requestforproduction/tmplDocumentTypeChoose.tpl.html',
            size: 'lg',
            controller: 'ctrlDocumentTypeChoose',
            windowClass: 'hmodal-info',
            resolve: {
				itemEdit: function() {
					if(angular.isDefined($scope.itemEdit.documentType)){
						return $scope.itemEdit.documentType;
					}
				}
			}
		}).result.then(function(result) {
			$scope.itemEdit.documentType = angular.copy(result);
		});
    };


	// Choose currency
	$scope.openChooseCurrencyDialog = function() {
        $modal.open({
            backdrop: 'static',
            keyboard : false,
            templateUrl: 'capacitymanagement/requestforproduction/tmplCurrencyChoose.tpl.html',
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


	// Choose taskType
	$scope.openChooseTaskTypeDialog = function() {
        $modal.open({
            backdrop: 'static',
            keyboard : false,
            templateUrl: 'initialization/requestforproduction/tmplTaskTypeChoose.tpl.html',
            size: 'lg',
            controller: 'ctrlTaskTypeChoose',
            windowClass: 'hmodal-info',
            resolve: {
				itemEdit: function() {
					if(angular.isDefined($scope.itemEdit.taskType)){
						return $scope.itemEdit.taskType;
					}
				}
			}
		}).result.then(function(result) {
			$scope.itemEdit.taskType = angular.copy(result);
		});
    };


    $scope.requestForProductionItemEdit = null;

    // requestForProductionItem table selection logic
    $scope.requestForProductionItemSelection = function(item, index) {
        if(item.isSelected) {
            if($scope.requestForProductionItemEdit !== null) {
                var index1 = $scope.itemEdit.requestForProductionItem.map(function(it) { return it.id; }).indexOf($scope.requestForProductionItemEdit.id);
                $scope.itemEdit.requestForProductionItem[index1].isSelected = false;
            }
            $scope.requestForProductionItemEdit = item;
        } else {
            $scope.requestForProductionItemEdit = null;
            item.isSelected = false;
        }
    };

    // New/Edit requestForProductionItem dialog
    $scope.openRequestForProductionItemEditDialog = function(isNew) {
        $modal.open({
            backdrop: 'static',
            keyboard : false,
            templateUrl: 'productionrequest/requestforproduction/tmplRequestForProductionItemEdit.tpl.html',
            size: 'lg',
            controller: 'ctrlRequestForProductionItemEdit',
            windowClass: 'hmodal-info',
            resolve: {
                itemEdit: function() {
                    if(isNew) {
                        return new ServiceRequestForProductionItem();
                    } else {
                        return $scope.requestForProductionItemEdit;
                    }
                }
            }
        }).result.then(function(result) {
            var i;
            if(isNew) {
                if(!angular.isDefined($scope.itemEdit.requestForProductionItem)) {
                    $scope.itemEdit.requestForProductionItem = [];
                }
                $scope.itemEdit.requestForProductionItem.unshift(result);
                for(i in $scope.itemEdit.requestForProductionItem) {
                    $scope.itemEdit.requestForProductionItem[i].isSelected = false;
                }
                $scope.requestForProductionItemEdit = angular.extend(result);
                $scope.itemEdit.requestForProductionItem[0].isSelected = true;
            }
            else {
                for(i in $scope.itemEdit.requestForProductionItem) {
                    $scope.itemEdit.requestForProductionItem[i].isSelected = false;
                }
                $scope.requestForProductionItemEdit = angular.extend(result);
                var index = $scope.itemEdit.requestForProductionItem.map(function(it) { return it.id; }).indexOf(result.id);
                for(var key in result) {
                    $scope.itemEdit.requestForProductionItem[index][key] = result[key];
                }
                $scope.itemEdit.requestForProductionItem[index].isSelected = true;
            }
        });
    };

    $scope.removeRequestForProductionItem = function(item) {
        var dialog = dialogs.confirm('Please confirm', 'Are you sure you want to delete item?');
        dialog.result.then(function(btn) {
            var removeIndex = $scope.itemEdit.requestForProductionItem.map(function(it) { return it.id; }).indexOf(item.id);
            $scope.itemEdit.requestForProductionItem[removeIndex].deleted = true;
        });
    };


	// Save Button
	$scope.save = function() {
		correctDateTime($scope.itemEdit.RFPCreationDate);
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
		return                 item.RFPDocumentNumber  &&                 item.RFPCreationDate  ;
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


.controller('ctrlRequestForProductionChoose', ['$scope','ServiceRequestForProduction', 'dialogs', '$modal', '$modalInstance', 'itemEdit',
function($scope, ServiceRequestForProduction, dialogs, $modal,  $modalInstance, itemEdit) {

    // entity with properties
    $scope.itemDefinition = {
        label: 'productionrequest.requestForProduction',
        properties: [
            { label: 'rFPDocumentNumber', name:'RFPDocumentNumber', inTable:  true  },
            { label: 'rFPCreationDate', name:'RFPCreationDate', inTable:  true  },
            { label: 'rFPRemark', name:'RFPRemark', inTable:  false  },
            { label: 'rFPPrintStatus', name:'RFPPrintStatus', inTable:  false  },
        ]
    };

	$scope.items = [];
	$scope.itemEdit = {};

	// fill table with data
	$scope.loaded = false;
	var getRequestForProductions = function() {
		if(!$scope.loaded && $scope.items.length === 0) {
			$scope.isLoading = true;
			ServiceRequestForProduction.query(function(data) {
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
	getRequestForProductions();

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