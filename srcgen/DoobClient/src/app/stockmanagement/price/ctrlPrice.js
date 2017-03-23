'use strict';

angular.module('Doob.stockmanagement')


.controller('ctrlPrice',['$scope', '$rootScope', '$modal', 'dialogs', 'CheckSelected', 'ServicePrice',
    function($scope, $rootScope, $modal, dialogs, CheckSelected, ServicePrice) {

	// main entity (price) properties names and labels
	$scope.itemDefinition = {
		label: 'stockmanagement.price',
		properties: [
			{ label: 'pPrice', name:'PPrice', inTable:  true  },
			{ label: 'pStartDate', name:'PStartDate', inTable:  false  },
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
	// tangibleItemStatuses with properties names and labels
	$scope.tangibleItemStatusesDefinition = {
		label: 'stockmanagement.tangibleItemStatus',
		properties : [
			{ label: 'tISDesignation', name:'TISDesignation' },
			{ label: 'tISName', name:'TISName' },
		]
	};
	// currencies with properties names and labels
	$scope.currenciesDefinition = {
		label: 'capacitymanagement.currency',
		properties : [
			{ label: 'cCurrencyDesignation', name:'CCurrencyDesignation' },
		]
	};
	// identification with properties names and labels
	$scope.identificationDefinition = {
		label: 'commonbusinessentities.identification',
		properties : [
			{ label: 'iIdentificationCode', name:'IIdentificationCode' },
		]
	};
	// priceArchives with properties names and labels
	$scope.priceArchivesDefinition = {
		label: 'stockmanagement.priceArchive',
		properties : [
			{ label: 'pAStartDate', name:'PAStartDate' },
			{ label: 'pAEndDate', name:'PAEndDate' },
		]
	};

	// fill table with data
	$scope.items = [];
	$scope.loaded = false;
	var getPrices = function() {
		if(!$scope.loaded && $scope.items.length === 0) {
			$scope.isLoading = true;
			ServicePrice.query(function(data) {
				$scope.items = data;
				$scope.isLoading = false;
				$scope.loaded = true;
			});
		}
	};
	getPrices();

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

	$scope.$watch('PriceCollection', function() {
		$scope.itemEdit = CheckSelected.checkSelectedInTable($scope.itemEdit, $scope.PriceCollection, $scope.items);
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
			templateUrl: 'stockmanagement/price/tmplPriceEdit.tpl.html',
			size: 'lg',
			windowClass: 'hmodal-info',
			controller: 'ctrlPriceEdit',
			resolve: {
				itemEdit: function() {
					if(isNew) {
						return new ServicePrice();
					} else {
						return $scope.itemEdit;
					}
				},
				priceDesignationDefinition: function() {
					return $scope.priceDesignationDefinition;
				},
				tangibleItemStatusesDefinition: function() {
					return $scope.tangibleItemStatusesDefinition;
				},
				currenciesDefinition: function() {
					return $scope.currenciesDefinition;
				},
				identificationDefinition: function() {
					return $scope.identificationDefinition;
				},
				priceArchivesDefinition: function() {
					return $scope.priceArchivesDefinition;
				},
			}
		})
		.result.then(function(result) {
			if(!angular.isDefined(result.id)) {
				ServicePrice.saveCustom('stockmanagement/prices', result, function(savedObject) {
					$scope.items.unshift(savedObject);
					if($scope.itemEdit !== null) {
						var index = $scope.items.map(function(it) { return it.id; }).indexOf($scope.itemEdit.id);
						$scope.items[index].isSelected = false;
					}
					$scope.itemEdit = angular.extend(savedObject);
					$scope.items[0].isSelected = true;
				});
			 } else {
				 ServicePrice.updateCustom('stockmanagement/prices/'+result.id, result, function(savedObject) {
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


.controller('ctrlPriceEdit',['$scope', 'Localization', '$modal', '$modalInstance', 'dialogs',
	'ServicePrice', 'ServicePriceDesignation', 'ServiceTangibleItemStatus', 'ServiceCurrency', 'ServiceIdentification', 'ServicePriceArchive',   'priceDesignationDefinition',  'tangibleItemStatusesDefinition',  'currenciesDefinition',  'identificationDefinition',  'priceArchivesDefinition',   'itemEdit',
function($scope, Localization, $modal, $modalInstance, dialogs,
	ServicePrice, ServicePriceDesignation, ServiceTangibleItemStatus, ServiceCurrency, ServiceIdentification, ServicePriceArchive,  priceDesignationDefinition,  tangibleItemStatusesDefinition,  currenciesDefinition,  identificationDefinition,  priceArchivesDefinition,  itemEdit) {

	// dialog mode
	$scope.mode = 'edit';

	// original item state
	var original = angular.copy(itemEdit);
	// item state
	$scope.itemEdit = angular.copy(original);

	// priceDesignation with properties
	$scope.priceDesignationDefinition = priceDesignationDefinition;
	// tangibleItemStatuses with properties
	$scope.tangibleItemStatusesDefinition = tangibleItemStatusesDefinition;
	// currencies with properties
	$scope.currenciesDefinition = currenciesDefinition;
	// identification with properties
	$scope.identificationDefinition = identificationDefinition;
	// priceArchives with properties
	$scope.priceArchivesDefinition = priceArchivesDefinition;

	// datepicker logic

	// date properties
	$scope.openedPStartDate = false;

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
            templateUrl: 'stockmanagement/price/tmplPriceDesignationChoose.tpl.html',
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


	// Choose tangibleItemStatuses
	$scope.openChooseTangibleItemStatusesDialog = function() {
        $modal.open({
            backdrop: 'static',
            keyboard : false,
            templateUrl: 'stockmanagement/price/tmplTangibleItemStatusChoose.tpl.html',
            size: 'lg',
            controller: 'ctrlTangibleItemStatusChoose',
            windowClass: 'hmodal-info',
            resolve: {
				itemEdit: function() {
					if(angular.isDefined($scope.itemEdit.tangibleItemStatuses)){
						return $scope.itemEdit.tangibleItemStatuses;
					}
				}
			}
		}).result.then(function(result) {
			$scope.itemEdit.tangibleItemStatuses = angular.copy(result);
		});
    };


	// Choose currencies
	$scope.openChooseCurrenciesDialog = function() {
        $modal.open({
            backdrop: 'static',
            keyboard : false,
            templateUrl: 'capacitymanagement/price/tmplCurrencyChoose.tpl.html',
            size: 'lg',
            controller: 'ctrlCurrencyChoose',
            windowClass: 'hmodal-info',
            resolve: {
				itemEdit: function() {
					if(angular.isDefined($scope.itemEdit.currencies)){
						return $scope.itemEdit.currencies;
					}
				}
			}
		}).result.then(function(result) {
			$scope.itemEdit.currencies = angular.copy(result);
		});
    };


	// Choose identification
	$scope.openChooseIdentificationDialog = function() {
        $modal.open({
            backdrop: 'static',
            keyboard : false,
            templateUrl: 'commonbusinessentities/price/tmplIdentificationChoose.tpl.html',
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


    $scope.priceArchiveEdit = null;

    // priceArchives table selection logic
    $scope.priceArchiveSelection = function(item, index) {
        if(item.isSelected) {
            if($scope.priceArchiveEdit !== null) {
                var index1 = $scope.itemEdit.priceArchives.map(function(it) { return it.id; }).indexOf($scope.priceArchiveEdit.id);
                $scope.itemEdit.priceArchives[index1].isSelected = false;
            }
            $scope.priceArchiveEdit = item;
        } else {
            $scope.priceArchiveEdit = null;
            item.isSelected = false;
        }
    };

    // New/Edit priceArchives dialog
    $scope.openPriceArchiveEditDialog = function(isNew) {
        $modal.open({
            backdrop: 'static',
            keyboard : false,
            templateUrl: 'stockmanagement/price/tmplPriceArchiveEdit.tpl.html',
            size: 'lg',
            controller: 'ctrlPriceArchiveEdit',
            windowClass: 'hmodal-info',
            resolve: {
                itemEdit: function() {
                    if(isNew) {
                        return new ServicePriceArchive();
                    } else {
                        return $scope.priceArchiveEdit;
                    }
                }
            }
        }).result.then(function(result) {
            var i;
            if(isNew) {
                if(!angular.isDefined($scope.itemEdit.priceArchives)) {
                    $scope.itemEdit.priceArchives = [];
                }
                $scope.itemEdit.priceArchives.unshift(result);
                for(i in $scope.itemEdit.priceArchives) {
                    $scope.itemEdit.priceArchives[i].isSelected = false;
                }
                $scope.priceArchiveEdit = angular.extend(result);
                $scope.itemEdit.priceArchives[0].isSelected = true;
            }
            else {
                for(i in $scope.itemEdit.priceArchives) {
                    $scope.itemEdit.priceArchives[i].isSelected = false;
                }
                $scope.priceArchiveEdit = angular.extend(result);
                var index = $scope.itemEdit.priceArchives.map(function(it) { return it.id; }).indexOf(result.id);
                for(var key in result) {
                    $scope.itemEdit.priceArchives[index][key] = result[key];
                }
                $scope.itemEdit.priceArchives[index].isSelected = true;
            }
        });
    };

    $scope.removePriceArchive = function(item) {
        var dialog = dialogs.confirm('Please confirm', 'Are you sure you want to delete item?');
        dialog.result.then(function(btn) {
            var removeIndex = $scope.itemEdit.priceArchives.map(function(it) { return it.id; }).indexOf(item.id);
            $scope.itemEdit.priceArchives[removeIndex].deleted = true;
        });
    };


	// Save Button
	$scope.save = function() {
		correctDateTime($scope.itemEdit.PStartDate);
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
		return                 item.PPrice  ;
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


.controller('ctrlPriceChoose', ['$scope','ServicePrice', 'dialogs', '$modal', '$modalInstance', 'itemEdit',
function($scope, ServicePrice, dialogs, $modal,  $modalInstance, itemEdit) {

    // entity with properties
    $scope.itemDefinition = {
        label: 'stockmanagement.price',
        properties: [
            { label: 'pPrice', name:'PPrice', inTable:  true  },
            { label: 'pStartDate', name:'PStartDate', inTable:  false  },
        ]
    };

	$scope.items = [];
	$scope.itemEdit = {};

	// fill table with data
	$scope.loaded = false;
	var getPrices = function() {
		if(!$scope.loaded && $scope.items.length === 0) {
			$scope.isLoading = true;
			ServicePrice.query(function(data) {
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
	getPrices();

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