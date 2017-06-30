Tms.person = Ext.extend(Ext.grid.GridPanel,{
	id: 'person_grid',
	store : {
		xtype : 'jsonstore',
		autoLoad : true,
		url : Tms.URLS.personList,
		root : 'data',
		fields : [ {
			name : 'id'
		}, {
			name : 'userName'
		}, {
			name : 'userCode'
		}, {
			name : 'password'
		}, {
			name : 'depart'
		}, {
			name : 'teamLeader'
		}, {
			name : 'role'
		} ]
	},
	columns : [{
		header : "人员编号",
		menuDisabled : true,
		//width : 100,
		align : "center",
		dataIndex : "id"
	}, {
		header : "人员名称",
		menuDisabled : true,
		//width : 200,
		align : "center",
		dataIndex : 'userName'
	}, {
		header : "登录账号",
		menuDisabled : true,
		//width : 200,
		align : "center",
		dataIndex : 'userCode'
	}, {
		header : "登录密码",
		menuDisabled : true,
		//width : 200,
		align : "center",
		dataIndex : 'password'
	}, {
		header : "所属部门",
		menuDisabled : true,
		//width : 300,
		align : "center",
		dataIndex : 'depart',
		renderer : function(v){
			return (v&&v.deptName)?v.deptName:v;
		}
	}, {
		header : "部门主管",
		menuDisabled : true,
		//width : 300,
		align : "center",
		dataIndex : 'teamLeader',
		renderer : function(v){
			return v == '1'?'是':'否';
		}
	}, {
		header : "岗位角色",
		menuDisabled : true,
		//width : 300,
		align : "center",
		dataIndex : 'role',
		renderer : function(v){
			return (v&&v.roleName)? v.roleName:v;
		}
	}, ],
	loadMask : {
		msg : "数据加载中...."
	},

	formConfig : {
		xtype : 'form',
		baseCls : "x-plain",
		bodyStyle : "padding:5 0 0 5",
		frame:true,

		labelWidth : 80,
		defaultType : 'textfield',
		items : [ {
			xtype : "hidden",
			name : "id",
			hidden : true,
			hiddenLabel : true
		}, {
			fieldLabel : "人员名称",
			allowBlank : false,
			blankText : "人员名称不能为空！",
			name : "userName"
		}, {
			fieldLabel : "登录账号",
			allowBlank : false,
			blankText : "人员名称不能为空！",
			name : "userCode"
		}, {
			fieldLabel : "登录密码",
			allowBlank : false,
			blankText : "人员名称不能为空！",
			name : "password"
		}, {
			xtype : 'combo'
			,id : 'detpID_combo'
			,hiddenName : 'deptID'
			,fieldLabel : '所属部门'
			,emptyText : '请选择所属部门 ...'
			,forceSelection : true
			,listWidth : 100
			,valueField : 'id'
			,displayField : 'deptName'
			,editable: false
			//,readOnly:true
			,typeAhead : true
			,triggerAction : 'all'
			,selectOnFocus : true
			,allowBlank : true
			,mode : 'remote'//远程
			,store : {
				xtype : 'store'
				,url : Tms.URLS.departList
				,reader : new Ext.data.JsonReader({
					root : 'data'
					,fields : [{name : 'id'},{name: 'deptName'}]
				})			
			}
		}, {			
			xtype : 'radiogroup'
			,id : 'prjType'
			,fieldLabel : '部门主管'
			//,fieldRequired : true
			,allowBlank : false
			,isFormField : true
			,labelWidth : 1
			,columns : 2
			,items : [{
				name : 'teamLeader', boxLabel : '否', labelSeparator : '', inputValue : '0',checked : true
			},{
				name : 'teamLeader', boxLabel : '是', labelSeparator : '', inputValue : '1'
			}]	
		}, {
			xtype : 'combo'
			,id : 'role_combo'
			,hiddenName : 'role'
			,fieldLabel : '岗位角色'
			,emptyText : '请选择岗位角色 ...'
			,forceSelection : true
			,listWidth : 100
			,valueField : 'id'
			,displayField : 'roleName'
			,editable: false
			//,readOnly:true
			,typeAhead : true
			,typeAheadDelay:3000
			,triggerAction : 'all'
			,selectOnFocus : true
			,allowBlank : true
			,mode : 'remote'//远程
			,store : {
				xtype : 'store'
				,url : Tms.URLS.roleList
				,reader : new Ext.data.JsonReader({
					root : 'data'
					,fields : [{name : 'id'},{name: 'roleName'}]
				})
			}
		/*}, {
			fieldLabel : "岗位角色",
			allowBlank : false,
			blankText : "人员名称不能为空！",
			name : "role"*/
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
				url : Tms.URLS.personSubmit,
				timeout : 300,
				method : 'POST',
				params : myForm.getValues(),//bjw 构建form对象时出问题，此处先直接获取form值
				success : function(form, resp) {
					Ext.getCmp('person_grid').store.reload();
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
			title : '添加人员',
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
				if(id == 0){
					Ext.Msg.alert('提示','不能修改超级管理员！');
				}else if (id != '') {
					var win = Ext.create({
						xtype : 'form-window',
						searchForm : true,
						title : '维护人员信息',
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
	delItem : function() {

		if (this.selModel.hasSelection()) {
			if(this.selModel.getSelected().data.id == 0){
				Ext.Msg.alert('提示','不能删除超级管理员！');
			}else
			Ext.MessageBox.confirm(
				'系统提示信息',
				'确定要删除所选的记录吗?',
				function(btn) {
					if (btn == 'yes') {
						var myCon = new Ext.data.Connection();
						Ext.MessageBox.wait('正在删除数据中, 请稍候……');
						myCon.request({
							url : Tms.URLS.personDelete,
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
Ext.reg('tms_person', Tms.person);
