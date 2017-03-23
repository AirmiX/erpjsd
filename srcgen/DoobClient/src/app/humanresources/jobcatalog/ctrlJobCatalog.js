'use strict';

angular.module('Doob.humanresources')


.controller('ctrlJobCatalog',['$scope', '$rootScope', '$modal', 'dialogs', 'CheckSelected', 'ServiceJobCatalog',
    function($scope, $rootScope, $modal, dialogs, CheckSelected, ServiceJobCatalog) {

	// main entity (jobCatalog) properties names and labels
	$scope.itemDefinition = {
		label: 'humanresources.jobCatalog',
		properties: [
			{ label: 'jCIdentificationCode', name:'JCIdentificationCode', inTable:  true  },
			{ label: 'jCCode', name:'JCCode', inTable:  true  },
			{ label: 'jCDescription', name:'JCDescription', inTable:  true  },
			{ label: 'jCClassification', name:'JCClassification', inTable:  true  },
		]
	};

	// workstations with properties names and labels
	$scope.workstationsDefinition = {
		label: 'humanresources.workstation',
		properties : [
			{ label: 'wOrdinalNumber', name:'WOrdinalNumber' },
			{ label: 'wName', name:'WName' },
			{ label: 'wNumberOfPerformers', name:'WNumberOfPerformers' },
		]
	};

	// fill table with data
	$scope.items = [];
	$scope.loaded = false;
	var getJobCatalogs = function() {
		if(!$scope.loaded && $scope.items.length === 0) {
			$scope.isLoading = true;
			ServiceJobCatalog.query(function(data) {
				$scope.items = data;
				$scope.isLoading = false;
				$scope.loaded = true;
			});
		}
	};
	getJobCatalogs();

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

	$scope.$watch('JobCatalogCollection', function() {
		$scope.itemEdit = CheckSelected.checkSelectedInTable($scope.itemEdit, $scope.JobCatalogCollection, $scope.items);
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
			templateUrl: 'humanresources/jobcatalog/tmplJobCatalogEdit.tpl.html',
			size: 'lg',
			windowClass: 'hmodal-info',
			controller: 'ctrlJobCatalogEdit',
			resolve: {
				itemEdit: function() {
					if(isNew) {
						return new ServiceJobCatalog();
					} else {
						return $scope.itemEdit;
					}
				},
				workstationsDefinition: function() {
					return $scope.workstationsDefinition;
				},
			}
		})
		.result.then(function(result) {
			if(!angular.isDefined(result.id)) {
				ServiceJobCatalog.saveCustom('stockmanagement/jobcatalogs', result, function(savedObject) {
					$scope.items.unshift(savedObject);
					if($scope.itemEdit !== null) {
						var index = $scope.items.map(function(it) { return it.id; }).indexOf($scope.itemEdit.id);
						$scope.items[index].isSelected = false;
					}
					$scope.itemEdit = angular.extend(savedObject);
					$scope.items[0].isSelected = true;
				});
			 } else {
				 ServiceJobCatalog.updateCustom('stockmanagement/jobcatalogs/'+result.id, result, function(savedObject) {
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


.controller('ctrlJobCatalogEdit',['$scope', 'Localization', '$modal', '$modalInstance', 'dialogs',
	'ServiceJobCatalog', 'ServiceWorkstation',   'workstationsDefinition',   'itemEdit',
function($scope, Localization, $modal, $modalInstance, dialogs,
	ServiceJobCatalog, ServiceWorkstation,  workstationsDefinition,  itemEdit) {

	// dialog mode
	$scope.mode = 'edit';

	// original item state
	var original = angular.copy(itemEdit);
	// item state
	$scope.itemEdit = angular.copy(original);

	// workstations with properties
	$scope.workstationsDefinition = workstationsDefinition;

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
        for(i in $scope.itemEdit.workstations) {
    		item = $scope.itemEdit.workstations[i];
    		delete item.isSelected;
    	}
		$modalInstance.close($scope.itemEdit);
	};


	$scope.canSave = function() {
		var item = $scope.itemEdit;
		return                 item.JCIdentificationCode  &&                 item.JCCode  &&                 item.JCDescription  &&                 item.JCClassification  ;
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


.controller('ctrlJobCatalogChoose', ['$scope','ServiceJobCatalog', 'dialogs', '$modal', '$modalInstance', 'itemEdit',
function($scope, ServiceJobCatalog, dialogs, $modal,  $modalInstance, itemEdit) {

    // entity with properties
    $scope.itemDefinition = {
        label: 'humanresources.jobCatalog',
        properties: [
            { label: 'jCIdentificationCode', name:'JCIdentificationCode', inTable:  true  },
            { label: 'jCCode', name:'JCCode', inTable:  true  },
            { label: 'jCDescription', name:'JCDescription', inTable:  true  },
            { label: 'jCClassification', name:'JCClassification', inTable:  true  },
        ]
    };

	$scope.items = [];
	$scope.itemEdit = {};

	// fill table with data
	$scope.loaded = false;
	var getJobCatalogs = function() {
		if(!$scope.loaded && $scope.items.length === 0) {
			$scope.isLoading = true;
			ServiceJobCatalog.query(function(data) {
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
	getJobCatalogs();

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