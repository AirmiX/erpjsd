'use strict';

angular.module('Doob.sellingprice')


.controller('ctrlSellingPrice',['$scope', '$rootScope', '$modal', 'dialogs', 'CheckSelected', 'ServiceSellingPrice',
    function($scope, $rootScope, $modal, dialogs, CheckSelected, ServiceSellingPrice) {

	// main entity (sellingPrice) properties names and labels
	$scope.itemDefinition = {
		label: 'sellingprice.sellingPrice',
		properties: [
			{ label: 'sPProductStatus', name:'SPProductStatus', inTable:  false  },
			{ label: 'sPPrice', name:'SPPrice', inTable:  true  },
			{ label: 'sPDateFrom', name:'SPDateFrom', inTable:  true  },
			{ label: 'sPDateUntil', name:'SPDateUntil', inTable:  false  },
		]
	};

	// identification with properties names and labels
	$scope.identificationDefinition = {
		label: 'commonbusinessentities.identification',
		properties : [
			{ label: 'iIdentificationCode', name:'IIdentificationCode' },
		]
	};
	// commercialityStatus with properties names and labels
	$scope.commercialityStatusDefinition = {
		label: 'initialization.commercialityStatus',
		properties : [
			{ label: 'cSCode', name:'CSCode' },
			{ label: 'cSName', name:'CSName' },
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
	// currency with properties names and labels
	$scope.currencyDefinition = {
		label: 'capacitymanagement.countryCurrency',
		properties : [
		]
	};

	// fill table with data
	$scope.items = [];
	$scope.loaded = false;
	var getSellingPrices = function() {
		if(!$scope.loaded && $scope.items.length === 0) {
			$scope.isLoading = true;
			ServiceSellingPrice.query(function(data) {
				$scope.items = data;
				$scope.isLoading = false;
				$scope.loaded = true;
			});
		}
	};
	getSellingPrices();

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

	$scope.$watch('SellingPriceCollection', function() {
		$scope.itemEdit = CheckSelected.checkSelectedInTable($scope.itemEdit, $scope.SellingPriceCollection, $scope.items);
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
			templateUrl: 'sellingprice/sellingprice/tmplSellingPriceEdit.tpl.html',
			size: 'lg',
			windowClass: 'hmodal-info',
			controller: 'ctrlSellingPriceEdit',
			resolve: {
				itemEdit: function() {
					if(isNew) {
						return new ServiceSellingPrice();
					} else {
						return $scope.itemEdit;
					}
				},
				identificationDefinition: function() {
					return $scope.identificationDefinition;
				},
				commercialityStatusDefinition: function() {
					return $scope.commercialityStatusDefinition;
				},
				organizationUnitDefinition: function() {
					return $scope.organizationUnitDefinition;
				},
				currencyDefinition: function() {
					return $scope.currencyDefinition;
				},
			}
		})
		.result.then(function(result) {
			if(!angular.isDefined(result.id)) {
				ServiceSellingPrice.saveCustom('stockmanagement/sellingprices', result, function(savedObject) {
					$scope.items.unshift(savedObject);
					if($scope.itemEdit !== null) {
						var index = $scope.items.map(function(it) { return it.id; }).indexOf($scope.itemEdit.id);
						$scope.items[index].isSelected = false;
					}
					$scope.itemEdit = angular.extend(savedObject);
					$scope.items[0].isSelected = true;
				});
			 } else {
				 ServiceSellingPrice.updateCustom('stockmanagement/sellingprices/'+result.id, result, function(savedObject) {
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


.controller('ctrlSellingPriceEdit',['$scope', 'Localization', '$modal', '$modalInstance', 'dialogs',
	'ServiceSellingPrice', 'ServiceIdentification', 'ServiceCommercialityStatus', 'ServiceOrganizationUnit', 'ServiceCountryCurrency',   'identificationDefinition',  'commercialityStatusDefinition',  'organizationUnitDefinition',  'currencyDefinition',   'itemEdit',
function($scope, Localization, $modal, $modalInstance, dialogs,
	ServiceSellingPrice, ServiceIdentification, ServiceCommercialityStatus, ServiceOrganizationUnit, ServiceCountryCurrency,  identificationDefinition,  commercialityStatusDefinition,  organizationUnitDefinition,  currencyDefinition,  itemEdit) {

	// dialog mode
	$scope.mode = 'edit';

	// original item state
	var original = angular.copy(itemEdit);
	// item state
	$scope.itemEdit = angular.copy(original);

	// identification with properties
	$scope.identificationDefinition = identificationDefinition;
	// commercialityStatus with properties
	$scope.commercialityStatusDefinition = commercialityStatusDefinition;
	// organizationUnit with properties
	$scope.organizationUnitDefinition = organizationUnitDefinition;
	// currency with properties
	$scope.currencyDefinition = currencyDefinition;

	// datepicker logic

	// date properties
	$scope.openedSPDateFrom = false;
	$scope.openedSPDateUntil = false;

	$scope.open = function($event, opened) {
		$event.preventDefault();
		$event.stopPropagation();
		$scope[opened] = true;
	};



	// Choose identification
	$scope.openChooseIdentificationDialog = function() {
        $modal.open({
            backdrop: 'static',
            keyboard : false,
            templateUrl: 'commonbusinessentities/sellingprice/tmplIdentificationChoose.tpl.html',
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


	// Choose commercialityStatus
	$scope.openChooseCommercialityStatusDialog = function() {
        $modal.open({
            backdrop: 'static',
            keyboard : false,
            templateUrl: 'initialization/sellingprice/tmplCommercialityStatusChoose.tpl.html',
            size: 'lg',
            controller: 'ctrlCommercialityStatusChoose',
            windowClass: 'hmodal-info',
            resolve: {
				itemEdit: function() {
					if(angular.isDefined($scope.itemEdit.commercialityStatus)){
						return $scope.itemEdit.commercialityStatus;
					}
				}
			}
		}).result.then(function(result) {
			$scope.itemEdit.commercialityStatus = angular.copy(result);
		});
    };


	// Choose organizationUnit
	$scope.openChooseOrganizationUnitDialog = function() {
        $modal.open({
            backdrop: 'static',
            keyboard : false,
            templateUrl: 'corporation/sellingprice/tmplOrganizationUnitChoose.tpl.html',
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


	// Choose currency
	$scope.openChooseCurrencyDialog = function() {
        $modal.open({
            backdrop: 'static',
            keyboard : false,
            templateUrl: 'capacitymanagement/sellingprice/tmplCountryCurrencyChoose.tpl.html',
            size: 'lg',
            controller: 'ctrlCountryCurrencyChoose',
            windowClass: 'hmodal-info',
            resolve: {
				itemEdit: function() {
					if(angular.isDefined($scope.itemEdit.currency)){
						return $scope.itemEdit.currency;
					}
				}
			}
		}).result.then(function(result) {
			$scope.itemEdit.currency = angular.copy(result);
		});
    };


	// Save Button
	$scope.save = function() {
		correctDateTime($scope.itemEdit.SPDateFrom);
		correctDateTime($scope.itemEdit.SPDateUntil);
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
		return                 item.SPPrice  &&                 item.SPDateFrom  ;
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


.controller('ctrlSellingPriceChoose', ['$scope','ServiceSellingPrice', 'dialogs', '$modal', '$modalInstance', 'itemEdit',
function($scope, ServiceSellingPrice, dialogs, $modal,  $modalInstance, itemEdit) {

    // entity with properties
    $scope.itemDefinition = {
        label: 'sellingprice.sellingPrice',
        properties: [
            { label: 'sPProductStatus', name:'SPProductStatus', inTable:  false  },
            { label: 'sPPrice', name:'SPPrice', inTable:  true  },
            { label: 'sPDateFrom', name:'SPDateFrom', inTable:  true  },
            { label: 'sPDateUntil', name:'SPDateUntil', inTable:  false  },
        ]
    };

	$scope.items = [];
	$scope.itemEdit = {};

	// fill table with data
	$scope.loaded = false;
	var getSellingPrices = function() {
		if(!$scope.loaded && $scope.items.length === 0) {
			$scope.isLoading = true;
			ServiceSellingPrice.query(function(data) {
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
	getSellingPrices();

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