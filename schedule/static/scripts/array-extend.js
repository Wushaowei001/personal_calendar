/*****************************************************
*�������鹦�ܣ��ж�ĳԪ���Ƿ������������
*****************************************************/
Array.prototype.contain = function(obj){
	for(var i=0;i<this.length;i++){
		var val = this[i];
		if(val == obj)
			return true;
	}
	
	return false;
}