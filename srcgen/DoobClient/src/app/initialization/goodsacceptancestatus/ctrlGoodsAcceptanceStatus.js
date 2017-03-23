'use strict';

angular.module('Doob.initialization')


.controller('ctrlGoodsAcceptanceStatus',['$scope', '$rootScope', '$modal', 'dialogs', 'CheckSelected', 'ServiceGoodsAcceptanceStatus',
    function($scope, $rootScope, $modal, dialogs, CheckSelected, ServiceGoodsAcceptanceStatus) {

	// main entity (goodsAcceptanceStatus) properties names and labels
	$scope.itemDefinition = {
		label: 'initialization.goodsAcceptanceStatus',
		properties: [
			{ label: 'gASDesignation', name:'GASDesignation', inTable:  true  },
			{ label: 'gASDescription', name:'GASDescription', inTable:  true  },
		]
	};

	// goodsReceivedNoteItems with properties names and labels
	$scope.goodsReceivedNoteItemsDefinition = {
		label: 'stockmanagement.goodsReceivedNoteItem',
		properties : [
			{ label: 'gRNIOrdinalNumber', name:'GRNIOrdinalNumber' },
			{ label: 'gRNIStockAccount', name:'GRNIStockAccount' },
			{ label: 'gRNIPriceDesignation', name:'GRNIPriceDesignation' },
			{ label: 'gRNIMeasurementUnit', name:'GRNIMeasurementUnit' },
			{ label: 'gRNIQuantityByShippingDocument', name:'GRNIQuantityByShippingDocument' },
			{ label: 'gRNIQunaityReceived', name:'GRNIQunaityReceived' },
			{ label: 'gRNIQuantityIssued', name:'GRNIQuantityIssued' },
		]
	};

	// fill table with data
	$scope.items = [];
	$scope.loaded = false;
	var getGoodsAcceptanceStatuss = function() {
		if(!$scope.loaded && $scope.items.length === 0) {
			$scope.isLoading = true;
			ServiceGoodsAcceptanceStatus.query(function(data) {
				$scope.items = data;
				$scope.isLoading = false;
				$scope.loaded = true;
			});
		}
	};
	getGoodsAcceptanceStatuss();

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

	$scope.$watch('GoodsAcceptanceStatusCollection', function() {
		$scope.itemEdit = CheckSelected.checkSelectedInTable($scope.itemEdit, $scope.GoodsAcceptanceStatusCollection, $scope.items);
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
			templateUrl: 'initialization/goodsacceptancestatus/tmplGoodsAcceptanceStatusEdit.tpl.html',
			size: 'lg',
			windowClass: 'hmodal-info',
			controller: 'ctrlGoodsAcceptanceStatusEdit',
			resolve: {
				itemEdit: function() {
					if(isNew) {
						return new ServiceGoodsAcceptanceStatus();
					} else {
						return $scope.itemEdit;
					}
				},
				goodsReceivedNoteItemsDefinition: function() {
					return $scope.goodsReceivedNoteItemsDefinition;
				},
			}
		})
		.result.then(function(result) {
			if(!angular.isDefined(result.id)) {
				ServiceGoodsAcceptanceStatus.saveCustom('stockmanagement/goodsacceptancestatuss', result, function(savedObject) {
					$scope.items.unshift(savedObject);
					if($scope.itemEdit !== null) {
						var index = $scope.items.map(function(it) { return it.id; }).indexOf($scope.itemEdit.id);
						$scope.items[index].isSelected = false;
					}
					$scope.itemEdit = angular.extend(savedObject);
					$scope.items[0].isSelected = true;
				});
			 } else {
				 ServiceGoodsAcceptanceStatus.updateCustom('stockmanagement/goodsacceptancestatuss/'+result.id, result, function(savedObject) {
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


.controller('ctrlGoodsAcceptanceStatusEdit',['$scope', 'Localization', '$modal', '$modalInstance', 'dialogs',
	'ServiceGoodsAcceptanceStatus', 'ServiceGoodsReceivedNoteItem',   'goodsReceivedNoteItemsDefinition',   'itemEdit',
function($scope, Localization, $modal, $modalInstance, dialogs,
	ServiceGoodsAcceptanceStatus, ServiceGoodsReceivedNoteItem,  goodsReceivedNoteItemsDefinition,  itemEdit) {

	// dialog mode
	$scope.mode = 'edit';

	// original item state
	var original = angular.copy(itemEdit);
	// item state
	$scope.itemEdit = angular.copy(original);

	// goodsReceivedNoteItems with properties
	$scope.goodsReceivedNoteItemsDefinition = goodsReceivedNoteItemsDefinition;

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
        for(i in $scope.itemEdit.goodsReceivedNoteItems) {
    		item = $scope.itemEdit.goodsReceivedNoteItems[i];
    		delete item.isSelected;
    	}
		$modalInstance.close($scope.itemEdit);
	};


	$scope.canSave = function() {
		var item = $scope.itemEdit;
		return                 item.GASDesignation  &&                 item.GASDescription  ;
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


.controller('ctrlGoodsAcceptanceStatusChoose', ['$scope','ServiceGoodsAcceptanceStatus', 'dialogs', '$modal', '$modalInstance', 'itemEdit',
function($scope, ServiceGoodsAcceptanceStatus, dialogs, $modal,  $modalInstance, itemEdit) {

    // entity with properties
    $scope.itemDefinition = {
        label: 'initialization.goodsAcceptanceStatus',
        properties: [
            { label: 'gASDesignation', name:'GASDesignation', inTable:  true  },
            { label: 'gASDescription', name:'GASDescription', inTable:  true  },
        ]
    };

	$scope.items = [];
	$scope.itemEdit = {};

	// fill table with data
	$scope.loaded = false;
	var getGoodsAcceptanceStatuss = function() {
		if(!$scope.loaded && $scope.items.length === 0) {
			$scope.isLoading = true;
			ServiceGoodsAcceptanceStatus.query(function(data) {
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
	getGoodsAcceptanceStatuss();

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