Objects = {};

Objects.func = {};
//Ĭ�ϱȽϺ���
Objects.func.compare = function(obj1,obj2,fields){
	var val1 = getObjectField(obj1,fields);
	var val2 = getObjectField(obj2,fields);
	if(val1 == val2)
		return 0;
	else if(val1 > val2)
		return 1;
	else
		return -1;
}

Objects.getObjectInArray = function(objs,field,val,isMultiple){
	return getObjectInArray(objs,field,val,isMultiple);
}
Objects.func.getObjectInArray = function(objs,field,val,isMultiple){
	return getObjectInArray(objs,field,val,isMultiple);
}

function getObjectInArray(objs,field,val,isMultiple){
	if(isUndefined(isMultiple)){
		isMultiple = false;
	}
	var results = [];
	for(var i=0;i<objs.length;i++){
		if(getObjectField(objs[i],field) == val){
			if(isMultiple)
				results.push(objs[i]);
			else
				return objs[i];
		}
	}
	if(results.length !=0 )
		return results;
		
	return null;
}
function findAndUpdateObject(objs,field,val,obj,action){
	if(isUndefined(action))
		action = 'update';
	else if(action == 'add'){
		objs.push(obj);
		return obj;
	}
	
	for(var i=0;i<objs.length;i++){
		if(getObjectField(objs[i],field) == val){
			if(action == "delete"){
				objs.splice(i,1);
			}
			else
				objs[i] = obj;
			return objs[i];
		}
	}
	
	objs.push(obj);
	return obj;
}
/*****************************************************
*���ݸ����ֶλ�ȡһ�������ĳ���ֶ�ֵ
*****************************************************/
function getObjectField(obj,field){
	if(isUndefined(field) || field == "")
		return obj;
	
	var fieldArray = field.split(".");
	var nowLevel = obj;
	for(var i=0;i<fieldArray.length;i++){
		if(!isUndefined(nowLevel[fieldArray[i]]))
			nowLevel = nowLevel[fieldArray[i]];
		else
			break;
	}
	return nowLevel;
}
Objects.func.getObjectField = function(obj,field){
	return getObjectField(obj,field);
}
/*****************************************************
*�ж�һ�������Ƿ���Ϲ�������
*****************************************************/
Objects.isObjectShouldBeFilter = function(obj,filter){
	for(var i=0;i<filter.length;i++){
		var objVal = getObjectField(obj,filter[i].field);
		var filterVal = filter[i].val;
		if(filter[i].type == 'eq'){
			if(objVal != filterVal) return true;
		}
		if(filter[i].type == 'ne'){
			if(objVal == filterVal) return true;
		}
	}
	return false;
}

/*****************************************************
*���пͻ��˶������ݸ��µķ���
*****************************************************/
Objects.func.update = function(target,objs,field,action,compareFunc){

	if(isUndefined(objs))
		return false;
	
	if(!(objs instanceof Array))
		objs = [objs];
	if(isUndefined(compareFunc) || typeof(compareFunc) != 'function')
		compareFunc = Objects.func.compare;
	
	
	if(isUndefined(action))
		action = "updateOrNew";
	
	if(action == 'new'){
		return target.concat(objs);
		
	}
	
	
		
	for(var i=0;i<objs.length;i++){
		var o = objs[i];
		var t = Objects.func.getObject(target,o,field,false,compareFunc);
		if(t != null){
			var index = target.index(t);
			if(action == "update" || action == "updateOrNew"){
				target[index] = o;
			}else if(action == "delete"){
				target.splice(index,1);
			}	
		}else{
			if(action == "updateOrNew" || action == 'update')
				target.push(o);
		}
	}
	
	return target;
}
/*****************************************************
*���Ҷ���
*****************************************************/
Objects.func.getObject = function(target,val,field,isMutiple,compareFunc){
	if(isUndefined(compareFunc) || typeof(compareFunc) != 'function')
		compareFunc = Objects.func.compare;
	
	if(isUndefined(isMutiple))
		isMutiple = false;
	
	var results = [];
	for(var i=0;i<target.length;i++){
		if(compareFunc(target[i],val,field) == 0){
			if(isMutiple == true)
				results.push(target[i]);
			else 
				return target[i];
		}
	}
	if(isMutiple == false)
		return null;
	else
		return results;
}

/*****************************************************
*����Array���ܣ�����һ�������������е�����
*****************************************************/
Array.prototype.index = function(obj,jsonFind){
	if(isUndefined(jsonFind))
		jsonFind = true;

	for(var i=0;i<this.length;i++){
		if(jsonFind == false){
			if(this[i] == obj)
				return i;
		}else{
			if(JSON.stringify(this[i]) == JSON.stringify(obj))
				return i;
		}
	}
	
	return -1;
}
