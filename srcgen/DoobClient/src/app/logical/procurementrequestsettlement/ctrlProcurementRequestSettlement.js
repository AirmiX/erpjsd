'use strict';

angular.module('Doob.logical')


.controller('ctrlProcurementRequestSettlement',['$scope', '$rootScope', '$modal', 'dialogs', 'CheckSelected', 'ServiceProcurementRequestSettlement',
    function($scope, $rootScope, $modal, dialogs, CheckSelected, ServiceProcurementRequestSettlement) {

	// main entity (procurementRequestSettlement) properties names and labels
	$scope.itemDefinition = {
		label: 'logical.procurementRequestSettlement',
		properties: [
			{ label: 'pRSDate', name:'PRSDate', inTable:  true  },
			{ label: 'pRSQuantity', name:'PRSQuantity', inTable:  true  },
			{ label: 'pRSRequestedReceivedListStatus', name:'PRSRequestedReceivedListStatus', inTable:  true  },
			{ label: 'pRSSettlementProcedure', name:'PRSSettlementProcedure', inTable:  false  },
			{ label: 'pRSRequestCreatedBy', name:'PRSRequestCreatedBy', inTable:  false  },
		]
	};

	// procurementRequestItem with properties names and labels
	$scope.procurementRequestItemDefinition = {
		label: 'initialization.procurementRequestItem',
		properties : [
			{ label: 'pRIOrdinalNumber', name:'PRIOrdinalNumber' },
			{ label: 'pRIRequestedQuantity', name:'PRIRequestedQuantity' },
			{ label: 'pRIRealizedQuantity', name:'PRIRealizedQuantity' },
			{ label: 'pRIDeadlineDate', name:'PRIDeadlineDate' },
			{ label: 'pRISupplyStatus', name:'PRISupplyStatus' },
			{ label: 'pRIIncludedQunatityInPlan', name:'PRIIncludedQunatityInPlan' },
			{ label: 'pRIResolutionStatus', name:'PRIResolutionStatus' },
			{ label: 'mUIdentificationCode', name:'MUIdentificationCode' },
		]
	};
	// goodsReceivedNoteItem with properties names and labels
	$scope.goodsReceivedNoteItemDefinition = {
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

	// fill table with data
	$scope.items = [];
	$scope.loaded = false;
	var getProcurementRequestSettlements = function() {
		if(!$scope.loaded && $scope.items.length === 0) {
			$scope.isLoading = true;
			ServiceProcurementRequestSettlement.query(function(data) {
				$scope.items = data;
				$scope.isLoading = false;
				$scope.loaded = true;
			});
		}
	};
	getProcurementRequestSettlements();

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

	$scope.$watch('ProcurementRequestSettlementCollection', function() {
		$scope.itemEdit = CheckSelected.checkSelectedInTable($scope.itemEdit, $scope.ProcurementRequestSettlementCollection, $scope.items);
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
			templateUrl: 'logical/procurementrequestsettlement/tmplProcurementRequestSettlementEdit.tpl.html',
			size: 'lg',
			windowClass: 'hmodal-info',
			controller: 'ctrlProcurementRequestSettlementEdit',
			resolve: {
				itemEdit: function() {
					if(isNew) {
						return new ServiceProcurementRequestSettlement();
					} else {
						return $scope.itemEdit;
					}
				},
				procurementRequestItemDefinition: function() {
					return $scope.procurementRequestItemDefinition;
				},
				goodsReceivedNoteItemDefinition: function() {
					return $scope.goodsReceivedNoteItemDefinition;
				},
			}
		})
		.result.then(function(result) {
			if(!angular.isDefined(result.id)) {
				ServiceProcurementRequestSettlement.saveCustom('stockmanagement/procurementrequestsettlements', result, function(savedObject) {
					$scope.items.unshift(savedObject);
					if($scope.itemEdit !== null) {
						var index = $scope.items.map(function(it) { return it.id; }).indexOf($scope.itemEdit.id);
						$scope.items[index].isSelected = false;
					}
					$scope.itemEdit = angular.extend(savedObject);
					$scope.items[0].isSelected = true;
				});
			 } else {
				 ServiceProcurementRequestSettlement.updateCustom('stockmanagement/procurementrequestsettlements/'+result.id, result, function(savedObject) {
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


.controller('ctrlProcurementRequestSettlementEdit',['$scope', 'Localization', '$modal', '$modalInstance', 'dialogs',
	'ServiceProcurementRequestSettlement', 'ServiceProcurementRequestItem', 'ServiceGoodsReceivedNoteItem',   'procurementRequestItemDefinition',  'goodsReceivedNoteItemDefinition',   'itemEdit',
function($scope, Localization, $modal, $modalInstance, dialogs,
	ServiceProcurementRequestSettlement, ServiceProcurementRequestItem, ServiceGoodsReceivedNoteItem,  procurementRequestItemDefinition,  goodsReceivedNoteItemDefinition,  itemEdit) {

	// dialog mode
	$scope.mode = 'edit';

	// original item state
	var original = angular.copy(itemEdit);
	// item state
	$scope.itemEdit = angular.copy(original);

	// procurementRequestItem with properties
	$scope.procurementRequestItemDefinition = procurementRequestItemDefinition;
	// goodsReceivedNoteItem with properties
	$scope.goodsReceivedNoteItemDefinition = goodsReceivedNoteItemDefinition;

	// datepicker logic

	// date properties
	$scope.openedPRSDate = false;

	$scope.open = function($event, opened) {
		$event.preventDefault();
		$event.stopPropagation();
		$scope[opened] = true;
	};



	// Choose procurementRequestItem
	$scope.openChooseProcurementRequestItemDialog = function() {
        $modal.open({
            backdrop: 'static',
            keyboard : false,
            templateUrl: 'initialization/procurementrequestsettlement/tmplProcurementRequestItemChoose.tpl.html',
            size: 'lg',
            controller: 'ctrlProcurementRequestItemChoose',
            windowClass: 'hmodal-info',
            resolve: {
				itemEdit: function() {
					if(angular.isDefined($scope.itemEdit.procurementRequestItem)){
						return $scope.itemEdit.procurementRequestItem;
					}
				}
			}
		}).result.then(function(result) {
			$scope.itemEdit.procurementRequestItem = angular.copy(result);
		});
    };


	// Choose goodsReceivedNoteItem
	$scope.openChooseGoodsReceivedNoteItemDialog = function() {
        $modal.open({
            backdrop: 'static',
            keyboard : false,
            templateUrl: 'stockmanagement/procurementrequestsettlement/tmplGoodsReceivedNoteItemChoose.tpl.html',
            size: 'lg',
            controller: 'ctrlGoodsReceivedNoteItemChoose',
            windowClass: 'hmodal-info',
            resolve: {
				itemEdit: function() {
					if(angular.isDefined($scope.itemEdit.goodsReceivedNoteItem)){
						return $scope.itemEdit.goodsReceivedNoteItem;
					}
				}
			}
		}).result.then(function(result) {
			$scope.itemEdit.goodsReceivedNoteItem = angular.copy(result);
		});
    };


	// Save Button
	$scope.save = function() {
		correctDateTime($scope.itemEdit.PRSDate);
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
		return                 item.PRSDate  &&                 item.PRSQuantity  &&                 item.PRSRequestedReceivedListStatus  ;
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


.controller('ctrlProcurementRequestSettlementChoose', ['$scope','ServiceProcurementRequestSettlement', 'dialogs', '$modal', '$modalInstance', 'itemEdit',
function($scope, ServiceProcurementRequestSettlement, dialogs, $modal,  $modalInstance, itemEdit) {

    // entity with properties
    $scope.itemDefinition = {
        label: 'logical.procurementRequestSettlement',
        properties: [
            { label: 'pRSDate', name:'PRSDate', inTable:  true  },
            { label: 'pRSQuantity', name:'PRSQuantity', inTable:  true  },
            { label: 'pRSRequestedReceivedListStatus', name:'PRSRequestedReceivedListStatus', inTable:  true  },
            { label: 'pRSSettlementProcedure', name:'PRSSettlementProcedure', inTable:  false  },
            { label: 'pRSRequestCreatedBy', name:'PRSRequestCreatedBy', inTable:  false  },
        ]
    };

	$scope.items = [];
	$scope.itemEdit = {};

	// fill table with data
	$scope.loaded = false;
	var getProcurementRequestSettlements = function() {
		if(!$scope.loaded && $scope.items.length === 0) {
			$scope.isLoading = true;
			ServiceProcurementRequestSettlement.query(function(data) {
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
	getProcurementRequestSettlements();

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