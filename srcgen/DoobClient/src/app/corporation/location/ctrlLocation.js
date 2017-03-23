'use strict';

angular.module('Doob.corporation')


.controller('ctrlLocation',['$scope', '$rootScope', '$modal', 'dialogs', 'CheckSelected', 'ServiceLocation',
    function($scope, $rootScope, $modal, dialogs, CheckSelected, ServiceLocation) {

	// main entity (location) properties names and labels
	$scope.itemDefinition = {
		label: 'corporation.location',
		properties: [
			{ label: 'lIdentificationCode', name:'LIdentificationCode', inTable:  true  },
			{ label: 'lName', name:'LName', inTable:  true  },
			{ label: 'lShortName', name:'LShortName', inTable:  false  },
			{ label: 'lTelephone', name:'LTelephone', inTable:  false  },
			{ label: 'lClassification', name:'LClassification', inTable:  false  },
		]
	};

	// type with properties names and labels
	$scope.typeDefinition = {
		label: 'corporation.locationType',
		properties : [
			{ label: 'lTName', name:'LTName' },
		]
	};
	// workCenters with properties names and labels
	$scope.workCentersDefinition = {
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

	// fill table with data
	$scope.items = [];
	$scope.loaded = false;
	var getLocations = function() {
		if(!$scope.loaded && $scope.items.length === 0) {
			$scope.isLoading = true;
			ServiceLocation.query(function(data) {
				$scope.items = data;
				$scope.isLoading = false;
				$scope.loaded = true;
			});
		}
	};
	getLocations();

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

	$scope.$watch('LocationCollection', function() {
		$scope.itemEdit = CheckSelected.checkSelectedInTable($scope.itemEdit, $scope.LocationCollection, $scope.items);
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
			templateUrl: 'corporation/location/tmplLocationEdit.tpl.html',
			size: 'lg',
			windowClass: 'hmodal-info',
			controller: 'ctrlLocationEdit',
			resolve: {
				itemEdit: function() {
					if(isNew) {
						return new ServiceLocation();
					} else {
						return $scope.itemEdit;
					}
				},
				typeDefinition: function() {
					return $scope.typeDefinition;
				},
				workCentersDefinition: function() {
					return $scope.workCentersDefinition;
				},
			}
		})
		.result.then(function(result) {
			if(!angular.isDefined(result.id)) {
				ServiceLocation.saveCustom('stockmanagement/locations', result, function(savedObject) {
					$scope.items.unshift(savedObject);
					if($scope.itemEdit !== null) {
						var index = $scope.items.map(function(it) { return it.id; }).indexOf($scope.itemEdit.id);
						$scope.items[index].isSelected = false;
					}
					$scope.itemEdit = angular.extend(savedObject);
					$scope.items[0].isSelected = true;
				});
			 } else {
				 ServiceLocation.updateCustom('stockmanagement/locations/'+result.id, result, function(savedObject) {
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


.controller('ctrlLocationEdit',['$scope', 'Localization', '$modal', '$modalInstance', 'dialogs',
	'ServiceLocation', 'ServiceLocationType', 'ServiceWorkCenter',   'typeDefinition',  'workCentersDefinition',   'itemEdit',
function($scope, Localization, $modal, $modalInstance, dialogs,
	ServiceLocation, ServiceLocationType, ServiceWorkCenter,  typeDefinition,  workCentersDefinition,  itemEdit) {

	// dialog mode
	$scope.mode = 'edit';

	// original item state
	var original = angular.copy(itemEdit);
	// item state
	$scope.itemEdit = angular.copy(original);

	// type with properties
	$scope.typeDefinition = typeDefinition;
	// workCenters with properties
	$scope.workCentersDefinition = workCentersDefinition;

	// datepicker logic

	// date properties

	$scope.open = function($event, opened) {
		$event.preventDefault();
		$event.stopPropagation();
		$scope[opened] = true;
	};



	// Choose type
	$scope.openChooseTypeDialog = function() {
        $modal.open({
            backdrop: 'static',
            keyboard : false,
            templateUrl: 'corporation/location/tmplLocationTypeChoose.tpl.html',
            size: 'lg',
            controller: 'ctrlLocationTypeChoose',
            windowClass: 'hmodal-info',
            resolve: {
				itemEdit: function() {
					if(angular.isDefined($scope.itemEdit.type)){
						return $scope.itemEdit.type;
					}
				}
			}
		}).result.then(function(result) {
			$scope.itemEdit.type = angular.copy(result);
		});
    };


    $scope.workCenterEdit = null;

    // workCenters table selection logic
    $scope.workCenterSelection = function(item, index) {
        if(item.isSelected) {
            if($scope.workCenterEdit !== null) {
                var index1 = $scope.itemEdit.workCenters.map(function(it) { return it.id; }).indexOf($scope.workCenterEdit.id);
                $scope.itemEdit.workCenters[index1].isSelected = false;
            }
            $scope.workCenterEdit = item;
        } else {
            $scope.workCenterEdit = null;
            item.isSelected = false;
        }
    };

    // New/Edit workCenters dialog
    $scope.openWorkCenterEditDialog = function(isNew) {
        $modal.open({
            backdrop: 'static',
            keyboard : false,
            templateUrl: 'productiondata/location/tmplWorkCenterEdit.tpl.html',
            size: 'lg',
            controller: 'ctrlWorkCenterEdit',
            windowClass: 'hmodal-info',
            resolve: {
                itemEdit: function() {
                    if(isNew) {
                        return new ServiceWorkCenter();
                    } else {
                        return $scope.workCenterEdit;
                    }
                }
            }
        }).result.then(function(result) {
            var i;
            if(isNew) {
                if(!angular.isDefined($scope.itemEdit.workCenters)) {
                    $scope.itemEdit.workCenters = [];
                }
                $scope.itemEdit.workCenters.unshift(result);
                for(i in $scope.itemEdit.workCenters) {
                    $scope.itemEdit.workCenters[i].isSelected = false;
                }
                $scope.workCenterEdit = angular.extend(result);
                $scope.itemEdit.workCenters[0].isSelected = true;
            }
            else {
                for(i in $scope.itemEdit.workCenters) {
                    $scope.itemEdit.workCenters[i].isSelected = false;
                }
                $scope.workCenterEdit = angular.extend(result);
                var index = $scope.itemEdit.workCenters.map(function(it) { return it.id; }).indexOf(result.id);
                for(var key in result) {
                    $scope.itemEdit.workCenters[index][key] = result[key];
                }
                $scope.itemEdit.workCenters[index].isSelected = true;
            }
        });
    };

    $scope.removeWorkCenter = function(item) {
        var dialog = dialogs.confirm('Please confirm', 'Are you sure you want to delete item?');
        dialog.result.then(function(btn) {
            var removeIndex = $scope.itemEdit.workCenters.map(function(it) { return it.id; }).indexOf(item.id);
            $scope.itemEdit.workCenters[removeIndex].deleted = true;
        });
    };


	// Save Button
	$scope.save = function() {
	   //	delete $scope.itemEdit.isSelected;
		$modalInstance.close($scope.itemEdit);
	};


	$scope.canSave = function() {
		var item = $scope.itemEdit;
		return                 item.LIdentificationCode  &&                 item.LName  ;
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


.controller('ctrlLocationChoose', ['$scope','ServiceLocation', 'dialogs', '$modal', '$modalInstance', 'itemEdit',
function($scope, ServiceLocation, dialogs, $modal,  $modalInstance, itemEdit) {

    // entity with properties
    $scope.itemDefinition = {
        label: 'corporation.location',
        properties: [
            { label: 'lIdentificationCode', name:'LIdentificationCode', inTable:  true  },
            { label: 'lName', name:'LName', inTable:  true  },
            { label: 'lShortName', name:'LShortName', inTable:  false  },
            { label: 'lTelephone', name:'LTelephone', inTable:  false  },
            { label: 'lClassification', name:'LClassification', inTable:  false  },
        ]
    };

	$scope.items = [];
	$scope.itemEdit = {};

	// fill table with data
	$scope.loaded = false;
	var getLocations = function() {
		if(!$scope.loaded && $scope.items.length === 0) {
			$scope.isLoading = true;
			ServiceLocation.query(function(data) {
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
	getLocations();

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