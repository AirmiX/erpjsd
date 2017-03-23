'use strict';

angular.module('Doob.stockmanagement')


.controller('ctrlStockAccountAssignment',['$scope', '$rootScope', '$modal', 'dialogs', 'CheckSelected', 'ServiceStockAccountAssignment',
    function($scope, $rootScope, $modal, dialogs, CheckSelected, ServiceStockAccountAssignment) {

	// main entity (stockAccountAssignment) properties names and labels
	$scope.itemDefinition = {
		label: 'stockmanagement.stockAccountAssignment',
		properties: [
			{ label: 'sAAValueStatus', name:'SAAValueStatus', inTable:  true  },
		]
	};

	// priceDesignation with properties names and labels
	$scope.priceDesignationDefinition = {
		label: 'stockmanagement.priceDesignation',
		properties : [
			{ label: 'pDPriceDesignation', name:'PDPriceDesignation' },
			{ label: 'pDName', name:'PDName' },
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
	// classification with properties names and labels
	$scope.classificationDefinition = {
		label: 'commonbusinessentities.classification',
		properties : [
			{ label: 'cIdentificationCode', name:'CIdentificationCode' },
		]
	};
	// account with properties names and labels
	$scope.accountDefinition = {
		label: 'corporation.account',
		properties : [
			{ label: 'aAccountNumber', name:'AAccountNumber' },
			{ label: 'aName', name:'AName' },
			{ label: 'aIsTransfer', name:'AIsTransfer' },
			{ label: 'aEntrySide', name:'AEntrySide' },
			{ label: 'aDisplaySide', name:'ADisplaySide' },
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
	var getStockAccountAssignments = function() {
		if(!$scope.loaded && $scope.items.length === 0) {
			$scope.isLoading = true;
			ServiceStockAccountAssignment.query(function(data) {
				$scope.items = data;
				$scope.isLoading = false;
				$scope.loaded = true;
			});
		}
	};
	getStockAccountAssignments();

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

	$scope.$watch('StockAccountAssignmentCollection', function() {
		$scope.itemEdit = CheckSelected.checkSelectedInTable($scope.itemEdit, $scope.StockAccountAssignmentCollection, $scope.items);
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
			templateUrl: 'stockmanagement/stockaccountassignment/tmplStockAccountAssignmentEdit.tpl.html',
			size: 'lg',
			windowClass: 'hmodal-info',
			controller: 'ctrlStockAccountAssignmentEdit',
			resolve: {
				itemEdit: function() {
					if(isNew) {
						return new ServiceStockAccountAssignment();
					} else {
						return $scope.itemEdit;
					}
				},
				priceDesignationDefinition: function() {
					return $scope.priceDesignationDefinition;
				},
				stockroomDefinition: function() {
					return $scope.stockroomDefinition;
				},
				classificationDefinition: function() {
					return $scope.classificationDefinition;
				},
				accountDefinition: function() {
					return $scope.accountDefinition;
				},
				tangibleItemStatusDefinition: function() {
					return $scope.tangibleItemStatusDefinition;
				},
			}
		})
		.result.then(function(result) {
			if(!angular.isDefined(result.id)) {
				ServiceStockAccountAssignment.saveCustom('stockmanagement/stockaccountassignments', result, function(savedObject) {
					$scope.items.unshift(savedObject);
					if($scope.itemEdit !== null) {
						var index = $scope.items.map(function(it) { return it.id; }).indexOf($scope.itemEdit.id);
						$scope.items[index].isSelected = false;
					}
					$scope.itemEdit = angular.extend(savedObject);
					$scope.items[0].isSelected = true;
				});
			 } else {
				 ServiceStockAccountAssignment.updateCustom('stockmanagement/stockaccountassignments/'+result.id, result, function(savedObject) {
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


.controller('ctrlStockAccountAssignmentEdit',['$scope', 'Localization', '$modal', '$modalInstance', 'dialogs',
	'ServiceStockAccountAssignment', 'ServicePriceDesignation', 'ServiceStockroom', 'ServiceClassification', 'ServiceAccount', 'ServiceTangibleItemStatus',   'priceDesignationDefinition',  'stockroomDefinition',  'classificationDefinition',  'accountDefinition',  'tangibleItemStatusDefinition',   'itemEdit',
function($scope, Localization, $modal, $modalInstance, dialogs,
	ServiceStockAccountAssignment, ServicePriceDesignation, ServiceStockroom, ServiceClassification, ServiceAccount, ServiceTangibleItemStatus,  priceDesignationDefinition,  stockroomDefinition,  classificationDefinition,  accountDefinition,  tangibleItemStatusDefinition,  itemEdit) {

	// dialog mode
	$scope.mode = 'edit';

	// original item state
	var original = angular.copy(itemEdit);
	// item state
	$scope.itemEdit = angular.copy(original);

	// priceDesignation with properties
	$scope.priceDesignationDefinition = priceDesignationDefinition;
	// stockroom with properties
	$scope.stockroomDefinition = stockroomDefinition;
	// classification with properties
	$scope.classificationDefinition = classificationDefinition;
	// account with properties
	$scope.accountDefinition = accountDefinition;
	// tangibleItemStatus with properties
	$scope.tangibleItemStatusDefinition = tangibleItemStatusDefinition;

	// datepicker logic

	// date properties

	$scope.open = function($event, opened) {
		$event.preventDefault();
		$event.stopPropagation();
		$scope[opened] = true;
	};



	// Choose priceDesignation
	$scope.openChoosePriceDesignationDialog = function() {
        $modal.open({
            backdrop: 'static',
            keyboard : false,
            templateUrl: 'stockmanagement/stockaccountassignment/tmplPriceDesignationChoose.tpl.html',
            size: 'lg',
            controller: 'ctrlPriceDesignationChoose',
            windowClass: 'hmodal-info',
            resolve: {
				itemEdit: function() {
					if(angular.isDefined($scope.itemEdit.priceDesignation)){
						return $scope.itemEdit.priceDesignation;
					}
				}
			}
		}).result.then(function(result) {
			$scope.itemEdit.priceDesignation = angular.copy(result);
		});
    };


	// Choose stockroom
	$scope.openChooseStockroomDialog = function() {
        $modal.open({
            backdrop: 'static',
            keyboard : false,
            templateUrl: 'stock/stockaccountassignment/tmplStockroomChoose.tpl.html',
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


	// Choose classification
	$scope.openChooseClassificationDialog = function() {
        $modal.open({
            backdrop: 'static',
            keyboard : false,
            templateUrl: 'commonbusinessentities/stockaccountassignment/tmplClassificationChoose.tpl.html',
            size: 'lg',
            controller: 'ctrlClassificationChoose',
            windowClass: 'hmodal-info',
            resolve: {
				itemEdit: function() {
					if(angular.isDefined($scope.itemEdit.classification)){
						return $scope.itemEdit.classification;
					}
				}
			}
		}).result.then(function(result) {
			$scope.itemEdit.classification = angular.copy(result);
		});
    };


	// Choose account
	$scope.openChooseAccountDialog = function() {
        $modal.open({
            backdrop: 'static',
            keyboard : false,
            templateUrl: 'corporation/stockaccountassignment/tmplAccountChoose.tpl.html',
            size: 'lg',
            controller: 'ctrlAccountChoose',
            windowClass: 'hmodal-info',
            resolve: {
				itemEdit: function() {
					if(angular.isDefined($scope.itemEdit.account)){
						return $scope.itemEdit.account;
					}
				}
			}
		}).result.then(function(result) {
			$scope.itemEdit.account = angular.copy(result);
		});
    };


	// Choose tangibleItemStatus
	$scope.openChooseTangibleItemStatusDialog = function() {
        $modal.open({
            backdrop: 'static',
            keyboard : false,
            templateUrl: 'stockmanagement/stockaccountassignment/tmplTangibleItemStatusChoose.tpl.html',
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
		var item = $scope.itemEdit;
		return                 item.SAAValueStatus  ;
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


.controller('ctrlStockAccountAssignmentChoose', ['$scope','ServiceStockAccountAssignment', 'dialogs', '$modal', '$modalInstance', 'itemEdit',
function($scope, ServiceStockAccountAssignment, dialogs, $modal,  $modalInstance, itemEdit) {

    // entity with properties
    $scope.itemDefinition = {
        label: 'stockmanagement.stockAccountAssignment',
        properties: [
            { label: 'sAAValueStatus', name:'SAAValueStatus', inTable:  true  },
        ]
    };

	$scope.items = [];
	$scope.itemEdit = {};

	// fill table with data
	$scope.loaded = false;
	var getStockAccountAssignments = function() {
		if(!$scope.loaded && $scope.items.length === 0) {
			$scope.isLoading = true;
			ServiceStockAccountAssignment.query(function(data) {
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
	getStockAccountAssignments();

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