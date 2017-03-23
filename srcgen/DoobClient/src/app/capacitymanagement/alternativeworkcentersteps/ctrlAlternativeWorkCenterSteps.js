'use strict';

angular.module('Doob.capacitymanagement')


.controller('ctrlAlternativeWorkCenterSteps',['$scope', '$rootScope', '$modal', 'dialogs', 'CheckSelected', 'ServiceAlternativeWorkCenterSteps',
    function($scope, $rootScope, $modal, dialogs, CheckSelected, ServiceAlternativeWorkCenterSteps) {

	// main entity (alternativeWorkCenterSteps) properties names and labels
	$scope.itemDefinition = {
		label: 'capacitymanagement.alternativeWorkCenterSteps',
		properties: [
		]
	};

	// alternativeWorkCenter with properties names and labels
	$scope.alternativeWorkCenterDefinition = {
		label: 'capacitymanagement.alternativeWorkCenter',
		properties : [
		]
	};
	// stepsClassification with properties names and labels
	$scope.stepsClassificationDefinition = {
		label: 'productiondata.stepsClassification',
		properties : [
			{ label: 'sCClassificationNumber', name:'SCClassificationNumber' },
			{ label: 'sCName', name:'SCName' },
		]
	};

	// fill table with data
	$scope.items = [];
	$scope.loaded = false;
	var getAlternativeWorkCenterStepss = function() {
		if(!$scope.loaded && $scope.items.length === 0) {
			$scope.isLoading = true;
			ServiceAlternativeWorkCenterSteps.query(function(data) {
				$scope.items = data;
				$scope.isLoading = false;
				$scope.loaded = true;
			});
		}
	};
	getAlternativeWorkCenterStepss();

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

	$scope.$watch('AlternativeWorkCenterStepsCollection', function() {
		$scope.itemEdit = CheckSelected.checkSelectedInTable($scope.itemEdit, $scope.AlternativeWorkCenterStepsCollection, $scope.items);
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
			templateUrl: 'capacitymanagement/alternativeworkcentersteps/tmplAlternativeWorkCenterStepsEdit.tpl.html',
			size: 'lg',
			windowClass: 'hmodal-info',
			controller: 'ctrlAlternativeWorkCenterStepsEdit',
			resolve: {
				itemEdit: function() {
					if(isNew) {
						return new ServiceAlternativeWorkCenterSteps();
					} else {
						return $scope.itemEdit;
					}
				},
				alternativeWorkCenterDefinition: function() {
					return $scope.alternativeWorkCenterDefinition;
				},
				stepsClassificationDefinition: function() {
					return $scope.stepsClassificationDefinition;
				},
			}
		})
		.result.then(function(result) {
			if(!angular.isDefined(result.id)) {
				ServiceAlternativeWorkCenterSteps.saveCustom('stockmanagement/alternativeworkcenterstepss', result, function(savedObject) {
					$scope.items.unshift(savedObject);
					if($scope.itemEdit !== null) {
						var index = $scope.items.map(function(it) { return it.id; }).indexOf($scope.itemEdit.id);
						$scope.items[index].isSelected = false;
					}
					$scope.itemEdit = angular.extend(savedObject);
					$scope.items[0].isSelected = true;
				});
			 } else {
				 ServiceAlternativeWorkCenterSteps.updateCustom('stockmanagement/alternativeworkcenterstepss/'+result.id, result, function(savedObject) {
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


.controller('ctrlAlternativeWorkCenterStepsEdit',['$scope', 'Localization', '$modal', '$modalInstance', 'dialogs',
	'ServiceAlternativeWorkCenterSteps', 'ServiceAlternativeWorkCenter', 'ServiceStepsClassification',   'alternativeWorkCenterDefinition',  'stepsClassificationDefinition',   'itemEdit',
function($scope, Localization, $modal, $modalInstance, dialogs,
	ServiceAlternativeWorkCenterSteps, ServiceAlternativeWorkCenter, ServiceStepsClassification,  alternativeWorkCenterDefinition,  stepsClassificationDefinition,  itemEdit) {

	// dialog mode
	$scope.mode = 'edit';

	// original item state
	var original = angular.copy(itemEdit);
	// item state
	$scope.itemEdit = angular.copy(original);

	// alternativeWorkCenter with properties
	$scope.alternativeWorkCenterDefinition = alternativeWorkCenterDefinition;
	// stepsClassification with properties
	$scope.stepsClassificationDefinition = stepsClassificationDefinition;

	// datepicker logic

	// date properties

	$scope.open = function($event, opened) {
		$event.preventDefault();
		$event.stopPropagation();
		$scope[opened] = true;
	};



	// Choose alternativeWorkCenter
	$scope.openChooseAlternativeWorkCenterDialog = function() {
        $modal.open({
            backdrop: 'static',
            keyboard : false,
            templateUrl: 'capacitymanagement/alternativeworkcentersteps/tmplAlternativeWorkCenterChoose.tpl.html',
            size: 'lg',
            controller: 'ctrlAlternativeWorkCenterChoose',
            windowClass: 'hmodal-info',
            resolve: {
				itemEdit: function() {
					if(angular.isDefined($scope.itemEdit.alternativeWorkCenter)){
						return $scope.itemEdit.alternativeWorkCenter;
					}
				}
			}
		}).result.then(function(result) {
			$scope.itemEdit.alternativeWorkCenter = angular.copy(result);
		});
    };


	// Choose stepsClassification
	$scope.openChooseStepsClassificationDialog = function() {
        $modal.open({
            backdrop: 'static',
            keyboard : false,
            templateUrl: 'productiondata/alternativeworkcentersteps/tmplStepsClassificationChoose.tpl.html',
            size: 'lg',
            controller: 'ctrlStepsClassificationChoose',
            windowClass: 'hmodal-info',
            resolve: {
				itemEdit: function() {
					if(angular.isDefined($scope.itemEdit.stepsClassification)){
						return $scope.itemEdit.stepsClassification;
					}
				}
			}
		}).result.then(function(result) {
			$scope.itemEdit.stepsClassification = angular.copy(result);
		});
    };


	// Save Button
	$scope.save = function() {
	   //	delete $scope.itemEdit.isSelected;
		$modalInstance.close($scope.itemEdit);
	};


	$scope.canSave = function() {
        return true;
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


.controller('ctrlAlternativeWorkCenterStepsChoose', ['$scope','ServiceAlternativeWorkCenterSteps', 'dialogs', '$modal', '$modalInstance', 'itemEdit',
function($scope, ServiceAlternativeWorkCenterSteps, dialogs, $modal,  $modalInstance, itemEdit) {

    // entity with properties
    $scope.itemDefinition = {
        label: 'capacitymanagement.alternativeWorkCenterSteps',
        properties: [
        ]
    };

	$scope.items = [];
	$scope.itemEdit = {};

	// fill table with data
	$scope.loaded = false;
	var getAlternativeWorkCenterStepss = function() {
		if(!$scope.loaded && $scope.items.length === 0) {
			$scope.isLoading = true;
			ServiceAlternativeWorkCenterSteps.query(function(data) {
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
	getAlternativeWorkCenterStepss();

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