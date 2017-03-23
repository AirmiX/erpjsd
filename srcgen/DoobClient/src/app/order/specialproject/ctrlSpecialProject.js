'use strict';

angular.module('Doob.order')


.controller('ctrlSpecialProject',['$scope', '$rootScope', '$modal', 'dialogs', 'CheckSelected', 'ServiceSpecialProject',
    function($scope, $rootScope, $modal, dialogs, CheckSelected, ServiceSpecialProject) {

	// main entity (specialProject) properties names and labels
	$scope.itemDefinition = {
		label: 'order.specialProject',
		properties: [
			{ label: 'sPCode', name:'SPCode', inTable:  true  },
			{ label: 'sPName', name:'SPName', inTable:  true  },
			{ label: 'sPEnabled', name:'SPEnabled', inTable:  false  },
		]
	};

	// orderHeadings with properties names and labels
	$scope.orderHeadingsDefinition = {
		label: 'order.orderHeading',
		properties : [
			{ label: 'oHDocumentNumber', name:'OHDocumentNumber' },
			{ label: 'oHCreationDate', name:'OHCreationDate' },
			{ label: 'oHOrderNumberOfBuyer', name:'OHOrderNumberOfBuyer' },
			{ label: 'oHOrderDate', name:'OHOrderDate' },
			{ label: 'oHPaymentPeriodBuyer', name:'OHPaymentPeriodBuyer' },
		]
	};

	// fill table with data
	$scope.items = [];
	$scope.loaded = false;
	var getSpecialProjects = function() {
		if(!$scope.loaded && $scope.items.length === 0) {
			$scope.isLoading = true;
			ServiceSpecialProject.query(function(data) {
				$scope.items = data;
				$scope.isLoading = false;
				$scope.loaded = true;
			});
		}
	};
	getSpecialProjects();

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

	$scope.$watch('SpecialProjectCollection', function() {
		$scope.itemEdit = CheckSelected.checkSelectedInTable($scope.itemEdit, $scope.SpecialProjectCollection, $scope.items);
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
			templateUrl: 'order/specialproject/tmplSpecialProjectEdit.tpl.html',
			size: 'lg',
			windowClass: 'hmodal-info',
			controller: 'ctrlSpecialProjectEdit',
			resolve: {
				itemEdit: function() {
					if(isNew) {
						return new ServiceSpecialProject();
					} else {
						return $scope.itemEdit;
					}
				},
				orderHeadingsDefinition: function() {
					return $scope.orderHeadingsDefinition;
				},
			}
		})
		.result.then(function(result) {
			if(!angular.isDefined(result.id)) {
				ServiceSpecialProject.saveCustom('stockmanagement/specialprojects', result, function(savedObject) {
					$scope.items.unshift(savedObject);
					if($scope.itemEdit !== null) {
						var index = $scope.items.map(function(it) { return it.id; }).indexOf($scope.itemEdit.id);
						$scope.items[index].isSelected = false;
					}
					$scope.itemEdit = angular.extend(savedObject);
					$scope.items[0].isSelected = true;
				});
			 } else {
				 ServiceSpecialProject.updateCustom('stockmanagement/specialprojects/'+result.id, result, function(savedObject) {
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


.controller('ctrlSpecialProjectEdit',['$scope', 'Localization', '$modal', '$modalInstance', 'dialogs',
	'ServiceSpecialProject', 'ServiceOrderHeading',   'orderHeadingsDefinition',   'itemEdit',
function($scope, Localization, $modal, $modalInstance, dialogs,
	ServiceSpecialProject, ServiceOrderHeading,  orderHeadingsDefinition,  itemEdit) {

	// dialog mode
	$scope.mode = 'edit';

	// original item state
	var original = angular.copy(itemEdit);
	// item state
	$scope.itemEdit = angular.copy(original);

	// orderHeadings with properties
	$scope.orderHeadingsDefinition = orderHeadingsDefinition;

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
        var item;
        var i;
        for(i in $scope.itemEdit.orderHeadings) {
    		item = $scope.itemEdit.orderHeadings[i];
    		delete item.isSelected;
    	}
		$modalInstance.close($scope.itemEdit);
	};


	$scope.canSave = function() {
		var item = $scope.itemEdit;
		return                 item.SPCode  &&                 item.SPName  ;
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


.controller('ctrlSpecialProjectChoose', ['$scope','ServiceSpecialProject', 'dialogs', '$modal', '$modalInstance', 'itemEdit',
function($scope, ServiceSpecialProject, dialogs, $modal,  $modalInstance, itemEdit) {

    // entity with properties
    $scope.itemDefinition = {
        label: 'order.specialProject',
        properties: [
            { label: 'sPCode', name:'SPCode', inTable:  true  },
            { label: 'sPName', name:'SPName', inTable:  true  },
            { label: 'sPEnabled', name:'SPEnabled', inTable:  false  },
        ]
    };

	$scope.items = [];
	$scope.itemEdit = {};

	// fill table with data
	$scope.loaded = false;
	var getSpecialProjects = function() {
		if(!$scope.loaded && $scope.items.length === 0) {
			$scope.isLoading = true;
			ServiceSpecialProject.query(function(data) {
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
	getSpecialProjects();

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