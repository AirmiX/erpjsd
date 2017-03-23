'use strict';

angular.module('Doob.stockmanagement')


.controller('ctrlTangibleItemAnalytics',['$scope', '$rootScope', '$modal', 'dialogs', 'CheckSelected', 'ServiceTangibleItemAnalytics',
    function($scope, $rootScope, $modal, dialogs, CheckSelected, ServiceTangibleItemAnalytics) {

	// main entity (tangibleItemAnalytics) properties names and labels
	$scope.itemDefinition = {
		label: 'stockmanagement.tangibleItemAnalytics',
		properties: [
			{ label: 'tIAPostingPosition', name:'TIAPostingPosition', inTable:  false  },
			{ label: 'tIADocumentNumber', name:'TIADocumentNumber', inTable:  false  },
			{ label: 'tIAPostingDate', name:'TIAPostingDate', inTable:  false  },
			{ label: 'tIADocumentDate', name:'TIADocumentDate', inTable:  false  },
			{ label: 'tIAMeasurementUnit', name:'TIAMeasurementUnit', inTable:  true  },
			{ label: 'tIAStocksAccount', name:'TIAStocksAccount', inTable:  true  },
			{ label: 'tIAPriceDesignation', name:'TIAPriceDesignation', inTable:  true  },
			{ label: 'tIAInputQuantity', name:'TIAInputQuantity', inTable:  false  },
			{ label: 'tIAOutputQuantity', name:'TIAOutputQuantity', inTable:  false  },
			{ label: 'tIAQuantityBalanceAfterPosting', name:'TIAQuantityBalanceAfterPosting', inTable:  false  },
			{ label: 'tIAInputValue', name:'TIAInputValue', inTable:  false  },
			{ label: 'tIAOutputValue', name:'TIAOutputValue', inTable:  false  },
			{ label: 'tIABookValue', name:'TIABookValue', inTable:  false  },
			{ label: 'tIAUnitPrice', name:'TIAUnitPrice', inTable:  false  },
			{ label: 'tIAUser', name:'TIAUser', inTable:  true  },
			{ label: 'tIAOrdinalNumber', name:'TIAOrdinalNumber', inTable:  false  },
			{ label: 'tIAQuantityAtEmployee', name:'TIAQuantityAtEmployee', inTable:  false  },
			{ label: 'tIAQuantityAtRepair', name:'TIAQuantityAtRepair', inTable:  false  },
			{ label: 'tIAQuantityForRepair', name:'TIAQuantityForRepair', inTable:  false  },
			{ label: 'tIAQuantityForRepair_1', name:'TIAQuantityForRepair_1', inTable:  false  },
			{ label: 'tIASession', name:'TIASession', inTable:  false  },
		]
	};

	// documentType with properties names and labels
	$scope.documentTypeDefinition = {
		label: 'corporation.documentType',
		properties : [
			{ label: 'dTIdentificationNumber', name:'DTIdentificationNumber' },
			{ label: 'dTName', name:'DTName' },
			{ label: 'dTShortName', name:'DTShortName' },
		]
	};
	// tangibleItemCondition with properties names and labels
	$scope.tangibleItemConditionDefinition = {
		label: 'stockmanagement.tangibleItemCondition',
		properties : [
			{ label: 'tICLocatonAddress', name:'TICLocatonAddress' },
			{ label: 'tICBookkeepingPosition', name:'TICBookkeepingPosition' },
			{ label: 'tICQuantityCumulativeInput', name:'TICQuantityCumulativeInput' },
			{ label: 'tICValueInitialState', name:'TICValueInitialState' },
			{ label: 'tICValueCumulativeInput', name:'TICValueCumulativeInput' },
			{ label: 'tICUnitPrice', name:'TICUnitPrice' },
			{ label: 'tICAvailableBalance', name:'TICAvailableBalance' },
			{ label: 'tICOpeningDate', name:'TICOpeningDate' },
			{ label: 'tICLastInputDate', name:'TICLastInputDate' },
			{ label: 'tICLastOutputDate', name:'TICLastOutputDate' },
		]
	};

	// fill table with data
	$scope.items = [];
	$scope.loaded = false;
	var getTangibleItemAnalyticss = function() {
		if(!$scope.loaded && $scope.items.length === 0) {
			$scope.isLoading = true;
			ServiceTangibleItemAnalytics.query(function(data) {
				$scope.items = data;
				$scope.isLoading = false;
				$scope.loaded = true;
			});
		}
	};
	getTangibleItemAnalyticss();

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

	$scope.$watch('TangibleItemAnalyticsCollection', function() {
		$scope.itemEdit = CheckSelected.checkSelectedInTable($scope.itemEdit, $scope.TangibleItemAnalyticsCollection, $scope.items);
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
			templateUrl: 'stockmanagement/tangibleitemanalytics/tmplTangibleItemAnalyticsEdit.tpl.html',
			size: 'lg',
			windowClass: 'hmodal-info',
			controller: 'ctrlTangibleItemAnalyticsEdit',
			resolve: {
				itemEdit: function() {
					if(isNew) {
						return new ServiceTangibleItemAnalytics();
					} else {
						return $scope.itemEdit;
					}
				},
				documentTypeDefinition: function() {
					return $scope.documentTypeDefinition;
				},
				tangibleItemConditionDefinition: function() {
					return $scope.tangibleItemConditionDefinition;
				},
			}
		})
		.result.then(function(result) {
			if(!angular.isDefined(result.id)) {
				ServiceTangibleItemAnalytics.saveCustom('stockmanagement/tangibleitemanalyticss', result, function(savedObject) {
					$scope.items.unshift(savedObject);
					if($scope.itemEdit !== null) {
						var index = $scope.items.map(function(it) { return it.id; }).indexOf($scope.itemEdit.id);
						$scope.items[index].isSelected = false;
					}
					$scope.itemEdit = angular.extend(savedObject);
					$scope.items[0].isSelected = true;
				});
			 } else {
				 ServiceTangibleItemAnalytics.updateCustom('stockmanagement/tangibleitemanalyticss/'+result.id, result, function(savedObject) {
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


.controller('ctrlTangibleItemAnalyticsEdit',['$scope', 'Localization', '$modal', '$modalInstance', 'dialogs',
	'ServiceTangibleItemAnalytics', 'ServiceDocumentType', 'ServiceTangibleItemCondition',   'documentTypeDefinition',  'tangibleItemConditionDefinition',   'itemEdit',
function($scope, Localization, $modal, $modalInstance, dialogs,
	ServiceTangibleItemAnalytics, ServiceDocumentType, ServiceTangibleItemCondition,  documentTypeDefinition,  tangibleItemConditionDefinition,  itemEdit) {

	// dialog mode
	$scope.mode = 'edit';

	// original item state
	var original = angular.copy(itemEdit);
	// item state
	$scope.itemEdit = angular.copy(original);

	// documentType with properties
	$scope.documentTypeDefinition = documentTypeDefinition;
	// tangibleItemCondition with properties
	$scope.tangibleItemConditionDefinition = tangibleItemConditionDefinition;

	// datepicker logic

	// date properties
	$scope.openedTIAPostingDate = false;
	$scope.openedTIADocumentDate = false;

	$scope.open = function($event, opened) {
		$event.preventDefault();
		$event.stopPropagation();
		$scope[opened] = true;
	};



	// Choose documentType
	$scope.openChooseDocumentTypeDialog = function() {
        $modal.open({
            backdrop: 'static',
            keyboard : false,
            templateUrl: 'corporation/tangibleitemanalytics/tmplDocumentTypeChoose.tpl.html',
            size: 'lg',
            controller: 'ctrlDocumentTypeChoose',
            windowClass: 'hmodal-info',
            resolve: {
				itemEdit: function() {
					if(angular.isDefined($scope.itemEdit.documentType)){
						return $scope.itemEdit.documentType;
					}
				}
			}
		}).result.then(function(result) {
			$scope.itemEdit.documentType = angular.copy(result);
		});
    };


	// Choose tangibleItemCondition
	$scope.openChooseTangibleItemConditionDialog = function() {
        $modal.open({
            backdrop: 'static',
            keyboard : false,
            templateUrl: 'stockmanagement/tangibleitemanalytics/tmplTangibleItemConditionChoose.tpl.html',
            size: 'lg',
            controller: 'ctrlTangibleItemConditionChoose',
            windowClass: 'hmodal-info',
            resolve: {
				itemEdit: function() {
					if(angular.isDefined($scope.itemEdit.tangibleItemCondition)){
						return $scope.itemEdit.tangibleItemCondition;
					}
				}
			}
		}).result.then(function(result) {
			$scope.itemEdit.tangibleItemCondition = angular.copy(result);
		});
    };


	// Save Button
	$scope.save = function() {
		correctDateTime($scope.itemEdit.TIAPostingDate);
		correctDateTime($scope.itemEdit.TIADocumentDate);
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
		return                 item.TIAMeasurementUnit  &&                 item.TIAStocksAccount  &&                 item.TIAPriceDesignation  &&                 item.TIAUser  ;
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


.controller('ctrlTangibleItemAnalyticsChoose', ['$scope','ServiceTangibleItemAnalytics', 'dialogs', '$modal', '$modalInstance', 'itemEdit',
function($scope, ServiceTangibleItemAnalytics, dialogs, $modal,  $modalInstance, itemEdit) {

    // entity with properties
    $scope.itemDefinition = {
        label: 'stockmanagement.tangibleItemAnalytics',
        properties: [
            { label: 'tIAPostingPosition', name:'TIAPostingPosition', inTable:  false  },
            { label: 'tIADocumentNumber', name:'TIADocumentNumber', inTable:  false  },
            { label: 'tIAPostingDate', name:'TIAPostingDate', inTable:  false  },
            { label: 'tIADocumentDate', name:'TIADocumentDate', inTable:  false  },
            { label: 'tIAMeasurementUnit', name:'TIAMeasurementUnit', inTable:  true  },
            { label: 'tIAStocksAccount', name:'TIAStocksAccount', inTable:  true  },
            { label: 'tIAPriceDesignation', name:'TIAPriceDesignation', inTable:  true  },
            { label: 'tIAInputQuantity', name:'TIAInputQuantity', inTable:  false  },
            { label: 'tIAOutputQuantity', name:'TIAOutputQuantity', inTable:  false  },
            { label: 'tIAQuantityBalanceAfterPosting', name:'TIAQuantityBalanceAfterPosting', inTable:  false  },
            { label: 'tIAInputValue', name:'TIAInputValue', inTable:  false  },
            { label: 'tIAOutputValue', name:'TIAOutputValue', inTable:  false  },
            { label: 'tIABookValue', name:'TIABookValue', inTable:  false  },
            { label: 'tIAUnitPrice', name:'TIAUnitPrice', inTable:  false  },
            { label: 'tIAUser', name:'TIAUser', inTable:  true  },
            { label: 'tIAOrdinalNumber', name:'TIAOrdinalNumber', inTable:  false  },
            { label: 'tIAQuantityAtEmployee', name:'TIAQuantityAtEmployee', inTable:  false  },
            { label: 'tIAQuantityAtRepair', name:'TIAQuantityAtRepair', inTable:  false  },
            { label: 'tIAQuantityForRepair', name:'TIAQuantityForRepair', inTable:  false  },
            { label: 'tIAQuantityForRepair_1', name:'TIAQuantityForRepair_1', inTable:  false  },
            { label: 'tIASession', name:'TIASession', inTable:  false  },
        ]
    };

	$scope.items = [];
	$scope.itemEdit = {};

	// fill table with data
	$scope.loaded = false;
	var getTangibleItemAnalyticss = function() {
		if(!$scope.loaded && $scope.items.length === 0) {
			$scope.isLoading = true;
			ServiceTangibleItemAnalytics.query(function(data) {
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
	getTangibleItemAnalyticss();

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