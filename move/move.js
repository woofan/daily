function addLoadEvent(func){
	var oldonload = window.onload;
	if(typeof(oldonload) != "function"){
		window.onload = func;
	}
	else{
		window.onload = function() {
			oldonload();
			func();
		}
	}	
}
function positionMessage(element,position,left,top){
	var elem = document.getElementById(element);
	elem.style.position = position;
	elem.style.left = left;
	elem.style.top = top;

}
function moveMessage(element,left_to,pertime){
	var elem = document.getElementById(element);
	var left_now = parseInt(elem.style.left);
	var top_now = parseInt(elem.style.top);
	if(elem.movement){
		clearTimeout(elem.movement);
	} 
	if(left_now == left_to) {
		return true;
	}
	if(left_now > left_to){
		left_now-=Math.ceil((left_now-left_to)/30);
	}
	if(left_now < left_to){
		left_now+=Math.ceil((left_to-left_now)/30);
	}
	elem.style.left = left_now + "px";
	var repeat = "moveMessage(\""+element+"\","+left_to+","+pertime+")";
	elem.movement = setTimeout(repeat,pertime);//函数内部不用var定义的变量是全局变量
}
function showPicture(){
	var pic = document.getElementById("pic");
	var list = document.getElementsByTagName("a");
	// for(var i=0;i<list.length;i++){
	// 	list[i].onmouseover  = function(){
	// 		moveMessage("pic",-200*i,1);
	// 	}
	// }
	list[0].onmouseover  = function(){
		moveMessage("pic",0,1);
	}
	list[1].onmouseover  = function(){
		moveMessage("pic",-200,1);
	}
	list[2].onmouseover  = function(){
		moveMessage("pic",-400,1);
	}
}
addLoadEvent(positionMessage("show","relative","0px","200px"));
addLoadEvent(positionMessage("pic","absolute","0px","0px"));
addLoadEvent(showPicture());