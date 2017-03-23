'use strict';

angular.module('Doob.order')


.controller('ctrlOrderHeading',['$scope', '$rootScope', '$modal', 'dialogs', 'CheckSelected', 'ServiceOrderHeading',
    function($scope, $rootScope, $modal, dialogs, CheckSelected, ServiceOrderHeading) {

	// main entity (orderHeading) properties names and labels
	$scope.itemDefinition = {
		label: 'order.orderHeading',
		properties: [
			{ label: 'oHDocumentNumber', name:'OHDocumentNumber', inTable:  true  },
			{ label: 'oHCreationDate', name:'OHCreationDate', inTable:  true  },
			{ label: 'oHContractNumber', name:'OHContractNumber', inTable:  false  },
			{ label: 'oHOrderNumberOfBuyer', name:'OHOrderNumberOfBuyer', inTable:  true  },
			{ label: 'oHOrderDate', name:'OHOrderDate', inTable:  true  },
			{ label: 'oHRemark', name:'OHRemark', inTable:  false  },
			{ label: 'oHPaymentPeriodBuyer', name:'OHPaymentPeriodBuyer', inTable:  true  },
			{ label: 'oHBankLetterOfCredit', name:'OHBankLetterOfCredit', inTable:  false  },
			{ label: 'oHDeletedStatus', name:'OHDeletedStatus', inTable:  false  },
			{ label: 'oHCompletionStatus', name:'OHCompletionStatus', inTable:  false  },
			{ label: 'oHPrintingStatus', name:'OHPrintingStatus', inTable:  false  },
			{ label: 'oHConverted', name:'OHConverted', inTable:  false  },
			{ label: 'oHShopId', name:'OHShopId', inTable:  false  },
			{ label: 'oHShopIdOrderId', name:'OHShopIdOrderId', inTable:  false  },
			{ label: 'oHOrderId', name:'OHOrderId', inTable:  false  },
		]
	};

	// employee with properties names and labels
	$scope.employeeDefinition = {
		label: 'corporation.employee',
		properties : [
			{ label: 'ePersonellNumber', name:'EPersonellNumber' },
			{ label: 'eName', name:'EName' },
			{ label: 'eLastName', name:'ELastName' },
			{ label: 'eDateOfBirth', name:'EDateOfBirth' },
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
	// deliveryMethod with properties names and labels
	$scope.deliveryMethodDefinition = {
		label: 'commonbusinessentities.identification',
		properties : [
			{ label: 'iIdentificationCode', name:'IIdentificationCode' },
		]
	};
	// orderCategory with properties names and labels
	$scope.orderCategoryDefinition = {
		label: 'order.orderCategory',
		properties : [
			{ label: 'oCCode', name:'OCCode' },
			{ label: 'oCOrderPrefix', name:'OCOrderPrefix' },
			{ label: 'oCFreeOfCharge', name:'OCFreeOfCharge' },
			{ label: 'oCEnabled', name:'OCEnabled' },
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
	// customer with properties names and labels
	$scope.customerDefinition = {
		label: 'order.customer',
		properties : [
			{ label: 'cFirstName', name:'CFirstName' },
			{ label: 'cLastName', name:'CLastName' },
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
	// urgentStatus with properties names and labels
	$scope.urgentStatusDefinition = {
		label: 'initialization.urgentStatus',
		properties : [
			{ label: 'uSCode', name:'USCode' },
			{ label: 'uSDescription', name:'USDescription' },
		]
	};
	// specialProject with properties names and labels
	$scope.specialProjectDefinition = {
		label: 'order.specialProject',
		properties : [
			{ label: 'sPCode', name:'SPCode' },
			{ label: 'sPName', name:'SPName' },
		]
	};
	// identification with properties names and labels
	$scope.identificationDefinition = {
		label: 'commonbusinessentities.identification',
		properties : [
			{ label: 'iIdentificationCode', name:'IIdentificationCode' },
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
	// shippingDocument with properties names and labels
	$scope.shippingDocumentDefinition = {
		label: 'procurement.shippingDocument',
		properties : [
			{ label: 'sDDocumentNumber', name:'SDDocumentNumber' },
			{ label: 'sDDispositionDate', name:'SDDispositionDate' },
			{ label: 'sDStatus', name:'SDStatus' },
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
	// orderGroups with properties names and labels
	$scope.orderGroupsDefinition = {
		label: 'order.orderGroup',
		properties : [
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
	// proformaInvoices with properties names and labels
	$scope.proformaInvoicesDefinition = {
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

	// fill table with data
	$scope.items = [];
	$scope.loaded = false;
	var getOrderHeadings = function() {
		if(!$scope.loaded && $scope.items.length === 0) {
			$scope.isLoading = true;
			ServiceOrderHeading.query(function(data) {
				$scope.items = data;
				$scope.isLoading = false;
				$scope.loaded = true;
			});
		}
	};
	getOrderHeadings();

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

	$scope.$watch('OrderHeadingCollection', function() {
		$scope.itemEdit = CheckSelected.checkSelectedInTable($scope.itemEdit, $scope.OrderHeadingCollection, $scope.items);
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
			templateUrl: 'order/orderheading/tmplOrderHeadingEdit.tpl.html',
			size: 'lg',
			windowClass: 'hmodal-info',
			controller: 'ctrlOrderHeadingEdit',
			resolve: {
				itemEdit: function() {
					if(isNew) {
						return new ServiceOrderHeading();
					} else {
						return $scope.itemEdit;
					}
				},
				employeeDefinition: function() {
					return $scope.employeeDefinition;
				},
				currencyDefinition: function() {
					return $scope.currencyDefinition;
				},
				taskTypeDefinition: function() {
					return $scope.taskTypeDefinition;
				},
				deliveryMethodDefinition: function() {
					return $scope.deliveryMethodDefinition;
				},
				orderCategoryDefinition: function() {
					return $scope.orderCategoryDefinition;
				},
				organizationUnitDefinition: function() {
					return $scope.organizationUnitDefinition;
				},
				customerDefinition: function() {
					return $scope.customerDefinition;
				},
				paymentMethodDefinition: function() {
					return $scope.paymentMethodDefinition;
				},
				documentTypeDefinition: function() {
					return $scope.documentTypeDefinition;
				},
				paymentConditionDefinition: function() {
					return $scope.paymentConditionDefinition;
				},
				urgentStatusDefinition: function() {
					return $scope.urgentStatusDefinition;
				},
				specialProjectDefinition: function() {
					return $scope.specialProjectDefinition;
				},
				identificationDefinition: function() {
					return $scope.identificationDefinition;
				},
				denotationMethodDefinition: function() {
					return $scope.denotationMethodDefinition;
				},
				shippingDocumentDefinition: function() {
					return $scope.shippingDocumentDefinition;
				},
				requestForProductionDefinition: function() {
					return $scope.requestForProductionDefinition;
				},
				orderGroupsDefinition: function() {
					return $scope.orderGroupsDefinition;
				},
				invoicesDefinition: function() {
					return $scope.invoicesDefinition;
				},
				proformaInvoicesDefinition: function() {
					return $scope.proformaInvoicesDefinition;
				},
			}
		})
		.result.then(function(result) {
			if(!angular.isDefined(result.id)) {
				ServiceOrderHeading.saveCustom('stockmanagement/orderheadings', result, function(savedObject) {
					$scope.items.unshift(savedObject);
					if($scope.itemEdit !== null) {
						var index = $scope.items.map(function(it) { return it.id; }).indexOf($scope.itemEdit.id);
						$scope.items[index].isSelected = false;
					}
					$scope.itemEdit = angular.extend(savedObject);
					$scope.items[0].isSelected = true;
				});
			 } else {
				 ServiceOrderHeading.updateCustom('stockmanagement/orderheadings/'+result.id, result, function(savedObject) {
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


.controller('ctrlOrderHeadingEdit',['$scope', 'Localization', '$modal', '$modalInstance', 'dialogs',
	'ServiceOrderHeading', 'ServiceEmployee', 'ServiceCurrency', 'ServiceTaskType', 'ServiceIdentification', 'ServiceOrderCategory', 'ServiceOrganizationUnit', 'ServiceCustomer', 'ServicePaymentMethod', 'ServiceDocumentType', 'ServicePaymentCondition', 'ServiceUrgentStatus', 'ServiceSpecialProject', 'ServiceDenotationMethod', 'ServiceShippingDocument', 'ServiceRequestForProduction', 'ServiceOrderGroup', 'ServiceInvoice', 'ServiceProFormaInvoice',   'employeeDefinition',  'currencyDefinition',  'taskTypeDefinition',  'deliveryMethodDefinition',  'orderCategoryDefinition',  'organizationUnitDefinition',  'customerDefinition',  'paymentMethodDefinition',  'documentTypeDefinition',  'paymentConditionDefinition',  'urgentStatusDefinition',  'specialProjectDefinition',  'identificationDefinition',  'denotationMethodDefinition',  'shippingDocumentDefinition',  'requestForProductionDefinition',  'orderGroupsDefinition',  'invoicesDefinition',  'proformaInvoicesDefinition',   'itemEdit',
function($scope, Localization, $modal, $modalInstance, dialogs,
	ServiceOrderHeading, ServiceEmployee, ServiceCurrency, ServiceTaskType, ServiceIdentification, ServiceOrderCategory, ServiceOrganizationUnit, ServiceCustomer, ServicePaymentMethod, ServiceDocumentType, ServicePaymentCondition, ServiceUrgentStatus, ServiceSpecialProject, ServiceDenotationMethod, ServiceShippingDocument, ServiceRequestForProduction, ServiceOrderGroup, ServiceInvoice, ServiceProFormaInvoice,  employeeDefinition,  currencyDefinition,  taskTypeDefinition,  deliveryMethodDefinition,  orderCategoryDefinition,  organizationUnitDefinition,  customerDefinition,  paymentMethodDefinition,  documentTypeDefinition,  paymentConditionDefinition,  urgentStatusDefinition,  specialProjectDefinition,  identificationDefinition,  denotationMethodDefinition,  shippingDocumentDefinition,  requestForProductionDefinition,  orderGroupsDefinition,  invoicesDefinition,  proformaInvoicesDefinition,  itemEdit) {

	// dialog mode
	$scope.mode = 'edit';

	// original item state
	var original = angular.copy(itemEdit);
	// item state
	$scope.itemEdit = angular.copy(original);

	// employee with properties
	$scope.employeeDefinition = employeeDefinition;
	// currency with properties
	$scope.currencyDefinition = currencyDefinition;
	// taskType with properties
	$scope.taskTypeDefinition = taskTypeDefinition;
	// deliveryMethod with properties
	$scope.deliveryMethodDefinition = deliveryMethodDefinition;
	// orderCategory with properties
	$scope.orderCategoryDefinition = orderCategoryDefinition;
	// organizationUnit with properties
	$scope.organizationUnitDefinition = organizationUnitDefinition;
	// customer with properties
	$scope.customerDefinition = customerDefinition;
	// paymentMethod with properties
	$scope.paymentMethodDefinition = paymentMethodDefinition;
	// documentType with properties
	$scope.documentTypeDefinition = documentTypeDefinition;
	// paymentCondition with properties
	$scope.paymentConditionDefinition = paymentConditionDefinition;
	// urgentStatus with properties
	$scope.urgentStatusDefinition = urgentStatusDefinition;
	// specialProject with properties
	$scope.specialProjectDefinition = specialProjectDefinition;
	// identification with properties
	$scope.identificationDefinition = identificationDefinition;
	// denotationMethod with properties
	$scope.denotationMethodDefinition = denotationMethodDefinition;
	// shippingDocument with properties
	$scope.shippingDocumentDefinition = shippingDocumentDefinition;
	// requestForProduction with properties
	$scope.requestForProductionDefinition = requestForProductionDefinition;
	// orderGroups with properties
	$scope.orderGroupsDefinition = orderGroupsDefinition;
	// invoices with properties
	$scope.invoicesDefinition = invoicesDefinition;
	// proformaInvoices with properties
	$scope.proformaInvoicesDefinition = proformaInvoicesDefinition;

	// datepicker logic

	// date properties
	$scope.openedOHCreationDate = false;
	$scope.openedOHOrderDate = false;
	$scope.openedOHPaymentPeriodBuyer = false;

	$scope.open = function($event, opened) {
		$event.preventDefault();
		$event.stopPropagation();
		$scope[opened] = true;
	};



	// Choose employee
	$scope.openChooseEmployeeDialog = function() {
        $modal.open({
            backdrop: 'static',
            keyboard : false,
            templateUrl: 'corporation/orderheading/tmplEmployeeChoose.tpl.html',
            size: 'lg',
            controller: 'ctrlEmployeeChoose',
            windowClass: 'hmodal-info',
            resolve: {
				itemEdit: function() {
					if(angular.isDefined($scope.itemEdit.employee)){
						return $scope.itemEdit.employee;
					}
				}
			}
		}).result.then(function(result) {
			$scope.itemEdit.employee = angular.copy(result);
		});
    };


	// Choose currency
	$scope.openChooseCurrencyDialog = function() {
        $modal.open({
            backdrop: 'static',
            keyboard : false,
            templateUrl: 'capacitymanagement/orderheading/tmplCurrencyChoose.tpl.html',
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
            templateUrl: 'initialization/orderheading/tmplTaskTypeChoose.tpl.html',
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


	// Choose deliveryMethod
	$scope.openChooseDeliveryMethodDialog = function() {
        $modal.open({
            backdrop: 'static',
            keyboard : false,
            templateUrl: 'commonbusinessentities/orderheading/tmplIdentificationChoose.tpl.html',
            size: 'lg',
            controller: 'ctrlIdentificationChoose',
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


	// Choose orderCategory
	$scope.openChooseOrderCategoryDialog = function() {
        $modal.open({
            backdrop: 'static',
            keyboard : false,
            templateUrl: 'order/orderheading/tmplOrderCategoryChoose.tpl.html',
            size: 'lg',
            controller: 'ctrlOrderCategoryChoose',
            windowClass: 'hmodal-info',
            resolve: {
				itemEdit: function() {
					if(angular.isDefined($scope.itemEdit.orderCategory)){
						return $scope.itemEdit.orderCategory;
					}
				}
			}
		}).result.then(function(result) {
			$scope.itemEdit.orderCategory = angular.copy(result);
		});
    };


	// Choose organizationUnit
	$scope.openChooseOrganizationUnitDialog = function() {
        $modal.open({
            backdrop: 'static',
            keyboard : false,
            templateUrl: 'corporation/orderheading/tmplOrganizationUnitChoose.tpl.html',
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


	// Choose customer
	$scope.openChooseCustomerDialog = function() {
        $modal.open({
            backdrop: 'static',
            keyboard : false,
            templateUrl: 'order/orderheading/tmplCustomerChoose.tpl.html',
            size: 'lg',
            controller: 'ctrlCustomerChoose',
            windowClass: 'hmodal-info',
            resolve: {
				itemEdit: function() {
					if(angular.isDefined($scope.itemEdit.customer)){
						return $scope.itemEdit.customer;
					}
				}
			}
		}).result.then(function(result) {
			$scope.itemEdit.customer = angular.copy(result);
		});
    };


	// Choose paymentMethod
	$scope.openChoosePaymentMethodDialog = function() {
        $modal.open({
            backdrop: 'static',
            keyboard : false,
            templateUrl: 'initialization/orderheading/tmplPaymentMethodChoose.tpl.html',
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


	// Choose documentType
	$scope.openChooseDocumentTypeDialog = function() {
        $modal.open({
            backdrop: 'static',
            keyboard : false,
            templateUrl: 'corporation/orderheading/tmplDocumentTypeChoose.tpl.html',
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
            templateUrl: 'initialization/orderheading/tmplPaymentConditionChoose.tpl.html',
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


	// Choose urgentStatus
	$scope.openChooseUrgentStatusDialog = function() {
        $modal.open({
            backdrop: 'static',
            keyboard : false,
            templateUrl: 'initialization/orderheading/tmplUrgentStatusChoose.tpl.html',
            size: 'lg',
            controller: 'ctrlUrgentStatusChoose',
            windowClass: 'hmodal-info',
            resolve: {
				itemEdit: function() {
					if(angular.isDefined($scope.itemEdit.urgentStatus)){
						return $scope.itemEdit.urgentStatus;
					}
				}
			}
		}).result.then(function(result) {
			$scope.itemEdit.urgentStatus = angular.copy(result);
		});
    };


	// Choose specialProject
	$scope.openChooseSpecialProjectDialog = function() {
        $modal.open({
            backdrop: 'static',
            keyboard : false,
            templateUrl: 'order/orderheading/tmplSpecialProjectChoose.tpl.html',
            size: 'lg',
            controller: 'ctrlSpecialProjectChoose',
            windowClass: 'hmodal-info',
            resolve: {
				itemEdit: function() {
					if(angular.isDefined($scope.itemEdit.specialProject)){
						return $scope.itemEdit.specialProject;
					}
				}
			}
		}).result.then(function(result) {
			$scope.itemEdit.specialProject = angular.copy(result);
		});
    };


	// Choose identification
	$scope.openChooseIdentificationDialog = function() {
        $modal.open({
            backdrop: 'static',
            keyboard : false,
            templateUrl: 'commonbusinessentities/orderheading/tmplIdentificationChoose.tpl.html',
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


	// Choose denotationMethod
	$scope.openChooseDenotationMethodDialog = function() {
        $modal.open({
            backdrop: 'static',
            keyboard : false,
            templateUrl: 'initialization/orderheading/tmplDenotationMethodChoose.tpl.html',
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


	// Save Button
	$scope.save = function() {
		correctDateTime($scope.itemEdit.OHCreationDate);
		correctDateTime($scope.itemEdit.OHOrderDate);
		correctDateTime($scope.itemEdit.OHPaymentPeriodBuyer);
	   //	delete $scope.itemEdit.isSelected;
        var item;
        var i;
        for(i in $scope.itemEdit.shippingDocument) {
    		item = $scope.itemEdit.shippingDocument[i];
    		delete item.isSelected;
    	}
        for(i in $scope.itemEdit.requestForProduction) {
    		item = $scope.itemEdit.requestForProduction[i];
    		delete item.isSelected;
    	}
        for(i in $scope.itemEdit.orderGroups) {
    		item = $scope.itemEdit.orderGroups[i];
    		delete item.isSelected;
    	}
        for(i in $scope.itemEdit.invoices) {
    		item = $scope.itemEdit.invoices[i];
    		delete item.isSelected;
    	}
        for(i in $scope.itemEdit.proformaInvoices) {
    		item = $scope.itemEdit.proformaInvoices[i];
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
		return                 item.OHDocumentNumber  &&                 item.OHCreationDate  &&                 item.OHOrderNumberOfBuyer  &&                 item.OHOrderDate  &&                 item.OHPaymentPeriodBuyer  ;
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


.controller('ctrlOrderHeadingChoose', ['$scope','ServiceOrderHeading', 'dialogs', '$modal', '$modalInstance', 'itemEdit',
function($scope, ServiceOrderHeading, dialogs, $modal,  $modalInstance, itemEdit) {

    // entity with properties
    $scope.itemDefinition = {
        label: 'order.orderHeading',
        properties: [
            { label: 'oHDocumentNumber', name:'OHDocumentNumber', inTable:  true  },
            { label: 'oHCreationDate', name:'OHCreationDate', inTable:  true  },
            { label: 'oHContractNumber', name:'OHContractNumber', inTable:  false  },
            { label: 'oHOrderNumberOfBuyer', name:'OHOrderNumberOfBuyer', inTable:  true  },
            { label: 'oHOrderDate', name:'OHOrderDate', inTable:  true  },
            { label: 'oHRemark', name:'OHRemark', inTable:  false  },
            { label: 'oHPaymentPeriodBuyer', name:'OHPaymentPeriodBuyer', inTable:  true  },
            { label: 'oHBankLetterOfCredit', name:'OHBankLetterOfCredit', inTable:  false  },
            { label: 'oHDeletedStatus', name:'OHDeletedStatus', inTable:  false  },
            { label: 'oHCompletionStatus', name:'OHCompletionStatus', inTable:  false  },
            { label: 'oHPrintingStatus', name:'OHPrintingStatus', inTable:  false  },
            { label: 'oHConverted', name:'OHConverted', inTable:  false  },
            { label: 'oHShopId', name:'OHShopId', inTable:  false  },
            { label: 'oHShopIdOrderId', name:'OHShopIdOrderId', inTable:  false  },
            { label: 'oHOrderId', name:'OHOrderId', inTable:  false  },
        ]
    };

	$scope.items = [];
	$scope.itemEdit = {};

	// fill table with data
	$scope.loaded = false;
	var getOrderHeadings = function() {
		if(!$scope.loaded && $scope.items.length === 0) {
			$scope.isLoading = true;
			ServiceOrderHeading.query(function(data) {
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
	getOrderHeadings();

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