function changeHref(href){
	img = document.getElementsByTagName("img");
	img.setAttribute("src",href);
}
function getHref(obj){
	var href = obj.getAttribute("href");
	changeHref(href);
}
