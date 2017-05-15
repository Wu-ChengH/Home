/*******************************************************************************
 * zNavigation.js -  zNavigation Script library
 * Version v1.0.0
 * Copyright (C) 2016 zengchao
 *
 * @Author zengchao
 * @Email zengchao@sefonsoft.com
 * @UpdateTime (2016-07-11)
 *******************************************************************************/

(function(window,undefined){
	var zNavigation = function(option){
		var n = this;
			n.option = {
				ele:"", //导航容器
				title : "", //导航标题
				idKey:"id", //主数据key，默认id
				theme:"", //导航主题
				width:200, //宽度，单位px
				close:false, //是否可关闭
				icon:true, //是否显示图标
				singleOpen:true, //是否只允许同时展开一个
				speed: 300, //折叠速度
				search:false,  //是否开启搜索过滤
				data:[], //导航数据
				onInit:function(){}, //初始化回调函数
				complete:function(){}, //完成后回调函数
				error:function(){},  //出错后回调函数
				onClick:function(){}, //点击后回调函数
				onClose:function(){}, //点击关闭回调函数
				titleTpl:"<div class=\"zNavigation-title\">{{title}}</div>",
				searchTpl:"<form class=\"filterform\" action=\"#\"><input type=\"text\" class=\"filterinput\"></form>",
			};
			n.extend(option);
			n.init();
	}
	zNavigation.prototype = {
		extend : function(option){
			if(option==null||typeof option!="object") return;
			for(var key in option){
				if(this.get(key)!=undefined) this.set(key,option[key]);
			}
		},
		get : function(name){
			return this.option[name];
		},
		set : function(name,value){
			this.option[name]=value;
		},
		build : function(data){
			var n = this;
			var result = "";
			$(data).each(function(i,v){
				if(v.children==undefined){
					result += "<li><a "+((v.url!=undefined)?"url=\""+v.url+"\"":"")+((v.id!=undefined&&v.id!="")?" id=\""+v.id+"\"":"")+">"+((n.get("icon")==true)?"<i class=\"fa "+((v.ico!=undefined)?"fa-"+v.ico:"")+"\"></i>":"")+v.name+"</a></li>";
				}else{
					result += "<li><a "+((v.url!=undefined)?"url=\""+v.url+"\"":"")+((v.id!=undefined&&v.id!="")?" id=\""+v.id+"\"":"")+">"+((n.get("icon")==true)?"<i class=\"fa "+((v.ico!=undefined)?"fa-"+v.ico:"")+"\"></i>":"")+v.name+"<i class=\"fa fa-chevron-down\"></i></a><ul class=\"submenu\">"+n.build(v.children)+"</ul></li>";
				}
			});
			return result;
		},
		search : function(header){
			var n = this;
			var filterform = $(n.get("searchTpl"));
			header.append(filterform);
			$.expr[":"].Contains = function(a, i, m) {
				return (a.textContent || a.innerText || "").toUpperCase().indexOf(m[3].toUpperCase()) >= 0;
			};
			$(".filterinput",filterform).change(function() {
				var filter = $(this).val();
				if (filter) {
					var $matches = $(".zNavigation-list").find("a:Contains(" + filter + ")").parent();
					$("li", ".zNavigation-list").not($matches).slideUp();
					$matches.slideDown();
				} else {
					$(".zNavigation-list").find("li").slideDown();
				}
				return false;
			}).keyup(function() {
				$(this).change();
			});
		},
		addEvent : function(){
			var n = this;
			n.get("ele").off("click","ul li").on("click","ul li",function(){
				var speed = n.get("speed"),
					singleOpen = n.get("singleOpen");
				
                if ($(this).children(".submenu").length > 0) {
                    if ($(this).children(".submenu").css("display") == "none") {
                        $(this).children(".submenu").slideDown(speed);
                        $(this).children(".submenu").siblings("a").addClass("open");
                        if (singleOpen==true) {
                            $(this).siblings().children(".submenu").slideUp(speed);
                            $(this).siblings().children(".submenu").siblings("a").removeClass("open")
                        }
                        return false;
                    } else {
                        $(this).children(".submenu").slideUp(speed)
                    }
                    if ($(this).children(".submenu").siblings("a").hasClass("open")) {
                        $(this).children(".submenu").siblings("a").removeClass("open")
                    }
					//return false;
                }else{
					var data = {
						name : $(this).find(">a").text(),
						url : $(this).find(">a").attr("url")
					}
					n.get("onClick")(data);
					return false;
				}
			}).on("click",".closeBtn",function(){
				n.get("ele").toggleClass("close");
			})
		},
		getAllData : function(){
			return this.get("data");
		},
		init : function(){
			var n = this;
			//初始化回调函数
			n.get("onInit")(n);
			var container = $(n.get("ele"));
			container.addClass("zNavigation").width(n.get("width"));
			var header = $("<div class=\"zNavigation-header\"></div>");
			if(n.get("search")==true||n.get("title")!=""||n.get("close")==true){
				container.append(header);
			}
			if(n.get("theme")!=""){
				container.addClass(n.get("theme"));
			}
			if(n.get("title")!=""){
				var title = n.get("titleTpl");
				title = title.replace(/{{title}}/gi,this.get("title"));
				header.append(title);
			}
			if(n.get("search")==true){
				n.search(header);
			}
			if(n.get("data")&&n.get("data").length>0){
				var list = $("<ul class=\"zNavigation-list\"></ul>");
				list.append(n.build(n.get("data")));
				container.append(list);
			}else{
				n.get("error")();
			}
			if(n.get("close")==true){
				header.append("<div class=\"closeBtn\" title=\"收起\">&laquo;</div>");
			}
			//绑定事件
			n.addEvent();
		}
	}
	
	window.zNavigation = zNavigation;
	
})(window)