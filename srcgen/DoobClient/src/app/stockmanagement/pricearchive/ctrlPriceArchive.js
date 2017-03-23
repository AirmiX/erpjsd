'use strict';

angular.module('Doob.stockmanagement')


.controller('ctrlPriceArchive',['$scope', '$rootScope', '$modal', 'dialogs', 'CheckSelected', 'ServicePriceArchive',
    function($scope, $rootScope, $modal, dialogs, CheckSelected, ServicePriceArchive) {

	// main entity (priceArchive) properties names and labels
	$scope.itemDefinition = {
		label: 'stockmanagement.priceArchive',
		properties: [
			{ label: 'pAStartDate', name:'PAStartDate', inTable:  true  },
			{ label: 'pAEndDate', name:'PAEndDate', inTable:  true  },
		]
	};

	// price with properties names and labels
	$scope.priceDefinition = {
		label: 'stockmanagement.price',
		properties : [
			{ label: 'pPrice', name:'PPrice' },
		]
	};

	// fill table with data
	$scope.items = [];
	$scope.loaded = false;
	var getPriceArchives = function() {
		if(!$scope.loaded && $scope.items.length === 0) {
			$scope.isLoading = true;
			ServicePriceArchive.query(function(data) {
				$scope.items = data;
				$scope.isLoading = false;
				$scope.loaded = true;
			});
		}
	};
	getPriceArchives();

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

	$scope.$watch('PriceArchiveCollection', function() {
		$scope.itemEdit = CheckSelected.checkSelectedInTable($scope.itemEdit, $scope.PriceArchiveCollection, $scope.items);
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
			templateUrl: 'stockmanagement/pricearchive/tmplPriceArchiveEdit.tpl.html',
			size: 'lg',
			windowClass: 'hmodal-info',
			controller: 'ctrlPriceArchiveEdit',
			resolve: {
				itemEdit: function() {
					if(isNew) {
						return new ServicePriceArchive();
					} else {
						return $scope.itemEdit;
					}
				},
				priceDefinition: function() {
					return $scope.priceDefinition;
				},
			}
		})
		.result.then(function(result) {
			if(!angular.isDefined(result.id)) {
				ServicePriceArchive.saveCustom('stockmanagement/pricearchives', result, function(savedObject) {
					$scope.items.unshift(savedObject);
					if($scope.itemEdit !== null) {
						var index = $scope.items.map(function(it) { return it.id; }).indexOf($scope.itemEdit.id);
						$scope.items[index].isSelected = false;
					}
					$scope.itemEdit = angular.extend(savedObject);
					$scope.items[0].isSelected = true;
				});
			 } else {
				 ServicePriceArchive.updateCustom('stockmanagement/pricearchives/'+result.id, result, function(savedObject) {
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


.controller('ctrlPriceArchiveEdit',['$scope', 'Localization', '$modal', '$modalInstance', 'dialogs',
	'ServicePriceArchive', 'ServicePrice',   'priceDefinition',   'itemEdit',
function($scope, Localization, $modal, $modalInstance, dialogs,
	ServicePriceArchive, ServicePrice,  priceDefinition,  itemEdit) {

	// dialog mode
	$scope.mode = 'edit';

	// original item state
	var original = angular.copy(itemEdit);
	// item state
	$scope.itemEdit = angular.copy(original);

	// price with properties
	$scope.priceDefinition = priceDefinition;

	// datepicker logic

	// date properties
	$scope.openedPAStartDate = false;
	$scope.openedPAEndDate = false;

	$scope.open = function($event, opened) {
		$event.preventDefault();
		$event.stopPropagation();
		$scope[opened] = true;
	};



	// Choose price
	$scope.openChoosePriceDialog = function() {
        $modal.open({
            backdrop: 'static',
            keyboard : false,
            templateUrl: 'stockmanagement/pricearchive/tmplPriceChoose.tpl.html',
            size: 'lg',
            controller: 'ctrlPriceChoose',
            windowClass: 'hmodal-info',
            resolve: {
				itemEdit: function() {
					if(angular.isDefined($scope.itemEdit.price)){
						return $scope.itemEdit.price;
					}
				}
			}
		}).result.then(function(result) {
			$scope.itemEdit.price = angular.copy(result);
		});
    };


	// Save Button
	$scope.save = function() {
		correctDateTime($scope.itemEdit.PAStartDate);
		correctDateTime($scope.itemEdit.PAEndDate);
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
		return                 item.PAStartDate  &&                 item.PAEndDate  ;
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


.controller('ctrlPriceArchiveChoose', ['$scope','ServicePriceArchive', 'dialogs', '$modal', '$modalInstance', 'itemEdit',
function($scope, ServicePriceArchive, dialogs, $modal,  $modalInstance, itemEdit) {

    // entity with properties
    $scope.itemDefinition = {
        label: 'stockmanagement.priceArchive',
        properties: [
            { label: 'pAStartDate', name:'PAStartDate', inTable:  true  },
            { label: 'pAEndDate', name:'PAEndDate', inTable:  true  },
        ]
    };

	$scope.items = [];
	$scope.itemEdit = {};

	// fill table with data
	$scope.loaded = false;
	var getPriceArchives = function() {
		if(!$scope.loaded && $scope.items.length === 0) {
			$scope.isLoading = true;
			ServicePriceArchive.query(function(data) {
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
	getPriceArchives();

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