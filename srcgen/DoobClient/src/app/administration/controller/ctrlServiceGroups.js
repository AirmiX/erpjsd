'use strict';
angular.module('Doob.administration')



.controller('ctrlServiceGroups',['$scope', '$rootScope','ServiceServiceGroups', 'dialogs', '$modal', 'CheckSelected',
function($scope, $rootScope, ServiceServiceGroups, dialogs, $modal, CheckSelected){
    
    
    $scope.propsServiceGroups = ['SGIdentificationCode', 'SGName'];
    
    $scope.items=[];
    $scope.mode = 'details';
    $scope.loaded = false;
    $scope.callServer = function getData(tableState) {
        if(!$scope.loaded && $scope.items.length === 0) {
                $scope.isLoading = true;
                $scope.loaded = true;
                ServiceServiceGroups.query(function(items) {
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
        /*var dlg = dialogs.confirm('Please confirm', 'Are you sure you want to delete item ' + item.SGIdentificationCode + ' ' + item.SGName + ' ?');
        dlg.result.then(function(btn) {
            var removeIndex = $scope.items.map(function(it) { return it.id; }).indexOf(item.id);
            $scope.items.splice(removeIndex, 1);
            item.$remove();
            $scope.itemEdit  = null;
        });  */
        $rootScope.sweetAlert.swal($rootScope.swalOptions,
          function (isConfirm) {
            if (isConfirm) {
                item.$remove(function(){
                    var removeIndex = $scope.items.map(function(it) { return it.id; }).indexOf(item.id);
                    $scope.items.splice(removeIndex, 1);
                    $scope.itemEdit = null;
                    $rootScope.deleteConfirmationDialog(item.SGIdentificationCode + ' ' + item.SGName);
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
            templateUrl: 'administration/template/tmpServiceGroupsEdit.tpl.html', 
            size: 'lg',
            windowClass: 'hmodal-info',
            controller: 'ctrlServiceGroupsEdit',
            resolve: {
                    isNew: function() {
                        return isNew;                   
                    },
                    selectedItem: function () {
                        if(!isNew) {
                            return $scope.itemEdit;
                        } else {
                            return new ServiceServiceGroups();
                        }
                    }                    
            }
        }).result.then(function(result) {
            
           if(!angular.isDefined(result.id)) {
                ServiceServiceGroups.saveCustom( 'user/serviceGroups', result, function(savedObject){
                    $scope.items.unshift(savedObject);
                    if($scope.itemEdit !== null) {
                        var index = $scope.items.map(function(it) { return it.id; }).indexOf($scope.itemEdit.id);
                        $scope.items[index].isSelected = false;
                    }
                    $scope.itemEdit = angular.extend(savedObject);
                    $scope.items[0].isSelected = true;
                }); 
           } else {
               ServiceServiceGroups.updateCustom( '/user/serviceGroups/'+result.id, result, function(savedObject){                    
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

.controller('ctrlServiceGroupsEdit',['$scope', 'ServiceServiceGroups',  '$modal', 'isNew', '$modalInstance', 'selectedItem', '$filter',
function($scope, ServiceServiceGroups,  $modal, isNew, $modalInstance, selectedItem, $filter) {
    $scope.mode = 'edit';
    $scope.propsUserGroups = ['UGIdentificationCode', 'UGName'];
    $scope.propsServices = ['SUri', 'SMethod'];
    $scope.undoChanges=function(){
        $scope.itemEdit=angular.copy(selectedItem);
    };
    
    $scope.undoChanges();
    $scope.userGroups = [];
    $scope.services = [];
    if(isNew)  {        
        ServiceServiceGroups.callCustomGet('user/serviceGroups/max').then(function(item) {
            $scope.itemEdit.SGIdentificationCode = item.max+1;
            selectedItem.SGIdentificationCode = item.max+1;
        });
    }else {
        for(var i=0;i<selectedItem.userGroups.length;i=i+1) {
            $scope.userGroups.push(selectedItem.userGroups[i]);
        }
        for(var j=0;j<selectedItem.services.length;j=j+1) {
            $scope.services.push(selectedItem.services[j]);
        } 
    }

    $scope.cancel=function(){
        $modalInstance.dismiss();
    };

    $scope.save=function(){
           $modalInstance.close($scope.itemEdit);     
    };

    $scope.openChooseDialogUserGroups = function() {
        $modal.open({
            backdrop: 'static',
            keyboard : false,
            templateUrl: 'administration/template/tmpUserGroupsView.tpl.html', 
            size: 'lg',
            controller: 'ctrlUserGroupsChoose',
            windowClass: 'hmodal-info',
            resolve : {
                userGroups: function () {
                    return $scope.userGroups;
                },
                itemEdit: function () {
                    return $scope.itemEdit;
                }
            }
        }).result.then(function(result) {
            $scope.itemEdit.userGroups = result;
        });
    };

    $scope.openChooseDialogServices = function() {
        $modal.open({
            backdrop: 'static',
            keyboard : false,
            templateUrl: 'administration/template/tmpServicesView.tpl.html', 
            size: 'lg',
            controller: 'ctrlServicesChoose',
            windowClass: 'hmodal-info',
            resolve : {
                services: function () {
                    return $scope.services;
                },
                itemEdit: function () {
                    return $scope.itemEdit;
                }
            }
        }).result.then(function(result) {
            $scope.itemEdit.services = result;
        });
    };
}])

.controller('ctrlServiceGroupsChoose',['$scope','ServiceServiceGroups', 'dialogs', '$modal', 'serviceGroups', 'itemEdit',  '$modalInstance',
function($scope, ServiceServiceGroups, dialogs, $modal, serviceGroups, itemEdit, $modalInstance){
    $scope.propsServiceGroups = ['SGIdentificationCode', 'SGName'];
    
    $scope.items=[];
    $scope.flagMultiple = true;
    $scope.serviceGroups = serviceGroups;
    $scope.loaded = false;

    $scope.callServer = function getData(tableState) {
        if(!$scope.loaded && $scope.items.length === 0) {
                $scope.isLoading = true;
                $scope.loaded = true;
                ServiceServiceGroups.query(function(items) {
                    $scope.items=items;
                    $scope.isLoading = false;
                });
        }
    };
                
    $scope.callServer();
    
    $scope.uncheck = function (item) {
       var index = $scope.serviceGroups.map(function(it) { return it.id; }).indexOf(item.id);
       if(index !== -1) {
           var indexRemove = itemEdit.serviceGroups.map(function(it) { return it.id; }).indexOf(item.id);
            itemEdit.serviceGroups.splice(indexRemove, 1);
       } else {
           itemEdit.serviceGroups.push(item);
       }        
    };
    
    $scope.cancel=function(){
        $modalInstance.dismiss();
    };
    
    $scope.choose=function(){
        $modalInstance.close($scope.serviceGroups);
    };    
    
}]);    	
