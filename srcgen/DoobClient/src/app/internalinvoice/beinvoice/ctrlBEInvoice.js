'use strict';

angular.module('Doob.internalinvoice')


.controller('ctrlBEInvoice',['$scope', '$rootScope', '$modal', 'dialogs', 'CheckSelected', 'ServiceBEInvoice',
    function($scope, $rootScope, $modal, dialogs, CheckSelected, ServiceBEInvoice) {

	// main entity (bEInvoice) properties names and labels
	$scope.itemDefinition = {
		label: 'internalinvoice.bEInvoice',
		properties: [
			{ label: 'bEIHInvoiceNumber', name:'BEIHInvoiceNumber', inTable:  true  },
			{ label: 'bEIHCreationDateDate', name:'BEIHCreationDateDate', inTable:  true  },
			{ label: 'bEIHTotal', name:'BEIHTotal', inTable:  false  },
		]
	};

	// currency with properties names and labels
	$scope.currencyDefinition = {
		label: 'capacitymanagement.currency',
		properties : [
			{ label: 'cCurrencyDesignation', name:'CCurrencyDesignation' },
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
	// paymentCondition with properties names and labels
	$scope.paymentConditionDefinition = {
		label: 'initialization.paymentCondition',
		properties : [
			{ label: 'pCCode', name:'PCCode' },
			{ label: 'pCDescription', name:'PCDescription' },
		]
	};
	// beInvoiceItems with properties names and labels
	$scope.beInvoiceItemsDefinition = {
		label: 'internalinvoice.bEInvoiceItem',
		properties : [
			{ label: 'bEIIOrdinalNumber', name:'BEIIOrdinalNumber' },
			{ label: 'bEIIQuantity', name:'BEIIQuantity' },
		]
	};
	// beInvoiceTaxes with properties names and labels
	$scope.beInvoiceTaxesDefinition = {
		label: 'internalinvoice.bETaxInvoice',
		properties : [
			{ label: 'bETIOrdinalNumber', name:'BETIOrdinalNumber' },
			{ label: 'bETIPercentage', name:'BETIPercentage' },
			{ label: 'bETIAmmount', name:'BETIAmmount' },
		]
	};

	// fill table with data
	$scope.items = [];
	$scope.loaded = false;
	var getBEInvoices = function() {
		if(!$scope.loaded && $scope.items.length === 0) {
			$scope.isLoading = true;
			ServiceBEInvoice.query(function(data) {
				$scope.items = data;
				$scope.isLoading = false;
				$scope.loaded = true;
			});
		}
	};
	getBEInvoices();

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

	$scope.$watch('BEInvoiceCollection', function() {
		$scope.itemEdit = CheckSelected.checkSelectedInTable($scope.itemEdit, $scope.BEInvoiceCollection, $scope.items);
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
			templateUrl: 'internalinvoice/beinvoice/tmplBEInvoiceEdit.tpl.html',
			size: 'lg',
			windowClass: 'hmodal-info',
			controller: 'ctrlBEInvoiceEdit',
			resolve: {
				itemEdit: function() {
					if(isNew) {
						return new ServiceBEInvoice();
					} else {
						return $scope.itemEdit;
					}
				},
				currencyDefinition: function() {
					return $scope.currencyDefinition;
				},
				documentTypeDefinition: function() {
					return $scope.documentTypeDefinition;
				},
				paymentConditionDefinition: function() {
					return $scope.paymentConditionDefinition;
				},
				beInvoiceItemsDefinition: function() {
					return $scope.beInvoiceItemsDefinition;
				},
				beInvoiceTaxesDefinition: function() {
					return $scope.beInvoiceTaxesDefinition;
				},
			}
		})
		.result.then(function(result) {
			if(!angular.isDefined(result.id)) {
				ServiceBEInvoice.saveCustom('stockmanagement/beinvoices', result, function(savedObject) {
					$scope.items.unshift(savedObject);
					if($scope.itemEdit !== null) {
						var index = $scope.items.map(function(it) { return it.id; }).indexOf($scope.itemEdit.id);
						$scope.items[index].isSelected = false;
					}
					$scope.itemEdit = angular.extend(savedObject);
					$scope.items[0].isSelected = true;
				});
			 } else {
				 ServiceBEInvoice.updateCustom('stockmanagement/beinvoices/'+result.id, result, function(savedObject) {
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


.controller('ctrlBEInvoiceEdit',['$scope', 'Localization', '$modal', '$modalInstance', 'dialogs',
	'ServiceBEInvoice', 'ServiceCurrency', 'ServiceDocumentType', 'ServicePaymentCondition', 'ServiceBEInvoiceItem', 'ServiceBETaxInvoice',   'currencyDefinition',  'documentTypeDefinition',  'paymentConditionDefinition',  'beInvoiceItemsDefinition',  'beInvoiceTaxesDefinition',   'itemEdit',
function($scope, Localization, $modal, $modalInstance, dialogs,
	ServiceBEInvoice, ServiceCurrency, ServiceDocumentType, ServicePaymentCondition, ServiceBEInvoiceItem, ServiceBETaxInvoice,  currencyDefinition,  documentTypeDefinition,  paymentConditionDefinition,  beInvoiceItemsDefinition,  beInvoiceTaxesDefinition,  itemEdit) {

	// dialog mode
	$scope.mode = 'edit';

	// original item state
	var original = angular.copy(itemEdit);
	// item state
	$scope.itemEdit = angular.copy(original);

	// currency with properties
	$scope.currencyDefinition = currencyDefinition;
	// documentType with properties
	$scope.documentTypeDefinition = documentTypeDefinition;
	// paymentCondition with properties
	$scope.paymentConditionDefinition = paymentConditionDefinition;
	// beInvoiceItems with properties
	$scope.beInvoiceItemsDefinition = beInvoiceItemsDefinition;
	// beInvoiceTaxes with properties
	$scope.beInvoiceTaxesDefinition = beInvoiceTaxesDefinition;

	// datepicker logic

	// date properties
	$scope.openedBEIHCreationDateDate = false;

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
            templateUrl: 'capacitymanagement/beinvoice/tmplCurrencyChoose.tpl.html',
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


	// Choose documentType
	$scope.openChooseDocumentTypeDialog = function() {
        $modal.open({
            backdrop: 'static',
            keyboard : false,
            templateUrl: 'corporation/beinvoice/tmplDocumentTypeChoose.tpl.html',
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


	// Choose paymentCondition
	$scope.openChoosePaymentConditionDialog = function() {
        $modal.open({
            backdrop: 'static',
            keyboard : false,
            templateUrl: 'initialization/beinvoice/tmplPaymentConditionChoose.tpl.html',
            size: 'lg',
            controller: 'ctrlPaymentConditionChoose',
            windowClass: 'hmodal-info',
            resolve: {
				itemEdit: function() {
					if(angular.isDefined($scope.itemEdit.paymentCondition)){
						return $scope.itemEdit.paymentCondition;
					}
				}
			}
		}).result.then(function(result) {
			$scope.itemEdit.paymentCondition = angular.copy(result);
		});
    };


    $scope.bEInvoiceItemEdit = null;

    // beInvoiceItems table selection logic
    $scope.bEInvoiceItemSelection = function(item, index) {
        if(item.isSelected) {
            if($scope.bEInvoiceItemEdit !== null) {
                var index1 = $scope.itemEdit.beInvoiceItems.map(function(it) { return it.id; }).indexOf($scope.bEInvoiceItemEdit.id);
                $scope.itemEdit.beInvoiceItems[index1].isSelected = false;
            }
            $scope.bEInvoiceItemEdit = item;
        } else {
            $scope.bEInvoiceItemEdit = null;
            item.isSelected = false;
        }
    };

    // New/Edit beInvoiceItems dialog
    $scope.openBEInvoiceItemEditDialog = function(isNew) {
        $modal.open({
            backdrop: 'static',
            keyboard : false,
            templateUrl: 'internalinvoice/beinvoice/tmplBEInvoiceItemEdit.tpl.html',
            size: 'lg',
            controller: 'ctrlBEInvoiceItemEdit',
            windowClass: 'hmodal-info',
            resolve: {
                itemEdit: function() {
                    if(isNew) {
                        return new ServiceBEInvoiceItem();
                    } else {
                        return $scope.bEInvoiceItemEdit;
                    }
                }
            }
        }).result.then(function(result) {
            var i;
            if(isNew) {
                if(!angular.isDefined($scope.itemEdit.beInvoiceItems)) {
                    $scope.itemEdit.beInvoiceItems = [];
                }
                $scope.itemEdit.beInvoiceItems.unshift(result);
                for(i in $scope.itemEdit.beInvoiceItems) {
                    $scope.itemEdit.beInvoiceItems[i].isSelected = false;
                }
                $scope.bEInvoiceItemEdit = angular.extend(result);
                $scope.itemEdit.beInvoiceItems[0].isSelected = true;
            }
            else {
                for(i in $scope.itemEdit.beInvoiceItems) {
                    $scope.itemEdit.beInvoiceItems[i].isSelected = false;
                }
                $scope.bEInvoiceItemEdit = angular.extend(result);
                var index = $scope.itemEdit.beInvoiceItems.map(function(it) { return it.id; }).indexOf(result.id);
                for(var key in result) {
                    $scope.itemEdit.beInvoiceItems[index][key] = result[key];
                }
                $scope.itemEdit.beInvoiceItems[index].isSelected = true;
            }
        });
    };

    $scope.removeBEInvoiceItem = function(item) {
        var dialog = dialogs.confirm('Please confirm', 'Are you sure you want to delete item?');
        dialog.result.then(function(btn) {
            var removeIndex = $scope.itemEdit.beInvoiceItems.map(function(it) { return it.id; }).indexOf(item.id);
            $scope.itemEdit.beInvoiceItems[removeIndex].deleted = true;
        });
    };


    $scope.bETaxInvoiceEdit = null;

    // beInvoiceTaxes table selection logic
    $scope.bETaxInvoiceSelection = function(item, index) {
        if(item.isSelected) {
            if($scope.bETaxInvoiceEdit !== null) {
                var index1 = $scope.itemEdit.beInvoiceTaxes.map(function(it) { return it.id; }).indexOf($scope.bETaxInvoiceEdit.id);
                $scope.itemEdit.beInvoiceTaxes[index1].isSelected = false;
            }
            $scope.bETaxInvoiceEdit = item;
        } else {
            $scope.bETaxInvoiceEdit = null;
            item.isSelected = false;
        }
    };

    // New/Edit beInvoiceTaxes dialog
    $scope.openBETaxInvoiceEditDialog = function(isNew) {
        $modal.open({
            backdrop: 'static',
            keyboard : false,
            templateUrl: 'internalinvoice/beinvoice/tmplBETaxInvoiceEdit.tpl.html',
            size: 'lg',
            controller: 'ctrlBETaxInvoiceEdit',
            windowClass: 'hmodal-info',
            resolve: {
                itemEdit: function() {
                    if(isNew) {
                        return new ServiceBETaxInvoice();
                    } else {
                        return $scope.bETaxInvoiceEdit;
                    }
                }
            }
        }).result.then(function(result) {
            var i;
            if(isNew) {
                if(!angular.isDefined($scope.itemEdit.beInvoiceTaxes)) {
                    $scope.itemEdit.beInvoiceTaxes = [];
                }
                $scope.itemEdit.beInvoiceTaxes.unshift(result);
                for(i in $scope.itemEdit.beInvoiceTaxes) {
                    $scope.itemEdit.beInvoiceTaxes[i].isSelected = false;
                }
                $scope.bETaxInvoiceEdit = angular.extend(result);
                $scope.itemEdit.beInvoiceTaxes[0].isSelected = true;
            }
            else {
                for(i in $scope.itemEdit.beInvoiceTaxes) {
                    $scope.itemEdit.beInvoiceTaxes[i].isSelected = false;
                }
                $scope.bETaxInvoiceEdit = angular.extend(result);
                var index = $scope.itemEdit.beInvoiceTaxes.map(function(it) { return it.id; }).indexOf(result.id);
                for(var key in result) {
                    $scope.itemEdit.beInvoiceTaxes[index][key] = result[key];
                }
                $scope.itemEdit.beInvoiceTaxes[index].isSelected = true;
            }
        });
    };

    $scope.removeBETaxInvoice = function(item) {
        var dialog = dialogs.confirm('Please confirm', 'Are you sure you want to delete item?');
        dialog.result.then(function(btn) {
            var removeIndex = $scope.itemEdit.beInvoiceTaxes.map(function(it) { return it.id; }).indexOf(item.id);
            $scope.itemEdit.beInvoiceTaxes[removeIndex].deleted = true;
        });
    };


	// Save Button
	$scope.save = function() {
		correctDateTime($scope.itemEdit.BEIHCreationDateDate);
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
		return                 item.BEIHInvoiceNumber  &&                 item.BEIHCreationDateDate  ;
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


.controller('ctrlBEInvoiceChoose', ['$scope','ServiceBEInvoice', 'dialogs', '$modal', '$modalInstance', 'itemEdit',
function($scope, ServiceBEInvoice, dialogs, $modal,  $modalInstance, itemEdit) {

    // entity with properties
    $scope.itemDefinition = {
        label: 'internalinvoice.bEInvoice',
        properties: [
            { label: 'bEIHInvoiceNumber', name:'BEIHInvoiceNumber', inTable:  true  },
            { label: 'bEIHCreationDateDate', name:'BEIHCreationDateDate', inTable:  true  },
            { label: 'bEIHTotal', name:'BEIHTotal', inTable:  false  },
        ]
    };

	$scope.items = [];
	$scope.itemEdit = {};

	// fill table with data
	$scope.loaded = false;
	var getBEInvoices = function() {
		if(!$scope.loaded && $scope.items.length === 0) {
			$scope.isLoading = true;
			ServiceBEInvoice.query(function(data) {
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
	getBEInvoices();

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