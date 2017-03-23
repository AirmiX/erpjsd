'use strict';

angular.module('Doob.internalorder')


.controller('ctrlBEOrderHeading',['$scope', '$rootScope', '$modal', 'dialogs', 'CheckSelected', 'ServiceBEOrderHeading',
    function($scope, $rootScope, $modal, dialogs, CheckSelected, ServiceBEOrderHeading) {

	// main entity (bEOrderHeading) properties names and labels
	$scope.itemDefinition = {
		label: 'internalorder.bEOrderHeading',
		properties: [
			{ label: 'bEOHDocumentNumber', name:'BEOHDocumentNumber', inTable:  true  },
			{ label: 'bEOHCreationDate', name:'BEOHCreationDate', inTable:  true  },
			{ label: 'bEOHOrderDate', name:'BEOHOrderDate', inTable:  true  },
			{ label: 'bEOHCompletionStatus', name:'BEOHCompletionStatus', inTable:  false  },
		]
	};

	// deliveryMethod with properties names and labels
	$scope.deliveryMethodDefinition = {
		label: 'order.deliveryMethod',
		properties : [
			{ label: 'dMCode', name:'DMCode' },
			{ label: 'dMName', name:'DMName' },
		]
	};
	// paymentMethod with properties names and labels
	$scope.paymentMethodDefinition = {
		label: 'initialization.paymentMethod',
		properties : [
			{ label: 'pMCode', name:'PMCode' },
			{ label: 'pMName', name:'PMName' },
			{ label: 'pMEnabled', name:'PMEnabled' },
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
	// beCustomer with properties names and labels
	$scope.beCustomerDefinition = {
		label: 'corporation.businessEntity',
		properties : [
			{ label: 'bEIdentificationCode', name:'BEIdentificationCode' },
			{ label: 'bEName', name:'BEName' },
			{ label: 'bEShortName', name:'BEShortName' },
			{ label: 'bETelephone', name:'BETelephone' },
			{ label: 'bEFax', name:'BEFax' },
			{ label: 'bECompanyNumber', name:'BECompanyNumber' },
			{ label: 'bERegistrationNumber', name:'BERegistrationNumber' },
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
	// beSeller with properties names and labels
	$scope.beSellerDefinition = {
		label: 'corporation.businessEntity',
		properties : [
			{ label: 'bEIdentificationCode', name:'BEIdentificationCode' },
			{ label: 'bEName', name:'BEName' },
			{ label: 'bEShortName', name:'BEShortName' },
			{ label: 'bETelephone', name:'BETelephone' },
			{ label: 'bEFax', name:'BEFax' },
			{ label: 'bECompanyNumber', name:'BECompanyNumber' },
			{ label: 'bERegistrationNumber', name:'BERegistrationNumber' },
		]
	};
	// beOrderItems with properties names and labels
	$scope.beOrderItemsDefinition = {
		label: 'internalorder.bEOrderItem',
		properties : [
			{ label: 'bEOIOrdinalNumber', name:'BEOIOrdinalNumber' },
			{ label: 'bEOIOrderedQuantity', name:'BEOIOrderedQuantity' },
		]
	};

	// fill table with data
	$scope.items = [];
	$scope.loaded = false;
	var getBEOrderHeadings = function() {
		if(!$scope.loaded && $scope.items.length === 0) {
			$scope.isLoading = true;
			ServiceBEOrderHeading.query(function(data) {
				$scope.items = data;
				$scope.isLoading = false;
				$scope.loaded = true;
			});
		}
	};
	getBEOrderHeadings();

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

	$scope.$watch('BEOrderHeadingCollection', function() {
		$scope.itemEdit = CheckSelected.checkSelectedInTable($scope.itemEdit, $scope.BEOrderHeadingCollection, $scope.items);
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
			templateUrl: 'internalorder/beorderheading/tmplBEOrderHeadingEdit.tpl.html',
			size: 'lg',
			windowClass: 'hmodal-info',
			controller: 'ctrlBEOrderHeadingEdit',
			resolve: {
				itemEdit: function() {
					if(isNew) {
						return new ServiceBEOrderHeading();
					} else {
						return $scope.itemEdit;
					}
				},
				deliveryMethodDefinition: function() {
					return $scope.deliveryMethodDefinition;
				},
				paymentMethodDefinition: function() {
					return $scope.paymentMethodDefinition;
				},
				paymentConditionDefinition: function() {
					return $scope.paymentConditionDefinition;
				},
				beCustomerDefinition: function() {
					return $scope.beCustomerDefinition;
				},
				currencyDefinition: function() {
					return $scope.currencyDefinition;
				},
				documentTypeDefinition: function() {
					return $scope.documentTypeDefinition;
				},
				beSellerDefinition: function() {
					return $scope.beSellerDefinition;
				},
				beOrderItemsDefinition: function() {
					return $scope.beOrderItemsDefinition;
				},
			}
		})
		.result.then(function(result) {
			if(!angular.isDefined(result.id)) {
				ServiceBEOrderHeading.saveCustom('stockmanagement/beorderheadings', result, function(savedObject) {
					$scope.items.unshift(savedObject);
					if($scope.itemEdit !== null) {
						var index = $scope.items.map(function(it) { return it.id; }).indexOf($scope.itemEdit.id);
						$scope.items[index].isSelected = false;
					}
					$scope.itemEdit = angular.extend(savedObject);
					$scope.items[0].isSelected = true;
				});
			 } else {
				 ServiceBEOrderHeading.updateCustom('stockmanagement/beorderheadings/'+result.id, result, function(savedObject) {
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


.controller('ctrlBEOrderHeadingEdit',['$scope', 'Localization', '$modal', '$modalInstance', 'dialogs',
	'ServiceBEOrderHeading', 'ServiceDeliveryMethod', 'ServicePaymentMethod', 'ServicePaymentCondition', 'ServiceBusinessEntity', 'ServiceCurrency', 'ServiceDocumentType', 'ServiceBEOrderItem',   'deliveryMethodDefinition',  'paymentMethodDefinition',  'paymentConditionDefinition',  'beCustomerDefinition',  'currencyDefinition',  'documentTypeDefinition',  'beSellerDefinition',  'beOrderItemsDefinition',   'itemEdit',
function($scope, Localization, $modal, $modalInstance, dialogs,
	ServiceBEOrderHeading, ServiceDeliveryMethod, ServicePaymentMethod, ServicePaymentCondition, ServiceBusinessEntity, ServiceCurrency, ServiceDocumentType, ServiceBEOrderItem,  deliveryMethodDefinition,  paymentMethodDefinition,  paymentConditionDefinition,  beCustomerDefinition,  currencyDefinition,  documentTypeDefinition,  beSellerDefinition,  beOrderItemsDefinition,  itemEdit) {

	// dialog mode
	$scope.mode = 'edit';

	// original item state
	var original = angular.copy(itemEdit);
	// item state
	$scope.itemEdit = angular.copy(original);

	// deliveryMethod with properties
	$scope.deliveryMethodDefinition = deliveryMethodDefinition;
	// paymentMethod with properties
	$scope.paymentMethodDefinition = paymentMethodDefinition;
	// paymentCondition with properties
	$scope.paymentConditionDefinition = paymentConditionDefinition;
	// beCustomer with properties
	$scope.beCustomerDefinition = beCustomerDefinition;
	// currency with properties
	$scope.currencyDefinition = currencyDefinition;
	// documentType with properties
	$scope.documentTypeDefinition = documentTypeDefinition;
	// beSeller with properties
	$scope.beSellerDefinition = beSellerDefinition;
	// beOrderItems with properties
	$scope.beOrderItemsDefinition = beOrderItemsDefinition;

	// datepicker logic

	// date properties
	$scope.openedBEOHCreationDate = false;
	$scope.openedBEOHOrderDate = false;

	$scope.open = function($event, opened) {
		$event.preventDefault();
		$event.stopPropagation();
		$scope[opened] = true;
	};



	// Choose deliveryMethod
	$scope.openChooseDeliveryMethodDialog = function() {
        $modal.open({
            backdrop: 'static',
            keyboard : false,
            templateUrl: 'order/beorderheading/tmplDeliveryMethodChoose.tpl.html',
            size: 'lg',
            controller: 'ctrlDeliveryMethodChoose',
            windowClass: 'hmodal-info',
            resolve: {
				itemEdit: function() {
					if(angular.isDefined($scope.itemEdit.deliveryMethod)){
						return $scope.itemEdit.deliveryMethod;
					}
				}
			}
		}).result.then(function(result) {
			$scope.itemEdit.deliveryMethod = angular.copy(result);
		});
    };


	// Choose paymentMethod
	$scope.openChoosePaymentMethodDialog = function() {
        $modal.open({
            backdrop: 'static',
            keyboard : false,
            templateUrl: 'initialization/beorderheading/tmplPaymentMethodChoose.tpl.html',
            size: 'lg',
            controller: 'ctrlPaymentMethodChoose',
            windowClass: 'hmodal-info',
            resolve: {
				itemEdit: function() {
					if(angular.isDefined($scope.itemEdit.paymentMethod)){
						return $scope.itemEdit.paymentMethod;
					}
				}
			}
		}).result.then(function(result) {
			$scope.itemEdit.paymentMethod = angular.copy(result);
		});
    };


	// Choose paymentCondition
	$scope.openChoosePaymentConditionDialog = function() {
        $modal.open({
            backdrop: 'static',
            keyboard : false,
            templateUrl: 'initialization/beorderheading/tmplPaymentConditionChoose.tpl.html',
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


	// Choose beCustomer
	$scope.openChooseBeCustomerDialog = function() {
        $modal.open({
            backdrop: 'static',
            keyboard : false,
            templateUrl: 'corporation/beorderheading/tmplBusinessEntityChoose.tpl.html',
            size: 'lg',
            controller: 'ctrlBusinessEntityChoose',
            windowClass: 'hmodal-info',
            resolve: {
				itemEdit: function() {
					if(angular.isDefined($scope.itemEdit.beCustomer)){
						return $scope.itemEdit.beCustomer;
					}
				}
			}
		}).result.then(function(result) {
			$scope.itemEdit.beCustomer = angular.copy(result);
		});
    };


	// Choose currency
	$scope.openChooseCurrencyDialog = function() {
        $modal.open({
            backdrop: 'static',
            keyboard : false,
            templateUrl: 'capacitymanagement/beorderheading/tmplCurrencyChoose.tpl.html',
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
            templateUrl: 'corporation/beorderheading/tmplDocumentTypeChoose.tpl.html',
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


	// Choose beSeller
	$scope.openChooseBeSellerDialog = function() {
        $modal.open({
            backdrop: 'static',
            keyboard : false,
            templateUrl: 'corporation/beorderheading/tmplBusinessEntityChoose.tpl.html',
            size: 'lg',
            controller: 'ctrlBusinessEntityChoose',
            windowClass: 'hmodal-info',
            resolve: {
				itemEdit: function() {
					if(angular.isDefined($scope.itemEdit.beSeller)){
						return $scope.itemEdit.beSeller;
					}
				}
			}
		}).result.then(function(result) {
			$scope.itemEdit.beSeller = angular.copy(result);
		});
    };


    $scope.bEOrderItemEdit = null;

    // beOrderItems table selection logic
    $scope.bEOrderItemSelection = function(item, index) {
        if(item.isSelected) {
            if($scope.bEOrderItemEdit !== null) {
                var index1 = $scope.itemEdit.beOrderItems.map(function(it) { return it.id; }).indexOf($scope.bEOrderItemEdit.id);
                $scope.itemEdit.beOrderItems[index1].isSelected = false;
            }
            $scope.bEOrderItemEdit = item;
        } else {
            $scope.bEOrderItemEdit = null;
            item.isSelected = false;
        }
    };

    // New/Edit beOrderItems dialog
    $scope.openBEOrderItemEditDialog = function(isNew) {
        $modal.open({
            backdrop: 'static',
            keyboard : false,
            templateUrl: 'internalorder/beorderheading/tmplBEOrderItemEdit.tpl.html',
            size: 'lg',
            controller: 'ctrlBEOrderItemEdit',
            windowClass: 'hmodal-info',
            resolve: {
                itemEdit: function() {
                    if(isNew) {
                        return new ServiceBEOrderItem();
                    } else {
                        return $scope.bEOrderItemEdit;
                    }
                }
            }
        }).result.then(function(result) {
            var i;
            if(isNew) {
                if(!angular.isDefined($scope.itemEdit.beOrderItems)) {
                    $scope.itemEdit.beOrderItems = [];
                }
                $scope.itemEdit.beOrderItems.unshift(result);
                for(i in $scope.itemEdit.beOrderItems) {
                    $scope.itemEdit.beOrderItems[i].isSelected = false;
                }
                $scope.bEOrderItemEdit = angular.extend(result);
                $scope.itemEdit.beOrderItems[0].isSelected = true;
            }
            else {
                for(i in $scope.itemEdit.beOrderItems) {
                    $scope.itemEdit.beOrderItems[i].isSelected = false;
                }
                $scope.bEOrderItemEdit = angular.extend(result);
                var index = $scope.itemEdit.beOrderItems.map(function(it) { return it.id; }).indexOf(result.id);
                for(var key in result) {
                    $scope.itemEdit.beOrderItems[index][key] = result[key];
                }
                $scope.itemEdit.beOrderItems[index].isSelected = true;
            }
        });
    };

    $scope.removeBEOrderItem = function(item) {
        var dialog = dialogs.confirm('Please confirm', 'Are you sure you want to delete item?');
        dialog.result.then(function(btn) {
            var removeIndex = $scope.itemEdit.beOrderItems.map(function(it) { return it.id; }).indexOf(item.id);
            $scope.itemEdit.beOrderItems[removeIndex].deleted = true;
        });
    };


	// Save Button
	$scope.save = function() {
		correctDateTime($scope.itemEdit.BEOHCreationDate);
		correctDateTime($scope.itemEdit.BEOHOrderDate);
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
		return                 item.BEOHDocumentNumber  &&                 item.BEOHCreationDate  &&                 item.BEOHOrderDate  ;
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


.controller('ctrlBEOrderHeadingChoose', ['$scope','ServiceBEOrderHeading', 'dialogs', '$modal', '$modalInstance', 'itemEdit',
function($scope, ServiceBEOrderHeading, dialogs, $modal,  $modalInstance, itemEdit) {

    // entity with properties
    $scope.itemDefinition = {
        label: 'internalorder.bEOrderHeading',
        properties: [
            { label: 'bEOHDocumentNumber', name:'BEOHDocumentNumber', inTable:  true  },
            { label: 'bEOHCreationDate', name:'BEOHCreationDate', inTable:  true  },
            { label: 'bEOHOrderDate', name:'BEOHOrderDate', inTable:  true  },
            { label: 'bEOHCompletionStatus', name:'BEOHCompletionStatus', inTable:  false  },
        ]
    };

	$scope.items = [];
	$scope.itemEdit = {};

	// fill table with data
	$scope.loaded = false;
	var getBEOrderHeadings = function() {
		if(!$scope.loaded && $scope.items.length === 0) {
			$scope.isLoading = true;
			ServiceBEOrderHeading.query(function(data) {
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
	getBEOrderHeadings();

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