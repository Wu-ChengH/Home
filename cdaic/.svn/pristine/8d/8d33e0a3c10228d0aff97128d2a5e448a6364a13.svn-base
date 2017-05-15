(function(win,undefined)
{
	var setting = {
		width : 120
		,height : 50
		,Change : function(){}
	};
	var isArray = function(obj){
		return Object.prototype.toString.call(obj) === '[object Array]';
	}
	var isString = function(obj){
		return typeof obj === 'string';
	}
	var bind = function(ele,name,callback){
		if(! (name || callback) ) return;
		if(window.attachEvent){
			ele.attachEvent('on' + name,callback);
		}else{
			ele.addEventListener(name,callback);
		}
	}
	/*
	data :[{
		name : ''
		,ele :
	},{
		name : ''
		,ele : 
	},'']
		
	*/
	var Tab = function(option){
		if(option.ele){
			this.ele = option.ele;
		}else if(option.id){
			this.ele = document.getElementById(option.id);
		}else{
			throw 'Container can not be empty.';
			return; 
		}
		this.index = -1;

		this.title = document.createElement('div');
		this.content = document.createElement('div');

		this.ele.classList.add('tab');
		this.title.classList.add('tab-title');
		this.content.classList.add('tab-content');

		this.ele.appendChild(this.title);
		this.ele.appendChild(this.content);
		this.data = [];
		if(option.data){
			this.render(option.data);
		}
	}
	Tab.prototype.css = function(attr,val){
		if(val != undefined) this.ele.style[attr] = val;
		return this.ele.style[attr];
	}
	Tab.prototype.render = function(data){
		this.data = isArray(data) ? data : [data];
		var ul = document.createElement('ul') , sli = [] , that = this;
		this.data = this.data.map(function(item ,  index){
			if(isString(item)){
				item = {
					name : item
					,ele : document.createElement('div')
				}
				item.ele.innerHTML = item.name;
				that.content.appendChild(item.ele);
			}else{
				item.ele.parentNode.removeChild(item.ele);
				that.content.appendChild(item.ele);
			}
			item.ele.style.display = 'none';
			sli.push('<li data-index="'+index+'">' + item.name + '</li>');
			return item;
		});
		ul.innerHTML = sli.join('');
		this.title.appendChild(ul);
		this.lis  = ul.getElementsByTagName('li');
		bind(ul,'click',function(e){
			if(e.target.tagName === 'LI'){
				that.goto(e.target.dataset.index);
			}
		});
		this.goto(0);
		ul = null;
	}
	Tab.prototype.goto = function(index){
		if(this.index === index) return;
		if(this.index > -1){
			this.data[this.index].ele.style.display = 'none';
			this.lis[this.index].removeAttribute('focus');
		}
		this.data[index].ele.style.display = 'block';
		this.lis[index].setAttribute('focus','');
		this.index = index;
	}
	Tab.prototype.destroy = function()
	{
		this.ele = null;
		this.title = null;
		this.content = null;
		var item;
		while((item = this.data.pop()) ){
			item.ele = null;
			item = null;
		};
	}
	win.Tab = Tab;
})(this);