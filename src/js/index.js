define(function(require){
	require("lib/jquery-1.11.1.min.js");
	require("lib/jquery-UI/jquery-ui-1.10.4.css");
	require("lib/jquery-UI/jquery-ui-1.10.4.js");
	require("src/public/fontAwesome/css/font-awesome.min.css");
	require("src/public/zDialog/zDialog.css");
	require("src/public/zDialog/zDialog.js");
	require("lib/jquery.qrcode.min.js");
	require("lib/scrollBars/jquery.mousewheel.min.js");
	require("lib/scrollBars/jquery.mCustomScrollbar.min.css");
	require("lib/scrollBars/jquery.mCustomScrollbar.js");
	require("lib/bootstrap-3.3.5/js/bootstrap.min.js");
	require("lib/jquery-form.js");
	require("lib/datePicker/WdatePicker.js");
	require("lib/echarts.min.js");
	require("lib/transfer/Transfer.js");
	require("js/extend.js");
	require("lib/tips/main/javascript/jquery.toastmessage.js");
	require("lib/tips/main/resources/css/jquery.toastmessage.css");

	new (require('Base').extend({
		onInit : function(option){
			var self = this;
				self.initPage();
				S.basicData = {};
				self.getUserInfo();
		},
        loadhandle : function(name,handle){

		},
        handleEvent:function(event){
        	return 1;
		},
        //此处需要获取当前登录的用户信息，保存为一个全局的信息，供后续业务使用
        getUserInfo : function(){
			/*seft_versionUrl = "http://219.151.45.11:8089";*/
			seft_serverUrl = 'http://loxfteam.320.io/metric'
        },
        //跳转登录
		initPage : function(){
			this.loadpage({
				url:"login.html"
			});
		}
	}))();
});