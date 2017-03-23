'use strict';

angular.module('Doob.productiondata')


.controller('ctrlControlDemands',['$scope', '$rootScope', '$modal', 'dialogs', 'CheckSelected', 'ServiceControlDemands',
    function($scope, $rootScope, $modal, dialogs, CheckSelected, ServiceControlDemands) {

	// main entity (controlDemands) properties names and labels
	$scope.itemDefinition = {
		label: 'productiondata.controlDemands',
		properties: [
			{ label: 'cDOrdinalNumber', name:'CDOrdinalNumber', inTable:  true  },
			{ label: 'cDMeasureType', name:'CDMeasureType', inTable:  true  },
			{ label: 'cDRequiredValue', name:'CDRequiredValue', inTable:  false  },
			{ label: 'cDTolerance', name:'CDTolerance', inTable:  false  },
			{ label: 'cDControlMedium', name:'CDControlMedium', inTable:  false  },
			{ label: 'cDControlType', name:'CDControlType', inTable:  false  },
			{ label: 'cDControlFrequency', name:'CDControlFrequency', inTable:  false  },
			{ label: 'cDEnteredBy', name:'CDEnteredBy', inTable:  false  },
			{ label: 'cDEntryDate', name:'CDEntryDate', inTable:  false  },
			{ label: 'cDModifiedBy', name:'CDModifiedBy', inTable:  false  },
			{ label: 'cDModificationDate', name:'CDModificationDate', inTable:  false  },
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
	var getControlDemandss = function() {
		if(!$scope.loaded && $scope.items.length === 0) {
			$scope.isLoading = true;
			ServiceControlDemands.query(function(data) {
				$scope.items = data;
				$scope.isLoading = false;
				$scope.loaded = true;
			});
		}
	};
	getControlDemandss();

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

	$scope.$watch('ControlDemandsCollection', function() {
		$scope.itemEdit = CheckSelected.checkSelectedInTable($scope.itemEdit, $scope.ControlDemandsCollection, $scope.items);
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
			templateUrl: 'productiondata/controldemands/tmplControlDemandsEdit.tpl.html',
			size: 'lg',
			windowClass: 'hmodal-info',
			controller: 'ctrlControlDemandsEdit',
			resolve: {
				itemEdit: function() {
					if(isNew) {
						return new ServiceControlDemands();
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
				ServiceControlDemands.saveCustom('stockmanagement/controldemandss', result, function(savedObject) {
					$scope.items.unshift(savedObject);
					if($scope.itemEdit !== null) {
						var index = $scope.items.map(function(it) { return it.id; }).indexOf($scope.itemEdit.id);
						$scope.items[index].isSelected = false;
					}
					$scope.itemEdit = angular.extend(savedObject);
					$scope.items[0].isSelected = true;
				});
			 } else {
				 ServiceControlDemands.updateCustom('stockmanagement/controldemandss/'+result.id, result, function(savedObject) {
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


.controller('ctrlControlDemandsEdit',['$scope', 'Localization', '$modal', '$modalInstance', 'dialogs',
	'ServiceControlDemands', 'ServiceProductionProcessSteps',   'productionProcessStepDefinition',   'itemEdit',
function($scope, Localization, $modal, $modalInstance, dialogs,
	ServiceControlDemands, ServiceProductionProcessSteps,  productionProcessStepDefinition,  itemEdit) {

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
	$scope.openedCDEntryDate = false;
	$scope.openedCDModificationDate = false;

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
            templateUrl: 'productiondata/controldemands/tmplProductionProcessStepsChoose.tpl.html',
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
		correctDateTime($scope.itemEdit.CDEntryDate);
		correctDateTime($scope.itemEdit.CDModificationDate);
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
		return                 item.CDOrdinalNumber  &&                 item.CDMeasureType  ;
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


.controller('ctrlControlDemandsChoose', ['$scope','ServiceControlDemands', 'dialogs', '$modal', '$modalInstance', 'itemEdit',
function($scope, ServiceControlDemands, dialogs, $modal,  $modalInstance, itemEdit) {

    // entity with properties
    $scope.itemDefinition = {
        label: 'productiondata.controlDemands',
        properties: [
            { label: 'cDOrdinalNumber', name:'CDOrdinalNumber', inTable:  true  },
            { label: 'cDMeasureType', name:'CDMeasureType', inTable:  true  },
            { label: 'cDRequiredValue', name:'CDRequiredValue', inTable:  false  },
            { label: 'cDTolerance', name:'CDTolerance', inTable:  false  },
            { label: 'cDControlMedium', name:'CDControlMedium', inTable:  false  },
            { label: 'cDControlType', name:'CDControlType', inTable:  false  },
            { label: 'cDControlFrequency', name:'CDControlFrequency', inTable:  false  },
            { label: 'cDEnteredBy', name:'CDEnteredBy', inTable:  false  },
            { label: 'cDEntryDate', name:'CDEntryDate', inTable:  false  },
            { label: 'cDModifiedBy', name:'CDModifiedBy', inTable:  false  },
            { label: 'cDModificationDate', name:'CDModificationDate', inTable:  false  },
        ]
    };

	$scope.items = [];
	$scope.itemEdit = {};

	// fill table with data
	$scope.loaded = false;
	var getControlDemandss = function() {
		if(!$scope.loaded && $scope.items.length === 0) {
			$scope.isLoading = true;
			ServiceControlDemands.query(function(data) {
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
	getControlDemandss();

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