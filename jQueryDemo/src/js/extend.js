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

	$.fn.cpie = function(option){

			var $this = $(this),
				cwidth = $this.width(),
				cheight = $this.height();

			option = option || {};
			if(!option.percent){
				option.percent = $this.attr('percent');
			}

			option = $.extend({
				laterColor : 'rgb(227, 227, 227)', //后置颜色
				frontColor : 'rgb(101, 185, 107)', //前置颜色
				percent    : 1, //百分比，小数
				rotate     : -90 //旋转角度， canvas默认从三点钟方向开始画，如果希望从其他位置开始画需要调整旋转角度。
			}, option);

			var size = cwidth <= cheight ? cwidth : cheight,
				radius = size / 2;
			var $canvas = $('<canvas width="' + size + '" height="' + size + '"></canvas>'),
				ctx     = $canvas[0].getContext('2d');

			$this.html($canvas);
			ctx.save();
			ctx.beginPath();
			ctx.fillStyle = option.laterColor;
			ctx.arc(radius, radius, radius, 0, 2 * Math.PI, false);
			ctx.closePath();
			ctx.fill();

			ctx.restore();

			ctx.beginPath();
			ctx.moveTo(radius, radius);
			ctx.fillStyle = option.frontColor;
			ctx.arc(radius, radius, radius, option.rotate * Math.PI / 180, (option.rotate / 360 - option.percent ) * 2 * Math.PI, true);
			ctx.closePath();
			ctx.fill();

			ctx   = null;
			$this = null;
	};
	
	//加载滚动条
    $.fn.loadScroll = function(option){
        if(!this.hasClass("mCustomScrollbar")){
            this.mCustomScrollbar({  
                theme:"minimal-dark", //主题颜色  
                scrollButtons:{  
                    enable:false //是否使用上下滚动按钮  
                },
				alwaysShowScrollbar :1,
                autoHideScrollbar: false, //是否自动隐藏滚动条  
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

	//初始化日期控件
    $.fn.buildDatePicker = function (callback) {
        var container = this;     
        var guid = new Date().getTime();
        $("[calendar]", container).each(function () {
            var calendar = $(this).attr("calendar");
            var minDate = $(this).attr("minDate");
            var maxDate = $(this).attr("maxDate");
            var timeGroupReg = /(startTime|endTime)(\d*)/i;
            var dateStr = $(this).attr("date") || "";
            if ($(this).hasClass("read-only")) return;
            $(this).addClass("calendar").attr("readonly", true);

            if (dateStr && timeGroupReg.test(dateStr)) {
                var match = dateStr.match(timeGroupReg);
                var dataType = match[1];
                var dateGroupNum = match[2] ? (match[2] + "_") : "";
                if (dataType == "startTime") {
                    $(this).attr("id", "calendar_startTime_" + dateGroupNum + guid);
                    $(this).on("focus",function(){
                        var $endTime = $("#" + "calendar_endTime_" + dateGroupNum + guid);
                        if ($endTime.val() == "" && $endTime.attr("maxDate") != undefined) {
                            maxDate = $endTime.attr("maxDate");
                        } else {
                            maxDate = '#F{$dp.$D(\'calendar_endTime_' + dateGroupNum + guid + '\');}'
                        }
                        var options = {
                            dateFmt:calendar,
                            maxDate:maxDate,
                            onpicked:callback
                        };
                        if (minDate != undefined) options["minDate"] = minDate;
                        WdatePicker(options);
                    });
                } else if (dataType == "endTime") {
                    $(this).attr("id", "calendar_endTime_" + dateGroupNum + guid);
                    $(this).on("focus",function(){
                        var $startTime = $("#" + "calendar_startTime_" + dateGroupNum + guid);
                        if ($startTime.val() == "" && $startTime.attr("minDate") != undefined) {
                            minDate = $startTime.attr("minDate");
                        } else {
                            minDate = '#F{$dp.$D(\'calendar_startTime_' + dateGroupNum + guid + '\');}'
                        }
                        var options = {
                            dateFmt:calendar,
                            minDate:minDate,
                            onpicked:callback
                        };
                        if (maxDate != undefined) options["maxDate"] = maxDate;
                        WdatePicker(options);
                    });
                }
            } else {
                $(this).on("focus",function(){
                    var options = {
                        dateFmt:calendar,
                        onpicked:callback
                    };
                    if (minDate != undefined) options["minDate"] = minDate;
                    if (maxDate != undefined) options["maxDate"] = maxDate;
                    WdatePicker(options);
                });
            }
        });
    };
	
	//初始化查询条件
	$.fn.buildQuery = function(option){
		var _this = $(this);
		_this.empty();

		if(!option) return;
		$.each(option.item,function(k,v){
			var item = "";
			switch(v.type){
				case "input" :
					item = $("<div type=\"input\" class=\"query-item-input form-group\" keyName=\""+v.keyName+"\"><label class=\"control-label\">"+v.text+"：</label><input type=\"text\" class=\"form-control\" "+((v.placeholder)?"placeholder='"+v.placeholder+"'":"")+"></div>");
					break;
				case "tab" : 
					item = $("<div type=\"tab\" class=\"query-item-tab form-group\" keyName=\""+v.keyName+"\"></div>");
					if(v.list){
						$.each(v.list,function(j,h){
							var tabItem = $("<span value=\""+h.value+"\">"+h.text+"</span>");
							if(j==0) tabItem.addClass("checked");
							tabItem.data(h);
							item.append(tabItem);
							tabItem.on("click",function(){
								item.find("span.checked").removeClass("checked");
								$(this).addClass("checked");
								if(v.click&&typeof v.click == "function"){v.click($(this).data())}
							})
						})
					}
					break;
				case "checkbox" :
					item = $("<div type=\"checkbox\" class=\"query-item-checkbox form-group\" keyName=\""+v.keyName+"\"><label class=\"query-checkbox-label\">"+v.text+"</label></div>");
					//$(".query-checkbox-label",item).on("click",function(){
					item.on("click",function(){
						$(this).toggleClass("checked");
					})
					break;
				case "select" : 
					var optionData = v.list;
					var selectModel = v.model == "single"?v.model:"multi";
					if(v.addDefault!=false){
						var tempList = [];
						$(optionData).each(function(ii,vv){
							tempList.push(vv);
						})
						tempList.splice(0,0,{"text":"-全部-","value":""});
					}else{
						var tempList = optionData;
					}
					item = $("<div type=\"select\" class=\"query-item-select form-group\" keyName=\""+v.keyName+"\">"+((v.text)?"<label class=\"control-label\">"+v.text+"：</label>":'')+"<span class=\"query-select-current form-control\">"+tempList[0].text+"</span></div>");
					var optionList = $("<ul></ul>");
					$.each(tempList,function(j,h){
						var option = $("<li title=\""+h.text+"\">"+h.text+"</li>");
						if(j==0) option.addClass("checked");
						option.data(h);
						optionList.append(option);
					})
					item.append(optionList);
					if (selectModel == 'multi') {
						// var confirmTpl = $("<div class='selsectConfirm'><div class='confirmItem confirm'>确定</div><div class='confirmItem allClear'>清空</div></div>");
						// optionList.append(confirmTpl);
						item.on("click",".query-select-current",function(){
							$(".query-item-select ul,.query-item-mind ul").hide();
							if($(this).next().is(":hidden")) {
								$(this).next().show();
							}else{
								$(this).next().hide();
							}
							var maxHeight = item.find("ul li").size()*25 + 30;
							if(maxHeight>300){
								optionList.height(300);
								optionList.loadScroll();
							}
							return false;
						}).on("click","li",function(){
							var value = $(this).data().value;
							if (value === '') {
								$(".query-select-current",item).data($(this).data()).text($(this).text());
								$("li.checked",item).removeClass("checked");
								$("li:eq(0)",item).addClass("checked");
								return false;
							}else{
								if ($(this).hasClass("checked")) {
									$(this).removeClass("checked");
									if ($("li.checked",item).length == 0) $("li:eq(0)",item).addClass("checked");
									
								}else{
									$("li:eq(0)",item).removeClass("checked");
									$(this).addClass("checked");
								}

								var selectedItem = [];
								var selectedItemText = [];
								$("li.checked",item).each(function(i,v){
									selectedItemText.push($(v).text());
									selectedItem.push($(v).data());
								});
								var str = selectedItemText.join(",");
								if (str.length>5) {
									var cutStr = str.slice(0,5) + "...";
								}else{
									var cutStr = str
								}
								
								$(".query-select-current",item).data(selectedItem).text(cutStr).attr("title",str);
								return false;
							}
						})/*.on("click",".confirm",function(){
							var selectedItem = [];
							var selectedItemText = [];
							$("li.checked",item).each(function(i,v){
								selectedItemText.push($(v).text());
								selectedItem.push($(v).data());
							});
							var str = selectedItemText.join(",");
							if (str.length>5) {
								var cutStr = str.slice(0,5) + "...";
							}else{
								var cutStr = str
							}
							
							$(".query-select-current",item).data(selectedItem).text(cutStr).attr("title",str);
							$("ul",item).hide();
						}).on("click",".allClear",function(){
							$("li.checked",item).removeClass("checked");
							var all = $("li:eq(0)",item);
							all.addClass("checked");
							$(".query-select-current",item).data(all.data()).text(all.text()).attr("title",all.text());
							return false;
						})*/
					}else{
						item.on("click",".query-select-current",function(){
							_this.find(".query-item-select ul").hide();
							if($(this).next().is(":hidden")) {
								$(this).next().show();
							}else{
								$(this).next().hide();
							}
							var maxHeight = item.find("ul li").size()*25;
							if(maxHeight>300){
								optionList.height(300);
								optionList.loadScroll();
							}
							return false;
						}).on("click","li",function(){
							$(".query-select-current",item).data($(this).data()).text($(this).text());
							$("li.checked",item).removeClass("checked");
							$(this).addClass("checked");
							$("ul",item).hide();
						})
					}
					break;
				case "date" :
					item = $("<div type=\"date\" class=\"query-item-date form-group\"><label class=\"control-label\">"+v.text+"：</label></div>");
					var dateFormat = v.format || "yyyy-MM-dd";
					var defaultVaule = "";
					if(v.addDefault!=false){
						defaultVaule = S.dateFormat(new Date(),dateFormat);
					}
					if(v.range==true){
						item.append("<input type=\"text\" class=\"form-control\" keyName=\""+v.keyName+"\" calendar=\""+dateFormat+"\" date=\"startTime\" value=\""+defaultVaule+"\" /><label class=\"control-label\">至</label><input type=\"text\" class=\"form-control\" keyName=\""+v.keyName2+"\" calendar=\""+dateFormat+"\" date=\"endTime\" value=\""+defaultVaule+"\" />");
					}else{
						item.append("<input type=\"text\" class=\"form-control\" keyName=\""+v.keyName+"\" calendar=\""+dateFormat+"\" value=\""+defaultVaule+"\" />");
					}
					item.buildDatePicker();
					break;
				case "divider" : 
					item = "<div class=\"divider\"></div>";
					break;
				case "button" : 
					item = $("<button type=\"button\" class=\"btn btn-sm btn-primary\">"+v.text+"</button>");
					item.on("click",function(){
						var formData = getQueryData();
						v.click(formData);
					})
					break;
				case "mind" : 
					v.placeholder = v.placeholder || '输入企业名称、联系人、法人、主要成员';
					v.text = null;
					item = $("<div type=\"input\" class=\"query-item-mind form-group\" keyName=\""+v.keyName+"\">"+ (v.text ? "<label class=\"control-label\">"+v.text+":</label>" : "" ) +"<input type=\"text\" readonly class=\"form-control\" "+((v.placeholder)?"placeholder='"+v.placeholder+"'":"")+"><ul></ul></div>");
					var optionList = item.find("ul");
					var input = item.find("input.form-control");
					/*item.delegate("ul li","click",function(){
						$("li.checked",item).removeClass("checked");
						var value = $(this).attr("title");
						input.val(value);
						$(this).addClass("checked").parent().hide();
					})
					var curLength = "";
					input.on("keyup",function(e){
						var cur = $(this);
						var value = cur.val().trim();
						if(curLength != value.length){
							getCompany(optionList,value);
						}
						curLength = value.length;
					});*/
					input.on("click",function(){
						$.zDialog({
							url : seajs.resolve("src/webapps/common/page/companyList.html"),
							title : "关键字查询",
							id : "publicMindQueryDialog",
							type : "page",
							theme : "cdaic-basic",
							width : 1000,
							height : 500,
							data : v,
							btn : [
								{
									text : "确定",
									click : function(form){
										var selectedData = $("[table]",form).getSelected();
										var companyNames = "";
										if(selectedData.length>0){
											$(selectedData).each(function(i,v){
												companyNames += v.enterprise + ",";
											})
										};
										input.data(selectedData);
										input.val(companyNames.substring(0,companyNames.length-1));
									}
								},{
									text : "取消",
									click : function(){
										
									}
								}
							]
						})
					})
					break;
				case "multi" : 
					v.placeholder = v.placeholder || '输入企业名称、联系人、法人、主要成员';
					v.text = null;
					item = $("<div type=\"multi\" class=\"query-item-mind form-group\" keyName=\""+v.keyName+"\">"+ (v.text ? "<label readonly class=\"control-label\">"+v.text+":</label>" : "" ) +"<input type=\"text\" class=\"form-control\" "+((v.placeholder)?"placeholder='"+v.placeholder+"'":"")+"><ul></ul></div>");
					var optionList = item.find("ul");
					var input = item.find("input.form-control");
					/*item.delegate("ul li","click",function(){
						$("li.checked",item).removeClass("checked");
						var value = $(this).attr("title");
						input.val(value);
						$(this).addClass("checked").parent().hide();
					})
					var curLength = "";
					input.on("keyup",function(e){
						var cur = $(this);
						var value = cur.val().trim();
						if(curLength != value.length){
							getCompany(optionList,value);
						}
						curLength = value.length;
					});*/
					var dataRows = input.data();
					v.dataRows = dataRows;
					input.on("click",function(){
						$.zDialog({
							url : seajs.resolve("src/webapps/common/page/multiList.html"),
							title : "关键字查询",
							id : "publicMindQueryDialog",
							type : "page",
							theme : "cdaic-basic",
							width : 1000,
							height : 600,
							data : v,
							btn : [
								{
									text : "确定",
									click : function(form){
										var $items = $("#resultSetScrollWp li.item",form);
										if($items.length < 2){
											$.zAlert("请至少选择两个企业");
											return false;
										} else {
											var result = [], name = [];
											$.each($items, function(i, item){
												var rowData = $(item).data('rowData');
												result.push(rowData);
												name.push(rowData.enterprise);
											});
										}	
										
										input.data(result);
										input.val(name.join(','));
									}
								},{
									text : "取消",
									click : function(){
										
									}
								}
							]
						})
					})
					break;
				case 'person':
					v.placeholder = v.placeholder || '输入股东、法人、联系人、主要成员';
					v.text = null;
					v.single = true;
					v.delay = v.delay || 300; //查询延迟时间
					item = $("<div type=\"person\" class=\"query-item-mind form-group\" keyName=\""+v.keyName+"\"><label class=\"control-label\">"+ (v.text ? v.text+":" : "" ) +"</label><input type=\"text\" class=\"form-control\" "+((v.placeholder)?"placeholder='"+v.placeholder+"'":"")+"><ul></ul></div>");
					var optionList = item.find("ul");
					var input = item.find("input");
					/*input.attr('investors', '')
						 .attr('idNo', '')
						 .attr('companyName', '')
						 .attr('title', '');
					item.delegate("ul li","click",function(){
						$("li.checked",item).removeClass("checked");

						var value = $(this).attr("title"),
							investors = $(this).attr('investors'),
							idNo      = $(this).attr('idNo'),
							companyName = $(this).attr('companyName');

						input.val(value)
							.attr('title', value)
							.attr('investors', investors)
							.attr('idNo', idNo)
							.attr('companyName', companyName);
						$(this).addClass("checked").parent().hide();
					})
					var curLength = "",
						timer = null;*/
					input.on("click",function(e){

						$.zDialog({
							url : seajs.resolve("src/webapps/common/page/personList.html#"),
							title : "人员查询",
							id : "publicMindQueryDialog",
							type : "page",
							theme : "cdaic-basic",
							width : 1000,
							height : 600,
							data : v,
							btn : [
								{
									text : "确定",
									click : function(form){
										var selectedData = $("[table]",form).getSelected();
										var companyNames = "";
										if(selectedData.length>0){
											$(selectedData).each(function(i,v){
												companyNames += v.name + ",";
											})
										};
										input.data(selectedData);
										input.val(companyNames.substring(0,companyNames.length-1));
									}
								},{
									text : "取消",
									click : function(){
										
									}
								}
							]
						});
					});
					break;
			}

			var getCompany = function($el,name){
				$el.html("").show();
				if(!name){
					return;
				}
				var typeArray = ["根据法人","根据联系电话","根据重要人员","根据企业名称"]
				_this.getCompanyAjax && _this.getCompanyAjax.abort();
				_this.getCompanyAjax = S.request({
					loading:false,
					url:"app/Source/getEnterpriseName.json",
					type:"POST",
					data:{
						query:name.trim()
					},
					success:function(data){
						if(!data || !data.data){
							$el.html("").hide();
							return;
						}
						$el.html("").show();
						$.each(data.data,function(j,h){
							var typeIndex = parseInt(h.type,10) - 1;
							var typeStr = typeArray[typeIndex] + "匹配";
							var str = "<span style='display:inline-block;width:120px;color:#CCCCCC;'>"+typeStr+"</span><span>"+h.enterprise+"</span>";
							var option = $("<li title=\""+h.enterprise+"\" code=\""+h.name+"\">"+str+"</li>");
							if(j==0) option.addClass("checked");
							$el.append(option);
						})
					}
				})
			}
			_this.addClass("custom-query-list").append(item);
		})
		
		function getQueryData(){
			var result = {};
			_this.find(".form-group").each(function(){
				var type = $(this).attr("type"),
					key = $(this).attr("keyName");
				switch(type){
					case "input" : 
						result[key] = $(this).find(".form-control").val();
						break;
					case "tab" : 
						result[key] = $(this).find("span.checked").attr("value");
						break;
					case "select" : 
						if ($(this).find("li.checked").length == 0) {
							result[key] = $(this).find("li.checked").data();
						}else{
							result[key] = {};
							var resultText = [],
								resultValue = [];
							$(this).find("li.checked").each(function(i,v){
								resultText.push($(v).data().text)
								resultValue.push($(v).data().value);
							})
							result[key].text = resultText.join(',');
							result[key].value = resultValue.join(',');
						}
						break;
					case "date" :
						$(this).find("[calendar]").each(function(j,k){
							key = $(k).attr("keyName");
							result[key] = $(k).val();
						})
						break;
					case "person":

						var $input = $(this).find('input'), data = $input.data()[0];
						if(_.isUndefined(data) || _.isEmpty(data)){
							result[key] = null;
						} else {
							var investors = data.name || '',
								idNo      = data.idCard || '',
								companyName = data.enterprise || '';
							if(investors.length == 0 && idNo.length == 0 && companyName.length == 0){
								result[key] = null;
							} else {
								result[key] = {
									investors : investors,
									idNo : idNo,
									companyName : companyName
								};	
							}
						}
						break;
					case "multi":
						var $input = $(this).find('input'), data = $input.data();
						result[key] = data;
						break;
					case "checkbox" : 
						break;
				}
			});
			return result;
		}
		$("body").on("click",function(){
			$(".query-item-select ul,.query-item-mind ul").hide();
		})
	}
	
	//构建菜单
	/*S.navigation = function(callback){
		if(!S.sysMenu) return;
		function buildMenuList(menuList,target,isChild){
			var result = "";
			if(isChild==true){
				$(menuList).each(function(k,v){
					var item = $("<li><a "+((v.url)?"url=\""+v.url+"\"":"")+">"+v.name+"</a></li>");
					if(v.children){
						var childList = $("<ul>"+buildMenuList(v.children)+"</ul>");
						item.addClass("hasChild").append(childList);
					}
					target.append(item);
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
				var menuList = $("<ul index=\""+i+"\"></ul>");
				$("#menuList >.categoryList").append(menuList);
				buildMenuList(v.children,menuList,true);
			}
			$("#header>ul.clearfix").append(item);
		})
		
		//一级模块点击事件
		$("#header .clearfix li").on("click",function(){
			$("#header .clearfix li.current").removeClass("current");
			$(this).addClass("current");
			$("#menuList .category").text($(this).text());
			var index = $(this).index();
			$("#menuList>.categoryList ul").hide();
			$("#menuList>.categoryList li.open").removeClass("open");
			$("#menuList>.categoryList").find("a.checked").removeClass("checked");
			$("#menuList>.categoryList>ul[index="+index+"]").show();
		})
		
		$("#menuList .categoryList li>a").on("click",function(){
			if($(this).parent().hasClass("hasChild")){
				$(this).parent().siblings().find("a.checked").removeClass("checked");
				$(this).parent().siblings().find("ul").slideUp();
				$(this).parent().siblings().removeClass("open");
				if($(this).next().is(":hidden")){
					$(this).next().slideDown();
					$(this).parent().addClass("open");
				}else{
					$(this).next().slideUp();
					$(this).parent().removeClass("open");
				}
			}else{
				$(this).parent().siblings().find("ul").slideUp();
				$(this).parent().siblings().removeClass("open");
				$(this).parent().siblings().find("a.checked").removeClass("checked");
				$(this).addClass("checked");
				if(callback && typeof callback === "function"){
					callback({
						url : $(this).attr("url"),
						name : $(this).text()
					});
				}
			}
		})
		
	}*/
	
	
})(window);