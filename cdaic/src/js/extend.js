(function(window,undefined){
	
	//jquery param
	var r20 = /%20/g,
		rbracket = /\[\]$/;

	function buildParams(prefix, obj, add){
		if (jQuery.isArray(obj)){
			jQuery.each(obj, function (i, v){
				if(rbracket.test(prefix)){
					add(prefix, v);
				}else{
					buildParams(prefix + "[" + i + "]", v, add);
				}
			});
		}else if(jQuery.type(obj) === "object") {
			for(var name in obj) {
				buildParams(prefix + "." + name, obj[ name ], add);
			}
		}else{
			add(prefix, obj);
		}
	}
	
	$.extend({
		param:function (a) {
			var s = [], add = function (key, value) {
				value = jQuery.isFunction(value) ? value() : (value == null ? "" : value);
				s[s.length] = encodeURIComponent(key) + "=" + encodeURIComponent(value);
			};
			if (jQuery.isArray(a) || ( a.jquery && !jQuery.isPlainObject(a) )) {
				jQuery.each(a, function (i, v) {
					buildParams('[' + i + ']', v, add);
				});
			} else {
				for (var prefix in a) {
					buildParams(prefix, a[ prefix ], add);
				}
			}
			return s.join("&").replace(r20, "+");
		}
	});
	
	//加载滚动条
    $.fn.loadScroll = function(option){
        if(!this.hasClass(".mCustomScrollbar")){
            this.mCustomScrollbar({  
                theme:"minimal-dark", //主题颜色  
                scrollButtons:{  
                    enable:false //是否使用上下滚动按钮  
                },  
                autoHideScrollbar: true, //是否自动隐藏滚动条  
                scrollInertia :0,//滚动延迟  
                horizontalScroll : false,//水平滚动条  
                callbacks:{  
                    
                }  
            });
        }else{
            if(option&&S.isString(option)){
                this.mCustomScrollbar(option);
            };
        }
    }

	S.navigation = function(menuData){
		/*var childMenuList = function(target,childData){
			
		}*/
		function buildMenuList(menuList,target,isChild){
			var result = "";
			if(isChild==true){
				$(menuList).each(function(k,v){
					var item = $("<li><a "+((v.url)?"url=\""+v.url+"\"":"")+">"+v.name+"</a></li>");
					if(v.children){
						var childList = $("<ul>"+buildMenuList(v.children)+"</ul>");
						item.addClass("hasChild").append(childList);
					}
					target.find("ul").append(item);
				});
			}else{
				$(menuList).each(function(k,v){
					result += "<li><a "+((v.url)?"url=\""+v.url+"\"":"")+">"+v.name+"</a></li>";
				});
			}
			return result;
		}
		
		$(S.sysMenu).each(function(i,v){
			var item = $("<li "+((v.current==true)?"class=\"current\"":"")+">"+v.name+"</li>");
			if(v.url!=""){
				item.attr("url",v.url);
			};
			item.data(v);
			if(v.children){
				var childData = v.children;
				var menuList = $("<div index=\""+i+"\"><div class=\"category\">"+childData[0].name+"</div><ul class=\"categoryList\"></ul></div>");
				$("#menu>.menuList").append(menuList);
				buildMenuList(v.children,menuList,true);
			}
			$("#header>ul.clearfix").append(item);
		})
		
	}
})(window);