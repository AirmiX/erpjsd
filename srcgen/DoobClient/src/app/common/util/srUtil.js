'use strict';

angular.module('Doob.common').factory('ServiceUtil', [function () {
	var utilService=function(){};
	/*
	//neccessary if enum is integer
	utilService.prototype.fromNumberToEnum=function(entity,model,includeRelationships){
		if(!entity || !model) return;

		for(var ind=0;ind<model.fields.length;ind=ind+1){
			if(model.fields[ind].enumValues){
				if(typeof entity[model.fields[ind].name] === 'number'){
					entity[model.fields[ind].name]=model.fields[ind].enumValues[entity[model.fields[ind].name]];
				}
			}			
		}

		if(includeRelationships){
			for(ind=0;ind<model.relationships.length;ind=ind+1){
				var rEntityModel=model.relationships[ind].entity;
				var relationship=entity[model.relationships[ind].name];
				if(!relationship) continue;
				for(var fInd=0;fInd<rEntityModel.fields.length;fInd=fInd+1){
					if(rEntityModel.fields[fInd].enumValues){
						if(model.relationships[ind].type==='many'){
							for(var rInd=0;rInd<relationship.length;rInd=rInd+1){
								if(typeof relationship[rInd][rEntityModel.fields[fInd].name] === 'number'){
									relationship[rInd][rEntityModel.fields[fInd].name]=
										rEntityModel.fields[fInd].enumValues[relationship[rInd][rEntityModel.fields[fInd].name]];
								}
							}
						}
						if(model.relationships[ind].type==='one'){
							if(typeof relationship[rEntityModel.fields[fInd].name] === 'number'){
								relationship[rEntityModel.fields[fInd].name]=
									rEntityModel.fields[fInd].enumValues[relationship[rEntityModel.fields[fInd].name]];
							}
						}
					}
				}
			}
		}
	};

	utilService.prototype.fromNumberToEnumList=function(list,model,includeRelationships){
		if(!list || !model) return;
		for(var ind=0;ind<list.length;ind=ind+1){
			this.fromNumberToEnum(list[ind],model,includeRelationships);	
		}
	};

	utilService.prototype.fromEnumToNumber=function(entity,model,includeRelationships){
		if(!entity || !model) return;
		for(var ind=0;ind<model.fields.length;ind=ind+1){
			if(model.fields[ind].enumValues){
				if(typeof entity[model.fields[ind].name] === 'string'){
					entity[model.fields[ind].name]=model.fields[ind].enumValues.indexOf(entity[model.fields[ind].name]);
				}
			}			
		}

		if(includeRelationships){
			for(ind=0;ind<model.relationships.length;ind=ind+1){
				var rEntityModel=model.relationships[ind].entity;
				var relationship=entity[model.relationships[ind].name];
				if(!relationship) continue;
				for(var fInd=0;fInd<rEntityModel.fields.length;fInd=fInd+1){
					if(rEntityModel.fields[fInd].enumValues){
						if(model.relationships[ind].type==='many'){
							for(var rInd=0;rInd<relationship.length;rInd=rInd+1){
								if(typeof relationship[rInd][rEntityModel.fields[fInd].name] === 'string'){
									relationship[rInd][rEntityModel.fields[fInd].name]=
										rEntityModel.fields[fInd].enumValues.indexOf
											(relationship[rInd][rEntityModel.fields[fInd].name]);
								}
							}
						}
						if(model.relationships[ind].type==='one'){
							if(typeof relationship[rEntityModel.fields[fInd].name] === 'string'){
								relationship[rEntityModel.fields[fInd].name]=
									rEntityModel.fields[fInd].enumValues.indexOf(relationship[rEntityModel.fields[fInd].name]);
							}
						}
					}
				}
			}
		}
	};

	utilService.prototype.fromEnumToNumberList=function(list,model,includeRelationships){
		if(!list || !model) return;
		for(var ind=0;ind<list.length;ind=ind+1){
			this.fromEnumToNumber(list[ind],model,includeRelationships);	
		}
	};
	*/
	return utilService;
}]);
