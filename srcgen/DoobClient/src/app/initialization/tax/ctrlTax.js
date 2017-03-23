'use strict';

angular.module('Doob.initialization')


.controller('ctrlTax',['$scope', '$rootScope', '$modal', 'dialogs', 'CheckSelected', 'ServiceTax',
    function($scope, $rootScope, $modal, dialogs, CheckSelected, ServiceTax) {

	// main entity (tax) properties names and labels
	$scope.itemDefinition = {
		label: 'initialization.tax',
		properties: [
			{ label: 'tOrdinalNumber', name:'TOrdinalNumber', inTable:  true  },
			{ label: 'tName', name:'TName', inTable:  true  },
			{ label: 'tRemark', name:'TRemark', inTable:  false  },
			{ label: 'tPercent', name:'TPercent', inTable:  true  },
			{ label: 'tRecalculatedPercent', name:'TRecalculatedPercent', inTable:  false  },
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
	// taxHeading with properties names and labels
	$scope.taxHeadingDefinition = {
		label: 'initialization.taxHeading',
		properties : [
			{ label: 'tHDesignation', name:'THDesignation' },
			{ label: 'tHDescription', name:'THDescription' },
			{ label: 'tHStartDate', name:'THStartDate' },
			{ label: 'tHTotalPercent', name:'THTotalPercent' },
		]
	};

	// fill table with data
	$scope.items = [];
	$scope.loaded = false;
	var getTaxs = function() {
		if(!$scope.loaded && $scope.items.length === 0) {
			$scope.isLoading = true;
			ServiceTax.query(function(data) {
				$scope.items = data;
				$scope.isLoading = false;
				$scope.loaded = true;
			});
		}
	};
	getTaxs();

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

	$scope.$watch('TaxCollection', function() {
		$scope.itemEdit = CheckSelected.checkSelectedInTable($scope.itemEdit, $scope.TaxCollection, $scope.items);
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
			templateUrl: 'initialization/tax/tmplTaxEdit.tpl.html',
			size: 'lg',
			windowClass: 'hmodal-info',
			controller: 'ctrlTaxEdit',
			resolve: {
				itemEdit: function() {
					if(isNew) {
						return new ServiceTax();
					} else {
						return $scope.itemEdit;
					}
				},
				accountDefinition: function() {
					return $scope.accountDefinition;
				},
				taxHeadingDefinition: function() {
					return $scope.taxHeadingDefinition;
				},
			}
		})
		.result.then(function(result) {
			if(!angular.isDefined(result.id)) {
				ServiceTax.saveCustom('stockmanagement/taxs', result, function(savedObject) {
					$scope.items.unshift(savedObject);
					if($scope.itemEdit !== null) {
						var index = $scope.items.map(function(it) { return it.id; }).indexOf($scope.itemEdit.id);
						$scope.items[index].isSelected = false;
					}
					$scope.itemEdit = angular.extend(savedObject);
					$scope.items[0].isSelected = true;
				});
			 } else {
				 ServiceTax.updateCustom('stockmanagement/taxs/'+result.id, result, function(savedObject) {
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


.controller('ctrlTaxEdit',['$scope', 'Localization', '$modal', '$modalInstance', 'dialogs',
	'ServiceTax', 'ServiceAccount', 'ServiceTaxHeading',   'accountDefinition',  'taxHeadingDefinition',   'itemEdit',
function($scope, Localization, $modal, $modalInstance, dialogs,
	ServiceTax, ServiceAccount, ServiceTaxHeading,  accountDefinition,  taxHeadingDefinition,  itemEdit) {

	// dialog mode
	$scope.mode = 'edit';

	// original item state
	var original = angular.copy(itemEdit);
	// item state
	$scope.itemEdit = angular.copy(original);

	// account with properties
	$scope.accountDefinition = accountDefinition;
	// taxHeading with properties
	$scope.taxHeadingDefinition = taxHeadingDefinition;

	// datepicker logic

	// date properties

	$scope.open = function($event, opened) {
		$event.preventDefault();
		$event.stopPropagation();
		$scope[opened] = true;
	};



	// Choose account
	$scope.openChooseAccountDialog = function() {
        $modal.open({
            backdrop: 'static',
            keyboard : false,
            templateUrl: 'corporation/tax/tmplAccountChoose.tpl.html',
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


	// Choose taxHeading
	$scope.openChooseTaxHeadingDialog = function() {
        $modal.open({
            backdrop: 'static',
            keyboard : false,
            templateUrl: 'initialization/tax/tmplTaxHeadingChoose.tpl.html',
            size: 'lg',
            controller: 'ctrlTaxHeadingChoose',
            windowClass: 'hmodal-info',
            resolve: {
				itemEdit: function() {
					if(angular.isDefined($scope.itemEdit.taxHeading)){
						return $scope.itemEdit.taxHeading;
					}
				}
			}
		}).result.then(function(result) {
			$scope.itemEdit.taxHeading = angular.copy(result);
		});
    };


	// Save Button
	$scope.save = function() {
	   //	delete $scope.itemEdit.isSelected;
		$modalInstance.close($scope.itemEdit);
	};


	$scope.canSave = function() {
		var item = $scope.itemEdit;
		return                 item.TOrdinalNumber  &&                 item.TName  &&                 item.TPercent  ;
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


.controller('ctrlTaxChoose', ['$scope','ServiceTax', 'dialogs', '$modal', '$modalInstance', 'itemEdit',
function($scope, ServiceTax, dialogs, $modal,  $modalInstance, itemEdit) {

    // entity with properties
    $scope.itemDefinition = {
        label: 'initialization.tax',
        properties: [
            { label: 'tOrdinalNumber', name:'TOrdinalNumber', inTable:  true  },
            { label: 'tName', name:'TName', inTable:  true  },
            { label: 'tRemark', name:'TRemark', inTable:  false  },
            { label: 'tPercent', name:'TPercent', inTable:  true  },
            { label: 'tRecalculatedPercent', name:'TRecalculatedPercent', inTable:  false  },
        ]
    };

	$scope.items = [];
	$scope.itemEdit = {};

	// fill table with data
	$scope.loaded = false;
	var getTaxs = function() {
		if(!$scope.loaded && $scope.items.length === 0) {
			$scope.isLoading = true;
			ServiceTax.query(function(data) {
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
	getTaxs();

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