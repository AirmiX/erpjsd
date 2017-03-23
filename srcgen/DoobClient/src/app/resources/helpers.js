'use strict';
var myapp = angular.module('helpers', [ ]);
myapp.filter('dateFormat', function($filter)
{
 return function(input)
 {
  if(input === null){ return ''; }

  var _date = $filter('date')(new Date(input), 'dd.MM.yyyy');

  return _date.toUpperCase();

 };
});

myapp.filter('substring', function($filter) {
	return function(str, start, end) {
        if(angular.isDefined(str)){
            return str.substring(start, end);
        } else {
            return '';
        }
	};
});

myapp.filter('yesNo', function() {
    return function(input) {
        return input ? 'Yes' : 'No';
    };
});

myapp.factory('CheckSelected', ['$rootScope',
  function($rootScope){
return {
    checkSelectedInTable : function (itemEdit, colDisp, items) {
        if(itemEdit !== null) {
            var index1 = colDisp.map(function(it) { return it.id; }).indexOf(itemEdit.id);
            if(index1 === -1) {

                if(items) {
                    index1 = items.map(function(it) { return it.id; }).indexOf(itemEdit.id);
                    items[index1].isSelected = false;
                }
                itemEdit  = null;
            }
        }
        return itemEdit;
    }
  };
}]);

    //$scope.$watch('colDisp', checkSelectedInTable);
