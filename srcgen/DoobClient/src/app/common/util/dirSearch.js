'use strict';

angular.module('Doob.common')
 .directive('customSearch',function(){
    return {
      restrict:'AE',
      require:'^stTable',
      templateUrl:'common/util/tmplSearchBoolean.tpl.html',
      scope:{
        param: '@param'
      },
      link:function(scope, element, attr, ctrl){
         scope.$watch('filterValue',function(value){
             
             if(value==='yes'){
               ctrl.search('true', scope.param);
             } else if(value==='no'){
               ctrl.search('false', scope.param);
             } else {
                ctrl.search('', scope.param);
             }
         });
      }
    };
  });
