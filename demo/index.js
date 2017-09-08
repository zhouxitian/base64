;(function(window){
	//var str=base64.tranCode.encode('http://mvvideo11.meitudata.com/595721bce8d772919.mp4?k=9dcf816866d9f46a1d640ee23848b27f&t=59b20419');
	var content=document.getElementById("content"),
		encode=document.getElementById("encode"),
		decode=document.getElementById("decode"),
		result=document.getElementById("result");
	encode.onclick=function(){
		var value=content.value,
			str=value!==''?base64.tranCode.encode(value):"",
			base64str=str!==""?base64.tranCode.decode(str):"";
		result.innerHTML="正常base64加密：<br />"+window.btoa(unescape(encodeURIComponent(value)))+"<br /><br />混淆base64加密：<br />"+str+"<br /><br />混淆base64解密：<br />"+base64str;
	}
	decode.onclick=function(){
		var value=content.value,
			str=value!==''?base64.tranCode.decode(value):"";
		result.innerHTML="混淆base64解密：<br />"+str;
	}
}(window));