'use strict';

angular.module('Doob.capacitymanagement')


.controller('ctrlAvailabilityWorkCenter',['$scope', '$rootScope', '$modal', 'dialogs', 'CheckSelected', 'ServiceAvailabilityWorkCenter',
    function($scope, $rootScope, $modal, dialogs, CheckSelected, ServiceAvailabilityWorkCenter) {

	// main entity (availabilityWorkCenter) properties names and labels
	$scope.itemDefinition = {
		label: 'capacitymanagement.availabilityWorkCenter',
		properties: [
			{ label: 'aWCOrdinalNumber', name:'AWCOrdinalNumber', inTable:  true  },
			{ label: 'aWCStartDate', name:'AWCStartDate', inTable:  true  },
			{ label: 'aWCEndDate', name:'AWCEndDate', inTable:  false  },
			{ label: 'aWCCapacityChange', name:'AWCCapacityChange', inTable:  true  },
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

	// fill table with data
	$scope.items = [];
	$scope.loaded = false;
	var getAvailabilityWorkCenters = function() {
		if(!$scope.loaded && $scope.items.length === 0) {
			$scope.isLoading = true;
			ServiceAvailabilityWorkCenter.query(function(data) {
				$scope.items = data;
				$scope.isLoading = false;
				$scope.loaded = true;
			});
		}
	};
	getAvailabilityWorkCenters();

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

	$scope.$watch('AvailabilityWorkCenterCollection', function() {
		$scope.itemEdit = CheckSelected.checkSelectedInTable($scope.itemEdit, $scope.AvailabilityWorkCenterCollection, $scope.items);
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
			templateUrl: 'capacitymanagement/availabilityworkcenter/tmplAvailabilityWorkCenterEdit.tpl.html',
			size: 'lg',
			windowClass: 'hmodal-info',
			controller: 'ctrlAvailabilityWorkCenterEdit',
			resolve: {
				itemEdit: function() {
					if(isNew) {
						return new ServiceAvailabilityWorkCenter();
					} else {
						return $scope.itemEdit;
					}
				},
				workCenterDefinition: function() {
					return $scope.workCenterDefinition;
				},
			}
		})
		.result.then(function(result) {
			if(!angular.isDefined(result.id)) {
				ServiceAvailabilityWorkCenter.saveCustom('stockmanagement/availabilityworkcenters', result, function(savedObject) {
					$scope.items.unshift(savedObject);
					if($scope.itemEdit !== null) {
						var index = $scope.items.map(function(it) { return it.id; }).indexOf($scope.itemEdit.id);
						$scope.items[index].isSelected = false;
					}
					$scope.itemEdit = angular.extend(savedObject);
					$scope.items[0].isSelected = true;
				});
			 } else {
				 ServiceAvailabilityWorkCenter.updateCustom('stockmanagement/availabilityworkcenters/'+result.id, result, function(savedObject) {
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


.controller('ctrlAvailabilityWorkCenterEdit',['$scope', 'Localization', '$modal', '$modalInstance', 'dialogs',
	'ServiceAvailabilityWorkCenter', 'ServiceWorkCenter',   'workCenterDefinition',   'itemEdit',
function($scope, Localization, $modal, $modalInstance, dialogs,
	ServiceAvailabilityWorkCenter, ServiceWorkCenter,  workCenterDefinition,  itemEdit) {

	// dialog mode
	$scope.mode = 'edit';

	// original item state
	var original = angular.copy(itemEdit);
	// item state
	$scope.itemEdit = angular.copy(original);

	// workCenter with properties
	$scope.workCenterDefinition = workCenterDefinition;

	// datepicker logic

	// date properties
	$scope.openedAWCStartDate = false;
	$scope.openedAWCEndDate = false;

	$scope.open = function($event, opened) {
		$event.preventDefault();
		$event.stopPropagation();
		$scope[opened] = true;
	};



	// Choose workCenter
	$scope.openChooseWorkCenterDialog = function() {
        $modal.open({
            backdrop: 'static',
            keyboard : false,
            templateUrl: 'productiondata/availabilityworkcenter/tmplWorkCenterChoose.tpl.html',
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


	// Save Button
	$scope.save = function() {
		correctDateTime($scope.itemEdit.AWCStartDate);
		correctDateTime($scope.itemEdit.AWCEndDate);
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
		return                 item.AWCOrdinalNumber  &&                 item.AWCStartDate  &&                 item.AWCCapacityChange  ;
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


.controller('ctrlAvailabilityWorkCenterChoose', ['$scope','ServiceAvailabilityWorkCenter', 'dialogs', '$modal', '$modalInstance', 'itemEdit',
function($scope, ServiceAvailabilityWorkCenter, dialogs, $modal,  $modalInstance, itemEdit) {

    // entity with properties
    $scope.itemDefinition = {
        label: 'capacitymanagement.availabilityWorkCenter',
        properties: [
            { label: 'aWCOrdinalNumber', name:'AWCOrdinalNumber', inTable:  true  },
            { label: 'aWCStartDate', name:'AWCStartDate', inTable:  true  },
            { label: 'aWCEndDate', name:'AWCEndDate', inTable:  false  },
            { label: 'aWCCapacityChange', name:'AWCCapacityChange', inTable:  true  },
        ]
    };

	$scope.items = [];
	$scope.itemEdit = {};

	// fill table with data
	$scope.loaded = false;
	var getAvailabilityWorkCenters = function() {
		if(!$scope.loaded && $scope.items.length === 0) {
			$scope.isLoading = true;
			ServiceAvailabilityWorkCenter.query(function(data) {
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
	getAvailabilityWorkCenters();

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