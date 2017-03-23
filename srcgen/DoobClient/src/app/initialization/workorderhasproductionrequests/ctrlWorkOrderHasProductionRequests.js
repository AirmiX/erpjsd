'use strict';

angular.module('Doob.initialization')


.controller('ctrlWorkOrderHasProductionRequests',['$scope', '$rootScope', '$modal', 'dialogs', 'CheckSelected', 'ServiceWorkOrderHasProductionRequests',
    function($scope, $rootScope, $modal, dialogs, CheckSelected, ServiceWorkOrderHasProductionRequests) {

	// main entity (workOrderHasProductionRequests) properties names and labels
	$scope.itemDefinition = {
		label: 'initialization.workOrderHasProductionRequests',
		properties: [
			{ label: 'wOPRQuantity', name:'WOPRQuantity', inTable:  true  },
			{ label: 'wOPRDate', name:'WOPRDate', inTable:  true  },
			{ label: 'wOPRCoveredEarlier', name:'WOPRCoveredEarlier', inTable:  false  },
			{ label: 'wOPRCoveredNow', name:'WOPRCoveredNow', inTable:  false  },
			{ label: 'wOPRPrintStatus', name:'WOPRPrintStatus', inTable:  false  },
		]
	};


	// fill table with data
	$scope.items = [];
	$scope.loaded = false;
	var getWorkOrderHasProductionRequestss = function() {
		if(!$scope.loaded && $scope.items.length === 0) {
			$scope.isLoading = true;
			ServiceWorkOrderHasProductionRequests.query(function(data) {
				$scope.items = data;
				$scope.isLoading = false;
				$scope.loaded = true;
			});
		}
	};
	getWorkOrderHasProductionRequestss();

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

	$scope.$watch('WorkOrderHasProductionRequestsCollection', function() {
		$scope.itemEdit = CheckSelected.checkSelectedInTable($scope.itemEdit, $scope.WorkOrderHasProductionRequestsCollection, $scope.items);
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
			templateUrl: 'initialization/workorderhasproductionrequests/tmplWorkOrderHasProductionRequestsEdit.tpl.html',
			size: 'lg',
			windowClass: 'hmodal-info',
			controller: 'ctrlWorkOrderHasProductionRequestsEdit',
			resolve: {
				itemEdit: function() {
					if(isNew) {
						return new ServiceWorkOrderHasProductionRequests();
					} else {
						return $scope.itemEdit;
					}
				},
			}
		})
		.result.then(function(result) {
			if(!angular.isDefined(result.id)) {
				ServiceWorkOrderHasProductionRequests.saveCustom('stockmanagement/workorderhasproductionrequestss', result, function(savedObject) {
					$scope.items.unshift(savedObject);
					if($scope.itemEdit !== null) {
						var index = $scope.items.map(function(it) { return it.id; }).indexOf($scope.itemEdit.id);
						$scope.items[index].isSelected = false;
					}
					$scope.itemEdit = angular.extend(savedObject);
					$scope.items[0].isSelected = true;
				});
			 } else {
				 ServiceWorkOrderHasProductionRequests.updateCustom('stockmanagement/workorderhasproductionrequestss/'+result.id, result, function(savedObject) {
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


.controller('ctrlWorkOrderHasProductionRequestsEdit',['$scope', 'Localization', '$modal', '$modalInstance', 'dialogs',
	'ServiceWorkOrderHasProductionRequests',    'itemEdit',
function($scope, Localization, $modal, $modalInstance, dialogs,
	ServiceWorkOrderHasProductionRequests,  itemEdit) {

	// dialog mode
	$scope.mode = 'edit';

	// original item state
	var original = angular.copy(itemEdit);
	// item state
	$scope.itemEdit = angular.copy(original);


	// datepicker logic

	// date properties
	$scope.openedWOPRDate = false;

	$scope.open = function($event, opened) {
		$event.preventDefault();
		$event.stopPropagation();
		$scope[opened] = true;
	};



	// Save Button
	$scope.save = function() {
		correctDateTime($scope.itemEdit.WOPRDate);
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
		return                 item.WOPRQuantity  &&                 item.WOPRDate  ;
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


.controller('ctrlWorkOrderHasProductionRequestsChoose', ['$scope','ServiceWorkOrderHasProductionRequests', 'dialogs', '$modal', '$modalInstance', 'itemEdit',
function($scope, ServiceWorkOrderHasProductionRequests, dialogs, $modal,  $modalInstance, itemEdit) {

    // entity with properties
    $scope.itemDefinition = {
        label: 'initialization.workOrderHasProductionRequests',
        properties: [
            { label: 'wOPRQuantity', name:'WOPRQuantity', inTable:  true  },
            { label: 'wOPRDate', name:'WOPRDate', inTable:  true  },
            { label: 'wOPRCoveredEarlier', name:'WOPRCoveredEarlier', inTable:  false  },
            { label: 'wOPRCoveredNow', name:'WOPRCoveredNow', inTable:  false  },
            { label: 'wOPRPrintStatus', name:'WOPRPrintStatus', inTable:  false  },
        ]
    };

	$scope.items = [];
	$scope.itemEdit = {};

	// fill table with data
	$scope.loaded = false;
	var getWorkOrderHasProductionRequestss = function() {
		if(!$scope.loaded && $scope.items.length === 0) {
			$scope.isLoading = true;
			ServiceWorkOrderHasProductionRequests.query(function(data) {
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
	getWorkOrderHasProductionRequestss();

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