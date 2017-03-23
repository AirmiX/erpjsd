'use strict';

angular.module('Doob.environment')


.controller('ctrlMVCity',['$scope', '$rootScope', '$modal', 'dialogs', 'CheckSelected', 'ServiceMVCity',
    function($scope, $rootScope, $modal, dialogs, CheckSelected, ServiceMVCity) {

	// main entity (mVCity) properties names and labels
	$scope.itemDefinition = {
		label: 'environment.mVCity',
		properties: [
			{ label: 'tUCode', name:'TUCode', inTable:  false  },
			{ label: 'tUIsLeaf', name:'TUIsLeaf', inTable:  false  },
			{ label: 'tUName', name:'TUName', inTable:  false  },
			{ label: 'tUNumberOfSubordinateTus', name:'TUNumberOfSubordinateTus', inTable:  false  },
			{ label: 'tUShortName', name:'TUShortName', inTable:  false  },
		]
	};


	// fill table with data
	$scope.items = [];
	$scope.loaded = false;
	var getMVCitys = function() {
		if(!$scope.loaded && $scope.items.length === 0) {
			$scope.isLoading = true;
			ServiceMVCity.query(function(data) {
				$scope.items = data;
				$scope.isLoading = false;
				$scope.loaded = true;
			});
		}
	};
	getMVCitys();

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

	$scope.$watch('MVCityCollection', function() {
		$scope.itemEdit = CheckSelected.checkSelectedInTable($scope.itemEdit, $scope.MVCityCollection, $scope.items);
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
			templateUrl: 'environment/mvcity/tmplMVCityEdit.tpl.html',
			size: 'lg',
			windowClass: 'hmodal-info',
			controller: 'ctrlMVCityEdit',
			resolve: {
				itemEdit: function() {
					if(isNew) {
						return new ServiceMVCity();
					} else {
						return $scope.itemEdit;
					}
				},
			}
		})
		.result.then(function(result) {
			if(!angular.isDefined(result.id)) {
				ServiceMVCity.saveCustom('stockmanagement/mvcitys', result, function(savedObject) {
					$scope.items.unshift(savedObject);
					if($scope.itemEdit !== null) {
						var index = $scope.items.map(function(it) { return it.id; }).indexOf($scope.itemEdit.id);
						$scope.items[index].isSelected = false;
					}
					$scope.itemEdit = angular.extend(savedObject);
					$scope.items[0].isSelected = true;
				});
			 } else {
				 ServiceMVCity.updateCustom('stockmanagement/mvcitys/'+result.id, result, function(savedObject) {
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


.controller('ctrlMVCityEdit',['$scope', 'Localization', '$modal', '$modalInstance', 'dialogs',
	'ServiceMVCity',    'itemEdit',
function($scope, Localization, $modal, $modalInstance, dialogs,
	ServiceMVCity,  itemEdit) {

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


.controller('ctrlMVCityChoose', ['$scope','ServiceMVCity', 'dialogs', '$modal', '$modalInstance', 'itemEdit',
function($scope, ServiceMVCity, dialogs, $modal,  $modalInstance, itemEdit) {

    // entity with properties
    $scope.itemDefinition = {
        label: 'environment.mVCity',
        properties: [
            { label: 'tUCode', name:'TUCode', inTable:  false  },
            { label: 'tUIsLeaf', name:'TUIsLeaf', inTable:  false  },
            { label: 'tUName', name:'TUName', inTable:  false  },
            { label: 'tUNumberOfSubordinateTus', name:'TUNumberOfSubordinateTus', inTable:  false  },
            { label: 'tUShortName', name:'TUShortName', inTable:  false  },
        ]
    };

	$scope.items = [];
	$scope.itemEdit = {};

	// fill table with data
	$scope.loaded = false;
	var getMVCitys = function() {
		if(!$scope.loaded && $scope.items.length === 0) {
			$scope.isLoading = true;
			ServiceMVCity.query(function(data) {
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
	getMVCitys();

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