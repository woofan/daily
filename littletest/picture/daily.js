window.onload = main;
function changeHref(href){
	img = document.getElementsByTagName("img")[0];
	img.setAttribute("src",href);
}
function main(){
	a_list = document.getElementsByTagName("a");
	for(var i=0;i<a_list.length;i++){
		a_list[i].onclick = function(){
			changeHref(this.getAttribute("href"));
			showpic(this.getAttribute("href"));
			return false;
		}
	} 
}
function showpic(href){
	window.open(href,"wf","width=400,height=300");
}
