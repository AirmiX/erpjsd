'use strict';
angular.module('Doob.administration')
.controller('ctrlMappingTable',['$scope',
function($scope){
	$scope.model={
		label:' Mapping Table',
		serviceName:'ServiceMappingTable',
		fields:[
		{
			label:'Name',
			name:'MTName',
			type:'text',
			important: true,
			validation:{
				required: false,
				vType: 'stringsingleline',
				customValidation:[ ]
			}
		},
		{
			label:'Condition',
			name:'MTCondition',
			type:'text',
			important: true,
			validation:{
				required: false,
				vType: 'stringsingleline',
				customValidation:[ ]
			}
		},
		{
			label:'Id',
			name:'MTId',
			type:'text',
			important: true,
			validation:{
				required: true,
				vType: 'stringsingleline',
				customValidation:[ ]
			}
		}
		],
		relationships:[
		{
			entity: {
					label:' Characteristics Registry',
					serviceName:'ServiceCharacteristicsRegistry',
					fields:[
					{
						label:' Identification Number',
						name:'CRIdentificationNumber',
						type:'text',
						important: true
					},
					{
						label:'Name',
						name:'CRName',
						type:'text',
						important: true
					},
					{
						label:'Priority',
						name:'CRPriority',
						type:'text',
						important: true
					},
					{
						label:' Print Priority',
						name:'CRPrintPriority',
						type:'text',
						important: true
					},
					{
						label:'Status',
						name:'CRStatus',
						type:'checkbox',
						important: true
					},
					{
						label:'Length',
						name:'CRLength',
						type:'text',
						important: true
					},
					{
						label:'Precision',
						name:'CRPrecision',
						type:'text',
						important: true
					}
					]
				},
				label: 'Characteristics',
				name: 'characteristics',
				editable: true,
				type: 'many'
		}
		]
	};
}]);	
