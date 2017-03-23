'use strict';

angular.module('Doob.initialization')


.controller('ctrlProcurementPlanItem',['$scope', '$rootScope', '$modal', 'dialogs', 'CheckSelected', 'ServiceProcurementPlanItem',
    function($scope, $rootScope, $modal, dialogs, CheckSelected, ServiceProcurementPlanItem) {

	// main entity (procurementPlanItem) properties names and labels
	$scope.itemDefinition = {
		label: 'initialization.procurementPlanItem',
		properties: [
			{ label: 'pPIOrdinalNumber', name:'PPIOrdinalNumber', inTable:  true  },
			{ label: 'pPIPlannedQuantity', name:'PPIPlannedQuantity', inTable:  true  },
			{ label: 'pPIOrderedQuantity', name:'PPIOrderedQuantity', inTable:  true  },
			{ label: 'pPIRecievedQuantity', name:'PPIRecievedQuantity', inTable:  true  },
			{ label: 'pPISourceProvider', name:'PPISourceProvider', inTable:  true  },
			{ label: 'pPIProcurementDeadline', name:'PPIProcurementDeadline', inTable:  false  },
			{ label: 'mUIdentificationCode', name:'MUIdentificationCode', inTable:  true  },
		]
	};

	// procurementPlanHeading with properties names and labels
	$scope.procurementPlanHeadingDefinition = {
		label: 'initialization.procurementPlanHeading',
		properties : [
			{ label: 'pPHDocumentNumber', name:'PPHDocumentNumber' },
			{ label: 'pPHPlanningDate', name:'PPHPlanningDate' },
			{ label: 'pPHPlanVersion', name:'PPHPlanVersion' },
		]
	};
	// identification with properties names and labels
	$scope.identificationDefinition = {
		label: 'commonbusinessentities.identification',
		properties : [
			{ label: 'iIdentificationCode', name:'IIdentificationCode' },
		]
	};
	// procurementRequestItems with properties names and labels
	$scope.procurementRequestItemsDefinition = {
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
	var getProcurementPlanItems = function() {
		if(!$scope.loaded && $scope.items.length === 0) {
			$scope.isLoading = true;
			ServiceProcurementPlanItem.query(function(data) {
				$scope.items = data;
				$scope.isLoading = false;
				$scope.loaded = true;
			});
		}
	};
	getProcurementPlanItems();

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

	$scope.$watch('ProcurementPlanItemCollection', function() {
		$scope.itemEdit = CheckSelected.checkSelectedInTable($scope.itemEdit, $scope.ProcurementPlanItemCollection, $scope.items);
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
			templateUrl: 'initialization/procurementplanitem/tmplProcurementPlanItemEdit.tpl.html',
			size: 'lg',
			windowClass: 'hmodal-info',
			controller: 'ctrlProcurementPlanItemEdit',
			resolve: {
				itemEdit: function() {
					if(isNew) {
						return new ServiceProcurementPlanItem();
					} else {
						return $scope.itemEdit;
					}
				},
				procurementPlanHeadingDefinition: function() {
					return $scope.procurementPlanHeadingDefinition;
				},
				identificationDefinition: function() {
					return $scope.identificationDefinition;
				},
				procurementRequestItemsDefinition: function() {
					return $scope.procurementRequestItemsDefinition;
				},
			}
		})
		.result.then(function(result) {
			if(!angular.isDefined(result.id)) {
				ServiceProcurementPlanItem.saveCustom('stockmanagement/procurementplanitems', result, function(savedObject) {
					$scope.items.unshift(savedObject);
					if($scope.itemEdit !== null) {
						var index = $scope.items.map(function(it) { return it.id; }).indexOf($scope.itemEdit.id);
						$scope.items[index].isSelected = false;
					}
					$scope.itemEdit = angular.extend(savedObject);
					$scope.items[0].isSelected = true;
				});
			 } else {
				 ServiceProcurementPlanItem.updateCustom('stockmanagement/procurementplanitems/'+result.id, result, function(savedObject) {
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


.controller('ctrlProcurementPlanItemEdit',['$scope', 'Localization', '$modal', '$modalInstance', 'dialogs',
	'ServiceProcurementPlanItem', 'ServiceProcurementPlanHeading', 'ServiceIdentification', 'ServiceProcurementRequestItem',   'procurementPlanHeadingDefinition',  'identificationDefinition',  'procurementRequestItemsDefinition',   'itemEdit',
function($scope, Localization, $modal, $modalInstance, dialogs,
	ServiceProcurementPlanItem, ServiceProcurementPlanHeading, ServiceIdentification, ServiceProcurementRequestItem,  procurementPlanHeadingDefinition,  identificationDefinition,  procurementRequestItemsDefinition,  itemEdit) {

	// dialog mode
	$scope.mode = 'edit';

	// original item state
	var original = angular.copy(itemEdit);
	// item state
	$scope.itemEdit = angular.copy(original);

	// procurementPlanHeading with properties
	$scope.procurementPlanHeadingDefinition = procurementPlanHeadingDefinition;
	// identification with properties
	$scope.identificationDefinition = identificationDefinition;
	// procurementRequestItems with properties
	$scope.procurementRequestItemsDefinition = procurementRequestItemsDefinition;

	// datepicker logic

	// date properties
	$scope.openedPPIProcurementDeadline = false;

	$scope.open = function($event, opened) {
		$event.preventDefault();
		$event.stopPropagation();
		$scope[opened] = true;
	};



	// Choose procurementPlanHeading
	$scope.openChooseProcurementPlanHeadingDialog = function() {
        $modal.open({
            backdrop: 'static',
            keyboard : false,
            templateUrl: 'initialization/procurementplanitem/tmplProcurementPlanHeadingChoose.tpl.html',
            size: 'lg',
            controller: 'ctrlProcurementPlanHeadingChoose',
            windowClass: 'hmodal-info',
            resolve: {
				itemEdit: function() {
					if(angular.isDefined($scope.itemEdit.procurementPlanHeading)){
						return $scope.itemEdit.procurementPlanHeading;
					}
				}
			}
		}).result.then(function(result) {
			$scope.itemEdit.procurementPlanHeading = angular.copy(result);
		});
    };


	// Choose identification
	$scope.openChooseIdentificationDialog = function() {
        $modal.open({
            backdrop: 'static',
            keyboard : false,
            templateUrl: 'commonbusinessentities/procurementplanitem/tmplIdentificationChoose.tpl.html',
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


	// Save Button
	$scope.save = function() {
		correctDateTime($scope.itemEdit.PPIProcurementDeadline);
	   //	delete $scope.itemEdit.isSelected;
        var item;
        var i;
        for(i in $scope.itemEdit.procurementRequestItems) {
    		item = $scope.itemEdit.procurementRequestItems[i];
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
		return                 item.PPIOrdinalNumber  &&                 item.PPIPlannedQuantity  &&                 item.PPIOrderedQuantity  &&                 item.PPIRecievedQuantity  &&                 item.PPISourceProvider  &&                 item.MUIdentificationCode  ;
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


.controller('ctrlProcurementPlanItemChoose', ['$scope','ServiceProcurementPlanItem', 'dialogs', '$modal', '$modalInstance', 'itemEdit',
function($scope, ServiceProcurementPlanItem, dialogs, $modal,  $modalInstance, itemEdit) {

    // entity with properties
    $scope.itemDefinition = {
        label: 'initialization.procurementPlanItem',
        properties: [
            { label: 'pPIOrdinalNumber', name:'PPIOrdinalNumber', inTable:  true  },
            { label: 'pPIPlannedQuantity', name:'PPIPlannedQuantity', inTable:  true  },
            { label: 'pPIOrderedQuantity', name:'PPIOrderedQuantity', inTable:  true  },
            { label: 'pPIRecievedQuantity', name:'PPIRecievedQuantity', inTable:  true  },
            { label: 'pPISourceProvider', name:'PPISourceProvider', inTable:  true  },
            { label: 'pPIProcurementDeadline', name:'PPIProcurementDeadline', inTable:  false  },
            { label: 'mUIdentificationCode', name:'MUIdentificationCode', inTable:  true  },
        ]
    };

	$scope.items = [];
	$scope.itemEdit = {};

	// fill table with data
	$scope.loaded = false;
	var getProcurementPlanItems = function() {
		if(!$scope.loaded && $scope.items.length === 0) {
			$scope.isLoading = true;
			ServiceProcurementPlanItem.query(function(data) {
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
	getProcurementPlanItems();

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