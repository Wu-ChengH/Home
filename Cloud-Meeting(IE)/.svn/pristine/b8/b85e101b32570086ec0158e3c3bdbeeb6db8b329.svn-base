/*******************************************************************************
* eTable.js -  eTable Script library
* Copyright (C) 2013
*
* @Author Skiny
* @Email lavenler@live.cn
* @UpdateTime (2013-10-23)
*******************************************************************************/

(function(window,undefined){
    'use strict';
	var eTable=function(option){
			var o=this;
			o.version="1.0";
			o.setting={
				target:"",
				targetID:"",
				type:"table",
				columns:[],
				rightMenu:[],
				dataApi:"",
				sortUpdateApi:"",
				query:{},
				requestParamName:{
					dataSize:"page.rows",
					currentPage:"page.index"
				},
				postData:{},
				borderTop:false,
				isNeedmergeTd:false,
				newPager:false,
				borderBottom:false,
				loadingShow:false,
				loading:false,
				pagerShow:true,
				cache:true,
				async:true,
				editBlurAutoSelect:true,
				autoWidth:true,
				autoHeight:true,
				rowOrderNum:false,
				rowCheckbox:false,
				rowSelect:true,
				rowSort:false,
				treeOpen:false,
				keepSelected:false,
				columnDrag:true,
				layoutHeightAuto:true,
				selectMode:"multi",
				// dataSize:20,
				dataSize:5,
				pageShowLimit:5,
				pageEndLimit:2,
				totalData:0,
				totalPage:0,
				currentPage:1,
				data:[],
				tableSelected:[],
				tableData:[],
				editStatus:"",
				editStatusMsg:"当前页有编辑内容，请先保存之后再继续操作。如果要放弃保存请点击确定，否则请点取消。",
				idKey:"flowId",
				parentIdKey:"parentId",
				disabledKey:"disabled",
				rowDisabledBy:function(){return false;},
				sortKey:"sort",
				noData:"暂无数据",
                topPager:false,
				timeout : 20000,
                topPagerDom:'',
                tbodyClass:'',
				init:function(){},
				onRowSelected : function(){},
                rowBeforeBuild:function(){},
				beforeRequest:function(object){},
				afterRequest : function(data){
					return data;
				},
				complete:function(){},
				onListComplete:function(){},
				editStatusChange:function(){},
				error:function(){},
				pagerCallBack:function(page){o.request(page);},
				pagerTpl:"<span class=\"data-total\">共<b>{etl:totalData}</b>条,<b class = \"currentShow\">{etl:currentPage}</b>/{etl:totalPage}</span>" +
                "<span class=\"pagerBtn\"><a class=\"home-page\" action=\"home\"></a>" +
                "<a class=\"last-page\" action=\"last\"></a>" +
                "<a class=\"next-page\" action=\"next\"></a>" +
                "<a class=\"end-page\" action=\"end\"></a></span>" +
                "<span class=\"data-size\">每页显示<select native=\"true\"></select>条</span>"+
                "<span class='GoToPage'>跳转至<input type=\"text\" class=\"changePageInput\" name=\"changePageInput\" value=\"{etl:currentPage}\">页</span><a class=\"changePageBtn\">前往</a>",
				// pagerTpl:"<span class=\"data-total\">共<b>{etl:totalData}</b>条,<b class = \"currentShow\">{etl:currentPage}</b>/{etl:totalPage}</span>" +
    //             "<span class=\"pagerBtn\"><a class=\"home-page\" action=\"home\">首页</a>" +
    //             "<a class=\"last-page\" action=\"last\">上一页</a>{etl:pageList}" +
    //             "<a class=\"next-page\" action=\"next\">下一页</a>" +
    //             "<a class=\"end-page\" action=\"end\">尾页</a></span>" +
    //             "<span class=\"data-size\">每页显示<select native=\"true\"></select>条</span>"+
    //             "<span class='GoToPage'>跳转至<input type=\"text\" class=\"changePageInput\" name=\"changePageInput\" value=\"{etl:currentPage}\">页</span><a class=\"changePageBtn\">前往</a>",
				loadingTpl:"<div class=\"eTable-loading\"><div></div><span>加载中...</span></div>"
			};
			o.extend(option);
			o.init();
		};
		
	eTable.prototype={
		extend:function(option){
			if(option==null||typeof option!=="object") {return;}
			for(var key in option){
				if(this.get(key)!=undefined) this.set(key,option[key]);
			}
		},
		get:function(name){
			return this.setting[name];
		},
		set:function(name,value){
			this.setting[name]=value;
		},
		resetDataSize:function(){
			var o=this,
				h=o.get("target").find(".eTable-list").height()-23,
				num=parseInt(h/32);
			// if(num>10&&o.get("autoHeight")!=true) {num=20;}
			if(num>1&&o.get("autoHeight")!=true) {num=5;}
			else{ num=o.get("dataSize");}
			
			o.set("dataSize",num);
		},
		requestFunc:function(page,callBack,loading){

			page=page?page:1;
			
			var o=this,
				query={},
				queryForm=o.get("query"),
				postData=o.get("postData");
			

			for(var key in queryForm){
				query[key]=queryForm[key];
			}
			
			for(var key in postData){
				query[key]=postData[key];
			}
			
			if(o.setting["dataApi"]==="") {
				o.tableDataBuild();
				return;
			}
			
			if(typeof query!=="object") {return;}
			if(o.get("type")!=="treeGrid"){
				query[o.setting["requestParamName"]["dataSize"]]= o.get("dataSize")||o.setting.dataSize;
				query[o.setting["requestParamName"]["currentPage"]]=page;
			}
            var  getSelectByPage=o.get('getSelectByPage'),currentPage=o.get('currentPage');
            if(!getSelectByPage&&currentPage===1){
                o.getSelectByPage()
            }
			//loading show
			if(loading==false) o.loadingShow();
			//before requesting the data
			o.get("beforeRequest")(o);
			//request data from server
			S.request({
				url:o.get("dataApi"),
				type:"post",
				data:query,
                loading:o.get("loading"),
				cache:o.get("cache"),
				async:o.get("async")||true,
				dataType:"json",
				timeout : o.get("timeout"),
				success:function(server){
					var result = o.get('afterRequest')(server);
					if(result){
						server = result;
					}
					//data handle
					server.data=server.data?server.data:{};
					server.data.total=((server.data.total==undefined)?0:parseInt(server.data.total));
					if(o.get("type")!=="treeGrid"/*&&o.get("pagerShow")==true*/){
						var totalPage=((server.data.total%o.get("dataSize")==0)?(server.data.total/o.get("dataSize")):(parseInt(server.data.total/o.get("dataSize"))+1));
						o.set("totalPage",totalPage);
						o.set("totalData",server.data.total);
						o.set("currentPage",server.data.page?server.data.page:0);
                        if(!server.data.list){
                            server.data.list=server.data;
                        }
						o.set("data",server.data.list);
					}
					else  o.set("data",server.data);

					o.tableDataBuild();
					
					//keep selected
					if(o.get("keepSelected")==true){
						
						o.updateTableData(server.data.list);
						
						var tableSelected=o.get("tableSelected");
						if(tableSelected.length>0){
							for(var i=0;i<tableSelected.length;i++){
								o.get("target").find("[myid="+tableSelected[i]+"]").find(".checkbox").click();
							}
							if(o.getPageSelectedSize()<o.getListSize()) o.get("target").find("[type=allSelect]").removeClass("checked");
						}
						else o.get("target").find("[type=allSelect]").removeClass("checked");
					}
					else o.get("target").find("[type=allSelect]").removeClass("checked");
					
					//defined complete
					o.get("onListComplete")(server.data);
					if(o.get("target").parents(".ePop-container").size()>0){
						J.popResize(o.get("target"));
					}
					if(typeof callBack=="function") callBack();
				},
				error:function(ex){
					//defined error
					o.get("error")(ex);
					
					//loading hide
					o.loadingHide();
				}
			});
			o.set("editStatus","");
		},
		request:function(page,callBack,loading,editCurrent){
			var o=this;
			if(o.get("editStatus")=="ing"&&(!editCurrent)){
				J.confirm(o.get("editStatusMsg"),function(){
					if(typeof o.get("editStatusChange")=="function"){
						o.get("editStatusChange")();
					}
					o.requestFunc(page,callBack,loading);
				});
			}
			else o.requestFunc(page,callBack,loading);
		},
		colorBuild:function(){
			var classStr="",
				obj=$(this.get("target").find(".eTable-list").find("tr:visible")),
				length=obj.size();
			
			obj.each(function(i,v){
				classStr=(((i+1)%2==0)?"odd":"even");
				
				if(i==0)
					classStr+=" firstRow";
				else if(i==length-1) classStr+=" lastRow";
				
				$(this).removeClass("odd even firstRow lastRow").addClass(classStr);
				
			});
		},
		clearTableSelected:function(){
			this.set("tableSelected",[]);
			$(".checked",this.get("target")).removeClass("checked");
		},
		updateTableSelected:function(){
			var o=this;
			o.deltableSelected(o.getPageUnSelectIds());
			o.addTableSelected(o.getPageSelectedIds());
		},
		updateTableData:function(data){
			var sourse=this.get("tableData"),
				exsit=false,
				newData=[],
				idKey=this.get("idKey");

			$(data).each(function(j,v){
				exsit=false;
				for(var i=0;i<sourse.length;i++){
					if(v[idKey]==sourse[i][idKey]){
						exsit=true;
						break;
					}
				}
				if(!exsit) newData[newData.length]=v;
			});
			this.set("tableData",newData.concat(sourse));
		},
		hasTableSelectedId:function(id){
			var result=false,
			 	data=this.get("tableSelected");
			for(var i=0;i<data.length;i++){
				if(id==data[i]){
					result=true;
					break;
				}
			}	
			return result;
		},
		addTableSelected:function(ids){
			if(ids=="") return;

			var o=this,
				newData=o.get("tableSelected");

			ids=ids.split(",");

			for(var i=0;i<ids.length;i++){
				if(!o.hasTableSelectedId(ids[i])){
					newData[newData.length]=ids[i];
				}
			}
			o.set("tableSelected",newData);
		},
		deltableSelected:function(ids){
			if(ids=="") return;

			var o=this,
				data=o.get("tableSelected"),
				newData=[];

			ids=ids.split(",");
			
			for(var i=0;i<data.length;i++){
				var deleteFlag=false;
				for(var j=0;j<ids.length;j++){
					if(data[i]==ids[j]){
						deleteFlag=true;
						break;
					}
				}
				if(!deleteFlag) newData[newData.length]=data[i];
			}
			o.set("tableSelected",newData);
		},
		tableBuild:function(){
			if(typeof this.get("columns") !="object"||this.get("columns").length<0) return;
			
			//table container init
			var containerTpl="<div class=\"eTable-container"+((this.get("autoHeight")==true)?"":" fixedHeight")+((this.get("borderTop")?" borderTop":""))+((this.get("borderBottom")?" borderBottom":""))+"\" "+((this.get("autoHeight")==true)?"autoheight='true'":"")+"><div class=\"eTable-header\"></div><div class=\"eTable-list\"></div><div class=\"eTable-footer\"><div class=\"eTable-pager\"></div></div></div>",
				columnsTpl="",
				columnSize=this.get("columns").length,
				o=this;
			o.get("target").html(containerTpl);
			/*if (o.get("pagerShow") === false) {
				o.get("target").find(".eTable-list").height(this.get("target").height() - 30);
			}else{
				o.get("target").find(".eTable-list").height(this.get("target").height() - 90);
			}*/
			



			
			$(window).trigger("resize.eTable");

			//table columns init
			$(o.get("columns")).each(function(i, v) {
				var sortcolumn = "";
				v.align ="left";
				if(v.thsort!=undefined){
					sortcolumn = "thsort=true_"+v.value+"_0";
				}
				if(v.type=="checkbox"){
					columnsTpl+="<th "+sortcolumn+" class=\"column"+i+((i==columnSize-1)?" lastColumn":"")+((v.sort==true)?" sort":"")+"\""+((v.align!=undefined)?" align=\""+v.align+"\"":"")+"><div class=\"c\" "+((v.w!="undefined")?"style=\"width:"+v.w+"\"":"")+"><div class=\"v\"><span class=\"checkbox\" type=\"allSelect\">.</span></div></div><i class=\"eTable-line\"></i></th>";
				}else if(v.type == "dataSort"){
					columnsTpl+="<th "+sortcolumn+" class=\"trShot column"+i+((i==columnSize-1)?" lastColumn":"")+((v.sort==true)?" sort":"")+"\""+((v.align!=undefined)?" align=\""+v.align+"\"":"")+"><div class=\"c\" "+((v.w!="undefined")?"style=\"width:"+v.w+"\"":"")+"><div class=\"v\" title=\""+v.name+"\">"+v.name+"</div></div>"+((i<columnSize-1)?"<i class=\"eTable-line\"></i>":"")+"<div class=\"dataShort\" valueName=\""+v.value+"Short\"><span class=\"up\" title=\"升序\" sort=\"1\"></span><span class=\"down\" sort=\"2\" title=\"降序\"></span></div></th>";
				}else columnsTpl+="<th "+sortcolumn+" class=\"column"+i+((i==columnSize-1)?" lastColumn":"")+((v.sort==true)?" sort":"")+"\""+((v.align!=undefined)?" align=\""+v.align+"\"":"")+"><div class=\"c\" "+((v.w!="undefined")?"style=\"width:"+v.w+"\"":"")+"><div class=\"v\" title=\""+v.name+"\">"+v.name+"</div></div>"+((i<columnSize-1)?"<i class=\"eTable-line\"></i>":"")+"</th>";
            });
			o.get("target").find(".eTable-header").html("<table cellpadding=\"0\" cellspacing=\"0\"><thead><tr>"+columnsTpl+"</tr></thead></table>");
		},
		treeDepth:function(depth){
			var result="";
			
			if(depth==undefined) return result;
			
			for(var i=0;i<depth;i++){
				result+="<span class=\"eTable-indent\"></span>";
			}
			return result;
		},
        //@author:zhangjieliang @date:2016/7/14 18:01 @comment:记录每一页选中的数据
        getSelectByPage:function(){
            var o=this,
                currentPage=o.get('currentPage'),
                currentPageSelected=o.getPageSelected(),
                getSelectByPage=o.get('getSelectByPage');
            if(getSelectByPage){
                var PageDataind=null;
                for(var i=0;i<getSelectByPage.length;i++){
                    if(getSelectByPage[i].currentPage===currentPage){
                        PageDataind=i;
                        break;
                    }
                }
                if(PageDataind!==null){
                    getSelectByPage[PageDataind].currentPageSelected=currentPageSelected;
                    o.set('getSelectByPage',getSelectByPage);
                }
                else{
                    getSelectByPage.push({
                        currentPage:currentPage,currentPageSelected:currentPageSelected
                    });
                    o.set('getSelectByPage',getSelectByPage);
                }
            }
            else{
                getSelectByPage=[{currentPage:currentPage,currentPageSelected:currentPageSelected}];
                o.set('getSelectByPage',getSelectByPage);
            }
        },
		addEvent:function(){
			var o=this;
			
			//signle
			if(o.get("selectMode")=="single"){
				$("[type=allSelect]",o.get("target")).remove();
			}
			//event
			o.get("target").off("click.allSelect").on("click.allSelect","[type=allSelect]",function(){
				if($(this).hasClass("checked")){
					$(this).removeClass("checked");
					o.get("target").find(".checkbox[type=select]").removeClass("checked");
					o.get("target").find(".eTable-list tr").removeClass("selected");
				}
				else{
					$(this).addClass("checked");
					$(".checkbox[type=select]",o.get("target")).each(function(){
						if(!$(this).hasClass("checkboxDisabled")) $(this).addClass("checked");
					});
					if(o.get("rowSelect")==true){
						$(".eTable-list tr",o.get("target")).each(function(){
							if($(this).find(".checkboxDisabled").size()==0) $(this).addClass("selected");
						});
					}
				}
                o.getSelectByPage();
			}).off("click.select").on("click.select","[type=select]",function(){
				  if($(this).hasClass("checkboxDisabled")) return false;
				  
				  if(o.get("selectMode")=="single"){
					  $(this).closest("tr").siblings("tr").find("[type=select].checked").removeClass("checked");
					  if(o.get("rowSelect")==true){
						  $(this).closest("tr").siblings("tr").removeClass("selected");
					  }
				  }

				  var isChecked = true;
				  if($(this).hasClass("checked")){
					  $(this).removeClass("checked");
					  
					  if(o.get("rowSelect")==true) $(this).parents(".column").parent().removeClass("selected");
					  isChecked = false;
				  }
				  else{
					  $(this).addClass("checked");
					  
					  if(o.get("rowSelect")==true) $(this).parents(".column").parent().addClass("selected");
				  }

				 var $tr = $(this).closest('tr');
			    if(o.get('onRowSelected')){
					o.get('onRowSelected')({
						isChecked : isChecked,
						rowData   : $tr.data()
					});
				}
				  
				  //auto all selected
				  if(o.get("selectMode")!="single"){
					  if(o.getListSize()>o.getPageSelectedSize()) o.get("target").find(".checkbox[type=allSelect]").removeClass("checked");
					  else o.get("target").find(".checkbox[type=allSelect]").addClass("checked");
				  }
                  o.getSelectByPage();
				  return false;
			}).on("click",".eTable-pager a",function(){
				//page
				var $this=$(this),
                    changeNum,
                    action;

                //go to page
                if($this.is(".changePageBtn")){
                    changeNum = $.trim($this.closest(".eTable-pager").find("[name=\"changePageInput\"]").val());
                    if(/^[1-9]\d*$/.test(changeNum) && Number(changeNum)<=o.get("totalPage"))
                        $this.attr("action",changeNum);
                    else if(changeNum>o.get("totalPage")){
                    	$this.attr("action",o.get("totalPage"));
                    }
                    else{
                    	J.alert("请输入正确的页码。");
                    	o.get("target").find("[name=changePageInput]").val(o.get("currentPage"));
                    	return;
                    }
                }

                action=$(this).attr("action");

				if(action==undefined||$(this).hasClass("disabled")||action=="ellipsis") return false;
				
				switch(action){
					case "home":
								action=1;
								break;
					case "last":
								action=o.get("currentPage")-1;
								action=action<1?1:action;
								break;
					case "next":
								action=o.get("currentPage")+1;
								action=action>o.get("totalPage")?o.get("totalPage"):action;
								break;
					case "end":
								action=o.get("totalPage");
								break;
				}
				if(o.get("keepSelected")==true) o.updateTableSelected();
				o.get("pagerCallBack")(action);
				
			}).on("click",".eTable-list tr",function(){
				//li
				if(o.get("rowSelect")!=true) return false;
				var checkbox=$(this).find(".checkbox");
				
				//checkBox
				if(checkbox.size()>0){
					checkbox.click();
				}
				else{
					if(window.controlKey==true){
						if($(this).hasClass("selected")) $(this).removeClass("selected");
						else $(this).addClass("selected");
					}
					else if($(this).hasClass("selected")){
							o.get("target").find(".eTable-list tr").removeClass("selected");
					}
					else {
							o.get("target").find(".eTable-list tr").removeClass("selected");
							$(this).addClass("selected");
					}
				}
				/*if(o.get('onRowSelected')){
					o.get('onRowSelected')($(this).data());
				}*/
			}).on("click","[action=tree]",function(){
				  var li=$(this).parents(".column").parent();
				  
				  if($(this).hasClass("eTable-tree-collapsed")){
					  o.treeChildShow(li);
					  $(this).removeClass("eTable-tree-collapsed").addClass("eTable-tree-expanded");
				  }
				  else{
					  o.treeChildHide(li.attr("myid"));
					  $(this).removeClass("eTable-tree-expanded").addClass("eTable-tree-collapsed");
				  }
				  
				  //reset color
				  o.colorBuild();
				  return false;
			  }).on("blur.select",".v select",function(){
				  var $this=$(this);
				  setTimeout(function(){
				  	  var tr=$this.parents(".column").parent();
						  var data=tr.data(),
						  	  name=$this.attr("name");
						  name=name.substring(name.lastIndexOf("_")+1,name.length);
						  data[name]=$this.val();
					  //set selected
					  if(!tr.hasClass("selected")){
					   $("[type=select]",tr).click();
				  	  }
				  },1);
			  }).on("click.edit",".edit, .v input[type=text]",function(){
				  o.set("editStatus","ing");
				  var $this=$(this);
				  $this.addClass("editing");
				  if(typeof $this.data("format")=="function"){
					  var tr=$this.parents(".column").parent(),
					  	  data=tr.data(),
					  	  name=$this.attr("name");
					  name=name.substring(name.lastIndexOf("_")+1,name.length);
					  $this.val(data[name]);
				  }
				  return false;
			  }).on("blur.edit",".v input[type=text]",function(){
				  var $this=$(this);
				   o.set("editStatus","ing");
				  setTimeout(function(){
				  	  var tr=$this.parents(".column").parent();
					  if(!$this.hasClass("validator-input-error")){
						  var data=tr.data(),
						  	  name=$this.attr("name");
						  name=name.substring(name.lastIndexOf("_")+1,name.length);
					      
						  data[name]=$this.val();
					      if(typeof $this.data("format")=="function"){
					    	  $this.val($this.data("format")(data[name]));
						  }
					      $this.removeClass("editing");
					  }

					  //set selected
					  if(o.get("editBlurAutoSelect")&&!tr.hasClass("selected")){
					   $("[type=select]",tr).click();
				  	  }
				  },1);
			  }).on("blur.select",".v select",function(){
				  var $this=$(this);
				  setTimeout(function(){
				  	  var tr=$this.parents(".column").parent();
						  var data=tr.data(),
						  	  name=$this.attr("name");
						  name=name.substring(name.lastIndexOf("_")+1,name.length);
						  data[name]=$this.val();
					  //set selected
					  if(!tr.hasClass("selected")){
					   $("[type=select]",tr).click();
				  	  }
				  },1);
			  }).on("click",".eTable-header th",function(){
			  		var thsort = $(this).attr("thsort");
			  		if(thsort!="" && thsort!=undefined){
			  			var listsort = thsort.split("_"),
			  		    valueName = listsort[1]+"Short",
				  		sortType = listsort[2],
				  		sortType2 = listsort[2]==0?1:0;
				  		$(this).attr("thsort",listsort[0]+"_"+listsort[1]+"_"+sortType2);
				  		if(listsort[0]=="true"){
				  			var obj = o.get("query");
				  				obj[valueName] = sortType;
				  			    o.get("target").update(obj);
				  		}
			  		}
			  }).on("click",".eTable-header .dataShort span",function(){
			  		var thsort = $(this).attr("sort"),
						valueName = $(this).parent(".dataShort").attr("valueName");
					var obj = o.get("query");
						obj[valueName] = thsort;
					o.get("target").update(obj);
					delete obj[valueName];
					return false;
			  });
			
			//scroll
			o.get("target").find(".eTable-list").unbind("scroll").bind("scroll",function(){
				var temp=$(this).parents(".eTable-container"),
					left=$(this).scrollLeft();
				temp.find(".eTable-header table").css("margin-left","-"+left+"px");
				o.columnDragResize();
			});
		},
		treeChildShow:function(li){
			var o=this,
				parentId=li.attr("myid"),
				childData=li.data().children,
				depth=li.attr("depth");
			depth=depth?parseInt(depth):0;
			depth++;
			
			if(childData&&li.attr("builded")==undefined){
				S.loadingShow();
				var table=$("<table></table>");
				$(childData).each(function(i,v){
					v.depth=depth;
					if(v.children&&v.children.length>0){
						v.parentFlag=true;
					}
					else v.childFlag=false;
					table.append(o.rowDataBuild(i,v));
				});
				li.attr("builded",true);
				li.after(table.find("tr"));
				J.loadingHide();
			}
			else{
				var child=o.get("target").find("[parentid="+parentId+"]");
				child.css("display","");
			}
			
		},
		treeChildHide:function(parentId){
			var o=this,
				child=o.get("target").find("tr[parentid="+parentId+"]");
			child.each(function(){
				$(this).hide();
				if($(this).attr("builded")&&$(".eTable-tree-expanded",$(this)).size()>0) {
					o.treeChildHide($(this).attr("myid"));
					$(".eTable-tree-expanded",$(this)).addClass("eTable-tree-collapsed").removeClass("eTable-tree-expanded");
				}
				
			});
			
		},
		sortModify:function(one,two){
			if(typeof one!="object"||typeof two!="object") return;
			var temp=two.attr("sort"),
				result=[],
				idKey=this.get("idKey"),
				sortKey=this.get("sortKey"),
				api=this.get("sortUpdateApi");
			two.attr("sort",one.attr("sort"));
			one.attr("sort",temp);
			
			var item1={};
			item1[idKey]=one.attr("myid");
			item1[sortKey]=one.attr("sort");
			result[0]=item1;
			
			var item2={};
			item2[idKey]=two.attr("myid");
			item2[sortKey]=two.attr("sort");
			result[1]=item2;
			J.request({
				url:api,
				data:result
			});
		},
		getListSize:function(){
			var result=0;
			this.get("target").find(".eTable-list tr").each(function(){
				if($(this).find(".checkboxDisabled").size()==0) result++;
			});
			return result;
		},
		columnDrag:function(){
			if(this.get("columnDrag")!=true) return false;
			
			this.columnDragResize();
			
			var dragging=false,
				iX=0,
				container=this.get("target"),
				index=0,
				leftW=container.offset().left,
				minW=40;
			
			
			container.off("mousedown.etable").on("mousedown.etable",".eTable-drag",function(e){
				
				//mousedown
				container.addClass("moving");
				dragging=true;
				var nW=0;
				
				$(this).prev().addClass("eTable-drag-hover");
				$(this).addClass("eTable-drag-hover");
				
				var offset=$(this).offset();
				iX = e.clientX - offset.left+leftW;
                index=$(this).index()-3;
                
                container[0].releaseCapture&&container[0].releaseCapture();
                e.cancelBubble = true;
                
			}).off("mouseup.etable").on("mouseup.etable",function(e){
				
				//mouseup
				container.removeClass("moving");
				dragging = false;
                var temp=container.find(".eTable-drag-hover");
                if(temp.size()==2){
                	var nW=parseInt(temp.eq(1).css("left").replace("px",""),10)-parseInt(temp.eq(0).css("left").replace("px",""),10);
                	container.data().setting.columns[index]["width"]=nW+"px";
                	container.find(".eTable-drag-hover").removeClass("eTable-drag-hover");
                	$(window).trigger("resize.eTable");
                }
                
                container[0].releaseCapture&&container[0].releaseCapture();
                e.cancelBubble = true;
                
			}).off("mousemove.etable").on("mousemove.etable",function(e){
				
				//move
				if (dragging) {
	                var oX = e.clientX - iX,
	                	temp=$(".eTable-drag-hover",e.currentTarget);
	                
	                if(parseInt(temp.eq(0).css("left").replace("px",""),10)+minW<oX){
	                	$(".eTable-drag",e.currentTarget).eq(index).css("left",oX+"px");
	                }
	                return false;
                }
			});
			
		},
		columnDragResize:function(){
			var o=this;
			
			if(o.get("columnDrag")&&o.get("data")&&o.get("data").length){
				var columns=o.get("target").find(".eTable-header th"),
					drag="",
					h=o.get("target").find(".eTable-header").height()+o.get("target").find(".eTable-list").height()+1,
					left=0,
					mL=parseInt(o.get("target").find(".eTable-header table").css("margin-left").replace("px",""),10);
	
				o.get("target").find(".eTable-drag").remove();
				for(var i=0;i<columns.size()-1;i++){
					left+=columns.eq(i).width();
					drag+="<div class=\"eTable-drag\" style=\"height:"+h+"px;left:"+(left+mL-3)+"px\"></div>";
				}
				$(".eTable-container",o.get("target")).append(drag);
			}
			else{
				$(".eTable-drag",o.get("target"));
			}
		},
		removeColumnDrag:function(){
			this.get("target").find(".eTable-drag").remove();
		},
		rowDataBuild:function(i,v){
			
			var data=this.get("data"),
				columnsData=this.get("target").find(".eTable-container").data("columns"),
				columnsDataSize=columnsData&&columnsData.length,
				row,
				column,
				value,
				o=this,
				disabledKey=o.get("disabledKey"),
				rowDisabledBy=o.get("rowDisabledBy");

			//row type
			if(o.get("type")=="treeGrid"){
				row=$("<tr"+((o.get("rowSort")==true)?" sort=\""+v[o.get("sortKey")]+"\"":"")+((v[o.get("idKey")])?" myid=\""+v[o.get("idKey")]+"\"":"")+" parentid=\""+v[o.get("parentIdKey")]+"\" class=\""+(((i+1)%2==0)?"odd":"even")+"\"></tr>");
			}
			else
				row=$("<tr"+((o.get("rowSort")==true)?" sort=\""+v[o.get("sortKey")]+"\"":"")+((v[o.get("idKey")])?" myid=\""+v[o.get("idKey")]+"\"":"")+" class=\""+(((i+1)%2==0)?"odd":"even")+"\"></tr>");
			
			if(v.childFlag==true) row.hide();
			//columns 
			$(columnsData).each(function(ii,vv) {
				//init
				column=$("<td class=\"column column"+ii+((ii==columnsDataSize-1)?" lastColumn":"")+"\""+((vv.align!=undefined)?" align=\""+vv.align+"\"":"")+"><div class=\"c\" "+((vv.w!="undefined")?"style=\"width:"+vv.w+"\"":"")+"><div class=\"v\"></div></div></td>");
				value=column.find(".v");
				
				//build columns by column type
				switch(vv.type){
					case "checkbox":
						  var checkBox=$("<span class=\"checkbox\" type=\"select\">.</span>");
						  if(v[disabledKey]==true) checkbox.addClass("checkboxDisabled");
						  else if(typeof rowDisabledBy=="function"){
							  if(rowDisabledBy(v)==true) checkBox.addClass("checkboxDisabled");
						  }
						  
						  checkBox.attr("val",v["id"]);
						  value.append(checkBox);
						  break;
					case "text":
						 var keys = vv.format(v[vv.value],v).keys;
						 var sValue =vv.format(v[vv.value],v).sValue;
						  var spantHtml = "";
						   if(sValue!=undefined){
						 $.each(keys, function(i, n){
								 if(sValue == n.key ){
								 	spantHtml = "<span name='span_'+i>"+n.value+"</span>";
								 	return false;
								 }else{
								 	spantHtml = "<span name='span_'+i>--</span>";
								 }
								});
						}
							var spantext=$(spantHtml);
							value.append(spantext);
						  break;
					case "select":
						 var keys = vv.format(v[vv.value],v).keys;
						 var sValue =vv.format(v[vv.value],v).sValue;
						 var list =vv.format(v[vv.value],v).list;
						 var selectHtml = "<select class='select_selk' name=\"select_"+i+"_"+vv.value+"\">";
						 if(list=="false"){
							$.each(keys, function(i, n){
								 sh += "<option value=\""+ n.key +"\"";
								 if(sValue == n.key ){
									 sh+="selected=\"selected\"";
								 }
								 sh+=">"+ n.value +"</option>";
								});
						 }else{
						 	 if(sValue!=undefined){
					   	var sh ="<option value=\"\">请选择</option>";
					    	$.each(keys, function(i, n){
								 sh += "<option value=\""+ n.key +"\"";
								 if(sValue == n.key ){
									 sh+="selected=\"selected\"";
								 }
								 sh+=">"+ n.value +"</option>";
								});
					   }
					    else{
					    	 var sh ="<option value=\"\">请选择</option>";
							 $.each(keys, function(i, n){
								 sh+= "<option value=\""+ n.key +"\"";
								 sh+=">"+ n.value +"</option>";
								});
					    }
						 }
					  
					    selectHtml+=sh;
						 selectHtml+="</select>";
						 var selecter=$(selectHtml);
						 value.parents(".column").addClass("select");
						 value.append(selecter);
						 break;
					case "edit":
						 var input=$("<input type=\"text\" name=\"edit_"+i+"_"+vv.value+"\"/>");
						 if(typeof vv.format=="function")
							  input.data("format",vv.format).val(vv.format(v[vv.value]));
						 else 
							 input.val(v[vv.value]);
						 if(vv.rule) input.attr("rule",vv.rule);
						 if(vv.required) input.attr("required",true);
						 if(vv.maxLength) input.attr("maxLength",vv.maxLength);
						 value.parents(".column").addClass("edit");
						 value.append(input);
						 break;
					case "rowSort":
						  var btn=$("<a class=\"eTable-sort-up\"></a><a class=\"eTable-sort-down\"></a>");
			
						  btn.unbind("click").bind("click",function(){
							  var li=$(this).parents(".column").parent(),
								  index=li.index(),
								  total=$(this).parents(".eTable-list").find("tr").size(),
								  temp="";
							  
							  //get child
							  function getChild(li,parentid){
									  var myid=li.attr("myid"),
										  temp=o.get("target").find("tr[parentid="+myid+"]");
									  
									  myid=(parentid!=undefined?parentid:myid);
									  li.attr("group",myid);
									  
									  temp.each(function(){
										  if($(this).find("[action=tree]").size()==1) getChild($(this),myid);
										  $(this).attr("group",myid);
									  });
							  }
							  
							  //get parent
							  function getParent(li){
									  var result="",
										  parentid=li.prev().attr("parentid");
									  
									  while(true){
										temp=o.get("target").find("tr[myid="+parentid+"]");
			
										if(temp.attr("parentid")==li.attr("parentid")){
											result=temp;
											break;
										}
										else{
											parentid=temp.attr("parentid");
										}
									  }
									  return result;
							  }
							  
							  //selected
							  o.get("target").find(".checked").removeClass("checked");
							  o.get("target").find(".eTable-list tr").removeClass("selected");
							  li.find(".checkbox[type=select]").addClass("checked");
							  li.addClass("selected");
			
							  //up
							  if($(this).hasClass("eTable-sort-up")){
								  if(index==0){
									  J.alert("第一位不能再上移。");
									  return;
								  }
			
								  //同级
								  if(li.attr("parentid")==li.prev().attr("myid")){
									  J.alert("子级不能在父级之外。");
								  }
								  //含有子级
								  else if(li.find("[action=tree]").size()==1){
									  
									  getChild(li);
									  if(li.prev().attr("parentid")!=li.attr("parentid")){
										  temp=getParent(li);
										  getChild(temp);
										  
										  //move
										  temp.before(o.get("target").find("tr[group="+li.attr("myid")+"]"));
									  }
									  else{
										  //move
										  temp=li.prev();
										  o.get("target").find("tr[group="+li.attr("myid")+"]").last().after(temp);
									  }
									  
									  //update sort
									  o.sortModify(li,temp);
								  }
								  //同级的上一个含有子级
								  else {
									  if(li.prev().attr("parentid")!=li.attr("parentid")) temp=getParent(li);
									  else temp=li.prev();
									  
									  //move
									  temp.before(li);
									  
									  //update sort
									  o.sortModify(li,temp);
								  }
							  }
							  //down
							  else{
								  if(index==(total-1)||$(this).parents(".eTable-list").find("tr:visible").size()==1){
									  J.alert("最后一位不能再下移。");
									  return;
								  } 
			
								  //同级
								  if(li.attr("parentid")!=li.next().attr("parentid")&&li.attr("myid")!=li.next().attr("parentid")){
									  J.alert("子级不能在父级之外。");
								  }
								  //含有子级
								  else if(li.find("[action=tree]").size()==1){
									  getChild(li);
									  temp=o.get("target").find("tr[group]").last().next();
			
									  if(temp.attr("parentid")!=li.attr("parentid")) {
										  J.alert("子级不能在父级之外。");
									  }
									  else if(temp.find("[action=tree]").size()==1){
										  getChild(temp);
										  
										  //update sort
										  o.sortModify(li,temp);
										  
										  temp=o.get("target").find("tr[group="+temp.attr("myid")+"]");
										  li.before(temp);
									  }
									  else {
										  
										  //update sort
										  o.sortModify(li,temp);
										  
										  //move
										  li.before(temp);
									  }
								  }
								  //同级的下一个含有子级
								  else{
									  temp=li.next();
									  o.sortModify(li,temp);
									  
									  if(temp.find("[action=tree]").size()==1){
										  getChild(temp);
										  temp=o.get("target").find("tr[group]").last();
									  }
									  temp.after(li);
								  }
							  }
							  
							  o.get("target").find("tr[group]").removeAttr("group");
							  o.colorBuild();
							  return false;
						  });
						  value.append(btn);
						  break;
					case "rowOrderNum":
						  value.text(parseInt(o.get("dataSize"))*parseInt((o.get("currentPage")-1))+(i+1));  
						  break; 
					case "button":
						 var btns = vv.value || [],
							 btn;
						 
						 if(typeof btns === 'function') btns = btns(v);

						 $(btns).each(function(index,button){
								//btn show and hide
								if(typeof button.showBy=="function"&&(!button.showBy(v))) return;
								var clazz = "eTable-button-" + button.icon;
								if(button.clazz){
									clazz += ' ' + button.clazz;
								}
								btn=$("<div title=\""+button.button+"\" class=\""+clazz+"\">"+button.button+"</div>");
								//btn.text(button.button);

								btn.unbind("click").bind("click",function(){
									if(typeof button.click=="function")
									button.click($(this).parents(".column").parent().data(),$(this).parents(".column").parent(),$(this));
									return false;
								});
							 	if(vv.tooltip) btn.tooltip(vv.tooltip); //增加tooltip功能
								value.append(btn);
						  });
				
						  break;
					case "tree":

						  //parent icon
						  if(v.parentFlag==true){

							  //indent
							  value.append(o.treeDepth(v.depth));

							  //icon
							  value.append("<span action=\"tree\" class=\"eTable-tree-collapsed\"></span>");
						  }
						  else if(v.depth>0){
							   value.append(o.treeDepth(v.depth+1));
						  }

						  //value
						  value.append("<span class=\"eTable-tree-text\"></span>");

						  //set value
						  if(v[vv.value]) value.find(".eTable-tree-text").attr("title",v[vv.value].replace(/"/g,"").replace(/'/g,""));
						  value.find(".eTable-tree-text").text(v[vv.value]);

						  break;
					default :
						  var myValue="--";
						  if(vv.hover){
							  value.hover(function(){
								  vv.hover.in($(this),v)
							  },function(){
								  vv.hover.out($(this))
							  })
						  }
						  if(vv.format&& typeof vv.format=="function"){
							  myValue=vv.format(v[vv.value],v);
						  }
						  else if(vv.dateFormat) {
							  if(v[vv.value]&&v[vv.value]!="undefined"){
								  v[vv.value]=S.dateFormat(new Date(parseInt(v[vv.value])),vv.dateFormat);
								  myValue=v[vv.value];
							  }
						  }
						  else if(typeof vv.formatDataSourse != "undefined" 
							             && vv.formatDataSourse != null&& vv.formatDataSourse != ""){
							  var sourseTemp=eval(vv.formatDataSourse);
							  myValue = v[vv.value];
							  for(var fI=0;fI<sourseTemp.length;fI++){
								  if(sourseTemp[fI].value==v[vv.value]){
									  myValue=sourseTemp[fI].label;
									  break;
								  }
							  }
						  }
						  else if(typeof vv.value=="function"){
							  var keyTemp=vv.value(v);
							  if(v[keyTemp]||v[keyTemp]==0) myValue=v[keyTemp];
						  }
						  else if(v[vv.value]||v[vv.value]==0) myValue=v[vv.value];
						  myValue=String(myValue);
						  if(myValue!="--") {
						  	if (vv.valueType == "html") {
						  		var myTitle = $(myValue).text();
						  		value.attr("title",myTitle.replace(/"/g,"").replace(/'/g,""));
						  	}else{
						  		value.attr("title",myValue.replace(/"/g,"").replace(/'/g,""));
						  	}
						  }
						  if(typeof vv.classFormat=="function"){
							  var className=vv.classFormat(v);
							  if(className) myValue="<i class='" +className+"'></i>"+myValue;
							  value.html(myValue);
						  }
						  if(typeof vv.colorFormat=="function"){
							  var colorName=vv.colorFormat(v[vv.value],v);
							  if(colorName) myValue="<i style=\""+colorName+"\">"+myValue+"</i>";
							  value.html(myValue);
						  }else if(typeof vv["click"] == "function"){
                              var clickValue = $("<a class=\"v-click\">"+myValue+"</a>");
                              clickValue.click(function(){
                                  vv["click"](v);
                                  return false;
                              });
                              value.append(clickValue);
                          } else {
                          	if(vv.valueType == 'html'){
                          		value.html(myValue);
                          	} else {
                          		value.text(myValue);
                          	}
                          }
						 break;
				}
				row.append(column);
			});
			
			//set data for row
			row.data(v);
			if(v.depth) row.attr("depth",v.depth);

			if(typeof o.get("rowBeforeBuild") == 'function') o.get("rowBeforeBuild")(row,v);

			//right menu event
			if(o.get("rowSelect")==true&&o.get("rightMenu").length>0){
				row.bind("contextmenu",function(e){
					var selected=o.get("target").find("tr.selected");
					if(selected.size()<=1){
						selected.removeClass("selected");
						$(this).addClass("selected");
					}

					var target=$("#J-"+o.get("targetID")+"-rightMenu"),
						wW=$(window).width(),
						wH=$(window).height(),
						mW=target.width(),
						mH=target.height(),
						topPx=0,
						leftPx=0;

					topPx=(wH-(e.pageY+mH)<0)?e.pageY-mH:e.pageY;
					leftPx=(wW-(e.pageX+mW)<0)?e.pageX-mW:e.pageX;
					
					target.css({"top":topPx+"px","left":leftPx+"px"});
					target.show();
					return false;
				});
			}
			return row;
		},
		//合并相同标题单元格
		mergeTd:function(number){ //td_ 需要合并的td列表
			var td_=$(this.setting.target[0].children[0].children[1]).find('td.column'+number);
			if(!td_ || td_.length === 0){return;}
			var tdLen=td_.length,thisTd=null,text_=null,index_=null,rowspanNum=2,par_=null;
			for(var i=tdLen-1;i>=0;i--){
				thisTd=td_[i];
				if(text_ === thisTd.innerText){
					rowspanNum=parseInt(td_[index_].getAttribute('rowspan'));
					par_.removeChild(td_[index_]);
					if(!rowspanNum){
						rowspanNum=2;
					}else{
						rowspanNum++;
					}
					thisTd.setAttribute('rowspan',rowspanNum);
					rowspanNum=2;
					index_--;
				}
				par_=thisTd.parentNode;
				text_=thisTd.innerText;
				index_=i;
			}
		},
		//点击合并项选中合并行中所有checkbox
		clickForAllCheckbox:function(e){
			var target_=e.srcElement || e.target,num_=0,getTd=target_.parentNode;
			if(target_.localName != 'td'){
				while(getTd.localName != 'td'){
					if(getTd.localName === 'body'){return;}
					getTd=getTd.parentNode;
					num_++;
				}
			}else{
				getTd=target_;
			}
			var rowspan_=parseInt(getTd.getAttribute('rowspan')) || 0;
			var par_=getTd.parentNode;
			for(var i=rowspan_-1;i>=0;i--){
				if(!par_){continue;}
				if(i != rowspan_-1){
					var checkbox=$(par_).find('.checkbox');
					if(checkbox.size()>0){
						checkbox.click();
					}
				}
				par_=par_.nextElementSibling ? par_.nextElementSibling : null;
			}
		},
		tableDataBuild:function(){

			var data=this.get("data"),
				o=this,
				dataList=$("<div class=\"no-data\">"+this.get("noData")+"</div>");

			//data list build
			if(data&&(data.length>0)){

				//server data
				dataList=$("<table cellspacing=\"0\" cellpadding=\"0\"><tbody class="+o.get('tbodyClass')+"></tbody></table>");

				$(data).each(function(i, v){
			
					if(o.get("type")=="treeGrid"){
						if(v.children&&v.children.length>0){
							v.parentFlag=true;
						}
						else v.childFlag=false;
					}

					//append row to dataList
					dataList.find("tbody").append(o.rowDataBuild(i,v));
				});

			}

			//计算表格列表高度
			if (o.get("pagerShow") === false) {
				o.get("target").find(".eTable-list").height(this.get("target").height() - 30);
			}else{
				o.get("target").find(".eTable-list").height(this.get("target").height() - 90);
			}
			//show data list
			$(".eTable-list",this.get("target")).html(dataList);
			if ($(".eTable-list",this.get("target")).hasClass("mCustomScrollbar")) {
				$(".eTable-list",this.get("target")).loadScroll("destroy");
				$(".eTable-list",this.get("target")).loadScroll();
			}else{
				$(".eTable-list",this.get("target")).loadScroll();
			}
			//合并单元格
			var merg_content=$(".eTable-list",this.get("target")).get(0) || null;
			var isNeedmergeTd_=this.get("isNeedmergeTd");
			if(isNeedmergeTd_ !== false && isNeedmergeTd_ !== null && isNeedmergeTd_ !== undefined && isNeedmergeTd_ !== NaN && isNeedmergeTd_ !== ''){
				merg_content && o.mergeTd(isNeedmergeTd_);
				merg_content && merg_content.addEventListener('click',o.clickForAllCheckbox,true);	
			}
			//reset color
			if(this.get("type")=="treeGrid") this.colorBuild();

			//show pager
			if((this.get("pagerShow")&&this.get("totalPage")>=1)||this.get("topPager")){
				
				var target=this.get("target"),
					option="",
					dataSize=this.get("dataSizeFirst");

				if(target.find(".eTable-pager").size()==0) target.find(".eTable-footer").append("<div class=\"eTable-pager\"></div>");
				var newPager=this.get('newPager');
                var TopPagerDom=this.setting.topPagerDom;
                if(this.setting.topPager&&TopPagerDom){
                    // this.setting.pagerTpl="{etl:pageList}<a class=\"next-page\" action=\"next\"></a>";
                    this.setting.pagerTpl = "<a class=\"last-page back-page\" action=\"last\"> </a><b>{etl:currentPage}</b>/<b>{etl:totalPage}</b><a class=\"next-page\" action=\"next\"> </a>";
                    TopPagerDom.html(this.pagerBuild()).fadeIn("slow");
                    //TopPager click
					$(".Top-Pager a").on("click",function(){
						var $this=$(this),
		                    action=$(this).attr("action");
		                    if(action==undefined||$(this).hasClass("disabled")||action=="ellipsis") return false;
		                    switch(action){
							case "last":
										action=o.get("currentPage")-1;
										action=action<1?1:action;
										break;
							case "next":
										action=o.get("currentPage")+1;
										action=action>o.get("totalPage")?o.get("totalPage"):action;
										break;
							}
						if(o.get("keepSelected")==true) o.updateTableSelected();
						o.get("pagerCallBack")(action);

					});
                }else if(newPager){
                	newPager.html(this.pagerBuild()).fadeIn("slow");
                }else{
                    target.find(".eTable-pager").html(this.pagerBuild()).fadeIn("slow");
                }
				
				for(var i=0;i<6;i++){
					option+="<option value=\""+(dataSize+dataSize*i)+"\">"+(dataSize+dataSize*i)+"</option>";
				}
				var targetSelect = o.get("target").selector.split("[url=");
				//存入本地存储
				//if(!localStorage[J.userData.userId+"dataSize"+targetSelect[1]]){
					//localStorage[J.userData.userId+"dataSize"+targetSelect[1]] = o.get("dataSize");
				//}else{
					//o.set("dataSize",parseInt(localStorage[J.userData.userId+"dataSize"+targetSelect[1]]));
				//}

	            //判断本地存储中是否有数据，如果有的话，重设每页显示条数
				//if(localStorage[J.userData.userId+"dataSize"+targetSelect[1]]){
					//o.set("dataSize",parseInt(localStorage[J.userData.userId+"dataSize"+targetSelect[1]]));
				//}
				
				target.find(".eTable-pager select").append(option).change(function(){
					o.set("dataSize",parseInt($(this).val()));
					//localStorage[J.userData.userId+"dataSize"+targetSelect[1]] = parseInt($(this).val());//修改本地存储中的dataSize
					if(target.parent().find(".right-page-top").size()>0) o.update(target.parent().find(".right-page-top").getFormData());
					else o.update();
				});
				
				target.find(".eTable-pager select [value="+o.get("dataSize")+"]").attr("selected",true);
				
				if(this.get("currentPage")==1)
					target.find("[action='home'],[action='last']").addClass("disabled");
		
				if(this.get("currentPage")==this.get("totalPage"))
					target.find("[action='next'],[action='end']").addClass("disabled");
			}
			else this.get("target").find(".eTable-pager").remove();
			
			
			//tree open
			if(this.get("treeOpen")==true){
				this.get("target").find("tr:visible [action=tree]:first").click();
			}

			//reset height and width
			$(window).trigger("resize.eTable");
			
			//column drag
			if((data!="")&&(typeof data=="object")&&(data.length>0)) this.columnDrag();
			
			/*$(".eTable-list",o.get("target")).validator({
				msgDirection:"bottom",
				msgShow:false
			});*/
	
			//loading hide
			this.loadingHide();
		},
		update:function(query,clearSelected,editCurrent,callback){
			this.get("target").find("[type=allSelect]").removeClass("checked");
			this.loadingShow();
			if(clearSelected==true){
				this.set("tableSelected",[]);
				this.set("tableData",[]);
			}
			var page=1;

			if(query){
				if(JSON.stringify(this.get("query"))==JSON.stringify(query)) page=this.get("currentPage");
				this.set("query",query);
			}
			
			this.request(page,callback,null,true);
			
		},
		rightMenu:function(){
			var o=this;
			if(o.get("rightMenu").length>0){
				
				$("#J-"+o.get("targetID")+"-rightMenu").remove();
	
				var rightMenu=$("<div class=\"right-menu\" id=\"J-"+o.get("targetID")+"-rightMenu\"><ul class=\"clearfix\"></ul></div>");
				
				$(o.get("rightMenu")).each(function(i,v){
					var li=$("<li></li>");
					if(v.text=="line")
						li.addClass("line");
					else{
						li.text(v.text);
						if(v.icon!=undefined) li.addClass(v.icon);
					}
					
					if(typeof v.click=="function"){
						li.bind("click",function(){
							if($(this).hasClass("disabled")||$(this).hasClass("line")) return false;
							v.click();
						});
					}
					
					rightMenu.find("ul").append(li);
				});
				if(rightMenu.text()!="") $("body").append(rightMenu);
			}
		},
		pagerBuild:function(){
			//no data handle
			
			var data=this.get("data");
			if(!this.get("topPager")){
				if((data=="")||(typeof data!="object")||(data.length<1)) return "";
			}
			var pageShowLimit=parseInt(this.get("pageShowLimit")),
				pageEndLimit=parseInt(this.get("pageEndLimit")),
				totalPage=parseInt(this.get("totalPage")),
				currentPage=parseInt(this.get("currentPage")),
				frontStart,
				frontEnd,
				backStart,
				backEnd,
				result=this.get("pagerTpl"),
				pageList="",
				getList=function(start,end){
					for(var i=start;i<=end;i++){
						pageList+="<a"+((i==currentPage)?" class=\"current disabled\"":" action=\""+i+"\"")+">"+i+"</a>";
					}
				};
			if(this.get("totalPage")>pageShowLimit){
				
				if(currentPage<(pageShowLimit-pageEndLimit-1)){
					frontStart=1;
					frontEnd=pageShowLimit-pageEndLimit-1;
					backStart=totalPage-pageEndLimit+1;
					backEnd=totalPage;
				}
				else if(currentPage>(totalPage-(pageShowLimit-pageEndLimit)+1)){
					frontStart=totalPage-pageShowLimit+1
					frontEnd=frontStart+1
					backStart=frontStart+2
					backEnd=totalPage;
				}
				else if((totalPage-currentPage)<pageShowLimit){
					frontStart=totalPage-pageShowLimit+1
					frontEnd=frontStart+1
					backStart=frontStart+2
					backEnd=totalPage;
				}
				else{
					frontStart=currentPage;
					frontEnd=currentPage+1;
					backStart=totalPage-pageEndLimit+1;
                    frontEnd>totalPage&&(frontEnd=totalPage);
                    if(backStart>frontEnd){
                        backEnd=totalPage;
                    }
                    else if(backStart===frontEnd&&totalPage-backStart===1){
                        backStart=totalPage;
                        backEnd=totalPage;
                    }
				}
				/*if(frontEnd>3){//分页页码过多，
					frontEnd=3;
				}*/
                if(backEnd===undefined){
                    pageList+="<a class=\"ellipsis\" action=\"ellipsis\">...</a>";
                }
				//front
				getList(frontStart,frontEnd); //frontEnd-- 
				
				//middle
                if(backEnd!==undefined&&(backStart-frontEnd)>2){
                    pageList+="<a class=\"ellipsis\" action=\"ellipsis\">...</a>";
                }else if ((backStart-frontEnd)==2) {
                	var middlePager =1 + frontEnd
                	pageList+="<a"+" action=\""+middlePager+"\""+">"+middlePager+"</a>";
                }
				
				//back
				getList(backStart,backEnd);//backEnd--总页数
			}
			else{
				getList(1,totalPage);
			}

			//variable
            if(this.setting.topPager){
                // result=result.replace(/{etl:pageList}/gi,pageList);
                result=result.replace(/{etl:totalPage}/gi,this.get("totalPage"));
                result=result.replace(/{etl:currentPage}/gi,this.get("currentPage"));
            }
            else{
            	result=result.replace(/{etl:totalPage}/gi,this.get("totalPage"));
                result=result.replace(/{etl:totalData}/gi,this.get("totalData"));
                result=result.replace(/{etl:totalPage}/gi,this.get("totalPage"));
                result=result.replace(/{etl:currentPage}/gi,this.get("currentPage"));
                result=result.replace(/{etl:dataSize}/gi,this.get("dataSize"));
                result=result.replace(/{etl:pageList}/gi,pageList);
            }
			return result;
		},
		loadingShow:function(){
			if(this.get("loadingShow")==true){
				var loading=this.get("target").find(".eTable-loading");
				if(loading.size()>0){
					loading.show();
				}
				else{
					this.get("target").find(".eTable-container").append(this.get("loadingTpl"));
				}
			}
			else if(this.get("loading")){
                S.loadingShow();
            }
		},
		getPageSelected:function(){
			var o=this,
				result=[];
			
			if(o.get("rowSelect")==true)
				$("tr.selected",o.get("target")).each(function(){
					result[result.length]=$(this).data();
				});
			else {
				$(".checkbox[type=select]",o.get("target")).each(function(){
					if($(this).hasClass("checked")) result[result.length]=$(this).parents(".column").parent().data();
				});
			}
			return result;
		},
		getPageSelectedSize:function(){
			return this.getPageSelected().length;
		},
		getPageSelectedIds:function(){
			var ids="";
			$(".eTable-list tr",this.get("target")).each(function(){
				if($(this).hasClass("selected")||$(this).find("[type=select].checked").size()>0) ids+=$(this).attr("myid")+",";
			});
			return ids.substring(0,ids.lastIndexOf(","));
		},
		getPageUnSelectIds:function(){
			var ids="";
			$(".eTable-list tr",this.get("target")).each(function(){
				if(!$(this).hasClass("selected")) ids+=$(this).attr("myid")+",";
			});
			return ids.substring(0,ids.lastIndexOf(","));
		},
		getSelected:function(){
			var o=this,
				result=[];

			if(o.get("keepSelected")==true){
				o.updateTableSelected();
				var sourse=o.get("tableData"),
					temp=o.get("tableSelected"),
					idKey=o.get("idKey");

				for(var i=0;i<temp.length;i++){
					for(var j=0;j<sourse.length;j++){
						if((sourse[j][idKey]==temp[i])){
							result[result.length]=sourse[j];
							break;
						}
					}
				}
			}
			else result=o.getPageSelected();
			return result;
		},
        getSelectedAllPage:function(){
			var o=this,
				result=[];

			if(o.get("keepSelected")==true){
				o.updateTableSelected();
				var sourse=o.get("tableData"),
					temp=o.get("tableSelected"),
					idKey=o.get("idKey");

				for(var i=0;i<temp.length;i++){
					for(var j=0;j<sourse.length;j++){
						if((sourse[j][idKey]==temp[i])){
							result[result.length]=sourse[j];
							break;
						}
					}
				}
			}
            else{
                var SelectAllData=o.get('getSelectByPage');
                if(SelectAllData){
                    var lists=[];
                    SelectAllData.map(function(d,i){
                        result=result.concat(d.currentPageSelected);
                    });
                }
                else{
                    result=o.getPageSelected();
                }
            }
			return result;
		},
		getSelectedSize:function(){
			var o=this,
				result=0;
			
			if(o.get("keepSelected")==true){
				o.updateTableSelected();
				result=o.get("tableSelected").length;
			}
			else result=o.getPageSelectedSize();
			return result;
		},
		getSelectedIds:function(){
			var o=this,
				result="";
			
			if(o.get("keepSelected")==true){
				o.updateTableSelected();
				result=o.get("tableSelected").join(",");
			}
			else result=o.getPageSelectedIds();
			return result;
		},
		loadingHide:function(){
			if(this.get("loadingShow")==true) this.get("target").find(".eTable-loading").fadeOut(80);
			else S.loadingHide();
		},
		init:function(){

			var o=this;
			var targetSelect = o.get("target").selector.split("[url=");
            o.set("dataSizeFirst",o.get("dataSize"));
			//target
			if(o.get("targetID")!=""&&o.get("target")=="")
				o.set("target",$("#"+o.get("targetID")));
			
			//row checkbox
			if(o.get("rowCheckbox")||o.get("rowOrderNum")){
				var temp=[];
				if(o.get("rowCheckbox")) temp[temp.length]={name:"",type:"checkbox",align:"center"};
				if(o.get("rowOrderNum")) temp[temp.length]={name:"序号",type:"rowOrderNum",align:"center"};
				
				$(o.get("columns")).each(function(i,v){
					if(i==o.get("columns").length-1&&o.get("rowSort")==true){
						temp[temp.length]={name:"排序",type:"rowSort",align:"center"};
					}
					temp[temp.length]=v;
				});
				o.set("columns",temp);
			}

			//auto width
			var columns=eTable.autoWidth(o.get("target"),o.get("columns"),o.get("autoWidth"),o.get("columnDrag"));
			
			o.set("columns",columns);
			
			//right menu
			if(o.get("rowSelect")==true) o.rightMenu();
			
			//table build
			o.tableBuild();
			
			//set cache data
			var container=o.get("target").find(".eTable-container");
			container.data("columns",columns);
			
			//temp
			if(o.get("autoWidth")==true) container.data("autoWidth",true);
			if(o.get("columnDrag")==true) container.data("columnDrag",true);
			
			//o.resetDataSize();

			//first request
			o.request(1,function(){
				o.get("complete")();
			},o.get("loading"));
					
			//defined init
			o.get("init")();
				
			//add event
			o.addEvent();
			
		}
	};
	eTable.setWidth=function(target,columns){
		var temp;
		$(columns).each(function(i,v){
			temp=target.find(".column"+i);
			temp.width(v.w);
			temp.find(".c").width(v.w);
		});
	};
	eTable.autoWidth=function(target,result,auto,columnDrag){
		var totalWidth=(target.width()||target.parent().width())-S.getScrollWidth(),
			totalWidthTemp=totalWidth,
			totalLen=0,
			percentWidth=0,
			widthUsed=0;
	
		if(auto==true){
			//get width
			$(result).each(function(i,v){
				
				//no width defined
				if(v.width==undefined){
					//default width
					if(v.type=="checkbox"){
						v["w"]="30px";
						totalWidth-=30;					
					}
					else if(v.type=="rowOrderNum"){
						v["w"]="50px";
						totalWidth-=50;
					}
					else if(v.type=="rowSort"){
						v["w"]="70px";
						totalWidth-=70;
					}
					else if(v.type=="button"){
						v["w"]="130px";
						totalWidth-=130;						
					}
					else 
						totalLen+=(v.name).length;
				}
				//width px defined
				else if((v.width).indexOf("px")>=0){					
					var width=parseInt(v.width.replace("px"));
					if(width>0){
						v["w"]=v.width;
						totalWidth-=width;						
					}
				}
			});
			
			//set width by %
			$(result).each(function(i,v){
				
				if(v.width&&v.width.indexOf("%")>=0){
					var width=Math.floor(totalWidth*(parseInt((v.width).replace("%",""))/100));
					v["w"]=width+"px";
					if(columnDrag==true) v["width"]=v["w"];
					percentWidth+=width;
				}
			});
			
			totalWidth-=percentWidth;
			widthUsed=(totalWidthTemp-totalWidth);
			
			
			//set width by name's length
			$(result).each(function(i,v){			
				//default width
				if(v.width===undefined&&v.type==undefined){
					var width=Math.floor(((v.name).length/totalLen)*totalWidth);
					v["w"]=width+"px";
					if(columnDrag==true) v["width"]=v["w"];
					widthUsed+=width;
				}				
				
				//lave width handle
				if(i==result.length-1&&totalWidthTemp-widthUsed>0){
					var width=parseInt((v.w).replace("px",""))+totalWidthTemp-widthUsed;
					v["w"]=width+"px";
				}
			});
		}
		else{
			$(result).each(function(i,v){
				v["w"]=v.width;
			});
		}
		return result;
	};
	eTable.resetListWidthByScroll=function(){
		var list = $(".eTable-list:visible"),
			scrollW = S.getScrollWidth();
		list.each(function(){
			var ul= $(this).find("table");
			
			//scroll show or hide
			if(ul.height()<=$(this).height()){
				var w=$(this).parent().find(".eTable-header .lastColumn").width();
				$(this).parent().find(".lastColumn").width(w+scrollW+"px");
			}
		});
	};
	
	//eTable resize
	eTable.resize=function(){
		eTable.resetListWidthByScroll();
		
		//auto width
		$(".eTable-container:visible").each(function(){
			if($(this).data("autoWidth")!=true) return;
			
			var columns=$(this).data("columns");
			
			if(columns==null||columns==undefined) return;
			
			columns=eTable.autoWidth($(this).parent(),columns,true,$(this).data("columnDrag"));
			
			eTable.setWidth($(this),columns);
			
			$(this).data("columns",columns);
			
			var temp=$(this).parent().data();
			if(temp.columnDragResize) temp.columnDragResize();
		});
		
		//eTable full
		var eH=$(window).height();
		
		$(".eTable-list:visible").each(function(){
			
			var list=$(this).parents(".eTable-container").parent().data();
			if(list.setting){
				if(list.setting.layoutHeightAuto!=false){
					
					//ePop
					if($(this).parents(".ePop-container").size()>0){
						
						//临时解决方案
						var eContainer=$(this).parents(".ePop-container"),
							myH=$(this).find("table").height(),
							oH=eContainer.find(".right-page-top").outerHeight(true)+eContainer.find(".eTable-header:visible").outerHeight(true)+eContainer.find(".eTable-footer:visible").outerHeight(true)+2;
                        var $eBody=eContainer.children('.ePop-pop').children(".ePop-body"),
                            $ePopPageBtn=$eBody.find('.ePop-page-btn'),
                            $ePopPageTop=$eBody.find('.ePop-page-top');
                        if($ePopPageBtn.size()>0){
                            var $environmentTopology=$eBody.find("#environment-topology"),
                                $methodDataSource=$eBody.find("#method-DataSource"),
                                $methodDetail=$eBody.find("#methodDetail"),
                                $itemResultNewTestItems=$eBody.find("#itemResult-NewTestItems"),
                                $equipment=$eBody.find("#equipment");
                            if($environmentTopology.size()>0){
                                eH=$environmentTopology.find('.data-list').outerHeight(true)-$eBody.find(".eTable-header:visible").outerHeight(true);
                            }
                            else if($methodDataSource.size()>0){
                                eH=$methodDataSource.find('.data-list').outerHeight(true)-$eBody.find(".eTable-header:visible").outerHeight(true);
                            }
                            else if($methodDetail.size()>0){
                                eH=$methodDetail.find('.data-list').outerHeight(true)-$eBody.find(".eTable-header:visible").outerHeight(true);
                            }
                            else if($equipment.size()>0){
                                eH=$equipment.find('.data-list').outerHeight(true)-$eBody.find(".eTable-header:visible").outerHeight(true);
                            }
                            else if($itemResultNewTestItems.size()>0&&$ePopPageTop.css('display')==="none"){
                                eH=$eBody.outerHeight(true)-$ePopPageBtn.outerHeight(true)-$eBody.find(".eTable-header:visible").outerHeight(true)-2;
                            }
                            else{
                                eH=$eBody.outerHeight(true)-$ePopPageBtn.outerHeight(true)-$eBody.find(".eTable-header:visible").outerHeight(true)-$ePopPageTop.outerHeight(true)-2;
                            }
                        }
                        else{
                            if($(window).height()<=(310+oH)) eH=eContainer.find(".ePop-body").height();
                            else eH=$(window).height()-oH-20;
                            if(myH!=0&&myH<eH) eH=310;
                            else eH=eH-oH;
                        }
					}
					//page
					else{
						var temp=$(this).parents("#J-right-container"),
							eTable=$(this).parents(".eTable-container");
                        var num=12;
                        if(temp.find('#appointment-4').size()>0||temp.find('#complain').size()>0){
                            num=22;
                        }
                        eH=temp.outerHeight(true)-temp.find("#Container-title").outerHeight(true)-temp.find(".right-page-top:visible").outerHeight(true)-eTable.find(".eTable-header:visible").outerHeight(true)-eTable.find(".eTable-footer:visible").outerHeight(true)-num;
						if($(this).parents("[tabetable=true]").size()>0) eH=eH-31;
					}
					$(this).height(eH+"px");
				}
			}
		});

		eTable.resetListWidthByScroll();
	};
	
	//jquery expand
	(function($){
		$.fn.eTable = function(options) {
			options.target=$(this);
			$(this).data(new eTable(options));
		};
		$.fn.getSelected=function(){
			var table=$(this).data();
			if(table&&typeof table=="object"){
				return table.getSelected();
			}
		};
        $.fn.getSelectedAllPage=function(){
			var table=$(this).data();
			if(table&&typeof table=="object"){
				return table.getSelectedAllPage();
			}
		};
		$.fn.getSelectedIds=function(){
			var table=$(this).data();
			if(table&&typeof table=="object"){
				return table.getSelectedIds();
			}
		};
		$.fn.getSelectedSize=function(){
			var table=$(this).data();
			if(table&&typeof table=="object"){
				return table.getSelectedSize();
			}
		};
		$.fn.update=function(query,callback){
			var table=$(this).data();
			if(table&&typeof table=="object"){
				table.update(query,true,true,callback);
			}
		};
		$.fn.clearTableSelected=function(query){
			var table=$(this).data();
			if(table&&typeof table=="object"){
				table.clearTableSelected();
			}
		};
	})(jQuery);
	
	//window
	window.eTable=eTable;
	
	//window resize
	$(window).unbind("resize.eTable").bind("resize.eTable",function(){
		eTable.resize();
	});
	
})(window);