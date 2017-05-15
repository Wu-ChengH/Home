(function(win,undefined)
{
	/*
	* option {Object} 
	*/
	var setting ={
		type : 'normal' // 组件类型 label
		,valid : [] // 验证
		,msg : '' // 提示消息 	
		,value : '' // 默认值
		,width : 200 // 宽度
		,height : 30 // 高度
		,disable : false
	}
	,validReg = function(reg){
		return function(){
			return reg.test(this.value);
		}
	}
	,msgFmt = function(msg,data){
		for(var attr in data){
			msg = msg.replace(new RegExp('\{'+attr+'\}'),function(m){
	          return data[attr];
	        });
		}
		return msg;
	}
	,defaultrule ={
		maxlength : {
			rule : function(){
				return this.value.length > Infinity;
			}
			,msg : '输入最大字数不能超过{maxlength}个长度,当前长度{length}'
		}
		,minlength :{
			rule :  function(){
				return this.value.length < 0
			}
			,msg : '输入字数最小不能少于{minlength},当前长度{length}'
		}
		,number : {
			rule : validReg(/^\d*$/)
			,msg : '请输入非零整数'
		}
		,required : {
			rule : function(obj){
				return !!this.value.length && this.value != '' && this.value != obj.get('msg');
			}
			,msg : '此字段为必填项。'
		}
		,email : {
			rule : validReg(/^[\w-]+(\.[\w-]+)*@[\w-]+(\.[\w-]+)+$/)
			,msg : '请输入有效的电子邮箱地址。'
		}
		,telphone : {
			rule : validReg(/^(13|15|18)\d{9}$/)
			,msg : '请输入有效的手机号码。'
		}
		,idcard : {
			rule : validReg(/(^\d{15}$)|(^\d{18}$)|(^\d{17}(\d|X|x)$)/)
			,msg : '请输入有效的身份证号码。'
		}
	}
	,isObject = function(obj){
		return '[object Object]' === Object.prototype.toString.call(obj);
	}
	,isFunction = function(obj){
		return typeof obj === 'function';
	}
	,isRegExp = function(obj){
		return  '[object RegExp]' === Object.prototype.toString.call(obj);
	}
	,isString = function(obj){
		return 'string' === typeof obj;
	};
	function Event(doc,name,callback){
		if(doc.attachEvent){
			doc.attachEvent('on'+name,callback);
		}else{
			doc.addEventListener(name,callback,true);
		}
		return callback;
	}
	function unEvent(doc,name,callback){
		if(doc.detachEvent)
		{
			doc.detachEvent('on'+name,callback);
		}else{
			doc.removeEventListener(name,callback);
		}
	}
	var Input = function(option){
		this.ele = option.ele; // 容器
		if(!this.ele) {
			throw 'Input widget must need a container [Element]';
		}
		this.option = option;
		this.div = document.createElement('div');
		this.input = document.createElement('input');
		this.div.appendChild(this.input);
		this.ele.appendChild(this.div);
		this.div.classList.add('input-normal');
		if(this.get('type') === 'label'){
			this.input.value = this.get('value');
			this.div.classList.add('input-label');
			this.input.setAttribute('readonly',true);
			return this;	
		}
		this.input.value = this.get('value') || this.get('msg');
		if(this.get('value')){
			this.div.classList.add('input-complate');
		}
		if(this.get('disable')){
			this.disable(true);
		}else{
			this._Event();
		}
	}
	Input.prototype._Event = function(){
		var that = this;
		this.__focus =  Event(this.input,'focus',function(){
			if(that.get('disable')) return;
			that.div.classList.add('input-active');
			if(that.get('msg') === this.value){
				this.value = '';
			}
		});
		this.__blur = Event(this.input,'blur',function(){
			if(that.get('disable')) return;
			if('' === this.value){
				this.value = that.get('msg');
				that.div.setAttribute('errormsg','')
				that.div.classList.remove('input-complate');
			}else if(this.value != that.get('msg')){
				that.div.classList.add('input-complate');
				if(that.valid()){
					that.div.classList.remove('input-error');
					that.div.classList.add('input-success');
				}else{
					that.div.classList.remove('input-success');
					that.div.classList.add('input-error');
				}
			}else{
			}
			that.div.classList.remove('input-active');
		});
	}
	Input.prototype.disable = function(disable){
		this.set('disable',disable);	
		if(disable){
			this.div.classList.remove('input-success');
			this.div.classList.remove('input-error');
			this.div.classList.add('input-disable');
			this.input.setAttribute('readonly','true');
		}else{
			this.div.classList.remove('input-disable');
			this.input.removeAttribute('readonly');
			this._Event();
		}

	}
	Input.prototype.valid = function(){
		if(this.get('type') === 'label' || this.get('disable')) return true;
		var that = this;
		that.div.setAttribute('errormsg','')
		var valid = this.get('valid').every(function(v){
			var _valid = true,_msg = '';
			if(isString(v)){
				if(defaultrule[v])
				{
					_valid = defaultrule[v].rule.call(that.input,that);
					_msg = defaultrule[v].msg;
				}
			}
			if(_valid && isObject(v)){
				for(var attr in v){
					if(attr === 'maxlength'){
						 _valid = that.input.value.length <= v['maxlength'];
						 _msg = msgFmt(defaultrule[attr].msg,{
						 	maxlength : v['maxlength']
						 	,length : that.input.value.length
						 });

					}else if(attr === 'minlength'){
						_valid = that.input.value.length >= v['minlength'];
						_msg = msgFmt(defaultrule[attr].msg,{
						 	minlength : v['minlength']
						 	,length : that.input.value.length
						});
					}else{
						var _rule = v[attr].rule;
						if(isRegExp(_rule)){
							_rule = validReg(_rule);
						}
						_valid = _rule.call(that.input,that);
						_msg = v[attr].msg;
					}
					if(!_valid) break;
				}
			}
			if(!_valid){
				that.div.setAttribute('errormsg',_msg);
			}
			return _valid;
		});
		return valid;
	}
	Input.prototype.get = function(attr){
		var  res = this.option[attr];
		if(res === undefined)
		{
			res = setting[attr] ;
		}
		return res;
	}
	Input.prototype.set = function(attr,val){
		this.option[attr] = val;
	}
	Input.prototype.val = function(val){
		if(val != undefined){
			this.input.value = val;
		}
		return this.input.value;
	}
	Input.prototype.destroy = function(){
		this.div = null;
		this.input = null;
	}
	win.Input = Input;
})(this);