'use strict';

angular.module('Doob.stockmanagement')


.controller('ctrlStockroomOrgUni',['$scope', '$rootScope', '$modal', 'dialogs', 'CheckSelected', 'ServiceStockroomOrgUni',
    function($scope, $rootScope, $modal, dialogs, CheckSelected, ServiceStockroomOrgUni) {

	// main entity (stockroomOrgUni) properties names and labels
	$scope.itemDefinition = {
		label: 'stockmanagement.stockroomOrgUni',
		properties: [
		]
	};

	// stockroom with properties names and labels
	$scope.stockroomDefinition = {
		label: 'stock.stockroom',
		properties : [
			{ label: 'sCode', name:'SCode' },
			{ label: 'sName', name:'SName' },
			{ label: 'sFullName', name:'SFullName' },
			{ label: 'sType', name:'SType' },
			{ label: 'sConditions', name:'SConditions' },
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
	// tangibleItemStatus with properties names and labels
	$scope.tangibleItemStatusDefinition = {
		label: 'stockmanagement.tangibleItemStatus',
		properties : [
			{ label: 'tISDesignation', name:'TISDesignation' },
			{ label: 'tISName', name:'TISName' },
		]
	};

	// fill table with data
	$scope.items = [];
	$scope.loaded = false;
	var getStockroomOrgUnis = function() {
		if(!$scope.loaded && $scope.items.length === 0) {
			$scope.isLoading = true;
			ServiceStockroomOrgUni.query(function(data) {
				$scope.items = data;
				$scope.isLoading = false;
				$scope.loaded = true;
			});
		}
	};
	getStockroomOrgUnis();

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

	$scope.$watch('StockroomOrgUniCollection', function() {
		$scope.itemEdit = CheckSelected.checkSelectedInTable($scope.itemEdit, $scope.StockroomOrgUniCollection, $scope.items);
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
			templateUrl: 'stockmanagement/stockroomorguni/tmplStockroomOrgUniEdit.tpl.html',
			size: 'lg',
			windowClass: 'hmodal-info',
			controller: 'ctrlStockroomOrgUniEdit',
			resolve: {
				itemEdit: function() {
					if(isNew) {
						return new ServiceStockroomOrgUni();
					} else {
						return $scope.itemEdit;
					}
				},
				stockroomDefinition: function() {
					return $scope.stockroomDefinition;
				},
				organizationUnitDefinition: function() {
					return $scope.organizationUnitDefinition;
				},
				tangibleItemStatusDefinition: function() {
					return $scope.tangibleItemStatusDefinition;
				},
			}
		})
		.result.then(function(result) {
			if(!angular.isDefined(result.id)) {
				ServiceStockroomOrgUni.saveCustom('stockmanagement/stockroomorgunis', result, function(savedObject) {
					$scope.items.unshift(savedObject);
					if($scope.itemEdit !== null) {
						var index = $scope.items.map(function(it) { return it.id; }).indexOf($scope.itemEdit.id);
						$scope.items[index].isSelected = false;
					}
					$scope.itemEdit = angular.extend(savedObject);
					$scope.items[0].isSelected = true;
				});
			 } else {
				 ServiceStockroomOrgUni.updateCustom('stockmanagement/stockroomorgunis/'+result.id, result, function(savedObject) {
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


.controller('ctrlStockroomOrgUniEdit',['$scope', 'Localization', '$modal', '$modalInstance', 'dialogs',
	'ServiceStockroomOrgUni', 'ServiceStockroom', 'ServiceOrganizationUnit', 'ServiceTangibleItemStatus',   'stockroomDefinition',  'organizationUnitDefinition',  'tangibleItemStatusDefinition',   'itemEdit',
function($scope, Localization, $modal, $modalInstance, dialogs,
	ServiceStockroomOrgUni, ServiceStockroom, ServiceOrganizationUnit, ServiceTangibleItemStatus,  stockroomDefinition,  organizationUnitDefinition,  tangibleItemStatusDefinition,  itemEdit) {

	// dialog mode
	$scope.mode = 'edit';

	// original item state
	var original = angular.copy(itemEdit);
	// item state
	$scope.itemEdit = angular.copy(original);

	// stockroom with properties
	$scope.stockroomDefinition = stockroomDefinition;
	// organizationUnit with properties
	$scope.organizationUnitDefinition = organizationUnitDefinition;
	// tangibleItemStatus with properties
	$scope.tangibleItemStatusDefinition = tangibleItemStatusDefinition;

	// datepicker logic

	// date properties

	$scope.open = function($event, opened) {
		$event.preventDefault();
		$event.stopPropagation();
		$scope[opened] = true;
	};



	// Choose stockroom
	$scope.openChooseStockroomDialog = function() {
        $modal.open({
            backdrop: 'static',
            keyboard : false,
            templateUrl: 'stock/stockroomorguni/tmplStockroomChoose.tpl.html',
            size: 'lg',
            controller: 'ctrlStockroomChoose',
            windowClass: 'hmodal-info',
            resolve: {
				itemEdit: function() {
					if(angular.isDefined($scope.itemEdit.stockroom)){
						return $scope.itemEdit.stockroom;
					}
				}
			}
		}).result.then(function(result) {
			$scope.itemEdit.stockroom = angular.copy(result);
		});
    };


	// Choose organizationUnit
	$scope.openChooseOrganizationUnitDialog = function() {
        $modal.open({
            backdrop: 'static',
            keyboard : false,
            templateUrl: 'corporation/stockroomorguni/tmplOrganizationUnitChoose.tpl.html',
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


	// Choose tangibleItemStatus
	$scope.openChooseTangibleItemStatusDialog = function() {
        $modal.open({
            backdrop: 'static',
            keyboard : false,
            templateUrl: 'stockmanagement/stockroomorguni/tmplTangibleItemStatusChoose.tpl.html',
            size: 'lg',
            controller: 'ctrlTangibleItemStatusChoose',
            windowClass: 'hmodal-info',
            resolve: {
				itemEdit: function() {
					if(angular.isDefined($scope.itemEdit.tangibleItemStatus)){
						return $scope.itemEdit.tangibleItemStatus;
					}
				}
			}
		}).result.then(function(result) {
			$scope.itemEdit.tangibleItemStatus = angular.copy(result);
		});
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


.controller('ctrlStockroomOrgUniChoose', ['$scope','ServiceStockroomOrgUni', 'dialogs', '$modal', '$modalInstance', 'itemEdit',
function($scope, ServiceStockroomOrgUni, dialogs, $modal,  $modalInstance, itemEdit) {

    // entity with properties
    $scope.itemDefinition = {
        label: 'stockmanagement.stockroomOrgUni',
        properties: [
        ]
    };

	$scope.items = [];
	$scope.itemEdit = {};

	// fill table with data
	$scope.loaded = false;
	var getStockroomOrgUnis = function() {
		if(!$scope.loaded && $scope.items.length === 0) {
			$scope.isLoading = true;
			ServiceStockroomOrgUni.query(function(data) {
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
	getStockroomOrgUnis();

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