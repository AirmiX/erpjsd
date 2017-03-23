'use strict';

angular.module('Doob.stockmanagement')


.controller('ctrlTransactionLog',['$scope', '$rootScope', '$modal', 'dialogs', 'CheckSelected', 'ServiceTransactionLog',
    function($scope, $rootScope, $modal, dialogs, CheckSelected, ServiceTransactionLog) {

	// main entity (transactionLog) properties names and labels
	$scope.itemDefinition = {
		label: 'stockmanagement.transactionLog',
		properties: [
			{ label: 'tLOrdinalNumber', name:'TLOrdinalNumber', inTable:  true  },
			{ label: 'tLUser', name:'TLUser', inTable:  false  },
			{ label: 'tLDocumentNumber', name:'TLDocumentNumber', inTable:  true  },
			{ label: 'tLLogNumber', name:'TLLogNumber', inTable:  true  },
			{ label: 'tLQuantityInput', name:'TLQuantityInput', inTable:  false  },
			{ label: 'tLQuantityOutput', name:'TLQuantityOutput', inTable:  false  },
			{ label: 'tLMeasurementUnit', name:'TLMeasurementUnit', inTable:  true  },
			{ label: 'tLStatusDesignation', name:'TLStatusDesignation', inTable:  true  },
			{ label: 'tLPrice', name:'TLPrice', inTable:  true  },
			{ label: 'tLValue', name:'TLValue', inTable:  true  },
			{ label: 'tLDate', name:'TLDate', inTable:  true  },
			{ label: 'tLMark', name:'TLMark', inTable:  false  },
			{ label: 'tLItemOrdinalNumber', name:'TLItemOrdinalNumber', inTable:  false  },
			{ label: 'tLDocumentType', name:'TLDocumentType', inTable:  false  },
			{ label: 'tLSession', name:'TLSession', inTable:  false  },
			{ label: 'tLOrganizationUnit', name:'TLOrganizationUnit', inTable:  false  },
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
	// identification with properties names and labels
	$scope.identificationDefinition = {
		label: 'commonbusinessentities.identification',
		properties : [
			{ label: 'iIdentificationCode', name:'IIdentificationCode' },
		]
	};
	// stockroom with properties names and labels
	$scope.stockroomDefinition = {
		label: 'stock.stockroom',
		properties : [
			{ label: 'sCode', name:'SCode' },
			{ label: 'sName', name:'SName' },
			{ label: 'sFullName', name:'SFullName' },
			{ label: 'sType', name:'SType' },
			{ label: 'sConditions', name:'SConditions' },
		]
	};
	// account with properties names and labels
	$scope.accountDefinition = {
		label: 'corporation.account',
		properties : [
			{ label: 'aAccountNumber', name:'AAccountNumber' },
			{ label: 'aName', name:'AName' },
			{ label: 'aIsTransfer', name:'AIsTransfer' },
			{ label: 'aEntrySide', name:'AEntrySide' },
			{ label: 'aDisplaySide', name:'ADisplaySide' },
		]
	};

	// fill table with data
	$scope.items = [];
	$scope.loaded = false;
	var getTransactionLogs = function() {
		if(!$scope.loaded && $scope.items.length === 0) {
			$scope.isLoading = true;
			ServiceTransactionLog.query(function(data) {
				$scope.items = data;
				$scope.isLoading = false;
				$scope.loaded = true;
			});
		}
	};
	getTransactionLogs();

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

	$scope.$watch('TransactionLogCollection', function() {
		$scope.itemEdit = CheckSelected.checkSelectedInTable($scope.itemEdit, $scope.TransactionLogCollection, $scope.items);
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
			templateUrl: 'stockmanagement/transactionlog/tmplTransactionLogEdit.tpl.html',
			size: 'lg',
			windowClass: 'hmodal-info',
			controller: 'ctrlTransactionLogEdit',
			resolve: {
				itemEdit: function() {
					if(isNew) {
						return new ServiceTransactionLog();
					} else {
						return $scope.itemEdit;
					}
				},
				documentTypeDefinition: function() {
					return $scope.documentTypeDefinition;
				},
				identificationDefinition: function() {
					return $scope.identificationDefinition;
				},
				stockroomDefinition: function() {
					return $scope.stockroomDefinition;
				},
				accountDefinition: function() {
					return $scope.accountDefinition;
				},
			}
		})
		.result.then(function(result) {
			if(!angular.isDefined(result.id)) {
				ServiceTransactionLog.saveCustom('stockmanagement/transactionlogs', result, function(savedObject) {
					$scope.items.unshift(savedObject);
					if($scope.itemEdit !== null) {
						var index = $scope.items.map(function(it) { return it.id; }).indexOf($scope.itemEdit.id);
						$scope.items[index].isSelected = false;
					}
					$scope.itemEdit = angular.extend(savedObject);
					$scope.items[0].isSelected = true;
				});
			 } else {
				 ServiceTransactionLog.updateCustom('stockmanagement/transactionlogs/'+result.id, result, function(savedObject) {
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


.controller('ctrlTransactionLogEdit',['$scope', 'Localization', '$modal', '$modalInstance', 'dialogs',
	'ServiceTransactionLog', 'ServiceDocumentType', 'ServiceIdentification', 'ServiceStockroom', 'ServiceAccount',   'documentTypeDefinition',  'identificationDefinition',  'stockroomDefinition',  'accountDefinition',   'itemEdit',
function($scope, Localization, $modal, $modalInstance, dialogs,
	ServiceTransactionLog, ServiceDocumentType, ServiceIdentification, ServiceStockroom, ServiceAccount,  documentTypeDefinition,  identificationDefinition,  stockroomDefinition,  accountDefinition,  itemEdit) {

	// dialog mode
	$scope.mode = 'edit';

	// original item state
	var original = angular.copy(itemEdit);
	// item state
	$scope.itemEdit = angular.copy(original);

	// documentType with properties
	$scope.documentTypeDefinition = documentTypeDefinition;
	// identification with properties
	$scope.identificationDefinition = identificationDefinition;
	// stockroom with properties
	$scope.stockroomDefinition = stockroomDefinition;
	// account with properties
	$scope.accountDefinition = accountDefinition;

	// datepicker logic

	// date properties
	$scope.openedTLDate = false;

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
            templateUrl: 'corporation/transactionlog/tmplDocumentTypeChoose.tpl.html',
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


	// Choose identification
	$scope.openChooseIdentificationDialog = function() {
        $modal.open({
            backdrop: 'static',
            keyboard : false,
            templateUrl: 'commonbusinessentities/transactionlog/tmplIdentificationChoose.tpl.html',
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


	// Choose stockroom
	$scope.openChooseStockroomDialog = function() {
        $modal.open({
            backdrop: 'static',
            keyboard : false,
            templateUrl: 'stock/transactionlog/tmplStockroomChoose.tpl.html',
            size: 'lg',
            controller: 'ctrlStockroomChoose',
            windowClass: 'hmodal-info',
            resolve: {
				itemEdit: function() {
					if(angular.isDefined($scope.itemEdit.stockroom)){
						return $scope.itemEdit.stockroom;
					}
				}
			}
		}).result.then(function(result) {
			$scope.itemEdit.stockroom = angular.copy(result);
		});
    };


	// Choose account
	$scope.openChooseAccountDialog = function() {
        $modal.open({
            backdrop: 'static',
            keyboard : false,
            templateUrl: 'corporation/transactionlog/tmplAccountChoose.tpl.html',
            size: 'lg',
            controller: 'ctrlAccountChoose',
            windowClass: 'hmodal-info',
            resolve: {
				itemEdit: function() {
					if(angular.isDefined($scope.itemEdit.account)){
						return $scope.itemEdit.account;
					}
				}
			}
		}).result.then(function(result) {
			$scope.itemEdit.account = angular.copy(result);
		});
    };


	// Save Button
	$scope.save = function() {
		correctDateTime($scope.itemEdit.TLDate);
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
		return                 item.TLOrdinalNumber  &&                 item.TLDocumentNumber  &&                 item.TLLogNumber  &&                 item.TLMeasurementUnit  &&                 item.TLStatusDesignation  &&                 item.TLPrice  &&                 item.TLValue  &&                 item.TLDate  ;
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


.controller('ctrlTransactionLogChoose', ['$scope','ServiceTransactionLog', 'dialogs', '$modal', '$modalInstance', 'itemEdit',
function($scope, ServiceTransactionLog, dialogs, $modal,  $modalInstance, itemEdit) {

    // entity with properties
    $scope.itemDefinition = {
        label: 'stockmanagement.transactionLog',
        properties: [
            { label: 'tLOrdinalNumber', name:'TLOrdinalNumber', inTable:  true  },
            { label: 'tLUser', name:'TLUser', inTable:  false  },
            { label: 'tLDocumentNumber', name:'TLDocumentNumber', inTable:  true  },
            { label: 'tLLogNumber', name:'TLLogNumber', inTable:  true  },
            { label: 'tLQuantityInput', name:'TLQuantityInput', inTable:  false  },
            { label: 'tLQuantityOutput', name:'TLQuantityOutput', inTable:  false  },
            { label: 'tLMeasurementUnit', name:'TLMeasurementUnit', inTable:  true  },
            { label: 'tLStatusDesignation', name:'TLStatusDesignation', inTable:  true  },
            { label: 'tLPrice', name:'TLPrice', inTable:  true  },
            { label: 'tLValue', name:'TLValue', inTable:  true  },
            { label: 'tLDate', name:'TLDate', inTable:  true  },
            { label: 'tLMark', name:'TLMark', inTable:  false  },
            { label: 'tLItemOrdinalNumber', name:'TLItemOrdinalNumber', inTable:  false  },
            { label: 'tLDocumentType', name:'TLDocumentType', inTable:  false  },
            { label: 'tLSession', name:'TLSession', inTable:  false  },
            { label: 'tLOrganizationUnit', name:'TLOrganizationUnit', inTable:  false  },
        ]
    };

	$scope.items = [];
	$scope.itemEdit = {};

	// fill table with data
	$scope.loaded = false;
	var getTransactionLogs = function() {
		if(!$scope.loaded && $scope.items.length === 0) {
			$scope.isLoading = true;
			ServiceTransactionLog.query(function(data) {
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
	getTransactionLogs();

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