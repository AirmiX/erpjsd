'use strict';

angular.module('Doob.procurementplan')


.controller('ctrlPlanningPeriod',['$scope', '$rootScope', '$modal', 'dialogs', 'CheckSelected', 'ServicePlanningPeriod',
    function($scope, $rootScope, $modal, dialogs, CheckSelected, ServicePlanningPeriod) {

	// main entity (planningPeriod) properties names and labels
	$scope.itemDefinition = {
		label: 'procurementplan.planningPeriod',
		properties: [
			{ label: 'pPCode', name:'PPCode', inTable:  true  },
			{ label: 'pPName', name:'PPName', inTable:  true  },
		]
	};

	// procurementPlanHeadings with properties names and labels
	$scope.procurementPlanHeadingsDefinition = {
		label: 'initialization.procurementPlanHeading',
		properties : [
			{ label: 'pPHDocumentNumber', name:'PPHDocumentNumber' },
			{ label: 'pPHPlanningDate', name:'PPHPlanningDate' },
			{ label: 'pPHPlanVersion', name:'PPHPlanVersion' },
		]
	};

	// fill table with data
	$scope.items = [];
	$scope.loaded = false;
	var getPlanningPeriods = function() {
		if(!$scope.loaded && $scope.items.length === 0) {
			$scope.isLoading = true;
			ServicePlanningPeriod.query(function(data) {
				$scope.items = data;
				$scope.isLoading = false;
				$scope.loaded = true;
			});
		}
	};
	getPlanningPeriods();

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

	$scope.$watch('PlanningPeriodCollection', function() {
		$scope.itemEdit = CheckSelected.checkSelectedInTable($scope.itemEdit, $scope.PlanningPeriodCollection, $scope.items);
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
			templateUrl: 'procurementplan/planningperiod/tmplPlanningPeriodEdit.tpl.html',
			size: 'lg',
			windowClass: 'hmodal-info',
			controller: 'ctrlPlanningPeriodEdit',
			resolve: {
				itemEdit: function() {
					if(isNew) {
						return new ServicePlanningPeriod();
					} else {
						return $scope.itemEdit;
					}
				},
				procurementPlanHeadingsDefinition: function() {
					return $scope.procurementPlanHeadingsDefinition;
				},
			}
		})
		.result.then(function(result) {
			if(!angular.isDefined(result.id)) {
				ServicePlanningPeriod.saveCustom('stockmanagement/planningperiods', result, function(savedObject) {
					$scope.items.unshift(savedObject);
					if($scope.itemEdit !== null) {
						var index = $scope.items.map(function(it) { return it.id; }).indexOf($scope.itemEdit.id);
						$scope.items[index].isSelected = false;
					}
					$scope.itemEdit = angular.extend(savedObject);
					$scope.items[0].isSelected = true;
				});
			 } else {
				 ServicePlanningPeriod.updateCustom('stockmanagement/planningperiods/'+result.id, result, function(savedObject) {
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


.controller('ctrlPlanningPeriodEdit',['$scope', 'Localization', '$modal', '$modalInstance', 'dialogs',
	'ServicePlanningPeriod', 'ServiceProcurementPlanHeading',   'procurementPlanHeadingsDefinition',   'itemEdit',
function($scope, Localization, $modal, $modalInstance, dialogs,
	ServicePlanningPeriod, ServiceProcurementPlanHeading,  procurementPlanHeadingsDefinition,  itemEdit) {

	// dialog mode
	$scope.mode = 'edit';

	// original item state
	var original = angular.copy(itemEdit);
	// item state
	$scope.itemEdit = angular.copy(original);

	// procurementPlanHeadings with properties
	$scope.procurementPlanHeadingsDefinition = procurementPlanHeadingsDefinition;

	// datepicker logic

	// date properties

	$scope.open = function($event, opened) {
		$event.preventDefault();
		$event.stopPropagation();
		$scope[opened] = true;
	};



	// Save Button
	$scope.save = function() {
	   //	delete $scope.itemEdit.isSelected;
        var item;
        var i;
        for(i in $scope.itemEdit.procurementPlanHeadings) {
    		item = $scope.itemEdit.procurementPlanHeadings[i];
    		delete item.isSelected;
    	}
		$modalInstance.close($scope.itemEdit);
	};


	$scope.canSave = function() {
		var item = $scope.itemEdit;
		return                 item.PPCode  &&                 item.PPName  ;
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


.controller('ctrlPlanningPeriodChoose', ['$scope','ServicePlanningPeriod', 'dialogs', '$modal', '$modalInstance', 'itemEdit',
function($scope, ServicePlanningPeriod, dialogs, $modal,  $modalInstance, itemEdit) {

    // entity with properties
    $scope.itemDefinition = {
        label: 'procurementplan.planningPeriod',
        properties: [
            { label: 'pPCode', name:'PPCode', inTable:  true  },
            { label: 'pPName', name:'PPName', inTable:  true  },
        ]
    };

	$scope.items = [];
	$scope.itemEdit = {};

	// fill table with data
	$scope.loaded = false;
	var getPlanningPeriods = function() {
		if(!$scope.loaded && $scope.items.length === 0) {
			$scope.isLoading = true;
			ServicePlanningPeriod.query(function(data) {
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
	getPlanningPeriods();

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