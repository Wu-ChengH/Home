seajs.config({
	"base": "./",
	"alias": { //简化模块名称 
		Base : "core/Base"
	},
	'paths': { //映射模块路径
		"js" : "src/js",
		"css" : "i18n/css",
		"img" : "i18n/img",
		"string" : "i18n/string",
		"public" : "src/public",
		"examples" : "src/webapps/examples", //示例代码
		"container" : "src/webapps/container", //主容器
		"individualPortrait" : "src/webapps/individualPortrait", //企业个体画像
		"groupPortrait" : "src/webapps/groupPortrait", //企业群体画像		
		"compInfluence" : "src/webapps/compInfluence", //企业影响力分析
		"compRelationship" : "src/webapps/compRelationship", //企业上下游分析
		"compBusinessAnalysis" : "src/webapps/compBusinessAnalysis" //企业商群分析
	},
	'charset': 'utf-8',
	'preload': [ // 在普通模块加载前加块此模块
		'core/public',
		'i18n/string/template.js',
		'lib/i18n.js',
		'js/Modes.js'
		//'lib/echarts3/echarts.js'
	]
});
var S = {
	debug : false,
	logstate : true,
	KEY4F : true // 是否启用F系列快捷键
} ; //全局容器
seajs.use('js/index');