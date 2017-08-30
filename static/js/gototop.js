function hasClass(element, cls){
	
	var pattern = new RegExp('(\\s*)' + cls + '(\\s*)');
	return pattern.test(element.className);
}


function addClass(element, cls){
	if (!hasClass(element, cls)){
		element.className = element.className +  " " + cls;
	}
	return;
}

function removeClass(element, cls){
	if (hasClass(element, cls)){
		var reg = new RegExp('(\\s*)' + cls + '(\\s*)');
		var result = element.className = element.className.replace(reg, " ");
	}
	return;
}

function toggleClass(element, cls, flag){
	if(flag){
		addClass(element, cls);
	}else {
		removeClass(element, cls);
	}
	return;
}

function backToTop(){
	var THRESHOLD = 50;
	var top = document.getElementsByClassName("back-to-top")[0];
	var handler = function(){
		
		toggleClass(top, "back-to-top-on", window.pageYOffset>THRESHOLD);

		EventUtil.addHandler(top, "click", function(){
			var body = document.getElementsByTagName("body")[0];
			if(body.scrollTop){ //chrome
				$(document.body).stop().animate({
					scrollTop: 0
				},200);

			}else if(document.documentElement.scrollTop) {//firefox
				$(document.documentElement).stop().animate({
					scrollTop: 0
				}, 200);
			}
		});
	}
	EventUtil.addHandler(window, "scroll", handler);
}
$(document).ready(backToTop());
//EventUtil.addHandler(window, "load", backToTop);

