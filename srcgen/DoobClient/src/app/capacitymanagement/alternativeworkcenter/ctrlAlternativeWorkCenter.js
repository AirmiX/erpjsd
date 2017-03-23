'use strict';

angular.module('Doob.capacitymanagement')


.controller('ctrlAlternativeWorkCenter',['$scope', '$rootScope', '$modal', 'dialogs', 'CheckSelected', 'ServiceAlternativeWorkCenter',
    function($scope, $rootScope, $modal, dialogs, CheckSelected, ServiceAlternativeWorkCenter) {

	// main entity (alternativeWorkCenter) properties names and labels
	$scope.itemDefinition = {
		label: 'capacitymanagement.alternativeWorkCenter',
		properties: [
			{ label: 'aWCApproved', name:'AWCApproved', inTable:  false  },
		]
	};

	// workCenter1 with properties names and labels
	$scope.workCenter1Definition = {
		label: 'productiondata.workCenter',
		properties : [
			{ label: 'wCIndentificationCode', name:'WCIndentificationCode' },
			{ label: 'wCShortName', name:'WCShortName' },
			{ label: 'wCName', name:'WCName' },
			{ label: 'wCWorkingDayLenght', name:'WCWorkingDayLenght' },
			{ label: 'wCWorkingWeekLenght', name:'WCWorkingWeekLenght' },
			{ label: 'wCShiftsNumber', name:'WCShiftsNumber' },
			{ label: 'wCWorkStationsNumber', name:'WCWorkStationsNumber' },
			{ label: 'wCNumberOfEmployees', name:'WCNumberOfEmployees' },
			{ label: 'wCNumberOfSteps', name:'WCNumberOfSteps' },
			{ label: 'wCAverageWaitingTimeInFrontOfWorkCenter', name:'WCAverageWaitingTimeInFrontOfWorkCenter' },
			{ label: 'wCMaterialTransferAverageTime', name:'WCMaterialTransferAverageTime' },
			{ label: 'wCTechnicalCapacity', name:'WCTechnicalCapacity' },
			{ label: 'wCAvailableCapacity', name:'WCAvailableCapacity' },
			{ label: 'wCLoadAnalysisIndicator', name:'WCLoadAnalysisIndicator' },
			{ label: 'wCDataCompletenessStatus', name:'WCDataCompletenessStatus' },
			{ label: 'wCActitvityStatus', name:'WCActitvityStatus' },
		]
	};
	// workCenter with properties names and labels
	$scope.workCenterDefinition = {
		label: 'productiondata.workCenter',
		properties : [
			{ label: 'wCIndentificationCode', name:'WCIndentificationCode' },
			{ label: 'wCShortName', name:'WCShortName' },
			{ label: 'wCName', name:'WCName' },
			{ label: 'wCWorkingDayLenght', name:'WCWorkingDayLenght' },
			{ label: 'wCWorkingWeekLenght', name:'WCWorkingWeekLenght' },
			{ label: 'wCShiftsNumber', name:'WCShiftsNumber' },
			{ label: 'wCWorkStationsNumber', name:'WCWorkStationsNumber' },
			{ label: 'wCNumberOfEmployees', name:'WCNumberOfEmployees' },
			{ label: 'wCNumberOfSteps', name:'WCNumberOfSteps' },
			{ label: 'wCAverageWaitingTimeInFrontOfWorkCenter', name:'WCAverageWaitingTimeInFrontOfWorkCenter' },
			{ label: 'wCMaterialTransferAverageTime', name:'WCMaterialTransferAverageTime' },
			{ label: 'wCTechnicalCapacity', name:'WCTechnicalCapacity' },
			{ label: 'wCAvailableCapacity', name:'WCAvailableCapacity' },
			{ label: 'wCLoadAnalysisIndicator', name:'WCLoadAnalysisIndicator' },
			{ label: 'wCDataCompletenessStatus', name:'WCDataCompletenessStatus' },
			{ label: 'wCActitvityStatus', name:'WCActitvityStatus' },
		]
	};
	// alternativeWorkCenterSteps with properties names and labels
	$scope.alternativeWorkCenterStepsDefinition = {
		label: 'capacitymanagement.alternativeWorkCenterSteps',
		properties : [
		]
	};

	// fill table with data
	$scope.items = [];
	$scope.loaded = false;
	var getAlternativeWorkCenters = function() {
		if(!$scope.loaded && $scope.items.length === 0) {
			$scope.isLoading = true;
			ServiceAlternativeWorkCenter.query(function(data) {
				$scope.items = data;
				$scope.isLoading = false;
				$scope.loaded = true;
			});
		}
	};
	getAlternativeWorkCenters();

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

	$scope.$watch('AlternativeWorkCenterCollection', function() {
		$scope.itemEdit = CheckSelected.checkSelectedInTable($scope.itemEdit, $scope.AlternativeWorkCenterCollection, $scope.items);
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
			templateUrl: 'capacitymanagement/alternativeworkcenter/tmplAlternativeWorkCenterEdit.tpl.html',
			size: 'lg',
			windowClass: 'hmodal-info',
			controller: 'ctrlAlternativeWorkCenterEdit',
			resolve: {
				itemEdit: function() {
					if(isNew) {
						return new ServiceAlternativeWorkCenter();
					} else {
						return $scope.itemEdit;
					}
				},
				workCenter1Definition: function() {
					return $scope.workCenter1Definition;
				},
				workCenterDefinition: function() {
					return $scope.workCenterDefinition;
				},
				alternativeWorkCenterStepsDefinition: function() {
					return $scope.alternativeWorkCenterStepsDefinition;
				},
			}
		})
		.result.then(function(result) {
			if(!angular.isDefined(result.id)) {
				ServiceAlternativeWorkCenter.saveCustom('stockmanagement/alternativeworkcenters', result, function(savedObject) {
					$scope.items.unshift(savedObject);
					if($scope.itemEdit !== null) {
						var index = $scope.items.map(function(it) { return it.id; }).indexOf($scope.itemEdit.id);
						$scope.items[index].isSelected = false;
					}
					$scope.itemEdit = angular.extend(savedObject);
					$scope.items[0].isSelected = true;
				});
			 } else {
				 ServiceAlternativeWorkCenter.updateCustom('stockmanagement/alternativeworkcenters/'+result.id, result, function(savedObject) {
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


.controller('ctrlAlternativeWorkCenterEdit',['$scope', 'Localization', '$modal', '$modalInstance', 'dialogs',
	'ServiceAlternativeWorkCenter', 'ServiceWorkCenter', 'ServiceAlternativeWorkCenterSteps',   'workCenter1Definition',  'workCenterDefinition',  'alternativeWorkCenterStepsDefinition',   'itemEdit',
function($scope, Localization, $modal, $modalInstance, dialogs,
	ServiceAlternativeWorkCenter, ServiceWorkCenter, ServiceAlternativeWorkCenterSteps,  workCenter1Definition,  workCenterDefinition,  alternativeWorkCenterStepsDefinition,  itemEdit) {

	// dialog mode
	$scope.mode = 'edit';

	// original item state
	var original = angular.copy(itemEdit);
	// item state
	$scope.itemEdit = angular.copy(original);

	// workCenter1 with properties
	$scope.workCenter1Definition = workCenter1Definition;
	// workCenter with properties
	$scope.workCenterDefinition = workCenterDefinition;
	// alternativeWorkCenterSteps with properties
	$scope.alternativeWorkCenterStepsDefinition = alternativeWorkCenterStepsDefinition;

	// datepicker logic

	// date properties

	$scope.open = function($event, opened) {
		$event.preventDefault();
		$event.stopPropagation();
		$scope[opened] = true;
	};



	// Choose workCenter1
	$scope.openChooseWorkCenter1Dialog = function() {
        $modal.open({
            backdrop: 'static',
            keyboard : false,
            templateUrl: 'productiondata/alternativeworkcenter/tmplWorkCenterChoose.tpl.html',
            size: 'lg',
            controller: 'ctrlWorkCenterChoose',
            windowClass: 'hmodal-info',
            resolve: {
				itemEdit: function() {
					if(angular.isDefined($scope.itemEdit.workCenter1)){
						return $scope.itemEdit.workCenter1;
					}
				}
			}
		}).result.then(function(result) {
			$scope.itemEdit.workCenter1 = angular.copy(result);
		});
    };


	// Choose workCenter
	$scope.openChooseWorkCenterDialog = function() {
        $modal.open({
            backdrop: 'static',
            keyboard : false,
            templateUrl: 'productiondata/alternativeworkcenter/tmplWorkCenterChoose.tpl.html',
            size: 'lg',
            controller: 'ctrlWorkCenterChoose',
            windowClass: 'hmodal-info',
            resolve: {
				itemEdit: function() {
					if(angular.isDefined($scope.itemEdit.workCenter)){
						return $scope.itemEdit.workCenter;
					}
				}
			}
		}).result.then(function(result) {
			$scope.itemEdit.workCenter = angular.copy(result);
		});
    };


    $scope.alternativeWorkCenterStepsEdit = null;

    // alternativeWorkCenterSteps table selection logic
    $scope.alternativeWorkCenterStepsSelection = function(item, index) {
        if(item.isSelected) {
            if($scope.alternativeWorkCenterStepsEdit !== null) {
                var index1 = $scope.itemEdit.alternativeWorkCenterSteps.map(function(it) { return it.id; }).indexOf($scope.alternativeWorkCenterStepsEdit.id);
                $scope.itemEdit.alternativeWorkCenterSteps[index1].isSelected = false;
            }
            $scope.alternativeWorkCenterStepsEdit = item;
        } else {
            $scope.alternativeWorkCenterStepsEdit = null;
            item.isSelected = false;
        }
    };

    // New/Edit alternativeWorkCenterSteps dialog
    $scope.openAlternativeWorkCenterStepsEditDialog = function(isNew) {
        $modal.open({
            backdrop: 'static',
            keyboard : false,
            templateUrl: 'capacitymanagement/alternativeworkcenter/tmplAlternativeWorkCenterStepsEdit.tpl.html',
            size: 'lg',
            controller: 'ctrlAlternativeWorkCenterStepsEdit',
            windowClass: 'hmodal-info',
            resolve: {
                itemEdit: function() {
                    if(isNew) {
                        return new ServiceAlternativeWorkCenterSteps();
                    } else {
                        return $scope.alternativeWorkCenterStepsEdit;
                    }
                }
            }
        }).result.then(function(result) {
            var i;
            if(isNew) {
                if(!angular.isDefined($scope.itemEdit.alternativeWorkCenterSteps)) {
                    $scope.itemEdit.alternativeWorkCenterSteps = [];
                }
                $scope.itemEdit.alternativeWorkCenterSteps.unshift(result);
                for(i in $scope.itemEdit.alternativeWorkCenterSteps) {
                    $scope.itemEdit.alternativeWorkCenterSteps[i].isSelected = false;
                }
                $scope.alternativeWorkCenterStepsEdit = angular.extend(result);
                $scope.itemEdit.alternativeWorkCenterSteps[0].isSelected = true;
            }
            else {
                for(i in $scope.itemEdit.alternativeWorkCenterSteps) {
                    $scope.itemEdit.alternativeWorkCenterSteps[i].isSelected = false;
                }
                $scope.alternativeWorkCenterStepsEdit = angular.extend(result);
                var index = $scope.itemEdit.alternativeWorkCenterSteps.map(function(it) { return it.id; }).indexOf(result.id);
                for(var key in result) {
                    $scope.itemEdit.alternativeWorkCenterSteps[index][key] = result[key];
                }
                $scope.itemEdit.alternativeWorkCenterSteps[index].isSelected = true;
            }
        });
    };

    $scope.removeAlternativeWorkCenterSteps = function(item) {
        var dialog = dialogs.confirm('Please confirm', 'Are you sure you want to delete item?');
        dialog.result.then(function(btn) {
            var removeIndex = $scope.itemEdit.alternativeWorkCenterSteps.map(function(it) { return it.id; }).indexOf(item.id);
            $scope.itemEdit.alternativeWorkCenterSteps[removeIndex].deleted = true;
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


.controller('ctrlAlternativeWorkCenterChoose', ['$scope','ServiceAlternativeWorkCenter', 'dialogs', '$modal', '$modalInstance', 'itemEdit',
function($scope, ServiceAlternativeWorkCenter, dialogs, $modal,  $modalInstance, itemEdit) {

    // entity with properties
    $scope.itemDefinition = {
        label: 'capacitymanagement.alternativeWorkCenter',
        properties: [
            { label: 'aWCApproved', name:'AWCApproved', inTable:  false  },
        ]
    };

	$scope.items = [];
	$scope.itemEdit = {};

	// fill table with data
	$scope.loaded = false;
	var getAlternativeWorkCenters = function() {
		if(!$scope.loaded && $scope.items.length === 0) {
			$scope.isLoading = true;
			ServiceAlternativeWorkCenter.query(function(data) {
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
	getAlternativeWorkCenters();

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