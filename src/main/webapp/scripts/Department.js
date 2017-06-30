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
		header : "���ű��",
		menuDisabled : true,
		width : 100,
		align : "center",
		dataIndex : "id"
	}, {
		header : "��������",
		menuDisabled : true,
		width : 200,
		align : "center",
		dataIndex : 'deptName'
	}, {
		header : "��������",
		menuDisabled : true,
		width : 300,
		align : "center",
		dataIndex : 'pid',
		renderer : function(val){
			return (val == '2') ? '�ƻ���' : (val == '3') ? '��Ʋ�' : '��';
		}
	}, {
		header : "��������",
		menuDisabled : true,
		width : 300,
		align : "center",
		dataIndex : 'profile'
	}, ],
	loadMask : {
		msg : "���ݼ�����...."
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
			fieldLabel : "��������",
			blankText : "�������Ʋ���Ϊ�գ�",
			allowBlank : false,
			name : "deptName",
			width : 200
		}, {
			xtype : 'combo'
			,fieldLabel : "��������"
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
			,mode : 'local'//����
			,store : new Ext.data.SimpleStore({
	             fields: ['id', 'name'],
	             data : [['0','��'],['2','�ƻ���'],['3','��Ʋ�']]
	        })
		}, {
			xtype : 'textarea',
			fieldLabel : "��������",
			name : "profile",
			width : 200
		} ]
	},
	constructor : function(config) {
		Ext.apply(this, config);
		config = Ext.apply({
			tbar : [ {
				text : "���",
				handler : this.addItem,
				scope : this
			}, {
				text : "�޸�",
				handler : this.uptItem,
				scope : this
			}, {
				text : "ɾ��",
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
				waitMsg : "���ݱ�����...",
				url : Tms.URLS.deptSubmit,
				timeout : 300,
				method : 'POST',
				params : myForm.getValues(),//bjw ����form����ʱ�����⣬�˴���ֱ�ӻ�ȡformֵ
				success : function(form, resp) {
					Ext.getCmp('dept_grid').store.reload();
				},
				failure : function(form, resp) {
					var temp = Ext.util.JSON.decode(resp.response.responseText);
					Ext.Msg.alert("ϵͳ��ʾ��",temp.message);
				}
			});
		}
		ct.close();
	},
	addItem : function() {
		var win = Ext.create({
			xtype : 'form-window',
			searchForm : true,
			title : '����²���',
			items : this.formConfig || {}
		});
		win.on('clickOkButton', this.doSave);
		win.show();
	},
	uptItem : function() {
		if (this.selModel.hasSelection()) {
			var records = this.selModel.getSelections();// �õ���ѡ����е�����
			var recordsLen = records.length;// �õ�������ĳ���
			if (recordsLen > 1) {
				Ext.Msg.alert("ϵͳ��ʾ��Ϣ", "��ѡ������һ����б༭��");
			} else {
				var record = this.getSelectionModel().getSelected();// ��ȡѡ��ļ�¼��
				var id = record.get("id");
				if (id != '') {
					var win = Ext.create({
						xtype : 'form-window',
						searchForm : true,
						title : 'ά��������Ϣ',
						items : this.formConfig || {}
					});
					win.on('clickOkButton', this.doSave);
					win.formLoadRecord(record);
					win.show();
				}
			}
		} else {
			Ext.Msg.alert("��ʾ", "����ѡ��Ҫ�༭����Ϣ��!");
		}
	},
	delItem : function() {

		if (this.selModel.hasSelection()) {

			Ext.MessageBox.confirm(
				'ϵͳ��ʾ��Ϣ',
				'ȷ��Ҫɾ����ѡ�ļ�¼��?',
				function(btn) {
					if (btn == 'yes') {
						var myCon = new Ext.data.Connection();
						Ext.MessageBox.wait('����ɾ��������, ���Ժ򡭡�');
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
										Ext.Msg.alert("ϵͳ��ʾ",resp.message);
									} else {
										Ext.Msg.alert("ϵͳ��ʾ",'ɾ��ʧ��');
									}
								}
							}
						}, this);
					}
				}, this);
		} else {
			Ext.Msg.alert("��ʾ", "����ѡ��Ҫɾ������!");
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
		header : "��Ŀ���",
		menuDisabled : true,
		width : 100,
		align : "center",
		dataIndex : "id"
	}, {
		header : "��Ŀ����",
		menuDisabled : true,
		width : 200,
		align : "center",
		dataIndex : 'subprjName'
	}, {
		header : "��Ŀ����",
		menuDisabled : true,
		width : 300,
		align : "center",
		dataIndex : 'profile'
	}, ],
	loadMask : {
		msg : "���ݼ�����...."
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
			fieldLabel : "��Ŀ����",
			allowBlank : false,
			blankText : "��Ŀ���Ʋ���Ϊ�գ�",
			name : "subprjName"
		}, {
			xtype : 'textarea',
			width : 200,
			fieldLabel : "��Ŀ����",
			name : "profile"
		} ]
	},
	constructor : function(config) {
		Ext.apply(this, config);
		config = Ext.apply({
			tbar : [ {
				text : "���",
				handler : this.addItem,
				scope : this
			}, {
				text : "�޸�",
				handler : this.uptItem,
				scope : this
			}, {
				text : "ɾ��",
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
				waitMsg : "���ݱ�����...",
				url : Tms.URLS.subprjSubmit,
				timeout : 300,
				method : 'POST',
				params : myForm.getValues(),//bjw ����form����ʱ�����⣬�˴���ֱ�ӻ�ȡformֵ
				success : function(form, resp) {
					Ext.getCmp('subprj_grid').store.reload();
				},
				failure : function(form, resp) {
					var temp = Ext.util.JSON.decode(resp.response.responseText);
					Ext.Msg.alert("ϵͳ��ʾ��",temp.message);
				}
			});
		}
		ct.close();
	},
	addItem : function() {
		var win = Ext.create({
			xtype : 'form-window',
			searchForm : true,
			title : '�������Ŀ',
			items : this.formConfig || {}
		});
		//TODO bjw �������������б�
		win.on('clickOkButton', this.doSave);
		win.show();
	},
	uptItem : function() {
		if (this.selModel.hasSelection()) {
			var records = this.selModel.getSelections();// �õ���ѡ����е�����
			var recordsLen = records.length;// �õ�������ĳ���
			if (recordsLen > 1) {
				Ext.Msg.alert("ϵͳ��ʾ��Ϣ", "��ѡ������һ����б༭��");
			} else {
				var record = this.getSelectionModel().getSelected();// ��ȡѡ��ļ�¼��
				var id = record.get("id");
				if (id != '') {
					var win = Ext.create({
						xtype : 'form-window',
						searchForm : true,
						title : 'ά����Ŀ��Ϣ',
						items : this.formConfig || {}
					});
					win.on('clickOkButton', this.doSave);
					win.formLoadRecord(record);
					win.show();
				}
			}
		} else {
			Ext.Msg.alert("��ʾ", "����ѡ��Ҫ�༭����Ϣ��!");
		}
	},
	delItem : function() {

		if (this.selModel.hasSelection()) {

			Ext.MessageBox.confirm(
				'ϵͳ��ʾ��Ϣ',
				'ȷ��Ҫɾ����ѡ�ļ�¼��?',
				function(btn) {
					if (btn == 'yes') {
						var myCon = new Ext.data.Connection();
						Ext.MessageBox.wait('����ɾ��������, ���Ժ򡭡�');
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
										Ext.Msg.alert("ϵͳ��ʾ",resp.message);
									} else {
										Ext.Msg.alert("ϵͳ��ʾ",'ɾ��ʧ��');
									}
								}
							}
						}, this);
					}
				}, this);
		} else {
			Ext.Msg.alert("��ʾ", "����ѡ��Ҫɾ������!");
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
		header : "ͼ����",
		menuDisabled : true,
		width : 100,
		align : "center",
		dataIndex : "id"
	}, {
		header : "ͼ������",
		menuDisabled : true,
		width : 200,
		align : "center",
		dataIndex : 'imgtypeName'
	}, {
		header : "ͼ������",
		menuDisabled : true,
		width : 300,
		align : "center",
		dataIndex : 'profile'
	}, ],
	loadMask : {
		msg : "���ݼ�����...."
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
			fieldLabel : "ͼ������",
			allowBlank : false,
			blankText : "ͼ�����Ʋ���Ϊ�գ�",
			name : "imgtypeName"
		}, {
			xtype : 'textarea',
			width : 200,
			fieldLabel : "ͼ������",			
			name : "profile"
		} ]
	},
	constructor : function(config) {
		Ext.apply(this, config);
		config = Ext.apply({
			tbar : [ {
				text : "���",
				handler : this.addItem,
				scope : this
			}, {
				text : "�޸�",
				handler : this.uptItem,
				scope : this
			}, {
				text : "ɾ��",
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
				waitMsg : "���ݱ�����...",
				url : Tms.URLS.imgtypeSubmit,
				timeout : 300,
				method : 'POST',
				params : myForm.getValues(),//bjw ����form����ʱ�����⣬�˴���ֱ�ӻ�ȡformֵ
				success : function(form, resp) {
					Ext.getCmp('imgtype_grid').store.reload();
				},
				failure : function(form, resp) {
					var temp = Ext.util.JSON.decode(resp.response.responseText);
					Ext.Msg.alert("ϵͳ��ʾ��",temp.message);
				}
			});
		}
		ct.close();
	},
	addItem : function() {
		var win = Ext.create({
			xtype : 'form-window',
			searchForm : true,
			title : '�����ͼ��',
			items : this.formConfig || {}
		});
		win.on('clickOkButton', this.doSave);
		win.show();
	},
	uptItem : function() {
		if (this.selModel.hasSelection()) {
			var records = this.selModel.getSelections();// �õ���ѡ����е�����
			var recordsLen = records.length;// �õ�������ĳ���
			if (recordsLen > 1) {
				Ext.Msg.alert("ϵͳ��ʾ��Ϣ", "��ѡ������һ����б༭��");
			} else {
				var record = this.getSelectionModel().getSelected();// ��ȡѡ��ļ�¼��
				var id = record.get("id");
				if (id != '') {
					var win = Ext.create({
						xtype : 'form-window',
						searchForm : true,
						title : 'ά��ͼ����Ϣ',
						items : this.formConfig || {}
					});
					win.on('clickOkButton', this.doSave);
					win.formLoadRecord(record);
					win.show();
				}
			}
		} else {
			Ext.Msg.alert("��ʾ", "����ѡ��Ҫ�༭����Ϣ��!");
		}
	},
	delItem : function() {

		if (this.selModel.hasSelection()) {

			Ext.MessageBox.confirm(
				'ϵͳ��ʾ��Ϣ',
				'ȷ��Ҫɾ����ѡ�ļ�¼��?',
				function(btn) {
					if (btn == 'yes') {
						var myCon = new Ext.data.Connection();
						Ext.MessageBox.wait('����ɾ��������, ���Ժ򡭡�');
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
										Ext.Msg.alert("ϵͳ��ʾ",resp.message);
									} else {
										Ext.Msg.alert("ϵͳ��ʾ",'ɾ��ʧ��');
									}
								}
							}
						}, this);
					}
				}, this);
		} else {
			Ext.Msg.alert("��ʾ", "����ѡ��Ҫɾ������!");
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
		header : "ͼ�����",
		menuDisabled : true,
		width : 100,
		align : "center",
		dataIndex : "id"
	}, {
		header : "ͼ������",
		menuDisabled : true,
		width : 200,
		align : "center",
		dataIndex : 'imgsizeName'
	}, {
		header : "ͼ������",
		menuDisabled : true,
		width : 300,
		align : "center",
		dataIndex : 'profile'
	}, ],
	loadMask : {
		msg : "���ݼ�����...."
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
			fieldLabel : "ͼ������",
			allowBlank : false,
			blankText : "ͼ�����Ʋ���Ϊ�գ�",
			name : "imgsizeName"
		}, {
			xtype : 'textarea',
			width : 200,
			fieldLabel : "ͼ������",			
			name : "profile"
		} ]
	},
	constructor : function(config) {
		Ext.apply(this, config);
		config = Ext.apply({
			tbar : [ {
				text : "���",
				handler : this.addItem,
				scope : this
			}, {
				text : "�޸�",
				handler : this.uptItem,
				scope : this
			}, {
				text : "ɾ��",
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
				waitMsg : "���ݱ�����...",
				url : Tms.URLS.imgsizeSubmit,
				timeout : 300,
				method : 'POST',
				params : myForm.getValues(),//bjw ����form����ʱ�����⣬�˴���ֱ�ӻ�ȡformֵ
				success : function(form, resp) {
					Ext.getCmp('imgsize_grid').store.reload();
				},
				failure : function(form, resp) {
					var temp = Ext.util.JSON.decode(resp.response.responseText);
					Ext.Msg.alert("ϵͳ��ʾ��",temp.message);
				}
			});
		}
		ct.close();
	},
	addItem : function() {
		var win = Ext.create({
			xtype : 'form-window',
			searchForm : true,
			title : '�����ͼ��',
			items : this.formConfig || {}
		});
		win.on('clickOkButton', this.doSave);
		win.show();
	},
	uptItem : function() {
		if (this.selModel.hasSelection()) {
			var records = this.selModel.getSelections();// �õ���ѡ����е�����
			var recordsLen = records.length;// �õ�������ĳ���
			if (recordsLen > 1) {
				Ext.Msg.alert("ϵͳ��ʾ��Ϣ", "��ѡ������һ����б༭��");
			} else {
				var record = this.getSelectionModel().getSelected();// ��ȡѡ��ļ�¼��
				var id = record.get("id");
				if (id != '') {
					var win = Ext.create({
						xtype : 'form-window',
						searchForm : true,
						title : 'ά��ͼ����Ϣ',
						items : this.formConfig || {}
					});
					win.on('clickOkButton', this.doSave);
					win.formLoadRecord(record);
					win.show();
				}
			}
		} else {
			Ext.Msg.alert("��ʾ", "����ѡ��Ҫ�༭����Ϣ��!");
		}
	},
	delItem : function() {

		if (this.selModel.hasSelection()) {

			Ext.MessageBox.confirm(
				'ϵͳ��ʾ��Ϣ',
				'ȷ��Ҫɾ����ѡ�ļ�¼��?',
				function(btn) {
					if (btn == 'yes') {
						var myCon = new Ext.data.Connection();
						Ext.MessageBox.wait('����ɾ��������, ���Ժ򡭡�');
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
										Ext.Msg.alert("ϵͳ��ʾ",resp.message);
									} else {
										Ext.Msg.alert("ϵͳ��ʾ",'ɾ��ʧ��');
									}
								}
							}
						}, this);
					}
				}, this);
		} else {
			Ext.Msg.alert("��ʾ", "����ѡ��Ҫɾ������!");
		}
	}
});
Ext.reg('tms_imgsize', Tms.imgsize);
