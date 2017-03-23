'use strict';

angular.module('Doob.stockmanagement')


.controller('ctrlTransferOrder',['$scope', '$rootScope', '$modal', 'dialogs', 'CheckSelected', 'ServiceTransferOrder',
    function($scope, $rootScope, $modal, dialogs, CheckSelected, ServiceTransferOrder) {

	// main entity (transferOrder) properties names and labels
	$scope.itemDefinition = {
		label: 'stockmanagement.transferOrder',
		properties: [
			{ label: 'tODocumentNumber', name:'TODocumentNumber', inTable:  true  },
			{ label: 'tOIssuanceDate', name:'TOIssuanceDate', inTable:  true  },
			{ label: 'tOStornoDocumentNumber', name:'TOStornoDocumentNumber', inTable:  false  },
			{ label: 'tODocumentStatus', name:'TODocumentStatus', inTable:  true  },
			{ label: 'tOPrintStatus', name:'TOPrintStatus', inTable:  true  },
			{ label: 'tOOldDocument', name:'TOOldDocument', inTable:  false  },
			{ label: 'tOTransactionLogPrint', name:'TOTransactionLogPrint', inTable:  false  },
			{ label: 'tOLogNumber', name:'TOLogNumber', inTable:  false  },
			{ label: 'tOForFixedAssets', name:'TOForFixedAssets', inTable:  false  },
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
	// transferOrderItems with properties names and labels
	$scope.transferOrderItemsDefinition = {
		label: 'logical.transferOrderItem',
		properties : [
			{ label: 'tOIOrdinalNumber', name:'TOIOrdinalNumber' },
			{ label: 'tOIQuantityNeeded', name:'TOIQuantityNeeded' },
			{ label: 'tOIQuantityTransferred', name:'TOIQuantityTransferred' },
			{ label: 'tOIPriceDesignation', name:'TOIPriceDesignation' },
		]
	};

	// fill table with data
	$scope.items = [];
	$scope.loaded = false;
	var getTransferOrders = function() {
		if(!$scope.loaded && $scope.items.length === 0) {
			$scope.isLoading = true;
			ServiceTransferOrder.query(function(data) {
				$scope.items = data;
				$scope.isLoading = false;
				$scope.loaded = true;
			});
		}
	};
	getTransferOrders();

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

	$scope.$watch('TransferOrderCollection', function() {
		$scope.itemEdit = CheckSelected.checkSelectedInTable($scope.itemEdit, $scope.TransferOrderCollection, $scope.items);
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
			templateUrl: 'stockmanagement/transferorder/tmplTransferOrderEdit.tpl.html',
			size: 'lg',
			windowClass: 'hmodal-info',
			controller: 'ctrlTransferOrderEdit',
			resolve: {
				itemEdit: function() {
					if(isNew) {
						return new ServiceTransferOrder();
					} else {
						return $scope.itemEdit;
					}
				},
				documentTypeDefinition: function() {
					return $scope.documentTypeDefinition;
				},
				transferOrderItemsDefinition: function() {
					return $scope.transferOrderItemsDefinition;
				},
			}
		})
		.result.then(function(result) {
			if(!angular.isDefined(result.id)) {
				ServiceTransferOrder.saveCustom('stockmanagement/transferorders', result, function(savedObject) {
					$scope.items.unshift(savedObject);
					if($scope.itemEdit !== null) {
						var index = $scope.items.map(function(it) { return it.id; }).indexOf($scope.itemEdit.id);
						$scope.items[index].isSelected = false;
					}
					$scope.itemEdit = angular.extend(savedObject);
					$scope.items[0].isSelected = true;
				});
			 } else {
				 ServiceTransferOrder.updateCustom('stockmanagement/transferorders/'+result.id, result, function(savedObject) {
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


.controller('ctrlTransferOrderEdit',['$scope', 'Localization', '$modal', '$modalInstance', 'dialogs',
	'ServiceTransferOrder', 'ServiceDocumentType', 'ServiceTransferOrderItem',   'documentTypeDefinition',  'transferOrderItemsDefinition',   'itemEdit',
function($scope, Localization, $modal, $modalInstance, dialogs,
	ServiceTransferOrder, ServiceDocumentType, ServiceTransferOrderItem,  documentTypeDefinition,  transferOrderItemsDefinition,  itemEdit) {

	// dialog mode
	$scope.mode = 'edit';

	// original item state
	var original = angular.copy(itemEdit);
	// item state
	$scope.itemEdit = angular.copy(original);

	// documentType with properties
	$scope.documentTypeDefinition = documentTypeDefinition;
	// transferOrderItems with properties
	$scope.transferOrderItemsDefinition = transferOrderItemsDefinition;

	// datepicker logic

	// date properties
	$scope.openedTOIssuanceDate = false;

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
            templateUrl: 'corporation/transferorder/tmplDocumentTypeChoose.tpl.html',
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


    $scope.transferOrderItemEdit = null;

    // transferOrderItems table selection logic
    $scope.transferOrderItemSelection = function(item, index) {
        if(item.isSelected) {
            if($scope.transferOrderItemEdit !== null) {
                var index1 = $scope.itemEdit.transferOrderItems.map(function(it) { return it.id; }).indexOf($scope.transferOrderItemEdit.id);
                $scope.itemEdit.transferOrderItems[index1].isSelected = false;
            }
            $scope.transferOrderItemEdit = item;
        } else {
            $scope.transferOrderItemEdit = null;
            item.isSelected = false;
        }
    };

    // New/Edit transferOrderItems dialog
    $scope.openTransferOrderItemEditDialog = function(isNew) {
        $modal.open({
            backdrop: 'static',
            keyboard : false,
            templateUrl: 'logical/transferorder/tmplTransferOrderItemEdit.tpl.html',
            size: 'lg',
            controller: 'ctrlTransferOrderItemEdit',
            windowClass: 'hmodal-info',
            resolve: {
                itemEdit: function() {
                    if(isNew) {
                        return new ServiceTransferOrderItem();
                    } else {
                        return $scope.transferOrderItemEdit;
                    }
                }
            }
        }).result.then(function(result) {
            var i;
            if(isNew) {
                if(!angular.isDefined($scope.itemEdit.transferOrderItems)) {
                    $scope.itemEdit.transferOrderItems = [];
                }
                $scope.itemEdit.transferOrderItems.unshift(result);
                for(i in $scope.itemEdit.transferOrderItems) {
                    $scope.itemEdit.transferOrderItems[i].isSelected = false;
                }
                $scope.transferOrderItemEdit = angular.extend(result);
                $scope.itemEdit.transferOrderItems[0].isSelected = true;
            }
            else {
                for(i in $scope.itemEdit.transferOrderItems) {
                    $scope.itemEdit.transferOrderItems[i].isSelected = false;
                }
                $scope.transferOrderItemEdit = angular.extend(result);
                var index = $scope.itemEdit.transferOrderItems.map(function(it) { return it.id; }).indexOf(result.id);
                for(var key in result) {
                    $scope.itemEdit.transferOrderItems[index][key] = result[key];
                }
                $scope.itemEdit.transferOrderItems[index].isSelected = true;
            }
        });
    };

    $scope.removeTransferOrderItem = function(item) {
        var dialog = dialogs.confirm('Please confirm', 'Are you sure you want to delete item?');
        dialog.result.then(function(btn) {
            var removeIndex = $scope.itemEdit.transferOrderItems.map(function(it) { return it.id; }).indexOf(item.id);
            $scope.itemEdit.transferOrderItems[removeIndex].deleted = true;
        });
    };


	// Save Button
	$scope.save = function() {
		correctDateTime($scope.itemEdit.TOIssuanceDate);
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
		return                 item.TODocumentNumber  &&                 item.TOIssuanceDate  &&                 item.TODocumentStatus  &&                 item.TOPrintStatus  ;
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


.controller('ctrlTransferOrderChoose', ['$scope','ServiceTransferOrder', 'dialogs', '$modal', '$modalInstance', 'itemEdit',
function($scope, ServiceTransferOrder, dialogs, $modal,  $modalInstance, itemEdit) {

    // entity with properties
    $scope.itemDefinition = {
        label: 'stockmanagement.transferOrder',
        properties: [
            { label: 'tODocumentNumber', name:'TODocumentNumber', inTable:  true  },
            { label: 'tOIssuanceDate', name:'TOIssuanceDate', inTable:  true  },
            { label: 'tOStornoDocumentNumber', name:'TOStornoDocumentNumber', inTable:  false  },
            { label: 'tODocumentStatus', name:'TODocumentStatus', inTable:  true  },
            { label: 'tOPrintStatus', name:'TOPrintStatus', inTable:  true  },
            { label: 'tOOldDocument', name:'TOOldDocument', inTable:  false  },
            { label: 'tOTransactionLogPrint', name:'TOTransactionLogPrint', inTable:  false  },
            { label: 'tOLogNumber', name:'TOLogNumber', inTable:  false  },
            { label: 'tOForFixedAssets', name:'TOForFixedAssets', inTable:  false  },
        ]
    };

	$scope.items = [];
	$scope.itemEdit = {};

	// fill table with data
	$scope.loaded = false;
	var getTransferOrders = function() {
		if(!$scope.loaded && $scope.items.length === 0) {
			$scope.isLoading = true;
			ServiceTransferOrder.query(function(data) {
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
	getTransferOrders();

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