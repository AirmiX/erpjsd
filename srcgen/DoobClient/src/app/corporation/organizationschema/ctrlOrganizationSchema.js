'use strict';

angular.module('Doob.corporation')


.controller('ctrlOrganizationSchema',['$scope', '$rootScope', '$modal', 'dialogs', 'CheckSelected', 'ServiceOrganizationSchema',
    function($scope, $rootScope, $modal, dialogs, CheckSelected, ServiceOrganizationSchema) {

	// main entity (organizationSchema) properties names and labels
	$scope.itemDefinition = {
		label: 'corporation.organizationSchema',
		properties: [
			{ label: 'oSName', name:'OSName', inTable:  true  },
			{ label: 'oSYear', name:'OSYear', inTable:  true  },
			{ label: 'oSStartDate', name:'OSStartDate', inTable:  true  },
			{ label: 'oSEndDate', name:'OSEndDate', inTable:  false  },
			{ label: 'oSCreationDate', name:'OSCreationDate', inTable:  true  },
		]
	};

	// be with properties names and labels
	$scope.beDefinition = {
		label: 'corporation.businessEntity',
		properties : [
			{ label: 'bEIdentificationCode', name:'BEIdentificationCode' },
			{ label: 'bEName', name:'BEName' },
			{ label: 'bEShortName', name:'BEShortName' },
			{ label: 'bETelephone', name:'BETelephone' },
			{ label: 'bEFax', name:'BEFax' },
			{ label: 'bECompanyNumber', name:'BECompanyNumber' },
			{ label: 'bERegistrationNumber', name:'BERegistrationNumber' },
		]
	};

	// fill table with data
	$scope.items = [];
	$scope.loaded = false;
	var getOrganizationSchemas = function() {
		if(!$scope.loaded && $scope.items.length === 0) {
			$scope.isLoading = true;
			ServiceOrganizationSchema.query(function(data) {
				$scope.items = data;
				$scope.isLoading = false;
				$scope.loaded = true;
			});
		}
	};
	getOrganizationSchemas();

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

	$scope.$watch('OrganizationSchemaCollection', function() {
		$scope.itemEdit = CheckSelected.checkSelectedInTable($scope.itemEdit, $scope.OrganizationSchemaCollection, $scope.items);
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
			templateUrl: 'corporation/organizationschema/tmplOrganizationSchemaEdit.tpl.html',
			size: 'lg',
			windowClass: 'hmodal-info',
			controller: 'ctrlOrganizationSchemaEdit',
			resolve: {
				itemEdit: function() {
					if(isNew) {
						return new ServiceOrganizationSchema();
					} else {
						return $scope.itemEdit;
					}
				},
				beDefinition: function() {
					return $scope.beDefinition;
				},
			}
		})
		.result.then(function(result) {
			if(!angular.isDefined(result.id)) {
				ServiceOrganizationSchema.saveCustom('stockmanagement/organizationschemas', result, function(savedObject) {
					$scope.items.unshift(savedObject);
					if($scope.itemEdit !== null) {
						var index = $scope.items.map(function(it) { return it.id; }).indexOf($scope.itemEdit.id);
						$scope.items[index].isSelected = false;
					}
					$scope.itemEdit = angular.extend(savedObject);
					$scope.items[0].isSelected = true;
				});
			 } else {
				 ServiceOrganizationSchema.updateCustom('stockmanagement/organizationschemas/'+result.id, result, function(savedObject) {
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


.controller('ctrlOrganizationSchemaEdit',['$scope', 'Localization', '$modal', '$modalInstance', 'dialogs',
	'ServiceOrganizationSchema', 'ServiceBusinessEntity',   'beDefinition',   'itemEdit',
function($scope, Localization, $modal, $modalInstance, dialogs,
	ServiceOrganizationSchema, ServiceBusinessEntity,  beDefinition,  itemEdit) {

	// dialog mode
	$scope.mode = 'edit';

	// original item state
	var original = angular.copy(itemEdit);
	// item state
	$scope.itemEdit = angular.copy(original);

	// be with properties
	$scope.beDefinition = beDefinition;

	// datepicker logic

	// date properties
	$scope.openedOSStartDate = false;
	$scope.openedOSEndDate = false;
	$scope.openedOSCreationDate = false;

	$scope.open = function($event, opened) {
		$event.preventDefault();
		$event.stopPropagation();
		$scope[opened] = true;
	};



	// Choose be
	$scope.openChooseBeDialog = function() {
        $modal.open({
            backdrop: 'static',
            keyboard : false,
            templateUrl: 'corporation/organizationschema/tmplBusinessEntityChoose.tpl.html',
            size: 'lg',
            controller: 'ctrlBusinessEntityChoose',
            windowClass: 'hmodal-info',
            resolve: {
				itemEdit: function() {
					if(angular.isDefined($scope.itemEdit.be)){
						return $scope.itemEdit.be;
					}
				}
			}
		}).result.then(function(result) {
			$scope.itemEdit.be = angular.copy(result);
		});
    };


	// Save Button
	$scope.save = function() {
		correctDateTime($scope.itemEdit.OSStartDate);
		correctDateTime($scope.itemEdit.OSEndDate);
		correctDateTime($scope.itemEdit.OSCreationDate);
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
		return                 item.OSName  &&                 item.OSYear  &&                 item.OSStartDate  &&                 item.OSCreationDate  ;
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


.controller('ctrlOrganizationSchemaChoose', ['$scope','ServiceOrganizationSchema', 'dialogs', '$modal', '$modalInstance', 'itemEdit',
function($scope, ServiceOrganizationSchema, dialogs, $modal,  $modalInstance, itemEdit) {

    // entity with properties
    $scope.itemDefinition = {
        label: 'corporation.organizationSchema',
        properties: [
            { label: 'oSName', name:'OSName', inTable:  true  },
            { label: 'oSYear', name:'OSYear', inTable:  true  },
            { label: 'oSStartDate', name:'OSStartDate', inTable:  true  },
            { label: 'oSEndDate', name:'OSEndDate', inTable:  false  },
            { label: 'oSCreationDate', name:'OSCreationDate', inTable:  true  },
        ]
    };

	$scope.items = [];
	$scope.itemEdit = {};

	// fill table with data
	$scope.loaded = false;
	var getOrganizationSchemas = function() {
		if(!$scope.loaded && $scope.items.length === 0) {
			$scope.isLoading = true;
			ServiceOrganizationSchema.query(function(data) {
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
	getOrganizationSchemas();

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