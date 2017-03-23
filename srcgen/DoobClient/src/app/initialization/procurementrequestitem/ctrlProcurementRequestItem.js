'use strict';

angular.module('Doob.initialization')


.controller('ctrlProcurementRequestItem',['$scope', '$rootScope', '$modal', 'dialogs', 'CheckSelected', 'ServiceProcurementRequestItem',
    function($scope, $rootScope, $modal, dialogs, CheckSelected, ServiceProcurementRequestItem) {

	// main entity (procurementRequestItem) properties names and labels
	$scope.itemDefinition = {
		label: 'initialization.procurementRequestItem',
		properties: [
			{ label: 'pRIOrdinalNumber', name:'PRIOrdinalNumber', inTable:  true  },
			{ label: 'pRIRequestedQuantity', name:'PRIRequestedQuantity', inTable:  true  },
			{ label: 'pRIRealizedQuantity', name:'PRIRealizedQuantity', inTable:  true  },
			{ label: 'pRIDeadlineDate', name:'PRIDeadlineDate', inTable:  true  },
			{ label: 'pRISupplyStatus', name:'PRISupplyStatus', inTable:  true  },
			{ label: 'pRIApprovalDate', name:'PRIApprovalDate', inTable:  false  },
			{ label: 'pRISpecialApprovalDate', name:'PRISpecialApprovalDate', inTable:  false  },
			{ label: 'pRISpecialApprovalStatus', name:'PRISpecialApprovalStatus', inTable:  false  },
			{ label: 'pRIFinalApprovedQuantity', name:'PRIFinalApprovedQuantity', inTable:  false  },
			{ label: 'pRIIncludedQunatityInPlan', name:'PRIIncludedQunatityInPlan', inTable:  true  },
			{ label: 'pRIResolutionStatus', name:'PRIResolutionStatus', inTable:  true  },
			{ label: 'pRIRemark', name:'PRIRemark', inTable:  false  },
			{ label: 'pRIListStatusPrinting', name:'PRIListStatusPrinting', inTable:  false  },
			{ label: 'pRIEarlierMaturity', name:'PRIEarlierMaturity', inTable:  false  },
			{ label: 'pRISettlementClaimsProcedure', name:'PRISettlementClaimsProcedure', inTable:  false  },
			{ label: 'pRIDeletedStatus', name:'PRIDeletedStatus', inTable:  false  },
			{ label: 'mUIdentificationCode', name:'MUIdentificationCode', inTable:  true  },
		]
	};

	// supplier with properties names and labels
	$scope.supplierDefinition = {
		label: 'commonbusinessentities.identification',
		properties : [
			{ label: 'iIdentificationCode', name:'IIdentificationCode' },
		]
	};
	// procurementPlanItem with properties names and labels
	$scope.procurementPlanItemDefinition = {
		label: 'initialization.procurementPlanItem',
		properties : [
			{ label: 'pPIOrdinalNumber', name:'PPIOrdinalNumber' },
			{ label: 'pPIPlannedQuantity', name:'PPIPlannedQuantity' },
			{ label: 'pPIOrderedQuantity', name:'PPIOrderedQuantity' },
			{ label: 'pPIRecievedQuantity', name:'PPIRecievedQuantity' },
			{ label: 'pPISourceProvider', name:'PPISourceProvider' },
			{ label: 'mUIdentificationCode', name:'MUIdentificationCode' },
		]
	};
	// identification with properties names and labels
	$scope.identificationDefinition = {
		label: 'commonbusinessentities.identification',
		properties : [
			{ label: 'iIdentificationCode', name:'IIdentificationCode' },
		]
	};
	// procurementRequestHeader with properties names and labels
	$scope.procurementRequestHeaderDefinition = {
		label: 'initialization.procurementRequestHeading',
		properties : [
			{ label: 'pRHCode', name:'PRHCode' },
			{ label: 'pRHCreationDate', name:'PRHCreationDate' },
		]
	};
	// procurementRequestSettlements with properties names and labels
	$scope.procurementRequestSettlementsDefinition = {
		label: 'logical.procurementRequestSettlement',
		properties : [
			{ label: 'pRSDate', name:'PRSDate' },
			{ label: 'pRSQuantity', name:'PRSQuantity' },
			{ label: 'pRSRequestedReceivedListStatus', name:'PRSRequestedReceivedListStatus' },
		]
	};
	// revokedProcurementRequests with properties names and labels
	$scope.revokedProcurementRequestsDefinition = {
		label: 'stockmanagement.revokedProcurementRequest',
		properties : [
			{ label: 'rPRDate', name:'RPRDate' },
			{ label: 'rPRIdentificationNumber', name:'RPRIdentificationNumber' },
			{ label: 'rPRMeasurementUnit', name:'RPRMeasurementUnit' },
			{ label: 'rPRQuantityRequested', name:'RPRQuantityRequested' },
			{ label: 'rPRQuantityRealized', name:'RPRQuantityRealized' },
			{ label: 'rPRProcurementDeadline', name:'RPRProcurementDeadline' },
			{ label: 'rPRWorkOrderContractPlace', name:'RPRWorkOrderContractPlace' },
		]
	};

	// fill table with data
	$scope.items = [];
	$scope.loaded = false;
	var getProcurementRequestItems = function() {
		if(!$scope.loaded && $scope.items.length === 0) {
			$scope.isLoading = true;
			ServiceProcurementRequestItem.query(function(data) {
				$scope.items = data;
				$scope.isLoading = false;
				$scope.loaded = true;
			});
		}
	};
	getProcurementRequestItems();

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

	$scope.$watch('ProcurementRequestItemCollection', function() {
		$scope.itemEdit = CheckSelected.checkSelectedInTable($scope.itemEdit, $scope.ProcurementRequestItemCollection, $scope.items);
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
			templateUrl: 'initialization/procurementrequestitem/tmplProcurementRequestItemEdit.tpl.html',
			size: 'lg',
			windowClass: 'hmodal-info',
			controller: 'ctrlProcurementRequestItemEdit',
			resolve: {
				itemEdit: function() {
					if(isNew) {
						return new ServiceProcurementRequestItem();
					} else {
						return $scope.itemEdit;
					}
				},
				supplierDefinition: function() {
					return $scope.supplierDefinition;
				},
				procurementPlanItemDefinition: function() {
					return $scope.procurementPlanItemDefinition;
				},
				identificationDefinition: function() {
					return $scope.identificationDefinition;
				},
				procurementRequestHeaderDefinition: function() {
					return $scope.procurementRequestHeaderDefinition;
				},
				procurementRequestSettlementsDefinition: function() {
					return $scope.procurementRequestSettlementsDefinition;
				},
				revokedProcurementRequestsDefinition: function() {
					return $scope.revokedProcurementRequestsDefinition;
				},
			}
		})
		.result.then(function(result) {
			if(!angular.isDefined(result.id)) {
				ServiceProcurementRequestItem.saveCustom('stockmanagement/procurementrequestitems', result, function(savedObject) {
					$scope.items.unshift(savedObject);
					if($scope.itemEdit !== null) {
						var index = $scope.items.map(function(it) { return it.id; }).indexOf($scope.itemEdit.id);
						$scope.items[index].isSelected = false;
					}
					$scope.itemEdit = angular.extend(savedObject);
					$scope.items[0].isSelected = true;
				});
			 } else {
				 ServiceProcurementRequestItem.updateCustom('stockmanagement/procurementrequestitems/'+result.id, result, function(savedObject) {
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


.controller('ctrlProcurementRequestItemEdit',['$scope', 'Localization', '$modal', '$modalInstance', 'dialogs',
	'ServiceProcurementRequestItem', 'ServiceIdentification', 'ServiceProcurementPlanItem', 'ServiceProcurementRequestHeading', 'ServiceProcurementRequestSettlement', 'ServiceRevokedProcurementRequest',   'supplierDefinition',  'procurementPlanItemDefinition',  'identificationDefinition',  'procurementRequestHeaderDefinition',  'procurementRequestSettlementsDefinition',  'revokedProcurementRequestsDefinition',   'itemEdit',
function($scope, Localization, $modal, $modalInstance, dialogs,
	ServiceProcurementRequestItem, ServiceIdentification, ServiceProcurementPlanItem, ServiceProcurementRequestHeading, ServiceProcurementRequestSettlement, ServiceRevokedProcurementRequest,  supplierDefinition,  procurementPlanItemDefinition,  identificationDefinition,  procurementRequestHeaderDefinition,  procurementRequestSettlementsDefinition,  revokedProcurementRequestsDefinition,  itemEdit) {

	// dialog mode
	$scope.mode = 'edit';

	// original item state
	var original = angular.copy(itemEdit);
	// item state
	$scope.itemEdit = angular.copy(original);

	// supplier with properties
	$scope.supplierDefinition = supplierDefinition;
	// procurementPlanItem with properties
	$scope.procurementPlanItemDefinition = procurementPlanItemDefinition;
	// identification with properties
	$scope.identificationDefinition = identificationDefinition;
	// procurementRequestHeader with properties
	$scope.procurementRequestHeaderDefinition = procurementRequestHeaderDefinition;
	// procurementRequestSettlements with properties
	$scope.procurementRequestSettlementsDefinition = procurementRequestSettlementsDefinition;
	// revokedProcurementRequests with properties
	$scope.revokedProcurementRequestsDefinition = revokedProcurementRequestsDefinition;

	// datepicker logic

	// date properties
	$scope.openedPRIDeadlineDate = false;
	$scope.openedPRIApprovalDate = false;
	$scope.openedPRISpecialApprovalDate = false;

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
            templateUrl: 'commonbusinessentities/procurementrequestitem/tmplIdentificationChoose.tpl.html',
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


	// Choose procurementPlanItem
	$scope.openChooseProcurementPlanItemDialog = function() {
        $modal.open({
            backdrop: 'static',
            keyboard : false,
            templateUrl: 'initialization/procurementrequestitem/tmplProcurementPlanItemChoose.tpl.html',
            size: 'lg',
            controller: 'ctrlProcurementPlanItemChoose',
            windowClass: 'hmodal-info',
            resolve: {
				itemEdit: function() {
					if(angular.isDefined($scope.itemEdit.procurementPlanItem)){
						return $scope.itemEdit.procurementPlanItem;
					}
				}
			}
		}).result.then(function(result) {
			$scope.itemEdit.procurementPlanItem = angular.copy(result);
		});
    };


	// Choose identification
	$scope.openChooseIdentificationDialog = function() {
        $modal.open({
            backdrop: 'static',
            keyboard : false,
            templateUrl: 'commonbusinessentities/procurementrequestitem/tmplIdentificationChoose.tpl.html',
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


	// Choose procurementRequestHeader
	$scope.openChooseProcurementRequestHeaderDialog = function() {
        $modal.open({
            backdrop: 'static',
            keyboard : false,
            templateUrl: 'initialization/procurementrequestitem/tmplProcurementRequestHeadingChoose.tpl.html',
            size: 'lg',
            controller: 'ctrlProcurementRequestHeadingChoose',
            windowClass: 'hmodal-info',
            resolve: {
				itemEdit: function() {
					if(angular.isDefined($scope.itemEdit.procurementRequestHeader)){
						return $scope.itemEdit.procurementRequestHeader;
					}
				}
			}
		}).result.then(function(result) {
			$scope.itemEdit.procurementRequestHeader = angular.copy(result);
		});
    };


    $scope.procurementRequestSettlementEdit = null;

    // procurementRequestSettlements table selection logic
    $scope.procurementRequestSettlementSelection = function(item, index) {
        if(item.isSelected) {
            if($scope.procurementRequestSettlementEdit !== null) {
                var index1 = $scope.itemEdit.procurementRequestSettlements.map(function(it) { return it.id; }).indexOf($scope.procurementRequestSettlementEdit.id);
                $scope.itemEdit.procurementRequestSettlements[index1].isSelected = false;
            }
            $scope.procurementRequestSettlementEdit = item;
        } else {
            $scope.procurementRequestSettlementEdit = null;
            item.isSelected = false;
        }
    };

    // New/Edit procurementRequestSettlements dialog
    $scope.openProcurementRequestSettlementEditDialog = function(isNew) {
        $modal.open({
            backdrop: 'static',
            keyboard : false,
            templateUrl: 'logical/procurementrequestitem/tmplProcurementRequestSettlementEdit.tpl.html',
            size: 'lg',
            controller: 'ctrlProcurementRequestSettlementEdit',
            windowClass: 'hmodal-info',
            resolve: {
                itemEdit: function() {
                    if(isNew) {
                        return new ServiceProcurementRequestSettlement();
                    } else {
                        return $scope.procurementRequestSettlementEdit;
                    }
                }
            }
        }).result.then(function(result) {
            var i;
            if(isNew) {
                if(!angular.isDefined($scope.itemEdit.procurementRequestSettlements)) {
                    $scope.itemEdit.procurementRequestSettlements = [];
                }
                $scope.itemEdit.procurementRequestSettlements.unshift(result);
                for(i in $scope.itemEdit.procurementRequestSettlements) {
                    $scope.itemEdit.procurementRequestSettlements[i].isSelected = false;
                }
                $scope.procurementRequestSettlementEdit = angular.extend(result);
                $scope.itemEdit.procurementRequestSettlements[0].isSelected = true;
            }
            else {
                for(i in $scope.itemEdit.procurementRequestSettlements) {
                    $scope.itemEdit.procurementRequestSettlements[i].isSelected = false;
                }
                $scope.procurementRequestSettlementEdit = angular.extend(result);
                var index = $scope.itemEdit.procurementRequestSettlements.map(function(it) { return it.id; }).indexOf(result.id);
                for(var key in result) {
                    $scope.itemEdit.procurementRequestSettlements[index][key] = result[key];
                }
                $scope.itemEdit.procurementRequestSettlements[index].isSelected = true;
            }
        });
    };

    $scope.removeProcurementRequestSettlement = function(item) {
        var dialog = dialogs.confirm('Please confirm', 'Are you sure you want to delete item?');
        dialog.result.then(function(btn) {
            var removeIndex = $scope.itemEdit.procurementRequestSettlements.map(function(it) { return it.id; }).indexOf(item.id);
            $scope.itemEdit.procurementRequestSettlements[removeIndex].deleted = true;
        });
    };


    $scope.revokedProcurementRequestEdit = null;

    // revokedProcurementRequests table selection logic
    $scope.revokedProcurementRequestSelection = function(item, index) {
        if(item.isSelected) {
            if($scope.revokedProcurementRequestEdit !== null) {
                var index1 = $scope.itemEdit.revokedProcurementRequests.map(function(it) { return it.id; }).indexOf($scope.revokedProcurementRequestEdit.id);
                $scope.itemEdit.revokedProcurementRequests[index1].isSelected = false;
            }
            $scope.revokedProcurementRequestEdit = item;
        } else {
            $scope.revokedProcurementRequestEdit = null;
            item.isSelected = false;
        }
    };

    // New/Edit revokedProcurementRequests dialog
    $scope.openRevokedProcurementRequestEditDialog = function(isNew) {
        $modal.open({
            backdrop: 'static',
            keyboard : false,
            templateUrl: 'stockmanagement/procurementrequestitem/tmplRevokedProcurementRequestEdit.tpl.html',
            size: 'lg',
            controller: 'ctrlRevokedProcurementRequestEdit',
            windowClass: 'hmodal-info',
            resolve: {
                itemEdit: function() {
                    if(isNew) {
                        return new ServiceRevokedProcurementRequest();
                    } else {
                        return $scope.revokedProcurementRequestEdit;
                    }
                }
            }
        }).result.then(function(result) {
            var i;
            if(isNew) {
                if(!angular.isDefined($scope.itemEdit.revokedProcurementRequests)) {
                    $scope.itemEdit.revokedProcurementRequests = [];
                }
                $scope.itemEdit.revokedProcurementRequests.unshift(result);
                for(i in $scope.itemEdit.revokedProcurementRequests) {
                    $scope.itemEdit.revokedProcurementRequests[i].isSelected = false;
                }
                $scope.revokedProcurementRequestEdit = angular.extend(result);
                $scope.itemEdit.revokedProcurementRequests[0].isSelected = true;
            }
            else {
                for(i in $scope.itemEdit.revokedProcurementRequests) {
                    $scope.itemEdit.revokedProcurementRequests[i].isSelected = false;
                }
                $scope.revokedProcurementRequestEdit = angular.extend(result);
                var index = $scope.itemEdit.revokedProcurementRequests.map(function(it) { return it.id; }).indexOf(result.id);
                for(var key in result) {
                    $scope.itemEdit.revokedProcurementRequests[index][key] = result[key];
                }
                $scope.itemEdit.revokedProcurementRequests[index].isSelected = true;
            }
        });
    };

    $scope.removeRevokedProcurementRequest = function(item) {
        var dialog = dialogs.confirm('Please confirm', 'Are you sure you want to delete item?');
        dialog.result.then(function(btn) {
            var removeIndex = $scope.itemEdit.revokedProcurementRequests.map(function(it) { return it.id; }).indexOf(item.id);
            $scope.itemEdit.revokedProcurementRequests[removeIndex].deleted = true;
        });
    };


	// Save Button
	$scope.save = function() {
		correctDateTime($scope.itemEdit.PRIDeadlineDate);
		correctDateTime($scope.itemEdit.PRIApprovalDate);
		correctDateTime($scope.itemEdit.PRISpecialApprovalDate);
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
		return                 item.PRIOrdinalNumber  &&                 item.PRIRequestedQuantity  &&                 item.PRIRealizedQuantity  &&                 item.PRIDeadlineDate  &&                 item.PRISupplyStatus  &&                 item.PRIIncludedQunatityInPlan  &&                 item.PRIResolutionStatus  &&                 item.MUIdentificationCode  ;
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


.controller('ctrlProcurementRequestItemChoose', ['$scope','ServiceProcurementRequestItem', 'dialogs', '$modal', '$modalInstance', 'itemEdit',
function($scope, ServiceProcurementRequestItem, dialogs, $modal,  $modalInstance, itemEdit) {

    // entity with properties
    $scope.itemDefinition = {
        label: 'initialization.procurementRequestItem',
        properties: [
            { label: 'pRIOrdinalNumber', name:'PRIOrdinalNumber', inTable:  true  },
            { label: 'pRIRequestedQuantity', name:'PRIRequestedQuantity', inTable:  true  },
            { label: 'pRIRealizedQuantity', name:'PRIRealizedQuantity', inTable:  true  },
            { label: 'pRIDeadlineDate', name:'PRIDeadlineDate', inTable:  true  },
            { label: 'pRISupplyStatus', name:'PRISupplyStatus', inTable:  true  },
            { label: 'pRIApprovalDate', name:'PRIApprovalDate', inTable:  false  },
            { label: 'pRISpecialApprovalDate', name:'PRISpecialApprovalDate', inTable:  false  },
            { label: 'pRISpecialApprovalStatus', name:'PRISpecialApprovalStatus', inTable:  false  },
            { label: 'pRIFinalApprovedQuantity', name:'PRIFinalApprovedQuantity', inTable:  false  },
            { label: 'pRIIncludedQunatityInPlan', name:'PRIIncludedQunatityInPlan', inTable:  true  },
            { label: 'pRIResolutionStatus', name:'PRIResolutionStatus', inTable:  true  },
            { label: 'pRIRemark', name:'PRIRemark', inTable:  false  },
            { label: 'pRIListStatusPrinting', name:'PRIListStatusPrinting', inTable:  false  },
            { label: 'pRIEarlierMaturity', name:'PRIEarlierMaturity', inTable:  false  },
            { label: 'pRISettlementClaimsProcedure', name:'PRISettlementClaimsProcedure', inTable:  false  },
            { label: 'pRIDeletedStatus', name:'PRIDeletedStatus', inTable:  false  },
            { label: 'mUIdentificationCode', name:'MUIdentificationCode', inTable:  true  },
        ]
    };

	$scope.items = [];
	$scope.itemEdit = {};

	// fill table with data
	$scope.loaded = false;
	var getProcurementRequestItems = function() {
		if(!$scope.loaded && $scope.items.length === 0) {
			$scope.isLoading = true;
			ServiceProcurementRequestItem.query(function(data) {
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
	getProcurementRequestItems();

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