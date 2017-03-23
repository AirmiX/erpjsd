'use strict';
angular.module('Doob.administration')

.controller('ctrlLanguage',['$scope', '$rootScope', 'ServiceLanguage', 'dialogs', '$modal', 'CheckSelected',
function($scope, $rootScope, ServiceLanguage, dialogs, $modal, CheckSelected){
    
    
    $scope.propsLanguage = ['LIdentificationCode', 'LName', 'LShortName'];
    
   $scope.items=[];
    $scope.mode = 'details';
    $scope.loaded = false;
    $scope.flagMultiple = false;
    $scope.callServer = function getData(tableState) {
        if(!$scope.loaded && $scope.items.length === 0) {
                $scope.isLoading = true;
                $scope.loaded = true;
                ServiceLanguage.query(function(items) {
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
      $scope.itemEdit = CheckSelected.checkSelectedInTable($scope.itemEdit, $scope.showDisplay, $scope.items);
    });

    $scope.remove=function(item){
       /* var dlg = dialogs.confirm('Please confirm', 'Are you sure you want to delete item ' + item.LIdentificationCode + ' ' + item.LName + ' ?');
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
                    $rootScope.deleteConfirmationDialog(item.LIdentificationCode + ' ' + item.LName);
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
            templateUrl: 'administration/template/tmplLanguageEdit.tpl.html', 
            size: 'lg',
            windowClass: 'hmodal-info',
            controller: 'ctrlLanguageEdit',
            resolve: {
                    isNew: function() {
                        return isNew;                   
                    },
                    selectedItem: function () {
                        if(!isNew) {
                            return $scope.itemEdit;
                        } else {
                            return new ServiceLanguage();
                        }
                    }                    
            }
        }).result.then(function(result) {
            
           if(!angular.isDefined(result.id)) {
                ServiceLanguage.saveCustom( 'user/languages', result, function(savedObject){
                    $scope.items.unshift(savedObject);
                    if($scope.itemEdit !== null) {
                        var index = $scope.items.map(function(it) { return it.id; }).indexOf($scope.itemEdit.id);
                        $scope.items[index].isSelected = false;
                    }
                    $scope.itemEdit = angular.extend(savedObject);
                    $scope.items[0].isSelected = true;
                }); 
           } else {
               ServiceLanguage.updateCustom( '/user/languages/'+result.id, result, function(savedObject){                    
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

.controller('ctrlLanguageEdit',['$scope', 'ServiceLanguage',  '$modal', 'isNew', '$modalInstance', 'selectedItem', '$filter',
function($scope, ServiceLanguage,  $modal, isNew, $modalInstance, selectedItem, $filter) {
    $scope.mode = 'edit';
    $scope.undoChanges=function(){
        $scope.itemEdit=angular.copy(selectedItem);
    };
    
    $scope.undoChanges();

    $scope.cancel=function(){
        $modalInstance.dismiss();
    };

    $scope.save=function(){
           $modalInstance.close($scope.itemEdit);     
    };

}]);	
