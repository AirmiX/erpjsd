'use strict';

angular.module('Doob.common')
.directive('draggable',['$document', function ($document) {
  return function (scope, element) {
    var startX = 0,
      startY = 0,
      x = 0,
      y = 0;
	 
    
	element.css({
      position: 'fixed',
      cursor: 'default'
    });
    element.on('mousedown', function (event) {
      // Prevent default dragging of selected content
	  startX = event.screenX - x;
      startY = event.screenY - y;
	  //if(event.target.nodeName === 'DIV' || event.target.nodeName === 'H3') {
		if(event.target.className.split(/\s+/).indexOf('modal-header') > -1 || event.target.className.split(/\s+/).indexOf('modal-title') > -1) {
			  event.preventDefault();
			  $document.on('mousemove', mousemove);
			  $document.on('mouseup', mouseup);
		}
    });

    function mousemove(event) {
      y = event.screenY - startY;
      x = event.screenX - startX;
		
      element.css({
        top: y + 'px',
        left: x + 'px'
      });
    }

    function mouseup() {
      $document.unbind('mousemove', mousemove);
      $document.unbind('mouseup', mouseup);
    }
  };
}]);