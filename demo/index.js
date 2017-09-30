;(function(window){
	//var str=base64.tranCode.encode('http://mvvideo11.meitudata.com/595721bce8d772919.mp4?k=9dcf816866d9f46a1d640ee23848b27f&t=59b20419');
	var content=document.getElementById("content"),
		encode=document.getElementById("encode"),//加密
		decode=document.getElementById("decode"),//解密
		result=document.getElementById("result");
	/**encode.onclick=function(){//js方式
		var value=content.value,
			str=value!==''?base64.tranCode.encode(value):"",
			base64str=str!==""?base64.tranCode.decode(str):"";
		result.innerHTML="正常base64加密：<br />"+window.btoa(unescape(encodeURIComponent(value)))+"<br /><br />混淆base64加密：<br />"+str+"<br /><br />混淆base64解密：<br />"+base64str;
	}**/
	encode.onclick=function(){//php方式
		var value=content.value,
			xhr = null,
			timeout=10000,
			dataType="JSON";
		if(value==''){
			return false;
		}
		try {
			if (window.XMLHttpRequest) {
				xhr = new XMLHttpRequest();
			}
			else if (window.ActiveXObject) {
				xhr = new ActiveXObject("Msxml2.Xmlhttp");
			}
		}
		catch (err) {
			xhr = new ActiveXObject("Microsoft.Xmlhttp");
		}
		if(xhr){
			xhr.onreadystatechange = function () {
				if (this.readyState == 4 && this.status == 200) {
					if(dataType=="text"||dataType=="TEXT"){
						if(callback!=null){//普通文本
							callback(xhr.responseText);
						}
					}else if(dataType=="xml"||dataType=="XML"){
						if(callback!=null){//接收xml文档
							callback(xhr.responseXML);
						}
					}else if(dataType=="json"||dataType=="JSON"){
						if(callback!=null){//将json字符串转换为js对象
							console.log(this.responseText);
							callback(eval("(" + this.responseText + ")"));
						}
					}
				}
				else {
					setTimeout(function () {
						xhr.abort();
					}, !timeout ? 15000 : timeout);
				}
			}
			xhr.open("get", "index.php?str="+encodeURIComponent(value)+"&time="+new Date().getTime(), true);
			xhr.send(null);
		}
	}
	function callback(data){
		if(data.status==200){
			var base64str=base64.tranCode.decode(data.encode);
			result.innerHTML="正常base64加密：<br />"+base64.tranCode.btoa(unescape(encodeURIComponent(content.value)))+"<br /><br />混淆base64加密：<br />"+data.encode+"<br /><br />混淆base64解密：<br />"+base64str;
			//result.innerHTML="正常base64加密：<br />"+base64to.encode(content.value)+"<br /><br />混淆base64加密：<br />"+data.encode+"<br /><br />混淆base64解密：<br />"+base64str;
			//result.innerHTML="混淆base64加密：<br />"+data.encode+"<br /><br />混淆base64解密：<br />"+base64str;
		}else{
			console.warn(data.errMsg);
		}
	}
	decode.onclick=function(){
		var value=content.value,
			str=value!==''?base64.tranCode.decode(value):"";
		result.innerHTML="混淆base64解密：<br />"+str;
	}
}(window));