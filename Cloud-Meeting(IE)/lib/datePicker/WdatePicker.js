/*
 * My97 DatePicker 4.8 Beta4
 * License: http://www.my97.net/dp/license.asp
 */
var $dp,WdatePicker;
(function(){var $={
$langList:[
 {name:"en",charset:"UTF-8"},
 {name:"zh-cn",charset:"gb2312"},
 {name:"zh-tw",charset:"GBK"}],
$skinList:[
 {name:"default",charset:"gb2312"},
 {name:"whyGreen",charset:"gb2312"},
 {name:"blue",charset:"gb2312"},
 {name:"green",charset:"gb2312"},
 {name:"simple",charset:"gb2312"},
 {name:"ext",charset:"gb2312"},
 {name:"blueFresh",charset:"gb2312"},
 {name:"twoer",charset:"gb2312"},
 {name:"YcloudRed",charset:"gb2312"}],
$wdate:true,
$crossFrame:true,
$preLoad:false,
$dpPath:"",
doubleCalendar:false,//是否是双月模式,如果该属性为true,则弹出同时显示2个月的日期框
enableKeyboard:true,//键盘控制开关
enableInputMask:true,//文本框输入启用掩码开关
autoUpdateOnChanged:null,
/*
在修改年月日时分秒等元素时,自动更新到el,默认是关闭的(即:需要点击确定或点击日期才更新)
为false时 不自动更新
为true时 自动更新
为null时(默认值) 如果有日元素且不隐藏确定按钮时 为false,其他情况为true
*/
weekMethod:"ISO8601",
/*
周算法不同的地方有一些差异
常见算法有两种
1. ISO8601:规定第一个星期四为第一周,默认值
2. MSExcel:1月1日所在的周
*/
position:{},//日期选择框显示位置
lang:"auto",//语言
skin:"twoer",//主题
dateFmt:"yyyy-MM-dd",//日期显示格式
realDateFmt:"yyyy-MM-dd",//计算机可识别的,真正的日期格式
realTimeFmt:"HH:mm:ss",//计算机可识别的,真正的日期格式
realFullFmt:"%Date %Time",//计算机可识别的,真正的日期格式
minDate:"1900-01-01 00:00:00",//最小日期(注意要与上面的real日期相匹配)
maxDate:"2099-12-31 23:59:59",//最大日期(注意要与上面的real日期相匹配)
startDate:"",
/*
起始日期,既点击日期框时显示的起始日期
为空时,使用今天作为起始日期(默认值)
否则使用传入的日期作为起始日期(注意要与上面的real日期相匹配)
*/
alwaysUseStartDate:false,
yearOffset:1911,
firstDayOfWeek:0,//周的第一天 0表示星期日 1表示星期一
isShowWeek:false,//是否显示周
highLineWeekDay:true,//是否高亮显示 周六 周日
isShowClear:true,//是否显示清空按钮
isShowToday:true,//是否显示今天按钮
isShowOK:true,//是否显示确认按钮
isShowOthers:true,//为true时,第一行空白处显示上月的日期，末行空白处显示下月的日期,否则不显示
readOnly:false,//是否只读
errDealMode:0,//纠错模式设置 可设置3中模式 0 - 提示 1 - 自动纠错 2 - 标记
autoPickDate:false,
/*
为false时 点日期的时候不自动输入,而是要通过确定才能输入
为true时 即点击日期即可返回日期值
为null时(推荐使用) 如果有时间置为false 否则置为true
*/
qsEnabled:false,//是否启用快速选择功能
autoShowQS:false,//是否默认显示快速选择
opposite:false,//默认为false, 为true时,无效日期变成有效日期
hmsMenuCfg: {
	H: [1, 6],
	m: [5, 6],
	s: [15, 4]
},
/*
使用hmsMenuCfg属性可以实现时分秒菜单的自定义
时分秒自定义 H m s 分别代表时分秒
第一个参数表示步进,1表示0,1,2,3... 2表示0,2,4... 15表示0,15,30...
第二个参数表示每行显示值的数量
默认H [1, 6] 步进1 每行显示6个 共4行
默认m [5, 6] 步进5 每行显示6个 共2行
默认s [15, 4] 步进15 每行显示4个 共1行
*/
specialDates:null,//特殊日期,对指定的日期进行高亮显示
specialDays:null,//特殊天,使用此功能禁用周日至周六所对应的日期进行高亮显示,0至6 分别代表 周日至周六
disabledDates:null,//可以使用此功能禁用所指定的一个或多个日期
disabledDays:null,//可以使用此功能禁用周日至周六所对应的日期,0至6 分别代表 周日至周六
onpicking:null,
onpicked:function(){this.blur()},
onclearing:null,
oncleared:null,
ychanging:null,
ychanged:null,
Mchanging:null,
Mchanged:null,
dchanging:null,
dchanged:null,
Hchanging:null,
Hchanged:null,
mchanging:null,
mchanged:null,
schanging:null,
schanged:null,
eCont:null,
vel:null,
elProp:"",
errMsg:"",
quickSel:[],//快速选择数据,可以传入5个快速选择日期 注意:日期格式必须与 realDateFmt realTimeFmt realFullFmt 相匹配
has:{},getRealLang:function(){var _=$.$langList;for(var A=0;A<_.length;A++)if(_[A].name==this.lang)return _[A];return _[0]}};WdatePicker=U;var Y=window,T={innerHTML:""},N="document",H="documentElement",C="getElementsByTagName",V,A,S,G,c,X=navigator.appName;if(X=="Microsoft Internet Explorer")S=true;else if(X=="Opera")c=true;else G=true;A=$.$dpPath||J();if($.$wdate)K(A+"skin/WdatePicker.css");V=Y;if($.$crossFrame){try{while(V.parent!=V&&V.parent[N][C]("frameset").length==0)V=V.parent}catch(O){}}if(!V.$dp)V.$dp={ff:G,ie:S,opera:c,status:0,defMinDate:$.minDate,defMaxDate:$.maxDate};B();if($.$preLoad&&$dp.status==0)E(Y,"onload",function(){U(null,true)});if(!Y[N].docMD){E(Y[N],"onmousedown",D,true);Y[N].docMD=true}if(!V[N].docMD){E(V[N],"onmousedown",D,true);V[N].docMD=true}E(Y,"onunload",function(){if($dp.dd)P($dp.dd,"none")});function B(){try{V[N],V.$dp=V.$dp||{}}catch($){V=Y;$dp=$dp||{}}var A={win:Y,$:function($){return(typeof $=="string")?Y[N].getElementById($):$},$D:function($,_){return this.$DV(this.$($).value,_)},$DV:function(_,$){if(_!=""){this.dt=$dp.cal.splitDate(_,$dp.cal.dateFmt);if($)for(var B in $)if(this.dt[B]===undefined)this.errMsg="invalid property:"+B;else{this.dt[B]+=$[B];if(B=="M"){var C=$["M"]>0?1:0,A=new Date(this.dt["y"],this.dt["M"],0).getDate();this.dt["d"]=Math.min(A+C,this.dt["d"])}}if(this.dt.refresh())return this.dt}return""},show:function(){var A=V[N].getElementsByTagName("div"),$=100000;for(var B=0;B<A.length;B++){var _=parseInt(A[B].style.zIndex);if(_>$)$=_}this.dd.style.zIndex=$+2;P(this.dd,"block");P(this.dd.firstChild,"")},unbind:function($){$=this.$($);if($.initcfg){L($,"onclick",function(){U($.initcfg)});L($,"onfocus",function(){U($.initcfg)})}},hide:function(){P(this.dd,"none")},attachEvent:E};for(var _ in A)V.$dp[_]=A[_];$dp=V.$dp}function E(B,_,A,$){if(B.addEventListener){var C=_.replace(/on/,"");A._ieEmuEventHandler=function($){return A($)};B.addEventListener(C,A._ieEmuEventHandler,$)}else B.attachEvent(_,A)}function L(A,$,_){if(A.removeEventListener){var B=$.replace(/on/,"");_._ieEmuEventHandler=function($){return _($)};A.removeEventListener(B,_._ieEmuEventHandler,false)}else A.detachEvent($,_)}function a(_,$,A){if(typeof _!=typeof $)return false;if(typeof _=="object"){if(!A)for(var B in _){if(typeof $[B]=="undefined")return false;if(!a(_[B],$[B],true))return false}return true}else if(typeof _=="function"&&typeof $=="function")return _.toString()==$.toString();else return _==$}function J(){var _,A,$=Y[N][C]("script");for(var B=0;B<$.length;B++){_=$[B].getAttribute("src")||"";_=_.substr(0,_.toLowerCase().indexOf("wdatepicker.js"));A=_.lastIndexOf("/");if(A>0)_=_.substring(0,A+1);if(_)break}return _}function K(A,$,B){var D=Y[N][C]("HEAD").item(0),_=Y[N].createElement("link");if(D){_.href=A;_.rel="stylesheet";_.type="text/css";if($)_.title=$;if(B)_.charset=B;D.appendChild(_)}}function F($){$=$||V;var A=0,_=0;while($!=V){var D=$.parent[N][C]("iframe");for(var F=0;F<D.length;F++){try{if(D[F].contentWindow==$){var E=W(D[F]);A+=E.left;_+=E.top;break}}catch(B){}}$=$.parent}return{"leftM":A,"topM":_}}function W(G,F){if(G.getBoundingClientRect)return G.getBoundingClientRect();else{var A={ROOT_TAG:/^body|html$/i,OP_SCROLL:/^(?:inline|table-row)$/i},E=false,I=null,_=G.offsetTop,H=G.offsetLeft,D=G.offsetWidth,B=G.offsetHeight,C=G.offsetParent;if(C!=G)while(C){H+=C.offsetLeft;_+=C.offsetTop;if(R(C,"position").toLowerCase()=="fixed")E=true;else if(C.tagName.toLowerCase()=="body")I=C.ownerDocument.defaultView;C=C.offsetParent}C=G.parentNode;while(C.tagName&&!A.ROOT_TAG.test(C.tagName)){if(C.scrollTop||C.scrollLeft)if(!A.OP_SCROLL.test(P(C)))if(!c||C.style.overflow!=="visible"){H-=C.scrollLeft;_-=C.scrollTop}C=C.parentNode}if(!E){var $=b(I);H-=$.left;_-=$.top}D+=H;B+=_;return{"left":H,"top":_,"right":D,"bottom":B}}}function M($){$=$||V;var B=$[N],A=($.innerWidth)?$.innerWidth:(B[H]&&B[H].clientWidth)?B[H].clientWidth:B.body.offsetWidth,_=($.innerHeight)?$.innerHeight:(B[H]&&B[H].clientHeight)?B[H].clientHeight:B.body.offsetHeight;return{"width":A,"height":_}}function b($){$=$||V;var B=$[N],A=B[H],_=B.body;B=(A&&A.scrollTop!=null&&(A.scrollTop>_.scrollTop||A.scrollLeft>_.scrollLeft))?A:_;return{"top":B.scrollTop,"left":B.scrollLeft}}function D($){try{var _=$?($.srcElement||$.target):null;if($dp.cal&&!$dp.eCont&&$dp.dd&&_!=$dp.el&&$dp.dd.style.display=="block")$dp.cal.close()}catch($){}}function Z(){$dp.status=2}var Q,_;function U(K,C){if(!$dp)return;B();var L={};for(var H in K)L[H]=K[H];for(H in $)if(H.substring(0,1)!="$"&&L[H]===undefined)L[H]=$[H];if(C){if(!J()){_=_||setInterval(function(){if(V[N].readyState=="complete")clearInterval(_);U(null,true)},50);return}if($dp.status==0){$dp.status=1;L.el=T;I(L,true)}else return}else if(L.eCont){L.eCont=$dp.$(L.eCont);L.el=T;L.autoPickDate=true;L.qsEnabled=false;I(L)}else{if($.$preLoad&&$dp.status!=2)return;var F=D();if(Y.event===F||F){L.srcEl=F.srcElement||F.target;F.cancelBubble=true}L.el=L.el=$dp.$(L.el||L.srcEl);if(!L.el||L.el["My97Mark"]===true||L.el.disabled||($dp.dd&&P($dp.dd)!="none"&&$dp.dd.style.left!="-970px")){try{if(L.el["My97Mark"])L.el["My97Mark"]=false}catch(A){}return}if(F&&L.el.nodeType==1&&!a(L.el.initcfg,K)){$dp.unbind(L.el);E(L.el,F.type=="focus"?"onclick":"onfocus",function(){U(K)});L.el.initcfg=K}I(L)}function J(){if(S&&V!=Y&&V[N].readyState!="complete")return false;return true}function D(){if(G){func=D.caller;while(func!=null){var $=func.arguments[0];if($&&($+"").indexOf("Event")>=0)return $;func=func.caller}return null}return event}}function R(_,$){return _.currentStyle?_.currentStyle[$]:document.defaultView.getComputedStyle(_,false)[$]}function P(_,$){if(_)if($!=null)_.style.display=$;else return R(_,"display")}function I(G,_){var D=G.el?G.el.nodeName:"INPUT";if(_||G.eCont||new RegExp(/input|textarea|div|span|p|a/ig).test(D))G.elProp=D=="INPUT"?"value":"innerHTML";else return;if(G.lang=="auto")G.lang=S?navigator.browserLanguage.toLowerCase():navigator.language.toLowerCase();if(!G.eCont)for(var C in G)$dp[C]=G[C];if(!$dp.dd||G.eCont||($dp.dd&&(G.getRealLang().name!=$dp.dd.lang||G.skin!=$dp.dd.skin))){if(G.eCont)E(G.eCont,G);else{$dp.dd=V[N].createElement("DIV");$dp.dd.style.cssText="position:absolute";V[N].body.appendChild($dp.dd);E($dp.dd,G);if(_)$dp.dd.style.left=$dp.dd.style.top="-970px";else{$dp.show();B($dp)}}}else if($dp.cal){$dp.show();$dp.cal.init();if(!$dp.eCont)B($dp)}function E(K,J){var I=V[N].domain,F=false,G="<iframe hideFocus=true width=9 height=7 frameborder=0 border=0 scrolling=no src=\"about:blank\"></iframe>";K.innerHTML=G;var _=$.$langList,D=$.$skinList,H;try{H=K.lastChild.contentWindow[N]}catch(E){F=true;K.removeChild(K.lastChild);var L=V[N].createElement("iframe");L.hideFocus=true;L.frameBorder=0;L.scrolling="no";L.src="javascript:(function(){var d=document;d.open();d.domain='"+I+"';})()";K.appendChild(L);setTimeout(function(){H=K.lastChild.contentWindow[N];C()},97);return}C();function C(){var _=J.getRealLang();K.lang=_.name;K.skin=J.skin;var $=["<head><script>","","var doc=document, $d, $dp, $cfg=doc.cfg, $pdp = parent.$dp, $dt, $tdt, $sdt, $lastInput, $IE=$pdp.ie, $FF = $pdp.ff,$OPERA=$pdp.opera, $ny, $cMark = false;","if($cfg.eCont){$dp = {};for(var p in $pdp)$dp[p]=$pdp[p];}else{$dp=$pdp;};for(var p in $cfg){$dp[p]=$cfg[p];}","doc.oncontextmenu=function(){try{$c._fillQS(!$dp.has.d,1);showB($d.qsDivSel);}catch(e){};return false;};","</script><script src=",A,"lang/",_.name,".js charset=",_.charset,"></script>"];if(F)$[1]="document.domain=\""+I+"\";";for(var C=0;C<D.length;C++)if(D[C].name==J.skin)$.push("<link rel=\"stylesheet\" type=\"text/css\" href=\""+A+"skin/"+D[C].name+"/datepicker.css\" charset=\""+D[C].charset+"\"/>");$.push("<script src=\""+A+"calendar.js\"></script>");$.push("</head><body leftmargin=\"0\" topmargin=\"0\" tabindex=0></body></html>");$.push("<script>var t;t=t||setInterval(function(){if(doc.ready){new My97DP();$cfg.onload();$c.autoSize();$cfg.setPos($dp);clearInterval(t);}},20);</script>");J.setPos=B;J.onload=Z;H.write("<html>");H.cfg=J;H.write($.join(""));H.close()}}function B(J){var H=J.position.left,C=J.position.top,D=J.el;if(D==T)return;if(D!=J.srcEl&&(P(D)=="none"||D.type=="hidden"))D=J.srcEl;var I=W(D),$=F(Y),E=M(V),B=b(V),G=$dp.dd.offsetHeight,A=$dp.dd.offsetWidth;if(isNaN(C))C=0;if(($.topM+I.bottom+G>E.height)&&($.topM+I.top-G>0))C+=B.top+$.topM+I.top-G-2;else{C+=B.top+$.topM+I.bottom;var _=C-B.top+G-E.height;if(_>0)C-=_}if(isNaN(H))H=0;H+=B.left+Math.min($.leftM+I.left,E.width-A-5)-(S?2:0);J.dd.style.top=C+"px";J.dd.style.left=(H-5)+"px"}}})()