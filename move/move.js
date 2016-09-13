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
function positionMessage(){
	var elem = document.getElementById("rec");
	elem.style.position = "absolute";
	elem.style.left = "50px";
	elem.style.top = "100px";
	//movement = setTimeout("moveMessage()",5000);//函数内部不用var定义的变量是全局变量

}
function moveMessage(){
	var elem = document.getElementById("rec");
	var left = parseInt(elem.style.left);
	var top = parseInt(elem.style.top); 
	if(left < 600) {
		left+=10;
	}
	if(left == 600){
		top+=10;
	}
	if(top == 500){
		backMessage();
		return true;
	}
	elem.style.left = left + "px";
	elem.style.top = top + "px";
	movement = setTimeout("moveMessage()",50);
}
function backMessage(){
	var elem = document.getElementById("rec");
	var left = parseInt(elem.style.left);
	var top = parseInt(elem.style.top);
	if(left > 50){
		left -=10;
	}
	if(left == 50){
		top -=10;
	}
	if(top == 100){
		moveMessage();
		return treu;
	}
	elem.style.left = left + "px";
	elem.style.top = top + "px";
	movement = setTimeout("backMessage()",50);
}
addLoadEvent(positionMessage);
addLoadEvent(moveMessage);