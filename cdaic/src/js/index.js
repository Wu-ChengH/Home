define(function(require){
	require("js/extend.js");
	require("lib/bootstrap-3.3.5/js/bootstrap.min.js");
	require("src/public/zDialog/zDialog.css");
	require("src/public/zDialog/zDialog.js");
	require("lib/echarts3/echarts.js");
	require("lib/scrollBars/jquery.mCustomScrollbar.min.js");
	require("lib/scrollBars/jquery.mCustomScrollbar.min.css");
	new (require('Base').extend({
		onInit : function(option){
			this.getMenuData();
		},
        loadhandle : function(name,handle){
			
		},
        handleEvent:function(event){
        	return 1;
		},
        //此处需要获取当前登录的用户信息，保存为一个全局的信息，供后续业务使用
        getUserInfo : function(){
			
        },
		getMenuData : function(){
			var self = this;
			S.request({
				url:"src/demoData/menu.json",
				success:function(data){
					if(data&&data.menu){
						S.sysMenu = data.menu;
						self.loadpage({
							url:"container.html",
							callback:function(){

							}
						});
					}
				}
			})
		}
	}))();
});