seajs.config({
	"base": "./",
	"alias": { //简化模块名称 
		Base : "core/Base"
	},
	'paths': { //映射模块路径
		"js" : "src/js",
		"css" : "i18n/css",
		"imgs" : "src/images",
		"string" : "i18n/string",
		"public" : "src/public",
	},
	'charset': 'utf-8',
	'preload': [ // 在普通模块加载前加块此模块
		'core/public',
		'lib/i18n.js',
		'lib/underscore-min.js'
	]
});
var S = {
	debug : false,
	logstate : true,
	KEY4F : true // 是否启用F系列快捷键
} ; //全局容器
seajs.use('js/index');