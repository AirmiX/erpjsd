'use strict';

angular.module('Doob.humanresources')


.controller('ctrlWorkstationDescription',['$scope', '$rootScope', '$modal', 'dialogs', 'CheckSelected', 'ServiceWorkstationDescription',
    function($scope, $rootScope, $modal, dialogs, CheckSelected, ServiceWorkstationDescription) {

	// main entity (workstationDescription) properties names and labels
	$scope.itemDefinition = {
		label: 'humanresources.workstationDescription',
		properties: [
			{ label: 'wDOrdinalNumber', name:'WDOrdinalNumber', inTable:  true  },
			{ label: 'wDDescription', name:'WDDescription', inTable:  true  },
		]
	};

	// workstation with properties names and labels
	$scope.workstationDefinition = {
		label: 'humanresources.workstation',
		properties : [
			{ label: 'wOrdinalNumber', name:'WOrdinalNumber' },
			{ label: 'wName', name:'WName' },
			{ label: 'wNumberOfPerformers', name:'WNumberOfPerformers' },
		]
	};

	// fill table with data
	$scope.items = [];
	$scope.loaded = false;
	var getWorkstationDescriptions = function() {
		if(!$scope.loaded && $scope.items.length === 0) {
			$scope.isLoading = true;
			ServiceWorkstationDescription.query(function(data) {
				$scope.items = data;
				$scope.isLoading = false;
				$scope.loaded = true;
			});
		}
	};
	getWorkstationDescriptions();

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

	$scope.$watch('WorkstationDescriptionCollection', function() {
		$scope.itemEdit = CheckSelected.checkSelectedInTable($scope.itemEdit, $scope.WorkstationDescriptionCollection, $scope.items);
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
			templateUrl: 'humanresources/workstationdescription/tmplWorkstationDescriptionEdit.tpl.html',
			size: 'lg',
			windowClass: 'hmodal-info',
			controller: 'ctrlWorkstationDescriptionEdit',
			resolve: {
				itemEdit: function() {
					if(isNew) {
						return new ServiceWorkstationDescription();
					} else {
						return $scope.itemEdit;
					}
				},
				workstationDefinition: function() {
					return $scope.workstationDefinition;
				},
			}
		})
		.result.then(function(result) {
			if(!angular.isDefined(result.id)) {
				ServiceWorkstationDescription.saveCustom('stockmanagement/workstationdescriptions', result, function(savedObject) {
					$scope.items.unshift(savedObject);
					if($scope.itemEdit !== null) {
						var index = $scope.items.map(function(it) { return it.id; }).indexOf($scope.itemEdit.id);
						$scope.items[index].isSelected = false;
					}
					$scope.itemEdit = angular.extend(savedObject);
					$scope.items[0].isSelected = true;
				});
			 } else {
				 ServiceWorkstationDescription.updateCustom('stockmanagement/workstationdescriptions/'+result.id, result, function(savedObject) {
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


.controller('ctrlWorkstationDescriptionEdit',['$scope', 'Localization', '$modal', '$modalInstance', 'dialogs',
	'ServiceWorkstationDescription', 'ServiceWorkstation',   'workstationDefinition',   'itemEdit',
function($scope, Localization, $modal, $modalInstance, dialogs,
	ServiceWorkstationDescription, ServiceWorkstation,  workstationDefinition,  itemEdit) {

	// dialog mode
	$scope.mode = 'edit';

	// original item state
	var original = angular.copy(itemEdit);
	// item state
	$scope.itemEdit = angular.copy(original);

	// workstation with properties
	$scope.workstationDefinition = workstationDefinition;

	// datepicker logic

	// date properties

	$scope.open = function($event, opened) {
		$event.preventDefault();
		$event.stopPropagation();
		$scope[opened] = true;
	};



	// Choose workstation
	$scope.openChooseWorkstationDialog = function() {
        $modal.open({
            backdrop: 'static',
            keyboard : false,
            templateUrl: 'humanresources/workstationdescription/tmplWorkstationChoose.tpl.html',
            size: 'lg',
            controller: 'ctrlWorkstationChoose',
            windowClass: 'hmodal-info',
            resolve: {
				itemEdit: function() {
					if(angular.isDefined($scope.itemEdit.workstation)){
						return $scope.itemEdit.workstation;
					}
				}
			}
		}).result.then(function(result) {
			$scope.itemEdit.workstation = angular.copy(result);
		});
    };


	// Save Button
	$scope.save = function() {
	   //	delete $scope.itemEdit.isSelected;
		$modalInstance.close($scope.itemEdit);
	};


	$scope.canSave = function() {
		var item = $scope.itemEdit;
		return                 item.WDOrdinalNumber  &&                 item.WDDescription  ;
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


.controller('ctrlWorkstationDescriptionChoose', ['$scope','ServiceWorkstationDescription', 'dialogs', '$modal', '$modalInstance', 'itemEdit',
function($scope, ServiceWorkstationDescription, dialogs, $modal,  $modalInstance, itemEdit) {

    // entity with properties
    $scope.itemDefinition = {
        label: 'humanresources.workstationDescription',
        properties: [
            { label: 'wDOrdinalNumber', name:'WDOrdinalNumber', inTable:  true  },
            { label: 'wDDescription', name:'WDDescription', inTable:  true  },
        ]
    };

	$scope.items = [];
	$scope.itemEdit = {};

	// fill table with data
	$scope.loaded = false;
	var getWorkstationDescriptions = function() {
		if(!$scope.loaded && $scope.items.length === 0) {
			$scope.isLoading = true;
			ServiceWorkstationDescription.query(function(data) {
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
	getWorkstationDescriptions();

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