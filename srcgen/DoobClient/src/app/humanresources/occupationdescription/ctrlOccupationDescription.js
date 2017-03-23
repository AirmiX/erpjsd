'use strict';

angular.module('Doob.humanresources')


.controller('ctrlOccupationDescription',['$scope', '$rootScope', '$modal', 'dialogs', 'CheckSelected', 'ServiceOccupationDescription',
    function($scope, $rootScope, $modal, dialogs, CheckSelected, ServiceOccupationDescription) {

	// main entity (occupationDescription) properties names and labels
	$scope.itemDefinition = {
		label: 'humanresources.occupationDescription',
		properties: [
			{ label: 'oDOrdinalNumber', name:'ODOrdinalNumber', inTable:  true  },
			{ label: 'oDDescription', name:'ODDescription', inTable:  true  },
		]
	};

	// occupation with properties names and labels
	$scope.occupationDefinition = {
		label: 'humanresources.occupation',
		properties : [
			{ label: 'oCode', name:'OCode' },
			{ label: 'oName', name:'OName' },
		]
	};

	// fill table with data
	$scope.items = [];
	$scope.loaded = false;
	var getOccupationDescriptions = function() {
		if(!$scope.loaded && $scope.items.length === 0) {
			$scope.isLoading = true;
			ServiceOccupationDescription.query(function(data) {
				$scope.items = data;
				$scope.isLoading = false;
				$scope.loaded = true;
			});
		}
	};
	getOccupationDescriptions();

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

	$scope.$watch('OccupationDescriptionCollection', function() {
		$scope.itemEdit = CheckSelected.checkSelectedInTable($scope.itemEdit, $scope.OccupationDescriptionCollection, $scope.items);
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
			templateUrl: 'humanresources/occupationdescription/tmplOccupationDescriptionEdit.tpl.html',
			size: 'lg',
			windowClass: 'hmodal-info',
			controller: 'ctrlOccupationDescriptionEdit',
			resolve: {
				itemEdit: function() {
					if(isNew) {
						return new ServiceOccupationDescription();
					} else {
						return $scope.itemEdit;
					}
				},
				occupationDefinition: function() {
					return $scope.occupationDefinition;
				},
			}
		})
		.result.then(function(result) {
			if(!angular.isDefined(result.id)) {
				ServiceOccupationDescription.saveCustom('stockmanagement/occupationdescriptions', result, function(savedObject) {
					$scope.items.unshift(savedObject);
					if($scope.itemEdit !== null) {
						var index = $scope.items.map(function(it) { return it.id; }).indexOf($scope.itemEdit.id);
						$scope.items[index].isSelected = false;
					}
					$scope.itemEdit = angular.extend(savedObject);
					$scope.items[0].isSelected = true;
				});
			 } else {
				 ServiceOccupationDescription.updateCustom('stockmanagement/occupationdescriptions/'+result.id, result, function(savedObject) {
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


.controller('ctrlOccupationDescriptionEdit',['$scope', 'Localization', '$modal', '$modalInstance', 'dialogs',
	'ServiceOccupationDescription', 'ServiceOccupation',   'occupationDefinition',   'itemEdit',
function($scope, Localization, $modal, $modalInstance, dialogs,
	ServiceOccupationDescription, ServiceOccupation,  occupationDefinition,  itemEdit) {

	// dialog mode
	$scope.mode = 'edit';

	// original item state
	var original = angular.copy(itemEdit);
	// item state
	$scope.itemEdit = angular.copy(original);

	// occupation with properties
	$scope.occupationDefinition = occupationDefinition;

	// datepicker logic

	// date properties

	$scope.open = function($event, opened) {
		$event.preventDefault();
		$event.stopPropagation();
		$scope[opened] = true;
	};



	// Choose occupation
	$scope.openChooseOccupationDialog = function() {
        $modal.open({
            backdrop: 'static',
            keyboard : false,
            templateUrl: 'humanresources/occupationdescription/tmplOccupationChoose.tpl.html',
            size: 'lg',
            controller: 'ctrlOccupationChoose',
            windowClass: 'hmodal-info',
            resolve: {
				itemEdit: function() {
					if(angular.isDefined($scope.itemEdit.occupation)){
						return $scope.itemEdit.occupation;
					}
				}
			}
		}).result.then(function(result) {
			$scope.itemEdit.occupation = angular.copy(result);
		});
    };


	// Save Button
	$scope.save = function() {
	   //	delete $scope.itemEdit.isSelected;
		$modalInstance.close($scope.itemEdit);
	};


	$scope.canSave = function() {
		var item = $scope.itemEdit;
		return                 item.ODOrdinalNumber  &&                 item.ODDescription  ;
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


.controller('ctrlOccupationDescriptionChoose', ['$scope','ServiceOccupationDescription', 'dialogs', '$modal', '$modalInstance', 'itemEdit',
function($scope, ServiceOccupationDescription, dialogs, $modal,  $modalInstance, itemEdit) {

    // entity with properties
    $scope.itemDefinition = {
        label: 'humanresources.occupationDescription',
        properties: [
            { label: 'oDOrdinalNumber', name:'ODOrdinalNumber', inTable:  true  },
            { label: 'oDDescription', name:'ODDescription', inTable:  true  },
        ]
    };

	$scope.items = [];
	$scope.itemEdit = {};

	// fill table with data
	$scope.loaded = false;
	var getOccupationDescriptions = function() {
		if(!$scope.loaded && $scope.items.length === 0) {
			$scope.isLoading = true;
			ServiceOccupationDescription.query(function(data) {
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
	getOccupationDescriptions();

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