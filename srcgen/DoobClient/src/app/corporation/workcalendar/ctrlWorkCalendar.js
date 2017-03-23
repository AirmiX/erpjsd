'use strict';

angular.module('Doob.corporation')


.controller('ctrlWorkCalendar',['$scope', '$rootScope', '$modal', 'dialogs', 'CheckSelected', 'ServiceWorkCalendar',
    function($scope, $rootScope, $modal, dialogs, CheckSelected, ServiceWorkCalendar) {

	// main entity (workCalendar) properties names and labels
	$scope.itemDefinition = {
		label: 'corporation.workCalendar',
		properties: [
			{ label: 'wCYear', name:'WCYear', inTable:  true  },
			{ label: 'wCMonth', name:'WCMonth', inTable:  true  },
			{ label: 'wCDay', name:'WCDay', inTable:  true  },
			{ label: 'wCTimeUnit', name:'WCTimeUnit', inTable:  true  },
			{ label: 'wCDaysInWeek', name:'WCDaysInWeek', inTable:  true  },
			{ label: 'wCDayStatus', name:'WCDayStatus', inTable:  true  },
			{ label: 'wCDayOrdinalNumber', name:'WCDayOrdinalNumber', inTable:  true  },
			{ label: 'wCWorkingDayOrdinalNumber', name:'WCWorkingDayOrdinalNumber', inTable:  true  },
			{ label: 'wCEvent', name:'WCEvent', inTable:  false  },
		]
	};

	// organizationUnit with properties names and labels
	$scope.organizationUnitDefinition = {
		label: 'corporation.organizationUnit',
		properties : [
			{ label: 'oUIdentificationCode', name:'OUIdentificationCode' },
			{ label: 'oUName', name:'OUName' },
		]
	};

	// fill table with data
	$scope.items = [];
	$scope.loaded = false;
	var getWorkCalendars = function() {
		if(!$scope.loaded && $scope.items.length === 0) {
			$scope.isLoading = true;
			ServiceWorkCalendar.query(function(data) {
				$scope.items = data;
				$scope.isLoading = false;
				$scope.loaded = true;
			});
		}
	};
	getWorkCalendars();

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

	$scope.$watch('WorkCalendarCollection', function() {
		$scope.itemEdit = CheckSelected.checkSelectedInTable($scope.itemEdit, $scope.WorkCalendarCollection, $scope.items);
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
			templateUrl: 'corporation/workcalendar/tmplWorkCalendarEdit.tpl.html',
			size: 'lg',
			windowClass: 'hmodal-info',
			controller: 'ctrlWorkCalendarEdit',
			resolve: {
				itemEdit: function() {
					if(isNew) {
						return new ServiceWorkCalendar();
					} else {
						return $scope.itemEdit;
					}
				},
				organizationUnitDefinition: function() {
					return $scope.organizationUnitDefinition;
				},
			}
		})
		.result.then(function(result) {
			if(!angular.isDefined(result.id)) {
				ServiceWorkCalendar.saveCustom('stockmanagement/workcalendars', result, function(savedObject) {
					$scope.items.unshift(savedObject);
					if($scope.itemEdit !== null) {
						var index = $scope.items.map(function(it) { return it.id; }).indexOf($scope.itemEdit.id);
						$scope.items[index].isSelected = false;
					}
					$scope.itemEdit = angular.extend(savedObject);
					$scope.items[0].isSelected = true;
				});
			 } else {
				 ServiceWorkCalendar.updateCustom('stockmanagement/workcalendars/'+result.id, result, function(savedObject) {
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


.controller('ctrlWorkCalendarEdit',['$scope', 'Localization', '$modal', '$modalInstance', 'dialogs',
	'ServiceWorkCalendar', 'ServiceOrganizationUnit',   'organizationUnitDefinition',   'itemEdit',
function($scope, Localization, $modal, $modalInstance, dialogs,
	ServiceWorkCalendar, ServiceOrganizationUnit,  organizationUnitDefinition,  itemEdit) {

	// dialog mode
	$scope.mode = 'edit';

	// original item state
	var original = angular.copy(itemEdit);
	// item state
	$scope.itemEdit = angular.copy(original);

	// organizationUnit with properties
	$scope.organizationUnitDefinition = organizationUnitDefinition;

	// datepicker logic

	// date properties

	$scope.open = function($event, opened) {
		$event.preventDefault();
		$event.stopPropagation();
		$scope[opened] = true;
	};



	// Choose organizationUnit
	$scope.openChooseOrganizationUnitDialog = function() {
        $modal.open({
            backdrop: 'static',
            keyboard : false,
            templateUrl: 'corporation/workcalendar/tmplOrganizationUnitChoose.tpl.html',
            size: 'lg',
            controller: 'ctrlOrganizationUnitChoose',
            windowClass: 'hmodal-info',
            resolve: {
				itemEdit: function() {
					if(angular.isDefined($scope.itemEdit.organizationUnit)){
						return $scope.itemEdit.organizationUnit;
					}
				}
			}
		}).result.then(function(result) {
			$scope.itemEdit.organizationUnit = angular.copy(result);
		});
    };


	// Save Button
	$scope.save = function() {
	   //	delete $scope.itemEdit.isSelected;
		$modalInstance.close($scope.itemEdit);
	};


	$scope.canSave = function() {
		var item = $scope.itemEdit;
		return                 item.WCYear  &&                 item.WCMonth  &&                 item.WCDay  &&                 item.WCTimeUnit  &&                 item.WCDaysInWeek  &&                 item.WCDayStatus  &&                 item.WCDayOrdinalNumber  &&                 item.WCWorkingDayOrdinalNumber  ;
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


.controller('ctrlWorkCalendarChoose', ['$scope','ServiceWorkCalendar', 'dialogs', '$modal', '$modalInstance', 'itemEdit',
function($scope, ServiceWorkCalendar, dialogs, $modal,  $modalInstance, itemEdit) {

    // entity with properties
    $scope.itemDefinition = {
        label: 'corporation.workCalendar',
        properties: [
            { label: 'wCYear', name:'WCYear', inTable:  true  },
            { label: 'wCMonth', name:'WCMonth', inTable:  true  },
            { label: 'wCDay', name:'WCDay', inTable:  true  },
            { label: 'wCTimeUnit', name:'WCTimeUnit', inTable:  true  },
            { label: 'wCDaysInWeek', name:'WCDaysInWeek', inTable:  true  },
            { label: 'wCDayStatus', name:'WCDayStatus', inTable:  true  },
            { label: 'wCDayOrdinalNumber', name:'WCDayOrdinalNumber', inTable:  true  },
            { label: 'wCWorkingDayOrdinalNumber', name:'WCWorkingDayOrdinalNumber', inTable:  true  },
            { label: 'wCEvent', name:'WCEvent', inTable:  false  },
        ]
    };

	$scope.items = [];
	$scope.itemEdit = {};

	// fill table with data
	$scope.loaded = false;
	var getWorkCalendars = function() {
		if(!$scope.loaded && $scope.items.length === 0) {
			$scope.isLoading = true;
			ServiceWorkCalendar.query(function(data) {
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
	getWorkCalendars();

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