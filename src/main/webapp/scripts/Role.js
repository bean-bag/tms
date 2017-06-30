Tms.role = Ext.extend(Ext.grid.GridPanel,{
	id: 'role_grid',
	store : {
		xtype : 'jsonstore',
		autoLoad : true,
		url : Tms.URLS.roleList,
		root : 'data',
		fields : [ {
			name : 'id'
		}, {
			name : 'roleName'
		}, {
			name : 'profile'
		} ]
	},
	columns : [{
		header : "岗位编号",
		menuDisabled : true,
		//width : 100,
		align : "center",
		dataIndex : "id"
	}, {
		header : "岗位名称",
		menuDisabled : true,
		//width : 200,
		align : "center",
		dataIndex : 'roleName'
	}, {
		header : "岗位描述",
		menuDisabled : true,
		width : 200,
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

		labelWidth : 60,
		defaultType : 'textfield',
		items : [ {
			xtype : "hidden",
			name : "id",
			hidden : true,
			hiddenLabel : true
		}, {
			fieldLabel : "岗位名称",
			allowBlank : false,
			blankText : "岗位名称不能为空！",
			name : "roleName"
		}, {
			xtype : 'textarea',
			width : 200,
			fieldLabel : "岗位描述",
			allowBlank : true,
			//blankText : "岗位描述不能为空！",
			name : "profile"		
		} ]
	},
	constructor : function(config) {
		Ext.apply(this, config);
		config = Ext.apply({
			tbar : [ {
			/*	text : "添加",
				handler : this.addItem,
				scope : this
			}, {*/
				text : "修改",
				handler : this.uptItem,
				scope : this
			/*}, {
				text : "删除",
				handler : this.delItem,
				scope : this*/
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
				url : Tms.URLS.roleSubmit,
				timeout : 300,
				method : 'POST',
				params : myForm.getValues(),//bjw 构建form对象时出问题，此处先直接获取form值
				success : function(form, resp) {
					Ext.getCmp('role_grid').store.reload();
				},
				failure : function(form, resp) {
					var temp = Ext.util.JSON.decode(resp.response.responseText);
					Ext.Msg.alert("系统提示！",temp.message);
				}
			});
		}
		ct.close();
	},
	/*addItem : function() {
		var win = Ext.create({
			xtype : 'form-window',
			searchForm : true,
			title : '添加岗位',
			items : this.formConfig || {}
		});
		win.on('clickOkButton', this.doSave);
		win.show();
	},*/
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
						title : '维护岗位信息',
						items : this.formConfig || {}
					});
					win.on('clickOkButton', this.doSave);
					win.formLoadRecord(record);
					win.show();
				}
			}
		} else {
			Ext.Msg.alert("提示", "请先选择要编辑的信息!");
		}
	},
	/*delItem : function() {

		if (this.selModel.hasSelection()) {

			Ext.MessageBox.confirm(
				'系统提示信息',
				'确定要删除所选的记录吗?',
				function(btn) {
					if (btn == 'yes') {
						var myCon = new Ext.data.Connection();
						Ext.MessageBox.wait('正在删除数据中, 请稍候……');
						myCon.request({
							url : Tms.URLS.roleDelete,
							method : "POST",
							params : {
								'id' : this.selModel.getSelected().data.id
							},
							scope : this,
							callback : function(options, success, response) {
								Ext.MessageBox.hide();
								if (success) {
									if (this.getStore().getCount() == 1) {
										var start = this.getBottomToolbar().cursor - this.getBottomToolbar().pageSize;
										var pageSize = this.getBottomToolbar().pageSize;
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
	}*/
});
Ext.reg('tms_role', Tms.role);
