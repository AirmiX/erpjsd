'use strict';

angular.module('Doob.stockmanagement')


.controller('ctrlRequestForProposalHeading',['$scope', '$rootScope', '$modal', 'dialogs', 'CheckSelected', 'ServiceRequestForProposalHeading',
    function($scope, $rootScope, $modal, dialogs, CheckSelected, ServiceRequestForProposalHeading) {

	// main entity (requestForProposalHeading) properties names and labels
	$scope.itemDefinition = {
		label: 'stockmanagement.requestForProposalHeading',
		properties: [
			{ label: 'rFPHNumber', name:'RFPHNumber', inTable:  true  },
			{ label: 'rFPHIssueDate', name:'RFPHIssueDate', inTable:  true  },
			{ label: 'rFPHResponseDeadline', name:'RFPHResponseDeadline', inTable:  true  },
			{ label: 'rFPHOrganizationPart', name:'RFPHOrganizationPart', inTable:  false  },
			{ label: 'rFPHResponsiblePerson', name:'RFPHResponsiblePerson', inTable:  false  },
			{ label: 'rFPHPhoneNumber', name:'RFPHPhoneNumber', inTable:  false  },
			{ label: 'rFPHStatus', name:'RFPHStatus', inTable:  true  },
			{ label: 'rFPHRemark', name:'RFPHRemark', inTable:  false  },
			{ label: 'rFPHPrintStatus', name:'RFPHPrintStatus', inTable:  false  },
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
	// documentType with properties names and labels
	$scope.documentTypeDefinition = {
		label: 'corporation.documentType',
		properties : [
			{ label: 'dTIdentificationNumber', name:'DTIdentificationNumber' },
			{ label: 'dTName', name:'DTName' },
			{ label: 'dTShortName', name:'DTShortName' },
		]
	};
	// rfpItems with properties names and labels
	$scope.rfpItemsDefinition = {
		label: 'stockmanagement.requestForProposalItem',
		properties : [
			{ label: 'rFPIOrdinalNumber', name:'RFPIOrdinalNumber' },
			{ label: 'rFPIMeasurementUnit', name:'RFPIMeasurementUnit' },
			{ label: 'rFPIRequestedQuantity', name:'RFPIRequestedQuantity' },
			{ label: 'rFPIProcurementSourceStatus', name:'RFPIProcurementSourceStatus' },
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
	var getRequestForProposalHeadings = function() {
		if(!$scope.loaded && $scope.items.length === 0) {
			$scope.isLoading = true;
			ServiceRequestForProposalHeading.query(function(data) {
				$scope.items = data;
				$scope.isLoading = false;
				$scope.loaded = true;
			});
		}
	};
	getRequestForProposalHeadings();

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

	$scope.$watch('RequestForProposalHeadingCollection', function() {
		$scope.itemEdit = CheckSelected.checkSelectedInTable($scope.itemEdit, $scope.RequestForProposalHeadingCollection, $scope.items);
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
			templateUrl: 'stockmanagement/requestforproposalheading/tmplRequestForProposalHeadingEdit.tpl.html',
			size: 'lg',
			windowClass: 'hmodal-info',
			controller: 'ctrlRequestForProposalHeadingEdit',
			resolve: {
				itemEdit: function() {
					if(isNew) {
						return new ServiceRequestForProposalHeading();
					} else {
						return $scope.itemEdit;
					}
				},
				organizationUnitDefinition: function() {
					return $scope.organizationUnitDefinition;
				},
				documentTypeDefinition: function() {
					return $scope.documentTypeDefinition;
				},
				rfpItemsDefinition: function() {
					return $scope.rfpItemsDefinition;
				},
				offerSupplierHeadingsDefinition: function() {
					return $scope.offerSupplierHeadingsDefinition;
				},
			}
		})
		.result.then(function(result) {
			if(!angular.isDefined(result.id)) {
				ServiceRequestForProposalHeading.saveCustom('stockmanagement/requestforproposalheadings', result, function(savedObject) {
					$scope.items.unshift(savedObject);
					if($scope.itemEdit !== null) {
						var index = $scope.items.map(function(it) { return it.id; }).indexOf($scope.itemEdit.id);
						$scope.items[index].isSelected = false;
					}
					$scope.itemEdit = angular.extend(savedObject);
					$scope.items[0].isSelected = true;
				});
			 } else {
				 ServiceRequestForProposalHeading.updateCustom('stockmanagement/requestforproposalheadings/'+result.id, result, function(savedObject) {
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


.controller('ctrlRequestForProposalHeadingEdit',['$scope', 'Localization', '$modal', '$modalInstance', 'dialogs',
	'ServiceRequestForProposalHeading', 'ServiceOrganizationUnit', 'ServiceDocumentType', 'ServiceRequestForProposalItem', 'ServiceOfferSupplierHeading',   'organizationUnitDefinition',  'documentTypeDefinition',  'rfpItemsDefinition',  'offerSupplierHeadingsDefinition',   'itemEdit',
function($scope, Localization, $modal, $modalInstance, dialogs,
	ServiceRequestForProposalHeading, ServiceOrganizationUnit, ServiceDocumentType, ServiceRequestForProposalItem, ServiceOfferSupplierHeading,  organizationUnitDefinition,  documentTypeDefinition,  rfpItemsDefinition,  offerSupplierHeadingsDefinition,  itemEdit) {

	// dialog mode
	$scope.mode = 'edit';

	// original item state
	var original = angular.copy(itemEdit);
	// item state
	$scope.itemEdit = angular.copy(original);

	// organizationUnit with properties
	$scope.organizationUnitDefinition = organizationUnitDefinition;
	// documentType with properties
	$scope.documentTypeDefinition = documentTypeDefinition;
	// rfpItems with properties
	$scope.rfpItemsDefinition = rfpItemsDefinition;
	// offerSupplierHeadings with properties
	$scope.offerSupplierHeadingsDefinition = offerSupplierHeadingsDefinition;

	// datepicker logic

	// date properties
	$scope.openedRFPHIssueDate = false;
	$scope.openedRFPHResponseDeadline = false;

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
            templateUrl: 'corporation/requestforproposalheading/tmplOrganizationUnitChoose.tpl.html',
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


	// Choose documentType
	$scope.openChooseDocumentTypeDialog = function() {
        $modal.open({
            backdrop: 'static',
            keyboard : false,
            templateUrl: 'corporation/requestforproposalheading/tmplDocumentTypeChoose.tpl.html',
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


    $scope.requestForProposalItemEdit = null;

    // rfpItems table selection logic
    $scope.requestForProposalItemSelection = function(item, index) {
        if(item.isSelected) {
            if($scope.requestForProposalItemEdit !== null) {
                var index1 = $scope.itemEdit.rfpItems.map(function(it) { return it.id; }).indexOf($scope.requestForProposalItemEdit.id);
                $scope.itemEdit.rfpItems[index1].isSelected = false;
            }
            $scope.requestForProposalItemEdit = item;
        } else {
            $scope.requestForProposalItemEdit = null;
            item.isSelected = false;
        }
    };

    // New/Edit rfpItems dialog
    $scope.openRequestForProposalItemEditDialog = function(isNew) {
        $modal.open({
            backdrop: 'static',
            keyboard : false,
            templateUrl: 'stockmanagement/requestforproposalheading/tmplRequestForProposalItemEdit.tpl.html',
            size: 'lg',
            controller: 'ctrlRequestForProposalItemEdit',
            windowClass: 'hmodal-info',
            resolve: {
                itemEdit: function() {
                    if(isNew) {
                        return new ServiceRequestForProposalItem();
                    } else {
                        return $scope.requestForProposalItemEdit;
                    }
                }
            }
        }).result.then(function(result) {
            var i;
            if(isNew) {
                if(!angular.isDefined($scope.itemEdit.rfpItems)) {
                    $scope.itemEdit.rfpItems = [];
                }
                $scope.itemEdit.rfpItems.unshift(result);
                for(i in $scope.itemEdit.rfpItems) {
                    $scope.itemEdit.rfpItems[i].isSelected = false;
                }
                $scope.requestForProposalItemEdit = angular.extend(result);
                $scope.itemEdit.rfpItems[0].isSelected = true;
            }
            else {
                for(i in $scope.itemEdit.rfpItems) {
                    $scope.itemEdit.rfpItems[i].isSelected = false;
                }
                $scope.requestForProposalItemEdit = angular.extend(result);
                var index = $scope.itemEdit.rfpItems.map(function(it) { return it.id; }).indexOf(result.id);
                for(var key in result) {
                    $scope.itemEdit.rfpItems[index][key] = result[key];
                }
                $scope.itemEdit.rfpItems[index].isSelected = true;
            }
        });
    };

    $scope.removeRequestForProposalItem = function(item) {
        var dialog = dialogs.confirm('Please confirm', 'Are you sure you want to delete item?');
        dialog.result.then(function(btn) {
            var removeIndex = $scope.itemEdit.rfpItems.map(function(it) { return it.id; }).indexOf(item.id);
            $scope.itemEdit.rfpItems[removeIndex].deleted = true;
        });
    };


	// Save Button
	$scope.save = function() {
		correctDateTime($scope.itemEdit.RFPHIssueDate);
		correctDateTime($scope.itemEdit.RFPHResponseDeadline);
	   //	delete $scope.itemEdit.isSelected;
        var item;
        var i;
        for(i in $scope.itemEdit.offerSupplierHeadings) {
    		item = $scope.itemEdit.offerSupplierHeadings[i];
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
		return                 item.RFPHNumber  &&                 item.RFPHIssueDate  &&                 item.RFPHResponseDeadline  &&                 item.RFPHStatus  ;
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


.controller('ctrlRequestForProposalHeadingChoose', ['$scope','ServiceRequestForProposalHeading', 'dialogs', '$modal', '$modalInstance', 'itemEdit',
function($scope, ServiceRequestForProposalHeading, dialogs, $modal,  $modalInstance, itemEdit) {

    // entity with properties
    $scope.itemDefinition = {
        label: 'stockmanagement.requestForProposalHeading',
        properties: [
            { label: 'rFPHNumber', name:'RFPHNumber', inTable:  true  },
            { label: 'rFPHIssueDate', name:'RFPHIssueDate', inTable:  true  },
            { label: 'rFPHResponseDeadline', name:'RFPHResponseDeadline', inTable:  true  },
            { label: 'rFPHOrganizationPart', name:'RFPHOrganizationPart', inTable:  false  },
            { label: 'rFPHResponsiblePerson', name:'RFPHResponsiblePerson', inTable:  false  },
            { label: 'rFPHPhoneNumber', name:'RFPHPhoneNumber', inTable:  false  },
            { label: 'rFPHStatus', name:'RFPHStatus', inTable:  true  },
            { label: 'rFPHRemark', name:'RFPHRemark', inTable:  false  },
            { label: 'rFPHPrintStatus', name:'RFPHPrintStatus', inTable:  false  },
        ]
    };

	$scope.items = [];
	$scope.itemEdit = {};

	// fill table with data
	$scope.loaded = false;
	var getRequestForProposalHeadings = function() {
		if(!$scope.loaded && $scope.items.length === 0) {
			$scope.isLoading = true;
			ServiceRequestForProposalHeading.query(function(data) {
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
	getRequestForProposalHeadings();

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