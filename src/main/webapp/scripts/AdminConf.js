var BranchGrid = Ext.extend(Ext.grid.GridPanel, { // 从Ext.grid.GridPanel中继承
	AddBranch : null, // 声明Window组件
	constructor : function() {// 构件器
		this.AddBranch = new AddBranchWindow();// 创建 window组件
		this.store = new Ext.data.Store({ // 数据源
			// autoLoad:true,//为“true”自动加载数据
			url : Tms.URLS.departList,// 从那里获得数据
			reader : new Ext.data.JsonReader({
				root : "data",
				totalProperty : "totalCount"
			}, [ {
				name : "id"
			}, {
				name : "deptName"
			} ])
		});

		BranchGrid.superclass.constructor.call(this, { // 对父类初始化
			title : "部门信息",
			renderTo : Ext.getBody(),
			width : 410,
			height : 350,
			store : this.store, // 设置数据源
			selModel : new Ext.grid.RowSelectionModel({
				singleSelect : true
			}),
			// 定义选择模式”singleSelect“为true时只能单选，默认为false
			columns : [ new Ext.grid.RowNumberer(), {
				header : "部门编号",
				dataIndex : "id",
				align : "center"
			}, {
				header : "部门名称",
				dataIndex : "brname"
			} ],
			loadMask : {
				msg : "数据加载中...."
			},
			tbar : [ {
				text : "添加",
				handler : this.showAdd,
				scope : this
			}, "-", {
				text : "修改"
			}, "-", {
				text : "删除",
				handler : this.deleteBranch,
				scope : this
			} ],
			bbar : new Ext.PagingToolbar({
				pageSize : 3,
				store : this.store, // 设置数据源
				displayInfo : true,
				displayMsg : "当前 {0}-{1} 条记录 /共 {2} 条记录",
				emptyMsg : "无显示数据"
			})
		});

		this.getStore().load({
			params : {
				start : 0,
				limit : 3
			}
		});

		this.AddBranch.on("OnButtonClick", this.OnButtonClick, this);// 捕获AddBranchWindow中的OnButtonClick事件
	},
	showAdd : function() {
		this.AddBranch.show();
	},
	OnButtonClick : function(win) { // OnButtonClick事件处理函数
		win.addFormPanel.getForm().submit(
				{ // 进行AJAX请求
					waitMsg : "数据保存中...",
					url : "AddBranch.ashx",
					success : function(form, response) { // 当success为true时执行的回调函数
						var temp = Ext.util.JSON.decode(response.response.responseText);
						Ext.Msg.show({
							title : "系统提示！", 
							msg : temp.msg,
							buttons : Ext.Msg.OK,
							icon : Ext.Msg.INFO
						});
						if (temp.msg == "部门名称重复！") {
							return;
						}
						// var currentPageNum=this.getBottomToolbar().getPageData().activePage;//得到当前是第几页
						// var limitNum=this.getBottomToolbar().getPageData().pages;//得到总页数
						var start = this.getBottomToolbar().cursor; // 得到当前记录指针
						var limit = this.getBottomToolbar().pageSize; // 得到每页要显示的记录数
						this.getStore().load({
							params : {
								start : start,
								limit : limit
							}
						});
						win.addFormPanel.getForm().reset();
					},
					scope : this
				});
	},
	deleteBranch : function() {
		var br = this.getSelectionModel().getSelected().data;
		Ext.Ajax.request({
			url : Tms.URLS.deptDelete,
			success : function(response) {
				Ext.Msg.show({
					title : "系统提示",
					msg : Ext.util.JSON.decode(response.responseText).msg,
					buttons : Ext.Msg.OK,
					icon : Ext.Msg.INFO
				});
				if (this.getStore().getCount() == 1)// 如果当前store的数据记录数等于1那么就从服务器端加载数据，否则从store中删除选定的Record
				{
					// var cursor=this.getBottomToolbar().cursor;
					var start = this.getBottomToolbar().cursor - this.getBottomToolbar().pageSize;
					var pageSize = this.getBottomToolbar().pageSize;
					this.getStore().load({
						params : {
							start : start,
							limit : pageSize
						}
					});
					return;
				}
				this.getStore().remove(this.getSelectionModel().getSelected());
				// var cursor=this.getBottomToolbar().cursor;
				// this.getStore().load({params:{start:cursor-1,limit:this.getBottomToolbar().pageSize}});
			},
			scope : this,
			params : {
				branch : Ext.util.JSON.encode(br)
			}
		});
	}
});
/** ****************添加表单FormPanel控件******************************************** */
/*AddBranchFormPanel = Ext.extend(Ext.form.FormPanel, {
	constructor : function() {
		AddBranchFormPanel.superclass.constructor.call(this, {
			defaultType : "textfield",
			baseCls : "x-plain",// 应用容器控件背景颜色
			bodyStyle : "padding:5 0 0 5", // 设置border样式
			// frame:true,
			labelWidth : 55,
			defaults : {
				anchor : "98%"
			}, // 使用锚点布局设置缺省控件宽度
			items : [ {
				fieldLabel : "部门名称",
				allowBlank : false, // 非空验证
				blankText : "部门名称不能为空！",// 为空时显示的提示信息
				name : "deptName" // name属性一定要与服务器端定义的Request["brname"]一致，不然服务器端得不到数据
			} ]
		});
	}
});*/
/** ****************添加表单Window控件********************************************* */
AddBranchWindow = Ext.extend(Ext.Window, {
	constructor : function() {
		//this.addFormPanel = new AddBranchFormPanel();
		AddBranchWindow.superclass.constructor.call(this, {
			title : "添加部门信息",
			width : 300,
			height : 100,
			//renderTo : Ext.getBody(),
			plain : true,
			closeAction : "hide",// 使关闭模式为隐藏（hide）
			mode : true,
			items : {
				xtype : 'form'
				,width : 300
				,defaultType : 'textfield'
				,baseCls : "x-plain"// 应用容器控件背景颜色
				,bodyStyle : "padding:5 0 0 5" // 设置border样式
				// ,frame:true,
				,labelWidth : 55
				,defaults : {
					anchor : "98%"
				} // 使用锚点布局设置缺省控件宽度
				,items : [ {
					fieldLabel : "部门名称",
					allowBlank : false, // 非空验证
					blankText : "部门名称不能为空！",// 为空时显示的提示信息
					name : "deptName" // name属性一定要与服务器端定义的Request["brname"]一致，不然服务器端得不到数据
				} ]
			}
			,buttons : [ {
				text : "确定",
				handler : this.addBranchRecord,
				scope : this
			}, {
				text : "关闭",
				handler : this.hide(),
				scope : this
			} ]
		});
		this.addEvents("OnButtonClick");// 添加自定义OnButtonClick事件，为外部组件提供接口
	},
	addBranchRecord : function() {
		this.fireEvent("OnButtonClick", this); // 在单击确定按钮时触发OnButtonClick事件
	}
});