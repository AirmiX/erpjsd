'use strict';

angular.module('Doob.logical')


.controller('ctrlOfferSupplierHeading',['$scope', '$rootScope', '$modal', 'dialogs', 'CheckSelected', 'ServiceOfferSupplierHeading',
    function($scope, $rootScope, $modal, dialogs, CheckSelected, ServiceOfferSupplierHeading) {

	// main entity (offerSupplierHeading) properties names and labels
	$scope.itemDefinition = {
		label: 'logical.offerSupplierHeading',
		properties: [
			{ label: 'oSHNumber', name:'OSHNumber', inTable:  true  },
			{ label: 'oSHOfferAcceptStatus', name:'OSHOfferAcceptStatus', inTable:  true  },
			{ label: 'oSHReceivingDate', name:'OSHReceivingDate', inTable:  true  },
			{ label: 'oSHExpiryDate', name:'OSHExpiryDate', inTable:  true  },
			{ label: 'oSHRemark', name:'OSHRemark', inTable:  false  },
		]
	};

	// supplier with properties names and labels
	$scope.supplierDefinition = {
		label: 'commonbusinessentities.identification',
		properties : [
			{ label: 'iIdentificationCode', name:'IIdentificationCode' },
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
	// deliveryMethod with properties names and labels
	$scope.deliveryMethodDefinition = {
		label: 'order.deliveryMethod',
		properties : [
			{ label: 'dMCode', name:'DMCode' },
			{ label: 'dMName', name:'DMName' },
		]
	};
	// denotationMethod with properties names and labels
	$scope.denotationMethodDefinition = {
		label: 'initialization.denotationMethod',
		properties : [
			{ label: 'dMCode', name:'DMCode' },
			{ label: 'dMName', name:'DMName' },
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
	// paymentMethod with properties names and labels
	$scope.paymentMethodDefinition = {
		label: 'initialization.paymentMethod',
		properties : [
			{ label: 'pMCode', name:'PMCode' },
			{ label: 'pMName', name:'PMName' },
			{ label: 'pMEnabled', name:'PMEnabled' },
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
	// packingMethod with properties names and labels
	$scope.packingMethodDefinition = {
		label: 'initialization.packingMethod',
		properties : [
			{ label: 'pMCode', name:'PMCode' },
			{ label: 'pMName', name:'PMName' },
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
	var getOfferSupplierHeadings = function() {
		if(!$scope.loaded && $scope.items.length === 0) {
			$scope.isLoading = true;
			ServiceOfferSupplierHeading.query(function(data) {
				$scope.items = data;
				$scope.isLoading = false;
				$scope.loaded = true;
			});
		}
	};
	getOfferSupplierHeadings();

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

	$scope.$watch('OfferSupplierHeadingCollection', function() {
		$scope.itemEdit = CheckSelected.checkSelectedInTable($scope.itemEdit, $scope.OfferSupplierHeadingCollection, $scope.items);
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
			templateUrl: 'logical/offersupplierheading/tmplOfferSupplierHeadingEdit.tpl.html',
			size: 'lg',
			windowClass: 'hmodal-info',
			controller: 'ctrlOfferSupplierHeadingEdit',
			resolve: {
				itemEdit: function() {
					if(isNew) {
						return new ServiceOfferSupplierHeading();
					} else {
						return $scope.itemEdit;
					}
				},
				supplierDefinition: function() {
					return $scope.supplierDefinition;
				},
				documentTypeDefinition: function() {
					return $scope.documentTypeDefinition;
				},
				currencyDefinition: function() {
					return $scope.currencyDefinition;
				},
				deliveryMethodDefinition: function() {
					return $scope.deliveryMethodDefinition;
				},
				denotationMethodDefinition: function() {
					return $scope.denotationMethodDefinition;
				},
				organizationUnitDefinition: function() {
					return $scope.organizationUnitDefinition;
				},
				paymentMethodDefinition: function() {
					return $scope.paymentMethodDefinition;
				},
				rfpHeadingDefinition: function() {
					return $scope.rfpHeadingDefinition;
				},
				packingMethodDefinition: function() {
					return $scope.packingMethodDefinition;
				},
				offerSupplierItemsDefinition: function() {
					return $scope.offerSupplierItemsDefinition;
				},
			}
		})
		.result.then(function(result) {
			if(!angular.isDefined(result.id)) {
				ServiceOfferSupplierHeading.saveCustom('stockmanagement/offersupplierheadings', result, function(savedObject) {
					$scope.items.unshift(savedObject);
					if($scope.itemEdit !== null) {
						var index = $scope.items.map(function(it) { return it.id; }).indexOf($scope.itemEdit.id);
						$scope.items[index].isSelected = false;
					}
					$scope.itemEdit = angular.extend(savedObject);
					$scope.items[0].isSelected = true;
				});
			 } else {
				 ServiceOfferSupplierHeading.updateCustom('stockmanagement/offersupplierheadings/'+result.id, result, function(savedObject) {
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


.controller('ctrlOfferSupplierHeadingEdit',['$scope', 'Localization', '$modal', '$modalInstance', 'dialogs',
	'ServiceOfferSupplierHeading', 'ServiceIdentification', 'ServiceDocumentType', 'ServiceCurrency', 'ServiceDeliveryMethod', 'ServiceDenotationMethod', 'ServiceOrganizationUnit', 'ServicePaymentMethod', 'ServiceRequestForProposalHeading', 'ServicePackingMethod', 'ServiceOfferSupplierItem',   'supplierDefinition',  'documentTypeDefinition',  'currencyDefinition',  'deliveryMethodDefinition',  'denotationMethodDefinition',  'organizationUnitDefinition',  'paymentMethodDefinition',  'rfpHeadingDefinition',  'packingMethodDefinition',  'offerSupplierItemsDefinition',   'itemEdit',
function($scope, Localization, $modal, $modalInstance, dialogs,
	ServiceOfferSupplierHeading, ServiceIdentification, ServiceDocumentType, ServiceCurrency, ServiceDeliveryMethod, ServiceDenotationMethod, ServiceOrganizationUnit, ServicePaymentMethod, ServiceRequestForProposalHeading, ServicePackingMethod, ServiceOfferSupplierItem,  supplierDefinition,  documentTypeDefinition,  currencyDefinition,  deliveryMethodDefinition,  denotationMethodDefinition,  organizationUnitDefinition,  paymentMethodDefinition,  rfpHeadingDefinition,  packingMethodDefinition,  offerSupplierItemsDefinition,  itemEdit) {

	// dialog mode
	$scope.mode = 'edit';

	// original item state
	var original = angular.copy(itemEdit);
	// item state
	$scope.itemEdit = angular.copy(original);

	// supplier with properties
	$scope.supplierDefinition = supplierDefinition;
	// documentType with properties
	$scope.documentTypeDefinition = documentTypeDefinition;
	// currency with properties
	$scope.currencyDefinition = currencyDefinition;
	// deliveryMethod with properties
	$scope.deliveryMethodDefinition = deliveryMethodDefinition;
	// denotationMethod with properties
	$scope.denotationMethodDefinition = denotationMethodDefinition;
	// organizationUnit with properties
	$scope.organizationUnitDefinition = organizationUnitDefinition;
	// paymentMethod with properties
	$scope.paymentMethodDefinition = paymentMethodDefinition;
	// rfpHeading with properties
	$scope.rfpHeadingDefinition = rfpHeadingDefinition;
	// packingMethod with properties
	$scope.packingMethodDefinition = packingMethodDefinition;
	// offerSupplierItems with properties
	$scope.offerSupplierItemsDefinition = offerSupplierItemsDefinition;

	// datepicker logic

	// date properties
	$scope.openedOSHReceivingDate = false;
	$scope.openedOSHExpiryDate = false;

	$scope.open = function($event, opened) {
		$event.preventDefault();
		$event.stopPropagation();
		$scope[opened] = true;
	};



	// Choose supplier
	$scope.openChooseSupplierDialog = function() {
        $modal.open({
            backdrop: 'static',
            keyboard : false,
            templateUrl: 'commonbusinessentities/offersupplierheading/tmplIdentificationChoose.tpl.html',
            size: 'lg',
            controller: 'ctrlIdentificationChoose',
            windowClass: 'hmodal-info',
            resolve: {
				itemEdit: function() {
					if(angular.isDefined($scope.itemEdit.supplier)){
						return $scope.itemEdit.supplier;
					}
				}
			}
		}).result.then(function(result) {
			$scope.itemEdit.supplier = angular.copy(result);
		});
    };


	// Choose documentType
	$scope.openChooseDocumentTypeDialog = function() {
        $modal.open({
            backdrop: 'static',
            keyboard : false,
            templateUrl: 'corporation/offersupplierheading/tmplDocumentTypeChoose.tpl.html',
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
            templateUrl: 'capacitymanagement/offersupplierheading/tmplCurrencyChoose.tpl.html',
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


	// Choose deliveryMethod
	$scope.openChooseDeliveryMethodDialog = function() {
        $modal.open({
            backdrop: 'static',
            keyboard : false,
            templateUrl: 'order/offersupplierheading/tmplDeliveryMethodChoose.tpl.html',
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


	// Choose denotationMethod
	$scope.openChooseDenotationMethodDialog = function() {
        $modal.open({
            backdrop: 'static',
            keyboard : false,
            templateUrl: 'initialization/offersupplierheading/tmplDenotationMethodChoose.tpl.html',
            size: 'lg',
            controller: 'ctrlDenotationMethodChoose',
            windowClass: 'hmodal-info',
            resolve: {
				itemEdit: function() {
					if(angular.isDefined($scope.itemEdit.denotationMethod)){
						return $scope.itemEdit.denotationMethod;
					}
				}
			}
		}).result.then(function(result) {
			$scope.itemEdit.denotationMethod = angular.copy(result);
		});
    };


	// Choose organizationUnit
	$scope.openChooseOrganizationUnitDialog = function() {
        $modal.open({
            backdrop: 'static',
            keyboard : false,
            templateUrl: 'corporation/offersupplierheading/tmplOrganizationUnitChoose.tpl.html',
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


	// Choose paymentMethod
	$scope.openChoosePaymentMethodDialog = function() {
        $modal.open({
            backdrop: 'static',
            keyboard : false,
            templateUrl: 'initialization/offersupplierheading/tmplPaymentMethodChoose.tpl.html',
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


	// Choose rfpHeading
	$scope.openChooseRfpHeadingDialog = function() {
        $modal.open({
            backdrop: 'static',
            keyboard : false,
            templateUrl: 'stockmanagement/offersupplierheading/tmplRequestForProposalHeadingChoose.tpl.html',
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


	// Choose packingMethod
	$scope.openChoosePackingMethodDialog = function() {
        $modal.open({
            backdrop: 'static',
            keyboard : false,
            templateUrl: 'initialization/offersupplierheading/tmplPackingMethodChoose.tpl.html',
            size: 'lg',
            controller: 'ctrlPackingMethodChoose',
            windowClass: 'hmodal-info',
            resolve: {
				itemEdit: function() {
					if(angular.isDefined($scope.itemEdit.packingMethod)){
						return $scope.itemEdit.packingMethod;
					}
				}
			}
		}).result.then(function(result) {
			$scope.itemEdit.packingMethod = angular.copy(result);
		});
    };


    $scope.offerSupplierItemEdit = null;

    // offerSupplierItems table selection logic
    $scope.offerSupplierItemSelection = function(item, index) {
        if(item.isSelected) {
            if($scope.offerSupplierItemEdit !== null) {
                var index1 = $scope.itemEdit.offerSupplierItems.map(function(it) { return it.id; }).indexOf($scope.offerSupplierItemEdit.id);
                $scope.itemEdit.offerSupplierItems[index1].isSelected = false;
            }
            $scope.offerSupplierItemEdit = item;
        } else {
            $scope.offerSupplierItemEdit = null;
            item.isSelected = false;
        }
    };

    // New/Edit offerSupplierItems dialog
    $scope.openOfferSupplierItemEditDialog = function(isNew) {
        $modal.open({
            backdrop: 'static',
            keyboard : false,
            templateUrl: 'logical/offersupplierheading/tmplOfferSupplierItemEdit.tpl.html',
            size: 'lg',
            controller: 'ctrlOfferSupplierItemEdit',
            windowClass: 'hmodal-info',
            resolve: {
                itemEdit: function() {
                    if(isNew) {
                        return new ServiceOfferSupplierItem();
                    } else {
                        return $scope.offerSupplierItemEdit;
                    }
                }
            }
        }).result.then(function(result) {
            var i;
            if(isNew) {
                if(!angular.isDefined($scope.itemEdit.offerSupplierItems)) {
                    $scope.itemEdit.offerSupplierItems = [];
                }
                $scope.itemEdit.offerSupplierItems.unshift(result);
                for(i in $scope.itemEdit.offerSupplierItems) {
                    $scope.itemEdit.offerSupplierItems[i].isSelected = false;
                }
                $scope.offerSupplierItemEdit = angular.extend(result);
                $scope.itemEdit.offerSupplierItems[0].isSelected = true;
            }
            else {
                for(i in $scope.itemEdit.offerSupplierItems) {
                    $scope.itemEdit.offerSupplierItems[i].isSelected = false;
                }
                $scope.offerSupplierItemEdit = angular.extend(result);
                var index = $scope.itemEdit.offerSupplierItems.map(function(it) { return it.id; }).indexOf(result.id);
                for(var key in result) {
                    $scope.itemEdit.offerSupplierItems[index][key] = result[key];
                }
                $scope.itemEdit.offerSupplierItems[index].isSelected = true;
            }
        });
    };

    $scope.removeOfferSupplierItem = function(item) {
        var dialog = dialogs.confirm('Please confirm', 'Are you sure you want to delete item?');
        dialog.result.then(function(btn) {
            var removeIndex = $scope.itemEdit.offerSupplierItems.map(function(it) { return it.id; }).indexOf(item.id);
            $scope.itemEdit.offerSupplierItems[removeIndex].deleted = true;
        });
    };


	// Save Button
	$scope.save = function() {
		correctDateTime($scope.itemEdit.OSHReceivingDate);
		correctDateTime($scope.itemEdit.OSHExpiryDate);
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
		return                 item.OSHNumber  &&                 item.OSHOfferAcceptStatus  &&                 item.OSHReceivingDate  &&                 item.OSHExpiryDate  ;
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


.controller('ctrlOfferSupplierHeadingChoose', ['$scope','ServiceOfferSupplierHeading', 'dialogs', '$modal', '$modalInstance', 'itemEdit',
function($scope, ServiceOfferSupplierHeading, dialogs, $modal,  $modalInstance, itemEdit) {

    // entity with properties
    $scope.itemDefinition = {
        label: 'logical.offerSupplierHeading',
        properties: [
            { label: 'oSHNumber', name:'OSHNumber', inTable:  true  },
            { label: 'oSHOfferAcceptStatus', name:'OSHOfferAcceptStatus', inTable:  true  },
            { label: 'oSHReceivingDate', name:'OSHReceivingDate', inTable:  true  },
            { label: 'oSHExpiryDate', name:'OSHExpiryDate', inTable:  true  },
            { label: 'oSHRemark', name:'OSHRemark', inTable:  false  },
        ]
    };

	$scope.items = [];
	$scope.itemEdit = {};

	// fill table with data
	$scope.loaded = false;
	var getOfferSupplierHeadings = function() {
		if(!$scope.loaded && $scope.items.length === 0) {
			$scope.isLoading = true;
			ServiceOfferSupplierHeading.query(function(data) {
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
	getOfferSupplierHeadings();

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