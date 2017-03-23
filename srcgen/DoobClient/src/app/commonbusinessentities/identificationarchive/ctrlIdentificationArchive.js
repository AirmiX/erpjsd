'use strict';

angular.module('Doob.commonbusinessentities')


.controller('ctrlIdentificationArchive',['$scope', '$rootScope', '$modal', 'dialogs', 'CheckSelected', 'ServiceIdentificationArchive',
    function($scope, $rootScope, $modal, dialogs, CheckSelected, ServiceIdentificationArchive) {

	// main entity (identificationArchive) properties names and labels
	$scope.itemDefinition = {
		label: 'commonbusinessentities.identificationArchive',
		properties: [
			{ label: 'iATime', name:'IATime', inTable:  true  },
			{ label: 'iAName', name:'IAName', inTable:  false  },
			{ label: 'iAShortName', name:'IAShortName', inTable:  false  },
			{ label: 'iAParallelCode', name:'IAParallelCode', inTable:  false  },
			{ label: 'iADrawingIdentificationNumber', name:'IADrawingIdentificationNumber', inTable:  false  },
			{ label: 'iAOperation', name:'IAOperation', inTable:  false  },
			{ label: 'iAIdentificationCodeArchive', name:'IAIdentificationCodeArchive', inTable:  false  },
			{ label: 'iIsPayable', name:'IIsPayable', inTable:  false  },
		]
	};

	// currentValue with properties names and labels
	$scope.currentValueDefinition = {
		label: 'commonbusinessentities.identification',
		properties : [
			{ label: 'iIdentificationCode', name:'IIdentificationCode' },
		]
	};

	// fill table with data
	$scope.items = [];
	$scope.loaded = false;
	var getIdentificationArchives = function() {
		if(!$scope.loaded && $scope.items.length === 0) {
			$scope.isLoading = true;
			ServiceIdentificationArchive.query(function(data) {
				$scope.items = data;
				$scope.isLoading = false;
				$scope.loaded = true;
			});
		}
	};
	getIdentificationArchives();

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

	$scope.$watch('IdentificationArchiveCollection', function() {
		$scope.itemEdit = CheckSelected.checkSelectedInTable($scope.itemEdit, $scope.IdentificationArchiveCollection, $scope.items);
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
			templateUrl: 'commonbusinessentities/identificationarchive/tmplIdentificationArchiveEdit.tpl.html',
			size: 'lg',
			windowClass: 'hmodal-info',
			controller: 'ctrlIdentificationArchiveEdit',
			resolve: {
				itemEdit: function() {
					if(isNew) {
						return new ServiceIdentificationArchive();
					} else {
						return $scope.itemEdit;
					}
				},
				currentValueDefinition: function() {
					return $scope.currentValueDefinition;
				},
			}
		})
		.result.then(function(result) {
			if(!angular.isDefined(result.id)) {
				ServiceIdentificationArchive.saveCustom('stockmanagement/identificationarchives', result, function(savedObject) {
					$scope.items.unshift(savedObject);
					if($scope.itemEdit !== null) {
						var index = $scope.items.map(function(it) { return it.id; }).indexOf($scope.itemEdit.id);
						$scope.items[index].isSelected = false;
					}
					$scope.itemEdit = angular.extend(savedObject);
					$scope.items[0].isSelected = true;
				});
			 } else {
				 ServiceIdentificationArchive.updateCustom('stockmanagement/identificationarchives/'+result.id, result, function(savedObject) {
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


.controller('ctrlIdentificationArchiveEdit',['$scope', 'Localization', '$modal', '$modalInstance', 'dialogs',
	'ServiceIdentificationArchive', 'ServiceIdentification',   'currentValueDefinition',   'itemEdit',
function($scope, Localization, $modal, $modalInstance, dialogs,
	ServiceIdentificationArchive, ServiceIdentification,  currentValueDefinition,  itemEdit) {

	// dialog mode
	$scope.mode = 'edit';

	// original item state
	var original = angular.copy(itemEdit);
	// item state
	$scope.itemEdit = angular.copy(original);

	// currentValue with properties
	$scope.currentValueDefinition = currentValueDefinition;

	// datepicker logic

	// date properties
	$scope.openedIATime = false;

	$scope.open = function($event, opened) {
		$event.preventDefault();
		$event.stopPropagation();
		$scope[opened] = true;
	};



	// Choose currentValue
	$scope.openChooseCurrentValueDialog = function() {
        $modal.open({
            backdrop: 'static',
            keyboard : false,
            templateUrl: 'commonbusinessentities/identificationarchive/tmplIdentificationChoose.tpl.html',
            size: 'lg',
            controller: 'ctrlIdentificationChoose',
            windowClass: 'hmodal-info',
            resolve: {
				itemEdit: function() {
					if(angular.isDefined($scope.itemEdit.currentValue)){
						return $scope.itemEdit.currentValue;
					}
				}
			}
		}).result.then(function(result) {
			$scope.itemEdit.currentValue = angular.copy(result);
		});
    };


	// Save Button
	$scope.save = function() {
		correctDateTime($scope.itemEdit.IATime);
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
		return                 item.IATime  ;
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


.controller('ctrlIdentificationArchiveChoose', ['$scope','ServiceIdentificationArchive', 'dialogs', '$modal', '$modalInstance', 'itemEdit',
function($scope, ServiceIdentificationArchive, dialogs, $modal,  $modalInstance, itemEdit) {

    // entity with properties
    $scope.itemDefinition = {
        label: 'commonbusinessentities.identificationArchive',
        properties: [
            { label: 'iATime', name:'IATime', inTable:  true  },
            { label: 'iAName', name:'IAName', inTable:  false  },
            { label: 'iAShortName', name:'IAShortName', inTable:  false  },
            { label: 'iAParallelCode', name:'IAParallelCode', inTable:  false  },
            { label: 'iADrawingIdentificationNumber', name:'IADrawingIdentificationNumber', inTable:  false  },
            { label: 'iAOperation', name:'IAOperation', inTable:  false  },
            { label: 'iAIdentificationCodeArchive', name:'IAIdentificationCodeArchive', inTable:  false  },
            { label: 'iIsPayable', name:'IIsPayable', inTable:  false  },
        ]
    };

	$scope.items = [];
	$scope.itemEdit = {};

	// fill table with data
	$scope.loaded = false;
	var getIdentificationArchives = function() {
		if(!$scope.loaded && $scope.items.length === 0) {
			$scope.isLoading = true;
			ServiceIdentificationArchive.query(function(data) {
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
	getIdentificationArchives();

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