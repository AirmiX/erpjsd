'use strict';

angular.module('Doob.stockmanagement')


.controller('ctrlProductionRequest',['$scope', '$rootScope', '$modal', 'dialogs', 'CheckSelected', 'ServiceProductionRequest',
    function($scope, $rootScope, $modal, dialogs, CheckSelected, ServiceProductionRequest) {

	// main entity (productionRequest) properties names and labels
	$scope.itemDefinition = {
		label: 'stockmanagement.productionRequest',
		properties: [
			{ label: 'pROrdinalNumber', name:'PROrdinalNumber', inTable:  true  },
			{ label: 'pRQuantity', name:'PRQuantity', inTable:  true  },
			{ label: 'pRProductionDeadline', name:'PRProductionDeadline', inTable:  true  },
			{ label: 'pRSellingPrice', name:'PRSellingPrice', inTable:  false  },
			{ label: 'pRDeleteStatus', name:'PRDeleteStatus', inTable:  false  },
		]
	};

	// measurementUnit with properties names and labels
	$scope.measurementUnitDefinition = {
		label: 'commonbusinessentities.measurementUnit',
		properties : [
			{ label: 'mUIdentificationCode', name:'MUIdentificationCode' },
			{ label: 'mUName', name:'MUName' },
		]
	};

	// fill table with data
	$scope.items = [];
	$scope.loaded = false;
	var getProductionRequests = function() {
		if(!$scope.loaded && $scope.items.length === 0) {
			$scope.isLoading = true;
			ServiceProductionRequest.query(function(data) {
				$scope.items = data;
				$scope.isLoading = false;
				$scope.loaded = true;
			});
		}
	};
	getProductionRequests();

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

	$scope.$watch('ProductionRequestCollection', function() {
		$scope.itemEdit = CheckSelected.checkSelectedInTable($scope.itemEdit, $scope.ProductionRequestCollection, $scope.items);
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
			templateUrl: 'stockmanagement/productionrequest/tmplProductionRequestEdit.tpl.html',
			size: 'lg',
			windowClass: 'hmodal-info',
			controller: 'ctrlProductionRequestEdit',
			resolve: {
				itemEdit: function() {
					if(isNew) {
						return new ServiceProductionRequest();
					} else {
						return $scope.itemEdit;
					}
				},
				measurementUnitDefinition: function() {
					return $scope.measurementUnitDefinition;
				},
			}
		})
		.result.then(function(result) {
			if(!angular.isDefined(result.id)) {
				ServiceProductionRequest.saveCustom('stockmanagement/productionrequests', result, function(savedObject) {
					$scope.items.unshift(savedObject);
					if($scope.itemEdit !== null) {
						var index = $scope.items.map(function(it) { return it.id; }).indexOf($scope.itemEdit.id);
						$scope.items[index].isSelected = false;
					}
					$scope.itemEdit = angular.extend(savedObject);
					$scope.items[0].isSelected = true;
				});
			 } else {
				 ServiceProductionRequest.updateCustom('stockmanagement/productionrequests/'+result.id, result, function(savedObject) {
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


.controller('ctrlProductionRequestEdit',['$scope', 'Localization', '$modal', '$modalInstance', 'dialogs',
	'ServiceProductionRequest', 'ServiceMeasurementUnit',   'measurementUnitDefinition',   'itemEdit',
function($scope, Localization, $modal, $modalInstance, dialogs,
	ServiceProductionRequest, ServiceMeasurementUnit,  measurementUnitDefinition,  itemEdit) {

	// dialog mode
	$scope.mode = 'edit';

	// original item state
	var original = angular.copy(itemEdit);
	// item state
	$scope.itemEdit = angular.copy(original);

	// measurementUnit with properties
	$scope.measurementUnitDefinition = measurementUnitDefinition;

	// datepicker logic

	// date properties
	$scope.openedPRProductionDeadline = false;

	$scope.open = function($event, opened) {
		$event.preventDefault();
		$event.stopPropagation();
		$scope[opened] = true;
	};



	// Choose measurementUnit
	$scope.openChooseMeasurementUnitDialog = function() {
        $modal.open({
            backdrop: 'static',
            keyboard : false,
            templateUrl: 'commonbusinessentities/productionrequest/tmplMeasurementUnitChoose.tpl.html',
            size: 'lg',
            controller: 'ctrlMeasurementUnitChoose',
            windowClass: 'hmodal-info',
            resolve: {
				itemEdit: function() {
					if(angular.isDefined($scope.itemEdit.measurementUnit)){
						return $scope.itemEdit.measurementUnit;
					}
				}
			}
		}).result.then(function(result) {
			$scope.itemEdit.measurementUnit = angular.copy(result);
		});
    };


	// Save Button
	$scope.save = function() {
		correctDateTime($scope.itemEdit.PRProductionDeadline);
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
		return                 item.PROrdinalNumber  &&                 item.PRQuantity  &&                 item.PRProductionDeadline  ;
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


.controller('ctrlProductionRequestChoose', ['$scope','ServiceProductionRequest', 'dialogs', '$modal', '$modalInstance', 'itemEdit',
function($scope, ServiceProductionRequest, dialogs, $modal,  $modalInstance, itemEdit) {

    // entity with properties
    $scope.itemDefinition = {
        label: 'stockmanagement.productionRequest',
        properties: [
            { label: 'pROrdinalNumber', name:'PROrdinalNumber', inTable:  true  },
            { label: 'pRQuantity', name:'PRQuantity', inTable:  true  },
            { label: 'pRProductionDeadline', name:'PRProductionDeadline', inTable:  true  },
            { label: 'pRSellingPrice', name:'PRSellingPrice', inTable:  false  },
            { label: 'pRDeleteStatus', name:'PRDeleteStatus', inTable:  false  },
        ]
    };

	$scope.items = [];
	$scope.itemEdit = {};

	// fill table with data
	$scope.loaded = false;
	var getProductionRequests = function() {
		if(!$scope.loaded && $scope.items.length === 0) {
			$scope.isLoading = true;
			ServiceProductionRequest.query(function(data) {
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
	getProductionRequests();

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