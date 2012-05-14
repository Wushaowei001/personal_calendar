/*****************************************************
*������������һ��������ı�Ԫ����
*****************************************************/
function focusOnFirst($jqElement){
	$($jqElement).find("input:visible:first").focus();
}
/*****************************************************
*��ձ�
*****************************************************/
function clearForm($element){
	try{
		if($($element).is("form"))
			$($element).resetForm();
		else
			$($element).find("form").resetForm();
	}
	catch(err){
		return;
	}
	return;
}

/*****************************************************
*��һ�������ֵ����һ��������Ӧ�ֶ�
*****************************************************/
function dataObjToForm(dataObj,jqForm){
	
	for(var key in dataObj){
		var data = dataObj[key];
		var jqElement ;
		if(typeof(data) == "boolean"){
			jqElement = jqForm.find("input[name=" + key + "][type=checkbox]");
			jqElement.attr('checked',data);
		}
		else if(typeof(data) == "string" || typeof(data) == "number"){
			jqElement = jqForm.find("[name=" + key + "]");
			jqElement.val(data);
		}else if(data instanceof Date){
			jqElement = jqForm.find(".date-picker[name=" + key + "]");
			jqElement.datepicker("setDate",data);
		}
	}
	jqForm.find(".date-picker");
}

/*****************************************************
*��������JS�����е�ֵ���ݸ�����id�ֶκ�content�ֶθ�ֵ��SelectԪ��
*****************************************************/
function valueToSelect(jqElement,dataArray,valueField,contentField){
	var option1 = "<option value='";
	var option2 = "'>";
	var option3 = "</option>";
	
	if(isUndefined(valueField))
		var valueField = "";
	if(isUndefined(contentField))
		var contentField = "";
		
	jqElement.html("");
	for(var i=0;i<dataArray.length;i++){
		var id = getObjectField(dataArray[i],valueField);
		var content = getObjectField(dataArray[i],contentField);
		content = getShort(content);
		var option = option1 + id + option2 + content + option3;
		jqElement.append(option);
	}
}