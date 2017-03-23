'use strict';

angular.module('Doob.environment')


.controller('ctrlTerritorialUnit',['$scope', '$rootScope', '$modal', 'dialogs', 'CheckSelected', 'ServiceTerritorialUnit',
    function($scope, $rootScope, $modal, dialogs, CheckSelected, ServiceTerritorialUnit) {

	// main entity (territorialUnit) properties names and labels
	$scope.itemDefinition = {
		label: 'environment.territorialUnit',
		properties: [
			{ label: 'tUCode', name:'TUCode', inTable:  true  },
			{ label: 'tUName', name:'TUName', inTable:  true  },
			{ label: 'tUShortName', name:'TUShortName', inTable:  false  },
			{ label: 'tUIsLeaf', name:'TUIsLeaf', inTable:  false  },
			{ label: 'tUNumberOfSubordinateTUs', name:'TUNumberOfSubordinateTUs', inTable:  false  },
		]
	};


	// fill table with data
	$scope.items = [];
	$scope.loaded = false;
	var getTerritorialUnits = function() {
		if(!$scope.loaded && $scope.items.length === 0) {
			$scope.isLoading = true;
			ServiceTerritorialUnit.query(function(data) {
				$scope.items = data;
				$scope.isLoading = false;
				$scope.loaded = true;
			});
		}
	};
	getTerritorialUnits();

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

	$scope.$watch('TerritorialUnitCollection', function() {
		$scope.itemEdit = CheckSelected.checkSelectedInTable($scope.itemEdit, $scope.TerritorialUnitCollection, $scope.items);
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
			templateUrl: 'environment/territorialunit/tmplTerritorialUnitEdit.tpl.html',
			size: 'lg',
			windowClass: 'hmodal-info',
			controller: 'ctrlTerritorialUnitEdit',
			resolve: {
				itemEdit: function() {
					if(isNew) {
						return new ServiceTerritorialUnit();
					} else {
						return $scope.itemEdit;
					}
				},
			}
		})
		.result.then(function(result) {
			if(!angular.isDefined(result.id)) {
				ServiceTerritorialUnit.saveCustom('stockmanagement/territorialunits', result, function(savedObject) {
					$scope.items.unshift(savedObject);
					if($scope.itemEdit !== null) {
						var index = $scope.items.map(function(it) { return it.id; }).indexOf($scope.itemEdit.id);
						$scope.items[index].isSelected = false;
					}
					$scope.itemEdit = angular.extend(savedObject);
					$scope.items[0].isSelected = true;
				});
			 } else {
				 ServiceTerritorialUnit.updateCustom('stockmanagement/territorialunits/'+result.id, result, function(savedObject) {
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


.controller('ctrlTerritorialUnitEdit',['$scope', 'Localization', '$modal', '$modalInstance', 'dialogs',
	'ServiceTerritorialUnit',    'itemEdit',
function($scope, Localization, $modal, $modalInstance, dialogs,
	ServiceTerritorialUnit,  itemEdit) {

	// dialog mode
	$scope.mode = 'edit';

	// original item state
	var original = angular.copy(itemEdit);
	// item state
	$scope.itemEdit = angular.copy(original);


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
		$modalInstance.close($scope.itemEdit);
	};


	$scope.canSave = function() {
		var item = $scope.itemEdit;
		return                 item.TUCode  &&                 item.TUName  ;
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


.controller('ctrlTerritorialUnitChoose', ['$scope','ServiceTerritorialUnit', 'dialogs', '$modal', '$modalInstance', 'itemEdit',
function($scope, ServiceTerritorialUnit, dialogs, $modal,  $modalInstance, itemEdit) {

    // entity with properties
    $scope.itemDefinition = {
        label: 'environment.territorialUnit',
        properties: [
            { label: 'tUCode', name:'TUCode', inTable:  true  },
            { label: 'tUName', name:'TUName', inTable:  true  },
            { label: 'tUShortName', name:'TUShortName', inTable:  false  },
            { label: 'tUIsLeaf', name:'TUIsLeaf', inTable:  false  },
            { label: 'tUNumberOfSubordinateTUs', name:'TUNumberOfSubordinateTUs', inTable:  false  },
        ]
    };

	$scope.items = [];
	$scope.itemEdit = {};

	// fill table with data
	$scope.loaded = false;
	var getTerritorialUnits = function() {
		if(!$scope.loaded && $scope.items.length === 0) {
			$scope.isLoading = true;
			ServiceTerritorialUnit.query(function(data) {
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
	getTerritorialUnits();

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