// 简化jq extend()函数
function extend (){
	var target = arguments[0] || {},
		length = arguments.length,
		i = 1,
		src,copy,options,name;

	for (; i < length; i++){
		if ((options = arguments[i]) != null){
			for (name in options){
				src = target[name];
				copy = options[name];

				if (copy !== undefined){
					target[name] = copy;
				}
			}
		}
	}	
	return target;
};

function SidebarToggleLine(settings) {
	this.el = document.getElementsByClassName(settings.el)[0]; 
	this.rotate_now = 0;
	this.status = extend({},{
		init: {
			width: '100%',
			transform: 'rotateZ(0deg)',
			top: 0
		}
	}, settings.status);
}

SidebarToggleLine.prototype.init = function(){
	this.transform('init',this.rotate_now);
};
SidebarToggleLine.prototype.arrow = function(){
	this.transform('arrow',this.rotate_now);
}
SidebarToggleLine.prototype.close = function(){
	this.transform('close',this.rotate_now);
}
SidebarToggleLine.prototype.transform = function(status,rotate_now){
	var style_obj = this.status[status];
	var style = {};
	var style_rotate = {};
	var self = this;
	for (name in style_obj){
		if (name == "transform"){
			style_rotate[name] = style_obj[name];
		}else{
			style[name] = style_obj[name];
		}
	}

	var updateRotate = function(self, rotate_now){
		self.rotate_now = rotate_now;
	}

	$(this.el).stop().animate(style,{
		step: function(now,fx){
			if (fx.prop == "width"){
				if(style_rotate["transform"]){
					
					//根据rotateZ的当前值和目标值进行动画
					var rotate_target = parseInt(/(\-)?(\d+)/.exec(style_rotate["transform"])[0]);
					var rotate_var = rotate_now + fx.pos * (rotate_target - rotate_now);
					//var rotate_var = rotate_now + (Math.abs(now-fx.start)/Math.abs(fx.end-fx.start)) * (rotate_target - rotate_now);
					$(this).css('transform', 'rotateZ(' + rotate_var + 'deg)');

					// update the value of rotate_now
					updateRotate(self, rotate_var);
				}
			}
		},
		duration: "normal"
	});
}


var sidebar_toggle_line_1st = new SidebarToggleLine({
	el: 'sidebar-toggle-line-first',
	status: {
		arrow: {width: '50%', transform: 'rotateZ(-45deg)', top: '2px'},
		close: {width: '100%', transform: 'rotateZ(-45deg)', top: '5px'}
	}
});

var sidebar_toggle_line_2nd = new SidebarToggleLine({
	el: 'sidebar-toggle-line-middle',
	status: {
		arrow: {width: '90%'},
		close: {width: '0%'}
	}	
});

var sidebar_toggle_line_3rd = new SidebarToggleLine({
	el: 'sidebar-toggle-line-last',
	status: {
		arrow: {width: '50%', transform: 'rotateZ(45deg)', top: '-2px'},
		close: {width: '100%', transform: 'rotateZ(45deg)', top: '-5px'}
	}	
});

//--- 
var sidebarToggleLines = {
	lines: [],
	push: function(line){
		this.lines.push(line);
	},
	init: function (){
		this.lines.forEach(function(line){
			line.init();	
		});
	},
	arrow: function (){
		this.lines.forEach(function(line){
			line.arrow();
		})
	},
	close: function (){
		this.lines.forEach(function(line){
			line.close();
		})
	}
}; 

sidebarToggleLines.push(sidebar_toggle_line_1st);
sidebarToggleLines.push(sidebar_toggle_line_2nd);
sidebarToggleLines.push(sidebar_toggle_line_3rd);

// ---
var SIDEBAR_WIDTH = '320px';
var sidebarToggleMotion = {
	sidebar_el: document.getElementById("sidebar"),
	toggle_el: document.getElementsByClassName("sidebar-toggle")[0],
	body: document.getElementsByTagName("body")[0],
	sidebar_content_el: document.getElementsByClassName("sidebar-content")[0],
	isSidebarVisible: false,

	init: function(){
	    EventUtil.addHandler(this.toggle_el, "mouseenter", this.mouseEnterHandler.bind(this));
	    EventUtil.addHandler(this.toggle_el, "mouseleave", this.mouseLeavehander.bind(this));
	    EventUtil.addHandler(this.toggle_el, "click", this.clickHandler.bind(this));
		
	},
	mouseLeavehander: function(){
		if (this.isSidebarVisible){
			return;
		}
	    sidebarToggleLines.init();
	},
	mouseEnterHandler: function(){
		if (this.isSidebarVisible){
			return;
		}
		sidebarToggleLines.arrow();
	},
	clickHandler: function(){
		this.isSidebarVisible ? this.hideSidebar() : this.showSidebar();	
		this.isSidebarVisible = ! this.isSidebarVisible;
	},
	showSidebar: function(){
		var self = this;
		$(this.sidebar_el).stop().animate({width: SIDEBAR_WIDTH},
			{
				duration: "fast",
				done: function(){
					$(self.sidebar_content_el).fadeIn();
				} 
			});
		$(this.body).stop().animate({paddingRight: SIDEBAR_WIDTH}, "fast");
	    sidebarToggleLines.close();
	},
	hideSidebar: function(){
		var self = this;
		$(this.sidebar_el).stop().animate({width: 0}, 
			{
				duration: "fast",
				start: function(){
					self.sidebar_content_el.style.display = "none";
				} 
			});

		$(this.body).stop().animate({paddingRight: 0}, "fast");
		sidebarToggleLines.init();
	    //sidebarToggleLines.arrow();
	}
}
$(document).ready(sidebarToggleMotion.init());
