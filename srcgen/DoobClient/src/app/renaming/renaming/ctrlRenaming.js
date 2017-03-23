'use strict';

angular.module('Doob.renaming')


.controller('ctrlRenaming',['$scope', '$rootScope', '$modal', 'dialogs', 'CheckSelected', 'ServiceRenaming',
    function($scope, $rootScope, $modal, dialogs, CheckSelected, ServiceRenaming) {

	// main entity (renaming) properties names and labels
	$scope.itemDefinition = {
		label: 'renaming.renaming',
		properties: [
			{ label: 'rDocumentNumber', name:'RDocumentNumber', inTable:  true  },
			{ label: 'rOldDocument', name:'ROldDocument', inTable:  false  },
			{ label: 'rDeliveryDate', name:'RDeliveryDate', inTable:  true  },
			{ label: 'rDocumentStatus', name:'RDocumentStatus', inTable:  true  },
			{ label: 'rPrintStatus', name:'RPrintStatus', inTable:  true  },
			{ label: 'rRemark', name:'RRemark', inTable:  false  },
			{ label: 'rStornoDocumentNumber', name:'RStornoDocumentNumber', inTable:  false  },
			{ label: 'rTransactionLogprint', name:'RTransactionLogprint', inTable:  false  },
			{ label: 'rLogNumber', name:'RLogNumber', inTable:  false  },
			{ label: 'iIdentificationCode', name:'IIdentificationCode', inTable:  true  },
			{ label: 'tISDesignation', name:'TISDesignation', inTable:  true  },
		]
	};

	// tangibleItemStatus with properties names and labels
	$scope.tangibleItemStatusDefinition = {
		label: 'stockmanagement.tangibleItemStatus',
		properties : [
			{ label: 'tISDesignation', name:'TISDesignation' },
			{ label: 'tISName', name:'TISName' },
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
	// renamingItems with properties names and labels
	$scope.renamingItemsDefinition = {
		label: 'renaming.renamingItem',
		properties : [
			{ label: 'rIOrdinalNumber', name:'RIOrdinalNumber' },
			{ label: 'rIMeasurementUnitInput', name:'RIMeasurementUnitInput' },
			{ label: 'rIMeasurementUnitOutput', name:'RIMeasurementUnitOutput' },
			{ label: 'rIQuantityForTransfer', name:'RIQuantityForTransfer' },
			{ label: 'rIAddressOutput', name:'RIAddressOutput' },
		]
	};

	// fill table with data
	$scope.items = [];
	$scope.loaded = false;
	var getRenamings = function() {
		if(!$scope.loaded && $scope.items.length === 0) {
			$scope.isLoading = true;
			ServiceRenaming.query(function(data) {
				$scope.items = data;
				$scope.isLoading = false;
				$scope.loaded = true;
			});
		}
	};
	getRenamings();

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

	$scope.$watch('RenamingCollection', function() {
		$scope.itemEdit = CheckSelected.checkSelectedInTable($scope.itemEdit, $scope.RenamingCollection, $scope.items);
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
			templateUrl: 'renaming/renaming/tmplRenamingEdit.tpl.html',
			size: 'lg',
			windowClass: 'hmodal-info',
			controller: 'ctrlRenamingEdit',
			resolve: {
				itemEdit: function() {
					if(isNew) {
						return new ServiceRenaming();
					} else {
						return $scope.itemEdit;
					}
				},
				tangibleItemStatusDefinition: function() {
					return $scope.tangibleItemStatusDefinition;
				},
				stockroomDefinition: function() {
					return $scope.stockroomDefinition;
				},
				organizationUnitDefinition: function() {
					return $scope.organizationUnitDefinition;
				},
				documentTypeDefinition: function() {
					return $scope.documentTypeDefinition;
				},
				renamingItemsDefinition: function() {
					return $scope.renamingItemsDefinition;
				},
			}
		})
		.result.then(function(result) {
			if(!angular.isDefined(result.id)) {
				ServiceRenaming.saveCustom('stockmanagement/renamings', result, function(savedObject) {
					$scope.items.unshift(savedObject);
					if($scope.itemEdit !== null) {
						var index = $scope.items.map(function(it) { return it.id; }).indexOf($scope.itemEdit.id);
						$scope.items[index].isSelected = false;
					}
					$scope.itemEdit = angular.extend(savedObject);
					$scope.items[0].isSelected = true;
				});
			 } else {
				 ServiceRenaming.updateCustom('stockmanagement/renamings/'+result.id, result, function(savedObject) {
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


.controller('ctrlRenamingEdit',['$scope', 'Localization', '$modal', '$modalInstance', 'dialogs',
	'ServiceRenaming', 'ServiceTangibleItemStatus', 'ServiceStockroom', 'ServiceOrganizationUnit', 'ServiceDocumentType', 'ServiceRenamingItem',   'tangibleItemStatusDefinition',  'stockroomDefinition',  'organizationUnitDefinition',  'documentTypeDefinition',  'renamingItemsDefinition',   'itemEdit',
function($scope, Localization, $modal, $modalInstance, dialogs,
	ServiceRenaming, ServiceTangibleItemStatus, ServiceStockroom, ServiceOrganizationUnit, ServiceDocumentType, ServiceRenamingItem,  tangibleItemStatusDefinition,  stockroomDefinition,  organizationUnitDefinition,  documentTypeDefinition,  renamingItemsDefinition,  itemEdit) {

	// dialog mode
	$scope.mode = 'edit';

	// original item state
	var original = angular.copy(itemEdit);
	// item state
	$scope.itemEdit = angular.copy(original);

	// tangibleItemStatus with properties
	$scope.tangibleItemStatusDefinition = tangibleItemStatusDefinition;
	// stockroom with properties
	$scope.stockroomDefinition = stockroomDefinition;
	// organizationUnit with properties
	$scope.organizationUnitDefinition = organizationUnitDefinition;
	// documentType with properties
	$scope.documentTypeDefinition = documentTypeDefinition;
	// renamingItems with properties
	$scope.renamingItemsDefinition = renamingItemsDefinition;

	// datepicker logic

	// date properties
	$scope.openedRDeliveryDate = false;

	$scope.open = function($event, opened) {
		$event.preventDefault();
		$event.stopPropagation();
		$scope[opened] = true;
	};



	// Choose tangibleItemStatus
	$scope.openChooseTangibleItemStatusDialog = function() {
        $modal.open({
            backdrop: 'static',
            keyboard : false,
            templateUrl: 'stockmanagement/renaming/tmplTangibleItemStatusChoose.tpl.html',
            size: 'lg',
            controller: 'ctrlTangibleItemStatusChoose',
            windowClass: 'hmodal-info',
            resolve: {
				itemEdit: function() {
					if(angular.isDefined($scope.itemEdit.tangibleItemStatus)){
						return $scope.itemEdit.tangibleItemStatus;
					}
				}
			}
		}).result.then(function(result) {
			$scope.itemEdit.tangibleItemStatus = angular.copy(result);
		});
    };


	// Choose stockroom
	$scope.openChooseStockroomDialog = function() {
        $modal.open({
            backdrop: 'static',
            keyboard : false,
            templateUrl: 'stock/renaming/tmplStockroomChoose.tpl.html',
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


	// Choose organizationUnit
	$scope.openChooseOrganizationUnitDialog = function() {
        $modal.open({
            backdrop: 'static',
            keyboard : false,
            templateUrl: 'corporation/renaming/tmplOrganizationUnitChoose.tpl.html',
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
            templateUrl: 'corporation/renaming/tmplDocumentTypeChoose.tpl.html',
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


    $scope.renamingItemEdit = null;

    // renamingItems table selection logic
    $scope.renamingItemSelection = function(item, index) {
        if(item.isSelected) {
            if($scope.renamingItemEdit !== null) {
                var index1 = $scope.itemEdit.renamingItems.map(function(it) { return it.id; }).indexOf($scope.renamingItemEdit.id);
                $scope.itemEdit.renamingItems[index1].isSelected = false;
            }
            $scope.renamingItemEdit = item;
        } else {
            $scope.renamingItemEdit = null;
            item.isSelected = false;
        }
    };

    // New/Edit renamingItems dialog
    $scope.openRenamingItemEditDialog = function(isNew) {
        $modal.open({
            backdrop: 'static',
            keyboard : false,
            templateUrl: 'renaming/renaming/tmplRenamingItemEdit.tpl.html',
            size: 'lg',
            controller: 'ctrlRenamingItemEdit',
            windowClass: 'hmodal-info',
            resolve: {
                itemEdit: function() {
                    if(isNew) {
                        return new ServiceRenamingItem();
                    } else {
                        return $scope.renamingItemEdit;
                    }
                }
            }
        }).result.then(function(result) {
            var i;
            if(isNew) {
                if(!angular.isDefined($scope.itemEdit.renamingItems)) {
                    $scope.itemEdit.renamingItems = [];
                }
                $scope.itemEdit.renamingItems.unshift(result);
                for(i in $scope.itemEdit.renamingItems) {
                    $scope.itemEdit.renamingItems[i].isSelected = false;
                }
                $scope.renamingItemEdit = angular.extend(result);
                $scope.itemEdit.renamingItems[0].isSelected = true;
            }
            else {
                for(i in $scope.itemEdit.renamingItems) {
                    $scope.itemEdit.renamingItems[i].isSelected = false;
                }
                $scope.renamingItemEdit = angular.extend(result);
                var index = $scope.itemEdit.renamingItems.map(function(it) { return it.id; }).indexOf(result.id);
                for(var key in result) {
                    $scope.itemEdit.renamingItems[index][key] = result[key];
                }
                $scope.itemEdit.renamingItems[index].isSelected = true;
            }
        });
    };

    $scope.removeRenamingItem = function(item) {
        var dialog = dialogs.confirm('Please confirm', 'Are you sure you want to delete item?');
        dialog.result.then(function(btn) {
            var removeIndex = $scope.itemEdit.renamingItems.map(function(it) { return it.id; }).indexOf(item.id);
            $scope.itemEdit.renamingItems[removeIndex].deleted = true;
        });
    };


	// Save Button
	$scope.save = function() {
		correctDateTime($scope.itemEdit.RDeliveryDate);
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
		return                 item.RDocumentNumber  &&                 item.RDeliveryDate  &&                 item.RDocumentStatus  &&                 item.RPrintStatus  &&                 item.IIdentificationCode  &&                 item.TISDesignation  ;
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


.controller('ctrlRenamingChoose', ['$scope','ServiceRenaming', 'dialogs', '$modal', '$modalInstance', 'itemEdit',
function($scope, ServiceRenaming, dialogs, $modal,  $modalInstance, itemEdit) {

    // entity with properties
    $scope.itemDefinition = {
        label: 'renaming.renaming',
        properties: [
            { label: 'rDocumentNumber', name:'RDocumentNumber', inTable:  true  },
            { label: 'rOldDocument', name:'ROldDocument', inTable:  false  },
            { label: 'rDeliveryDate', name:'RDeliveryDate', inTable:  true  },
            { label: 'rDocumentStatus', name:'RDocumentStatus', inTable:  true  },
            { label: 'rPrintStatus', name:'RPrintStatus', inTable:  true  },
            { label: 'rRemark', name:'RRemark', inTable:  false  },
            { label: 'rStornoDocumentNumber', name:'RStornoDocumentNumber', inTable:  false  },
            { label: 'rTransactionLogprint', name:'RTransactionLogprint', inTable:  false  },
            { label: 'rLogNumber', name:'RLogNumber', inTable:  false  },
            { label: 'iIdentificationCode', name:'IIdentificationCode', inTable:  true  },
            { label: 'tISDesignation', name:'TISDesignation', inTable:  true  },
        ]
    };

	$scope.items = [];
	$scope.itemEdit = {};

	// fill table with data
	$scope.loaded = false;
	var getRenamings = function() {
		if(!$scope.loaded && $scope.items.length === 0) {
			$scope.isLoading = true;
			ServiceRenaming.query(function(data) {
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
	getRenamings();

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