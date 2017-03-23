'use strict';

angular.module('Doob.productiondata')


.controller('ctrlStepUserManual',['$scope', '$rootScope', '$modal', 'dialogs', 'CheckSelected', 'ServiceStepUserManual',
    function($scope, $rootScope, $modal, dialogs, CheckSelected, ServiceStepUserManual) {

	// main entity (stepUserManual) properties names and labels
	$scope.itemDefinition = {
		label: 'productiondata.stepUserManual',
		properties: [
			{ label: 'sUMOrdinalNumber', name:'SUMOrdinalNumber', inTable:  true  },
			{ label: 'sUMText', name:'SUMText', inTable:  true  },
			{ label: 'sUMDocument', name:'SUMDocument', inTable:  false  },
			{ label: 'sUMValidStartDate', name:'SUMValidStartDate', inTable:  true  },
			{ label: 'sUMValidEndDate', name:'SUMValidEndDate', inTable:  false  },
			{ label: 'sUMEnteredBy', name:'SUMEnteredBy', inTable:  false  },
			{ label: 'sUMEntryDate', name:'SUMEntryDate', inTable:  false  },
			{ label: 'sUMModifiedBy', name:'SUMModifiedBy', inTable:  false  },
			{ label: 'sUMModificationDate', name:'SUMModificationDate', inTable:  false  },
		]
	};

	// productionProcessStep with properties names and labels
	$scope.productionProcessStepDefinition = {
		label: 'productiondata.productionProcessSteps',
		properties : [
			{ label: 'pPSOrdinalNumber', name:'PPSOrdinalNumber' },
			{ label: 'pPSStepDuration', name:'PPSStepDuration' },
			{ label: 'pPSControlIndicator', name:'PPSControlIndicator' },
			{ label: 'pPSValidStartDate', name:'PPSValidStartDate' },
		]
	};

	// fill table with data
	$scope.items = [];
	$scope.loaded = false;
	var getStepUserManuals = function() {
		if(!$scope.loaded && $scope.items.length === 0) {
			$scope.isLoading = true;
			ServiceStepUserManual.query(function(data) {
				$scope.items = data;
				$scope.isLoading = false;
				$scope.loaded = true;
			});
		}
	};
	getStepUserManuals();

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

	$scope.$watch('StepUserManualCollection', function() {
		$scope.itemEdit = CheckSelected.checkSelectedInTable($scope.itemEdit, $scope.StepUserManualCollection, $scope.items);
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
			templateUrl: 'productiondata/stepusermanual/tmplStepUserManualEdit.tpl.html',
			size: 'lg',
			windowClass: 'hmodal-info',
			controller: 'ctrlStepUserManualEdit',
			resolve: {
				itemEdit: function() {
					if(isNew) {
						return new ServiceStepUserManual();
					} else {
						return $scope.itemEdit;
					}
				},
				productionProcessStepDefinition: function() {
					return $scope.productionProcessStepDefinition;
				},
			}
		})
		.result.then(function(result) {
			if(!angular.isDefined(result.id)) {
				ServiceStepUserManual.saveCustom('stockmanagement/stepusermanuals', result, function(savedObject) {
					$scope.items.unshift(savedObject);
					if($scope.itemEdit !== null) {
						var index = $scope.items.map(function(it) { return it.id; }).indexOf($scope.itemEdit.id);
						$scope.items[index].isSelected = false;
					}
					$scope.itemEdit = angular.extend(savedObject);
					$scope.items[0].isSelected = true;
				});
			 } else {
				 ServiceStepUserManual.updateCustom('stockmanagement/stepusermanuals/'+result.id, result, function(savedObject) {
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


.controller('ctrlStepUserManualEdit',['$scope', 'Localization', '$modal', '$modalInstance', 'dialogs',
	'ServiceStepUserManual', 'ServiceProductionProcessSteps',   'productionProcessStepDefinition',   'itemEdit',
function($scope, Localization, $modal, $modalInstance, dialogs,
	ServiceStepUserManual, ServiceProductionProcessSteps,  productionProcessStepDefinition,  itemEdit) {

	// dialog mode
	$scope.mode = 'edit';

	// original item state
	var original = angular.copy(itemEdit);
	// item state
	$scope.itemEdit = angular.copy(original);

	// productionProcessStep with properties
	$scope.productionProcessStepDefinition = productionProcessStepDefinition;

	// datepicker logic

	// date properties
	$scope.openedSUMValidStartDate = false;
	$scope.openedSUMValidEndDate = false;
	$scope.openedSUMEntryDate = false;
	$scope.openedSUMModificationDate = false;

	$scope.open = function($event, opened) {
		$event.preventDefault();
		$event.stopPropagation();
		$scope[opened] = true;
	};



	// Choose productionProcessStep
	$scope.openChooseProductionProcessStepDialog = function() {
        $modal.open({
            backdrop: 'static',
            keyboard : false,
            templateUrl: 'productiondata/stepusermanual/tmplProductionProcessStepsChoose.tpl.html',
            size: 'lg',
            controller: 'ctrlProductionProcessStepsChoose',
            windowClass: 'hmodal-info',
            resolve: {
				itemEdit: function() {
					if(angular.isDefined($scope.itemEdit.productionProcessStep)){
						return $scope.itemEdit.productionProcessStep;
					}
				}
			}
		}).result.then(function(result) {
			$scope.itemEdit.productionProcessStep = angular.copy(result);
		});
    };


	// Save Button
	$scope.save = function() {
		correctDateTime($scope.itemEdit.SUMValidStartDate);
		correctDateTime($scope.itemEdit.SUMValidEndDate);
		correctDateTime($scope.itemEdit.SUMEntryDate);
		correctDateTime($scope.itemEdit.SUMModificationDate);
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
		return                 item.SUMOrdinalNumber  &&                 item.SUMText  &&                 item.SUMValidStartDate  ;
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


.controller('ctrlStepUserManualChoose', ['$scope','ServiceStepUserManual', 'dialogs', '$modal', '$modalInstance', 'itemEdit',
function($scope, ServiceStepUserManual, dialogs, $modal,  $modalInstance, itemEdit) {

    // entity with properties
    $scope.itemDefinition = {
        label: 'productiondata.stepUserManual',
        properties: [
            { label: 'sUMOrdinalNumber', name:'SUMOrdinalNumber', inTable:  true  },
            { label: 'sUMText', name:'SUMText', inTable:  true  },
            { label: 'sUMDocument', name:'SUMDocument', inTable:  false  },
            { label: 'sUMValidStartDate', name:'SUMValidStartDate', inTable:  true  },
            { label: 'sUMValidEndDate', name:'SUMValidEndDate', inTable:  false  },
            { label: 'sUMEnteredBy', name:'SUMEnteredBy', inTable:  false  },
            { label: 'sUMEntryDate', name:'SUMEntryDate', inTable:  false  },
            { label: 'sUMModifiedBy', name:'SUMModifiedBy', inTable:  false  },
            { label: 'sUMModificationDate', name:'SUMModificationDate', inTable:  false  },
        ]
    };

	$scope.items = [];
	$scope.itemEdit = {};

	// fill table with data
	$scope.loaded = false;
	var getStepUserManuals = function() {
		if(!$scope.loaded && $scope.items.length === 0) {
			$scope.isLoading = true;
			ServiceStepUserManual.query(function(data) {
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
	getStepUserManuals();

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