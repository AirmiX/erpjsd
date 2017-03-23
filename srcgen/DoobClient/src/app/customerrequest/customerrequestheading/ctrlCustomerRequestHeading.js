'use strict';

angular.module('Doob.customerrequest')


.controller('ctrlCustomerRequestHeading',['$scope', '$rootScope', '$modal', 'dialogs', 'CheckSelected', 'ServiceCustomerRequestHeading',
    function($scope, $rootScope, $modal, dialogs, CheckSelected, ServiceCustomerRequestHeading) {

	// main entity (customerRequestHeading) properties names and labels
	$scope.itemDefinition = {
		label: 'customerrequest.customerRequestHeading',
		properties: [
			{ label: 'cRHDocumentNumber', name:'CRHDocumentNumber', inTable:  true  },
			{ label: 'cRHRegistrationDate', name:'CRHRegistrationDate', inTable:  true  },
			{ label: 'cRHSignNumberCustomerInquiry', name:'CRHSignNumberCustomerInquiry', inTable:  true  },
			{ label: 'cRHInquiryDate', name:'CRHInquiryDate', inTable:  true  },
			{ label: 'cRHCustomerOrgUnit', name:'CRHCustomerOrgUnit', inTable:  false  },
			{ label: 'cRHCustomerContactPerson', name:'CRHCustomerContactPerson', inTable:  false  },
			{ label: 'cRHCustomerPhoneNumber', name:'CRHCustomerPhoneNumber', inTable:  false  },
			{ label: 'cRHRemark', name:'CRHRemark', inTable:  false  },
			{ label: 'cRHDeletedStatus', name:'CRHDeletedStatus', inTable:  false  },
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
	// identification1 with properties names and labels
	$scope.identification1Definition = {
		label: 'commonbusinessentities.identification',
		properties : [
			{ label: 'iIdentificationCode', name:'IIdentificationCode' },
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
	// taskType with properties names and labels
	$scope.taskTypeDefinition = {
		label: 'initialization.taskType',
		properties : [
			{ label: 'tTCode', name:'TTCode' },
			{ label: 'tTName', name:'TTName' },
		]
	};
	// identification with properties names and labels
	$scope.identificationDefinition = {
		label: 'commonbusinessentities.identification',
		properties : [
			{ label: 'iIdentificationCode', name:'IIdentificationCode' },
		]
	};
	// currency with properties names and labels
	$scope.currencyDefinition = {
		label: 'capacitymanagement.currency',
		properties : [
			{ label: 'cCurrencyDesignation', name:'CCurrencyDesignation' },
		]
	};
	// customerRequestItems with properties names and labels
	$scope.customerRequestItemsDefinition = {
		label: 'customerrequest.customerRequestItem',
		properties : [
			{ label: 'cRIOrdinalNumber', name:'CRIOrdinalNumber' },
			{ label: 'cRIQuantity', name:'CRIQuantity' },
			{ label: 'cRIDeliveryTime', name:'CRIDeliveryTime' },
		]
	};

	// fill table with data
	$scope.items = [];
	$scope.loaded = false;
	var getCustomerRequestHeadings = function() {
		if(!$scope.loaded && $scope.items.length === 0) {
			$scope.isLoading = true;
			ServiceCustomerRequestHeading.query(function(data) {
				$scope.items = data;
				$scope.isLoading = false;
				$scope.loaded = true;
			});
		}
	};
	getCustomerRequestHeadings();

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

	$scope.$watch('CustomerRequestHeadingCollection', function() {
		$scope.itemEdit = CheckSelected.checkSelectedInTable($scope.itemEdit, $scope.CustomerRequestHeadingCollection, $scope.items);
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
			templateUrl: 'customerrequest/customerrequestheading/tmplCustomerRequestHeadingEdit.tpl.html',
			size: 'lg',
			windowClass: 'hmodal-info',
			controller: 'ctrlCustomerRequestHeadingEdit',
			resolve: {
				itemEdit: function() {
					if(isNew) {
						return new ServiceCustomerRequestHeading();
					} else {
						return $scope.itemEdit;
					}
				},
				documentTypeDefinition: function() {
					return $scope.documentTypeDefinition;
				},
				identification1Definition: function() {
					return $scope.identification1Definition;
				},
				urgentStatusDefinition: function() {
					return $scope.urgentStatusDefinition;
				},
				taskTypeDefinition: function() {
					return $scope.taskTypeDefinition;
				},
				identificationDefinition: function() {
					return $scope.identificationDefinition;
				},
				currencyDefinition: function() {
					return $scope.currencyDefinition;
				},
				customerRequestItemsDefinition: function() {
					return $scope.customerRequestItemsDefinition;
				},
			}
		})
		.result.then(function(result) {
			if(!angular.isDefined(result.id)) {
				ServiceCustomerRequestHeading.saveCustom('stockmanagement/customerrequestheadings', result, function(savedObject) {
					$scope.items.unshift(savedObject);
					if($scope.itemEdit !== null) {
						var index = $scope.items.map(function(it) { return it.id; }).indexOf($scope.itemEdit.id);
						$scope.items[index].isSelected = false;
					}
					$scope.itemEdit = angular.extend(savedObject);
					$scope.items[0].isSelected = true;
				});
			 } else {
				 ServiceCustomerRequestHeading.updateCustom('stockmanagement/customerrequestheadings/'+result.id, result, function(savedObject) {
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


.controller('ctrlCustomerRequestHeadingEdit',['$scope', 'Localization', '$modal', '$modalInstance', 'dialogs',
	'ServiceCustomerRequestHeading', 'ServiceDocumentType', 'ServiceIdentification', 'ServiceUrgentStatus', 'ServiceTaskType', 'ServiceCurrency', 'ServiceCustomerRequestItem',   'documentTypeDefinition',  'identification1Definition',  'urgentStatusDefinition',  'taskTypeDefinition',  'identificationDefinition',  'currencyDefinition',  'customerRequestItemsDefinition',   'itemEdit',
function($scope, Localization, $modal, $modalInstance, dialogs,
	ServiceCustomerRequestHeading, ServiceDocumentType, ServiceIdentification, ServiceUrgentStatus, ServiceTaskType, ServiceCurrency, ServiceCustomerRequestItem,  documentTypeDefinition,  identification1Definition,  urgentStatusDefinition,  taskTypeDefinition,  identificationDefinition,  currencyDefinition,  customerRequestItemsDefinition,  itemEdit) {

	// dialog mode
	$scope.mode = 'edit';

	// original item state
	var original = angular.copy(itemEdit);
	// item state
	$scope.itemEdit = angular.copy(original);

	// documentType with properties
	$scope.documentTypeDefinition = documentTypeDefinition;
	// identification1 with properties
	$scope.identification1Definition = identification1Definition;
	// urgentStatus with properties
	$scope.urgentStatusDefinition = urgentStatusDefinition;
	// taskType with properties
	$scope.taskTypeDefinition = taskTypeDefinition;
	// identification with properties
	$scope.identificationDefinition = identificationDefinition;
	// currency with properties
	$scope.currencyDefinition = currencyDefinition;
	// customerRequestItems with properties
	$scope.customerRequestItemsDefinition = customerRequestItemsDefinition;

	// datepicker logic

	// date properties
	$scope.openedCRHRegistrationDate = false;
	$scope.openedCRHInquiryDate = false;

	$scope.open = function($event, opened) {
		$event.preventDefault();
		$event.stopPropagation();
		$scope[opened] = true;
	};



	// Choose documentType
	$scope.openChooseDocumentTypeDialog = function() {
        $modal.open({
            backdrop: 'static',
            keyboard : false,
            templateUrl: 'corporation/customerrequestheading/tmplDocumentTypeChoose.tpl.html',
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


	// Choose identification1
	$scope.openChooseIdentification1Dialog = function() {
        $modal.open({
            backdrop: 'static',
            keyboard : false,
            templateUrl: 'commonbusinessentities/customerrequestheading/tmplIdentificationChoose.tpl.html',
            size: 'lg',
            controller: 'ctrlIdentificationChoose',
            windowClass: 'hmodal-info',
            resolve: {
				itemEdit: function() {
					if(angular.isDefined($scope.itemEdit.identification1)){
						return $scope.itemEdit.identification1;
					}
				}
			}
		}).result.then(function(result) {
			$scope.itemEdit.identification1 = angular.copy(result);
		});
    };


	// Choose urgentStatus
	$scope.openChooseUrgentStatusDialog = function() {
        $modal.open({
            backdrop: 'static',
            keyboard : false,
            templateUrl: 'initialization/customerrequestheading/tmplUrgentStatusChoose.tpl.html',
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


	// Choose taskType
	$scope.openChooseTaskTypeDialog = function() {
        $modal.open({
            backdrop: 'static',
            keyboard : false,
            templateUrl: 'initialization/customerrequestheading/tmplTaskTypeChoose.tpl.html',
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


	// Choose identification
	$scope.openChooseIdentificationDialog = function() {
        $modal.open({
            backdrop: 'static',
            keyboard : false,
            templateUrl: 'commonbusinessentities/customerrequestheading/tmplIdentificationChoose.tpl.html',
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


	// Choose currency
	$scope.openChooseCurrencyDialog = function() {
        $modal.open({
            backdrop: 'static',
            keyboard : false,
            templateUrl: 'capacitymanagement/customerrequestheading/tmplCurrencyChoose.tpl.html',
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


    $scope.customerRequestItemEdit = null;

    // customerRequestItems table selection logic
    $scope.customerRequestItemSelection = function(item, index) {
        if(item.isSelected) {
            if($scope.customerRequestItemEdit !== null) {
                var index1 = $scope.itemEdit.customerRequestItems.map(function(it) { return it.id; }).indexOf($scope.customerRequestItemEdit.id);
                $scope.itemEdit.customerRequestItems[index1].isSelected = false;
            }
            $scope.customerRequestItemEdit = item;
        } else {
            $scope.customerRequestItemEdit = null;
            item.isSelected = false;
        }
    };

    // New/Edit customerRequestItems dialog
    $scope.openCustomerRequestItemEditDialog = function(isNew) {
        $modal.open({
            backdrop: 'static',
            keyboard : false,
            templateUrl: 'customerrequest/customerrequestheading/tmplCustomerRequestItemEdit.tpl.html',
            size: 'lg',
            controller: 'ctrlCustomerRequestItemEdit',
            windowClass: 'hmodal-info',
            resolve: {
                itemEdit: function() {
                    if(isNew) {
                        return new ServiceCustomerRequestItem();
                    } else {
                        return $scope.customerRequestItemEdit;
                    }
                }
            }
        }).result.then(function(result) {
            var i;
            if(isNew) {
                if(!angular.isDefined($scope.itemEdit.customerRequestItems)) {
                    $scope.itemEdit.customerRequestItems = [];
                }
                $scope.itemEdit.customerRequestItems.unshift(result);
                for(i in $scope.itemEdit.customerRequestItems) {
                    $scope.itemEdit.customerRequestItems[i].isSelected = false;
                }
                $scope.customerRequestItemEdit = angular.extend(result);
                $scope.itemEdit.customerRequestItems[0].isSelected = true;
            }
            else {
                for(i in $scope.itemEdit.customerRequestItems) {
                    $scope.itemEdit.customerRequestItems[i].isSelected = false;
                }
                $scope.customerRequestItemEdit = angular.extend(result);
                var index = $scope.itemEdit.customerRequestItems.map(function(it) { return it.id; }).indexOf(result.id);
                for(var key in result) {
                    $scope.itemEdit.customerRequestItems[index][key] = result[key];
                }
                $scope.itemEdit.customerRequestItems[index].isSelected = true;
            }
        });
    };

    $scope.removeCustomerRequestItem = function(item) {
        var dialog = dialogs.confirm('Please confirm', 'Are you sure you want to delete item?');
        dialog.result.then(function(btn) {
            var removeIndex = $scope.itemEdit.customerRequestItems.map(function(it) { return it.id; }).indexOf(item.id);
            $scope.itemEdit.customerRequestItems[removeIndex].deleted = true;
        });
    };


	// Save Button
	$scope.save = function() {
		correctDateTime($scope.itemEdit.CRHRegistrationDate);
		correctDateTime($scope.itemEdit.CRHInquiryDate);
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
		return                 item.CRHDocumentNumber  &&                 item.CRHRegistrationDate  &&                 item.CRHSignNumberCustomerInquiry  &&                 item.CRHInquiryDate  ;
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


.controller('ctrlCustomerRequestHeadingChoose', ['$scope','ServiceCustomerRequestHeading', 'dialogs', '$modal', '$modalInstance', 'itemEdit',
function($scope, ServiceCustomerRequestHeading, dialogs, $modal,  $modalInstance, itemEdit) {

    // entity with properties
    $scope.itemDefinition = {
        label: 'customerrequest.customerRequestHeading',
        properties: [
            { label: 'cRHDocumentNumber', name:'CRHDocumentNumber', inTable:  true  },
            { label: 'cRHRegistrationDate', name:'CRHRegistrationDate', inTable:  true  },
            { label: 'cRHSignNumberCustomerInquiry', name:'CRHSignNumberCustomerInquiry', inTable:  true  },
            { label: 'cRHInquiryDate', name:'CRHInquiryDate', inTable:  true  },
            { label: 'cRHCustomerOrgUnit', name:'CRHCustomerOrgUnit', inTable:  false  },
            { label: 'cRHCustomerContactPerson', name:'CRHCustomerContactPerson', inTable:  false  },
            { label: 'cRHCustomerPhoneNumber', name:'CRHCustomerPhoneNumber', inTable:  false  },
            { label: 'cRHRemark', name:'CRHRemark', inTable:  false  },
            { label: 'cRHDeletedStatus', name:'CRHDeletedStatus', inTable:  false  },
        ]
    };

	$scope.items = [];
	$scope.itemEdit = {};

	// fill table with data
	$scope.loaded = false;
	var getCustomerRequestHeadings = function() {
		if(!$scope.loaded && $scope.items.length === 0) {
			$scope.isLoading = true;
			ServiceCustomerRequestHeading.query(function(data) {
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
	getCustomerRequestHeadings();

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