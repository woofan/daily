addLoadEvent(getNewContent);
function getHTTPObject(){
	if(typeof XMLHttpRequest == "undefined")
		XMLHttpRequest = function(){
			try{return new ActiveXObject("Msxml2.XMLHTTP.6.0");}
				catch(e){}
			try{return new ActiveXObject("Msxml2.XMLHTTP.3.0");}
				catch(e){}
			try{return new ActiveXObject("Msxml2.XMLHTTP");}
				catch(e){}
			return false;
		}
		return new XMLHttpRequest();
}
function getNewContent(){
	var request = new XMLHttpRequest();
	if(request){
		request.open("GET","data.html",true);
		request.onreadystatechange = function(){
			if(request.readyState == 4){
				var para = document.createElement("p");
				var p = request.responseXML.getElementsByTagName("p")[0];//返回XML形式
				var p_txt = p.childNodes[0].nodeValue;
				var txt = document.createTextNode(p_txt);
				///var txt = document.createTextNode(request.responseText);//返回字符串形式
				para.appendChild(txt);
				document.getElementById("wf").appendChild(para);
			}
		}
		request.send(null);
	}else{
		alert("error!");
	}
}
function addLoadEvent(func){//该函数用于当页面加载完毕时安全的添加新函数
	var oldonload = window.onload;
	if(typeof window.onload != "function"){
		window.onload = func;
	}
	else{
		window.onload = function(){
			oldonload();
			func();
		}
	}
}