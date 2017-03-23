'use strict';

angular.module('Doob.stockmanagement')


.controller('ctrlTangibleItemAmmountTool',['$scope', '$rootScope', '$modal', 'dialogs', 'CheckSelected', 'ServiceTangibleItemAmmountTool',
    function($scope, $rootScope, $modal, dialogs, CheckSelected, ServiceTangibleItemAmmountTool) {

	// main entity (tangibleItemAmmountTool) properties names and labels
	$scope.itemDefinition = {
		label: 'stockmanagement.tangibleItemAmmountTool',
		properties: [
			{ label: 'tICLocatonAddress', name:'TICLocatonAddress', inTable:  true  },
			{ label: 'tICBookkeepingPosition', name:'TICBookkeepingPosition', inTable:  true  },
			{ label: 'tICQuantityInitialState', name:'TICQuantityInitialState', inTable:  false  },
			{ label: 'tICQuantityCumulativeInput', name:'TICQuantityCumulativeInput', inTable:  true  },
			{ label: 'tICQuantityCumulativeOutput', name:'TICQuantityCumulativeOutput', inTable:  false  },
			{ label: 'tICValueInitialState', name:'TICValueInitialState', inTable:  true  },
			{ label: 'tICValueCumulativeInput', name:'TICValueCumulativeInput', inTable:  true  },
			{ label: 'tICValueCumulativeOutput', name:'TICValueCumulativeOutput', inTable:  false  },
			{ label: 'tICUnitPrice', name:'TICUnitPrice', inTable:  true  },
			{ label: 'tICAvailableBalance', name:'TICAvailableBalance', inTable:  true  },
			{ label: 'tICLastInputDate', name:'TICLastInputDate', inTable:  true  },
			{ label: 'tICLastOutputDate', name:'TICLastOutputDate', inTable:  true  },
			{ label: 'tICAdditionalRecordStatus', name:'TICAdditionalRecordStatus', inTable:  false  },
			{ label: 'tICQuantityForElemination', name:'TICQuantityForElemination', inTable:  false  },
			{ label: 'tICQuantityForSharping', name:'TICQuantityForSharping', inTable:  false  },
			{ label: 'tICQuantityForRepair', name:'TICQuantityForRepair', inTable:  false  },
			{ label: 'tICQuantityOnSharping', name:'TICQuantityOnSharping', inTable:  false  },
			{ label: 'tICQuantityOnRepair', name:'TICQuantityOnRepair', inTable:  false  },
			{ label: 'tICQunatityAtWorker', name:'TICQunatityAtWorker', inTable:  false  },
			{ label: 'tICWriteOffDesignation', name:'TICWriteOffDesignation', inTable:  false  },
			{ label: 'tICWriteOffValue', name:'TICWriteOffValue', inTable:  false  },
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
	// identification with properties names and labels
	$scope.identificationDefinition = {
		label: 'commonbusinessentities.identification',
		properties : [
			{ label: 'iIdentificationCode', name:'IIdentificationCode' },
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
	// priceDesignation with properties names and labels
	$scope.priceDesignationDefinition = {
		label: 'stockmanagement.priceDesignation',
		properties : [
			{ label: 'pDPriceDesignation', name:'PDPriceDesignation' },
			{ label: 'pDName', name:'PDName' },
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

	// fill table with data
	$scope.items = [];
	$scope.loaded = false;
	var getTangibleItemAmmountTools = function() {
		if(!$scope.loaded && $scope.items.length === 0) {
			$scope.isLoading = true;
			ServiceTangibleItemAmmountTool.query(function(data) {
				$scope.items = data;
				$scope.isLoading = false;
				$scope.loaded = true;
			});
		}
	};
	getTangibleItemAmmountTools();

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

	$scope.$watch('TangibleItemAmmountToolCollection', function() {
		$scope.itemEdit = CheckSelected.checkSelectedInTable($scope.itemEdit, $scope.TangibleItemAmmountToolCollection, $scope.items);
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
			templateUrl: 'stockmanagement/tangibleitemammounttool/tmplTangibleItemAmmountToolEdit.tpl.html',
			size: 'lg',
			windowClass: 'hmodal-info',
			controller: 'ctrlTangibleItemAmmountToolEdit',
			resolve: {
				itemEdit: function() {
					if(isNew) {
						return new ServiceTangibleItemAmmountTool();
					} else {
						return $scope.itemEdit;
					}
				},
				tangibleItemStatusDefinition: function() {
					return $scope.tangibleItemStatusDefinition;
				},
				identificationDefinition: function() {
					return $scope.identificationDefinition;
				},
				stockroomDefinition: function() {
					return $scope.stockroomDefinition;
				},
				priceDesignationDefinition: function() {
					return $scope.priceDesignationDefinition;
				},
				accountDefinition: function() {
					return $scope.accountDefinition;
				},
			}
		})
		.result.then(function(result) {
			if(!angular.isDefined(result.id)) {
				ServiceTangibleItemAmmountTool.saveCustom('stockmanagement/tangibleitemammounttools', result, function(savedObject) {
					$scope.items.unshift(savedObject);
					if($scope.itemEdit !== null) {
						var index = $scope.items.map(function(it) { return it.id; }).indexOf($scope.itemEdit.id);
						$scope.items[index].isSelected = false;
					}
					$scope.itemEdit = angular.extend(savedObject);
					$scope.items[0].isSelected = true;
				});
			 } else {
				 ServiceTangibleItemAmmountTool.updateCustom('stockmanagement/tangibleitemammounttools/'+result.id, result, function(savedObject) {
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


.controller('ctrlTangibleItemAmmountToolEdit',['$scope', 'Localization', '$modal', '$modalInstance', 'dialogs',
	'ServiceTangibleItemAmmountTool', 'ServiceTangibleItemStatus', 'ServiceIdentification', 'ServiceStockroom', 'ServicePriceDesignation', 'ServiceAccount',   'tangibleItemStatusDefinition',  'identificationDefinition',  'stockroomDefinition',  'priceDesignationDefinition',  'accountDefinition',   'itemEdit',
function($scope, Localization, $modal, $modalInstance, dialogs,
	ServiceTangibleItemAmmountTool, ServiceTangibleItemStatus, ServiceIdentification, ServiceStockroom, ServicePriceDesignation, ServiceAccount,  tangibleItemStatusDefinition,  identificationDefinition,  stockroomDefinition,  priceDesignationDefinition,  accountDefinition,  itemEdit) {

	// dialog mode
	$scope.mode = 'edit';

	// original item state
	var original = angular.copy(itemEdit);
	// item state
	$scope.itemEdit = angular.copy(original);

	// tangibleItemStatus with properties
	$scope.tangibleItemStatusDefinition = tangibleItemStatusDefinition;
	// identification with properties
	$scope.identificationDefinition = identificationDefinition;
	// stockroom with properties
	$scope.stockroomDefinition = stockroomDefinition;
	// priceDesignation with properties
	$scope.priceDesignationDefinition = priceDesignationDefinition;
	// account with properties
	$scope.accountDefinition = accountDefinition;

	// datepicker logic

	// date properties
	$scope.openedTICLastInputDate = false;
	$scope.openedTICLastOutputDate = false;

	$scope.open = function($event, opened) {
		$event.preventDefault();
		$event.stopPropagation();
		$scope[opened] = true;
	};



	// Choose tangibleItemStatus
	$scope.openChooseTangibleItemStatusDialog = function() {
        $modal.open({
            backdrop: 'static',
            keyboard : false,
            templateUrl: 'stockmanagement/tangibleitemammounttool/tmplTangibleItemStatusChoose.tpl.html',
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


	// Choose identification
	$scope.openChooseIdentificationDialog = function() {
        $modal.open({
            backdrop: 'static',
            keyboard : false,
            templateUrl: 'commonbusinessentities/tangibleitemammounttool/tmplIdentificationChoose.tpl.html',
            size: 'lg',
            controller: 'ctrlIdentificationChoose',
            windowClass: 'hmodal-info',
            resolve: {
				itemEdit: function() {
					if(angular.isDefined($scope.itemEdit.identification)){
						return $scope.itemEdit.identification;
					}
				}
			}
		}).result.then(function(result) {
			$scope.itemEdit.identification = angular.copy(result);
		});
    };


	// Choose stockroom
	$scope.openChooseStockroomDialog = function() {
        $modal.open({
            backdrop: 'static',
            keyboard : false,
            templateUrl: 'stock/tangibleitemammounttool/tmplStockroomChoose.tpl.html',
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


	// Choose priceDesignation
	$scope.openChoosePriceDesignationDialog = function() {
        $modal.open({
            backdrop: 'static',
            keyboard : false,
            templateUrl: 'stockmanagement/tangibleitemammounttool/tmplPriceDesignationChoose.tpl.html',
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


	// Choose account
	$scope.openChooseAccountDialog = function() {
        $modal.open({
            backdrop: 'static',
            keyboard : false,
            templateUrl: 'corporation/tangibleitemammounttool/tmplAccountChoose.tpl.html',
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


	// Save Button
	$scope.save = function() {
		correctDateTime($scope.itemEdit.TICLastInputDate);
		correctDateTime($scope.itemEdit.TICLastOutputDate);
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
		return                 item.TICLocatonAddress  &&                 item.TICBookkeepingPosition  &&                 item.TICQuantityCumulativeInput  &&                 item.TICValueInitialState  &&                 item.TICValueCumulativeInput  &&                 item.TICUnitPrice  &&                 item.TICAvailableBalance  &&                 item.TICLastInputDate  &&                 item.TICLastOutputDate  ;
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


.controller('ctrlTangibleItemAmmountToolChoose', ['$scope','ServiceTangibleItemAmmountTool', 'dialogs', '$modal', '$modalInstance', 'itemEdit',
function($scope, ServiceTangibleItemAmmountTool, dialogs, $modal,  $modalInstance, itemEdit) {

    // entity with properties
    $scope.itemDefinition = {
        label: 'stockmanagement.tangibleItemAmmountTool',
        properties: [
            { label: 'tICLocatonAddress', name:'TICLocatonAddress', inTable:  true  },
            { label: 'tICBookkeepingPosition', name:'TICBookkeepingPosition', inTable:  true  },
            { label: 'tICQuantityInitialState', name:'TICQuantityInitialState', inTable:  false  },
            { label: 'tICQuantityCumulativeInput', name:'TICQuantityCumulativeInput', inTable:  true  },
            { label: 'tICQuantityCumulativeOutput', name:'TICQuantityCumulativeOutput', inTable:  false  },
            { label: 'tICValueInitialState', name:'TICValueInitialState', inTable:  true  },
            { label: 'tICValueCumulativeInput', name:'TICValueCumulativeInput', inTable:  true  },
            { label: 'tICValueCumulativeOutput', name:'TICValueCumulativeOutput', inTable:  false  },
            { label: 'tICUnitPrice', name:'TICUnitPrice', inTable:  true  },
            { label: 'tICAvailableBalance', name:'TICAvailableBalance', inTable:  true  },
            { label: 'tICLastInputDate', name:'TICLastInputDate', inTable:  true  },
            { label: 'tICLastOutputDate', name:'TICLastOutputDate', inTable:  true  },
            { label: 'tICAdditionalRecordStatus', name:'TICAdditionalRecordStatus', inTable:  false  },
            { label: 'tICQuantityForElemination', name:'TICQuantityForElemination', inTable:  false  },
            { label: 'tICQuantityForSharping', name:'TICQuantityForSharping', inTable:  false  },
            { label: 'tICQuantityForRepair', name:'TICQuantityForRepair', inTable:  false  },
            { label: 'tICQuantityOnSharping', name:'TICQuantityOnSharping', inTable:  false  },
            { label: 'tICQuantityOnRepair', name:'TICQuantityOnRepair', inTable:  false  },
            { label: 'tICQunatityAtWorker', name:'TICQunatityAtWorker', inTable:  false  },
            { label: 'tICWriteOffDesignation', name:'TICWriteOffDesignation', inTable:  false  },
            { label: 'tICWriteOffValue', name:'TICWriteOffValue', inTable:  false  },
        ]
    };

	$scope.items = [];
	$scope.itemEdit = {};

	// fill table with data
	$scope.loaded = false;
	var getTangibleItemAmmountTools = function() {
		if(!$scope.loaded && $scope.items.length === 0) {
			$scope.isLoading = true;
			ServiceTangibleItemAmmountTool.query(function(data) {
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
	getTangibleItemAmmountTools();

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