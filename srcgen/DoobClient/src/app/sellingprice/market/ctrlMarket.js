'use strict';

angular.module('Doob.sellingprice')


.controller('ctrlMarket',['$scope', '$rootScope', '$modal', 'dialogs', 'CheckSelected', 'ServiceMarket',
    function($scope, $rootScope, $modal, dialogs, CheckSelected, ServiceMarket) {

	// main entity (market) properties names and labels
	$scope.itemDefinition = {
		label: 'sellingprice.market',
		properties: [
			{ label: 'mMarket', name:'MMarket', inTable:  true  },
			{ label: 'mName', name:'MName', inTable:  true  },
			{ label: 'mDescription', name:'MDescription', inTable:  false  },
		]
	};

	// organizationUnits with properties names and labels
	$scope.organizationUnitsDefinition = {
		label: 'corporation.organizationUnit',
		properties : [
			{ label: 'oUIdentificationCode', name:'OUIdentificationCode' },
			{ label: 'oUName', name:'OUName' },
		]
	};

	// fill table with data
	$scope.items = [];
	$scope.loaded = false;
	var getMarkets = function() {
		if(!$scope.loaded && $scope.items.length === 0) {
			$scope.isLoading = true;
			ServiceMarket.query(function(data) {
				$scope.items = data;
				$scope.isLoading = false;
				$scope.loaded = true;
			});
		}
	};
	getMarkets();

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

	$scope.$watch('MarketCollection', function() {
		$scope.itemEdit = CheckSelected.checkSelectedInTable($scope.itemEdit, $scope.MarketCollection, $scope.items);
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
			templateUrl: 'sellingprice/market/tmplMarketEdit.tpl.html',
			size: 'lg',
			windowClass: 'hmodal-info',
			controller: 'ctrlMarketEdit',
			resolve: {
				itemEdit: function() {
					if(isNew) {
						return new ServiceMarket();
					} else {
						return $scope.itemEdit;
					}
				},
				organizationUnitsDefinition: function() {
					return $scope.organizationUnitsDefinition;
				},
			}
		})
		.result.then(function(result) {
			if(!angular.isDefined(result.id)) {
				ServiceMarket.saveCustom('stockmanagement/markets', result, function(savedObject) {
					$scope.items.unshift(savedObject);
					if($scope.itemEdit !== null) {
						var index = $scope.items.map(function(it) { return it.id; }).indexOf($scope.itemEdit.id);
						$scope.items[index].isSelected = false;
					}
					$scope.itemEdit = angular.extend(savedObject);
					$scope.items[0].isSelected = true;
				});
			 } else {
				 ServiceMarket.updateCustom('stockmanagement/markets/'+result.id, result, function(savedObject) {
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


.controller('ctrlMarketEdit',['$scope', 'Localization', '$modal', '$modalInstance', 'dialogs',
	'ServiceMarket', 'ServiceOrganizationUnit',   'organizationUnitsDefinition',   'itemEdit',
function($scope, Localization, $modal, $modalInstance, dialogs,
	ServiceMarket, ServiceOrganizationUnit,  organizationUnitsDefinition,  itemEdit) {

	// dialog mode
	$scope.mode = 'edit';

	// original item state
	var original = angular.copy(itemEdit);
	// item state
	$scope.itemEdit = angular.copy(original);

	// organizationUnits with properties
	$scope.organizationUnitsDefinition = organizationUnitsDefinition;

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
        for(i in $scope.itemEdit.organizationUnits) {
    		item = $scope.itemEdit.organizationUnits[i];
    		delete item.isSelected;
    	}
		$modalInstance.close($scope.itemEdit);
	};


	$scope.canSave = function() {
		var item = $scope.itemEdit;
		return                 item.MMarket  &&                 item.MName  ;
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


.controller('ctrlMarketChoose', ['$scope','ServiceMarket', 'dialogs', '$modal', '$modalInstance', 'itemEdit',
function($scope, ServiceMarket, dialogs, $modal,  $modalInstance, itemEdit) {

    // entity with properties
    $scope.itemDefinition = {
        label: 'sellingprice.market',
        properties: [
            { label: 'mMarket', name:'MMarket', inTable:  true  },
            { label: 'mName', name:'MName', inTable:  true  },
            { label: 'mDescription', name:'MDescription', inTable:  false  },
        ]
    };

	$scope.items = [];
	$scope.itemEdit = {};

	// fill table with data
	$scope.loaded = false;
	var getMarkets = function() {
		if(!$scope.loaded && $scope.items.length === 0) {
			$scope.isLoading = true;
			ServiceMarket.query(function(data) {
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
	getMarkets();

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