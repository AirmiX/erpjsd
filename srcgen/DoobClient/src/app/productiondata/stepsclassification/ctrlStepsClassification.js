'use strict';

angular.module('Doob.productiondata')


.controller('ctrlStepsClassification',['$scope', '$rootScope', '$modal', 'dialogs', 'CheckSelected', 'ServiceStepsClassification',
    function($scope, $rootScope, $modal, dialogs, CheckSelected, ServiceStepsClassification) {

	// main entity (stepsClassification) properties names and labels
	$scope.itemDefinition = {
		label: 'productiondata.stepsClassification',
		properties: [
			{ label: 'sCClassificationNumber', name:'SCClassificationNumber', inTable:  true  },
			{ label: 'sCFinalClassification', name:'SCFinalClassification', inTable:  false  },
			{ label: 'sCName', name:'SCName', inTable:  true  },
		]
	};

	// productionProcessSteps with properties names and labels
	$scope.productionProcessStepsDefinition = {
		label: 'productiondata.productionProcessSteps',
		properties : [
			{ label: 'pPSOrdinalNumber', name:'PPSOrdinalNumber' },
			{ label: 'pPSStepDuration', name:'PPSStepDuration' },
			{ label: 'pPSControlIndicator', name:'PPSControlIndicator' },
			{ label: 'pPSValidStartDate', name:'PPSValidStartDate' },
		]
	};
	// alternativeWorkCenters with properties names and labels
	$scope.alternativeWorkCentersDefinition = {
		label: 'capacitymanagement.alternativeWorkCenterSteps',
		properties : [
		]
	};
	// workCenterSteps with properties names and labels
	$scope.workCenterStepsDefinition = {
		label: 'capacitymanagement.workCenterSteps',
		properties : [
		]
	};

	// fill table with data
	$scope.items = [];
	$scope.loaded = false;
	var getStepsClassifications = function() {
		if(!$scope.loaded && $scope.items.length === 0) {
			$scope.isLoading = true;
			ServiceStepsClassification.query(function(data) {
				$scope.items = data;
				$scope.isLoading = false;
				$scope.loaded = true;
			});
		}
	};
	getStepsClassifications();

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

	$scope.$watch('StepsClassificationCollection', function() {
		$scope.itemEdit = CheckSelected.checkSelectedInTable($scope.itemEdit, $scope.StepsClassificationCollection, $scope.items);
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
			templateUrl: 'productiondata/stepsclassification/tmplStepsClassificationEdit.tpl.html',
			size: 'lg',
			windowClass: 'hmodal-info',
			controller: 'ctrlStepsClassificationEdit',
			resolve: {
				itemEdit: function() {
					if(isNew) {
						return new ServiceStepsClassification();
					} else {
						return $scope.itemEdit;
					}
				},
				productionProcessStepsDefinition: function() {
					return $scope.productionProcessStepsDefinition;
				},
				alternativeWorkCentersDefinition: function() {
					return $scope.alternativeWorkCentersDefinition;
				},
				workCenterStepsDefinition: function() {
					return $scope.workCenterStepsDefinition;
				},
			}
		})
		.result.then(function(result) {
			if(!angular.isDefined(result.id)) {
				ServiceStepsClassification.saveCustom('stockmanagement/stepsclassifications', result, function(savedObject) {
					$scope.items.unshift(savedObject);
					if($scope.itemEdit !== null) {
						var index = $scope.items.map(function(it) { return it.id; }).indexOf($scope.itemEdit.id);
						$scope.items[index].isSelected = false;
					}
					$scope.itemEdit = angular.extend(savedObject);
					$scope.items[0].isSelected = true;
				});
			 } else {
				 ServiceStepsClassification.updateCustom('stockmanagement/stepsclassifications/'+result.id, result, function(savedObject) {
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


.controller('ctrlStepsClassificationEdit',['$scope', 'Localization', '$modal', '$modalInstance', 'dialogs',
	'ServiceStepsClassification', 'ServiceProductionProcessSteps', 'ServiceAlternativeWorkCenterSteps', 'ServiceWorkCenterSteps',   'productionProcessStepsDefinition',  'alternativeWorkCentersDefinition',  'workCenterStepsDefinition',   'itemEdit',
function($scope, Localization, $modal, $modalInstance, dialogs,
	ServiceStepsClassification, ServiceProductionProcessSteps, ServiceAlternativeWorkCenterSteps, ServiceWorkCenterSteps,  productionProcessStepsDefinition,  alternativeWorkCentersDefinition,  workCenterStepsDefinition,  itemEdit) {

	// dialog mode
	$scope.mode = 'edit';

	// original item state
	var original = angular.copy(itemEdit);
	// item state
	$scope.itemEdit = angular.copy(original);

	// productionProcessSteps with properties
	$scope.productionProcessStepsDefinition = productionProcessStepsDefinition;
	// alternativeWorkCenters with properties
	$scope.alternativeWorkCentersDefinition = alternativeWorkCentersDefinition;
	// workCenterSteps with properties
	$scope.workCenterStepsDefinition = workCenterStepsDefinition;

	// datepicker logic

	// date properties

	$scope.open = function($event, opened) {
		$event.preventDefault();
		$event.stopPropagation();
		$scope[opened] = true;
	};



    $scope.alternativeWorkCenterStepsEdit = null;

    // alternativeWorkCenters table selection logic
    $scope.alternativeWorkCenterStepsSelection = function(item, index) {
        if(item.isSelected) {
            if($scope.alternativeWorkCenterStepsEdit !== null) {
                var index1 = $scope.itemEdit.alternativeWorkCenters.map(function(it) { return it.id; }).indexOf($scope.alternativeWorkCenterStepsEdit.id);
                $scope.itemEdit.alternativeWorkCenters[index1].isSelected = false;
            }
            $scope.alternativeWorkCenterStepsEdit = item;
        } else {
            $scope.alternativeWorkCenterStepsEdit = null;
            item.isSelected = false;
        }
    };

    // New/Edit alternativeWorkCenters dialog
    $scope.openAlternativeWorkCenterStepsEditDialog = function(isNew) {
        $modal.open({
            backdrop: 'static',
            keyboard : false,
            templateUrl: 'capacitymanagement/stepsclassification/tmplAlternativeWorkCenterStepsEdit.tpl.html',
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
                if(!angular.isDefined($scope.itemEdit.alternativeWorkCenters)) {
                    $scope.itemEdit.alternativeWorkCenters = [];
                }
                $scope.itemEdit.alternativeWorkCenters.unshift(result);
                for(i in $scope.itemEdit.alternativeWorkCenters) {
                    $scope.itemEdit.alternativeWorkCenters[i].isSelected = false;
                }
                $scope.alternativeWorkCenterStepsEdit = angular.extend(result);
                $scope.itemEdit.alternativeWorkCenters[0].isSelected = true;
            }
            else {
                for(i in $scope.itemEdit.alternativeWorkCenters) {
                    $scope.itemEdit.alternativeWorkCenters[i].isSelected = false;
                }
                $scope.alternativeWorkCenterStepsEdit = angular.extend(result);
                var index = $scope.itemEdit.alternativeWorkCenters.map(function(it) { return it.id; }).indexOf(result.id);
                for(var key in result) {
                    $scope.itemEdit.alternativeWorkCenters[index][key] = result[key];
                }
                $scope.itemEdit.alternativeWorkCenters[index].isSelected = true;
            }
        });
    };

    $scope.removeAlternativeWorkCenterSteps = function(item) {
        var dialog = dialogs.confirm('Please confirm', 'Are you sure you want to delete item?');
        dialog.result.then(function(btn) {
            var removeIndex = $scope.itemEdit.alternativeWorkCenters.map(function(it) { return it.id; }).indexOf(item.id);
            $scope.itemEdit.alternativeWorkCenters[removeIndex].deleted = true;
        });
    };


    $scope.workCenterStepsEdit = null;

    // workCenterSteps table selection logic
    $scope.workCenterStepsSelection = function(item, index) {
        if(item.isSelected) {
            if($scope.workCenterStepsEdit !== null) {
                var index1 = $scope.itemEdit.workCenterSteps.map(function(it) { return it.id; }).indexOf($scope.workCenterStepsEdit.id);
                $scope.itemEdit.workCenterSteps[index1].isSelected = false;
            }
            $scope.workCenterStepsEdit = item;
        } else {
            $scope.workCenterStepsEdit = null;
            item.isSelected = false;
        }
    };

    // New/Edit workCenterSteps dialog
    $scope.openWorkCenterStepsEditDialog = function(isNew) {
        $modal.open({
            backdrop: 'static',
            keyboard : false,
            templateUrl: 'capacitymanagement/stepsclassification/tmplWorkCenterStepsEdit.tpl.html',
            size: 'lg',
            controller: 'ctrlWorkCenterStepsEdit',
            windowClass: 'hmodal-info',
            resolve: {
                itemEdit: function() {
                    if(isNew) {
                        return new ServiceWorkCenterSteps();
                    } else {
                        return $scope.workCenterStepsEdit;
                    }
                }
            }
        }).result.then(function(result) {
            var i;
            if(isNew) {
                if(!angular.isDefined($scope.itemEdit.workCenterSteps)) {
                    $scope.itemEdit.workCenterSteps = [];
                }
                $scope.itemEdit.workCenterSteps.unshift(result);
                for(i in $scope.itemEdit.workCenterSteps) {
                    $scope.itemEdit.workCenterSteps[i].isSelected = false;
                }
                $scope.workCenterStepsEdit = angular.extend(result);
                $scope.itemEdit.workCenterSteps[0].isSelected = true;
            }
            else {
                for(i in $scope.itemEdit.workCenterSteps) {
                    $scope.itemEdit.workCenterSteps[i].isSelected = false;
                }
                $scope.workCenterStepsEdit = angular.extend(result);
                var index = $scope.itemEdit.workCenterSteps.map(function(it) { return it.id; }).indexOf(result.id);
                for(var key in result) {
                    $scope.itemEdit.workCenterSteps[index][key] = result[key];
                }
                $scope.itemEdit.workCenterSteps[index].isSelected = true;
            }
        });
    };

    $scope.removeWorkCenterSteps = function(item) {
        var dialog = dialogs.confirm('Please confirm', 'Are you sure you want to delete item?');
        dialog.result.then(function(btn) {
            var removeIndex = $scope.itemEdit.workCenterSteps.map(function(it) { return it.id; }).indexOf(item.id);
            $scope.itemEdit.workCenterSteps[removeIndex].deleted = true;
        });
    };


	// Save Button
	$scope.save = function() {
	   //	delete $scope.itemEdit.isSelected;
        var item;
        var i;
        for(i in $scope.itemEdit.productionProcessSteps) {
    		item = $scope.itemEdit.productionProcessSteps[i];
    		delete item.isSelected;
    	}
		$modalInstance.close($scope.itemEdit);
	};


	$scope.canSave = function() {
		var item = $scope.itemEdit;
		return                 item.SCClassificationNumber  &&                 item.SCName  ;
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


.controller('ctrlStepsClassificationChoose', ['$scope','ServiceStepsClassification', 'dialogs', '$modal', '$modalInstance', 'itemEdit',
function($scope, ServiceStepsClassification, dialogs, $modal,  $modalInstance, itemEdit) {

    // entity with properties
    $scope.itemDefinition = {
        label: 'productiondata.stepsClassification',
        properties: [
            { label: 'sCClassificationNumber', name:'SCClassificationNumber', inTable:  true  },
            { label: 'sCFinalClassification', name:'SCFinalClassification', inTable:  false  },
            { label: 'sCName', name:'SCName', inTable:  true  },
        ]
    };

	$scope.items = [];
	$scope.itemEdit = {};

	// fill table with data
	$scope.loaded = false;
	var getStepsClassifications = function() {
		if(!$scope.loaded && $scope.items.length === 0) {
			$scope.isLoading = true;
			ServiceStepsClassification.query(function(data) {
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
	getStepsClassifications();

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