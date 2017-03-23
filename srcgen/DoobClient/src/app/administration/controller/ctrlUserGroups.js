'use strict';
angular.module('Doob.administration')
.controller('ctrlUserGroups',['$scope', '$rootScope', 'ServiceUserGroups', 'dialogs', '$modal', 'CheckSelected',
function($scope, $rootScope, ServiceUserGroups, dialogs, $modal, CheckSelected){
    
    
    $scope.propsUserGroups = ['UGIdentificationCode', 'UGName'];
    
    $scope.items=[];
    $scope.mode = 'details';
    $scope.loaded = false;
    $scope.flagMultiple = false;
    $scope.callServer = function getData(tableState) {
        if(!$scope.loaded && $scope.items.length === 0) {
                $scope.isLoading = true;
                $scope.loaded = true;
                ServiceUserGroups.query(function(items) {
                    $scope.items=items;
                    $scope.isLoading = false;
                });
        }
    };
                
    $scope.callServer();
    $scope.itemEdit = null;
    $scope.selection = function(item, index) {
            
                if(item.isSelected) {
                    if($scope.itemEdit !== null) {
                        var index1 = $scope.items.map(function(it) { return it.id; }).indexOf($scope.itemEdit.id);
                        $scope.items[index1].isSelected = false;
                    }
                    item.$getEager(function (item) {
                        $scope.itemEdit = item;                     
                    });
                } else {                
                    $scope.itemEdit  = null;
                    item.isSelected = false;                 
                }            
    };
    
    $scope.$watch('showDisplay', function () {
      $scope.itemEdit = CheckSelected.checkSelectedInTable($scope.itemEdit, $scope.showDisplay, $scope.prices);
    });

    $scope.remove=function(item){
        /*var dlg = dialogs.confirm('Please confirm', 'Are you sure you want to delete item ' + item.UGIdentificationCode + ' ' + item.UGName + ' ?');
        dlg.result.then(function(btn) {
            var removeIndex = $scope.items.map(function(it) { return it.id; }).indexOf(item.id);
            $scope.items.splice(removeIndex, 1);
            item.$remove();
            $scope.itemEdit  = null;
        });*/ 
        $rootScope.sweetAlert.swal($rootScope.swalOptions,
          function (isConfirm) {
            if (isConfirm) {
                item.$remove(function(){
                    var removeIndex = $scope.items.map(function(it) { return it.id; }).indexOf(item.id);
                    $scope.items.splice(removeIndex, 1);
                    $scope.itemEdit = null;
                    $rootScope.deleteConfirmationDialog(item.UGIdentificationCode + ' ' + item.UGName);
                  }
                );
            }
            window.onkeydown = null;
            window.onfocus = null;
        });
    };

    $scope.openEditDialog=function(isNew){       
        $modal.open({
            backdrop: 'static',
            keyboard : false,
            templateUrl: 'administration/template/tmpUserGroupsEdit.tpl.html', 
            size: 'lg',
            windowClass: 'hmodal-info',
            controller: 'ctrlUserGroupsEdit',
            resolve: {
                    isNew: function() {
                        return isNew;                   
                    },
                    selectedItem: function () {
                        if(!isNew) {
                            return $scope.itemEdit;
                        } else {
                            return new ServiceUserGroups();
                        }
                    }                    
            }
        }).result.then(function(result) {
            
           if(!angular.isDefined(result.id)) {
                ServiceUserGroups.saveCustom( 'user/userGroups', result, function(savedObject){
                    $scope.items.unshift(savedObject);
                    if($scope.itemEdit !== null) {
                        var index = $scope.items.map(function(it) { return it.id; }).indexOf($scope.itemEdit.id);
                        $scope.items[index].isSelected = false;
                    }
                    $scope.itemEdit = angular.extend(savedObject);
                    $scope.items[0].isSelected = true;
                }); 
           } else {
               ServiceUserGroups.updateCustom( '/user/userGroups/'+result.id, result, function(savedObject){                    
                    $scope.itemEdit = angular.extend(savedObject);                                                                              
                    var index = $scope.items.map(function(it) { return it.id; }).indexOf(savedObject.id);
                    for (var key in result) {                    
                        $scope.items[index][key] = savedObject[key];
                    }                                  
                    $scope.items[index].isSelected = true;
                   
                });
           }
        });               
    };
 
}])

.controller('ctrlUserGroupsEdit',['$scope', 'ServiceUserGroups',  '$modal', 'isNew', '$modalInstance', 'selectedItem', '$filter',
function($scope, ServiceUserGroups,  $modal, isNew, $modalInstance, selectedItem, $filter) {
    $scope.mode = 'edit';
    $scope.propsServiceGroups = ['SGIdentificationCode', 'SGName'];
    $scope.propsUser = ['UIdentificationCode', 'UUsername'];
    $scope.undoChanges=function(){
        $scope.itemEdit=angular.copy(selectedItem);
    };
    
    $scope.undoChanges();
    $scope.serviceGroups = [];
    if(isNew)  {        
        ServiceUserGroups.callCustomGet('user/userGroups/max').then(function(item) {
            $scope.itemEdit.UGIdentificationCode = item.max+1;
            selectedItem.UGIdentificationCode = item.max+1;
        });
    }else {
        
        for(var i=0;i<selectedItem.serviceGroups.length;i=i+1) {
            $scope.serviceGroups.push(selectedItem.serviceGroups[i]);
        } 
    }

    $scope.cancel=function(){
        $modalInstance.dismiss();
    };

    $scope.save=function(){
           $modalInstance.close($scope.itemEdit);     
    };

    $scope.openChooseDialogServiceGroups = function() {
        $modal.open({
            backdrop: 'static',
            keyboard : false,
            templateUrl: 'administration/template/tmpServiceGroupsView.tpl.html', 
            size: 'lg',
            controller: 'ctrlServiceGroupsChoose',
            windowClass: 'hmodal-info',
            resolve : {
                serviceGroups: function () {
                    return $scope.serviceGroups;
                },
                itemEdit: function () {
                    return $scope.itemEdit;
                }
            }
        }).result.then(function(result) {
            $scope.itemEdit.serviceGroups = result;
        });
    };
}])

.controller('ctrlUserGroupsChoose',['$scope','ServiceUserGroups', 'dialogs', '$modal', 'userGroups', 'itemEdit',  '$modalInstance',
function($scope, ServiceUserGroups, dialogs, $modal, userGroups, itemEdit, $modalInstance){
    $scope.propsUserGroups = ['UGIdentificationCode', 'UGName'];
    
    $scope.items=[];
    $scope.flagMultiple = true;
    $scope.userGroups = userGroups;
    $scope.loaded = false;

    $scope.callServer = function getData(tableState) {
        if(!$scope.loaded && $scope.items.length === 0) {
                $scope.isLoading = true;
                $scope.loaded = true;
                ServiceUserGroups.query(function(items) {
                    $scope.items=items;
                    $scope.isLoading = false;
                });
        }
    };
                
    $scope.callServer();
    
    $scope.uncheck = function (item) {
       var index = $scope.userGroups.map(function(it) { return it.id; }).indexOf(item.id);
       if(index !== -1) {
           var indexRemove = itemEdit.userGroups.map(function(it) { return it.id; }).indexOf(item.id);
            itemEdit.userGroups.splice(indexRemove, 1);
       } else {
           itemEdit.userGroups.push(item);
       }        
    };
    
    $scope.cancel=function(){
        $modalInstance.dismiss();
    };
    
    $scope.choose=function(){
        $modalInstance.close($scope.userGroups);
    };    
    
}]);	
