var regs = {
	name: /^[^!@#$%^&*():;''"",./?+_=-\\`~|]{2,18}$/,	//判断用户名
	pwd: /^[^ ]{6,20}$/,								//判断密码
	phone: /^1[34578]\d{9}$/,							//判断手机号码
	realityname: /^([\u4e00-\u9fa5]|[a-zA-Z]){2,16}$/,		//判断真实姓名
	email: /^(\w)+(\.\w+)*@(\w)+((\.\w+)+)$/,			//判断邮箱
	section: /^\d{3,4}$/,									//判断区号
	dial: /^\d{7,8}$/										//判断直播号
}
var _if = true,
	ckd = true;

//必填项输入框获取焦点
$(".span-text").focus(function() {
	$(this).parent().next(".oninfo-hint").children('span').show();
	$(this).parent().next(".oninfo-hint").show();
	$(this).parent().next(".oninfo-hint").addClass('focus');
	$(this).parent().next(".oninfo-hint").removeClass('err ok');
	if ($(this).attr('name') == "username") {
		$(this).parent().next(".oninfo-hint").children('span').show().text("请输入你的用户名，2-18个字符，且不能输入特殊符号和空格");
	}
})

//必填项输入框失去焦点
$(".span-text").blur(function() {
	if($(this).attr("name") == "username"){		//判断用户名
		$.getJSON("../php/user.php", {username:$(this).val()},function(data){
			if (data.status === 1) {
				$(".username").parent().next(".oninfo-hint").children('span').show().text("用户名已被注册，请更换用户名！");
				$(".username").parent().next(".oninfo-hint").addClass('err');
				$(".username").parent().next(".oninfo-hint").removeClass('focus');
				return _if = true;
			}else{
				var b = ".username";
				regExps(regs.name, b);
				return _if = false;
			}
		})
	}else if($(this).attr("name") == "pwd"){	//判断密码
		var b = this;
		regExps(regs.pwd, b);
	} else if ($(this).attr("name") == "pwd2") {	//验证密码
		if($(this).val() === $(".pwd").val() && $(this).val() != ""){
			$(this).parent().next(".oninfo-hint").children('span').hide();
			$(this).parent().next(".oninfo-hint").addClass('ok');
			$(this).parent().next(".oninfo-hint").removeClass('focus');
		} else{
			$(this).parent().next(".oninfo-hint").addClass('err');
			$(this).parent().next(".oninfo-hint").removeClass('focus');
		}
	} else if($(this).attr("name") == "phone"){		//判断手机号码
		var b = this;
		regExps(regs.phone, b);
	}
})

//必填项验证函数
function regExps(a, b){
	if(a.test($(b).val())) {
		$(b).parent().next(".oninfo-hint").children('span').hide();
		$(b).parent().next(".oninfo-hint").addClass('ok');
		$(b).parent().next(".oninfo-hint").removeClass('focus');
	} else{
		$(b).parent().next(".oninfo-hint").addClass('err');
		$(b).parent().next(".oninfo-hint").removeClass('focus');
	}
}

//选填项输入框获取焦点
$(".elect").focus(function() {
	$(this).next(".oninfo-hint").children('span').show();
	$(this).next(".oninfo-hint").show();
	$(this).next(".oninfo-hint").addClass('focus');
	$(this).next(".oninfo-hint").removeClass('err ok');
})

//选填项输入框失去焦点
$(".elect").blur(function() {
	if ($(this).val() != "") {		//判断是否为空
		if ($(this).attr("name") == "realityname") {	//判断真实姓名
			var b = this;
			regElect(regs.realityname, b);
		}else if ($(this).attr("name") == "email") {	//判断邮箱
			var b = this;
			regElect(regs.email, b);
		}else if ($(this).attr("name") == "section") {	//判断电话区号
			if (regs.section.test($(this).val())) {
				$(this).next(".oninfo-hint").hide();
			} else{
				$(this).next(".oninfo-hint").addClass('err');
				$(this).next(".oninfo-hint").removeClass('focus');
			}
		} else if ($(this).attr("name") == "dial") {	//判断直播号
			var b = this;
			regElect(regs.dial, b);
		}
	} else{
		$(this).next(".oninfo-hint").hide();
	}
})

//选填项验证函数
function regElect(a, b){
	if(a.test($(b).val())) {
		$(b).next(".oninfo-hint").children('span').hide();
		$(b).next(".oninfo-hint").addClass('ok');
		$(b).next(".oninfo-hint").removeClass('focus');
	} else{
		$(b).next(".oninfo-hint").addClass('err');
		$(b).next(".oninfo-hint").removeClass('focus');
	}
}


//三级联动
var addresses = {};

/* 读取 address.json 中的所有省市区信息 */
$.ajax("../data/addresses.json").done(function(data){
	// console.log(data);
	var provinces = data.regions;
	provinces.forEach(function(province){
		addresses[province.name] = {}; // 保存省份下城市的对象
		var cities = province.regions || [];
		cities.forEach(function(city){
			addresses[province.name][city.name] = city.regions;
		});
	});
	initProvince();
});

// 设置省份的显示信息
function initProvince() {
	var html = "";
	html += "<option>-请选择-</option>";
	for (var attr in addresses) {
		html += "<option value='"+attr+"'>"+attr+"</option>";
	}
	$("#province").append(html);
}

// 设置选中省份下的城市显示信息
function initCity() {
	// 当前选中的省份
	var currProvince = $("#province").val();
	// 获取该省份的城市信息，并显示
	var cities = addresses[currProvince],
		html = "";
	html += "<option>-请选择-</option>";
	for (var attr in cities) {
		html += "<option value='"+ attr +"'>"+ attr +"</option>";
	}
	$("#city").empty().append(html);

	$("#city").show();

	$(".addr").val(currProvince)

	$("#province").nextAll(".oninfo-hint").show();
	$("#province").nextAll(".oninfo-hint").addClass('focus');
	$("#province").nextAll(".oninfo-hint").removeClass('err ok');

	$(".addr").nextAll(".oninfo-hint").show();
	$(".addr").nextAll(".oninfo-hint").addClass('focus');
	$(".addr").nextAll(".oninfo-hint").removeClass('err ok');
}

//设置选中省份与城市下的区县信息
function initDistrict() {
	// 当前选中的省份与城市
	var currProvince = $("#province").val(),
		currCity = $("#city").val(),
		html = "";

	// 显示该选中城市下的区县
	var districts = addresses[currProvince][currCity] || [];
	html += "<option>-请选择-</option>";
	districts.forEach(function(district){
		html += "<option value='"+ district.name +"'>"+ district.name +"</option>";
	});

	$("#district").empty().append(html);
	$("#district").show();
	$(".addr").val(currProvince + currCity)
}

$(function() {
	// 当省份选择改变时：
	$("#province").change(initCity);
	// 当城市选择改变时：
	$("#city").change(initDistrict);
	//当区域发生改变时
	$("#district").change(function() {
		var currProvince = $("#province").val(),
			currCity = $("#city").val(),
			currDis = $("#district").val();
		$(".addr").val(currProvince + currCity +currDis)
		$(".addr").attr("disabled",false)

		$("#province").nextAll(".oninfo-hint").addClass('ok');
		$("#province").nextAll(".oninfo-hint").removeClass('focus');
		$("#province").nextAll(".oninfo-hint").children('span').hide();
	});
	$(".addr").focus(function() {
		$(".addr").nextAll(".oninfo-hint").children('span').show().text('请输入完整的详细地址信息，两边不能有空符号');
		$(".addr").nextAll(".oninfo-hint").addClass('focus');
		$(".addr").nextAll(".oninfo-hint").removeClass('err ok');
	})
	$(".addr").blur(function() {
		var txt= $("#province").val() + $("#city").val() + $("#district").val();
		console.log(txt)
		if ($(".addr").val() == txt) {
			$(".addr").nextAll(".oninfo-hint").children('span').text('请进一步完善您的地址')
			$(".addr").nextAll(".oninfo-hint").addClass('err');
			$(".addr").nextAll(".oninfo-hint").removeClass('focus');
		} else{
			$(".addr").nextAll(".oninfo-hint").addClass('ok');
			$(".addr").nextAll(".oninfo-hint").removeClass('focus');
			$(".addr").nextAll(".oninfo-hint").children('span').hide();
		}
	});
})

//同意协议按钮
$(".ck-box").click(function() {
	if($(".ck").hasClass("ck-back") && ckd){
		$(".ck").removeClass("ck-back");
		return ckd = false;
	}else{
		$(".ck").addClass("ck-back");
		return ckd = true;
	}
})

//点击注册事件
$("#sub").click(function() {
	var btx =  $(this).parent().siblings().children('.name-span').children('.span-text');
	btx.each(function() {
		if ($(this).val() == '') {
			$(this).parent().next(".oninfo-hint").show();
			$(this).parent().next(".oninfo-hint").addClass('err');
			$(this).parent().next(".oninfo-hint").removeClass('focus');
		}
	});
	if (!ckd) {
		alert("请查看用户准则并同意")
	}
	if (
		regs.name.test($(".username").val()) &&
		regs.pwd.test($(".pwd").val()) &&
		$(".pwd").val() == $(".pwd2").val() &&
		regs.phone.test($(".phone").val()) && !_if && ckd

	) {
		$.post("../php/sign-in.php",{username:$(".username").val(), pwd:$(".pwd").val(), phone:$(".phone").val()},
			function(data) {
				console.log(data)
				console.log(data.status)
				if (data.status === 1) {
					$(".skip").show();
					$(".container-box").hide();
					var num = 3;
					var timer = setInterval(function() {
						num--;
						$(".skip").children('p').children('span').text(num);
						if (num <= 0) {
							clearInterval(timer);
							window.location = "log-in.html";
						}
					},1000)
				}
			},"json"
		)
	}
})