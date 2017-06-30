/*
 *CRUD面板基类,继承自EXT的Panel
 */
Tms.CrudPanel = Ext.extend(Ext.Panel,{
	gridPanel : null,
	gridViewConfig : {},
	toolbar : {},
	cm : new Ext.grid.CheckboxSelectionModel(),
	sm : new Ext.grid.RowSelectionModel({singleSelect : true}),// -列选择模式
	store : null,
	storeMapping : null,
	pageSize : 20,
	addtooltip : "",
	modifytooltip : "",
	deletetooltip : "",
	refreshtooltip : "",
	addtitle : "添加",
	modifytitle : "修改",
	//render_div : null,

	dbclickEdit : false,

	// 构造器
	constructor : function(config) {

		if (this.store == null) {
			this.store = new Ext.data.JsonStore({
				url : this.listUrl,
				root : "data",
				//totalProperty : "total",
				remoteSort : true,
				fields : this.storeMapping
			});
		}

		this.cm.defaultSortable = true;

		var viewConfig = Ext.apply({
			forceFit : true,
			emptyText : '对不起,没有搜索到你想要的数据,请扩大搜索范围!'
		}, this.gridViewConfig);

		var originaltoolbar = [ {
				id : 'addButton',
				text : '添加',
				iconCls : 'add',
				tooltip : this.addtooltip,
				handler : this.doCreate,
				scope : this
			}, '-', {
				id : 'editButton',
				text : '编辑',
				iconCls : 'modify',
				tooltip : this.modifytooltip,
				handler : this.doEdit,
				scope : this
			}, '-', {
				text : '删除',
				iconCls : 'delete',
				tooltip : this.deletetooltip,
				handler : this.doDelete,
				scope : this
			}, '-', {
				text : '刷新',
				iconCls : 'refresh',
				tooltip : this.refreshtooltip,
				handler : this.refreshGrid,
				scope : this
			} ];
		
		/*if (!this.nodblclick) {
			this.listeners = {
				'celldblclick' : {// 双击时执行修改
					fn : this.doEdit,
					scope : this
				},
				'contextmenu' : function(e) {
					e.stopEvent();
				}
			};
		} else {*/
		this.listeners = {'contextmenu' : function(e) {e.stopEvent();}};
		if(this.dbclickEdit){
			this.listeners.celldblclick = {fn : this.doEdit()};
		}
		//}
		this.gridPanel = new Ext.grid.GridPanel({
			//id : Ext.id(),
			store : this.store,
			cm : this.cm,
			sm : this.sm,
			trackMouseOver : true,
			stripeRows : true,
			loadMask : true,
			autoHeight : true,
			// 超过长度带自动滚动条
			autoScroll : true,
			border : false,
			collapsible : true,
			animCollapse : false,
			enableColumnMove : false,
			viewConfig : viewConfig,
			listeners : this.listeners,
			tbar : [ originaltoolbar, this.toolbar ],
			// 分页
			bbar : new Ext.PagingToolbar({
				pageSize : this.pageSize,
				store : this.store,
				displayInfo : true,
				displayMsg : '显示第 {0} 条到 {1} 条记录，一共 {2} 条',
				emptyMsg : "没有记录"
			})
		});

		if (this.view) {
			Ext.apply(this.gridPanel, {
				view : this.view
			});
		}

		this.store.load({
			params : {
				start : 0,
				limit : 20
			}
		});

		var configs = Ext.apply({
			closable : true,
			autoScroll : true,
			border : false,
			layout : "fit",
			//renderTo : this.render_div,
			items : [ this.gridPanel ],
			/**
			 * 渲染数据
			 */
			// 链接
			linkRenderer : function(v) {
				if (!v)
					return "";
				else
					return String.format("<a href='{0}' target='_blank'>{0}</a>",v);
			},
			// 时间
			dateRender : function(format) {
				format = format || "Y-m-d h:i";
				return Ext.util.Format.dateRenderer(format);
			}
		}, config);

		// 调用父类的构造器
		Tms.CrudPanel.superclass.constructor.call(this, configs);
	},

	/**
	 * 事件
	 */

	// 刷新
	refreshGrid : function() {
		this.store.removeAll();
		this.store.reload();
	},
	// 初始化窗口（用于新增，修改时）,继承后在createWin中调用该方法显示窗口
	initWin : function(width, height, status) {
		var win = new Ext.Window({
			title : status,
			width : width,
			height : height,
			modal : true,
			shadow : true,
			iconCls : status,
			// 不可以随意改变大小
			resizable : false,
			// 是否可以拖动
			draggable : false,
			defaultType : "textfield",
			labelWidth : 100,
			collapsible : true, // 允许缩放条
			closeAction : 'hide',
			closable : false,
			plain : true,
			// 弹出模态窗体
			modal : 'true',
			buttonAlign : "center",
			bodyStyle : "padding:10px 0 0 15px",

			items : [ this.fp ],
			buttons : [ {
				text : "保存",
				handler : this.onSave,
				scope : this
			}, {
				text : "关闭",
				handler : this.closeWin,
				scope : this
			} ]
		});
		return win;
	},

	// 显示（新增/修改）窗口
	buildWin : function() { // createForm()需要在继承时提供，该方法作用是创建表单
		if (!this.win) {
			if (!this.fp) {
				this.fp = this.createForm(status);
			}
			this.win = this.createWin();
			if (status == 'add') {
				this.win.setTitle(this.addtitle);
				this.win.setIconClass('grid-win-addicon');
			} else {
				this.win.setTitle(this.modifytitle);
				this.win.setIconClass('grid-win-modifyicon');
			}
		}
		return this.win;
		// 窗口关闭时，数据重新加载
		//this.win.show();
	},
	// 创建（新增/修改）窗口
	doCreate : function() {
		this.buildWin().show();
		this.win.setTitle(this.addtitle);
		this.win.setIconClass('grid-win-addicon');
		this.fp.form.reset();
	},

	// 数据保存[（新增/修改）窗口]
	onSave : function() {
		//var id = this.fp.form.findField("id").getValue();
		if (this.fp.form.isValid()) {
			this.fp.form.submit({
				waitMsg : '正在保存。。。',
				url : this.saveUrl,
				method : 'POST',
				success : function() {
					this.closeWin();
					this.refreshGrid();
				},
				failure : function(form, action) {
					Ext.Msg.show({
						title : "错误信息",
						msg : "命名重复",
						buttons : Ext.MessageBox.OK,
						icon : Ext.MessageBox.ERROR
					});
				},
				scope : this
			});
		}
	},
	closeWin : function() {
		if (this.win)
			this.win.close();
		this.win = null;
		this.fp = null;
	},
	// 修改，双击行，或选中一行点击修改，
	doEdit : function() {
		if (this.gridPanel.selModel.hasSelection()) {
			var records = this.gridPanel.selModel.getSelections();// 得到被选择的行的数组
			var recordsLen = records.length;// 得到行数组的长度
			if (recordsLen > 1) {
				Ext.Msg.alert("系统提示信息", "请选择其中一项进行编辑！");
			}// 一次只给编辑一行
			else {
				var record = this.gridPanel.getSelectionModel().getSelected();// 获取选择的记录集
				var id = record.get("id");
				if (id != '') {
					this.buildWin().show();
					this.fp.form.loadRecord(record); // 往表单（fp.form）加载数据
				}
			}
		} else {
			Ext.Msg.alert("提示", "请先选择要编辑的行!");
		}
	},
	// 删除,deleteIds为主键值
	doDelete : function() {
		var store = this.store;
		var deleteUrl = this.deleteUrl;
		if (this.gridPanel.selModel.hasSelection()) {
			var records = this.gridPanel.selModel.getSelections();// 得到被选择的行的数组
			var recordsLen = records.length;// 得到行数组的长度
			var deleteIds = [];
			for ( var i = 0; i < recordsLen; i++) {
				var id = records[i].get('id');
				if (Ext.isEmpty(id))
					continue;
				deleteIds.push(id);
			}

			Ext.MessageBox.confirm(
				'系统提示信息',
				'确定要删除所选的记录吗?',
				function(btn) {
					if (btn == 'yes') {
						var myCon = new Ext.data.Connection();
						Ext.MessageBox.wait('正在删除数据中, 请稍候……'); // 出现一个等待条
						myCon.request({
							url : deleteUrl,
							method : "POST",
							params : {
								'deleteIds' : deleteIds
							},
							callback : function(options, success, response) {
								Ext.MessageBox.hide();
								successmsg = Ext.util.JSON.decode(response.responseText).success;
								if (successmsg) {
									Ext.Msg.alert("提示信息","成功删除数据!",function() {store.reload();},this);
								} else {
									num = Ext.util.JSON.decode(response.responseText).num;
									Ext.MessageBox.alert("系统提示信息","不能删除数据,因为有<font color=red>" + num + "</font>种产品与它联系!<br>若要删除,请先删除与其联系的产品.");
								}
							}
						}, this);
					}
				}, this);
		} else {
			Ext.Msg.alert("提示", "请先选择要删除的行!");
		}
	}
});

Ext.reg('crudpanel', Tms.CrudPanel);