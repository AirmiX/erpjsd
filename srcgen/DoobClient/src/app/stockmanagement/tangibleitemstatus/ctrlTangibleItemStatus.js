'use strict';

angular.module('Doob.stockmanagement')


.controller('ctrlTangibleItemStatus',['$scope', '$rootScope', '$modal', 'dialogs', 'CheckSelected', 'ServiceTangibleItemStatus',
    function($scope, $rootScope, $modal, dialogs, CheckSelected, ServiceTangibleItemStatus) {

	// main entity (tangibleItemStatus) properties names and labels
	$scope.itemDefinition = {
		label: 'stockmanagement.tangibleItemStatus',
		properties: [
			{ label: 'tISDesignation', name:'TISDesignation', inTable:  true  },
			{ label: 'tISName', name:'TISName', inTable:  true  },
		]
	};

	// renamings with properties names and labels
	$scope.renamingsDefinition = {
		label: 'renaming.renaming',
		properties : [
			{ label: 'rDocumentNumber', name:'RDocumentNumber' },
			{ label: 'rDeliveryDate', name:'RDeliveryDate' },
			{ label: 'rDocumentStatus', name:'RDocumentStatus' },
			{ label: 'rPrintStatus', name:'RPrintStatus' },
			{ label: 'iIdentificationCode', name:'IIdentificationCode' },
			{ label: 'tISDesignation', name:'TISDesignation' },
		]
	};
	// tangibleItemAmmountTools with properties names and labels
	$scope.tangibleItemAmmountToolsDefinition = {
		label: 'stockmanagement.tangibleItemAmmountTool',
		properties : [
			{ label: 'tICLocatonAddress', name:'TICLocatonAddress' },
			{ label: 'tICBookkeepingPosition', name:'TICBookkeepingPosition' },
			{ label: 'tICQuantityCumulativeInput', name:'TICQuantityCumulativeInput' },
			{ label: 'tICValueInitialState', name:'TICValueInitialState' },
			{ label: 'tICValueCumulativeInput', name:'TICValueCumulativeInput' },
			{ label: 'tICUnitPrice', name:'TICUnitPrice' },
			{ label: 'tICAvailableBalance', name:'TICAvailableBalance' },
			{ label: 'tICLastInputDate', name:'TICLastInputDate' },
			{ label: 'tICLastOutputDate', name:'TICLastOutputDate' },
		]
	};
	// prices with properties names and labels
	$scope.pricesDefinition = {
		label: 'stockmanagement.price',
		properties : [
			{ label: 'pPrice', name:'PPrice' },
		]
	};
	// stockAccountAssignments with properties names and labels
	$scope.stockAccountAssignmentsDefinition = {
		label: 'stockmanagement.stockAccountAssignment',
		properties : [
			{ label: 'sAAValueStatus', name:'SAAValueStatus' },
		]
	};
	// workOrders with properties names and labels
	$scope.workOrdersDefinition = {
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
	// stockroomOrgUnis with properties names and labels
	$scope.stockroomOrgUnisDefinition = {
		label: 'stockmanagement.stockroomOrgUni',
		properties : [
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
	// goodsReceivedNoteItems with properties names and labels
	$scope.goodsReceivedNoteItemsDefinition = {
		label: 'stockmanagement.goodsReceivedNoteItem',
		properties : [
			{ label: 'gRNIOrdinalNumber', name:'GRNIOrdinalNumber' },
			{ label: 'gRNIStockAccount', name:'GRNIStockAccount' },
			{ label: 'gRNIPriceDesignation', name:'GRNIPriceDesignation' },
			{ label: 'gRNIMeasurementUnit', name:'GRNIMeasurementUnit' },
			{ label: 'gRNIQuantityByShippingDocument', name:'GRNIQuantityByShippingDocument' },
			{ label: 'gRNIQunaityReceived', name:'GRNIQunaityReceived' },
			{ label: 'gRNIQuantityIssued', name:'GRNIQuantityIssued' },
		]
	};
	// tangibleItemConditions with properties names and labels
	$scope.tangibleItemConditionsDefinition = {
		label: 'stockmanagement.tangibleItemCondition',
		properties : [
			{ label: 'tICLocatonAddress', name:'TICLocatonAddress' },
			{ label: 'tICBookkeepingPosition', name:'TICBookkeepingPosition' },
			{ label: 'tICQuantityCumulativeInput', name:'TICQuantityCumulativeInput' },
			{ label: 'tICValueInitialState', name:'TICValueInitialState' },
			{ label: 'tICValueCumulativeInput', name:'TICValueCumulativeInput' },
			{ label: 'tICUnitPrice', name:'TICUnitPrice' },
			{ label: 'tICAvailableBalance', name:'TICAvailableBalance' },
			{ label: 'tICOpeningDate', name:'TICOpeningDate' },
			{ label: 'tICLastInputDate', name:'TICLastInputDate' },
			{ label: 'tICLastOutputDate', name:'TICLastOutputDate' },
		]
	};

	// fill table with data
	$scope.items = [];
	$scope.loaded = false;
	var getTangibleItemStatuss = function() {
		if(!$scope.loaded && $scope.items.length === 0) {
			$scope.isLoading = true;
			ServiceTangibleItemStatus.query(function(data) {
				$scope.items = data;
				$scope.isLoading = false;
				$scope.loaded = true;
			});
		}
	};
	getTangibleItemStatuss();

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

	$scope.$watch('TangibleItemStatusCollection', function() {
		$scope.itemEdit = CheckSelected.checkSelectedInTable($scope.itemEdit, $scope.TangibleItemStatusCollection, $scope.items);
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
			templateUrl: 'stockmanagement/tangibleitemstatus/tmplTangibleItemStatusEdit.tpl.html',
			size: 'lg',
			windowClass: 'hmodal-info',
			controller: 'ctrlTangibleItemStatusEdit',
			resolve: {
				itemEdit: function() {
					if(isNew) {
						return new ServiceTangibleItemStatus();
					} else {
						return $scope.itemEdit;
					}
				},
				renamingsDefinition: function() {
					return $scope.renamingsDefinition;
				},
				tangibleItemAmmountToolsDefinition: function() {
					return $scope.tangibleItemAmmountToolsDefinition;
				},
				pricesDefinition: function() {
					return $scope.pricesDefinition;
				},
				stockAccountAssignmentsDefinition: function() {
					return $scope.stockAccountAssignmentsDefinition;
				},
				workOrdersDefinition: function() {
					return $scope.workOrdersDefinition;
				},
				deliveryNoteItemsDefinition: function() {
					return $scope.deliveryNoteItemsDefinition;
				},
				stockroomOrgUnisDefinition: function() {
					return $scope.stockroomOrgUnisDefinition;
				},
				materialReturnNoteItemsDefinition: function() {
					return $scope.materialReturnNoteItemsDefinition;
				},
				goodsReceivedNoteItemsDefinition: function() {
					return $scope.goodsReceivedNoteItemsDefinition;
				},
				tangibleItemConditionsDefinition: function() {
					return $scope.tangibleItemConditionsDefinition;
				},
			}
		})
		.result.then(function(result) {
			if(!angular.isDefined(result.id)) {
				ServiceTangibleItemStatus.saveCustom('stockmanagement/tangibleitemstatuss', result, function(savedObject) {
					$scope.items.unshift(savedObject);
					if($scope.itemEdit !== null) {
						var index = $scope.items.map(function(it) { return it.id; }).indexOf($scope.itemEdit.id);
						$scope.items[index].isSelected = false;
					}
					$scope.itemEdit = angular.extend(savedObject);
					$scope.items[0].isSelected = true;
				});
			 } else {
				 ServiceTangibleItemStatus.updateCustom('stockmanagement/tangibleitemstatuss/'+result.id, result, function(savedObject) {
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


.controller('ctrlTangibleItemStatusEdit',['$scope', 'Localization', '$modal', '$modalInstance', 'dialogs',
	'ServiceTangibleItemStatus', 'ServiceRenaming', 'ServiceTangibleItemAmmountTool', 'ServicePrice', 'ServiceStockAccountAssignment', 'ServiceWorkOrder', 'ServiceDeliveryNoteItem', 'ServiceStockroomOrgUni', 'ServiceMaterialReturnNoteItem', 'ServiceGoodsReceivedNoteItem', 'ServiceTangibleItemCondition',   'renamingsDefinition',  'tangibleItemAmmountToolsDefinition',  'pricesDefinition',  'stockAccountAssignmentsDefinition',  'workOrdersDefinition',  'deliveryNoteItemsDefinition',  'stockroomOrgUnisDefinition',  'materialReturnNoteItemsDefinition',  'goodsReceivedNoteItemsDefinition',  'tangibleItemConditionsDefinition',   'itemEdit',
function($scope, Localization, $modal, $modalInstance, dialogs,
	ServiceTangibleItemStatus, ServiceRenaming, ServiceTangibleItemAmmountTool, ServicePrice, ServiceStockAccountAssignment, ServiceWorkOrder, ServiceDeliveryNoteItem, ServiceStockroomOrgUni, ServiceMaterialReturnNoteItem, ServiceGoodsReceivedNoteItem, ServiceTangibleItemCondition,  renamingsDefinition,  tangibleItemAmmountToolsDefinition,  pricesDefinition,  stockAccountAssignmentsDefinition,  workOrdersDefinition,  deliveryNoteItemsDefinition,  stockroomOrgUnisDefinition,  materialReturnNoteItemsDefinition,  goodsReceivedNoteItemsDefinition,  tangibleItemConditionsDefinition,  itemEdit) {

	// dialog mode
	$scope.mode = 'edit';

	// original item state
	var original = angular.copy(itemEdit);
	// item state
	$scope.itemEdit = angular.copy(original);

	// renamings with properties
	$scope.renamingsDefinition = renamingsDefinition;
	// tangibleItemAmmountTools with properties
	$scope.tangibleItemAmmountToolsDefinition = tangibleItemAmmountToolsDefinition;
	// prices with properties
	$scope.pricesDefinition = pricesDefinition;
	// stockAccountAssignments with properties
	$scope.stockAccountAssignmentsDefinition = stockAccountAssignmentsDefinition;
	// workOrders with properties
	$scope.workOrdersDefinition = workOrdersDefinition;
	// deliveryNoteItems with properties
	$scope.deliveryNoteItemsDefinition = deliveryNoteItemsDefinition;
	// stockroomOrgUnis with properties
	$scope.stockroomOrgUnisDefinition = stockroomOrgUnisDefinition;
	// materialReturnNoteItems with properties
	$scope.materialReturnNoteItemsDefinition = materialReturnNoteItemsDefinition;
	// goodsReceivedNoteItems with properties
	$scope.goodsReceivedNoteItemsDefinition = goodsReceivedNoteItemsDefinition;
	// tangibleItemConditions with properties
	$scope.tangibleItemConditionsDefinition = tangibleItemConditionsDefinition;

	// datepicker logic

	// date properties

	$scope.open = function($event, opened) {
		$event.preventDefault();
		$event.stopPropagation();
		$scope[opened] = true;
	};



    $scope.tangibleItemAmmountToolEdit = null;

    // tangibleItemAmmountTools table selection logic
    $scope.tangibleItemAmmountToolSelection = function(item, index) {
        if(item.isSelected) {
            if($scope.tangibleItemAmmountToolEdit !== null) {
                var index1 = $scope.itemEdit.tangibleItemAmmountTools.map(function(it) { return it.id; }).indexOf($scope.tangibleItemAmmountToolEdit.id);
                $scope.itemEdit.tangibleItemAmmountTools[index1].isSelected = false;
            }
            $scope.tangibleItemAmmountToolEdit = item;
        } else {
            $scope.tangibleItemAmmountToolEdit = null;
            item.isSelected = false;
        }
    };

    // New/Edit tangibleItemAmmountTools dialog
    $scope.openTangibleItemAmmountToolEditDialog = function(isNew) {
        $modal.open({
            backdrop: 'static',
            keyboard : false,
            templateUrl: 'stockmanagement/tangibleitemstatus/tmplTangibleItemAmmountToolEdit.tpl.html',
            size: 'lg',
            controller: 'ctrlTangibleItemAmmountToolEdit',
            windowClass: 'hmodal-info',
            resolve: {
                itemEdit: function() {
                    if(isNew) {
                        return new ServiceTangibleItemAmmountTool();
                    } else {
                        return $scope.tangibleItemAmmountToolEdit;
                    }
                }
            }
        }).result.then(function(result) {
            var i;
            if(isNew) {
                if(!angular.isDefined($scope.itemEdit.tangibleItemAmmountTools)) {
                    $scope.itemEdit.tangibleItemAmmountTools = [];
                }
                $scope.itemEdit.tangibleItemAmmountTools.unshift(result);
                for(i in $scope.itemEdit.tangibleItemAmmountTools) {
                    $scope.itemEdit.tangibleItemAmmountTools[i].isSelected = false;
                }
                $scope.tangibleItemAmmountToolEdit = angular.extend(result);
                $scope.itemEdit.tangibleItemAmmountTools[0].isSelected = true;
            }
            else {
                for(i in $scope.itemEdit.tangibleItemAmmountTools) {
                    $scope.itemEdit.tangibleItemAmmountTools[i].isSelected = false;
                }
                $scope.tangibleItemAmmountToolEdit = angular.extend(result);
                var index = $scope.itemEdit.tangibleItemAmmountTools.map(function(it) { return it.id; }).indexOf(result.id);
                for(var key in result) {
                    $scope.itemEdit.tangibleItemAmmountTools[index][key] = result[key];
                }
                $scope.itemEdit.tangibleItemAmmountTools[index].isSelected = true;
            }
        });
    };

    $scope.removeTangibleItemAmmountTool = function(item) {
        var dialog = dialogs.confirm('Please confirm', 'Are you sure you want to delete item?');
        dialog.result.then(function(btn) {
            var removeIndex = $scope.itemEdit.tangibleItemAmmountTools.map(function(it) { return it.id; }).indexOf(item.id);
            $scope.itemEdit.tangibleItemAmmountTools[removeIndex].deleted = true;
        });
    };


    $scope.priceEdit = null;

    // prices table selection logic
    $scope.priceSelection = function(item, index) {
        if(item.isSelected) {
            if($scope.priceEdit !== null) {
                var index1 = $scope.itemEdit.prices.map(function(it) { return it.id; }).indexOf($scope.priceEdit.id);
                $scope.itemEdit.prices[index1].isSelected = false;
            }
            $scope.priceEdit = item;
        } else {
            $scope.priceEdit = null;
            item.isSelected = false;
        }
    };

    // New/Edit prices dialog
    $scope.openPriceEditDialog = function(isNew) {
        $modal.open({
            backdrop: 'static',
            keyboard : false,
            templateUrl: 'stockmanagement/tangibleitemstatus/tmplPriceEdit.tpl.html',
            size: 'lg',
            controller: 'ctrlPriceEdit',
            windowClass: 'hmodal-info',
            resolve: {
                itemEdit: function() {
                    if(isNew) {
                        return new ServicePrice();
                    } else {
                        return $scope.priceEdit;
                    }
                }
            }
        }).result.then(function(result) {
            var i;
            if(isNew) {
                if(!angular.isDefined($scope.itemEdit.prices)) {
                    $scope.itemEdit.prices = [];
                }
                $scope.itemEdit.prices.unshift(result);
                for(i in $scope.itemEdit.prices) {
                    $scope.itemEdit.prices[i].isSelected = false;
                }
                $scope.priceEdit = angular.extend(result);
                $scope.itemEdit.prices[0].isSelected = true;
            }
            else {
                for(i in $scope.itemEdit.prices) {
                    $scope.itemEdit.prices[i].isSelected = false;
                }
                $scope.priceEdit = angular.extend(result);
                var index = $scope.itemEdit.prices.map(function(it) { return it.id; }).indexOf(result.id);
                for(var key in result) {
                    $scope.itemEdit.prices[index][key] = result[key];
                }
                $scope.itemEdit.prices[index].isSelected = true;
            }
        });
    };

    $scope.removePrice = function(item) {
        var dialog = dialogs.confirm('Please confirm', 'Are you sure you want to delete item?');
        dialog.result.then(function(btn) {
            var removeIndex = $scope.itemEdit.prices.map(function(it) { return it.id; }).indexOf(item.id);
            $scope.itemEdit.prices[removeIndex].deleted = true;
        });
    };


    $scope.stockAccountAssignmentEdit = null;

    // stockAccountAssignments table selection logic
    $scope.stockAccountAssignmentSelection = function(item, index) {
        if(item.isSelected) {
            if($scope.stockAccountAssignmentEdit !== null) {
                var index1 = $scope.itemEdit.stockAccountAssignments.map(function(it) { return it.id; }).indexOf($scope.stockAccountAssignmentEdit.id);
                $scope.itemEdit.stockAccountAssignments[index1].isSelected = false;
            }
            $scope.stockAccountAssignmentEdit = item;
        } else {
            $scope.stockAccountAssignmentEdit = null;
            item.isSelected = false;
        }
    };

    // New/Edit stockAccountAssignments dialog
    $scope.openStockAccountAssignmentEditDialog = function(isNew) {
        $modal.open({
            backdrop: 'static',
            keyboard : false,
            templateUrl: 'stockmanagement/tangibleitemstatus/tmplStockAccountAssignmentEdit.tpl.html',
            size: 'lg',
            controller: 'ctrlStockAccountAssignmentEdit',
            windowClass: 'hmodal-info',
            resolve: {
                itemEdit: function() {
                    if(isNew) {
                        return new ServiceStockAccountAssignment();
                    } else {
                        return $scope.stockAccountAssignmentEdit;
                    }
                }
            }
        }).result.then(function(result) {
            var i;
            if(isNew) {
                if(!angular.isDefined($scope.itemEdit.stockAccountAssignments)) {
                    $scope.itemEdit.stockAccountAssignments = [];
                }
                $scope.itemEdit.stockAccountAssignments.unshift(result);
                for(i in $scope.itemEdit.stockAccountAssignments) {
                    $scope.itemEdit.stockAccountAssignments[i].isSelected = false;
                }
                $scope.stockAccountAssignmentEdit = angular.extend(result);
                $scope.itemEdit.stockAccountAssignments[0].isSelected = true;
            }
            else {
                for(i in $scope.itemEdit.stockAccountAssignments) {
                    $scope.itemEdit.stockAccountAssignments[i].isSelected = false;
                }
                $scope.stockAccountAssignmentEdit = angular.extend(result);
                var index = $scope.itemEdit.stockAccountAssignments.map(function(it) { return it.id; }).indexOf(result.id);
                for(var key in result) {
                    $scope.itemEdit.stockAccountAssignments[index][key] = result[key];
                }
                $scope.itemEdit.stockAccountAssignments[index].isSelected = true;
            }
        });
    };

    $scope.removeStockAccountAssignment = function(item) {
        var dialog = dialogs.confirm('Please confirm', 'Are you sure you want to delete item?');
        dialog.result.then(function(btn) {
            var removeIndex = $scope.itemEdit.stockAccountAssignments.map(function(it) { return it.id; }).indexOf(item.id);
            $scope.itemEdit.stockAccountAssignments[removeIndex].deleted = true;
        });
    };


    $scope.stockroomOrgUniEdit = null;

    // stockroomOrgUnis table selection logic
    $scope.stockroomOrgUniSelection = function(item, index) {
        if(item.isSelected) {
            if($scope.stockroomOrgUniEdit !== null) {
                var index1 = $scope.itemEdit.stockroomOrgUnis.map(function(it) { return it.id; }).indexOf($scope.stockroomOrgUniEdit.id);
                $scope.itemEdit.stockroomOrgUnis[index1].isSelected = false;
            }
            $scope.stockroomOrgUniEdit = item;
        } else {
            $scope.stockroomOrgUniEdit = null;
            item.isSelected = false;
        }
    };

    // New/Edit stockroomOrgUnis dialog
    $scope.openStockroomOrgUniEditDialog = function(isNew) {
        $modal.open({
            backdrop: 'static',
            keyboard : false,
            templateUrl: 'stockmanagement/tangibleitemstatus/tmplStockroomOrgUniEdit.tpl.html',
            size: 'lg',
            controller: 'ctrlStockroomOrgUniEdit',
            windowClass: 'hmodal-info',
            resolve: {
                itemEdit: function() {
                    if(isNew) {
                        return new ServiceStockroomOrgUni();
                    } else {
                        return $scope.stockroomOrgUniEdit;
                    }
                }
            }
        }).result.then(function(result) {
            var i;
            if(isNew) {
                if(!angular.isDefined($scope.itemEdit.stockroomOrgUnis)) {
                    $scope.itemEdit.stockroomOrgUnis = [];
                }
                $scope.itemEdit.stockroomOrgUnis.unshift(result);
                for(i in $scope.itemEdit.stockroomOrgUnis) {
                    $scope.itemEdit.stockroomOrgUnis[i].isSelected = false;
                }
                $scope.stockroomOrgUniEdit = angular.extend(result);
                $scope.itemEdit.stockroomOrgUnis[0].isSelected = true;
            }
            else {
                for(i in $scope.itemEdit.stockroomOrgUnis) {
                    $scope.itemEdit.stockroomOrgUnis[i].isSelected = false;
                }
                $scope.stockroomOrgUniEdit = angular.extend(result);
                var index = $scope.itemEdit.stockroomOrgUnis.map(function(it) { return it.id; }).indexOf(result.id);
                for(var key in result) {
                    $scope.itemEdit.stockroomOrgUnis[index][key] = result[key];
                }
                $scope.itemEdit.stockroomOrgUnis[index].isSelected = true;
            }
        });
    };

    $scope.removeStockroomOrgUni = function(item) {
        var dialog = dialogs.confirm('Please confirm', 'Are you sure you want to delete item?');
        dialog.result.then(function(btn) {
            var removeIndex = $scope.itemEdit.stockroomOrgUnis.map(function(it) { return it.id; }).indexOf(item.id);
            $scope.itemEdit.stockroomOrgUnis[removeIndex].deleted = true;
        });
    };


    $scope.tangibleItemConditionEdit = null;

    // tangibleItemConditions table selection logic
    $scope.tangibleItemConditionSelection = function(item, index) {
        if(item.isSelected) {
            if($scope.tangibleItemConditionEdit !== null) {
                var index1 = $scope.itemEdit.tangibleItemConditions.map(function(it) { return it.id; }).indexOf($scope.tangibleItemConditionEdit.id);
                $scope.itemEdit.tangibleItemConditions[index1].isSelected = false;
            }
            $scope.tangibleItemConditionEdit = item;
        } else {
            $scope.tangibleItemConditionEdit = null;
            item.isSelected = false;
        }
    };

    // New/Edit tangibleItemConditions dialog
    $scope.openTangibleItemConditionEditDialog = function(isNew) {
        $modal.open({
            backdrop: 'static',
            keyboard : false,
            templateUrl: 'stockmanagement/tangibleitemstatus/tmplTangibleItemConditionEdit.tpl.html',
            size: 'lg',
            controller: 'ctrlTangibleItemConditionEdit',
            windowClass: 'hmodal-info',
            resolve: {
                itemEdit: function() {
                    if(isNew) {
                        return new ServiceTangibleItemCondition();
                    } else {
                        return $scope.tangibleItemConditionEdit;
                    }
                }
            }
        }).result.then(function(result) {
            var i;
            if(isNew) {
                if(!angular.isDefined($scope.itemEdit.tangibleItemConditions)) {
                    $scope.itemEdit.tangibleItemConditions = [];
                }
                $scope.itemEdit.tangibleItemConditions.unshift(result);
                for(i in $scope.itemEdit.tangibleItemConditions) {
                    $scope.itemEdit.tangibleItemConditions[i].isSelected = false;
                }
                $scope.tangibleItemConditionEdit = angular.extend(result);
                $scope.itemEdit.tangibleItemConditions[0].isSelected = true;
            }
            else {
                for(i in $scope.itemEdit.tangibleItemConditions) {
                    $scope.itemEdit.tangibleItemConditions[i].isSelected = false;
                }
                $scope.tangibleItemConditionEdit = angular.extend(result);
                var index = $scope.itemEdit.tangibleItemConditions.map(function(it) { return it.id; }).indexOf(result.id);
                for(var key in result) {
                    $scope.itemEdit.tangibleItemConditions[index][key] = result[key];
                }
                $scope.itemEdit.tangibleItemConditions[index].isSelected = true;
            }
        });
    };

    $scope.removeTangibleItemCondition = function(item) {
        var dialog = dialogs.confirm('Please confirm', 'Are you sure you want to delete item?');
        dialog.result.then(function(btn) {
            var removeIndex = $scope.itemEdit.tangibleItemConditions.map(function(it) { return it.id; }).indexOf(item.id);
            $scope.itemEdit.tangibleItemConditions[removeIndex].deleted = true;
        });
    };


	// Save Button
	$scope.save = function() {
	   //	delete $scope.itemEdit.isSelected;
        var item;
        var i;
        for(i in $scope.itemEdit.renamings) {
    		item = $scope.itemEdit.renamings[i];
    		delete item.isSelected;
    	}
        for(i in $scope.itemEdit.workOrders) {
    		item = $scope.itemEdit.workOrders[i];
    		delete item.isSelected;
    	}
        for(i in $scope.itemEdit.deliveryNoteItems) {
    		item = $scope.itemEdit.deliveryNoteItems[i];
    		delete item.isSelected;
    	}
        for(i in $scope.itemEdit.materialReturnNoteItems) {
    		item = $scope.itemEdit.materialReturnNoteItems[i];
    		delete item.isSelected;
    	}
        for(i in $scope.itemEdit.goodsReceivedNoteItems) {
    		item = $scope.itemEdit.goodsReceivedNoteItems[i];
    		delete item.isSelected;
    	}
		$modalInstance.close($scope.itemEdit);
	};


	$scope.canSave = function() {
		var item = $scope.itemEdit;
		return                 item.TISDesignation  &&                 item.TISName  ;
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


.controller('ctrlTangibleItemStatusChoose', ['$scope','ServiceTangibleItemStatus', 'dialogs', '$modal', '$modalInstance', 'itemEdit',
function($scope, ServiceTangibleItemStatus, dialogs, $modal,  $modalInstance, itemEdit) {

    // entity with properties
    $scope.itemDefinition = {
        label: 'stockmanagement.tangibleItemStatus',
        properties: [
            { label: 'tISDesignation', name:'TISDesignation', inTable:  true  },
            { label: 'tISName', name:'TISName', inTable:  true  },
        ]
    };

	$scope.items = [];
	$scope.itemEdit = {};

	// fill table with data
	$scope.loaded = false;
	var getTangibleItemStatuss = function() {
		if(!$scope.loaded && $scope.items.length === 0) {
			$scope.isLoading = true;
			ServiceTangibleItemStatus.query(function(data) {
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
	getTangibleItemStatuss();

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