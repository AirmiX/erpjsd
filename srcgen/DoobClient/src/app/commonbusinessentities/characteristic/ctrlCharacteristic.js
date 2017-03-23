'use strict';

angular.module('Doob.commonbusinessentities')


.controller('ctrlCharacteristic',['$scope', '$rootScope', '$modal', 'dialogs', 'CheckSelected', 'ServiceCharacteristic',
    function($scope, $rootScope, $modal, dialogs, CheckSelected, ServiceCharacteristic) {

	// main entity (characteristic) properties names and labels
	$scope.itemDefinition = {
		label: 'commonbusinessentities.characteristic',
		properties: [
			{ label: 'cValue', name:'CValue', inTable:  true  },
		]
	};

	// identification with properties names and labels
	$scope.identificationDefinition = {
		label: 'commonbusinessentities.identification',
		properties : [
			{ label: 'iIdentificationCode', name:'IIdentificationCode' },
		]
	};
	// registarKarakteristike with properties names and labels
	$scope.registarKarakteristikeDefinition = {
		label: 'commonbusinessentities.characteristicsRegistry',
		properties : [
			{ label: 'cRIdentificationNumber', name:'CRIdentificationNumber' },
			{ label: 'cRName', name:'CRName' },
		]
	};

	// fill table with data
	$scope.items = [];
	$scope.loaded = false;
	var getCharacteristics = function() {
		if(!$scope.loaded && $scope.items.length === 0) {
			$scope.isLoading = true;
			ServiceCharacteristic.query(function(data) {
				$scope.items = data;
				$scope.isLoading = false;
				$scope.loaded = true;
			});
		}
	};
	getCharacteristics();

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

	$scope.$watch('CharacteristicCollection', function() {
		$scope.itemEdit = CheckSelected.checkSelectedInTable($scope.itemEdit, $scope.CharacteristicCollection, $scope.items);
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
			templateUrl: 'commonbusinessentities/characteristic/tmplCharacteristicEdit.tpl.html',
			size: 'lg',
			windowClass: 'hmodal-info',
			controller: 'ctrlCharacteristicEdit',
			resolve: {
				itemEdit: function() {
					if(isNew) {
						return new ServiceCharacteristic();
					} else {
						return $scope.itemEdit;
					}
				},
				identificationDefinition: function() {
					return $scope.identificationDefinition;
				},
				registarKarakteristikeDefinition: function() {
					return $scope.registarKarakteristikeDefinition;
				},
			}
		})
		.result.then(function(result) {
			if(!angular.isDefined(result.id)) {
				ServiceCharacteristic.saveCustom('stockmanagement/characteristics', result, function(savedObject) {
					$scope.items.unshift(savedObject);
					if($scope.itemEdit !== null) {
						var index = $scope.items.map(function(it) { return it.id; }).indexOf($scope.itemEdit.id);
						$scope.items[index].isSelected = false;
					}
					$scope.itemEdit = angular.extend(savedObject);
					$scope.items[0].isSelected = true;
				});
			 } else {
				 ServiceCharacteristic.updateCustom('stockmanagement/characteristics/'+result.id, result, function(savedObject) {
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


.controller('ctrlCharacteristicEdit',['$scope', 'Localization', '$modal', '$modalInstance', 'dialogs',
	'ServiceCharacteristic', 'ServiceIdentification', 'ServiceCharacteristicsRegistry',   'identificationDefinition',  'registarKarakteristikeDefinition',   'itemEdit',
function($scope, Localization, $modal, $modalInstance, dialogs,
	ServiceCharacteristic, ServiceIdentification, ServiceCharacteristicsRegistry,  identificationDefinition,  registarKarakteristikeDefinition,  itemEdit) {

	// dialog mode
	$scope.mode = 'edit';

	// original item state
	var original = angular.copy(itemEdit);
	// item state
	$scope.itemEdit = angular.copy(original);

	// identification with properties
	$scope.identificationDefinition = identificationDefinition;
	// registarKarakteristike with properties
	$scope.registarKarakteristikeDefinition = registarKarakteristikeDefinition;

	// datepicker logic

	// date properties

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
            templateUrl: 'commonbusinessentities/characteristic/tmplIdentificationChoose.tpl.html',
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


	// Choose registarKarakteristike
	$scope.openChooseRegistarKarakteristikeDialog = function() {
        $modal.open({
            backdrop: 'static',
            keyboard : false,
            templateUrl: 'commonbusinessentities/characteristic/tmplCharacteristicsRegistryChoose.tpl.html',
            size: 'lg',
            controller: 'ctrlCharacteristicsRegistryChoose',
            windowClass: 'hmodal-info',
            resolve: {
				itemEdit: function() {
					if(angular.isDefined($scope.itemEdit.registarKarakteristike)){
						return $scope.itemEdit.registarKarakteristike;
					}
				}
			}
		}).result.then(function(result) {
			$scope.itemEdit.registarKarakteristike = angular.copy(result);
		});
    };


	// Save Button
	$scope.save = function() {
	   //	delete $scope.itemEdit.isSelected;
		$modalInstance.close($scope.itemEdit);
	};


	$scope.canSave = function() {
		var item = $scope.itemEdit;
		return                 item.CValue  ;
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


.controller('ctrlCharacteristicChoose', ['$scope','ServiceCharacteristic', 'dialogs', '$modal', '$modalInstance', 'itemEdit',
function($scope, ServiceCharacteristic, dialogs, $modal,  $modalInstance, itemEdit) {

    // entity with properties
    $scope.itemDefinition = {
        label: 'commonbusinessentities.characteristic',
        properties: [
            { label: 'cValue', name:'CValue', inTable:  true  },
        ]
    };

	$scope.items = [];
	$scope.itemEdit = {};

	// fill table with data
	$scope.loaded = false;
	var getCharacteristics = function() {
		if(!$scope.loaded && $scope.items.length === 0) {
			$scope.isLoading = true;
			ServiceCharacteristic.query(function(data) {
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
	getCharacteristics();

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