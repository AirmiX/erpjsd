'use strict';

angular.module('Doob.stockmanagement')


.controller('ctrlTangibleItemCondition',['$scope', '$rootScope', '$modal', 'dialogs', 'CheckSelected', 'ServiceTangibleItemCondition',
    function($scope, $rootScope, $modal, dialogs, CheckSelected, ServiceTangibleItemCondition) {

	// main entity (tangibleItemCondition) properties names and labels
	$scope.itemDefinition = {
		label: 'stockmanagement.tangibleItemCondition',
		properties: [
			{ label: 'tICLocatonAddress', name:'TICLocatonAddress', inTable:  true  },
			{ label: 'tICBookkeepingPosition', name:'TICBookkeepingPosition', inTable:  true  },
			{ label: 'tICQuantityInitialState', name:'TICQuantityInitialState', inTable:  false  },
			{ label: 'tICQuantityCumulativeInput', name:'TICQuantityCumulativeInput', inTable:  true  },
			{ label: 'tICQuantityCumulativeOutput', name:'TICQuantityCumulativeOutput', inTable:  false  },
			{ label: 'tICValueInitialState', name:'TICValueInitialState', inTable:  true  },
			{ label: 'tICValueCumulativeInput', name:'TICValueCumulativeInput', inTable:  true  },
			{ label: 'tICValueCumulativeOutput', name:'TICValueCumulativeOutput', inTable:  false  },
			{ label: 'tICUnitPrice', name:'TICUnitPrice', inTable:  true  },
			{ label: 'tICAvailableBalance', name:'TICAvailableBalance', inTable:  true  },
			{ label: 'tICABCStatus', name:'TICABCStatus', inTable:  false  },
			{ label: 'tICOpeningDate', name:'TICOpeningDate', inTable:  true  },
			{ label: 'tICLastInputDate', name:'TICLastInputDate', inTable:  true  },
			{ label: 'tICLastOutputDate', name:'TICLastOutputDate', inTable:  true  },
			{ label: 'tICAdditionalRecordStatus', name:'TICAdditionalRecordStatus', inTable:  false  },
			{ label: 'tICSafetyStatus', name:'TICSafetyStatus', inTable:  false  },
		]
	};

	// identification with properties names and labels
	$scope.identificationDefinition = {
		label: 'commonbusinessentities.identification',
		properties : [
			{ label: 'iIdentificationCode', name:'IIdentificationCode' },
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
	// priceDesignation with properties names and labels
	$scope.priceDesignationDefinition = {
		label: 'stockmanagement.priceDesignation',
		properties : [
			{ label: 'pDPriceDesignation', name:'PDPriceDesignation' },
			{ label: 'pDName', name:'PDName' },
		]
	};
	// measurementUnit with properties names and labels
	$scope.measurementUnitDefinition = {
		label: 'commonbusinessentities.measurementUnit',
		properties : [
			{ label: 'mUIdentificationCode', name:'MUIdentificationCode' },
			{ label: 'mUName', name:'MUName' },
		]
	};
	// account with properties names and labels
	$scope.accountDefinition = {
		label: 'corporation.account',
		properties : [
			{ label: 'aAccountNumber', name:'AAccountNumber' },
			{ label: 'aName', name:'AName' },
			{ label: 'aIsTransfer', name:'AIsTransfer' },
			{ label: 'aEntrySide', name:'AEntrySide' },
			{ label: 'aDisplaySide', name:'ADisplaySide' },
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
	// tangibleItemAnalytics with properties names and labels
	$scope.tangibleItemAnalyticsDefinition = {
		label: 'stockmanagement.tangibleItemAnalytics',
		properties : [
			{ label: 'tIAMeasurementUnit', name:'TIAMeasurementUnit' },
			{ label: 'tIAStocksAccount', name:'TIAStocksAccount' },
			{ label: 'tIAPriceDesignation', name:'TIAPriceDesignation' },
			{ label: 'tIAUser', name:'TIAUser' },
		]
	};
	// shippingDocumentItems with properties names and labels
	$scope.shippingDocumentItemsDefinition = {
		label: 'procurement.shippingDocumentItem',
		properties : [
			{ label: 'sDIOrdinalNumber', name:'SDIOrdinalNumber' },
			{ label: 'sDIQuantityDisposed', name:'SDIQuantityDisposed' },
			{ label: 'sDIQuantityPacked', name:'SDIQuantityPacked' },
			{ label: 'sDIQuantityDispatched', name:'SDIQuantityDispatched' },
		]
	};
	// tangibleItemAmmountLots with properties names and labels
	$scope.tangibleItemAmmountLotsDefinition = {
		label: 'stockmanagement.tangibleItemAmmountByLot',
		properties : [
			{ label: 'tIALLotNumber', name:'TIALLotNumber' },
			{ label: 'tIALLocationAddress', name:'TIALLocationAddress' },
			{ label: 'tIALAvailableAmmount', name:'TIALAvailableAmmount' },
			{ label: 'tIALActivationDate', name:'TIALActivationDate' },
			{ label: 'tIALQuantity', name:'TIALQuantity' },
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
	// materialReturnNoteItems with properties names and labels
	$scope.materialReturnNoteItemsDefinition = {
		label: 'stockmanagement.materialReturnNoteItem',
		properties : [
			{ label: 'mRNIOrdinalNumber', name:'MRNIOrdinalNumber' },
			{ label: 'mRNIQuantityReturned', name:'MRNIQuantityReturned' },
			{ label: 'mRNIPriceDesignation', name:'MRNIPriceDesignation' },
		]
	};
	// tangibleItemAmmountAddresses with properties names and labels
	$scope.tangibleItemAmmountAddressesDefinition = {
		label: 'stockmanagement.tangibleItemAmmountByAddress',
		properties : [
			{ label: 'tIAALocationAddress', name:'TIAALocationAddress' },
			{ label: 'tIAAAvailableAmmount', name:'TIAAAvailableAmmount' },
			{ label: 'tIAAActivationDate', name:'TIAAActivationDate' },
			{ label: 'tIAAQuantity', name:'TIAAQuantity' },
		]
	};

	// fill table with data
	$scope.items = [];
	$scope.loaded = false;
	var getTangibleItemConditions = function() {
		if(!$scope.loaded && $scope.items.length === 0) {
			$scope.isLoading = true;
			ServiceTangibleItemCondition.query(function(data) {
				$scope.items = data;
				$scope.isLoading = false;
				$scope.loaded = true;
			});
		}
	};
	getTangibleItemConditions();

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

	$scope.$watch('TangibleItemConditionCollection', function() {
		$scope.itemEdit = CheckSelected.checkSelectedInTable($scope.itemEdit, $scope.TangibleItemConditionCollection, $scope.items);
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
			templateUrl: 'stockmanagement/tangibleitemcondition/tmplTangibleItemConditionEdit.tpl.html',
			size: 'lg',
			windowClass: 'hmodal-info',
			controller: 'ctrlTangibleItemConditionEdit',
			resolve: {
				itemEdit: function() {
					if(isNew) {
						return new ServiceTangibleItemCondition();
					} else {
						return $scope.itemEdit;
					}
				},
				identificationDefinition: function() {
					return $scope.identificationDefinition;
				},
				documentTypeDefinition: function() {
					return $scope.documentTypeDefinition;
				},
				stockroomDefinition: function() {
					return $scope.stockroomDefinition;
				},
				priceDesignationDefinition: function() {
					return $scope.priceDesignationDefinition;
				},
				measurementUnitDefinition: function() {
					return $scope.measurementUnitDefinition;
				},
				accountDefinition: function() {
					return $scope.accountDefinition;
				},
				tangibleItemStatusDefinition: function() {
					return $scope.tangibleItemStatusDefinition;
				},
				deliveryNoteItemsDefinition: function() {
					return $scope.deliveryNoteItemsDefinition;
				},
				tangibleItemAnalyticsDefinition: function() {
					return $scope.tangibleItemAnalyticsDefinition;
				},
				shippingDocumentItemsDefinition: function() {
					return $scope.shippingDocumentItemsDefinition;
				},
				tangibleItemAmmountLotsDefinition: function() {
					return $scope.tangibleItemAmmountLotsDefinition;
				},
				goodsReceivedNoteItemsDefinition: function() {
					return $scope.goodsReceivedNoteItemsDefinition;
				},
				requisitionItemsDefinition: function() {
					return $scope.requisitionItemsDefinition;
				},
				materialReturnNoteItemsDefinition: function() {
					return $scope.materialReturnNoteItemsDefinition;
				},
				tangibleItemAmmountAddressesDefinition: function() {
					return $scope.tangibleItemAmmountAddressesDefinition;
				},
			}
		})
		.result.then(function(result) {
			if(!angular.isDefined(result.id)) {
				ServiceTangibleItemCondition.saveCustom('stockmanagement/tangibleitemconditions', result, function(savedObject) {
					$scope.items.unshift(savedObject);
					if($scope.itemEdit !== null) {
						var index = $scope.items.map(function(it) { return it.id; }).indexOf($scope.itemEdit.id);
						$scope.items[index].isSelected = false;
					}
					$scope.itemEdit = angular.extend(savedObject);
					$scope.items[0].isSelected = true;
				});
			 } else {
				 ServiceTangibleItemCondition.updateCustom('stockmanagement/tangibleitemconditions/'+result.id, result, function(savedObject) {
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


.controller('ctrlTangibleItemConditionEdit',['$scope', 'Localization', '$modal', '$modalInstance', 'dialogs',
	'ServiceTangibleItemCondition', 'ServiceIdentification', 'ServiceDocumentType', 'ServiceStockroom', 'ServicePriceDesignation', 'ServiceMeasurementUnit', 'ServiceAccount', 'ServiceTangibleItemStatus', 'ServiceDeliveryNoteItem', 'ServiceTangibleItemAnalytics', 'ServiceShippingDocumentItem', 'ServiceTangibleItemAmmountByLot', 'ServiceGoodsReceivedNoteItem', 'ServiceRequisitionItem', 'ServiceMaterialReturnNoteItem', 'ServiceTangibleItemAmmountByAddress',   'identificationDefinition',  'documentTypeDefinition',  'stockroomDefinition',  'priceDesignationDefinition',  'measurementUnitDefinition',  'accountDefinition',  'tangibleItemStatusDefinition',  'deliveryNoteItemsDefinition',  'tangibleItemAnalyticsDefinition',  'shippingDocumentItemsDefinition',  'tangibleItemAmmountLotsDefinition',  'goodsReceivedNoteItemsDefinition',  'requisitionItemsDefinition',  'materialReturnNoteItemsDefinition',  'tangibleItemAmmountAddressesDefinition',   'itemEdit',
function($scope, Localization, $modal, $modalInstance, dialogs,
	ServiceTangibleItemCondition, ServiceIdentification, ServiceDocumentType, ServiceStockroom, ServicePriceDesignation, ServiceMeasurementUnit, ServiceAccount, ServiceTangibleItemStatus, ServiceDeliveryNoteItem, ServiceTangibleItemAnalytics, ServiceShippingDocumentItem, ServiceTangibleItemAmmountByLot, ServiceGoodsReceivedNoteItem, ServiceRequisitionItem, ServiceMaterialReturnNoteItem, ServiceTangibleItemAmmountByAddress,  identificationDefinition,  documentTypeDefinition,  stockroomDefinition,  priceDesignationDefinition,  measurementUnitDefinition,  accountDefinition,  tangibleItemStatusDefinition,  deliveryNoteItemsDefinition,  tangibleItemAnalyticsDefinition,  shippingDocumentItemsDefinition,  tangibleItemAmmountLotsDefinition,  goodsReceivedNoteItemsDefinition,  requisitionItemsDefinition,  materialReturnNoteItemsDefinition,  tangibleItemAmmountAddressesDefinition,  itemEdit) {

	// dialog mode
	$scope.mode = 'edit';

	// original item state
	var original = angular.copy(itemEdit);
	// item state
	$scope.itemEdit = angular.copy(original);

	// identification with properties
	$scope.identificationDefinition = identificationDefinition;
	// documentType with properties
	$scope.documentTypeDefinition = documentTypeDefinition;
	// stockroom with properties
	$scope.stockroomDefinition = stockroomDefinition;
	// priceDesignation with properties
	$scope.priceDesignationDefinition = priceDesignationDefinition;
	// measurementUnit with properties
	$scope.measurementUnitDefinition = measurementUnitDefinition;
	// account with properties
	$scope.accountDefinition = accountDefinition;
	// tangibleItemStatus with properties
	$scope.tangibleItemStatusDefinition = tangibleItemStatusDefinition;
	// deliveryNoteItems with properties
	$scope.deliveryNoteItemsDefinition = deliveryNoteItemsDefinition;
	// tangibleItemAnalytics with properties
	$scope.tangibleItemAnalyticsDefinition = tangibleItemAnalyticsDefinition;
	// shippingDocumentItems with properties
	$scope.shippingDocumentItemsDefinition = shippingDocumentItemsDefinition;
	// tangibleItemAmmountLots with properties
	$scope.tangibleItemAmmountLotsDefinition = tangibleItemAmmountLotsDefinition;
	// goodsReceivedNoteItems with properties
	$scope.goodsReceivedNoteItemsDefinition = goodsReceivedNoteItemsDefinition;
	// requisitionItems with properties
	$scope.requisitionItemsDefinition = requisitionItemsDefinition;
	// materialReturnNoteItems with properties
	$scope.materialReturnNoteItemsDefinition = materialReturnNoteItemsDefinition;
	// tangibleItemAmmountAddresses with properties
	$scope.tangibleItemAmmountAddressesDefinition = tangibleItemAmmountAddressesDefinition;

	// datepicker logic

	// date properties
	$scope.openedTICOpeningDate = false;
	$scope.openedTICLastInputDate = false;
	$scope.openedTICLastOutputDate = false;

	$scope.open = function($event, opened) {
		$event.preventDefault();
		$event.stopPropagation();
		$scope[opened] = true;
	};



	// Choose identification
	$scope.openChooseIdentificationDialog = function() {
        $modal.open({
            backdrop: 'static',
            keyboard : false,
            templateUrl: 'commonbusinessentities/tangibleitemcondition/tmplIdentificationChoose.tpl.html',
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


	// Choose documentType
	$scope.openChooseDocumentTypeDialog = function() {
        $modal.open({
            backdrop: 'static',
            keyboard : false,
            templateUrl: 'corporation/tangibleitemcondition/tmplDocumentTypeChoose.tpl.html',
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


	// Choose stockroom
	$scope.openChooseStockroomDialog = function() {
        $modal.open({
            backdrop: 'static',
            keyboard : false,
            templateUrl: 'stock/tangibleitemcondition/tmplStockroomChoose.tpl.html',
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


	// Choose priceDesignation
	$scope.openChoosePriceDesignationDialog = function() {
        $modal.open({
            backdrop: 'static',
            keyboard : false,
            templateUrl: 'stockmanagement/tangibleitemcondition/tmplPriceDesignationChoose.tpl.html',
            size: 'lg',
            controller: 'ctrlPriceDesignationChoose',
            windowClass: 'hmodal-info',
            resolve: {
				itemEdit: function() {
					if(angular.isDefined($scope.itemEdit.priceDesignation)){
						return $scope.itemEdit.priceDesignation;
					}
				}
			}
		}).result.then(function(result) {
			$scope.itemEdit.priceDesignation = angular.copy(result);
		});
    };


	// Choose measurementUnit
	$scope.openChooseMeasurementUnitDialog = function() {
        $modal.open({
            backdrop: 'static',
            keyboard : false,
            templateUrl: 'commonbusinessentities/tangibleitemcondition/tmplMeasurementUnitChoose.tpl.html',
            size: 'lg',
            controller: 'ctrlMeasurementUnitChoose',
            windowClass: 'hmodal-info',
            resolve: {
				itemEdit: function() {
					if(angular.isDefined($scope.itemEdit.measurementUnit)){
						return $scope.itemEdit.measurementUnit;
					}
				}
			}
		}).result.then(function(result) {
			$scope.itemEdit.measurementUnit = angular.copy(result);
		});
    };


	// Choose account
	$scope.openChooseAccountDialog = function() {
        $modal.open({
            backdrop: 'static',
            keyboard : false,
            templateUrl: 'corporation/tangibleitemcondition/tmplAccountChoose.tpl.html',
            size: 'lg',
            controller: 'ctrlAccountChoose',
            windowClass: 'hmodal-info',
            resolve: {
				itemEdit: function() {
					if(angular.isDefined($scope.itemEdit.account)){
						return $scope.itemEdit.account;
					}
				}
			}
		}).result.then(function(result) {
			$scope.itemEdit.account = angular.copy(result);
		});
    };


	// Choose tangibleItemStatus
	$scope.openChooseTangibleItemStatusDialog = function() {
        $modal.open({
            backdrop: 'static',
            keyboard : false,
            templateUrl: 'stockmanagement/tangibleitemcondition/tmplTangibleItemStatusChoose.tpl.html',
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


    $scope.tangibleItemAmmountByLotEdit = null;

    // tangibleItemAmmountLots table selection logic
    $scope.tangibleItemAmmountByLotSelection = function(item, index) {
        if(item.isSelected) {
            if($scope.tangibleItemAmmountByLotEdit !== null) {
                var index1 = $scope.itemEdit.tangibleItemAmmountLots.map(function(it) { return it.id; }).indexOf($scope.tangibleItemAmmountByLotEdit.id);
                $scope.itemEdit.tangibleItemAmmountLots[index1].isSelected = false;
            }
            $scope.tangibleItemAmmountByLotEdit = item;
        } else {
            $scope.tangibleItemAmmountByLotEdit = null;
            item.isSelected = false;
        }
    };

    // New/Edit tangibleItemAmmountLots dialog
    $scope.openTangibleItemAmmountByLotEditDialog = function(isNew) {
        $modal.open({
            backdrop: 'static',
            keyboard : false,
            templateUrl: 'stockmanagement/tangibleitemcondition/tmplTangibleItemAmmountByLotEdit.tpl.html',
            size: 'lg',
            controller: 'ctrlTangibleItemAmmountByLotEdit',
            windowClass: 'hmodal-info',
            resolve: {
                itemEdit: function() {
                    if(isNew) {
                        return new ServiceTangibleItemAmmountByLot();
                    } else {
                        return $scope.tangibleItemAmmountByLotEdit;
                    }
                }
            }
        }).result.then(function(result) {
            var i;
            if(isNew) {
                if(!angular.isDefined($scope.itemEdit.tangibleItemAmmountLots)) {
                    $scope.itemEdit.tangibleItemAmmountLots = [];
                }
                $scope.itemEdit.tangibleItemAmmountLots.unshift(result);
                for(i in $scope.itemEdit.tangibleItemAmmountLots) {
                    $scope.itemEdit.tangibleItemAmmountLots[i].isSelected = false;
                }
                $scope.tangibleItemAmmountByLotEdit = angular.extend(result);
                $scope.itemEdit.tangibleItemAmmountLots[0].isSelected = true;
            }
            else {
                for(i in $scope.itemEdit.tangibleItemAmmountLots) {
                    $scope.itemEdit.tangibleItemAmmountLots[i].isSelected = false;
                }
                $scope.tangibleItemAmmountByLotEdit = angular.extend(result);
                var index = $scope.itemEdit.tangibleItemAmmountLots.map(function(it) { return it.id; }).indexOf(result.id);
                for(var key in result) {
                    $scope.itemEdit.tangibleItemAmmountLots[index][key] = result[key];
                }
                $scope.itemEdit.tangibleItemAmmountLots[index].isSelected = true;
            }
        });
    };

    $scope.removeTangibleItemAmmountByLot = function(item) {
        var dialog = dialogs.confirm('Please confirm', 'Are you sure you want to delete item?');
        dialog.result.then(function(btn) {
            var removeIndex = $scope.itemEdit.tangibleItemAmmountLots.map(function(it) { return it.id; }).indexOf(item.id);
            $scope.itemEdit.tangibleItemAmmountLots[removeIndex].deleted = true;
        });
    };


    $scope.tangibleItemAmmountByAddressEdit = null;

    // tangibleItemAmmountAddresses table selection logic
    $scope.tangibleItemAmmountByAddressSelection = function(item, index) {
        if(item.isSelected) {
            if($scope.tangibleItemAmmountByAddressEdit !== null) {
                var index1 = $scope.itemEdit.tangibleItemAmmountAddresses.map(function(it) { return it.id; }).indexOf($scope.tangibleItemAmmountByAddressEdit.id);
                $scope.itemEdit.tangibleItemAmmountAddresses[index1].isSelected = false;
            }
            $scope.tangibleItemAmmountByAddressEdit = item;
        } else {
            $scope.tangibleItemAmmountByAddressEdit = null;
            item.isSelected = false;
        }
    };

    // New/Edit tangibleItemAmmountAddresses dialog
    $scope.openTangibleItemAmmountByAddressEditDialog = function(isNew) {
        $modal.open({
            backdrop: 'static',
            keyboard : false,
            templateUrl: 'stockmanagement/tangibleitemcondition/tmplTangibleItemAmmountByAddressEdit.tpl.html',
            size: 'lg',
            controller: 'ctrlTangibleItemAmmountByAddressEdit',
            windowClass: 'hmodal-info',
            resolve: {
                itemEdit: function() {
                    if(isNew) {
                        return new ServiceTangibleItemAmmountByAddress();
                    } else {
                        return $scope.tangibleItemAmmountByAddressEdit;
                    }
                }
            }
        }).result.then(function(result) {
            var i;
            if(isNew) {
                if(!angular.isDefined($scope.itemEdit.tangibleItemAmmountAddresses)) {
                    $scope.itemEdit.tangibleItemAmmountAddresses = [];
                }
                $scope.itemEdit.tangibleItemAmmountAddresses.unshift(result);
                for(i in $scope.itemEdit.tangibleItemAmmountAddresses) {
                    $scope.itemEdit.tangibleItemAmmountAddresses[i].isSelected = false;
                }
                $scope.tangibleItemAmmountByAddressEdit = angular.extend(result);
                $scope.itemEdit.tangibleItemAmmountAddresses[0].isSelected = true;
            }
            else {
                for(i in $scope.itemEdit.tangibleItemAmmountAddresses) {
                    $scope.itemEdit.tangibleItemAmmountAddresses[i].isSelected = false;
                }
                $scope.tangibleItemAmmountByAddressEdit = angular.extend(result);
                var index = $scope.itemEdit.tangibleItemAmmountAddresses.map(function(it) { return it.id; }).indexOf(result.id);
                for(var key in result) {
                    $scope.itemEdit.tangibleItemAmmountAddresses[index][key] = result[key];
                }
                $scope.itemEdit.tangibleItemAmmountAddresses[index].isSelected = true;
            }
        });
    };

    $scope.removeTangibleItemAmmountByAddress = function(item) {
        var dialog = dialogs.confirm('Please confirm', 'Are you sure you want to delete item?');
        dialog.result.then(function(btn) {
            var removeIndex = $scope.itemEdit.tangibleItemAmmountAddresses.map(function(it) { return it.id; }).indexOf(item.id);
            $scope.itemEdit.tangibleItemAmmountAddresses[removeIndex].deleted = true;
        });
    };


	// Save Button
	$scope.save = function() {
		correctDateTime($scope.itemEdit.TICOpeningDate);
		correctDateTime($scope.itemEdit.TICLastInputDate);
		correctDateTime($scope.itemEdit.TICLastOutputDate);
	   //	delete $scope.itemEdit.isSelected;
        var item;
        var i;
        for(i in $scope.itemEdit.deliveryNoteItems) {
    		item = $scope.itemEdit.deliveryNoteItems[i];
    		delete item.isSelected;
    	}
        for(i in $scope.itemEdit.tangibleItemAnalytics) {
    		item = $scope.itemEdit.tangibleItemAnalytics[i];
    		delete item.isSelected;
    	}
        for(i in $scope.itemEdit.shippingDocumentItems) {
    		item = $scope.itemEdit.shippingDocumentItems[i];
    		delete item.isSelected;
    	}
        for(i in $scope.itemEdit.goodsReceivedNoteItems) {
    		item = $scope.itemEdit.goodsReceivedNoteItems[i];
    		delete item.isSelected;
    	}
        for(i in $scope.itemEdit.requisitionItems) {
    		item = $scope.itemEdit.requisitionItems[i];
    		delete item.isSelected;
    	}
        for(i in $scope.itemEdit.materialReturnNoteItems) {
    		item = $scope.itemEdit.materialReturnNoteItems[i];
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
		return                 item.TICLocatonAddress  &&                 item.TICBookkeepingPosition  &&                 item.TICQuantityCumulativeInput  &&                 item.TICValueInitialState  &&                 item.TICValueCumulativeInput  &&                 item.TICUnitPrice  &&                 item.TICAvailableBalance  &&                 item.TICOpeningDate  &&                 item.TICLastInputDate  &&                 item.TICLastOutputDate  ;
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


.controller('ctrlTangibleItemConditionChoose', ['$scope','ServiceTangibleItemCondition', 'dialogs', '$modal', '$modalInstance', 'itemEdit',
function($scope, ServiceTangibleItemCondition, dialogs, $modal,  $modalInstance, itemEdit) {

    // entity with properties
    $scope.itemDefinition = {
        label: 'stockmanagement.tangibleItemCondition',
        properties: [
            { label: 'tICLocatonAddress', name:'TICLocatonAddress', inTable:  true  },
            { label: 'tICBookkeepingPosition', name:'TICBookkeepingPosition', inTable:  true  },
            { label: 'tICQuantityInitialState', name:'TICQuantityInitialState', inTable:  false  },
            { label: 'tICQuantityCumulativeInput', name:'TICQuantityCumulativeInput', inTable:  true  },
            { label: 'tICQuantityCumulativeOutput', name:'TICQuantityCumulativeOutput', inTable:  false  },
            { label: 'tICValueInitialState', name:'TICValueInitialState', inTable:  true  },
            { label: 'tICValueCumulativeInput', name:'TICValueCumulativeInput', inTable:  true  },
            { label: 'tICValueCumulativeOutput', name:'TICValueCumulativeOutput', inTable:  false  },
            { label: 'tICUnitPrice', name:'TICUnitPrice', inTable:  true  },
            { label: 'tICAvailableBalance', name:'TICAvailableBalance', inTable:  true  },
            { label: 'tICABCStatus', name:'TICABCStatus', inTable:  false  },
            { label: 'tICOpeningDate', name:'TICOpeningDate', inTable:  true  },
            { label: 'tICLastInputDate', name:'TICLastInputDate', inTable:  true  },
            { label: 'tICLastOutputDate', name:'TICLastOutputDate', inTable:  true  },
            { label: 'tICAdditionalRecordStatus', name:'TICAdditionalRecordStatus', inTable:  false  },
            { label: 'tICSafetyStatus', name:'TICSafetyStatus', inTable:  false  },
        ]
    };

	$scope.items = [];
	$scope.itemEdit = {};

	// fill table with data
	$scope.loaded = false;
	var getTangibleItemConditions = function() {
		if(!$scope.loaded && $scope.items.length === 0) {
			$scope.isLoading = true;
			ServiceTangibleItemCondition.query(function(data) {
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
	getTangibleItemConditions();

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