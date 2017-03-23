'use strict';

angular.module('Doob.productiondata')


.controller('ctrlStructuralComponents',['$scope', '$rootScope', '$modal', 'dialogs', 'CheckSelected', 'ServiceStructuralComponents',
    function($scope, $rootScope, $modal, dialogs, CheckSelected, ServiceStructuralComponents) {

	// main entity (structuralComponents) properties names and labels
	$scope.itemDefinition = {
		label: 'productiondata.structuralComponents',
		properties: [
			{ label: 'sCLevel', name:'SCLevel', inTable:  true  },
			{ label: 'sCOrdinalNumberAtLevel', name:'SCOrdinalNumberAtLevel', inTable:  true  },
			{ label: 'sCVariantNumber', name:'SCVariantNumber', inTable:  true  },
			{ label: 'sCNormativUgradnje', name:'SCNormativUgradnje', inTable:  true  },
			{ label: 'sCSupplyingStatus', name:'SCSupplyingStatus', inTable:  true  },
			{ label: 'sCWastePlannedPercentage', name:'SCWastePlannedPercentage', inTable:  false  },
			{ label: 'sCFictiveProductIndicator', name:'SCFictiveProductIndicator', inTable:  false  },
			{ label: 'sCValidStartDate', name:'SCValidStartDate', inTable:  true  },
			{ label: 'sCValidEndDate', name:'SCValidEndDate', inTable:  false  },
			{ label: 'sCEnteredBy', name:'SCEnteredBy', inTable:  false  },
			{ label: 'sCEntryDate', name:'SCEntryDate', inTable:  false  },
			{ label: 'sCModifiedBy', name:'SCModifiedBy', inTable:  false  },
			{ label: 'sCModificationDate', name:'SCModificationDate', inTable:  false  },
		]
	};

	// superIdent with properties names and labels
	$scope.superIdentDefinition = {
		label: 'commonbusinessentities.identification',
		properties : [
			{ label: 'iIdentificationCode', name:'IIdentificationCode' },
		]
	};
	// subIdent with properties names and labels
	$scope.subIdentDefinition = {
		label: 'commonbusinessentities.identification',
		properties : [
			{ label: 'iIdentificationCode', name:'IIdentificationCode' },
		]
	};

	// fill table with data
	$scope.items = [];
	$scope.loaded = false;
	var getStructuralComponentss = function() {
		if(!$scope.loaded && $scope.items.length === 0) {
			$scope.isLoading = true;
			ServiceStructuralComponents.query(function(data) {
				$scope.items = data;
				$scope.isLoading = false;
				$scope.loaded = true;
			});
		}
	};
	getStructuralComponentss();

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

	$scope.$watch('StructuralComponentsCollection', function() {
		$scope.itemEdit = CheckSelected.checkSelectedInTable($scope.itemEdit, $scope.StructuralComponentsCollection, $scope.items);
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
			templateUrl: 'productiondata/structuralcomponents/tmplStructuralComponentsEdit.tpl.html',
			size: 'lg',
			windowClass: 'hmodal-info',
			controller: 'ctrlStructuralComponentsEdit',
			resolve: {
				itemEdit: function() {
					if(isNew) {
						return new ServiceStructuralComponents();
					} else {
						return $scope.itemEdit;
					}
				},
				superIdentDefinition: function() {
					return $scope.superIdentDefinition;
				},
				subIdentDefinition: function() {
					return $scope.subIdentDefinition;
				},
			}
		})
		.result.then(function(result) {
			if(!angular.isDefined(result.id)) {
				ServiceStructuralComponents.saveCustom('stockmanagement/structuralcomponentss', result, function(savedObject) {
					$scope.items.unshift(savedObject);
					if($scope.itemEdit !== null) {
						var index = $scope.items.map(function(it) { return it.id; }).indexOf($scope.itemEdit.id);
						$scope.items[index].isSelected = false;
					}
					$scope.itemEdit = angular.extend(savedObject);
					$scope.items[0].isSelected = true;
				});
			 } else {
				 ServiceStructuralComponents.updateCustom('stockmanagement/structuralcomponentss/'+result.id, result, function(savedObject) {
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


.controller('ctrlStructuralComponentsEdit',['$scope', 'Localization', '$modal', '$modalInstance', 'dialogs',
	'ServiceStructuralComponents', 'ServiceIdentification',   'superIdentDefinition',  'subIdentDefinition',   'itemEdit',
function($scope, Localization, $modal, $modalInstance, dialogs,
	ServiceStructuralComponents, ServiceIdentification,  superIdentDefinition,  subIdentDefinition,  itemEdit) {

	// dialog mode
	$scope.mode = 'edit';

	// original item state
	var original = angular.copy(itemEdit);
	// item state
	$scope.itemEdit = angular.copy(original);

	// superIdent with properties
	$scope.superIdentDefinition = superIdentDefinition;
	// subIdent with properties
	$scope.subIdentDefinition = subIdentDefinition;

	// datepicker logic

	// date properties
	$scope.openedSCValidStartDate = false;
	$scope.openedSCValidEndDate = false;
	$scope.openedSCEntryDate = false;
	$scope.openedSCModificationDate = false;

	$scope.open = function($event, opened) {
		$event.preventDefault();
		$event.stopPropagation();
		$scope[opened] = true;
	};



	// Choose superIdent
	$scope.openChooseSuperIdentDialog = function() {
        $modal.open({
            backdrop: 'static',
            keyboard : false,
            templateUrl: 'commonbusinessentities/structuralcomponents/tmplIdentificationChoose.tpl.html',
            size: 'lg',
            controller: 'ctrlIdentificationChoose',
            windowClass: 'hmodal-info',
            resolve: {
				itemEdit: function() {
					if(angular.isDefined($scope.itemEdit.superIdent)){
						return $scope.itemEdit.superIdent;
					}
				}
			}
		}).result.then(function(result) {
			$scope.itemEdit.superIdent = angular.copy(result);
		});
    };


	// Choose subIdent
	$scope.openChooseSubIdentDialog = function() {
        $modal.open({
            backdrop: 'static',
            keyboard : false,
            templateUrl: 'commonbusinessentities/structuralcomponents/tmplIdentificationChoose.tpl.html',
            size: 'lg',
            controller: 'ctrlIdentificationChoose',
            windowClass: 'hmodal-info',
            resolve: {
				itemEdit: function() {
					if(angular.isDefined($scope.itemEdit.subIdent)){
						return $scope.itemEdit.subIdent;
					}
				}
			}
		}).result.then(function(result) {
			$scope.itemEdit.subIdent = angular.copy(result);
		});
    };


	// Save Button
	$scope.save = function() {
		correctDateTime($scope.itemEdit.SCValidStartDate);
		correctDateTime($scope.itemEdit.SCValidEndDate);
		correctDateTime($scope.itemEdit.SCEntryDate);
		correctDateTime($scope.itemEdit.SCModificationDate);
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
		return                 item.SCLevel  &&                 item.SCOrdinalNumberAtLevel  &&                 item.SCVariantNumber  &&                 item.SCNormativUgradnje  &&                 item.SCSupplyingStatus  &&                 item.SCValidStartDate  ;
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


.controller('ctrlStructuralComponentsChoose', ['$scope','ServiceStructuralComponents', 'dialogs', '$modal', '$modalInstance', 'itemEdit',
function($scope, ServiceStructuralComponents, dialogs, $modal,  $modalInstance, itemEdit) {

    // entity with properties
    $scope.itemDefinition = {
        label: 'productiondata.structuralComponents',
        properties: [
            { label: 'sCLevel', name:'SCLevel', inTable:  true  },
            { label: 'sCOrdinalNumberAtLevel', name:'SCOrdinalNumberAtLevel', inTable:  true  },
            { label: 'sCVariantNumber', name:'SCVariantNumber', inTable:  true  },
            { label: 'sCNormativUgradnje', name:'SCNormativUgradnje', inTable:  true  },
            { label: 'sCSupplyingStatus', name:'SCSupplyingStatus', inTable:  true  },
            { label: 'sCWastePlannedPercentage', name:'SCWastePlannedPercentage', inTable:  false  },
            { label: 'sCFictiveProductIndicator', name:'SCFictiveProductIndicator', inTable:  false  },
            { label: 'sCValidStartDate', name:'SCValidStartDate', inTable:  true  },
            { label: 'sCValidEndDate', name:'SCValidEndDate', inTable:  false  },
            { label: 'sCEnteredBy', name:'SCEnteredBy', inTable:  false  },
            { label: 'sCEntryDate', name:'SCEntryDate', inTable:  false  },
            { label: 'sCModifiedBy', name:'SCModifiedBy', inTable:  false  },
            { label: 'sCModificationDate', name:'SCModificationDate', inTable:  false  },
        ]
    };

	$scope.items = [];
	$scope.itemEdit = {};

	// fill table with data
	$scope.loaded = false;
	var getStructuralComponentss = function() {
		if(!$scope.loaded && $scope.items.length === 0) {
			$scope.isLoading = true;
			ServiceStructuralComponents.query(function(data) {
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
	getStructuralComponentss();

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