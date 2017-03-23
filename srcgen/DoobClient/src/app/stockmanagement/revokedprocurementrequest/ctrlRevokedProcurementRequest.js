'use strict';

angular.module('Doob.stockmanagement')


.controller('ctrlRevokedProcurementRequest',['$scope', '$rootScope', '$modal', 'dialogs', 'CheckSelected', 'ServiceRevokedProcurementRequest',
    function($scope, $rootScope, $modal, dialogs, CheckSelected, ServiceRevokedProcurementRequest) {

	// main entity (revokedProcurementRequest) properties names and labels
	$scope.itemDefinition = {
		label: 'stockmanagement.revokedProcurementRequest',
		properties: [
			{ label: 'rPRDate', name:'RPRDate', inTable:  true  },
			{ label: 'rPRIdentificationNumber', name:'RPRIdentificationNumber', inTable:  true  },
			{ label: 'rPRMeasurementUnit', name:'RPRMeasurementUnit', inTable:  true  },
			{ label: 'rPRQuantityRequested', name:'RPRQuantityRequested', inTable:  true  },
			{ label: 'rPRQuantityRealized', name:'RPRQuantityRealized', inTable:  true  },
			{ label: 'rPRProcurementDeadline', name:'RPRProcurementDeadline', inTable:  true  },
			{ label: 'rPRWorkOrderContractPlace', name:'RPRWorkOrderContractPlace', inTable:  true  },
			{ label: 'rPRStatus', name:'RPRStatus', inTable:  false  },
			{ label: 'rPRRemark', name:'RPRRemark', inTable:  false  },
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

	// fill table with data
	$scope.items = [];
	$scope.loaded = false;
	var getRevokedProcurementRequests = function() {
		if(!$scope.loaded && $scope.items.length === 0) {
			$scope.isLoading = true;
			ServiceRevokedProcurementRequest.query(function(data) {
				$scope.items = data;
				$scope.isLoading = false;
				$scope.loaded = true;
			});
		}
	};
	getRevokedProcurementRequests();

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

	$scope.$watch('RevokedProcurementRequestCollection', function() {
		$scope.itemEdit = CheckSelected.checkSelectedInTable($scope.itemEdit, $scope.RevokedProcurementRequestCollection, $scope.items);
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
			templateUrl: 'stockmanagement/revokedprocurementrequest/tmplRevokedProcurementRequestEdit.tpl.html',
			size: 'lg',
			windowClass: 'hmodal-info',
			controller: 'ctrlRevokedProcurementRequestEdit',
			resolve: {
				itemEdit: function() {
					if(isNew) {
						return new ServiceRevokedProcurementRequest();
					} else {
						return $scope.itemEdit;
					}
				},
				procurementRequestItemDefinition: function() {
					return $scope.procurementRequestItemDefinition;
				},
			}
		})
		.result.then(function(result) {
			if(!angular.isDefined(result.id)) {
				ServiceRevokedProcurementRequest.saveCustom('stockmanagement/revokedprocurementrequests', result, function(savedObject) {
					$scope.items.unshift(savedObject);
					if($scope.itemEdit !== null) {
						var index = $scope.items.map(function(it) { return it.id; }).indexOf($scope.itemEdit.id);
						$scope.items[index].isSelected = false;
					}
					$scope.itemEdit = angular.extend(savedObject);
					$scope.items[0].isSelected = true;
				});
			 } else {
				 ServiceRevokedProcurementRequest.updateCustom('stockmanagement/revokedprocurementrequests/'+result.id, result, function(savedObject) {
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


.controller('ctrlRevokedProcurementRequestEdit',['$scope', 'Localization', '$modal', '$modalInstance', 'dialogs',
	'ServiceRevokedProcurementRequest', 'ServiceProcurementRequestItem',   'procurementRequestItemDefinition',   'itemEdit',
function($scope, Localization, $modal, $modalInstance, dialogs,
	ServiceRevokedProcurementRequest, ServiceProcurementRequestItem,  procurementRequestItemDefinition,  itemEdit) {

	// dialog mode
	$scope.mode = 'edit';

	// original item state
	var original = angular.copy(itemEdit);
	// item state
	$scope.itemEdit = angular.copy(original);

	// procurementRequestItem with properties
	$scope.procurementRequestItemDefinition = procurementRequestItemDefinition;

	// datepicker logic

	// date properties
	$scope.openedRPRDate = false;
	$scope.openedRPRProcurementDeadline = false;

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
            templateUrl: 'initialization/revokedprocurementrequest/tmplProcurementRequestItemChoose.tpl.html',
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


	// Save Button
	$scope.save = function() {
		correctDateTime($scope.itemEdit.RPRDate);
		correctDateTime($scope.itemEdit.RPRProcurementDeadline);
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
		return                 item.RPRDate  &&                 item.RPRIdentificationNumber  &&                 item.RPRMeasurementUnit  &&                 item.RPRQuantityRequested  &&                 item.RPRQuantityRealized  &&                 item.RPRProcurementDeadline  &&                 item.RPRWorkOrderContractPlace  ;
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


.controller('ctrlRevokedProcurementRequestChoose', ['$scope','ServiceRevokedProcurementRequest', 'dialogs', '$modal', '$modalInstance', 'itemEdit',
function($scope, ServiceRevokedProcurementRequest, dialogs, $modal,  $modalInstance, itemEdit) {

    // entity with properties
    $scope.itemDefinition = {
        label: 'stockmanagement.revokedProcurementRequest',
        properties: [
            { label: 'rPRDate', name:'RPRDate', inTable:  true  },
            { label: 'rPRIdentificationNumber', name:'RPRIdentificationNumber', inTable:  true  },
            { label: 'rPRMeasurementUnit', name:'RPRMeasurementUnit', inTable:  true  },
            { label: 'rPRQuantityRequested', name:'RPRQuantityRequested', inTable:  true  },
            { label: 'rPRQuantityRealized', name:'RPRQuantityRealized', inTable:  true  },
            { label: 'rPRProcurementDeadline', name:'RPRProcurementDeadline', inTable:  true  },
            { label: 'rPRWorkOrderContractPlace', name:'RPRWorkOrderContractPlace', inTable:  true  },
            { label: 'rPRStatus', name:'RPRStatus', inTable:  false  },
            { label: 'rPRRemark', name:'RPRRemark', inTable:  false  },
        ]
    };

	$scope.items = [];
	$scope.itemEdit = {};

	// fill table with data
	$scope.loaded = false;
	var getRevokedProcurementRequests = function() {
		if(!$scope.loaded && $scope.items.length === 0) {
			$scope.isLoading = true;
			ServiceRevokedProcurementRequest.query(function(data) {
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
	getRevokedProcurementRequests();

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