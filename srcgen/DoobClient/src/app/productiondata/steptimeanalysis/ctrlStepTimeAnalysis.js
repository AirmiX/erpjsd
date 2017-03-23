'use strict';

angular.module('Doob.productiondata')


.controller('ctrlStepTimeAnalysis',['$scope', '$rootScope', '$modal', 'dialogs', 'CheckSelected', 'ServiceStepTimeAnalysis',
    function($scope, $rootScope, $modal, dialogs, CheckSelected, ServiceStepTimeAnalysis) {

	// main entity (stepTimeAnalysis) properties names and labels
	$scope.itemDefinition = {
		label: 'productiondata.stepTimeAnalysis',
		properties: [
			{ label: 'sTAMainTime', name:'STAMainTime', inTable:  true  },
			{ label: 'sTAAuxiliaryTime', name:'STAAuxiliaryTime', inTable:  true  },
			{ label: 'sTAAdditionalTime', name:'STAAdditionalTime', inTable:  true  },
			{ label: 'sTAPreparatoryFinalTime', name:'STAPreparatoryFinalTime', inTable:  true  },
			{ label: 'sTAShifters', name:'STAShifters', inTable:  true  },
			{ label: 'sTARPM', name:'STARPM', inTable:  false  },
			{ label: 'sTACuttingDepth', name:'STACuttingDepth', inTable:  false  },
			{ label: 'sTAValidStartDate', name:'STAValidStartDate', inTable:  true  },
			{ label: 'sTAValidEndDate', name:'STAValidEndDate', inTable:  false  },
			{ label: 'sTAEnteredBy', name:'STAEnteredBy', inTable:  false  },
			{ label: 'sTAEntryDate', name:'STAEntryDate', inTable:  false  },
			{ label: 'sTAModifiedBy', name:'STAModifiedBy', inTable:  false  },
			{ label: 'sTAModificationDate', name:'STAModificationDate', inTable:  false  },
		]
	};


	// fill table with data
	$scope.items = [];
	$scope.loaded = false;
	var getStepTimeAnalysiss = function() {
		if(!$scope.loaded && $scope.items.length === 0) {
			$scope.isLoading = true;
			ServiceStepTimeAnalysis.query(function(data) {
				$scope.items = data;
				$scope.isLoading = false;
				$scope.loaded = true;
			});
		}
	};
	getStepTimeAnalysiss();

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

	$scope.$watch('StepTimeAnalysisCollection', function() {
		$scope.itemEdit = CheckSelected.checkSelectedInTable($scope.itemEdit, $scope.StepTimeAnalysisCollection, $scope.items);
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
			templateUrl: 'productiondata/steptimeanalysis/tmplStepTimeAnalysisEdit.tpl.html',
			size: 'lg',
			windowClass: 'hmodal-info',
			controller: 'ctrlStepTimeAnalysisEdit',
			resolve: {
				itemEdit: function() {
					if(isNew) {
						return new ServiceStepTimeAnalysis();
					} else {
						return $scope.itemEdit;
					}
				},
			}
		})
		.result.then(function(result) {
			if(!angular.isDefined(result.id)) {
				ServiceStepTimeAnalysis.saveCustom('stockmanagement/steptimeanalysiss', result, function(savedObject) {
					$scope.items.unshift(savedObject);
					if($scope.itemEdit !== null) {
						var index = $scope.items.map(function(it) { return it.id; }).indexOf($scope.itemEdit.id);
						$scope.items[index].isSelected = false;
					}
					$scope.itemEdit = angular.extend(savedObject);
					$scope.items[0].isSelected = true;
				});
			 } else {
				 ServiceStepTimeAnalysis.updateCustom('stockmanagement/steptimeanalysiss/'+result.id, result, function(savedObject) {
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


.controller('ctrlStepTimeAnalysisEdit',['$scope', 'Localization', '$modal', '$modalInstance', 'dialogs',
	'ServiceStepTimeAnalysis',    'itemEdit',
function($scope, Localization, $modal, $modalInstance, dialogs,
	ServiceStepTimeAnalysis,  itemEdit) {

	// dialog mode
	$scope.mode = 'edit';

	// original item state
	var original = angular.copy(itemEdit);
	// item state
	$scope.itemEdit = angular.copy(original);


	// datepicker logic

	// date properties
	$scope.openedSTAValidStartDate = false;
	$scope.openedSTAValidEndDate = false;
	$scope.openedSTAEntryDate = false;
	$scope.openedSTAModificationDate = false;

	$scope.open = function($event, opened) {
		$event.preventDefault();
		$event.stopPropagation();
		$scope[opened] = true;
	};



	// Save Button
	$scope.save = function() {
		correctDateTime($scope.itemEdit.STAValidStartDate);
		correctDateTime($scope.itemEdit.STAValidEndDate);
		correctDateTime($scope.itemEdit.STAEntryDate);
		correctDateTime($scope.itemEdit.STAModificationDate);
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
		return                 item.STAMainTime  &&                 item.STAAuxiliaryTime  &&                 item.STAAdditionalTime  &&                 item.STAPreparatoryFinalTime  &&                 item.STAShifters  &&                 item.STAValidStartDate  ;
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


.controller('ctrlStepTimeAnalysisChoose', ['$scope','ServiceStepTimeAnalysis', 'dialogs', '$modal', '$modalInstance', 'itemEdit',
function($scope, ServiceStepTimeAnalysis, dialogs, $modal,  $modalInstance, itemEdit) {

    // entity with properties
    $scope.itemDefinition = {
        label: 'productiondata.stepTimeAnalysis',
        properties: [
            { label: 'sTAMainTime', name:'STAMainTime', inTable:  true  },
            { label: 'sTAAuxiliaryTime', name:'STAAuxiliaryTime', inTable:  true  },
            { label: 'sTAAdditionalTime', name:'STAAdditionalTime', inTable:  true  },
            { label: 'sTAPreparatoryFinalTime', name:'STAPreparatoryFinalTime', inTable:  true  },
            { label: 'sTAShifters', name:'STAShifters', inTable:  true  },
            { label: 'sTARPM', name:'STARPM', inTable:  false  },
            { label: 'sTACuttingDepth', name:'STACuttingDepth', inTable:  false  },
            { label: 'sTAValidStartDate', name:'STAValidStartDate', inTable:  true  },
            { label: 'sTAValidEndDate', name:'STAValidEndDate', inTable:  false  },
            { label: 'sTAEnteredBy', name:'STAEnteredBy', inTable:  false  },
            { label: 'sTAEntryDate', name:'STAEntryDate', inTable:  false  },
            { label: 'sTAModifiedBy', name:'STAModifiedBy', inTable:  false  },
            { label: 'sTAModificationDate', name:'STAModificationDate', inTable:  false  },
        ]
    };

	$scope.items = [];
	$scope.itemEdit = {};

	// fill table with data
	$scope.loaded = false;
	var getStepTimeAnalysiss = function() {
		if(!$scope.loaded && $scope.items.length === 0) {
			$scope.isLoading = true;
			ServiceStepTimeAnalysis.query(function(data) {
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
	getStepTimeAnalysiss();

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