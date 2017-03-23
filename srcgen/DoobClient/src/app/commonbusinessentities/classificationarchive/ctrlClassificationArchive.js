'use strict';

angular.module('Doob.commonbusinessentities')


.controller('ctrlClassificationArchive',['$scope', '$rootScope', '$modal', 'dialogs', 'CheckSelected', 'ServiceClassificationArchive',
    function($scope, $rootScope, $modal, dialogs, CheckSelected, ServiceClassificationArchive) {

	// main entity (classificationArchive) properties names and labels
	$scope.itemDefinition = {
		label: 'commonbusinessentities.classificationArchive',
		properties: [
			{ label: 'cATime', name:'CATime', inTable:  true  },
			{ label: 'cAName', name:'CAName', inTable:  true  },
			{ label: 'cAShortName', name:'CAShortName', inTable:  false  },
			{ label: 'cAFinalClassification', name:'CAFinalClassification', inTable:  false  },
			{ label: 'cAIsAutomatic', name:'CAIsAutomatic', inTable:  false  },
			{ label: 'cANameFormat', name:'CANameFormat', inTable:  false  },
			{ label: 'cAOperation', name:'CAOperation', inTable:  false  },
			{ label: 'cAIdentificationCodeArchive', name:'CAIdentificationCodeArchive', inTable:  false  },
		]
	};

	// currentValue with properties names and labels
	$scope.currentValueDefinition = {
		label: 'commonbusinessentities.classification',
		properties : [
			{ label: 'cIdentificationCode', name:'CIdentificationCode' },
		]
	};

	// fill table with data
	$scope.items = [];
	$scope.loaded = false;
	var getClassificationArchives = function() {
		if(!$scope.loaded && $scope.items.length === 0) {
			$scope.isLoading = true;
			ServiceClassificationArchive.query(function(data) {
				$scope.items = data;
				$scope.isLoading = false;
				$scope.loaded = true;
			});
		}
	};
	getClassificationArchives();

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

	$scope.$watch('ClassificationArchiveCollection', function() {
		$scope.itemEdit = CheckSelected.checkSelectedInTable($scope.itemEdit, $scope.ClassificationArchiveCollection, $scope.items);
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
			templateUrl: 'commonbusinessentities/classificationarchive/tmplClassificationArchiveEdit.tpl.html',
			size: 'lg',
			windowClass: 'hmodal-info',
			controller: 'ctrlClassificationArchiveEdit',
			resolve: {
				itemEdit: function() {
					if(isNew) {
						return new ServiceClassificationArchive();
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
				ServiceClassificationArchive.saveCustom('stockmanagement/classificationarchives', result, function(savedObject) {
					$scope.items.unshift(savedObject);
					if($scope.itemEdit !== null) {
						var index = $scope.items.map(function(it) { return it.id; }).indexOf($scope.itemEdit.id);
						$scope.items[index].isSelected = false;
					}
					$scope.itemEdit = angular.extend(savedObject);
					$scope.items[0].isSelected = true;
				});
			 } else {
				 ServiceClassificationArchive.updateCustom('stockmanagement/classificationarchives/'+result.id, result, function(savedObject) {
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


.controller('ctrlClassificationArchiveEdit',['$scope', 'Localization', '$modal', '$modalInstance', 'dialogs',
	'ServiceClassificationArchive', 'ServiceClassification',   'currentValueDefinition',   'itemEdit',
function($scope, Localization, $modal, $modalInstance, dialogs,
	ServiceClassificationArchive, ServiceClassification,  currentValueDefinition,  itemEdit) {

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
	$scope.openedCATime = false;

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
            templateUrl: 'commonbusinessentities/classificationarchive/tmplClassificationChoose.tpl.html',
            size: 'lg',
            controller: 'ctrlClassificationChoose',
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
		correctDateTime($scope.itemEdit.CATime);
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
		return                 item.CATime  &&                 item.CAName  ;
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


.controller('ctrlClassificationArchiveChoose', ['$scope','ServiceClassificationArchive', 'dialogs', '$modal', '$modalInstance', 'itemEdit',
function($scope, ServiceClassificationArchive, dialogs, $modal,  $modalInstance, itemEdit) {

    // entity with properties
    $scope.itemDefinition = {
        label: 'commonbusinessentities.classificationArchive',
        properties: [
            { label: 'cATime', name:'CATime', inTable:  true  },
            { label: 'cAName', name:'CAName', inTable:  true  },
            { label: 'cAShortName', name:'CAShortName', inTable:  false  },
            { label: 'cAFinalClassification', name:'CAFinalClassification', inTable:  false  },
            { label: 'cAIsAutomatic', name:'CAIsAutomatic', inTable:  false  },
            { label: 'cANameFormat', name:'CANameFormat', inTable:  false  },
            { label: 'cAOperation', name:'CAOperation', inTable:  false  },
            { label: 'cAIdentificationCodeArchive', name:'CAIdentificationCodeArchive', inTable:  false  },
        ]
    };

	$scope.items = [];
	$scope.itemEdit = {};

	// fill table with data
	$scope.loaded = false;
	var getClassificationArchives = function() {
		if(!$scope.loaded && $scope.items.length === 0) {
			$scope.isLoading = true;
			ServiceClassificationArchive.query(function(data) {
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
	getClassificationArchives();

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