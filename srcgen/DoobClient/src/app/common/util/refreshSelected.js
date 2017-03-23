'use strict';

angular.module('Doob.common')
 .directive('refreshSelected',function(){
    return {
      restrict:'A',
      require:'^stTable',
      scope:{
        refreshSelected:'=',
        source:'=',
        safeSrc:'=',
        itemEdit:'='
      },
      link:function(scope, element, attr, ctrl){
         scope.$watch('refreshSelected',function(value){
             
             
            if(scope.itemEdit) {
                var index1 = scope.source.map(function(it) { return it.id; }).indexOf(scope.itemEdit.id);
                if(index1 === -1) {
                    index1 = scope.safeSrc.map(function(it) { return it.id; }).indexOf(scope.itemEdit.id);
                    scope.safeSrc[index1].isSelected = false;
                    scope.itemEdit  = null;
                }
            }
         });
      }
    };
  });
