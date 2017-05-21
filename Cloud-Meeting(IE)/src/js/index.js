define(function(require){
	require("lib/bootstrap-3.3.5/js/bootstrap.min.js");
	require("src/public/fontAwesome/css/font-awesome.min.css");
	require("src/public/zDialog/zDialog.css");
	require("src/public/zDialog/zDialog.js");
	require("lib/scrollBars/jquery.mCustomScrollbar.min.css");
	require("lib/scrollBars/jquery.mousewheel.min.js");
	require("lib/scrollBars/jquery.mCustomScrollbar.min.js");
	require("lib/datePicker/WdatePicker.js");
	require("js/extend.js");
	require("src/webapps/details/charts/echarts.min.js");
	require("src/webapps/font/demo.css");
	require("src/webapps/font/iconfont.css");
	require("src/webapps/font2/demo.css");
	require("src/webapps/font2/iconfont.css");
	require("src/style/index.css");
	require("src/webapps/details/details.css");
	new (require('Base').extend({
		onInit : function(option){
			var self = this;
				self.initPage();
				S.basicData = {};
		},
        loadhandle : function(name,handle){
			
		},
        handleEvent:function(event){
        	return 1;
		},
        //此处需要获取当前登录的用户信息，保存为一个全局的信息，供后续业务使用
        getUserInfo : function(){
			
        },

        //获取菜单
		initPage : function(){
			var self = this;
			self.loadpage({
				url:"container.html"
			});
		}
	}))();
});