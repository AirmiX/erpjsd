'use strict';

angular.module('Doob.stockmanagement')


.controller('ctrlDeliveryNote',['$scope', '$rootScope', '$modal', 'dialogs', 'CheckSelected', 'ServiceDeliveryNote',
    function($scope, $rootScope, $modal, dialogs, CheckSelected, ServiceDeliveryNote) {

	// main entity (deliveryNote) properties names and labels
	$scope.itemDefinition = {
		label: 'stockmanagement.deliveryNote',
		properties: [
			{ label: 'dNDocumentNumber', name:'DNDocumentNumber', inTable:  true  },
			{ label: 'dNDeliveryDate', name:'DNDeliveryDate', inTable:  true  },
			{ label: 'dNApprovalDate', name:'DNApprovalDate', inTable:  false  },
			{ label: 'dNStornoDocumentNumber', name:'DNStornoDocumentNumber', inTable:  false  },
			{ label: 'dNDocumentStatus', name:'DNDocumentStatus', inTable:  true  },
			{ label: 'dNPrintDate', name:'DNPrintDate', inTable:  false  },
			{ label: 'dNPostingDate', name:'DNPostingDate', inTable:  false  },
			{ label: 'dNPrintTransactionLog', name:'DNPrintTransactionLog', inTable:  false  },
			{ label: 'dNOldDocument', name:'DNOldDocument', inTable:  false  },
			{ label: 'dNPrintStatus', name:'DNPrintStatus', inTable:  false  },
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
	// deliveryNoteItems with properties names and labels
	$scope.deliveryNoteItemsDefinition = {
		label: 'stockmanagement.deliveryNoteItem',
		properties : [
			{ label: 'dNIOrdinalNumber', name:'DNIOrdinalNumber' },
			{ label: 'dNIMeasurementUnit', name:'DNIMeasurementUnit' },
			{ label: 'dNIQuantityReceived', name:'DNIQuantityReceived' },
			{ label: 'dNIPriceDesignation', name:'DNIPriceDesignation' },
		]
	};

	// fill table with data
	$scope.items = [];
	$scope.loaded = false;
	var getDeliveryNotes = function() {
		if(!$scope.loaded && $scope.items.length === 0) {
			$scope.isLoading = true;
			ServiceDeliveryNote.query(function(data) {
				$scope.items = data;
				$scope.isLoading = false;
				$scope.loaded = true;
			});
		}
	};
	getDeliveryNotes();

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

	$scope.$watch('DeliveryNoteCollection', function() {
		$scope.itemEdit = CheckSelected.checkSelectedInTable($scope.itemEdit, $scope.DeliveryNoteCollection, $scope.items);
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
			templateUrl: 'stockmanagement/deliverynote/tmplDeliveryNoteEdit.tpl.html',
			size: 'lg',
			windowClass: 'hmodal-info',
			controller: 'ctrlDeliveryNoteEdit',
			resolve: {
				itemEdit: function() {
					if(isNew) {
						return new ServiceDeliveryNote();
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
				deliveryNoteItemsDefinition: function() {
					return $scope.deliveryNoteItemsDefinition;
				},
			}
		})
		.result.then(function(result) {
			if(!angular.isDefined(result.id)) {
				ServiceDeliveryNote.saveCustom('stockmanagement/deliverynotes', result, function(savedObject) {
					$scope.items.unshift(savedObject);
					if($scope.itemEdit !== null) {
						var index = $scope.items.map(function(it) { return it.id; }).indexOf($scope.itemEdit.id);
						$scope.items[index].isSelected = false;
					}
					$scope.itemEdit = angular.extend(savedObject);
					$scope.items[0].isSelected = true;
				});
			 } else {
				 ServiceDeliveryNote.updateCustom('stockmanagement/deliverynotes/'+result.id, result, function(savedObject) {
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


.controller('ctrlDeliveryNoteEdit',['$scope', 'Localization', '$modal', '$modalInstance', 'dialogs',
	'ServiceDeliveryNote', 'ServiceOrganizationUnit', 'ServiceStockroom', 'ServiceDocumentType', 'ServiceWorkOrder', 'ServiceDeliveryNoteItem',   'organizationUnitDefinition',  'stockroomDefinition',  'documentTypeDefinition',  'workOrderDefinition',  'deliveryNoteItemsDefinition',   'itemEdit',
function($scope, Localization, $modal, $modalInstance, dialogs,
	ServiceDeliveryNote, ServiceOrganizationUnit, ServiceStockroom, ServiceDocumentType, ServiceWorkOrder, ServiceDeliveryNoteItem,  organizationUnitDefinition,  stockroomDefinition,  documentTypeDefinition,  workOrderDefinition,  deliveryNoteItemsDefinition,  itemEdit) {

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
	// deliveryNoteItems with properties
	$scope.deliveryNoteItemsDefinition = deliveryNoteItemsDefinition;

	// datepicker logic

	// date properties
	$scope.openedDNDeliveryDate = false;
	$scope.openedDNApprovalDate = false;
	$scope.openedDNPrintDate = false;
	$scope.openedDNPostingDate = false;

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
            templateUrl: 'corporation/deliverynote/tmplOrganizationUnitChoose.tpl.html',
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
            templateUrl: 'stock/deliverynote/tmplStockroomChoose.tpl.html',
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
            templateUrl: 'corporation/deliverynote/tmplDocumentTypeChoose.tpl.html',
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
            templateUrl: 'initialization/deliverynote/tmplWorkOrderChoose.tpl.html',
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


    $scope.deliveryNoteItemEdit = null;

    // deliveryNoteItems table selection logic
    $scope.deliveryNoteItemSelection = function(item, index) {
        if(item.isSelected) {
            if($scope.deliveryNoteItemEdit !== null) {
                var index1 = $scope.itemEdit.deliveryNoteItems.map(function(it) { return it.id; }).indexOf($scope.deliveryNoteItemEdit.id);
                $scope.itemEdit.deliveryNoteItems[index1].isSelected = false;
            }
            $scope.deliveryNoteItemEdit = item;
        } else {
            $scope.deliveryNoteItemEdit = null;
            item.isSelected = false;
        }
    };

    // New/Edit deliveryNoteItems dialog
    $scope.openDeliveryNoteItemEditDialog = function(isNew) {
        $modal.open({
            backdrop: 'static',
            keyboard : false,
            templateUrl: 'stockmanagement/deliverynote/tmplDeliveryNoteItemEdit.tpl.html',
            size: 'lg',
            controller: 'ctrlDeliveryNoteItemEdit',
            windowClass: 'hmodal-info',
            resolve: {
                itemEdit: function() {
                    if(isNew) {
                        return new ServiceDeliveryNoteItem();
                    } else {
                        return $scope.deliveryNoteItemEdit;
                    }
                }
            }
        }).result.then(function(result) {
            var i;
            if(isNew) {
                if(!angular.isDefined($scope.itemEdit.deliveryNoteItems)) {
                    $scope.itemEdit.deliveryNoteItems = [];
                }
                $scope.itemEdit.deliveryNoteItems.unshift(result);
                for(i in $scope.itemEdit.deliveryNoteItems) {
                    $scope.itemEdit.deliveryNoteItems[i].isSelected = false;
                }
                $scope.deliveryNoteItemEdit = angular.extend(result);
                $scope.itemEdit.deliveryNoteItems[0].isSelected = true;
            }
            else {
                for(i in $scope.itemEdit.deliveryNoteItems) {
                    $scope.itemEdit.deliveryNoteItems[i].isSelected = false;
                }
                $scope.deliveryNoteItemEdit = angular.extend(result);
                var index = $scope.itemEdit.deliveryNoteItems.map(function(it) { return it.id; }).indexOf(result.id);
                for(var key in result) {
                    $scope.itemEdit.deliveryNoteItems[index][key] = result[key];
                }
                $scope.itemEdit.deliveryNoteItems[index].isSelected = true;
            }
        });
    };

    $scope.removeDeliveryNoteItem = function(item) {
        var dialog = dialogs.confirm('Please confirm', 'Are you sure you want to delete item?');
        dialog.result.then(function(btn) {
            var removeIndex = $scope.itemEdit.deliveryNoteItems.map(function(it) { return it.id; }).indexOf(item.id);
            $scope.itemEdit.deliveryNoteItems[removeIndex].deleted = true;
        });
    };


	// Save Button
	$scope.save = function() {
		correctDateTime($scope.itemEdit.DNDeliveryDate);
		correctDateTime($scope.itemEdit.DNApprovalDate);
		correctDateTime($scope.itemEdit.DNPrintDate);
		correctDateTime($scope.itemEdit.DNPostingDate);
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
		return                 item.DNDocumentNumber  &&                 item.DNDeliveryDate  &&                 item.DNDocumentStatus  ;
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


.controller('ctrlDeliveryNoteChoose', ['$scope','ServiceDeliveryNote', 'dialogs', '$modal', '$modalInstance', 'itemEdit',
function($scope, ServiceDeliveryNote, dialogs, $modal,  $modalInstance, itemEdit) {

    // entity with properties
    $scope.itemDefinition = {
        label: 'stockmanagement.deliveryNote',
        properties: [
            { label: 'dNDocumentNumber', name:'DNDocumentNumber', inTable:  true  },
            { label: 'dNDeliveryDate', name:'DNDeliveryDate', inTable:  true  },
            { label: 'dNApprovalDate', name:'DNApprovalDate', inTable:  false  },
            { label: 'dNStornoDocumentNumber', name:'DNStornoDocumentNumber', inTable:  false  },
            { label: 'dNDocumentStatus', name:'DNDocumentStatus', inTable:  true  },
            { label: 'dNPrintDate', name:'DNPrintDate', inTable:  false  },
            { label: 'dNPostingDate', name:'DNPostingDate', inTable:  false  },
            { label: 'dNPrintTransactionLog', name:'DNPrintTransactionLog', inTable:  false  },
            { label: 'dNOldDocument', name:'DNOldDocument', inTable:  false  },
            { label: 'dNPrintStatus', name:'DNPrintStatus', inTable:  false  },
        ]
    };

	$scope.items = [];
	$scope.itemEdit = {};

	// fill table with data
	$scope.loaded = false;
	var getDeliveryNotes = function() {
		if(!$scope.loaded && $scope.items.length === 0) {
			$scope.isLoading = true;
			ServiceDeliveryNote.query(function(data) {
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
	getDeliveryNotes();

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