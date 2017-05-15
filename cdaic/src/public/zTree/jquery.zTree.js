
(function ($) {
	$.easyui = {
		indexOfArray: function (a, o, id) {
			for (var i = 0, _1 = a.length; i < _1; i++) {
				if (id == undefined) {
					if (a[i] == o) {
						return i;
					}
				} else {
					if (a[i][o] == id) {
						return i;
					}
				}
			}
			return -1;
		},
		removeArrayItem: function (a, o, id) {
			if (typeof o == "string") {
				for (var i = 0, _2 = a.length; i < _2; i++) {
					if (a[i][o] == id) {
						a.splice(i, 1);
						return;
					}
				}
			} else {
				var _3 = this.indexOfArray(a, o);
				if (_3 != -1) {
					a.splice(_3, 1);
				}
			}
		},
		addArrayItem: function (a, o, r) {
			var _4 = this.indexOfArray(a, o, r ? r[o] : undefined);
			if (_4 == -1) {
				a.push(r ? r : o);
			} else {
				a[_4] = r ? r : o;
			}
		},
		getArrayItem: function (a, o, id) {
			var _5 = this.indexOfArray(a, o, id);
			return _5 == -1 ? null : a[_5];
		},
		forEach: function (_6, _7, _8) {
			var _9 = [];
			for (var i = 0; i < _6.length; i++) {
				_9.push(_6[i]);
			}
			while (_9.length) {
				var _a = _9.shift();
				if (_8(_a) == false) {
					return;
				}
				if (_7 && _a.children) {
					for (var i = _a.children.length - 1; i >= 0; i--) {
						_9.unshift(_a.children[i]);
					}
				}
			}
		}
	};
	$.parser = {
		auto: true,
		onComplete: function (_b) {},
		plugins: ["tree"],
		parse: function (_c) {
			var aa = [];
			for (var i = 0; i < $.parser.plugins.length; i++) {
				var _d = $.parser.plugins[i];
				var r = $(".easyui-" + _d, _c);
				if (r.length) {
					if (r[_d]) {
						r.each(function () {
							$(this)[_d]($.data(this, "options") || {});
						});
					} else {
						aa.push({
							name: _d,
							jq: r
						});
					}
				}
			}
			if (aa.length && window.easyloader) {
				var _e = [];
				for (var i = 0; i < aa.length; i++) {
					_e.push(aa[i].name);
				}
				easyloader.load(_e, function () {
					for (var i = 0; i < aa.length; i++) {
						var _f = aa[i].name;
						var jq = aa[i].jq;
						jq.each(function () {
							$(this)[_f]($.data(this, "options") || {});
						});
					}
					$.parser.onComplete.call($.parser, _c);
				});
			} else {
				$.parser.onComplete.call($.parser, _c);
			}
		},
		parseValue: function (_10, _11, _12, _13) {
			_13 = _13 || 0;
			var v = $.trim(String(_11 || ""));
			var _14 = v.substr(v.length - 1, 1);
			if (_14 == "%") {
				v = parseInt(v.substr(0, v.length - 1));
				if (_10.toLowerCase().indexOf("width") >= 0) {
					v = Math.floor((_12.width() - _13) * v / 100);
				} else {
					v = Math.floor((_12.height() - _13) * v / 100);
				}
			} else {
				v = parseInt(v) || undefined;
			}
			return v;
		},
		parseOptions: function (_15, _16) {
			var t = $(_15);
			var _17 = {};
			var s = $.trim(t.attr("data-options"));
			if (s) {
				if (s.substring(0, 1) != "{") {
					s = "{" + s + "}";
				}
				_17 = (new Function("return " + s))();
			}
			$.map(["width", "height", "left", "top", "minWidth", "maxWidth", "minHeight", "maxHeight"], function (p) {
				var pv = $.trim(_15.style[p] || "");
				if (pv) {
					if (pv.indexOf("%") == -1) {
						pv = parseInt(pv);
						if (isNaN(pv)) {
							pv = undefined;
						}
					}
					_17[p] = pv;
				}
			});
			if (_16) {
				var _18 = {};
				for (var i = 0; i < _16.length; i++) {
					var pp = _16[i];
					if (typeof pp == "string") {
						_18[pp] = t.attr(pp);
					} else {
						for (var _19 in pp) {
							var _1a = pp[_19];
							if (_1a == "boolean") {
								_18[_19] = t.attr(_19) ? (t.attr(_19) == "true") : undefined;
							} else {
								if (_1a == "number") {
									_18[_19] = t.attr(_19) == "0" ? 0 : parseFloat(t.attr(_19)) || undefined;
								}
							}
						}
					}
				}
				$.extend(_17, _18);
			}
			return _17;
		}
	};
	
	function _1(_2) {
		var _3 = $(_2);
		_3.addClass("zTree");
		return _3;
	};

	function _4(_5) {
		var _6 = $.data(_5, "tree").options;
		$(_5).unbind().bind("mouseover", function (e) {
			var tt = $(e.target);
			var _7 = tt.closest("div.zTree-node");
			if (!_7.length) {
				return;
			}
			_7.addClass("zTree-node-hover");
			if (tt.hasClass("zTree-hit")) {
				if (tt.hasClass("zTree-expanded")) {
					tt.addClass("zTree-expanded-hover");
				} else {
					tt.addClass("zTree-collapsed-hover");
				}
			}
			e.stopPropagation();
		}).bind("mouseout", function (e) {
			var tt = $(e.target);
			var _8 = tt.closest("div.zTree-node");
			if (!_8.length) {
				return;
			}
			_8.removeClass("zTree-node-hover");
			if (tt.hasClass("zTree-hit")) {
				if (tt.hasClass("zTree-expanded")) {
					tt.removeClass("zTree-expanded-hover");
				} else {
					tt.removeClass("zTree-collapsed-hover");
				}
			}
			e.stopPropagation();
		}).bind("click", function (e) {
			var tt = $(e.target);
			var _9 = tt.closest("div.zTree-node");
			if (!_9.length) {
				return;
			}
			if (tt.hasClass("zTree-hit")) {
				_toggle(_5, _9[0]);
				return false;
			} else {
				if (tt.hasClass("zTree-checkbox")) {
					_check(_5, _9[0]);
					return false;
				} else {
					_select(_5, _9[0]);
					_6.onClick.call(_5, _getNode(_5, _9[0]));
				}
			}
			e.stopPropagation();
		}).bind("dblclick", function (e) {
			var _a = $(e.target).closest("div.zTree-node");
			if (!_a.length) {
				return;
			}
			_select(_5, _a[0]);
			_6.onDblClick.call(_5, _getNode(_5, _a[0]));
			e.stopPropagation();
		}).bind("contextmenu", function (e) {
			var _b = $(e.target).closest("div.zTree-node");
			if (!_b.length) {
				return;
			}
			_6.onContextMenu.call(_5, e, _getNode(_5, _b[0]));
			e.stopPropagation();
		});
	};

	function _disableDnd(_e) {
		var _f = $.data(_e, "tree").options;
		_f.dnd = false;
		var _10 = $(_e).find("div.zTree-node");
		_10.draggable("disable");
		_10.css("cursor", "pointer");
	};

	function _enableDnd(_12) {
		var _13 = $.data(_12, "tree");
		var _14 = _13.options;
		var _15 = _13.tree;
		_13.disabledNodes = [];
		_14.dnd = true;
		_15.find("div.zTree-node").draggable({
			disabled: false,
			revert: true,
			cursor: "pointer",
			proxy: function (_16) {
				var p = $("<div class=\"zTree-node-proxy\"></div>").appendTo("body");
				p.html("<span class=\"zTree-dnd-icon zTree-dnd-no\">&nbsp;</span>" + $(_16).find(".zTree-title").html());
				p.hide();
				return p;
			},
			deltaX: 15,
			deltaY: 15,
			onBeforeDrag: function (e) {
				if (_14.onBeforeDrag.call(_12, _getNode(_12, this)) == false) {
					return false;
				}
				if ($(e.target).hasClass("zTree-hit") || $(e.target).hasClass("zTree-checkbox")) {
					return false;
				}
				if (e.which != 1) {
					return false;
				}
				var _17 = $(this).find("span.zTree-indent");
				if (_17.length) {
					e.data.offsetWidth -= _17.length * _17.width();
				}
			},
			onStartDrag: function (e) {
				$(this).next("ul").find("div.zTree-node").each(function () {
					$(this).droppable("disable");
					_13.disabledNodes.push(this);
				});
				$(this).draggable("proxy").css({
					left: -10000,
					top: -10000
				});
				_14.onStartDrag.call(_12, _getNode(_12, this));
				var _18 = _getNode(_12, this);
				if (_18.id == undefined) {
					_18.id = "easyui_tree_node_id_temp";
					_update(_12, _18);
				}
				_13.draggingNodeId = _18.id;
			},
			onDrag: function (e) {
				var x1 = e.pageX,
					y1 = e.pageY,
					x2 = e.data.startX,
					y2 = e.data.startY;
				var d = Math.sqrt((x1 - x2) * (x1 - x2) + (y1 - y2) * (y1 - y2));
				if (d > 3) {
					$(this).draggable("proxy").show();
				}
				this.pageY = e.pageY;
			},
			onStopDrag: function () {
				for (var i = 0; i < _13.disabledNodes.length; i++) {
					$(_13.disabledNodes[i]).droppable("enable");
				}
				_13.disabledNodes = [];
				var _19 = _find(_12, _13.draggingNodeId);
				if (_19 && _19.id == "easyui_tree_node_id_temp") {
					_19.id = "";
					_update(_12, _19);
				}
				_14.onStopDrag.call(_12, _19);
			}
		}).droppable({
			accept: "div.tree-node",
			onDragEnter: function (e, _1a) {
				if (_14.onDragEnter.call(_12, this, _1b(_1a)) == false) {
					_1c(_1a, false);
					$(this).removeClass("zTree-node-append zTree-node-top zTree-node-bottom");
					$(this).droppable("disable");
					_13.disabledNodes.push(this);
				}
			},
			onDragOver: function (e, _1d) {
				if ($(this).droppable("options").disabled) {
					return;
				}
				var _1e = _1d.pageY;
				var top = $(this).offset().top;
				var _1f = top + $(this).outerHeight();
				_1c(_1d, true);
				$(this).removeClass("zTree-node-append zTree-node-top zTree-node-bottom");
				if (_1e > top + (_1f - top) / 2) {
					if (_1f - _1e < 5) {
						$(this).addClass("zTree-node-bottom");
					} else {
						$(this).addClass("zTree-node-append");
					}
				} else {
					if (_1e - top < 5) {
						$(this).addClass("zTree-node-top");
					} else {
						$(this).addClass("zTree-node-append");
					}
				}
				if (_14.onDragOver.call(_12, this, _1b(_1d)) == false) {
					_1c(_1d, false);
					$(this).removeClass("zTree-node-append zTree-node-top zTree-node-bottom");
					$(this).droppable("disable");
					_13.disabledNodes.push(this);
				}
			},
			onDragLeave: function (e, _20) {
				_1c(_20, false);
				$(this).removeClass("zTree-node-append zTree-node-top zTree-node-bottom");
				_14.onDragLeave.call(_12, this, _1b(_20));
			},
			onDrop: function (e, _21) {
				var _22 = this;
				var _23, _24;
				if ($(this).hasClass("zTree-node-append")) {
					_23 = _25;
					_24 = "append";
				} else {
					_23 = _26;
					_24 = $(this).hasClass("zTree-node-top") ? "top" : "bottom";
				}
				if (_14.onBeforeDrop.call(_12, _22, _1b(_21), _24) == false) {
					$(this).removeClass("zTree-node-append zTree-node-top zTree-node-bottom");
					return;
				}
				_23(_21, _22, _24);
				$(this).removeClass("zTree-node-append zTree-node-top zTree-node-bottom");
			}
		});

		function _1b(_27, pop) {
			return $(_27).closest("ul.zTree").tree(pop ? "pop" : "getData", _27);
		};

		function _1c(_28, _29) {
			var _2a = $(_28).draggable("proxy").find("span.zTree-dnd-icon");
			_2a.removeClass("zTree-dnd-yes zTree-dnd-no").addClass(_29 ? "zTree-dnd-yes" : "zTree-dnd-no");
		};

		function _25(_2b, _2c) {
			if (_getNode(_12, _2c).state == "closed") {
				_expand(_12, _2c, function () {
					_2d();
				});
			} else {
				_2d();
			}

			function _2d() {
				var _2e = _1b(_2b, true);
				$(_12).tree("append", {
					parent: _2c,
					data: [_2e]
				});
				_14.onDrop.call(_12, _2c, _2e, "append");
			};
		};

		function _26(_2f, _30, _31) {
			var _32 = {};
			if (_31 == "top") {
				_32.before = _30;
			} else {
				_32.after = _30;
			}
			var _33 = _1b(_2f, true);
			_32.data = _33;
			$(_12).tree("insert", _32);
			_14.onDrop.call(_12, _30, _33, _31);
		};
	};

	function _check(_35, _36, _37, _38) {
		var _39 = $.data(_35, "tree");
		var _3a = _39.options;
		if (!_3a.checkbox) {
			return;
		}
		var _3b = _getNode(_35, _36);
		if (!_3b.checkState) {
			return;
		}
		var ck = $(_36).find(".zTree-checkbox");
		if (_37 == undefined) {
			if (ck.hasClass("zTree-checkbox1")) {
				_37 = false;
			} else {
				if (ck.hasClass("zTree-checkbox0")) {
					_37 = true;
				} else {
					if (_3b._checked == undefined) {
						_3b._checked = $(_36).find(".zTree-checkbox").hasClass("zTree-checkbox1");
					}
					_37 = !_3b._checked;
				}
			}
		}
		_3b._checked = _37;
		if (_37) {
			if (ck.hasClass("zTree-checkbox1")) {
				return;
			}
		} else {
			if (ck.hasClass("zTree-checkbox0")) {
				return;
			}
		}
		if (!_38) {
			if (_3a.onBeforeCheck.call(_35, _3b, _37) == false) {
				return;
			}
		}
		if (_3a.cascadeCheck) {
			_3c(_35, _3b, _37);
			_3d(_35, _3b);
		} else {
			_3e(_35, _3b, _37 ? "1" : "0");
		}
		if (!_38) {
			_3a.onCheck.call(_35, _3b, _37);
		}
	};

	function _3c(_3f, _40, _41) {
		var _42 = $.data(_3f, "tree").options;
		var _43 = _41 ? 1 : 0;
		_3e(_3f, _40, _43);
		if (_42.deepCheck) {
			$.easyui.forEach(_40.children || [], true, function (n) {
				_3e(_3f, n, _43);
			});
		} else {
			var _44 = [];
			if (_40.children && _40.children.length) {
				_44.push(_40);
			}
			$.easyui.forEach(_40.children || [], true, function (n) {
				if (!n.hidden) {
					_3e(_3f, n, _43);
					if (n.children && n.children.length) {
						_44.push(n);
					}
				}
			});
			for (var i = _44.length - 1; i >= 0; i--) {
				var _45 = _44[i];
				_3e(_3f, _45, _46(_45));
			}
		}
	};

	function _3e(_47, _48, _49) {
		var _4a = $.data(_47, "tree").options;
		if (!_48.checkState || _49 == undefined) {
			return;
		}
		if (_48.hidden && !_4a.deepCheck) {
			return;
		}
		var ck = $("#" + _48.domId).find(".zTree-checkbox");
		_48.checkState = ["unchecked", "checked", "indeterminate"][_49];
		_48.checked = (_48.checkState == "checked");
		ck.removeClass("zTree-checkbox0 zTree-checkbox1 zTree-checkbox2");
		ck.addClass("zTree-checkbox" + _49);
	};

	function _3d(_4b, _4c) {
		var pd = _getParent(_4b, $("#" + _4c.domId)[0]);
		if (pd) {
			_3e(_4b, pd, _46(pd));
			_3d(_4b, pd);
		}
	};

	function _46(row) {
		var c0 = 0;
		var c1 = 0;
		var len = 0;
		$.easyui.forEach(row.children || [], false, function (r) {
			if (r.checkState) {
				len++;
				if (r.checkState == "checked") {
					c1++;
				} else {
					if (r.checkState == "unchecked") {
						c0++;
					}
				}
			}
		});
		if (len == 0) {
			return undefined;
		}
		var _4e = 0;
		if (c0 == len) {
			_4e = 0;
		} else {
			if (c1 == len) {
				_4e = 1;
			} else {
				_4e = 2;
			}
		}
		return _4e;
	};

	function _4f(_50, _51) {
		var _52 = $.data(_50, "tree").options;
		if (!_52.checkbox) {
			return;
		}
		var _53 = $(_51);
		var ck = _53.find(".zTree-checkbox");
		var _54 = _getNode(_50, _51);
		if (_52.view.hasCheckbox(_50, _54)) {
			if (!ck.length) {
				_54.checkState = _54.checkState || "unchecked";
				$("<span class=\"zTree-checkbox\"></span>").insertBefore(_53.find(".zTree-title"));
			}
			if (_54.checkState == "checked") {
				_check(_50, _51, true, true);
			} else {
				if (_54.checkState == "unchecked") {
					_check(_50, _51, false, true);
				} else {
					var _55 = _46(_54);
					if (_55 === 0) {
						_check(_50, _51, false, true);
					} else {
						if (_55 === 1) {
							_check(_50, _51, true, true);
						}
					}
				}
			}
		} else {
			ck.remove();
			_54.checkState = undefined;
			_54.checked = undefined;
			_3d(_50, _54);
		}
	};

	function _loadData(_57, ul, _58, _59, _5a) {
		var _5b = $.data(_57, "tree");
		var _5c = _5b.options;
		var _5d = $(ul).prevAll("div.zTree-node:first");
		_58 = _5c.loadFilter.call(_57, _58, _5d[0]);
		var _5e = _5f(_57, "domId", _5d.attr("id"));
		if (!_59) {
			_5e ? _5e.children = _58 : _5b.data = _58;
			$(ul).empty();
		} else {
			if (_5e) {
				_5e.children ? _5e.children = _5e.children.concat(_58) : _5e.children = _58;
			} else {
				_5b.data = _5b.data.concat(_58);
			}
		}
		_5c.view.render.call(_5c.view, _57, ul, _58);
		if (_5c.dnd) {
			_enableDnd(_57);
		}
		if (_5e) {
			_update(_57, _5e);
		}
		for (var i = 0; i < _5b.tmpIds.length; i++) {
			_check(_57, $("#" + _5b.tmpIds[i])[0], true, true);
		}
		_5b.tmpIds = [];
		setTimeout(function () {
			_61(_57, _57);
		}, 0);
		if (!_5a) {
			_5c.onLoadSuccess.call(_57, _5e, _58);
		}
	};

	function _61(_62, ul, _63) {
		var _64 = $.data(_62, "tree").options;
		if (_64.lines) {
			$(_62).addClass("zTree-lines");
		} else {
			$(_62).removeClass("zTree-lines");
			return;
		}
		if(_64.icons){
			$(_62).addClass("zTree-noIcon");
		}
		if (!_63) {
			_63 = true;
			$(_62).find("span.zTree-indent").removeClass("zTree-line zTree-join zTree-joinbottom");
			$(_62).find("div.zTree-node").removeClass("zTree-node-last zTree-root-first zTree-root-one");
			var _65 = $(_62).tree("getRoots");
			if (_65.length > 1) {
				$(_65[0].target).addClass("zTree-root-first");
			} else {
				if (_65.length == 1) {
					$(_65[0].target).addClass("zTree-root-one");
				}
			}
		}
		$(ul).children("li").each(function () {
			var _66 = $(this).children("div.zTree-node");
			var ul = _66.next("ul");
			if (ul.length) {
				if ($(this).next().length) {
					_67(_66);
				}
				_61(_62, ul, _63);
			} else {
				_68(_66);
			}
		});
		var _69 = $(ul).children("li:last").children("div.zTree-node").addClass("zTree-node-last");
		_69.children("span.zTree-join").removeClass("zTree-join").addClass("zTree-joinbottom");

		function _68(_6a, _6b) {
			//var _6c = _6a.find("span.zTree-icon");
			var _6c = _6a.find("span.zTree-indent:last");
			//_6c.next("span.zTree-indent").addClass("zTree-join");
			_6c.addClass("zTree-join");
		};

		function _67(_6d) {
			var _6e = _6d.find("span.zTree-indent, span.zTree-hit").length;
			_6d.next().find("div.zTree-node").each(function () {
				$(this).children("span:eq(" + (_6e - 1) + ")").addClass("zTree-line");
			});
		};
	};

	function _6f(_70, ul, _71, _72) {
		var _73 = $.data(_70, "tree").options;
		_71 = $.extend({}, _73.queryParams, _71 || {});
		var _74 = null;
		if (_70 != ul) {
			var _75 = $(ul).prev();
			_74 = _getNode(_70, _75[0]);
		}
		if (_73.onBeforeLoad.call(_70, _74, _71) == false) {
			return;
		}
		var _76 = $(ul).prev().children("span.zTree-folder");
		_76.addClass("zTree-loading");
		var _77 = _73.loader.call(_70, _71, function (_78) {
			_76.removeClass("zTree-loading");
			_loadData(_70, ul, _78);
			if (_72) {
				_72();
			}
		}, function () {
			_76.removeClass("zTree-loading");
			_73.onLoadError.apply(_70, arguments);
			if (_72) {
				_72();
			}
		});
		if (_77 == false) {
			_76.removeClass("zTree-loading");
		}
	};

	function _expand(_7a, _7b, _7c) {
		var _7d = $.data(_7a, "tree").options;
		var hit = $(_7b).children("span.zTree-hit");
		if (hit.length == 0) {
			return;
		}
		if (hit.hasClass("zTree-expanded")) {
			return;
		}
		var _7e = _getNode(_7a, _7b);
		if (_7d.onBeforeExpand.call(_7a, _7e) == false) {
			return;
		}
		hit.removeClass("zTree-collapsed zTree-collapsed-hover").addClass("zTree-expanded");
		hit.next().addClass("zTree-folder-open");
		var ul = $(_7b).next();
		if (ul.length) {
			if (_7d.animate) {
				ul.slideDown("normal", function () {
					_7e.state = "open";
					_7d.onExpand.call(_7a, _7e);
					if (_7c) {
						_7c();
					}
				});
			} else {
				ul.css("display", "block");
				_7e.state = "open";
				_7d.onExpand.call(_7a, _7e);
				if (_7c) {
					_7c();
				}
			}
		} else {
			var _7f = $("<ul style=\"display:none\"></ul>").insertAfter(_7b);
			_6f(_7a, _7f[0], {
				id: _7e.id
			}, function () {
				if (_7f.is(":empty")) {
					_7f.remove();
				}
				if (_7d.animate) {
					_7f.slideDown("normal", function () {
						_7e.state = "open";
						_7d.onExpand.call(_7a, _7e);
						if (_7c) {
							_7c();
						}
					});
				} else {
					_7f.css("display", "block");
					_7e.state = "open";
					_7d.onExpand.call(_7a, _7e);
					if (_7c) {
						_7c();
					}
				}
			});
		}
	};

	function _collapse(_81, _82) {
		var _83 = $.data(_81, "tree").options;
		var hit = $(_82).children("span.zTree-hit");
		if (hit.length == 0) {
			return;
		}
		if (hit.hasClass("zTree-collapsed")) {
			return;
		}
		var _84 = _getNode(_81, _82);
		if (_83.onBeforeCollapse.call(_81, _84) == false) {
			return;
		}
		hit.removeClass("zTree-expanded zTree-expanded-hover").addClass("zTree-collapsed");
		hit.next().removeClass("zTree-folder-open");
		var ul = $(_82).next();
		if (_83.animate) {
			ul.slideUp("normal", function () {
				_84.state = "closed";
				_83.onCollapse.call(_81, _84);
			});
		} else {
			ul.css("display", "none");
			_84.state = "closed";
			_83.onCollapse.call(_81, _84);
		}
	};

	function _toggle(_86, _87) {
		var hit = $(_87).children("span.zTree-hit");
		if (hit.length == 0) {
			return;
		}
		if (hit.hasClass("zTree-expanded")) {
			_collapse(_86, _87);
		} else {
			_expand(_86, _87);
		}
	};

	function _expandAll(_89, _8a) {
		var _8b = _getChildren(_89, _8a);
		if (_8a) {
			_8b.unshift(_getNode(_89, _8a));
		}
		for (var i = 0; i < _8b.length; i++) {
			_expand(_89, _8b[i].target);
		}
	};

	function _expandTo(_8e, _8f) {
		var _90 = [];
		var p = _getParent(_8e, _8f);
		while (p) {
			_90.unshift(p);
			p = _getParent(_8e, p.target);
		}
		for (var i = 0; i < _90.length; i++) {
			_expand(_8e, _90[i].target);
		}
	};

	function _scrollTo(_92, _93) {
		var c = $(_92).parent();
		while (c[0].tagName != "BODY" && c.css("overflow-y") != "auto") {
			c = c.parent();
		}
		var n = $(_93);
		var _94 = n.offset().top;
		if (c[0].tagName != "BODY") {
			var _95 = c.offset().top;
			if (_94 < _95) {
				c.scrollTop(c.scrollTop() + _94 - _95);
			} else {
				if (_94 + n.outerHeight() > _95 + c.outerHeight() - 18) {
					c.scrollTop(c.scrollTop() + _94 + n.outerHeight() - _95 - c.outerHeight() + 18);
				}
			}
		} else {
			c.scrollTop(_94);
		}
	};

	function _collapseAll(_97, _98) {
		var _99 = _getChildren(_97, _98);
		if (_98) {
			_99.unshift(_getNode(_97, _98));
		}
		for (var i = 0; i < _99.length; i++) {
			_collapse(_97, _99[i].target);
		}
	};

	function _append(_9b, _9c) {
		var _9d = $(_9c.parent);
		var _9e = _9c.data;
		if (!_9e) {
			return;
		}
		_9e = $.isArray(_9e) ? _9e : [_9e];
		if (!_9e.length) {
			return;
		}
		var ul;
		if (_9d.length == 0) {
			ul = $(_9b);
		} else {
			if (_isLeaf(_9b, _9d[0])) {
				var _a0 = _9d.find("span.zTree-icon");
				_a0.removeClass("zTree-file").addClass("zTree-folder zTree-folder-open");
				var hit = $("<span class=\"zTree-hit zTree-expanded\"></span>").insertBefore(_a0);
				if (hit.prev().length) {
					hit.prev().remove();
				}
			}
			ul = _9d.next();
			if (!ul.length) {
				ul = $("<ul></ul>").insertAfter(_9d);
			}
		}
		_loadData(_9b, ul[0], _9e, true, true);
	};

	function _insert(_a2, _a3) {
		var ref = _a3.before || _a3.after;
		var _a4 = _getParent(_a2, ref);
		var _a5 = _a3.data;
		if (!_a5) {
			return;
		}
		_a5 = $.isArray(_a5) ? _a5 : [_a5];
		if (!_a5.length) {
			return;
		}
		_append(_a2, {
			parent: (_a4 ? _a4.target : null),
			data: _a5
		});
		var _a6 = _a4 ? _a4.children : $(_a2).tree("getRoots");
		for (var i = 0; i < _a6.length; i++) {
			if (_a6[i].domId == $(ref).attr("id")) {
				for (var j = _a5.length - 1; j >= 0; j--) {
					_a6.splice((_a3.before ? i : (i + 1)), 0, _a5[j]);
				}
				_a6.splice(_a6.length - _a5.length, _a5.length);
				break;
			}
		}
		var li = $();
		for (var i = 0; i < _a5.length; i++) {
			li = li.add($("#" + _a5[i].domId).parent());
		}
		if (_a3.before) {
			li.insertBefore($(ref).parent());
		} else {
			li.insertAfter($(ref).parent());
		}
	};

	function _remove(_a8, _a9) {
		var _aa = del(_a9);
		$(_a9).parent().remove();
		if (_aa) {
			if (!_aa.children || !_aa.children.length) {
				var _ab = $(_aa.target);
				_ab.find(".zTree-icon").removeClass("zTree-folder").addClass("zTree-file");
				_ab.find(".zTree-hit").remove();
				$("<span class=\"zTree-indent\"></span>").prependTo(_ab);
				_ab.next().remove();
			}
			_update(_a8, _aa);
		}
		_61(_a8, _a8);

		function del(_ac) {
			var id = $(_ac).attr("id");
			var _ad = _getParent(_a8, _ac);
			var cc = _ad ? _ad.children : $.data(_a8, "tree").data;
			for (var i = 0; i < cc.length; i++) {
				if (cc[i].domId == id) {
					cc.splice(i, 1);
					break;
				}
			}
			return _ad;
		};
	};

	function _update(_ae, _af) {
		var _b0 = $.data(_ae, "tree").options;
		var _b1 = $(_af.target);
		var _b2 = _getNode(_ae, _af.target);
		if (_b2.iconCls) {
			_b1.find(".zTree-icon").removeClass(_b2.iconCls);
		}
		$.extend(_b2, _af);
		_b1.find(".zTree-title").html(_b0.formatter.call(_ae, _b2));
		if (_b2.iconCls) {
			_b1.find(".zTree-icon").addClass(_b2.iconCls);
		}
		_4f(_ae, _af.target);
	};

	function _getRoot(_b4, _b5) {
		if (_b5) {
			var p = _getParent(_b4, _b5);
			while (p) {
				_b5 = p.target;
				p = _getParent(_b4, _b5);
			}
			return _getNode(_b4, _b5);
		} else {
			var _b6 = _getRoots(_b4);
			return _b6.length ? _b6[0] : null;
		}
	};

	function _getRoots(_b8) {
		var _b9 = $.data(_b8, "tree").data;
		for (var i = 0; i < _b9.length; i++) {
			_ba(_b9[i]);
		}
		return _b9;
	};

	function _getChildren(_bb, _bc) {
		var _bd = [];
		var n = _getNode(_bb, _bc);
		var _be = n ? (n.children || []) : $.data(_bb, "tree").data;
		$.easyui.forEach(_be, true, function (_bf) {
			_bd.push(_ba(_bf));
		});
		return _bd;
	};

	function _getParent(_c0, _c1) {
		var p = $(_c1).closest("ul").prevAll("div.zTree-node:first");
		return _getNode(_c0, p[0]);
	};

	function _getChecked(_c3, _c4) {
		_c4 = _c4 || "checked";
		if (!$.isArray(_c4)) {
			_c4 = [_c4];
		}
		var _c5 = [];
		$.easyui.forEach($.data(_c3, "tree").data, true, function (n) {
			if (n.checkState && $.easyui.indexOfArray(_c4, n.checkState) != -1) {
				_c5.push(_ba(n));
			}
		});
		return _c5;
	};

	function _getSelected(_c7) {
		var _c8 = $(_c7).find("div.zTree-node-selected");
		return _c8.length ? _getNode(_c7, _c8[0]) : null;
	};

	function _getData(_ca, _cb) {
		var _cc = _getNode(_ca, _cb);
		if (_cc && _cc.children) {
			$.easyui.forEach(_cc.children, true, function (_cd) {
				_ba(_cd);
			});
		}
		return _cc;
	};

	function _getNode(_ce, _cf) {
		return _5f(_ce, "domId", $(_cf).attr("id"));
	};

	function _find(_d1, id) {
		return _5f(_d1, "id", id);
	};

	function _5f(_d2, _d3, _d4) {
		var _d5 = $.data(_d2, "tree").data;
		var _d6 = null;
		$.easyui.forEach(_d5, true, function (_d7) {
			if (_d7[_d3] == _d4) {
				_d6 = _ba(_d7);
				return false;
			}
		});
		return _d6;
	};

	function _ba(_d8) {
		_d8.target = $("#" + _d8.domId)[0];
		return _d8;
	};

	function _select(_da, _db) {
		var _dc = $.data(_da, "tree").options;
		var _dd = _getNode(_da, _db);
		if (_dc.onBeforeSelect.call(_da, _dd) == false) {
			return;
		}
		$(_da).find("div.zTree-node-selected").removeClass("zTree-node-selected");
		$(_db).addClass("zTree-node-selected");
		_dc.onSelect.call(_da, _dd);
	};

	function _isLeaf(_de, _df) {
		return $(_df).children("span.zTree-hit").length == 0;
	};

	function _beginEdit(_e1, _e2) {
		var _e3 = $.data(_e1, "tree").options;
		var _e4 = _getNode(_e1, _e2);
		if (_e3.onBeforeEdit.call(_e1, _e4) == false) {
			return;
		}
		$(_e2).css("position", "relative");
		var nt = $(_e2).find(".zTree-title");
		var _e5 = nt.outerWidth();
		nt.empty();
		var _e6 = $("<input class=\"zTree-editor\">").appendTo(nt);
		_e6.val(_e4.text).focus();
		_e6.width(_e5 + 20);
		_e6._outerHeight(18);
		_e6.bind("click", function (e) {
			return false;
		}).bind("mousedown", function (e) {
			e.stopPropagation();
		}).bind("mousemove", function (e) {
			e.stopPropagation();
		}).bind("keydown", function (e) {
			if (e.keyCode == 13) {
				_endEdit(_e1, _e2);
				return false;
			} else {
				if (e.keyCode == 27) {
					_cancelEdit(_e1, _e2);
					return false;
				}
			}
		}).bind("blur", function (e) {
			e.stopPropagation();
			_endEdit(_e1, _e2);
		});
	};

	function _endEdit(_e8, _e9) {
		var _ea = $.data(_e8, "tree").options;
		$(_e9).css("position", "");
		var _eb = $(_e9).find("input.zTree-editor");
		var val = _eb.val();
		_eb.remove();
		var _ec = _getNode(_e8, _e9);
		_ec.text = val;
		_update(_e8, _ec);
		_ea.onAfterEdit.call(_e8, _ec);
	};

	function _cancelEdit(_ee, _ef) {
		var _f0 = $.data(_ee, "tree").options;
		$(_ef).css("position", "");
		$(_ef).find("input.zTree-editor").remove();
		var _f1 = _getNode(_ee, _ef);
		_update(_ee, _f1);
		_f0.onCancelEdit.call(_ee, _f1);
	};

	function _doFilter(_f3, q) {
		var _f4 = $.data(_f3, "tree");
		var _f5 = _f4.options;
		var ids = {};
		$.easyui.forEach(_f4.data, true, function (_f6) {
			if (_f5.filter.call(_f3, q, _f6)) {
				$("#" + _f6.domId).removeClass("zTree-node-hidden");
				ids[_f6.domId] = 1;
				_f6.hidden = false;
			} else {
				$("#" + _f6.domId).addClass("zTree-node-hidden");
				_f6.hidden = true;
			}
		});
		for (var id in ids) {
			_f7(id);
		}

		function _f7(_f8) {
			var p = $(_f3).tree("getParent", $("#" + _f8)[0]);
			while (p) {
				$(p.target).removeClass("zTree-node-hidden");
				p.hidden = false;
				p = $(_f3).tree("getParent", p.target);
			}
		};
	};
	$.fn.tree = function (option, _fa) {
		if (typeof option == "string") {
			return $.fn.tree.methods[option](this, _fa);
		}
		var option = option || {};
		return this.each(function () {
			var treeData = $.data(this, "tree");
			var _fc;
			if (treeData) {
				_fc = $.extend(treeData.options, option);
				treeData.options = _fc;
			} else {
				_fc = $.extend({}, $.fn.tree.defaults, $.fn.tree.parseOptions(this), option);
				$.data(this, "tree", {
					options: _fc,
					tree: _1(this),
					data: [],
					tmpIds: []
				});
				var _fd = $.fn.tree.parseData(this);
				if (_fd.length) {
					_loadData(this, this, _fd);
				}
			}
			_4(this);
			if (_fc.data) {
				_loadData(this, this, $.extend(true, [], _fc.data));
			}
			_6f(this, this);
		});
	};
	$.fn.tree.methods = {
		//返回树的选项（options）
		options: function (jq) {
			return $.data(jq[0], "tree").options;
		},
		//加载树的数据
		loadData: function (jq, _fe) {
			return jq.each(function () {
				_loadData(this, this, _fe);
			});
		},
		//获取指定的节点对象
		getNode: function (jq, _ff) {
			return _getNode(jq[0], _ff);
		},
		//获取指定的节点数据，包括它的子节点
		getData: function (jq, _100) {
			return _getData(jq[0], _100);
		},
		//重新加载树的数据
		reload: function (jq, _101) {
			return jq.each(function () {
				if (_101) {
					var node = $(_101);
					var hit = node.children("span.zTree-hit");
					hit.removeClass("zTree-expanded zTree-expanded-hover").addClass("zTree-collapsed");
					node.next().remove();
					_expand(this, _101);
				} else {
					$(this).empty();
					_6f(this, this);
				}
			});
		},
		//获取根节点，返回节点对象
		getRoot: function (jq, _102) {
			return _getRoot(jq[0], _102);
		},
		//获取根节点，返回节点数组
		getRoots: function (jq) {
			return _getRoots(jq[0]);
		},
		//获取父节点
		getParent: function (jq, _103) {
			return _getParent(jq[0], _103);
		},
		//获取子节点
		getChildren: function (jq, _104) {
			return _getChildren(jq[0], _104);
		},
		//获取选中的节点。状态可用值有：'checked'、'unchecked'、'indeterminate'。如果状态未分配，则返回 'checked' 节点
		getChecked: function (jq, _105) {
			return _getChecked(jq[0], _105);
		},
		//获取选中的节点并返回它，如果没有选中节点，则返回 null
		getSelected: function (jq) {
			return _getSelected(jq[0]);
		},
		//把指定的节点定义成叶节点
		isLeaf: function (jq, _106) {
			return _isLeaf(jq[0], _106);
		},
		//找到指定的节点并返回该节点对象
		find: function (jq, id) {
			return _find(jq[0], id);
		},
		//选中一个节点
		select: function (jq, _107) {
			return jq.each(function () {
				_select(this, _107);
			});
		},
		//把指定节点设置为勾选
		check: function (jq, _108) {
			return jq.each(function () {
				_check(this, _108, true);
			});
		},
		//把指定节点设置为未勾选
		uncheck: function (jq, _109) {
			return jq.each(function () {
				_check(this, _109, false);
			});
		},
		//折叠一个节点
		collapse: function (jq, _10a) {
			return jq.each(function () {
				_collapse(this, _10a);
			});
		},
		//展开一个节点，当节点关闭且没有子节点时，节点的 id 值（名为 'id' 参数）将被发送至服务器以请求子节点数据。
		expand: function (jq, _10b) {
			return jq.each(function () {
				_expand(this, _10b);
			});
		},
		//折叠所有的节点
		collapseAll: function (jq, _10c) {
			return jq.each(function () {
				_collapseAll(this, _10c);
			});
		},
		//展开所有的节点
		expandAll: function (jq, _10d) {
			return jq.each(function () {
				_expandAll(this, _10d);
			});
		},
		//从根部展开一个指定的节点
		expandTo: function (jq, _10e) {
			return jq.each(function () {
				_expandTo(this, _10e);
			});
		},
		//滚动到指定节点
		scrollTo: function (jq, _10f) {
			return jq.each(function () {
				_scrollTo(this, _10f);
			});
		},
		//切换节点的展开/折叠状态
		toggle: function (jq, _110) {
			return jq.each(function () {
				_toggle(this, _110);
			});
		},
		/*
		追加一些子节点到一个父节点，param 参数有两个属性：
		parent：DOM 对象，要追加到的父节点，如果没有分配，则追加为根节点。
		data：数组，节点的数据。
		*/
		append: function (jq, data) {
			return jq.each(function () {
				_append(this, data);
			});
		},
		/*
		在指定节点的前边或后边插入一个节点，param 参数包括下列属性：
		before/after：DOM 对象，前边或后边插入的节点。
		data：对象，节点数据。
		*/
		insert: function (jq, data) {
			return jq.each(function () {
				_insert(this, data);
			});
		},
		//移除一个节点和它的子节点
		remove: function (jq, _113) {
			return jq.each(function () {
				_remove(this, _113);
			});
		},
		//弹出一个节点和它的子节点，该方法和 remove 一样，但是返回了移除的节点数据
		pop: function (jq, _114) {
			var node = jq.tree("getData", _114);
			jq.tree("remove", _114);
			return node;
		},
		/*
		更新指定的节点，'param' 参数有下列属性：
		target（DOM 对象，要被更新的节点）、id、text、iconCls、checked，等等。
		*/
		update: function (jq, _115) {
			return jq.each(function () {
				_update(this, $.extend({}, _115, {
					checkState: _115.checked ? "checked" : (_115.checked === false ? "unchecked" : undefined)
				}));
			});
		},
		//启用拖放功能
		enableDnd: function (jq) {
			return jq.each(function () {
				_enableDnd(this);
			});
		},
		//禁用拖放功能
		disableDnd: function (jq) {
			return jq.each(function () {
				_disableDnd(this);
			});
		},
		//开始编辑节点
		beginEdit: function (jq, _116) {
			return jq.each(function () {
				_beginEdit(this, _116);
			});
		},
		//结束编辑节点
		endEdit: function (jq, _117) {
			return jq.each(function () {
				_endEdit(this, _117);
			});
		},
		//取消编辑节点
		cancelEdit: function (jq, _118) {
			return jq.each(function () {
				_cancelEdit(this, _118);
			});
		},
		//执行过滤
		doFilter: function (jq, q) {
			return jq.each(function () {
				_doFilter(this, q);
			});
		}
	};
	$.fn.tree.parseOptions = function (_119) {
		var t = $(_119);
		return $.extend({}, $.parser.parseOptions(_119, ["url", "method", {
			checkbox: "boolean",
			cascadeCheck: "boolean",
			onlyLeafCheck: "boolean"
		}, {
			animate: "boolean",
			lines: "boolean",
			dnd: "boolean"
		}]));
	};
	$.fn.tree.parseData = function (_11a) {
		var data = [];
		_11b(data, $(_11a));
		return data;

		function _11b(aa, tree) {
			tree.children("li").each(function () {
				var node = $(this);
				var item = $.extend({}, $.parser.parseOptions(this, ["id", "iconCls", "state"]), {
					checked: (node.attr("checked") ? true : undefined)
				});
				item.text = node.children("span").html();
				if (!item.text) {
					item.text = node.html();
				}
				var _11c = node.children("ul");
				if (_11c.length) {
					item.children = [];
					_11b(item.children, _11c);
				}
				aa.push(item);
			});
		};
	};
	var _11d = 1;
	var _view = {
		render: function (_11f, ul, data) {
			var _120 = $.data(_11f, "tree");
			var opts = _120.options;
			var _121 = $(ul).prev(".zTree-node");
			var _122 = _121.length ? $(_11f).tree("getNode", _121[0]) : null;
			var _123 = _121.find("span.zTree-indent, span.zTree-hit").length;
			var cc = _124.call(this, _123, data);
			$(ul).append(cc.join(""));
			function _124(_125, _126) {
				var cc = [];
				for (var i = 0; i < _126.length; i++) {
					var item = _126[i];
					if (item.state != "open" && item.state != "closed") {
						item.state = "open";
					}
					item.domId = "_easyui_tree_" + _11d++;
					cc.push("<li>");
					cc.push("<div id=\"" + item.domId + "\" myId=\""+item.id+"\" class=\"zTree-node\">");
					for (var j = 0; j < _125; j++) {
						cc.push("<span class=\"zTree-indent\"></span>");
					}
					if (item.state == "closed") {
						cc.push("<span class=\"zTree-hit zTree-collapsed\"></span>");
						cc.push("<span class=\"zTree-icon zTree-folder " + (item.iconCls ? item.iconCls : "") + "\"></span>");
					} else {
						if (item.children && item.children.length) {
							cc.push("<span class=\"zTree-hit zTree-expanded\"></span>");
							cc.push("<span class=\"zTree-icon zTree-folder zTree-folder-open " + (item.iconCls ? item.iconCls : "") + "\"></span>");
						} else {
							cc.push("<span class=\"zTree-indent\"></span>");
							cc.push("<span class=\"zTree-icon zTree-file " + (item.iconCls ? item.iconCls : "") + "\"></span>");
						}
					}
					if (this.hasCheckbox(_11f, item)) {
						var flag = 0;
						if (_122 && _122.checkState == "checked" && opts.cascadeCheck) {
							flag = 1;
							item.checked = true;
						} else {
							if (item.checked) {
								$.easyui.addArrayItem(_120.tmpIds, item.domId);
							}
						}
						item.checkState = flag ? "checked" : "unchecked";
						cc.push("<span class=\"zTree-checkbox zTree-checkbox" + flag + "\"></span>");
					} else {
						item.checkState = undefined;
						item.checked = undefined;
					}
					cc.push("<span class=\"zTree-title\">" + opts.formatter.call(_11f, item) + "</span>");
					cc.push("</div>");
					if (item.children && item.children.length) {
						var tmp = _124.call(this, _125 + 1, item.children);
						cc.push("<ul style=\"display:" + (item.state == "closed" ? "none" : "block") + "\">");
						cc = cc.concat(tmp);
						cc.push("</ul>");
					}
					cc.push("</li>");
				}
				return cc;
			};
		},
		hasCheckbox: function (_127, item) {
			var _128 = $.data(_127, "tree");
			var opts = _128.options;
			if (opts.checkbox) {
				if ($.isFunction(opts.checkbox)) {
					if (opts.checkbox.call(_127, item)) {
						return true;
					} else {
						return false;
					}
				} else {
					if (opts.onlyLeafCheck) {
						if (item.state == "open" && !(item.children && item.children.length)) {
							return true;
						}
					} else {
						return true;
					}
				}
			}
			return false;
		}
	};
	$.fn.tree.defaults = {
		url: null, //获取远程数据的URL
		method: "post", //请求方式
		animate: false, //是否显示动画效果
		checkbox: false, //是否显示复选框
		icons:false,//
		cascadeCheck: true, //是否级联检查
		onlyLeafCheck: false, //是否只在叶节点前显示复选框
		lines: false, //是否显示树线条
		dnd: false, //要加载的节点数据
		data: null, //要加载的节点数据
		queryParams: {}, //当请求远程数据时，将被发送到服务器的附加参数
		//格式化节点显示文本
		formatter: function (node) {
			return node.text;
		},
		//过滤本地树的数据
		filter: function (q, node) {
			var qq = [];
			$.map($.isArray(q) ? q : [q], function (q) {
				q = $.trim(q);
				if (q) {
					qq.push(q);
				}
			});
			for (var i = 0; i < qq.length; i++) {
				var _129 = node.text.toLowerCase().indexOf(qq[i].toLowerCase());
				if (_129 >= 0) {
					return true;
				}
			}
			return !qq.length;
		},
		/**
			定义如何从远程服务器加载数据。返回 false 则取消该动作。该函数有下列参数：
			param：要传递到远程服务器的参数对象。
			success(data)：当检索数据成功时调用的回调函数。
			error()：当检索数据失败时调用的回调函数。
		*/
		loader: function (param, success, error) {
			var opts = $(this).tree("options");
			if (!opts.url) {
				return false;
			}
			$.ajax({
				type: opts.method,
				url: opts.url,
				data: param,
				dataType: "json",
				success: function (data) {
					success(data);
				},
				error: function () {
					error.apply(this, arguments);
				}
			});
		},
		loadFilter: function (data, parent) {
			return data;
		},
		view: _view,
		onBeforeLoad: function (node, param) {}, //当加载数据的请求发出前触发，返回 false 则取消加载动作 
		onLoadSuccess: function (node, data) {}, //当数据加载成功时触发
		onLoadError: function (arguments) {}, //当数据加载失败时触发，arguments 参数与 jQuery.ajax 的 'error' 函数一样
		onClick: function (node) {}, //当点击一个节点时触发
		onDblClick: function (node) {}, //当双击一个节点时触发
		onBeforeExpand: function (node) {}, //节点展开前触发，返回 false 则取消展开动作
		onExpand: function (node) {}, //当节点展开时触发
		onBeforeCollapse: function (node) {}, //节点折叠前触发，返回 false 则取消折叠动作
		onCollapse: function (node) {}, //当节点折叠时触发
		onBeforeCheck: function (node, checked) {}, //当用户点击复选框前触发，返回 false 则取消该选中动作
		onCheck: function (node, checked) {}, //当用户点击复选框时触发
		onBeforeSelect: function (node) {}, //节点被选中前触发，返回 false 则取消选择动作
		onSelect: function (node) {}, //节点被选中前触发，返回 false 则取消选择动作
		onContextMenu: function (e, node) {}, //当右键点击节点时触发
		onBeforeDrag: function (node) {}, //当节点的拖拽开始时触发，返回 false 则禁止拖拽
		onStartDrag: function (node) {}, //当节点的拖拽开始时触发，返回 false 则禁止拖拽
		onStopDrag: function (node) {}, //当停止拖拽节点时触发
		/*
		当节点被拖拽进入某个允许放置的目标节点时触发，返回 false 则禁止放置。
		target：被放置的目标节点元素。
		source：被拖拽的源节点。
		*/
		onDragEnter: function (target, source) {},
		/*
		当节点被拖拽到允许放置的目标节点上时触发，返回 false 则禁止放置。
		target：被放置的目标节点元素。
		source：被拖拽的源节点。
		*/
		onDragOver: function (target, source) {},
		/*
		当节点被拖拽离开允许放置的目标节点时触发。
		target：被放置的目标节点元素。
		source：被拖拽的源节点。
		*/
		onDragLeave: function (target, source) {},
		/*
		节点被放置之前触发，返回 false 则禁止放置
		target：DOM 对象，放置的目标节点。
		source：源节点。
		point：表示放置操作，可能的值是：'append'、'top' 或 'bottom'。
		*/
		onBeforeDrop: function (target, source, point) {},
		/*
		当节点被放置时触发。 	
		target：DOM 对象，放置的目标节点。
		source：源节点。
		point：表示放置操作，可能的值是：'append'、'top' 或 'bottom'。
		*/
		onDrop: function (target, source, point) {},
		onBeforeEdit: function (node) {}, //编辑节点前触发
		onAfterEdit: function (node) {}, //编辑节点后触发
		onCancelEdit: function (node) {} //当取消编辑动作时触发
	};
})(jQuery);

