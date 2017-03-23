'use strict';

angular.module('Doob.stockmanagement')


.controller('ctrlRequisition',['$scope', '$rootScope', '$modal', 'dialogs', 'CheckSelected', 'ServiceRequisition',
    function($scope, $rootScope, $modal, dialogs, CheckSelected, ServiceRequisition) {

	// main entity (requisition) properties names and labels
	$scope.itemDefinition = {
		label: 'stockmanagement.requisition',
		properties: [
			{ label: 'rDocumentNumber', name:'RDocumentNumber', inTable:  true  },
			{ label: 'rReservationDate', name:'RReservationDate', inTable:  true  },
			{ label: 'rRequisitionDate', name:'RRequisitionDate', inTable:  false  },
			{ label: 'rApprovalDate', name:'RApprovalDate', inTable:  false  },
			{ label: 'rQuantityLaunched', name:'RQuantityLaunched', inTable:  true  },
			{ label: 'rStornoDocumentNumber', name:'RStornoDocumentNumber', inTable:  false  },
			{ label: 'rStatusIndicator', name:'RStatusIndicator', inTable:  true  },
			{ label: 'rPrintDate', name:'RPrintDate', inTable:  true  },
			{ label: 'rEntered', name:'REntered', inTable:  false  },
			{ label: 'rTransactionLogPrint', name:'RTransactionLogPrint', inTable:  false  },
			{ label: 'rOldDocument', name:'ROldDocument', inTable:  false  },
			{ label: 'rLogNumber', name:'RLogNumber', inTable:  false  },
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
	// organizationUnit with properties names and labels
	$scope.organizationUnitDefinition = {
		label: 'corporation.organizationUnit',
		properties : [
			{ label: 'oUIdentificationCode', name:'OUIdentificationCode' },
			{ label: 'oUName', name:'OUName' },
		]
	};
	// workOrder with properties names and labels
	$scope.workOrderDefinition = {
		label: 'initialization.workOrder',
		properties : [
			{ label: 'wOCode', name:'WOCode' },
			{ label: 'wOCreationDate', name:'WOCreationDate' },
			{ label: 'wOScheduledDate', name:'WOScheduledDate' },
			{ label: 'wOLuanchedQuantity', name:'WOLuanchedQuantity' },
			{ label: 'wOAcceptedQuantity', name:'WOAcceptedQuantity' },
			{ label: 'wORejectedQuantity', name:'WORejectedQuantity' },
			{ label: 'wOZanovljenaQuantity', name:'WOZanovljenaQuantity' },
			{ label: 'wOCalculationStatus', name:'WOCalculationStatus' },
			{ label: 'tISDesignation', name:'TISDesignation' },
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
	// requisitionItems with properties names and labels
	$scope.requisitionItemsDefinition = {
		label: 'stockmanagement.requisitionItem',
		properties : [
			{ label: 'rIOrdinalNumber', name:'RIOrdinalNumber' },
			{ label: 'rILocationAddress', name:'RILocationAddress' },
			{ label: 'rIQuantityStandardized', name:'RIQuantityStandardized' },
			{ label: 'rIQuantityRequisitioned', name:'RIQuantityRequisitioned' },
			{ label: 'rIQuantityReserved', name:'RIQuantityReserved' },
			{ label: 'rIQuantityIssued', name:'RIQuantityIssued' },
			{ label: 'rIBookValueAmmount', name:'RIBookValueAmmount' },
			{ label: 'rIPriceDesignation', name:'RIPriceDesignation' },
			{ label: 'rIPostingPosition', name:'RIPostingPosition' },
			{ label: 'rIAmmountAfterPosting', name:'RIAmmountAfterPosting' },
			{ label: 'rIStatusReservedNotIssued', name:'RIStatusReservedNotIssued' },
		]
	};

	// fill table with data
	$scope.items = [];
	$scope.loaded = false;
	var getRequisitions = function() {
		if(!$scope.loaded && $scope.items.length === 0) {
			$scope.isLoading = true;
			ServiceRequisition.query(function(data) {
				$scope.items = data;
				$scope.isLoading = false;
				$scope.loaded = true;
			});
		}
	};
	getRequisitions();

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

	$scope.$watch('RequisitionCollection', function() {
		$scope.itemEdit = CheckSelected.checkSelectedInTable($scope.itemEdit, $scope.RequisitionCollection, $scope.items);
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
			templateUrl: 'stockmanagement/requisition/tmplRequisitionEdit.tpl.html',
			size: 'lg',
			windowClass: 'hmodal-info',
			controller: 'ctrlRequisitionEdit',
			resolve: {
				itemEdit: function() {
					if(isNew) {
						return new ServiceRequisition();
					} else {
						return $scope.itemEdit;
					}
				},
				documentTypeDefinition: function() {
					return $scope.documentTypeDefinition;
				},
				organizationUnitDefinition: function() {
					return $scope.organizationUnitDefinition;
				},
				workOrderDefinition: function() {
					return $scope.workOrderDefinition;
				},
				stockroomDefinition: function() {
					return $scope.stockroomDefinition;
				},
				requisitionItemsDefinition: function() {
					return $scope.requisitionItemsDefinition;
				},
			}
		})
		.result.then(function(result) {
			if(!angular.isDefined(result.id)) {
				ServiceRequisition.saveCustom('stockmanagement/requisitions', result, function(savedObject) {
					$scope.items.unshift(savedObject);
					if($scope.itemEdit !== null) {
						var index = $scope.items.map(function(it) { return it.id; }).indexOf($scope.itemEdit.id);
						$scope.items[index].isSelected = false;
					}
					$scope.itemEdit = angular.extend(savedObject);
					$scope.items[0].isSelected = true;
				});
			 } else {
				 ServiceRequisition.updateCustom('stockmanagement/requisitions/'+result.id, result, function(savedObject) {
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


.controller('ctrlRequisitionEdit',['$scope', 'Localization', '$modal', '$modalInstance', 'dialogs',
	'ServiceRequisition', 'ServiceDocumentType', 'ServiceOrganizationUnit', 'ServiceWorkOrder', 'ServiceStockroom', 'ServiceRequisitionItem',   'documentTypeDefinition',  'organizationUnitDefinition',  'workOrderDefinition',  'stockroomDefinition',  'requisitionItemsDefinition',   'itemEdit',
function($scope, Localization, $modal, $modalInstance, dialogs,
	ServiceRequisition, ServiceDocumentType, ServiceOrganizationUnit, ServiceWorkOrder, ServiceStockroom, ServiceRequisitionItem,  documentTypeDefinition,  organizationUnitDefinition,  workOrderDefinition,  stockroomDefinition,  requisitionItemsDefinition,  itemEdit) {

	// dialog mode
	$scope.mode = 'edit';

	// original item state
	var original = angular.copy(itemEdit);
	// item state
	$scope.itemEdit = angular.copy(original);

	// documentType with properties
	$scope.documentTypeDefinition = documentTypeDefinition;
	// organizationUnit with properties
	$scope.organizationUnitDefinition = organizationUnitDefinition;
	// workOrder with properties
	$scope.workOrderDefinition = workOrderDefinition;
	// stockroom with properties
	$scope.stockroomDefinition = stockroomDefinition;
	// requisitionItems with properties
	$scope.requisitionItemsDefinition = requisitionItemsDefinition;

	// datepicker logic

	// date properties
	$scope.openedRReservationDate = false;
	$scope.openedRRequisitionDate = false;
	$scope.openedRApprovalDate = false;
	$scope.openedRPrintDate = false;

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
            templateUrl: 'corporation/requisition/tmplDocumentTypeChoose.tpl.html',
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


	// Choose organizationUnit
	$scope.openChooseOrganizationUnitDialog = function() {
        $modal.open({
            backdrop: 'static',
            keyboard : false,
            templateUrl: 'corporation/requisition/tmplOrganizationUnitChoose.tpl.html',
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


	// Choose workOrder
	$scope.openChooseWorkOrderDialog = function() {
        $modal.open({
            backdrop: 'static',
            keyboard : false,
            templateUrl: 'initialization/requisition/tmplWorkOrderChoose.tpl.html',
            size: 'lg',
            controller: 'ctrlWorkOrderChoose',
            windowClass: 'hmodal-info',
            resolve: {
				itemEdit: function() {
					if(angular.isDefined($scope.itemEdit.workOrder)){
						return $scope.itemEdit.workOrder;
					}
				}
			}
		}).result.then(function(result) {
			$scope.itemEdit.workOrder = angular.copy(result);
		});
    };


	// Choose stockroom
	$scope.openChooseStockroomDialog = function() {
        $modal.open({
            backdrop: 'static',
            keyboard : false,
            templateUrl: 'stock/requisition/tmplStockroomChoose.tpl.html',
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


    $scope.requisitionItemEdit = null;

    // requisitionItems table selection logic
    $scope.requisitionItemSelection = function(item, index) {
        if(item.isSelected) {
            if($scope.requisitionItemEdit !== null) {
                var index1 = $scope.itemEdit.requisitionItems.map(function(it) { return it.id; }).indexOf($scope.requisitionItemEdit.id);
                $scope.itemEdit.requisitionItems[index1].isSelected = false;
            }
            $scope.requisitionItemEdit = item;
        } else {
            $scope.requisitionItemEdit = null;
            item.isSelected = false;
        }
    };

    // New/Edit requisitionItems dialog
    $scope.openRequisitionItemEditDialog = function(isNew) {
        $modal.open({
            backdrop: 'static',
            keyboard : false,
            templateUrl: 'stockmanagement/requisition/tmplRequisitionItemEdit.tpl.html',
            size: 'lg',
            controller: 'ctrlRequisitionItemEdit',
            windowClass: 'hmodal-info',
            resolve: {
                itemEdit: function() {
                    if(isNew) {
                        return new ServiceRequisitionItem();
                    } else {
                        return $scope.requisitionItemEdit;
                    }
                }
            }
        }).result.then(function(result) {
            var i;
            if(isNew) {
                if(!angular.isDefined($scope.itemEdit.requisitionItems)) {
                    $scope.itemEdit.requisitionItems = [];
                }
                $scope.itemEdit.requisitionItems.unshift(result);
                for(i in $scope.itemEdit.requisitionItems) {
                    $scope.itemEdit.requisitionItems[i].isSelected = false;
                }
                $scope.requisitionItemEdit = angular.extend(result);
                $scope.itemEdit.requisitionItems[0].isSelected = true;
            }
            else {
                for(i in $scope.itemEdit.requisitionItems) {
                    $scope.itemEdit.requisitionItems[i].isSelected = false;
                }
                $scope.requisitionItemEdit = angular.extend(result);
                var index = $scope.itemEdit.requisitionItems.map(function(it) { return it.id; }).indexOf(result.id);
                for(var key in result) {
                    $scope.itemEdit.requisitionItems[index][key] = result[key];
                }
                $scope.itemEdit.requisitionItems[index].isSelected = true;
            }
        });
    };

    $scope.removeRequisitionItem = function(item) {
        var dialog = dialogs.confirm('Please confirm', 'Are you sure you want to delete item?');
        dialog.result.then(function(btn) {
            var removeIndex = $scope.itemEdit.requisitionItems.map(function(it) { return it.id; }).indexOf(item.id);
            $scope.itemEdit.requisitionItems[removeIndex].deleted = true;
        });
    };


	// Save Button
	$scope.save = function() {
		correctDateTime($scope.itemEdit.RReservationDate);
		correctDateTime($scope.itemEdit.RRequisitionDate);
		correctDateTime($scope.itemEdit.RApprovalDate);
		correctDateTime($scope.itemEdit.RPrintDate);
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
		return                 item.RDocumentNumber  &&                 item.RReservationDate  &&                 item.RQuantityLaunched  &&                 item.RStatusIndicator  &&                 item.RPrintDate  ;
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


.controller('ctrlRequisitionChoose', ['$scope','ServiceRequisition', 'dialogs', '$modal', '$modalInstance', 'itemEdit',
function($scope, ServiceRequisition, dialogs, $modal,  $modalInstance, itemEdit) {

    // entity with properties
    $scope.itemDefinition = {
        label: 'stockmanagement.requisition',
        properties: [
            { label: 'rDocumentNumber', name:'RDocumentNumber', inTable:  true  },
            { label: 'rReservationDate', name:'RReservationDate', inTable:  true  },
            { label: 'rRequisitionDate', name:'RRequisitionDate', inTable:  false  },
            { label: 'rApprovalDate', name:'RApprovalDate', inTable:  false  },
            { label: 'rQuantityLaunched', name:'RQuantityLaunched', inTable:  true  },
            { label: 'rStornoDocumentNumber', name:'RStornoDocumentNumber', inTable:  false  },
            { label: 'rStatusIndicator', name:'RStatusIndicator', inTable:  true  },
            { label: 'rPrintDate', name:'RPrintDate', inTable:  true  },
            { label: 'rEntered', name:'REntered', inTable:  false  },
            { label: 'rTransactionLogPrint', name:'RTransactionLogPrint', inTable:  false  },
            { label: 'rOldDocument', name:'ROldDocument', inTable:  false  },
            { label: 'rLogNumber', name:'RLogNumber', inTable:  false  },
        ]
    };

	$scope.items = [];
	$scope.itemEdit = {};

	// fill table with data
	$scope.loaded = false;
	var getRequisitions = function() {
		if(!$scope.loaded && $scope.items.length === 0) {
			$scope.isLoading = true;
			ServiceRequisition.query(function(data) {
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
	getRequisitions();

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