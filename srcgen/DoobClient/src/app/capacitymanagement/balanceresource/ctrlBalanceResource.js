'use strict';

angular.module('Doob.capacitymanagement')


.controller('ctrlBalanceResource',['$scope', '$rootScope', '$modal', 'dialogs', 'CheckSelected', 'ServiceBalanceResource',
    function($scope, $rootScope, $modal, dialogs, CheckSelected, ServiceBalanceResource) {

	// main entity (balanceResource) properties names and labels
	$scope.itemDefinition = {
		label: 'capacitymanagement.balanceResource',
		properties: [
			{ label: 'bRBalanceUnit', name:'BRBalanceUnit', inTable:  true  },
			{ label: 'bRResourceType', name:'BRResourceType', inTable:  true  },
			{ label: 'bRStartDate', name:'BRStartDate', inTable:  true  },
			{ label: 'bREndDate', name:'BREndDate', inTable:  false  },
		]
	};

	// schoolDegree with properties names and labels
	$scope.schoolDegreeDefinition = {
		label: 'humanresources.schoolDegree',
		properties : [
			{ label: 'sDCode', name:'SDCode' },
			{ label: 'sDName', name:'SDName' },
		]
	};
	// profession with properties names and labels
	$scope.professionDefinition = {
		label: 'humanresources.occupation',
		properties : [
			{ label: 'oCode', name:'OCode' },
			{ label: 'oName', name:'OName' },
		]
	};
	// workCenter with properties names and labels
	$scope.workCenterDefinition = {
		label: 'productiondata.workCenter',
		properties : [
			{ label: 'wCIndentificationCode', name:'WCIndentificationCode' },
			{ label: 'wCShortName', name:'WCShortName' },
			{ label: 'wCName', name:'WCName' },
			{ label: 'wCWorkingDayLenght', name:'WCWorkingDayLenght' },
			{ label: 'wCWorkingWeekLenght', name:'WCWorkingWeekLenght' },
			{ label: 'wCShiftsNumber', name:'WCShiftsNumber' },
			{ label: 'wCWorkStationsNumber', name:'WCWorkStationsNumber' },
			{ label: 'wCNumberOfEmployees', name:'WCNumberOfEmployees' },
			{ label: 'wCNumberOfSteps', name:'WCNumberOfSteps' },
			{ label: 'wCAverageWaitingTimeInFrontOfWorkCenter', name:'WCAverageWaitingTimeInFrontOfWorkCenter' },
			{ label: 'wCMaterialTransferAverageTime', name:'WCMaterialTransferAverageTime' },
			{ label: 'wCTechnicalCapacity', name:'WCTechnicalCapacity' },
			{ label: 'wCAvailableCapacity', name:'WCAvailableCapacity' },
			{ label: 'wCLoadAnalysisIndicator', name:'WCLoadAnalysisIndicator' },
			{ label: 'wCDataCompletenessStatus', name:'WCDataCompletenessStatus' },
			{ label: 'wCActitvityStatus', name:'WCActitvityStatus' },
		]
	};
	// productionProcessType with properties names and labels
	$scope.productionProcessTypeDefinition = {
		label: 'productiondata.productionProcessType',
		properties : [
			{ label: 'pPTDesignation', name:'PPTDesignation' },
			{ label: 'pPTName', name:'PPTName' },
			{ label: 'pPTShortName', name:'PPTShortName' },
		]
	};
	// identification with properties names and labels
	$scope.identificationDefinition = {
		label: 'commonbusinessentities.identification',
		properties : [
			{ label: 'iIdentificationCode', name:'IIdentificationCode' },
		]
	};

	// fill table with data
	$scope.items = [];
	$scope.loaded = false;
	var getBalanceResources = function() {
		if(!$scope.loaded && $scope.items.length === 0) {
			$scope.isLoading = true;
			ServiceBalanceResource.query(function(data) {
				$scope.items = data;
				$scope.isLoading = false;
				$scope.loaded = true;
			});
		}
	};
	getBalanceResources();

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

	$scope.$watch('BalanceResourceCollection', function() {
		$scope.itemEdit = CheckSelected.checkSelectedInTable($scope.itemEdit, $scope.BalanceResourceCollection, $scope.items);
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
			templateUrl: 'capacitymanagement/balanceresource/tmplBalanceResourceEdit.tpl.html',
			size: 'lg',
			windowClass: 'hmodal-info',
			controller: 'ctrlBalanceResourceEdit',
			resolve: {
				itemEdit: function() {
					if(isNew) {
						return new ServiceBalanceResource();
					} else {
						return $scope.itemEdit;
					}
				},
				schoolDegreeDefinition: function() {
					return $scope.schoolDegreeDefinition;
				},
				professionDefinition: function() {
					return $scope.professionDefinition;
				},
				workCenterDefinition: function() {
					return $scope.workCenterDefinition;
				},
				productionProcessTypeDefinition: function() {
					return $scope.productionProcessTypeDefinition;
				},
				identificationDefinition: function() {
					return $scope.identificationDefinition;
				},
			}
		})
		.result.then(function(result) {
			if(!angular.isDefined(result.id)) {
				ServiceBalanceResource.saveCustom('stockmanagement/balanceresources', result, function(savedObject) {
					$scope.items.unshift(savedObject);
					if($scope.itemEdit !== null) {
						var index = $scope.items.map(function(it) { return it.id; }).indexOf($scope.itemEdit.id);
						$scope.items[index].isSelected = false;
					}
					$scope.itemEdit = angular.extend(savedObject);
					$scope.items[0].isSelected = true;
				});
			 } else {
				 ServiceBalanceResource.updateCustom('stockmanagement/balanceresources/'+result.id, result, function(savedObject) {
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


.controller('ctrlBalanceResourceEdit',['$scope', 'Localization', '$modal', '$modalInstance', 'dialogs',
	'ServiceBalanceResource', 'ServiceSchoolDegree', 'ServiceOccupation', 'ServiceWorkCenter', 'ServiceProductionProcessType', 'ServiceIdentification',   'schoolDegreeDefinition',  'professionDefinition',  'workCenterDefinition',  'productionProcessTypeDefinition',  'identificationDefinition',   'itemEdit',
function($scope, Localization, $modal, $modalInstance, dialogs,
	ServiceBalanceResource, ServiceSchoolDegree, ServiceOccupation, ServiceWorkCenter, ServiceProductionProcessType, ServiceIdentification,  schoolDegreeDefinition,  professionDefinition,  workCenterDefinition,  productionProcessTypeDefinition,  identificationDefinition,  itemEdit) {

	// dialog mode
	$scope.mode = 'edit';

	// original item state
	var original = angular.copy(itemEdit);
	// item state
	$scope.itemEdit = angular.copy(original);

	// schoolDegree with properties
	$scope.schoolDegreeDefinition = schoolDegreeDefinition;
	// profession with properties
	$scope.professionDefinition = professionDefinition;
	// workCenter with properties
	$scope.workCenterDefinition = workCenterDefinition;
	// productionProcessType with properties
	$scope.productionProcessTypeDefinition = productionProcessTypeDefinition;
	// identification with properties
	$scope.identificationDefinition = identificationDefinition;

	// datepicker logic

	// date properties
	$scope.openedBRStartDate = false;

	$scope.open = function($event, opened) {
		$event.preventDefault();
		$event.stopPropagation();
		$scope[opened] = true;
	};



	// Choose schoolDegree
	$scope.openChooseSchoolDegreeDialog = function() {
        $modal.open({
            backdrop: 'static',
            keyboard : false,
            templateUrl: 'humanresources/balanceresource/tmplSchoolDegreeChoose.tpl.html',
            size: 'lg',
            controller: 'ctrlSchoolDegreeChoose',
            windowClass: 'hmodal-info',
            resolve: {
				itemEdit: function() {
					if(angular.isDefined($scope.itemEdit.schoolDegree)){
						return $scope.itemEdit.schoolDegree;
					}
				}
			}
		}).result.then(function(result) {
			$scope.itemEdit.schoolDegree = angular.copy(result);
		});
    };


	// Choose profession
	$scope.openChooseProfessionDialog = function() {
        $modal.open({
            backdrop: 'static',
            keyboard : false,
            templateUrl: 'humanresources/balanceresource/tmplOccupationChoose.tpl.html',
            size: 'lg',
            controller: 'ctrlOccupationChoose',
            windowClass: 'hmodal-info',
            resolve: {
				itemEdit: function() {
					if(angular.isDefined($scope.itemEdit.profession)){
						return $scope.itemEdit.profession;
					}
				}
			}
		}).result.then(function(result) {
			$scope.itemEdit.profession = angular.copy(result);
		});
    };


	// Choose workCenter
	$scope.openChooseWorkCenterDialog = function() {
        $modal.open({
            backdrop: 'static',
            keyboard : false,
            templateUrl: 'productiondata/balanceresource/tmplWorkCenterChoose.tpl.html',
            size: 'lg',
            controller: 'ctrlWorkCenterChoose',
            windowClass: 'hmodal-info',
            resolve: {
				itemEdit: function() {
					if(angular.isDefined($scope.itemEdit.workCenter)){
						return $scope.itemEdit.workCenter;
					}
				}
			}
		}).result.then(function(result) {
			$scope.itemEdit.workCenter = angular.copy(result);
		});
    };


	// Choose productionProcessType
	$scope.openChooseProductionProcessTypeDialog = function() {
        $modal.open({
            backdrop: 'static',
            keyboard : false,
            templateUrl: 'productiondata/balanceresource/tmplProductionProcessTypeChoose.tpl.html',
            size: 'lg',
            controller: 'ctrlProductionProcessTypeChoose',
            windowClass: 'hmodal-info',
            resolve: {
				itemEdit: function() {
					if(angular.isDefined($scope.itemEdit.productionProcessType)){
						return $scope.itemEdit.productionProcessType;
					}
				}
			}
		}).result.then(function(result) {
			$scope.itemEdit.productionProcessType = angular.copy(result);
		});
    };


	// Choose identification
	$scope.openChooseIdentificationDialog = function() {
        $modal.open({
            backdrop: 'static',
            keyboard : false,
            templateUrl: 'commonbusinessentities/balanceresource/tmplIdentificationChoose.tpl.html',
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


	// Save Button
	$scope.save = function() {
		correctDateTime($scope.itemEdit.BRStartDate);
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
		return                 item.BRBalanceUnit  &&                 item.BRResourceType  &&                 item.BRStartDate  ;
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


.controller('ctrlBalanceResourceChoose', ['$scope','ServiceBalanceResource', 'dialogs', '$modal', '$modalInstance', 'itemEdit',
function($scope, ServiceBalanceResource, dialogs, $modal,  $modalInstance, itemEdit) {

    // entity with properties
    $scope.itemDefinition = {
        label: 'capacitymanagement.balanceResource',
        properties: [
            { label: 'bRBalanceUnit', name:'BRBalanceUnit', inTable:  true  },
            { label: 'bRResourceType', name:'BRResourceType', inTable:  true  },
            { label: 'bRStartDate', name:'BRStartDate', inTable:  true  },
            { label: 'bREndDate', name:'BREndDate', inTable:  false  },
        ]
    };

	$scope.items = [];
	$scope.itemEdit = {};

	// fill table with data
	$scope.loaded = false;
	var getBalanceResources = function() {
		if(!$scope.loaded && $scope.items.length === 0) {
			$scope.isLoading = true;
			ServiceBalanceResource.query(function(data) {
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
	getBalanceResources();

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