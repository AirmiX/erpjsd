'use strict';

angular.module('Doob.stockmanagement')


.controller('ctrlMaterialReturnNote',['$scope', '$rootScope', '$modal', 'dialogs', 'CheckSelected', 'ServiceMaterialReturnNote',
    function($scope, $rootScope, $modal, dialogs, CheckSelected, ServiceMaterialReturnNote) {

	// main entity (materialReturnNote) properties names and labels
	$scope.itemDefinition = {
		label: 'stockmanagement.materialReturnNote',
		properties: [
			{ label: 'mRNDocumentNumber', name:'MRNDocumentNumber', inTable:  true  },
			{ label: 'mRNOldDocument', name:'MRNOldDocument', inTable:  false  },
			{ label: 'mRNIssuanceDate', name:'MRNIssuanceDate', inTable:  true  },
			{ label: 'mRNDocumentStatus', name:'MRNDocumentStatus', inTable:  true  },
			{ label: 'mRNRequisitionNumber', name:'MRNRequisitionNumber', inTable:  false  },
			{ label: 'mRNStornoDocumentNumber', name:'MRNStornoDocumentNumber', inTable:  false  },
			{ label: 'mRNPrintStatus', name:'MRNPrintStatus', inTable:  true  },
			{ label: 'mRNTransactionLogPrint', name:'MRNTransactionLogPrint', inTable:  true  },
			{ label: 'mRNLogNumber', name:'MRNLogNumber', inTable:  false  },
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
	// documentType with properties names and labels
	$scope.documentTypeDefinition = {
		label: 'corporation.documentType',
		properties : [
			{ label: 'dTIdentificationNumber', name:'DTIdentificationNumber' },
			{ label: 'dTName', name:'DTName' },
			{ label: 'dTShortName', name:'DTShortName' },
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
	// materialReturnNoteItems with properties names and labels
	$scope.materialReturnNoteItemsDefinition = {
		label: 'stockmanagement.materialReturnNoteItem',
		properties : [
			{ label: 'mRNIOrdinalNumber', name:'MRNIOrdinalNumber' },
			{ label: 'mRNIQuantityReturned', name:'MRNIQuantityReturned' },
			{ label: 'mRNIPriceDesignation', name:'MRNIPriceDesignation' },
		]
	};

	// fill table with data
	$scope.items = [];
	$scope.loaded = false;
	var getMaterialReturnNotes = function() {
		if(!$scope.loaded && $scope.items.length === 0) {
			$scope.isLoading = true;
			ServiceMaterialReturnNote.query(function(data) {
				$scope.items = data;
				$scope.isLoading = false;
				$scope.loaded = true;
			});
		}
	};
	getMaterialReturnNotes();

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

	$scope.$watch('MaterialReturnNoteCollection', function() {
		$scope.itemEdit = CheckSelected.checkSelectedInTable($scope.itemEdit, $scope.MaterialReturnNoteCollection, $scope.items);
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
			templateUrl: 'stockmanagement/materialreturnnote/tmplMaterialReturnNoteEdit.tpl.html',
			size: 'lg',
			windowClass: 'hmodal-info',
			controller: 'ctrlMaterialReturnNoteEdit',
			resolve: {
				itemEdit: function() {
					if(isNew) {
						return new ServiceMaterialReturnNote();
					} else {
						return $scope.itemEdit;
					}
				},
				organizationUnitDefinition: function() {
					return $scope.organizationUnitDefinition;
				},
				stockroomDefinition: function() {
					return $scope.stockroomDefinition;
				},
				documentTypeDefinition: function() {
					return $scope.documentTypeDefinition;
				},
				workOrderDefinition: function() {
					return $scope.workOrderDefinition;
				},
				materialReturnNoteItemsDefinition: function() {
					return $scope.materialReturnNoteItemsDefinition;
				},
			}
		})
		.result.then(function(result) {
			if(!angular.isDefined(result.id)) {
				ServiceMaterialReturnNote.saveCustom('stockmanagement/materialreturnnotes', result, function(savedObject) {
					$scope.items.unshift(savedObject);
					if($scope.itemEdit !== null) {
						var index = $scope.items.map(function(it) { return it.id; }).indexOf($scope.itemEdit.id);
						$scope.items[index].isSelected = false;
					}
					$scope.itemEdit = angular.extend(savedObject);
					$scope.items[0].isSelected = true;
				});
			 } else {
				 ServiceMaterialReturnNote.updateCustom('stockmanagement/materialreturnnotes/'+result.id, result, function(savedObject) {
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


.controller('ctrlMaterialReturnNoteEdit',['$scope', 'Localization', '$modal', '$modalInstance', 'dialogs',
	'ServiceMaterialReturnNote', 'ServiceOrganizationUnit', 'ServiceStockroom', 'ServiceDocumentType', 'ServiceWorkOrder', 'ServiceMaterialReturnNoteItem',   'organizationUnitDefinition',  'stockroomDefinition',  'documentTypeDefinition',  'workOrderDefinition',  'materialReturnNoteItemsDefinition',   'itemEdit',
function($scope, Localization, $modal, $modalInstance, dialogs,
	ServiceMaterialReturnNote, ServiceOrganizationUnit, ServiceStockroom, ServiceDocumentType, ServiceWorkOrder, ServiceMaterialReturnNoteItem,  organizationUnitDefinition,  stockroomDefinition,  documentTypeDefinition,  workOrderDefinition,  materialReturnNoteItemsDefinition,  itemEdit) {

	// dialog mode
	$scope.mode = 'edit';

	// original item state
	var original = angular.copy(itemEdit);
	// item state
	$scope.itemEdit = angular.copy(original);

	// organizationUnit with properties
	$scope.organizationUnitDefinition = organizationUnitDefinition;
	// stockroom with properties
	$scope.stockroomDefinition = stockroomDefinition;
	// documentType with properties
	$scope.documentTypeDefinition = documentTypeDefinition;
	// workOrder with properties
	$scope.workOrderDefinition = workOrderDefinition;
	// materialReturnNoteItems with properties
	$scope.materialReturnNoteItemsDefinition = materialReturnNoteItemsDefinition;

	// datepicker logic

	// date properties
	$scope.openedMRNIssuanceDate = false;

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
            templateUrl: 'corporation/materialreturnnote/tmplOrganizationUnitChoose.tpl.html',
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


	// Choose stockroom
	$scope.openChooseStockroomDialog = function() {
        $modal.open({
            backdrop: 'static',
            keyboard : false,
            templateUrl: 'stock/materialreturnnote/tmplStockroomChoose.tpl.html',
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


	// Choose documentType
	$scope.openChooseDocumentTypeDialog = function() {
        $modal.open({
            backdrop: 'static',
            keyboard : false,
            templateUrl: 'corporation/materialreturnnote/tmplDocumentTypeChoose.tpl.html',
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


	// Choose workOrder
	$scope.openChooseWorkOrderDialog = function() {
        $modal.open({
            backdrop: 'static',
            keyboard : false,
            templateUrl: 'initialization/materialreturnnote/tmplWorkOrderChoose.tpl.html',
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


    $scope.materialReturnNoteItemEdit = null;

    // materialReturnNoteItems table selection logic
    $scope.materialReturnNoteItemSelection = function(item, index) {
        if(item.isSelected) {
            if($scope.materialReturnNoteItemEdit !== null) {
                var index1 = $scope.itemEdit.materialReturnNoteItems.map(function(it) { return it.id; }).indexOf($scope.materialReturnNoteItemEdit.id);
                $scope.itemEdit.materialReturnNoteItems[index1].isSelected = false;
            }
            $scope.materialReturnNoteItemEdit = item;
        } else {
            $scope.materialReturnNoteItemEdit = null;
            item.isSelected = false;
        }
    };

    // New/Edit materialReturnNoteItems dialog
    $scope.openMaterialReturnNoteItemEditDialog = function(isNew) {
        $modal.open({
            backdrop: 'static',
            keyboard : false,
            templateUrl: 'stockmanagement/materialreturnnote/tmplMaterialReturnNoteItemEdit.tpl.html',
            size: 'lg',
            controller: 'ctrlMaterialReturnNoteItemEdit',
            windowClass: 'hmodal-info',
            resolve: {
                itemEdit: function() {
                    if(isNew) {
                        return new ServiceMaterialReturnNoteItem();
                    } else {
                        return $scope.materialReturnNoteItemEdit;
                    }
                }
            }
        }).result.then(function(result) {
            var i;
            if(isNew) {
                if(!angular.isDefined($scope.itemEdit.materialReturnNoteItems)) {
                    $scope.itemEdit.materialReturnNoteItems = [];
                }
                $scope.itemEdit.materialReturnNoteItems.unshift(result);
                for(i in $scope.itemEdit.materialReturnNoteItems) {
                    $scope.itemEdit.materialReturnNoteItems[i].isSelected = false;
                }
                $scope.materialReturnNoteItemEdit = angular.extend(result);
                $scope.itemEdit.materialReturnNoteItems[0].isSelected = true;
            }
            else {
                for(i in $scope.itemEdit.materialReturnNoteItems) {
                    $scope.itemEdit.materialReturnNoteItems[i].isSelected = false;
                }
                $scope.materialReturnNoteItemEdit = angular.extend(result);
                var index = $scope.itemEdit.materialReturnNoteItems.map(function(it) { return it.id; }).indexOf(result.id);
                for(var key in result) {
                    $scope.itemEdit.materialReturnNoteItems[index][key] = result[key];
                }
                $scope.itemEdit.materialReturnNoteItems[index].isSelected = true;
            }
        });
    };

    $scope.removeMaterialReturnNoteItem = function(item) {
        var dialog = dialogs.confirm('Please confirm', 'Are you sure you want to delete item?');
        dialog.result.then(function(btn) {
            var removeIndex = $scope.itemEdit.materialReturnNoteItems.map(function(it) { return it.id; }).indexOf(item.id);
            $scope.itemEdit.materialReturnNoteItems[removeIndex].deleted = true;
        });
    };


	// Save Button
	$scope.save = function() {
		correctDateTime($scope.itemEdit.MRNIssuanceDate);
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
		return                 item.MRNDocumentNumber  &&                 item.MRNIssuanceDate  &&                 item.MRNDocumentStatus  &&                 item.MRNPrintStatus  &&                 item.MRNTransactionLogPrint  ;
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


.controller('ctrlMaterialReturnNoteChoose', ['$scope','ServiceMaterialReturnNote', 'dialogs', '$modal', '$modalInstance', 'itemEdit',
function($scope, ServiceMaterialReturnNote, dialogs, $modal,  $modalInstance, itemEdit) {

    // entity with properties
    $scope.itemDefinition = {
        label: 'stockmanagement.materialReturnNote',
        properties: [
            { label: 'mRNDocumentNumber', name:'MRNDocumentNumber', inTable:  true  },
            { label: 'mRNOldDocument', name:'MRNOldDocument', inTable:  false  },
            { label: 'mRNIssuanceDate', name:'MRNIssuanceDate', inTable:  true  },
            { label: 'mRNDocumentStatus', name:'MRNDocumentStatus', inTable:  true  },
            { label: 'mRNRequisitionNumber', name:'MRNRequisitionNumber', inTable:  false  },
            { label: 'mRNStornoDocumentNumber', name:'MRNStornoDocumentNumber', inTable:  false  },
            { label: 'mRNPrintStatus', name:'MRNPrintStatus', inTable:  true  },
            { label: 'mRNTransactionLogPrint', name:'MRNTransactionLogPrint', inTable:  true  },
            { label: 'mRNLogNumber', name:'MRNLogNumber', inTable:  false  },
        ]
    };

	$scope.items = [];
	$scope.itemEdit = {};

	// fill table with data
	$scope.loaded = false;
	var getMaterialReturnNotes = function() {
		if(!$scope.loaded && $scope.items.length === 0) {
			$scope.isLoading = true;
			ServiceMaterialReturnNote.query(function(data) {
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
	getMaterialReturnNotes();

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