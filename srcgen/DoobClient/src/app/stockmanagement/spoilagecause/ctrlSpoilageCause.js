'use strict';

angular.module('Doob.stockmanagement')


.controller('ctrlSpoilageCause',['$scope', '$rootScope', '$modal', 'dialogs', 'CheckSelected', 'ServiceSpoilageCause',
    function($scope, $rootScope, $modal, dialogs, CheckSelected, ServiceSpoilageCause) {

	// main entity (spoilageCause) properties names and labels
	$scope.itemDefinition = {
		label: 'stockmanagement.spoilageCause',
		properties: [
			{ label: 'sCDesignation', name:'SCDesignation', inTable:  true  },
			{ label: 'sCName', name:'SCName', inTable:  true  },
		]
	};


	// fill table with data
	$scope.items = [];
	$scope.loaded = false;
	var getSpoilageCauses = function() {
		if(!$scope.loaded && $scope.items.length === 0) {
			$scope.isLoading = true;
			ServiceSpoilageCause.query(function(data) {
				$scope.items = data;
				$scope.isLoading = false;
				$scope.loaded = true;
			});
		}
	};
	getSpoilageCauses();

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

	$scope.$watch('SpoilageCauseCollection', function() {
		$scope.itemEdit = CheckSelected.checkSelectedInTable($scope.itemEdit, $scope.SpoilageCauseCollection, $scope.items);
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
			templateUrl: 'stockmanagement/spoilagecause/tmplSpoilageCauseEdit.tpl.html',
			size: 'lg',
			windowClass: 'hmodal-info',
			controller: 'ctrlSpoilageCauseEdit',
			resolve: {
				itemEdit: function() {
					if(isNew) {
						return new ServiceSpoilageCause();
					} else {
						return $scope.itemEdit;
					}
				},
			}
		})
		.result.then(function(result) {
			if(!angular.isDefined(result.id)) {
				ServiceSpoilageCause.saveCustom('stockmanagement/spoilagecauses', result, function(savedObject) {
					$scope.items.unshift(savedObject);
					if($scope.itemEdit !== null) {
						var index = $scope.items.map(function(it) { return it.id; }).indexOf($scope.itemEdit.id);
						$scope.items[index].isSelected = false;
					}
					$scope.itemEdit = angular.extend(savedObject);
					$scope.items[0].isSelected = true;
				});
			 } else {
				 ServiceSpoilageCause.updateCustom('stockmanagement/spoilagecauses/'+result.id, result, function(savedObject) {
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


.controller('ctrlSpoilageCauseEdit',['$scope', 'Localization', '$modal', '$modalInstance', 'dialogs',
	'ServiceSpoilageCause',    'itemEdit',
function($scope, Localization, $modal, $modalInstance, dialogs,
	ServiceSpoilageCause,  itemEdit) {

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
		return                 item.SCDesignation  &&                 item.SCName  ;
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


.controller('ctrlSpoilageCauseChoose', ['$scope','ServiceSpoilageCause', 'dialogs', '$modal', '$modalInstance', 'itemEdit',
function($scope, ServiceSpoilageCause, dialogs, $modal,  $modalInstance, itemEdit) {

    // entity with properties
    $scope.itemDefinition = {
        label: 'stockmanagement.spoilageCause',
        properties: [
            { label: 'sCDesignation', name:'SCDesignation', inTable:  true  },
            { label: 'sCName', name:'SCName', inTable:  true  },
        ]
    };

	$scope.items = [];
	$scope.itemEdit = {};

	// fill table with data
	$scope.loaded = false;
	var getSpoilageCauses = function() {
		if(!$scope.loaded && $scope.items.length === 0) {
			$scope.isLoading = true;
			ServiceSpoilageCause.query(function(data) {
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
	getSpoilageCauses();

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