/*******************************************************************************
 * zDialog.js -  zDialog Script library
 * Version v1.0.0
 * Copyright (C) 2016 zengchao
 *
 * @Author zengchao
 * @Email zengchao@sefonsoft.com
 * @UpdateTime (2016-07-13)
 *******************************************************************************/

(function(window,undefined){
	var zDialog = function(option){
		var d = this;
			d.option = {
				theme:"blue", //主题 white、black、blue、green、red
				title:"系统消息", //标题
				showTitle : true, //是否显示标题
				id:"", //id
				type:"alert", //弹出类型  alert、confirm、html、page、popup、tips
				url:"", //文件url地址，type为page时有效
				position:"right-bottom", //位置，type为popup及tips时有效
				zDialogClass:"", //自定义类名
				content:"", //内容
				width:"auto", //宽度，单位px
				height:"auto", //高度
				move:false, //是否支持拖拽
				showTools:true, //是否显示工具栏
				btn:[{text:"确定",click:function(form){}}], //按钮组
				align:"center", //标题及按钮对齐方式 left、center、right
				overlayClose:false,//是否可点击遮罩层关闭对话框
				autoClose:0, //是否自动关闭,为0不自动关闭，大于0时自动关闭
				closeTime:3000, //自动关闭时间
				onInit:function(){}, //初始化回调函数
				onComplete:function(){}, //完成之后回调函数
				onClose:function(){}, //点击关闭回调函数
				onMoveStart:function(){}, //开始移动回调函数
				onMoveEnd:function(){} //移动结束回调函数
			};
			d.extend(option);
			d.init();
	};
	var marginLeft,marginTop,positionLeft = "50%",positionTop = "50%",bodyWidth,bodyHeight;
	zDialog.prototype = {
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
			this.option[name] = value;
		},
		setStyle : function(wraper){
			var d = this,
				thisDialog = wraper.find(".zDialog-content"),
				/*marginLeft,
				marginTop,*/
				dialogW = thisDialog.width(),
				dialogH = thisDialog.height(),
				mW = $(window).width()-10,
				mH = $(window).height()-10;
			
				dialogW = (dialogW>mW)?mW:dialogW;
				dialogH = (dialogH>mH)?mH:dialogH;
				//thisDialog.width(dialogW+"px").height(dialogH+"px");
			
			marginLeft = dialogW/2;
			marginTop = dialogH/2;
			thisDialog.css({"margin-left":"-"+marginLeft+"px","margin-top":"-"+marginTop+"px"})
		},
		
		buildBtnByType : function(type,wraper){
			var d = this;
			if(d.get("btn").length==0){
				wraper.find(".zDialog-footer").remove();
			}else{
				$(d.get("btn")).each(function(i,v){
					var btn = $("<button class=\"zDialog-btn "+((/确定|保存|提交/ig.test(v.text))?"sure":"")+"\">"+v.text+"</button>");
					btn.click(function(){
						if(typeof v.click=="function"){
							var obj=$(this).parents(".zDialog-content").find(".zDialog-body");

							if(v.click(obj)!=false) d.close($(this).parents(".zDialog-wraper"));
						}
						else d.close($(this).parents(".zDialog-wraper"));
					})
					wraper.find(".zDialog-footer").append(btn);
				})
			}
			if(type != "popup" && type != "tips"){
				$("body").append(wraper);
				d.setStyle(wraper);
			}
			else $("body").append(wraper);
			
		},
		
		buildContentByType : function(type,wraper){
			var d = this;
			switch (type){
				case "alert" :
					wraper.find(".zDialog-body").html(d.get("content"));
					if(typeof d.get("onComplete")=="function") d.get("onComplete")(wraper.find(".zDialog-body"));
					break;
				case "html" :
					wraper.find(".zDialog-body").html(d.get("content"));
					if(typeof d.get("onComplete")=="function") d.get("onComplete")(wraper.find(".zDialog-body"));
					break;
				case "confirm" :
					wraper.find(".zDialog-body").html(d.get("content"));
					if(typeof d.get("onComplete")=="function") d.get("onComplete")(wraper.find(".zDialog-body"));
					break;
				case "page" :
					wraper.find(".zDialog-body").load(d.get("url"),function(tplResult,status){
						if(status!="success"){
							wraper.find(".zDialog-body").html("内容加载错误！");
						}else{
							d.setStyle(wraper);
							if(typeof d.get("onComplete")=="function") d.get("onComplete")(wraper.find(".zDialog-body"));
						}
					})
					break;
				case "popup" :
					d.set("move",false); //禁止拖动
					d.set("overlayClose",true); //点击遮罩关闭弹出
					wraper.find(".zDialog-overlay").addClass("opacity");
					wraper.find(".zDialog-content").addClass(d.get("position"));
					wraper.find(".zDialog-body").html(d.get("content"));
					break;
				case "tips" :
					d.set("autoClose",true) //自动关闭
					d.set("btn",[]) //去除按钮
					wraper.find(".zDialog-overlay").addClass("opacity");
					wraper.find(".zDialog-content").addClass(d.get("position"));
					wraper.find(".zDialog-body").html(d.get("content"));
					break;
			}
			
			
			/* 构建按钮组 */
			d.buildBtnByType(type,wraper) 
			
			$("body").append(wraper);
			setTimeout(function(){    
            	wraper.addClass("zDialog-show");
        	}, 20);
			
			/* 自动关闭 */
			if(d.get("autoClose")==true){
				setTimeout(function(){
					d.close(wraper);
				},d.get("closeTime"))
			}
			
			
			d.addEvent(wraper);
		},
		
		buildTools : function(type,header){
			var d = this;
			var tools=	$("<div class=\"zDialog-tools\">"+
						  	((type=="page"||type=="html")?"<span class=\"zDialog-maximize\" title=\"最大化\"></span><span class=\"zDialog-original\" style=\"display:none\" title=\"还原\"></span>":"")+
								"<span class=\"zDialog-close\" title=\"关闭窗口\"></span>"+
							"</div>");
			header.append(tools);
			
			//关闭按钮点击事件
			header.find(".zDialog-close").click(function(){
				var thiszDialog = $(this).parents(".zDialog-wraper");
				d.close(thiszDialog);
			})
			
			//最大化按钮点击事件
			header.find(".zDialog-maximize").click(function(){
				var content = $(this).parents(".zDialog-content");
				content.css({
					"margin-left":"auto",
					"margin-top":"auto",
					"top":0,
					"left":0
				});
				var bodyHeight = $(window).height()-content.find(".zDialog-header").height()-content.find(".zDialog-footer").height();
				content.find(".zDialog-body").css({"width":$(window).width(),"height":bodyHeight});
				$(this).hide().next().css("display","inline-block");
			})
			
			//还原按钮点击事件
			header.find(".zDialog-original").click(function(){
				var content = $(this).parents(".zDialog-content");
				content.css({
					"margin-left":-marginLeft,
					"margin-top":-marginTop,
					"top":positionTop,
					"left":positionLeft,
				});
				content.find(".zDialog-body").css({"width":"auto","height":"auto"});
				$(this).hide().prev().css("display","inline-block");
			})
			
			//所有工具按钮mousedown事件阻止冒泡
			header.find(".zDialog-tools>span").mousedown(function(){ 
				return false;
			})
		},
		
		build : function(){
			var d = this,
				wrapper=$("<div class=\"zDialog-wraper "+ d.get("theme") +"\">"+
							"<div class=\"zDialog-overlay\"></div>"+
							"<div class=\"zDialog-content\">"+
								"<div class=\"zDialog-header\"><h4 class=\"zDialog-title\"></h4></div>"+
								"<div class=\"zDialog-body\"></div>"+
								"<div class=\"zDialog-footer\"></div>"+
							"</div>"+
						"</div>"),
			
				zIndex = 500 + $(".zDialog-wraper").size();
			
            if(d.get("id")!="") wrapper.attr("id",d.get("id"));
            wrapper.css("z-index",zIndex);
			
			/* 标题 */
			if(d.get("showTitle")==true){
				wrapper.find(".zDialog-title").text(d.get("title"));
			}
			
			/* 工具栏 */
			if(d.get("showTools")==true){
				d.buildTools(d.get("type"),wrapper.find(".zDialog-header"));
			}
			
			/* 构建内容 */
			wrapper.find(".zDialog-content").addClass(" zDialog-"+d.get("type"),d.get("align"));
			
			wrapper.find(".zDialog-body").width(d.get("width")).height(d.get("height"));
			
			if(typeof d.get("onInit")=="function"){
				d.get("onInit")(wrapper.find(".zDialog-content"));
			}
			
			d.buildContentByType(d.get("type"),wrapper);
			
		},
		
		addEvent : function(wraper){
			var d = this;
			wraper.on("click",".zDialog-overlay",function(){
				if(d.get("overlayClose")==false) return;
				d.close(wraper);
			})//遮罩层点击事件
			
			
			
			var header = wraper.find(".zDialog-header"),
				content = wraper.find(".zDialog-content");
			
			//拖拽移动事件
			if(d.get("move")==true){
				var dragging = false,
					iX = 0,
					iY = 0,
					mX = 0,
					mY = 0;
				header.css("cursor","move").off("mousedown").on("mousedown",function(e){
					dragging = true;
                    var offset = $(this).offset();
                    iX = e.clientX - offset.left;
                    iY = e.clientY - offset.top;
					
					mX = $(window).width() - content.width();
					mY = $(window).height() - content.height();
					this.setCapture && this.setCapture();
	                e.preventDefault();
                    return false;
				});
				$(document).on("mousemove",function(e) {
                    if (dragging) {
						if(typeof d.get("onMoveStart")=="function") d.get("onMoveStart")(content);
						
						var oX = e.clientX-iX;
						var oY = e.clientY-iY;
						
						//拖拽范围坐标控制
		                oX = (oX<0)?0:oX;
		                oY = (oY<0)?0:oY;
		                oX = (oX>mX)?mX:oX;
		                oY = (oY>mY)?mY:oY;
						
						positionLeft = oX;
						positionTop = oY;
						marginLeft = "auto";
						marginTop = "auto";
                        content.css({"left":oX+"px", "top":oY+"px","margin-left":"auto","margin-top":"auto"});
                        return false;
                    }
                });
				
                $(document).on("mouseup",function(e) {
					if(typeof d.get("onMoveEnd")=="function") d.get("onMoveEnd")(content);
                    dragging = false;
                    e.cancelBubble = true;
                });
				
			}
		},
		
		close : function(wraper){
			var d = this;
			wraper.removeClass("zDialog-show");
			setTimeout(function(){
				wraper.remove();
				if(typeof d.get("onClose")=="function") d.get("onClose")();
			}, 200);
		},
		
		init : function(){
			//初始化回调函数
			this.build();
		}
	}
	zDialog.close = function(){
		var wraper = $(".zDialog-wraper");
		wraper.removeClass("zDialog-show");
		setTimeout(function(){
			wraper.remove();
		}, 200);
	}
	window.zDialog = zDialog;
	
})(window)