Tms.dept = Ext.extend(Ext.grid.GridPanel,{
	id: 'dept_grid',
	store : {
		xtype : 'jsonstore',
		autoLoad : true,
		url : Tms.URLS.departList,
		root : 'data',
		fields : [ {
			name : 'id'
		}, {
			name : 'deptName'
		}, {
			name : 'pid'			
		}, {
			name : 'profile'
		} ]
	},
	columns : [{
		header : "部门编号",
		menuDisabled : true,
		width : 100,
		align : "center",
		dataIndex : "id"
	}, {
		header : "部门名称",
		menuDisabled : true,
		width : 200,
		align : "center",
		dataIndex : 'deptName'
	}, {
		header : "所属部门",
		menuDisabled : true,
		width : 300,
		align : "center",
		dataIndex : 'pid',
		renderer : function(val){
			return (val == '2') ? '计划部' : (val == '3') ? '设计部' : '无';
		}
	}, {
		header : "部门描述",
		menuDisabled : true,
		width : 300,
		align : "center",
		dataIndex : 'profile'
	}, ],
	loadMask : {
		msg : "数据加载中...."
	},

	formConfig : {
		xtype : 'form',
		baseCls : "x-plain",
		bodyStyle : "padding:5 0 0 5",
		frame:true,

		labelWidth : 55,
		defaultType : 'textfield',
		items : [ {
			xtype : "hidden",
			name : "id",
			hidden : true,
			hiddenLabel : true
		}, {
			fieldLabel : "部门名称",
			blankText : "部门名称不能为空！",
			allowBlank : false,
			name : "deptName",
			width : 200
		}, {
			xtype : 'combo'
			,fieldLabel : "所属部门"
			,id : "parentID"
			,hiddenName : "pid"
			,forceSelection : true
			,listWidth : 200
			,valueField : 'id'
			,displayField : 'name'
			,editable: false
			,typeAhead : true
			,triggerAction : 'all'
			,selectOnFocus : true
			,allowBlank : false 
			,mode : 'local'//本地
			,store : new Ext.data.SimpleStore({
	             fields: ['id', 'name'],
	             data : [['0','无'],['2','计划部'],['3','设计部']]
	        })
		}, {
			xtype : 'textarea',
			fieldLabel : "部门描述",
			name : "profile",
			width : 200
		} ]
	},
	constructor : function(config) {
		Ext.apply(this, config);
		config = Ext.apply({
			tbar : [ {
				text : "添加",
				handler : this.addItem,
				scope : this
			}, {
				text : "修改",
				handler : this.uptItem,
				scope : this
			}, {
				text : "删除",
				handler : this.delItem,
				scope : this
			} ]
		});
		Tms.formWindow.superclass.constructor.call(this, config);
	},
	onSuccess : function(form, resp){
		this.store.reload();
	},
	doSave : function(ct, form) {
		var myForm = form.getForm();
		if (myForm.isValid()) {
			myForm.submit({
				waitMsg : "数据保存中...",
				url : Tms.URLS.deptSubmit,
				timeout : 300,
				method : 'POST',
				params : myForm.getValues(),//bjw 构建form对象时出问题，此处先直接获取form值
				success : function(form, resp) {
					Ext.getCmp('dept_grid').store.reload();
				},
				failure : function(form, resp) {
					var temp = Ext.util.JSON.decode(resp.response.responseText);
					Ext.Msg.alert("系统提示！",temp.message);
				}
			});
		}
		ct.close();
	},
	addItem : function() {
		var win = Ext.create({
			xtype : 'form-window',
			searchForm : true,
			title : '添加新部门',
			items : this.formConfig || {}
		});
		win.on('clickOkButton', this.doSave);
		win.show();
	},
	uptItem : function() {
		if (this.selModel.hasSelection()) {
			var records = this.selModel.getSelections();// 得到被选择的行的数组
			var recordsLen = records.length;// 得到行数组的长度
			if (recordsLen > 1) {
				Ext.Msg.alert("系统提示信息", "请选择其中一项进行编辑！");
			} else {
				var record = this.getSelectionModel().getSelected();// 获取选择的记录集
				var id = record.get("id");
				if (id != '') {
					var win = Ext.create({
						xtype : 'form-window',
						searchForm : true,
						title : '维护部门信息',
						items : this.formConfig || {}
					});
					win.on('clickOkButton', this.doSave);
					win.formLoadRecord(record);
					win.show();
				}
			}
		} else {
			Ext.Msg.alert("提示", "请先选择要编辑的信息行!");
		}
	},
	delItem : function() {

		if (this.selModel.hasSelection()) {

			Ext.MessageBox.confirm(
				'系统提示信息',
				'确定要删除所选的记录吗?',
				function(btn) {
					if (btn == 'yes') {
						var myCon = new Ext.data.Connection();
						Ext.MessageBox.wait('正在删除数据中, 请稍候……');
						myCon.request({
							url : Tms.URLS.deptDelete,
							method : "POST",
							params : {
								'id' : this.selModel.getSelected().data.id
							},
							scope : this,
							callback : function(options, success, response) {
								Ext.MessageBox.hide();
								if (success) {
									if (this.getStore().getCount() == 1) {
										var start = 0;//this.getBottomToolbar().cursor - this.getBottomToolbar().pageSize;
										var pageSize = 99;//this.getBottomToolbar().pageSize;
										this.getStore().load({
											params : {
												start : start,
												limit : pageSize
											}
										});
									} else {
										this.getStore().remove(this.getSelectionModel().getSelected());
									}
								} else {
									var resp = Ext.util.JSON.decode(response.responseText);
									if (resp.message) {
										Ext.Msg.alert("系统提示",resp.message);
									} else {
										Ext.Msg.alert("系统提示",'删除失败');
									}
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
Ext.reg('tms_dept', Tms.dept);

Tms.subprj = Ext.extend(Ext.grid.GridPanel,{
	id: 'subprj_grid',
	store : {
		xtype : 'jsonstore',
		autoLoad : true,
		url : Tms.URLS.subprjList,
		root : 'data',
		fields : [ {
			name : 'id'
		}, {
			name : 'subprjName'
		//}, {
		//	name : 'depart'
		}, {
			name : 'profile'
		} ]
	},
	columns : [{
		header : "项目编号",
		menuDisabled : true,
		width : 100,
		align : "center",
		dataIndex : "id"
	}, {
		header : "项目名称",
		menuDisabled : true,
		width : 200,
		align : "center",
		dataIndex : 'subprjName'
	}, {
		header : "项目描述",
		menuDisabled : true,
		width : 300,
		align : "center",
		dataIndex : 'profile'
	}, ],
	loadMask : {
		msg : "数据加载中...."
	},

	formConfig : {
		xtype : 'form',
		baseCls : "x-plain",
		bodyStyle : "padding:5 0 0 5",
		frame:true,

		labelWidth : 55,
		defaultType : 'textfield',
		items : [ {
			xtype : "hidden",
			name : "id",
			hidden : true,
			hiddenLabel : true
		}, {
			fieldLabel : "项目名称",
			allowBlank : false,
			blankText : "项目名称不能为空！",
			name : "subprjName"
		}, {
			xtype : 'textarea',
			width : 200,
			fieldLabel : "项目描述",
			name : "profile"
		} ]
	},
	constructor : function(config) {
		Ext.apply(this, config);
		config = Ext.apply({
			tbar : [ {
				text : "添加",
				handler : this.addItem,
				scope : this
			}, {
				text : "修改",
				handler : this.uptItem,
				scope : this
			}, {
				text : "删除",
				handler : this.delItem,
				scope : this
			} ]
		});
		Tms.formWindow.superclass.constructor.call(this, config);
	},
	onSuccess : function(form, resp){
		this.store.reload();
	},
	doSave : function(ct, form) {
		var myForm = form.getForm();
		if (myForm.isValid()) {
			myForm.submit({
				waitMsg : "数据保存中...",
				url : Tms.URLS.subprjSubmit,
				timeout : 300,
				method : 'POST',
				params : myForm.getValues(),//bjw 构建form对象时出问题，此处先直接获取form值
				success : function(form, resp) {
					Ext.getCmp('subprj_grid').store.reload();
				},
				failure : function(form, resp) {
					var temp = Ext.util.JSON.decode(resp.response.responseText);
					Ext.Msg.alert("系统提示！",temp.message);
				}
			});
		}
		ct.close();
	},
	addItem : function() {
		var win = Ext.create({
			xtype : 'form-window',
			searchForm : true,
			title : '添加新项目',
			items : this.formConfig || {}
		});
		//TODO bjw 加载所属部门列表
		win.on('clickOkButton', this.doSave);
		win.show();
	},
	uptItem : function() {
		if (this.selModel.hasSelection()) {
			var records = this.selModel.getSelections();// 得到被选择的行的数组
			var recordsLen = records.length;// 得到行数组的长度
			if (recordsLen > 1) {
				Ext.Msg.alert("系统提示信息", "请选择其中一项进行编辑！");
			} else {
				var record = this.getSelectionModel().getSelected();// 获取选择的记录集
				var id = record.get("id");
				if (id != '') {
					var win = Ext.create({
						xtype : 'form-window',
						searchForm : true,
						title : '维护项目信息',
						items : this.formConfig || {}
					});
					win.on('clickOkButton', this.doSave);
					win.formLoadRecord(record);
					win.show();
				}
			}
		} else {
			Ext.Msg.alert("提示", "请先选择要编辑的信息行!");
		}
	},
	delItem : function() {

		if (this.selModel.hasSelection()) {

			Ext.MessageBox.confirm(
				'系统提示信息',
				'确定要删除所选的记录吗?',
				function(btn) {
					if (btn == 'yes') {
						var myCon = new Ext.data.Connection();
						Ext.MessageBox.wait('正在删除数据中, 请稍候……');
						myCon.request({
							url : Tms.URLS.subprjDelete,
							method : "POST",
							params : {
								'id' : this.selModel.getSelected().data.id
							},
							scope : this,
							callback : function(options, success, response) {
								Ext.MessageBox.hide();
								if (success) {
									if (this.getStore().getCount() == 1) {
										var start = 0;//this.getBottomToolbar().cursor - this.getBottomToolbar().pageSize;
										var pageSize = 99;//this.getBottomToolbar().pageSize;
										this.getStore().load({
											params : {
												start : start,
												limit : pageSize
											}
										});
									} else {
										this.getStore().remove(this.getSelectionModel().getSelected());
									}
								} else {
									var resp = Ext.util.JSON.decode(response.responseText);
									if (resp.message) {
										Ext.Msg.alert("系统提示",resp.message);
									} else {
										Ext.Msg.alert("系统提示",'删除失败');
									}
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
Ext.reg('tms_subprj', Tms.subprj);

Tms.imgtype = Ext.extend(Ext.grid.GridPanel,{
	id: 'imgtype_grid',
	store : {
		xtype : 'jsonstore',
		autoLoad : true,
		url : Tms.URLS.imgtypeList,
		root : 'data',
		fields : [ {
			name : 'id'
		}, {
			name : 'imgtypeName'
		}, {
			name : 'profile'
		} ]
	},
	columns : [{
		header : "图别编号",
		menuDisabled : true,
		width : 100,
		align : "center",
		dataIndex : "id"
	}, {
		header : "图别名称",
		menuDisabled : true,
		width : 200,
		align : "center",
		dataIndex : 'imgtypeName'
	}, {
		header : "图别描述",
		menuDisabled : true,
		width : 300,
		align : "center",
		dataIndex : 'profile'
	}, ],
	loadMask : {
		msg : "数据加载中...."
	},

	formConfig : {
		xtype : 'form',
		baseCls : "x-plain",
		bodyStyle : "padding:5 0 0 5",
		frame:true,

		labelWidth : 55,
		defaultType : 'textfield',
		items : [ {
			xtype : "hidden",
			name : "id",
			hidden : true,
			hiddenLabel : true
		}, {
			fieldLabel : "图别名称",
			allowBlank : false,
			blankText : "图别名称不能为空！",
			name : "imgtypeName"
		}, {
			xtype : 'textarea',
			width : 200,
			fieldLabel : "图别描述",			
			name : "profile"
		} ]
	},
	constructor : function(config) {
		Ext.apply(this, config);
		config = Ext.apply({
			tbar : [ {
				text : "添加",
				handler : this.addItem,
				scope : this
			}, {
				text : "修改",
				handler : this.uptItem,
				scope : this
			}, {
				text : "删除",
				handler : this.delItem,
				scope : this
			} ]
		});
		Tms.formWindow.superclass.constructor.call(this, config);
	},
	onSuccess : function(form, resp){
		this.store.reload();
	},
	doSave : function(ct, form) {
		var myForm = form.getForm();
		if (myForm.isValid()) {
			myForm.submit({
				waitMsg : "数据保存中...",
				url : Tms.URLS.imgtypeSubmit,
				timeout : 300,
				method : 'POST',
				params : myForm.getValues(),//bjw 构建form对象时出问题，此处先直接获取form值
				success : function(form, resp) {
					Ext.getCmp('imgtype_grid').store.reload();
				},
				failure : function(form, resp) {
					var temp = Ext.util.JSON.decode(resp.response.responseText);
					Ext.Msg.alert("系统提示！",temp.message);
				}
			});
		}
		ct.close();
	},
	addItem : function() {
		var win = Ext.create({
			xtype : 'form-window',
			searchForm : true,
			title : '添加新图别',
			items : this.formConfig || {}
		});
		win.on('clickOkButton', this.doSave);
		win.show();
	},
	uptItem : function() {
		if (this.selModel.hasSelection()) {
			var records = this.selModel.getSelections();// 得到被选择的行的数组
			var recordsLen = records.length;// 得到行数组的长度
			if (recordsLen > 1) {
				Ext.Msg.alert("系统提示信息", "请选择其中一项进行编辑！");
			} else {
				var record = this.getSelectionModel().getSelected();// 获取选择的记录集
				var id = record.get("id");
				if (id != '') {
					var win = Ext.create({
						xtype : 'form-window',
						searchForm : true,
						title : '维护图别信息',
						items : this.formConfig || {}
					});
					win.on('clickOkButton', this.doSave);
					win.formLoadRecord(record);
					win.show();
				}
			}
		} else {
			Ext.Msg.alert("提示", "请先选择要编辑的信息行!");
		}
	},
	delItem : function() {

		if (this.selModel.hasSelection()) {

			Ext.MessageBox.confirm(
				'系统提示信息',
				'确定要删除所选的记录吗?',
				function(btn) {
					if (btn == 'yes') {
						var myCon = new Ext.data.Connection();
						Ext.MessageBox.wait('正在删除数据中, 请稍候……');
						myCon.request({
							url : Tms.URLS.imgtypeDelete,
							method : "POST",
							params : {
								'id' : this.selModel.getSelected().data.id
							},
							scope : this,
							callback : function(options, success, response) {
								Ext.MessageBox.hide();
								if (success) {
									if (this.getStore().getCount() == 1) {
										var start = 0;//this.getBottomToolbar().cursor - this.getBottomToolbar().pageSize;
										var pageSize = 99;//this.getBottomToolbar().pageSize;
										this.getStore().load({
											params : {
												start : start,
												limit : pageSize
											}
										});
									} else {
										this.getStore().remove(this.getSelectionModel().getSelected());
									}
								} else {
									var resp = Ext.util.JSON.decode(response.responseText);
									if (resp.message) {
										Ext.Msg.alert("系统提示",resp.message);
									} else {
										Ext.Msg.alert("系统提示",'删除失败');
									}
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
Ext.reg('tms_imgtype', Tms.imgtype);

Tms.imgsize = Ext.extend(Ext.grid.GridPanel,{
	id: 'imgsize_grid',
	store : {
		xtype : 'jsonstore',
		autoLoad : true,
		url : Tms.URLS.imgsizeList,
		root : 'data',
		fields : [ {
			name : 'id'
		}, {
			name : 'imgsizeName'
		}, {
			name : 'profile'
		} ]
	},
	columns : [{
		header : "图幅编号",
		menuDisabled : true,
		width : 100,
		align : "center",
		dataIndex : "id"
	}, {
		header : "图幅名称",
		menuDisabled : true,
		width : 200,
		align : "center",
		dataIndex : 'imgsizeName'
	}, {
		header : "图幅描述",
		menuDisabled : true,
		width : 300,
		align : "center",
		dataIndex : 'profile'
	}, ],
	loadMask : {
		msg : "数据加载中...."
	},

	formConfig : {
		xtype : 'form',
		baseCls : "x-plain",
		bodyStyle : "padding:5 0 0 5",
		frame:true,

		labelWidth : 55,
		defaultType : 'textfield',
		items : [ {
			xtype : "hidden",
			name : "id",
			hidden : true,
			hiddenLabel : true
		}, {
			fieldLabel : "图幅名称",
			allowBlank : false,
			blankText : "图幅名称不能为空！",
			name : "imgsizeName"
		}, {
			xtype : 'textarea',
			width : 200,
			fieldLabel : "图幅描述",			
			name : "profile"
		} ]
	},
	constructor : function(config) {
		Ext.apply(this, config);
		config = Ext.apply({
			tbar : [ {
				text : "添加",
				handler : this.addItem,
				scope : this
			}, {
				text : "修改",
				handler : this.uptItem,
				scope : this
			}, {
				text : "删除",
				handler : this.delItem,
				scope : this
			} ]
		});
		Tms.formWindow.superclass.constructor.call(this, config);
	},
	onSuccess : function(form, resp){
		this.store.reload();
	},
	doSave : function(ct, form) {
		var myForm = form.getForm();
		if (myForm.isValid()) {
			myForm.submit({
				waitMsg : "数据保存中...",
				url : Tms.URLS.imgsizeSubmit,
				timeout : 300,
				method : 'POST',
				params : myForm.getValues(),//bjw 构建form对象时出问题，此处先直接获取form值
				success : function(form, resp) {
					Ext.getCmp('imgsize_grid').store.reload();
				},
				failure : function(form, resp) {
					var temp = Ext.util.JSON.decode(resp.response.responseText);
					Ext.Msg.alert("系统提示！",temp.message);
				}
			});
		}
		ct.close();
	},
	addItem : function() {
		var win = Ext.create({
			xtype : 'form-window',
			searchForm : true,
			title : '添加新图幅',
			items : this.formConfig || {}
		});
		win.on('clickOkButton', this.doSave);
		win.show();
	},
	uptItem : function() {
		if (this.selModel.hasSelection()) {
			var records = this.selModel.getSelections();// 得到被选择的行的数组
			var recordsLen = records.length;// 得到行数组的长度
			if (recordsLen > 1) {
				Ext.Msg.alert("系统提示信息", "请选择其中一项进行编辑！");
			} else {
				var record = this.getSelectionModel().getSelected();// 获取选择的记录集
				var id = record.get("id");
				if (id != '') {
					var win = Ext.create({
						xtype : 'form-window',
						searchForm : true,
						title : '维护图幅信息',
						items : this.formConfig || {}
					});
					win.on('clickOkButton', this.doSave);
					win.formLoadRecord(record);
					win.show();
				}
			}
		} else {
			Ext.Msg.alert("提示", "请先选择要编辑的信息行!");
		}
	},
	delItem : function() {

		if (this.selModel.hasSelection()) {

			Ext.MessageBox.confirm(
				'系统提示信息',
				'确定要删除所选的记录吗?',
				function(btn) {
					if (btn == 'yes') {
						var myCon = new Ext.data.Connection();
						Ext.MessageBox.wait('正在删除数据中, 请稍候……');
						myCon.request({
							url : Tms.URLS.imgsizeDelete,
							method : "POST",
							params : {
								'id' : this.selModel.getSelected().data.id
							},
							scope : this,
							callback : function(options, success, response) {
								Ext.MessageBox.hide();
								if (success) {
									if (this.getStore().getCount() == 1) {
										var start = 0;//this.getBottomToolbar().cursor - this.getBottomToolbar().pageSize;
										var pageSize = 99;//this.getBottomToolbar().pageSize;
										this.getStore().load({
											params : {
												start : start,
												limit : pageSize
											}
										});
									} else {
										this.getStore().remove(this.getSelectionModel().getSelected());
									}
								} else {
									var resp = Ext.util.JSON.decode(response.responseText);
									if (resp.message) {
										Ext.Msg.alert("系统提示",resp.message);
									} else {
										Ext.Msg.alert("系统提示",'删除失败');
									}
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
Ext.reg('tms_imgsize', Tms.imgsize);
