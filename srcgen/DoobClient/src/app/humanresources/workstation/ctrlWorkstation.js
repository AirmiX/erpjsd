'use strict';

angular.module('Doob.humanresources')


.controller('ctrlWorkstation',['$scope', '$rootScope', '$modal', 'dialogs', 'CheckSelected', 'ServiceWorkstation',
    function($scope, $rootScope, $modal, dialogs, CheckSelected, ServiceWorkstation) {

	// main entity (workstation) properties names and labels
	$scope.itemDefinition = {
		label: 'humanresources.workstation',
		properties: [
			{ label: 'wOrdinalNumber', name:'WOrdinalNumber', inTable:  true  },
			{ label: 'wName', name:'WName', inTable:  true  },
			{ label: 'wNumberOfPerformers', name:'WNumberOfPerformers', inTable:  true  },
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
	// job with properties names and labels
	$scope.jobDefinition = {
		label: 'humanresources.jobCatalog',
		properties : [
			{ label: 'jCIdentificationCode', name:'JCIdentificationCode' },
			{ label: 'jCCode', name:'JCCode' },
			{ label: 'jCDescription', name:'JCDescription' },
			{ label: 'jCClassification', name:'JCClassification' },
		]
	};
	// workstationDescriptions with properties names and labels
	$scope.workstationDescriptionsDefinition = {
		label: 'humanresources.workstationDescription',
		properties : [
			{ label: 'wDOrdinalNumber', name:'WDOrdinalNumber' },
			{ label: 'wDDescription', name:'WDDescription' },
		]
	};
	// workstationDemands with properties names and labels
	$scope.workstationDemandsDefinition = {
		label: 'humanresources.workstationDemand',
		properties : [
			{ label: 'wDOrdinalNumber', name:'WDOrdinalNumber' },
			{ label: 'wDDescription', name:'WDDescription' },
		]
	};
	// employees with properties names and labels
	$scope.employeesDefinition = {
		label: 'corporation.employee',
		properties : [
			{ label: 'ePersonellNumber', name:'EPersonellNumber' },
			{ label: 'eName', name:'EName' },
			{ label: 'eLastName', name:'ELastName' },
			{ label: 'eDateOfBirth', name:'EDateOfBirth' },
		]
	};

	// fill table with data
	$scope.items = [];
	$scope.loaded = false;
	var getWorkstations = function() {
		if(!$scope.loaded && $scope.items.length === 0) {
			$scope.isLoading = true;
			ServiceWorkstation.query(function(data) {
				$scope.items = data;
				$scope.isLoading = false;
				$scope.loaded = true;
			});
		}
	};
	getWorkstations();

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

	$scope.$watch('WorkstationCollection', function() {
		$scope.itemEdit = CheckSelected.checkSelectedInTable($scope.itemEdit, $scope.WorkstationCollection, $scope.items);
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
			templateUrl: 'humanresources/workstation/tmplWorkstationEdit.tpl.html',
			size: 'lg',
			windowClass: 'hmodal-info',
			controller: 'ctrlWorkstationEdit',
			resolve: {
				itemEdit: function() {
					if(isNew) {
						return new ServiceWorkstation();
					} else {
						return $scope.itemEdit;
					}
				},
				organizationUnitDefinition: function() {
					return $scope.organizationUnitDefinition;
				},
				jobDefinition: function() {
					return $scope.jobDefinition;
				},
				workstationDescriptionsDefinition: function() {
					return $scope.workstationDescriptionsDefinition;
				},
				workstationDemandsDefinition: function() {
					return $scope.workstationDemandsDefinition;
				},
				employeesDefinition: function() {
					return $scope.employeesDefinition;
				},
			}
		})
		.result.then(function(result) {
			if(!angular.isDefined(result.id)) {
				ServiceWorkstation.saveCustom('stockmanagement/workstations', result, function(savedObject) {
					$scope.items.unshift(savedObject);
					if($scope.itemEdit !== null) {
						var index = $scope.items.map(function(it) { return it.id; }).indexOf($scope.itemEdit.id);
						$scope.items[index].isSelected = false;
					}
					$scope.itemEdit = angular.extend(savedObject);
					$scope.items[0].isSelected = true;
				});
			 } else {
				 ServiceWorkstation.updateCustom('stockmanagement/workstations/'+result.id, result, function(savedObject) {
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


.controller('ctrlWorkstationEdit',['$scope', 'Localization', '$modal', '$modalInstance', 'dialogs',
	'ServiceWorkstation', 'ServiceOrganizationUnit', 'ServiceJobCatalog', 'ServiceWorkstationDescription', 'ServiceWorkstationDemand', 'ServiceEmployee',   'organizationUnitDefinition',  'jobDefinition',  'workstationDescriptionsDefinition',  'workstationDemandsDefinition',  'employeesDefinition',   'itemEdit',
function($scope, Localization, $modal, $modalInstance, dialogs,
	ServiceWorkstation, ServiceOrganizationUnit, ServiceJobCatalog, ServiceWorkstationDescription, ServiceWorkstationDemand, ServiceEmployee,  organizationUnitDefinition,  jobDefinition,  workstationDescriptionsDefinition,  workstationDemandsDefinition,  employeesDefinition,  itemEdit) {

	// dialog mode
	$scope.mode = 'edit';

	// original item state
	var original = angular.copy(itemEdit);
	// item state
	$scope.itemEdit = angular.copy(original);

	// organizationUnit with properties
	$scope.organizationUnitDefinition = organizationUnitDefinition;
	// job with properties
	$scope.jobDefinition = jobDefinition;
	// workstationDescriptions with properties
	$scope.workstationDescriptionsDefinition = workstationDescriptionsDefinition;
	// workstationDemands with properties
	$scope.workstationDemandsDefinition = workstationDemandsDefinition;
	// employees with properties
	$scope.employeesDefinition = employeesDefinition;

	// datepicker logic

	// date properties

	$scope.open = function($event, opened) {
		$event.preventDefault();
		$event.stopPropagation();
		$scope[opened] = true;
	};



	// Choose organizationUnit
	$scope.openChooseOrganizationUnitDialog = function() {
        $modal.open({
            backdrop: 'static',
            keyboard : false,
            templateUrl: 'corporation/workstation/tmplOrganizationUnitChoose.tpl.html',
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


	// Choose job
	$scope.openChooseJobDialog = function() {
        $modal.open({
            backdrop: 'static',
            keyboard : false,
            templateUrl: 'humanresources/workstation/tmplJobCatalogChoose.tpl.html',
            size: 'lg',
            controller: 'ctrlJobCatalogChoose',
            windowClass: 'hmodal-info',
            resolve: {
				itemEdit: function() {
					if(angular.isDefined($scope.itemEdit.job)){
						return $scope.itemEdit.job;
					}
				}
			}
		}).result.then(function(result) {
			$scope.itemEdit.job = angular.copy(result);
		});
    };


    $scope.workstationDescriptionEdit = null;

    // workstationDescriptions table selection logic
    $scope.workstationDescriptionSelection = function(item, index) {
        if(item.isSelected) {
            if($scope.workstationDescriptionEdit !== null) {
                var index1 = $scope.itemEdit.workstationDescriptions.map(function(it) { return it.id; }).indexOf($scope.workstationDescriptionEdit.id);
                $scope.itemEdit.workstationDescriptions[index1].isSelected = false;
            }
            $scope.workstationDescriptionEdit = item;
        } else {
            $scope.workstationDescriptionEdit = null;
            item.isSelected = false;
        }
    };

    // New/Edit workstationDescriptions dialog
    $scope.openWorkstationDescriptionEditDialog = function(isNew) {
        $modal.open({
            backdrop: 'static',
            keyboard : false,
            templateUrl: 'humanresources/workstation/tmplWorkstationDescriptionEdit.tpl.html',
            size: 'lg',
            controller: 'ctrlWorkstationDescriptionEdit',
            windowClass: 'hmodal-info',
            resolve: {
                itemEdit: function() {
                    if(isNew) {
                        return new ServiceWorkstationDescription();
                    } else {
                        return $scope.workstationDescriptionEdit;
                    }
                }
            }
        }).result.then(function(result) {
            var i;
            if(isNew) {
                if(!angular.isDefined($scope.itemEdit.workstationDescriptions)) {
                    $scope.itemEdit.workstationDescriptions = [];
                }
                $scope.itemEdit.workstationDescriptions.unshift(result);
                for(i in $scope.itemEdit.workstationDescriptions) {
                    $scope.itemEdit.workstationDescriptions[i].isSelected = false;
                }
                $scope.workstationDescriptionEdit = angular.extend(result);
                $scope.itemEdit.workstationDescriptions[0].isSelected = true;
            }
            else {
                for(i in $scope.itemEdit.workstationDescriptions) {
                    $scope.itemEdit.workstationDescriptions[i].isSelected = false;
                }
                $scope.workstationDescriptionEdit = angular.extend(result);
                var index = $scope.itemEdit.workstationDescriptions.map(function(it) { return it.id; }).indexOf(result.id);
                for(var key in result) {
                    $scope.itemEdit.workstationDescriptions[index][key] = result[key];
                }
                $scope.itemEdit.workstationDescriptions[index].isSelected = true;
            }
        });
    };

    $scope.removeWorkstationDescription = function(item) {
        var dialog = dialogs.confirm('Please confirm', 'Are you sure you want to delete item?');
        dialog.result.then(function(btn) {
            var removeIndex = $scope.itemEdit.workstationDescriptions.map(function(it) { return it.id; }).indexOf(item.id);
            $scope.itemEdit.workstationDescriptions[removeIndex].deleted = true;
        });
    };


    $scope.workstationDemandEdit = null;

    // workstationDemands table selection logic
    $scope.workstationDemandSelection = function(item, index) {
        if(item.isSelected) {
            if($scope.workstationDemandEdit !== null) {
                var index1 = $scope.itemEdit.workstationDemands.map(function(it) { return it.id; }).indexOf($scope.workstationDemandEdit.id);
                $scope.itemEdit.workstationDemands[index1].isSelected = false;
            }
            $scope.workstationDemandEdit = item;
        } else {
            $scope.workstationDemandEdit = null;
            item.isSelected = false;
        }
    };

    // New/Edit workstationDemands dialog
    $scope.openWorkstationDemandEditDialog = function(isNew) {
        $modal.open({
            backdrop: 'static',
            keyboard : false,
            templateUrl: 'humanresources/workstation/tmplWorkstationDemandEdit.tpl.html',
            size: 'lg',
            controller: 'ctrlWorkstationDemandEdit',
            windowClass: 'hmodal-info',
            resolve: {
                itemEdit: function() {
                    if(isNew) {
                        return new ServiceWorkstationDemand();
                    } else {
                        return $scope.workstationDemandEdit;
                    }
                }
            }
        }).result.then(function(result) {
            var i;
            if(isNew) {
                if(!angular.isDefined($scope.itemEdit.workstationDemands)) {
                    $scope.itemEdit.workstationDemands = [];
                }
                $scope.itemEdit.workstationDemands.unshift(result);
                for(i in $scope.itemEdit.workstationDemands) {
                    $scope.itemEdit.workstationDemands[i].isSelected = false;
                }
                $scope.workstationDemandEdit = angular.extend(result);
                $scope.itemEdit.workstationDemands[0].isSelected = true;
            }
            else {
                for(i in $scope.itemEdit.workstationDemands) {
                    $scope.itemEdit.workstationDemands[i].isSelected = false;
                }
                $scope.workstationDemandEdit = angular.extend(result);
                var index = $scope.itemEdit.workstationDemands.map(function(it) { return it.id; }).indexOf(result.id);
                for(var key in result) {
                    $scope.itemEdit.workstationDemands[index][key] = result[key];
                }
                $scope.itemEdit.workstationDemands[index].isSelected = true;
            }
        });
    };

    $scope.removeWorkstationDemand = function(item) {
        var dialog = dialogs.confirm('Please confirm', 'Are you sure you want to delete item?');
        dialog.result.then(function(btn) {
            var removeIndex = $scope.itemEdit.workstationDemands.map(function(it) { return it.id; }).indexOf(item.id);
            $scope.itemEdit.workstationDemands[removeIndex].deleted = true;
        });
    };


	// Save Button
	$scope.save = function() {
	   //	delete $scope.itemEdit.isSelected;
        var item;
        var i;
        for(i in $scope.itemEdit.employees) {
    		item = $scope.itemEdit.employees[i];
    		delete item.isSelected;
    	}
		$modalInstance.close($scope.itemEdit);
	};


	$scope.canSave = function() {
		var item = $scope.itemEdit;
		return                 item.WOrdinalNumber  &&                 item.WName  &&                 item.WNumberOfPerformers  ;
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


.controller('ctrlWorkstationChoose', ['$scope','ServiceWorkstation', 'dialogs', '$modal', '$modalInstance', 'itemEdit',
function($scope, ServiceWorkstation, dialogs, $modal,  $modalInstance, itemEdit) {

    // entity with properties
    $scope.itemDefinition = {
        label: 'humanresources.workstation',
        properties: [
            { label: 'wOrdinalNumber', name:'WOrdinalNumber', inTable:  true  },
            { label: 'wName', name:'WName', inTable:  true  },
            { label: 'wNumberOfPerformers', name:'WNumberOfPerformers', inTable:  true  },
        ]
    };

	$scope.items = [];
	$scope.itemEdit = {};

	// fill table with data
	$scope.loaded = false;
	var getWorkstations = function() {
		if(!$scope.loaded && $scope.items.length === 0) {
			$scope.isLoading = true;
			ServiceWorkstation.query(function(data) {
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
	getWorkstations();

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