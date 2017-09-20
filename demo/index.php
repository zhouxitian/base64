<?php 
class base64{
	public function encode($str){
		$base64=base64_encode($str);
		$random=$this->getRanNum($base64);//获取16进制是4位数的随机字符
		$pos = $this->getDec($random);//获取混淆位置坐标
		$base64 = $this->addStr($base64, $pos);//插入混淆字符		
		return join('',array_reverse(str_split($random))).$base64;
	}
	private function getRanNum($str){
		$length=strlen($str);
		$ranArr=array();
		/** 4101开始16进制是4位数 **/
		for($i=4101;$i<=9999;$i++){//找出所有符合要求的16进制4位数
			$n=dechex($i);//10转成16
			if($length>=8&&!(floor($i/100)%10===0||$i%10===0)&&strlen($n)===4){
			//正常的base64编码长度大于8才前后加混淆字符
				if(floor($i/1000)<=$length/2&&floor($i%100/10)<=$length/2){//混淆位置不能大于长度一半
					array_push($ranArr,$n);
				}
			}else if($i%100===0&&strlen($n)===4){//只在前面插入混淆字符
				if(floor($i/1000)<=$length){//混淆位置不能大于长度
					array_push($ranArr,$n);
				}
			}
		}
		$ran = rand(0,count($ranArr)-1);
		return $ranArr[$ran];
	}
	private function getDec($str){
		$str = hexdec($str);//前4位倒序的16进制
		return [
			"pre"=> str_split(substr($str,0,2)),//前面坐标
			"tail"=> str_split(substr($str,2))//后面坐标
		];
	}
	private function addStr($str, $pos){
		$r1=$this->getRanStr($pos["pre"][1]);//获取随机字符串(前)
		$r2=$this->getRanStr($pos["tail"][1]);//获取随机字符串(后)
		$pre=$this->insertStr($str,$r1,$pos["pre"][0]);//插入随机字符串(前)
		$tail=strlen($pre) - $pos["tail"][0];
		$str=$this->insertStr($pre,$r2,$tail);//插入随机字符串(后)
		return $str;
	}
	private function getRanStr($num){//获取指定个数随机字符串
		$str=[0,1,2,3,4,5,6,7,8,9,'a','b','c','d','e','f','g','h','i','j','k','l','m','n','o','p','q','r','s','t','u','v','w','x','y','z','A','B','C','D','E','F','G','H','I','J','K','L','M','N','O','P','Q','R','S','T','U','V','W','X','Y','Z','+'];
		$length=count($str);
		$res = "";
		 for(; $num-- ;) {
			$id = rand(0,$length-1);
			$res .= $str[$id];
		 }
		 return $res;
	}
	private function insertStr($str,$addstr,$pos){
		return substr($str,0,$pos).$addstr.substr($str,$pos);
	}
}
if(isset($_GET["str"])){
	$code=new base64();
	$data["encode"]=$code->encode($_GET["str"]);
	$data["status"]=200;
}else{
	$data["status"]=-1;
	$data["errMsg"]="need parameter str";
}
echo json_encode($data);
?>