'use strict';

angular.module('Doob.initialization')


.controller('ctrlProcurementRequestHeading',['$scope', '$rootScope', '$modal', 'dialogs', 'CheckSelected', 'ServiceProcurementRequestHeading',
    function($scope, $rootScope, $modal, dialogs, CheckSelected, ServiceProcurementRequestHeading) {

	// main entity (procurementRequestHeading) properties names and labels
	$scope.itemDefinition = {
		label: 'initialization.procurementRequestHeading',
		properties: [
			{ label: 'pRHCode', name:'PRHCode', inTable:  true  },
			{ label: 'pRHCreationDate', name:'PRHCreationDate', inTable:  true  },
			{ label: 'pRHAdmissionDate', name:'PRHAdmissionDate', inTable:  false  },
			{ label: 'pRHRemark', name:'PRHRemark', inTable:  false  },
			{ label: 'pRHPrintingStatus', name:'PRHPrintingStatus', inTable:  false  },
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
	// workOrder with properties names and labels
	$scope.workOrderDefinition = {
		label: 'initialization.workOrder',
		properties : [
			{ label: 'wOCode', name:'WOCode' },
			{ label: 'wOCreationDate', name:'WOCreationDate' },
			{ label: 'wOScheduledDate', name:'WOScheduledDate' },
			{ label: 'wOLuanchedQuantity', name:'WOLuanchedQuantity' },
			{ label: 'wOAcceptedQuantity', name:'WOAcceptedQuantity' },
			{ label: 'wORejectedQuantity', name:'WORejectedQuantity' },
			{ label: 'wOZanovljenaQuantity', name:'WOZanovljenaQuantity' },
			{ label: 'wOCalculationStatus', name:'WOCalculationStatus' },
			{ label: 'tISDesignation', name:'TISDesignation' },
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
	// procurementRequestitems with properties names and labels
	$scope.procurementRequestitemsDefinition = {
		label: 'initialization.procurementRequestItem',
		properties : [
			{ label: 'pRIOrdinalNumber', name:'PRIOrdinalNumber' },
			{ label: 'pRIRequestedQuantity', name:'PRIRequestedQuantity' },
			{ label: 'pRIRealizedQuantity', name:'PRIRealizedQuantity' },
			{ label: 'pRIDeadlineDate', name:'PRIDeadlineDate' },
			{ label: 'pRISupplyStatus', name:'PRISupplyStatus' },
			{ label: 'pRIIncludedQunatityInPlan', name:'PRIIncludedQunatityInPlan' },
			{ label: 'pRIResolutionStatus', name:'PRIResolutionStatus' },
			{ label: 'mUIdentificationCode', name:'MUIdentificationCode' },
		]
	};

	// fill table with data
	$scope.items = [];
	$scope.loaded = false;
	var getProcurementRequestHeadings = function() {
		if(!$scope.loaded && $scope.items.length === 0) {
			$scope.isLoading = true;
			ServiceProcurementRequestHeading.query(function(data) {
				$scope.items = data;
				$scope.isLoading = false;
				$scope.loaded = true;
			});
		}
	};
	getProcurementRequestHeadings();

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

	$scope.$watch('ProcurementRequestHeadingCollection', function() {
		$scope.itemEdit = CheckSelected.checkSelectedInTable($scope.itemEdit, $scope.ProcurementRequestHeadingCollection, $scope.items);
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
			templateUrl: 'initialization/procurementrequestheading/tmplProcurementRequestHeadingEdit.tpl.html',
			size: 'lg',
			windowClass: 'hmodal-info',
			controller: 'ctrlProcurementRequestHeadingEdit',
			resolve: {
				itemEdit: function() {
					if(isNew) {
						return new ServiceProcurementRequestHeading();
					} else {
						return $scope.itemEdit;
					}
				},
				organizationUnitDefinition: function() {
					return $scope.organizationUnitDefinition;
				},
				workOrderDefinition: function() {
					return $scope.workOrderDefinition;
				},
				documentTypeDefinition: function() {
					return $scope.documentTypeDefinition;
				},
				procurementRequestitemsDefinition: function() {
					return $scope.procurementRequestitemsDefinition;
				},
			}
		})
		.result.then(function(result) {
			if(!angular.isDefined(result.id)) {
				ServiceProcurementRequestHeading.saveCustom('stockmanagement/procurementrequestheadings', result, function(savedObject) {
					$scope.items.unshift(savedObject);
					if($scope.itemEdit !== null) {
						var index = $scope.items.map(function(it) { return it.id; }).indexOf($scope.itemEdit.id);
						$scope.items[index].isSelected = false;
					}
					$scope.itemEdit = angular.extend(savedObject);
					$scope.items[0].isSelected = true;
				});
			 } else {
				 ServiceProcurementRequestHeading.updateCustom('stockmanagement/procurementrequestheadings/'+result.id, result, function(savedObject) {
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


.controller('ctrlProcurementRequestHeadingEdit',['$scope', 'Localization', '$modal', '$modalInstance', 'dialogs',
	'ServiceProcurementRequestHeading', 'ServiceOrganizationUnit', 'ServiceWorkOrder', 'ServiceDocumentType', 'ServiceProcurementRequestItem',   'organizationUnitDefinition',  'workOrderDefinition',  'documentTypeDefinition',  'procurementRequestitemsDefinition',   'itemEdit',
function($scope, Localization, $modal, $modalInstance, dialogs,
	ServiceProcurementRequestHeading, ServiceOrganizationUnit, ServiceWorkOrder, ServiceDocumentType, ServiceProcurementRequestItem,  organizationUnitDefinition,  workOrderDefinition,  documentTypeDefinition,  procurementRequestitemsDefinition,  itemEdit) {

	// dialog mode
	$scope.mode = 'edit';

	// original item state
	var original = angular.copy(itemEdit);
	// item state
	$scope.itemEdit = angular.copy(original);

	// organizationUnit with properties
	$scope.organizationUnitDefinition = organizationUnitDefinition;
	// workOrder with properties
	$scope.workOrderDefinition = workOrderDefinition;
	// documentType with properties
	$scope.documentTypeDefinition = documentTypeDefinition;
	// procurementRequestitems with properties
	$scope.procurementRequestitemsDefinition = procurementRequestitemsDefinition;

	// datepicker logic

	// date properties
	$scope.openedPRHCreationDate = false;
	$scope.openedPRHAdmissionDate = false;

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
            templateUrl: 'corporation/procurementrequestheading/tmplOrganizationUnitChoose.tpl.html',
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


	// Choose workOrder
	$scope.openChooseWorkOrderDialog = function() {
        $modal.open({
            backdrop: 'static',
            keyboard : false,
            templateUrl: 'initialization/procurementrequestheading/tmplWorkOrderChoose.tpl.html',
            size: 'lg',
            controller: 'ctrlWorkOrderChoose',
            windowClass: 'hmodal-info',
            resolve: {
				itemEdit: function() {
					if(angular.isDefined($scope.itemEdit.workOrder)){
						return $scope.itemEdit.workOrder;
					}
				}
			}
		}).result.then(function(result) {
			$scope.itemEdit.workOrder = angular.copy(result);
		});
    };


	// Choose documentType
	$scope.openChooseDocumentTypeDialog = function() {
        $modal.open({
            backdrop: 'static',
            keyboard : false,
            templateUrl: 'corporation/procurementrequestheading/tmplDocumentTypeChoose.tpl.html',
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


    $scope.procurementRequestItemEdit = null;

    // procurementRequestitems table selection logic
    $scope.procurementRequestItemSelection = function(item, index) {
        if(item.isSelected) {
            if($scope.procurementRequestItemEdit !== null) {
                var index1 = $scope.itemEdit.procurementRequestitems.map(function(it) { return it.id; }).indexOf($scope.procurementRequestItemEdit.id);
                $scope.itemEdit.procurementRequestitems[index1].isSelected = false;
            }
            $scope.procurementRequestItemEdit = item;
        } else {
            $scope.procurementRequestItemEdit = null;
            item.isSelected = false;
        }
    };

    // New/Edit procurementRequestitems dialog
    $scope.openProcurementRequestItemEditDialog = function(isNew) {
        $modal.open({
            backdrop: 'static',
            keyboard : false,
            templateUrl: 'initialization/procurementrequestheading/tmplProcurementRequestItemEdit.tpl.html',
            size: 'lg',
            controller: 'ctrlProcurementRequestItemEdit',
            windowClass: 'hmodal-info',
            resolve: {
                itemEdit: function() {
                    if(isNew) {
                        return new ServiceProcurementRequestItem();
                    } else {
                        return $scope.procurementRequestItemEdit;
                    }
                }
            }
        }).result.then(function(result) {
            var i;
            if(isNew) {
                if(!angular.isDefined($scope.itemEdit.procurementRequestitems)) {
                    $scope.itemEdit.procurementRequestitems = [];
                }
                $scope.itemEdit.procurementRequestitems.unshift(result);
                for(i in $scope.itemEdit.procurementRequestitems) {
                    $scope.itemEdit.procurementRequestitems[i].isSelected = false;
                }
                $scope.procurementRequestItemEdit = angular.extend(result);
                $scope.itemEdit.procurementRequestitems[0].isSelected = true;
            }
            else {
                for(i in $scope.itemEdit.procurementRequestitems) {
                    $scope.itemEdit.procurementRequestitems[i].isSelected = false;
                }
                $scope.procurementRequestItemEdit = angular.extend(result);
                var index = $scope.itemEdit.procurementRequestitems.map(function(it) { return it.id; }).indexOf(result.id);
                for(var key in result) {
                    $scope.itemEdit.procurementRequestitems[index][key] = result[key];
                }
                $scope.itemEdit.procurementRequestitems[index].isSelected = true;
            }
        });
    };

    $scope.removeProcurementRequestItem = function(item) {
        var dialog = dialogs.confirm('Please confirm', 'Are you sure you want to delete item?');
        dialog.result.then(function(btn) {
            var removeIndex = $scope.itemEdit.procurementRequestitems.map(function(it) { return it.id; }).indexOf(item.id);
            $scope.itemEdit.procurementRequestitems[removeIndex].deleted = true;
        });
    };


	// Save Button
	$scope.save = function() {
		correctDateTime($scope.itemEdit.PRHCreationDate);
		correctDateTime($scope.itemEdit.PRHAdmissionDate);
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
		return                 item.PRHCode  &&                 item.PRHCreationDate  ;
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


.controller('ctrlProcurementRequestHeadingChoose', ['$scope','ServiceProcurementRequestHeading', 'dialogs', '$modal', '$modalInstance', 'itemEdit',
function($scope, ServiceProcurementRequestHeading, dialogs, $modal,  $modalInstance, itemEdit) {

    // entity with properties
    $scope.itemDefinition = {
        label: 'initialization.procurementRequestHeading',
        properties: [
            { label: 'pRHCode', name:'PRHCode', inTable:  true  },
            { label: 'pRHCreationDate', name:'PRHCreationDate', inTable:  true  },
            { label: 'pRHAdmissionDate', name:'PRHAdmissionDate', inTable:  false  },
            { label: 'pRHRemark', name:'PRHRemark', inTable:  false  },
            { label: 'pRHPrintingStatus', name:'PRHPrintingStatus', inTable:  false  },
        ]
    };

	$scope.items = [];
	$scope.itemEdit = {};

	// fill table with data
	$scope.loaded = false;
	var getProcurementRequestHeadings = function() {
		if(!$scope.loaded && $scope.items.length === 0) {
			$scope.isLoading = true;
			ServiceProcurementRequestHeading.query(function(data) {
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
	getProcurementRequestHeadings();

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