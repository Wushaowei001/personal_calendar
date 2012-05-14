$(document).ready(function(){
	initModal();

	cheatFunction();
	
	$(".hide-self").on('click',"",function(){
		$(this).parents(".modal").modal("hide");
	});
});

/***********************************************************************************
*͵������
*1.����JQuery��Position���������⣬��һ����ʾ�����
*������ô˺������ĵ�����ʱ����һ�����õ�position����������
*����֤֮���������ȷ�ԡ�����ʵ�����Ҳ���Ϊʲô��Chrome�µ�һ��
*ʹ��Position���������������
***********************************************************************************/
function cheatFunction(){
	//1
	$(".modal").modal("show");
	$(".modal").position({
		of:$(document),
		offset:"-1000 -1100"
	});
	$(".modal").modal("hide");
}
/*****************************************************
*��ʼ������modal
*****************************************************/
function initModal(){
	$(".modal").modal({show:false});
	$(".modal").draggable({handle:".modal-header,.modal-footer"});
}
/*****************************************************
*��ʾmodal���Ҷ�λ�ĺ���
*****************************************************/
function showModal($modal,$position){
	$($modal).modal('show');
	if(!isUndefined($position)){
		var vOffset = $($modal).height();
		var hOffset = $($modal).width();
		$($modal).position({
			of:$($position),
			offset:hOffset/2 + " " + vOffset/2,
			collision:"fit"
		});
	}
	else{
		$($modal).position({
			of:$(document),
			collision:"fit"
		});
	}
}