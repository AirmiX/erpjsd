'use strict';

angular.module('Doob.stockmanagement')


.controller('ctrlGoodsReceivedNoteItem',['$scope', '$rootScope', '$modal', 'dialogs', 'CheckSelected', 'ServiceGoodsReceivedNoteItem',
    function($scope, $rootScope, $modal, dialogs, CheckSelected, ServiceGoodsReceivedNoteItem) {

	// main entity (goodsReceivedNoteItem) properties names and labels
	$scope.itemDefinition = {
		label: 'stockmanagement.goodsReceivedNoteItem',
		properties: [
			{ label: 'gRNIOrdinalNumber', name:'GRNIOrdinalNumber', inTable:  true  },
			{ label: 'gRNIStockAccount', name:'GRNIStockAccount', inTable:  true  },
			{ label: 'gRNIPriceDesignation', name:'GRNIPriceDesignation', inTable:  true  },
			{ label: 'gRNIMeasurementUnit', name:'GRNIMeasurementUnit', inTable:  true  },
			{ label: 'gRNIQuantityByShippingDocument', name:'GRNIQuantityByShippingDocument', inTable:  true  },
			{ label: 'gRNIQunaityReceived', name:'GRNIQunaityReceived', inTable:  true  },
			{ label: 'gRNIQuantityIssued', name:'GRNIQuantityIssued', inTable:  true  },
			{ label: 'gRNIValue', name:'GRNIValue', inTable:  false  },
			{ label: 'gRNIAddress', name:'GRNIAddress', inTable:  false  },
			{ label: 'gRNIUnitPrice', name:'GRNIUnitPrice', inTable:  false  },
			{ label: 'gRNIBookkeepingPosition', name:'GRNIBookkeepingPosition', inTable:  false  },
			{ label: 'gRNIQuantityAfterBookkeeping', name:'GRNIQuantityAfterBookkeeping', inTable:  false  },
			{ label: 'gRNIStorno', name:'GRNIStorno', inTable:  false  },
			{ label: 'gRNIBatchDesignation', name:'GRNIBatchDesignation', inTable:  false  },
			{ label: 'gRNIObsoescenceDate', name:'GRNIObsoescenceDate', inTable:  false  },
			{ label: 'gRNIQuantityRejected', name:'GRNIQuantityRejected', inTable:  false  },
			{ label: 'gRNIRejectedItemControlRemark', name:'GRNIRejectedItemControlRemark', inTable:  false  },
			{ label: 'gRNIRemark', name:'GRNIRemark', inTable:  false  },
			{ label: 'gRNIQuantityReceivedQuantified', name:'GRNIQuantityReceivedQuantified', inTable:  false  },
			{ label: 'gRNIQuantityRejectedQuantified', name:'GRNIQuantityRejectedQuantified', inTable:  false  },
			{ label: 'gRNISellingPrice', name:'GRNISellingPrice', inTable:  false  },
		]
	};

	// goodsReceivedNoteHeading with properties names and labels
	$scope.goodsReceivedNoteHeadingDefinition = {
		label: 'stockmanagement.goodsReceivedNoteHeading',
		properties : [
			{ label: 'gRNHNumber', name:'GRNHNumber' },
			{ label: 'gRNHSupplierShippingDocument', name:'GRNHSupplierShippingDocument' },
			{ label: 'gRNHShippingDocumentDate', name:'GRNHShippingDocumentDate' },
			{ label: 'gRNHArrivalDate', name:'GRNHArrivalDate' },
			{ label: 'gRNHCompletionStatus', name:'GRNHCompletionStatus' },
			{ label: 'gRNHPrintStatus', name:'GRNHPrintStatus' },
		]
	};
	// tangibleItemCondition with properties names and labels
	$scope.tangibleItemConditionDefinition = {
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
	// orderSupplierItem with properties names and labels
	$scope.orderSupplierItemDefinition = {
		label: 'logical.orderSupplierItem',
		properties : [
			{ label: 'oSIOrdinalNumber', name:'OSIOrdinalNumber' },
			{ label: 'oSIOrderedQuantity', name:'OSIOrderedQuantity' },
			{ label: 'oSIDeliveryDeadline', name:'OSIDeliveryDeadline' },
			{ label: 'oSIQuantityReceived', name:'OSIQuantityReceived' },
			{ label: 'oSIProcurementStatus', name:'OSIProcurementStatus' },
		]
	};
	// goodsAcceptanceStatus with properties names and labels
	$scope.goodsAcceptanceStatusDefinition = {
		label: 'initialization.goodsAcceptanceStatus',
		properties : [
			{ label: 'gASDesignation', name:'GASDesignation' },
			{ label: 'gASDescription', name:'GASDescription' },
		]
	};
	// identification with properties names and labels
	$scope.identificationDefinition = {
		label: 'commonbusinessentities.identification',
		properties : [
			{ label: 'iIdentificationCode', name:'IIdentificationCode' },
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
	// procurementRequestSettlements with properties names and labels
	$scope.procurementRequestSettlementsDefinition = {
		label: 'logical.procurementRequestSettlement',
		properties : [
			{ label: 'pRSDate', name:'PRSDate' },
			{ label: 'pRSQuantity', name:'PRSQuantity' },
			{ label: 'pRSRequestedReceivedListStatus', name:'PRSRequestedReceivedListStatus' },
		]
	};

	// fill table with data
	$scope.items = [];
	$scope.loaded = false;
	var getGoodsReceivedNoteItems = function() {
		if(!$scope.loaded && $scope.items.length === 0) {
			$scope.isLoading = true;
			ServiceGoodsReceivedNoteItem.query(function(data) {
				$scope.items = data;
				$scope.isLoading = false;
				$scope.loaded = true;
			});
		}
	};
	getGoodsReceivedNoteItems();

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

	$scope.$watch('GoodsReceivedNoteItemCollection', function() {
		$scope.itemEdit = CheckSelected.checkSelectedInTable($scope.itemEdit, $scope.GoodsReceivedNoteItemCollection, $scope.items);
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
			templateUrl: 'stockmanagement/goodsreceivednoteitem/tmplGoodsReceivedNoteItemEdit.tpl.html',
			size: 'lg',
			windowClass: 'hmodal-info',
			controller: 'ctrlGoodsReceivedNoteItemEdit',
			resolve: {
				itemEdit: function() {
					if(isNew) {
						return new ServiceGoodsReceivedNoteItem();
					} else {
						return $scope.itemEdit;
					}
				},
				goodsReceivedNoteHeadingDefinition: function() {
					return $scope.goodsReceivedNoteHeadingDefinition;
				},
				tangibleItemConditionDefinition: function() {
					return $scope.tangibleItemConditionDefinition;
				},
				orderSupplierItemDefinition: function() {
					return $scope.orderSupplierItemDefinition;
				},
				goodsAcceptanceStatusDefinition: function() {
					return $scope.goodsAcceptanceStatusDefinition;
				},
				identificationDefinition: function() {
					return $scope.identificationDefinition;
				},
				tangibleItemStatusDefinition: function() {
					return $scope.tangibleItemStatusDefinition;
				},
				procurementRequestSettlementsDefinition: function() {
					return $scope.procurementRequestSettlementsDefinition;
				},
			}
		})
		.result.then(function(result) {
			if(!angular.isDefined(result.id)) {
				ServiceGoodsReceivedNoteItem.saveCustom('stockmanagement/goodsreceivednoteitems', result, function(savedObject) {
					$scope.items.unshift(savedObject);
					if($scope.itemEdit !== null) {
						var index = $scope.items.map(function(it) { return it.id; }).indexOf($scope.itemEdit.id);
						$scope.items[index].isSelected = false;
					}
					$scope.itemEdit = angular.extend(savedObject);
					$scope.items[0].isSelected = true;
				});
			 } else {
				 ServiceGoodsReceivedNoteItem.updateCustom('stockmanagement/goodsreceivednoteitems/'+result.id, result, function(savedObject) {
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


.controller('ctrlGoodsReceivedNoteItemEdit',['$scope', 'Localization', '$modal', '$modalInstance', 'dialogs',
	'ServiceGoodsReceivedNoteItem', 'ServiceGoodsReceivedNoteHeading', 'ServiceTangibleItemCondition', 'ServiceOrderSupplierItem', 'ServiceGoodsAcceptanceStatus', 'ServiceIdentification', 'ServiceTangibleItemStatus', 'ServiceProcurementRequestSettlement',   'goodsReceivedNoteHeadingDefinition',  'tangibleItemConditionDefinition',  'orderSupplierItemDefinition',  'goodsAcceptanceStatusDefinition',  'identificationDefinition',  'tangibleItemStatusDefinition',  'procurementRequestSettlementsDefinition',   'itemEdit',
function($scope, Localization, $modal, $modalInstance, dialogs,
	ServiceGoodsReceivedNoteItem, ServiceGoodsReceivedNoteHeading, ServiceTangibleItemCondition, ServiceOrderSupplierItem, ServiceGoodsAcceptanceStatus, ServiceIdentification, ServiceTangibleItemStatus, ServiceProcurementRequestSettlement,  goodsReceivedNoteHeadingDefinition,  tangibleItemConditionDefinition,  orderSupplierItemDefinition,  goodsAcceptanceStatusDefinition,  identificationDefinition,  tangibleItemStatusDefinition,  procurementRequestSettlementsDefinition,  itemEdit) {

	// dialog mode
	$scope.mode = 'edit';

	// original item state
	var original = angular.copy(itemEdit);
	// item state
	$scope.itemEdit = angular.copy(original);

	// goodsReceivedNoteHeading with properties
	$scope.goodsReceivedNoteHeadingDefinition = goodsReceivedNoteHeadingDefinition;
	// tangibleItemCondition with properties
	$scope.tangibleItemConditionDefinition = tangibleItemConditionDefinition;
	// orderSupplierItem with properties
	$scope.orderSupplierItemDefinition = orderSupplierItemDefinition;
	// goodsAcceptanceStatus with properties
	$scope.goodsAcceptanceStatusDefinition = goodsAcceptanceStatusDefinition;
	// identification with properties
	$scope.identificationDefinition = identificationDefinition;
	// tangibleItemStatus with properties
	$scope.tangibleItemStatusDefinition = tangibleItemStatusDefinition;
	// procurementRequestSettlements with properties
	$scope.procurementRequestSettlementsDefinition = procurementRequestSettlementsDefinition;

	// datepicker logic

	// date properties
	$scope.openedGRNIObsoescenceDate = false;

	$scope.open = function($event, opened) {
		$event.preventDefault();
		$event.stopPropagation();
		$scope[opened] = true;
	};



	// Choose goodsReceivedNoteHeading
	$scope.openChooseGoodsReceivedNoteHeadingDialog = function() {
        $modal.open({
            backdrop: 'static',
            keyboard : false,
            templateUrl: 'stockmanagement/goodsreceivednoteitem/tmplGoodsReceivedNoteHeadingChoose.tpl.html',
            size: 'lg',
            controller: 'ctrlGoodsReceivedNoteHeadingChoose',
            windowClass: 'hmodal-info',
            resolve: {
				itemEdit: function() {
					if(angular.isDefined($scope.itemEdit.goodsReceivedNoteHeading)){
						return $scope.itemEdit.goodsReceivedNoteHeading;
					}
				}
			}
		}).result.then(function(result) {
			$scope.itemEdit.goodsReceivedNoteHeading = angular.copy(result);
		});
    };


	// Choose tangibleItemCondition
	$scope.openChooseTangibleItemConditionDialog = function() {
        $modal.open({
            backdrop: 'static',
            keyboard : false,
            templateUrl: 'stockmanagement/goodsreceivednoteitem/tmplTangibleItemConditionChoose.tpl.html',
            size: 'lg',
            controller: 'ctrlTangibleItemConditionChoose',
            windowClass: 'hmodal-info',
            resolve: {
				itemEdit: function() {
					if(angular.isDefined($scope.itemEdit.tangibleItemCondition)){
						return $scope.itemEdit.tangibleItemCondition;
					}
				}
			}
		}).result.then(function(result) {
			$scope.itemEdit.tangibleItemCondition = angular.copy(result);
		});
    };


	// Choose orderSupplierItem
	$scope.openChooseOrderSupplierItemDialog = function() {
        $modal.open({
            backdrop: 'static',
            keyboard : false,
            templateUrl: 'logical/goodsreceivednoteitem/tmplOrderSupplierItemChoose.tpl.html',
            size: 'lg',
            controller: 'ctrlOrderSupplierItemChoose',
            windowClass: 'hmodal-info',
            resolve: {
				itemEdit: function() {
					if(angular.isDefined($scope.itemEdit.orderSupplierItem)){
						return $scope.itemEdit.orderSupplierItem;
					}
				}
			}
		}).result.then(function(result) {
			$scope.itemEdit.orderSupplierItem = angular.copy(result);
		});
    };


	// Choose goodsAcceptanceStatus
	$scope.openChooseGoodsAcceptanceStatusDialog = function() {
        $modal.open({
            backdrop: 'static',
            keyboard : false,
            templateUrl: 'initialization/goodsreceivednoteitem/tmplGoodsAcceptanceStatusChoose.tpl.html',
            size: 'lg',
            controller: 'ctrlGoodsAcceptanceStatusChoose',
            windowClass: 'hmodal-info',
            resolve: {
				itemEdit: function() {
					if(angular.isDefined($scope.itemEdit.goodsAcceptanceStatus)){
						return $scope.itemEdit.goodsAcceptanceStatus;
					}
				}
			}
		}).result.then(function(result) {
			$scope.itemEdit.goodsAcceptanceStatus = angular.copy(result);
		});
    };


	// Choose identification
	$scope.openChooseIdentificationDialog = function() {
        $modal.open({
            backdrop: 'static',
            keyboard : false,
            templateUrl: 'commonbusinessentities/goodsreceivednoteitem/tmplIdentificationChoose.tpl.html',
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


	// Choose tangibleItemStatus
	$scope.openChooseTangibleItemStatusDialog = function() {
        $modal.open({
            backdrop: 'static',
            keyboard : false,
            templateUrl: 'stockmanagement/goodsreceivednoteitem/tmplTangibleItemStatusChoose.tpl.html',
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
            templateUrl: 'logical/goodsreceivednoteitem/tmplProcurementRequestSettlementEdit.tpl.html',
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


	// Save Button
	$scope.save = function() {
		correctDateTime($scope.itemEdit.GRNIObsoescenceDate);
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
		return                 item.GRNIOrdinalNumber  &&                 item.GRNIStockAccount  &&                 item.GRNIPriceDesignation  &&                 item.GRNIMeasurementUnit  &&                 item.GRNIQuantityByShippingDocument  &&                 item.GRNIQunaityReceived  &&                 item.GRNIQuantityIssued  ;
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


.controller('ctrlGoodsReceivedNoteItemChoose', ['$scope','ServiceGoodsReceivedNoteItem', 'dialogs', '$modal', '$modalInstance', 'itemEdit',
function($scope, ServiceGoodsReceivedNoteItem, dialogs, $modal,  $modalInstance, itemEdit) {

    // entity with properties
    $scope.itemDefinition = {
        label: 'stockmanagement.goodsReceivedNoteItem',
        properties: [
            { label: 'gRNIOrdinalNumber', name:'GRNIOrdinalNumber', inTable:  true  },
            { label: 'gRNIStockAccount', name:'GRNIStockAccount', inTable:  true  },
            { label: 'gRNIPriceDesignation', name:'GRNIPriceDesignation', inTable:  true  },
            { label: 'gRNIMeasurementUnit', name:'GRNIMeasurementUnit', inTable:  true  },
            { label: 'gRNIQuantityByShippingDocument', name:'GRNIQuantityByShippingDocument', inTable:  true  },
            { label: 'gRNIQunaityReceived', name:'GRNIQunaityReceived', inTable:  true  },
            { label: 'gRNIQuantityIssued', name:'GRNIQuantityIssued', inTable:  true  },
            { label: 'gRNIValue', name:'GRNIValue', inTable:  false  },
            { label: 'gRNIAddress', name:'GRNIAddress', inTable:  false  },
            { label: 'gRNIUnitPrice', name:'GRNIUnitPrice', inTable:  false  },
            { label: 'gRNIBookkeepingPosition', name:'GRNIBookkeepingPosition', inTable:  false  },
            { label: 'gRNIQuantityAfterBookkeeping', name:'GRNIQuantityAfterBookkeeping', inTable:  false  },
            { label: 'gRNIStorno', name:'GRNIStorno', inTable:  false  },
            { label: 'gRNIBatchDesignation', name:'GRNIBatchDesignation', inTable:  false  },
            { label: 'gRNIObsoescenceDate', name:'GRNIObsoescenceDate', inTable:  false  },
            { label: 'gRNIQuantityRejected', name:'GRNIQuantityRejected', inTable:  false  },
            { label: 'gRNIRejectedItemControlRemark', name:'GRNIRejectedItemControlRemark', inTable:  false  },
            { label: 'gRNIRemark', name:'GRNIRemark', inTable:  false  },
            { label: 'gRNIQuantityReceivedQuantified', name:'GRNIQuantityReceivedQuantified', inTable:  false  },
            { label: 'gRNIQuantityRejectedQuantified', name:'GRNIQuantityRejectedQuantified', inTable:  false  },
            { label: 'gRNISellingPrice', name:'GRNISellingPrice', inTable:  false  },
        ]
    };

	$scope.items = [];
	$scope.itemEdit = {};

	// fill table with data
	$scope.loaded = false;
	var getGoodsReceivedNoteItems = function() {
		if(!$scope.loaded && $scope.items.length === 0) {
			$scope.isLoading = true;
			ServiceGoodsReceivedNoteItem.query(function(data) {
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
	getGoodsReceivedNoteItems();

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