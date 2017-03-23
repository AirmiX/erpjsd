'use strict';

angular.module('Doob.common').factory('UnitConverter', ['$window' ,  function($window) {
	
	var imperialRatios = [
		{
			'name' : 'inch',
			'shortName' : 'in',
			'metricUnit' : 'meter',
			'metricShort' : 'm',
			'ratio' : 39.3701
		},
		{
			'name' : 'sq inch',
			'shortName' : 'in2',
			'metricUnit' : 'sq meter',
			'metricShort' : 'm2',
			'ratio' : 1550
		},
		{
			'name' : 'fl.oz',
			'shortName' : 'fl.oz',
			'metricUnit' : 'liter',
			'metricShort' : 'l',
			'ratio' : 33.814
		},
		{
			'name' : 'pound',
			'shortName' : '1b',
			'metricUnit' : 'gram',
			'metricShort' : 'g',
			'ratio' : 0.00220462
		},
		{
			'name' : 'miles per hour',
			'shortName' : 'mph',
			'metricUnit' : 'kilometers per hour',
			'metricShort' : 'kph',
			'ratio' : 1.60934
		},
		{
			'name' : 'fahrenheit',
			'shortName' : 'mph',
			'metricUnit' : 'celsius',
			'metricShort' : 'kph',
			'ratio' : 33.8
		}
	];
	
	var factory = {};	
	
	factory.metricToImperial = function(value, unit) {
		if($window.navigator.language === 'en-US'){
			for (var i = 0; i < imperialRatios.length; i+=1) { 
				if(imperialRatios[i].metricUnit === unit) {
					return { 'value' : value * imperialRatios[i].ratio, 'unit' : imperialRatios[i].name };
				}
			}
		}
		else if($window.navigator.language === 'sr') {
			return { 'value' : value, 'unit' : unit };
		}
	};
	
	factory.imperialToMetric = function(value, unit) {
		if($window.navigator.language === 'en-US'){
			for (var i = 0; i < imperialRatios.length; i+=1) { 
				if(imperialRatios[i].name === unit) {
					return { 'value' : value / imperialRatios[i].ratio, 'unit' : imperialRatios[i].metricUnit };
				}
			}
		}
		else if($window.navigator.language === 'sr') {
			return { 'value' : value, 'unit' : unit };
		}
	};
	
	return factory;
	
}]);