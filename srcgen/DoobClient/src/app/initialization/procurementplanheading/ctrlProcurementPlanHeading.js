'use strict';

angular.module('Doob.initialization')


.controller('ctrlProcurementPlanHeading',['$scope', '$rootScope', '$modal', 'dialogs', 'CheckSelected', 'ServiceProcurementPlanHeading',
    function($scope, $rootScope, $modal, dialogs, CheckSelected, ServiceProcurementPlanHeading) {

	// main entity (procurementPlanHeading) properties names and labels
	$scope.itemDefinition = {
		label: 'initialization.procurementPlanHeading',
		properties: [
			{ label: 'pPHDocumentNumber', name:'PPHDocumentNumber', inTable:  true  },
			{ label: 'pPHPlanningDate', name:'PPHPlanningDate', inTable:  true  },
			{ label: 'pPHPlanVersion', name:'PPHPlanVersion', inTable:  true  },
			{ label: 'pPHPrintingStatus', name:'PPHPrintingStatus', inTable:  false  },
		]
	};

	// documentType with properties names and labels
	$scope.documentTypeDefinition = {
		label: 'corporation.documentType',
		properties : [
			{ label: 'dTIdentificationNumber', name:'DTIdentificationNumber' },
			{ label: 'dTName', name:'DTName' },
			{ label: 'dTShortName', name:'DTShortName' },
		]
	};
	// planningPeriod with properties names and labels
	$scope.planningPeriodDefinition = {
		label: 'procurementplan.planningPeriod',
		properties : [
			{ label: 'pPCode', name:'PPCode' },
			{ label: 'pPName', name:'PPName' },
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
	// procurementPlanItems with properties names and labels
	$scope.procurementPlanItemsDefinition = {
		label: 'initialization.procurementPlanItem',
		properties : [
			{ label: 'pPIOrdinalNumber', name:'PPIOrdinalNumber' },
			{ label: 'pPIPlannedQuantity', name:'PPIPlannedQuantity' },
			{ label: 'pPIOrderedQuantity', name:'PPIOrderedQuantity' },
			{ label: 'pPIRecievedQuantity', name:'PPIRecievedQuantity' },
			{ label: 'pPISourceProvider', name:'PPISourceProvider' },
			{ label: 'mUIdentificationCode', name:'MUIdentificationCode' },
		]
	};

	// fill table with data
	$scope.items = [];
	$scope.loaded = false;
	var getProcurementPlanHeadings = function() {
		if(!$scope.loaded && $scope.items.length === 0) {
			$scope.isLoading = true;
			ServiceProcurementPlanHeading.query(function(data) {
				$scope.items = data;
				$scope.isLoading = false;
				$scope.loaded = true;
			});
		}
	};
	getProcurementPlanHeadings();

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

	$scope.$watch('ProcurementPlanHeadingCollection', function() {
		$scope.itemEdit = CheckSelected.checkSelectedInTable($scope.itemEdit, $scope.ProcurementPlanHeadingCollection, $scope.items);
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
			templateUrl: 'initialization/procurementplanheading/tmplProcurementPlanHeadingEdit.tpl.html',
			size: 'lg',
			windowClass: 'hmodal-info',
			controller: 'ctrlProcurementPlanHeadingEdit',
			resolve: {
				itemEdit: function() {
					if(isNew) {
						return new ServiceProcurementPlanHeading();
					} else {
						return $scope.itemEdit;
					}
				},
				documentTypeDefinition: function() {
					return $scope.documentTypeDefinition;
				},
				planningPeriodDefinition: function() {
					return $scope.planningPeriodDefinition;
				},
				organizationUnitDefinition: function() {
					return $scope.organizationUnitDefinition;
				},
				procurementPlanItemsDefinition: function() {
					return $scope.procurementPlanItemsDefinition;
				},
			}
		})
		.result.then(function(result) {
			if(!angular.isDefined(result.id)) {
				ServiceProcurementPlanHeading.saveCustom('stockmanagement/procurementplanheadings', result, function(savedObject) {
					$scope.items.unshift(savedObject);
					if($scope.itemEdit !== null) {
						var index = $scope.items.map(function(it) { return it.id; }).indexOf($scope.itemEdit.id);
						$scope.items[index].isSelected = false;
					}
					$scope.itemEdit = angular.extend(savedObject);
					$scope.items[0].isSelected = true;
				});
			 } else {
				 ServiceProcurementPlanHeading.updateCustom('stockmanagement/procurementplanheadings/'+result.id, result, function(savedObject) {
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


.controller('ctrlProcurementPlanHeadingEdit',['$scope', 'Localization', '$modal', '$modalInstance', 'dialogs',
	'ServiceProcurementPlanHeading', 'ServiceDocumentType', 'ServicePlanningPeriod', 'ServiceOrganizationUnit', 'ServiceProcurementPlanItem',   'documentTypeDefinition',  'planningPeriodDefinition',  'organizationUnitDefinition',  'procurementPlanItemsDefinition',   'itemEdit',
function($scope, Localization, $modal, $modalInstance, dialogs,
	ServiceProcurementPlanHeading, ServiceDocumentType, ServicePlanningPeriod, ServiceOrganizationUnit, ServiceProcurementPlanItem,  documentTypeDefinition,  planningPeriodDefinition,  organizationUnitDefinition,  procurementPlanItemsDefinition,  itemEdit) {

	// dialog mode
	$scope.mode = 'edit';

	// original item state
	var original = angular.copy(itemEdit);
	// item state
	$scope.itemEdit = angular.copy(original);

	// documentType with properties
	$scope.documentTypeDefinition = documentTypeDefinition;
	// planningPeriod with properties
	$scope.planningPeriodDefinition = planningPeriodDefinition;
	// organizationUnit with properties
	$scope.organizationUnitDefinition = organizationUnitDefinition;
	// procurementPlanItems with properties
	$scope.procurementPlanItemsDefinition = procurementPlanItemsDefinition;

	// datepicker logic

	// date properties
	$scope.openedPPHPlanningDate = false;

	$scope.open = function($event, opened) {
		$event.preventDefault();
		$event.stopPropagation();
		$scope[opened] = true;
	};



	// Choose documentType
	$scope.openChooseDocumentTypeDialog = function() {
        $modal.open({
            backdrop: 'static',
            keyboard : false,
            templateUrl: 'corporation/procurementplanheading/tmplDocumentTypeChoose.tpl.html',
            size: 'lg',
            controller: 'ctrlDocumentTypeChoose',
            windowClass: 'hmodal-info',
            resolve: {
				itemEdit: function() {
					if(angular.isDefined($scope.itemEdit.documentType)){
						return $scope.itemEdit.documentType;
					}
				}
			}
		}).result.then(function(result) {
			$scope.itemEdit.documentType = angular.copy(result);
		});
    };


	// Choose planningPeriod
	$scope.openChoosePlanningPeriodDialog = function() {
        $modal.open({
            backdrop: 'static',
            keyboard : false,
            templateUrl: 'procurementplan/procurementplanheading/tmplPlanningPeriodChoose.tpl.html',
            size: 'lg',
            controller: 'ctrlPlanningPeriodChoose',
            windowClass: 'hmodal-info',
            resolve: {
				itemEdit: function() {
					if(angular.isDefined($scope.itemEdit.planningPeriod)){
						return $scope.itemEdit.planningPeriod;
					}
				}
			}
		}).result.then(function(result) {
			$scope.itemEdit.planningPeriod = angular.copy(result);
		});
    };


	// Choose organizationUnit
	$scope.openChooseOrganizationUnitDialog = function() {
        $modal.open({
            backdrop: 'static',
            keyboard : false,
            templateUrl: 'corporation/procurementplanheading/tmplOrganizationUnitChoose.tpl.html',
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


    $scope.procurementPlanItemEdit = null;

    // procurementPlanItems table selection logic
    $scope.procurementPlanItemSelection = function(item, index) {
        if(item.isSelected) {
            if($scope.procurementPlanItemEdit !== null) {
                var index1 = $scope.itemEdit.procurementPlanItems.map(function(it) { return it.id; }).indexOf($scope.procurementPlanItemEdit.id);
                $scope.itemEdit.procurementPlanItems[index1].isSelected = false;
            }
            $scope.procurementPlanItemEdit = item;
        } else {
            $scope.procurementPlanItemEdit = null;
            item.isSelected = false;
        }
    };

    // New/Edit procurementPlanItems dialog
    $scope.openProcurementPlanItemEditDialog = function(isNew) {
        $modal.open({
            backdrop: 'static',
            keyboard : false,
            templateUrl: 'initialization/procurementplanheading/tmplProcurementPlanItemEdit.tpl.html',
            size: 'lg',
            controller: 'ctrlProcurementPlanItemEdit',
            windowClass: 'hmodal-info',
            resolve: {
                itemEdit: function() {
                    if(isNew) {
                        return new ServiceProcurementPlanItem();
                    } else {
                        return $scope.procurementPlanItemEdit;
                    }
                }
            }
        }).result.then(function(result) {
            var i;
            if(isNew) {
                if(!angular.isDefined($scope.itemEdit.procurementPlanItems)) {
                    $scope.itemEdit.procurementPlanItems = [];
                }
                $scope.itemEdit.procurementPlanItems.unshift(result);
                for(i in $scope.itemEdit.procurementPlanItems) {
                    $scope.itemEdit.procurementPlanItems[i].isSelected = false;
                }
                $scope.procurementPlanItemEdit = angular.extend(result);
                $scope.itemEdit.procurementPlanItems[0].isSelected = true;
            }
            else {
                for(i in $scope.itemEdit.procurementPlanItems) {
                    $scope.itemEdit.procurementPlanItems[i].isSelected = false;
                }
                $scope.procurementPlanItemEdit = angular.extend(result);
                var index = $scope.itemEdit.procurementPlanItems.map(function(it) { return it.id; }).indexOf(result.id);
                for(var key in result) {
                    $scope.itemEdit.procurementPlanItems[index][key] = result[key];
                }
                $scope.itemEdit.procurementPlanItems[index].isSelected = true;
            }
        });
    };

    $scope.removeProcurementPlanItem = function(item) {
        var dialog = dialogs.confirm('Please confirm', 'Are you sure you want to delete item?');
        dialog.result.then(function(btn) {
            var removeIndex = $scope.itemEdit.procurementPlanItems.map(function(it) { return it.id; }).indexOf(item.id);
            $scope.itemEdit.procurementPlanItems[removeIndex].deleted = true;
        });
    };


	// Save Button
	$scope.save = function() {
		correctDateTime($scope.itemEdit.PPHPlanningDate);
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
		return                 item.PPHDocumentNumber  &&                 item.PPHPlanningDate  &&                 item.PPHPlanVersion  ;
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


.controller('ctrlProcurementPlanHeadingChoose', ['$scope','ServiceProcurementPlanHeading', 'dialogs', '$modal', '$modalInstance', 'itemEdit',
function($scope, ServiceProcurementPlanHeading, dialogs, $modal,  $modalInstance, itemEdit) {

    // entity with properties
    $scope.itemDefinition = {
        label: 'initialization.procurementPlanHeading',
        properties: [
            { label: 'pPHDocumentNumber', name:'PPHDocumentNumber', inTable:  true  },
            { label: 'pPHPlanningDate', name:'PPHPlanningDate', inTable:  true  },
            { label: 'pPHPlanVersion', name:'PPHPlanVersion', inTable:  true  },
            { label: 'pPHPrintingStatus', name:'PPHPrintingStatus', inTable:  false  },
        ]
    };

	$scope.items = [];
	$scope.itemEdit = {};

	// fill table with data
	$scope.loaded = false;
	var getProcurementPlanHeadings = function() {
		if(!$scope.loaded && $scope.items.length === 0) {
			$scope.isLoading = true;
			ServiceProcurementPlanHeading.query(function(data) {
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
	getProcurementPlanHeadings();

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